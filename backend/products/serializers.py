from rest_framework import serializers

from .models import Product, ProductCategory


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ("id", "name_en", "name_bn", "slug", "sort_order")


class ProductSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "matrix_id",
            "name_bn",
            "name_en",
            "formulation",
            "active_chemical",
            "pack_size",
            "unit_price_bdt",
            "crop_targets",
            "description_bn",
            "description_en",
            "product_type",
            "category",
            "legacy_url",
            "image_url",
            "stock_quantity",
            "stock_status",
            "is_active",
        )


class ProductAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "matrix_id",
            "name_bn",
            "name_en",
            "formulation",
            "active_chemical",
            "pack_size",
            "unit_price_bdt",
            "crop_targets",
            "description_bn",
            "description_en",
            "product_type",
            "stock_quantity",
            "stock_status",
            "image_url",
            "is_active",
            "is_verified_matrix",
        )

    def validate_stock_status(self, value):
        allowed = {"in_stock", "low_stock", "out_of_stock"}
        if value not in allowed:
            raise serializers.ValidationError("Invalid stock status")
        return value

    def validate_crop_targets(self, value):
        if value in ("", None):
            return []
        if not isinstance(value, list):
            raise serializers.ValidationError("Crop targets must be a list")
        return [str(item).strip() for item in value if str(item).strip()]
