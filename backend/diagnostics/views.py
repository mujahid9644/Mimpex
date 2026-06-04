import base64

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import run_image_diagnosis


class ImageDiagnosisView(APIView):
    """POST { "image_base64": "...", "mime_type": "image/jpeg" }"""

    def post(self, request):
        uploaded = request.FILES.get("image")
        image_b64 = request.data.get("image_base64")
        mime = request.data.get("mime_type", "image/jpeg")
        if uploaded:
            image_b64 = base64.b64encode(uploaded.read()).decode("ascii")
            mime = uploaded.content_type or mime
        if not image_b64:
            return Response({"detail": "image file or image_base64 is required"}, status=status.HTTP_400_BAD_REQUEST)

        crop_context = request.data.get("crop_context")
        ip = request.META.get("REMOTE_ADDR")
        try:
            diagnosis = run_image_diagnosis(image_b64, mime, client_ip=ip, crop_context=crop_context)
        except Exception as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_502_BAD_GATEWAY)

        return Response(diagnosis)
