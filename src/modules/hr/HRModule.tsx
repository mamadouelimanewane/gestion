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
          <div className="flex bg-white p-1 rounded border border-[#cbd5e1] shadow-sm w-fit overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded text-[11px] font-bold tracking-tight transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#005eb8] text-white shadow-md'
                    : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9]'
                }`}
              >
                <tab.icon size={16} />
                <span className="uppercase tracking-wider">{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#cbd5e1] rounded text-[11px] font-bold text-[#334155] hover:text-[#0f172a] transition-all shadow-sm">
                <Search size={16} />
                Rechercher
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-[#005eb8] hover:bg-[#004a91] text-white rounded text-[11px] font-bold transition-all shadow-md">
                <Plus size={16} />
                Recrutement
             </button>
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
    <StatCard title="Effectif Total" value="124" sub="Salariés actifs" icon={<Users />} color="blue" trend="+3" />
    <StatCard title="Masse Salariale (Mois)" value="45.8M" sub="XOF • Bruts" icon={<Wallet />} color="emerald" trend="+1.2%" />
    <StatCard title="Turnover (Annuel)" value="4.2%" sub="Objectif : < 5%" icon={<TrendingUp />} color="amber" trend="-0.5%" />
    <StatCard title="Taux d'Absenteïsme" value="2.8%" sub="Moyenne Groupe" icon={<Activity />} color="rose" trend="Stable" />

    {/* Recruitment Pipeline */}
    <div className="lg:col-span-2 card bg-white p-8 flex flex-col gap-6 shadow-sm border-[#d9d9d9]">
       <div className="flex justify-between items-center">
          <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#1d2d3e]">Pipeline de Recrutement</h4>
          <button className="text-[11px] font-bold text-[#0a6ed1] uppercase">Voir tout</button>
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
    <div className="lg:col-span-2 card bg-white p-8 flex flex-col gap-6 shadow-sm border-[#d9d9d9]">
       <div className="flex justify-between items-center">
          <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#1d2d3e]">État de la Paie (Avril 2024)</h4>
          <span className="px-3 py-1 bg-green-50 text-[#107e3e] rounded text-[10px] font-bold uppercase border border-green-100">Clôturée</span>
       </div>
       <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
             <PayrollMetric label="IPRES (Part Patronale)" value="3.450.000 F" />
             <PayrollMetric label="CSS (Accidents Travail)" value="820.000 F" />
             <PayrollMetric label="IR (Impôt sur le Revenu)" value="5.120.000 F" />
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-[#f4f5f6] border border-[#d9d9d9] rounded">
             <PieChart size={40} className="text-[#0a6ed1] mb-4" />
             <span className="text-[11px] font-bold text-[#1d2d3e] uppercase tracking-tight text-center">Répartition des Charges Sociales</span>
          </div>
       </div>
    </div>

    {/* Training & GPEC */}
    <div className="lg:col-span-1 card bg-white p-8 flex flex-col gap-6 shadow-sm border-[#d9d9d9]">
       <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#1d2d3e]">GPEC & Formations</h4>
       <div className="space-y-4">
          <TrainingProgress label="Certif IFRS 17" progress={75} />
          <TrainingProgress label="Management Elite" progress={40} />
          <TrainingProgress label="Sécurité Industrielle" progress={95} />
       </div>
       <button className="w-full py-2.5 bg-[#f4f5f6] border border-[#d9d9d9] rounded text-[11px] font-bold uppercase tracking-wider text-[#556b82] hover:text-[#1d2d3e] transition-all">
          Accéder au catalogue
       </button>
    </div>

    {/* Employee Wellness / ESG */}
    <div className="lg:col-span-3 card bg-[#e5f0fa] border-[#0a6ed1]/10 p-8 flex items-center gap-8 shadow-sm">
       <div className="w-16 h-16 bg-white/50 rounded flex items-center justify-center text-[#0a6ed1] border border-white">
          <Heart size={32} className="animate-pulse" />
       </div>
       <div className="flex-1">
          <h4 className="text-lg font-bold text-[#1d2d3e] uppercase tracking-tight mb-2">Social & Bien-être (ESG Score)</h4>
          <p className="text-[13px] text-[#556b82] font-medium leading-relaxed max-w-2xl">
             Le score social du groupe est en hausse de **15%** ce trimestre grâce à l'amélioration de la couverture santé et la mise en place du télétravail hybride. 
             L'IA Joule suggère de renforcer les programmes de formation.
          </p>
       </div>
       <div className="flex flex-col items-end">
          <span className="text-3xl font-bold text-[#0a6ed1]">8.4<span className="text-sm text-[#748ca5]">/10</span></span>
          <span className="text-[10px] font-bold text-[#748ca5] uppercase tracking-wider">Score de Satisfaction</span>
       </div>
    </div>
  </motion.div>
);

const StatCard = ({ title, value, sub, icon, color, trend }: any) => (
  <div className="card group hover:border-[#0a6ed1]/30 transition-all cursor-pointer relative overflow-hidden p-6 shadow-sm border-[#d9d9d9]">
    <div className="flex justify-between items-start mb-4">
       <p className="text-[#748ca5] text-[11px] font-bold uppercase tracking-wider leading-none">{title}</p>
       <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${trend.includes('+') ? 'bg-green-50 text-[#107e3e] border border-green-100' : 'bg-[#f4f5f6] text-[#556b82] border border-[#d9d9d9]'}`}>{trend}</span>
    </div>
    <div className="flex items-end gap-3">
       <h3 className="text-2xl font-bold text-[#1d2d3e]">{value}</h3>
       <div className={`p-2 rounded bg-[#f4f5f6] text-[#748ca5] group-hover:text-[#0a6ed1] transition-colors mb-1`}>
          {React.cloneElement(icon, { size: 16 })}
       </div>
    </div>
    <p className="text-[11px] font-medium text-[#748ca5] mt-2">{sub}</p>
  </div>
);

