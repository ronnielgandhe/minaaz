import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { WordRevealRich } from './AnimationComponents';

export default function CallToAction() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="boutique" ref={ref} className="relative py-24 md:py-40 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/chandelier-earrings.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
      </motion.div>

      {/* Top/bottom gradient for smooth transitions */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="h-[1px] bg-[#c9a96e] mx-auto mb-8"
        />

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.2 }}
          className="text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] block mb-6"
        >
          Visit Our Boutique
        </motion.span>

        <WordRevealRich
          as="h2"
          className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-8 leading-[1.05]"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          delay={0.2}
        >
          {'Experience '}
          <span className="italic">Luxury</span>
          <br />
          {'In Person'}
        </WordRevealRich>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.4 }}
          className="text-white/40 font-light mb-12 max-w-[500px] mx-auto leading-relaxed"
        >
          Book a private consultation with our jewelry experts and discover
          pieces that resonate with your personal story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#c9a96e] text-[#0a0a0a] text-[12px] tracking-[0.25em] uppercase font-medium hover:bg-[#e8d5a8] transition-all duration-500"
          >
            Book Appointment
          </a>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white/80 text-[12px] tracking-[0.25em] uppercase font-light hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-all duration-500"
          >
            Call Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
