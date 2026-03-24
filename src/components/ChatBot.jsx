import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Pattern-matching response engine ──────────────────────────────
const RESPONSES = [
  {
    patterns: [/\bhello\b/i, /\bhi\b/i, /\bhey\b/i, /\bgood\s*(morning|afternoon|evening)\b/i, /\bgreetings\b/i],
    reply: "Welcome to Minaaz, The House of Jewelry. It is a pleasure to have you here. How may I assist you in finding something truly extraordinary today?",
    chips: ["View Collections", "Book Appointment", "Pricing Info"],
  },
  {
    patterns: [/collection/i, /\bcollections\b/i, /\bview collections\b/i, /what.*sell/i, /what.*offer/i, /what.*have/i, /\bjewelry\b/i, /\bjewellery\b/i, /\bpieces\b/i, /\bcatalog/i],
    reply: "Our maison presents four signature collections, each a testament to timeless artistry:\n\n\u2022 **\u00c9ternit\u00e9** \u2014 Timeless diamond solitaires & eternity bands symbolizing everlasting love.\n\u2022 **Lumi\u00e8re** \u2014 Radiant gemstone pieces that capture and reflect light in mesmerizing ways.\n\u2022 **C\u00e9leste** \u2014 Celestial-inspired designs with sapphires, moonstones & star motifs.\n\u2022 **Fleur** \u2014 Botanical elegance with nature-inspired gold filigree & floral diamonds.\n\nWould you like to explore a particular collection?",
    chips: ["\u00c9ternit\u00e9", "Lumi\u00e8re", "C\u00e9leste", "Fleur"],
  },
  {
    patterns: [/\b[ée]ternit[ée]\b/i, /eternity/i, /solitaire/i],
    reply: "The **\u00c9ternit\u00e9** collection embodies enduring devotion. Each piece features GIA-certified diamonds set in platinum or 18K gold, with designs ranging from classic solitaire engagement rings to breathtaking eternity bands. Our master artisans ensure every stone is placed to maximize brilliance.\n\nShall I arrange a private viewing?",
    chips: ["Book Appointment", "Pricing Info"],
  },
  {
    patterns: [/\blumi[èe]re\b/i, /\bgemstone/i, /\bruby\b/i, /\bemerald\b/i, /\bsapphire\b/i],
    reply: "The **Lumi\u00e8re** collection celebrates the world\u2019s most exceptional gemstones \u2014 Burmese rubies, Colombian emeralds, and Ceylon sapphires \u2014 each hand-selected for its extraordinary color and clarity. These are statement pieces for those who appreciate nature\u2019s rarest treasures.\n\nWould you like to learn about a specific gemstone?",
    chips: ["Book Appointment", "Pricing Info"],
  },
  {
    patterns: [/\bc[ée]leste\b/i, /\bcelestial\b/i, /\bmoonstone\b/i, /\bstar\b/i],
    reply: "The **C\u00e9leste** collection draws inspiration from the night sky. Featuring Kashmir sapphires, luminous moonstones, and diamond star motifs set in white gold, each piece evokes the mystery and romance of the cosmos. A favorite among collectors and connoisseurs.\n\nWould you like to schedule a private viewing?",
    chips: ["Book Appointment", "Pricing Info"],
  },
  {
    patterns: [/\bfleur\b/i, /\bfloral\b/i, /\bbotanical\b/i, /\bnature\b/i, /\bfiligree\b/i],
    reply: "The **Fleur** collection is a celebration of nature\u2019s delicate beauty. Intricate gold filigree, pav\u00e9-set diamonds, and organic silhouettes bring flowers and vines to life in 18K rose and yellow gold. Each piece is a wearable garden of unparalleled craftsmanship.\n\nShall I arrange a consultation?",
    chips: ["Book Appointment", "Pricing Info"],
  },
  {
    patterns: [/pric/i, /cost/i, /how much/i, /expensive/i, /afford/i, /budget/i, /range/i, /pricing info/i],
    reply: "Our curated pieces range from $2,000 for delicate everyday gold designs to $50,000 and beyond for our haute joaillerie creations. Each Minaaz piece is an investment in enduring beauty and exceptional craftsmanship.\n\nFor personalized pricing and to explore options within your desired range, I recommend a private consultation with one of our jewelry specialists.",
    chips: ["Book Appointment", "Custom Design"],
  },
  {
    patterns: [/hour/i, /open/i, /when.*open/i, /timing/i, /schedule/i, /what time/i, /close/i],
    reply: "We welcome you at our atelier during the following hours:\n\n\u2022 **Monday \u2013 Saturday:** 10:00 AM \u2013 8:00 PM\n\u2022 **Sunday:** By private appointment only\n\nFor an unhurried, personalized experience, we recommend booking a private consultation.",
    chips: ["Book Appointment", "Get Directions"],
  },
  {
    patterns: [/locat/i, /where/i, /address/i, /direction/i, /find.*you/i, /get directions/i, /visit/i, /store/i, /showroom/i, /atelier/i],
    reply: "Our flagship atelier is located at:\n\n**123 Luxury Avenue, Beverly Hills, CA 90210**\n\nNestled in the heart of Beverly Hills\u2019 renowned luxury district, our space offers an intimate and elegant setting for discovering your perfect piece. Complimentary valet parking is available.\n\nWould you like to schedule a visit?",
    chips: ["Book Appointment", "Store Hours"],
  },
  {
    patterns: [/custom/i, /bespoke/i, /design.*own/i, /person.*design/i, /commission/i, /made to order/i, /custom design/i],
    reply: "Our **Bespoke Atelier** brings your vision to life. The custom design journey includes:\n\n\u2022 A personal consultation with our master designer\n\u2022 Hand-sketched concepts & 3D renderings\n\u2022 Selection of ethically sourced stones\n\u2022 Master-crafted creation over 6\u201312 weeks\n\u2022 A lifetime of care and maintenance\n\nEvery bespoke creation is a singular work of art. Shall I arrange a design consultation?",
    chips: ["Book Appointment", "View Collections"],
  },
  {
    patterns: [/appoint/i, /book/i, /consult/i, /meeting/i, /private/i, /reserve/i, /book appointment/i],
    reply: "I would be delighted to arrange a private consultation for you. Our specialists offer an unhurried, personalized experience tailored to your desires.\n\nYou may book directly through the following:\n\n\u2022 **Phone:** +1 (310) 555-0187\n\u2022 **Email:** concierge@minaaz.com\n\u2022 **Online:** minaaz.com/appointments\n\nIs there a particular collection or occasion you\u2019d like to explore?",
    chips: ["View Collections", "Custom Design"],
  },
  {
    patterns: [/return/i, /warranty/i, /guarantee/i, /repair/i, /insur/i, /care/i, /maintenance/i, /clean/i],
    reply: "Every Minaaz creation is accompanied by our commitment to excellence:\n\n\u2022 **Lifetime Warranty** against manufacturing defects\n\u2022 **Complimentary Cleaning** & professional inspection annually\n\u2022 **30-Day Exchange** policy for unworn pieces\n\u2022 **Insurance Appraisal** documentation included\n\u2022 **Resizing & Engraving** services available\n\nYour piece is not merely jewelry \u2014 it is an heirloom, and we are devoted to its care for generations.",
    chips: ["Book Appointment", "Contact Us"],
  },
  {
    patterns: [/contact/i, /email/i, /phone/i, /call/i, /reach/i, /contact us/i],
    reply: "We are always at your service:\n\n\u2022 **Phone:** +1 (310) 555-0187\n\u2022 **Email:** concierge@minaaz.com\n\u2022 **WhatsApp:** +1 (310) 555-0188\n\nOur concierge team is available Monday through Saturday, 9:00 AM \u2013 9:00 PM. We look forward to hearing from you.",
    chips: ["Book Appointment", "Store Hours"],
  },
  {
    patterns: [/engag/i, /wedding/i, /ring/i, /propos/i, /bridal/i, /marriage/i],
    reply: "How wonderful \u2014 congratulations on this beautiful milestone. Minaaz specializes in crafting engagement rings and bridal jewelry that become cherished symbols of your love story.\n\nFrom timeless solitaires to bespoke designs, our specialists will guide you to the perfect piece. We also offer a **Private Bridal Suite** experience for couples.\n\nShall I arrange a consultation?",
    chips: ["Book Appointment", "\u00c9ternit\u00e9 Collection", "Custom Design"],
  },
  {
    patterns: [/gift/i, /anniversary/i, /birthday/i, /present/i, /occasion/i, /special/i],
    reply: "A Minaaz piece is the ultimate expression of thoughtfulness and taste. Our concierge team specializes in curating the perfect gift for any occasion:\n\n\u2022 Anniversaries & milestones\n\u2022 Birthdays & celebrations\n\u2022 Corporate gifts & recognition\n\nEach piece arrives in our signature midnight-blue box with white silk ribbon. Shall I help you find the perfect gift?",
    chips: ["View Collections", "Pricing Info", "Book Appointment"],
  },
  {
    patterns: [/thank/i, /thanks/i, /thx/i],
    reply: "It is my absolute pleasure. Should you ever need assistance, the Minaaz concierge is always here for you. We look forward to welcoming you to our atelier.",
    chips: ["View Collections", "Book Appointment"],
  },
  {
    patterns: [/shipping/i, /deliver/i, /ship/i, /international/i],
    reply: "Minaaz offers worldwide delivery with the utmost care:\n\n\u2022 **Complimentary Insured Shipping** on all orders\n\u2022 **White-Glove Delivery** for pieces over $10,000\n\u2022 **International Shipping** to over 40 countries\n\u2022 **Discreet Packaging** in our signature presentation box\n\nAll shipments are fully insured and require a signature upon delivery.",
    chips: ["Pricing Info", "Book Appointment"],
  },
];

