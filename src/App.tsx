import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedScrollShowcase } from './components/FeaturedScrollShowcase';
import { ProjectGrid } from './components/ProjectGrid';
import { HomePillars } from './components/HomePillars';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { INITIAL_PROJECTS_DATA, DEFAULT_CATEGORIES } from './data/projectsData';
import { Project, CategoryItem } from './types/architecture';
import {
  subscribeToProjects,
  subscribeToCategories,
  saveProjectToCloud,
  deleteProjectFromCloud,
  saveCategoryToCloud,
  deleteCategoryFromCloud,
  seedInitialDataIfEmpty,
} from './lib/firebase';

// Lazy load non-critical routes & modals to reduce initial bundle size
const AboutPage = lazy(() => import('./components/AboutPage'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

function LoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#FAF9F6] p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-[#888888]">Chargement...</span>
      </div>
    </div>
  );
}

type AppRoute = 'home' | 'all-projects' | 'about' | 'admin-login' | 'admin-dashboard';

export default function App() {
  // Load projects from localStorage or default as initial state
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('synoreyni_custom_projects');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_PROJECTS_DATA;
  });

  // Load categories from localStorage or default
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('synoreyni_custom_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_CATEGORIES;
  });

  // Real-time Cloud Synchronization via Firebase Firestore
  useEffect(() => {
    seedInitialDataIfEmpty();

    const unsubProjects = subscribeToProjects((cloudProjects) => {
      if (cloudProjects && cloudProjects.length > 0) {
        setProjects(cloudProjects);
        try {
          localStorage.setItem('synoreyni_custom_projects', JSON.stringify(cloudProjects));
        } catch {
          // Local storage quota fallback
        }
      }
    });

    const unsubCategories = subscribeToCategories((cloudCategories) => {
      if (cloudCategories && cloudCategories.length > 0) {
        setCategories(cloudCategories);
        try {
          localStorage.setItem('synoreyni_custom_categories', JSON.stringify(cloudCategories));
        } catch {
          // Local storage quota fallback
        }
      }
    });

    return () => {
      unsubProjects();
      unsubCategories();
    };
  }, []);

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/admin') return 'admin-dashboard';
      if (path === '/admin/login') return 'admin-login';
      if (path === '/projets') return 'all-projects';
      if (path === '/a-propos' || path === '/about') return 'about';
    }
    return 'home';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactPrefillProject, setContactPrefillProject] = useState<string>('');

  // Save projects to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('synoreyni_custom_projects', JSON.stringify(projects));
    } catch {
      // Ignore
    }
  }, [projects]);

  // Save categories to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('synoreyni_custom_categories', JSON.stringify(categories));
    } catch {
      // Ignore
    }
  }, [categories]);

  // Next.js-like Middleware Route Guard for /admin/*
  useEffect(() => {
    if (currentRoute === 'admin-dashboard') {
      const session = localStorage.getItem('synoreyni_admin_session');
      if (!session) {
        setCurrentRoute('admin-login');
      }
    }
  }, [currentRoute]);

  // Handle URL history state changes
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        const session = localStorage.getItem('synoreyni_admin_session');
        setCurrentRoute(session ? 'admin-dashboard' : 'admin-login');
      } else if (path === '/admin/login') {
        setCurrentRoute('admin-login');
      } else if (path === '/projets') {
        setCurrentRoute('all-projects');
      } else if (path === '/a-propos' || path === '/about') {
        setCurrentRoute('about');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToRoute = (route: AppRoute, urlPath?: string) => {
    setCurrentRoute(route);
    if (urlPath && typeof window !== 'undefined') {
      window.history.pushState({}, '', urlPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'a-propos') {
      navigateToRoute('about', '/a-propos');
      return;
    }

    if (sectionId === 'projets') {
      navigateToRoute('all-projects', '/projets');
      return;
    }

    if (sectionId === 'hero') {
      navigateToRoute('home', '/');
      return;
    }

    if (sectionId === 'contact') {
      if (currentRoute === 'all-projects') {
        navigateToRoute('home', '/');
        setTimeout(() => {
          const element = document.getElementById('contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 180);
      } else {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    if (currentRoute !== 'home') {
      navigateToRoute('home', '/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactForProject = (projectTitle: string) => {
    setContactPrefillProject(projectTitle);
    handleNavigateSection('contact');
  };

  // Admin CRUD Handlers - Projects
  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    saveProjectToCloud(newProject).catch((err) =>
      console.error('Failed to sync new project to Firestore:', err)
    );
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    saveProjectToCloud(updatedProject).catch((err) =>
      console.error('Failed to sync updated project to Firestore:', err)
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    deleteProjectFromCloud(projectId).catch((err) =>
      console.error('Failed to delete project from Firestore:', err)
    );
  };

  // Admin CRUD Handlers - Categories
  const handleAddCategory = (newCategory: CategoryItem) => {
    setCategories((prev) => {
      if (prev.some((c) => c.id === newCategory.id)) {
        return prev;
      }
      return [...prev, newCategory];
    });
    saveCategoryToCloud(newCategory).catch((err) =>
      console.error('Failed to sync new category to Firestore:', err)
    );
  };

  const handleUpdateCategory = (updatedCategory: CategoryItem) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
    );
    saveCategoryToCloud(updatedCategory).catch((err) =>
      console.error('Failed to sync category update to Firestore:', err)
    );
    // Update project category labels if needed
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.category === updatedCategory.id) {
          const updated = {
            ...p,
            categoryLabel: updatedCategory.label,
            specs: {
              ...p.specs,
              categoryLabel: updatedCategory.label,
            },
          };
          saveProjectToCloud(updated).catch(() => {});
          return updated;
        }
        return p;
      })
    );
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    deleteCategoryFromCloud(categoryId).catch((err) =>
      console.error('Failed to delete category from Firestore:', err)
    );
    // If any project has this category, fallback to remaining first category or 'residential'
    const fallbackCategory = categories.find((c) => c.id !== categoryId) || {
      id: 'residential',
      label: 'Résidentiel d’Exception',
    };
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.category === categoryId) {
          const updated = {
            ...p,
            category: fallbackCategory.id,
            categoryLabel: fallbackCategory.label,
            specs: {
              ...p.specs,
              category: fallbackCategory.id,
              categoryLabel: fallbackCategory.label,
            },
          };
          saveProjectToCloud(updated).catch(() => {});
          return updated;
        }
        return p;
      })
    );
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('synoreyni_admin_session');
    navigateToRoute('home', '/');
  };

  // Determine active section for header
  const getActiveHeaderSection = () => {
    if (currentRoute === 'about') return 'a-propos';
    if (currentRoute === 'all-projects') return 'projets';
    return 'hero';
  };

  // Route 1: Admin Login (/admin/login)
  if (currentRoute === 'admin-login') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <AdminLogin
          onLoginSuccess={() => navigateToRoute('admin-dashboard', '/admin')}
          onReturnToPublicSite={() => navigateToRoute('home', '/')}
        />
      </Suspense>
    );
  }

  // Route 2: Admin Dashboard (/admin protected)
  if (currentRoute === 'admin-dashboard') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <AdminDashboard
          projects={projects}
          categories={categories}
          onAddProject={handleAddProject}
          onUpdateProject={handleUpdateProject}
          onDeleteProject={handleDeleteProject}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
          onReturnToPublicSite={() => navigateToRoute('home', '/')}
          onLogout={handleAdminLogout}
        />
      </Suspense>
    );
  }

  // Route 3: Public Showcase (Home, /a-propos & /projets)
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] selection:bg-[#C5A059] selection:text-white flex flex-col font-sans">
      {/* Header */}
      <Header
        onNavigate={handleNavigateSection}
        activeSection={getActiveHeaderSection()}
        onOpenAdmin={() => navigateToRoute('admin-login', '/admin/login')}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Route: Independent About Page (/a-propos) */}
        {currentRoute === 'about' && (
          <Suspense fallback={<LoadingFallback />}>
            <AboutPage
              onNavigateHome={() => navigateToRoute('home', '/')}
              onNavigateProjects={() => navigateToRoute('all-projects', '/projets')}
              onNavigateContact={() => handleNavigateSection('contact')}
            />
          </Suspense>
        )}

        {/* Route: Home (/) */}
        {currentRoute === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onExploreProjects={() => handleNavigateSection('featured-scroller')}
              onNavigateContact={() => handleNavigateSection('contact')}
            />

            {/* Photos en vedette qui changent au défilement de la page */}
            <FeaturedScrollShowcase
              projects={projects}
              onSelectProject={(project) => setSelectedProject(project)}
            />

            {/* Réalisations phares sous forme de cartes défilables horizontalement */}
            <ProjectGrid
              projects={projects}
              categories={categories}
              onSelectProject={(project) => setSelectedProject(project)}
              onNavigateContact={() => handleNavigateSection('contact')}
              showAllProjectsView={false}
              onToggleAllProjectsView={(showAll) => {
                if (showAll) {
                  navigateToRoute('all-projects', '/projets');
                }
              }}
            />

            {/* 4 Core Pillars (Architecture, Design, Ingénierie, Consultance) */}
            <HomePillars
              onNavigateContact={() => handleNavigateSection('contact')}
              onNavigateAbout={() => navigateToRoute('about', '/a-propos')}
            />
          </>
        )}

        {/* Route: All Projects Catalogue (/projets) */}
        {currentRoute === 'all-projects' && (
          <div className="pt-20">
            <ProjectGrid
              projects={projects}
              categories={categories}
              onSelectProject={(project) => setSelectedProject(project)}
              onNavigateContact={() => handleNavigateSection('contact')}
              showAllProjectsView={true}
              onToggleAllProjectsView={(showAll) => {
                if (!showAll) {
                  navigateToRoute('home', '/');
                }
              }}
            />
          </div>
        )}

        {/* Dedicated Contact & Quote Section with Direct WhatsApp Option (Only on Home and About pages, excluded from Nos Réalisations) */}
        {currentRoute !== 'all-projects' && (
          <ContactSection
            initialProjectTitle={contactPrefillProject}
          />
        )}
      </main>

      {/* Footer with Dakar Office, Social Channels & Private Admin Access */}
      <Footer
        onNavigate={handleNavigateSection}
        onOpenAdmin={() => navigateToRoute('admin-login', '/admin/login')}
      />

      {/* Floating WhatsApp Button - Persistent & High-Visibility from Top to Bottom */}
      <WhatsAppButton />

      {/* Project Detail Modal */}
      <Suspense fallback={null}>
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onRequestQuoteForProject={handleContactForProject}
        />
      </Suspense>
    </div>
  );
}

