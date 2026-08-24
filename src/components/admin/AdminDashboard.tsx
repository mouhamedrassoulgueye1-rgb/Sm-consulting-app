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
  Layers,
  Tag,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import { Project, ProjectCategory, CategoryItem } from '../../types/architecture';

interface AdminDashboardProps {
  projects: Project[];
  categories: CategoryItem[];
  onAddProject: (newProject: Project) => void;
  onUpdateProject: (updatedProject: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onAddCategory: (newCategory: CategoryItem) => void;
  onUpdateCategory: (updatedCategory: CategoryItem) => void;
  onDeleteCategory: (categoryId: string) => void;
  onReturnToPublicSite: () => void;
  onLogout: () => void;
}

export function AdminDashboard({
  projects,
  categories,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onReturnToPublicSite,
  onLogout,
}: AdminDashboardProps) {
  // Navigation tabs: 'projects' | 'categories'
  const [activeTab, setActiveTab] = useState<'projects' | 'categories'>('projects');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<ProjectCategory>('all');

  // Project Modals State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Gallery inputs
  const [newGalleryUrlInput, setNewGalleryUrlInput] = useState('');
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const replaceSingleFileInputRef = useRef<HTMLInputElement>(null);

  // Photo Modification & Replacement Modal State
  const [photoEditState, setPhotoEditState] = useState<{
    targetIndex: number | 'hero' | null;
    currentUrl: string;
    newUrl: string;
    previewUrl: string;
    isHero: boolean;
  } | null>(null);

  // Lightbox Zoom Preview Modal State
  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);

