import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, Search, MapPin, Play, Pause, Sparkles } from 'lucide-react';
import { Project, ProjectCategory } from '../types/architecture';
import { NextImage } from './NextImage';

interface ProjectGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigateContact: () => void;
  showAllProjectsView?: boolean;
  onToggleAllProjectsView?: (show: boolean) => void;
}

export function ProjectGrid({
  projects,
  onSelectProject,
  onNavigateContact,
  showAllProjectsView = false,
  onToggleAllProjectsView,
}: ProjectGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewAll, setViewAll] = useState(showAllProjectsView);
  const [isAnimating, setIsAnimating] = useState(false);

  // Synchronize internal state with parent prop if provided
  useEffect(() => {
    setViewAll(showAllProjectsView);
  }, [showAllProjectsView]);

  const featuredProjects = projects.filter((p) => p.isFeatured !== false);
  const carouselProjects = featuredProjects.length > 0 ? featuredProjects : projects;

  const SLIDE_DURATION = 5000; // 5 seconds
  const PROGRESS_INTERVAL = 50; // update progress every 50ms

  // Dynamic Progress bar and auto-slide timer
  useEffect(() => {
    if (viewAll || isPaused || carouselProjects.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          triggerNextSlide();
          return 0;
        }
        return prev + (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, [carouselProjects.length, isPaused, viewAll, currentIndex]);

  const triggerNextSlide = () => {
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % carouselProjects.length);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselProjects.length) % carouselProjects.length);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselProjects.length);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleSelectSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(idx);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'Toutes les Réalisations' },
    { id: 'residential', label: 'Résidentiel d’Exception' },
    { id: 'heritage', label: 'Rénovation Patrimoniale' },
    { id: 'commercial', label: 'Tertiaire & Bas-Carbone' },
    { id: 'hospitality', label: 'Hôtellerie & Domaines' },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAllProjects = () => {
    setViewAll(true);
    if (onToggleAllProjectsView) {
      onToggleAllProjectsView(true);
    }
  };

  const handleCloseAllProjects = () => {
    setViewAll(false);
    if (onToggleAllProjectsView) {
      onToggleAllProjectsView(false);
    }
  };

  const currentProject = carouselProjects[currentIndex] || carouselProjects[0];

  return (
    <section
      id="projets"
      className={`${viewAll ? 'pt-28 pb-20 sm:pt-36 sm:pb-28' : 'py-20 sm:py-28'} bg-slate-950 relative border-b border-white/10`}
    >
      {/* Background architectural dark grid */}
      <div className="absolute inset-0 bg-grid-slate-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-amber-400 font-bold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Portfolio & Ouvrages
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              {viewAll ? 'Toutes Nos Réalisations' : 'Réalisations Phares'}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl leading-relaxed">
            {viewAll
              ? 'Découvrez l’intégralité de nos projets d’architecture, réhabilitations et constructions de prestige au Sénégal et en Afrique de l’Ouest.'
              : 'Chaque ouvrage concrétise une vision architecturale sur-mesure alliant confort bioclimatique, noblesse des matériaux et rigueur constructive.'}
          </p>
        </div>

        {/* View 1: AUTO CAROUSEL SLIDER WITH DYNAMIC ANIMATION */}
        {!viewAll ? (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Carousel Status Controls */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-3 py-1 border border-white/10">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(carouselProjects.length).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline uppercase tracking-widest text-[11px]">
                  {currentProject.title}
                </span>
              </div>

              {/* Pause/Play toggle button for accessibility */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                title={isPaused ? 'Reprendre le diaporama' : 'Mettre en pause'}
              >
                {isPaused ? <Play className="w-3 h-3 text-amber-400" /> : <Pause className="w-3 h-3 text-slate-400" />}
                <span className="hidden sm:inline">{isPaused ? 'Lecture' : 'Pause'}</span>
              </button>
            </div>

            {/* Main Featured Slide Container */}
            <div className="relative overflow-hidden border border-white/15 bg-slate-900 shadow-2xl">
              {/* Dynamic Live Progress Bar across the top edge */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 z-30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] sm:min-h-[520px]">
                {/* Image Section with dynamic transition */}
                <div
                  className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto h-full min-h-[300px] cursor-pointer group overflow-hidden"
                  onClick={() => onSelectProject(currentProject)}
                >
                  <div
                    key={currentProject.id}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      isAnimating ? 'opacity-90 scale-[1.02]' : 'opacity-100 scale-100'
                    }`}
                  >
                    <NextImage
                      src={currentProject.heroImage}
                      alt={currentProject.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent lg:hidden" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg">
                      {currentProject.categoryLabel}
                    </span>
                  </div>

                  {/* Mobile Quick Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden z-10">
                    <p className="text-xs font-mono text-amber-400 mb-1">{currentProject.location}</p>
                    <h3 className="text-xl font-bold font-display uppercase">{currentProject.title}</h3>
                  </div>
                </div>

                {/* Information Panel */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-slate-900/95 text-white">
                  <div>
                    <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{currentProject.location}</span>
                      <span className="text-slate-600">•</span>
                      <span>Livraison {currentProject.specs.year}</span>
                    </div>

                    <h3 className="hidden lg:block font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-2">
                      {currentProject.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-amber-200/90 font-light italic mb-4">
                      {currentProject.subtitle}
                    </p>

                    <p className="text-sm text-slate-300 font-light leading-relaxed mb-6 line-clamp-4">
                      {currentProject.summary}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-950/80 border border-white/10 mb-6 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Surface Utile</span>
                        <span className="text-white font-mono font-medium">{currentProject.specs.surface}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Maîtrise d’Œuvre</span>
                        <span className="text-amber-400 font-medium">Synoreyni Consulting</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Carousel Controls */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => onSelectProject(currentProject)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer shadow-md active:scale-95"
                    >
                      <span>Consulter la Fiche</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {/* Next / Prev Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        className="w-10 h-10 bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
                        aria-label="Projet précédent"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-10 h-10 bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
                        aria-label="Projet suivant"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Animated Thumbnails / Slides Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {carouselProjects.map((p, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectSlide(idx)}
                    className={`relative text-left p-2.5 border rounded-lg transition-all duration-300 cursor-pointer overflow-hidden group ${
                      isActive
                        ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-950/60 border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Active mini progress bar indicator */}
                    {isActive && !isPaused && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400" />
                    )}

                    <div className="flex items-center gap-2.5">
                      <div className="relative w-12 h-10 rounded overflow-hidden shrink-0">
                        <NextImage
                          src={p.heroImage}
                          alt={p.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <span className="text-[10px] font-mono text-amber-400 block uppercase">
                          0{idx + 1} • {p.specs.year}
                        </span>
                        <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                          {p.title}
                        </h4>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* "Découvrir plus" Button below Carousel */}
            <div className="mt-12 text-center">
              <button
                onClick={handleOpenAllProjects}
                id="discover-more-projects-btn"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-white/20 rounded-lg text-white text-xs uppercase tracking-[0.18em] font-bold transition-all shadow-xl hover:border-amber-400 active:scale-95 cursor-pointer"
              >
                <span>Découvrir plus de réalisations</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
              <p className="text-xs text-slate-400 mt-2">
                Accédez à l'ensemble du catalogue des projets résidentiels, tertiaires et patrimoniaux
              </p>
            </div>
          </div>
        ) : (
          /* View 2: FULL PROJECTS CATALOGUE (/projets) */
          <div>
            {/* Top Toolbar: Filters, Search, and Back to Carousel */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 text-xs uppercase tracking-[0.14em] font-semibold whitespace-nowrap rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Search input & Back button */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un projet..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-white/15 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <button
                  onClick={handleCloseAllProjects}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-white/15 rounded-lg whitespace-nowrap cursor-pointer"
                >
                  Vue Carrousel
                </button>
              </div>
            </div>

            {/* Grid of Projects */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/60 border border-white/10">
                <p className="text-slate-400 text-sm">Aucun projet ne correspond à votre recherche.</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-bold text-amber-400 hover:underline cursor-pointer rounded-lg bg-white/5"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="group cursor-pointer flex flex-col bg-slate-900 border border-white/10 hover:border-amber-400/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
                  >
                    {/* Image Frame */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-950">
                      <NextImage
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-sm text-amber-400 text-[10px] uppercase font-bold tracking-wider border border-white/10">
                          {project.categoryLabel}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="w-8 h-8 bg-slate-950/80 backdrop-blur-sm text-white flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shadow">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                          <span>{project.location}</span>
                          <span>{project.specs.year}</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-4">
                          {project.title}
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                        <span>Surface : <strong className="text-white">{project.specs.surface}</strong></span>
                        <span className="text-amber-400 font-bold group-hover:underline">
                          Voir la fiche →
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectGrid;
