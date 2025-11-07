"use client";

import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      transition={{ 
        type: 'spring', 
        stiffness: 120, 
        damping: 15,
        duration: 0.6 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isOpen ? 'close' : 'message'}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ 
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1], // Smooth with slight bounce
            scale: { duration: 0.4 },
            rotate: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
            opacity: { duration: 0.3 }
          }}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
