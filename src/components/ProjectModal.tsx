import React, { useState } from 'react';
import { X, MapPin, ArrowLeft, ArrowRight, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types/architecture';
import { NextImage } from './NextImage';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestQuoteForProject: (projectTitle: string) => void;
}

export function ProjectModal({
  project,
  onClose,
  onRequestQuoteForProject,
}: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!project) return null;

  // Combine hero and gallery images, eliminating duplicates
  const rawImages = [project.heroImage, ...(project.galleryImages || [])].filter(Boolean);
  const allImages = Array.from(new Set(rawImages));
  if (allImages.length === 0) {
    allImages.push('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85');
  }

  const activeImage = allImages[activeImageIndex] || allImages[0];

  const whatsappUrl = 'https://wa.me/221770000000?text=' + encodeURIComponent(
    `Bonjour Synoreyni Consulting, je souhaite me renseigner pour un projet similaire à : "${project.title}".`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 animate-fade-in">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl bg-slate-900 border border-white/15 overflow-hidden shadow-2xl my-2 sm:my-6 text-white max-h-[94vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Navigation Bar Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-950 border-b border-white/10 sticky top-0 z-30 shrink-0">
          {/* Project Title / Category Info */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-amber-400" />
            <span className="font-display font-bold text-sm sm:text-base tracking-wider uppercase text-white truncate max-w-[280px] sm:max-w-md">
              {project.title}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fermer la vue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Photo & Related Gallery Section (Side-by-side on desktop, images on right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-white/10 bg-slate-950">
            {/* Main Active Photo View */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[400px] lg:col-span-8 bg-slate-950 overflow-hidden">
              <NextImage
                src={activeImage}
                alt={`${project.title} - Vue ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover transition-all duration-300"
              />

              {/* Category Chip */}
              <div className="absolute bottom-4 left-4 sm:left-6 z-10">
                <span className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg">
                  {project.categoryLabel}
                </span>
              </div>

              {/* Photo Counter */}
              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-slate-950/85 backdrop-blur-md text-amber-400 font-mono text-xs border border-white/15">
                {activeImageIndex + 1} / {allImages.length}
              </div>
            </div>

            {/* Related Images on the Right */}
            <div className="lg:col-span-4 p-4 sm:p-5 bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-start">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <span className="text-[11px] uppercase font-mono tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photos Liées ({allImages.length})</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Sélectionner</span>
              </div>

              {/* Grid / Stack of Related Images on the Right */}
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded overflow-hidden border-2 transition-all cursor-pointer group ${
                      activeImageIndex === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/30 scale-[1.02] shadow-lg'
                        : 'border-white/15 opacity-70 hover:opacity-100 hover:border-white/40'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniature ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {activeImageIndex === idx && (
                      <span className="absolute bottom-1 right-1 px-1 py-0.5 bg-amber-400 text-slate-950 font-mono font-bold text-[8px] uppercase leading-none">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-8">
            {/* Header Title & Subtitle */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.location}</span>
                <span className="text-slate-600">•</span>
                <span>Année {project.specs.year}</span>
              </div>
              <h2 id="modal-project-title" className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-light mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Clean Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-slate-950/80 border border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Surface Utile</span>
                <span className="text-white font-mono font-bold text-sm">{project.specs.surface}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Maîtrise d’Œuvre</span>
                <span className="text-amber-400 font-bold text-xs">Synoreyni Consulting</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Investissement</span>
                <span className="text-slate-300 font-mono text-xs">{project.specs.cost || 'Sur consultation'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA + WhatsApp + Back Button */}
        <div className="p-4 sm:px-8 bg-slate-950 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            id="modal-bottom-back-btn"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-lg min-h-[42px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux réalisations</span>
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider hover:bg-emerald-900/80 rounded-lg min-h-[42px] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onRequestQuoteForProject(project.title);
              }}
              id="modal-contact-cta-btn"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all min-h-[42px] shadow-md cursor-pointer active:scale-95"
            >
              <span>Demander une Étude</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
