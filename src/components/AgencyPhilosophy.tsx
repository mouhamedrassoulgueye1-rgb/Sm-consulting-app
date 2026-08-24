import React from 'react';
import { Sparkles, Award, ShieldCheck, TreePine, ArrowRight } from 'lucide-react';
import { AGENCY_METRICS } from '../data/projectsData';
import { NextImage } from './NextImage';

interface AgencyPhilosophyProps {
  onNavigateContact: () => void;
}

export function AgencyPhilosophy({ onNavigateContact }: AgencyPhilosophyProps) {
  return (
    <section id="agence" className="py-20 sm:py-28 bg-slate-50 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Tag */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-amber-700 font-bold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            L'Atelier & La Vision
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase text-slate-950 tracking-tight leading-tight">
            L'Épure constructive au service de la pérennité.
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal leading-relaxed">
            Établi à Dakar, <strong>Synoreyni Consulting</strong> regroupe des architectes et ingénieurs civils de haut niveau, concevant des espaces où chaque ligne répond à une logique bioclimatique et esthétique irréprochable.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <NextImage
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
                alt="Cabinet d'architecture Synoreyni Consulting Dakar"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
              
              {/* Floating Quote Stamp */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm text-slate-900">
                <p className="text-xs italic font-medium leading-relaxed">
                  "L'architecture de prestige n'est pas une question d'ostentation, mais de justesse des proportions, d'intégration au climat et de rigueur constructive."
                </p>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 mt-1.5 block font-bold">
                  — Direction de l’Ingénierie & Architecture, Synoreyni Consulting
                </span>
              </div>
            </div>
          </div>

          {/* Text Manifesto */}
          <div className="lg:col-span-6 space-y-5 text-slate-700 font-normal text-sm sm:text-base leading-relaxed">
            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-slate-950 tracking-wide">
              Une exigence sans compromis, de l'esquisse au parfait achèvement
            </h3>
            
            <p>
              Notre pratique valorise les matériaux pérennes et l’aération naturelle. Nous abordons chaque programme — qu'il s'agisse 
              d'une villa côtière aux Almadies, de la réhabilitation d'un édifice patrimonial au Plateau ou d'un siège 
              d'entreprise contemporain — avec une précision d'ingénierie et une sensibilité d'artisanat d'art.
            </p>

            <p>
              En intégrant dès les premières esquisses la modélisation 3D avancée et l'optimisation énergétique, 
              nous garantissons à nos clients une maîtrise absolue des coûts, des délais et du confort d'usage.
            </p>

            <div className="pt-2">
              <button
                onClick={onNavigateContact}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-700 hover:text-amber-800 underline underline-offset-4 cursor-pointer"
              >
                <span>Échanger avec nos architectes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          {AGENCY_METRICS.map((metric, idx) => (
            <div key={idx} className="p-3">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
                  {metric.value}
                </span>
                <span className="font-display text-lg sm:text-xl font-bold text-amber-600">
                  {metric.suffix}
                </span>
              </div>
              <p className="mt-1 font-semibold text-slate-900 text-xs sm:text-sm">
                {metric.label}
              </p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgencyPhilosophy;
