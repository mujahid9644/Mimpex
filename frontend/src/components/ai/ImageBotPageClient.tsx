"use client";

import { useSearchParams } from "next/navigation";
import { ImageBotHub } from "@/components/ai/ImageBotHub";

export function ImageBotPageClient() {
  const searchParams = useSearchParams();
  const cropSlug = searchParams.get("crop") ?? "";

  return <ImageBotHub standalone cropSlug={cropSlug} />;
}
