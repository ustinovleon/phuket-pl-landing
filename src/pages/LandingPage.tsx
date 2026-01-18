import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import WhyPhuketSection from '../components/WhyPhuketSection';
import ProcessSection from '../components/ProcessSection';
import PropertiesSection from '../components/PropertiesSection';
import CalculatorSection from '../components/CalculatorSection';
import LegalSection from '../components/LegalSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <WhyPhuketSection />
        <ProcessSection />
        <PropertiesSection />
        <CalculatorSection />
        <LegalSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
