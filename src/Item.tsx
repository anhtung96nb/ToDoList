import { Item } from "./model";
export type TodoItemProps = {
  item: Item;
  onStatusChanged: (status: boolean) => void;
  onDeleted: (id: string) => void;
};

export function TodoItem({ item, onStatusChanged, onDeleted }: TodoItemProps) {
  return (
    <li key={item.id}>
      <div className="item-content" onClick={() => onStatusChanged(!item.completed)}>
        <input
          name={`chk-item-${item.id}`}
          type="checkbox"
          checked={!!item.completed}
          onChange={() => {}}
        />
        <label
          className={item.completed ? "item-completed" : ""}
          htmlFor={`chk-item-${item.id}`}
        >
          {item.title}
        </label>
        <br></br>
      </div>
      <button onClick={() => onDeleted(item.id)} className="btn-delete">
        X
      </button>
    </li>
  );
}
