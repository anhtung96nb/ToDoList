import "./App.css";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { TodoList } from "./List";
import { Item, State } from "./model";
import { v4 as uuidv4 } from "uuid";
import { ActionBar } from "./Action";

const LOCAL_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoItems, setTodoItems] = useState<Item[]>([]);
  const [state, setState] = useState<State>("All");
  const [markDoneState, setMarkDoneState] = useState<boolean>(false);

  const itemLeft = todoItems.filter((x) => !x.completed).length;
  const unmark =
    todoItems.filter((x) => x.completed).length == todoItems.length &&
    todoItems.length > 0;

  useEffect(() => {
    const storedTodos = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );
    if (storedTodos && storedTodos.length > 0) {
      setTodoItems(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoItems));
    console.log("Saved todo list");
  }, [todoItems]);

  function handleInputEnter(title: string) {
    setTodoItems([
      ...todoItems,
      {
        id: uuidv4(),
        title: title,
        completed: false,
      },
    ]);
  }

  function handleItemStatusChanged(id: string, status: boolean) {
    const item = todoItems.find((x) => x.id == id);
    if (item) {
      item.completed = status;
    }

    setTodoItems([...todoItems]);
  }

  function handleClearCompleted() {
    const filtered = todoItems.filter((x) => !x.completed);
    setTodoItems([...filtered]);

    if (state == "Completed") {
      setState("All");
    }
  }

  function handleItemDeleted(id: string) {
    const filtered = todoItems.filter((x) => x.id !== id);
    setTodoItems([...filtered]);
  }

  function handleMarkAllDone() {
    setMarkDoneState(!markDoneState);

    for (let i = 0; i < todoItems.length; i++) {
      todoItems[i].completed = !markDoneState;
    }

    setTodoItems([...todoItems]);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>TODO</h1>

        <Input onEnter={handleInputEnter} placeholder="Enter your text"></Input>
        <ActionBar
          state={state}
          unmark={unmark}
          onStateChanged={(state) => setState(state)}
          onClearCompleted={handleClearCompleted}
          onMarkDone={handleMarkAllDone}
          itemLeft={itemLeft}
        />
        <TodoList
          stateFilter={state}
          items={todoItems}
          onItemStatusChanged={handleItemStatusChanged}
          onItemDeleted={handleItemDeleted}
        />
      </div>
    </div>
  );
}

export default App;
