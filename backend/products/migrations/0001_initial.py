import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ProductCategory",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name_en", models.CharField(max_length=200)),
                ("name_bn", models.CharField(blank=True, max_length=200)),
                ("slug", models.SlugField(unique=True)),
                ("sort_order", models.PositiveIntegerField(default=0)),
            ],
            options={
                "verbose_name_plural": "product categories",
                "ordering": ["sort_order", "name_en"],
            },
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("matrix_id", models.CharField(help_text="e.g. M_001", max_length=16, unique=True)),
                ("name_bn", models.CharField(max_length=300)),
                ("name_en", models.CharField(blank=True, max_length=300)),
                ("formulation", models.CharField(blank=True, help_text="Active ingredient / strength", max_length=200)),
                ("description_bn", models.TextField(blank=True)),
                ("description_en", models.TextField(blank=True)),
                (
                    "product_type",
                    models.CharField(
                        choices=[
                            ("herbicide", "Herbicide"),
                            ("pgr", "Plant Growth Regulator"),
                            ("fungicide", "Fungicide"),
                            ("insecticide", "Insecticide"),
                            ("other", "Other"),
                        ],
                        default="other",
                        max_length=32,
                    ),
                ),
                ("legacy_url", models.URLField(blank=True)),
                ("is_verified_matrix", models.BooleanField(default=True)),
                ("embedding", models.JSONField(blank=True, help_text="Future pgvector payload", null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "category",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="products",
                        to="products.productcategory",
                    ),
                ),
            ],
            options={
                "ordering": ["matrix_id"],
            },
        ),
    ]
