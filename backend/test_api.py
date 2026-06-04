import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mimpex_api.settings")
django.setup()

from products.models import Product

# Count by type
for ptype in ['insecticide', 'fungicide', 'herbicide', 'pgr', 'other']:
    count = Product.objects.filter(product_type=ptype, is_verified_matrix=True).count()
    print(f"{ptype}: {count}")

# Show first few insecticides
print("\nFirst 10 insecticides:")
for p in Product.objects.filter(product_type='insecticide', is_verified_matrix=True)[:10]:
    print(f"  - {p.name_bn} (matrix_id: {p.matrix_id})")
