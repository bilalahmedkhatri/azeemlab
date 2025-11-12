"use client";

import dynamic from "next/dynamic";

// Lazy load Chatbot - client-side only
const Chatbot = dynamic(() => import("./Chatbot").then(mod => ({ default: mod.Chatbot })), {
  ssr: false,
  loading: () => null,
});

export function ChatbotLoader() {
  return <Chatbot />;
}
