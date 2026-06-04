from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from diagnostics.services import build_product_matrix_context
from mimpex_api.gemini import chat_reply


class ChatMessageView(APIView):
    """POST { "messages": [{ "role": "user", "content": "..." }, ...] }"""

    def post(self, request):
        messages = request.data.get("messages")
        message = request.data.get("message")
        if message and not messages:
            messages = [{"role": "user", "content": message}]
        if not messages or not isinstance(messages, list):
            return Response({"detail": "message or messages array is required"}, status=status.HTTP_400_BAD_REQUEST)

        context = build_product_matrix_context()
        try:
            reply = chat_reply(messages, context)
        except Exception as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_502_BAD_GATEWAY)

        return Response({"reply": reply, "role": "assistant"})
