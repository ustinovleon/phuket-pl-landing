import { FileText, Video, ClipboardList, Scale, PenTool, Banknote, Key, Settings } from 'lucide-react';
import { processSteps } from '../data/demo-data';

const stepIcons = [Video, ClipboardList, FileText, Scale, PenTool, Banknote, Key, Settings];

export default function ProcessSection() {
  return (
    <section id="proces" className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-brand-600 font-medium text-sm tracking-wide uppercase mb-3 block">
            Przebieg
          </span>
          <h2 className="section-title mb-6">
            Twoja droga do nieruchomości na Phuket
          </h2>
          <p className="section-subtitle">
            Przejrzysty 8-etapowy proces od pierwszej konsultacji do 
            bieżącego zarządzania. Cały proces może odbywać się zdalnie.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />
          
          <div className="space-y-8 lg:space-y-0">
            {processSteps.map((step, index) => {
              const Icon = stepIcons[index] || FileText;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={step.step}
                  className={`relative lg:flex lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`lg:w-1/2 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <div className={`bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 ${isEven ? 'lg:ml-auto' : ''} max-w-xl`}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0 lg:hidden">
                          <Icon className="w-6 h-6 text-brand-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-brand-600 font-mono text-sm font-medium">
                              Krok {step.step}
                            </span>
                          </div>
                          <h3 className="font-display text-xl text-slate-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 mb-3">
                            {step.description}
                          </p>
                          {step.documents && (
                            <div className="flex items-start gap-2 text-sm text-slate-500 bg-slate-50 rounded-lg p-3">
                              <FileText className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Dokumenty:</strong> {step.documents}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-brand-600 items-center justify-center shadow-lg shadow-brand-600/30 z-10">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="lg:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 bg-brand-600 rounded-2xl p-8 text-white">
          <h3 className="font-display text-2xl mb-4">
            Dokumenty przed rezerwacją
          </h3>
          <p className="text-brand-100 mb-6">
            Następujące dokumenty otrzymują Państwo przed każdą decyzją o rezerwacji:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Szczegółowa prezentacja z rzutami',
              'Aktualny cennik dewelopera',
              'Wzór umowy kupna do przeglądu',
              'Profil dewelopera i referencje',
            ].map((doc, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                <FileText className="w-5 h-5 text-brand-200 flex-shrink-0" />
                <span className="text-sm">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
