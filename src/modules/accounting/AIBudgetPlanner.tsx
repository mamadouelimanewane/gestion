import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, TrendingUp, TrendingDown, Target, 
  BarChart3, RefreshCw, Save, ArrowRight,
  BrainCircuit, Zap, AlertTriangle, CheckCircle2,
  PieChart, Info, DollarSign, Database, Layers,
  ShieldCheck, History, Printer, Download, Share2,
  ChevronRight, MoreVertical, Activity, BarChart, Edit
} from 'lucide-react';

const AIBudgetPlanner = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scenario, setScenario] = useState('Optimiste (+15%)');

  const budgetLines = [
    { id: 1, poste: 'ACHATS MATIÈRES PREMIÈRES (CACAO)', reel_n1: 125000000, budget_n: 143750000, ecart: '+15%', conf: 92 },
    { id: 2, poste: 'FRAIS DE PERSONNEL & MASSE SALARIALE', reel_n1: 85000000, budget_n: 89250000, ecart: '+5%', conf: 98 },
    { id: 3, poste: 'SERVICES EXTÉRIEURS & MAINTENANCE', reel_n1: 42000000, budget_n: 44100000, ecart: '+5%', conf: 85 },
    { id: 4, poste: 'BUDGET COMMUNICATION & DIGITAL', reel_n1: 15000000, budget_n: 22500000, ecart: '+50%', conf: 70 },
  ];

  const handleRunAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2500);
  };

  const formatCfa = (val: number) => {
    return val.toLocaleString('fr-FR') + ' F';
  };

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* AI Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
              <BrainCircuit size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Planification Budgétaire IA (Predictive)</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Simulation S/4HANA SAC • Algorithmes de Régression Linéaire • Forecasting 2025</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <div className="flex flex-col gap-2">
              <label className="text-[9px] font-black text-[#94a3b8] uppercase tracking-widest px-1">Scénario de Simulation</label>
              <select 
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-6 py-3 text-[11px] font-black uppercase tracking-widest text-[#334155] outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-inner cursor-pointer appearance-none min-w-[200px]"
              >
                 <option>Conservateur (0%)</option>
                 <option>Optimiste (+15%)</option>
                 <option>Agressif (+30%)</option>
              </select>
           </div>
           <button 
             onClick={handleRunAI}
             disabled={isAnalyzing}
             className="flex items-center gap-3 px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-indigo-500/20 self-end h-[50px]"
           >
              {isAnalyzing ? <RefreshCw size={20} className="animate-spin" /> : <Zap size={20} />}
              {isAnalyzing ? 'Calcul...' : 'Lancer Simulation'}
           </button>
        </div>
      </div>

      {/* Forecasting KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <ForecastingCard title="Revenus Prédits 2025" value="526 964 000 F" sub="Vs 458M (Exercice N-1)" color="emerald" trend="+15%" icon={<TrendingUp size={20} />} />
         <ForecastingCard title="Charges Estimées" value="299 600 000 F" sub="Optimisation IA Joule" color="blue" trend="+8%" icon={<Layers size={20} />} />
         <ForecastingCard title="Marge Brute Proj." value="43.1 %" sub="Objectif Stratégique : 40%" color="amber" trend="+3.1%" icon={<Activity size={20} />} />
         <ForecastingCard title="Confiance Modèle" value="94.2 %" sub="Précision Backtest v2.4" color="indigo" trend="Stable" icon={<ShieldCheck size={20} />} />
      </div>

      {/* Main Analysis Table Container */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[500px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100 shadow-inner">
                 <Sparkles size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Propositions Budgétaires Pro-Forma par Poste</h3>
           </div>
           <div className="flex gap-6">
              <button className="flex items-center gap-3 px-6 py-2 bg-white border border-[#cbd5e1] rounded-xl shadow-sm text-[10px] font-black uppercase text-[#64748b] hover:text-[#005eb8] transition-all">
                 <BarChart3 size={16} /> Analytique Graphes
              </button>
              <button className="flex items-center gap-3 px-6 py-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/20 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">
                 <Save size={16} /> Valider Proposition
              </button>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-6">Libellé du Poste Budgétaire</th>
                <th className="px-10 py-6 text-right">Réel Exercice N-1</th>
                <th className="px-10 py-6 text-right bg-indigo-50/30 text-indigo-700">Proposition IA N+1</th>
                <th className="px-10 py-6 text-center">Évolution Prédite</th>
                <th className="px-10 py-6 text-center">Fiabilité du Modèle</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {budgetLines.map((line) => (
                <tr key={line.id} className="group hover:bg-indigo-50/10 transition-all cursor-pointer">
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                    <div className="flex flex-col">
                       <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{line.poste}</span>
                       <span className="text-[9px] font-mono font-bold text-[#94a3b8] tracking-widest mt-1 uppercase">ID RÉFÉRENCE : B-{line.id}000</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-[#64748b] text-sm tracking-tighter">
                     {formatCfa(line.reel_n1)}
                  </td>
                  <td className="px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-indigo-700 text-lg tracking-tighter bg-indigo-50/5">
                     {formatCfa(line.budget_n)}
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                     <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-[2rem] text-[9px] font-black uppercase tracking-widest shadow-sm ${
                        line.ecart.includes('+') ? 'bg-red-50 text-[#dc2626] border-red-100' : 'bg-green-50 text-[#107e3e] border-green-100'
                     }`}>
                        {line.ecart.includes('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {line.ecart}
                     </div>
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-24 h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden shadow-inner border border-[#cbd5e1] p-0.5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${line.conf}%` }}
                            className={`h-full rounded-full ${line.conf > 90 ? 'bg-[#107e3e]' : line.conf > 80 ? 'bg-indigo-500' : 'bg-amber-500'}`}
                          />
                       </div>
                       <span className="text-[9px] font-black text-[#64748b] uppercase tracking-widest">{line.conf}% Précision</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#005eb8] hover:border-blue-100 shadow-sm transition-all"><Edit size={18} /></button>
                      <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#0f172a] hover:border-slate-400 shadow-sm transition-all"><MoreVertical size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insight Insight Card (Morning Horizon Style) */}
      <div className="bg-indigo-600 border border-indigo-700 p-10 rounded-2xl flex items-center gap-12 shadow-xl relative overflow-hidden group cursor-pointer">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl group-hover:scale-110 transition-transform"></div>
         <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-inner group-hover:rotate-12 transition-transform relative z-10">
            <Sparkles size={40} />
         </div>
         <div className="flex-1 relative z-10">
            <h5 className="text-xl font-black text-white uppercase tracking-tighter mb-2 leading-none">Insight Prédictif Stratégique : Investissement Digital</h5>
            <p className="text-[13px] text-indigo-100 font-medium leading-relaxed uppercase tracking-tight opacity-90 max-w-4xl">
               L'algorithme Joule suggère une augmentation de **50%** du budget Communication. Les corrélations sectorielles indiquent qu'une telle hausse 
               génère historiquement un incrément de Chiffre d'Affaires de **18%** sur les 12 mois glissants. 
               <span className="text-white ml-3 underline font-black uppercase text-[11px] cursor-pointer hover:text-amber-400 transition-colors">Explorer l'Analyse de Corrélation Multi-Factorielle →</span>
            </p>
         </div>
         <div className="flex gap-6 relative z-10">
            <div className="flex flex-col items-center gap-2">
               <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-all">
                  <PieChart size={24} />
               </div>
               <span className="text-[9px] font-black text-white uppercase opacity-60">Répartition</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-all">
                  <Target size={24} />
               </div>
               <span className="text-[9px] font-black text-white uppercase opacity-60">Objectifs</span>
            </div>
         </div>
      </div>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-8">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={32} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Forecasting IA Certifié (S/4 SAC Standards)</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic leading-relaxed">
                  Le moteur de prédiction Joule IA utilise des modèles de régression entraînés sur vos 5 derniers exercices fiscaux • Validation Gouvernance Financière.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-4 text-[#64748b] hover:text-[#005eb8] text-[10px] font-black uppercase tracking-[0.4em] transition-all group">
               <History size={22} className="group-hover:rotate-[-45deg] transition-transform" /> Journal d'Apprentissage
            </button>
            <button className="flex items-center gap-4 text-[#005eb8] hover:text-[#004080] text-[10px] font-black uppercase tracking-[0.5em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={22} className="group-hover:rotate-12 transition-transform" /> Partager Plan
               <ArrowRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

const ForecastingCard = ({ title, value, sub, color, trend, icon }: any) => (
  <div className="bg-white border border-[#cbd5e1] p-8 rounded-2xl relative overflow-hidden group hover:border-indigo-600 transition-all shadow-sm cursor-pointer">
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
       <p className="text-[11px] font-black text-[#94a3b8] uppercase tracking-widest leading-none">{title}</p>
       <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
         trend.startsWith('+') ? 'bg-green-50 text-[#107e3e] border border-green-100' : 
         trend.startsWith('-') ? 'bg-red-50 text-[#dc2626] border border-red-100' : 
         'bg-blue-50 text-[#005eb8] border border-blue-100'
       } shadow-sm`}>{trend}</span>
    </div>
    <h3 className="text-2xl font-black text-[#0f172a] tracking-tighter relative z-10">{value}</h3>
    <div className="flex items-center gap-4 mt-4 relative z-10">
       <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[#f8fafc] border border-[#cbd5e1] text-[#94a3b8] group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all`}>
          {icon}
       </div>
       <p className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-tighter leading-tight">{sub}</p>
    </div>
  </div>
);

export default AIBudgetPlanner;
