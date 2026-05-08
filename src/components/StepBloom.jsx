/**
 * StepBloom.jsx — Step 1: Select your bloom
 * Organic 'Arch' containers with massive bloom overflow
 * Sticky gradient header for legibility
 */
import { motion } from "framer-motion";
import { catalog } from "../data/catalog";

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.12 },
  },
};

const archVariants = {
  initial: { opacity: 0, y: 60, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function StepBloom({ selected, onSelect }) {
  return (
    <section id="step-bloom" className="flex-1 flex flex-col overflow-visible">
      {/* ── Sticky Header with gradient fade ──────────── */}
      <div className="sticky top-10 z-50 text-center pt-6 pb-4
                      bg-gradient-to-b from-[#FDFBF7] via-[#FDFBF7] to-transparent">
        <p className="text-xs font-body font-medium tracking-[0.25em] uppercase text-coral mb-2">
          Step 1 of 3
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-2">
          Select your Bloom
        </h2>
        <p className="font-body text-sm text-charcoal-light/70 max-w-xs mx-auto">
          Each arrangement is crafted with the finest seasonal flowers.
        </p>
      </div>

      {/* ── Arch Cards ────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col gap-10 max-w-md mx-auto overflow-visible px-5 pt-4 pb-40"
      >
        {catalog.map((bloom) => {
          const isSelected = selected === bloom.id;
          const isOther = selected !== null && !isSelected;

          return (
            <motion.button
              key={bloom.id}
              id={`bloom-${bloom.id}`}
              variants={archVariants}
              onClick={() => onSelect(bloom.id)}
              animate={{
                scale: isOther ? 0.92 : 1,
                opacity: isOther ? 0.4 : 1,
              }}
              whileHover={!isOther ? { scale: 1.02 } : {}}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              className={`
                relative w-full text-left cursor-pointer
                arch overflow-visible bloom-burst
                pt-6 pb-8 px-6
                transition-shadow duration-500
                ${isSelected
                  ? "glass-heavy glow-coral"
                  : "glass"
                }
              `}
              aria-pressed={isSelected}
            >
              {/* ── Massive bloom image — bursts out of top ── */}
              <div className="relative flex justify-center -mt-20 mb-4 overflow-visible">
                <motion.img
                  src={bloom.image}
                  alt={bloom.name}
                  animate={{
                    scale: isSelected ? 1.15 : 1.0,
                    y: isSelected ? -12 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="w-[85%] sm:w-[75%] max-w-[320px] h-auto object-contain
                             drop-shadow-2xl pointer-events-none select-none"
                />
              </div>

              {/* ── Text content ────────────────────────── */}
              <div className="text-center">
                <h3 className="font-heading text-2xl text-charcoal mb-1">
                  {bloom.name}
                </h3>
                <p className="font-heading italic text-sm text-coral mb-3">
                  {bloom.tagline}
                </p>
                <p className="font-body text-xs text-charcoal-light/70 leading-relaxed max-w-[260px] mx-auto">
                  {bloom.description}
                </p>
              </div>

              {/* ── Selected indicator orb ──────────────── */}
              <motion.div
                initial={false}
                animate={{
                  scale: isSelected ? 1 : 0,
                  opacity: isSelected ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-coral
                           flex items-center justify-center shadow-lg shadow-coral/30"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
}
