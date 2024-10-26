import { State } from "./model";

type ActionBarProps = {
  itemLeft: number;
  state: State;
  unmark?: boolean;
  onStateChanged: (state: State) => void;
  onClearCompleted: () => void;
  onMarkDone: () => void;
};

export function ActionBar({
  itemLeft,
  state,
  unmark,
  onStateChanged,
  onMarkDone,
  onClearCompleted,
}: ActionBarProps) {
  return (
    <div className="action-bar">
      <label className="item-left-panel">
        {itemLeft} item{itemLeft > 1 ? "s" : ""} left
      </label>
      <button
        onClick={() => onStateChanged("All")}
        className={state === "All" ? "btn btn-active" : "btn"}
      >
        All
      </button>
      <button
        onClick={() => onStateChanged("Active")}
        className={state === "Active" ? "btn btn-active" : "btn"}
      >
        Active
      </button>
      <button
        onClick={() => onStateChanged("Completed")}
        className={state === "Completed" ? "btn btn-active" : "btn"}
      >
        Completed
      </button>

      <button className="btn" onClick={onMarkDone}>
        {unmark ? "Unmark all" : "Mark all complete"}
      </button>

      {state !== "Active" && (
        <button onClick={onClearCompleted} className="btn">
          Clear completed
        </button>
      )}
    </div>
  );
}
