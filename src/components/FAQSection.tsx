import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqItems } from '../context/DataContext';
import { useAnalytics } from '../hooks/useAnalytics';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const { trackEvent } = useAnalytics();

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
      trackEvent('faq_expand', { faqId: id });
    }
    setOpenItems(newOpenItems);
  };

  const categories = [
    { id: 'process', label: 'Proces zakupu' },
    { id: 'legal', label: 'Prawo' },
    { id: 'financial', label: 'Finanse i podatki' },
    { id: 'management', label: 'Zarządzanie' },
    { id: 'general', label: 'Ogólne' },
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-medium text-sm tracking-wide uppercase mb-3 block">
            Często zadawane pytania
          </span>
          <h2 className="section-title mb-6">
            FAQ dla polskich inwestorów
          </h2>
          <p className="section-subtitle mx-auto">
            Odpowiedzi na najważniejsze pytania dotyczące zakupu nieruchomości w Tajlandii.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openItems.has(item.id);
            
            return (
              <div
                key={item.id}
                className={`bg-slate-50 rounded-xl border transition-all ${
                  isOpen ? 'border-brand-200 bg-brand-50/30' : 'border-slate-100'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-start justify-between p-6 text-left"
                >
                  <span className={`font-medium pr-4 ${isOpen ? 'text-brand-700' : 'text-slate-900'}`}>
                    {item.question}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isOpen ? 'bg-brand-100 text-brand-600' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                    <div className="mt-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        item.category === 'process' ? 'bg-blue-100 text-blue-700' :
                        item.category === 'legal' ? 'bg-purple-100 text-purple-700' :
                        item.category === 'financial' ? 'bg-emerald-100 text-emerald-700' :
                        item.category === 'management' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {categories.find(c => c.id === item.category)?.label || item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4">
            Mają Państwo więcej pytań?
          </p>
          <a
            href="#kontakt"
            className="btn-primary"
            onClick={() => {
              document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Zamów indywidualną konsultację
          </a>
        </div>
      </div>
    </section>
  );
}
