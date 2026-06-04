from django.urls import path

from .views import ProductCategoryListView, ProductDetailView, ProductListView

urlpatterns = [
    path("", ProductListView.as_view(), name="product-list"),
    path("categories/", ProductCategoryListView.as_view(), name="category-list"),
    path("<str:matrix_id>/", ProductDetailView.as_view(), name="product-detail"),
]
