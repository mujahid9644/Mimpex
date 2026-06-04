from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("products", "0001_initial")]

    operations = [
        migrations.AddField(
            model_name="product",
            name="stock_quantity",
            field=models.PositiveIntegerField(default=100),
        ),
        migrations.AddField(
            model_name="product",
            name="stock_status",
            field=models.CharField(
                choices=[
                    ("in_stock", "In Stock"),
                    ("low_stock", "Low Stock"),
                    ("out_of_stock", "Out of Stock"),
                ],
                default="in_stock",
                max_length=16,
            ),
        ),
    ]
