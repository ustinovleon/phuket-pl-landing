import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';

// Мы заменили getFirestore на initializeFirestore
import { initializeFirestore } from 'firebase/firestore'; 
import type { Firestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET &&
  import.meta.env.VITE_FIREBASE_APP_ID
);

type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
};

let _services: FirebaseServices | null = null;

export function getFirebase(): FirebaseServices {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase ist nicht konfiguriert. Bitte VITE_FIREBASE_* Variablen setzen.');
  }
  if (_services) return _services;

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  // ИСПРАВЛЕНИЕ: Инициализируем Firestore с настройкой ignoreUndefinedProperties
  const db = initializeFirestore(app, {
    ignoreUndefinedProperties: true
  });
  
  const storage = getStorage(app);

  _services = { app, auth, db, storage };
  return _services;
}
