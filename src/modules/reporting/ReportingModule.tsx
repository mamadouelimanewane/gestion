import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, PieChart, TrendingUp, Download, Filter, 
  FileText, Activity, Layers, Globe, ShieldCheck,
  Zap, Calendar, ChevronRight, Eye, Printer, 
  ArrowUpRight, ArrowDownRight, Target, BrainCircuit, Plus,
  Sparkles, FileSearch, PieChart as PieChartIcon
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
    <div className="flex flex-col h-full gap-8">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 rounded-xl border border-[#cbd5e1] shadow-sm">
        <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1] shadow-inner overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-2.5 rounded text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-[#005eb8] shadow-sm border border-[#cbd5e1]'
                  : 'text-[#64748b] hover:text-[#0f172a] hover:bg-white/50'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={handleAiAnalysis}
             className="flex items-center gap-3 px-6 py-2.5 bg-white border border-[#cbd5e1] rounded-lg text-[11px] font-bold uppercase tracking-widest text-[#005eb8] hover:bg-blue-50 transition-all shadow-sm group"
           >
              <BrainCircuit size={20} className={isAiLoading ? 'animate-spin' : 'group-hover:scale-110 transition-transform'} />
              {isAiLoading ? 'Analyse en cours...' : 'Intelligence Joule IA'}
           </button>
           <button className="flex items-center gap-3 px-8 py-2.5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg">
              <Download size={20} />
              Rapport Annuel
           </button>
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
            className="flex flex-col gap-8"
          >
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard title="Chiffre d'Affaires" value="1 245 800 000 F" trend="+15.2%" color="green" sub="Vs Année N-1" icon={<BarChart3 size={20} />} />
              <KpiCard title="Excédent Brut (EBE)" value="452 300 000 F" trend="+8.4%" color="blue" sub="Performance Opé" icon={<Activity size={20} />} />
              <KpiCard title="Marge de Manœuvre" value="128 400 000 F" trend="-2.1%" color="orange" sub="Trésorerie Libre" icon={<TrendingUp size={20} />} />
              <KpiCard title="Health Score ERP" value="94 / 100" trend="OPTIMAL" color="green" sub="Intégrité Data" icon={<ShieldCheck size={20} />} />
            </div>

            {/* Charts & Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-white rounded-xl border border-[#cbd5e1] p-8 flex flex-col gap-8 shadow-sm">
                  <div className="flex justify-between items-center">
                     <div>
                        <h3 className="font-bold text-[13px] uppercase tracking-[0.2em] text-[#0f172a]">Évolution des Flux Financiers</h3>
                        <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-widest mt-1 opacity-70">Comparatif Encaissements vs Décaissements (12 mois)</p>
                     </div>
                     <div className="flex gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded text-[10px] font-bold text-[#107e3e] uppercase">Entrées</div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded text-[10px] font-bold text-[#dc2626] uppercase">Sorties</div>
                     </div>
                  </div>
                  <div className="h-80 bg-[#f8fafc] rounded-xl border border-[#cbd5e1] flex items-center justify-center relative overflow-hidden group shadow-inner">
                     <BarChart3 size={64} className="text-[#94a3b8] group-hover:text-[#005eb8] transition-all duration-700 transform group-hover:scale-110" />
                     <div className="absolute bottom-6 flex items-center gap-3">
                        <Activity size={14} className="text-[#005eb8] animate-pulse" />
                        <p className="text-[10px] font-bold uppercase text-[#64748b] tracking-[0.3em]">Moteur Graphique Joule Analytics</p>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-xl border border-[#cbd5e1] p-8 flex flex-col gap-8 shadow-sm">
                  <h3 className="font-bold text-[13px] uppercase tracking-[0.2em] text-[#0f172a]">Structure des Coûts</h3>
                  <div className="flex-1 flex flex-col justify-center gap-8">
                     <div className="relative w-48 h-48 mx-auto group">
                        <div className="absolute inset-0 border-[14px] border-[#f1f5f9] rounded-full shadow-inner transition-transform group-hover:scale-105"></div>
                        <div className="absolute inset-0 border-[14px] border-[#005eb8] rounded-full border-t-transparent border-r-transparent rotate-45 group-hover:rotate-[225deg] transition-all duration-1000 ease-in-out"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <p className="text-3xl font-bold text-[#0f172a] tracking-tighter">65%</p>
                           <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1">Salaires</p>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <ChartLegend color="blue" label="Masse Salariale" value="65%" />
                        <ChartLegend color="green" label="Charges Fixes" value="20%" />
                        <ChartLegend color="orange" label="Autres" value="15%" />
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
             <ReportCard 
               title="Bilan Actif/Passif" 
               desc="Conforme au Système Minimal de Trésorerie & Système Normal SYSCOHADA." 
               icon={<FileSearch size={28} />} 
               color="blue" 
             />
             <ReportCard 
               title="Compte de Résultat" 
               desc="Analyse détaillée des marges, de la valeur ajoutée et du résultat net." 
               icon={<PieChartIcon size={28} />} 
               color="green" 
             />
             <ReportCard 
               title="Tableau de Flux (TFT)" 
               desc="Flux d'exploitation, d'investissement et de financement." 
               icon={<TrendingUp size={28} />} 
               color="orange" 
             />
             <ReportCard 
               title="Soldes Intermédiaires" 
               desc="Visualisation des SIG : Production, VA, EBE, REX." 
               icon={<Layers size={28} />} 
               color="blue" 
             />
             <ReportCard 
               title="État de la TVA" 
               desc="Récapitulatif annuel de la TVA déductible et collectée par mois." 
               icon={<Globe size={28} />} 
               color="green" 
             />
             <div className="bg-white border-2 border-dashed border-[#cbd5e1] rounded-xl flex flex-col items-center justify-center p-12 opacity-50 hover:opacity-100 hover:border-[#005eb8] hover:bg-blue-50/20 transition-all cursor-pointer group">
                <Plus size={48} className="text-[#94a3b8] group-hover:text-[#005eb8] mb-4 transition-transform group-hover:scale-110" />
                <p className="text-[12px] font-bold uppercase text-[#64748b] tracking-[0.2em] text-center group-hover:text-[#0f172a]">Nouveau Rapport<br/>Personnalisé</p>
             </div>
          </motion.div>
        )}

        {/* Contrôle de Gestion (Analytique) */}
        {activeTab === 'analytique' && (
          <motion.div
            key="analytique"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >
             <div className="bg-white border border-[#cbd5e1] rounded-xl p-10 flex items-center justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="space-y-6 max-w-2xl relative z-10">
                   <div className="flex items-center gap-4 text-[#005eb8]">
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl shadow-inner">
                         <Layers size={40} />
                      </div>
                      <h3 className="text-3xl font-bold uppercase tracking-tighter">Axe Analytique par Projet</h3>
                   </div>
                   <p className="text-[#64748b] text-sm leading-relaxed font-bold uppercase tracking-wide opacity-80">
                      Visualisez la rentabilité nette de chaque projet en croisant les factures de ventes, 
                      les achats de consommables et les heures passées par vos employés.
                   </p>
                   <div className="flex gap-4">
                      <button className="px-8 py-4 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg flex items-center gap-3">
                         <Target size={18} /> Configurer les Répartitions
                      </button>
                      <button className="px-8 py-4 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-sm">
                         Voir Documentation
                      </button>
                   </div>
                </div>
                <div className="hidden lg:block w-64 h-64 bg-[#f8fafc] rounded-full border border-[#cbd5e1] shadow-inner relative overflow-hidden group-hover:scale-105 transition-transform">
                   <div className="absolute inset-0 flex items-center justify-center text-[#005eb8]/10 rotate-12">
                      <Target size={180} />
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-tr from-[#005eb8]/5 to-transparent"></div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProjectKpi name="Construction Immeuble A (Dakar Plateau)" budget="150 000 000" actual="112 500 000" status="Optimal" />
                <ProjectKpi name="Maintenance Flotte Logistique (Zone Franche)" budget="45 000 000" actual="42 800 000" status="Vigilance" />
             </div>
          </motion.div>
        )}

        {/* Intelligence Éco (KPIs) */}
        {activeTab === 'kpi' && (
          <motion.div
            key="kpi"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#cbd5e1] rounded-xl flex flex-col items-center justify-center p-20 shadow-sm relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
             <div className="w-28 h-28 bg-[#f8fafc] rounded-[2.5rem] flex items-center justify-center mb-8 border border-[#cbd5e1] shadow-inner relative group">
                <Zap size={48} className="text-orange-500 group-hover:scale-110 transition-transform animate-pulse" />
                <Sparkles size={24} className="absolute -top-2 -right-2 text-blue-500 animate-bounce" />
             </div>
             <h3 className="text-3xl font-bold uppercase tracking-tighter text-[#0f172a]">Reporting Prédictif Joule AI</h3>
             <p className="text-[#64748b] max-w-lg text-center mt-6 text-[12px] font-bold uppercase tracking-widest leading-relaxed opacity-70">
               Utilisez l'Intelligence Artificielle générative pour prédire vos besoins de trésorerie à 6 mois et détecter les anomalies de facturation avant qu'elles ne deviennent critiques.
             </p>
             <button className="mt-12 px-12 py-5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-[2rem] text-[11px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20 transition-all flex items-center gap-4 group">
               <BrainCircuit size={20} className="group-hover:rotate-12 transition-transform" />
               Lancer l'Analyse Prédictive GPRO
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const KpiCard = ({ title, value, trend, color, sub, icon }: any) => (
  <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 group hover:border-[#005eb8] transition-all cursor-pointer relative overflow-hidden shadow-sm">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${color === 'green' ? 'bg-[#107e3e]' : color === 'blue' ? 'bg-[#005eb8]' : 'bg-orange-500'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-4">
       <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-[0.2em] leading-none">{title}</p>
       <div className={`p-2.5 rounded-lg border shadow-inner ${color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-100' : color === 'blue' ? 'bg-blue-50 text-[#005eb8] border-blue-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
          {icon}
       </div>
    </div>
    <h3 className="text-2xl font-bold text-[#0f172a] group-hover:text-[#005eb8] transition-colors tracking-tighter">{value}</h3>
    <div className="flex items-center justify-between mt-6">
       <span className={`text-[10px] font-bold px-3 py-1 rounded border tracking-widest ${color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-200' : color === 'blue' ? 'bg-blue-50 text-[#005eb8] border-blue-200' : 'bg-orange-50 text-orange-600 border-orange-200'}`}>
          {trend}
       </span>
       <p className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-widest italic">{sub}</p>
    </div>
  </div>
);

const ChartLegend = ({ color, label, value }: any) => (
  <div className="flex items-center justify-between group cursor-pointer border-b border-transparent hover:border-[#f1f5f9] pb-1 transition-all">
     <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color === 'blue' ? 'bg-[#005eb8]' : color === 'green' ? 'bg-[#107e3e]' : 'bg-orange-500'} group-hover:scale-125 transition-transform shadow-sm`} />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b] group-hover:text-[#0f172a] transition-colors">{label}</span>
     </div>
     <span className="text-[12px] font-bold text-[#0f172a] tracking-tight">{value}</span>
  </div>
);

const ReportCard = ({ title, desc, icon, color }: any) => (
  <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 group hover:border-[#005eb8] cursor-pointer transition-all hover:-translate-y-2 shadow-sm">
     <div className={`w-14 h-14 rounded-2xl border shadow-inner flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${
       color === 'blue' ? 'bg-blue-50 text-[#005eb8] border-blue-100' : color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'
     }`}>
        {icon}
     </div>
     <h3 className="font-bold text-[#0f172a] group-hover:text-[#005eb8] transition-colors uppercase text-sm tracking-[0.2em]">{title}</h3>
     <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-widest mt-4 leading-relaxed opacity-70">{desc}</p>
     <div className="mt-10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-0 translate-y-2">
        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#005eb8] hover:underline">
           <Eye size={16} /> Aperçu
        </button>
        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] hover:text-[#0f172a]">
           <Printer size={16} /> Imprimer
        </button>
     </div>
  </div>
);

const ProjectKpi = ({ name, budget, actual, status }: any) => (
  <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 flex flex-col gap-6 shadow-sm group hover:border-[#005eb8] transition-all">
     <div className="flex justify-between items-start">
        <h4 className="font-bold text-[#0f172a] text-xs uppercase tracking-widest leading-relaxed max-w-[200px]">{name}</h4>
        <span className={`px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest ${
          status === 'Optimal' ? 'bg-green-50 text-[#107e3e] border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'
        }`}>{status}</span>
     </div>
     <div className="space-y-3">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
           <span>Consommation Budget</span>
           <span className={status === 'Optimal' ? 'text-[#107e3e]' : 'text-orange-600'}>{(parseInt(actual.replace(/\s/g, '')) / parseInt(budget.replace(/\s/g, '')) * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full h-2.5 bg-[#f1f5f9] rounded-full overflow-hidden shadow-inner">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${(parseInt(actual.replace(/\s/g, '')) / parseInt(budget.replace(/\s/g, '')) * 100)}%` }} 
             className={`h-full shadow-lg ${status === 'Optimal' ? 'bg-[#107e3e]' : 'bg-orange-500'}`} 
           />
        </div>
     </div>
     <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8] mt-2">
        <span>Prévu: <span className="text-[#0f172a] ml-1">{budget} F</span></span>
        <span>Réel: <span className="text-[#005eb8] ml-1">{actual} F</span></span>
     </div>
  </div>
);

export default ReportingModule;
