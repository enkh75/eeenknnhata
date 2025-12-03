import React, { useState } from 'react';
import { generateAIImage } from '../services/gemini';
import { useLanguage } from '../contexts/LanguageContext';

const GallerySection: React.FC = () => {
  const [prompt, setPrompt] = useState('A futuristic smart city with robots helping humans, cyberpunk style');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useLanguage();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const base64Image = await generateAIImage(prompt);
      setGeneratedImage(base64Image);
    } catch (error) {
      alert("Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="media" className="py-24 bg-white reveal">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">{t('gallery.title')}</h2>
          <p className="text-slate-500">{t('gallery.subtitle')}</p>
        </div>
        
        <div className="bg-slate-50 rounded-3xl p-8 shadow-xl border border-slate-200">
            <div className="flex flex-col md:flex-row gap-8">
               <div className="w-full md:w-1/2 space-y-4">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t('gallery.label')}</label>
                  <textarea 
                    className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none h-40 resize-none shadow-sm placeholder-slate-400"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t('gallery.placeholder')}
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50"
                  >
                    {isGenerating ? t('gallery.buttonGenerating') : t('gallery.button')}
                  </button>
               </div>
               
               <div className="w-full md:w-1/2">
                  <div className="aspect-square bg-white rounded-2xl border border-slate-200 overflow-hidden relative shadow-inner flex items-center justify-center">
                    {generatedImage ? (
                      <img src={generatedImage} alt="AI Generated" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-slate-400 p-8">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <p>{t('gallery.preview')}</p>
                      </div>
                    )}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
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

export default GallerySection;
