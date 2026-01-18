import { useState } from 'react';
import type { Property, StatusCategory } from '../types';
import { useData } from '../context/DataContext';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';
import { categoryArguments } from '../data/demo-data';
import { useAnalytics } from '../hooks/useAnalytics';
import { Check, AlertCircle, HelpCircle } from 'lucide-react';

const tabs: { id: StatusCategory; label: string; shortLabel: string }[] = [
  { id: 'READY', label: 'Dostępne od zaraz', shortLabel: 'Dostępne' },
  { id: '2026', label: 'Oddanie 2026', shortLabel: '2026' },
  { id: '2027', label: 'Oddanie 2027', shortLabel: '2027' },
];

export default function PropertiesSection() {
  const { propertiesByCategory, isLoading } = useData();
  const [activeTab, setActiveTab] = useState<StatusCategory>('2026');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { trackEvent } = useAnalytics();

  const handleTabChange = (tab: StatusCategory) => {
    trackEvent('tab_switch', { from: activeTab, to: tab });
    setActiveTab(tab);
  };

  const currentProperties = propertiesByCategory[activeTab];
  const currentArguments = categoryArguments[activeTab];

  if (isLoading) {
    return (
      <section id="obiekty" className="py-12 sm:py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-2/3 sm:w-1/3" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 sm:h-96 bg-slate-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="obiekty" className="py-12 sm:py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="text-brand-600 font-medium text-xs sm:text-sm tracking-wide uppercase mb-2 sm:mb-3 block">
            Katalog obiektów
          </span>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
            Wybrane projekty dla polskich inwestorów
          </h2>
          <p className="section-subtitle text-base sm:text-lg md:text-xl">
            Sprawdzone obiekty z przejrzystą strukturą kosztów. 
            Posortowane według dostępności i terminu oddania.
          </p>
        </div>

        {/* Tabs - scrollable on mobile */}
        <div className="mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl overflow-x-auto sm:overflow-visible sm:inline-flex scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span className={`ml-2 text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? 'bg-brand-100 text-brand-700'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {propertiesByCategory[tab.id].length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Arguments - collapsible cards on mobile */}
        {currentArguments && (
          <div className="mb-8 sm:mb-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Zalety */}
            <div className="bg-brand-50 rounded-xl p-4 sm:p-6 border border-brand-100">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600" />
                </div>
                <h3 className="font-display text-base sm:text-lg text-slate-900">Zalety</h3>
              </div>
              <ul className="space-y-2">
                {currentArguments.arguments.slice(0, 4).map((arg, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-brand-500 mt-0.5 flex-shrink-0">•</span>
                    <span>{arg}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Częste obawy */}
            <div className="bg-amber-50 rounded-xl p-4 sm:p-6 border border-amber-100">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                </div>
                <h3 className="font-display text-base sm:text-lg text-slate-900">Częste obawy</h3>
              </div>
              <ul className="space-y-3">
                {currentArguments.objections.slice(0, 2).map((obj, i) => (
                  <li key={i} className="text-sm">
                    <div className="font-medium text-slate-700 mb-1">{obj.objection}</div>
                    <div className="text-slate-500 leading-relaxed">{obj.answer}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Odpowiednie dla */}
            <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                </div>
                <h3 className="font-display text-base sm:text-lg text-slate-900">Odpowiednie dla</h3>
              </div>
              <ul className="space-y-2 sm:grid sm:grid-cols-2 lg:block sm:gap-2 lg:space-y-2">
                {currentArguments.suitableFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Property Grid */}
        {currentProperties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={setSelectedProperty}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-slate-50 rounded-2xl">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 mb-2 font-medium">
              Brak dostępnych obiektów
            </p>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Aktualnie brak obiektów w tej kategorii. Skontaktuj się z nami po aktualne oferty.
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-500">
          <strong>Uwaga:</strong> Wyświetlane ceny są orientacyjne i mogą różnić się w zależności od 
          lokalu, piętra i aktualnej dostępności. Wiążące ceny otrzymają Państwo na zapytanie.
        </div>
      </div>

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </section>
  );
}
