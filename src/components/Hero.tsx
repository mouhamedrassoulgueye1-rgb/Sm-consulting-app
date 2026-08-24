import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles, MapPin, MessageSquare } from 'lucide-react';
import { NextImage } from './NextImage';

interface HeroProps {
  onExploreProjects: () => void;
  onNavigateContact: () => void;
}

export function Hero({
  onExploreProjects,
  onNavigateContact,
}: HeroProps) {
  const whatsappUrl = 'https://wa.me/221770000000?text=' + encodeURIComponent('Bonjour Synoreyni Consulting, je souhaite me renseigner pour un projet architectural à Dakar.');

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-slate-950 border-b border-white/10"
    >
      {/* Background Architectural Imagery with high clarity and subtle contrast overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <NextImage
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=90"
          alt="Architecture d'exception et rénovation de prestige Synoreyni Consulting Dakar"
          fill
          priority
          sizes="100vw"
          className="scale-100 object-cover object-center brightness-[0.88] opacity-95"
        />

        {/* Subtle dark architectural gradients ensuring great readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-slate-950/65" />
        <div className="absolute inset-0 bg-grid-slate-dark opacity-15 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full flex flex-col justify-between min-h-[calc(85vh-100px)]">
        {/* Top Tag & Spatial Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/90 border border-white/15 backdrop-blur-md shadow-sm text-slate-200 text-xs">
            <span className="uppercase tracking-[0.18em] font-semibold text-[11px] text-white">
              SYNOREYNI CONSULTING • DAKAR, SÉNÉGAL
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3.5 py-1.5 border border-white/10 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>14.7167° N, 17.4677° W</span>
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-slate-200">DAKAR, SÉNÉGAL</span>
          </div>
        </div>

        {/* Center Hero Heading & Statements */}
        <div className="my-auto py-10 max-w-5xl">
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-amber-400 font-bold mb-3">
            Haute Précision & Architecture d'Élite
          </p>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] uppercase mb-6">
            Conception Durable <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              & Bâtiment de Prestige.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mb-8">
            <strong className="text-white font-semibold">Synoreyni Consulting</strong> est un cabinet d’ingénierie et d’architecture de premier plan à Dakar. 
            Nous combinons l’exigence constructive bioclimatique, la pureté des lignes contemporaines et la valorisation du patrimoine.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Primary CTA */}
            <button
              onClick={onExploreProjects}
              id="hero-cta-explore"
              className="group inline-flex items-center justify-center px-7 py-4 text-xs uppercase tracking-[0.18em] font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all duration-200 shadow-lg hover:shadow-amber-500/20 active:scale-[0.98] cursor-pointer"
            >
              <span>Explorer les Réalisations</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA -> Contact & Devis */}
            <button
              onClick={onNavigateContact}
              id="hero-cta-quote"
              className="group inline-flex items-center justify-center px-7 py-4 text-xs uppercase tracking-[0.18em] font-bold text-white bg-slate-900/90 hover:bg-slate-800 border border-white/20 rounded-lg shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>Demander une Étude / Devis</span>
            </button>
          </div>
        </div>

        {/* Bottom Hero Trust Indicators & Scroll Anchor */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-medium text-slate-200">Cabinet d'Ingénierie & Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-medium text-slate-200">Maîtrise d’Œuvre en Contrat Ferme</span>
            </div>
          </div>

          {/* Scroll cue */}
          <button
            onClick={onExploreProjects}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Faire défiler vers les projets"
          >
            <span>Découvrir les Projets</span>
            <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
