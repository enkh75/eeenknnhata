import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const EducationSection: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const { t } = useLanguage();

  return (
    <section id="education" className="py-24 bg-white reveal">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
              <h2 className="text-4xl font-black text-slate-900">{t('education.title')}</h2>
              <p className="text-slate-500 mt-1">{t('education.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Comparison Slider */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200 select-none group">
            
            {/* Image 2 (Background - AI) */}
            <div className="absolute inset-0 bg-indigo-900">
               <img src="https://picsum.photos/seed/techclass/800/600" alt="AI Classroom" className="w-full h-full object-cover opacity-80" />
               <div className="absolute top-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                 {t('education.slider.ai')}
               </div>
            </div>

            {/* Image 1 (Foreground - Traditional - Clipped) */}
            <div 
              className="absolute inset-0 bg-sepia overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
            >
               <img src="https://picsum.photos/seed/classroom/800/600?grayscale" alt="Traditional Classroom" className="w-full h-full object-cover" />
               <div className="absolute top-6 left-6 bg-slate-800 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                 {t('education.slider.traditional')}
               </div>
            </div>

            {/* Slider Handle */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
            
            {/* Visual Handle Line */}
            <div 
              className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: `${sliderValue}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl text-indigo-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
            </div>

          </div>

          {/* Educational Stats / Content */}
          <div className="space-y-8">
             <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-indigo-200 transition-colors">
               <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <span>🤖</span> {t('education.demo.title')}
               </h3>
               <div className="bg-white rounded-xl p-4 shadow-inner border border-slate-100 mb-4">
                 <div className="flex gap-3 mb-4">
                   <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                   <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600">
                     {t('education.demo.student')}
                   </div>
                 </div>
                 <div className="flex gap-3 flex-row-reverse">
                   <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">AI</div>
                   <div className="bg-indigo-50 p-3 rounded-2xl rounded-tr-none text-sm text-indigo-900">
                     {t('education.demo.aiResponse')}
                     <div className="mt-2 h-20 bg-indigo-100 rounded-lg flex items-center justify-center border border-indigo-200 text-indigo-400 text-xs">
                       {t('education.demo.graph')}
                     </div>
                   </div>
                 </div>
               </div>
               <p className="text-sm text-slate-500">{t('education.demo.desc')}</p>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-indigo-50 rounded-xl text-center">
                 <div className="text-3xl font-black text-indigo-600">40%</div>
                 <div className="text-xs font-bold text-indigo-900 mt-1">{t('education.stats.grading')}</div>
               </div>
               <div className="p-4 bg-purple-50 rounded-xl text-center">
                 <div className="text-3xl font-black text-purple-600">3.5x</div>
                 <div className="text-xs font-bold text-purple-900 mt-1">{t('education.stats.engagement')}</div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EducationSection;
