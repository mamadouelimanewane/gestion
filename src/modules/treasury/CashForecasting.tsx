import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Wallet, ArrowRight, Calendar,
  BarChart3, RefreshCw, AlertCircle, CheckCircle2,
  Download, Filter, Search, MoreVertical,
  Activity, Zap, ShieldCheck, Database, Sparkles,
  TrendingDown, BrainCircuit
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
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#107e3e] flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:rotate-6 transition-transform">
               <TrendingUp size={32} />
            </div>
            <div>
               <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Analyse de Trésorerie (TR-CM)</h3>
               <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Cash Management • Flux Prévisionnels • Optimisation de Liquidité</p>
            </div>
         </div>
         <div className="flex bg-[#f1f5f9] p-1 rounded-xl border border-[#cbd5e1] relative z-10 overflow-x-auto no-scrollbar shadow-inner mt-6 lg:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-white text-[#107e3e] shadow-md border border-[#cbd5e1]' : 'text-[#64748b] hover:text-[#0f172a] hover:bg-white/50'
                }`}
              >
                 <tab.icon size={16} />
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
             exit={{ opacity: 0, y: -10 }}
             className="flex flex-col gap-8"
           >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <TreasuryStat label="Position de Cash Actuelle" value="124 500 000" sub="Disponibilité Immédiate" color="green" icon={<Wallet size={24} />} />
                 <TreasuryStat label="Entrées Prévisionnelles" value="342 800 000" sub="Horizon J+30" color="blue" icon={<TrendingUp size={24} />} />
                 <TreasuryStat label="Sorties Prévisionnelles" value="285 400 000" sub="Horizon J+30" color="red" icon={<TrendingDown size={24} />} />
              </div>

              <div className="bg-white border border-[#cbd5e1] p-10 rounded-xl shadow-sm flex flex-col gap-10">
                 <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-green-50 text-[#107e3e] rounded-xl flex items-center justify-center border border-green-100 shadow-inner">
                          <Activity size={20} />
                       </div>
                       <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Modélisation du Cash Flow Prédictif (90 Jours)</h4>
                    </div>
                    <div className="flex gap-3 bg-[#f8fafc] p-1 rounded-lg border border-[#cbd5e1]">
                       <button className="px-4 py-1.5 bg-white border border-[#cbd5e1] rounded text-[10px] font-bold uppercase text-[#64748b] shadow-sm">30 Jours</button>
                       <button className="px-4 py-1.5 text-[10px] font-bold uppercase text-[#64748b]">90 Jours</button>
                    </div>
                 </div>
                 
                 <div className="h-80 flex items-end gap-6 pb-6 border-b-2 border-[#f1f5f9] px-4 relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <ForecastBar label="Avril" positive={120} negative={80} />
                    <ForecastBar label="Mai" positive={150} negative={95} />
                    <ForecastBar label="Juin" positive={210} negative={140} active />
                    <ForecastBar label="Juillet" positive={180} negative={110} />
                    <ForecastBar label="Août" positive={240} negative={130} />
                    <ForecastBar label="Sept" positive={310} negative={160} />
                 </div>
                 
                 <div className="flex justify-between items-center">
                    <div className="flex gap-8 px-4">
                       <LegendItem color="green" label="Flux Entrants" />
                       <LegendItem color="red" label="Flux Sortants" />
                       <LegendItem color="blue" label="Position Nette" />
                    </div>
                    <button className="flex items-center gap-3 px-6 py-2.5 bg-[#f8fafc] hover:bg-white border border-[#cbd5e1] rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] text-[#005eb8] transition-all shadow-sm group">
                       <BrainCircuit size={18} className="group-hover:rotate-12 transition-transform" /> 
                       Actualiser via Joule AI
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
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
               <div className="bg-white border border-[#cbd5e1] p-10 rounded-xl shadow-sm flex flex-col gap-10">
                  <div className="flex items-center gap-4 border-b border-[#f1f5f9] pb-6">
                     <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shadow-inner">
                        <Zap size={20} />
                     </div>
                     <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Scénarios "What-If" Stratégiques</h4>
                  </div>
                  <div className="space-y-4">
                     <SimulationToggle label="Retard Paiement Client (Majorité)" value="- 45 200 000 F" impact="red" />
                     <SimulationToggle label="Escompte Fournisseur (Anticipé)" value="- 12 500 000 F" impact="orange" />
                     <SimulationToggle label="Prêt Bancaire de Soutien Accordé" value="+ 150 000 000 F" impact="green" active />
                  </div>
               </div>

               <div className="bg-blue-50 border border-blue-100 p-12 rounded-xl flex flex-col items-center justify-center text-center gap-8 shadow-inner relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-125 transition-transform"></div>
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl border border-blue-50 group-hover:rotate-12 transition-transform">
                     <BrainCircuit size={40} className="text-[#005eb8]" />
                  </div>
                  <div className="space-y-4 relative z-10">
                     <h4 className="text-xl font-bold text-[#0f172a] uppercase tracking-tighter">Analyse de Risque Joule AI</h4>
                     <p className="text-[12px] text-[#64748b] font-bold leading-relaxed uppercase tracking-widest opacity-80 max-w-sm mx-auto italic">
                        "En activant le scénario de prêt, votre ratio de liquidité immédiate passe à 1.85. Vous pouvez engager les investissements CAPEX prévus pour le Q3 en toute sérénité."
                     </p>
                  </div>
                  <button className="px-8 py-3 bg-[#005eb8] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-[#004080] transition-all">
                     Valider le Scénario
                  </button>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const TreasuryStat = ({ label, value, sub, color, icon }: any) => (
  <div className="bg-white border border-[#cbd5e1] p-8 rounded-xl group hover:border-[#005eb8] transition-all shadow-sm relative overflow-hidden cursor-pointer">
     <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${color === 'green' ? 'bg-[#107e3e]' : color === 'red' ? 'bg-[#dc2626]' : 'bg-[#005eb8]'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
     <div className="flex justify-between items-start mb-6">
        <div>
           <p className="text-[#64748b] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 leading-none opacity-80">{label}</p>
           <h3 className="text-3xl font-bold tracking-tighter text-[#0f172a]">{value} <span className="text-xs font-bold text-[#94a3b8]">F</span></h3>
        </div>
        <div className={`p-4 rounded-2xl border shadow-inner transition-transform group-hover:scale-110 ${
          color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100' : 
          color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-100' : 
          'bg-blue-50 text-[#005eb8] border-blue-100'
        }`}>
           {icon}
        </div>
     </div>
     <span className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 text-[#94a3b8]`}>
        {sub}
     </span>
  </div>
);

