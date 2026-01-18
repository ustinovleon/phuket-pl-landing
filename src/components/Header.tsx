import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { scrollToElement, getWhatsAppLink } from '../utils/format';
import { useAnalytics } from '../hooks/useAnalytics';

// Oficjalny przedstawiciel dla Polski (WhatsApp)
const WHATSAPP_NUMBER = '66816794414';

const navItems = [
  { id: 'dlaczego-phuket', label: 'Dlaczego Phuket' },
  { id: 'proces', label: 'Proces' },
  { id: 'obiekty', label: 'Obiekty' },
  { id: 'prawo', label: 'Prawo' },
  { id: 'faq', label: 'FAQ' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToElement(id);
    setIsMobileMenuOpen(false);
    trackEvent('CTA_click', { element: 'nav', target: id });
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { location: 'header' });
    window.open(getWhatsAppLink(WHATSAPP_NUMBER, 'Dzień dobry, interesuję się nieruchomościami na Phuket.'), '_blank');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-display text-xl">P</span>
              </div>
              <span className={`font-display text-xl hidden sm:block ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                Phuket Invest
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-slate-600 hover:text-brand-600' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleWhatsAppClick}
                className="hidden sm:flex btn-whatsapp !py-2 !px-4 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden md:inline">WhatsApp</span>
              </button>
              
              <button
                onClick={() => handleNavClick('kontakt')}
                className={`hidden sm:flex btn-primary !py-2 !px-4 text-sm ${
                  !isScrolled && 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30'
                }`}
              >
                Konsultacja
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg ${
                  isScrolled ? 'text-slate-600' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white border-t border-slate-100 px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex gap-2">
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 btn-whatsapp !py-3"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={() => handleNavClick('kontakt')}
                className="flex-1 btn-primary !py-3"
              >
                Konsultacja
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-slate-200 p-3 flex gap-2">
        <button
          onClick={handleWhatsAppClick}
          className="flex-1 btn-whatsapp !py-3"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </button>
        <button
          onClick={() => scrollToElement('kontakt')}
          className="flex-1 btn-primary !py-3"
        >
          Zamów konsultację
        </button>
      </div>
    </>
  );
}
