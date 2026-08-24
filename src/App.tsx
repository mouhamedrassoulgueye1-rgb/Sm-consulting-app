import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectModal } from './components/ProjectModal';
import { HomePillars } from './components/HomePillars';
import { AboutPage } from './components/AboutPage';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { INITIAL_PROJECTS_DATA } from './data/projectsData';
import { Project } from './types/architecture';

type AppRoute = 'home' | 'all-projects' | 'about' | 'admin-login' | 'admin-dashboard';

export default function App() {
  // Load projects from localStorage or default
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
      if (currentRoute !== 'home' && currentRoute !== 'about' && currentRoute !== 'all-projects') {
        navigateToRoute('home', '/');
        setTimeout(() => {
          const element = document.getElementById('contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
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

  // Admin CRUD Handlers
  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
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
      <AdminLogin
        onLoginSuccess={() => navigateToRoute('admin-dashboard', '/admin')}
        onReturnToPublicSite={() => navigateToRoute('home', '/')}
      />
    );
  }

  // Route 2: Admin Dashboard (/admin protected)
  if (currentRoute === 'admin-dashboard') {
    return (
      <AdminDashboard
        projects={projects}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onReturnToPublicSite={() => navigateToRoute('home', '/')}
        onLogout={handleAdminLogout}
      />
    );
  }

  // Route 3: Public Showcase (Home, /a-propos & /projets)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950 flex flex-col font-sans">
      {/* Dark Luxury Header */}
      <Header
        onNavigate={handleNavigateSection}
        activeSection={getActiveHeaderSection()}
        onOpenAdmin={() => navigateToRoute('admin-login', '/admin/login')}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Route: Independent About Page (/a-propos) */}
        {currentRoute === 'about' && (
          <AboutPage
            onNavigateHome={() => navigateToRoute('home', '/')}
            onNavigateProjects={() => navigateToRoute('all-projects', '/projets')}
            onNavigateContact={() => handleNavigateSection('contact')}
          />
        )}

        {/* Route: Home (/) */}
        {currentRoute === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onExploreProjects={() => handleNavigateSection('projets')}
              onNavigateContact={() => handleNavigateSection('contact')}
            />

            {/* Dynamic Animated Carousel Slider */}
            <ProjectGrid
              projects={projects}
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

        {/* Dedicated Contact & Quote Section with Direct WhatsApp Option */}
        <ContactSection
          initialProjectTitle={contactPrefillProject}
        />
      </main>

      {/* Deep Dark Footer with Dakar Office, Social Channels & Private Admin Access */}
      <Footer
        onNavigate={handleNavigateSection}
        onOpenAdmin={() => navigateToRoute('admin-login', '/admin/login')}
      />

      {/* Floating WhatsApp Button - Persistent & High-Visibility from Top to Bottom */}
      <WhatsAppButton />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestQuoteForProject={handleContactForProject}
      />
    </div>
  );
}

