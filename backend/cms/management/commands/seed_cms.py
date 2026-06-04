from datetime import datetime, timezone

from django.core.management.base import BaseCommand

from cms.models import CareerMilestone, CompanyProfile, Director, NewsItem
from products.models import Product


EXTRA_PRODUCTS = [
    {
        "matrix_id": "M_003",
        "name_bn": "মিমপেক্স ইনসেক্টিসাইড ডেমো",
        "name_en": "Mimpex Insecticide Demo",
        "product_type": Product.ProductType.INSECTICIDE,
        "description_bn": "কীটনাশক শ্রেণী — নমুনা এন্ট্রি",
    },
    {
        "matrix_id": "M_004",
        "name_bn": "মিমপেক্স ফাঙ্গিসাইড ডেমো",
        "name_en": "Mimpex Fungicide Demo",
        "product_type": Product.ProductType.FUNGICIDE,
        "description_bn": "ছত্রাকনাশক শ্রেণী — নমুনা এন্ট্রি",
    },
    {
        "matrix_id": "M_005",
        "name_bn": "মিমপেক্স মাকড়নাশক ডেমো",
        "name_en": "Mimpex Miticide Demo",
        "product_type": Product.ProductType.MITICIDE,
        "description_bn": "মাকড়নাশক শ্রেণী — নমুনা এন্ট্রি",
    },
    {
        "matrix_id": "M_006",
        "name_bn": "পাবলিক হেলথ সলিউশন",
        "name_en": "Public Health Solution",
        "product_type": Product.ProductType.PUBLIC_HEALTH,
        "description_bn": "জনস্বাস্থ্য পণ্য — নমুনা এন্ট্রি",
    },
]


class Command(BaseCommand):
    help = "Seed CMS content and extended product catalog"

    def handle(self, *args, **options):
        CompanyProfile.objects.update_or_create(
            pk=1,
            defaults={
                "mission_en": "To empower Bangladeshi farmers with science-backed crop protection and growth solutions.",
                "mission_bn": "বিজ্ঞানভিত্তিক ফসল সুরক্ষা ও উৎপাদনশীলতা বৃদ্ধির মাধ্যমে কৃষকের পাশে থাকা।",
                "vision_en": "To be the most trusted agrochemical innovator in South Asia.",
                "vision_bn": "দক্ষিণ এশিয়ার সবচেয়ে বিশ্বস্ত এগ্রোকেমিক্যাল উদ্ভাবক হওয়া।",
                "profile_en": (
                    "Mimpex Agrochemicals Ltd. (MAL) manufactures and markets crop protection "
                    "and plant growth solutions aligned with sustainable agriculture."
                ),
                "profile_bn": (
                    "মিমপেক্স এগ্রোকেমিক্যালস লিমিটেড (এমএল) টেকসই কৃষির জন্য "
                    "ফসল সুরক্ষা ও প্ল্যান্ট গ্রোথ রেগুলেটর উৎপাদন ও বিপণন করে।"
                ),
            },
        )

        Director.objects.update_or_create(
            name_en="Managing Director",
            defaults={
                "name_bn": "ব্যবস্থাপনা পরিচালক",
                "title_en": "Board of Directors",
                "title_bn": "পরিচালনা পর্ষদ",
                "bio_en": "Leading Mimpex corporate strategy and nationwide distribution.",
                "bio_bn": "মিমপেক্সের কৌশলগত পরিচালনা ও দেশব্যাপী বিতরণ।",
                "sort_order": 1,
            },
        )

        CareerMilestone.objects.update_or_create(
            year=2010,
            title_en="National distribution network",
            defaults={
                "title_bn": "জাতীয় বিতরণ নেটওয়ার্ক",
                "description_en": "Expanded dealer footprint across Bangladesh.",
                "description_bn": "বাংলাদেশ জুড়ে ডিলার নেটওয়ার্ক সম্প্রসারণ।",
            },
        )

        now = datetime.now(timezone.utc)
        NewsItem.objects.update_or_create(
            title_en="Welcome to Mimpex Next-Gen Platform",
            defaults={
                "title_bn": "মিমপেক্স নেক্সট-জেন প্ল্যাটফর্মে স্বাগতম",
                "body_en": "Explore our AI ImageBot and virtual sales assistant for crop advice.",
                "body_bn": "ফসল পরামর্শের জন্য ImageBot ও ভার্চুয়াল সহকারী ব্যবহার করুন।",
                "is_pinned": True,
                "published_at": now,
            },
        )

        for row in EXTRA_PRODUCTS:
            Product.objects.update_or_create(matrix_id=row["matrix_id"], defaults=row)

        self.stdout.write(self.style.SUCCESS("CMS and catalog seed complete"))
