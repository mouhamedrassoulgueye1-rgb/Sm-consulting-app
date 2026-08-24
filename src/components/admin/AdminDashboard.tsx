import React, { useState, useRef } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  LogOut,
  Check,
  X,
  Image as ImageIcon,
  AlertTriangle,
  Eye,
  Upload,
  Star,
  Link as LinkIcon,
  FolderUp,
} from 'lucide-react';
import { Project, ProjectCategory } from '../../types/architecture';

interface AdminDashboardProps {
  projects: Project[];
  onAddProject: (newProject: Project) => void;
  onUpdateProject: (updatedProject: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onReturnToPublicSite: () => void;
  onLogout: () => void;
}

export function AdminDashboard({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onReturnToPublicSite,
  onLogout,
}: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<ProjectCategory>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [newGalleryUrlInput, setNewGalleryUrlInput] = useState('');

  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<{
    id?: string;
    title: string;
    subtitle: string;
    location: string;
    category: ProjectCategory;
    surface: string;
    year: string;
    cost: string;
    heroImage: string;
    galleryImages: string[];
    summary: string;
    conceptDescription: string;
    isFeatured: boolean;
  }>({
    title: '',
    subtitle: '',
    location: 'Dakar, Sénégal',
    category: 'residential',
    surface: '600 m²',
    year: '2026',
    cost: 'Confidentiel',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    ],
    summary: '',
    conceptDescription: '',
    isFeatured: true,
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenCreateModal = () => {
    setEditingProject(null);
    setNewGalleryUrlInput('');
    setFormData({
      title: '',
      subtitle: 'Projet d’architecture contemporaine',
      location: 'Dakar (Les Almadies), Sénégal',
      category: 'residential',
      surface: '750 m²',
      year: new Date().getFullYear().toString(),
      cost: 'Confidentiel',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      ],
      summary: 'Conception architecturale et bioclimatique haut de gamme.',
      conceptDescription: 'Optimisation de la lumière naturelle, ventilation traversante et finitions de prestige.',
      isFeatured: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setNewGalleryUrlInput('');
    const loadedGallery = (project.galleryImages && project.galleryImages.length > 0)
      ? project.galleryImages
      : [project.heroImage];

    setFormData({
      id: project.id,
      title: project.title,
      subtitle: project.subtitle,
      location: project.location,
      category: project.category,
      surface: project.specs?.surface || '500 m²',
      year: project.specs?.year || '2025',
      cost: project.specs?.cost || 'Confidentiel',
      heroImage: project.heroImage,
      galleryImages: loadedGallery,
      summary: project.summary,
      conceptDescription: project.conceptDescription || '',
      isFeatured: project.isFeatured ?? true,
    });
    setIsFormOpen(true);
  };

  const getCategoryLabel = (cat: ProjectCategory): string => {
    switch (cat) {
      case 'residential':
        return 'Résidentiel d’Exception';
      case 'heritage':
        return 'Rénovation Patrimoniale';
      case 'commercial':
        return 'Tertiaire & Écoconception';
      case 'hospitality':
        return 'Hôtellerie & Domaines';
      default:
        return 'Projet Architectural';
    }
  };

  // Upload Hero Image from Local Disk
  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('Veuillez sélectionner un fichier image valide.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        setFormData((prev) => {
          const updatedGallery = prev.galleryImages.includes(base64Url)
            ? prev.galleryImages
            : [base64Url, ...prev.galleryImages];
          return {
            ...prev,
            heroImage: base64Url,
            galleryImages: updatedGallery,
          };
        });
        showNotification('Photo principale importée depuis le disque local avec succès.');
      }
    };
    reader.readAsDataURL(file);
    // Reset file input value to allow re-uploading the same file if needed
    e.target.value = '';
  };

  // Upload Multiple Gallery Images from Local Disk
  const handleMultipleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files) as File[];
    let loadedCount = 0;
    const newBase64Images: string[] = [];

    fileList.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          newBase64Images.push(base64);
        }
        loadedCount++;
        if (loadedCount === fileList.length) {
          setFormData((prev) => ({
            ...prev,
            galleryImages: [...prev.galleryImages, ...newBase64Images],
          }));
          showNotification(`${newBase64Images.length} photo(s) ajoutée(s) depuis le disque local.`);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // Add Gallery Image via URL
  const handleAddGalleryUrl = () => {
    const url = newGalleryUrlInput.trim();
    if (!url) return;
    if (!formData.galleryImages.includes(url)) {
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, url],
      }));
      setNewGalleryUrlInput('');
      showNotification('Photo ajoutée à la galerie.');
    } else {
      showNotification('Cette photo est déjà présente dans la galerie.');
    }
  };

  // Remove Image from Gallery
  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => {
      const updatedGallery = prev.galleryImages.filter((_, idx) => idx !== indexToRemove);
      let newHero = prev.heroImage;
      if (prev.galleryImages[indexToRemove] === prev.heroImage) {
        newHero = updatedGallery[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85';
      }
      return {
        ...prev,
        heroImage: newHero,
        galleryImages: updatedGallery,
      };
    });
  };

  // Set any Gallery Image as Main (Hero)
  const handleSetAsHero = (imgUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      heroImage: imgUrl,
    }));
    showNotification('Photo définie comme vue principale du projet.');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure heroImage is part of galleryImages
    const finalGallery = Array.from(new Set([formData.heroImage, ...formData.galleryImages])).filter(Boolean);

    if (editingProject) {
      // Update
      const updated: Project = {
        ...editingProject,
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        location: formData.location.trim(),
        category: formData.category,
        categoryLabel: getCategoryLabel(formData.category),
        heroImage: formData.heroImage.trim(),
        galleryImages: finalGallery,
        summary: formData.summary.trim(),
        conceptDescription: formData.conceptDescription.trim(),
        isFeatured: formData.isFeatured,
        specs: {
          ...editingProject.specs,
          surface: formData.surface.trim(),
          year: formData.year.trim(),
          location: formData.location.trim(),
          category: formData.category,
          categoryLabel: getCategoryLabel(formData.category),
          cost: formData.cost.trim(),
        },
      };
      onUpdateProject(updated);
      showNotification(`Le projet "${updated.title}" a été mis à jour.`);
    } else {
      // Create
      const newSlug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newProject: Project = {
        id: `proj-${Date.now()}`,
        slug: newSlug || `projet-${Date.now()}`,
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        location: formData.location.trim(),
        category: formData.category,
        categoryLabel: getCategoryLabel(formData.category),
        heroImage: formData.heroImage.trim() || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
        galleryImages: finalGallery.length > 0 ? finalGallery : [formData.heroImage.trim()],
        summary: formData.summary.trim(),
        conceptDescription: formData.conceptDescription.trim(),
        isFeatured: formData.isFeatured,
        specs: {
          surface: formData.surface.trim(),
          year: formData.year.trim(),
          location: formData.location.trim(),
          category: formData.category,
          categoryLabel: getCategoryLabel(formData.category),
          cost: formData.cost.trim(),
          leadArchitect: 'Synoreyni Consulting',
        },
      };
      onAddProject(newProject);
      showNotification(`Le projet "${newProject.title}" a été ajouté avec ${newProject.galleryImages.length} photo(s).`);
    }

    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      const projectToDelete = projects.find((p) => p.id === deleteConfirmId);
      onDeleteProject(deleteConfirmId);
      showNotification(`Le projet "${projectToDelete?.title || ''}" a été supprimé.`);
      setDeleteConfirmId(null);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Admin Top Navbar */}
      <header className="bg-slate-950 border-b border-white/10 px-5 sm:px-8 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-display text-base sm:text-lg font-bold tracking-[0.14em] uppercase text-white leading-none">
              SYNOREYNI <span className="text-amber-400">ADMIN</span>
            </h1>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mt-0.5">
              Dashboard Direction • Dakar, Sénégal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToPublicSite}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-white/10"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Voir le site public</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-rose-500/20"
              title="Se déconnecter de l'administration"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-5 sm:px-8 py-8 w-full space-y-8">
        {/* Toast Notification */}
        {notification && (
          <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between shadow-lg animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-emerald-300 hover:text-white rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dashboard Statistics & Action Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-950 border border-white/10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1">
              Total Réalisations
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-white">{projects.length}</span>
              <span className="text-xs text-amber-400 font-semibold">projets enregistrés</span>
            </div>
          </div>

          <div className="p-5 bg-slate-950 border border-white/10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1">
              Projets en Vedette
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-white">
                {projects.filter((p) => p.isFeatured !== false).length}
              </span>
              <span className="text-xs text-slate-400 font-semibold">en carrousel accueil</span>
            </div>
          </div>

          <div className="p-5 bg-slate-950 border border-white/10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1">
              Pôle Géographique
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold text-white">Dakar & SNG</span>
              <span className="text-xs text-emerald-400 font-semibold">• Actif</span>
            </div>
          </div>

          <div className="p-5 bg-amber-400/10 border border-amber-400/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block mb-1">
                Action Rapide
              </span>
              <span className="text-xs text-slate-200">Créer un nouveau projet</span>
            </div>
            <button
              onClick={handleOpenCreateModal}
              id="admin-add-project-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Search, Filters & Add Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-slate-950 border border-white/10">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par titre, ville, description..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as ProjectCategory)}
              className="px-3 py-2 bg-slate-900 border border-white/10 text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">Toutes catégories</option>
              <option value="residential">Résidentiel d'Exception</option>
              <option value="heritage">Rénovation Patrimoniale</option>
              <option value="commercial">Tertiaire & Écoconception</option>
              <option value="hospitality">Hôtellerie & Domaines</option>
            </select>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Projet</span>
          </button>
        </div>

        {/* Projects Table View */}
        <div className="bg-slate-950 border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-white/10 text-[11px] uppercase tracking-wider font-mono text-slate-400">
                <tr>
                  <th className="px-6 py-4">Visuel & Titre</th>
                  <th className="px-6 py-4">Galerie</th>
                  <th className="px-6 py-4">Catégorie</th>
                  <th className="px-6 py-4">Localisation</th>
                  <th className="px-6 py-4">Année / Surface</th>
                  <th className="px-6 py-4 text-center">En Vedette</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      Aucun projet trouvé. Cliquez sur "Nouveau Projet" pour en créer un.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => {
                    const galleryCount = project.galleryImages?.length || 1;
                    return (
                      <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                        {/* Image & Title */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={project.heroImage}
                              alt={project.title}
                              className="w-14 h-10 object-cover bg-slate-900 border border-white/10 shrink-0"
                            />
                            <div>
                              <span className="font-display font-bold text-white text-sm block">
                                {project.title}
                              </span>
                              <span className="text-slate-400 text-[11px] truncate max-w-xs block font-light">
                                {project.subtitle}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Gallery count badge */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-white/10 text-[10px] font-mono text-amber-400">
                            <ImageIcon className="w-3 h-3" />
                            <span>{galleryCount} photo{galleryCount > 1 ? 's' : ''}</span>
                          </span>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] uppercase font-mono text-amber-400">
                            {project.categoryLabel}
                          </span>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-4 text-slate-300">
                          {project.location}
                        </td>

                        {/* Specs */}
                        <td className="px-6 py-4 text-slate-300 font-mono text-[11px]">
                          <div>{project.specs?.year || '2025'}</div>
                          <div className="text-slate-400">{project.specs?.surface || '-'}</div>
                        </td>

                        {/* Featured */}
                        <td className="px-6 py-4 text-center">
                          {project.isFeatured !== false ? (
                            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                              Oui
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[10px]">Non</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => handleOpenEditModal(project)}
                              className="p-2 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-amber-400 rounded-lg transition-colors cursor-pointer"
                              title="Modifier ce projet"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(project.id)}
                              className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 rounded-lg transition-colors cursor-pointer"
                              title="Supprimer ce projet"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal: Add or Edit Project Form - Fully Responsive & Non-cutoff Top */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-white/15 shadow-2xl my-2 sm:my-6 max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header - Always Fixed & Visible at the Top */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-slate-950 border-b border-white/10 shrink-0 sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  {editingProject ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold uppercase text-white leading-tight">
                    {editingProject ? 'Modifier le Projet' : 'Ajouter un Nouveau Projet'}
                  </h3>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                    {editingProject ? editingProject.title : 'Catalogue Architectural Synoreyni'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hidden File Inputs for Local Disk Uploads */}
            <input
              type="file"
              ref={heroFileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleHeroFileUpload}
            />
            <input
              type="file"
              ref={galleryFileInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleMultipleGalleryUpload}
            />

            {/* Scrollable Form Content */}
            <form id="project-admin-form" onSubmit={handleSaveForm} className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Titre du Projet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex : VILLA ALMADIES"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Catégorie *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="residential">Résidentiel d’Exception</option>
                    <option value="heritage">Rénovation Patrimoniale</option>
                    <option value="commercial">Tertiaire & Écoconception</option>
                    <option value="hospitality">Hôtellerie & Domaines</option>
                  </select>
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Sous-titre / Accroche
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Ex : Résidence bioclimatique d’exception en front de mer"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Specs: Location, Surface, Year, Cost */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Localisation (Dakar, etc.)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Dakar (Les Almadies), Sénégal"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Surface Utile
                  </label>
                  <input
                    type="text"
                    value={formData.surface}
                    onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                    placeholder="Ex : 850 m²"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Année
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="Ex : 2026"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Photo Management Section (Local Disk + URLs + Multiple Photos) */}
              <div className="p-4 sm:p-5 bg-slate-950 border border-white/15 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <ImageIcon className="w-4 h-4" />
                    <span>Photos du Projet & Galerie ({formData.galleryImages.length} images)</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-light">
                    Vous pouvez importer depuis votre disque local ou renseigner des URLs HD.
                  </span>
                </div>

                {/* Main Hero Photo Controls */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                    1. Photo Principale (Hero) *
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        required
                        value={formData.heroImage}
                        onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                        placeholder="URL de l'image principale..."
                        className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 pr-10"
                      />
                      <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>

                    <button
                      type="button"
                      onClick={() => heroFileInputRef.current?.click()}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Importer du Disque</span>
                    </button>
                  </div>

                  {formData.heroImage && (
                    <div className="flex items-center gap-3 p-2 bg-slate-900/60 border border-white/10">
                      <img
                        src={formData.heroImage}
                        alt="Photo principale"
                        className="w-20 h-14 object-cover border border-white/15 shrink-0"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-amber-400 block flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" />
                          Photo Principale Active
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          Cette photo s'affiche en grand dans le carrousel et en tête de la fiche.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Multiple Photos / Gallery Section */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                    2. Ajouter d'Autres Photos au Projet (Galerie)
                  </label>

                  {/* Add Image Action Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    {/* URL Input */}
                    <div className="sm:col-span-8 flex gap-2">
                      <input
                        type="text"
                        value={newGalleryUrlInput}
                        onChange={(e) => setNewGalleryUrlInput(e.target.value)}
                        placeholder="Coller l'URL d'une photo supplémentaire..."
                        className="flex-1 px-3.5 py-2 bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      <button
                        type="button"
                        onClick={handleAddGalleryUrl}
                        className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer shrink-0 transition-colors"
                      >
                        + Ajouter URL
                      </button>
                    </div>

                    {/* Local Multiple File Upload Button */}
                    <div className="sm:col-span-4">
                      <button
                        type="button"
                        onClick={() => galleryFileInputRef.current?.click()}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        <FolderUp className="w-3.5 h-3.5" />
                        <span>Photos du Disque (+ Multi)</span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Gallery Grid */}
                  <div className="pt-2">
                    <span className="text-[11px] uppercase font-mono text-slate-400 block mb-2 font-medium">
                      Galerie des photos associées ({formData.galleryImages.length}) :
                    </span>

                    {formData.galleryImages.length === 0 ? (
                      <div className="p-6 border border-dashed border-white/20 text-center text-slate-500 text-xs">
                        Aucune photo supplémentaire dans la galerie. Ajoutez-en via le disque local ou par URL.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[220px] overflow-y-auto pr-1">
                        {formData.galleryImages.map((imgUrl, index) => {
                          const isHero = imgUrl === formData.heroImage;
                          return (
                            <div
                              key={index}
                              className={`relative overflow-hidden border-2 transition-all group bg-slate-900 ${
                                isHero ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-white/15'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={`Vue ${index + 1}`}
                                className="w-full h-24 object-cover"
                              />

                              {/* Star / Hero Indicator */}
                              {isHero ? (
                                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-amber-400 text-slate-950 font-bold text-[9px] uppercase font-mono shadow">
                                  Principale
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleSetAsHero(imgUrl)}
                                  className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-slate-950/80 hover:bg-amber-400 text-slate-200 hover:text-slate-950 text-[9px] font-bold uppercase transition-colors cursor-pointer shadow opacity-90 group-hover:opacity-100"
                                  title="Définir comme photo principale"
                                >
                                  ☆ Définir Principale
                                </button>
                              )}

                              {/* Delete Button */}
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(index)}
                                className="absolute top-1.5 right-1.5 p-1 bg-slate-950/80 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer shadow"
                                title="Retirer cette photo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary & Concept Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Résumé / Présentation
                  </label>
                  <textarea
                    rows={3}
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Brève description esthétique et spatiale de l'ouvrage..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Concept Architectural & Bioclimatique
                  </label>
                  <textarea
                    rows={3}
                    value={formData.conceptDescription}
                    onChange={(e) => setFormData({ ...formData, conceptDescription: e.target.value })}
                    placeholder="Détails constructifs, ventilation naturelle, apports solaires..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Featured in Home Carousel */}
              <div className="flex items-center gap-3 p-3.5 bg-slate-950 border border-white/10">
                <input
                  type="checkbox"
                  id="isFeaturedCheck"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-amber-400 bg-slate-900 border-white/20 focus:ring-amber-400 cursor-pointer"
                />
                <label htmlFor="isFeaturedCheck" className="text-xs text-slate-300 cursor-pointer">
                  Afficher en vedette dans le carrousel interactif de la page d'accueil
                </label>
              </div>
            </form>

            {/* Modal Footer - Fixed at bottom */}
            <div className="px-5 sm:px-8 py-4 bg-slate-950 border-t border-white/10 flex items-center justify-end gap-3 shrink-0 sticky bottom-0 z-20">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Annuler
              </button>

              <button
                type="submit"
                form="project-admin-form"
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow cursor-pointer active:scale-95"
              >
                {editingProject ? 'Enregistrer les Modifications' : 'Créer le Projet'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-white/10 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base uppercase text-white">
                Confirmer la Suppression
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer définitivement ce projet ? Cette action retirera immédiatement le projet du site public et du catalogue.
            </p>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
