import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, TrendingUp, TrendingDown, Target, 
  BarChart3, RefreshCw, Save, ArrowRight,
  BrainCircuit, Zap, AlertTriangle, CheckCircle2,
  PieChart, Info, DollarSign
} from 'lucide-react';

const AIBudgetPlanner = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scenario, setScenario] = useState('Optimiste (+15%)');

  const budgetLines = [
    { id: 1, poste: 'ACHATS MATIERES', reel_n1: 125000000, budget_n: 143750000, ecart: '+15%', conf: 92 },
    { id: 2, poste: 'FRAIS DE PERSONNEL', reel_n1: 85000000, budget_n: 89250000, ecart: '+5%', conf: 98 },
    { id: 3, poste: 'SERVICES EXTERIEURS', reel_n1: 42000000, budget_n: 44100000, ecart: '+5%', conf: 85 },
    { id: 4, poste: 'COMMUNICATION', reel_n1: 15000000, budget_n: 22500000, ecart: '+50%', conf: 70 },
  ];

  const handleRunAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2500);
  };

  return (
    <div className="flex flex-col h-full gap-8">
      {/* AI Planner Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-inner text-indigo-400">
              <BrainCircuit size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Planification Budgétaire IA (Predictive)</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Simulation S/4HANA SAC • Algorithmes de Régression Linéaire</p>
           </div>
        </div>
        <div className="flex gap-3">
           <select 
             value={scenario}
             onChange={(e) => setScenario(e.target.value)}
             className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-slate-300 outline-none focus:border-indigo-500"
           >
              <option>Conservateur (0%)</option>
              <option>Optimiste (+15%)</option>
              <option>Aggressif (+30%)</option>
           </select>
           <button 
             onClick={handleRunAI}
             disabled={isAnalyzing}
             className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20"
           >
              {isAnalyzing ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
              {isAnalyzing ? 'Analyse des Tendances...' : 'Générer Budget IA'}
           </button>
        </div>
      </div>

      {/* Forecasting KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <ForecastingCard title="Revenus Prédits" value="526 964 000 F" sub="Vs 458M (N-1)" color="emerald" trend="+15%" />
         <ForecastingCard title="Charges Estimées" value="299 600 000 F" sub="Optimisation IA" color="indigo" trend="+8%" />
         <ForecastingCard title="Marge Brute Proj." value="43.1 %" sub="Objectif : 40%" color="amber" trend="+3.1%" />
         <ForecastingCard title="Confiance Modèle" value="94.2 %" sub="Précision Backtest" color="purple" trend="Stable" />
      </div>

      {/* Main Planning Table */}
      <div className="card bg-slate-800/20 border-slate-700/50 flex flex-col flex-1 overflow-hidden shadow-2xl">
         <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <Sparkles className="text-amber-400" size={18} />
               <h4 className="text-xs font-black uppercase tracking-widest text-white">Propositions Budgétaires pour l'Exercice 2025</h4>
            </div>
            <div className="flex gap-4">
               <button className="text-[10px] font-black text-slate-500 uppercase hover:text-white transition-all flex items-center gap-2">
                  <BarChart3 size={14} /> Voir Graphes
               </button>
               <button className="text-[10px] font-black text-indigo-400 uppercase hover:text-indigo-300 transition-all flex items-center gap-2">
                  <Save size={14} /> Valider le Budget
               </button>
            </div>
         </div>

         <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-900 border-b border-slate-700 font-black uppercase text-[9px] tracking-widest text-slate-500">
                  <tr>
                     <th className="p-6">Poste Budgétaire</th>
                     <th className="p-6 text-right">Réel N-1 (XOF)</th>
                     <th className="p-6 text-right bg-indigo-600/5 text-indigo-400">Budget Proposé N+1</th>
                     <th className="p-6 text-center">Évolution IA</th>
                     <th className="p-6 text-center">Fiabilité (%)</th>
                     <th className="p-6 text-center">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-700/30">
                  {budgetLines.map((line) => (
                    <tr key={line.id} className="group hover:bg-slate-700/20 transition-all cursor-pointer">
                       <td className="p-6">
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-wide">{line.poste}</span>
                             <span className="text-[9px] text-slate-500 font-black uppercase mt-1 tracking-tighter">Code: B-{line.id}000</span>
                          </div>
                       </td>
                       <td className="p-6 text-right font-bold text-slate-400">
                          {line.reel_n1.toLocaleString()} F
                       </td>
                       <td className="p-6 text-right font-black text-slate-100 bg-indigo-600/5 border-x border-indigo-600/10">
                          {line.budget_n.toLocaleString()} F
                       </td>
                       <td className="p-6 text-center">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-black ${
                             line.ecart.includes('+') ? 'text-rose-400 bg-rose-400/5' : 'text-emerald-400 bg-emerald-400/5'
                          }`}>
                             {line.ecart.includes('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                             {line.ecart}
                          </div>
                       </td>
                       <td className="p-6 text-center">
                          <div className="flex flex-col items-center gap-1">
                             <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${line.conf > 90 ? 'bg-emerald-500' : line.conf > 80 ? 'bg-indigo-500' : 'bg-amber-500'}`} 
                                  style={{ width: `${line.conf}%` }} 
                                />
                             </div>
                             <span className="text-[9px] font-black text-slate-500">{line.conf}%</span>
                          </div>
                       </td>
                       <td className="p-6 text-center">
                          <button className="p-2 text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                             <ArrowRight size={16} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* AI Insight Box */}
      <div className="bg-indigo-600/5 border border-indigo-500/20 p-8 rounded-[2.5rem] flex items-center gap-8 shadow-inner">
         <div className="w-16 h-16 bg-indigo-500/10 rounded-[1.5rem] flex items-center justify-center text-indigo-400 shadow-inner border border-indigo-500/10">
            <Sparkles size={32} />
         </div>
         <div className="flex-1">
            <h5 className="text-sm font-black text-white uppercase tracking-widest mb-2">Insight Prédictif : Communication</h5>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
               L'algorithme suggère une augmentation de **50%** du budget Communication. Les corrélations passées indiquent qu'une telle hausse 
               génère historiquement un incrément de CA de **18%** sur les 12 mois suivants. 
               <span className="text-indigo-400 ml-2 cursor-pointer hover:underline font-black uppercase text-[10px]">Voir Analyse de Corrélation →</span>
            </p>
         </div>
         <div className="flex gap-4">
            <div className="flex flex-col items-center">
               <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-emerald-400 mb-1">
                  <PieChart size={18} />
               </div>
               <span className="text-[8px] font-black text-slate-600 uppercase">Répartition</span>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-amber-400 mb-1">
                  <Target size={18} />
               </div>
               <span className="text-[8px] font-black text-slate-600 uppercase">Objectifs</span>
            </div>
         </div>
      </div>
    </div>
  );
};

const ForecastingCard = ({ title, value, sub, color, trend }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden shadow-xl border-slate-700/50 p-6">
    <div className={`absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-3">
       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
       <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-lg bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>{trend}</span>
    </div>
    <h3 className="text-lg font-black text-white group-hover:text-white transition-colors">{value}</h3>
    <p className="text-[8px] font-bold text-slate-600 uppercase mt-2 tracking-tighter">{sub}</p>
  </div>
);

export default AIBudgetPlanner;
