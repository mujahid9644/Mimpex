from products.models import Product

from mimpex_api.gemini import analyze_plant_image

from .models import DiagnosticLog


def build_product_matrix_context() -> str:
    lines = []
    for p in Product.objects.filter(is_verified_matrix=True).order_by("matrix_id"):
        use = p.description_bn[:120] if p.description_bn else p.product_type
        lines.append(f"- {p.matrix_id} | {p.name_bn} | {p.formulation} | {use}")
    return "\n".join(lines) or "- M_001 | Sample | N/A | Seed data required"


def run_image_diagnosis(
    image_base64: str,
    mime_type: str,
    client_ip: str | None = None,
    crop_context: str | None = None,
) -> dict:
    context = build_product_matrix_context()
    if crop_context:
        context = f"Selected crop context: {crop_context}\n\n{context}"
    result = analyze_plant_image(image_base64, context, mime_type=mime_type)

    DiagnosticLog.objects.create(
        crop_type=result.get("crop_type", "") or crop_context or "",
        condition=result.get("condition", ""),
        matched_product_id=result.get("matched_product_id", ""),
        raw_response=result,
        client_ip=client_ip,
    )
    return result
