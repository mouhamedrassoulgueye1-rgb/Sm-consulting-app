import React from 'react';
import { ArrowDown, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { NextImage } from './NextImage';

interface HeroProps {
  onExploreProjects?: () => void;
  onNavigateContact?: () => void;
}

export function Hero({
  onExploreProjects,
  onNavigateContact,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#FAF9F6] border-b border-[#E5E2DA]"
    >
      {/* Background Architectural Imagery: Bright daylight bioclimatic architecture */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <NextImage
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=90"
          alt="Architecture d'exception baignée de lumière naturelle Dakar - Synoreyni Consulting"
          fill
          priority
          sizes="100vw"
          className="scale-100 object-cover object-center brightness-[1.0] contrast-[1.08] opacity-95"
        />

        {/* Luminous light gradient overlays: subtle scrim for crisp text legibility while keeping photo opaque & vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/85 via-[#FAF9F6]/45 to-[#FAF9F6]/15 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-slate-light opacity-25 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full flex flex-col justify-between min-h-[calc(85vh-100px)]">
        {/* Top Tag & Spatial Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/95 border border-[#E5E2DA] backdrop-blur-md shadow-sm text-[#111111] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="uppercase tracking-[0.18em] font-bold text-[11px] text-[#111111]">
              SYNOREYNI CONSULTING • DAKAR, SÉNÉGAL
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-[#555555] bg-white/90 px-3.5 py-1.5 border border-[#E5E2DA] backdrop-blur-sm shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>14.7167° N, 17.4677° W</span>
            <span className="text-[#D1D5DB]">•</span>
            <span className="font-semibold text-[#111111]">DAKAR, SÉNÉGAL</span>
          </div>
        </div>

        {/* Center Hero Heading & Statements */}
        <div className="my-auto py-10 max-w-5xl">
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#C5A059] font-bold mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            Haute Précision & Architecture d'Élite
          </p>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-[1.08] uppercase mb-6">
            Conception Durable <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B88E3E] via-[#C5A059] to-[#D4AF37]">
              & Bâtiment de Prestige.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#3A3A3A] font-normal leading-relaxed max-w-3xl">
            <strong className="text-[#111111] font-semibold">Synoreyni Consulting</strong> est un cabinet d’ingénierie et d’architecture de premier plan à Dakar. 
          
          </p>
        </div>

        {/* Bottom Hero Trust Indicators & Scroll Anchor */}
        <div className="pt-6 border-t border-[#E5E2DA] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-[#444444]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span className="font-semibold text-[#111111]">Cabinet d'Ingénierie & Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span className="font-semibold text-[#111111]">Maîtrise d’Œuvre en Contrat Ferme</span>
            </div>
          </div>

          {/* Scroll cue */}
          <button
            onClick={onExploreProjects}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
            aria-label="Faire défiler vers les projets"
          >
            <span>Découvrir les Projets</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C5A059] animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
