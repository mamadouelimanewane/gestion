import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, PieChart, TrendingUp, Download, Filter, 
  FileText, Activity, Layers, Globe, ShieldCheck,
  Zap, Calendar, ChevronRight, Eye, Printer, 
  ArrowUpRight, ArrowDownRight, Target, BrainCircuit, Plus
} from 'lucide-react';

const ReportingModule = () => {
  const [activeTab, setActiveTab] = useState('tableaux');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const tabs = [
    { id: 'tableaux', label: 'Dashboard Stratégique', icon: Activity },
    { id: 'etats', label: 'États SYSCOHADA', icon: FileText },
    { id: 'analytique', label: 'Contrôle de Gestion', icon: Layers },
    { id: 'kpi', label: 'Intelligence Éco', icon: Zap },
  ];

  const handleAiAnalysis = () => {
    setIsAiLoading(true);
    setTimeout(() => setIsAiLoading(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={handleAiAnalysis}
               className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-bold text-indigo-400 hover:bg-indigo-500/10 transition-all"
             >
                <BrainCircuit size={18} className={isAiLoading ? 'animate-pulse' : ''} />
                {isAiLoading ? 'Analyse en cours...' : 'Insights IA'}
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
                <Download size={16} />
                Rapport Annuel
             </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Dashboard Stratégique */}
        {activeTab === 'tableaux' && (
          <motion.div
            key="tableaux"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard title="Chiffre d'Affaires" value="1 245 800 000 F" trend="+15.2%" color="emerald" sub="Vs Année N-1" />
              <KpiCard title="Excédent Brut (EBE)" value="452 300 000 F" trend="+8.4%" color="indigo" sub="Performance Opé" />
              <KpiCard title="Marge de Manœuvre" value="128 400 000 F" trend="-2.1%" color="amber" sub="Trésorerie Libre" />
              <KpiCard title="Health Score ERP" value="94 / 100" trend="OPTIMAL" color="emerald" sub="Intégrité Data" />
            </div>

            {/* Charts & Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 card bg-slate-800/30 border-slate-700/50 p-6 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                     <div>
                        <h3 className="font-black text-sm uppercase tracking-widest text-white">Évolution des Flux Financiers</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">Comparatif Encaissements vs Décaissements (12 mois)</p>
                     </div>
                     <div className="flex gap-2">
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-bold text-emerald-400">Entrées</div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-[10px] font-bold text-rose-400">Sorties</div>
                     </div>
                  </div>
                  <div className="h-72 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden group">
                     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
                     <BarChart3 size={64} className="text-slate-800 group-hover:text-indigo-900 transition-colors duration-700" />
                     <p className="absolute text-[10px] font-black uppercase text-slate-600 tracking-widest">Visualisation Interactive des Données</p>
                  </div>
               </div>

               <div className="card bg-slate-800/30 border-slate-700/50 p-6 flex flex-col gap-6">
                  <h3 className="font-black text-sm uppercase tracking-widest text-white">Structure des Coûts</h3>
                  <div className="flex-1 flex flex-col justify-center gap-6">
                     <div className="relative w-40 h-40 mx-auto">
                        <div className="absolute inset-0 border-[12px] border-slate-800 rounded-full"></div>
                        <div className="absolute inset-0 border-[12px] border-indigo-500 rounded-full border-t-transparent border-r-transparent rotate-45 shadow-[0_0_15px_rgba(99,102,241,0.3)]"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <p className="text-2xl font-black text-white">65%</p>
                           <p className="text-[8px] font-bold text-slate-500 uppercase">Salaires</p>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <ChartLegend color="indigo" label="Masse Salariale" value="65%" />
                        <ChartLegend color="emerald" label="Charges Fixes" value="20%" />
                        <ChartLegend color="amber" label="Autres" value="15%" />
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* États SYSCOHADA */}
        {activeTab === 'etats' && (
          <motion.div
            key="etats"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
             <ReportCard 
               title="Bilan Actif/Passif" 
               desc="Conforme au Système Minimal de Trésorerie & Système Normal SYSCOHADA." 
               icon={<FileText size={24} />} 
               color="indigo" 
             />
             <ReportCard 
               title="Compte de Résultat" 
               desc="Analyse détaillée des marges, de la valeur ajoutée et du résultat net." 
               icon={<Activity size={24} />} 
               color="emerald" 
             />
             <ReportCard 
               title="Tableau de Flux (TFT)" 
               desc="Flux d'exploitation, d'investissement et de financement." 
               icon={<TrendingUp size={24} />} 
               color="rose" 
             />
             <ReportCard 
               title="Soldes Intermédiaires" 
               desc="Visualisation des SIG : Production, VA, EBE, REX." 
               icon={<Layers size={24} />} 
               color="amber" 
             />
             <ReportCard 
               title="État de la TVA" 
               desc="Récapitulatif annuel de la TVA déductible et collectée par mois." 
               icon={<Globe size={24} />} 
               color="indigo" 
             />
             <div className="card border-dashed flex flex-col items-center justify-center p-8 opacity-50 hover:opacity-100 transition-opacity">
                <Plus size={32} className="text-slate-600 mb-2" />
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Nouveau Rapport<br/>Personnalisé</p>
             </div>
          </motion.div>
        )}

        {/* Contrôle de Gestion (Analytique) */}
        {activeTab === 'analytique' && (
          <motion.div
            key="analytique"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
             <div className="card bg-indigo-500/5 border-indigo-500/20 p-8 flex items-center justify-between">
                <div className="space-y-4 max-w-xl">
                   <div className="flex items-center gap-3 text-indigo-400">
                      <Layers size={32} />
                      <h3 className="text-xl font-black uppercase tracking-widest">Axe Analytique par Projet</h3>
                   </div>
                   <p className="text-slate-400 text-sm leading-relaxed font-medium">
                      Visualisez la rentabilité nette de chaque projet en croisant les factures de ventes, 
                      les achats de consommables et les heures passées par vos employés.
                   </p>
                   <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                      Configurer les Clés de Répartition
                   </button>
                </div>
                <div className="hidden lg:block w-48 h-48 bg-slate-900 rounded-full border-4 border-slate-800 shadow-2xl relative overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center text-indigo-500/20 rotate-12">
                      <Target size={120} />
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectKpi name="Projet : Construction Immeuble A" budget="150M F" actual="112M F" status="Optimal" />
                <ProjectKpi name="Projet : Maintenance Flotte" budget="45M F" actual="42M F" status="Vigilance" />
             </div>
          </motion.div>
        )}

        {/* Intelligence Éco (KPIs) */}
        {activeTab === 'kpi' && (
          <motion.div
            key="kpi"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card flex flex-col items-center justify-center h-96 border-dashed"
          >
             <div className="w-20 h-20 bg-slate-800/50 rounded-3xl flex items-center justify-center mb-6 border border-slate-700 shadow-inner">
                <Zap size={32} className="text-amber-400 animate-pulse" />
             </div>
             <h3 className="text-xl font-black uppercase tracking-[0.1em]">Reporting Prédictif (IA)</h3>
             <p className="text-slate-500 max-w-sm text-center mt-3 text-sm font-medium">
               Utilisez l'Intelligence Artificielle pour prédire vos besoins de trésorerie à 6 mois et détecter les anomalies de facturation avant qu'elles ne deviennent critiques.
             </p>
             <button className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20 transition-all">
               Lancer l'Analyse Prédictive
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const KpiCard = ({ title, value, trend, color, sub }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden shadow-xl">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-2">{title}</p>
    <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">{value}</h3>
    <div className="flex items-center justify-between mt-3">
       <span className={`text-[10px] font-black px-2 py-1 rounded-lg bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>
          {trend}
       </span>
       <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">{sub}</p>
    </div>
  </div>
);

const ChartLegend = ({ color, label, value }: any) => (
  <div className="flex items-center justify-between group cursor-pointer">
     <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full bg-${color}-500 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(var(--tw-color-${color}-500),0.5)]`} />
        <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">{label}</span>
     </div>
     <span className="text-xs font-black text-white">{value}</span>
  </div>
);

const ReportCard = ({ title, desc, icon, color }: any) => (
  <div className="card group hover:border-slate-600 cursor-pointer transition-all hover:-translate-y-1">
     <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
        <div className={`text-${color}-400`}>{icon}</div>
     </div>
     <h3 className="font-black text-white group-hover:text-indigo-400 transition-colors uppercase text-sm tracking-widest">{title}</h3>
     <p className="text-xs text-slate-500 font-medium mt-3 leading-relaxed">{desc}</p>
     <div className="mt-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all">
        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase text-indigo-400">
           <Eye size={12} /> Aperçu
        </button>
        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 hover:text-white">
           <Download size={12} /> PDF
        </button>
     </div>
  </div>
);

const ProjectKpi = ({ name, budget, actual, status }: any) => (
  <div className="card border-slate-700/50 p-6 flex flex-col gap-4">
     <div className="flex justify-between items-start">
        <h4 className="font-black text-white text-sm">{name}</h4>
        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
          status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
        }`}>{status}</span>
     </div>
     <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
           <span>Consommation Budget</span>
           <span>{(parseInt(actual) / parseInt(budget) * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
           <div 
             className={`h-full ${status === 'Optimal' ? 'bg-emerald-500' : 'bg-amber-500'}`} 
             style={{ width: `${(parseInt(actual) / parseInt(budget) * 100)}%` }} 
           />
        </div>
     </div>
     <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mt-2">
        <span>Prévu: <span className="text-white">{budget}</span></span>
        <span>Réel: <span className="text-white">{actual}</span></span>
     </div>
  </div>
);

export default ReportingModule;
