export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface TutorialStep {
  id: number;
  title: string;
  headline: string;
  lesson: string;
  tryIt: string;
  cursorWhy: string;
  commandHints: string[];
}

export interface AssistantReply {
  messages: string[];
  stepCompleted: boolean;
  hint?: string;
}
