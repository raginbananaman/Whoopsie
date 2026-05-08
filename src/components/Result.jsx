/**
 * Result.jsx — Step 3: Concierge Ticket
 * Massive bloom fills top viewport, frosted glass "ticket" overlaps stems
 * Dashed line above Estimated Investment for premium concierge feel
 */
import { motion } from "framer-motion";
import { catalog, sizes } from "../data/catalog";

export default function Result({ bloomId, sizeId, roomNumber, onRoomChange }) {
  const bloom = catalog.find((b) => b.id === bloomId);
  const size = sizes.find((s) => s.id === sizeId);
  if (!bloom || !size) return null;

  return (
    <section id="step-result" className="relative flex-1 flex flex-col min-h-dvh overflow-visible">
      {/* ── Sticky Header with gradient fade ──────────── */}
      <div className="sticky top-10 z-50 text-center pt-6 pb-4
                      bg-gradient-to-b from-[#FDFBF7] via-[#FDFBF7] to-transparent">
        <p className="text-xs font-body font-medium tracking-[0.25em] uppercase text-coral mb-1">
          Step 3 of 3
        </p>
        <h2 className="font-heading text-2xl sm:text-3xl text-charcoal">
          Your Bespoke Arrangement
        </h2>
      </div>

      {/* ── Massive floating bloom — top 50vh ──────────── */}
      <div className="relative flex-shrink-0 flex items-center justify-center overflow-visible"
           style={{ height: "45vh" }}>
        <motion.img
          src={bloom.image}
          alt={bloom.name}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1.1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-[120%] max-w-none h-auto object-contain drop-shadow-2xl
                     pointer-events-none select-none
                     absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%]"
        />
      </div>

      {/* ── Concierge Ticket — frosted glass panel ──────── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-5 -mt-8 mb-8 glass-heavy arch-sm max-w-md mx-auto overflow-hidden"
      >
        {/* ── Ticket Header ────────────────────────────── */}
        <div className="px-7 pt-8 pb-5 sm:px-9">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="font-body text-[10px] text-coral tracking-[0.25em] uppercase mb-1">
                Concierge Request
              </p>
              <h3 className="font-heading text-2xl text-charcoal">
                {bloom.name}
              </h3>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-coral/10
                            flex items-center justify-center mt-1">
              <span className="text-coral text-lg select-none" aria-hidden="true">✿</span>
            </div>
          </div>
          <p className="font-heading italic text-sm text-charcoal-light/70">
            {bloom.tagline}
          </p>
        </div>

        {/* ── Detail Rows ──────────────────────────────── */}
        <div className="px-7 sm:px-9 space-y-3 pb-5">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-charcoal-light">Scale</span>
            <span className="font-body text-sm font-medium text-charcoal">{size.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-charcoal-light">Stems</span>
            <span className="font-body text-sm font-medium text-charcoal">{size.stems}</span>
          </div>
        </div>

        {/* ── Dashed tear-line ─────────────────────────── */}
        <div className="relative mx-5 my-1">
          <div className="border-t-2 border-dashed border-charcoal/10" />
          {/* Tear-off notches */}
          <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-cream" />
          <div className="absolute -right-7 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-cream" />
        </div>

        {/* ── Estimated Investment ──────────────────────── */}
        <div className="px-7 sm:px-9 py-5">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-charcoal-light/60 uppercase tracking-wider">
              Estimated Investment
            </span>
            <span className="font-heading text-3xl text-charcoal">
              {size.priceFormatted}
            </span>
          </div>
        </div>

        {/* ── Solid divider before input ────────────────── */}
        <div className="mx-7 sm:mx-9 h-px bg-white/30" />

        {/* ── Room Number Input ─────────────────────────── */}
        <div className="px-7 sm:px-9 pt-5 pb-8">
          <label htmlFor="room-number" className="block font-body text-sm font-medium text-charcoal mb-2">
            Room Number
          </label>
          <input
            id="room-number"
            type="text"
            placeholder="e.g. 1204"
            value={roomNumber}
            onChange={(e) => onRoomChange(e.target.value)}
            className="w-full bg-white/50 border border-white/60 rounded-2xl
                       px-5 py-4 font-body text-base text-charcoal
                       placeholder:text-charcoal-light/30
                       backdrop-blur-sm focus:border-coral focus:bg-white/70
                       min-h-[56px]"
            autoComplete="off"
          />
          <p className="mt-3 font-body text-[11px] text-charcoal-light/50 leading-relaxed">
            We will finalize your details seamlessly via Messenger.
          </p>
        </div>
      </motion.div>

      {/* ── Bottom clearance for footer ─────────────────── */}
      <div className="pb-40" />
    </section>
  );
}
