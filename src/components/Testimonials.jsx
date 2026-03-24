import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    text: "The craftsmanship is extraordinary. I've never seen such precision and beauty in a single piece. Minaaz is truly the pinnacle of luxury jewelry.",
    name: 'Sarah Al-Rashidi',
    location: 'Dubai, UAE',
  },
  {
    text: "My engagement ring from Minaaz left everyone breathless. The attention to detail and personal service made the experience unforgettable.",
    name: 'Isabella Moretti',
    location: 'Milan, Italy',
  },
  {
    text: "From bespoke design to final delivery, Minaaz exceeded every expectation. Their artisans are true masters of their craft.",
    name: 'Charlotte Beaumont',
    location: 'Paris, France',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
      {/* Smooth transition gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <motion.span {...fadeUp()} className="text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] block mb-4">
            Testimonials
          </motion.span>
          <motion.div
            {...fadeUp(0.05)}
            className="text-[#c9a96e]/30 text-6xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            &ldquo;
          </motion.div>
        </div>

        <div className="max-w-[800px] mx-auto text-center min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-xl md:text-2xl lg:text-[28px] leading-relaxed font-light text-white/70 mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {testimonials[current].text}
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[12px] tracking-[0.25em] uppercase font-medium mb-1"
              >
                {testimonials[current].name}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[11px] tracking-[0.2em] uppercase text-[#c9a96e]"
              >
                {testimonials[current].location}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-3 mt-10"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-[2px] transition-all duration-500 cursor-pointer ${i === current ? 'bg-[#c9a96e]' : 'bg-white/15'}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
