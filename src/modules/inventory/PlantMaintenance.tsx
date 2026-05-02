import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Activity, Calendar, 
  AlertTriangle, CheckCircle2, Plus, 
  Search, Filter, MoreVertical, Layers,
  Wrench, ShieldCheck, Database, Zap,
  BarChart3, Layout, Smartphone,
  Clock, FileText, ChevronRight
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
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#dc2626] flex items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:rotate-6 transition-transform">
               <Wrench size={32} />
            </div>
            <div>
               <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Maintenance Industrielle (PM)</h3>
               <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">GMAO Intégrée • Maintenance Préventive & Curative des Actifs</p>
            </div>
         </div>
         <div className="flex bg-[#f1f5f9] p-1 rounded-xl border border-[#cbd5e1] relative z-10 overflow-x-auto no-scrollbar shadow-inner mt-6 lg:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-white text-[#dc2626] shadow-md border border-[#cbd5e1]' : 'text-[#64748b] hover:text-[#0f172a] hover:bg-white/50'
                }`}
              >
                 <tab.icon size={16} />
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
             exit={{ opacity: 0, y: -10 }}
             className="flex flex-col gap-8"
           >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <MaintenanceStat label="Équipements Critiques" value="12" status="Sous Surveillance" color="blue" icon={<ShieldCheck size={24} />} />
                 <MaintenanceStat label="Préventifs en retard" value="03" status="Alerte Priorité" color="red" icon={<Clock size={24} />} />
                 <MaintenanceStat label="Disponibilité Parc" value="98.2%" status="Performance Optimale" color="green" icon={<Activity size={24} />} />
              </div>

              <div className="bg-white border border-[#cbd5e1] p-10 rounded-xl shadow-sm flex flex-col gap-8">
                 <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-6">
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Plan de Maintenance Hebdomadaire (GMAO)</h4>
                    <button className="text-[10px] font-bold text-[#005eb8] uppercase tracking-widest hover:underline">Voir Calendrier Complet</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <PlanningDay day="Lundi" task="Révision Machine A" status="Terminé" color="green" />
                    <PlanningDay day="Mardi" task="Graissage Extrudeuse" status="En cours" color="orange" />
                    <PlanningDay day="Mercredi" task="Checkup Électrique" status="Prévu" color="blue" />
                    <PlanningDay day="Jeudi" task="Contrôle Filtres" status="Prévu" color="blue" />
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'orders' && (
           <motion.div 
             key="orders"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.98 }}
             className="bg-white border border-[#cbd5e1] rounded-xl overflow-hidden shadow-sm flex flex-col"
           >
              <div className="p-8 bg-[#f8fafc] border-b border-[#cbd5e1] flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 text-[#dc2626] rounded-xl flex items-center justify-center border border-red-100 shadow-inner">
                       <Wrench size={20} />
                    </div>
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Ordres de Travail (Work Orders)</h4>
                 </div>
                 <button className="flex items-center gap-3 px-8 py-3 bg-[#dc2626] hover:bg-red-700 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg">
                    <Plus size={20} /> Créer un OT
                 </button>
              </div>
              <div className="overflow-auto">
                 <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-[#f8fafc] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] border-b-2 border-[#cbd5e1]">
                       <tr>
                          <th className="px-8 py-5">N° Ordre (OT)</th>
                          <th className="px-8 py-5">Équipement / Immo</th>
                          <th className="px-8 py-5">Nature de l'intervention</th>
                          <th className="px-8 py-5">Technicien Référent</th>
                          <th className="px-8 py-5">Niveau de Priorité</th>
                          <th className="px-8 py-5 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                       <OrderRow id="OT-2024-4492" asset="Extrudeuse Industrielle EX-101" type="Maintenance Préventive" tech="K. Diallo" priority="Basse" />
                       <OrderRow id="OT-2024-4493" asset="Groupe Électrogène de Secours" type="Maintenance Curative" tech="S. Ndiaye" priority="Critique" alert />
                       <OrderRow id="OT-2024-4494" asset="Convoyeur Logistique Central" type="Mise à niveau / Amélioration" tech="P. Faye" priority="Moyenne" />
                    </tbody>
                 </table>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const MaintenanceStat = ({ label, value, status, color, icon }: any) => (
  <div className="bg-white border border-[#cbd5e1] p-8 rounded-xl group hover:border-[#dc2626] transition-all shadow-sm relative overflow-hidden cursor-pointer">
     <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${color === 'red' ? 'bg-[#dc2626]' : color === 'green' ? 'bg-[#107e3e]' : 'bg-[#005eb8]'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
     <div className="flex justify-between items-start mb-6">
        <div>
           <p className="text-[#64748b] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 leading-none opacity-80">{label}</p>
           <h3 className="text-3xl font-bold tracking-tighter text-[#0f172a]">{value}</h3>
        </div>
        <div className={`p-4 rounded-2xl border shadow-inner transition-transform group-hover:scale-110 ${
          color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100' : 
          color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-100' : 
          'bg-blue-50 text-[#005eb8] border-blue-100'
        }`}>
           {icon}
        </div>
     </div>
     <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
       color === 'red' ? 'text-[#dc2626]' : color === 'green' ? 'text-[#107e3e]' : 'text-[#005eb8]'
     }`}>
        <div className={`w-2 h-2 rounded-full ${color === 'red' ? 'bg-[#dc2626] animate-pulse' : color === 'green' ? 'bg-[#107e3e]' : 'bg-[#005eb8]'}`} />
        {status}
     </span>
  </div>
);

