import React from 'react';
import { Building2, Palette, HardHat, Briefcase, ArrowRight, Sparkles } from 'lucide-react';

interface HomePillarsProps {
  onNavigateContact: () => void;
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
    <section id="expertises-accueil" className="py-20 sm:py-28 bg-slate-950 border-t border-b border-white/10 relative overflow-hidden">
      {/* Background subtleties */}
      <div className="absolute inset-0 bg-grid-slate-dark opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Savoir-Faire & Pôles d'Excellence</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              Nos Quatre <span className="text-amber-400 font-normal">Piliers Majeurs</span>
            </h2>
          </div>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl font-light leading-relaxed">
            De la vision esthétique à l’ingénierie structurelle et à la gestion stratégique, <strong className="text-white font-medium">Synoreyni Consulting</strong> intègre tous les métiers de l’acte de bâtir à Dakar.
          </p>
        </div>

        {/* 4 Pillars Grid (Architecture, Design, Ingénierie, Consultance) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="p-7 bg-slate-900/80 border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group hover:bg-slate-900/95 hover:shadow-2xl hover:shadow-amber-500/5"
              >
                <div>
                  {/* Top Tag & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-amber-400/80 bg-slate-950/80 px-2.5 py-1 border border-white/10 uppercase tracking-widest">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-xl font-bold text-white uppercase tracking-wide mb-1 group-hover:text-amber-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium mb-4">
                    {pillar.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Action link */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={onNavigateContact}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200 group-hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <span>Étudier un projet</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar linking to independent About page */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider">
              Découvrir notre histoire, notre équipe et notre vision
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Consultez la présentation détaillée du cabinet Synoreyni Consulting et nos engagements constructifs.
            </p>
          </div>

          <button
            onClick={onNavigateAbout}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white font-bold text-xs uppercase tracking-widest transition-all shrink-0 cursor-pointer shadow border border-white/15 rounded-lg"
          >
            <span>En savoir plus sur le cabinet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomePillars;
