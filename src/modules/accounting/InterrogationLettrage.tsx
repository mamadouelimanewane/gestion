import React, { useState } from 'react';
import { Search, Link as LinkIcon, Filter, CheckCircle2, Database, Layers, ShieldCheck, Zap, MoreVertical, ChevronRight, History, Printer, Download, Share2, ArrowRight, XCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InterrogationLettrage = () => {
  const [ecritures] = useState([
    { date: '12/10/2024', journal: 'VTE', piece: 'FAC-4501', compte: '4110001', tiers: 'CLIENT ALPHA SÉNÉGAL SA', libelle: 'FACTURE VENTE N° 4501 (CONSOMMABLES)', debit: 1180000, credit: 0, lettre: 'A' },
    { date: '25/10/2024', journal: 'BQ1', piece: 'VIR-102', compte: '4110001', tiers: 'CLIENT ALPHA SÉNÉGAL SA', libelle: 'VIREMENT CLIENT ALPHA (SGBS)', debit: 0, credit: 1180000, lettre: 'A' },
    { date: '05/11/2024', journal: 'VTE', piece: 'FAC-4588', compte: '4110001', tiers: 'CLIENT ALPHA SÉNÉGAL SA', libelle: 'FACTURE VENTE N° 4588 (SERVICES)', debit: 450000, credit: 0, lettre: '' },
    { date: '10/11/2024', journal: 'ACH', piece: 'FAC-F22', compte: '4010001', tiers: 'FOURNISSEUR TECH-AFRICA SARL', libelle: 'ACHAT MATÉRIEL INFO (SERVEURS)', debit: 0, credit: 850000, lettre: '' },
    { date: '15/11/2024', journal: 'BQ1', piece: 'CHQ-885', compte: '4010001', tiers: 'FOURNISSEUR TECH-AFRICA SARL', libelle: 'CHÈQUE FOURNISSEUR TECH (PARTIEL)', debit: 400000, credit: 0, lettre: '' },
  ]);

  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (idx: number) => {
    setSelected(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const selectedDebit = selected.reduce((sum, idx) => sum + ecritures[idx].debit, 0);
  const selectedCredit = selected.reduce((sum, idx) => sum + ecritures[idx].credit, 0);
  const soldeDiff = Math.abs(selectedDebit - selectedCredit);

  const formatCfa = (val: number) => {
    if (val === 0) return '—';
    return val.toLocaleString('fr-FR') + ' F';
  };

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <LinkIcon size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Lettrage & Apurement des Comptes</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Rapprochement des Postes Ouverts • Pointage Automatisé Joule AI • OHADA v2024</p>
           </div>
        </div>
        
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <div className="relative group w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cbd5e1] group-focus-within:text-[#005eb8] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="N° Compte Tiers (ex: 4110001)..." 
                className="pl-12 pr-6 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-black uppercase tracking-widest text-[#334155] placeholder:text-[#cbd5e1] outline-none focus:border-[#005eb8] focus:bg-white transition-all w-full shadow-inner h-[50px]"
              />
           </div>
           <div className="flex p-1.5 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1] shadow-inner">
              <button className="px-6 py-2 bg-white text-[#005eb8] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-md border border-blue-50">Flux Ouverts</button>
              <button className="px-6 py-2 text-[#64748b] hover:text-[#0f172a] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">Consolidés</button>
           </div>
        </div>
      </div>

      {/* Lettrage Engine Panel (Synthesis Dashboard) */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0f172a] rounded-[2rem] p-12 flex flex-col lg:flex-row justify-between items-center gap-12 shadow-[0_30px_60px_rgba(15,23,42,0.3)] border border-slate-800 relative overflow-hidden group/lettrage"
      >
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -mr-48 -mt-48 blur-3xl opacity-0 group-hover/lettrage:opacity-100 transition-opacity"></div>
         
         <div className="flex items-center gap-12 border-r border-slate-800 pr-12 h-full relative z-10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${selected.length > 0 ? 'bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-500/20' : 'bg-slate-800 text-slate-600 border-slate-700'}`}>
               <Zap size={32} className={selected.length > 0 ? 'animate-pulse' : ''} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-slate-500 uppercase tracking-[0.4em]">Moteur de Pointage</span>
               <p className="text-2xl font-black text-white tracking-tighter mt-2">{selected.length} <span className="text-[12px] font-bold text-slate-500 uppercase tracking-[0.3em] ml-2">Lignes Sélectionnées</span></p>
            </div>
         </div>

         <div className="flex gap-24 items-center flex-1 justify-center relative z-10">
            <div className="flex flex-col items-end">
               <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Total Débit (+)</span>
               <span className="text-4xl font-black text-[#4ade80] tracking-tighter">{selectedDebit.toLocaleString()} <span className="text-sm opacity-30 tracking-widest ml-1 text-white">F</span></span>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Total Crédit (-)</span>
               <span className="text-4xl font-black text-[#f87171] tracking-tighter">{selectedCredit.toLocaleString()} <span className="text-sm opacity-30 tracking-widest ml-1 text-white">F</span></span>
            </div>
            <div className="h-16 w-px bg-slate-800 mx-4" />
            <div className="flex flex-col items-end">
               <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Écart de Lettrage</span>
               <span className={`text-5xl font-black tracking-tighter transition-all duration-700 ${soldeDiff === 0 && selected.length > 0 ? 'text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]' : 'text-amber-400'}`}>
                  {soldeDiff.toLocaleString()} <span className="text-base font-bold opacity-30 tracking-widest ml-1 text-white">F</span>
               </span>
            </div>
         </div>

         <button 
           disabled={soldeDiff !== 0 || selected.length === 0}
           className={`px-16 py-6 rounded-[3rem] text-[13px] font-black uppercase tracking-[0.5em] shadow-2xl transition-all relative z-10 group/btn ${
             soldeDiff === 0 && selected.length > 0 
               ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/40 scale-105 active:scale-95' 
               : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
           }`}
         >
           <CheckCircle2 size={28} className="mr-4 inline-block group-hover/btn:scale-110 transition-transform" /> Lettrer
         </button>
      </motion.div>

      {/* Main Entries Table */}
      <div className="bg-white rounded-2xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[600px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Liste des Écritures à Apurer (Comptes Tiers)</h3>
           </div>
           <div className="flex gap-6">
              <button className="flex items-center gap-4 px-8 py-2.5 bg-white border border-[#cbd5e1] rounded-2xl shadow-sm text-[11px] font-black uppercase text-[#64748b] hover:text-[#005eb8] hover:border-[#005eb8] transition-all group">
                 <Zap size={18} className="group-hover:scale-125 transition-transform text-[#005eb8]" /> Joule Auto-Match
              </button>
              <button className="p-3.5 bg-white border border-[#cbd5e1] rounded-2xl text-[#cbd5e1] hover:text-[#0f172a] shadow-sm transition-all">
                 <Printer size={22} />
              </button>
           </div>
        </div>

        <div className="overflow-auto flex-1 custom-scrollbar">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-black uppercase text-[#64748b] tracking-[0.3em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-6 w-24 text-center">Sel.</th>
                <th className="px-10 py-6 w-28 text-center">Code Let.</th>
                <th className="px-10 py-6 w-40">Date Valeur</th>
                <th className="px-10 py-6 w-24 text-center">JNL</th>
                <th className="px-10 py-6 w-48">N° Pièce ERP</th>
                <th className="px-10 py-6">Libellé Transactionnel</th>
                <th className="px-10 py-6 text-right w-56 font-black text-[#005eb8]">Débit (+)</th>
                <th className="px-10 py-6 text-right w-56 font-black text-[#005eb8]">Crédit (-)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {ecritures.map((e, idx) => (
                <tr key={idx} 
                    onClick={() => !e.lettre && toggleSelect(idx)}
                    className={`group transition-all ${
                      e.lettre ? 'bg-[#f8fafc]/50 opacity-40 cursor-not-allowed' : 
                      selected.includes(idx) ? 'bg-blue-50/80 shadow-inner' : 'hover:bg-blue-50/30 cursor-pointer'
                    }`}>
                  <td className="px-10 py-7 text-center border-r border-[#f1f5f9]">
                    {!e.lettre && (
                      <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all mx-auto ${
                        selected.includes(idx) ? 'bg-[#005eb8] border-[#005eb8] shadow-xl shadow-blue-500/20 scale-110' : 'border-[#cbd5e1] bg-white group-hover:border-blue-300'
                      }`}>
                        {selected.includes(idx) && <Check size={20} className="text-white" strokeWidth={3} />}
                      </div>
                    )}
                  </td>
                  <td className="px-10 py-7 text-center border-r border-[#f1f5f9]">
                    <span className={`px-5 py-2 rounded-full font-black text-xs tracking-[0.3em] shadow-sm ${e.lettre ? 'bg-green-50 text-[#107e3e] border border-green-100' : 'bg-slate-50 text-[#cbd5e1] border border-slate-100 opacity-30'}`}>
                       {e.lettre || '—'}
                    </span>
                  </td>
                  <td className="px-10 py-7 border-r border-[#f1f5f9] font-mono font-black text-[11px] text-[#64748b] tracking-tighter uppercase">{e.date}</td>
                  <td className="px-10 py-7 border-r border-[#f1f5f9] text-center">
                     <span className="px-4 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] text-[#94a3b8] text-[10px] font-black rounded-xl uppercase tracking-widest group-hover:bg-white group-hover:text-[#005eb8] group-hover:border-blue-100 transition-all shadow-sm">{e.journal}</span>
                  </td>
                  <td className="px-10 py-7 border-r border-[#f1f5f9] font-black text-[#005eb8] text-sm uppercase tracking-tight group-hover:underline group-hover:translate-x-1 transition-all">{e.piece}</td>
                  <td className="px-10 py-7 border-r border-[#f1f5f9]">
                     <div className="flex flex-col">
                        <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover:text-[#0f172a] transition-colors">{e.libelle}</span>
                        <span className="text-[10px] text-[#94a3b8] font-black uppercase tracking-widest mt-1 opacity-60 italic leading-none truncate max-w-[300px]">Tiers : {e.tiers}</span>
                     </div>
                  </td>
                  <td className={`px-10 py-7 text-right font-black text-xl tracking-tighter border-r border-[#f1f5f9] transition-all ${e.debit > 0 ? 'bg-green-50/10 text-[#107e3e]' : 'text-[#cbd5e1]'}`}>{formatCfa(e.debit)}</td>
                  <td className={`px-10 py-7 text-right font-black text-xl tracking-tighter transition-all ${e.credit > 0 ? 'bg-red-50/10 text-[#dc2626]' : 'text-[#cbd5e1]'}`}>{formatCfa(e.credit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-10 rounded-2xl shadow-inner gap-10">
         <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e] group cursor-pointer">
               <ShieldCheck size={36} className="group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col">
               <span className="text-base font-black text-[#0f172a] uppercase tracking-[0.2em]">Traçabilité des Apurements Certifiée (Audit Trail)</span>
               <p className="text-[11px] font-black text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic leading-relaxed">
                  Chaque appurement génère un index de révision unique • Conforme aux exigences de transparence SYSCOHADA et IFRS 9.
               </p>
            </div>
         </div>
         <div className="flex gap-12 items-center">
            <button className="flex items-center gap-4 text-[#64748b] hover:text-[#005eb8] text-[11px] font-black uppercase tracking-[0.4em] transition-all group">
               <History size={24} className="group-hover:rotate-[-45deg] transition-transform" /> Journal d'Audit
            </button>
            <button className="flex items-center gap-5 text-[#005eb8] hover:text-[#004080] text-[11px] font-black uppercase tracking-[0.5em] transition-all group border-l border-[#cbd5e1] pl-12 h-10">
               <Download size={24} className="group-hover:translate-y-1 transition-transform" /> Extraits Lettrés
               <ArrowRight size={18} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default InterrogationLettrage;
