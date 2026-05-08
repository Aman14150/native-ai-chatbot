import "./MessageBubble.css";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`bubble-wrapper ${isUser ? "user" : "assistant"}`}>
      {!isUser && <div className="bubble-avatar">AI</div>}
      <div className={`bubble ${isUser ? "bubble-user" : "bubble-assistant"}`}>
        <p className="bubble-content">{message.content}</p>
      </div>
      {isUser && <div className="bubble-avatar">You</div>}
    </div>
  );
}
