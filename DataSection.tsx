import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DataSection: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'donut'>('bar');
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const { t } = useLanguage();

  const data = [
    { name: 'US', value: 40, color: '#3B82F6' },
    { name: 'China', value: 35, color: '#EF4444' },
    { name: 'EU', value: 15, color: '#10B981' },
    { name: 'Other', value: 10, color: '#F59E0B' },
  ];

  const metrics = [
    { label: t('data.marketVal'), value: '$407B', change: '+18%', positive: true },
    { label: t('data.CAGR'), value: '37.3%', change: '+2.1%', positive: true },
    { label: t('data.adoption'), value: '72%', change: '+15%', positive: true },
    { label: t('data.efficiency'), value: '40%', change: 'Optimization', positive: true },
  ];

  return (
    <section id="data" className="py-24 bg-slate-50 reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
           <h2 className="text-4xl font-black text-slate-900 mb-2">{t('data.title')}</h2>
           <p className="text-slate-500">{t('data.subtitle')}</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
           
           {/* Main Chart Card */}
           <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-bold text-xl text-slate-800">Global Market Share</h3>
                 <div className="bg-slate-100 p-1 rounded-lg flex">
                   <button onClick={() => setChartType('bar')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${chartType === 'bar' ? 'bg-white shadow text-blue-600' : 'text-slate-400'}`}>{t('data.barChart')}</button>
                   <button onClick={() => setChartType('donut')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${chartType === 'donut' ? 'bg-white shadow text-blue-600' : 'text-slate-400'}`}>{t('data.donutChart')}</button>
                 </div>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[300px]">
                 {chartType === 'bar' ? (
                   <div className="flex items-end gap-6 sm:gap-12 h-64 w-full px-4 border-b border-slate-200">
                     {data.map((item, i) => (
                       <div key={i} className="flex-1 flex flex-col items-center group relative">
                         {/* Tooltip */}
                         <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1 px-2 rounded pointer-events-none mb-2">
                           {item.value}%
                         </div>
                         <div 
                           className="w-full max-w-[60px] rounded-t-lg transition-all duration-1000 group-hover:opacity-90 relative overflow-hidden" 
                           style={{ height: `${item.value * 2}%`, backgroundColor: item.color }}
                         >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </div>
                         <div className="mt-4 font-bold text-slate-600">{item.name}</div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="relative w-64 h-64 flex items-center justify-center">
                      <svg viewBox="-1 -1 2 2" className="w-full h-full rotate-[-90deg]">
                         {(() => {
                           let accumulated = 0;
                           return data.map((item, i) => {
                             const start = accumulated;
                             accumulated += item.value / 100;
                             const end = accumulated;
                             
                             const x1 = Math.cos(2 * Math.PI * start);
                             const y1 = Math.sin(2 * Math.PI * start);
                             const x2 = Math.cos(2 * Math.PI * end);
                             const y2 = Math.sin(2 * Math.PI * end);
                             
                             const largeArc = item.value > 50 ? 1 : 0;
                             
                             const pathData = `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`;
                             
                             return (
                               <path
                                 key={i}
                                 d={pathData}
                                 fill={item.color}
                                 stroke="white"
                                 strokeWidth="0.02"
                                 className="cursor-pointer transition-all duration-300 hover:scale-105 origin-center"
                                 onMouseEnter={() => setHoveredSegment(`${item.name}: ${item.value}%`)}
                                 onMouseLeave={() => setHoveredSegment(null)}
                               />
                             );
                           });
                         })()}
                         
                         {/* Donut Hole */}
                         <circle cx="0" cy="0" r="0.6" fill="white" />
                      </svg>
                      
                      {/* Center Text */}
                      <div className="absolute text-center pointer-events-none">
                         <div className="text-2xl font-black text-slate-800">
                           {hoveredSegment ? hoveredSegment.split(':')[1] : '100%'}
                         </div>
                         <div className="text-xs font-bold text-slate-400 uppercase">
                           {hoveredSegment ? hoveredSegment.split(':')[0] : 'Total'}
                         </div>
                      </div>
                   </div>
                 )}
              </div>
              
              {/* Legend */}
              <div className="flex justify-center gap-6 mt-8">
                  {data.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-bold text-slate-600">{item.name}</span>
                    </div>
                  ))}
              </div>
           </div>

           {/* Metrics Column */}
           <div className="space-y-6">
              <h3 className="font-bold text-xl text-slate-800 mb-2">{t('data.keyMetrics')}</h3>
              {metrics.map((metric, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:border-blue-200 transition-colors group">
                   <div className="text-sm text-slate-500 font-medium mb-1">{metric.label}</div>
                   <div className="flex items-end justify-between">
                      <div className="text-3xl font-black text-slate-800">{metric.value}</div>
                      <div className={`text-sm font-bold px-2 py-1 rounded bg-green-50 text-green-600`}>
                        {metric.change}
                      </div>
                   </div>
                </div>
              ))}
           </div>

        </div>

        {/* Historical Timeline */}
        <div className="mt-16">
           <h3 className="font-bold text-xl text-slate-800 mb-8 text-center">{t('data.timeline')}</h3>
           <div className="relative">
              {/* Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 {[
                   { year: '1950', title: 'Turing Test', desc: 'Alan Turing proposes the question: Can machines think?' },
                   { year: '1997', title: 'Deep Blue', desc: 'IBM\'s AI defeats chess champion Garry Kasparov.' },
                   { year: '2022', title: 'Generative AI', desc: 'ChatGPT & Midjourney revolutionize content creation.' },
                   { year: '2030', title: 'AGI?', desc: 'Predicted arrival of Artificial General Intelligence.' }
                 ].map((event, i) => (
                   <div key={i} className="relative z-10 bg-white p-6 rounded-xl shadow-md border border-slate-100 text-center group hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-12 h-12 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4 shadow-lg ring-4 ring-white">
                        {event.year}
                      </div>
                      <h4 className="font-bold text-lg text-slate-800">{event.title}</h4>
                      <p className="text-sm text-slate-500 mt-2">{event.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default DataSection;
