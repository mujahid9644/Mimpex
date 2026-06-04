from django.db import connection
from rest_framework import generics

from .models import Product, ProductCategory
from .serializers import ProductCategorySerializer, ProductSerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.filter(is_verified_matrix=True).select_related("category")
        product_type = self.request.query_params.get("type")
        if product_type:
            qs = qs.filter(product_type=product_type)
        crop = self.request.query_params.get("crop")
        if crop:
            if connection.vendor == "postgresql":
                qs = qs.filter(crop_targets__contains=[crop])
            else:
                qs = qs.filter(crop_targets__icontains=crop)
        return qs


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_verified_matrix=True)
    serializer_class = ProductSerializer
    lookup_field = "matrix_id"


class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
