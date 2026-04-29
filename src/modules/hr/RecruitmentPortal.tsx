import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, Search, Filter, Plus, 
  Briefcase, Mail, Phone, FileText,
  Star, ChevronRight, Globe, Layers,
  CheckCircle2, Clock, MapPin
} from 'lucide-react';

const RecruitmentPortal = () => {
  return (
    <div className="flex flex-col h-full gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
         <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">
               <UserPlus size={24} />
            </div>
            <div>
               <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Recrutement & Gestion des Talents</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">Vivier de Candidats • Offres • IA Matchmaking</p>
            </div>
         </div>
         <button className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
            <Plus size={16} /> Nouvelle Offre
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Active Jobs */}
         <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
               <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Offres d'Emploi Actives</h4>
                  <div className="flex gap-2">
                     <button className="p-2 text-slate-500 hover:text-white transition-colors"><Search size={18} /></button>
                  </div>
               </div>
               <div className="p-0 divide-y divide-slate-700/30">
                  <JobRow title="Chef de Projet ERP" dept="Informatique" type="CDI" applicants={42} status="En cours" />
                  <JobRow title="Contrôleur de Gestion Junior" dept="Finance" type="CDD" applicants={12} status="En cours" />
                  <JobRow title="Technicien Maintenance" dept="Production" type="CDI" applicants={8} status="Urgent" alert />
                  <JobRow title="Responsable Logistique" dept="Logistique" type="CDI" applicants={15} status="Entretien" />
               </div>
            </div>

            <div className="card bg-slate-800/30 p-8 flex flex-col gap-6">
               <h4 className="text-xs font-black uppercase tracking-widest text-white mb-2">Candidatures Récentes (Vivier)</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CandidateMiniCard name="Fatou Diagne" role="Data Analyst" score={92} source="LinkedIn" />
                  <CandidateMiniCard name="Ousmane Sy" role="Expert SAP" score={88} source="Spontanée" />
                  <CandidateMiniCard name="Marie Curie" role="R&D Engineer" score={95} source="Cabinet" />
                  <CandidateMiniCard name="Jean Dupont" role="Accountant" score={75} source="Indeed" />
               </div>
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="flex flex-col gap-6">
            <div className="card bg-indigo-600/5 border-indigo-500/20 p-8 flex flex-col gap-6 shadow-2xl">
               <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-indigo-500/20 pb-4">Statistiques Funnel</h4>
               <div className="space-y-4">
                  <FunnelStep label="Visites Annonces" value="2.4k" color="slate" />
                  <FunnelStep label="Candidatures" value="145" color="indigo" />
                  <FunnelStep label="Sélectionnés" value="24" color="amber" />
                  <FunnelStep label="Embauchés" value="8" color="emerald" />
               </div>
            </div>

            <div className="card bg-slate-800/30 p-8 flex flex-col gap-4">
               <div className="flex items-center gap-3 text-indigo-400 mb-2">
                  <Globe size={18} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Publication Multiposte</h4>
               </div>
               <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                  Vos offres sont automatiquement diffusées sur LinkedIn, SenJob, et le portail carrière Antigravity.
               </p>
               <button className="w-full mt-2 py-3 bg-slate-900 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Paramètres API
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const JobRow = ({ title, dept, type, applicants, status, alert }: any) => (
  <div className="p-6 hover:bg-indigo-600/5 transition-all group flex items-center justify-between cursor-pointer">
     <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 ${alert ? 'text-rose-400' : 'text-slate-500'} group-hover:text-indigo-400 transition-colors`}>
           <Briefcase size={20} />
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{title}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">{dept} • {type}</span>
        </div>
     </div>
     <div className="flex items-center gap-8">
        <div className="text-right">
           <p className="text-xs font-black text-white">{applicants}</p>
           <p className="text-[9px] text-slate-500 font-bold uppercase">Candidats</p>
        </div>
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${
           status === 'Urgent' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
        }`}>
           {status}
        </span>
        <button className="p-2 text-slate-600 hover:text-white transition-colors"><ChevronRight size={18} /></button>
     </div>
  </div>
);

const CandidateMiniCard = ({ name, role, score, source }: any) => (
  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all flex items-center justify-between group">
     <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-xs border border-indigo-500/20 shadow-inner group-hover:scale-105 transition-transform">
           {name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div className="flex flex-col">
           <span className="text-[10px] font-black text-white uppercase">{name}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase">{role}</span>
        </div>
     </div>
     <div className="flex flex-col items-end">
        <span className={`text-[10px] font-black ${score > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{score}%</span>
        <span className="text-[8px] text-slate-600 font-black uppercase tracking-tighter">{source}</span>
     </div>
  </div>
);

const FunnelStep = ({ label, value, color }: any) => (
  <div className="flex flex-col gap-2">
     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{value}</span>
     </div>
     <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
        <div className={`h-full bg-${color === 'slate' ? 'slate-700' : color === 'indigo' ? 'indigo-500' : color === 'amber' ? 'amber-500' : 'emerald-500'}`} style={{ width: '100%' }} />
     </div>
  </div>
);

export default RecruitmentPortal;
