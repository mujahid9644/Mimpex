"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isChunkError =
    error.message?.includes("Cannot find module") ||
    error.message?.includes("ChunkLoadError");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-emerald-900">কিছু একটা সমস্যা হয়েছে</h1>
      {isChunkError ? (
        <p className="mt-3 max-w-lg text-slate-600">
          ডেভেলপমেন্ট ক্যাশ পুরোনো হয়ে গেছে (Windows-এ এটি সাধারণ). ডেভ সার্ভার বন্ধ করুন (Ctrl+C), তারপর চালান:{" "}
          <code className="rounded bg-slate-100 px-2 py-1 text-sm">npm run dev:fresh</code>
        </p>
      ) : (
        <p className="mt-2 max-w-md text-slate-600">{error.message}</p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary inline-flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          আবার চেষ্টা করুন
        </button>
        <Link href="/" className="btn-outline">
          হোম
        </Link>
      </div>
    </div>
  );
}
