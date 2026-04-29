import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Calendar, Plus, Search, 
  Filter, CheckCircle2, AlertCircle,
  TrendingUp, Activity, PieChart,
  UserCheck, Timer, Box, Layers
} from 'lucide-react';

const AbsenceManagement = () => {
  return (
    <div className="flex flex-col h-full gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
         <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">
               <Clock size={24} />
            </div>
            <div>
               <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Gestion des Temps & Absences</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">Congés • Absences • Heures Supplémentaires • Planning</p>
            </div>
         </div>
         <button className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
            <Plus size={16} /> Demander une Absence
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Requests List */}
         <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
               <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Demandes en Attente de Validation</h4>
                  <div className="flex gap-2">
                     <button className="p-2 text-slate-500 hover:text-white transition-colors"><Search size={18} /></button>
                  </div>
               </div>
               <div className="p-0 divide-y divide-slate-700/30">
                  <AbsenceRequest name="Moussa Ndiaye" type="Congé Annuel" duration="12 jours" date="01/05 - 12/05" status="En attente" />
                  <AbsenceRequest name="Aïssatou Sow" type="Maladie" duration="3 jours" date="28/04 - 30/04" status="Justifié" />
                  <AbsenceRequest name="Ibrahima Fall" type="Congé Exceptionnel" duration="1 jour" date="05/05" status="En attente" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="card bg-slate-800/30 p-8 flex flex-col gap-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Solde Congés (Moyenne)</h4>
                  <div className="flex items-end gap-3">
                     <span className="text-4xl font-black text-white">22.5</span>
                     <span className="text-xs font-black text-slate-500 mb-1 uppercase">Jours / Salarié</span>
                  </div>
                  <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[65%]" />
                  </div>
                  <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Capacité de repos optimale</p>
               </div>
               <div className="card bg-slate-800/30 p-8 flex flex-col gap-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Taux d'Absentéisme</h4>
                  <div className="flex items-end gap-3">
                     <span className="text-4xl font-black text-rose-400">2.8%</span>
                     <span className="text-xs font-black text-slate-500 mb-1 uppercase">Mois d'Avril</span>
                  </div>
                  <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                     <div className="h-full bg-rose-500 w-[28%]" />
                  </div>
                  <p className="text-[9px] text-rose-400 font-bold uppercase tracking-widest">Hausse de 0.5% vs Mars</p>
               </div>
            </div>
         </div>

         {/* Calendar Sidebar */}
         <div className="flex flex-col gap-6">
            <div className="card bg-indigo-600/5 border-indigo-500/20 p-8 flex flex-col gap-6 shadow-2xl">
               <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-indigo-500/20 pb-4">Aujourd'hui : Qui est absent ?</h4>
               <div className="space-y-4">
                  <AbsentUser name="Fatou Diop" reason="Congé" />
                  <AbsentUser name="Oumar Sarr" reason="Maladie" />
                  <AbsentUser name="Jean Gomez" reason="Formation" />
               </div>
               <button className="w-full py-3 bg-slate-900 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Voir le Planning Global
               </button>
            </div>

            <div className="card bg-slate-800/30 p-8 flex flex-col gap-6">
               <div className="flex items-center gap-3 text-amber-400">
                  <AlertCircle size={20} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Heures Supplémentaires</h4>
               </div>
               <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Total Avril</span>
                     <span className="text-xs font-black text-white">458 h</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Coût Estime</span>
                     <span className="text-xs font-black text-amber-400">2.1M XOF</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const AbsenceRequest = ({ name, type, duration, date, status }: any) => (
  <div className="p-6 hover:bg-indigo-600/5 transition-all group flex items-center justify-between cursor-pointer">
     <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-xs text-slate-600 group-hover:text-indigo-400 transition-colors">
           {name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{name}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">{type} • {date}</span>
        </div>
     </div>
     <div className="flex items-center gap-8">
        <div className="text-right">
           <p className="text-xs font-black text-white">{duration}</p>
        </div>
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${
           status === 'En attente' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        }`}>
           {status}
        </span>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/20 rounded-lg text-[8px] font-black uppercase transition-all">Valider</button>
     </div>
  </div>
);

const AbsentUser = ({ name, reason }: any) => (
  <div className="flex items-center justify-between">
     <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-[10px] text-slate-500">
           {name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <span className="text-[10px] font-bold text-slate-300 uppercase">{name}</span>
     </div>
     <span className={`text-[8px] font-black uppercase tracking-widest ${
        reason === 'Maladie' ? 'text-rose-400' : reason === 'Formation' ? 'text-indigo-400' : 'text-amber-400'
     }`}>{reason}</span>
  </div>
);

export default AbsenceManagement;
