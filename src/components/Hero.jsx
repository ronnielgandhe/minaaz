import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const heroWordVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimatedHeading() {
  const line1 = ['Where', 'Elegance'];
  const line2 = [
    { text: 'Meets', italic: true, gold: true },
    { text: 'Artistry', italic: false, gold: false },
  ];

  return (
    <motion.h1
      className="text-5xl md:text-7xl lg:text-[90px] leading-[0.95] tracking-[-0.02em] mb-8"
      style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
    >
      {line1.map((word, i) => (
        <motion.span
          key={`l1-${i}`}
          custom={i}
          variants={heroWordVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
      <br />
      {line2.map((w, i) => (
        <motion.span
          key={`l2-${i}`}
          custom={i + line1.length}
          variants={heroWordVariants}
          initial="hidden"
          animate="visible"
          className={`${w.gold ? 'text-[#c9a96e]' : ''} ${w.italic ? 'italic' : ''}`}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {w.text}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100vh] min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/diamond-necklace.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/40 to-[#000000]" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-[900px]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] bg-[#c9a96e] mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[11px] md:text-[13px] tracking-[0.4em] uppercase text-[#c9a96e] mb-6 font-light"
        >
          Exquisite Craftsmanship Since 1987
        </motion.p>

        <AnimatedHeading />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/50 text-base md:text-lg max-w-[550px] mx-auto mb-10 font-light leading-relaxed"
        >
          Discover timeless pieces meticulously handcrafted to celebrate
          life's most precious moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#services"
            className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white/80 text-[12px] tracking-[0.25em] uppercase font-light hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-all duration-500"
          >
            Our Services
          </a>
          <a
            href="#collections"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#c9a96e] text-[#000000] text-[12px] tracking-[0.25em] uppercase font-medium hover:bg-[#e8d5a8] transition-all duration-500"
          >
            Explore Collection
          </a>
          <a
            href="#boutique"
            className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white/80 text-[12px] tracking-[0.25em] uppercase font-light hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-all duration-500"
          >
            Visit Us
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
}
