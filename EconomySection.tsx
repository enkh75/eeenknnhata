import React, { useState, useMemo } from 'react';
import { TableRow } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const EconomySection: React.FC = () => {
  const { t } = useLanguage();

  // Dynamic data generation based on current language
  const data: TableRow[] = [
    { sector: t('economy.table.sectors.finance'), impactScore: 85, description: t('economy.table.sectors.financeDesc'), trend: 'Up' },
    { sector: t('economy.table.sectors.manufacturing'), impactScore: 60, description: t('economy.table.sectors.manufacturingDesc'), trend: 'Stable' },
    { sector: t('economy.table.sectors.retail'), impactScore: 78, description: t('economy.table.sectors.retailDesc'), trend: 'Up' },
    { sector: t('economy.table.sectors.logistics'), impactScore: 88, description: t('economy.table.sectors.logisticsDesc'), trend: 'Up' },
    { sector: t('economy.table.sectors.customerService'), impactScore: 92, description: t('economy.table.sectors.customerServiceDesc'), trend: 'Up' },
  ];

  const [sortConfig, setSortConfig] = useState<{ key: keyof TableRow; direction: 'asc' | 'desc' } | null>(null);

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]); // Depend on 'data' so it updates when lang changes

  const requestSort = (key: keyof TableRow) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <section id="economy" className="py-24 bg-slate-50 relative reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
           <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <h2 className="text-4xl font-black text-slate-900">{t('economy.title')}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* 1. AI Video Avatar */}
          <div className="bg-white rounded-3xl p-2 shadow-xl border border-slate-100">
             <div className="aspect-video bg-black rounded-2xl relative overflow-hidden group">
                <img src="https://picsum.photos/seed/economy/800/450" alt="AI Avatar" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:bg-blue-600/80 transition-all hover:scale-110 group/btn">
                     <svg className="w-8 h-8 text-white ml-1 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 text-white max-w-md">
                   <div className="flex items-center gap-2 mb-2">
                     <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                     <span className="text-xs font-mono uppercase tracking-widest text-red-400">AI Presentation</span>
                   </div>
                   <h3 className="text-2xl font-bold leading-tight">{t('economy.videoTitle')}</h3>
                   <p className="text-sm text-slate-300 mt-2">{t('economy.videoDesc')}</p>
                </div>
             </div>
             
             <div className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                   <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">$15T</div>
                      <div className="text-xs text-slate-500 mt-1 uppercase font-semibold">{t('economy.stats.gdp')}</div>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">85M</div>
                      <div className="text-xs text-slate-500 mt-1 uppercase font-semibold">{t('economy.stats.displaced')}</div>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">97M</div>
                      <div className="text-xs text-slate-500 mt-1 uppercase font-semibold">{t('economy.stats.created')}</div>
                   </div>
                </div>
             </div>
          </div>

          {/* 2. Dynamic Table */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col overflow-hidden">
             <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
               <h3 className="font-bold text-lg text-slate-800">{t('economy.table.title')}</h3>
               <span className="text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded border">{t('economy.table.liveData')}</span>
             </div>
             
             <div className="overflow-x-auto flex-1">
               <table className="w-full text-left">
                 <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                   <tr>
                     <th className="px-6 py-4 cursor-pointer hover:text-blue-600" onClick={() => requestSort('sector')}>
                       {t('economy.table.colSector')} {sortConfig?.key === 'sector' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                     </th>
                     <th className="px-6 py-4 cursor-pointer hover:text-blue-600" onClick={() => requestSort('impactScore')}>
                       {t('economy.table.colImpact')} {sortConfig?.key === 'impactScore' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                     </th>
                     <th className="px-6 py-4">{t('economy.table.colTrend')}</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {sortedData.map((row, idx) => (
                     <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                       <td className="px-6 py-4">
                         <div className="font-semibold text-slate-700">{row.sector}</div>
                         <div className="text-xs text-slate-400">{row.description}</div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-blue-600">{row.impactScore}</span>
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${row.impactScore}%` }}></div>
                            </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                         <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase ${row.trend === 'Up' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                           {row.trend === 'Up' ? '▲ Up' : '– Stable'}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EconomySection;
