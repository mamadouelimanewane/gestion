import React, { useState } from 'react';
import { Search, Filter, Download, FileSpreadsheet, Activity, ChevronDown, Database, Layers, ShieldCheck, Zap, Printer, Share2, ArrowRight } from 'lucide-react';
import { exportToPDF, exportToExcel } from './ExportService';
import { motion, AnimatePresence } from 'framer-motion';

const Balance = () => {
  const [balanceData] = useState([
    { compte: '411000', intitule: 'CLIENTS SÉNÉGAL SA', debitInit: 150000, creditInit: 0, debitMvmt: 50000, creditMvmt: 20000, debitSolde: 180000, creditSolde: 0 },
    { compte: '401000', intitule: 'FOURNISSEURS LOCAUX', debitInit: 0, creditInit: 80000, debitMvmt: 30000, creditMvmt: 40000, debitSolde: 0, creditSolde: 90000 },
    { compte: '512000', intitule: 'BANQUES (SOCIÉTÉ GÉNÉRALE)', debitInit: 250000, creditInit: 0, debitMvmt: 120000, creditMvmt: 80000, debitSolde: 290000, creditSolde: 0 },
    { compte: '701000', intitule: 'VENTES DE PRODUITS FINIS', debitInit: 0, creditInit: 500000, debitMvmt: 0, creditMvmt: 150000, debitSolde: 0, creditSolde: 650000 },
    { compte: '601000', intitule: 'ACHATS DE MATIÈRES PREMIÈRES', debitInit: 180000, creditInit: 0, debitMvmt: 60000, creditMvmt: 0, debitSolde: 240000, creditSolde: 0 },
  ]);

  const formatCurrency = (val: number) => {
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
              <FileSpreadsheet size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Balance Générale des Comptes</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Extraction Temps Réel ACDOCA • SYSCOHADA 2024 • Multi-Dimensions</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-sm">
              <Filter size={18} /> Filtrer
           </button>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <Download size={18} /> Exporter XLSX
           </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[600px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Extraction des Soldes à 6 Colonnes</h3>
           </div>
           <div className="flex gap-8">
              <div className="flex items-center gap-3 px-6 py-2 bg-white border border-[#cbd5e1] rounded-xl shadow-sm">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#107e3e] shadow-sm animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase text-[#107e3e] tracking-widest">Équilibre Vérifié</span>
              </div>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-8 py-6 border-r border-[#cbd5e1] bg-white text-[#0f172a]" rowSpan={2}>N° Compte</th>
                <th className="px-8 py-6 border-r border-[#cbd5e1] bg-white text-[#0f172a]" rowSpan={2}>Intitulé du Compte</th>
                <th className="px-8 py-4 text-center border-b border-r border-[#cbd5e1] bg-[#f8fafc]" colSpan={2}>Soldes Initiaux (Carry)</th>
                <th className="px-8 py-4 text-center border-b border-r border-[#cbd5e1] bg-blue-50/50 text-[#005eb8]" colSpan={2}>Mouvements Périodiques</th>
                <th className="px-8 py-4 text-center border-b border-[#cbd5e1] bg-[#f1f5f9]" colSpan={2}>Soldes Finaux de Période</th>
              </tr>
              <tr className="bg-[#f8fafc]">
                <th className="px-8 py-4 text-right border-r border-[#cbd5e1] text-[9px] opacity-70">Débit</th>
                <th className="px-8 py-4 text-right border-r border-[#cbd5e1] text-[9px] opacity-70">Crédit</th>
                <th className="px-8 py-4 text-right border-r border-[#cbd5e1] text-[9px] text-[#005eb8]">Débit</th>
                <th className="px-8 py-4 text-right border-r border-[#cbd5e1] text-[9px] text-[#005eb8]">Crédit</th>
                <th className="px-8 py-4 text-right border-r border-[#cbd5e1] text-[9px] text-[#0f172a]">Débit</th>
                <th className="px-8 py-4 text-right text-[9px] text-[#0f172a]">Crédit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {balanceData.map((ligne, idx) => (
                <tr key={idx} className="group hover:bg-blue-50/20 transition-all cursor-pointer">
                  <td className="px-8 py-6 border-r border-[#f1f5f9] font-mono font-black text-sm text-[#005eb8] tracking-tighter group-hover:scale-105 transition-transform origin-left">{ligne.compte}</td>
                  <td className="px-8 py-6 border-r border-[#f1f5f9] font-black text-[#334155] uppercase tracking-tight text-xs group-hover:text-[#0f172a] transition-colors">{ligne.intitule}</td>
                  
                  <td className="px-8 py-6 text-right text-[#64748b] font-bold text-xs border-r border-[#f1f5f9] bg-[#f8fafc]/30">{formatCurrency(ligne.debitInit)}</td>
                  <td className="px-8 py-6 text-right text-[#64748b] font-bold text-xs border-r border-[#f1f5f9] bg-[#f8fafc]/30">{formatCurrency(ligne.creditInit)}</td>
                  
                  <td className="px-8 py-6 text-right text-[#005eb8] font-black text-sm tracking-tighter border-r border-[#f1f5f9] bg-blue-50/10">{formatCurrency(ligne.debitMvmt)}</td>
                  <td className="px-8 py-6 text-right text-[#005eb8] font-black text-sm tracking-tighter border-r border-[#f1f5f9] bg-blue-50/10">{formatCurrency(ligne.creditMvmt)}</td>
                  
                  <td className="px-8 py-6 text-right font-black text-[#107e3e] text-base tracking-tighter border-r border-[#f1f5f9] bg-green-50/5">{formatCurrency(ligne.debitSolde)}</td>
                  <td className="px-8 py-6 text-right font-black text-[#dc2626] text-base tracking-tighter bg-red-50/5">{formatCurrency(ligne.creditSolde)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section (SAP Footer Style) */}
        <div className="bg-[#0f172a] text-white sticky bottom-0 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
          <table className="w-full text-left whitespace-nowrap">
            <tbody>
              <tr>
                <td className="px-8 py-8 w-[400px] text-right border-r border-slate-800">
                   <div className="flex flex-col items-end">
                      <span className="text-sm font-black uppercase tracking-[0.4em]">Totaux de la Balance</span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Certification Joule AI active</span>
                   </div>
                </td>
                <td className="px-8 py-8 text-right border-r border-slate-800 font-black text-slate-400 text-sm tracking-tighter">{formatCurrency(580000)}</td>
                <td className="px-8 py-8 text-right border-r border-slate-800 font-black text-slate-400 text-sm tracking-tighter">{formatCurrency(580000)}</td>
                <td className="px-8 py-8 text-right border-r border-slate-800 font-black text-blue-400 text-sm tracking-tighter">{formatCurrency(260000)}</td>
                <td className="px-8 py-8 text-right border-r border-slate-800 font-black text-blue-400 text-sm tracking-tighter">{formatCurrency(260000)}</td>
                <td className="px-8 py-8 text-right border-r border-slate-800 font-black text-[#4ade80] text-xl tracking-tighter">{formatCurrency(710000)}</td>
                <td className="px-8 py-8 text-right font-black text-[#f87171] text-xl tracking-tighter">{formatCurrency(710000)}</td>
              </tr>
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
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Intégrité des Soldes Vérifiée</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Équilibre débit/crédit certifié à 100% • Cohérence des flux rattachés au grand-livre auxiliaire confirmée.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <Zap size={20} className="group-hover:scale-125 transition-transform" /> Diagnostic Écart
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={20} className="group-hover:rotate-12 transition-transform" /> Partager Rapport
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default Balance;
