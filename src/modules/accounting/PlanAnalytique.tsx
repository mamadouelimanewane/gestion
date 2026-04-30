import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, PieChart, Landmark, ArrowRight, Filter, ChevronRight, MoreVertical, Briefcase, Info, Database, Layers, ShieldCheck, Zap, Printer, Download, Share2, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PlanAnalytique = () => {
  const [sections] = useState([
    { code: 'ADM-GEN', intitule: 'ADMINISTRATION GÉNÉRALE & SIÈGE', type: 'Section Commune', cumul: 4500000, trend: '+2.4%' },
    { code: 'COM-VTE', intitule: 'FORCE COMMERCIALE & VENTES DIRECTES', type: 'Centre de Profit', cumul: 12800000, trend: '+15.8%' },
    { code: 'LOG-TRA', intitule: 'LOGISTIQUE, TRANSPORT & STOCKAGE', type: 'Centre de Coût', cumul: 3200000, trend: '-4.1%' },
    { code: 'PROD-ATL', intitule: 'PRODUCTION INDUSTRIELLE / ATELIER', type: 'Centre de Coût', cumul: 15600000, trend: '+0.5%' },
    { code: 'SAV-SLA', intitule: 'SERVICE APRÈS-VENTE & MAINTENANCE', type: 'Centre de Profit', cumul: 1450000, trend: '+8.2%' },
  ]);

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
              <PieChart size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Architecture du Plan Analytique</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Centres de Coûts & Profits • Sections Auxiliaires • OHADA v2024</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <div className="relative group w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Chercher section ou code..." 
                className="pl-12 pr-6 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#334155] placeholder:text-[#94a3b8] uppercase tracking-tight outline-none focus:border-indigo-600 focus:bg-white transition-all w-full shadow-inner"
              />
           </div>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <Plus size={20} /> Nouvelle Section
           </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[500px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100 shadow-inner">
                 <Layers size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Référentiel des Centres de Responsabilité</h3>
           </div>
           <div className="flex gap-6">
              <div className="flex items-center gap-3 px-6 py-2 bg-white border border-[#cbd5e1] rounded-xl shadow-sm">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#107e3e] shadow-sm animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase text-[#107e3e] tracking-widest">Calcul Analytique Actif</span>
              </div>
              <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#005eb8] shadow-sm transition-all">
                 <Printer size={18} />
              </button>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-6 w-40">Code Analytique</th>
                <th className="px-10 py-6">Désignation du Centre</th>
                <th className="px-10 py-6 text-center">Nature Économique</th>
                <th className="px-10 py-6 text-right">Cumul Période (F)</th>
                <th className="px-10 py-6 text-center">Tendance</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {sections.map((s, idx) => (
                <tr key={idx} className="group hover:bg-indigo-50/20 transition-all cursor-pointer">
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                     <span className="font-mono font-black text-lg text-indigo-600 tracking-tighter group-hover:scale-110 transition-transform origin-left block">{s.code}</span>
                  </td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                     <div className="flex flex-col">
                        <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover:text-[#0f172a] transition-colors">{s.intitule}</span>
                        <span className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1 opacity-60 italic">Imputation directe en classe 9 / analytique</span>
                     </div>
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                    <span className="px-4 py-1.5 rounded-[2rem] bg-[#f8fafc] border border-[#cbd5e1] text-[9px] font-black text-[#64748b] uppercase tracking-widest group-hover:bg-white group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                      {s.type}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-[#107e3e] text-base tracking-tighter">
                     {s.cumul.toLocaleString()} <span className="text-[10px] opacity-40">F</span>
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                     <span className={`text-[10px] font-black uppercase tracking-widest ${s.trend.startsWith('+') ? 'text-[#107e3e]' : 'text-[#dc2626]'}`}>{s.trend}</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#005eb8] hover:border-blue-100 shadow-sm transition-all"><Edit size={18} /></button>
                      <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#dc2626] hover:border-red-100 shadow-sm transition-all"><MoreVertical size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clés de Répartition Info Card (Morning Horizon Style) */}
      <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-2xl flex items-center gap-8 shadow-sm group hover:bg-white hover:border-indigo-600 transition-all cursor-pointer">
         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-inner group-hover:rotate-12 transition-transform">
            <Briefcase size={32} />
         </div>
         <div className="flex-1">
            <h5 className="text-[12px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Algorithmes de Répartition (Cost Allocation)</h5>
            <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-widest opacity-80 italic leading-relaxed">
               Configurez vos clés de répartition automatique pour ventiler les charges communes entre les différentes sections. 
               Analyse de rentabilité par centre de profit conforme OHADA v2024.
            </p>
         </div>
         <ChevronRight size={28} className="text-[#cbd5e1] group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
      </div>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={28} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Piste d'Audit Analytique Certifiée</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Chaque flux de ventilation est rattaché à une pièce d'origine immuable • Intégrité assurée par Joule AI Financial Analytics.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <History size={20} className="group-hover:rotate-[-45deg] transition-transform" /> Journal de Structure
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Download size={20} className="group-hover:translate-y-1 transition-transform" /> Exporter Plan
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default PlanAnalytique;
