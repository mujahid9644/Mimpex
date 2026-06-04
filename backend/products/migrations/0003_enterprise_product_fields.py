from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("products", "0002_product_stock"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="active_chemical",
            field=models.CharField(blank=True, max_length=240),
        ),
        migrations.AddField(
            model_name="product",
            name="pack_size",
            field=models.CharField(blank=True, max_length=80),
        ),
        migrations.AddField(
            model_name="product",
            name="unit_price_bdt",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12),
        ),
        migrations.AddField(
            model_name="product",
            name="crop_targets",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
