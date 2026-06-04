"""
Crawler to seed products from mimpexbd.com categories.
Run: cd backend && python ../scripts/crawl_mimpexbd.py --persist
Requires: requests, beautifulsoup4 (in requirements.txt)
"""
from __future__ import annotations

import re
import sys
import time
from pathlib import Path
from urllib.parse import urlparse, parse_qs

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://mimpexbd.com"
TIMEOUT = 30

# Category mappings: Bengali category name -> (English name, ProductType)
CATEGORY_MAP = {
    "কীটনাশক": ("Insecticide", "insecticide"),
    "ইন্দুরনাশক": ("Insecticide", "insecticide"),
    "ছত্রাকনাশক": ("Fungicide", "fungicide"),
    "আগাছানাশক": ("Herbicide", "herbicide"),
    "সার-পিজিআর": ("PGR", "pgr"),
    "একুয়াকাল্চার-পণ্য": ("Aquaculture", "other"),
}

# Product category URLs to crawl
CRAWL_URLS = [
    "https://mimpexbd.com/product-category/%e0%a6%95%e0%a7%80%e0%a6%9f%e0%a6%a8%e0%a6%be%e0%a6%b6%e0%a6%95/",  # Insecticide
    "https://mimpexbd.com/product-category/%e0%a6%87%e0%a6%81%e0%a6%a6%e0%a7%81%e0%a6%b0%e0%a6%a8%e0%a6%be%e0%a6%b6%e0%a6%95/",  # Miticide
    "https://mimpexbd.com/product-category/%e0%a6%9b%e0%a6%a4%e0%a7%8d%e0%a6%b0%e0%a6%be%e0%a6%95%e0%a6%a8%e0%a6%be%e0%a6%b6%e0%a6%95/",  # Fungicide
    "https://mimpexbd.com/product-category/%e0%a6%86%e0%a6%97%e0%a6%be%e0%a6%9b%e0%a6%be%e0%a6%a8%e0%a6%be%e0%a6%b6%e0%a6%95/",  # Herbicide
    "https://mimpexbd.com/product-category/%e0%a6%b8%e0%a6%be%e0%a6%b0-%e0%a6%aa%e0%a6%bf%e0%a6%9c%e0%a6%bf%e0%a6%86%e0%a6%b0/",  # PGR/Fertilizer
    "https://mimpexbd.com/product-category/%e0%a6%8f%e0%a6%95%e0%a7%81%e0%a7%9f%e0%a6%be%e0%a6%95%e0%a6%be%e0%a6%b2%e0%a6%9a%e0%a6%be%e0%a6%b0-%e0%a6%aa%e0%a6%a3%e0%a7%8d%e0%a6%af/",  # Aquaculture
]

# Allow running without Django on PATH for dry-run inspection
BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))


def fetch_html(url: str) -> str:
    """Fetch HTML from URL with retry logic"""
    try:
        resp = requests.get(url, timeout=TIMEOUT, headers={"User-Agent": "MimpexMigrationBot/1.0"})
        resp.raise_for_status()
        return resp.text
    except Exception as e:
        print(f"  ⚠ Failed to fetch {url}: {e}")
        return ""


def extract_products_from_category(html: str, category_url: str) -> list[dict]:
    """Extract products from category page HTML with category info"""
    soup = BeautifulSoup(html, "html.parser")
    products: list[dict] = []

    # Try multiple selectors for product containers
    selectors = [
        ".product-item",
        ".product",
        "[data-product]",
        ".woocommerce-loop-product",
        "li.product",
    ]

    for selector in selectors:
        containers = soup.select(selector)
        if containers:
            print(f"    Found {len(containers)} products using selector '{selector}'")
            for container in containers:
                product = {}

                # Extract product name/title
                name_elem = container.select_one("h2, h3, .product-name, .product-title, a.product-link")
                if name_elem:
                    product["name_bn"] = re.sub(r"\s+", " ", name_elem.get_text(strip=True))
                else:
                    continue

                # Extract product URL
                link_elem = container.select_one("a[href*='product']")
                if link_elem and link_elem.get("href"):
                    href = link_elem["href"]
                    product["legacy_url"] = href if href.startswith("http") else f"{BASE_URL}{href}"

                # Extract description/excerpt
                desc_elem = container.select_one(".product-excerpt, .description, .product-description, p")
                if desc_elem:
                    product["description_bn"] = re.sub(r"\s+", " ", desc_elem.get_text(strip=True))[:500]

                # Store the source category URL for categorization
                product["_category_url"] = category_url

                if "name_bn" in product:
                    products.append(product)

            break  # Use first selector that found products

    return products


