import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Search, Filter, Download, 
  ArrowUpDown, Layers, ChevronRight, Tag, 
  Target, Info, ExternalLink, Calendar,
  ShieldCheck, Eye, MoreHorizontal, Sparkles,
  Zap, FileCheck, History, ArrowRight, Printer, Share2
} from 'lucide-react';

const UniversalJournal = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const lineItems = [
    { 
      id: 'L001', date: '29/04/2024', doc: 'AC-2024-001', account: '601100', 
      label: 'ACHATS DE MATIÈRES PREMIÈRES (CACAO)', amount: 2500000, type: 'Charge',
      costCenter: 'USINE-THIES', profitCenter: 'DPT-PROD', asset: null, status: 'Validé'
    },
    { 
      id: 'L002', date: '29/04/2024', doc: 'AC-2024-001', account: '401100', 
      label: 'FOURNISSEUR ALPHA SÉNÉGAL SA', amount: -2500000, type: 'Tiers',
      costCenter: null, profitCenter: null, asset: null, status: 'Validé'
    },
    { 
      id: 'L003', date: '28/04/2024', doc: 'IMM-2024-05', account: '241100', 
      label: 'ACQUISITION VÉHICULE HILUX 4X4 (LOG)', amount: 18500000, type: 'Immo',
      costCenter: 'LOGISTIQUE-DNR', profitCenter: 'DPT-ADMIN', asset: 'VEH-001', status: 'En attente'
    },
    { 
      id: 'L004', date: '27/04/2024', doc: 'VE-2024-012', account: '701100', 
      label: 'VENTES PRODUITS FINIS (EXPORT ZONE A)', amount: -12500000, type: 'Produit',
      costCenter: null, profitCenter: 'DPT-COMM', asset: null, status: 'Validé'
    },
  ];

  const formatCfa = (val: number) => {
    return Math.abs(val).toLocaleString('fr-FR') + ' F';
  };

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <Database size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Journal Universel (ACDOCA)</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Single Source of Truth • Dimensions Analytiques • S/4HANA Core</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-sm">
              <Layers size={18} /> Dimensions
           </button>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <Download size={18} /> Exportation Rapport
           </button>
        </div>
      </div>

      {/* Multidimensional Filters Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-[#f8fafc] p-8 rounded-2xl border border-[#cbd5e1] shadow-inner">
         <FilterGroup label="Période Fiscale Active" value="04.2024 / Q2" icon={<Calendar size={20} />} />
         <FilterGroup label="Grand Livre Ledger" value="0L (Normes Locales)" icon={<Database size={20} />} />
         <FilterGroup label="Périmètre de Consolidation" value="GLOBAL_SÉNÉGAL_CORP" icon={<Target size={20} />} />
         <div className="flex flex-col gap-4">
            <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.3em] px-1">Moteur de Recherche Global</label>
            <div className="flex items-center gap-4 bg-white border border-[#cbd5e1] px-6 py-3 rounded-xl shadow-sm group focus-within:border-[#005eb8] transition-all">
               <Search size={20} className="text-[#cbd5e1] group-focus-within:text-[#005eb8] transition-colors" />
               <input 
                 type="text" 
                 placeholder="Pièce, compte, tiers..." 
                 className="bg-transparent border-none outline-none text-xs w-full text-[#334155] font-black uppercase tracking-tight placeholder:text-[#cbd5e1]"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>
      </div>

      {/* Main Grid Container */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex-1 flex flex-col min-h-[600px]">
         <div className="p-8 bg-[#f8fafc] border-b border-[#cbd5e1] flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                     <Zap size={24} />
                  </div>
                  <span className="text-[13px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Postes Individuels du Journal</span>
               </div>
               <div className="h-8 w-px bg-[#cbd5e1] hidden md:block"></div>
               <div className="flex flex-wrap items-center gap-8 text-[10px] font-black text-[#64748b] uppercase tracking-[0.3em]">
                  <span className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-[#107e3e] shadow-sm"></div> FI (Finance)</span>
                  <span className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-[#ea580c] shadow-sm"></div> CO (Contrôle)</span>
                  <span className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-[#005eb8] shadow-sm"></div> AA (Immo)</span>
               </div>
            </div>
            <div className="flex gap-4">
               <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#005eb8] shadow-sm transition-all"><Printer size={18} /></button>
               <button className="text-[10px] font-black text-[#64748b] hover:text-[#005eb8] uppercase tracking-[0.3em] flex items-center gap-3 transition-all bg-white border border-[#cbd5e1] px-6 py-3 rounded-xl shadow-sm group">
                  <ArrowUpDown size={18} className="group-hover:rotate-180 transition-transform" /> Tri Chronologique
               </button>
            </div>
         </div>

         <div className="flex-1 overflow-auto">
            <table className="w-full text-left whitespace-nowrap border-collapse">
               <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] font-black uppercase text-[10px] tracking-[0.3em] text-[#64748b] sticky top-0 z-20 shadow-sm">
                  <tr>
                     <th className="px-10 py-6">Date / Référence ERP</th>
                     <th className="px-10 py-6 text-center">Compte G/L</th>
                     <th className="px-10 py-6">Désignation de l'Objet Flux</th>
                     <th className="px-10 py-6 text-right">Montant (XOF)</th>
                     <th className="px-10 py-6 text-center">Analytique (CO)</th>
                     <th className="px-10 py-6 text-center">Centre Profit</th>
                     <th className="px-10 py-6 text-right">Statut</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#f1f5f9]">
                  {lineItems.map((item) => (
                    <tr key={item.id} className="group hover:bg-blue-50/20 transition-all cursor-pointer">
                       <td className="px-10 py-6 border-r border-[#f1f5f9]">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mb-1.5">{item.date}</span>
                             <span className="text-xs font-black text-[#005eb8] group-hover:underline tracking-tight uppercase leading-none">{item.doc}</span>
                          </div>
                       </td>
                       <td className="px-10 py-6 border-r border-[#f1f5f9] text-center">
                          <span className="font-mono text-sm font-black text-[#005eb8] bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 shadow-inner group-hover:bg-white transition-colors">{item.account}</span>
                       </td>
                       <td className="px-10 py-6 border-r border-[#f1f5f9]">
                          <div className="flex flex-col gap-2.5">
                             <span className="text-xs font-black text-[#334155] uppercase tracking-tight group-hover:text-[#0f172a] transition-colors">{item.label}</span>
                             <div className="flex items-center gap-3">
                                <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-[2rem] border shadow-sm ${
                                   item.type === 'Charge' ? 'bg-red-50 border-red-200 text-[#dc2626]' :
                                   item.type === 'Produit' ? 'bg-green-50 border-green-200 text-[#107e3e]' :
                                   item.type === 'Immo' ? 'bg-blue-50 border-blue-200 text-[#005eb8]' :
                                   'bg-[#f8fafc] border-[#cbd5e1] text-[#64748b]'
                                }`}>
                                   {item.type}
                                </span>
                                {item.asset && (
                                   <span className="text-[9px] font-black uppercase px-3 py-1 rounded-[2rem] bg-blue-50 border border-blue-100 text-[#005eb8] shadow-sm flex items-center gap-2">
                                      <Tag size={10} /> ASSET: {item.asset}
                                   </span>
                                )}
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-6 text-right border-r border-[#f1f5f9]">
                          <div className="flex flex-col items-end">
                             <span className={`text-lg font-black tracking-tighter ${item.amount > 0 ? 'text-[#0f172a]' : 'text-[#64748b]'}`}>
                                {formatCfa(item.amount)}
                             </span>
                             <span className={`text-[9px] font-black uppercase tracking-[0.3em] mt-1 ${item.amount > 0 ? 'text-[#107e3e]' : 'text-[#dc2626]'}`}>
                                {item.amount > 0 ? 'Débit (S)' : 'Crédit (H)'}
                             </span>
                          </div>
                       </td>
                       <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                          {item.costCenter ? (
                             <span className="text-[10px] font-black text-orange-700 bg-orange-50 px-5 py-2 rounded-[2rem] border border-orange-200 uppercase tracking-widest shadow-sm">{item.costCenter}</span>
                          ) : <span className="text-[10px] text-[#cbd5e1] font-black">—</span>}
                       </td>
                       <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                          {item.profitCenter ? (
                             <span className="text-[10px] font-black text-[#005eb8] bg-blue-50 px-5 py-2 rounded-[2rem] border border-blue-200 uppercase tracking-widest shadow-sm">{item.profitCenter}</span>
                          ) : <span className="text-[10px] text-[#cbd5e1] font-black">—</span>}
                       </td>
                       <td className="px-10 py-6 text-right">
                          <div className="flex items-center justify-end gap-4">
                             <span className={`px-4 py-2 rounded-[2rem] border text-[9px] font-black uppercase tracking-widest shadow-sm ${
                                item.status === 'Validé' ? 'bg-green-50 border-green-200 text-[#107e3e]' : 'bg-orange-50 border-orange-200 text-orange-600'
                             }`}>
                                {item.status}
                             </span>
                             <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#0f172a] shadow-sm transition-all opacity-0 group-hover:opacity-100">
                                <MoreHorizontal size={20} />
                             </button>
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
         <div className="flex items-center gap-8">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={32} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Piste d'Audit Universelle (ACDOCA) Active</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic leading-relaxed">
                  Hash SHA-256 Intégrité : <span className="text-[#334155] font-mono select-all bg-white px-2 py-0.5 rounded border border-[#cbd5e1] mx-2">8f2e91a0-4d1c9e82-af22-005eb8</span> • Certifié par Joule AI Auditor.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-4 text-[#64748b] hover:text-[#005eb8] text-[10px] font-black uppercase tracking-[0.4em] transition-all group">
               <History size={22} className="group-hover:rotate-[-45deg] transition-transform" /> Journal Logs
            </button>
            <button className="flex items-center gap-4 text-[#005eb8] hover:text-[#004080] text-[10px] font-black uppercase tracking-[0.5em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={22} className="group-hover:rotate-12 transition-transform" /> Reconciliation
               <ArrowRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

const FilterGroup = ({ label, value, icon }: any) => (
  <div className="flex flex-col gap-4">
     <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.3em] px-1">{label}</label>
     <div className="flex items-center gap-5 bg-white border border-[#cbd5e1] rounded-2xl px-6 py-4 hover:border-[#005eb8] hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer group shadow-sm">
        <div className="text-[#cbd5e1] group-hover:text-[#005eb8] group-hover:scale-110 transition-all">{icon}</div>
        <span className="text-[11px] font-black text-[#334155] uppercase tracking-tight leading-none">{value}</span>
        <ChevronRight size={16} className="ml-auto text-[#cbd5e1] group-hover:text-[#005eb8] transition-colors" />
     </div>
  </div>
);

export default UniversalJournal;
