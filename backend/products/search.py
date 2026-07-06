import hashlib
import math
import re
from collections import Counter
from urllib.parse import unquote

from .models import Product

VECTOR_DIMS = 128

BANGLA_ROMAN_MAP = {
    "অ": "o", "আ": "a", "ই": "i", "ঈ": "i", "উ": "u", "ঊ": "u", "ঋ": "ri", "এ": "e", "ঐ": "oi", "ও": "o", "ঔ": "ou",
    "া": "a", "ি": "i", "ী": "i", "ু": "u", "ূ": "u", "ৃ": "ri", "ে": "e", "ৈ": "oi", "ো": "o", "ৌ": "ou",
    "ক": "k", "খ": "kh", "গ": "g", "ঘ": "gh", "ঙ": "ng", "চ": "ch", "ছ": "ch", "জ": "j", "ঝ": "jh", "ঞ": "n",
    "ট": "t", "ঠ": "th", "ড": "d", "ঢ": "dh", "ণ": "n", "ত": "t", "থ": "th", "দ": "d", "ধ": "dh", "ন": "n",
    "প": "p", "ফ": "f", "ব": "b", "ভ": "bh", "ম": "m", "য": "j", "র": "r", "ল": "l", "শ": "sh", "ষ": "sh",
    "স": "s", "হ": "h", "ড়": "r", "ঢ়": "rh", "য়": "y", "ং": "ng", "ঃ": "h", "ঁ": "n", "্": "",
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
}


def bangla_to_roman(text: str) -> str:
    roman = "".join(BANGLA_ROMAN_MAP.get(char, char) for char in text)
    roman = re.sub(r"[^a-zA-Z0-9]+", " ", roman.lower()).strip()
    variants = {roman}
    variants.add(roman.replace("ks", "x"))
    variants.add(roman.replace("sh", "s"))
    variants.add(roman.replace("ph", "f"))
    return " ".join(sorted(variants))


def product_search_text(product: Product) -> str:
    category = product.category.name_bn if product.category else ""
    roman_aliases = " ".join(
        bangla_to_roman(part)
        for part in (product.name_bn, product.formulation, product.active_chemical, product.description_bn)
        if part
    )
    decoded_url = unquote(product.legacy_url or "")
    return " ".join(
        str(part or "")
        for part in (
            product.matrix_id,
            product.name_bn,
            product.name_en,
            product.product_type,
            category,
            product.formulation,
            product.active_chemical,
            product.pack_size,
            " ".join(product.crop_targets or []),
            product.description_bn,
            product.description_en,
            decoded_url,
            roman_aliases,
        )
    )


def tokenize(text: str) -> list[str]:
    return re.findall(r"[\w\u0980-\u09ff]+", text.lower())


def embed_text(text: str) -> list[float]:
    tokens = tokenize(text)
    if not tokens:
        return [0.0] * VECTOR_DIMS

    vector = [0.0] * VECTOR_DIMS
    counts = Counter(tokens)
    for token, count in counts.items():
        digest = hashlib.blake2b(token.encode("utf-8"), digest_size=8).digest()
        bucket = int.from_bytes(digest[:4], "big") % VECTOR_DIMS
        sign = 1.0 if digest[4] % 2 == 0 else -1.0
        vector[bucket] += sign * (1.0 + math.log(count))

    norm = math.sqrt(sum(value * value for value in vector))
    if not norm:
        return vector
    return [round(value / norm, 6) for value in vector]


def cosine_similarity(left: list[float], right: list[float]) -> float:
    if not left or not right or len(left) != len(right):
        return 0.0
    return sum(a * b for a, b in zip(left, right))


def ensure_product_embedding(product: Product) -> list[float]:
    if isinstance(product.embedding, list) and len(product.embedding) == VECTOR_DIMS:
        return product.embedding

    product.embedding = embed_text(product_search_text(product))
    product.save(update_fields=["embedding", "updated_at"])
    return product.embedding


def rank_products(query: str, limit: int = 18):
    query_tokens = set(tokenize(query))
    query_vector = embed_text(query)
    ranked = []

    qs = Product.objects.filter(is_active=True).select_related("category").order_by("matrix_id")
    for product in qs:
        text = product_search_text(product)
        text_tokens = set(tokenize(text))
        lexical = len(query_tokens & text_tokens) / max(len(query_tokens), 1)
        name_tokens = set(tokenize(" ".join([product.matrix_id, product.name_bn, product.name_en, bangla_to_roman(product.name_bn)])))
        name_boost = 1.0 if query_tokens & name_tokens else 0.0
        vector = ensure_product_embedding(product)
        vector_score = cosine_similarity(query_vector, vector)
        score = (0.50 * vector_score) + (0.25 * lexical) + (0.25 * name_boost)
        ranked.append((score, product))

    ranked.sort(key=lambda item: item[0], reverse=True)
    if query.strip():
        selected = [item for item in ranked if item[0] > 0][:limit]
        return selected or ranked[:limit]
    return ranked[:limit]


def build_ranked_product_context(query: str = "", limit: int = 18) -> str:
    lines = []
    for score, product in rank_products(query, limit=limit):
        crops = ", ".join(product.crop_targets or [])
        details = product.description_bn or product.description_en or product.product_type
        lines.append(
            " | ".join(
                [
                    f"{product.matrix_id}",
                    f"name_bn={product.name_bn}",
                    f"name_en={product.name_en}",
                    f"type={product.product_type}",
                    f"formulation={product.formulation}",
                    f"active={product.active_chemical}",
                    f"pack={product.pack_size}",
                    f"crops={crops}",
                    f"stock={product.stock_status}",
                    f"score={score:.3f}",
                    f"details={details[:500]}",
                ]
            )
        )
    return "\n".join(f"- {line}" for line in lines) or "- No active Mimpex products found."
