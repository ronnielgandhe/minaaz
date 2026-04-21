import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { WordRevealRich } from './AnimationComponents';

const STORE = {
  name: 'Minaaz — The House of Jewelry',
  tagline: 'Jeweler in Vaughan, Ontario',
  address: '3255 Rutherford Rd, Vaughan, ON L4K 5Y5',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Minaaz+The+House+of+Jewelry+3255+Rutherford+Rd+Vaughan',
};

function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', message: '' });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-[#c9a96e]/30 p-10 text-center">
        <p className="text-[#c9a96e] text-[11px] tracking-[0.3em] uppercase mb-4">Thank You</p>
        <p className="text-white/70 font-light leading-relaxed">
          We've received your appointment request. Our team will reach out shortly to confirm.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full bg-transparent border-b border-white/15 focus:border-[#c9a96e] text-white placeholder:text-white/30 py-3 px-1 text-sm font-light outline-none transition-colors duration-300';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          type="text"
          required
          placeholder="Full Name"
          value={form.name}
          onChange={update('name')}
          className={inputClass}
        />
        <input
          type="email"
          required
          placeholder="Email Address"
          value={form.email}
          onChange={update('email')}
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={update('phone')}
          className={inputClass}
        />
        <input
          type="date"
          required
          value={form.date}
          onChange={update('date')}
          className={`${inputClass} text-white/80`}
        />
      </div>
      <textarea
        rows={3}
        placeholder="Tell us what you're looking for (optional)"
        value={form.message}
        onChange={update('message')}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-[#c9a96e] text-[#000000] text-[12px] tracking-[0.25em] uppercase font-medium hover:bg-[#e8d5a8] transition-all duration-500"
      >
        Request Appointment
      </button>
    </form>
  );
}

export default function CallToAction() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="boutique" ref={ref} className="relative py-24 md:py-40 px-6 md:px-12 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/chandelier-earrings.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#000000]/85" />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#000000] to-transparent z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent z-[5] pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
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
            className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-6 leading-[1.05]"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            delay={0.2}
          >
            {'Find Us In '}
            <span className="italic">Vaughan</span>
          </WordRevealRich>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.3 }}
            className="border border-white/10 p-8 md:p-10"
          >
            <h3
              className="text-2xl md:text-3xl mb-2 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            >
              {STORE.name}
            </h3>
            <p className="text-[#c9a96e] text-[11px] tracking-[0.3em] uppercase mb-6">{STORE.tagline}</p>
            <p className="text-white/70 font-light leading-relaxed mb-6">{STORE.address}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={STORE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white/80 text-[11px] tracking-[0.25em] uppercase font-light hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-all duration-500"
              >
                Get Directions
              </a>
              <a
                href="tel:+1"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white/80 text-[11px] tracking-[0.25em] uppercase font-light hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-all duration-500"
              >
                Call Us
              </a>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase mb-2">Walk-Ins Welcome</p>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                Stop by anytime during business hours — no appointment required.
                Prefer a private consultation? Book ahead using the form.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-[#c9a96e] text-[11px] tracking-[0.3em] uppercase mb-6">Book An Appointment</p>
            <AppointmentForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
