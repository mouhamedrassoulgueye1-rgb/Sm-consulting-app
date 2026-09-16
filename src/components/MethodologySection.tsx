import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MethodologySectionProps {
  onNavigateContact: () => void;
}

export function MethodologySection({ onNavigateContact }: MethodologySectionProps) {
  const steps = [
    {
      step: '01',
      title: 'Diagnostic & Génie du Lieu',
      timeframe: 'Phase Préliminaire',
      description: 'Analyse d’ensoleillement, relevé topographique et étude géotechnique/bioclimatique à Dakar et localités environnantes.',
      deliverable: 'Rapport de faisabilité & esquisse d’intention',
    },
    {
      step: '02',
      title: 'Conception Bioclimatique & 3D',
      timeframe: 'Phase Études',
      description: 'Modélisation 3D photoréaliste, calcul thermique passif et choix des matériaux pérennes.',
      deliverable: 'Dossier de Permis de Construire & Rendu 4K',
    },
    {
      step: '03',
      title: 'Sélection des Corps d’État d’Art',
      timeframe: 'Phase Consultation',
      description: 'Appel d’offres rigoureux auprès de notre réseau d’artisans et entreprises BTP qualifiées.',
      deliverable: 'Marché de travaux & Planning ferme GANTT',
    },
    {
      step: '04',
      title: 'Maîtrise d’Œuvre & Réception',
      timeframe: 'Phase Chantier',
      description: 'Direction des travaux hebdomadaire, contrôle qualité millimétrique et respect scrupuleux du budget.',
      deliverable: 'Livraison clé en main & Dossier des Ouvrages Exécutés',
    },
  ];

  return (
    <section id="methode" className="py-20 sm:py-28 bg-[#FAF9F6] relative border-b border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#E5E2DA]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C5A059] font-bold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              Méthodologie & Rigueur
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#111111]">
              L'Art du Déploiement BTP
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#4A4A4A] font-normal max-w-xl leading-relaxed">
            Un processus structuré et transparent qui élimine les aléas de chantier 
            et garantit l'alignement absolu entre la vision initiale du plan et la réalité construite.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-white border border-[#E5E2DA] hover:border-[#C5A059] shadow-xs transition-all duration-300 flex flex-col justify-between group hover:shadow-lg hover:shadow-[#C5A059]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl font-bold text-[#C5A059]">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-mono text-[#666666] bg-[#FAF9F6] border border-[#E5E2DA] px-2.5 py-0.5 rounded-full">
                    {item.timeframe}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-[#111111] uppercase tracking-tight mb-2 group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#4A4A4A] font-normal leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0ECE1] text-[11px] text-[#333333]">
                <span className="text-[#C5A059] font-bold block mb-0.5">Livrable :</span>
                <span>{item.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#EFECE6] border border-[#E0DDD5] text-[#111111] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h4 className="font-display text-lg font-bold uppercase tracking-wide text-[#111111]">
              Vous avez un terrain ou un édifice à valoriser à Dakar ?
            </h4>
            <p className="text-xs sm:text-sm text-[#555555] font-normal mt-1">
              Bénéficiez d’une pré-étude de faisabilité technique et réglementaire.
            </p>
          </div>

          <button
            onClick={onNavigateContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
          >
            <span>Prendre Rendez-vous</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default MethodologySection;
