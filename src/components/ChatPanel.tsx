import { useEffect, useRef, type FormEvent, type ReactNode } from "react";
import type { ChatMessage } from "../types";

type Props = {
  messages: ChatMessage[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  /** Only scroll chat log after the user sends, not on initial load */
  scrollOnNewMessages?: boolean;
};

function renderInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noreferrer">
          {link[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChatPanel({
  messages,
  input,
  onInputChange,
  onSend,
  disabled,
  placeholder,
  scrollOnNewMessages = false,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const prevLen = useRef(messages.length);

  useEffect(() => {
    if (!scrollOnNewMessages) return;
    if (messages.length > prevLen.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    prevLen.current = messages.length;
  }, [messages, scrollOnNewMessages]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend();
  }

  return (
    <div className="chat-panel chat-panel-centered">
      <div
        ref={logRef}
        className="chat-log chat-log-compact"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.length === 0 ? (
          <p className="chat-empty">Complete the quest in the chat below ⛏️</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`chat-bubble chat-${m.role}`}>
              <span className="chat-role">
                {m.role === "user" ? "You" : m.role === "system" ? "Guide" : "Assistant"}
              </span>
              <div className="chat-content">{renderInlineMarkdown(m.content)}</div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form className="chat-form chat-form-hero" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={placeholder ?? "Message or /help"}
          disabled={disabled}
          autoComplete="off"
          enterKeyHint="send"
        />
        <button type="submit" className="chat-send" disabled={disabled || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
