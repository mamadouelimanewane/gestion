import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Wallet, ArrowRight, Calendar,
  BarChart3, RefreshCw, AlertCircle, CheckCircle2,
  Download, Filter, Search, MoreVertical,
  Activity, Zap, ShieldCheck, Database
} from 'lucide-react';

const CashForecasting = () => {
  const [activeTab, setActiveTab] = useState<'forecast' | 'liquidity' | 'simulation'>('forecast');

  const tabs = [
    { id: 'forecast', label: 'Prévisions Cash-Flow', icon: TrendingUp },
    { id: 'liquidity', label: 'État de Liquidité', icon: Wallet },
    { id: 'simulation', label: 'Simulations "What-if"', icon: Zap },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Treasury Header */}
      <div className="flex justify-between items-center bg-emerald-600/10 border border-emerald-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/40">
               <TrendingUp size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1">Prévisions de Trésorerie (TR-CM)</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">Cash Management • Flux Prévisionnels • Optimisation du BFR</p>
            </div>
         </div>
         <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50 relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                 <tab.icon size={14} />
                 {tab.label}
              </button>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'forecast' && (
           <motion.div 
             key="forecast"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col gap-6"
           >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <TreasuryStat label="Solde Actuel" value="124.5M F" sub="Disponible Immédiat" color="emerald" />
                 <TreasuryStat label="Encaissements Prévus" value="342.8M F" sub="J+30" color="indigo" />
                 <TreasuryStat label="Décaissements Prévus" value="285.4M F" sub="J+30" color="rose" />
              </div>

              <div className="card bg-slate-800/20 border-slate-700/50 p-10 shadow-2xl overflow-hidden relative">
                 <div className="flex justify-between items-center mb-10">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Évolution du Cash Flow (Prédictif)</h4>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-[10px] font-black uppercase text-slate-500">30 Jours</span>
                       <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase">90 Jours</span>
                    </div>
                 </div>
                 
                 <div className="h-64 flex items-end gap-4 pb-4 border-b border-slate-700/50">
                    <ForecastBar label="Avril" positive="120" negative="80" />
                    <ForecastBar label="Mai" positive="150" negative="95" />
                    <ForecastBar label="Juin" positive="210" negative="140" active />
                    <ForecastBar label="Juillet" positive="180" negative="110" />
                    <ForecastBar label="Août" positive="240" negative="130" />
                    <ForecastBar label="Sept" positive="310" negative="160" />
                 </div>
                 <div className="mt-8 flex justify-between items-center">
                    <div className="flex gap-6">
                       <LegendItem color="emerald" label="Encaissements" />
                       <LegendItem color="rose" label="Décaissements" />
                    </div>
                    <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300">
                       <RefreshCw size={14} /> Recalculer via IA
                    </button>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'simulation' && (
            <motion.div 
              key="simulation"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
               <div className="card bg-slate-800/20 border-slate-700/50 p-10 shadow-2xl flex flex-col gap-8">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Scénarios "What-If"</h4>
                  <div className="space-y-6">
                     <SimulationToggle label="Retard paiement client (15j)" value="-45.2M F" impact="rose" />
                     <SimulationToggle label="Règlement fournisseur anticipé (-2%)" value="-12.5M F" impact="amber" />
                     <SimulationToggle label="Prêt Bancaire Accordé" value="+150.0M F" impact="emerald" active />
                  </div>
               </div>

               <div className="card bg-indigo-600/5 border border-indigo-500/20 p-10 flex flex-col items-center justify-center text-center gap-6 shadow-2xl">
                  <Zap size={48} className="text-indigo-400" />
                  <div>
                     <h4 className="text-lg font-black text-white uppercase tracking-tighter">Analyse Prédictive Joule</h4>
                     <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase mt-2">
                        "En activant le scénario **Prêt Bancaire**, votre ratio de liquidité immédiate passe à **1.85**. Vous pouvez sereinement engager les investissements machines prévus en Juin."
                     </p>
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const TreasuryStat = ({ label, value, sub, color }: any) => (
  <div className="card group hover:border-emerald-500/30 transition-all p-8 shadow-xl border-slate-700/50 relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest leading-none mb-4">{label}</p>
    <h3 className={`text-xl font-black text-white`}>{value}</h3>
    <p className="text-[9px] font-bold text-slate-600 uppercase mt-2 tracking-tighter italic">{sub}</p>
  </div>
);

const ForecastBar = ({ label, positive, negative, active }: any) => (
  <div className="flex-1 flex flex-col items-center gap-2 group">
     <div className="flex-1 w-full flex flex-col justify-end gap-1 px-1">
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: `${positive / 3.5}%` }}
          className={`w-full bg-emerald-500/80 rounded-t-lg shadow-lg group-hover:bg-emerald-400 transition-all ${active ? 'bg-emerald-400 ring-4 ring-emerald-400/20' : ''}`}
        />
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: `${negative / 3.5}%` }}
          className="w-full bg-rose-500/80 rounded-b-lg shadow-lg group-hover:bg-rose-400 transition-all"
        />
     </div>
     <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{label}</span>
  </div>
);

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-2">
     <div className={`w-3 h-3 rounded bg-${color}-500`} />
     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

const SimulationToggle = ({ label, value, impact, active }: any) => (
  <div className={`flex items-center justify-between p-4 bg-slate-900 border ${active ? 'border-indigo-500/50' : 'border-slate-800'} rounded-2xl transition-all group cursor-pointer`}>
     <div className="flex flex-col">
        <span className="text-[10px] font-black text-white uppercase tracking-widest">{label}</span>
        <span className={`text-xs font-black text-${impact}-400 mt-1`}>{value}</span>
     </div>
     <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-indigo-600' : 'bg-slate-800'}`}>
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-6' : 'left-1'}`} />
     </div>
  </div>
);

export default CashForecasting;
