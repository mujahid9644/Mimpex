"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

import { sendChatMessage } from "@/lib/api";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const welcome = "আসসালামু আলাইকুম! আমি মিমপেক্সের ভার্চুয়াল সেলস এক্সিকিউটিভ। কীভাবে সহায়তা করতে পারি?";

function renderMessage(content: string) {
  const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <span key={`${part}-${index}`}>{part}</span>;
    const [, label, href] = match;
    return (
      <Link key={`${href}-${index}`} href={href} className="font-black text-emerald-700 underline underline-offset-4">
        {label}
      </Link>
    );
  });
}

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: welcome }]);
  const [loading, setLoading] = useState(false);

  const apiMessages = useMemo(() => messages.map((message) => ({ role: message.role, content: message.content })), [messages]);

  const sendText = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
      setMessages(next);
      setInput("");
      setLoading(true);

      try {
        const reply = await sendChatMessage(trimmed, next.map((message) => ({ role: message.role, content: message.content })));
        setMessages((current) => [...current, { role: "assistant", content: reply }]);
      } catch (err) {
        const unreachable = err instanceof Error && err.message.includes("Django API is unreachable");
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content:
              unreachable
                ? "দুঃখিত, backend server এর সাথে সংযোগ পাওয়া যাচ্ছে না। অনুগ্রহ করে Django server চালু আছে কি না দেখুন।"
                : "দুঃখিত, এই মুহূর্তে উত্তর তৈরি করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages]
  );

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-6 right-6 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white shadow-2xl shadow-red-950/25 ring-4 ring-white md:h-20 md:w-20"
        aria-label="Open Mimpex virtual sales assistant"
      >
        {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-8 w-8" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="fixed bottom-28 right-4 z-[100] flex h-[min(620px,calc(100vh-9rem))] w-[min(430px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl md:right-6 md:rounded-2xl"
          >
            <header className="bg-gradient-to-r from-emerald-900 to-emerald-700 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-black">মিমপেক্স সেলস এক্সিকিউটিভ</p>
                  <p className="text-xs text-white/75">২৪/৭ পণ্য ও ফসল সহায়তা</p>
                </div>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
              {apiMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-[86%] rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold leading-6 text-white"
                      : "max-w-[90%] rounded-xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700 shadow-sm ring-1 ring-slate-100"
                  }
                >
                  {message.role === "assistant" ? renderMessage(message.content) : message.content}
                </div>
              ))}
              {loading && (
                <div className="flex w-fit gap-1 rounded-xl bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-700" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-700 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-700 [animation-delay:300ms]" />
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 bg-white p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") sendText(input);
                  }}
                  placeholder="আপনার প্রশ্ন লিখুন..."
                  className="h-11 min-w-0 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => sendText(input)}
                  disabled={loading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-emerald-700 text-white disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
