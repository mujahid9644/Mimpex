from django.contrib import admin

from .models import Product, ProductCategory


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("name_en", "name_bn", "slug", "sort_order")
    prepopulated_fields = {"slug": ("name_en",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("matrix_id", "name_bn", "product_type", "is_active", "is_verified_matrix")
    list_filter = ("product_type", "is_active", "is_verified_matrix", "category")
    search_fields = ("matrix_id", "name_bn", "name_en", "formulation")
    actions = ("activate_products", "deactivate_products", "verify_products", "unverify_products")

    @admin.action(description="Activate selected products for website and AI")
    def activate_products(self, request, queryset):
        self.message_user(request, f"Activated {queryset.update(is_active=True)} products.")

    @admin.action(description="Deactivate selected products from website and AI")
    def deactivate_products(self, request, queryset):
        self.message_user(request, f"Deactivated {queryset.update(is_active=False)} products.")

    @admin.action(description="Mark selected products verified")
    def verify_products(self, request, queryset):
        self.message_user(request, f"Verified {queryset.update(is_verified_matrix=True)} products.")

    @admin.action(description="Mark selected products unverified")
    def unverify_products(self, request, queryset):
        self.message_user(request, f"Unverified {queryset.update(is_verified_matrix=False)} products.")
