import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MapPin } from 'lucide-react';
import { NextImage } from './NextImage';

interface HeroProps {
  onExploreProjects?: () => void;
  onNavigateContact?: () => void;
}

export function Hero({ onExploreProjects }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  // Measure scroll through the Hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Smooth, subtle luxury parallax: image moves at a gentle offset, slightly scales for cinematic depth
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const handleScrollDown = () => {
    if (onExploreProjects) {
      onExploreProjects();
      return;
    }
    const target = document.getElementById('featured-scroller') || document.getElementById('projets');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} id="hero" className="relative bg-[#FAF9F6] border-b border-[#E5E2DA]">
      {/* 1. Full-screen architectural photo with subtle parallax depth */}
      <div className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#EAE7DC]">
        {/* Parallax Image Container extending slightly to accommodate movement without edge clipping */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute -top-[10%] -bottom-[10%] left-0 right-0 w-full h-[120%] origin-center will-change-transform"
        >
          <NextImage
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80&fm=webp"
            alt="Architecture d'Élite Dakar"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Top subtle coordinate tag */}
        <div className="absolute top-24 right-4 sm:right-8 lg:right-12 z-20 pointer-events-none">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#444444] bg-white/80 px-3 py-1.5 border border-[#E5E2DA] backdrop-blur-sm shadow-xs pointer-events-auto rounded-full">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Dakar • 14.7167° N, 17.4677° W</span>
          </div>
        </div>

        {/* Small arrow in bottom center to guide scrolling with fade out */}
        <motion.div
          style={{ opacity: arrowOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <button
            onClick={handleScrollDown}
            className="group flex flex-col items-center justify-center p-3 bg-white/90 hover:bg-white text-[#111111] hover:text-[#C5A059] border border-[#E5E2DA] rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer active:scale-95"
            aria-label="Faire défiler vers le bas"
          >
            <ChevronDown className="w-5 h-5 text-[#C5A059] animate-bounce" />
          </button>
        </motion.div>
      </div>

      {/* 2. Text Content placed below the photo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="max-w-3xl space-y-3">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#C5A059] font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            Cabinet d'Ingénierie & Architecture
          </p>

          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] uppercase leading-tight">
            Conception Durable & Bâtiment de Prestige
          </h1>

          <p className="text-sm sm:text-base text-[#4A4A4A] font-normal leading-relaxed pt-1">
            Cabinet d’ingénierie et d’architecture de référence à Dakar, spécialisé dans la maîtrise d’œuvre de villas d'exception, d'édifices contemporains et de réhabilitations patrimoniales.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
