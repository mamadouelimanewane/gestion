import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Download, Filter, FileText, Activity } from 'lucide-react';

const ReportingModule = () => {
  const [activeTab, setActiveTab] = useState('tableaux');

  const tabs = [
    { id: 'tableaux', label: 'Tableaux de bord', icon: Activity },
    { id: 'etats', label: 'États Financiers', icon: FileText },
    { id: 'analytique', label: 'Comptabilité Analytique', icon: PieChart },
    { id: 'kpi', label: 'Indicateurs (KPI)', icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4">
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
      </div>

      {/* Content based on tab */}
      {activeTab === 'tableaux' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          {/* Action Bar */}
          <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-4">
              <select className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-300">
                 <option>Année en cours (2024)</option>
                 <option>Année précédente (2023)</option>
              </select>
              <select className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-300">
                 <option>Tous les départements</option>
                 <option>Direction</option>
                 <option>Production</option>
                 <option>Commercial</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm transition-colors">
                <Download size={16} />
                Exporter PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Chiffre d\'Affaires Cumulé', value: '1,245,000 €', trend: '+15.2%', color: 'emerald' },
              { label: 'Marge Brute Globale', value: '45%', trend: '+2.1 pts', color: 'indigo' },
              { label: 'EBE (EBITDA)', value: '320,500 €', trend: '+8.4%', color: 'amber' },
              { label: 'BFR', value: '145,200 €', trend: '-5.3%', color: 'rose' },
            ].map((kpi, i) => (
              <div key={i} className="card">
                 <p className="text-sm text-slate-400">{kpi.label}</p>
                 <div className="flex items-end justify-between mt-2">
                    <h3 className="text-2xl font-bold">{kpi.value}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-${kpi.color}-500/10 text-${kpi.color}-400 border border-${kpi.color}-500/20`}>
                       {kpi.trend}
                    </span>
                 </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="card h-80 flex flex-col items-center justify-center border-dashed">
                 <BarChart3 size={48} className="text-slate-700 mb-4" />
                 <p className="text-slate-500 font-medium">Évolution du CA vs Objectifs</p>
                 <p className="text-xs text-slate-600 mt-1">Graphe dynamique de comparaison</p>
             </div>
             <div className="card h-80 flex flex-col items-center justify-center border-dashed">
                 <PieChart size={48} className="text-slate-700 mb-4" />
                 <p className="text-slate-500 font-medium">Répartition des charges par nature</p>
                 <p className="text-xs text-slate-600 mt-1">Analyse détaillée des dépenses</p>
             </div>
          </div>
        </motion.div>
      )}

      {/* États Financiers */}
      {activeTab === 'etats' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
                { title: 'Bilan Comptable', desc: 'Actif, Passif et Capitaux Propres à un instant T.', icon: FileText, color: 'indigo' },
                { title: 'Compte de Résultat', desc: 'Analyse des produits et des charges de l\'exercice.', icon: Activity, color: 'emerald' },
                { title: 'SIG', desc: 'Soldes Intermédiaires de Gestion détaillés.', icon: BarChart3, color: 'amber' },
                { title: 'Tableau des Flux', desc: 'Flux de trésorerie de l\'activité, investissement et financement.', icon: TrendingUp, color: 'rose' },
             ].map((report, i) => (
                <div key={i} className="card hover:border-slate-600 cursor-pointer transition-colors group">
                   <div className={`w-12 h-12 rounded-xl bg-${report.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <report.icon size={24} className={`text-${report.color}-400`} />
                   </div>
                   <h3 className="font-bold text-lg mb-2">{report.title}</h3>
                   <p className="text-sm text-slate-400 mb-4">{report.desc}</p>
                   <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
                      Générer le rapport &rarr;
                   </button>
                </div>
             ))}
          </div>
        </motion.div>
      )}

      {/* Analytique */}
      {activeTab === 'analytique' && (
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card flex flex-col items-center justify-center h-96 border-dashed"
         >
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <PieChart size={32} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Comptabilité Analytique</h3>
            <p className="text-slate-400 max-w-md text-center mb-6">
              Analysez la rentabilité par centre de coût, projet, département ou ligne de produit. Ventilation automatique selon vos clés de répartition.
            </p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
              Configurer les axes analytiques
            </button>
         </motion.div>
      )}
      
      {/* KPI */}
      {activeTab === 'kpi' && (
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card flex flex-col items-center justify-center h-96 border-dashed"
         >
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <TrendingUp size={32} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Indicateurs de Performance</h3>
            <p className="text-slate-400 max-w-md text-center mb-6">
              Créez vos propres ratios financiers (Liquidité, Solvabilité, Rentabilité) et suivez leur évolution dans le temps par rapport à vos objectifs.
            </p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
              Créer un nouvel indicateur personnalisé
            </button>
         </motion.div>
      )}

    </div>
  );
};

export default ReportingModule;
