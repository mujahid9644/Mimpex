from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/products/", include("products.urls")),
    path("api/diagnostics/", include("diagnostics.urls")),
    path("api/v1/ai/", include("diagnostics.urls")),
    path("api/v1/ai/", include("chat.urls")),
    path("api/chat/", include("chat.urls")),
    path("api/cms/", include("cms.urls")),
    path("api/admin/", include("dashboard.urls")),
]
