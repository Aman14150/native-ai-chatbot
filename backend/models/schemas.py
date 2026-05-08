from pydantic import BaseModel
from typing import List


class Message(BaseModel):
    role: str  # "user" | "assistant" | "system"
    content: str


class ChatRequest(BaseModel):
    model: str = "llama3.2"
    messages: List[Message]
