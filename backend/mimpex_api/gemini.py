import base64
import json
import re

from django.conf import settings

from mimpex_api.prompts import CHATBOT_SYSTEM_PROMPT, IMAGEBOT_SYSTEM_PROMPT

GREETING_WORDS = {"hi", "hello", "hey", "salam", "assalamu alaikum", "আসসালামু আলাইকুম", "হ্যালো", "সালাম"}


def _client():
    if not settings.GEMINI_API_KEY:
        return None
    try:
        import google.generativeai as genai
    except ImportError:
        return None

    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
    except Exception:
        return None
    return genai


def _parse_json(text: str) -> dict:
    text = text.strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
    if fence:
        text = fence.group(1).strip()
    return json.loads(text)


def _normalize_diagnosis(result: dict) -> dict:
    crop = result.get("crop_type") or result.get("Crop Type") or "Unknown"
    disease = result.get("disease_name") or result.get("Disease Name") or result.get("condition") or "Unknown"
    confidence = result.get("confidence_score", result.get("Confidence Score", 0.0))
    try:
        confidence = float(confidence)
    except (TypeError, ValueError):
        confidence = 0.0
    prescription = result.get("bangla_prescription") or result.get("Bangla Prescription") or {}
    if not isinstance(prescription, dict):
        prescription = {"disease_explanation_bn": str(prescription), "dosage": "লেবেল নির্দেশনা অনুযায়ী ব্যবহার করুন।"}
    return {
        "crop_type": crop,
        "disease_name": disease,
        "condition": result.get("condition") or disease,
        "confidence_score": max(0.0, min(confidence, 1.0)),
        "matched_product_id": result.get("matched_product_id") or result.get("Product ID") or "",
        "bangla_prescription": {
            "disease_explanation_bn": prescription.get("disease_explanation_bn", ""),
            "dosage": prescription.get("dosage", ""),
        },
    }


def analyze_plant_image(image_base64: str, product_matrix_context: str, mime_type: str = "image/jpeg") -> dict:
    """ImageBot: vision diagnosis mapped to Mimpex product matrix."""
    genai = _client()
    if genai is None:
        return _mock_diagnosis()

    model = genai.GenerativeModel(model_name=settings.GEMINI_VISION_MODEL, system_instruction=IMAGEBOT_SYSTEM_PROMPT)
    raw = image_base64.split(",", 1)[-1] if "," in image_base64 else image_base64
    image_bytes = base64.b64decode(raw)

    response = model.generate_content(
        [{"mime_type": mime_type, "data": image_bytes}, f"Verified product matrix:\n{product_matrix_context}"],
        generation_config={"response_mime_type": "application/json"},
    )
    return _normalize_diagnosis(_parse_json(response.text))


def chat_reply(messages: list[dict], product_context: str) -> str:
    """Floating chatbot: strict Mimpex sales assistant with greeting-aware fallback."""
    last = str(messages[-1].get("content", "") if messages else "").strip()
    genai = _client()
    if genai is None:
        if _is_greeting(last):
            return "আসসালামু আলাইকুম! আপনি কোন ফসল নিয়ে সহায়তা চান?"
        return (
            "আপনার সমস্যাটি বুঝতে ফসলের নাম, বর্তমান লক্ষণ, গাছের বয়স এবং জমির পরিমাণ লিখুন। "
            "নির্দিষ্ট তথ্য পেলে Mimpex পণ্য ও ডোজ নিয়ে ব্যবহারযোগ্য পরামর্শ দেব।"
        )

    model = genai.GenerativeModel(
        model_name=settings.GEMINI_CHAT_MODEL,
        system_instruction=f"{CHATBOT_SYSTEM_PROMPT}\n\nVerified Mimpex product context:\n{product_context}",
    )
    history = []
    for msg in messages[:-1]:
        role = "user" if msg.get("role") == "user" else "model"
        history.append({"role": role, "parts": [msg.get("content", "")]})

    chat = model.start_chat(history=history)
    response = chat.send_message(last)
    return response.text


def _is_greeting(text: str) -> bool:
    normalized = text.lower().strip(" .,!؟?।")
    return normalized in GREETING_WORDS


def _mock_diagnosis() -> dict:
    return {
        "crop_type": "Rice",
        "disease_name": "Leaf spot or blast-like symptom",
        "condition": "Demo diagnosis - set GEMINI_API_KEY for live Gemini Vision",
        "confidence_score": 0.62,
        "matched_product_id": "oxycob-50-wp",
        "bangla_prescription": {
            "disease_explanation_bn": "ছবিতে পাতার দাগ বা ব্লাস্ট ধরনের উপসর্গ দেখা যাচ্ছে। ধানের এই রোগ দমনে অক্সিকব ৫০ ডাব্লিউ পি অত্যন্ত কার্যকরী। লাইভ Gemini Vision চালু হলে রোগ নির্ণয় আরও নির্ভুল হবে।",
            "dosage": "৭০০ গ্রাম প্রতি একরে।",
        },
    }
