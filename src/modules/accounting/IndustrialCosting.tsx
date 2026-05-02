import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, Settings, PieChart, TrendingDown, 
  TrendingUp, Activity, BarChart3, Database,
  Cpu, Zap, Layers, Share2, Info, ChevronRight,
  Target, AlertTriangle, CheckCircle2, Box,
  History, Printer, Download, ArrowRight, ShieldCheck,
  MoreVertical, Check, X, BarChart
} from 'lucide-react';

const IndustrialCosting = () => {
  const [activeTab, setActiveTab] = useState<'centers' | 'calculation' | 'performance'>('centers');

  const costCenters = [
    { id: 'CC-PROD-01', label: 'ATELIER ASSEMBLAGE INDUSTRIEL', type: 'Production', direct: 45800000, indirect: 12500000, total: 58300000, trend: '+5%' },
    { id: 'CC-MAINT-02', label: 'SERVICE MAINTENANCE PRÉVENTIVE', type: 'Support', direct: 8200000, indirect: 4500000, total: 12700000, trend: '-2%' },
    { id: 'CC-QUAL-03', label: 'CONTRÔLE QUALITÉ & CONFORMITÉ', type: 'Qualité', direct: 5400000, indirect: 2100000, total: 7500000, trend: 'Stable' },
    { id: 'CC-ENERG-04', label: 'FLUX ENERGIE & UTILITÉS', type: 'Support', direct: 15600000, indirect: 0, total: 15600000, trend: '+12%' },
  ];

  const productCosts = [
    { id: 'P-882', label: 'UNITE INDUSTRIELLE TYPE A', directMat: 12500, directLabor: 4500, overhead: 3200, total: 20200, target: 19500, variance: '+3.5%' },
    { id: 'P-901', label: 'UNITE INDUSTRIELLE TYPE B', directMat: 8900, directLabor: 3200, overhead: 2100, total: 14200, target: 14500, variance: '-2.1%' },
  ];

  return (
    <div className="flex flex-col h-full gap-10 bg-white p-10 min-h-screen">
      {/* Premium Header - Diamond Azure Elite */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,94,184,0.08)] relative overflow-hidden group border border-blue-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-48 -mt-48 blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="flex items-center gap-10 relative z-10">
           <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0a6ed1] to-blue-600 flex items-center justify-center text-white shadow-[0_15px_30px_rgba(10,110,209,0.3)] group-hover:rotate-6 transition-transform duration-500">
              <Factory size={40} strokeWidth={2.5} />
           </div>
           <div>
              <h3 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Contrôle de Gestion Industriel (CO-PC)</h3>
              <p className="text-[12px] text-[#64748b] font-black uppercase tracking-[0.3em] italic opacity-80 flex items-center gap-3">
                 <ShieldCheck size={16} className="text-[#0a6ed1]" /> Calcul des Coûts de Revient • Centres de Profit • Standards SAP
              </p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-8 lg:mt-0">
           <div className="flex bg-blue-50/50 p-2 rounded-2xl border border-blue-100 shadow-inner">
              {[
                { id: 'centers', label: 'Centres de Coûts', icon: Layers },
                { id: 'calculation', label: 'Coût de Revient', icon: Target },
                { id: 'performance', label: 'Performance', icon: Activity },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-4 px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                    activeTab === tab.id ? 'bg-white text-[#0a6ed1] shadow-xl border border-blue-50 scale-105' : 'text-slate-300 hover:text-[#0a6ed1]'
                  }`}
                >
                   <tab.icon size={18} />
                   {tab.label}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Top KPI Grid - Diamond Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
         <CostStatCard title="Total Coûts Production" value="94 100 000 F" sub="Vs Budget : 90M (Consolidé)" color="blue" trend="+4.5%" icon={<Layers size={28} />} />
         <CostStatCard title="Coût Moyen / Unité" value="17 200 F" sub="Optimisation IA Joule" color="green" trend="-1.2%" icon={<Target size={28} />} />
         <CostStatCard title="Écart sur Matières" value="+2 450 000 F" sub="Variation Prix/Volume" color="red" trend="Critique" icon={<Activity size={28} />} />
         <CostStatCard title="Absorption Overhead" value="98.2 %" sub="Taux d'Activité Machine" color="indigo" trend="Optimal" icon={<Cpu size={28} />} />
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'centers' && (
           <motion.div 
             key="centers"
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -30 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-10"
           >
              <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-blue-50 flex flex-col overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.04)]">
                 <div className="bg-white px-12 py-8 border-b border-blue-50 flex justify-between items-center sticky top-0 z-20 shadow-sm backdrop-blur-md">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-blue-50 text-[#0a6ed1] rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner">
                          <Layers size={24} />
                       </div>
                       <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#0f172a]">Hiérarchie des Centres de Coûts Opérationnels</h3>
                    </div>
                    <button className="text-[11px] font-black text-[#0a6ed1] uppercase tracking-[0.3em] flex items-center gap-4 transition-all hover:scale-105 active:scale-95 bg-blue-50/50 border border-blue-100 px-8 py-3 rounded-2xl shadow-sm group">
                       <Share2 size={20} className="group-hover:rotate-12 transition-transform" /> Répartition (KSU5)
                    </button>
                 </div>
                 <div className="overflow-auto custom-scrollbar">
                    <table className="w-full text-left whitespace-nowrap border-collapse">
                       <thead className="bg-white border-b-2 border-blue-50 text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] sticky top-0 z-20 shadow-sm">
                          <tr>
                             <th className="px-12 py-8">Centre / Type Analytique</th>
                             <th className="px-12 py-8 text-right font-black text-slate-400">Coûts Directs</th>
                             <th className="px-12 py-8 text-right font-black text-slate-400">Coûts Imputés</th>
                             <th className="px-12 py-8 text-right font-black text-[#0a6ed1]">Total Consolidé (F)</th>
                             <th className="px-12 py-8 text-center">Trend Performance</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-blue-50/50">
                          {costCenters.map((cc) => (
                            <tr key={cc.id} className="group hover:bg-blue-50/20 transition-all duration-300 cursor-pointer">
                               <td className="px-12 py-8 border-r border-blue-50/30">
                                  <div className="flex flex-col">
                                     <span className="text-base font-black text-[#0f172a] uppercase tracking-tight group-hover:text-[#0a6ed1] transition-colors">{cc.label}</span>
                                     <span className="text-[11px] font-mono font-black text-slate-400 tracking-widest mt-2 uppercase flex items-center gap-3">
                                        <Database size={14} /> {cc.id} • {cc.type}
                                     </span>
                                  </div>
                               </td>
                               <td className="px-12 py-8 text-right border-r border-blue-50/30 font-black text-[#0f172a] text-lg tracking-tighter">
                                  {cc.direct.toLocaleString()}
                               </td>
                               <td className="px-12 py-8 text-right border-r border-blue-50/30 font-black text-slate-300 text-lg tracking-tighter italic">
                                  {cc.indirect.toLocaleString()}
                               </td>
                               <td className="px-12 py-8 text-right border-r border-blue-50/30 font-black text-[#0a6ed1] text-2xl tracking-tighter bg-blue-50/5 group-hover:bg-blue-50/20 transition-colors">
                                  {cc.total.toLocaleString()}
                               </td>
                               <td className="px-12 py-8 text-center">
                                  <span className={`px-6 py-2 rounded-[2rem] border text-[11px] font-black uppercase tracking-widest shadow-sm ${
                                    cc.trend.includes('+') ? 'bg-red-50 text-[#dc2626] border-red-200 shadow-red-500/10' : 
                                    cc.trend === 'Stable' ? 'bg-slate-50 text-slate-400 border-slate-100' : 
                                    'bg-emerald-50 text-[#107e3e] border-emerald-200 shadow-emerald-500/10'
                                  }`}>
                                     {cc.trend}
                                  </span>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="flex flex-col gap-10">
                 <div className="bg-white border border-blue-50 rounded-[2.5rem] p-12 flex flex-col gap-10 shadow-[0_30px_80px_rgba(0,0,0,0.06)] relative overflow-hidden group/allocation">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#0a6ed1]/5 rounded-full -mr-32 -mt-32 blur-[80px] opacity-0 group-hover/allocation:opacity-100 transition-opacity duration-1000"></div>
                    <h4 className="text-[14px] font-black uppercase tracking-[0.5em] text-[#0f172a] border-b border-blue-50 pb-8 relative z-10 flex items-center gap-6 leading-none">
                       <Zap size={32} className="text-[#0a6ed1] animate-pulse" /> Allocation de Masse
                    </h4>
                    <div className="space-y-10 relative z-10">
                       <AllocationRow label="Energie -> Production" value="12 450 000 F" progress={80} color="blue" />
                       <AllocationRow label="Maintenance -> Production" value="5 200 000 F" progress={45} color="indigo" />
                       <AllocationRow label="Qualité -> Production" value="2 100 000 F" progress={30} color="green" />
                    </div>
                    <button className="w-full py-6 bg-[#0a6ed1] hover:bg-blue-700 text-white rounded-[3rem] text-[12px] font-black uppercase tracking-[0.5em] transition-all shadow-3xl shadow-blue-500/30 relative z-10 mt-6 scale-105 active:scale-95">
                       Exécuter Imputation Analytique
                    </button>
                 </div>

                 <div className="bg-gradient-to-br from-white to-blue-50/50 border border-blue-50 p-10 rounded-[2.5rem] flex items-center gap-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] group hover:border-[#0a6ed1]/30 transition-all duration-500 cursor-pointer">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#0a6ed1] border border-blue-100 shadow-inner group-hover:rotate-12 transition-transform duration-500">
                       <Info size={36} />
                    </div>
                    <div className="flex-1">
                       <h5 className="text-[12px] font-black text-[#0a6ed1] uppercase tracking-[0.3em] mb-2 leading-none">Aide au Pilotage Industriel</h5>
                       <p className="text-[11px] text-slate-400 font-black uppercase tracking-tight opacity-70 italic leading-relaxed">
                          Les centres de support sont répartis selon des clés (m2, kWh, Heures-Machine) conformes aux standards SAP CO.
                       </p>
                    </div>
                    <ChevronRight size={28} className="text-blue-100 group-hover:text-[#0a6ed1] transition-all" />
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'calculation' && (
           <motion.div 
             key="calculation"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
             className="flex flex-col gap-10"
           >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 {productCosts.map((p) => (
                    <div key={p.id} className="bg-white border border-blue-50 rounded-[3rem] p-12 flex flex-col gap-10 group hover:border-[#0a6ed1]/30 hover:shadow-[0_40px_100px_rgba(10,110,209,0.08)] transition-all duration-700 shadow-[0_20px_60px_rgba(0,0,0,0.04)] relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-48 h-48 bg-[#0a6ed1]/5 rounded-full -mr-24 -mt-24 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                       <div className="flex justify-between items-start relative z-10">
                          <div>
                             <h4 className="text-3xl font-black text-[#0f172a] uppercase tracking-tighter leading-none">{p.label}</h4>
                             <p className="text-[11px] text-slate-300 font-black uppercase mt-4 tracking-[0.4em] italic opacity-60">ARTICLE ID : {p.id} • SKU CONTRÔLÉ Joule AI</p>
                          </div>
                          <div className={`px-6 py-2 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] border shadow-sm transition-all duration-500 group-hover:scale-110 ${
                            p.variance.includes('+') ? 'bg-red-50 border-red-100 text-[#dc2626] shadow-red-500/10' : 'bg-emerald-50 border-emerald-100 text-[#107e3e] shadow-emerald-500/10'
                          }`}>
                             Écart : {p.variance}
                          </div>
                       </div>

                       <div className="space-y-6 mt-6 relative z-10">
                          <CostRow label="Matières Directes (BOM)" value={p.directMat} />
                          <CostRow label="Main d'œuvre Directe (Routing)" value={p.directLabor} />
                          <CostRow label="Charges Indirectes (Absorption)" value={p.overhead} />
                          <div className="pt-10 border-t border-blue-50 flex justify-between items-center group-hover:translate-x-2 transition-transform duration-500">
                             <span className="text-[14px] font-black text-[#0f172a] uppercase tracking-[0.4em] opacity-80">Coût Industriel Unitaire Total</span>
                             <span className="text-5xl font-black text-[#0a6ed1] tracking-tighter leading-none shadow-sm">{p.total.toLocaleString()} <span className="text-base text-slate-200 font-black ml-3 uppercase tracking-widest">F</span></span>
                          </div>
                       </div>

                       <div className="mt-6 p-8 bg-blue-50/30 rounded-[2rem] flex items-center justify-between border border-blue-50 shadow-inner group/sub relative z-10 transition-colors hover:bg-white hover:border-blue-100">
                          <div className="flex flex-col">
                             <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.5em] mb-3 opacity-60">Coût Standard Théorique (Target)</span>
                             <span className="text-2xl font-black text-slate-400 tracking-tighter group-hover:text-[#0f172a] transition-colors">{p.target.toLocaleString()} <span className="text-sm ml-1 font-bold">F</span></span>
                          </div>
                          <button className="w-14 h-14 bg-white border border-blue-100 rounded-2xl flex items-center justify-center text-slate-200 hover:text-[#0a6ed1] hover:border-[#0a6ed1] transition-all shadow-sm group-hover/sub:scale-110 group-hover/sub:rotate-12">
                             <BarChart3 size={28} />
                          </button>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="bg-[#0a6ed1] border border-blue-700 p-14 rounded-[3rem] flex items-center gap-14 shadow-[0_40px_100px_rgba(10,110,209,0.3)] relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all duration-500">
                 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full -mr-[400px] -mt-[400px] blur-[150px] group-hover:scale-125 transition-transform duration-1000"></div>
                 <div className="w-24 h-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white border border-white/20 shadow-inner group-hover:rotate-12 transition-transform duration-700 relative z-10">
                    <Cpu size={56} strokeWidth={1.5} />
                 </div>
                 <div className="flex-1 relative z-10">
                    <h5 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none">Simulateur de Coût Marginal & IA</h5>
                    <p className="text-[15px] text-blue-50 font-black leading-relaxed uppercase tracking-tight opacity-90 max-w-5xl">
                       L'IA Joule analyse l'élasticité de vos coûts industriels. Une augmentation de **10%** du volume sur l'unité A permettrait de réduire le coût de **4.2%**. 
                       <span className="text-white ml-5 underline underline-offset-8 decoration-white/40 decoration-4 font-black uppercase text-[12px] cursor-pointer hover:text-amber-400 hover:decoration-amber-400 transition-all">Lancer le Scénario "Full Capacity" →</span>
                    </p>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'performance' && (
           <motion.div 
             key="performance"
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -50 }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-10"
           >
              <div className="bg-white border border-blue-50 rounded-[3rem] p-14 flex flex-col gap-12 shadow-[0_30px_80px_rgba(0,0,0,0.06)] relative overflow-hidden group/performance">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#0a6ed1]/5 rounded-full -mr-32 -mt-32 blur-[80px] opacity-0 group-hover/performance:opacity-100 transition-opacity duration-1000"></div>
                 <h4 className="text-[14px] font-black uppercase tracking-[0.5em] text-[#0f172a] relative z-10 flex items-center gap-6 leading-none">
                    <Activity size={32} className="text-[#0a6ed1]" /> Rendement Industriel Global (OEE)
                 </h4>
                 <div className="flex-1 flex items-center justify-center py-10 relative z-10">
                    <div className="relative w-72 h-72 flex items-center justify-center group/gauge">
                       <svg className="w-full h-full transform -rotate-90 group-hover:scale-110 transition-transform duration-700">
                          <circle cx="144" cy="144" r="130" stroke="currentColor" strokeWidth="24" fill="transparent" className="text-blue-50/30" />
                          <motion.circle 
                             initial={{ strokeDashoffset: 816 }}
                             animate={{ strokeDashoffset: 816 * (1 - 0.84) }}
                             transition={{ duration: 2, ease: "circOut" }}
                             cx="144" cy="144" r="130" stroke="currentColor" strokeWidth="24" fill="transparent" strokeDasharray={816} className="text-[#0a6ed1]" strokeLinecap="round" 
                          />
                       </svg>
                       <div className="absolute flex flex-col items-center">
                          <span className="text-8xl font-black text-[#0f172a] tracking-tighter leading-none group-hover:scale-110 transition-transform duration-500">84<span className="text-3xl text-slate-200 ml-2">%</span></span>
                          <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mt-6 opacity-60">Efficience Brute</span>
                       </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-3 gap-8 relative z-10">
                    <KpiMini label="Disponibilité" value="92%" color="green" icon={<CheckCircle2 size={24} />} />
                    <KpiMini label="Performance" value="88%" color="blue" icon={<Activity size={24} />} />
                    <KpiMini label="Qualité" value="99.2%" color="emerald" icon={<ShieldCheck size={24} />} />
                 </div>
              </div>

              <div className="flex flex-col gap-10">
                 <div className="bg-white border border-blue-50 rounded-[3rem] p-12 flex flex-col gap-10 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
                    <h4 className="text-[14px] font-black uppercase tracking-[0.5em] text-[#0f172a] border-b border-blue-50 pb-8 flex items-center gap-6">
                       <AlertTriangle size={32} className="text-amber-500" /> Alertes Opérationnelles
                    </h4>
                    <div className="space-y-8">
                       <AlertItem type="critical" label="Prix Énergie (+22%)" desc="Impact direct critique sur le coût unitaire de l'Unité A." />
                       <AlertItem type="warning" label="Maintenance Préventive" desc="Retard constaté de 15h sur la ligne d'assemblage 01." />
                       <AlertItem type="success" label="Masse Salariale (-15%)" desc="Optimisation des heures supplémentaires validée." />
                    </div>
                 </div>
                 <button className="w-full py-7 bg-white border border-blue-100 hover:border-[#0a6ed1] rounded-[3rem] text-[12px] font-black uppercase tracking-[0.5em] text-slate-300 hover:text-[#0a6ed1] transition-all shadow-sm hover:shadow-2xl group flex items-center justify-center gap-6">
                    <BarChart size={32} className="group-hover:scale-125 transition-transform duration-500" /> Générer Rapport Rentabilité (CO-PA)
                 </button>
              </div>
           </motion.div>
         )}
      </AnimatePresence>

      {/* Footer System Integrity - Diamond Style */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-blue-50 p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] gap-10 group/footer overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-1000"></div>
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#107e3e] to-emerald-600 text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 group/shield cursor-pointer">
               <ShieldCheck size={40} className="group-hover/shield:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Contrôle de Gestion Industriel Certifié (CO Standards)</span>
               <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 opacity-70 italic leading-relaxed max-w-4xl">
                  L'intégrité des calculs de coût de revient est certifiée par Joule AI Auditor conformément aux normes **IFRS 2** • Core S/4HANA Engine.
               </p>
            </div>
         </div>
         <div className="flex gap-14 items-center relative z-10">
            <button className="flex items-center gap-5 text-slate-300 hover:text-[#0a6ed1] text-[12px] font-black uppercase tracking-[0.4em] transition-all group/btn">
               <History size={28} className="group-hover/btn:rotate-[-45deg] transition-transform duration-500" /> Journal de Structure
            </button>
            <button className="flex items-center gap-6 text-[#0a6ed1] hover:text-blue-700 text-[12px] font-black uppercase tracking-[0.5em] transition-all group/strat border-l border-blue-50 pl-14 h-12">
               <Share2 size={28} className="group-hover:rotate-12 transition-transform duration-500" /> Partager Analyse
               <ArrowRight size={22} className="opacity-10 group-hover/strat:opacity-100 group-hover/strat:translate-x-3 transition-all duration-500" />
            </button>
         </div>
      </div>
    </div>
  );
};

const CostStatCard = ({ title, value, sub, color, trend, icon }: any) => (
  <div className="bg-white border border-blue-50 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-[#0a6ed1]/30 hover:shadow-[0_25px_60px_rgba(10,110,209,0.08)] transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.03)] cursor-pointer">
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full ${
      color === 'green' ? 'bg-[#107e3e]' : color === 'red' ? 'bg-[#dc2626]' : 'bg-[#0a6ed1]'
    } opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
    <div className="flex justify-between items-start mb-8 relative z-10">
       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm group-hover:rotate-12 transition-transform duration-500 ${
          color === 'blue' ? 'bg-blue-50 text-[#0a6ed1] border-blue-100' : 
          color === 'green' ? 'bg-emerald-50 text-[#107e3e] border-emerald-100' : 
          'bg-red-50 text-[#dc2626] border-red-100'
       }`}>
          {icon}
       </div>
       <span className={`text-[11px] font-black px-4 py-1.5 rounded-full border shadow-sm ${
         trend.includes('+') && color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100' : 'bg-emerald-50 text-[#107e3e] border-emerald-100'
       }`}>{trend}</span>
    </div>
    <div className="relative z-10">
       <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 opacity-70 leading-none">{title}</p>
       <h3 className="text-3xl font-black text-[#0f172a] tracking-tighter group-hover:text-[#0a6ed1] transition-colors duration-500">{value}</h3>
       <p className="text-[10px] font-black text-slate-200 uppercase mt-4 tracking-[0.2em] italic">{sub}</p>
    </div>
  </div>
);

