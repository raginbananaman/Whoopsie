import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CatalogueFeed from "./components/CatalogueFeed";
import CheckoutDrawer from "./components/CheckoutDrawer";

/**
 * App.jsx — Bespoke Floral Builder
 * Organic Lens & Botanical Arch aesthetic
 * One-Page Atelier architecture
 */

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  // ── Ambient Aura — dynamic bg glow from selected bloom ─
  const auraColor = useMemo(() => {
    if (!selectedItem) return "transparent";
    return selectedItem.aura || "transparent";
  }, [selectedItem]);

  return (
    <div className="relative min-h-dvh flex flex-col bg-cream overflow-hidden">
      {/* ── Ambient Aura Background Glow ──────────────── */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        animate={{ backgroundColor: auraColor }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      {/* ── Catalogue Feed (Scrollable) ───────────────── */}
      <div className="relative z-10 flex-1 flex flex-col h-full overflow-y-auto">
        <CatalogueFeed onSelect={setSelectedItem} />
      </div>

      {/* ── Checkout Drawer (Bottom Sheet) ────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <CheckoutDrawer 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
