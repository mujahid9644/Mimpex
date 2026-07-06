import json

from channels.generic.websocket import WebsocketConsumer

from diagnostics.services import build_product_context_for_query
from mimpex_api.gemini import chat_reply


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send(
            text_data=json.dumps(
                {
                    "type": "welcome",
                    "content": "আসসালামু আলাইকুম! মিমপেক্স সহকারী — আপনি কোন ফসল চাষ করছেন?",
                }
            )
        )

    def receive(self, text_data=None, bytes_data=None):
        payload = json.loads(text_data or "{}")
        messages = payload.get("messages", [])
        if not messages:
            self.send(text_data=json.dumps({"type": "error", "content": "messages required"}))
            return

        context = build_product_context_for_query(str(messages[-1].get("content", "")))
        reply = chat_reply(messages, context)
        self.send(text_data=json.dumps({"type": "message", "role": "assistant", "content": reply}))
