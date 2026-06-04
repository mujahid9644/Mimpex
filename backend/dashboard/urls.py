from django.urls import path

from .views import (
    AdminDiagnosticListView,
    AdminProductDetailView,
    AdminProductListCreateView,
    DashboardStatsView,
)

urlpatterns = [
    path("stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path("products/", AdminProductListCreateView.as_view(), name="admin-products"),
    path("products/<str:matrix_id>/", AdminProductDetailView.as_view(), name="admin-product-detail"),
    path("diagnostics/", AdminDiagnosticListView.as_view(), name="admin-diagnostics"),
]
