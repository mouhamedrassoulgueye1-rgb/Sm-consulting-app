import React from 'react';
import { Check, Compass, HardHat, Building2, Palette, ArrowRight } from 'lucide-react';
import { AGENCY_DISCIPLINES } from '../data/projectsData';

interface DisciplinesSectionProps {
  onNavigateContact: () => void;
}

export function DisciplinesSection({ onNavigateContact }: DisciplinesSectionProps) {
  const getIcon = (code: string) => {
    switch (code) {
      case '01':
        return <Building2 className="w-5 h-5 text-[#C5A059]" />;
      case '02':
        return <Compass className="w-5 h-5 text-[#C5A059]" />;
      case '03':
        return <HardHat className="w-5 h-5 text-[#C5A059]" />;
      default:
        return <Palette className="w-5 h-5 text-[#C5A059]" />;
    }
  };

  return (
    <section id="expertises" className="py-20 sm:py-28 bg-[#FAF9F6] relative border-b border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#E5E2DA]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C5A059] font-bold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              Savoir-Faire Intégré
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#111111]">
              Pôles d’Expertise
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#4A4A4A] font-normal max-w-xl leading-relaxed">
            De l'esquisse conceptuelle jusqu'aux finitions d'ébénisterie et à la réception des travaux, 
            notre équipe pluridisciplinaire maîtrise l'intégralité de la chaîne de valeur architecturale à Dakar.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AGENCY_DISCIPLINES.map((discipline) => (
            <div
              key={discipline.code}
              className="p-7 sm:p-9 rounded-2xl bg-white border border-[#E5E2DA] hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between group hover:shadow-lg hover:shadow-[#C5A059]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E5E2DA] flex items-center justify-center">
                      {getIcon(discipline.code)}
                    </div>
                    <span className="font-mono text-xs text-[#C5A059] tracking-widest uppercase font-bold">
                      Pôle {discipline.code}
                    </span>
                  </div>

                  <span className="text-[#888888] text-xs font-mono font-medium">Synoreyni</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] uppercase tracking-tight mb-2 group-hover:text-[#C5A059] transition-colors">
                  {discipline.title}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-[#C5A059] mb-3">
                  {discipline.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#4A4A4A] font-normal leading-relaxed mb-6">
                  {discipline.description}
                </p>

                {/* Deliverables checklist */}
                <div className="space-y-2 pt-4 border-t border-[#F0ECE1]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111] block mb-2">
                    Livrables Clés & Engagements :
                  </span>
                  {discipline.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#333333] font-medium">
                      <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0ECE1] flex items-center justify-between">
                <button
                  onClick={onNavigateContact}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  <span>Consulter sur ce pôle</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DisciplinesSection;
