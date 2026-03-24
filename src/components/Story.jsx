import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { WordRevealRich } from './AnimationComponents';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="story" ref={ref} className="relative py-20 md:py-32 px-6 md:px-12 bg-[#0a0a0a]">
      {/* Top gradient for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image with parallax — no clipPath */}
          <motion.div
            {...fadeUp(0)}
            className="relative overflow-hidden"
          >
            <motion.img
              src="/images/diamond-bracelet.jpg"
              alt="Our story"
              className="w-full aspect-[3/4] object-cover"
              style={{ y: imgY }}
            />
            <div className="absolute inset-0 border border-[#c9a96e]/10 pointer-events-none" />
          </motion.div>

          {/* Text */}
          <div>
            <motion.span
              {...fadeUp(0.1)}
              className="text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] block mb-6"
            >
              Our Heritage
            </motion.span>

            <WordRevealRich
              as="h2"
              className="text-3xl md:text-5xl tracking-tight mb-8 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
              delay={0.15}
            >
              {'A Legacy of'}
              <br />
              <span className="italic">Brilliance</span>
            </WordRevealRich>

            <motion.div
              {...fadeUp(0.3)}
              className="space-y-5 text-white/40 font-light leading-relaxed text-[15px]"
            >
              <p>
                Founded in 1987, Minaaz began as a vision to redefine luxury jewelry.
                Every piece that leaves our atelier carries the weight of decades of
                mastery, passion, and an unwavering commitment to perfection.
              </p>
              <p>
                Our master artisans bring together the rarest gems and the finest metals,
                creating pieces that are not merely worn — they are experienced.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.45)}
              className="mt-10 flex items-center gap-12"
            >
              <div>
                <p className="text-3xl md:text-4xl text-[#c9a96e]" style={{ fontFamily: "'Playfair Display', serif" }}>37+</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mt-1">Years of Excellence</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl text-[#c9a96e]" style={{ fontFamily: "'Playfair Display', serif" }}>10K+</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mt-1">Pieces Crafted</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