const ForecastBar = ({ label, positive, negative, active }: any) => (
  <div className="flex-1 flex flex-col items-center gap-4 group cursor-pointer relative z-10">
     <div className="flex-1 w-full flex flex-col justify-end gap-1 px-1 min-h-[200px]">
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: `${positive / 1.5}px` }}
          className={`w-full bg-[#107e3e]/20 border border-[#107e3e]/30 rounded-t-lg shadow-sm group-hover:bg-[#107e3e]/40 transition-all ${active ? 'bg-[#107e3e]/40 border-[#107e3e] shadow-lg' : ''}`}
        />
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: `${negative / 1.5}px` }}
          className="w-full bg-[#dc2626]/20 border border-[#dc2626]/30 rounded-b-lg shadow-sm group-hover:bg-[#dc2626]/40 transition-all"
        />
     </div>
     <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest group-hover:text-[#0f172a] transition-colors">{label}</span>
  </div>
);

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-3 group cursor-pointer">
     <div className={`w-3 h-3 rounded-full ${color === 'green' ? 'bg-[#107e3e]' : color === 'red' ? 'bg-[#dc2626]' : 'bg-[#005eb8]'} group-hover:scale-125 transition-transform shadow-sm`} />
     <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-[0.1em] group-hover:text-[#0f172a] transition-colors">{label}</span>
  </div>
);

const SimulationToggle = ({ label, value, impact, active }: any) => (
  <div className={`flex items-center justify-between p-6 bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl transition-all group cursor-pointer hover:bg-white hover:shadow-md ${active ? 'border-[#005eb8] bg-white shadow-md' : ''}`}>
     <div className="flex flex-col">
        <span className="text-[11px] font-bold text-[#0f172a] uppercase tracking-widest group-hover:text-[#005eb8] transition-colors">{label}</span>
        <span className={`text-sm font-black mt-2 tracking-tighter ${impact === 'red' ? 'text-[#dc2626]' : impact === 'orange' ? 'text-orange-600' : 'text-[#107e3e]'}`}>{value}</span>
     </div>
     <div className={`w-14 h-7 rounded-full relative transition-colors ${active ? 'bg-[#005eb8]' : 'bg-[#cbd5e1]'} shadow-inner`}>
        <motion.div animate={{ x: active ? 28 : 4 }} className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg" />
     </div>
  </div>
);

export default CashForecasting;
