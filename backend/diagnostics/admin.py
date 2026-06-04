from django.contrib import admin

from .models import DiagnosticLog


@admin.register(DiagnosticLog)
class DiagnosticLogAdmin(admin.ModelAdmin):
    list_display = ("crop_type", "matched_product_id", "created_at")
    list_filter = ("crop_type", "matched_product_id")
    readonly_fields = ("raw_response", "created_at")
