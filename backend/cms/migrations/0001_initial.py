from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="CareerMilestone",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("year", models.PositiveIntegerField()),
                ("title_en", models.CharField(max_length=300)),
                ("title_bn", models.CharField(blank=True, max_length=300)),
                ("description_en", models.TextField(blank=True)),
                ("description_bn", models.TextField(blank=True)),
                ("sort_order", models.PositiveIntegerField(default=0)),
            ],
            options={"ordering": ["-year", "sort_order"]},
        ),
        migrations.CreateModel(
            name="CompanyProfile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("mission_en", models.TextField()),
                ("mission_bn", models.TextField(blank=True)),
                ("vision_en", models.TextField()),
                ("vision_bn", models.TextField(blank=True)),
                ("profile_en", models.TextField()),
                ("profile_bn", models.TextField(blank=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"verbose_name_plural": "company profile"},
        ),
        migrations.CreateModel(
            name="ContactLead",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(blank=True, max_length=50)),
                ("subject", models.CharField(max_length=300)),
                ("message", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Director",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name_en", models.CharField(max_length=200)),
                ("name_bn", models.CharField(blank=True, max_length=200)),
                ("title_en", models.CharField(max_length=200)),
                ("title_bn", models.CharField(blank=True, max_length=200)),
                ("bio_en", models.TextField(blank=True)),
                ("bio_bn", models.TextField(blank=True)),
                ("photo_url", models.URLField(blank=True)),
                ("sort_order", models.PositiveIntegerField(default=0)),
            ],
            options={"ordering": ["sort_order"]},
        ),
        migrations.CreateModel(
            name="NewsItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title_en", models.CharField(max_length=300)),
                ("title_bn", models.CharField(blank=True, max_length=300)),
                ("body_en", models.TextField()),
                ("body_bn", models.TextField(blank=True)),
                ("is_pinned", models.BooleanField(default=False)),
                ("published_at", models.DateTimeField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["-is_pinned", "-published_at"]},
        ),
    ]
