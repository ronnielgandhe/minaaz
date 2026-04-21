import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { WordRevealRich, staggerContainerVariants, staggerItemVariants } from './AnimationComponents';

const pieces = [
  { name: 'Emerald Drop Earrings', price: '$12,500', image: '/images/minaaz-emerald-earrings.jpg' },
  { name: 'Diamond Necklace', price: '$8,200', image: '/images/diamond-necklace.jpg' },
  { name: 'Chandelier Earrings', price: '$6,800', image: '/images/chandelier-earrings.jpg' },
  { name: 'Gold Gemstone Bracelet', price: '$15,000', image: '/images/gold-bracelet.jpg' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

function PieceCard({ piece }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div ref={ref} variants={staggerItemVariants} className="group cursor-pointer">
      {/* Image with parallax — no clipPath */}
      <div className="aspect-[3/4] overflow-hidden mb-5 bg-[#111]">
        <motion.img
          src={piece.image}
          alt={piece.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          style={{ y: imgY }}
        />
      </div>
      <h3 className="text-[14px] tracking-wide mb-1 font-light">{piece.name}</h3>
      <p className="text-[13px] text-[#c9a96e] font-light">{piece.price}</p>
    </motion.div>
  );
}

export default function Featured() {
  return (
    <section id="collections" className="relative py-20 md:py-32 px-6 md:px-12 bg-[#000000] border-t border-white/5">
      {/* Smooth transition gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#000000] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <motion.span {...fadeUp()} className="text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] block mb-4">
              Our Collection
            </motion.span>
            <WordRevealRich
              as="h2"
              className="text-3xl md:text-5xl tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
              delay={0.05}
            >
              {'Signature '}
              <span className="italic">Pieces</span>
            </WordRevealRich>
          </div>
          <motion.a href="#" {...fadeUp(0.1)} className="text-[11px] tracking-[0.2em] uppercase text-[#c9a96e] hover:text-[#e8d5a8] transition-colors">
            View All →
          </motion.a>
        </div>

        {/* Grid — staggered cascade */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainerVariants(0.12, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {pieces.map((piece) => (
            <PieceCard key={piece.name} piece={piece} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
