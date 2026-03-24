import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { WordRevealRich, staggerContainerVariants, staggerItemVariants } from './AnimationComponents';

const collections = [
  {
    name: 'Éternité',
    description: 'Timeless pieces that transcend generations',
    image: '/images/minaaz-emerald-earrings.jpg',
  },
  {
    name: 'Lumière',
    description: 'Light captured in precious stones',
    image: '/images/diamond-necklace.jpg',
  },
  {
    name: 'Céleste',
    description: 'Inspired by the celestial heavens',
    image: '/images/chandelier-earrings.jpg',
  },
  {
    name: 'Fleur',
    description: "Nature's beauty in every facet",
    image: '/images/leaf-earrings.jpg',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

function CollectionCard({ col }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Parallax: image moves slower than scroll
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      variants={staggerItemVariants}
      className="group relative overflow-hidden cursor-pointer"
    >
      {/* Image with parallax */}
      <div className="aspect-[4/3] overflow-hidden">
        <motion.img
          src={col.image}
          alt={col.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          style={{ y: imgY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3
          className="text-2xl md:text-3xl mb-2 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
        >
          {col.name}
        </h3>
        <p className="text-white/40 text-sm font-light">{col.description}</p>
        <div className="mt-4 flex items-center gap-2 text-[#c9a96e] text-[11px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span>Explore</span>
          <span>→</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Collections() {
  return (
    <section id="collections" className="relative py-20 md:py-32 px-6 md:px-12 bg-[#0a0a0a]">
      {/* Top gradient for smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="h-[1px] bg-[#c9a96e] mx-auto mb-8"
          />
          <motion.span {...fadeUp(0.05)} className="text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] block mb-6">
            Our Collections
          </motion.span>
          <WordRevealRich
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            delay={0.1}
          >
            {'Curated '}
            <span className="italic">Excellence</span>
          </WordRevealRich>
        </div>

        {/* Grid — staggered */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainerVariants(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {collections.map((col) => (
            <CollectionCard key={col.name} col={col} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
