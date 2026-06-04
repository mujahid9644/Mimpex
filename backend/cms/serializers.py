from rest_framework import serializers

from .models import CareerMilestone, CompanyProfile, ContactLead, Director, NewsItem


class NewsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = (
            "id",
            "title_en",
            "title_bn",
            "body_en",
            "body_bn",
            "is_pinned",
            "published_at",
        )


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ("id", "name_en", "name_bn", "title_en", "title_bn", "bio_en", "bio_bn", "photo_url")


class CareerMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerMilestone
        fields = ("id", "year", "title_en", "title_bn", "description_en", "description_bn")


class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = (
            "mission_en",
            "mission_bn",
            "vision_en",
            "vision_bn",
            "profile_en",
            "profile_bn",
        )


class ContactLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactLead
        fields = ("name", "email", "phone", "subject", "message")
