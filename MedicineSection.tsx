import React, { useState, useEffect } from 'react';
import { fetchAINews } from '../services/gemini';
import { NewsItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const MedicineSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [sources, setSources] = useState<NewsItem[]>([]);

  // Update default query when language changes, only if user hasn't typed something else
  useEffect(() => {
    setQuery(t('medicine.agent.defaultQuery'));
  }, [language, t]);

  const handleResearch = async () => {
    setLoading(true);
    try {
      const data = await fetchAINews(query);
      setResult(data.text);
      setSources(data.sources);
    } catch (e) {
      setResult("Error fetching medical data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="medicine" className="py-24 bg-teal-900 text-white relative overflow-hidden reveal">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left: Info */}
          <div className="md:w-1/3 space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-500 rounded-xl text-white shadow-lg">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h2 className="text-3xl font-black">{t('medicine.title')}</h2>
            </div>
            <p className="text-teal-100 leading-relaxed">
              {t('medicine.desc')}
            </p>
            
            <div className="space-y-4">
               <div className="bg-teal-800/50 p-4 rounded-xl border border-teal-700">
                 <h4 className="font-bold text-teal-300 mb-1">{t('medicine.diagnostics')}</h4>
                 <p className="text-sm text-teal-200">{t('medicine.diagnosticsDesc')}</p>
               </div>
               <div className="bg-teal-800/50 p-4 rounded-xl border border-teal-700">
                 <h4 className="font-bold text-teal-300 mb-1">{t('medicine.genomics')}</h4>
                 <p className="text-sm text-teal-200">{t('medicine.genomicsDesc')}</p>
               </div>
            </div>
          </div>

          {/* Right: AI Agent */}
          <div className="md:w-2/3">
             <div className="bg-teal-950/50 backdrop-blur-xl border border-teal-700/50 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-bold text-xl flex items-center gap-2">
                     <span className="relative flex h-3 w-3">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                     </span>
                     {t('medicine.agent.title')}
                   </h3>
                   <span className="text-xs bg-teal-900 px-2 py-1 rounded text-teal-400 border border-teal-700">{t('medicine.agent.liveSearch')}</span>
                </div>

                <div className="flex gap-2 mb-6">
                   <input 
                     type="text" 
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     className="flex-1 bg-teal-900/50 border border-teal-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-400 transition-colors placeholder-teal-600"
                     placeholder={t('medicine.agent.placeholder')}
                   />
                   <button 
                     onClick={handleResearch}
                     disabled={loading}
                     className="bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                   >
                     {loading ? t('medicine.agent.scanning') : t('medicine.agent.button')}
                   </button>
                </div>

                <div className="bg-black/20 rounded-xl p-6 min-h-[300px] border border-white/5 overflow-y-auto max-h-[400px]">
                   {loading && (
                      <div className="flex flex-col items-center justify-center h-full space-y-4">
                         <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-teal-400 animate-pulse text-sm">{t('medicine.agent.loading')}</p>
                      </div>
                   )}
                   
                   {!loading && result && (
                      <div className="animate-fade-in">
                         <div className="prose prose-invert prose-sm max-w-none prose-p:text-teal-100 prose-headings:text-teal-300">
                            {result.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                         </div>
                         <div className="mt-6 grid gap-2">
                            {sources.map((src, i) => (
                               <a key={i} href={src.uri} target="_blank" className="text-xs text-teal-400 hover:text-white truncate block p-2 bg-teal-900/30 rounded border border-transparent hover:border-teal-700 transition-all">
                                 🔗 {src.title}
                               </a>
                            ))}
                         </div>
                      </div>
                   )}
                   
                   {!loading && !result && (
                     <div className="text-center text-teal-500/50 h-full flex items-center justify-center">
                       {t('medicine.agent.noData')}
                     </div>
                   )}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MedicineSection;
