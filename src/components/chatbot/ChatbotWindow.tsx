"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

type QuickReply = {
    text: string;
    payload: string;
}

export function ChatbotWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    setMessages([{ text: "Hello! I'm an AI assistant from AzeemLab. How can I help you with your project today?", sender: 'bot' }]);
  }, []);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (messageText.trim() === '' || isLoading) return;

    const userMessage: Message = { text: messageText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    if (!text) {
        setInput('');
    }
    setShowQuickReplies(false);
    setIsLoading(true);

    try {
      // Call the backend API with conversation history
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageText,
          history: messages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const botResponse: Message = { text: data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = { 
        text: error instanceof Error ? error.message : "Sorry, I'm having trouble connecting right now. Please try again or reach out via our contact form.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies: QuickReply[] = [
      { text: "What services do you offer?", payload: "What services do you offer?" },
      { text: "Show me your portfolio", payload: "Show me your portfolio" },
      { text: "How can I contact you?", payload: "How can I contact you?" },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-96 h-[70vh] max-h-[600px] bg-card shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-border/50 z-[60]"
    >
      <header className="bg-card p-4 flex justify-between items-center border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-8 h-8 text-primary" />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-card"></span>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full -mr-1">
          <X size={20} />
        </button>
      </header>
      <div className="flex-1 p-4 overflow-y-auto bg-background/50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 my-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-1" />}
            <div className={`rounded-xl p-3 max-w-[85%] text-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              <p>{msg.text}</p>
            </div>
            {msg.sender === 'user' && <User className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 my-4">
            <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="rounded-xl p-3 bg-muted text-muted-foreground">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        {showQuickReplies && (
            <div className="flex flex-col items-start gap-2 mt-4">
                {quickReplies.map(reply => (
                    <button 
                        key={reply.payload} 
                        onClick={() => handleSend(reply.payload)}
                        className="bg-muted hover:bg-muted/80 text-foreground text-sm px-4 py-2 rounded-full transition-colors"
                    >
                        {reply.text}
                    </button>
                ))}
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t border-border/50 bg-card">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            }}
            placeholder="Type a message..."
            className="w-full p-2 pr-12 border-none rounded-lg bg-input text-foreground resize-none focus:outline-none focus:ring-0"
            rows={1}
          />
          <button 
            onClick={() => handleSend()} 
            className="absolute right-2 bottom-2.5 bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground mr-2"
            disabled={!input.trim() || isLoading}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
            Powered by OpenRouter AI
        </p>
      </div>
    </motion.div>
  );
}
