import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Property, Lead, User, StatusCategory } from '../types';
import { faqItems } from '../data/demo-data';
import { getFirebase } from '../firebase/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

interface DataContextType {
  properties: Property[];
  leads: Lead[];
  propertiesByCategory: {
    READY: Property[];
    '2026': Property[];
    '2027': Property[];
  };
  isLoading: boolean;
  error: string | null;
  // Admin functions
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProperty: (id: string, data: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  reorderProperties: (category: StatusCategory, orderedIds: string[]) => Promise<void>;
  // Lead functions
  submitLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => Promise<void>;
  // Auth state
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [fbUser, setFbUser] = useState<FirebaseUser | null | undefined>(undefined);

  const isAdmin = useMemo(() => user?.role === 'admin' || user?.role === 'editor', [user]);

  const mapPropertyDoc = (id: string, data: DocumentData): Property => {
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
    const updatedAt = data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date();
    return {
      id,
      statusCategory: data.statusCategory,
      projectName: data.projectName,
      area: data.area,
      propertyType: data.propertyType,
      unitTypes: data.unitTypes || [],
      sizeSqmFrom: data.sizeSqmFrom,
      sizeSqmTo: data.sizeSqmTo,
      priceFromTHB: data.priceFromTHB,
      priceFromEUR: data.priceFromEUR,
      ownership: data.ownership,
      completion: data.completion ?? null,
      highlights: data.highlights || [],
      transparency: data.transparency,
      operatorModel: data.operatorModel ?? null,
      docs: data.docs || [],
      images: data.images || [],
      description: data.description,
      location: data.location,
      isPublished: Boolean(data.isPublished),
      order: typeof data.order === 'number' ? data.order : 0,
      createdAt,
      updatedAt,
    };
  };

  const mapLeadDoc = (id: string, data: DocumentData): Lead => {
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
    return {
      id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      budget: data.budget,
      goal: data.goal,
      horizon: data.horizon,
      preferredCategory: data.preferredCategory,
      riskProfile: data.riskProfile,
      dsgvoConsent: Boolean(data.dsgvoConsent),
      marketingConsent: Boolean(data.marketingConsent),
      source: data.source || 'website',
      createdAt,
    };
  };

  // Auth listener
  useEffect(() => {
    try {
      const { auth } = getFirebase();
      const unsub = onAuthStateChanged(auth, (u) => {
        setFbUser(u);
        if (!u) setUser(null);
      });
      return () => unsub();
    } catch (err: any) {
      console.error('Firebase auth init error:', err);
      setError(err?.message || 'Firebase Authentifizierung fehlgeschlagen');
      setFbUser(null);
    }
  }, []);

  // Data subscriptions
  useEffect(() => {
    // Firebase mode only - no demo data
    let db;
    try {
      db = getFirebase().db;
    } catch (err: any) {
      console.error('Firebase init error:', err);
      setError(err?.message || 'Firebase nicht konfiguriert');
      setProperties([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);

    // While auth state is still resolving, do nothing.
    if (fbUser === undefined) return;

    // Public: published only
    if (!fbUser) {
      const q = query(
        collection(db, 'properties'),
        where('isPublished', '==', true),
        orderBy('statusCategory'),
        orderBy('order')
      );
      const unsubProps = onSnapshot(
        q,
        (snap: QuerySnapshot<DocumentData>) => {
          const list = snap.docs.map(d => mapPropertyDoc(d.id, d.data()));
          setProperties(list);
          setError(null);
          setIsLoading(false);
        },
        (err) => {
          console.error('Firestore error:', err);
          setError(err?.message || 'Firestore Fehler beim Laden der Objekte.');
          setProperties([]);
          setIsLoading(false);
        }
      );
      setLeads([]);
      return () => unsubProps();
    }

    // Admin: role + all data
    let unsubProps: (() => void) | null = null;
    let unsubLeads: (() => void) | null = null;
    let cancelled = false;

    (async () => {
      try {
        const adminRef = doc(db, 'admins', fbUser.uid);
        const adminSnap = await getDoc(adminRef);
        const role = (adminSnap.exists() ? adminSnap.data().role : null) as User['role'] | null;

        const appUser: User = {
          uid: fbUser.uid,
          email: fbUser.email || '',
          role: role === 'admin' || role === 'editor' ? role : 'editor',
          displayName: fbUser.displayName || undefined,
          createdAt: new Date(),
        };
        if (cancelled) return;
        setUser(appUser);

        const qProps = query(collection(db, 'properties'), orderBy('statusCategory'), orderBy('order'));
        unsubProps = onSnapshot(
          qProps,
          (snap: QuerySnapshot<DocumentData>) => {
            setProperties(snap.docs.map(d => mapPropertyDoc(d.id, d.data())));
            setError(null);
            setIsLoading(false);
          },
          (err) => {
            setError(err?.message || 'Firestore Fehler beim Laden der Objekte.');
            setIsLoading(false);
          }
        );

        const qLeads = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
        unsubLeads = onSnapshot(
          qLeads,
          (snap: QuerySnapshot<DocumentData>) => {
            setLeads(snap.docs.map(d => mapLeadDoc(d.id, d.data())));
          },
          (err) => {
            setError(err?.message || 'Firestore Fehler beim Laden der Leads.');
          }
        );
      } catch (e: any) {
        // Some environments surface request cancellation as AbortError.
        if (cancelled) return;
        const msg = e?.message || 'Unbekannter Fehler beim Initialisieren der Admin-Sitzung.';
        setError(msg);
        setUser(null);
        setLeads([]);
        setProperties([]);
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      if (unsubProps) unsubProps();
      if (unsubLeads) unsubLeads();
    };
  }, [isAdmin, fbUser]);

  // Group properties by category
  const propertiesByCategory = {
    READY: properties.filter(p => p.statusCategory === 'READY').sort((a, b) => a.order - b.order),
    '2026': properties.filter(p => p.statusCategory === '2026').sort((a, b) => a.order - b.order),
    '2027': properties.filter(p => p.statusCategory === '2027').sort((a, b) => a.order - b.order),
  };

  // Admin functions - Firebase only
  const addProperty = async (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { db } = getFirebase();
    await addDoc(collection(db, 'properties'), {
      ...propertyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  const updateProperty = async (id: string, data: Partial<Property>) => {
    const { db } = getFirebase();
    const ref = doc(db, 'properties', id);
    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    } as any);
  };

  const deleteProperty = async (id: string) => {
    const { db } = getFirebase();
    await deleteDoc(doc(db, 'properties', id));
  };

  const reorderProperties = async (_category: StatusCategory, orderedIds: string[]) => {
    const { db } = getFirebase();
    const batch = writeBatch(db);
    orderedIds.forEach((id, index) => {
      batch.update(doc(db, 'properties', id), { order: index, updatedAt: serverTimestamp() });
    });
    await batch.commit();
  };

  const submitLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const { db } = getFirebase();
    await addDoc(collection(db, 'leads'), {
      ...leadData,
      createdAt: serverTimestamp(),
    });
  };

  // Auth functions
  const login = async (email: string, password: string) => {
    const { auth, db } = getFirebase();
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const adminRef = doc(db, 'admins', cred.user.uid);
    const adminSnap = await getDoc(adminRef);
    if (!adminSnap.exists()) {
      throw new Error('Kein Admin-Zugriff. Bitte Admin-Rechte im Firebase Console setzen.');
    }
    const role = adminSnap.data().role as User['role'];
    const appUser: User = {
      uid: cred.user.uid,
      email: cred.user.email || email,
      role: role === 'admin' || role === 'editor' ? role : 'editor',
      displayName: cred.user.displayName || undefined,
      createdAt: new Date(),
    };
    setUser(appUser);
  };

  const logout = async () => {
    const { auth } = getFirebase();
    await signOut(auth);
    setUser(null);
  };

  return (
    <DataContext.Provider value={{
      properties,
      leads,
      propertiesByCategory,
      isLoading,
      error,
      addProperty,
      updateProperty,
      deleteProperty,
      reorderProperties,
      submitLead,
      user,
      isAdmin,
      login,
      logout,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export { faqItems };
