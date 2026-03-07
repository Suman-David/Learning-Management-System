'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

// ==================== CONFIGURATION ====================
// AI Chatbot Configuration
// Note: Hugging Face Inference API has been deprecated.
// Using intelligent mock responses for demo purposes.
// To enable real AI, integrate with OpenAI, Gemini, or another AI provider.
// ======================================================

// Smart response patterns based on keywords
const RESPONSE_PATTERNS: Array<{keywords: string[]; response: string}> = [
  {
    keywords: ['hi', 'hello', 'hey'],
    response: "Hello! 👋 Welcome to our LMS! I'm here to help you with courses, programming questions, or study tips. What can I assist you with today?"
  },
  {
    keywords: ['course', 'courses', 'learn', 'learning'],
    response: "We offer several great courses:\n• Python Programming - Perfect for beginners\n• AI & Machine Learning - For tech enthusiasts\n• Java Development - Enterprise applications\n• Data Science - Analytics and visualization\n\nWhich one interests you?"
  },
  {
    keywords: ['python', 'programming'],
    response: "Our Python course is excellent for beginners! It covers:\n• Variables, loops, and functions\n• Object-oriented programming\n• Real-world projects\n• Best practices\n\nWould you like to enroll?"
  },
  {
    keywords: ['ai', 'machine learning', 'ml', 'artificial intelligence'],
    response: "The AI & Machine Learning course is one of our most popular! You'll learn:\n• Neural networks basics\n• Deep learning concepts\n• Practical AI applications\n• Hands-on projects\n\nReady to dive into AI?"
  },
  {
    keywords: ['java', 'spring', 'backend'],
    response: "Our Java Development course covers:\n• Core Java fundamentals\n• Spring Boot framework\n• Building REST APIs\n• Enterprise patterns\n\nGreat choice for backend development!"
  },
  {
    keywords: ['data', 'data science', 'analytics', 'pandas'],
    response: "The Data Science course includes:\n• Data analysis with pandas\n• Visualization techniques\n• Statistical methods\n• Machine learning basics\n\nPerfect for data enthusiasts!"
  },
  {
    keywords: ['help', 'support', 'assist'],
    response: "I can help you with:\n📚 Course recommendations\n💻 Programming questions\n📖 Study tips and resources\n🎯 Learning path guidance\n❓ General inquiries\n\nWhat do you need help with?"
  },
  {
    keywords: ['enroll', 'register', 'sign up', 'join'],
    response: "To enroll in a course:\n1. Log in to your account\n2. Browse available courses\n3. Click 'Start Learning' on your chosen course\n4. Begin your learning journey!\n\nNeed help with anything else?"
  },
  {
    keywords: ['password', 'login', 'account', 'forgot'],
    response: "For account issues:\n• Use 'Forgot Password' on the login page\n• Make sure you're using the correct email\n• Check your spam folder for reset emails\n• Contact support if issues persist\n\nIs there anything else I can help with?"
  }
];

// Default responses when no pattern matches
const DEFAULT_RESPONSES = [
  "That's an interesting question! I'd be happy to help. Could you provide more details about what you're looking for?",
  "I understand. Let me know if you need help with course recommendations, programming questions, or anything else!",
  "Thanks for reaching out! I'm here to assist with your learning journey. What specific topic would you like to explore?",
  "Great question! While I process that, feel free to browse our courses or ask about any specific programming topic.",
  "I'm here to help! Whether it's about courses, coding, or study strategies - just let me know what you need."
];

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
    // Get the last user message
    const lastMessage = conversationHistory[conversationHistory.length - 1]?.content.toLowerCase() || '';
    
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find matching response pattern
    for (const pattern of RESPONSE_PATTERNS) {
      if (pattern.keywords.some(keyword => lastMessage.includes(keyword))) {
        return pattern.response;
      }
    }
    
    // Return random default response if no pattern matches
    const randomIndex = Math.floor(Math.random() * DEFAULT_RESPONSES.length);
    return DEFAULT_RESPONSES[randomIndex];
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
