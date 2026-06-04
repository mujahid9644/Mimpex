"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";

import { submitContact } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      await submitContact({
        name: String(fd.get("name")),
        email: String(fd.get("email")),
        phone: String(fd.get("phone") || ""),
        subject: String(fd.get("subject")),
        message: String(fd.get("message")),
      });
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-pro flex flex-col items-center py-16 text-center"
      >
        <CheckCircle className="h-16 w-16 text-mimpex-green" />
        <p className="mt-4 text-xl font-bold text-mimpex-green-dark">{t.contact.success}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-pro">
      <h3 className="text-xl font-bold text-mimpex-green-dark">{t.contact.formTitle}</h3>
      <p className="mt-1 text-sm text-slate-500">We typically respond within 1–2 business days.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          { name: "name", label: t.contact.name, type: "text", required: true, span: 2 },
          { name: "email", label: t.contact.email, type: "email", required: true, span: 1 },
          { name: "phone", label: t.contact.phone, type: "tel", required: false, span: 1 },
          { name: "subject", label: t.contact.subject, type: "text", required: true, span: 2 },
        ].map((field) => (
          <div key={field.name} className={field.span === 2 ? "sm:col-span-2" : ""}>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">{field.label}</label>
            <input name={field.name} type={field.type} required={field.required} className="input-pro" />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">{t.contact.message}</label>
        <textarea name="message" required rows={5} className="input-pro resize-none" />
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-mimpex-red">Could not submit. Ensure the Django API is running.</p>
      )}
      <button type="submit" disabled={status === "loading"} className="btn-primary mt-6 w-full gap-2 sm:w-auto">
        <Send className="h-4 w-4" />
        {status === "loading" ? "..." : t.contact.submit}
      </button>
    </form>
  );
}
