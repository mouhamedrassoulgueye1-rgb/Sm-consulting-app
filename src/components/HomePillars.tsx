import React from 'react';
import { Building2, Palette, HardHat, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HomePillarsProps {
  onNavigateContact?: () => void;
  onNavigateAbout: () => void;
}

export function HomePillars({ onNavigateContact, onNavigateAbout }: HomePillarsProps) {
  const pillars = [
    {
      id: 'architecture',
      title: 'Architecture',
      subtitle: 'Conception Contemporaine & Bioclimatique',
      icon: Building2,
      tag: 'Pôle 01',
      description:
        'Conception de résidences d’exception, villas côtières et édifices d’envergure. Nous conjuguons volumétrie audacieuse, ventilation naturelle passive et parfaite intégration au climat ouest-africain.',
    },
    {
      id: 'design',
      title: 'Design',
      subtitle: 'Architecture d’Intérieur & Haute Facture',
      icon: Palette,
      tag: 'Pôle 02',
      description:
        'Création d’ambiances exclusives et intemporelles. Nous sélectionnons des matériaux nobles (marbres, bois précieux, pierres locales) et sculptons les espaces par une scénographie lumineuse sur-mesure.',
    },
    {
      id: 'ingenierie',
      title: 'Ingénierie',
      subtitle: 'Structures, BTP & Précision Constructive',
      icon: HardHat,
      tag: 'Pôle 03',
      description:
        'Calculs d’ingénierie avancés et études techniques de pointe. Nos ingénieurs garantissent la solidité structurelle, l’optimisation des fondations en zone côtière et la conformité aux normes internationales.',
    },
    {
      id: 'consultance',
      title: 'Consultance',
      subtitle: 'Maîtrise d’Ouvrage (AMO) & Stratégie',
      icon: Briefcase,
      tag: 'Pôle 04',
      description:
        'Accompagnement stratégique pour investisseurs privés et institutionnels. De l’audit patrimonial à la passation des marchés en contrat ferme, nous sécurisons vos investissements avec rigueur et transparence.',
    },
  ];

  return (
    <section id="expertises-accueil" className="py-20 sm:py-28 bg-[#F4F1EA] border-t border-b border-[#E5E2DA] relative overflow-hidden">
      {/* Background subtleties */}
      <div className="absolute inset-0 bg-grid-slate-light opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#E0DDD5]"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E2DA] text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Savoir-Faire & Pôles d'Excellence</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] uppercase">
              Nos Quatre <span className="text-[#C5A059] font-normal">Piliers Majeurs</span>
            </h2>
          </div>

          <p className="text-[#4A4A4A] text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            De la vision esthétique à l’ingénierie structurelle et à la gestion stratégique, <strong className="text-[#111111] font-semibold">Synoreyni Consulting</strong> intègre tous les métiers de l’acte de bâtir à Dakar.
          </p>
        </motion.div>

        {/* 4 Pillars Grid (Architecture, Design, Ingénierie, Consultance) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-7 bg-white border border-[#E5E2DA] flex flex-col rounded-xl shadow-xs hover:border-[#C5A059] transition-all hover:shadow-lg"
              >
                {/* Top Tag & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-[#FAF9F6] border border-[#E5E2DA] rounded-lg flex items-center justify-center text-[#C5A059]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#C5A059] bg-[#FAF9F6] px-2.5 py-1 border border-[#E5E2DA] rounded-md uppercase tracking-widest">
                    {pillar.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display text-xl font-bold text-[#111111] uppercase tracking-wide mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#C5A059] font-semibold mb-4">
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-[#4A4A4A] font-normal leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Bar linking to independent About page */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 sm:p-8 bg-[#EFECE6] border border-[#E0DDD5] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-base sm:text-lg font-bold text-[#111111] uppercase tracking-wider">
              Découvrir notre histoire, notre équipe et notre vision
            </h4>
            <p className="text-xs sm:text-sm text-[#555555] font-normal">
              Consultez la présentation détaillée du cabinet Synoreyni Consulting et nos engagements constructifs.
            </p>
          </div>

          <button
            onClick={onNavigateAbout}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white font-bold text-xs uppercase tracking-widest transition-all shrink-0 cursor-pointer shadow-sm rounded-lg active:scale-95 min-h-[44px]"
          >
            <span>En savoir plus sur le cabinet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HomePillars;
