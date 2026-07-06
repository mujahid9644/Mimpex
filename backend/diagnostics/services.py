from products.models import Product
from products.search import build_ranked_product_context, rank_products

from mimpex_api.gemini import analyze_plant_image

from .models import DiagnosticLog


def build_product_matrix_context() -> str:
    return build_ranked_product_context(limit=30)


def build_product_context_for_query(query: str) -> str:
    return build_ranked_product_context(query=query, limit=20)


def run_image_diagnosis(
    image_base64: str,
    mime_type: str,
    client_ip: str | None = None,
    crop_context: str | None = None,
) -> dict:
    context = build_ranked_product_context(query=crop_context or "", limit=30)
    if crop_context:
        context = f"Selected crop context: {crop_context}\n\n{context}"
    result = analyze_plant_image(image_base64, context, mime_type=mime_type)
    result = ensure_active_matched_product(result, crop_context=crop_context)

    DiagnosticLog.objects.create(
        crop_type=result.get("crop_type", "") or crop_context or "",
        condition=result.get("condition", ""),
        matched_product_id=result.get("matched_product_id", ""),
        raw_response=result,
        client_ip=client_ip,
    )
    return result


def ensure_active_matched_product(result: dict, crop_context: str | None = None) -> dict:
    matched_id = str(result.get("matched_product_id") or "").strip()
    if matched_id and Product.objects.filter(matrix_id=matched_id, is_active=True).exists():
        return result

    query = " ".join(
        str(part or "")
        for part in (
            crop_context,
            result.get("crop_type"),
            result.get("disease_name"),
            result.get("condition"),
            result.get("bangla_prescription", {}).get("disease_explanation_bn")
            if isinstance(result.get("bangla_prescription"), dict)
            else "",
        )
    )
    ranked = rank_products(query, limit=1)
    if ranked:
        result["matched_product_id"] = ranked[0][1].matrix_id
    return result
