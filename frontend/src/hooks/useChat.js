import { useState, useRef } from "react";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef(null);

  const sendMessage = async (userText) => {
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setIsStreaming(true);

    // Append an empty assistant message to fill in as tokens arrive
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "llama3.2", messages: newMessages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });

        for (const line of text.split("\n").filter(Boolean)) {
          try {
            const data = JSON.parse(line);
            if (data.message?.content) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: updated[updated.length - 1].content + data.message.content,
                };
                return updated;
              });
            }
          } catch {
            // Partial chunk — ignore and wait for next read
          }
        }
      }
    } catch (err) {
      if (err.name === "AbortError") {
        // User stopped the response — keep whatever was streamed so far
        return;
      }
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `Error: ${err.message}`,
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const stopStreaming = () => {
    abortControllerRef.current?.abort();
  };

  const clearMessages = () => setMessages([]);

  return { messages, isStreaming, sendMessage, stopStreaming, clearMessages };
}
