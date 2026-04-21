import { motion } from 'framer-motion';

export default function Marquee() {
  const items = ['Diamonds', 'Gold', 'Sapphires', 'Platinum', 'Emeralds', 'Rubies', 'Pearls', 'Craftsmanship'];

  return (
    <div className="py-8 border-y border-white/5 overflow-hidden bg-[#000000]">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex items-center whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/20 font-light mx-8">
              {item}
            </span>
            <span className="text-[#c9a96e]/30 text-[8px]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
