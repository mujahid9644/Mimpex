from django.core.management.base import BaseCommand

from products.models import Product
from products.search import embed_text, product_search_text


class Command(BaseCommand):
    help = "Rebuild DB-stored product search embeddings for chatbot and diagnosis matching."

    def handle(self, *args, **options):
        updated = 0
        for product in Product.objects.all().iterator():
            product.embedding = embed_text(product_search_text(product))
            product.save(update_fields=["embedding", "updated_at"])
            updated += 1

        self.stdout.write(self.style.SUCCESS(f"Rebuilt embeddings for {updated} products"))