const AllocationRow = ({ label, value, progress, color }: any) => (
  <div className="flex flex-col gap-4 group/row cursor-pointer">
     <div className="flex justify-between items-end text-[11px] font-black uppercase tracking-[0.4em]">
        <span className="text-slate-300 group-hover/row:text-[#0a6ed1] transition-colors">{label}</span>
        <span className="text-[#0f172a] tracking-widest">{value}</span>
     </div>
     <div className="h-4 bg-blue-50/50 rounded-full overflow-hidden shadow-inner border border-blue-100 p-1">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "circOut" }}
          className={`h-full rounded-full shadow-lg ${
            color === 'blue' ? 'bg-gradient-to-r from-[#0a6ed1] to-blue-400' : 
            color === 'indigo' ? 'bg-gradient-to-r from-indigo-500 to-indigo-700' : 
            'bg-gradient-to-r from-[#107e3e] to-emerald-400'
          }`} 
        />
     </div>
  </div>
);

const CostRow = ({ label, value }: any) => (
  <div className="flex justify-between items-center py-5 border-b border-blue-50 group/row transition-all duration-300 hover:bg-blue-50/20 px-4 rounded-[1.5rem]">
     <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] group-hover/row:text-[#0a6ed1] transition-colors">{label}</span>
     <span className="text-xl font-black text-[#0f172a] tracking-tighter">{value.toLocaleString()} <span className="text-sm opacity-20 uppercase font-black ml-1">F</span></span>
  </div>
);