  // Category Manager Modals State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categoryFormData, setCategoryFormData] = useState({
    id: '',
    label: '',
    description: '',
  });
  const [deleteCategoryConfirmId, setDeleteCategoryConfirmId] = useState<string | null>(null);

  // Project Form State
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
    category: categories[0]?.id || 'residential',
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
    setTimeout(() => setNotification(null), 3800);
  };

  const getCategoryLabel = (catId: string): string => {
    const found = categories.find((c) => c.id === catId);
    return found ? found.label : 'Projet Architectural';
  };

  // Open Create Project Modal
  const handleOpenCreateModal = () => {
    setEditingProject(null);
    setNewGalleryUrlInput('');
    setFormData({
      title: '',
      subtitle: 'Projet d’architecture contemporaine',
      location: 'Dakar (Les Almadies), Sénégal',
      category: categories[0]?.id || 'residential',
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

  // Open Edit Project Modal
  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setNewGalleryUrlInput('');
    const loadedGallery = project.galleryImages && project.galleryImages.length > 0
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
        showNotification('Photo principale importée avec succès.');
      }
    };
    reader.readAsDataURL(file);
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
          showNotification(`${newBase64Images.length} photo(s) ajoutée(s) à la galerie.`);
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
    showNotification('Photo retirée de la galerie.');
  };

  // Set any Gallery Image as Main (Hero)
  const handleSetAsHero = (imgUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      heroImage: imgUrl,
    }));
    showNotification('Photo définie comme vue principale du projet.');
  };

  // Reorder Photos in Gallery: Move Left
  const handleMoveImageLeft = (index: number) => {
    if (index <= 0) return;
    setFormData((prev) => {
      const copy = [...prev.galleryImages];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return { ...prev, galleryImages: copy };
    });
  };

  // Reorder Photos in Gallery: Move Right
  const handleMoveImageRight = (index: number) => {
    if (index >= formData.galleryImages.length - 1) return;
    setFormData((prev) => {
      const copy = [...prev.galleryImages];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return { ...prev, galleryImages: copy };
    });
  };

  // Open Single Photo Edit / Replacement Modal
  const handleOpenPhotoEdit = (indexOrHero: number | 'hero') => {
    const currentUrl = indexOrHero === 'hero' ? formData.heroImage : formData.galleryImages[indexOrHero];
    setPhotoEditState({
      targetIndex: indexOrHero,
      currentUrl: currentUrl || '',
      newUrl: currentUrl || '',
      previewUrl: currentUrl || '',
      isHero: indexOrHero === 'hero' || currentUrl === formData.heroImage,
    });
  };

  // Handle Replacement File Selected from Disk for a specific photo
  const handleReplaceSingleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('Veuillez choisir un fichier image valide.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64 && photoEditState) {
        setPhotoEditState({
          ...photoEditState,
          newUrl: base64,
          previewUrl: base64,
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Save the Edited / Replaced Photo
  const handleSavePhotoEdit = () => {
    if (!photoEditState || !photoEditState.previewUrl.trim()) return;

    const finalUrl = photoEditState.previewUrl.trim();

    if (photoEditState.targetIndex === 'hero') {
      // Replace Hero image
      setFormData((prev) => {
        const updatedGallery = prev.galleryImages.map((img) =>
          img === prev.heroImage ? finalUrl : img
        );
        if (!updatedGallery.includes(finalUrl)) {
          updatedGallery.unshift(finalUrl);
        }
        return {
          ...prev,
          heroImage: finalUrl,
          galleryImages: updatedGallery,
        };
      });
      showNotification('Photo principale modifiée et remplacée avec succès.');
    } else {
      // Replace gallery item at specific index
      const idx = photoEditState.targetIndex as number;
      setFormData((prev) => {
        const oldUrl = prev.galleryImages[idx];
        const updatedGallery = [...prev.galleryImages];
        updatedGallery[idx] = finalUrl;

        let updatedHero = prev.heroImage;
        if (oldUrl === prev.heroImage || photoEditState.isHero) {
          updatedHero = finalUrl;
        }

        return {
          ...prev,
          heroImage: updatedHero,
          galleryImages: updatedGallery,
        };
      });
      showNotification(`Photo n°${idx + 1} modifiée et remplacée avec succès.`);
    }

    setPhotoEditState(null);
  };

  // Save Project Form (Create / Update)
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

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

  // Delete Project Confirmation
  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      const projectToDelete = projects.find((p) => p.id === deleteConfirmId);
      onDeleteProject(deleteConfirmId);
      showNotification(`Le projet "${projectToDelete?.title || ''}" a été supprimé.`);
      setDeleteConfirmId(null);
    }
  };

  // ================= CATEGORY MANAGEMENT HANDLERS =================
  const handleOpenAddCategoryModal = () => {
    setEditingCategory(null);
    setCategoryFormData({
      id: '',
      label: '',
      description: '',
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategoryModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setCategoryFormData({
      id: cat.id,
      label: cat.label,
      description: cat.description || '',
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const labelTrimmed = categoryFormData.label.trim();
    if (!labelTrimmed) return;

    if (editingCategory) {
      // Update existing category
      const updatedCat: CategoryItem = {
        ...editingCategory,
        label: labelTrimmed,
        description: categoryFormData.description.trim(),
      };
      onUpdateCategory(updatedCat);
      showNotification(`La catégorie "${updatedCat.label}" a été modifiée.`);
    } else {
      // Create new category
      const generatedSlug = categoryFormData.id.trim()
        ? categoryFormData.id.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : labelTrimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const finalSlug = generatedSlug || `cat-${Date.now()}`;

      if (categories.some((c) => c.id === finalSlug)) {
        showNotification('Une catégorie avec cet identifiant existe déjà.');
        return;
      }

      const newCat: CategoryItem = {
        id: finalSlug,
        label: labelTrimmed,
        description: categoryFormData.description.trim() || undefined,
        isDefault: false,
      };

      onAddCategory(newCat);
      showNotification(`Nouvelle catégorie "${newCat.label}" ajoutée avec succès.`);

      // If project form is currently open, automatically select this new category
      if (isFormOpen) {
        setFormData((prev) => ({ ...prev, category: newCat.id }));
      }
    }

    setIsCategoryModalOpen(false);
  };

  const handleConfirmDeleteCategory = () => {
    if (deleteCategoryConfirmId) {
      const catToDelete = categories.find((c) => c.id === deleteCategoryConfirmId);
      onDeleteCategory(deleteCategoryConfirmId);
      showNotification(`La catégorie "${catToDelete?.label || ''}" a été retirée.`);
      setDeleteCategoryConfirmId(null);
    }
  };

  // Filtered Projects for Table
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
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Admin Top Navbar */}
      <header className="bg-slate-950 border-b border-white/10 px-5 sm:px-8 py-4 sticky top-0 z-30 shadow-md">
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
              <span className="hidden sm:inline">Quitter</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 py-8 space-y-6">
        {/* Flash Notification */}
        {notification && (
          <div className="p-3.5 bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-lg animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-emerald-300 hover:text-white rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Navigation Tabs: Projects vs Categories */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('projects')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Projets & Réalisations</span>
              <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${
                activeTab === 'projects' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-white/10 text-amber-400'
              }`}>
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/10'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Gestion des Catégories</span>
              <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${
                activeTab === 'categories' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-white/10 text-amber-400'
              }`}>
                {categories.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'projects' ? (
              <button
                onClick={handleOpenCreateModal}
                id="admin-add-project-btn"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Projet</span>
              </button>
            ) : (
              <button
                onClick={handleOpenAddCategoryModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une Catégorie</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-950 border border-white/10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1">
                  Total Ouvrages Référencés
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-white">{projects.length}</span>
                  <span className="text-xs text-amber-400 font-semibold">projets au catalogue</span>
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
                  Catégories Actives
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-amber-400">{categories.length}</span>
                  <span className="text-xs text-slate-400 font-semibold">filières d'architecture</span>
                </div>
              </div>

              <div className="p-5 bg-amber-400/10 border border-amber-400/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block mb-1">
                    Action Rapide
                  </span>
                  <span className="text-xs text-slate-200">Créer un nouvel ouvrage</span>
                </div>
                <button
                  onClick={handleOpenCreateModal}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </div>
            </div>

            {/* Toolbar: Search, Category Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-slate-950 border border-white/10">
              <div className="flex items-center gap-3 flex-1 flex-wrap">
                <div className="relative flex-1 min-w-[220px] max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher par titre, ville, description..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono uppercase hidden sm:inline">Filtrer:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-white/10 text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="all">Toutes les catégories ({projects.length})</option>
                    {categories.map((c) => {
                      const count = projects.filter((p) => p.category === c.id).length;
                      return (
                        <option key={c.id} value={c.id}>
                          {c.label} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                {filteredProjects.length} résultat{filteredProjects.length > 1 ? 's' : ''} affiché{filteredProjects.length > 1 ? 's' : ''}
              </div>
            </div>

            {/* Projects Table View */}
            <div className="bg-slate-950 border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-white/10 text-[11px] uppercase tracking-wider font-mono text-slate-400">
                    <tr>
                      <th className="px-6 py-4">Visuel & Titre</th>
                      <th className="px-6 py-4">Galerie Photos</th>
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
                          Aucun projet trouvé avec les critères actuels.
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
                                {project.categoryLabel || getCategoryLabel(project.category)}
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
                                  title="Modifier ce projet & ses photos"
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
          </div>
        )}

        {/* TAB 2: CATEGORY MANAGEMENT (Ajouter & Retirer des Catégories) */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            {/* Info Banner */}
            <div className="p-4 bg-slate-950 border border-white/10 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-white uppercase tracking-wider block">
                  Structure des Catégories & Domaines d'Intervention
                </span>
                <p className="text-slate-400 leading-relaxed font-light">
                  Vous pouvez ajouter, renommer ou retirer des catégories de projets. Ces catégories apparaissent automatiquement dans les filtres du portfolio public, dans le catalogue et dans les fiches projets.
                </p>
              </div>
            </div>

            {/* Category Grid / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const assignedProjects = projects.filter((p) => p.category === cat.id);
                return (
                  <div
                    key={cat.id}
                    className="p-5 bg-slate-950 border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2 py-0.5 bg-amber-400/10 border border-amber-400/20">
                          {cat.id}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {assignedProjects.length} projet{assignedProjects.length > 1 ? 's' : ''}
                        </span>
                      </div>

                      <h3 className="font-display text-base font-bold uppercase text-white">
                        {cat.label}
                      </h3>

                      <p className="text-xs text-slate-400 font-light leading-relaxed min-h-[36px]">
                        {cat.description || 'Aucune description détaillée enregistrée.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {cat.isDefault && (
                          <span className="text-[10px] uppercase font-mono text-slate-500">
                            Standard
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditCategoryModal(cat)}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-amber-400 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1"
                          title="Modifier cette catégorie"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Modifier</span>
                        </button>

                        <button
                          onClick={() => setDeleteCategoryConfirmId(cat.id)}
                          className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1"
                          title="Retirer cette catégorie"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Retirer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD OR EDIT PROJECT FORM */}
      {/* ========================================================================= */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-white/15 shadow-2xl my-2 sm:my-6 max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-slate-950 border-b border-white/10 shrink-0 sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  {editingProject ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold uppercase text-white leading-tight">
                    {editingProject ? 'Modifier le Projet & ses Photos' : 'Ajouter un Nouveau Projet'}
                  </h3>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                    {editingProject ? editingProject.title : 'Catalogue Architectural Synoreyni'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
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
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Catégorie *
                    </label>
                    <button
                      type="button"
                      onClick={handleOpenAddCategoryModal}
                      className="text-[11px] text-amber-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Créer une Catégorie</span>
                    </button>
                  </div>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
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
                    placeholder="850 m²"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Année de Livraison
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Cost */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Budget / Enveloppe Financière
                </label>
                <input
                  type="text"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  placeholder="Confidentiel / Sur demande"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* ========================================================================= */}
              {/* ADVANCED PHOTO MANAGEMENT & EDITING (Photos Déjà Envoyées & Nouvelles) */}
              {/* ========================================================================= */}
              <div className="p-5 bg-slate-950 border border-white/15 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    <span>Photos du Projet & Galerie ({formData.galleryImages.length} images)</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-light">
                    Vous pouvez modifier, remplacer ou réorganiser chaque photo envoyée.
                  </span>
                </div>

                {/* 1. Photo Principale (Hero) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                      1. Photo Principale (Hero) *
                    </label>
                    <span className="text-[11px] text-amber-400 font-mono">Vue de couverture principale</span>
                  </div>

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
                    <div className="flex items-center justify-between p-3 bg-slate-900 border border-white/10">
                      <div className="flex items-center gap-3">
                        <img
                          src={formData.heroImage}
                          alt="Photo principale"
                          className="w-24 h-16 object-cover border border-white/15 shrink-0 bg-slate-950"
                        />
                        <div className="text-xs space-y-1">
                          <span className="font-bold text-amber-400 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400" />
                            Photo Principale Active
                          </span>
                          <span className="text-slate-400 text-[11px] block">
                            S'affiche en grand format sur la page d'accueil et le carrousel.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenPhotoEdit('hero')}
                          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow"
                          title="Modifier ou remplacer cette photo principale"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Modifier / Remplacer</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setLightboxImageUrl(formData.heroImage)}
                          className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors cursor-pointer"
                          title="Aperçu plein écran"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Multiple Gallery Photos (Modifier les photos déjà envoyées) */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                    2. Galerie des Photos Associées & Photos Déjà Envoyées
                  </label>

                  {/* Add Image Action Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    {/* URL Input */}
                    <div className="sm:col-span-8 flex gap-2">
                      <input
                        type="text"
                        value={newGalleryUrlInput}
                        onChange={(e) => setNewGalleryUrlInput(e.target.value)}
                        placeholder="Coller l'URL d'une nouvelle photo supplémentaire..."
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
                        <span>Importer du Disque (+ Multi)</span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Gallery Grid with In-Place Modification Buttons */}
                  <div className="pt-2">
                    <span className="text-[11px] uppercase font-mono text-slate-400 block mb-2 font-medium">
                      Photos envoyées pour ce projet ({formData.galleryImages.length}) :
                    </span>

                    {formData.galleryImages.length === 0 ? (
                      <div className="p-6 border border-dashed border-white/20 text-center text-slate-500 text-xs">
                        Aucune photo supplémentaire dans la galerie. Ajoutez-en via le disque local ou par URL.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[340px] overflow-y-auto pr-1">
                        {formData.galleryImages.map((imgUrl, index) => {
                          const isHero = imgUrl === formData.heroImage;
                          return (
                            <div
                              key={index}
                              className={`p-2.5 bg-slate-900 border-2 transition-all space-y-2 flex flex-col justify-between ${
                                isHero ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-white/15'
                              }`}
                            >
                              {/* Image Preview & Badges */}
                              <div className="relative group overflow-hidden bg-slate-950">
                                <img
                                  src={imgUrl}
                                  alt={`Vue ${index + 1}`}
                                  className="w-full h-28 object-cover transition-transform group-hover:scale-105"
                                />

                                {/* Index Badge */}
                                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-slate-950/80 text-white font-mono text-[9px] font-bold border border-white/20">
                                  #{index + 1}
                                </span>

                                {/* Hero Indicator */}
                                {isHero && (
                                  <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-amber-400 text-slate-950 font-bold text-[9px] uppercase font-mono shadow">
                                    ★ Principale
                                  </span>
                                )}

                                {/* Lightbox Zoom overlay */}
                                <button
                                  type="button"
                                  onClick={() => setLightboxImageUrl(imgUrl)}
                                  className="absolute bottom-1.5 right-1.5 p-1 bg-slate-950/80 hover:bg-white text-slate-300 hover:text-slate-950 rounded transition-colors cursor-pointer opacity-80 group-hover:opacity-100"
                                  title="Agrandir la photo"
                                >
                                  <Maximize2 className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Photo Action Controls (Modifier, Déplacer, Définir Principale, Supprimer) */}
                              <div className="space-y-1.5 pt-1">
                                {/* Primary Action: Modifier / Remplacer */}
                                <button
                                  type="button"
                                  onClick={() => handleOpenPhotoEdit(index)}
                                  className="w-full py-1.5 px-2 bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/40 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                  <span>Modifier / Remplacer</span>
                                </button>

                                {/* Secondary Action Bar */}
                                <div className="flex items-center justify-between gap-1 pt-0.5">
                                  {/* Reorder Arrows */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => handleMoveImageLeft(index)}
                                      disabled={index === 0}
                                      className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                      title="Déplacer vers la gauche / avant"
                                    >
                                      <ChevronLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleMoveImageRight(index)}
                                      disabled={index === formData.galleryImages.length - 1}
                                      className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                      title="Déplacer vers la droite / après"
                                    >
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  {/* Set as Hero button */}
                                  {!isHero ? (
                                    <button
                                      type="button"
                                      onClick={() => handleSetAsHero(imgUrl)}
                                      className="px-2 py-1 bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-slate-300 text-[10px] font-semibold uppercase rounded transition-colors"
                                      title="Définir cette photo comme couverture principale"
                                    >
                                      ☆ En Principale
                                    </button>
                                  ) : (
                                    <span className="text-[10px] font-mono text-amber-400 font-bold px-1.5">
                                      Couverture
                                    </span>
                                  )}

                                  {/* Remove button */}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveGalleryImage(index)}
                                    className="p-1.5 bg-rose-500/10 hover:bg-rose-600 text-rose-300 hover:text-white rounded transition-colors cursor-pointer"
                                    title="Retirer cette photo"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
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
                  className="w-4 h-4 text-amber-400 bg-slate-900 border-white/20 rounded focus:ring-amber-400"
                />
                <label htmlFor="isFeaturedCheck" className="text-xs text-slate-300 cursor-pointer select-none">
                  <span className="font-bold text-white block">Mettre en avant sur la page d'accueil</span>
                  <span className="text-slate-400 text-[11px]">
                    Ce projet apparaîtra dans le carrousel animé interactif de la page d'accueil.
                  </span>
                </label>
              </div>
            </form>

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-end gap-3 px-5 sm:px-8 py-4 bg-slate-950 border-t border-white/10 shrink-0">
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

      {/* ========================================================================= */}
      {/* MODAL 2: DEDICATED PHOTO EDITOR / REPLACEMENT MODAL */}
      {/* ========================================================================= */}
      {photoEditState && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          {/* Hidden File Input for Single Photo Replacement */}
          <input
            type="file"
            ref={replaceSingleFileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleReplaceSingleFileUpload}
          />

          <div className="relative w-full max-w-lg bg-slate-900 border border-white/20 shadow-2xl p-6 space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <h3 className="font-display text-base font-bold uppercase text-white">
                  {photoEditState.targetIndex === 'hero'
                    ? 'Modifier la Photo Principale'
                    : `Modifier la Photo #${(photoEditState.targetIndex as number) + 1}`}
                </h3>
              </div>
              <button
                onClick={() => setPhotoEditState(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current vs New Photo Preview */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-mono text-slate-400 font-bold block">
                Aperçu du Remplacement :
              </span>
              <div className="relative h-44 w-full bg-slate-950 border border-white/15 overflow-hidden flex items-center justify-center">
                {photoEditState.previewUrl ? (
                  <img
                    src={photoEditState.previewUrl}
                    alt="Aperçu modification"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-500">Aucune image sélectionnée</span>
                )}
              </div>
            </div>

            {/* Modification Options */}
            <div className="space-y-4 pt-2">
              {/* Option A: Import from Local Disk */}
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  Option 1 : Remplacer par un fichier de l'ordinateur
                </span>
                <button
                  type="button"
                  onClick={() => replaceSingleFileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <Upload className="w-4 h-4" />
                  <span>Sélectionner une nouvelle photo sur le disque</span>
                </button>
              </div>

              {/* Option B: Enter / Edit URL */}
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  Option 2 : Modifier l'adresse URL de l'image
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={photoEditState.previewUrl}
                    onChange={(e) => setPhotoEditState({ ...photoEditState, previewUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Option C: Mark as Hero Option */}
              {photoEditState.targetIndex !== 'hero' && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="setAsHeroCheck"
                    checked={photoEditState.isHero}
                    onChange={(e) => setPhotoEditState({ ...photoEditState, isHero: e.target.checked })}
                    className="w-4 h-4 text-amber-400 bg-slate-950 border-white/20 rounded"
                  />
                  <label htmlFor="setAsHeroCheck" className="text-xs text-slate-300 cursor-pointer">
                    Définir également cette photo comme couverture principale du projet
                  </label>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPhotoEditState(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSavePhotoEdit}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow cursor-pointer"
              >
                Appliquer le Remplacement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD OR EDIT CATEGORY MODAL (Ajout de Catégorie) */}
      {/* ========================================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-white/20 shadow-2xl p-6 space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" />
                <h3 className="font-display text-base font-bold uppercase text-white">
                  {editingCategory ? 'Modifier la Catégorie' : 'Ajouter une Nouvelle Catégorie'}
                </h3>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Nom de la Catégorie (Intitulé affiché) *
                </label>
                <input
                  type="text"
                  required
                  value={categoryFormData.label}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, label: e.target.value })}
                  placeholder="Ex : Design & Architecture d'Intérieur"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Identifiant technique (Slug)
                </label>
                <input
                  type="text"
                  value={categoryFormData.id}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, id: e.target.value })}
                  placeholder="Laisser vide pour génération automatique..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Utilisé dans les filtres d'URL (ex: design-interieur).
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Description de la Catégorie
                </label>
                <textarea
                  rows={2}
                  value={categoryFormData.description}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                  placeholder="Ex : Espaces d'exception, aménagement haut standing et scénographie..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow cursor-pointer"
                >
                  {editingCategory ? 'Enregistrer' : 'Créer la Catégorie'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: DELETE CATEGORY CONFIRMATION (Retirer une Catégorie) */}
      {/* ========================================================================= */}
      {deleteCategoryConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-white/15 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h4 className="font-display font-bold text-base uppercase">
                Retirer cette catégorie ?
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Êtes-vous sûr de vouloir retirer la catégorie{' '}
              <strong className="text-white font-semibold">
                "{categories.find((c) => c.id === deleteCategoryConfirmId)?.label}"
              </strong>{' '}
              ?
            </p>

            {projects.filter((p) => p.category === deleteCategoryConfirmId).length > 0 && (
              <div className="p-3 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs">
                ⚠️ Attention :{' '}
                <strong>
                  {projects.filter((p) => p.category === deleteCategoryConfirmId).length} projet(s)
                </strong>{' '}
                sont actuellement associés à cette catégorie. Ils seront automatiquement réassignés à la catégorie standard.
              </div>
            )}

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteCategoryConfirmId(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmDeleteCategory}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow cursor-pointer"
              >
                Retirer la Catégorie
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: DELETE PROJECT CONFIRMATION */}
      {/* ========================================================================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-white/15 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h4 className="font-display font-bold text-base uppercase">
                Supprimer le projet ?
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Êtes-vous sûr de vouloir supprimer définitivement le projet{' '}
              <strong className="text-white font-semibold">
                "{projects.find((p) => p.id === deleteConfirmId)?.title}"
              </strong>{' '}
              du catalogue Synoreyni ? Cette action est irréversible.
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

      {/* ========================================================================= */}
      {/* MODAL 6: LIGHTBOX FULL-SCREEN IMAGE PREVIEW */}
      {/* ========================================================================= */}
      {lightboxImageUrl && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImageUrl(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxImageUrl(null)}
              className="absolute -top-10 right-0 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImageUrl}
              alt="Aperçu HD"
              className="max-h-[85vh] max-w-full object-contain border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
