"use client";

import { MessageSquare, X } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  onClick: () => void;
  isOpen: boolean;
};

export function ChatbotIcon({ onClick, isOpen }: Props) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 focus:outline-none z-[60]"
      aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.div>
    </motion.button>
  );
}
