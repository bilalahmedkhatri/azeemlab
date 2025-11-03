"use client";

import { useState } from 'react';
import { ChatbotIcon } from './ChatbotIcon';
import { ChatbotWindow } from './ChatbotWindow';
import { AnimatePresence } from 'framer-motion';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatbotIcon onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <AnimatePresence>
        {isOpen && <ChatbotWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
