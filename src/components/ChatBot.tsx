import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Minus } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

const quickReplies = [
  'Room availability',
  'Pool hours',
  'Restaurant menu',
  'Airport transfer',
  'Check-in time',
  'Special offers',
  'Talk to a human',
];

const botResponses: Record<string, string> = {
  'room availability': 'We have Deluxe Rooms, Superior Rooms, Family Suites, and the Premium Suite available. Rates start from LKR 15,300/night. Would you like me to check availability for specific dates?',
  'pool hours': 'Our pool is open daily from 7:00 AM to 7:00 PM for hotel guests. Day passes are available for non-guests from 9:00 AM to 5:00 PM. Would you like to book a day pass?',
  'restaurant menu': 'Our restaurant offers a blend of Sri Lankan and international cuisine. Breakfast is served 7:00-10:30 AM, lunch 12:30-3:00 PM, and dinner 7:00-10:30 PM. Shall I share any specific menu section?',
  'airport transfer': 'We offer airport transfers from Bandaranaike International Airport (BIA). The journey takes approximately 3-4 hours. We can also arrange transfers from Colombo city. Would you like to book a transfer?',
  'check-in time': 'Check-in time is 2:00 PM and check-out is 11:00 AM. Early check-in and late check-out can be arranged subject to availability. Need anything else?',
  'special offers': 'We currently have exciting offers including Early Bird discounts (20% off for bookings 30+ days ahead), Honeymoon Packages, and Weekend Getaway deals. Visit our Offers page for full details!',
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('talk to a human') || lower.includes('human') || lower.includes('real person') || lower.includes('agent') || lower.includes('staff')) {
    return "I'll connect you with our team right away! Click here to chat with us on WhatsApp: https://wa.me/94770557257?text=Hi%20Amaluna%2C%20I%27d%20like%20to%20speak%20with%20someone — or call us at +94 77 055 7257.";
  }
  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key)) return response;
  }
  return "Thank you for your message! Our team will get back to you shortly. For immediate assistance, please call us at +94 31 223 0000 or use WhatsApp.";
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Amaluna Resorts. I'm your virtual concierge. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getResponse(text),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
        className={`fixed bottom-24 right-4 z-50 h-14 w-14 rounded-full shadow-luxury-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? 'bg-gray-800 rotate-0' : 'bg-gradient-to-r from-amber-600 to-yellow-500'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse" />
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-40 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-luxury-xl overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-14' : 'h-[480px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-dark text-white p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="h-8 w-8 p-1.5 bg-amber-500/20 rounded-lg" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-400 rounded-full border-2 border-gray-900" />
              </div>
              <div>
                <p className="font-heading font-bold text-base text-white">Amaluna Concierge</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1"><span className="inline-block h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>Online now</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Minus className="h-5 w-5" />
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-[340px] overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-br-md'
                          : 'bg-white text-gray-700 shadow-sm rounded-bl-md'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-amber-100' : 'text-gray-400'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 bg-gray-300 rounded-full animate-typing-dot" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 bg-gray-300 rounded-full animate-typing-dot" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 bg-gray-300 rounded-full animate-typing-dot" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Replies */}
                {messages.length <= 2 && !isTyping && (
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map(reply => (
                      <button
                        key={reply}
                        onClick={() => sendMessage(reply)}
                        className="px-3 py-1.5 bg-white border border-amber-200 rounded-full text-xs font-medium text-amber-700 hover:bg-amber-50 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 rounded-full text-sm outline-none focus:bg-gray-100 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white flex items-center justify-center disabled:opacity-40 hover:shadow-gold transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
