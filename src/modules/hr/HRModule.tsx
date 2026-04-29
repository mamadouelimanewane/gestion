import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Briefcase, FileText, Calendar, 
  TrendingUp, GraduationCap, Clock, Wallet,
  Search, Filter, Plus, ChevronRight,
  ShieldCheck, Activity, LayoutDashboard,
  UserPlus, Award, Target, Settings,
  PieChart, Heart, User, Link
} from 'lucide-react';
import EmployeeManagement from './EmployeeManagement';
import PayrollEngine from './PayrollEngine';
import RecruitmentPortal from './RecruitmentPortal';
import TrainingModule from './TrainingModule';
import AbsenceManagement from './AbsenceManagement';
import EmployeeSelfService from './EmployeeSelfService';

const HRModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'SIRH Dashboard', icon: LayoutDashboard },
    { id: 'personnel', label: 'Gestion du Personnel', icon: Users },
    { id: 'paie', label: 'Paie & Rémunération', icon: Wallet },
    { id: 'self-service', label: 'Espace Salarié', icon: User },
    { id: 'recrutement', label: 'Recrutement (Talents)', icon: UserPlus },
    { id: 'carriere', label: 'Carrières & Compétences', icon: Award },
    { id: 'formation', label: 'Formation (GPEC)', icon: GraduationCap },
    { id: 'absences', label: 'Temps & Absences', icon: Clock },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 overflow-x-auto no-scrollbar max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <tab.icon size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                <Link size={14} className="text-emerald-400" />
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Connecté Comptabilité FI</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                <ShieldCheck size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Conformité OHADA</span>
             </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && <HRDashboard key="dashboard" />}
        {activeTab === 'personnel' && <EmployeeManagement key="personnel" />}
        {activeTab === 'paie' && <PayrollEngine key="paie" />}
        {activeTab === 'self-service' && <EmployeeSelfService key="self-service" />}
        {activeTab === 'recrutement' && <RecruitmentPortal key="recrutement" />}
        {activeTab === 'carriere' && <div className="card p-20 text-center text-slate-500 uppercase font-black tracking-widest">Module Carrières & Compétences en cours...</div>}
        {activeTab === 'formation' && <TrainingModule key="formation" />}
        {activeTab === 'absences' && <AbsenceManagement key="absences" />}
      </AnimatePresence>
    </div>
  );
};

