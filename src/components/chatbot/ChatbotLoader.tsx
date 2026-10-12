"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

// Load the chat UI and animation library only when the visitor asks to chat.
const ChatbotWindow = dynamic(() => import('./ChatbotWindow').then(mod => mod.ChatbotWindow), {
  ssr: false,
  loading: () => <div role="status" className="fixed bottom-24 right-4 z-[60] rounded-xl border border-border bg-card p-6 shadow-lg">Opening assistant…</div>,
});

export function ChatbotLoader() {
  const [isOpen, setIsOpen] = useState(false);
  return <>
    <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'} aria-expanded={isOpen} className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 z-[60]"><MessageSquare size={24} /></button>
    {isOpen && <ChatbotWindow onClose={() => setIsOpen(false)} />}
  </>;
}
