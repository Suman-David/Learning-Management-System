'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

// ==================== CONFIGURATION ====================
// Get your Hugging Face token from: https://huggingface.co/settings/tokens
// Add to your .env.local file: NEXT_PUBLIC_HF_API_TOKEN=your_token_here
const HF_API_TOKEN = process.env.NEXT_PUBLIC_HF_API_TOKEN || '';

// CHOOSE YOUR MODEL (uncomment one):
const MODEL_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1';
// const MODEL_URL = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';
// const MODEL_URL = 'https://api-inference.huggingface.co/models/google/gemma-2b-it';

// SYSTEM PROMPT - Customize how the AI behaves
const SYSTEM_PROMPT = `You are a helpful AI assistant for a Learning Management System (LMS). 
You help students with their courses, answer questions about programming, data science, and AI/ML topics.
Be friendly, concise, and educational. If you don't know something, say so honestly.`;
// ======================================================

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'bot',
          content: "👋 Hi! I'm your LMS Assistant. I can help you with:\n\n• Course questions\n• Programming help\n• Study tips\n• General inquiries\n\nWhat would you like to know?"
        }
      ]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getAIResponse([...messages, { role: 'user', content: userMessage }]);
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch (error) {
      console.error('Chatbot Error:', error);
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('429') || error.message.includes('503')) {
          errorMessage = '⏳ The AI model is warming up. Please wait a moment and try again.';
        } else if (error.message.includes('401')) {
          errorMessage = '🔑 Authentication error. Please check the API token.';
        }
      }
      setMessages(prev => [...prev, { role: 'bot', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = async (conversationHistory: Message[]): Promise<string> => {
    // Build prompt with conversation history
    let prompt = `<s>[INST] ${SYSTEM_PROMPT} [/INST]</s>\n\n`;
    
    conversationHistory.forEach((msg) => {
      if (msg.role === 'user') {
        prompt += `<s>[INST] ${msg.content} [/INST]`;
      } else {
        prompt += ` ${msg.content}</s>\n\n`;
      }
    });

    const response = await fetch(MODEL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      if (response.status === 503) {
        throw new Error('503: Model is loading');
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract generated text
    let generatedText = '';
    if (Array.isArray(data) && data[0]?.generated_text) {
      generatedText = data[0].generated_text;
    } else if (data.generated_text) {
      generatedText = data.generated_text;
    }

    // Clean up the response
    generatedText = generatedText.trim();
    generatedText = generatedText.replace(/\[INST\]|\[\/INST\]|<s>|<\/s>/g, '').trim();
    
    return generatedText || "I'm not sure how to respond to that. Could you rephrase your question?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] font-sans">
      {/* Chat Container */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">🎓 LMS Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-2xl leading-none hover:opacity-80 transition-opacity"
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-2.5 mb-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  msg.role === 'bot' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {msg.role === 'bot' ? '🤖' : '👤'}
                </div>
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'bot'
                    ? 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm">
                  🤖
                </div>
                <div className="flex items-center gap-2 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 flex gap-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your courses..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm outline-none focus:border-indigo-500 transition-colors"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center disabled:opacity-50 hover:scale-105 transition-transform"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[60px] h-[60px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/40 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease;
        }
      `}</style>
    </div>
  );
}
