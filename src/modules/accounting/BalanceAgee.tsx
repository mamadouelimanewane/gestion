import React, { useState } from 'react';
import { Search, Filter, Printer, Download, Clock, Database, Layers, ShieldCheck, Zap, MoreVertical, ChevronRight, History, Share2, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BalanceAgee = () => {
  const [data] = useState([
    { compte: '4110001', tiers: 'CLIENT ALPHA SÉNÉGAL SA', nonEchu: 1180000, retard30: 0, retard60: 450000, retard90: 0, total: 1630000 },
    { compte: '4110002', tiers: 'CLIENT BETA LOGISTICS SARL', nonEchu: 850000, retard30: 250000, retard60: 0, retard90: 125000, total: 1225000 },
    { compte: '4110005', tiers: 'ETABLISSEMENTS DIOP & FILS', nonEchu: 3200000, retard30: 0, retard60: 0, retard90: 0, total: 3200000 },
    { compte: '4110009', tiers: 'SARL SUNU TELECOM', nonEchu: 0, retard30: 0, retard60: 0, retard90: 125000, total: 125000 },
  ]);

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
              <Clock size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Balance Âgée Clients (AR Aging)</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Analyse de l'ancienneté des créances • Risque Client • S/4 Integration</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-sm">
              <Printer size={18} /> Imprimer État
           </button>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <Download size={18} /> Exporter Excel
           </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[500px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100 shadow-inner">
                 <AlertTriangle size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Ventilation Chronologique des Créances</h3>
           </div>
           <div className="flex gap-6">
              <div className="relative group w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cbd5e1]" size={16} />
                <input type="text" placeholder="Chercher un tiers..." className="w-full pl-10 pr-4 py-2 bg-white border border-[#cbd5e1] rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-amber-500 shadow-inner" />
              </div>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-6">N° Compte / Tiers Institutionnel</th>
                <th className="px-10 py-6 text-right">Postes Non Échus</th>
                <th className="px-10 py-6 text-right">Retard &lt; 30j</th>
                <th className="px-10 py-6 text-right">Retard 30-60j</th>
                <th className="px-10 py-6 text-right">Retard &gt; 90j</th>
                <th className="px-10 py-6 text-right bg-blue-50/30 text-[#005eb8]">Solde Total (XOF)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {data.map((item, idx) => (
                <tr key={idx} className="group hover:bg-amber-50/10 transition-all cursor-pointer">
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                    <div className="flex flex-col">
                       <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover:text-amber-600 transition-colors">{item.tiers}</span>
                       <span className="text-[9px] font-mono font-bold text-[#94a3b8] tracking-widest mt-1 uppercase">COMPTE : {item.compte}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-[#107e3e] text-sm tracking-tighter">
                     {item.nonEchu > 0 ? formatCfa(item.nonEchu) : '—'}
                  </td>
                  <td className={`px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-sm tracking-tighter ${item.retard30 > 0 ? 'text-amber-600 bg-amber-50/5' : 'text-[#cbd5e1]'}`}>
                     {item.retard30 > 0 ? formatCfa(item.retard30) : '—'}
                  </td>
                  <td className={`px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-sm tracking-tighter ${item.retard60 > 0 ? 'text-[#ea580c] bg-orange-50/5' : 'text-[#cbd5e1]'}`}>
                     {item.retard60 > 0 ? formatCfa(item.retard60) : '—'}
                  </td>
                  <td className={`px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-sm tracking-tighter ${item.retard90 > 0 ? 'text-[#dc2626] bg-red-50/5' : 'text-[#cbd5e1]'}`}>
                     {item.retard90 > 0 ? formatCfa(item.retard90) : '—'}
                  </td>
                  <td className="px-10 py-6 text-right font-black text-[#005eb8] text-base tracking-tighter bg-blue-50/5 group-hover:bg-blue-50/10">
                     {formatCfa(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#0f172a] text-white sticky bottom-0 z-30">
              <tr className="font-black uppercase text-[11px] tracking-[0.2em]">
                <td className="px-10 py-8 text-slate-500">Totalisation Consolidée</td>
                <td className="px-10 py-8 text-right text-[#107e3e] text-lg tracking-tighter">5 230 000 <span className="text-[10px] opacity-30">F</span></td>
                <td className="px-10 py-8 text-right text-amber-400 text-lg tracking-tighter">250 000 <span className="text-[10px] opacity-30">F</span></td>
                <td className="px-10 py-8 text-right text-[#ea580c] text-lg tracking-tighter">450 000 <span className="text-[10px] opacity-30">F</span></td>
                <td className="px-10 py-8 text-right text-[#dc2626] text-lg tracking-tighter">250 000 <span className="text-[10px] opacity-30">F</span></td>
                <td className="px-10 py-8 text-right text-[#005eb8] text-2xl tracking-tighter bg-[#1e293b]">6 180 000 <span className="text-[10px] opacity-30">F</span></td>
              </tr>
            </tfoot>
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
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Analyse de Risque Client Certifiée</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Les données d'ancienneté sont synchronisées en temps réel avec le Journal Universel ACDOCA • Joule AI Credit Scoring.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <History size={20} className="group-hover:rotate-[-45deg] transition-transform" /> Journal de Relance
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={20} className="group-hover:rotate-12 transition-transform" /> Envoyer Relevés
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default BalanceAgee;
