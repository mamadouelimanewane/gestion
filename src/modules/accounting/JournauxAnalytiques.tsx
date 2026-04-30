import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, PieChart, Database, Layers, ShieldCheck, Zap, MoreVertical, ChevronRight, History, Printer, Download, Share2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JournauxAnalytiques = () => {
  const [journaux] = useState([
    { code: 'ANA-G', intitule: 'Journal Analytique Général (Multi-D)', type: 'Général', sections: 12 },
    { code: 'ANA-V', intitule: 'Journal Analytique des Ventes (Export)', type: 'Ventes', sections: 8 },
    { code: 'ANA-A', intitule: 'Journal Analytique des Achats (Exploit.)', type: 'Achats', sections: 5 },
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
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Journaux Analytiques (CO-PA)</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Segmentation des Coûts • Rentabilité par Segment • S/4 Integration</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-sm">
              <History size={18} /> Logs Structure
           </button>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <Plus size={20} /> Créer Journal
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
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Référentiel des Journaux de Contrôle</h3>
           </div>
           <div className="flex gap-6">
              <div className="relative group w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cbd5e1]" size={16} />
                <input type="text" placeholder="Chercher code..." className="w-full pl-10 pr-4 py-2 bg-white border border-[#cbd5e1] rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-500 shadow-inner" />
              </div>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-6 w-32">Code ERP</th>
                <th className="px-10 py-6">Désignation du Journal Analytique</th>
                <th className="px-10 py-6 text-center">Type de Flux CO</th>
                <th className="px-10 py-6 text-center">Sections Liées</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {journaux.map((j, idx) => (
                <tr key={idx} className="group hover:bg-indigo-50/20 transition-all cursor-pointer">
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                     <span className="font-mono font-black text-lg text-indigo-600 tracking-tighter group-hover:scale-110 transition-transform origin-left block">{j.code}</span>
                  </td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                     <div className="flex flex-col">
                        <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover:text-[#0f172a] transition-colors">{j.intitule}</span>
                        <span className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1 opacity-60 italic">Journal de ventilation analytique</span>
                     </div>
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                    <span className="px-4 py-1.5 rounded-[2rem] bg-[#f8fafc] border border-[#cbd5e1] text-[9px] font-black text-[#64748b] uppercase tracking-widest group-hover:bg-white group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                      {j.type}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9] font-black text-[#334155] text-xs tracking-widest">
                     {j.sections} <span className="text-[9px] opacity-40">Centres</span>
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

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={28} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Validation Croisée FI-CO Active</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Chaque flux analytique est automatiquement réconcilié avec le Journal Universel ACDOCA • Intégrité assurée par Joule AI.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <History size={20} className="group-hover:rotate-[-45deg] transition-transform" /> Journal de Révision
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Printer size={20} className="group-hover:scale-110 transition-transform" /> Impression Liste
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default JournauxAnalytiques;
