import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Project } from '../types/architecture';
import { NextImage } from './NextImage';

interface FeaturedScrollShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

interface StackingPhotoCardProps {
  key?: string | number;
  project: Project;
  index: number;
  total: number;
  onSelectProject: (project: Project) => void;
}

// Helper to get fast, responsive Unsplash URLs with modern WebP formatting
export function getOptimizedImageUrl(url: string, width = 1920, quality = 80): string {
  if (!url) return '';
  if (url.includes('unsplash.com')) {
    // Replace or set optimal parameters for fast loading without visual loss
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=${quality}&fm=webp`;
  }
  return url;
}

function StackingPhotoCard({
  project,
  index,
  total,
  onSelectProject,
}: StackingPhotoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the scroll of this sticky element relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth, subtle scale and dimming on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const brightness = useTransform(scrollYProgress, [0, 1], ['brightness(1)', 'brightness(0.7)']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  // Use optimized WebP URL with high delivery speed
  const optimizedHeroImage = getOptimizedImageUrl(project.heroImage, 1920, 80);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          filter: brightness,
        }}
        className="relative w-full h-full overflow-hidden shadow-2xl origin-top will-change-transform"
      >
        {/* Full-bleed Architectural Photo with eager loading and high fetch priority */}
        <NextImage
          src={optimizedHeroImage}
          alt={project.title}
          fill
          priority={index <= 2} // Preload the first cards eagerly
          sizes="100vw"
          className="object-cover object-center scale-100"
        />

        {/* Dynamic dark veil when being covered by subsequent card */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none z-10"
        />

        {/* Discreet soft gradient at bottom strictly for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none z-10" />

        {/* Top Minimal Counter */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 lg:left-12 z-20">
          <div className="font-mono text-xs text-white/90 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
            0{index + 1} / 0{total}
          </div>
        </div>

        {/* Minimalist Bottom Information Block */}
        <div className="absolute bottom-10 sm:bottom-14 left-4 sm:left-8 lg:left-12 right-4 sm:right-8 lg:right-12 z-20">
          <div className="max-w-3xl space-y-2.5 text-white">
            <div className="flex items-center gap-2 text-[11px] font-mono text-white/80">
              <MapPin className="w-3 h-3 text-[#C5A059]" />
              <span>{project.location}</span>
              <span>•</span>
              <span>{project.specs.year}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
              {project.title}
            </h2>

            <p className="text-xs sm:text-sm text-white/85 font-normal max-w-xl leading-relaxed">
              {project.summary}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onSelectProject(project)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 hover:bg-white text-[#111111] hover:text-[#C5A059] text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>Consulter la fiche</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function FeaturedScrollShowcase({
  projects,
  onSelectProject,
}: FeaturedScrollShowcaseProps) {
  const featured = projects.filter((p) => p.isFeatured !== false);
  const items = featured.length > 0 ? featured.slice(0, 4) : projects.slice(0, 4);

  // Proactively preload all featured photos in browser memory immediately upon mounting
  useEffect(() => {
    if (typeof window === 'undefined') return;

    items.forEach((item) => {
      if (item.heroImage) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = getOptimizedImageUrl(item.heroImage, 1920, 80);
        document.head.appendChild(link);

        // Also warm up memory cache
        const img = new Image();
        img.src = getOptimizedImageUrl(item.heroImage, 1920, 80);
      }
    });
  }, [items]);

  return (
    <section id="featured-scroller" className="relative bg-[#0d0d0d]">
      {items.map((project, index) => (
        <StackingPhotoCard
          key={project.id}
          project={project}
          index={index}
          total={items.length}
          onSelectProject={onSelectProject}
        />
      ))}
    </section>
  );
}

export default FeaturedScrollShowcase;