const PlanningDay = ({ day, task, status, color }: any) => (
  <div className="p-8 bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl flex flex-col gap-6 shadow-inner group hover:bg-white hover:border-[#dc2626] transition-all cursor-pointer">
     <div className="flex justify-between items-center">
        <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.2em]">{day}</span>
        <div className={`w-3 h-3 rounded-full shadow-sm ${
          color === 'green' ? 'bg-[#107e3e]' : color === 'orange' ? 'bg-orange-500 animate-pulse' : 'bg-[#005eb8]'
        }`} />
     </div>
     <div>
        <h5 className="text-[12px] font-bold text-[#0f172a] uppercase tracking-tight group-hover:text-[#dc2626] transition-colors leading-relaxed">{task}</h5>
        <div className="flex items-center gap-2 mt-3">
           <Activity size={12} className="text-[#94a3b8]" />
           <span className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-widest">{status}</span>
        </div>
     </div>
  </div>
);

const OrderRow = ({ id, asset, type, tech, priority, alert }: any) => (
  <tr className="hover:bg-red-50/30 transition-all group cursor-pointer">
     <td className="px-8 py-6 border-r border-[#f1f5f9]">
        <span className="font-mono font-bold text-[#dc2626] text-sm tracking-tighter uppercase">{id}</span>
     </td>
     <td className="px-8 py-6 border-r border-[#f1f5f9]">
        <div className="flex flex-col">
           <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#dc2626] transition-colors">{asset}</span>
           <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-[0.2em] mt-1 opacity-70">Identifiant : ASSET-882-PM</span>
        </div>
     </td>
     <td className="px-8 py-6 border-r border-[#f1f5f9]">
        <div className="flex items-center gap-3">
           <FileText size={14} className="text-[#94a3b8]" />
           <span className="text-[#64748b] uppercase font-bold text-[10px] tracking-widest opacity-80">{type}</span>
        </div>
     </td>
     <td className="px-8 py-6 text-[#334155] font-bold text-xs border-r border-[#f1f5f9]">{tech}</td>
     <td className="px-8 py-6 border-r border-[#f1f5f9]">
        <span className={`px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 w-fit ${
           priority === 'Critique' ? 'bg-red-50 text-[#dc2626] border-red-200' : 
           priority === 'Moyenne' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
           'bg-[#f8fafc] text-[#64748b] border-[#cbd5e1]'
        } ${alert ? 'animate-pulse' : ''}`}>
           {priority === 'Critique' && <AlertTriangle size={10} />}
           {priority}
        </span>
     </td>
     <td className="px-8 py-6 text-right">
        <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#0f172a] shadow-sm transition-all">
           <MoreVertical size={18} />
        </button>
     </td>
  </tr>
);

export default PlantMaintenance;