const KpiMini = ({ label, value, color, icon }: any) => (
  <div className="flex flex-col items-center p-8 bg-white border border-blue-50 rounded-[2rem] shadow-sm group hover:border-[#0a6ed1]/30 hover:shadow-2xl transition-all duration-500 cursor-pointer text-center">
     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
        color === 'green' ? 'bg-emerald-50 text-[#107e3e] border-emerald-100' : 
        color === 'blue' ? 'bg-blue-50 text-[#0a6ed1] border-blue-100' : 
        'bg-emerald-50 text-emerald-600 border-emerald-100'
     }`}>
        {icon}
     </div>
     <span className={`text-3xl font-black tracking-tighter mb-2 ${
       color === 'green' ? 'text-[#107e3e]' : color === 'blue' ? 'text-[#0a6ed1]' : 'text-emerald-600'
     }`}>{value}</span>
     <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] leading-tight group-hover:text-slate-400 transition-colors">{label}</span>
  </div>
);

const AlertItem = ({ type, label, desc }: any) => (
  <div className={`p-8 rounded-[2rem] border flex items-start gap-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer ${
    type === 'critical' ? 'bg-red-50 border-red-100' : 
    type === 'warning' ? 'bg-amber-50 border-amber-100' : 
    'bg-emerald-50 border-emerald-100'
  }`}>
     <div className={`mt-1 p-4 bg-white rounded-2xl shadow-xl border ${type === 'critical' ? 'text-[#dc2626] border-red-100' : type === 'warning' ? 'text-amber-600 border-amber-100' : 'text-[#107e3e] border-emerald-100'}`}>
        {type === 'critical' ? <AlertTriangle size={32} /> : type === 'warning' ? <Info size={32} /> : <CheckCircle2 size={32} />}
     </div>
     <div>
        <h5 className="text-[13px] font-black text-[#0f172a] uppercase tracking-[0.4em] mb-3 leading-none">{label}</h5>
        <p className="text-[12px] text-slate-400 font-black uppercase tracking-tight opacity-70 italic leading-relaxed">{desc}</p>
     </div>
  </div>
);

export default IndustrialCosting;
