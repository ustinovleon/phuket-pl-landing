import type { Property, FAQItem } from '../types';

// Demo properties for Polish landing page
export const demoProperties: Property[] = [
  {
    id: 'ever-prime-karon',
    statusCategory: '2026',
    projectName: 'Ever Prime',
    area: 'Karon',
    propertyType: 'CONDO',
    unitTypes: [
      {
        name: 'Apartament 1-pokojowy',
        sizeSqmFrom: 32,
        sizeSqmTo: 35,
        priceFromTHB: 3946800,
        priceFromEUR: 109000,
      },
    ],
    sizeSqmFrom: 32,
    sizeSqmTo: 35,
    priceFromTHB: 3946800,
    priceFromEUR: 109000,
    ownership: 'LEASEHOLD',
    completion: '2026-12',
    highlights: [
      'Centrum Karon, spacer do plaży',
      'Supermarket Villa Market w kompleksie',
      'Symulator golfa i korty tenisowe',
      'Pakiet mebli w cenie',
      'Model operatorski z pulą najmu',
    ],
    transparency: {
      camPerSqm: 65,
      sinkingFund: 500,
      transferFee: '1,1% (Leasehold)',
      managementFee: 'Wliczone w pulę najmu',
      notes: 'Pakiet mebli w cenie zakupu',
    },
    operatorModel: 'Profesjonalny operator hotelowy z opcją puli najmu',
    docs: [
      { title: 'Broszura (EN)', url: '#' },
      { title: 'Cennik', url: '#' },
    ],
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    description: 'Ever Prime łączy miejski komfort z atmosferą resortu w sercu Karon.',
    isPublished: true,
    order: 1,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'trees-residence-bangtao',
    statusCategory: '2026',
    projectName: 'The Trees Residence',
    area: 'Bang Tao',
    propertyType: 'CONDO',
    unitTypes: [
      {
        name: 'Apartament 1-pokojowy',
        sizeSqmFrom: 37,
        sizeSqmTo: 42,
        priceFromTHB: 4026240,
        priceFromEUR: 111000,
      },
    ],
    sizeSqmFrom: 37,
    sizeSqmTo: 42,
    priceFromTHB: 4026240,
    priceFromEUR: 111000,
    ownership: 'LEASEHOLD',
    completion: '2027-03',
    highlights: [
      'Lokalizacja premium Bang Tao (sąsiedztwo Laguna)',
      'Ekologiczna koncepcja resortu',
      'Licencja hotelowa',
      'Pakiet mebli, gotowe do zamieszkania',
      'Spokojna lokalizacja na wzgórzu',
    ],
    transparency: {
      camPerSqm: 70,
      sinkingFund: 550,
      transferFee: '1,1% (Leasehold)',
      managementFee: 'Umowa operatorska osobno',
    },
    operatorModel: 'Koncepcja hotelowa z profesjonalnym zarządzaniem',
    docs: [
      { title: 'Broszura (EN)', url: '#' },
      { title: 'Cennik Strefa A', url: '#' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    ],
    description: 'The Trees Residence to eko-resort w najlepszej lokalizacji Phuket.',
    isPublished: true,
    order: 2,
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'demo-ready-rawai',
    statusCategory: 'READY',
    projectName: 'Rawai Beachfront Residences',
    area: 'Rawai',
    propertyType: 'CONDO',
    unitTypes: [
      {
        name: 'Apartament 1-pokojowy',
        sizeSqmFrom: 45,
        sizeSqmTo: 55,
        priceFromTHB: 5500000,
        priceFromEUR: 151000,
      },
    ],
    sizeSqmFrom: 45,
    sizeSqmTo: 55,
    priceFromTHB: 5500000,
    priceFromEUR: 151000,
    ownership: 'FREEHOLD',
    completion: null,
    highlights: [
      'Dostępne od zaraz',
      'Możliwość Freehold',
      'Ugruntowany projekt z historią',
      'Plaża w odległości spacerowej',
      'Historia wynajmu dostępna',
    ],
    transparency: {
      camPerSqm: 60,
      sinkingFund: 400,
      transferFee: '6,3% (Freehold)',
      notes: 'Historia przychodów na zapytanie',
    },
    operatorModel: 'Agencja wynajmu na miejscu',
    docs: [
      { title: 'Prezentacja', url: '#' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    description: 'Ukończony projekt z historią wynajmu. Ideał dla szukających natychmiastowych przychodów.',
    isPublished: true,
    order: 1,
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

// FAQ items in Polish
export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Czy obcokrajowiec może kupić nieruchomość w Tajlandii?',
    answer: 'Tak, pod pewnymi warunkami. Obcokrajowcy mogą posiadać Freehold (pełną własność) apartamentów condo, o ile w budynku max 49% należy do obcokrajowców. Dla willi i działek typowa jest Leasehold (30+30+30 lat) lub zakup przez tajlandzką spółkę.',
    category: 'legal',
  },
  {
    id: 'faq-2',
    question: 'Co to jest Leasehold vs Freehold?',
    answer: 'Freehold: pełna własność na Państwa nazwisko, bez limitu czasowego, możliwa tylko dla condo. Leasehold: dzierżawa na 30 lat z opcją przedłużenia (30+30+30 = 90 lat). Zalety Leasehold: niższa cena (5-10%), dostępna dla willi. Oba warianty są rejestrowalne i zbywalne.',
    category: 'legal',
  },
  {
    id: 'faq-3',
    question: 'Ile kosztuje nieruchomość na Phuket?',
    answer: 'Studio od ok. 400 000 PLN*, apartamenty 1-pokojowe od ok. 450 000-600 000 PLN*, apartamenty 2-pokojowe od ok. 700 000 PLN*. Wille od ok. 1,5-2 mln PLN*. Ceny zależą od lokalizacji, dewelopera i etapu. *Ceny orientacyjne, wiążące w THB.',
    category: 'financial',
  },
  {
    id: 'faq-4',
    question: 'Jakie są koszty przy zakupie?',
    answer: 'Przy Freehold: opłata transferowa ok. 6,3% (często dzielona z deweloperem). Przy Leasehold: rejestracja ok. 1,1%. Dodatkowo: prawnik ok. 3 500-6 000 PLN*, Sinking Fund (jednorazowo, ok. 500 THB/m²). Pełny wykaz kosztów przed rezerwacją.',
    category: 'financial',
  },
  {
    id: 'faq-5',
    question: 'Czy muszę jechać do Tajlandii?',
    answer: 'Nie. Cały proces można przeprowadzić zdalnie. Pełnomocnictwo notarialne umożliwia podpisanie umów przez prawnika. Wielu klientów jednak przyjeżdża na oględziny. Oferujemy wizje lokalne i video-call.',
    category: 'process',
  },
  {
    id: 'faq-6',
    question: 'Jakie podatki płacę w Polsce?',
    answer: 'Dochody z najmu w Tajlandii podlegają opodatkowaniu w Polsce (rezydent podatkowy). Zalecamy konsultację z doradcą podatkowym znającym międzynarodowe opodatkowanie nieruchomości.',
    category: 'financial',
  },
  {
    id: 'faq-7',
    question: 'Jak działa wynajem i zarządzanie?',
    answer: 'Profesjonalni operatorzy przejmują marketing, komunikację z gośćmi, check-in, sprzątanie i konserwację. Portal online z rezerwacjami i rozliczeniami. Wypłaty kwartalne. Typowa prowizja: 15-30% przychodów.',
    category: 'management',
  },
  {
    id: 'faq-8',
    question: 'Jakie są koszty bieżące?',
    answer: 'CAM: ok. 6-9 PLN/m²/miesiąc. Sinking Fund: ok. 50-70 PLN/m² jednorazowo. Prąd/woda wg zużycia lub ryczałt. Ubezpieczenie: ok. 350-900 PLN/rok. Przy wynajmie koszty często z przychodów.',
    category: 'financial',
  },
  {
    id: 'faq-9',
    question: 'Czy mogę sam korzystać z nieruchomości?',
    answer: 'Tak, umowy operatorskie pozwalają na 2-8 tygodni własnego użytku rocznie. Poza pulą najmu - swobodne dysponowanie. Przy dłuższych pobytach rozważcie wizę (Thailand Elite, emerytalna).',
    category: 'general',
  },
  {
    id: 'faq-10',
    question: 'Jak później sprzedać?',
    answer: 'Odsprzedaż możliwa w każdej chwili, również obcokrajowcom. Rynek Phuket jest płynny z rosnącym popytem. Wspieramy przy odsprzedaży. Podatek od zysków w Tajlandii: progresywny do 35%.',
    category: 'process',
  },
  {
    id: 'faq-11',
    question: 'Jakie dokumenty będą potrzebne?',
    answer: 'Do rezerwacji: kopia paszportu. Do umowy: paszport (poświadczony notarialnie do pełnomocnictwa). Do Freehold: FET Form (potwierdzenie przelewu). Zalecamy weryfikację przez prawnika.',
    category: 'process',
  },
  {
    id: 'faq-12',
    question: 'Jakie jest ryzyko kursowe?',
    answer: 'Ceny i przychody w THB. Kurs PLN/THB może się wahać. Rozwiązania: konto THB, rozłożenie płatności, zabezpieczenie kursowe przy większych kwotach.',
    category: 'financial',
  },
  {
    id: 'faq-13',
    question: 'Czy potrzebuję prawnika?',
    answer: 'Zalecamy niezależnego prawnika tajlandzkiego (koszt: ok. 3 500-6 000 PLN*). Weryfikuje pozwolenia, księgę wieczystą, dewelopera i reprezentuje przy przeniesieniu własności.',
    category: 'legal',
  },
  {
    id: 'faq-14',
    question: 'Jakich stóp zwrotu mogę oczekiwać?',
    answer: 'Prognozowany ROI: 6-9% rocznie (przed podatkiem, po prowizji operatora). Kapitalizacja gruntów: 7-10% rocznie historycznie. To wartości orientacyjne - przygotujemy indywidualną kalkulację.',
    category: 'financial',
  },
];

// Category arguments for Polish audience
export const categoryArguments = {
  READY: {
    title: 'Dostępne od zaraz',
    arguments: [
      'Brak ryzyka budowlanego: oględziny gotowej nieruchomości',
      'Natychmiastowe przychody z najmu',
      'Weryfikowalna historia wynajmu',
      'Krótszy horyzont inwestycyjny możliwy',
      'Przejrzysta struktura kosztów',
    ],
    objections: [
      {
        objection: 'Wyższa cena niż off-plan',
        answer: 'Tak, ale bez ryzyka budowlanego i z natychmiastowymi przychodami.',
      },
      {
        objection: 'Mniejszy wybór lokali',
        answer: 'Lokale premium często dostępne na rynku wtórnym.',
      },
    ],
    suitableFor: [
      'Inwestorzy z horyzontem 3-5 lat',
      'Wykluczający ryzyko budowlane',
      'Priorytetyzujący natychmiastowe przychody',
    ],
  },
  '2026': {
    title: 'Oddanie 2026',
    arguments: [
      'Niższe ceny wejścia (ceny startowe)',
      'Elastyczny plan płatności bez kredytu',
      'Możliwość zabezpieczenia najlepszych lokali',
      'Wzrost wartości do oddania',
      'Pakiet mebli często w cenie',
    ],
    objections: [
      {
        objection: 'Możliwe opóźnienia',
        answer: 'U uznanych deweloperów rzadkie. Weryfikujemy historię.',
      },
      {
        objection: 'Kapitał zamrożony',
        answer: 'Plan płatności (np. 30/30/40) zmniejsza zamrożenie.',
      },
    ],
    suitableFor: [
      'Inwestorzy z horyzontem 5-7 lat',
      'Szukający niższych cen wejścia',
      'Chcący inwestować ratalnie',
    ],
  },
  '2027': {
    title: 'Oddanie 2027',
    arguments: [
      'Najniższe ceny przy early-bird',
      'Maksymalna elastyczność płatności',
      'Najdłuższa faza wzrostu wartości',
      'Innowacyjne koncepcje i lokalizacje',
      'Unikanie późniejszych podwyżek',
    ],
    objections: [
      {
        objection: 'Długie zamrożenie kapitału',
        answer: 'Płatności ratalne minimalizują. Możliwa odsprzedaż przed oddaniem.',
      },
      {
        objection: 'Wyższe ryzyko dewelopera',
        answer: 'Dlatego tylko deweloperzy z potwierdzoną historią.',
      },
    ],
    suitableFor: [
      'Inwestorzy długoterminowi (7+ lat)',
      'Szukający maksymalnych rabatów early-bird',
      'Budujący kapitał stopniowo',
    ],
  },
};

// Process steps in Polish
export const processSteps = [
  {
    step: 1,
    title: 'Pierwsza rozmowa',
    description: 'Bezpłatna konsultacja o Państwa celach, budżecie i ramach czasowych. Video-call lub rozmowa telefoniczna.',
    documents: null,
  },
  {
    step: 2,
    title: 'Wybór obiektu',
    description: 'Dopasowane obiekty na podstawie Państwa kryteriów. Prezentacje, rzuty, kalkulacje.',
    documents: 'Prezentacja, cennik, model finansowy',
  },
  {
    step: 3,
    title: 'Rezerwacja',
    description: 'Umowa rezerwacyjna i zaliczka (typowo 6 000-12 000 PLN*) zabezpieczają Państwa obiekt.',
    documents: 'Umowa rezerwacyjna, kopia paszportu',
  },
  {
    step: 4,
    title: 'Due Diligence',
    description: 'Weryfikacja prawna: pozwolenia budowlane, deweloper, księga wieczysta, warunki umowy.',
    documents: 'Raport prawnika, pozwolenie budowlane, Chanote/księga',
  },
  {
    step: 5,
    title: 'Umowa kupna',
    description: 'Podpisanie umowy kupna. Przy zakupie zdalnym: pełnomocnictwo notarialne.',
    documents: 'Umowa kupna (SPA), pełnomocnictwo (jeśli zdalnie)',
  },
  {
    step: 6,
    title: 'Płatności',
    description: 'Płatności ratalne wg umowy. Przelew SWIFT z właściwym opisem.',
    documents: 'Harmonogram płatności, formularz FET (przy Freehold)',
  },
  {
    step: 7,
    title: 'Przekazanie',
    description: 'Odbiór, lista usterek, przeniesienie własności w Land Office.',
    documents: 'Protokół odbioru, Chanote/Lease, klucze',
  },
  {
    step: 8,
    title: 'Zarządzanie',
    description: 'Uruchomienie umowy operatorskiej, przekazanie do zarządzania, dostęp do portalu raportowego.',
    documents: 'Umowa operatorska, dane do portalu',
  },
];

// Trust bar items
export const trustBarItems = [
  { icon: 'FileText', label: 'Pełna dokumentacja' },
  { icon: 'Calculator', label: 'Przejrzyste koszty' },
  { icon: 'Building2', label: 'Sprawdzeni operatorzy' },
  { icon: 'Globe', label: 'Zakup zdalny' },
];
