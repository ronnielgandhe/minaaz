import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { WordRevealRich, staggerContainerVariants } from './AnimationComponents';

const steps = [
  { number: '01', title: 'Design', description: 'Every masterpiece begins with a vision, sketched by our creative directors.' },
  { number: '02', title: 'Selection', description: 'Only the finest gems pass our rigorous 12-point quality assessment.' },
  { number: '03', title: 'Crafting', description: 'Master artisans bring each design to life with decades of expertise.' },
  { number: '04', title: 'Perfection', description: 'Every piece undergoes final inspection to ensure absolute flawlessness.' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const stepItemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Craftsmanship() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section id="craftsmanship" ref={ref} className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* Parallax BG */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] z-0">
        <img src="/images/leaf-earrings.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />
      </motion.div>

      {/* Top gradient for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />
      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <motion.span {...fadeUp()} className="text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] block mb-6">
            The Process
          </motion.span>
          <WordRevealRich
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            delay={0.05}
          >
            {'The Art of '}
            <span className="italic">Creation</span>
          </WordRevealRich>
        </div>

        {/* Steps — staggered cascade */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainerVariants(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={stepItemVariants} className="text-center md:text-left">
              <motion.span
                className="text-[#c9a96e] text-[32px] font-light block mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {step.number}
              </motion.span>
              <h3 className="text-lg tracking-widest uppercase mb-3 font-light">{step.title}</h3>
              <p className="text-white/30 text-sm font-light leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