const DEFAULT_RESPONSE = {
  reply: "Thank you for your interest in Minaaz. For the most personalized assistance, I recommend speaking directly with one of our jewelry specialists:\n\n\u2022 **Phone:** +1 (310) 555-0187\n\u2022 **Email:** concierge@minaaz.com\n\nIs there anything else I can help you with?",
  chips: ["View Collections", "Book Appointment", "Pricing Info"],
};

function getResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  for (const entry of RESPONSES) {
    for (const pattern of entry.patterns) {
      if (pattern.test(msg)) {
        return { reply: entry.reply, chips: entry.chips || [] };
      }
    }
  }
  return { reply: DEFAULT_RESPONSE.reply, chips: DEFAULT_RESPONSE.chips };
}

// ── Simple markdown-ish renderer (bold only) ─────────────────────
function renderMessage(text) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return <strong key={j} className="text-[#c9a96e] font-medium">{seg.slice(2, -2)}</strong>;
      }
      return <span key={j}>{seg}</span>;
    });
    return (
      <span key={i}>
        {parts}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    );
  });
}

// ── Typing indicator dots ────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-7 h-7 rounded-full bg-[#c9a96e] flex items-center justify-center flex-shrink-0">
        <span className="text-[#0a0a0a] text-[10px] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>M</span>
      </div>
      <div className="bg-[#141414] border-l-2 border-[#c9a96e] rounded-lg rounded-tl-none px-4 py-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full inline-block"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Chat icon SVG ────────────────────────────────────────────────
