import { useMemo, useState } from "react";
import { FeatureCard } from "./components/FeatureCard";
import { TaskList } from "./components/TaskList";
import { StatsBar } from "./components/StatsBar";
import { CURSOR_EXERCISES } from "./data/exercises";
import type { Task } from "./types";

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Open Chat and say hello", done: false, tag: "chat" },
  { id: "2", title: "Use @ to reference src/App.tsx", done: false, tag: "context" },
  { id: "3", title: "Inline-edit a component name", done: false, tag: "edit" },
  { id: "4", title: "Ask Agent to add dark mode toggle", done: false, tag: "agent" },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");

  const visibleTasks = useMemo(() => {
    if (filter === "open") return tasks.filter((t) => !t.done);
    if (filter === "done") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      done: tasks.filter((t) => t.done).length,
    }),
    [tasks],
  );

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">Cursor Playground</p>
        <h1>Brent&apos;s Cursor Playground</h1>
        <p className="subtitle">
          A tiny React app with guided exercises. Use Chat, inline edits, and Agent
          on real files—not toy snippets.
        </p>
      </header>

      <StatsBar done={stats.done} total={stats.total} />

      <section className="grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Practice checklist</h2>
            <div className="filters" role="tablist" aria-label="Task filter">
              {(["all", "open", "done"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === f}
                  className={filter === f ? "filter active" : "filter"}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <TaskList tasks={visibleTasks} onChange={setTasks} />
        </div>

        <div className="panel features">
          <h2>Things to try in Cursor</h2>
          <div className="feature-grid">
            {CURSOR_EXERCISES.map((ex) => (
              <FeatureCard key={ex.id} exercise={ex} />
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <code>npm run dev</code> then open the local URL. Edit anything—Agent can
        explain, refactor, or extend it.
      </footer>
    </div>
  );
}
