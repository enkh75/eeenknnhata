import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-white font-bold text-lg mb-4">{t('footer.conclusionTitle')}</h4>
          <p className="mb-4">
            {t('footer.conclusionText')}
          </p>
          <p className="text-sm">© 2025 AI Student Project.</p>
        </div>
        <div>
           <h4 className="text-white font-bold text-lg mb-4">{t('footer.toolsTitle')}</h4>
           <ul className="grid grid-cols-2 gap-2 text-sm">
             <li className="flex items-center gap-2">✅ React + TypeScript</li>
             <li className="flex items-center gap-2">✅ Tailwind CSS</li>
             <li className="flex items-center gap-2">✅ Gemini API (Agent/Chat)</li>
             <li className="flex items-center gap-2">✅ Google Search Grounding</li>
             <li className="flex items-center gap-2">✅ Gemini Flash Image</li>
             <li className="flex items-center gap-2">✅ Dynamic JS Tables</li>
           </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
