import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-mimpex-green">404</p>
      <h1 className="mt-2 text-2xl font-bold text-mimpex-green-dark">পৃষ্ঠা পাওয়া যায়নি</h1>
      <p className="mt-2 text-slate-600">আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই।</p>
      <Link href="/" className="btn-primary mt-8">
        হোমে ফিরুন
      </Link>
    </div>
  );
}
