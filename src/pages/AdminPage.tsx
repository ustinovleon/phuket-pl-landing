import { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import type { Property } from '../types';
import { formatCurrency, getCategoryLabel, thbToEur } from '../utils/format';
import { LogOut, Trash2, Eye, EyeOff, Settings, Users, Plus, Pencil, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  const { user, logout, login, properties, leads, addProperty, updateProperty, deleteProperty, error } = useData();
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'properties' | 'leads'>('properties');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const emptyDraft = useMemo(() => ({
    statusCategory: 'READY' as const,
    projectName: '',
    area: '',
    propertyType: 'CONDO' as const,
    ownership: 'LEASEHOLD' as const,
    completion: null as string | null,
    sizeSqmFrom: 0,
    sizeSqmTo: 0,
    priceFromTHB: 0,
    priceFromEUR: 0,
    highlightsText: '',
    highlightsPlText: '',
    descriptionPl: '',
    operatorModelPl: '',
    imagesText: '',
    isPublished: false,
    order: 0,
  }), []);

  const [draft, setDraft] = useState<any>(emptyDraft);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Logowanie nie powiodło się');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Show error state
  if (error && !user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="font-display text-xl text-slate-900 mb-2">Błąd</h1>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Odśwież stronę
          </button>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-display text-2xl">P</span>
            </div>
            <h1 className="font-display text-2xl text-slate-900">Panel Administracyjny</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="input-field"
                disabled={isSubmitting}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hasło</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="input-field"
                disabled={isSubmitting}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full btn-primary !py-3 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </form>
          
          <div className="mt-4">
            <a href="/" className="text-sm text-slate-500 hover:text-brand-600">
              ← Powrót do strony głównej
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  const leadsCount = leads.length;

  const openCreate = () => {
    setEditing(null);
    setDraft(emptyDraft);
    setFormError('');
    setIsEditorOpen(true);
  };

  const openEdit = (property: Property) => {
    setEditing(property);
    setDraft({
      statusCategory: property.statusCategory,
      projectName: property.projectName,
      area: property.area,
      propertyType: property.propertyType,
      ownership: property.ownership,
      completion: property.completion,
      sizeSqmFrom: property.sizeSqmFrom,
      sizeSqmTo: property.sizeSqmTo,
      priceFromTHB: property.priceFromTHB,
      priceFromEUR: property.priceFromEUR,
      highlightsText: (property.highlights || []).join('\n'),
      highlightsPlText: (property.highlights_pl || []).join('\n'),
      descriptionPl: property.description_pl || '',
      operatorModelPl: property.operatorModel_pl || '',
      imagesText: (property.images || []).join('\n'),
      isPublished: property.isPublished,
      order: property.order,
    });
    setFormError('');
    setIsEditorOpen(true);
  };

  const computeNiceEUR = (thb: number) => {
    const eur = thbToEur(thb);
    if (eur >= 1_000_000) return Math.round((eur / 1_000_000) * 10) / 10 * 1_000_000;
    return eur >= 100_000 ? Math.round(eur / 1_000) * 1_000 : Math.round(eur / 500) * 500;
  };

  const handleSave = async () => {
    setFormError('');
    if (!draft.projectName?.trim()) return setFormError('Nazwa projektu jest wymagana');
    if (!draft.area?.trim()) return setFormError('Lokalizacja jest wymagana');
    if (!draft.priceFromTHB || draft.priceFromTHB <= 0) return setFormError('Cena (THB) jest wymagana');
    if (!draft.imagesText?.trim()) return setFormError('Wymagany jest przynajmniej 1 URL zdjęcia');

    const highlights = String(draft.highlightsText || '')
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean);
    
    const highlights_pl = String(draft.highlightsPlText || '')
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean);
    
    const images = String(draft.imagesText || '')
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean);

    const priceFromTHB = Number(draft.priceFromTHB);
    const priceFromEUR = computeNiceEUR(priceFromTHB);

    const payload: any = {
      statusCategory: draft.statusCategory,
      projectName: draft.projectName.trim(),
      area: draft.area.trim(),
      propertyType: draft.propertyType,
      ownership: draft.ownership,
      completion: draft.completion || null,
      unitTypes: [],
      sizeSqmFrom: Number(draft.sizeSqmFrom || 0),
      sizeSqmTo: Number(draft.sizeSqmTo || 0),
      priceFromTHB,
      priceFromEUR,
      highlights,
      highlights_pl: highlights_pl.length > 0 ? highlights_pl : null,
      description_pl: draft.descriptionPl?.trim() || null,
      operatorModel_pl: draft.operatorModelPl?.trim() || null,
      docs: [],
      images,
      operatorModel: null,
      transparency: null, 
      description: '',
      location: null,
      isPublished: Boolean(draft.isPublished),
      order: Number(draft.order || 0),
    };

    setIsSaving(true);
    try {
      if (editing) {
        await updateProperty(editing.id, payload);
      } else {
        await addProperty(payload);
      }
      setIsEditorOpen(false);
    } catch (err: any) {
      console.error('Save error:', err);
      setFormError(`Błąd podczas zapisywania: ${err.message || 'Nieznany błąd'}. Sprawdź reguły Firestore.`);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleTogglePublish = async (property: Property) => {
    await updateProperty(property.id, { isPublished: !property.isPublished });
  };
  
  const handleDelete = async (id: string) => {
    if (confirm('Czy na pewno chcesz usunąć ten obiekt?')) {
      await deleteProperty(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-display text-lg">P</span>
            </div>
            <div>
              <h1 className="font-display text-xl text-slate-900">Panel Administracyjny</h1>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="btn-secondary !py-2">
            <LogOut className="w-4 h-4" /> Wyloguj
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'properties' ? 'bg-brand-600 text-white' : 'bg-white text-slate-600'}`}
          >
            <Settings className="w-4 h-4 inline mr-2" />Obiekty ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'leads' ? 'bg-brand-600 text-white' : 'bg-white text-slate-600'}`}
          >
            <Users className="w-4 h-4 inline mr-2" />Kontakty ({leadsCount})
          </button>
        </div>

        {activeTab === 'properties' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-display text-lg">Zarządzanie obiektami</h2>
              <button onClick={openCreate} className="btn-primary !py-2">
                <Plus className="w-4 h-4" /> Nowy obiekt
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Projekt</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Lokalizacja</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Kategoria</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Cena od</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-600">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={property.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <div className="font-medium text-slate-900">{property.projectName}</div>
                            <div className="text-sm text-slate-500">{property.propertyType === 'CONDO' ? 'Apartament' : 'Willa'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{property.area}</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${property.statusCategory === 'READY' ? 'badge-ready' : property.statusCategory === '2026' ? 'badge-2026' : 'badge-2027'}`}>
                          {getCategoryLabel(property.statusCategory)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        {formatCurrency(property.priceFromEUR)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleTogglePublish(property)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${property.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}
                        >
                          {property.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {property.isPublished ? 'Opublikowany' : 'Szkic'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => openEdit(property)} className="p-2 text-slate-600 hover:bg-slate-100 rounded mr-1" title="Edytuj">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(property.id)} className="p-2 text-red-500 hover:bg-red-50 rounded" title="Usuń">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-display text-lg">Lista kontaktów</h2>
            </div>
            {leads.length === 0 ? (
              <div className="p-8 text-center text-slate-500">Brak kontaktów.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Imię i nazwisko</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Kontakt</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Budżet</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((lead: any, index: number) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{lead.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          <div>{lead.phone}</div>
                          {lead.email && <div className="text-slate-400">{lead.email}</div>}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{lead.budget || '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">
                          {new Date(lead.createdAt).toLocaleDateString('pl-PL')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-full flex items-start sm:items-center justify-center p-4 py-8">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
              {/* Header - sticky */}
              <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
                <div>
                  <div className="font-display text-lg text-slate-900">
                    {editing ? 'Edytuj obiekt' : 'Nowy obiekt'}
                  </div>
                  <div className="text-sm text-slate-500">Pola wymagane: Projekt, Lokalizacja, Cena (THB), Zdjęcia</div>
                </div>
                <button onClick={() => setIsEditorOpen(false)} className="btn-secondary !py-2">Zamknij</button>
              </div>

              {/* Scrollable Content */}
              <div className="p-4 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formError && (
                    <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nazwa projektu</label>
                    <input className="input-field" value={draft.projectName} onChange={(e) => setDraft({ ...draft, projectName: e.target.value })} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Lokalizacja</label>
                    <input className="input-field" value={draft.area} onChange={(e) => setDraft({ ...draft, area: e.target.value })} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Kategoria</label>
                    <select className="input-field" value={draft.statusCategory} onChange={(e) => setDraft({ ...draft, statusCategory: e.target.value })}>
                      <option value="READY">Dostępne od zaraz</option>
                      <option value="2026">Oddanie 2026</option>
                      <option value="2027">Oddanie 2027</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Typ obiektu</label>
                    <select className="input-field" value={draft.propertyType} onChange={(e) => setDraft({ ...draft, propertyType: e.target.value })}>
                      <option value="CONDO">Apartament</option>
                      <option value="VILLA">Willa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Forma własności</label>
                    <select className="input-field" value={draft.ownership} onChange={(e) => setDraft({ ...draft, ownership: e.target.value })}>
                      <option value="LEASEHOLD">Leasehold (dzierżawa)</option>
                      <option value="FREEHOLD">Freehold (własność)</option>
                      <option value="MIXED">Mieszana</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Oddanie (RRRR-MM, opcjonalnie)</label>
                    <input className="input-field" value={draft.completion || ''} placeholder="2026-12" onChange={(e) => setDraft({ ...draft, completion: e.target.value || null })} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Powierzchnia od (m²)</label>
                    <input type="number" className="input-field" value={draft.sizeSqmFrom} onChange={(e) => setDraft({ ...draft, sizeSqmFrom: e.target.value })} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Powierzchnia do (m²)</label>
                    <input type="number" className="input-field" value={draft.sizeSqmTo} onChange={(e) => setDraft({ ...draft, sizeSqmTo: e.target.value })} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cena od (THB)</label>
                    <input type="number" className="input-field" value={draft.priceFromTHB} onChange={(e) => setDraft({ ...draft, priceFromTHB: e.target.value, priceFromEUR: computeNiceEUR(Number(e.target.value || 0)) })} />
                    <div className="text-xs text-slate-500 mt-1">Cena EUR obliczana automatycznie (kurs referencyjny 01.01.2026)</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cena od (EUR, orientacyjna)</label>
                    <input className="input-field" value={formatCurrency(Number(draft.priceFromEUR || 0))} readOnly />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Zdjęcia (1 URL na linię)</label>
                    <textarea className="input-field min-h-[96px]" value={draft.imagesText} onChange={(e) => setDraft({ ...draft, imagesText: e.target.value })} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Wyróżniki EN (1 punkt na linię, opcjonalnie)</label>
                    <textarea 
                      className="input-field min-h-[96px]" 
                      value={draft.highlightsText} 
                      onChange={(e) => setDraft({ ...draft, highlightsText: e.target.value })}
                      placeholder="Central Karon location, walk to beach&#10;Villa Market supermarket in complex&#10;..."
                    />
                    <div className="text-xs text-slate-500 mt-1">Oryginalne wyróżniki (angielski) - używane jako fallback</div>
                  </div>

                  {/* Polish translations section */}
                  <div className="md:col-span-2 border-t border-slate-200 pt-4 mt-2">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg">🇵🇱</span>
                      <h4 className="font-medium text-slate-900">Polskie tłumaczenia</h4>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Wyróżniki PL (1 punkt na linię)
                    </label>
                    <textarea 
                      className="input-field min-h-[96px]" 
                      value={draft.highlightsPlText} 
                      onChange={(e) => setDraft({ ...draft, highlightsPlText: e.target.value })}
                      placeholder="Centrum Karon, spacer do plaży&#10;Supermarket Villa Market w kompleksie&#10;Symulator golfa i korty tenisowe&#10;..."
                    />
                    <div className="text-xs text-slate-500 mt-1">
                      Jeśli puste, wyświetlone zostaną oryginalne wyróżniki (EN)
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Opis PL
                    </label>
                    <textarea 
                      className="input-field min-h-[72px]" 
                      value={draft.descriptionPl} 
                      onChange={(e) => setDraft({ ...draft, descriptionPl: e.target.value })}
                      placeholder="Opis projektu po polsku..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Model operatorski PL
                    </label>
                    <input 
                      className="input-field" 
                      value={draft.operatorModelPl} 
                      onChange={(e) => setDraft({ ...draft, operatorModelPl: e.target.value })}
                      placeholder="Profesjonalny operator hotelowy z opcją puli najmu"
                    />
                  </div>

                  <div className="md:col-span-2 border-t border-slate-200 pt-4 mt-2"></div>

                  <div className="md:col-span-2 flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="isPublished"
                      checked={Boolean(draft.isPublished)} 
                      onChange={(e) => setDraft({ ...draft, isPublished: e.target.checked })} 
                      className="w-4 h-4 text-brand-600 rounded"
                    />
                    <label htmlFor="isPublished" className="text-sm text-slate-700">
                      Opublikowany (widoczny na stronie)
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer - sticky */}
              <div className="p-4 border-t bg-slate-50 flex-shrink-0">
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setIsEditorOpen(false)} className="btn-secondary" disabled={isSaving}>
                    Anuluj
                  </button>
                  <button onClick={handleSave} className="btn-primary" disabled={isSaving}>
                    {isSaving ? 'Zapisywanie...' : 'Zapisz'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
