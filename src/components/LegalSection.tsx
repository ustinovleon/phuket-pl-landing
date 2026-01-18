import { Scale, FileCheck, AlertTriangle, Shield } from 'lucide-react';

const ownershipTypes = [
  {
    type: 'Freehold',
    title: 'Pełna własność',
    description: 'Rzeczywista własność na Państwa nazwisko z dokumentem Chanote. Dostępna tylko dla apartamentów.',
    pros: [
      'Pełne prawo własności jak w Polsce',
      'Nieograniczone prawo dziedziczenia',
      'Brak daty wygaśnięcia prawa własności',
    ],
    cons: [
      'Tylko dla condo (max 49% udziału obcokrajowców w budynku)',
      'Wyższe opłaty transferowe (ok. 6,3%)',
      'Ograniczona dostępność w popularnych projektach',
    ],
    suitableFor: 'Inwestorzy długoterminowi, planujący dziedziczenie, zorientowani na bezpieczeństwo',
  },
  {
    type: 'Leasehold',
    title: 'Dzierżawa długoterminowa',
    description: '30-letnia umowa dzierżawy z opcją przedłużenia (30+30+30 = 90 lat).',
    pros: [
      'Niższa cena zakupu o 5-10%',
      'Niższa opłata transferowa (1,1%)',
      'Dostępna także dla willi i działek',
    ],
    cons: [
      'Przedłużenie jest umowne, nie ustawowe',
      'Teoretyczne ryzyko przy zmianie właściciela projektu',
      'Możliwe trudności z finansowaniem',
    ],
    suitableFor: 'Inwestorzy zorientowani na ROI, średni horyzont (5-10 lat), kupujący wille',
  },
];

export default function LegalSection() {
  return (
    <section id="prawo" className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-brand-600 font-medium text-sm tracking-wide uppercase mb-3 block">
            Ramy prawne
          </span>
          <h2 className="section-title mb-6">
            Formy własności w Tajlandii
          </h2>
          <p className="section-subtitle">
            Przejrzyste przedstawienie opcji prawnych dla zagranicznych nabywców. 
            Zalecana jest profesjonalna obsługa przez niezależnego prawnika.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {ownershipTypes.map((ownership) => (
            <div key={ownership.type} className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                  {ownership.type === 'Freehold' ? (
                    <Shield className="w-6 h-6 text-brand-600" />
                  ) : (
                    <FileCheck className="w-6 h-6 text-brand-600" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-medium text-brand-600">{ownership.type}</span>
                  <h3 className="font-display text-xl text-slate-900">{ownership.title}</h3>
                </div>
              </div>

              <p className="text-slate-600 mb-6">{ownership.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-emerald-700 mb-2">Zalety</h4>
                  <ul className="space-y-2">
                    {ownership.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-emerald-500 mt-1">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-amber-700 mb-2">Do rozważenia</h4>
                  <ul className="space-y-2">
                    {ownership.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-amber-500 mt-1">–</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-sm text-slate-500">
                  <strong>Odpowiednie dla:</strong> {ownership.suitableFor}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-display text-xl text-slate-900 mb-2">
                Ważna uwaga dotycząca Due Diligence
              </h3>
              <p className="text-slate-600">
                Niezależnie od wybranej formy własności stanowczo zalecamy:
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl p-5">
              <Scale className="w-6 h-6 text-brand-600 mb-3" />
              <h4 className="font-medium text-slate-900 mb-2">Niezależna weryfikacja prawna</h4>
              <p className="text-sm text-slate-600">
                Zlećcie Państwo niezależnemu tajlandzkiemu prawnikowi 
                weryfikację wszystkich umów, pozwoleń i wpisów w księdze wieczystej.
                Koszt: ok. 3 500-6 000 PLN*.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <FileCheck className="w-6 h-6 text-brand-600 mb-3" />
              <h4 className="font-medium text-slate-900 mb-2">Weryfikacja dewelopera</h4>
              <p className="text-sm text-slate-600">
                Analiza historii dewelopera: ukończone projekty, 
                opóźnienia budowlane, dowody finansowania, pozwolenia budowlane i pozwolenie EIA.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-100 rounded-xl">
            <p className="text-sm text-slate-600">
              <strong>Wyłączenie odpowiedzialności:</strong> Te informacje służą jedynie ogólnej 
              orientacji i nie zastępują profesjonalnej porady prawnej. Prawo tajlandzkie 
              podlega zmianom. Zawsze należy zasięgnąć indywidualnej porady.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
