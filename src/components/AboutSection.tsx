import React from 'react';
import { Building2, Compass, Shield, ArrowRight } from 'lucide-react';
import { AGENCY_METRICS } from '../data/projectsData';

interface AboutSectionProps {
  onNavigateContact: () => void;
}

export function AboutSection({ onNavigateContact }: AboutSectionProps) {
  return (
    <section id="a-propos" className="py-24 bg-[#FAF9F6] border-t border-b border-[#E5E2DA] relative overflow-hidden">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-grid-slate-light opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#E5E2DA] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#C5A059]/30 text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>À Propos du Cabinet</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] uppercase">
              Synoreyni <span className="text-[#C5A059] font-normal">Consulting</span>
            </h2>
          </div>
          <p className="text-[#4A4A4A] text-sm sm:text-base max-w-xl leading-relaxed">
            Cabinet d'ingénierie et d’architecture haut de gamme basé à Dakar, nous concevons et réalisons des projets d’exception alliant audace esthétique, rigueur constructive et respect environnemental.
          </p>
        </div>

        {/* Core Narrative / Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-white border border-[#E5E2DA] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#E5E2DA] flex items-center justify-center text-[#C5A059] mb-6 group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-white transition-all">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#111111] uppercase mb-3 tracking-wide">
              Conception Bioclimatique
            </h3>
            <p className="text-[#4A4A4A] text-sm leading-relaxed">
              Une démarche architecturale pensée pour le climat ouest-africain : ventilation traversante passive, optimisation des flux d'air et sélection de matériaux nobles durables.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E5E2DA] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#E5E2DA] flex items-center justify-center text-[#C5A059] mb-6 group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-white transition-all">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#111111] uppercase mb-3 tracking-wide">
              Maîtrise d'Œuvre & BTP
            </h3>
            <p className="text-[#4A4A4A] text-sm leading-relaxed">
              De l’étude structurelle au pilotage de chantier, nos ingénieurs et architectes veillent à une exécution millimétrique, dans le strict respect des délais et du budget convenu.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E5E2DA] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#E5E2DA] flex items-center justify-center text-[#C5A059] mb-6 group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-white transition-all">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#111111] uppercase mb-3 tracking-wide">
              Prestige & Rénovation
            </h3>
            <p className="text-[#4A4A4A] text-sm leading-relaxed">
              Résidences de maître, villas côtières, rénovations patrimoniales et sièges d’entreprises : nous créons des espaces singuliers taillés pour traverser les générations.
            </p>
          </div>
        </div>

        {/* Agency Metrics Bar */}
        <div className="p-8 rounded-2xl bg-white border border-[#E5E2DA] shadow-md grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {AGENCY_METRICS.map((metric, idx) => (
            <div key={idx} className="flex flex-col sm:border-r last:border-r-0 border-[#E5E2DA] sm:pr-6">
              <div className="flex items-baseline justify-center sm:justify-start gap-1 mb-1">
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#111111] tracking-tight">
                  {metric.value}
                </span>
                <span className="text-[#C5A059] font-bold text-xl">{metric.suffix}</span>
              </div>
              <span className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-1">
                {metric.label}
              </span>
              <span className="text-xs text-[#666666]">{metric.detail}</span>
            </div>
          ))}
        </div>

        {/* CTA to Contact / Exchange */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C5A059] font-bold mb-1">Vous avez un projet ?</p>
            <p className="text-sm text-[#4A4A4A]">Notre équipe d'architectes et d'ingénieurs à Dakar étudie votre programme avec discrétion.</p>
          </div>
          <button
            onClick={onNavigateContact}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white font-bold text-xs uppercase tracking-widest transition-all shrink-0 cursor-pointer shadow-md active:scale-95"
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
