import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const NewsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-900 text-white py-4 border-b border-slate-800 overflow-hidden">
       <div className="flex items-center">
         <div className="bg-red-600 px-4 py-1 text-xs font-bold uppercase tracking-wider mx-4 rounded animate-pulse whitespace-nowrap">{t('news.label')}</div>
         <div className="whitespace-nowrap overflow-hidden flex-1">
           <div className="inline-block animate-marquee pl-full">
             <span className="mx-4 text-sm font-mono text-slate-300">{t('news.text')}</span>
           </div>
         </div>
       </div>
       <style>{`
         @keyframes marquee {
           0% { transform: translateX(100%); }
           100% { transform: translateX(-100%); }
         }
         .animate-marquee {
           animation: marquee 20s linear infinite;
         }
       `}</style>
    </section>
  );
};

export default NewsSection;
