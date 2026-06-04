from django.core.management.base import BaseCommand

from products.models import Product


SEED = [
    {
        "matrix_id": "M_001",
        "name_bn": "কিউলোপ ৫ ইসি",
        "name_en": "Quloop 5 EC",
        "formulation": "5 EC",
        "active_chemical": "Quizalofop-P-Ethyl",
        "description_bn": "পাটের সকল প্রকার আগাছা দমন করে।",
        "description_en": "Controls all types of weeds in jute.",
        "product_type": Product.ProductType.HERBICIDE,
        "crop_targets": ["পাট"],
        "legacy_url": "https://mimpexbd.com/product/%e0%a6%95%e0%a6%bf%e0%a6%89%e0%a6%b2%e0%a7%8b%e0%a6%aa-%e0%a7%ab-%e0%a6%87%e0%a6%b8%e0%a6%bf/",
    },
    {
        "matrix_id": "M_002",
        "name_bn": "ইথিপ্লাস ৩৯.৬ এস এল",
        "name_en": "EthiPlus 39.6 SL",
        "formulation": "39.6 SL",
        "active_chemical": "Ethephon 39.6%",
        "description_bn": "উদ্ভিদের দৈহিক বৃদ্ধি, ফুলের সুষম বিকাশ, ফলের আকৃতি বড় করা ও ফলন বৃদ্ধিতে সহায়ক।",
        "description_en": "Supports growth, flowering, fruit sizing and yield.",
        "product_type": Product.ProductType.PGR,
        "crop_targets": ["ধান", "আম", "সবজি", "ফল"],
        "legacy_url": "https://mimpexbd.com/product/%e0%a6%87%e0%a6%a5%e0%a6%bf%e0%a6%aa%e0%a7%8d%e0%a6%b2%e0%a6%be%e0%a6%b8-%e0%a7%a9%e0%a7%af-%e0%a7%ac-%e0%a6%8f%e0%a6%b8-%e0%a6%8f%e0%a6%b2/",
    },
    {
        "matrix_id": "M_003",
        "name_bn": "জি এ-৩",
        "name_en": "GA-3",
        "formulation": "GA3",
        "active_chemical": "Gibberellic Acid",
        "description_bn": "পাতা ও কান্ডের বৃদ্ধি ঘটায়, বীজের অঙ্কুরোদগমে সাহায্য করে, ফুল ও ফলন বৃদ্ধিতে সহায়তা করে।",
        "description_en": "Supports vegetative growth, germination, flowering and yield.",
        "product_type": Product.ProductType.PGR,
        "crop_targets": ["ধান", "ফল", "সবজি"],
        "legacy_url": "https://mimpexbd.com/product/",
    },
    {
        "matrix_id": "M_004",
        "name_bn": "জি এ-৩ ট্যাবলেট",
        "name_en": "GA-3 Tablet",
        "formulation": "GA3 Tablet",
        "active_chemical": "Gibberellic Acid",
        "description_bn": "ফুল ঝরে পড়া রোধ, কুশি সংখ্যা ও ফলন বৃদ্ধি এবং ফলের আকার সুন্দর করতে সহায়ক।",
        "description_en": "Helps flowering, tillering, fruit shape and yield.",
        "product_type": Product.ProductType.PGR,
        "crop_targets": ["ধান", "ফল", "সবজি"],
        "legacy_url": "https://mimpexbd.com/product/",
    },
    {
        "matrix_id": "M_005",
        "name_bn": "আলটিমা প্লাস ৪০ ডব্লিউ জি",
        "name_en": "Ultima Plus 40 WG",
        "formulation": "40 WG",
        "active_chemical": "Emamectin Benzoate + Thiamethoxam",
        "description_bn": "ধানের মাজরা, বাদামী গাছ ফড়িং, পাতা মোড়ানো পোকা এবং সবজির ফল ছিদ্রকারী পোকা দমন করে।",
        "description_en": "Controls rice stem borer, brown planthopper, leaf folder and vegetable fruit borer.",
        "product_type": Product.ProductType.INSECTICIDE,
        "crop_targets": ["ধান", "বেগুন", "শিম", "সয়াবিন"],
        "legacy_url": "https://mimpexbd.com/product/",
    },
    {
        "matrix_id": "M_006",
        "name_bn": "এমিক্সোর ৩২.৫ এসসি",
        "name_en": "Amixor 32.5 SC",
        "formulation": "32.5 SC",
        "active_chemical": "Azoxystrobin + Difenoconazole",
        "description_bn": "ধানের খোল পোড়া, ব্লাস্ট, মরিচের লিফ স্পট, আমের এনথ্রাকনোজ ও সবজির ছত্রাকজনিত রোগ দমন করে।",
        "description_en": "Controls major fungal diseases in rice, chili, mango and vegetables.",
        "product_type": Product.ProductType.FUNGICIDE,
        "crop_targets": ["ধান", "মরিচ", "আম", "সবজি"],
        "legacy_url": "https://mimpexbd.com/product/",
    },
    {
        "matrix_id": "M_007",
        "name_bn": "কোটান ৫০ ডাব্লিউ জি",
        "name_en": "Kotan 50 WG",
        "formulation": "50 WG",
        "active_chemical": "Pymetrozine",
        "description_bn": "ধানের বাদামি গাছ ফড়িং এবং সব ধরনের সবজির শোষণ পোকা দমনে কার্যকরী।",
        "description_en": "Effective against rice brown planthopper and sucking pests in vegetables.",
        "product_type": Product.ProductType.INSECTICIDE,
        "crop_targets": ["ধান", "সবজি"],
        "legacy_url": "https://mimpexbd.com/product/",
    },
    {
        "matrix_id": "M_008",
        "name_bn": "ইনডোল ২.৫ ই সি",
        "name_en": "Indol 2.5 EC",
        "formulation": "2.5 EC",
        "active_chemical": "Lambda-cyhalothrin",
        "description_bn": "আমের হুপার, সবজির কাটুই পোকা, লেদা পোকা এবং ডগা ও ফল ছিদ্রকারী পোকা দমন করে।",
        "description_en": "Controls mango hopper and vegetable borers.",
        "product_type": Product.ProductType.INSECTICIDE,
        "crop_targets": ["আম", "সবজি"],
        "legacy_url": "https://mimpexbd.com/product/",
    },
]


class Command(BaseCommand):
    help = "Seed verified Mimpex product matrix"

    def handle(self, *args, **options):
        for row in SEED:
            Product.objects.update_or_create(matrix_id=row["matrix_id"], defaults={**row, "is_verified_matrix": True})
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(SEED)} products"))
