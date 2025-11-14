import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config is provided via Vite env variables (prefix VITE_)
const firebaseConfig = {
  apiKey: (import.meta.env as any).VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: (import.meta.env as any).VITE_FIREBASE_AUTH_DOMAIN || 'demo-auth-domain.firebaseapp.com',
  projectId: (import.meta.env as any).VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: (import.meta.env as any).VITE_FIREBASE_STORAGE_BUCKET || 'demo-bucket.appspot.com',
  messagingSenderId: (import.meta.env as any).VITE_FIREBASE_MESSAGING_SENDER_ID || 'demo-sender-id',
  appId: (import.meta.env as any).VITE_FIREBASE_APP_ID || 'demo-app-id',
};

// Check if we're in demo mode (missing real Firebase config)
const isDemoMode = !(import.meta.env as any).VITE_FIREBASE_API_KEY;

if (isDemoMode) {
  console.warn('⚠️ Running in demo mode - Firebase not configured. Set VITE_FIREBASE_* environment variables for production.');
}

// Initialize once for the app lifecycle
let app;
try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Create a dummy app for demo mode
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const isDemoModeEnabled = isDemoMode;
