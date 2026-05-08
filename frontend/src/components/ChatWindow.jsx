import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import "./ChatWindow.css";

const SUGGESTIONS = [
  "Explain quantum computing simply",
  "Write a Python hello world",
  "What is the meaning of life?",
  "Give me a productivity tip",
];

export default function ChatWindow({ messages, isStreaming, onSuggestion }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h2>How can I help you?</h2>
          <p>Ask me anything - I run entirely on your machine. No internet required.</p>
          <div className="empty-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="suggestion-chip" onClick={() => onSuggestion?.(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
          {isStreaming && messages[messages.length - 1]?.content === "" && (
            <div className="typing-indicator">
              <span /><span /><span />
            </div>
          )}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
}