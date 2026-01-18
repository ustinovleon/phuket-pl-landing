import { useState } from 'react';
import { Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAnalytics } from '../hooks/useAnalytics';
import { isValidPhone, getWhatsAppLink } from '../utils/format';

const CONTACT_PERSON = {
  name: 'Tomasz Rozmus',
  role: 'Przedstawiciel dla Polski',
  phoneE164: '66816794414',
  phoneDisplay: '+66 81 679 4414',
  photoUrl:
    'https://scontent.fbkk5-7.fna.fbcdn.net/v/t39.30808-6/452395598_996125169184583_6055967917849107130_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=7VMqc99Y1YQQ7kNvwE6Xkjh&_nc_oc=Admd6lrPUwr-SF6i17FYvSKFDeuR6Vwn3Wkj6GIFczQ05TfoC_1gj4C5foi7X9QkDJo&_nc_zt=23&_nc_ht=scontent.fbkk5-7.fna&_nc_gid=5Vb5idV-VHVojpnOk-oRig&oh=00_AfrzX0CMoyKg3Glh4hCLzZ3MU6fL8EdHL8Yy3R3SmMUi7A&oe=69725BCD',
} as const;

interface FormData {
  name: string;
  phone: string;
  email: string;
  budget: string;
  goal: string;
  horizon: string;
  preferredCategory: string;
  rodoConsent: boolean;
  marketingConsent: boolean;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  budget: '',
  goal: '',
  horizon: '',
  preferredCategory: '',
  rodoConsent: false,
  marketingConsent: false,
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQualification, setShowQualification] = useState(false);
  const { submitLead } = useData();
  const { trackEvent } = useAnalytics();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Numer telefonu jest wymagany';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Proszę podać prawidłowy numer telefonu';
    }
    
    if (!formData.rodoConsent) {
      newErrors.rodoConsent = 'Zgoda jest wymagana';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    trackEvent('form_submit', { 
      hasQualification: showQualification,
      budget: formData.budget || 'not_provided'
    });
    
    setIsSubmitting(true);
    
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        budget: formData.budget || undefined,
        goal: formData.goal as any || undefined,
        horizon: formData.horizon as any || undefined,
        preferredCategory: formData.preferredCategory as any || undefined,
        dsgvoConsent: formData.rodoConsent,
        marketingConsent: formData.marketingConsent,
        source: 'landing_page_pl',
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
    
    if (field === 'name' && !formData.phone) {
      trackEvent('form_start', {});
    }
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { location: 'contact_form' });
    const message = formData.name 
      ? `Dzień dobry, nazywam się ${formData.name}. Interesuję się nieruchomościami na Phuket.`
      : 'Dzień dobry, interesuję się nieruchomościami na Phuket.';
    window.open(getWhatsAppLink(CONTACT_PERSON.phoneE164, message), '_blank');
  };

  if (isSubmitted) {
    return (
      <section id="kontakt" className="py-20 md:py-32 bg-brand-600">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Dziękujemy za zapytanie!
          </h2>
          <p className="text-brand-100 text-lg mb-8">
            Skontaktujemy się z Państwem w ciągu 24 godzin. 
            Dla szybszej odpowiedzi zapraszamy na WhatsApp.
          </p>
          <button onClick={handleWhatsApp} className="btn-whatsapp">
            <MessageCircle className="w-5 h-5" />
            Otwórz WhatsApp
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-20 md:py-32 bg-brand-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="text-brand-200 font-medium text-sm tracking-wide uppercase mb-3 block">
              Kontakt
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Zamów bezpłatną konsultację
            </h2>
            <p className="text-brand-100 text-lg mb-8">
              Otrzymaj indywidualną analizę dopasowanych obiektów w oparciu o 
              Państwa cele i budżet. Bez zobowiązań.
            </p>

            <div className="mb-8">
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 border border-white/20 p-4">
                <img
                  src={CONTACT_PERSON.photoUrl}
                  alt={CONTACT_PERSON.name}
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover border border-white/30"
                />
                <div className="min-w-0">
                  <div className="font-medium text-white truncate">{CONTACT_PERSON.name}</div>
                  <div className="text-brand-100 text-sm">{CONTACT_PERSON.role}</div>
                  <div className="text-brand-100 text-sm">{CONTACT_PERSON.phoneDisplay}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-200" />
                <span className="text-brand-100">Bezpłatna pierwsza konsultacja video</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-200" />
                <span className="text-brand-100">Indywidualne propozycje obiektów</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-200" />
                <span className="text-brand-100">Pełna dokumentacja z góry</span>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="btn-whatsapp text-lg !px-8 !py-4"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp do {CONTACT_PERSON.name}
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Imię i nazwisko *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`input-field ${errors.name ? 'input-error' : ''}`}
                  placeholder="Imię i nazwisko"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Telefon / WhatsApp *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`input-field ${errors.phone ? 'input-error' : ''}`}
                  placeholder="+48 123 456 789"
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  E-mail (opcjonalnie)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input-field"
                  placeholder="email@przyklad.pl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Budżet (opcjonalnie)
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="input-field"
                >
                  <option value="">Proszę wybrać</option>
                  <option value="400-600k">400 000 - 600 000 PLN</option>
                  <option value="600-1m">600 000 - 1 000 000 PLN</option>
                  <option value="1-2m">1 000 000 - 2 000 000 PLN</option>
                  <option value="2m+">Powyżej 2 000 000 PLN</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowQualification(!showQualification)}
                className="text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                {showQualification ? '− Mniej danych' : '+ Dodatkowe informacje (opcjonalnie)'}
              </button>

              {showQualification && (
                <div className="space-y-5 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Cel inwestycji
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => handleInputChange('goal', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Proszę wybrać</option>
                      <option value="RENTAL_INCOME">Dochód z najmu</option>
                      <option value="CAPITAL_GROWTH">Wzrost wartości</option>
                      <option value="PERSONAL_USE">Użytek własny</option>
                      <option value="MIXED">Kombinacja</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Horyzont inwestycyjny
                    </label>
                    <select
                      value={formData.horizon}
                      onChange={(e) => handleInputChange('horizon', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Proszę wybrać</option>
                      <option value="1-3">1-3 lata</option>
                      <option value="3-5">3-5 lat</option>
                      <option value="5-10">5-10 lat</option>
                      <option value="10+">Powyżej 10 lat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Preferowana kategoria
                    </label>
                    <select
                      value={formData.preferredCategory}
                      onChange={(e) => handleInputChange('preferredCategory', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Bez preferencji</option>
                      <option value="READY">Dostępne od zaraz</option>
                      <option value="2026">Oddanie 2026</option>
                      <option value="2027">Oddanie 2027</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rodoConsent}
                    onChange={(e) => handleInputChange('rodoConsent', e.target.checked)}
                    className="mt-1 w-4 h-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-600">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{' '}
                    <a href="/polityka-prywatnosci.html" className="text-brand-600 hover:underline">
                      Polityką Prywatności
                    </a>{' '}
                    (RODO). *
                  </span>
                </label>
                {errors.rodoConsent && (
                  <p className="error-message flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.rodoConsent}
                  </p>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                    className="mt-1 w-4 h-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-600">
                    Chcę otrzymywać informacje o nowych obiektach i aktualnościach rynkowych (opcjonalnie).
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary !py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Wysyłanie...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Zamów konsultację
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
