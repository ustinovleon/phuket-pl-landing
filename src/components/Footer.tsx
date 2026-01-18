import { MessageCircle, Mail, MapPin, AlertTriangle } from 'lucide-react';

// Oficjalny przedstawiciel dla Polski (WhatsApp)
const WHATSAPP_NUMBER = '66816794414';
const WHATSAPP_DISPLAY = '+66 81 679 4414';
const OFFICE_ADDRESS = 'Royal Phuket Marina, Building MS2, Ko Kaeo, Mueang, Phuket 83000';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pb-24 lg:pb-0">
      {/* Risk Disclaimer */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-300">
              <strong className="text-white">Ostrzeżenie o ryzyku:</strong> Inwestycje w nieruchomości 
              wiążą się z ryzykiem, w tym możliwością utraty zainwestowanego 
              kapitału. Przedstawione informacje nie stanowią porady inwestycyjnej i 
              nie uwzględniają Państwa osobistej sytuacji. Historyczne wyniki 
              nie gwarantują przyszłych rezultatów. Wahania kursów walut mogą wpływać na 
              wartość inwestycji. Zalecamy zasięgnięcie profesjonalnej porady prawnej i podatkowej 
              przed podjęciem decyzji inwestycyjnej.
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-display text-xl">P</span>
              </div>
              <span className="font-display text-xl">Phuket Invest</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Doradztwo w zakresie nieruchomości dla polskich inwestorów w Tajlandii. 
              Przejrzyste procesy, sprawdzone obiekty.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@phuketinvest.pro"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-white mb-4">Nawigacja</h4>
            <ul className="space-y-2">
              <li>
                <a href="#dlaczego-phuket" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Dlaczego Phuket
                </a>
              </li>
              <li>
                <a href="#proces" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Proces zakupu
                </a>
              </li>
              <li>
                <a href="#obiekty" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Obiekty
                </a>
              </li>
              <li>
                <a href="#prawo" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Prawo
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-white text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-white mb-4">Informacje prawne</h4>
            <ul className="space-y-2">
              <li>
                <a href="/o-nas.html" className="text-slate-400 hover:text-white text-sm transition-colors">
                  O nas
                </a>
              </li>
              <li>
                <a href="/polityka-prywatnosci.html" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Polityka Prywatności
                </a>
              </li>
              <li>
                <a href="/polityka-cookies.html" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Polityka Cookies
                </a>
              </li>
              <li>
                <a href="/regulamin.html" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Regulamin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{WHATSAPP_DISPLAY}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@phuketinvest.pro</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {OFFICE_ADDRESS}<br />
                  (Spotkania na miejscu po umówieniu)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} Phuket Invest. Wszelkie prawa zastrzeżone.
            </p>
            <p className="text-slate-500 text-xs text-center md:text-right">
              Ta oferta nie jest ofertą publiczną. Wszystkie informacje, w tym prognozy rentowności i ceny, służą wyłącznie celom informacyjnym i mogą ulec zmianie. Kalkulacje ROI są prognozami i zależą od sytuacji rynkowej. Ceny w PLN podane orientacyjnie wg kursu z 01.01.2026. Własność nieruchomości przez obcokrajowców podlega prawu tajlandzkiemu (Leasehold/Company Freehold).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
