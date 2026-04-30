import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, LayoutTemplate, Database, Layers, ShieldCheck, Zap, MoreVertical, ChevronRight, History, Printer, Download, Share2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ModelesSaisie = () => {
  const [modeles] = useState([
    { id: 1, code: 'LOYER', intitule: 'Paiement Loyer Mensuel (Siège)', journal: 'OD', nbLignes: 2, lastUsed: '01/11/2024' },
    { id: 2, code: 'SALAIRE', intitule: 'Saisie Paie Mensuelle Consolidée', journal: 'OD', nbLignes: 8, lastUsed: '30/10/2024' },
    { id: 3, code: 'ABO-TEL', intitule: 'Facture Sonatel / Orange Business', journal: 'ACH', nbLignes: 3, lastUsed: '25/10/2024' },
    { id: 4, code: 'TVA-MENS', intitule: 'Déclaration TVA Mensuelle CA3', journal: 'OD', nbLignes: 4, lastUsed: '15/10/2024' },
  ]);

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform">
              <LayoutTemplate size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Modèles de Saisie Pré-définis</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Automatisation des Écritures Récurrentes • Schémas de Ventilation • Audit Ready</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <div className="relative group w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#005eb8] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Chercher un modèle (LOYER, TVA...)" 
                className="pl-12 pr-6 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#334155] placeholder:text-[#94a3b8] uppercase tracking-tight outline-none focus:border-[#005eb8] focus:bg-white transition-all w-full shadow-inner"
              />
           </div>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <Plus size={20} /> Créer Modèle
           </button>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[500px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shadow-inner">
                 <Layers size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Bibliothèque de Schémas Comptables</h3>
           </div>
           <div className="flex gap-6">
              <div className="flex items-center gap-3 px-6 py-2 bg-white border border-[#cbd5e1] rounded-xl shadow-sm">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#107e3e] shadow-sm animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase text-[#107e3e] tracking-widest">IA Auto-Learning Active</span>
              </div>
              <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#005eb8] shadow-sm transition-all">
                 <Download size={18} />
              </button>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-6 w-40">Code Modèle</th>
                <th className="px-10 py-6">Désignation du Schéma</th>
                <th className="px-10 py-6 text-center">Journal par Défaut</th>
                <th className="px-10 py-6 text-center">Lignes Type</th>
                <th className="px-10 py-6">Dernière Utilisation</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {modeles.map((m) => (
                <tr key={m.id} className="group hover:bg-blue-50/10 transition-all cursor-pointer">
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                     <span className="font-mono font-black text-lg text-[#005eb8] tracking-tighter group-hover:scale-110 transition-transform origin-left block">{m.code}</span>
                  </td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                     <div className="flex flex-col">
                        <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover:text-[#0f172a] transition-colors">{m.intitule}</span>
                        <span className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1 opacity-60 italic">Schéma d'imputation automatisé</span>
                     </div>
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                    <span className="px-4 py-1.5 rounded-lg bg-[#f8fafc] border border-[#cbd5e1] text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] group-hover:bg-white group-hover:text-[#005eb8] transition-all">
                      {m.journal}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9] font-black text-[#334155] text-xs tracking-widest">
                     {m.nbLignes} <span className="text-[9px] opacity-40">Postes</span>
                  </td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9] font-mono font-bold text-[11px] text-[#94a3b8] tracking-tighter uppercase">
                     {m.lastUsed}
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#005eb8] hover:border-blue-100 shadow-sm transition-all"><Edit size={18} /></button>
                      <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#dc2626] hover:border-red-100 shadow-sm transition-all"><Trash2 size={18} /></button>
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
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Certification des Schémas de Saisie</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Chaque modèle est validé par Joule AI pour prévenir les erreurs d'imputation en classe 6/7 • Conforme aux règles de ventilation analytique.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <History size={20} className="group-hover:rotate-[-45deg] transition-transform" /> Logs de Structure
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Zap size={20} className="group-hover:scale-125 transition-transform" /> Suggestions Joule
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default ModelesSaisie;
