from django.db import models


class NewsItem(models.Model):
    title_en = models.CharField(max_length=300)
    title_bn = models.CharField(max_length=300, blank=True)
    body_en = models.TextField()
    body_bn = models.TextField(blank=True)
    is_pinned = models.BooleanField(default=False)
    published_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_pinned", "-published_at"]

    def __str__(self):
        return self.title_en


class CompanyProfile(models.Model):
    mission_en = models.TextField()
    mission_bn = models.TextField(blank=True)
    vision_en = models.TextField()
    vision_bn = models.TextField(blank=True)
    profile_en = models.TextField()
    profile_bn = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "company profile"

    def __str__(self):
        return "Company Profile"


class Director(models.Model):
    name_en = models.CharField(max_length=200)
    name_bn = models.CharField(max_length=200, blank=True)
    title_en = models.CharField(max_length=200)
    title_bn = models.CharField(max_length=200, blank=True)
    bio_en = models.TextField(blank=True)
    bio_bn = models.TextField(blank=True)
    photo_url = models.URLField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return self.name_en


class CareerMilestone(models.Model):
    year = models.PositiveIntegerField()
    title_en = models.CharField(max_length=300)
    title_bn = models.CharField(max_length=300, blank=True)
    description_en = models.TextField(blank=True)
    description_bn = models.TextField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-year", "sort_order"]

    def __str__(self):
        return f"{self.year} — {self.title_en}"


class ContactLead(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=300)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.subject}"
