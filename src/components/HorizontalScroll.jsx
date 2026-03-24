import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HorizontalScroll() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-65%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} className="h-[200vh] relative bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x, opacity: textOpacity }} className="whitespace-nowrap">
          <h2
            className="select-none"
            style={{
              fontSize: 'clamp(60px, 12vw, 180px)',
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              fontFamily: "'Playfair Display', serif",
              color: 'rgba(201, 169, 110, 0.15)',
              WebkitTextStroke: '1.5px rgba(201, 169, 110, 0.5)',
            }}
          >
            Designed to be admired, crafted to be{' '}
            <span style={{ color: '#c9a96e', WebkitTextStroke: 'none' }}>
              <em>remembered.</em>
            </span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
