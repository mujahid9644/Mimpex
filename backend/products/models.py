from django.db import models


class ProductCategory(models.Model):
    name_en = models.CharField(max_length=200)
    name_bn = models.CharField(max_length=200, blank=True)
    slug = models.SlugField(unique=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name_en"]
        verbose_name_plural = "product categories"

    def __str__(self):
        return self.name_en


class Product(models.Model):
    class ProductType(models.TextChoices):
        INSECTICIDE = "insecticide", "Insecticide"
        FUNGICIDE = "fungicide", "Fungicide"
        HERBICIDE = "herbicide", "Herbicide"
        MITICIDE = "miticide", "Miticides"
        PUBLIC_HEALTH = "public_health", "Public Health"
        PGR = "pgr", "Plant Growth Regulator"
        AQUACULTURE = "aquaculture", "Aquaculture"
        RODENTICIDE = "rodenticide", "Rodenticide"
        OTHER = "other", "Other"

    matrix_id = models.CharField(max_length=16, unique=True, help_text="e.g. M_001")
    name_bn = models.CharField(max_length=300)
    name_en = models.CharField(max_length=300, blank=True)
    formulation = models.CharField(max_length=200, blank=True, help_text="Active ingredient / strength")
    active_chemical = models.CharField(max_length=240, blank=True)
    pack_size = models.CharField(max_length=80, blank=True)
    unit_price_bdt = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    crop_targets = models.JSONField(default=list, blank=True)
    description_bn = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    product_type = models.CharField(max_length=32, choices=ProductType.choices, default=ProductType.OTHER)
    category = models.ForeignKey(
        ProductCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name="products"
    )
    legacy_url = models.URLField(blank=True)
    is_verified_matrix = models.BooleanField(default=True)
    stock_quantity = models.PositiveIntegerField(default=100)
    stock_status = models.CharField(
        max_length=16,
        choices=[
            ("in_stock", "In Stock"),
            ("low_stock", "Low Stock"),
            ("out_of_stock", "Out of Stock"),
        ],
        default="in_stock",
    )
    embedding = models.JSONField(null=True, blank=True, help_text="Future pgvector payload")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["matrix_id"]

    def __str__(self):
        return f"{self.matrix_id} — {self.name_bn}"
