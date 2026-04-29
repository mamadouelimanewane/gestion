import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Search, Filter, Download, 
  ArrowUpDown, Layers, ChevronRight, Tag, 
  Target, Info, ExternalLink, Calendar,
  ShieldCheck, Eye, MoreHorizontal
} from 'lucide-react';

const UniversalJournal = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const lineItems = [
    { 
      id: 'L001', date: '2024-04-29', doc: 'AC-2024-001', account: '601100', 
      label: 'Achats de matières premières', amount: 2500000, type: 'Charge',
      costCenter: 'USINE-THIES', profitCenter: 'DPT-PROD', asset: null, status: 'Validé'
    },
    { 
      id: 'L002', date: '2024-04-29', doc: 'AC-2024-001', account: '401100', 
      label: 'Fournisseur ALPHA', amount: -2500000, type: 'Tiers',
      costCenter: null, profitCenter: null, asset: null, status: 'Validé'
    },
    { 
      id: 'L003', date: '2024-04-28', doc: 'IMM-2024-05', account: '241100', 
      label: 'Acquisition Véhicule Hilux', amount: 18500000, type: 'Immobilisation',
      costCenter: 'LOGISTIQUE', profitCenter: 'DPT-MKT', asset: 'VEH-001', status: 'En attente'
    },
    { 
      id: 'L004', date: '2024-04-27', doc: 'VE-2024-012', account: '701100', 
      label: 'Ventes produits finis', amount: -12500000, type: 'Produit',
      costCenter: null, profitCenter: 'DPT-COMM', asset: null, status: 'Validé'
    },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Universal Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-inner">
              <Database className="text-indigo-400" size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">Journal Universel (ACDOCA)</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Standard SAP S/4HANA • Single Source of Truth</p>
           </div>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              <Layers size={16} /> Dimensions
           </button>
           <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
              <Download size={16} /> Export S/4
           </button>
        </div>
      </div>

      {/* Multidimensional Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-800/30 p-6 rounded-[2rem] border border-slate-700/50 shadow-inner">
         <FilterGroup label="Période Fiscale" value="04.2024" icon={<Calendar size={14} />} />
         <FilterGroup label="Grand Livre" value="Comptabilité Locale (OL)" icon={<Database size={14} />} />
         <FilterGroup label="Périmètre Analytique" value="SÉNÉGAL_CORP" icon={<Target size={14} />} />
         <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 px-4 py-2 rounded-2xl shadow-inner group focus-within:border-indigo-500 transition-all">
            <Search size={16} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Filtre global..." 
              className="bg-transparent border-none outline-none text-xs w-full text-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      {/* The Universal Table */}
      <div className="bg-slate-800/20 rounded-[2.5rem] border border-slate-700/50 overflow-hidden shadow-2xl flex-1 flex flex-col">
         <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
            <div className="flex items-center gap-6">
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Lignes de pièces (Line Items)</span>
               <div className="h-4 w-px bg-slate-700"></div>
               <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Comptabilité Générale</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Comptabilité Analytique</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Immobilisations</span>
               </div>
            </div>
            <button className="text-xs font-black text-slate-400 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-all">
               <ArrowUpDown size={14} /> Trier par date
            </button>
         </div>

         <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-900 border-b border-slate-700 font-black uppercase text-[9px] tracking-[0.15em] text-slate-500 sticky top-0 z-10">
                  <tr>
                     <th className="p-6">Date / Pièce</th>
                     <th className="p-6">Compte G/L</th>
                     <th className="p-6">Désignation / Objet</th>
                     <th className="p-6 text-right">Montant (XOF)</th>
                     <th className="p-6">Centre de Coût</th>
                     <th className="p-6">Centre de Profit</th>
                     <th className="p-6 text-center">Statut</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-700/30">
                  {lineItems.map((item) => (
                    <tr key={item.id} className="group hover:bg-indigo-500/5 transition-all cursor-pointer">
                       <td className="p-6">
                          <div className="flex flex-col">
                             <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.date}</span>
                             <span className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">{item.doc}</span>
                          </div>
                       </td>
                       <td className="p-6">
                          <span className="font-mono text-xs font-black text-indigo-400 bg-indigo-500/5 px-2 py-1 rounded-lg border border-indigo-500/10">{item.account}</span>
                       </td>
                       <td className="p-6">
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-slate-200">{item.label}</span>
                             <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded border ${
                                   item.type === 'Charge' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' :
                                   item.type === 'Produit' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                   'bg-slate-800 border-slate-700 text-slate-500'
                                }`}>
                                   {item.type}
                                </span>
                                {item.asset && (
                                   <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                      Asset: {item.asset}
                                   </span>
                                )}
                             </div>
                          </div>
                       </td>
                       <td className="p-6 text-right">
                          <span className={`text-sm font-black ${item.amount > 0 ? 'text-white' : 'text-slate-400'}`}>
                             {Math.abs(item.amount).toLocaleString()} <span className="text-[10px] font-bold">{item.amount > 0 ? 'D' : 'C'}</span>
                          </span>
                       </td>
                       <td className="p-6">
                          {item.costCenter ? (
                             <span className="text-[10px] font-black text-amber-500/80 bg-amber-500/5 px-2 py-1 rounded-lg border border-amber-500/20 uppercase tracking-widest">{item.costCenter}</span>
                          ) : <span className="text-[10px] text-slate-700">—</span>}
                       </td>
                       <td className="p-6">
                          {item.profitCenter ? (
                             <span className="text-[10px] font-black text-indigo-400/80 bg-indigo-500/5 px-2 py-1 rounded-lg border border-indigo-500/20 uppercase tracking-widest">{item.profitCenter}</span>
                          ) : <span className="text-[10px] text-slate-700">—</span>}
                       </td>
                       <td className="p-6 text-center">
                          <div className="flex items-center justify-center gap-3">
                             <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                item.status === 'Validé' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                             }`}>
                                {item.status}
                             </span>
                             <button className="p-2 text-slate-600 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                                <MoreHorizontal size={16} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* AI Integrity & Footer */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 px-4">
         <div className="flex items-center gap-3">
            <ShieldCheck className="text-emerald-500" size={20} />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
               Audit Trail Immuable • Hash SHA-256 : <span className="text-slate-400 font-mono">8f2e...4d1c</span> • Intégrité Totale
            </p>
         </div>
         <div className="flex gap-4">
            <button className="flex items-center gap-2 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
               <Eye size={14} /> Voir Paramétrage Table
            </button>
            <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-[10px] font-black uppercase tracking-widest transition-all">
               <ExternalLink size={14} /> Réconciliation Globale
            </button>
         </div>
      </div>
    </div>
  );
};

const FilterGroup = ({ label, value, icon }: any) => (
  <div className="flex flex-col gap-2">
     <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] ml-2">{label}</label>
     <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-700 rounded-2xl px-4 py-2.5 hover:border-indigo-500/50 transition-all cursor-pointer group shadow-inner">
        <div className="text-slate-500 group-hover:text-indigo-400 transition-colors">{icon}</div>
        <span className="text-xs font-bold text-slate-200">{value}</span>
     </div>
  </div>
);

export default UniversalJournal;
