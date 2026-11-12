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
  project: Project;
  index: number;
  total: number;
  onSelectProject: (project: Project) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

// Helper to get fast, responsive image URLs with correct size for the device
export function getOptimizedImageUrl(url: string, width = 1920, quality = 80): string {
  if (!url) return '';
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=${quality}&fm=webp`;
  }
  return url;
}

// Returns the right image width based on screen size — avoids loading 1920px on a 390px phone
function getResponsiveImageWidth(): number {
  if (typeof window === 'undefined') return 1200;
  const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x to avoid huge images on 3x screens
  const vw = window.innerWidth;
  if (vw <= 480) return Math.round(480 * dpr);
  if (vw <= 768) return Math.round(768 * dpr);
  if (vw <= 1280) return Math.round(1280 * dpr);
  return 1920;
}

function StackingPhotoCard({
  project,
  index,
  total,
  onSelectProject,
  containerRef,
}: StackingPhotoCardProps) {
  // Use the SHARED parent container ref — avoids N separate useScroll listeners
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Per-card progress mapped from global scroll
  // Each card occupies 1/total of the scroll space
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;

  // Scale down slightly as next card overlaps — no filter/brightness, only scale + opacity overlay
  const scale = useTransform(scrollYProgress, [cardStart, cardEnd], [1, 0.93]);
  const overlayOpacity = useTransform(scrollYProgress, [cardStart, cardEnd], [0, 0.42]);

  // Responsive image — smaller on mobile to save bandwidth
  const imageWidth = getResponsiveImageWidth();
  const optimizedHeroImage = getOptimizedImageUrl(project.heroImage, imageWidth, 82);

  return (
    <div
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      {/* will-change-transform tells the GPU to promote this layer immediately */}
      <motion.div
        style={{ scale }}
        className="relative w-full h-full overflow-hidden shadow-2xl origin-top will-change-transform"
      >
        {/* Full-bleed Architectural Photo */}
        <NextImage
          src={optimizedHeroImage}
          alt={project.title}
          fill
          priority={index <= 1}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay — opacity only, NOT filter. Compositing overlay is GPU-free */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none z-10 will-change-opacity"
        />

        {/* Gradient for text legibility — static, no animation cost */}
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none z-10" />

        {/* Top Minimal Counter */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 lg:left-12 z-20">
          <div className="font-mono text-xs text-white/90 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
            0{index + 1} / 0{total}
          </div>
        </div>

        {/* Bottom Information Block */}
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
                className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] bg-white/95 hover:bg-white text-[#111111] hover:text-[#C5A059] text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md transition-colors duration-200 cursor-pointer active:scale-95"
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

  // Single shared container ref — all cards use this instead of their own useScroll
  const sectionRef = useRef<HTMLDivElement>(null);

  // Proactively preload featured images at the right resolution
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const imageWidth = getResponsiveImageWidth();

    items.forEach((item, i) => {
      if (!item.heroImage) return;
      const optimized = getOptimizedImageUrl(item.heroImage, imageWidth, 82);

      // High-priority preload link for first 2 images
      if (i < 2) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = optimized;
        link.setAttribute('fetchpriority', 'high');
        document.head.appendChild(link);
      }

      // Warm memory cache for all items
      const img = new Image();
      img.src = optimized;
    });
  }, []); // Only on mount — items are stable

  return (
    <section
      id="featured-scroller"
      ref={sectionRef}
      className="relative bg-[#0d0d0d]"
    >
      {items.map((project, index) => (
        <StackingPhotoCard
          key={project.id}
          project={project}
          index={index}
          total={items.length}
          onSelectProject={onSelectProject}
          containerRef={sectionRef as React.RefObject<HTMLDivElement>}
        />
      ))}
    </section>
  );
}

export default FeaturedScrollShowcase;
