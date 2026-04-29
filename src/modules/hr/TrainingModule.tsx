import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, BookOpen, Star, Plus, 
  Search, Filter, ChevronRight, Award,
  Users, Calendar, Clock, BarChart3
} from 'lucide-react';

const TrainingModule = () => {
  return (
    <div className="flex flex-col h-full gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
         <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">
               <GraduationCap size={24} />
            </div>
            <div>
               <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Gestion de la Formation (GPEC)</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">Catalogue • Plan de Formation • Budget DIF</p>
            </div>
         </div>
         <button className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
            <Plus size={16} /> Nouvelle Session
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Catalogue */}
         <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <TrainingCard title="Certification SAP FI/CO" category="Finance" duration="40h" rating={4.8} students={12} />
               <TrainingCard title="Management Stratégique" category="Soft Skills" duration="24h" rating={4.5} students={24} />
               <TrainingCard title="Sécurité Industrielle & HSE" category="Production" duration="16h" rating={4.9} students={150} />
               <TrainingCard title="Anglais des Affaires" category="Langues" duration="60h" rating={4.2} students={45} />
            </div>

            <div className="card bg-slate-800/20 border-slate-700/50 p-8 shadow-2xl">
               <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6">Suivi du Plan de Formation Annuel</h4>
               <div className="space-y-6">
                  <PlanProgress label="Département Informatique" target="1.200h" current="850h" progress={70} />
                  <PlanProgress label="Département Production" target="2.400h" current="2.200h" progress={92} />
                  <PlanProgress label="Département Finance" target="800h" current="350h" progress={43} />
               </div>
            </div>
         </div>

         {/* Stats Sidebar */}
         <div className="flex flex-col gap-6">
            <div className="card bg-slate-800/30 p-8 flex flex-col gap-6">
               <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-slate-700/50 pb-4">Indicateurs GPEC</h4>
               <div className="grid grid-cols-2 gap-4">
                  <MiniStat label="Budget Consommé" value="65%" />
                  <MiniStat label="Sessions Clôturées" value="12" />
                  <MiniStat label="Taux de Satisfaction" value="4.6/5" />
                  <MiniStat label="DIF Moyen Utilisé" value="22h" />
               </div>
            </div>

            <div className="card bg-indigo-600/5 border border-indigo-500/20 p-8 flex flex-col gap-4">
               <div className="flex items-center gap-3 text-indigo-400">
                  <Award size={20} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">IA Competency Gap</h4>
               </div>
               <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  L'IA Joule a identifié un besoin de renforcement sur les normes IFRS pour 4 collaborateurs de l'équipe Finance.
               </p>
               <button className="w-full py-3 bg-slate-900 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Générer Recommandations
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const TrainingCard = ({ title, category, duration, rating, students }: any) => (
  <div className="card bg-slate-800/20 border-slate-700/50 p-6 hover:border-indigo-500/30 transition-all group cursor-pointer relative overflow-hidden">
     <div className="flex justify-between items-start mb-4">
        <span className="px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500">{category}</span>
        <div className="flex items-center gap-1 text-amber-400">
           <Star size={12} fill="currentColor" />
           <span className="text-[10px] font-black">{rating}</span>
        </div>
     </div>
     <h4 className="text-sm font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors mb-4">{title}</h4>
     <div className="flex justify-between items-center mt-auto border-t border-slate-700/30 pt-4">
        <div className="flex items-center gap-3 text-slate-500">
           <Clock size={14} />
           <span className="text-[10px] font-bold">{duration}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
           <Users size={14} />
           <span className="text-[10px] font-bold">{students} inscrits</span>
        </div>
     </div>
  </div>
);

const PlanProgress = ({ label, target, current, progress }: any) => (
  <div className="flex flex-col gap-2">
     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{current} / {target}</span>
     </div>
     <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/50 shadow-inner">
        <div className={`h-full bg-indigo-500`} style={{ width: `${progress}%` }} />
     </div>
  </div>
);

const MiniStat = ({ label, value }: any) => (
  <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-1 text-center">
     <span className="text-xs font-black text-white">{value}</span>
     <span className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">{label}</span>
  </div>
);

export default TrainingModule;