function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ── Main ChatBot component ───────────────────────────────────────
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Send welcome message on first open
  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: Date.now(),
            from: 'bot',
            text: "Welcome to Minaaz. I'm your personal jewelry concierge. How may I assist you today?",
            chips: ["View Collections", "Book Appointment", "Pricing Info"],
          },
        ]);
      }, 800);
      return () => clearTimeout(timer);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, hasOpened]);

  const addBotResponse = useCallback((userText) => {
    setIsTyping(true);
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const { reply, chips } = getResponse(userText);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), from: 'bot', text: reply, chips },
      ]);
    }, delay);
  }, []);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: 'user', text }]);
    setInput('');
    addBotResponse(text);
  }, [input, isTyping, addBotResponse]);

  const handleChipClick = useCallback((chip) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: 'user', text: chip }]);
    addBotResponse(chip);
  }, [isTyping, addBotResponse]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div className="fixed bottom-0 right-0 z-[100]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Chat Panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="absolute bottom-20 right-4 w-[380px] h-[520px] bg-[#0a0a0a] border border-[#c9a96e]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,169,110,0.08)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#c9a96e]/15 bg-[#0e0e0e]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#a3823d] flex items-center justify-center">
                  <span className="text-[#0a0a0a] text-sm font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>M</span>
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Minaaz Concierge
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    <span className="text-[#888] text-[10px] tracking-wide uppercase">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#666] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {msg.from === 'bot' ? (
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-7 h-7 rounded-full bg-[#c9a96e] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#0a0a0a] text-[10px] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>M</span>
                      </div>
                      <div className="max-w-[85%]">
                        <div className="bg-[#141414] border-l-2 border-[#c9a96e] rounded-lg rounded-tl-none px-4 py-3 text-[13px] text-[#d4d4d4] leading-relaxed">
                          {renderMessage(msg.text)}
                        </div>
                        {msg.chips && msg.chips.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2.5">
                            {msg.chips.map((chip) => (
                              <button
                                key={chip}
                                onClick={() => handleChipClick(chip)}
                                className="text-[11px] px-3 py-1.5 rounded-full border border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e]/60 transition-all duration-200 cursor-pointer"
                              >
                                {chip}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end mb-4">
                      <div className="max-w-[80%] bg-[#c9a96e] text-[#0a0a0a] rounded-lg rounded-tr-none px-4 py-3 text-[13px] leading-relaxed font-medium">
                        {msg.text}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[#c9a96e]/15 bg-[#0e0e0e]">
              <div className="flex items-center gap-2 bg-[#141414] rounded-xl px-4 py-2 border border-[#c9a96e]/10 focus-within:border-[#c9a96e]/30 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-white text-[13px] placeholder-[#555] outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="text-[#c9a96e] disabled:text-[#333] hover:text-white transition-colors p-1 cursor-pointer disabled:cursor-default"
                >
                  <SendIcon />
                </button>
              </div>
              <p className="text-center text-[9px] text-[#444] mt-2 tracking-wide">
                Minaaz AI Concierge
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Button ────────────────────────────────────── */}
      <div className="p-4">
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#a3823d] text-[#0a0a0a] flex items-center justify-center shadow-lg cursor-pointer"
          style={{ boxShadow: '0 8px 32px rgba(201,169,110,0.35)' }}
        >
          {/* Pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#c9a96e]"
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CloseIcon />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChatIcon />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
