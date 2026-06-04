from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="DiagnosticLog",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("crop_type", models.CharField(blank=True, max_length=120)),
                ("condition", models.TextField(blank=True)),
                ("matched_product_id", models.CharField(blank=True, max_length=16)),
                ("raw_response", models.JSONField(default=dict)),
                ("image_reference", models.CharField(blank=True, max_length=500)),
                ("client_ip", models.GenericIPAddressField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
