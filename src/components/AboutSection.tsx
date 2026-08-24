import React from 'react';
import { Building2, Compass, Shield, Users, ArrowRight } from 'lucide-react';
import { AGENCY_METRICS } from '../data/projectsData';

interface AboutSectionProps {
  onNavigateContact: () => void;
}

export function AboutSection({ onNavigateContact }: AboutSectionProps) {
  return (
    <section id="a-propos" className="py-24 bg-slate-950 border-t border-b border-white/10 relative overflow-hidden">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-grid-slate-dark opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <span>À Propos du Cabinet</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              Synoreyni <span className="text-amber-400 font-normal">Consulting</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Cabinet d'ingénierie et d’architecture haut de gamme basé à Dakar, nous concevons et réalisons des projets d’exception alliant audace esthétique, rigueur constructive et respect environnemental.
          </p>
        </div>

        {/* Core Narrative / Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <div className="p-8 rounded-xl bg-slate-900/80 border border-white/10 hover:border-amber-400/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase mb-3 tracking-wide">
              Conception Bioclimatique
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Une démarche architecturale pensée pour le climat ouest-africain : ventilation traversante passive, optimisation des flux d'air et sélection de matériaux nobles durables.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-slate-900/80 border border-white/10 hover:border-amber-400/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase mb-3 tracking-wide">
              Maîtrise d'Œuvre & BTP
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              De l’étude structurelle au pilotage de chantier, nos ingénieurs et architectes veillent à une exécution millimétrique, dans le strict respect des délais et du budget convenu.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-slate-900/80 border border-white/10 hover:border-amber-400/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase mb-3 tracking-wide">
              Prestige & Rénovation
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Résidences de maître, villas côtières, rénovations patrimoniales et sièges d’entreprises : nous créons des espaces singuliers taillés pour traverser les générations.
            </p>
          </div>
        </div>

        {/* Agency Metrics Bar */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {AGENCY_METRICS.map((metric, idx) => (
            <div key={idx} className="flex flex-col sm:border-r last:border-r-0 border-white/10 sm:pr-6">
              <div className="flex items-baseline justify-center sm:justify-start gap-1 mb-1">
                <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  {metric.value}
                </span>
                <span className="text-amber-400 font-bold text-xl">{metric.suffix}</span>
              </div>
              <span className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-1">
                {metric.label}
              </span>
              <span className="text-xs text-slate-400">{metric.detail}</span>
            </div>
          ))}
        </div>

        {/* CTA to Contact / Exchange */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-amber-400/5 border border-amber-400/20">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">Vous avez un projet ?</p>
            <p className="text-sm text-slate-300">Notre équipe d'architectes et d'ingénieurs à Dakar étudie votre programme avec discrétion.</p>
          </div>
          <button
            onClick={onNavigateContact}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all shrink-0 cursor-pointer shadow-lg active:scale-95"
          >
            <span>Prendre Contact</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
