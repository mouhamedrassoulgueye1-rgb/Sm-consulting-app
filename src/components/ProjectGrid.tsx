import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight, Search, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Project, ProjectCategory, CategoryItem } from '../types/architecture';
import { DEFAULT_CATEGORIES } from '../data/projectsData';
import { NextImage } from './NextImage';

interface ProjectGridProps {
  projects: Project[];
  categories?: CategoryItem[];
  onSelectProject: (project: Project) => void;
  onNavigateContact: () => void;
  showAllProjectsView?: boolean;
  onToggleAllProjectsView?: (show: boolean) => void;
}

export function ProjectGrid({
  projects,
  categories = DEFAULT_CATEGORIES,
  onSelectProject,
  onNavigateContact,
  showAllProjectsView = false,
  onToggleAllProjectsView,
}: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewAll, setViewAll] = useState(showAllProjectsView);

  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setViewAll(showAllProjectsView);
  }, [showAllProjectsView]);

  const featuredProjects = projects.filter((p) => p.isFeatured !== false);
  const displayFeatured = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 5);

  const categoryOptions: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'Toutes les Réalisations' },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
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
    const el = document.getElementById('projets');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollHorizontal = (direction: 'left' | 'right') => {
    if (horizontalScrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      horizontalScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projets"
      className={`${viewAll ? 'pt-24 pb-20 sm:pt-32 sm:pb-28' : 'py-20 sm:py-28'} bg-[#FAF9F6] relative border-b border-[#E5E2DA]`}
    >
      {/* Background architectural light grid */}
      <div className="absolute inset-0 bg-grid-slate-light opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header — once:true: s'anime UNE seule fois, ne re-surveille plus */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#E5E2DA]"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#C5A059] font-bold mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              Portfolio
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#111111]">
              {viewAll ? 'Toutes Nos Réalisations' : 'Réalisations Phares'}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#4A4A4A] font-normal max-w-lg leading-relaxed">
            {viewAll
              ? "Explorez l'intégralité de nos projets d'architecture et constructions au Sénégal et en Afrique de l'Ouest."
              : 'Découvrez nos réalisations phares défilables horizontalement.'}
          </p>
        </motion.div>

        {/* View 1: HORIZONTAL SCROLLING CARDS */}
        {!viewAll ? (
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-[#555555] font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-bold text-[#111111] uppercase tracking-wider">
                  Défilement Horizontal
                </span>
                <span className="hidden sm:inline">• Glissez ou utilisez les flèches</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollHorizontal('left')}
                  className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-lg bg-white border border-[#E5E2DA] flex items-center justify-center text-[#111111] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors duration-200 shadow-xs cursor-pointer active:scale-95"
                  aria-label="Faire défiler vers la gauche"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => scrollHorizontal('right')}
                  className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-lg bg-white border border-[#E5E2DA] flex items-center justify-center text-[#111111] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors duration-200 shadow-xs cursor-pointer active:scale-95"
                  aria-label="Faire défiler vers la droite"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Horizontal Track — scroll inertiel iOS + masque scrollbar */}
            <div
              ref={horizontalScrollRef}
              className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory select-none"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch', // Scroll inertiel iOS Safari
                scrollbarWidth: 'none',           // Firefox
                msOverflowStyle: 'none',          // IE/Edge
              }}
            >
              {displayFeatured.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="snap-start shrink-0 w-[300px] sm:w-[380px] md:w-[420px] bg-white border border-[#E5E2DA] hover:border-[#C5A059] rounded-2xl overflow-hidden transition-[border-color,box-shadow] duration-300 shadow-md hover:shadow-xl group cursor-pointer flex flex-col justify-between"
                >
                  {/* Photo area */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EAE7DC]">
                    <NextImage
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 300px, 420px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                    />

                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] text-white text-[11px] font-bold uppercase tracking-wider rounded shadow-md">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-bold rounded">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="w-8 h-8 rounded-full bg-white/95 text-[#111111] flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-white transition-colors duration-200 shadow">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#777777] mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>{project.location}</span>
                        </div>
                        <span>{project.specs.year}</span>
                      </div>

                      <h3 className="font-display text-xl font-bold uppercase text-[#111111] group-hover:text-[#C5A059] transition-colors duration-200 mb-2">
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#555555] font-medium line-clamp-2 leading-relaxed mb-4">
                        {project.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
                      <span className="text-[#666666]">
                        Surface : <strong className="text-[#111111] font-mono">{project.specs.surface}</strong>
                      </span>
                      <span className="text-[#C5A059] font-bold group-hover:underline">
                        Détails & Photos →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA voir tous les projets */}
            <div className="text-center pt-8">
              <button
                onClick={handleOpenAllProjects}
                id="discover-more-projects-btn"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 min-h-[52px] bg-white hover:bg-[#F4F1EA] border border-[#D1D5DB] hover:border-[#C5A059] rounded-xl text-[#111111] text-xs uppercase tracking-[0.18em] font-bold transition-[background-color,border-color] duration-200 shadow-md active:scale-95 cursor-pointer"
              >
                <span>Accéder à toutes nos réalisations</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>
          </div>
        ) : (
          /* View 2: FULL PROJECTS CATALOGUE */
          <div>
            {/* Sticky Filter Toolbar */}
            <div className="sticky top-[60px] sm:top-[68px] z-30 bg-[#FAF9F6]/95 backdrop-blur-md py-3.5 mb-8 border-b border-[#E5E2DA]">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Category Pills — scroll horizontal sur mobile */}
                <div
                  className="flex items-center gap-2 overflow-x-auto pb-1"
                  style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                  {categoryOptions.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2 min-h-[40px] text-xs uppercase tracking-[0.14em] font-semibold whitespace-nowrap rounded-lg transition-[background-color,color,box-shadow] duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] text-white shadow-md font-bold'
                            : 'bg-white hover:bg-[#F4F1EA] text-[#4A4A4A] border border-[#E5E2DA]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Search & Count */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher un projet..."
                      className="w-full pl-9 pr-3 py-2 min-h-[44px] text-xs border border-[#D1D5DB] rounded-lg bg-white text-[#111111] placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>

                  <span className="hidden sm:inline-block text-xs font-mono text-[#777777] whitespace-nowrap bg-white px-3 py-2 border border-[#E5E2DA] rounded-lg">
                    {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Grid of Projects */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-white border border-[#E5E2DA] rounded-2xl">
                <p className="text-[#666666] text-sm">Aucun projet ne correspond à votre recherche.</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 min-h-[44px] text-xs font-bold text-[#C5A059] hover:underline cursor-pointer rounded-lg bg-[#FAF9F6] border border-[#E5E2DA]"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredProjects.map((project, idx) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }} // once:true — s'anime une seule fois
                    transition={{ duration: 0.45, delay: Math.min((idx % 3) * 0.08, 0.16), ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => onSelectProject(project)}
                    className="group cursor-pointer flex flex-col bg-white border border-[#E5E2DA] hover:border-[#C5A059] rounded-2xl overflow-hidden transition-[border-color,box-shadow] duration-300 hover:shadow-xl hover:shadow-[#C5A059]/10"
                  >
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#FAF9F6]">
                      <NextImage
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#C5A059] text-[10px] uppercase font-bold tracking-wider border border-[#E5E2DA] rounded shadow-xs">
                          {project.categoryLabel}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="w-8 h-8 bg-white/95 backdrop-blur-sm text-[#111111] rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#C5A059] group-hover:to-[#D4AF37] group-hover:text-white transition-colors duration-200 shadow border border-[#E5E2DA]">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#777777] mb-1.5">
                          <span>{project.location}</span>
                          <span>{project.specs.year}</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-[#111111] group-hover:text-[#C5A059] transition-colors duration-200 mb-4">
                          {project.title}
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#555555]">
                        <span>Surface : <strong className="text-[#111111]">{project.specs.surface}</strong></span>
                        <span className="text-[#C5A059] font-bold group-hover:underline">
                          Voir la fiche →
                        </span>
                      </div>
                    </div>
                  </motion.article>
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
