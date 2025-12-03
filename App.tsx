import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import EconomySection from './components/EconomySection';
import EducationSection from './components/EducationSection';
import MedicineSection from './components/MedicineSection';
import NewsSection from './components/NewsSection';
import DataSection from './components/DataSection';
import GallerySection from './components/GallerySection';
import ChatBot from './components/ChatBot';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';
import Footer from './components/Footer';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Language } from './types';

const AppContent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.economy'), href: '#economy' },
    { name: t('nav.education'), href: '#education' },
    { name: t('nav.medicine'), href: '#medicine' },
    { name: t('nav.data'), href: '#data' },
    { name: t('nav.gallery'), href: '#media' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'kk', label: 'KZ' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md h-16' : 'bg-transparent h-20'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <div className={`font-black text-xl flex items-center gap-2 tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            <span className="bg-indigo-600 text-white px-2 py-1 rounded shadow-lg">AI</span> 
            <span style={{ fontFamily: 'Orbitron, sans-serif' }}>IMPACT</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className={`transition-colors hover:text-indigo-500 ${isScrolled ? 'text-slate-600' : 'text-indigo-100 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full p-1 border border-white/10">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    language === lang.code 
                      ? 'bg-white text-indigo-900 shadow-sm' 
                      : isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className={`w-6 h-6 ${isScrolled ? 'text-slate-800' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
           <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-xl border-t border-slate-100 p-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-bold px-4 py-2 hover:bg-slate-50 rounded-lg">
                  {link.name}
                </a>
              ))}
              <div className="flex gap-2 px-4 py-2 border-t border-slate-100 mt-2 pt-4">
                 {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold border ${language === lang.code ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`}
                    >
                      {lang.label}
                    </button>
                 ))}
              </div>
           </div>
        )}
      </nav>

      {/* Main Content Layout */}
      <main className="flex-grow">
        <Hero /> {/* Home: Hero + Stats */}
        <EconomySection /> {/* Economy: Video + Info + Table */}
        <EducationSection /> {/* Education: Slider + Demo */}
        <MedicineSection /> {/* Medicine: Agent + Schema */}
        <NewsSection /> {/* News: Live Updates Ticker */}
        <DataSection /> {/* Data: Charts + Timeline */}
        <GallerySection /> {/* Content: Image Gen */}
      </main>

      {/* Floating Elements */}
      <ChatBot />
      <GlobalAudioPlayer />

      <Footer />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
