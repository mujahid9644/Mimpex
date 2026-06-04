from django.db import models


class DiagnosticLog(models.Model):
    crop_type = models.CharField(max_length=120, blank=True)
    condition = models.TextField(blank=True)
    matched_product_id = models.CharField(max_length=16, blank=True)
    raw_response = models.JSONField(default=dict)
    image_reference = models.CharField(max_length=500, blank=True)
    client_ip = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.crop_type or 'unknown'} — {self.created_at:%Y-%m-%d %H:%M}"
