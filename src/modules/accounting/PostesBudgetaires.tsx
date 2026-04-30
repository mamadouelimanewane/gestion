import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Target, TrendingUp, Database, Layers, ShieldCheck, Zap, MoreVertical, ChevronRight, History, Printer, Download, Share2, ArrowRight, BarChart, Activity, CheckCircle2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PostesBudgetaires = () => {
  const [postes] = useState([
    { id: 1, code: 'BUD-VTE', intitule: 'Objectif Ventes 2024 (Local)', prevu: 50000000, realise: 45823000, ecart: -4177000 },
    { id: 2, code: 'BUD-SAL', intitule: 'Masse Salariale Consolidée', prevu: 15000000, realise: 12000000, ecart: 3000000 },
    { id: 3, code: 'BUD-PUB', intitule: 'Budget Marketing & Digital', prevu: 5000000, realise: 6200000, ecart: -1200000 },
    { id: 4, code: 'BUD-INV', intitule: 'Investissements Matériel IT', prevu: 10000000, realise: 8500000, ecart: 1500000 },
  ]);

  const formatCfa = (val: number) => {
    return val.toLocaleString('fr-FR') + ' F';
  };

  return (
    <div className="flex flex-col h-full gap-10 bg-white p-10 min-h-screen">
      {/* Premium Header - Diamond Azure Elite */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,94,184,0.08)] relative overflow-hidden group border border-blue-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-48 -mt-48 blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="flex items-center gap-10 relative z-10">
           <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0a6ed1] to-blue-600 flex items-center justify-center text-white shadow-[0_15px_30px_rgba(10,110,209,0.3)] group-hover:rotate-6 transition-transform duration-500">
              <Target size={40} strokeWidth={2.5} />
           </div>
           <div>
              <h3 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Postes Budgétaires & Performance</h3>
              <p className="text-[12px] text-[#64748b] font-black uppercase tracking-[0.3em] italic opacity-80 flex items-center gap-3">
                 <ShieldCheck size={16} className="text-[#0a6ed1]" /> Suivi des Engagements • Analyse de Performance • Pilotage Stratégique
              </p>
           </div>
        </div>
        <div className="flex gap-6 relative z-10 mt-8 lg:mt-0">
           <button className="flex items-center gap-4 px-10 py-4 bg-white border border-blue-100 rounded-2xl text-[12px] font-black text-[#64748b] hover:text-[#0a6ed1] hover:border-[#0a6ed1] transition-all shadow-sm h-[60px]">
              <BarChart size={22} /> Rapports G/L
           </button>
           <button className="flex items-center gap-4 px-12 py-4 bg-[#0a6ed1] hover:bg-blue-700 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl h-[60px] group/btn scale-105 active:scale-95">
              <Plus size={24} className="group-hover/btn:rotate-90 transition-transform duration-500" /> Nouveau Poste
           </button>
        </div>
      </div>

      {/* KPI Cards Grid - Diamond Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {postes.map((p) => {
          const ratio = (p.realise / p.prevu) * 100;
          return (
            <motion.div 
              key={p.id} 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(10,110,209,0.08)] hover:border-[#0a6ed1]/30 border border-blue-50 transition-all duration-500 group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0a6ed1]/5 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <span className="px-5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-[#0a6ed1] uppercase tracking-widest shadow-sm">{p.code}</span>
                <div className={`p-4 rounded-xl border transition-all duration-500 group-hover:rotate-12 ${ratio > 100 ? 'bg-red-50 text-[#dc2626] border-red-100' : 'bg-emerald-50 text-[#107e3e] border-emerald-100'}`}>
                   {ratio > 100 ? <TrendingUp size={24} /> : <Activity size={24} />}
                </div>
              </div>
              <h4 className="text-xl font-black text-[#0f172a] uppercase tracking-tighter mb-8 group-hover:text-[#0a6ed1] transition-colors leading-tight">{p.intitule}</h4>
              
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-end">
                   <div className="flex flex-col">
                      <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mb-2 leading-none">Performance</span>
                      <span className={`text-4xl font-black tracking-tighter leading-none ${ratio > 100 ? 'text-[#dc2626]' : 'text-[#107e3e]'}`}>{ratio.toFixed(1)}%</span>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mb-2 leading-none">Réalisé</span>
                      <span className="text-lg font-black text-slate-400 tracking-tighter">{formatCfa(p.realise)}</span>
                   </div>
                </div>
                <div className="w-full bg-blue-50/50 h-5 rounded-full overflow-hidden shadow-inner border border-blue-100 p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(ratio, 100)}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className={`h-full rounded-full shadow-lg ${ratio > 100 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-[#0a6ed1] to-blue-500'}`} 
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Table Container - Ultra High Contrast */}
      <div className="bg-white rounded-[2.5rem] border border-blue-50 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.04)] flex flex-col flex-1 min-h-[600px]">
        <div className="bg-white px-12 py-8 border-b border-blue-50 flex justify-between items-center sticky top-0 z-20 shadow-sm backdrop-blur-md">
           <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 text-[#0a6ed1] rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={24} />
              </div>
              <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#0f172a]">Détail Analytique des Écarts de Gestion</h3>
           </div>
           <div className="flex gap-6">
              <div className="flex items-center gap-4 px-8 py-3 bg-white border border-emerald-100 rounded-2xl shadow-sm bg-emerald-50/30">
                 <div className="w-3 h-3 rounded-full bg-[#107e3e] shadow-sm animate-pulse"></div>
                 <span className="text-[12px] font-black uppercase text-[#107e3e] tracking-widest">Calcul en Temps Réel</span>
              </div>
           </div>
        </div>

        <div className="overflow-auto flex-1 custom-scrollbar">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-white border-b-2 border-blue-50 text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] sticky top-0 z-20 shadow-sm">
              <tr>
                <th className="px-12 py-8">Libellé du Poste Budgétaire</th>
                <th className="px-12 py-8 text-right font-black text-slate-400">Prévu (Objectif)</th>
                <th className="px-12 py-8 text-right font-black text-slate-400">Réalisé (Consommé)</th>
                <th className="px-12 py-8 text-right font-black text-[#0a6ed1]">Écart Relatif (F)</th>
                <th className="px-12 py-8 text-center">Performance Joule AI</th>
                <th className="px-12 py-8 w-20 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50/50">
              {postes.map((p) => (
                <tr key={p.id} className="group hover:bg-blue-50/20 transition-all duration-300 cursor-pointer">
                  <td className="px-12 py-8 border-r border-blue-50/30">
                    <div className="flex flex-col">
                       <span className="text-base font-black text-[#0f172a] uppercase tracking-tight group-hover:text-[#0a6ed1] transition-colors">{p.intitule}</span>
                       <span className="text-[11px] font-mono font-black text-slate-400 tracking-widest mt-2 uppercase flex items-center gap-3">
                          <Database size={14} /> ID : {p.code}
                       </span>
                    </div>
                  </td>
                  <td className="px-12 py-8 text-right border-r border-blue-50/30 font-black text-[#0a6ed1] text-lg tracking-tighter">
                     {formatCfa(p.prevu)}
                  </td>
                  <td className="px-12 py-8 text-right border-r border-blue-50/30 font-black text-[#0f172a] text-lg tracking-tighter">
                     {formatCfa(p.realise)}
                  </td>
                  <td className={`px-12 py-8 text-right border-r border-blue-50/30 font-black text-2xl tracking-tighter transition-colors duration-500 ${
                    p.ecart < 0 ? 'text-[#dc2626] bg-red-50/10' : 'text-[#107e3e] bg-emerald-50/10'
                  }`}>
                    {p.ecart > 0 ? '+' : ''}{formatCfa(p.ecart)}
                  </td>
                  <td className="px-12 py-8 text-center border-r border-blue-50/30">
                    <div className="flex flex-col items-center gap-3">
                       <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${(p.realise / p.prevu) > 1.1 ? 'text-[#dc2626]' : 'text-[#107e3e]'}`}>
                          {((p.realise / p.prevu) * 100).toFixed(0)}%
                       </span>
                       <div className="flex gap-1.5">
                          {[1,2,3,4,5].map(s => (
                             <div key={s} className={`w-5 h-1.5 rounded-full transition-all duration-500 ${s <= Math.round((p.realise / p.prevu) * 5) ? 'bg-[#0a6ed1] shadow-[0_0_10px_rgba(10,110,209,0.3)]' : 'bg-blue-50'}`} />
                          ))}
                       </div>
                    </div>
                  </td>
                  <td className="px-12 py-8 text-right">
                    <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] hover:border-[#0a6ed1] shadow-sm flex items-center justify-center transition-all transform hover:rotate-12"><Edit size={22} /></button>
                      <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0f172a] hover:border-[#0a6ed1] shadow-sm flex items-center justify-center transition-all transform hover:rotate-12"><MoreVertical size={22} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer System Integrity - Diamond Style */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-blue-50 p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] gap-10 mt-auto group/footer overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-1000"></div>
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#107e3e] to-emerald-600 text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 group/shield cursor-pointer">
               <ShieldCheck size={40} className="group-hover/shield:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Pilotage de la Performance Budgétaire (CO Master)</span>
               <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 opacity-70 italic leading-relaxed max-w-4xl">
                  Les données de réalisation sont extraites en temps réel du Journal Universel conformément aux standards **OHADA** et **S/4HANA**.
               </p>
            </div>
         </div>
         <div className="flex gap-14 items-center relative z-10">
            <button className="flex items-center gap-5 text-slate-300 hover:text-[#0a6ed1] text-[12px] font-black uppercase tracking-[0.4em] transition-all group/btn">
               <History size={28} className="group-hover/btn:rotate-[-45deg] transition-transform duration-500" /> Historique Budget
            </button>
            <button className="flex items-center gap-6 text-[#0a6ed1] hover:text-blue-700 text-[12px] font-black uppercase tracking-[0.5em] transition-all group/strat border-l border-blue-50 pl-14 h-12">
               <Printer size={28} className="group-hover:scale-125 transition-transform duration-500" /> Imprimer Rapport
               <ArrowRight size={22} className="opacity-10 group-hover/strat:opacity-100 group-hover/strat:translate-x-3 transition-all duration-500" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default PostesBudgetaires;
