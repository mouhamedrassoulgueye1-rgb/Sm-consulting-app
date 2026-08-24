export type ProjectCategory = 'all' | 'residential' | 'heritage' | 'commercial' | 'hospitality';

export interface ProjectSpec {
  surface: string;
  year: string;
  location: string;
  category?: ProjectCategory;
  categoryLabel?: string;
  cost?: string;
  leadArchitect?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  category: ProjectCategory;
  categoryLabel: string;
  heroImage: string;
  galleryImages: string[];
  summary: string;
  conceptDescription: string;
  specs: ProjectSpec;
  isFeatured?: boolean;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  createdAt: string;
}
