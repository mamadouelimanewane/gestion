import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Activity, Calendar, 
  AlertTriangle, CheckCircle2, Plus, 
  Search, Filter, MoreVertical, Layers,
  Wrench, ShieldCheck, Database, Zap,
  BarChart3, Layout, Smartphone
} from 'lucide-react';

const PlantMaintenance = () => {
  const [activeTab, setActiveTab] = useState<'planning' | 'orders' | 'assets' | 'kpis'>('planning');

  const tabs = [
    { id: 'planning', label: 'Planning Préventif', icon: Calendar },
    { id: 'orders', label: 'Bons de Travail (OT)', icon: Wrench },
    { id: 'assets', label: 'Parc Industriel', icon: Settings },
    { id: 'kpis', label: 'Analyse Fiabilité', icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Maintenance Header */}
      <div className="flex justify-between items-center bg-rose-600/10 border border-rose-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/40">
               <Wrench size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1">Maintenance Industrielle (PM)</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">Gestion des Actifs • GMAO Intégrée • Maintenance Préventive & Curative</p>
            </div>
         </div>
         <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50 relative z-10 overflow-x-auto no-scrollbar max-w-[60%]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                 <tab.icon size={14} />
                 {tab.label}
              </button>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'planning' && (
           <motion.div 
             key="planning"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col gap-6"
           >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <MaintenanceStat label="Équipements Critiques" value="12" status="Sous Surveillance" color="indigo" />
                 <MaintenanceStat label="Préventifs en retard" value="3" status="Alerte Priorité" color="rose" />
                 <MaintenanceStat label="Taux de Disponibilité" value="98.2%" status="Optimal" color="emerald" />
              </div>

              <div className="card bg-slate-800/20 border-slate-700/50 p-8 shadow-2xl flex flex-col gap-6">
                 <h4 className="text-xs font-black uppercase tracking-widest text-white italic">Plan de Maintenance Hebdomadaire</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <PlanningDay day="Lundi" task="Révision Machine A" status="Terminé" color="emerald" />
                    <PlanningDay day="Mardi" task="Graissage Extrudeuse" status="En cours" color="amber" />
                    <PlanningDay day="Mercredi" task="Checkup Électrique" status="Prévu" color="slate" />
                    <PlanningDay day="Jeudi" task="Contrôle Filtres" status="Prévu" color="slate" />
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'orders' && (
           <motion.div 
             key="orders"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl"
           >
              <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                 <h4 className="text-xs font-black uppercase tracking-widest text-white">Ordres de Travail (Work Orders)</h4>
                 <button className="flex items-center gap-2 px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                    <Plus size={16} /> Créer OT
                 </button>
              </div>
              <div className="p-0">
                 <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                       <tr>
                          <th className="p-6">N° OT</th>
                          <th className="p-6">Équipement</th>
                          <th className="p-6">Type</th>
                          <th className="p-6">Technicien</th>
                          <th className="p-6">Priorité</th>
                          <th className="p-6 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30 text-[11px] font-mono">
                       <OrderRow id="OT-4492" asset="Extrudeuse EX-101" type="Préventif" tech="K. Diallo" priority="Basse" />
                       <OrderRow id="OT-4493" asset="Groupe Électrogène" type="Curatif" tech="S. Ndiaye" priority="Critique" alert />
                       <OrderRow id="OT-4494" asset="Convoyeur Central" type="Amélioration" tech="P. Faye" priority="Moyenne" />
                    </tbody>
                 </table>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const MaintenanceStat = ({ label, value, status, color }: any) => (
  <div className="card p-8 group hover:border-rose-500/30 transition-all shadow-xl border-slate-700/50 relative overflow-hidden">
     <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
     <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4 leading-none">{label}</p>
     <h3 className="text-xl font-black text-white">{value}</h3>
     <span className={`text-[9px] font-black uppercase tracking-widest mt-2 block text-${color}-400`}>{status}</span>
  </div>
);

const PlanningDay = ({ day, task, status, color }: any) => (
  <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-4 shadow-inner group hover:border-rose-500/30 transition-all">
     <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-slate-500 uppercase">{day}</span>
        <div className={`w-2 h-2 rounded-full bg-${color}-500 ${status === 'En cours' ? 'animate-pulse' : ''}`} />
     </div>
     <div>
        <h5 className="text-[11px] font-black text-white uppercase group-hover:text-rose-400 transition-colors">{task}</h5>
        <span className="text-[9px] font-bold text-slate-600 uppercase mt-1">{status}</span>
     </div>
  </div>
);

const OrderRow = ({ id, asset, type, tech, priority, alert }: any) => (
  <tr className="hover:bg-rose-600/5 transition-all group cursor-pointer">
     <td className="p-6 text-rose-400 font-black">{id}</td>
     <td className="p-6">
        <div className="flex flex-col">
           <span className="text-xs font-black text-white uppercase group-hover:text-rose-400 transition-colors">{asset}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter italic">ID: ASSET-882</span>
        </div>
     </td>
     <td className="p-6 text-slate-500 uppercase font-black text-[9px] tracking-widest">{type}</td>
     <td className="p-6 text-slate-400">{tech}</td>
     <td className="p-6">
        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
           priority === 'Critique' ? 'bg-rose-500/10 text-rose-400' : priority === 'Moyenne' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-500'
        } ${alert ? 'animate-pulse' : ''}`}>
           {priority}
        </span>
     </td>
     <td className="p-6 text-right">
        <button className="p-2 text-slate-600 hover:text-white transition-colors"><MoreVertical size={18} /></button>
     </td>
  </tr>
);

export default PlantMaintenance;
