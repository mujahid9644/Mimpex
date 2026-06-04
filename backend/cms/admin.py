from django.contrib import admin

from .models import CareerMilestone, CompanyProfile, ContactLead, Director, NewsItem


@admin.register(NewsItem)
class NewsItemAdmin(admin.ModelAdmin):
    list_display = ("title_en", "is_pinned", "published_at")


@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "updated_at")


@admin.register(Director)
class DirectorAdmin(admin.ModelAdmin):
    list_display = ("name_en", "title_en", "sort_order")


@admin.register(CareerMilestone)
class CareerMilestoneAdmin(admin.ModelAdmin):
    list_display = ("year", "title_en")


@admin.register(ContactLead)
class ContactLeadAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at")
    readonly_fields = ("created_at",)
