/**
 * Landing.jsx — Organic botanical welcome screen
 * Full-bleed floral background with glassmorphism text plate
 */
import { motion } from "framer-motion";

export default function Landing({ onBegin }) {
  return (
    <section
      id="landing"
      className="relative flex flex-1 flex-col items-center justify-center px-6 py-20 text-center overflow-hidden min-h-dvh"
    >
      {/* ── Background bloom — massive, atmospheric ──── */}
      <motion.img
        src="/assets/roses.png"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.18, scale: 1.05 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[140%] max-w-none pointer-events-none select-none"
      />

      {/* ── Glassmorphism text plate ────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 glass rounded-[3rem] px-10 py-14 sm:px-16 sm:py-20 max-w-md w-full"
      >
        {/* Decorative flourish */}
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-5 text-coral text-4xl tracking-widest select-none"
          aria-hidden="true"
        >
          ✿
        </motion.div>

        <h1 className="font-heading text-4xl sm:text-5xl text-charcoal leading-tight mb-2">
          Whoopsie Daisies
        </h1>
        <p className="text-charcoal-light font-body text-xs tracking-[0.25em] uppercase mb-8">
          Bespoke Floral Atelier
        </p>

        <div className="w-12 h-px bg-coral/30 mx-auto mb-8" aria-hidden="true" />

        <p className="font-heading italic text-xl sm:text-2xl text-charcoal leading-relaxed mb-2">
          Express your gratitude.
        </p>
        <p className="font-heading italic text-xl sm:text-2xl text-charcoal leading-relaxed mb-10">
          Build your perfect arrangement.
        </p>

        {/* ── Massive pill CTA ──────────────────────── */}
        <motion.button
          id="btn-begin"
          onClick={onBegin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="
            bg-coral text-white font-body font-semibold text-lg
            w-full py-5 rounded-full
            shadow-lg shadow-coral/30
            cursor-pointer
            pulse-glow
          "
        >
          Begin Discovery
        </motion.button>

        <p className="mt-8 text-[11px] text-charcoal-light/50 leading-relaxed">
          A curated experience designed exclusively
          <br />
          for our hotel partners.
        </p>
      </motion.div>
    </section>
  );
}
