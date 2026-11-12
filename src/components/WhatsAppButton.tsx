import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const phoneNumber = '221783046161';
  const defaultMessage = encodeURIComponent(
    'Bonjour Synoreyni Consulting, je souhaite échanger au sujet d'un projet architectural / de construction à Dakar.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  useEffect(() => {
    let rafId: number | null = null;

    const checkVisibility = () => {
      const targetElement = document.getElementById('projets') || document.getElementById('featured-scroller');
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setIsVisible(rect.top <= window.innerHeight * 0.75);
      } else {
        setIsVisible(window.scrollY > 600);
      }
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(checkVisibility);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end will-change-transform"
        >
          {/* Tooltip — visible sur desktop, compact et optionnel sur mobile */}
          {showTooltip && (
            <div className="mb-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#E5E2DA] text-[#111111] text-xs shadow-lg animate-fade-in max-w-[220px] sm:max-w-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0 animate-pulse" />
              <span className="font-medium text-[#333333] text-[11px] leading-snug">
                <span className="hidden sm:inline">Besoin d'un renseignement ? </span>
                <strong className="text-[#C5A059]">WhatsApp</strong>
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="p-1 min-w-[28px] min-h-[28px] text-[#777777] hover:text-[#111111] cursor-pointer ml-1 flex items-center justify-center"
                aria-label="Fermer la bulle"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* WhatsApp Button — min 44×44px pour les touch targets mobile */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="floating-whatsapp-btn"
            className="flex items-center gap-2.5 px-4 py-3 min-h-[48px] rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white font-bold text-xs uppercase tracking-wider transition-[background] duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer border border-white/20 will-change-transform"
            aria-label="Discuter directement sur WhatsApp avec Synoreyni Consulting"
            title="Discuter directement sur WhatsApp (+221 78 304 61 61)"
          >
            <div className="relative shrink-0">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span className="font-bold tracking-wider text-[11px]">WhatsApp</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WhatsAppButton;
