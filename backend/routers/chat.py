import httpx
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from models.schemas import ChatRequest

router = APIRouter()
OLLAMA_URL = "http://localhost:11434/api/chat"


@router.post("/chat")
async def chat(request: ChatRequest):
    async def generate():
        async with httpx.AsyncClient(timeout=None) as client:
            async with client.stream(
                "POST",
                OLLAMA_URL,
                json={
                    "model": request.model,
                    "messages": [m.model_dump() for m in request.messages],
                    "stream": True,
                },
            ) as response:
                async for chunk in response.aiter_text():
                    yield chunk

    return StreamingResponse(generate(), media_type="application/x-ndjson")
