import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Calculator, History, Plus, 
  Search, Filter, ChevronRight, ArrowUpRight,
  TrendingDown, Calendar, FileText, Settings,
  Database, ShieldCheck, Download, Trash2,
  Edit3, BarChart3, Layout, Layers
} from 'lucide-react';

const FixedAssetsModule = () => {
  const [activeTab, setActiveTab] = useState<'registry' | 'depreciation' | 'acquisition' | 'reporting'>('registry');

  const tabs = [
    { id: 'registry', label: 'Registre des Immo', icon: Building2 },
    { id: 'depreciation', label: 'Amortissements', icon: Calculator },
    { id: 'acquisition', label: 'Acquisitions & Cessions', icon: Plus },
    { id: 'reporting', label: 'États Réglementaires', icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Asset Header */}
      <div className="flex justify-between items-center bg-slate-800/20 border border-slate-700/50 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
               <Building2 size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1">Gestion des Immobilisations (FI-AA)</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">Actifs Immobilisés • Amortissements SYSCOHADA • Inventaire Physique</p>
            </div>
         </div>
         <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50 relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                 <tab.icon size={14} />
                 {tab.label}
              </button>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'registry' && (
           <motion.div 
             key="registry"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col gap-6"
           >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <AssetStatCard label="Valeur Brute Totale" value="842.5M F" trend="+12.5%" color="indigo" />
                 <AssetStatCard label="Amortissements Cumulés" value="215.8M F" trend="+8.2%" color="amber" />
                 <AssetStatCard label="Valeur Nette (VNC)" value="626.7M F" trend="-2.4%" color="emerald" />
                 <AssetStatCard label="Nombre d'Actifs" value="124" trend="+3" color="indigo" />
              </div>

              <div className="flex justify-between items-center px-4">
                 <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input type="text" placeholder="Rechercher une immobilisation..." className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all shadow-inner" />
                 </div>
                 <button className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
                    <Plus size={16} /> Créer Actif
                 </button>
              </div>

              <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
                 <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                       <tr>
                          <th className="p-6">Référence / Désignation</th>
                          <th className="p-6">Compte Immo</th>
                          <th className="p-6">Date Mise en Service</th>
                          <th className="p-6">Valeur d'Acquisition</th>
                          <th className="p-6">Amortissement Cumulé</th>
                          <th className="p-6">VNC</th>
                          <th className="p-6 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30 font-mono text-[11px]">
                       <AssetRow ref="IMMO-2024-001" name="Machine d'Extrusion Plastique" account="241100" date="01/01/2024" value="125 000 000" cumul="0" vnc="125 000 000" />
                       <AssetRow ref="IMMO-2022-042" name="Camion Logistique 15T" account="245100" date="15/06/2022" value="45 000 000" cumul="18 000 000" vnc="27 000 000" />
                       <AssetRow ref="IMMO-2023-015" name="Serveur Datacenter" account="244300" date="10/02/2023" value="12 500 000" cumul="4 166 667" vnc="8 333 333" />
                       <AssetRow ref="IMMO-2021-088" name="Mobilier de Bureau" account="244400" date="01/01/2021" value="8 400 000" cumul="5 600 000" vnc="2 800 000" />
                    </tbody>
                 </table>
              </div>
           </motion.div>
         )}

         {activeTab === 'depreciation' && (
           <motion.div 
             key="depreciation"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-8"
           >
              <div className="card bg-slate-800/20 border-slate-700/50 p-10 shadow-2xl flex flex-col gap-8">
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Calcul des Amortissements</h4>
                 <div className="grid grid-cols-2 gap-6">
                    <DepreciationParam label="Période" value="Mensuelle" />
                    <DepreciationParam label="Mode" value="Linéaire / Dégressif" />
                    <DepreciationParam label="Dernier Calcul" value="31/03/2024" />
                    <DepreciationParam label="Statut" value="À jour" color="emerald" />
                 </div>
                 <div className="p-6 bg-indigo-600/5 border border-indigo-500/20 rounded-2xl flex flex-col gap-4">
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                       Prochain passage des écritures d'amortissement prévu pour le **30/04/2024**. Montant estimé : **12 450 000 F**.
                    </p>
                    <button className="w-full py-4 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">
                       Lancer le calcul (AFAB)
                    </button>
                 </div>
              </div>

              <div className="card bg-slate-800/20 border-slate-700/50 p-10 shadow-2xl">
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Tableau de Bord Prévisionnel</h4>
                 <div className="space-y-6">
                    <PredictiveBar label="2024" value="149.4M F" percent={100} />
                    <PredictiveBar label="2025" value="132.8M F" percent={88} />
                    <PredictiveBar label="2026" value="115.2M F" percent={77} />
                    <PredictiveBar label="2027" value="98.5M F" percent={65} />
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'reporting' && (
           <motion.div 
             key="reporting"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
           >
              <ReportCard title="Tableau 3 : Immobilisations" desc="État réglementaire SYSCOHADA des mouvements de l'exercice." icon={<Layers size={24} />} />
              <ReportCard title="Tableau 4 : Amortissements" desc="Détail des dotations et amortissements cumulés par catégorie." icon={<Calculator size={24} />} />
              <ReportCard title="Fiches d'Immobilisation" desc="Édition groupée des fiches individuelles avec QR Code d'inventaire." icon={<FileText size={24} />} />
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const AssetStatCard = ({ label, value, trend, color }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all p-8 shadow-xl border-slate-700/50 relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest leading-none mb-4">{label}</p>
    <h3 className="text-xl font-black text-white">{value}</h3>
    <p className="text-[9px] font-bold text-emerald-400 uppercase mt-2 tracking-tighter flex items-center gap-1">
       <ArrowUpRight size={10} /> {trend}
    </p>
  </div>
);

const AssetRow = ({ ref, name, account, date, value, cumul, vnc }: any) => (
  <tr className="hover:bg-indigo-600/5 transition-all group cursor-pointer">
     <td className="p-6">
        <div className="flex flex-col">
           <span className="text-xs font-black text-white uppercase group-hover:text-indigo-400 transition-colors">{name}</span>
           <span className="text-[9px] text-slate-500 font-bold tracking-widest">{ref}</span>
        </div>
     </td>
     <td className="p-6 text-slate-400 font-black">{account}</td>
     <td className="p-6 text-slate-500">{date}</td>
     <td className="p-6 text-white font-black">{value} F</td>
     <td className="p-6 text-rose-400">{cumul} F</td>
     <td className="p-6 text-emerald-400 font-black">{vnc} F</td>
     <td className="p-6 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
           <button className="p-2 text-slate-500 hover:text-white"><Edit3 size={16} /></button>
           <button className="p-2 text-slate-500 hover:text-rose-400"><Trash2 size={16} /></button>
        </div>
     </td>
  </tr>
);

const DepreciationParam = ({ label, value, color }: any) => (
  <div className="flex flex-col gap-1 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner">
     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
     <span className={`text-xs font-black uppercase tracking-tighter ${color === 'emerald' ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
  </div>
);

const PredictiveBar = ({ label, value, percent }: any) => (
  <div className="flex flex-col gap-2">
     <div className="flex justify-between items-end">
        <span className="text-[10px] font-black text-slate-500 uppercase">{label}</span>
        <span className="text-[11px] font-black text-white">{value}</span>
     </div>
     <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-indigo-500 shadow-lg shadow-indigo-600/20"
        />
     </div>
  </div>
);

const ReportCard = ({ title, desc, icon }: any) => (
  <div className="card p-8 group hover:border-indigo-500/30 transition-all shadow-xl border-slate-700/50 flex flex-col gap-6 cursor-pointer">
     <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
        {icon}
     </div>
     <div>
        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{desc}</p>
     </div>
     <button className="mt-auto flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-indigo-400 group-hover:translate-x-2 transition-transform">
        Générer <Download size={14} />
     </button>
  </div>
);

export default FixedAssetsModule;
