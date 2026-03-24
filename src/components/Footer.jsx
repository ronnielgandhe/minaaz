import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemFadeUp } from './AnimationComponents';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0a0a0a] border-t border-[#1a1a1a]">
      {/* Top: Brand centered */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-16 pb-16 border-b border-[#1a1a1a]"
        >
          <h3
            className="text-3xl md:text-4xl tracking-[0.4em] uppercase mb-2"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Minaaz
          </h3>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-6">
            The House of Jewelry
          </p>
          <p className="text-white/30 text-sm font-light leading-relaxed max-w-[400px] mx-auto">
            Crafting timeless luxury since 1987. Each piece is a masterwork of passion and precision.
          </p>
        </motion.div>

        {/* Links Grid - staggered columns */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16 text-center max-w-[900px] mx-auto"
          variants={staggerContainerVariants(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={staggerItemFadeUp}>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-6">Collections</h4>
            <ul className="space-y-3">
              {['Eternite', 'Lumiere', 'Celeste', 'Fleur', 'Bespoke'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/30 text-sm font-light hover:text-[#c9a96e] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItemFadeUp}>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-6">Services</h4>
            <ul className="space-y-3">
              {['Custom Design', 'Restoration', 'Appraisal', 'Engraving', 'Gift Cards'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/30 text-sm font-light hover:text-[#c9a96e] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItemFadeUp}>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-6">Stay Connected</h4>
            <p className="text-white/30 text-sm font-light mb-5">
              Receive exclusive previews and invitations.
            </p>
            <div className="flex border border-[#2a2a2a] focus-within:border-[#c9a96e]/30 transition-colors max-w-[280px] mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white/70 outline-none placeholder:text-white/20 font-light"
              />
              <button className="px-5 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-colors text-sm cursor-pointer">
                →
              </button>
            </div>
            <div className="flex gap-4 mt-8 justify-center flex-wrap">
              {['Instagram', 'Pinterest', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[9px] tracking-[0.15em] uppercase text-white/20 hover:text-[#c9a96e] transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-white/20 text-[11px] tracking-[0.1em] font-light">
            &copy; 2026 Minaaz — The House of Jewelry. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/20 text-[11px] tracking-[0.1em] font-light hover:text-white/50 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
