import { Suspense } from "react";
import { ImageBotPageClient } from "@/components/ai/ImageBotPageClient";

function ImageBotLoading() {
  return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
}

export default function ImageBotPage() {
  return (
    <Suspense fallback={<ImageBotLoading />}>
      <ImageBotPageClient />
    </Suspense>
  );
}
