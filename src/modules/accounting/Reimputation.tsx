import React, { useState } from 'react';
import { Search, Filter, RefreshCw, AlertCircle, ArrowRight, Database, Layers, ShieldCheck, Zap, MoreVertical, ChevronRight, History, Printer, Download, Share2, CheckCircle2, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Reimputation = () => {
  const [ecritures] = useState([
    { id: 1, date: '12/10/2024', piece: 'FAC-4501', compteActuel: '701000', intitule: 'Ventes Produits Finis', montant: 1000000, nouveauCompte: '' },
    { id: 2, date: '15/10/2024', piece: 'VIR-102', compteActuel: '411001', intitule: 'Client Alpha Sénégal', montant: 1180000, nouveauCompte: '' },
    { id: 3, date: '22/10/2024', piece: 'FAC-4588', compteActuel: '701000', intitule: 'Ventes Produits Finis', montant: 450000, nouveauCompte: '' },
  ]);

  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const formatCfa = (val: number) => {
    return val.toLocaleString('fr-FR') + ' F';
  };

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:rotate-6 transition-transform">
              <RefreshCw size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Outil de Réimputation Massive</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Correction en Lot des Affectations Comptables • Transferts de Flux • Audit Trail</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-sm">
              <History size={18} /> Historique Corrections
           </button>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <FileCheck size={18} /> Valider Transfert
           </button>
        </div>
      </div>

      {/* Mode Alert Area (SAP Style Info) */}
      <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl flex items-center gap-8 shadow-sm group">
         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#005eb8] border border-blue-200 shadow-sm group-hover:scale-110 transition-transform">
            <AlertCircle size={32} />
         </div>
         <div className="flex-1">
            <h5 className="text-sm font-black text-[#0f172a] uppercase tracking-widest mb-1">Traitement par Lot (Batch Mode)</h5>
            <p className="text-[11px] text-[#64748b] font-medium leading-relaxed uppercase tracking-tight opacity-80">
               Utilisez cet écran pour corriger des erreurs d'imputation systématiques. Toutes les écritures sélectionnées seront transférées vers le nouveau compte indiqué. 
               Une pièce corrective sera automatiquement générée pour chaque transfert afin de maintenir l'historique d'audit.
            </p>
         </div>
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-[#005eb8] uppercase tracking-widest mb-1">{selected.length} Postes Sélectionnés</span>
            <div className="flex gap-1">
               {[1,2,3,4,5].map(s => <div key={s} className={`w-3 h-1 rounded-full ${s <= (selected.length > 0 ? 5 : 0) ? 'bg-[#005eb8]' : 'bg-[#e2e8f0]'}`} />)}
            </div>
         </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[500px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Grille de Correspondance pour Réimputation</h3>
           </div>
           <div className="flex gap-6">
              <div className="relative group w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
                <input type="text" placeholder="Chercher une pièce..." className="w-full pl-10 pr-4 py-2 bg-white border border-[#cbd5e1] rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#005eb8] shadow-inner" />
              </div>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-8 py-5 w-16 text-center">Sel.</th>
                <th className="px-10 py-5">Date / Référence Pièce</th>
                <th className="px-10 py-5">Affectation Actuelle</th>
                <th className="px-10 py-5">Désignation Flux</th>
                <th className="px-10 py-5 text-right">Valeur Nette</th>
                <th className="px-10 py-5 text-center">Transfert</th>
                <th className="px-10 py-5">Affectation Cible (ERP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {ecritures.map((e) => (
                <tr key={e.id} 
                    onClick={() => toggleSelect(e.id)}
                    className={`group transition-all cursor-pointer ${
                      selected.includes(e.id) ? 'bg-blue-50/50 shadow-inner' : 'hover:bg-blue-50/20'
                    }`}>
                  <td className="px-8 py-6 text-center border-r border-[#f1f5f9]">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all mx-auto ${
                      selected.includes(e.id) ? 'bg-[#005eb8] border-[#005eb8] shadow-lg scale-110' : 'border-[#cbd5e1] bg-white group-hover:border-blue-300'
                    }`}>
                      {selected.includes(e.id) && <CheckCircle2 size={16} className="text-white" />}
                    </div>
                  </td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-mono font-bold text-[#64748b] tracking-tighter uppercase">{e.date}</span>
                       <span className="text-xs font-black text-[#005eb8] uppercase tracking-tight mt-1 group-hover:underline">{e.piece}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                     <span className="px-4 py-1.5 rounded-lg bg-red-50 border border-red-100 text-[10px] font-mono font-black text-[#dc2626] uppercase tracking-widest shadow-sm">
                        {e.compteActuel}
                     </span>
                  </td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9] text-xs font-bold text-[#334155] uppercase tracking-tight">
                     {e.intitule}
                  </td>
                  <td className="px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-[#334155] text-base tracking-tighter">
                     {formatCfa(e.montant)}
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                     <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center mx-auto border border-blue-100 shadow-sm group-hover:scale-110 transition-transform">
                        <ArrowRight size={20} />
                     </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="relative group/input">
                       <Database size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within/input:text-[#005eb8] transition-colors" />
                       <input 
                         type="text" 
                         placeholder="Compte cible (ex: 701100)..." 
                         className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-mono font-black text-[#107e3e] uppercase tracking-widest focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner" 
                         onClick={(e) => e.stopPropagation()}
                       />
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
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Maintenance Référentielle Certifiée</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Chaque réimputation génère une trace d'audit indélébile conformément aux normes SYSCOHADA • Validation Joule IA.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <History size={20} className="group-hover:rotate-[-45deg] transition-transform" /> Journal de Révision
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Printer size={20} className="group-hover:scale-110 transition-transform" /> Impression Rapport
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default Reimputation;
