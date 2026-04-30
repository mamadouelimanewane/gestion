import React, { useState } from 'react';
import { 
  Search, Filter, Printer, FileEdit, Database, Layers, ShieldCheck, 
  Zap, MoreVertical, ChevronRight, FileCheck, AlertCircle, History,
  ArrowRight, CheckCircle2, MoreHorizontal, Download, Trash2, Edit, Check, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Brouillard = () => {
  const [brouillard] = useState([
    { id: 1, date: '10/11/2024', journal: 'VTE', piece: 'FAC-4599', compte: '4110001', intitule: 'CLIENT ALPHA SÉNÉGAL SA', libelle: 'FACTURE VENTE N° 4599 (EXPORT)', debit: 2360000, credit: 0, statut: 'Brouillard' },
    { id: 2, date: '10/11/2024', journal: 'VTE', piece: 'FAC-4599', compte: '7010000', intitule: 'VENTES DE PRODUITS FINIS', libelle: 'FACTURE VENTE N° 4599 (EXPORT)', debit: 0, credit: 2000000, statut: 'Brouillard' },
    { id: 3, date: '10/11/2024', journal: 'VTE', piece: 'FAC-4599', compte: '4431000', intitule: 'TVA COLLECTÉE (TAUUX 18%)', libelle: 'FACTURE VENTE N° 4599 (EXPORT)', debit: 0, credit: 360000, statut: 'Brouillard' },
    { id: 4, date: '12/11/2024', journal: 'ACH', piece: 'FAC-F88', compte: '6010000', intitule: 'ACHATS MARCHANDISES CACAO', libelle: 'ACHAT FOURNITURE BUREAU (STOCK)', debit: 150000, credit: 0, statut: 'Brouillard' },
    { id: 5, date: '12/11/2024', journal: 'ACH', piece: 'FAC-F88', compte: '4452000', intitule: 'TVA DÉDUCTIBLE (TAUX 18%)', libelle: 'ACHAT FOURNITURE BUREAU (STOCK)', debit: 27000, credit: 0, statut: 'Brouillard' },
    { id: 6, date: '12/11/2024', journal: 'ACH', piece: 'FAC-F88', compte: '4010002', intitule: 'FOURNISSEUR BUREAU PRO SAS', libelle: 'ACHAT FOURNITURE BUREAU (STOCK)', debit: 0, credit: 177000, statut: 'Brouillard' },
  ]);

  const totalDebit = brouillard.reduce((sum, ligne) => sum + ligne.debit, 0);
  const totalCredit = brouillard.reduce((sum, ligne) => sum + ligne.credit, 0);
  const equilibre = totalDebit === totalCredit;

  const formatCfa = (val: number) => {
    if (val === 0) return '—';
    return val.toLocaleString('fr-FR') + ' F';
  };

  return (
    <div className="flex flex-col h-full gap-10 bg-white p-10 min-h-screen">
      {/* Premium Header - Diamond Azure Elite */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,94,184,0.08)] relative overflow-hidden group border border-blue-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-48 -mt-48 blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="flex items-center gap-10 relative z-10">
           <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0a6ed1] to-blue-600 flex items-center justify-center text-white shadow-[0_15px_30px_rgba(10,110,209,0.3)] group-hover:rotate-6 transition-transform duration-500">
              <FileEdit size={40} strokeWidth={2.5} />
           </div>
           <div>
              <h3 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Brouillard de Saisie (Journal Provisoire)</h3>
              <p className="text-[12px] text-[#64748b] font-black uppercase tracking-[0.3em] italic opacity-80 flex items-center gap-3">
                 <ShieldCheck size={16} className="text-[#0a6ed1]" /> Validation Intermédiaire • Contrôle de Cohérence • Pré-Audit OHADA
              </p>
           </div>
        </div>
        
        <div className="flex gap-6 relative z-10 mt-8 lg:mt-0">
           <div className="relative group w-80">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200 group-focus-within:text-[#0a6ed1] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Chercher pièce ou compte..." 
                className="pl-14 pr-8 py-4 bg-blue-50/30 border border-blue-100 rounded-2xl text-[12px] font-black uppercase tracking-widest text-[#0f172a] placeholder:text-blue-200 outline-none focus:border-[#0a6ed1] focus:bg-white transition-all w-full shadow-inner h-[60px]"
              />
           </div>
           <button className="w-[60px] h-[60px] bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] hover:border-[#0a6ed1] shadow-sm flex items-center justify-center transition-all">
              <Printer size={24} />
           </button>
        </div>
      </div>

      {/* Main Table Container - Ultra High Contrast */}
      <div className="bg-white rounded-[2.5rem] border border-blue-50 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.04)] flex flex-col flex-1 min-h-[700px]">
        <div className="bg-white px-12 py-8 border-b border-blue-50 flex justify-between items-center sticky top-0 z-20 shadow-sm backdrop-blur-md">
           <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 text-[#0a6ed1] rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={24} />
              </div>
              <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#0f172a]">Postes en Attente de Report Définitif</h3>
           </div>
           <div className="flex gap-6">
              <div className={`flex items-center gap-4 px-8 py-3 bg-white border rounded-2xl shadow-sm transition-all duration-500 ${equilibre ? 'border-emerald-100 bg-emerald-50/30' : 'border-red-100 bg-red-50/30 animate-pulse'}`}>
                 <div className={`w-3 h-3 rounded-full shadow-inner ${equilibre ? 'bg-[#107e3e]' : 'bg-[#dc2626]'}`}></div>
                 <span className={`text-[12px] font-black uppercase tracking-widest ${equilibre ? 'text-[#107e3e]' : 'text-[#dc2626]'}`}>
                    {equilibre ? 'Équilibrage Valide' : 'Déséquilibre Détecté'}
                 </span>
              </div>
              <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] shadow-sm flex items-center justify-center transition-all">
                 <Filter size={22} />
              </button>
           </div>
        </div>

        <div className="overflow-auto flex-1 custom-scrollbar">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-white border-b-2 border-blue-50 text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] sticky top-0 z-20 shadow-sm">
              <tr>
                <th className="px-12 py-8">Date</th>
                <th className="px-12 py-8 text-center w-28">JNL</th>
                <th className="px-12 py-8 w-48">N° Pièce ERP</th>
                <th className="px-12 py-8">Compte G/L</th>
                <th className="px-12 py-8">Intitulé Analytique</th>
                <th className="px-12 py-8 text-right font-black text-[#0a6ed1]">Débit (+)</th>
                <th className="px-12 py-8 text-right font-black text-[#0a6ed1]">Crédit (-)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50/50">
              {brouillard.map((ligne) => (
                <tr key={ligne.id} className="group hover:bg-blue-50/20 transition-all duration-300 cursor-pointer">
                  <td className="px-12 py-8 border-r border-blue-50/30 font-mono font-black text-[12px] text-slate-400 tracking-tighter uppercase">{ligne.date}</td>
                  <td className="px-12 py-8 border-r border-blue-50/30 text-center">
                     <span className="px-6 py-2 bg-blue-50/50 border border-blue-100 text-[#0a6ed1] text-[11px] font-black rounded-xl uppercase tracking-[0.2em] group-hover:bg-white group-hover:shadow-md transition-all">{ligne.journal}</span>
                  </td>
                  <td className="px-12 py-8 border-r border-blue-50/30 font-black text-[#0a6ed1] text-base uppercase tracking-tight group-hover:underline group-hover:translate-x-1 transition-all">{ligne.piece}</td>
                  <td className="px-12 py-8 border-r border-blue-50/30 font-mono font-black text-[#0f172a] text-base tracking-tighter">{ligne.compte}</td>
                  <td className="px-12 py-8 border-r border-blue-50/30">
                     <div className="flex flex-col">
                        <span className="text-base font-black text-[#0f172a] uppercase tracking-tight group-hover:text-[#0a6ed1] transition-colors">{ligne.intitule}</span>
                        <span className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em] mt-2 opacity-80 leading-none">Structure OHADA Classe {ligne.compte[0]}</span>
                     </div>
                  </td>
                  <td className={`px-12 py-8 text-right font-black text-2xl tracking-tighter border-r border-blue-50/30 transition-all duration-500 ${ligne.debit > 0 ? 'text-[#107e3e]' : 'text-slate-100'}`}>
                     {formatCfa(ligne.debit)}
                  </td>
                  <td className={`px-12 py-8 text-right font-black text-2xl tracking-tighter transition-all duration-500 ${ligne.credit > 0 ? 'text-[#dc2626]' : 'text-slate-100'}`}>
                     {formatCfa(ligne.credit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Synthesis Status Dashboard - Diamond Azure Elite */}
        <div className="bg-white p-14 flex flex-col lg:flex-row justify-between items-center gap-14 shadow-[0_-30px_80px_rgba(0,0,0,0.06)] border-t border-blue-50 relative overflow-hidden group/summary">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full -mr-64 -mt-64 blur-[100px] opacity-0 group-hover/summary:opacity-100 transition-opacity duration-1000"></div>
           
           <div className="flex items-center gap-12 border-r border-blue-50 pr-14 h-full relative z-10">
              <div className="w-20 h-20 bg-blue-50 text-[#0a6ed1] rounded-3xl flex items-center justify-center border border-blue-100 shadow-inner group-hover/summary:rotate-6 transition-transform duration-500">
                 <Zap size={40} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[14px] font-black text-slate-400 uppercase tracking-[0.5em] leading-none mb-4 opacity-60">Totalisation Brouillard</span>
                 <p className="text-[11px] font-black text-[#0a6ed1] uppercase tracking-[0.3em] mt-1 italic leading-relaxed">Statut intermédiaire avant report définitif au Grand-Livre</p>
              </div>
           </div>
           
           <div className="flex gap-28 items-center relative z-10">
              <div className="flex flex-col items-end">
                 <span className="text-[12px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Cumul Débit Global</span>
                 <span className={`text-6xl font-black tracking-tighter transition-all duration-700 ${equilibre ? 'text-[#0a6ed1]' : 'text-[#dc2626]'}`}>
                    {totalDebit.toLocaleString()} <span className="text-xl font-bold opacity-20 tracking-widest ml-1 uppercase">F</span>
                 </span>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-[12px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Cumul Crédit Global</span>
                 <span className={`text-6xl font-black tracking-tighter transition-all duration-700 ${equilibre ? 'text-[#0a6ed1]' : 'text-[#dc2626]'}`}>
                    {totalCredit.toLocaleString()} <span className="text-xl font-bold opacity-20 tracking-widest ml-1 uppercase">F</span>
                 </span>
              </div>
           </div>

           <button 
             disabled={!equilibre} 
             className={`px-16 py-7 rounded-[3rem] text-[14px] font-black uppercase tracking-[0.6em] shadow-2xl transition-all relative z-10 group/btn ${
               equilibre 
                 ? 'bg-[#0a6ed1] hover:bg-blue-700 text-white shadow-blue-500/40 scale-105 active:scale-95' 
                 : 'bg-slate-50 text-slate-200 cursor-not-allowed border border-slate-100'
             }`}
           >
              <FileCheck size={32} className="mr-5 inline-block group-hover/btn:scale-110 transition-transform" />
              Reporter au GL
           </button>
        </div>
      </div>

      {/* Warning Area for Disbalance - High Contrast Elite */}
      {!equilibre && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-red-50/50 border-4 border-dashed border-red-100 p-12 rounded-[3rem] flex items-center gap-12 shadow-3xl relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
           <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-[#dc2626] border-2 border-red-100 shadow-2xl animate-pulse relative z-10">
              <AlertCircle size={48} strokeWidth={2.5} />
           </div>
           <div className="flex flex-col relative z-10 flex-1">
              <h4 className="text-3xl font-black text-[#dc2626] uppercase tracking-tighter leading-none mb-4">Brouillard Déséquilibré : Action Requise</h4>
              <p className="text-[12px] font-black text-red-600 uppercase tracking-[0.3em] opacity-80 italic leading-relaxed max-w-4xl">
                 Un écart de report majeur a été détecté : <span className="underline underline-offset-8 decoration-4 font-black text-2xl mx-2">{Math.abs(totalDebit - totalCredit).toLocaleString()} F CFA</span>. 
                 <br />L'intégrité du report au grand-livre est compromise. Veuillez réviser les écritures via Joule AI Auditor.
              </p>
           </div>
           <button className="px-12 py-5 bg-[#dc2626] text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] hover:bg-red-700 transition-all shadow-3xl shadow-red-500/30 relative z-10 scale-105">
              Lancer Assistant Révision
           </button>
        </motion.div>
      )}

      {/* Footer System Integrity - Diamond Style */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-blue-50 p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] gap-10 mt-auto group/footer overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-1000"></div>
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#107e3e] to-emerald-600 text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 group/shield cursor-pointer">
               <ShieldCheck size={40} className="group-hover/shield:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Piste d'Audit Immuable (Blockchain-Like)</span>
               <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 opacity-70 italic leading-relaxed max-w-3xl">
                  L'intégrité de ce brouillard est certifiée conforme **OHADA** par Joule AI Auditor • Hash d'intégrité SHA-256 généré à chaque saisie transactionnelle.
               </p>
            </div>
         </div>
         <div className="flex gap-14 items-center relative z-10">
            <button className="flex items-center gap-5 text-slate-300 hover:text-[#0a6ed1] text-[12px] font-black uppercase tracking-[0.4em] transition-all group/btn">
               <History size={28} className="group-hover/btn:rotate-[-45deg] transition-transform duration-500" /> Logs de Saisie
            </button>
            <button className="flex items-center gap-6 text-[#0a6ed1] hover:text-blue-700 text-[12px] font-black uppercase tracking-[0.5em] transition-all group/strat border-l border-blue-50 pl-14 h-12">
               <Zap size={28} className="group-hover:scale-125 transition-transform duration-500" /> Équilibrage Auto
               <ArrowRight size={22} className="opacity-10 group-hover/strat:opacity-100 group-hover/strat:translate-x-3 transition-all duration-500" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default Brouillard;
