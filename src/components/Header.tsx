import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, MessageSquare, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  onOpenAdmin?: () => void;
}

export function Header({
  onNavigate,
  activeSection = 'hero',
  onOpenAdmin,
}: HeaderProps) {
  // isPastHero is false when user is on the Hero section
  // and becomes true as soon as the Hero section is passed.
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        // The navbar turns solid white when the bottom of hero reaches the navbar
        if (heroBottom <= 70) {
          setIsPastHero(true);
        } else {
          setIsPastHero(false);
        }
      } else {
        setIsPastHero(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'projets', label: 'Réalisations' },
    { id: 'a-propos', label: 'À Propos' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleMobileNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      onNavigate(id);
    }, 150);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isPastHero
            ? 'bg-white/95 backdrop-blur-md border-b border-[#E5E2DA] py-2 sm:py-2.5 shadow-xs'
            : 'bg-white/50 md:bg-white/40 backdrop-blur-md border-b border-white/20 py-2.5 sm:py-3 shadow-xs'
        }`}
      >
        {/* Subtle luminous architectural pattern only displayed when background is solid */}
        <div
          className={`absolute inset-0 z-0 pointer-events-none select-none overflow-hidden transition-opacity duration-500 ${
            isPastHero ? 'opacity-30' : 'opacity-10'
          }`}
        >
          <div className="absolute inset-0 bg-grid-slate-light opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between relative z-10">
          {/* Brand Logo - Perfectly legible with high contrast */}
          <button
            onClick={() => onNavigate('hero')}
            className="group flex flex-col text-left focus:outline-none cursor-pointer"
            id="brand-logo-btn"
          >
            <span className="font-display text-base sm:text-lg font-bold tracking-[0.16em] uppercase leading-none text-[#111111] group-hover:text-[#C5A059] transition-colors duration-200">
              SYNOREYNI
            </span>
            <span className="font-display text-[9px] sm:text-[10px] font-semibold tracking-[0.24em] text-[#C5A059] uppercase leading-tight mt-0.5">
              CONSULTING
            </span>
          </button>

          {/* Desktop Navigation - Clean, legible and well-spaced */}
          <nav className="hidden lg:flex items-center space-x-6" aria-label="Navigation principale">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-200 py-1 cursor-pointer group whitespace-nowrap ${
                    isActive
                      ? 'text-[#C5A059] font-bold'
                      : 'text-[#1A1A1A] hover:text-[#C5A059]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Button - Compact Devis button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              id="quote-cta-header-btn"
              className="group inline-flex items-center justify-center px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-bold text-white bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] rounded-lg transition-all duration-300 shadow-xs active:scale-95 cursor-pointer"
            >
              <span>Devis</span>
              <ArrowRight className="w-3 h-3 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Right Controls: Compact Quick Devis + Hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onNavigate('contact')}
              className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#C5A059] to-[#D4AF37] active:opacity-90 rounded-md min-h-[38px] flex items-center shadow-xs cursor-pointer"
            >
              Devis
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              id="mobile-menu-toggle"
              className="w-9 h-9 border rounded-lg focus:outline-none flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-all duration-300 bg-white/90 border-[#E5E2DA] text-[#111111] hover:text-[#C5A059]"
              aria-label="Ouvrir le menu de navigation"
            >
              <Menu className="w-4 h-4 text-[#111111]" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-full max-w-xs h-full bg-[#FAF9F6] border-l border-[#E5E2DA] flex flex-col justify-between p-5 shadow-2xl overflow-y-auto"
            >
              {/* Header inside mobile menu */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E2DA]">
                  <div className="flex flex-col">
                    <span className="font-display text-base font-bold tracking-[0.16em] text-[#111111] uppercase leading-none">
                      SYNOREYNI
                    </span>
                    <span className="font-display text-[9px] font-semibold tracking-[0.24em] text-[#C5A059] uppercase leading-tight mt-0.5">
                      CONSULTING
                    </span>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-[#E5E2DA] text-[#111111] hover:text-[#C5A059] hover:bg-[#F4F1EA] transition-colors cursor-pointer"
                    aria-label="Fermer le menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtitle location badge */}
                <div className="my-3.5 flex items-center gap-2 text-[10px] font-mono text-[#555555] bg-white px-2.5 py-1 border border-[#E5E2DA] rounded-md">
                  <MapPin className="w-3 h-3 text-[#C5A059] shrink-0" />
                  <span>Dakar, Sénégal • Ingénierie & BTP</span>
                </div>

                {/* Navigation Items */}
                <nav className="mt-2 flex flex-col divide-y divide-[#EFECE6]">
                  {navItems.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMobileNavClick(item.id)}
                        className={`w-full py-3 text-left flex items-center justify-between group transition-colors min-h-[44px] cursor-pointer ${
                          isActive ? 'text-[#C5A059]' : 'text-[#1A1A1A] hover:text-[#C5A059]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] text-[#C5A059] font-bold">
                            0{idx + 1}
                          </span>
                          <span className={`text-sm tracking-wide uppercase font-display ${isActive ? 'font-bold' : 'font-medium'}`}>
                            {item.label}
                          </span>
                        </div>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-[#C5A059] translate-x-1' : 'text-[#CCCCCC] group-hover:text-[#C5A059] group-hover:translate-x-1'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Quick Contact & CTA */}
              <div className="pt-4 border-t border-[#E5E2DA] space-y-2.5">
                <button
                  onClick={() => handleMobileNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-3 text-[11px] uppercase tracking-[0.16em] font-bold text-white bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] active:opacity-90 rounded-lg min-h-[42px] shadow-sm cursor-pointer"
                >
                  <span>Demander un Devis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://wa.me/221774351347"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white border border-[#E5E2DA] rounded-md text-[11px] font-semibold text-[#111111] hover:text-[#C5A059] transition-colors"
                  >
                    <MessageSquare className="w-3 h-3 text-[#C5A059]" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="tel:+221774351347"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white border border-[#E5E2DA] rounded-md text-[11px] font-semibold text-[#111111] hover:text-[#C5A059] transition-colors"
                  >
                    <Phone className="w-3 h-3 text-[#C5A059]" />
                    <span>Appeler</span>
                  </a>
                </div>

                <p className="text-[10px] text-[#777777] text-center pt-1">
                  Synoreyni Consulting • Dakar Almadies
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
