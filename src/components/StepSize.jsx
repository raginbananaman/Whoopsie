/**
 * StepSize.jsx — Step 2: Select your arrangement scale
 * Overlapping translucent glass plates with organic rounding
 * Reduced price orbs, checkmark on card top-right
 */
import { motion } from "framer-motion";
import { sizes } from "../data/catalog";

const plateVariants = {
  initial: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? -40 : 40,
    rotate: i % 2 === 0 ? -2 : 2,
  }),
  animate: (i) => ({
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function StepSize({ selected, onSelect }) {
  return (
    <section id="step-size" className="flex-1 flex flex-col">
      {/* ── Sticky Header with gradient fade ──────────── */}
      <div className="sticky top-10 z-50 text-center pt-6 pb-4
                      bg-gradient-to-b from-[#FDFBF7] via-[#FDFBF7] to-transparent">
        <p className="text-xs font-body font-medium tracking-[0.25em] uppercase text-coral mb-2">
          Step 2 of 3
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-2">
          Select your Scale
        </h2>
        <p className="font-body text-sm text-charcoal-light/70 max-w-xs mx-auto">
          From understated charm to breathtaking grandeur.
        </p>
      </div>

      {/* ── Overlapping Glass Plates ──────────────────── */}
      <div className="relative max-w-md mx-auto flex flex-col -space-y-4 px-5 pt-6 pb-40">
        {sizes.map((size, i) => {
          const isSelected = selected === size.id;
          const isOther = selected !== null && !isSelected;

          return (
            <motion.button
              key={size.id}
              id={`size-${size.id}`}
              custom={i}
              variants={plateVariants}
              initial="initial"
              animate="animate"
              onClick={() => onSelect(size.id)}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              style={{ zIndex: isSelected ? 30 : 10 - i }}
              className={`
                relative w-full text-left cursor-pointer
                rounded-[2rem] px-7 py-7 sm:px-9 sm:py-8
                transition-all duration-500
                ${isSelected
                  ? "glass-heavy glow-coral scale-[1.03]"
                  : isOther
                    ? "glass opacity-50 scale-[0.96]"
                    : "glass"
                }
              `}
              aria-pressed={isSelected}
            >
              {/* Popular badge */}
              {size.popular && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-3 left-8 bg-coral text-white text-[10px]
                             font-body font-semibold px-4 py-1 rounded-full
                             tracking-wider uppercase shadow-md shadow-coral/20"
                >
                  Most Popular
                </motion.span>
              )}

              <div className="flex items-center justify-between gap-4">
                {/* Left: name + metadata */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-xl sm:text-2xl text-charcoal mb-1">
                    {size.name}
                  </h3>
                  <p className="font-heading italic text-sm text-charcoal-light mb-1">
                    {size.subtitle}
                  </p>
                  <p className="font-body text-xs text-charcoal-light/50">
                    {size.stems}
                  </p>
                </div>

                {/* Right: reduced price orb */}
                <div className={`
                  flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-full
                  flex flex-col items-center justify-center
                  transition-all duration-500
                  ${isSelected
                    ? "bg-coral text-white shadow-lg shadow-coral/30"
                    : "bg-white/40 text-charcoal"
                  }
                `}>
                  <span className="font-heading text-sm sm:text-base leading-none">
                    {size.priceFormatted}
                  </span>
                </div>
              </div>

              {/* ── Selected checkmark — card top-right ──── */}
              <motion.div
                initial={false}
                animate={{
                  scale: isSelected ? 1 : 0,
                  opacity: isSelected ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-coral
                           flex items-center justify-center shadow-md shadow-coral/30"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
