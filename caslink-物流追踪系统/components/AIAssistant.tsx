
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { getLogisticsAssistance } from '../services/geminiService';
import { Order, Message, Language } from '../types';
import { translations } from '../i18n/translations';

interface AIAssistantProps {
  orders: Order[];
  lang: Language;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ orders, lang }) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Set initial welcome message based on language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: t.ai_welcome }]);
    }
  }, [lang, messages.length, t.ai_welcome]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await getLogisticsAssistance(userMsg, orders, lang);
      setMessages(prev => [...prev, { role: 'model', text: response || "..." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: lang === 'zh' ? "网络同步错误。" : lang === 'ms' ? "Ralat rangkaian." : "Network error." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#7C2D12] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-4 border-[#F2EBE1]"
      >
        <Bot size={28} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all z-50 ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
      <div className="bg-[#7C2D12] p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot size={20} className="text-amber-200" />
          <span className="text-xs font-bold tracking-widest uppercase">{t.ai_title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-amber-200 transition-colors">
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:text-amber-200 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-[#7C2D12] text-white rounded-tr-none shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.ai_placeholder}
                className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#7C2D12]/10"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#7C2D12] text-white rounded-lg hover:bg-[#5d210d] disabled:opacity-50 transition-colors"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;
