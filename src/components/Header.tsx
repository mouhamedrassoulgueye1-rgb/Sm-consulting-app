import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NextImage } from './NextImage';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'projets', label: "L'exploration des réalisations" },
    { id: 'a-propos', label: 'À Propos' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        isScrolled
          ? 'border-b border-white/10 py-3 shadow-2xl'
          : 'border-b border-white/10 py-3.5 sm:py-4'
      }`}
    >
      {/* Background image behind header with dark architectural overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <NextImage
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Fond d'en-tête Synoreyni Consulting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 brightness-[0.35] opacity-40"
        />
        {/* Layered dark gradients and backdrop blur */}
        <div className={`absolute inset-0 transition-colors duration-300 ${
          isScrolled
            ? 'bg-slate-950/92 backdrop-blur-md'
            : 'bg-slate-950/85 backdrop-blur-sm'
        }`} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/95 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-slate-dark opacity-30 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between relative z-10">
        {/* Brand Logo - SYNOREYNI with CONSULTING below, no orange dot */}
        <button
          onClick={() => onNavigate('hero')}
          className="group flex flex-col text-left focus:outline-none cursor-pointer"
          id="brand-logo-btn"
        >
          <span className="font-display text-lg sm:text-xl font-bold tracking-[0.16em] text-white group-hover:text-amber-400 transition-colors uppercase leading-none">
            SYNOREYNI
          </span>
          <span className="font-display text-[10px] sm:text-[11px] font-extrabold tracking-[0.28em] text-amber-400 uppercase leading-tight mt-0.5">
            CONSULTING
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Navigation principale">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative text-xs uppercase tracking-[0.16em] font-medium transition-colors duration-200 py-1 cursor-pointer group whitespace-nowrap ${
                  isActive ? 'text-amber-400 font-bold' : 'text-slate-200 hover:text-amber-400'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-amber-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Action Button - Devis */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Devis Button -> Contact */}
          <button
            onClick={() => onNavigate('contact')}
            id="quote-cta-header-btn"
            className="group inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
          >
            <span>Demande de Devis</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle & Devis */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onNavigate('contact')}
            className="px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-bold text-slate-950 bg-amber-400 active:bg-amber-300 rounded-md min-h-[40px] flex items-center"
          >
            Devis
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="p-2 text-slate-300 hover:text-white border border-white/10 rounded-lg focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center bg-slate-900"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[64px] bottom-0 bg-slate-950/98 border-b border-white/10 p-6 backdrop-blur-xl transition-all duration-300 overflow-y-auto z-40 flex flex-col justify-between">
          <div className="flex flex-col space-y-3">
            <div className="pb-3 border-b border-white/10 flex flex-col">
              <span className="font-display text-lg font-bold tracking-[0.16em] text-white uppercase leading-none">
                SYNOREYNI
              </span>
              <span className="font-display text-[10px] font-extrabold tracking-[0.28em] text-amber-400 uppercase leading-tight mt-0.5">
                CONSULTING
              </span>
              <span className="text-xs text-slate-400 mt-1">Cabinet d'Ingénierie & Architecture • Dakar, Sénégal</span>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm uppercase tracking-[0.16em] font-semibold text-slate-200 hover:text-amber-400 py-3 border-b border-white/5 min-h-[44px] flex items-center"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-6 pb-4 space-y-3">
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-[0.16em] font-bold text-slate-950 bg-amber-400 active:bg-amber-300 rounded-lg min-h-[44px] shadow"
            >
              <span>Demander un Devis / Contact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
