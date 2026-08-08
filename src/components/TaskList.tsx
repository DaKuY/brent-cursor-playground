import type { Task } from "../types";

type Props = {
  tasks: Task[];
  onChange: (tasks: Task[]) => void;
};

export function TaskList({ tasks, onChange }: Props) {
  function toggle(id: string) {
    onChange(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function updateTitle(id: string, title: string) {
    onChange(tasks.map((t) => (t.id === id ? { ...t, title } : t)));
  }

  if (tasks.length === 0) {
    return <p className="empty">No tasks in this view. Change the filter above.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.done ? "task done" : "task"}>
          <label className="task-row">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggle(task.id)}
            />
            <input
              className="task-title"
              value={task.title}
              onChange={(e) => updateTitle(task.id, e.target.value)}
              aria-label={`Task: ${task.title}`}
            />
            <span className={`tag tag-${task.tag}`}>{task.tag}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
