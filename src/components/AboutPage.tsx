import React from 'react';
import {
  Building2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { AGENCY_METRICS } from '../data/projectsData';
import { NextImage } from './NextImage';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
  onNavigateContact: () => void;
}

export function AboutPage({
  onNavigateHome,
  onNavigateProjects,
  onNavigateContact,
}: AboutPageProps) {
  return (
    <div className="pt-24 pb-20 bg-slate-950 text-slate-100 min-h-screen">
      {/* Top Breadcrumb & Return Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-4 pb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-amber-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l'accueil</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3.5 py-1.5 border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Dakar, Sénégal</span>
          </div>
        </div>
      </div>

      {/* Hero Banner for About Page */}
      <section className="relative py-16 sm:py-24 border-t border-b border-white/10 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <NextImage
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=85"
            alt="Synoreyni Consulting Cabinet d'Architecture Dakar"
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.3] opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
          <div className="absolute inset-0 bg-grid-slate-dark opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>À Propos de Synoreyni Consulting</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-[1.1]">
              L’Excellence de l'Ingénierie & de l’Architecture <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                au Cœur de Dakar
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
              Fondé sur une vision où la rigueur technique rencontre la pureté sculpturale, <strong className="text-white font-medium">Synoreyni Consulting</strong> conçoit et pilote des projets d’exception à Dakar, au Sénégal et à travers l’Afrique de l’Ouest.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Counter Bar (50+ Projets) */}
      <section className="py-12 border-b border-white/10 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            {AGENCY_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-950/80 border border-white/10 flex flex-col justify-between"
              >
                <div className="flex items-baseline justify-center sm:justify-start gap-1 mb-2">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-amber-400 font-bold text-2xl">{metric.suffix}</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-200 uppercase tracking-wider block mb-1">
                    {metric.label}
                  </span>
                  <span className="text-xs text-slate-400 font-light">{metric.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier Narrative & Philosophical Manifesto */}
      <section className="py-20 sm:py-28 relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Photo Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/15 shadow-2xl">
                <NextImage
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
                  alt="Atelier Synoreyni Consulting Dakar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                {/* Quote in card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-950/90 backdrop-blur-md border border-white/15 text-white">
                  <p className="text-xs italic font-light leading-relaxed text-slate-200">
                    « L'architecture d'exception ne réside pas dans l'ostentation, mais dans la justesse des proportions, la symbiose avec le climat et la rigueur d'exécution. »
                  </p>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mt-2 block font-bold">
                    — Direction de l’Ingénierie, Synoreyni Consulting
                  </span>
                </div>
              </div>
            </div>

            {/* Manifesto Text */}
            <div className="lg:col-span-6 space-y-6 text-slate-300 font-light leading-relaxed text-sm sm:text-base">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-amber-400 font-bold">
                <span className="w-2 h-2 bg-amber-400" />
                Notre Vision & Engagement
              </div>

              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-white tracking-tight leading-tight">
                Une Approche Intégrée, du Premier Trait jusqu’à la Réception
              </h2>

              <p>
                Depuis sa création à Dakar, <strong>Synoreyni Consulting</strong> réunit des compétences complémentaires : architectes concepteurs, designers d’espace, ingénieurs en génie civil et spécialistes en économie de la construction.
              </p>

              <p>
                Nous abordons chaque programme — qu'il s'agisse d'une villa de prestige aux Almadies, d'une rénovation d'envergure au Plateau ou d'un complexe tertiaire à Diamniadio — avec la même exigence : sublimer les matières nobles locales, maîtriser la ventilation thermique naturelle et garantir un suivi de chantier rigoureusement transparent.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onNavigateProjects}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow cursor-pointer active:scale-95"
                >
                  <span>Voir nos réalisations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onNavigateContact}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-white/10"
                >
                  <span>Prendre contact</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact / Devis Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-amber-400/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400 block font-mono">
                Initiation de Programme
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase">
                Vous avez un projet architectural à Dakar ?
              </h3>
              <p className="text-sm text-slate-300 font-light max-w-xl">
                Nos architectes et ingénieurs vous accueillent à notre bureau des Almadies pour analyser vos plans et étudier votre cahier des charges.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={onNavigateContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Demander un Devis / Étude</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold uppercase tracking-widest rounded-lg transition-colors border border-white/10 cursor-pointer"
              >
                <span>Explorer les Réalisations</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
