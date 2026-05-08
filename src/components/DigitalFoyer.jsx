import { useMemo } from "react";
import { motion } from "framer-motion";
import { catalog } from "../data/catalog";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.4 }
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function DigitalFoyer({ onSelect }) {
  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    catalog.forEach(item => {
      if (item.tags) item.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6 text-center bg-[#FDFBF7] overflow-hidden"
    >
      {/* ── Immersive Abstract Background ── */}
      <motion.img
        src="/assets/roses.png"
        initial={{ opacity: 0, scale: 1.1, rotate: -5 }}
        animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
        transition={{ duration: 5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] sm:w-[120%] max-w-none pointer-events-none select-none blur-[2px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* ── Decorative flourish ── */}
        <motion.div variants={itemVariants} className="mb-8 text-coral text-4xl tracking-widest select-none" aria-hidden="true">
          ✿
        </motion.div>
        
        {/* ── Hero Header ── */}
        <motion.h1 variants={itemVariants} className="font-heading text-4xl sm:text-5xl md:text-6xl text-charcoal leading-tight mb-8">
          What brings you here today?
        </motion.h1>
        
        <motion.div variants={itemVariants} className="w-16 h-[2px] bg-coral/30 mx-auto mb-12" aria-hidden="true" />
        
        {/* ── Elegant Typographic Buttons ── */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-x-8 gap-y-6 sm:gap-x-12 sm:gap-y-8">
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05, color: "#333333" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(tag)}
              className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase 
                         text-charcoal-light/60 transition-colors duration-300 cursor-pointer"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom Accent ── */}
      <motion.div 
        variants={itemVariants}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      >
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-charcoal-light/40 mb-4">
          Bespoke Floral Atelier
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-charcoal-light/30 to-transparent" />
      </motion.div>
    </motion.section>
  );
}
