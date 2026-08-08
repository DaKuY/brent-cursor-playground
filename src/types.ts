export type TaskTag = "chat" | "context" | "edit" | "agent" | "custom";

export interface Task {
  id: string;
  title: string;
  done: boolean;
  tag: TaskTag;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  promptHint: string;
  fileHint?: string;
}
