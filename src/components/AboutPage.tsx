import React from 'react';
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Sparkles,
  Compass,
  ShieldCheck,
  Building2,
  Leaf,
} from 'lucide-react';
import { motion } from 'motion/react';
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
  const values = [
    {
      icon: Compass,
      title: 'Conception Bioclimatique',
      desc: 'Optimisation de la ventilation naturelle, étude d’ensoleillement et adaptation fine au climat soudano-sahélien pour minimiser les charges énergétiques.',
    },
    {
      icon: ShieldCheck,
      title: 'Rigueur constructive',
      desc: 'Contrôle qualité strict à chaque étape : études de sols, calculs d’ossatures béton armé et charpentes, conformité aux normes internationales Eurocodes & BAEL.',
    },
    {
      icon: Leaf,
      title: 'Matières Nobles & Locales',
      desc: 'Valorisation de la pierre de Rufisque, brique de terre compressée (BTC), bois imputrescibles et enduits minéraux aux teintes chaudes et pérennes.',
    },
    {
      icon: Building2,
      title: 'Maîtrise d’Œuvre Intégrée',
      desc: 'De l’esquisse architecturale à la remise des clés : direction des travaux, pilotage des corps d’état et respect scrupuleux des délais et budgets convenus.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#FAF9F6] text-[#111111] min-h-screen">
      {/* Top Breadcrumb & Return Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#555555] hover:text-[#C5A059] transition-colors cursor-pointer group font-semibold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l'accueil</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#4A4A4A] bg-white px-3.5 py-1.5 border border-[#E5E2DA] rounded-full shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Dakar, Sénégal</span>
          </div>
        </div>
      </div>

      {/* Hero Banner for About Page with Scroll-In Effect */}
      <section className="relative py-16 sm:py-24 border-t border-b border-[#E5E2DA] overflow-hidden bg-[#FAF9F6]">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <NextImage
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=85"
            alt="Synoreyni Consulting Cabinet d'Architecture Dakar"
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.95] opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/80 to-[#FAF9F6]/60" />
          <div className="absolute inset-0 bg-grid-slate-light opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#C5A059]/30 text-[#C5A059] text-xs font-bold uppercase tracking-widest rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>À Propos de Synoreyni Consulting</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] uppercase leading-[1.1]">
              L’Excellence de l'Ingénierie & de l’Architecture <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E]">
                au Cœur de Dakar
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#4A4A4A] font-normal leading-relaxed max-w-3xl">
              Fondé sur une vision où la rigueur technique rencontre la pureté sculpturale, <strong className="text-[#111111] font-semibold">Synoreyni Consulting</strong> conçoit et pilote des projets d’exception à Dakar, au Sénégal et à travers l’Afrique de l’Ouest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Counter Bar with Scroll Reveal */}
      <section className="py-12 border-b border-[#E5E2DA] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
            {AGENCY_METRICS.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 bg-[#FAF9F6] border border-[#E5E2DA] rounded-2xl flex flex-col justify-between shadow-xs hover:border-[#C5A059] transition-colors"
              >
                <div className="flex items-baseline justify-center sm:justify-start gap-1 mb-2">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#111111] tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-[#C5A059] font-bold text-2xl">{metric.suffix}</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-[#111111] uppercase tracking-wider block mb-1">
                    {metric.label}
                  </span>
                  <span className="text-xs text-[#666666] font-normal">{metric.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier Narrative with Scroll Reveal & Image Zoom */}
      <section className="py-20 sm:py-28 relative border-b border-[#E5E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Photo Card with Scroll Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E5E2DA] shadow-xl group">
                <NextImage
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
                  alt="Atelier Synoreyni Consulting Dakar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Quote in card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md border border-[#E5E2DA] rounded-xl text-[#111111] shadow-lg"
                >
                  <p className="text-xs italic font-normal leading-relaxed text-[#333333]">
                    « L'architecture d'exception ne réside pas dans l'ostentation, mais dans la justesse des proportions, la symbiose avec le climat et la rigueur d'exécution. »
                  </p>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] mt-2 block font-bold">
                    — Direction de l’Ingénierie, Synoreyni Consulting
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Manifesto Text with Scroll Reveal */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-6 text-[#4A4A4A] font-normal leading-relaxed text-sm sm:text-base"
            >
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C5A059] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                Notre Vision & Engagement
              </div>

              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-[#111111] tracking-tight leading-tight">
                Une Approche Intégrée, du Premier Trait jusqu’à la Réception
              </h2>

              <p>
                Depuis sa création à Dakar, <strong className="text-[#111111]">Synoreyni Consulting</strong> réunit des compétences complémentaires : architectes concepteurs, designers d’espace, ingénieurs en génie civil et spécialistes en économie de la construction.
              </p>

              <p>
                Nous abordons chaque programme — qu'il s'agisse d'une villa de prestige aux Almadies, d'une rénovation d'envergure au Plateau ou d'un complexe tertiaire à Diamniadio — avec la même exigence : sublimer les matières nobles locales, maîtriser la ventilation thermique naturelle et garantir un suivi de chantier rigoureusement transparent.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onNavigateProjects}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer active:scale-95 min-h-[44px]"
                >
                  <span>Voir nos réalisations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onNavigateContact}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-[#FAF9F6] text-[#111111] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-[#D1D5DB] shadow-xs min-h-[44px]"
                >
                  <span>Prendre contact</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence with Staggered Scroll Animation */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E5E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C5A059] font-mono block mb-2">
              Principes Fondateurs
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-[#111111] tracking-tight">
              Les Piliers de Notre Pratique
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 bg-[#FAF9F6] border border-[#E5E2DA] rounded-2xl flex flex-col justify-between hover:border-[#C5A059] transition-all hover:shadow-lg shadow-xs"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E2DA] flex items-center justify-center text-[#C5A059] mb-5 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#111111] uppercase mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct Contact / Devis Banner with Scroll Entrance */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-12 bg-white border border-[#E5E2DA] rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl"
          >
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C5A059] block font-mono">
                Initiation de Programme
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] uppercase">
                Vous avez un projet architectural à Dakar ?
              </h3>
              <p className="text-sm text-[#555555] font-normal max-w-xl">
                Nos architectes et ingénieurs vous accueillent à notre bureau des Almadies pour analyser vos plans et étudier votre cahier des charges.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={onNavigateContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-md active:scale-95 cursor-pointer min-h-[44px]"
              >
                <span>Demander un Devis / Étude</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#FAF9F6] hover:bg-white text-[#111111] text-xs font-semibold uppercase tracking-widest rounded-lg transition-colors border border-[#D1D5DB] cursor-pointer shadow-xs min-h-[44px]"
              >
                <span>Explorer les Réalisations</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
