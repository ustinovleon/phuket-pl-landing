import { TrendingUp, Sun, Users, BarChart3, Shield, Plane } from 'lucide-react';

const stats = [
  {
    value: '9-10 mln',
    label: 'Turystów 2025',
    description: 'Phuket jako destynacja premium (orientacyjnie)',
  },
  {
    value: '7-10%',
    label: 'Kapitalizacja gruntów rocznie',
    description: 'Historyczny korytarz w lokalizacjach premium',
  },
  {
    value: '6-9%',
    label: 'Prognoza ROI rocznie',
    description: 'po opłatach, przed podatkiem',
  },
  {
    value: '16 500 PLN/m²',
    label: 'Śr. cena condo 2025',
    description: 'Nowe projekty (orientacyjnie)',
  },
];

const arguments_list = [
  {
    icon: TrendingUp,
    title: 'Potencjał wzrostu wartości',
    description: 'Ograniczona ilość gruntów budowlanych w lokalizacjach premium. Historyczna kapitalizacja gruntów w korytarzu 7-10% rocznie (w zależności od lokalizacji i cyklu).',
  },
  {
    icon: Sun,
    title: 'Dywersyfikacja sezonowa',
    description: 'Sezon szczytowy listopad-kwiecień: gdy w Polsce jest zima, Phuket jest w pełni obłożony. Optymalne uzupełnienie europejskich portfeli.',
  },
  {
    icon: Users,
    title: 'Stabilny popyt',
    description: 'Popyt generowany przez turystykę, pobyty długoterminowe i napływ mieszkańców. Podaż w ugruntowanych lokalizacjach jest ograniczona; nowych terenów brakuje.',
  },
  {
    icon: BarChart3,
    title: 'Atrakcyjne stopy zwrotu',
    description: 'Prognozowana rentowność (ROI) 6-9% rocznie (przed opodatkowaniem). Przepływy pieniężne zależą od obłożenia, struktury operatora i kosztów.',
  },
  {
    icon: Shield,
    title: 'Bezpieczeństwo prawne',
    description: 'Struktury: Leasehold (do 90 lat) lub Freehold przez tajlandzką spółkę. Due diligence dla każdego obiektu przed podpisaniem umowy.',
  },
  {
    icon: Plane,
    title: 'Dostępność',
    description: 'Połączenia lotnicze z Warszawy (przez Bangkok lub Dubaj). Międzynarodowe lotnisko Phuket z ponad 15 mln pasażerów rocznie. LOT planuje bezpośrednie loty.',
  },
];

export default function WhyPhuketSection() {
  return (
    <section id="dlaczego-phuket" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-brand-600 font-medium text-sm tracking-wide uppercase mb-3 block">
            Analiza rynku
          </span>
          <h2 className="section-title mb-6">
            Dlaczego Phuket dla polskich inwestorów?
          </h2>
          <p className="section-subtitle">
            Argumenty oparte na faktach dla dywersyfikacji portfela w wiodącej 
            destynacji turystycznej Tajlandii.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
            >
              <div className="font-display text-3xl md:text-4xl text-brand-600 mb-2">
                {stat.value}
              </div>
              <div className="font-medium text-slate-900 mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Arguments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {arguments_list.map((item, index) => (
            <div key={index} className="group">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4 group-hover:bg-brand-600 transition-colors">
                <item.icon className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-xl text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-amber-800 text-sm">
            <strong>Uwaga:</strong> Podane liczby opierają się na historycznych danych rynkowych i 
            publicznie dostępnych źródłach. Przeszłe wyniki nie gwarantują 
            przyszłych rezultatów. Zalecana jest indywidualna analiza i profesjonalne doradztwo.
          </p>
        </div>
      </div>
    </section>
  );
}
