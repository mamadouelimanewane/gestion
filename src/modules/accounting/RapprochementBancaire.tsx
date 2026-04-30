import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, CheckCircle2, Building, DollarSign, Landmark, 
  RefreshCw, MoreVertical, FileText, Download, ShieldCheck, 
  Zap, ChevronRight, Activity, History, Printer, Share2, ArrowRight,
  Database, Layers, Check
} from 'lucide-react';

const RapprochementBancaire = () => {
  const [ecritures] = useState([
    { date: '02/11/2024', libelle: 'VIREMENT CLIENT ALPHA SÉNÉGAL SA', debit: 1180000, credit: 0, pointe: true },
    { date: '05/11/2024', libelle: 'PRÉLÈVEMENT SENELEC FACT. #4482', debit: 0, credit: 250000, pointe: false },
    { date: '10/11/2024', libelle: 'CHÈQUE FOURNISSEUR TECH-DAKAR SARL', debit: 0, credit: 400000, pointe: true },
    { date: '12/11/2024', libelle: 'FRAIS BANCAIRES MENSUELS (SGBS)', debit: 0, credit: 15000, pointe: false },
    { date: '15/11/2024', libelle: 'REMISE DE CHÈQUES #8821 PORTFOLIO', debit: 350000, credit: 0, pointe: false },
    { date: '20/11/2024', libelle: 'PAIEMENT SALAIRE - NOVEMBRE 2024', debit: 0, credit: 500000, pointe: false },
  ]);

  const [selected, setSelected] = useState<number[]>([0, 2]);

  const toggleSelect = (idx: number) => {
    setSelected(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const soldeComptable = 2500000;
  const soldeReleve = 2865000;
  const ecrituresPointeesDebit = selected.reduce((sum, idx) => sum + ecritures[idx].debit, 0);
  const ecrituresPointeesCredit = selected.reduce((sum, idx) => sum + ecritures[idx].credit, 0);
  const soldeTheorique = soldeComptable + ecrituresPointeesDebit - ecrituresPointeesCredit;
  const ecart = soldeTheorique - soldeReleve;

  const formatCfa = (val: number) => val.toLocaleString('fr-FR') + ' F';

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <Landmark size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Rapprochement Bancaire (FF67)</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">EBICS Connection • Lettrage Automatique Joule AI • Certification OHADA</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <div className="flex items-center gap-4 bg-[#f8fafc] border border-[#cbd5e1] px-6 py-3 rounded-xl shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-[#107e3e] animate-pulse"></div>
              <span className="text-[11px] font-black text-[#334155] uppercase tracking-widest">Connecté SGBS (Dakar)</span>
           </div>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <RefreshCw size={18} /> Synchroniser
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-[600px]">
        {/* Main Selection Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <div className="bg-white border border-[#cbd5e1] rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
              <div className="p-8 bg-[#f8fafc] border-b border-[#cbd5e1] flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cbd5e1] group-focus-within:text-[#005eb8] transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Chercher flux, libellé..." 
                      className="pl-12 pr-6 py-3 bg-white border border-[#cbd5e1] rounded-xl text-[10px] font-black uppercase tracking-widest text-[#334155] placeholder:text-[#cbd5e1] outline-none focus:border-[#005eb8] transition-all w-full shadow-inner"
                    />
                 </div>
                 <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-6 py-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[10px] font-black uppercase tracking-widest text-[#64748b] hover:text-[#0f172a] transition-all shadow-sm">
                       <Filter size={18} /> Flux Ouverts
                    </button>
                    <button className="flex items-center gap-3 px-6 py-2.5 bg-blue-50 text-[#005eb8] border border-blue-200 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm group">
                       <Zap size={18} className="group-hover:scale-125 transition-transform" /> Joule Auto-Match
                    </button>
                 </div>
              </div>

              <div className="overflow-auto flex-1">
                 <table className="w-full text-left whitespace-nowrap border-collapse">
                    <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-black uppercase text-[#64748b] tracking-[0.3em] sticky top-0 z-20 shadow-sm">
                       <tr>
                          <th className="px-10 py-6 w-24 text-center">Lettrage</th>
                          <th className="px-10 py-6 w-40">Date Valeur</th>
                          <th className="px-10 py-6">Libellé de l'Opération de Relevé</th>
                          <th className="px-10 py-6 text-right">Débit (+)</th>
                          <th className="px-10 py-6 text-right">Crédit (-)</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                       {ecritures.map((e, idx) => (
                         <tr key={idx} 
                             onClick={() => toggleSelect(idx)}
                             className={`group transition-all cursor-pointer ${selected.includes(idx) ? 'bg-blue-50/50' : 'hover:bg-blue-50/20'}`}>
                           <td className="px-10 py-6 border-r border-[#f1f5f9] text-center">
                             <div className={`w-10 h-10 mx-auto rounded-xl border-2 flex items-center justify-center transition-all ${selected.includes(idx) ? 'bg-[#107e3e] border-[#107e3e] shadow-lg shadow-green-500/20' : 'bg-white border-[#cbd5e1] shadow-inner'}`}>
                               {selected.includes(idx) && <Check size={22} className="text-white" strokeWidth={3} />}
                             </div>
                           </td>
                           <td className="px-10 py-6 border-r border-[#f1f5f9] font-mono font-black text-[#005eb8] text-xs tracking-tighter uppercase">{e.date}</td>
                           <td className="px-10 py-6 border-r border-[#f1f5f9]">
                              <div className="flex flex-col">
                                 <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{e.libelle}</span>
                                 <span className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1 opacity-60 italic">Opération identifiée par le Core Engine</span>
                              </div>
                           </td>
                           <td className="px-10 py-6 text-right font-black text-[#107e3e] text-base border-r border-[#f1f5f9] tracking-tighter">
                              {e.debit > 0 ? formatCfa(e.debit) : ''}
                           </td>
                           <td className="px-10 py-6 text-right font-black text-[#dc2626] text-base tracking-tighter">
                              {e.credit > 0 ? formatCfa(e.credit) : ''}
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Synthesis Dashboard Side Panel */}
        <div className="flex flex-col gap-8">
           <div className="bg-[#0f172a] p-10 rounded-2xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-125 transition-transform"></div>
              <h4 className="text-[12px] font-black text-blue-400 uppercase tracking-[0.3em] mb-12 flex items-center gap-5">
                <Activity size={24} /> Synthèse Analytique du Compte (512)
              </h4>
              <div className="space-y-8">
                <SummaryRow label="Solde Comptable Initial" value={formatCfa(soldeComptable)} color="white" />
                <SummaryRow label="Total des Mouvements Lettrés" value={`${formatCfa(ecrituresPointeesDebit - ecrituresPointeesCredit)}`} color="green" />
                <div className="h-px bg-slate-800/50 my-10"></div>
                <SummaryRow label="Solde Théorique de Fin" value={formatCfa(soldeTheorique)} color="blue" />
                <SummaryRow label="Solde Effectif du Relevé" value={formatCfa(soldeReleve)} color="white" />
                
                <div className="mt-12 p-10 bg-slate-900/80 rounded-3xl border border-slate-800 flex flex-col items-center justify-center relative group/ecart shadow-inner">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover/ecart:opacity-100 transition-opacity rounded-3xl"></div>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6 relative z-10">Écart de Rapprochement</span>
                   <span className={`text-5xl font-black tracking-tighter relative z-10 transition-colors duration-500 ${ecart === 0 ? 'text-[#107e3e]' : 'text-[#dc2626]'}`}>
                     {formatCfa(ecart)}
                   </span>
                   {ecart === 0 && (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-4 mt-8 px-8 py-3 bg-green-500/10 text-[#107e3e] rounded-full text-[11px] font-black uppercase tracking-[0.3em] border border-green-500/30 shadow-xl shadow-green-500/5"
                      >
                         <ShieldCheck size={18} /> Équilibre Parfait
                      </motion.div>
                   )}
                </div>
              </div>
              <button 
                disabled={ecart !== 0}
                className={`w-full mt-12 py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl transition-all ${ecart === 0 ? 'bg-[#005eb8] hover:bg-[#004080] text-white shadow-blue-500/40 scale-105 active:scale-95' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'}`}
              >
                Valider & Comptabiliser
              </button>
           </div>

           <div className="bg-white border border-[#cbd5e1] p-10 rounded-2xl shadow-sm flex flex-col gap-8 group hover:border-[#005eb8] transition-all cursor-pointer">
              <div className="flex items-center gap-5 text-[#005eb8]">
                 <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm group-hover:scale-110 transition-transform">
                    <FileText size={28} />
                 </div>
                 <h4 className="text-[12px] font-black uppercase tracking-[0.2em] leading-tight">Générer le Procès-Verbal d'Audit</h4>
              </div>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-widest leading-relaxed opacity-70">
                 Éditez instantanément le rapport de rapprochement certifié conforme OHADA avec signature numérique intégrée.
              </p>
              <button className="flex items-center justify-center gap-4 w-full py-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-black uppercase tracking-widest text-[#005eb8] hover:bg-white transition-all shadow-sm">
                 <Download size={20} /> Télécharger PV Signé
              </button>
           </div>
        </div>
      </div>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-8">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={32} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Souveraineté des Flux Bancaires (EBICS)</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic leading-relaxed">
                  L'intégrité de la réconciliation est certifiée par Joule AI Financial Compliance • Piste d'audit immuable SHA-256.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-4 text-[#64748b] hover:text-[#005eb8] text-[10px] font-black uppercase tracking-[0.4em] transition-all group">
               <History size={22} className="group-hover:rotate-[-45deg] transition-transform" /> Journal de Tréso
            </button>
            <button className="flex items-center gap-4 text-[#005eb8] hover:text-[#004080] text-[10px] font-black uppercase tracking-[0.5em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={22} className="group-hover:rotate-12 transition-transform" /> Certifier État
               <ArrowRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, color }: any) => (
  <div className="flex justify-between items-center group/row">
    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest group-hover/row:text-slate-300 transition-colors">{label}</span>
    <span className={`text-base font-black tracking-tighter ${
      color === 'white' ? 'text-white' : 
      color === 'green' ? 'text-[#107e3e]' : 
      'text-blue-400'
    }`}>{value}</span>
  </div>
);

export default RapprochementBancaire;
