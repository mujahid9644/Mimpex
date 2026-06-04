from django.contrib import admin

from .models import Product, ProductCategory


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("name_en", "name_bn", "slug", "sort_order")
    prepopulated_fields = {"slug": ("name_en",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("matrix_id", "name_bn", "product_type", "is_verified_matrix")
    list_filter = ("product_type", "is_verified_matrix", "category")
    search_fields = ("matrix_id", "name_bn", "name_en", "formulation")
