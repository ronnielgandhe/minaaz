import { motion } from 'framer-motion';
import { WordRevealRich, staggerContainerVariants, staggerItemVariants } from './AnimationComponents';

const DiamondIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 3h12l4 6-10 12L2 9z" />
    <path d="M11 3 9 9l3 12 3-12-2-6" />
    <path d="M2 9h20" />
  </svg>
);

const CoinsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="12" cy="6" rx="8" ry="2.5" />
    <path d="M4 6v5c0 1.5 3.6 2.7 8 2.7s8-1.2 8-2.7V6" />
    <path d="M4 11v5c0 1.5 3.6 2.7 8 2.7s8-1.2 8-2.7v-5" />
  </svg>
);

const LoupeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="10" cy="10" r="6.5" />
    <path d="m15 15 5.5 5.5" />
    <path d="m7.5 8 2.5 2.5L12.5 8" />
  </svg>
);

const services = [
  {
    title: 'Custom Jewelry Design',
    description: 'Bespoke pieces crafted to your vision, alongside a curated selection of timeless designs.',
    Icon: DiamondIcon,
  },
  {
    title: 'Cash for Gold',
    description: 'Instant valuations and fair offers on gold, diamonds, and fine jewelry.',
    Icon: CoinsIcon,
  },
  {
    title: 'Jewelry Repair & Restoration',
    description: 'Expert resizing, restringing, and restoration by master craftsmen.',
    Icon: LoupeIcon,
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-32 px-6 md:px-12 bg-[#000000] border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#000000] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="h-[1px] bg-[#c9a96e] mx-auto mb-8"
          />
          <motion.span {...fadeUp(0.05)} className="text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] block mb-6">
            Our Services
          </motion.span>
          <WordRevealRich
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            delay={0.1}
          >
            {'Crafted '}
            <span className="italic">For You</span>
          </WordRevealRich>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainerVariants(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={staggerItemVariants}
              className="group relative p-10 border border-white/10 hover:border-[#c9a96e]/40 transition-colors duration-500"
            >
              <s.Icon className="w-10 h-10 text-[#c9a96e] mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3
                className="text-2xl md:text-3xl mb-4 tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
              >
                {s.title}
              </h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">{s.description}</p>
              <div className="mt-6 h-[1px] w-8 bg-[#c9a96e] group-hover:w-16 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
