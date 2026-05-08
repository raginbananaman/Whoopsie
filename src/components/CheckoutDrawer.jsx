/**
 * CheckoutDrawer.jsx — Master-Detail Bottom Sheet
 * A massive frosted glass sheet that slides up over the feed.
 * Contains variant toggle, room number, and concierge submission.
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { buildMessengerUrl } from "../utils/messenger";

const drawerVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30, mass: 1 }
  },
  exit: { 
    y: "100%", 
    opacity: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function CheckoutDrawer({ item, onClose }) {
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [roomNumber, setRoomNumber] = useState("");

  // Reset selections when a new item is selected
  useEffect(() => {
    if (item && item.variants && item.variants.length > 0) {
      // Pre-select the premium variant, or the first one if none is premium
      const premiumVariant = item.variants.find(v => v.isPremium);
      setSelectedVariantId(premiumVariant ? premiumVariant.id : item.variants[0].id);
      setRoomNumber("");
    }
  }, [item]);

  if (!item) return null;

  const handleSubmit = () => {
    const variant = item.variants.find(v => v.id === selectedVariantId);
    if (!variant) return;
    
    const formattedPrice = `₱${variant.price.toLocaleString()}`;
    const url = buildMessengerUrl({
      bloom: item.name,
      variant: variant.label,
      price: formattedPrice,
      room: roomNumber,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const canSubmit = selectedVariantId !== null && roomNumber.trim().length > 0;

  // Derive selected variant for the ticket summary
  const selectedVariant = item && item.variants ? item.variants.find(v => v.id === selectedVariantId) : null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-charcoal/20 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        key="drawer"
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 150 || info.velocity.y > 500) {
            onClose();
          }
        }}
        className="fixed bottom-0 left-0 right-0 z-50 flex flex-col
                   bg-[#FDFBF7]/95 backdrop-blur-xl rounded-t-[2rem]
                   border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]
                   max-h-[90vh] overflow-hidden"
      >
        {/* Swipe handle */}
        <div className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing w-full touch-none">
          <div className="w-12 h-1.5 bg-charcoal-light/20 rounded-full" />
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 pb-24 pt-2 hide-scrollbar">
          <div className="max-w-md mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl text-charcoal mb-1">
                {item.name}
              </h2>
              <p className="font-heading italic text-sm text-charcoal-light/70">
                {item.filler}
              </p>
            </div>

            {/* Variant Toggle */}
            {item.variants && item.variants.length > 0 && (
              <div className="mb-8">
                <p className="font-body text-xs text-charcoal-light/60 uppercase tracking-wider mb-3 text-center">
                  Select Variant
                </p>
                <div className="flex flex-col gap-4">
                  {item.variants.map((variant) => {
                    const isSelected = selectedVariantId === variant.id;
                    return (
                      <div key={variant.id} className="relative flex flex-col items-center">
                        {/* The Nudge Badge */}
                        {variant.isPremium && (
                          <div className="mb-2">
                            <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-coral/90 font-semibold bg-coral/10 px-3 py-1 rounded-full">
                              Bespoke Recommendation
                            </span>
                          </div>
                        )}
                        
                        <button
                          onClick={() => setSelectedVariantId(variant.id)}
                          className={`
                            relative w-full px-5 py-4 rounded-2xl font-body text-sm font-medium transition-all
                            flex items-center justify-between
                            ${isSelected 
                              ? "bg-white border-2 border-coral shadow-lg shadow-coral/10 scale-[1.02] z-10" 
                              : "bg-white/50 border-2 border-transparent text-charcoal-light hover:bg-white/80"
                            }
                          `}
                        >
                          <span className={`text-base ${isSelected ? 'text-charcoal' : 'text-charcoal-light'}`}>
                            {variant.label}
                          </span>
                          
                          <span className={`font-heading text-lg ${isSelected ? 'text-coral' : 'text-charcoal-light'}`}>
                            ₱{variant.price.toLocaleString()}
                          </span>
                          
                          {/* Checkmark */}
                          {isSelected && (
                            <motion.div 
                              layoutId="variantCheckmark"
                              className="absolute -top-2 -right-2 w-6 h-6 bg-coral rounded-full flex items-center justify-center shadow-sm"
                            >
                              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Concierge Ticket Section ──────────── */}
            <div className="relative mb-8 mt-10">
              {/* Dashed tear-line */}
              <div className="relative my-2">
                <div className="border-t-2 border-dashed border-charcoal/10" />
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#FDFBF7]" />
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#FDFBF7]" />
              </div>

              {/* Ticket summary */}
              {selectedVariant && (
                <div className="pt-5 pb-3 flex items-center justify-between">
                  <span className="font-body text-xs text-charcoal-light/50 uppercase tracking-wider">
                    Estimated Investment
                  </span>
                  <motion.span 
                    key={selectedVariant.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-heading text-3xl text-charcoal"
                  >
                    ₱{selectedVariant.price.toLocaleString()}
                  </motion.span>
                </div>
              )}

              {/* Room Number Input */}
              <p className="font-body text-xs text-charcoal-light/60 uppercase tracking-wider mb-3 text-center pt-2">
                Delivery Details
              </p>
              <input
                type="text"
                placeholder="Guest Room Number (e.g. 1204)"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full bg-white border border-charcoal/10 rounded-2xl
                           px-5 py-4 font-body text-base text-charcoal text-center
                           placeholder:text-charcoal-light/40
                           focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none
                           transition-all"
              />
            </div>

          </div>
        </div>

        {/* Edge-to-edge Footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`
                w-full py-4 rounded-full font-body font-semibold text-lg transition-all
                ${canSubmit
                  ? "bg-coral text-white shadow-[0_8px_30px_rgba(232,141,130,0.4)] hover:bg-[#D97B70] active:scale-[0.98]"
                  : "bg-charcoal/5 text-charcoal-light/40 cursor-not-allowed"
                }
              `}
            >
              Request via Concierge
            </button>
          </div>
        </div>

      </motion.div>
    </>
  );
}
