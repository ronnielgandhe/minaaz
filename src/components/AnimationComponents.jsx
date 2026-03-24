import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * WordReveal — animates each word of a heading one by one.
 * Wrap your heading text as children (string).
 */
export function WordReveal({ children, className, style, as = 'h2', delay = 0 }) {
  const Tag = motion[as] || motion.h2;
  const text = typeof children === 'string' ? children : '';

  // Split by space but preserve structure
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Tag
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

/**
 * WordRevealRich — animates children that are a mix of strings and JSX spans.
 * Splits strings into words and passes through JSX elements as-is (each animated as a unit).
 */
export function WordRevealRich({ children, className, style, as = 'h2', delay = 0 }) {
  const Tag = motion[as] || motion.h2;

  // Flatten children into an array of word-level items
  const items = [];
  const childArray = Array.isArray(children) ? children : [children];
  childArray.forEach((child) => {
    if (typeof child === 'string') {
      child.split(' ').filter(Boolean).forEach((word) => items.push({ type: 'text', value: word }));
    } else if (child && child.type === 'br') {
      items.push({ type: 'br' });
    } else if (child) {
      items.push({ type: 'jsx', value: child });
    }
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Tag
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {items.map((item, i) => {
        if (item.type === 'br') return <br key={i} />;
        return (
          <motion.span
            key={i}
            variants={wordVariants}
            style={{ display: 'inline-block', marginRight: '0.3em' }}
          >
            {item.value}
          </motion.span>
        );
      })}
    </Tag>
  );
}

/**
 * ImageReveal — clip-path mask reveal effect on images.
 * Slides open from center horizontally.
 */
export function ImageReveal({ src, alt, className, style, delay = 0 }) {
  return (
    <motion.div
      style={{ overflow: 'hidden', ...style }}
      initial={{ clipPath: 'inset(0 50% 0 50%)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0%)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={src} alt={alt || ''} className={className} />
    </motion.div>
  );
}

/**
 * ParallaxImage — image with subtle scroll-linked parallax.
 */
export function ParallaxImage({ src, alt, className, parallaxAmount = 40 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallaxAmount, -parallaxAmount]);

  return (
    <div ref={ref} className="overflow-hidden" style={{ position: 'relative' }}>
      <motion.img
        src={src}
        alt={alt || ''}
        className={className}
        style={{ y }}
      />
    </div>
  );
}

/**
 * Stagger container variants for use with motion.div
 */
export const staggerContainerVariants = (staggerDelay = 0.12, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/**
 * Stagger item — fade up + scale for grid items
 */
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Stagger item — fade up only (no scale)
 */
export const staggerItemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
