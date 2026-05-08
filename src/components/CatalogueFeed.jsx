/**
 * CatalogueFeed.jsx — One-Page Atelier: Catalogue Feed
 * Features an immersive, high-end 'Luxury Hero' landing screen
 * and an 'Immersive Concierge Veil' that triggers upon entry.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { catalog } from "../data/catalog";

const cardVariants = {
  initial: { opacity: 0, y: 60, scale: 0.92 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// Variants for the Immersive Concierge Veil
const veilVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

const veilItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const FOCAL_TAGS = ['Anniversary', 'Celebration', 'Romance', 'Gratitude', 'Just Because'];

export default function CatalogueFeed({ onSelect }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [showMoodPopup, setShowMoodPopup] = useState(false);

  // Group catalog items by category
  const grouped = useMemo(() => {
    const map = new Map();
    catalog.forEach((item) => {
      const cat = item.category || "Uncategorised";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat).push(item);
    });
    return Array.from(map.entries());
  }, []);

  const handleEnter = () => {
    // Completely unmount the Foyer and mount the Feed
    setHasEntered(true);
    // After transition, show the concierge veil
    setTimeout(() => setShowMoodPopup(true), 800);
  };

  const scrollToMood = (tag) => {
    const firstItem = catalog.find(item => item.tags && item.tags.includes(tag));
    if (firstItem) {
      const el = document.getElementById(`item-${firstItem.id}`);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.section
            key="foyer"
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Massive floating background bloom */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1, rotate: -5 }}
              animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <img 
                src="/assets/roses.png" 
                alt="" 
                className="w-[150%] sm:w-[120%] md:w-[100%] max-w-none blur-[6px] object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center px-6 text-center w-full max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <div className="mb-6 text-coral text-2xl tracking-widest select-none" aria-hidden="true">
                  ✿
                </div>
                
                <h2 className="font-body text-[10px] sm:text-xs tracking-[0.4em] uppercase text-charcoal-light/60 mb-6">
                  Whoopsie Daisies
                </h2>
                
                <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-charcoal leading-[1.15] mb-6">
                  The Art of <br/>
                  <span className="italic text-coral opacity-90">Giving</span>
                </h1>
                
                <p className="font-body text-sm sm:text-base text-charcoal-light/60 max-w-[280px] sm:max-w-md mx-auto leading-relaxed mb-12">
                  Bespoke floral arrangements meticulously crafted to elevate your most meaningful moments.
                </p>
                
                {/* Elegant Enter Button */}
                <motion.button
                  onClick={handleEnter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center justify-center w-[200px] h-[52px] rounded-full border border-charcoal/20 overflow-hidden cursor-pointer bg-white/30 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-coral translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                  <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-charcoal group-hover:text-white transition-colors duration-500 relative z-10 font-semibold">
                    Enter Atelier
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        ) : (
          <motion.main
            key="feed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col pb-20 pt-8 sm:pt-12"
          >
            <div className="text-center mb-12 px-6">
              <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-4">
                Curated Collections
              </h2>
              <div className="w-12 h-[2px] bg-coral/30 mx-auto rounded-full" aria-hidden="true" />
            </div>

            {grouped.map(([category, items]) => (
              <section key={category} className="relative mt-8">
                {/* Sticky category header */}
                <div
                  className="sticky top-0 z-30 py-4 px-6
                              bg-gradient-to-b from-[#FDFBF7] via-[#FDFBF7]/95 to-transparent"
                >
                  <h2 className="font-heading text-xl sm:text-2xl text-charcoal/90 tracking-wide uppercase">
                    {category}
                  </h2>
                  <div className="mt-1 w-8 h-[2px] bg-coral/40 rounded-full" />
                </div>

                {/* Items grid */}
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex flex-col gap-10 px-5 pt-4 pb-8 max-w-lg mx-auto"
                >
                  {items.map((item) => (
                    <motion.button
                      key={item.id}
                      id={`item-${item.id}`}
                      variants={cardVariants}
                      onClick={() => onSelect(item)}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative w-full text-left cursor-pointer
                                 arch overflow-visible bloom-burst
                                 glass pt-6 pb-8 px-6
                                 transition-shadow duration-500
                                 hover:glass-heavy hover:glow-coral
                                 group"
                    >
                      {/* ── Massive bloom image — bursts out of arch ── */}
                      <div className="relative flex justify-center -mt-20 mb-4 overflow-visible">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          initial={{ scale: 0.95 }}
                          whileHover={{ scale: 1.08, y: -8 }}
                          transition={{ type: "spring", stiffness: 200, damping: 18 }}
                          className="w-[85%] sm:w-[75%] max-w-[320px] h-auto object-contain
                                     drop-shadow-2xl pointer-events-none select-none"
                        />
                      </div>

                      {/* ── Text content ────────────────────────────── */}
                      <div className="text-center">
                        <h3 className="font-heading text-2xl text-charcoal mb-1">
                          {item.name}
                        </h3>
                        <p className="font-body text-xs text-charcoal-light/70 leading-relaxed max-w-[260px] mx-auto mb-4 mt-2">
                          {item.filler}
                        </p>

                        {/* Price range hint */}
                        {item.variants && item.variants.length > 0 && (
                          <p className="font-body text-sm font-medium text-coral inline-block px-4 py-2 bg-coral/10 rounded-full">
                            From ₱{Math.min(...item.variants.map(v => v.price)).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </section>
            ))}
          </motion.main>
        )}
      </AnimatePresence>

      {/* ── Immersive Concierge Veil ──────────────────────── */}
      <AnimatePresence>
        {showMoodPopup && (
          <motion.div
            variants={veilVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.5, bottom: 0 }}
            onDragEnd={(e, info) => {
              // Dismiss on upward swipe (negative Y offset or velocity)
              if (info.offset.y < -50 || info.velocity.y < -300) {
                setShowMoodPopup(false);
              }
            }}
            onWheel={(e) => {
              // Dismiss on scroll down (trackpad swipe up)
              if (e.deltaY > 30) {
                setShowMoodPopup(false);
              }
            }}
            className="fixed inset-0 z-[100] backdrop-blur-2xl bg-[#FDFBF7]/85 flex flex-col justify-center items-center px-6 touch-pan-x"
          >
            {/* Header */}
            <motion.h2 
              variants={veilItemVariants}
              className="font-heading text-4xl sm:text-5xl md:text-6xl text-charcoal mb-16 text-center leading-tight"
            >
              What brings you here today?
            </motion.h2>

            {/* Naked Editorial Text Options */}
            <div className="flex flex-col items-center gap-6">
              {FOCAL_TAGS.map(tag => (
                <motion.button
                  variants={veilItemVariants}
                  key={tag}
                  onClick={() => {
                    setShowMoodPopup(false);
                    setTimeout(() => scrollToMood(tag), 800); // Wait for veil to fade out completely
                  }}
                  className="font-heading italic text-3xl sm:text-4xl text-charcoal opacity-50 
                             hover:opacity-100 hover:text-[#E88D82] hover:scale-105 
                             focus:opacity-100 focus:text-[#E88D82] focus:scale-105 
                             transition-all duration-300 cursor-pointer outline-none"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
            
            {/* Minimalist Skip Action */}
            <motion.div 
              variants={veilItemVariants}
              className="absolute bottom-12 left-0 right-0 flex justify-center"
            >
              <button
                onClick={() => setShowMoodPopup(false)}
                className="font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-charcoal-light/50 hover:text-charcoal transition-colors cursor-pointer"
              >
                Or swipe up to explore the atelier
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