const HRDashboard = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="grid grid-cols-1 lg:grid-cols-4 gap-6"
  >
    {/* Key Metrics */}
    <StatCard title="Effectif Total" value="124" sub="Salariés actifs" icon={<Users />} color="indigo" trend="+3" />
    <StatCard title="Masse Salariale (Mois)" value="45.8M" sub="XOF • Bruts" icon={<Wallet />} color="emerald" trend="+1.2%" />
    <StatCard title="Turnover (Annuel)" value="4.2%" sub="Objectif : < 5%" icon={<TrendingUp />} color="amber" trend="-0.5%" />
    <StatCard title="Taux d'Absenteïsme" value="2.8%" sub="Moyenne Groupe" icon={<Activity />} color="rose" trend="Stable" />

    {/* Recruitment Pipeline */}
    <div className="lg:col-span-2 card bg-slate-800/20 border-slate-700/50 p-8 flex flex-col gap-6 shadow-2xl">
       <div className="flex justify-between items-center">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Pipeline de Recrutement</h4>
          <button className="text-[10px] font-black text-indigo-400 uppercase">Voir tout</button>
       </div>
       <div className="flex justify-between gap-4">
          <PipelineStep label="Offres" value="12" active />
          <PipelineStep label="Candidats" value="145" />
          <PipelineStep label="Entretiens" value="24" />
          <PipelineStep label="Hired" value="8" />
       </div>
       <div className="space-y-3 mt-4">
          <CandidateRow name="Moussa Ndiaye" position="Senior Fullstack Dev" status="Entretien technique" />
          <CandidateRow name="Aïssatou Sow" position="Contrôleur de Gestion" status="Vérification références" />
       </div>
    </div>

    {/* Payroll Summary */}
    <div className="lg:col-span-2 card bg-slate-800/20 border-slate-700/50 p-8 flex flex-col gap-6 shadow-2xl">
       <div className="flex justify-between items-center">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">État de la Paie (Avril 2024)</h4>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-black uppercase border border-emerald-500/20">Clôturée</span>
       </div>
       <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
             <PayrollMetric label="IPRES (Part Patronale)" value="3.450.000 F" />
             <PayrollMetric label="CSS (Accidents Travail)" value="820.000 F" />
             <PayrollMetric label="IR (Impôt sur le Revenu)" value="5.120.000 F" />
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-slate-900 border border-slate-800 rounded-3xl">
             <PieChart size={48} className="text-indigo-400 mb-4" />
             <span className="text-xs font-black text-white uppercase tracking-widest text-center">Répartition des Charges Sociales</span>
          </div>
       </div>
    </div>

    {/* Training & GPEC */}
    <div className="lg:col-span-1 card bg-slate-800/30 p-8 flex flex-col gap-6">
       <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">GPEC & Formations</h4>
       <div className="space-y-4">
          <TrainingProgress label="Certif IFRS 17" progress={75} />
          <TrainingProgress label="Management Elite" progress={40} />
          <TrainingProgress label="Sécurité Industrielle" progress={95} />
       </div>
       <button className="w-full py-3 bg-slate-900 border border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
          Accéder au catalogue
       </button>
    </div>

    {/* Employee Wellness / ESG */}
    <div className="lg:col-span-3 card bg-indigo-600/5 border-indigo-500/20 p-8 flex items-center gap-8 shadow-2xl">
       <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-400">
          <Heart size={40} className="animate-pulse" />
       </div>
       <div className="flex-1">
          <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-2">Social & Bien-être (ESG Score)</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl">
             Le score social du groupe est en hausse de **15%** ce trimestre grâce à l'amélioration de la couverture santé et la mise en place du télétravail hybride. 
             L'IA Joule suggère de renforcer les programmes de formation pour le département Production.
          </p>
       </div>
       <div className="flex flex-col items-end">
          <span className="text-3xl font-black text-indigo-400">8.4<span className="text-xs text-slate-600">/10</span></span>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Score de Satisfaction</span>
       </div>
    </div>
  </motion.div>
);

const StatCard = ({ title, value, sub, icon, color, trend }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden p-8 shadow-xl border-slate-700/50">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color === 'emerald' ? 'emerald' : color === 'amber' ? 'amber' : color === 'rose' ? 'rose' : 'indigo'}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-4">
       <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none">{title}</p>
       <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg bg-${trend.includes('+') ? 'emerald' : 'slate'}-500/10 text-${trend.includes('+') ? 'emerald' : 'slate'}-400 border border-${trend.includes('+') ? 'emerald' : 'slate'}-500/20`}>{trend}</span>
    </div>
    <div className="flex items-end gap-3">
       <h3 className="text-2xl font-black text-white">{value}</h3>
       <div className={`p-1.5 rounded-lg bg-slate-900 text-slate-600 group-hover:text-${color === 'emerald' ? 'emerald-400' : 'indigo-400'} transition-colors mb-1`}>
          {React.cloneElement(icon, { size: 14 })}
       </div>
    </div>
    <p className="text-[9px] font-bold text-slate-600 uppercase mt-2 tracking-tighter">{sub}</p>
  </div>
);

const PipelineStep = ({ label, value, active }: any) => (
  <div className="flex-1 flex flex-col items-center gap-2">
     <div className={`w-full h-1.5 rounded-full ${active ? 'bg-indigo-500' : 'bg-slate-800'}`} />
     <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{label}</span>
     <span className="text-sm font-black text-white">{value}</span>
  </div>
);

const CandidateRow = ({ name, position, status }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all cursor-pointer">
     <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-xs">
           {name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div className="flex flex-col">
           <span className="text-[11px] font-bold text-white uppercase">{name}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase">{position}</span>
        </div>
     </div>
     <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{status}</span>
  </div>
);

const PayrollMetric = ({ label, value }: any) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
     <span className="text-xs font-black text-white">{value}</span>
  </div>
);

const TrainingProgress = ({ label, progress }: any) => (
  <div className="flex flex-col gap-2">
     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{progress}%</span>
     </div>
     <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500" style={{ width: `${progress}%` }} />
     </div>
  </div>
);

export default HRModule;