def decode_url_category(url: str) -> str:
    """Extract and decode the category name from URL"""
    from urllib.parse import unquote
    
    # Extract the category slug from URL path
    if "product-category/" in url:
        cat = url.split("product-category/")[1].rstrip("/")
        # URL decode the category name
        cat_decoded = unquote(cat)
        return cat_decoded
    return ""


def guess_category_type(product_name: str, category_url: str) -> str:
    """Guess product type from URL category and product name"""
    
    # First, check the URL category path (most reliable)
    url_cat = decode_url_category(category_url)
    name_lower = product_name.lower()
    
    # Map URL categories to product types
    category_keywords = {
        "insecticide": ["কীটনাশক", "insecticide"],
        "fungicide": ["ছত্রাকনাশক", "রোগনাশক", "fungicide", "রোগ"],
        "herbicide": ["আগাছানাশক", "herbicide", "weed"],
        "pgr": ["সার", "pgr", "growth", "পিজিআর", "ethiplus", "ether"],
        "miticide": ["ইন্দুর", "মাইট", "miticide"],
    }
    
    # Check URL category first
    for ptype, keywords in category_keywords.items():
        if any(kw in url_cat.lower() for kw in keywords):
            return ptype
    
    # Fallback: check product name for keywords
    for ptype, keywords in category_keywords.items():
        if any(kw in name_lower for kw in keywords):
            return ptype
    
    # If URL contains aquaculture, return "other" 
    if "aquaculture" in url_cat.lower() or "একুয়া" in url_cat:
        return "other"

    return "other"


def persist_to_django(all_products: list[dict]) -> int:
    """Import products into Django"""
    import os

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mimpex_api.settings")
    import django

    django.setup()

    from products.models import Product, ProductCategory

    count = 0
    duplicates = 0
    
    # Create or get default category
    default_category, _ = ProductCategory.objects.get_or_create(
        slug="imported",
        defaults={"name_en": "Imported Products", "name_bn": "আমদানিকৃত পণ্য"},
    )

    for i, row in enumerate(all_products, start=1):
        matrix_id = f"M_CRAWL_{i:04d}"
        product_type = row.get("product_type", "other")

        try:
            obj, created = Product.objects.update_or_create(
                matrix_id=matrix_id,
                defaults={
                    "name_bn": row.get("name_bn", ""),
                    "description_bn": row.get("description_bn", ""),
                    "product_type": product_type,
                    "category": default_category,
                    "legacy_url": row.get("legacy_url", ""),
                    "is_verified_matrix": False,
                },
            )
            if created:
                count += 1
            else:
                duplicates += 1
        except Exception as e:
            print(f"    Error saving product {matrix_id}: {e}")

    return count, duplicates


def main():
    print("🔍 Crawling mimpexbd.com product categories...\n")

    all_products: list[dict] = []
    
    for url in CRAWL_URLS:
        print(f"📥 Fetching: {url}")
        html = fetch_html(url)
        if not html:
            continue

        products = extract_products_from_category(html, url)
        print(f"  ✓ Extracted {len(products)} products")

        for product in products:
            product["product_type"] = guess_category_type(product.get("name_bn", ""), url)
            all_products.append(product)

        time.sleep(1)  # Be respectful to server

    print(f"\n📊 Total products extracted: {len(all_products)}\n")

    if not all_products:
        print("⚠ No products found. Check selectors or URLs.")
        return

    # Show sample
    print("Sample products:")
    for i, p in enumerate(all_products[:5], 1):
        print(f"  {i}. {p.get('name_bn', 'N/A')[:60]} ({p.get('product_type', 'other')})")

    if "--dry-run" in sys.argv:
        print("\n✓ Dry-run complete. Use --persist to write to database.")
        return

    if "--persist" in sys.argv:
        print("\n💾 Persisting to database...")
        count, dupes = persist_to_django(all_products)
        print(f"✓ Added {count} products (skipped {dupes} duplicates)")
        print("  Products marked as is_verified_matrix=False. Review and verify before publishing.")
    else:
        print("\nℹ Use --persist to write to database (after running migrations)")


if __name__ == "__main__":
    main()
