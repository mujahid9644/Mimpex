from django.urls import path

from .views import ImageDiagnosisView

urlpatterns = [
    path("image/", ImageDiagnosisView.as_view(), name="image-diagnosis"),
    path("diagnose/", ImageDiagnosisView.as_view(), name="ai-diagnose"),
]
