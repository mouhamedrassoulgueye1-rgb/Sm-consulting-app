import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MoveHorizontal, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
import { NextImage } from './NextImage';

interface BeforeAfterSliderProps {
  onNavigateContact?: () => void;
}

export function BeforeAfterSlider({ onNavigateContact }: BeforeAfterSliderProps) {
  // Slider position from 0 to 100%
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Before image: historic/raw structural condition
  const beforeImage = 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80';
  // After image: high-end luxury architectural renovation
  const afterImage = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="avant-apres-renovation" className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E5E2DA] relative overflow-hidden">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-grid-slate-light opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#E5E2DA]"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E2DA] text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Réhabilitation & Valorisation Patrimoniale</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] uppercase">
              Transformation <span className="text-[#C5A059] font-normal">Avant / Après</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#4A4A4A] font-normal max-w-lg leading-relaxed">
            Glissez la barre interactive pour observer la réinvention architecturale d'un édifice historique au Plateau (Dakar) : préservation des volumes d'origine et intégration contemporaine de grand standing.
          </p>
        </motion.div>

        {/* Interactive Comparison Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Slider (8 columns) */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#E5E2DA] shadow-xl select-none cursor-ew-resize group bg-[#EAE7DC]"
            >
              {/* Layer 1: "Après" Image (Background Full View) */}
              <div className="absolute inset-0 w-full h-full">
                <NextImage
                  src={afterImage}
                  alt="Après réhabilitation de prestige - Synoreyni Consulting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-center pointer-events-none"
                />
                <span className="absolute bottom-4 right-4 z-10 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white font-mono text-[11px] font-bold uppercase tracking-wider rounded-md border border-white/20">
                  Après Restauration
                </span>
              </div>

              {/* Layer 2: "Avant" Image (Clipped overlay) */}
              <div
                className="absolute inset-0 h-full overflow-hidden will-change-[clip-path]"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                }}
              >
                <NextImage
                  src={beforeImage}
                  alt="Avant réhabilitation - État d'origine"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-center filter grayscale-[30%] pointer-events-none"
                />
                <span className="absolute bottom-4 left-4 z-10 px-3 py-1.5 bg-black/60 backdrop-blur-md text-[#FAF9F6] font-mono text-[11px] font-bold uppercase tracking-wider rounded-md border border-white/20">
                  Avant Rénovation
                </span>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white z-20 shadow-[0_0_12px_rgba(0,0,0,0.6)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Central Draggable Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#111111] border-2 border-[#C5A059] shadow-xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <MoveHorizontal className="w-4 h-4 text-[#C5A059]" />
                </div>
              </div>

              {/* Top Hint Badge */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-[10px] font-mono uppercase tracking-wider border border-white/20">
                  Glisser pour comparer
                </span>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex items-center justify-between gap-2 mt-4 px-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSliderPosition(0)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                    sliderPosition === 0 ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-[#4A4A4A] border-[#E5E2DA] hover:border-[#C5A059]'
                  }`}
                >
                  100% Après
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPosition(50)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                    sliderPosition === 50 ? 'bg-[#C5A059] text-white border-[#C5A059]' : 'bg-white text-[#4A4A4A] border-[#E5E2DA] hover:border-[#C5A059]'
                  }`}
                >
                  50 / 50
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPosition(100)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                    sliderPosition === 100 ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-[#4A4A4A] border-[#E5E2DA] hover:border-[#C5A059]'
                  }`}
                >
                  100% Avant
                </button>
              </div>

              {/* Accessible HTML Range Input */}
              <label htmlFor="before-after-range" className="sr-only">Position du comparateur avant après</label>
              <input
                id="before-after-range"
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-28 accent-[#C5A059] cursor-pointer"
                aria-label="Contrôle du comparateur Avant Après"
              />
            </div>
          </div>

          {/* Project Details Narrative (4 columns) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 sm:p-7 bg-white border border-[#E5E2DA] rounded-2xl shadow-md space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#C5A059] font-bold uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Dakar Plateau, Sénégal</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#111111]">
                  Résidence du Plateau
                </h3>
                <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                  Restauration complète d’un hôtel particulier colonial en résidence contemporaine d’ambassade.
                </p>
              </div>

              {/* Key Architectural Improvements */}
              <div className="space-y-2.5 pt-2 border-t border-[#F0ECE1] text-xs text-[#4A4A4A]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Consolidation structurelle sous-œuvre sans altération des façades patrimoniales.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Création d'un puits de lumière bioclimatique avec apport d'air frais naturel.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Finitions intérieures d’exception : marbre de Carrare et boiseries locales sénégalaises.</span>
                </div>
              </div>

              {/* Action Button */}
              {onNavigateContact && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onNavigateContact}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer active:scale-95 min-h-[44px]"
                  >
                    <span>Étudier un projet de rénovation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterSlider;
