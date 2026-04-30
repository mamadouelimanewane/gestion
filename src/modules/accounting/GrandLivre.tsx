import React, { useState } from 'react';
import { 
  Search, Filter, Download, BookOpen, ChevronRight, MoreVertical, 
  Printer, FileText, Database, Layers, ArrowUpDown, History, 
  ShieldCheck, Zap, ArrowRight, CheckCircle2, MoreHorizontal,
  ChevronDown, ChevronUp, Check, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GrandLivre = () => {
  const [comptes] = useState([
    {
      numero: '4110001',
      intitule: 'CLIENT ALPHA SÉNÉGAL SA',
      soldeInitialDebit: 1500000,
      soldeInitialCredit: 0,
      ecritures: [
        { date: '01/10/2024', journal: 'VTE', piece: 'FAC-4501', libelle: 'FACTURE VENTE N° 4501 (CONSOMMABLES)', debit: 1180000, credit: 0, lettrage: 'A' },
        { date: '15/10/2024', journal: 'BQ1', piece: 'VIR-102', libelle: 'VIREMENT CLIENT ALPHA / FACT. 4501', debit: 0, credit: 1180000, lettrage: 'A' },
        { date: '22/10/2024', journal: 'VTE', piece: 'FAC-4588', libelle: 'FACTURE VENTE N° 4588 (PRESTATIONS)', debit: 450000, credit: 0, lettrage: '' },
      ],
      totalDebit: 3130000, 
      totalCredit: 1180000,
      soldeFinalDebit: 1950000,
      soldeFinalCredit: 0,
    },
    {
      numero: '4010001',
      intitule: 'FOURNISSEUR TECH-DAKAR SARL',
      soldeInitialDebit: 0,
      soldeInitialCredit: 500000,
      ecritures: [
        { date: '10/11/2024', journal: 'ACH', piece: 'FAC-F22', libelle: 'ACHAT MATÉRIEL INFO (SERVEURS)', debit: 0, credit: 850000, lettrage: '' },
        { date: '15/11/2024', journal: 'BQ1', piece: 'CHQ-885', libelle: 'RÈGLEMENT FOURNISSEUR TECH / CHQ. 885', debit: 400000, credit: 0, lettrage: '' },
      ],
      totalDebit: 400000,
      totalCredit: 1350000,
      soldeFinalDebit: 0,
      soldeFinalCredit: 950000,
    }
  ]);

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
              <BookOpen size={40} strokeWidth={2.5} />
           </div>
           <div>
              <h3 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Grand-Livre des Comptes (Unified Ledger)</h3>
              <p className="text-[12px] text-[#64748b] font-black uppercase tracking-[0.3em] italic opacity-80 flex items-center gap-3">
                 <ShieldCheck size={16} className="text-[#0a6ed1]" /> Single Ledger View • Analyse Multidimensionnelle • OHADA v2024
              </p>
           </div>
        </div>
        
        <div className="flex gap-6 relative z-10 mt-8 lg:mt-0">
           <div className="relative group w-80">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200 group-focus-within:text-[#0a6ed1] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Chercher compte ou intitulé..." 
                className="pl-14 pr-8 py-4 bg-blue-50/30 border border-blue-100 rounded-2xl text-[12px] font-black uppercase tracking-widest text-[#0f172a] placeholder:text-blue-200 outline-none focus:border-[#0a6ed1] focus:bg-white transition-all w-full shadow-inner h-[60px]"
              />
           </div>
           <button className="flex items-center gap-4 px-10 py-4 bg-[#0a6ed1] hover:bg-blue-700 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl h-[60px] group/btn">
              <Download size={22} className="group-hover/btn:translate-y-1 transition-transform" /> Exportation G/L
           </button>
        </div>
      </div>

      {/* Main Content Area - Account Cards */}
      <div className="flex-1 overflow-y-auto space-y-12 pr-4 custom-scrollbar">
        {comptes.map((compte, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-blue-50 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_100px_rgba(10,110,209,0.08)] hover:border-blue-100 transition-all duration-500 group/card"
          >
            {/* Account Header Section - Diamond Azure Style */}
            <div className="bg-gradient-to-r from-white to-blue-50/20 p-12 flex flex-col lg:flex-row justify-between items-center gap-12 border-b border-blue-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0a6ed1]/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000"></div>
              <div className="flex items-center gap-12 relative z-10">
                <div className="bg-[#0a6ed1] text-white px-10 py-6 rounded-[1.8rem] font-mono font-black text-4xl shadow-2xl shadow-blue-500/30 tracking-tighter flex items-center justify-center min-w-[200px] group-hover/card:scale-110 transition-transform duration-500">
                  {compte.numero}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-black text-[#0f172a] uppercase tracking-tighter text-3xl leading-tight group-hover/card:text-[#0a6ed1] transition-colors">{compte.intitule}</h4>
                  <div className="flex items-center gap-6 mt-4">
                     <span className="text-[11px] text-[#64748b] font-black uppercase tracking-[0.4em] bg-white border border-blue-100 px-6 py-1.5 rounded-full shadow-sm">Poste Individuel (AP/AR)</span>
                     <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full shadow-inner ${compte.soldeFinalDebit > 0 ? 'bg-[#107e3e]' : 'bg-[#dc2626]'}`}></div>
                        <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${compte.soldeFinalDebit > 0 ? 'text-[#107e3e]' : 'text-[#dc2626]'}`}>
                           Solde : {compte.soldeFinalDebit > 0 ? 'Débiteur' : 'Créditeur'}
                        </span>
                     </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 relative z-10">
                 <button className="w-14 h-14 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] hover:border-[#0a6ed1] shadow-sm flex items-center justify-center transition-all transform hover:rotate-6"><Printer size={24} /></button>
                 <button className="w-14 h-14 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0f172a] hover:border-[#0f172a] shadow-sm transition-all transform hover:rotate-6"><MoreHorizontal size={24} /></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white border-b-2 border-blue-50 text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] sticky top-0 z-20 shadow-sm">
                  <tr>
                    <th className="px-12 py-8 w-48">Date Valeur</th>
                    <th className="px-12 py-8 w-28 text-center">JNL</th>
                    <th className="px-12 py-8 w-56">N° Pièce ERP</th>
                    <th className="px-12 py-8 w-28 text-center">Lettrage</th>
                    <th className="px-12 py-8">Libellé de l'Écriture</th>
                    <th className="px-12 py-8 text-right w-64 font-black text-[#0a6ed1]">Débit (+)</th>
                    <th className="px-12 py-8 text-right w-64 font-black text-[#0a6ed1]">Crédit (-)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50/50">
                  {/* Carry Forward Row - Light Azure Elite */}
                  <tr className="bg-blue-50/20 group/row">
                    <td colSpan={5} className="px-12 py-6 text-right border-r border-blue-50/30">
                       <span className="text-[12px] font-black text-[#64748b] uppercase tracking-[0.5em] opacity-40">Report à Nouveau (B/F) :</span>
                    </td>
                    <td className="px-12 py-6 text-right border-r border-blue-50/30 bg-white/50">
                       <span className="text-[13px] font-black text-[#64748b] tracking-tighter italic">{formatCfa(compte.soldeInitialDebit)}</span>
                    </td>
                    <td className="px-12 py-6 text-right bg-white/50">
                       <span className="text-[13px] font-black text-[#64748b] tracking-tighter italic">{formatCfa(compte.soldeInitialCredit)}</span>
                    </td>
                  </tr>

                  {/* Movements Section */}
                  {compte.ecritures.map((e, eIdx) => (
                    <tr key={eIdx} className="group/move hover:bg-blue-50/30 transition-all duration-300">
                      <td className="px-12 py-8 border-r border-blue-50/30 font-mono font-black text-[12px] text-slate-400 tracking-tighter uppercase">{e.date}</td>
                      <td className="px-12 py-8 border-r border-blue-50/30 text-center">
                         <span className="px-6 py-2 bg-blue-50/50 border border-blue-100 text-[#0a6ed1] text-[11px] font-black rounded-xl uppercase tracking-[0.2em] group-hover/move:bg-white transition-all shadow-sm">{e.journal}</span>
                      </td>
                      <td className="px-12 py-8 border-r border-blue-50/30 font-black text-[#0a6ed1] text-base uppercase tracking-tight group-hover/move:underline group-hover/move:translate-x-2 transition-all duration-300">{e.piece}</td>
                      <td className="px-12 py-8 border-r border-blue-50/30 text-center">
                        {e.lettrage && (
                          <span className="px-5 py-2 bg-emerald-50 text-[#107e3e] border border-emerald-100 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-sm">
                             <Check size={14} className="inline-block mr-2 mb-0.5" strokeWidth={3} /> {e.lettrage}
                          </span>
                        )}
                      </td>
                      <td className="px-12 py-8 border-r border-blue-50/30">
                         <div className="flex flex-col">
                            <span className="text-base font-black text-[#0f172a] uppercase tracking-tight group-hover/move:text-[#0a6ed1] transition-colors">{e.libelle}</span>
                            <span className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] mt-2 opacity-60 italic">ACDOCA Individual Line Item</span>
                         </div>
                      </td>
                      <td className="px-12 py-8 text-right border-r border-blue-50/30 bg-white group-hover/move:bg-blue-50/10">
                         <span className="text-xl font-black text-[#0f172a] tracking-tighter">{formatCfa(e.debit)}</span>
                      </td>
                      <td className="px-12 py-8 text-right bg-white group-hover/move:bg-blue-50/10">
                         <span className="text-xl font-black text-[#0f172a] tracking-tighter">{formatCfa(e.credit)}</span>
                      </td>
                    </tr>
                  ))}

                  {/* Period Totals - Diamond Style */}
                  <tr className="bg-white border-t-2 border-blue-100">
                    <td colSpan={5} className="px-12 py-8 text-right border-r border-blue-100 bg-blue-50/10">
                       <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.6em] opacity-60 leading-none">Totalisation des Flux Périodiques :</span>
                    </td>
                    <td className="px-12 py-8 text-right border-r border-blue-100 bg-[#0a6ed1]/5">
                       <span className="text-3xl font-black text-[#0a6ed1] tracking-tighter shadow-sm">{formatCfa(compte.totalDebit)}</span>
                    </td>
                    <td className="px-12 py-8 text-right bg-[#0a6ed1]/5">
                       <span className="text-3xl font-black text-[#0a6ed1] tracking-tighter shadow-sm">{formatCfa(compte.totalCredit)}</span>
                    </td>
                  </tr>

                  {/* Final Balance Block - Diamond Azure Elite */}
                  <tr className="bg-white border-t-4 border-[#0a6ed1]">
                    <td colSpan={5} className="px-12 py-14 text-right bg-gradient-to-r from-white to-blue-50/30 border-r border-blue-100 relative">
                       <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000"></div>
                       <div className="flex flex-col items-end relative z-10">
                          <span className="text-2xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-4">Solde de Clôture Certifié (Net) :</span>
                          <span className="text-[11px] text-[#64748b] font-black uppercase tracking-[0.4em] opacity-70 italic leading-none flex items-center gap-4">
                             <ShieldCheck size={18} className="text-[#107e3e]" /> Arrêté Fiscalement au {new Date().toLocaleDateString('fr-FR')}
                          </span>
                       </div>
                    </td>
                    <td className="px-12 py-14 text-right border-r border-blue-100 bg-white">
                       <span className={`text-6xl font-black tracking-tighter transition-all duration-700 ${compte.soldeFinalDebit > 0 ? 'text-[#107e3e] drop-shadow-[0_0_15px_rgba(16,126,62,0.2)]' : 'text-slate-50 opacity-20'}`}>
                          {formatCfa(compte.soldeFinalDebit)}
                       </span>
                    </td>
                    <td className="px-12 py-14 text-right bg-white">
                       <span className={`text-6xl font-black tracking-tighter transition-all duration-700 ${compte.soldeFinalCredit > 0 ? 'text-[#dc2626] drop-shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'text-slate-50 opacity-20'}`}>
                          {formatCfa(compte.soldeFinalCredit)}
                       </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer System Integrity - Diamond Style */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-blue-50 p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] gap-10 mt-auto group/footer overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-1000"></div>
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#107e3e] to-emerald-600 text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 group/shield cursor-pointer">
               <ShieldCheck size={40} className="group-hover/shield:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Synchronisation Centralisée Ledger (ACDOCA)</span>
               <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 opacity-70 italic leading-relaxed max-w-3xl">
                  L'intégrité de ce Grand-Livre est certifiée conforme **OHADA** par Joule AI Auditor • Piste d'audit SHA-256 cryptographique.
               </p>
            </div>
         </div>
         <div className="flex gap-14 items-center relative z-10">
            <button className="flex items-center gap-5 text-slate-300 hover:text-[#0a6ed1] text-[12px] font-black uppercase tracking-[0.4em] transition-all group/btn">
               <History size={28} className="group-hover/btn:rotate-[-45deg] transition-transform duration-500" /> Journal de Tracé
            </button>
            <button className="flex items-center gap-6 text-[#0a6ed1] hover:text-blue-700 text-[12px] font-black uppercase tracking-[0.5em] transition-all group/strat border-l border-blue-50 pl-14 h-12">
               <Zap size={28} className="group-hover:scale-125 transition-transform duration-500" /> Analyse Prédictive
               <ArrowRight size={22} className="opacity-10 group-hover/strat:opacity-100 group-hover/strat:translate-x-3 transition-all duration-500" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default GrandLivre;
