import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, Settings, PieChart, TrendingDown, 
  TrendingUp, Activity, BarChart3, Database,
  Cpu, Zap, Layers, Share2, Info, ChevronRight,
  Target, AlertTriangle, CheckCircle2, Box
} from 'lucide-react';

const IndustrialCosting = () => {
  const [activeTab, setActiveTab] = useState<'centers' | 'calculation' | 'performance'>('centers');

  const costCenters = [
    { id: 'CC-PROD-01', label: 'Atelier Assemblage', type: 'Production', direct: 45800000, indirect: 12500000, total: 58300000, trend: '+5%' },
    { id: 'CC-MAINT-02', label: 'Service Maintenance', type: 'Support', direct: 8200000, indirect: 4500000, total: 12700000, trend: '-2%' },
    { id: 'CC-QUAL-03', label: 'Contrôle Qualité', type: 'Qualité', direct: 5400000, indirect: 2100000, total: 7500000, trend: 'Stable' },
    { id: 'CC-ENERG-04', label: 'Energie & Fluides', type: 'Support', direct: 15600000, indirect: 0, total: 15600000, trend: '+12%' },
  ];

  const productCosts = [
    { id: 'P-882', label: 'Unité Industrielle A', directMat: 12500, directLabor: 4500, overhead: 3200, total: 20200, target: 19500, variance: '+3.5%' },
    { id: 'P-901', label: 'Unité Industrielle B', directMat: 8900, directLabor: 3200, overhead: 2100, total: 14200, target: 14500, variance: '-2.1%' },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Industrial Costing Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-inner text-amber-400">
              <Factory size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Contrôle de Gestion Industriel (CO-PC)</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Analyse des Coûts de Revient • Centres de Profit • SAP-Standards</p>
           </div>
        </div>
        <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
           {[
             { id: 'centers', label: 'Centres de Coûts', icon: Layers },
             { id: 'calculation', label: 'Coût de Revient', icon: Target },
             { id: 'performance', label: 'Performance (KPI)', icon: Activity },
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab.id ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:text-white'
               }`}
             >
                <tab.icon size={14} />
                {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <CostStatCard title="Total Coûts Production" value="94 100 000 F" sub="Vs Budget : 90M" color="amber" trend="+4.5%" />
         <CostStatCard title="Coût Moyen par Unité" value="17 200 F" sub="Optimisation IA Joule" color="emerald" trend="-1.2%" />
         <CostStatCard title="Écart sur Matières" value="+2 450 000 F" sub="Variation Prix/Volume" color="rose" trend="Critique" />
         <CostStatCard title="Absorption Overhead" value="98.2 %" sub="Taux d'Activité" color="indigo" trend="Optimal" />
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'centers' && (
           <motion.div 
             key="centers"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 card bg-slate-800/20 border-slate-700/50 flex flex-col overflow-hidden shadow-2xl">
                 <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Hiérarchie des Centres de Coûts (KS03)</h4>
                    <button className="text-[10px] font-black text-amber-400 uppercase flex items-center gap-2">
                       <Share2 size={14} /> Répartition Secondaire
                    </button>
                 </div>
                 <div className="overflow-auto">
                    <table className="w-full text-left">
                       <thead className="bg-slate-900/50 text-[9px] font-black uppercase text-slate-500 tracking-widest">
                          <tr>
                             <th className="p-6">Centre / Type</th>
                             <th className="p-6 text-right">Coûts Directs</th>
                             <th className="p-6 text-right">Coûts Imputés</th>
                             <th className="p-6 text-right">Total Consolidé</th>
                             <th className="p-6 text-center">Trend</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-700/30">
                          {costCenters.map((cc) => (
                            <tr key={cc.id} className="group hover:bg-amber-500/5 transition-all cursor-pointer">
                               <td className="p-6">
                                  <div className="flex flex-col">
                                     <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-wide">{cc.label}</span>
                                     <span className="text-[9px] text-slate-500 font-black uppercase mt-1">{cc.id} • {cc.type}</span>
                                  </div>
                               </td>
                               <td className="p-6 text-right font-medium text-slate-300">{cc.direct.toLocaleString()} F</td>
                               <td className="p-6 text-right font-medium text-slate-500">{cc.indirect.toLocaleString()} F</td>
                               <td className="p-6 text-right font-black text-white">{cc.total.toLocaleString()} F</td>
                               <td className="p-6 text-center">
                                  <span className={`text-[9px] font-black uppercase ${cc.trend.includes('+') ? 'text-rose-400' : cc.trend === 'Stable' ? 'text-slate-500' : 'text-emerald-400'}`}>
                                     {cc.trend}
                                  </span>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-amber-600/5 border-amber-500/20 p-8 flex flex-col gap-6 shadow-2xl">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-amber-500/20 pb-4">Allocation des Charges</h4>
                    <div className="space-y-4">
                       <AllocationRow label="Energie -> Production" value="12 450 000 F" progress={80} color="amber" />
                       <AllocationRow label="Maintenance -> Production" value="5 200 000 F" progress={45} color="indigo" />
                       <AllocationRow label="Qualité -> Production" value="2 100 000 F" progress={30} color="emerald" />
                    </div>
                    <button className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-amber-600/20">
                       Exécuter Imputation (KSU5)
                    </button>
                 </div>

                 <div className="card bg-slate-800/30 border-slate-700/50 p-8 flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-amber-400 mb-2">
                       <Info size={18} />
                       <h4 className="text-[10px] font-black uppercase tracking-widest">Aide au Pilotage</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                       Les centres de support sont automatiquement répartis selon des clés de répartition (m2, kWh, Heures-Machine) définies dans le référentiel industriel.
                    </p>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'calculation' && (
           <motion.div 
             key="calculation"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col gap-8"
           >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {productCosts.map((p) => (
                   <div key={p.id} className="card bg-slate-800/30 border-slate-700/50 p-8 flex flex-col gap-6 group hover:border-amber-500/30 transition-all shadow-2xl">
                      <div className="flex justify-between items-start">
                         <div>
                            <h4 className="text-sm font-black text-white uppercase tracking-widest">{p.label}</h4>
                            <p className="text-[9px] text-slate-500 font-black uppercase mt-1">Code Article : {p.id}</p>
                         </div>
                         <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${p.variance.includes('+') ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                            Écart : {p.variance}
                         </div>
                      </div>

                      <div className="space-y-3 mt-4">
                         <CostRow label="Matières Directes" value={p.directMat} color="slate" />
                         <CostRow label="Main d'œuvre Directe" value={p.directLabor} color="slate" />
                         <CostRow label="Charges Indirectes (Overhead)" value={p.overhead} color="slate" />
                         <div className="pt-3 border-t border-slate-700/50 flex justify-between items-center">
                            <span className="text-xs font-black text-white uppercase tracking-widest">Coût Industriel Total</span>
                            <span className="text-lg font-black text-amber-400">{p.total.toLocaleString()} F</span>
                         </div>
                      </div>

                      <div className="mt-4 p-4 bg-slate-900/50 rounded-2xl flex items-center justify-between">
                         <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Coût Standard (Target)</span>
                            <span className="text-sm font-black text-slate-300">{p.target.toLocaleString()} F</span>
                         </div>
                         <button className="p-2 bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
                            <BarChart3 size={16} />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="bg-amber-600/5 border border-amber-500/20 p-8 rounded-[2.5rem] flex items-center gap-8 shadow-inner">
                 <div className="w-16 h-16 bg-amber-500/10 rounded-[1.5rem] flex items-center justify-center text-amber-400 shadow-inner border border-amber-500/10">
                    <Cpu size={32} />
                 </div>
                 <div className="flex-1">
                    <h5 className="text-sm font-black text-white uppercase tracking-widest mb-2">Simulateur de Coût Marginal</h5>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                       L'IA Joule analyse l'élasticité de vos coûts industriels. Une augmentation de **10%** du volume de production sur l'unité A permettrait de réduire le coût unitaire de **4.2%** par absorption des frais fixes.
                    </p>
                 </div>
                 <button className="flex items-center gap-2 px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Simuler Scénario
                 </button>
              </div>
           </motion.div>
         )}

         {activeTab === 'performance' && (
           <motion.div 
             key="performance"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-8"
           >
              <div className="card bg-slate-800/30 p-8 flex flex-col gap-8 shadow-2xl">
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Rendement Industriel (OEE)</h4>
                 <div className="flex-1 flex items-center justify-center py-10">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                       <svg className="w-full h-full transform -rotate-90">
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 * (1 - 0.84)} className="text-amber-500" strokeLinecap="round" />
                       </svg>
                       <div className="absolute flex flex-col items-center">
                          <span className="text-4xl font-black text-white leading-none">84%</span>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Efficience</span>
                       </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                    <KpiMini label="Disponibilité" value="92%" />
                    <KpiMini label="Performance" value="88%" />
                    <KpiMini label="Qualité" value="99.2%" />
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-slate-800/30 p-8 flex flex-col gap-6 shadow-2xl">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Alertes de Dérive des Coûts</h4>
                    <div className="space-y-4">
                       <AlertItem type="critical" label="Prix Électricité (+22%)" desc="Impact direct sur le coût unitaire de l'Unité A." />
                       <AlertItem type="warning" label="Maintenance préventive en retard" desc="Risque de panne sur la ligne d'assemblage 01." />
                       <AlertItem type="success" label="Optimisation Main d'œuvre" desc="Réduction des heures supplémentaires de 15%." />
                    </div>
                 </div>
                 <button className="w-full py-4 bg-slate-800 border border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                    Générer Rapport CO-PA (Product Profitability)
                 </button>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const CostStatCard = ({ title, value, sub, color, trend }: any) => (
  <div className="card group hover:border-amber-500/30 transition-all cursor-pointer relative overflow-hidden p-8 shadow-xl border-slate-700/50">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color === 'emerald' ? 'emerald' : color === 'rose' ? 'rose' : 'amber'}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-4">
       <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none">{title}</p>
       <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg bg-${trend.includes('+') && color === 'rose' ? 'rose' : 'emerald'}-500/10 text-${trend.includes('+') && color === 'rose' ? 'rose' : 'emerald'}-400 border border-${trend.includes('+') && color === 'rose' ? 'rose' : 'emerald'}-500/20`}>{trend}</span>
    </div>
    <h3 className="text-2xl font-black text-white group-hover:text-white transition-colors">{value}</h3>
    <p className="text-[9px] font-bold text-slate-600 uppercase mt-2 tracking-tighter">{sub}</p>
  </div>
);

const AllocationRow = ({ label, value, progress, color }: any) => (
  <div className="flex flex-col gap-2">
     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{value}</span>
     </div>
     <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/50 shadow-inner">
        <div 
          className={`h-full bg-${color === 'amber' ? 'amber-500' : color === 'indigo' ? 'indigo-500' : 'emerald-500'}`} 
          style={{ width: `${progress}%` }} 
        />
     </div>
  </div>
);

const CostRow = ({ label, value }: any) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
     <span className="text-xs font-black text-slate-200">{value.toLocaleString()} F</span>
  </div>
);

const KpiMini = ({ label, value }: any) => (
  <div className="flex flex-col items-center p-3 bg-slate-900 border border-slate-800 rounded-2xl">
     <span className="text-[10px] font-black text-slate-300 mb-1">{value}</span>
     <span className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter text-center">{label}</span>
  </div>
);

const AlertItem = ({ type, label, desc }: any) => (
  <div className={`p-4 rounded-2xl border flex items-start gap-4 ${
    type === 'critical' ? 'bg-rose-500/5 border-rose-500/20' : 
    type === 'warning' ? 'bg-amber-500/5 border-amber-500/20' : 
    'bg-emerald-500/5 border-emerald-500/20'
  }`}>
     <div className={`mt-0.5 ${type === 'critical' ? 'text-rose-400' : type === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
        {type === 'critical' ? <AlertTriangle size={16} /> : type === 'warning' ? <Info size={16} /> : <CheckCircle2 size={16} />}
     </div>
     <div>
        <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{label}</h5>
        <p className="text-[9px] text-slate-500 font-medium leading-tight">{desc}</p>
     </div>
  </div>
);

export default IndustrialCosting;
