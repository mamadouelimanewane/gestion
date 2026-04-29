import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Calendar, Percent, TrendingUp, 
  Plus, Download, Info, CheckCircle2, 
  AlertTriangle, History, ShieldCheck, 
  Building2, Key, Clock, DollarSign
} from 'lucide-react';

const LeaseManagement = () => {
  const [activeTab, setActiveTab] = useState<'contracts' | 'schedules' | 'compliance'>('contracts');

  const contracts = [
    { id: 'LEASE-2024-001', vendor: 'IMMOBILIER DAKAR SA', type: 'Bureau Thies', start: '2024-01-01', end: '2028-12-31', payment: 2500000, rate: '4.5%', rou: 135000000, liability: 135000000, status: 'Actif' },
    { id: 'LEASE-2024-002', vendor: 'LOGISTIC SN', type: 'Entrepôt Diamniadio', start: '2024-03-01', end: '2026-02-28', payment: 4800000, rate: '5.2%', rou: 110000000, liability: 110000000, status: 'Actif' },
    { id: 'LEASE-2023-045', vendor: 'HERTZ SN', type: 'Flotte Véhicules (10)', start: '2023-06-01', end: '2025-05-31', payment: 12500000, rate: '3.8%', rou: 280000000, liability: 150000000, status: 'En révision' },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Lease Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-inner text-indigo-400">
              <Building2 size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Gestion des Baux & IFRS 16</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Actifs de Droit d'Usage (ROU) • Dettes de Location</p>
           </div>
        </div>
        <div className="flex gap-3 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
           {[
             { id: 'contracts', label: 'Contrats', icon: FileText },
             { id: 'schedules', label: 'Échéanciers', icon: Calendar },
             { id: 'compliance', label: 'Conformité', icon: ShieldCheck },
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
               }`}
             >
                <tab.icon size={14} />
                {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* IFRS 16 KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <StatCard title="Valeur Brute ROU" value="525 000 000 F" sub="Actifs Droit d'Usage" color="indigo" />
         <StatCard title="Dette de Location" value="395 000 000 F" sub="Passif Courant/Non-Courant" color="rose" />
         <StatCard title="Amortissement Mensuel" value="8 750 000 F" sub="Impact Dotation" color="emerald" />
         <StatCard title="Taux d'Intérêt Moyen" value="4.5 %" sub="Taux d'Endettement Marg." color="amber" />
      </div>

      {/* Main Registry */}
      <div className="card bg-slate-800/20 border-slate-700/50 flex flex-col flex-1 overflow-hidden shadow-2xl">
         <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
            <div className="flex items-center gap-4">
               <h4 className="text-xs font-black uppercase tracking-widest text-white">Registre des Engagements de Location</h4>
               <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest">3 Contrats Actifs</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
               <Plus size={16} /> Nouveau Contrat
            </button>
         </div>

         <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-900 border-b border-slate-700 font-black uppercase text-[9px] tracking-widest text-slate-500">
                  <tr>
                     <th className="p-6">ID Contrat / Type</th>
                     <th className="p-6">Bailleur (Vendor)</th>
                     <th className="p-6">Validité</th>
                     <th className="p-6 text-right">Loyer Mensuel</th>
                     <th className="p-6 text-right">Valeur ROU</th>
                     <th className="p-6 text-center">Taux</th>
                     <th className="p-6 text-center">Statut</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-700/30">
                  {contracts.map((c) => (
                    <tr key={c.id} className="group hover:bg-indigo-500/5 transition-all cursor-pointer">
                       <td className="p-6">
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-wide">{c.type}</span>
                             <span className="text-[9px] text-slate-500 font-black uppercase mt-1 tracking-tighter">{c.id}</span>
                          </div>
                       </td>
                       <td className="p-6 text-xs font-bold text-slate-400">
                          {c.vendor}
                       </td>
                       <td className="p-6">
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-300">
                             <Calendar size={12} className="text-slate-500" />
                             {c.start} <ArrowRight className="text-slate-600" size={10} /> {c.end}
                          </div>
                       </td>
                       <td className="p-6 text-right font-bold text-slate-300">
                          {c.payment.toLocaleString()} F
                       </td>
                       <td className="p-6 text-right font-black text-indigo-400">
                          {c.rou.toLocaleString()} F
                       </td>
                       <td className="p-6 text-center">
                          <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-black text-amber-400">{c.rate}</span>
                       </td>
                       <td className="p-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                             c.status === 'Actif' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                          }`}>
                             {c.status}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* IFRS 16 Automated Disclosure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="card bg-slate-800/20 border-slate-700/50 p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-emerald-500">
               <ShieldCheck size={80} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Échéancier IFRS 16 - Décomposition Mensuelle</h4>
            <div className="space-y-4">
               {[
                 { label: "Amortissement du ROU", value: "8 750 000 F", icon: <TrendingDown size={14} className="text-rose-400" /> },
                 { label: "Charges d'Intérêts (Dette)", value: "1 250 000 F", icon: <Percent size={14} className="text-amber-400" /> },
                 { label: "Paiement de Location (Cash)", value: "10 000 000 F", icon: <DollarSign size={14} className="text-emerald-400" /> },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700/50 rounded-2xl">
                    <div className="flex items-center gap-3">
                       {item.icon}
                       <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">{item.label}</span>
                    </div>
                    <span className="text-sm font-black text-white">{item.value}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="card bg-slate-800/20 border-slate-700/50 p-8 flex flex-col gap-6 shadow-2xl">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Notes aux États Financiers (Disclosures)</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic border-l-2 border-indigo-500 pl-4 py-2 bg-indigo-500/5">
               "Les contrats de location sont comptabilisés comme des actifs de droit d'utilisation et des passifs de location correspondants à la date à laquelle l'actif loué est disponible pour utilisation par le Groupe..."
            </p>
            <div className="flex gap-4">
               <button className="flex-1 py-3 bg-slate-900 border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                  <Download size={14} className="inline mr-2" /> Rapport Annuel IFRS
               </button>
               <button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  <CheckCircle2 size={14} className="inline mr-2" /> Valider Écritures
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, sub, color }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden shadow-xl border-slate-700/50 p-8">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-3">{title}</p>
    <h3 className="text-2xl font-black text-white group-hover:text-white transition-colors">{value}</h3>
    <p className="text-[9px] font-bold text-slate-600 uppercase mt-2 tracking-tighter">{sub}</p>
  </div>
);

const ArrowRight = ({ className, size }: any) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);

const TrendingDown = ({ className, size }: any) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m23 18-9.5-9.5-5 5L1 6"/><path d="M17 18h6v-6"/></svg>
);

export default LeaseManagement;
