import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
         <img src="https://picsum.photos/1920/600?grayscale" alt="AI Background" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-6xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-blue-100 mb-8">
          {t('hero.subtitle')}
        </p>
        <div className="flex justify-center gap-4">
          <a href="#economy" className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition shadow-lg">
            {t('hero.readAnalytics')}
          </a>
          <a href="#medicine" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition">
            {t('hero.launchAgent')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
