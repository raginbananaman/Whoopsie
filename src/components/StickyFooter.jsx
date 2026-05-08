/**
 * StickyFooter.jsx — Floating pill navigation
 * Massive rounded-full pill with coral glow, centered with margin
 */
import { motion, AnimatePresence } from "framer-motion";

export default function StickyFooter({ step, canAdvance, onNext, onBack, onSubmit }) {
  if (step === 0) return null;
  const isFinalStep = step === 3;

  return (
    <AnimatePresence>
      <motion.footer
        id="sticky-footer"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-3 pointer-events-none"
      >
        <div className="max-w-md mx-auto flex items-center gap-3 pointer-events-auto">
          {/* Back — small glass pill */}
          <motion.button
            id="btn-back"
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            className="glass font-body text-sm font-medium text-charcoal-light
                       px-5 py-4 rounded-full cursor-pointer min-h-[56px]
                       hover:bg-white/50 transition-colors duration-200"
            aria-label="Go back"
          >
            Back
          </motion.button>

          {/* Primary — massive floating coral pill */}
          <motion.button
            id={isFinalStep ? "btn-submit" : "btn-next"}
            onClick={isFinalStep ? onSubmit : onNext}
            disabled={!canAdvance}
            whileHover={canAdvance ? { scale: 1.03 } : {}}
            whileTap={canAdvance ? { scale: 0.97 } : {}}
            animate={{
              boxShadow: canAdvance
                ? "0 8px 40px rgba(232,141,130,0.35), 0 2px 12px rgba(232,141,130,0.18)"
                : "0 4px 20px rgba(0,0,0,0.05)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`flex-1 font-body font-semibold text-base
                        px-6 py-4 rounded-full min-h-[56px] cursor-pointer
                        transition-colors duration-300
                        ${canAdvance
                          ? "bg-coral text-white"
                          : "bg-white/30 text-charcoal-light/40 backdrop-blur-md border border-white/40 cursor-not-allowed"
                        }`}
          >
            {isFinalStep ? "Request via Concierge" : "Next"}
          </motion.button>
        </div>
      </motion.footer>
    </AnimatePresence>
  );
}
