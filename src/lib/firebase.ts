import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Project, CategoryItem } from '../types/architecture';
import { INITIAL_PROJECTS_DATA, DEFAULT_CATEGORIES } from '../data/projectsData';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with custom databaseId if defined
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const PROJECTS_COLLECTION = 'projects';
const CATEGORIES_COLLECTION = 'categories';

/**
 * Compress an image file or base64 before saving to cloud
 * Ensures images upload quickly and don't blow up network quotas.
 */
export async function compressImage(file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Seed initial categories & projects to Firestore if empty
 */
export async function seedInitialDataIfEmpty() {
  try {
    const catSnap = await getDocs(collection(db, CATEGORIES_COLLECTION));
    if (catSnap.empty) {
      console.log('Seeding initial categories to Firestore...');
      const batch = writeBatch(db);
      DEFAULT_CATEGORIES.forEach((cat) => {
        const ref = doc(db, CATEGORIES_COLLECTION, cat.id);
        batch.set(ref, cat);
      });
      await batch.commit();
    }

    const projSnap = await getDocs(collection(db, PROJECTS_COLLECTION));
    if (projSnap.empty) {
      console.log('Seeding initial projects to Firestore...');
      const batch = writeBatch(db);
      INITIAL_PROJECTS_DATA.forEach((proj) => {
        const ref = doc(db, PROJECTS_COLLECTION, proj.id);
        batch.set(ref, proj);
      });
      await batch.commit();
    }
  } catch (error) {
    console.warn('Could not seed initial data to Firestore (using fallback):', error);
  }
}

/**
 * Subscribe to real-time updates for projects
 */
export function subscribeToProjects(callback: (projects: Project[]) => void) {
  try {
    const colRef = collection(db, PROJECTS_COLLECTION);
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Project[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Project);
          });
          callback(list);
        } else {
          // If Firestore is empty, seed defaults
          seedInitialDataIfEmpty();
          callback(INITIAL_PROJECTS_DATA);
        }
      },
      (error) => {
        console.warn('Firestore projects subscription error:', error);
      }
    );
  } catch (error) {
    console.warn('Failed to subscribe to projects collection:', error);
    return () => {};
  }
}

/**
 * Subscribe to real-time updates for categories
 */
export function subscribeToCategories(callback: (categories: CategoryItem[]) => void) {
  try {
    const colRef = collection(db, CATEGORIES_COLLECTION);
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: CategoryItem[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as CategoryItem);
          });
          callback(list);
        } else {
          // If Firestore is empty, seed defaults
          seedInitialDataIfEmpty();
          callback(DEFAULT_CATEGORIES);
        }
      },
      (error) => {
        console.warn('Firestore categories subscription error:', error);
      }
    );
  } catch (error) {
    console.warn('Failed to subscribe to categories collection:', error);
    return () => {};
  }
}

/**
 * Cloud CRUD for Projects
 */
export async function saveProjectToCloud(project: Project): Promise<void> {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, project.id);
    await setDoc(docRef, project, { merge: true });
  } catch (error) {
    console.error('Error saving project to cloud Firestore:', error);
    throw error;
  }
}

export async function deleteProjectFromCloud(projectId: string): Promise<void> {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, projectId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting project from cloud Firestore:', error);
    throw error;
  }
}

/**
 * Cloud CRUD for Categories
 */
export async function saveCategoryToCloud(category: CategoryItem): Promise<void> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, category.id);
    await setDoc(docRef, category, { merge: true });
  } catch (error) {
    console.error('Error saving category to cloud Firestore:', error);
    throw error;
  }
}

export async function deleteCategoryFromCloud(categoryId: string): Promise<void> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, categoryId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting category from cloud Firestore:', error);
    throw error;
  }
}