const PipelineStep = ({ label, value, active }: any) => (
  <div className="flex-1 flex flex-col items-center gap-2">
     <div className={`w-full h-1.5 rounded-full ${active ? 'bg-[#0a6ed1]' : 'bg-[#f4f5f6]'}`} />
     <span className="text-[10px] font-bold text-[#748ca5] uppercase tracking-tight">{label}</span>
     <span className="text-sm font-bold text-[#1d2d3e]">{value}</span>
  </div>
);

const CandidateRow = ({ name, position, status }: any) => (
  <div className="flex items-center justify-between p-3 bg-[#f4f5f6] border border-[#d9d9d9] rounded hover:bg-[#e5f0fa] transition-all cursor-pointer group">
     <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-[#354a5f] text-white flex items-center justify-center font-bold text-xs shadow-sm">
           {name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div className="flex flex-col">
           <span className="text-[12px] font-bold text-[#1d2d3e] group-hover:text-[#0a6ed1]">{name}</span>
           <span className="text-[10px] text-[#748ca5] font-medium uppercase">{position}</span>
        </div>
     </div>
     <span className="text-[10px] font-bold text-[#0a6ed1] uppercase tracking-wider">{status}</span>
  </div>
);

const PayrollMetric = ({ label, value }: any) => (
  <div className="flex justify-between items-center py-2 border-b border-[#f4f5f6]">
     <span className="text-[11px] font-bold text-[#748ca5] uppercase tracking-wider">{label}</span>
     <span className="text-xs font-bold text-[#1d2d3e]">{value}</span>
  </div>
);

const TrainingProgress = ({ label, progress }: any) => (
  <div className="flex flex-col gap-2">
     <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-tight">
        <span className="text-[#748ca5]">{label}</span>
        <span className="text-[#1d2d3e]">{progress}%</span>
     </div>
     <div className="h-1.5 bg-[#f4f5f6] rounded-full overflow-hidden">
        <div className="h-full bg-[#0a6ed1]" style={{ width: `${progress}%` }} />
     </div>
  </div>
);

export default HRModule;
