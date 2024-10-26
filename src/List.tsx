import { Item, State } from "./model/index";
import { TodoItem } from "./Item";

export type TodoListProps = {
  items: Item[];
  stateFilter: State;
  onItemStatusChanged: (id: string, status: boolean) => void;
  onItemDeleted: (id: string) => void;
};

export function TodoList({
  items,
  stateFilter,
  onItemStatusChanged,
  onItemDeleted,
}: TodoListProps) {
  console.log("Render TODO-LIST");

  function filterItemByState(items: Item[], stateFilter: State): Item[] {
    switch (stateFilter) {
      case "Active": {
        return items.filter((x) => !x.completed);
      }
      case "Completed": {
        return items.filter((x) => !!x.completed);
      }

      default: {
        return items;
      }
    }
  }

  return (
    <ul>
      {filterItemByState(items, stateFilter).map((x) => (
        <TodoItem
          key={x.id}
          item={x}
          onDeleted={onItemDeleted}
          onStatusChanged={(status) => onItemStatusChanged(x.id, status)}
        />
      ))}
    </ul>
  );
}
