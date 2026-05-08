import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import { useChat } from "./hooks/useChat";
import "./App.css";

export default function App() {
  const { messages, isStreaming, sendMessage, stopStreaming, clearMessages } = useChat();

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
              <path d="M12 8v4l3 3"/>
            </svg>
          </div>
          <div>
            <h1>Local AI Chat</h1>
            <span className="model-badge">
              <span className="status-dot" />
              Llama 3.2 · Offline
            </span>
          </div>
        </div>
        {messages.length > 0 && (
          <button className="clear-btn" onClick={clearMessages} disabled={isStreaming} title="Clear conversation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
            Clear
          </button>
        )}
      </header>
      <ChatWindow messages={messages} isStreaming={isStreaming} onSuggestion={sendMessage} />
      <InputBar onSend={sendMessage} onStop={stopStreaming} disabled={isStreaming} />
    </div>
  );
}
