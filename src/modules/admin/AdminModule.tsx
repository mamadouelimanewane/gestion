import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Users, Building, CalendarClock, Globe, 
  Percent, Sliders, Database, Save, ShieldCheck,
  Key, Activity, History, Cloud, Mail, 
  ChevronRight, Lock, Bell, Search, Plus, 
  Trash2, Edit3, Smartphone, Laptop, Zap,
  Filter
} from 'lucide-react';
import LoadTestingDashboard from './LoadTestingDashboard';
import ValidationModule from './ValidationModule';
import IdentityManager from './IdentityManager';

const AdminModule = () => {
  const [activeTab, setActiveTab] = useState('societe');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'societe', label: 'Organisation', icon: Building },
    { id: 'utilisateurs', label: 'Accès & Sécurité', icon: ShieldCheck },
    { id: 'exercices', label: 'Exercices / Clôtures', icon: CalendarClock },
    { id: 'audit', label: 'Audit Trail', icon: History },
    { id: 'systeme', label: 'Configuration System', icon: Sliders },
    { id: 'performance', label: 'Stress Test (Performance)', icon: Zap },
    { id: 'validation', label: 'Certification (Go-Live)', icon: ShieldCheck },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
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
                <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Système Optimal</span>
             </div>
             <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-all">
                <Bell size={18} />
             </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Performance & Stress Test Section */}
        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full"
          >
             <LoadTestingDashboard />
          </motion.div>
        )}

        {activeTab === 'validation' && (
          <motion.div
            key="validation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full"
          >
             <ValidationModule />
          </motion.div>
        )}

        {/* Organisation Section */}
        {activeTab === 'societe' && (
          <motion.div
            key="societe"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
             <div className="lg:col-span-2 card bg-slate-800/30 border-slate-700/50 p-8 flex flex-col gap-8">
                <div>
                   <h3 className="font-black text-sm uppercase tracking-widest text-white mb-2">Identité de la Structure</h3>
                   <p className="text-xs text-slate-500 font-medium italic">Ces informations sont obligatoires pour la liasse fiscale et les factures.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <InputField label="Dénomination Sociale" value="ANTIGRAVITY TECH SA" />
                   <SelectField label="Forme Juridique" options={['SA', 'SARL', 'SAS', 'SUARL']} selected="SA" />
                   <InputField label="NINEA" value="001234567 2V2" />
                   <InputField label="Registre du Commerce (RCCM)" value="SN DKR 2024 B 8892" />
                   <InputField label="Adresse Siège" value="Almadies, Lot 45, Dakar, Sénégal" full />
                   <InputField label="Téléphone" value="+221 33 800 00 00" />
                   <InputField label="Email Officiel" value="contact@antigravity.sn" />
                </div>

                <div className="mt-4 pt-8 border-t border-slate-700/50 flex justify-end gap-3">
                   <button className="px-6 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Annuler</button>
                   <button 
                     onClick={handleSave}
                     className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
                   >
                      {isSaving ? <Activity size={16} className="animate-spin" /> : <Save size={16} />}
                      {isSaving ? 'Synchronisation...' : 'Enregistrer'}
                   </button>
                </div>
             </div>

             <div className="flex flex-col gap-6">
                <div className="card bg-slate-800/30 border-slate-700/50 p-8 flex flex-col items-center justify-center text-center">
                   <div className="w-32 h-32 rounded-3xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center mb-6 relative group cursor-pointer overflow-hidden shadow-inner">
                      <Building size={48} className="text-slate-700 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-indigo-600/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                         <Cloud size={24} className="mb-1" />
                         <span className="text-[10px] font-black uppercase">Upload</span>
                      </div>
                   </div>
                   <h4 className="font-black text-white uppercase text-xs tracking-widest">Logo Institutionnel</h4>
                   <p className="text-[10px] text-slate-500 font-bold mt-2 leading-relaxed">Format PNG/SVG transparent<br/>recommandé pour vos documents.</p>
                </div>

                <div className="card bg-indigo-600/5 border-indigo-600/20 p-6">
                   <div className="flex items-center gap-3 text-indigo-400 mb-4">
                      <Globe size={18} />
                      <h4 className="font-black text-xs uppercase tracking-widest">Localisation ERP</h4>
                   </div>
                   <div className="space-y-3">
                      <SettingRow label="Devise de Tenue" value="F CFA (XOF)" />
                      <SettingRow label="Fuseau Horaire" value="GMT +00:00" />
                      <SettingRow label="Référentiel" value="SYSCOHADA Révisé" />
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* Identity & Access Management */}
        {activeTab === 'utilisateurs' && (
          <motion.div
            key="utilisateurs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full"
          >
             <IdentityManager />
          </motion.div>
        )}

        {/* Exercices & Clôtures */}
        {activeTab === 'exercices' && (
          <motion.div
            key="exercices"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
             <ExoCard year="2024" status="En cours" color="emerald" active />
             <ExoCard year="2023" status="Clôturé" color="slate" />
             <div className="card border-dashed flex flex-col items-center justify-center p-12 opacity-50 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center mb-4">
                   <Plus size={32} className="text-slate-600" />
                </div>
                <p className="text-xs font-black uppercase text-slate-500 tracking-widest">Ouvrir Exercice 2025</p>
             </div>
          </motion.div>
        )}

        {/* Audit Trail */}
        {activeTab === 'audit' && (
          <motion.div
            key="audit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/30 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl"
          >
             <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2">
                   <History size={18} className="text-amber-400" />
                   Journal de Sécurité (Audit Trail)
                </h3>
                <div className="flex gap-2">
                   <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                      <input type="text" placeholder="Chercher log..." className="pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-[10px] uppercase font-bold outline-none w-48" />
                   </div>
                   <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400">
                      <Filter size={16} />
                   </button>
                </div>
             </div>
             <div className="p-0">
                {[
                   { time: '14:45:22', user: 'M. Kane', action: 'Modification Plan Comptable', impact: 'Haute', color: 'rose' },
                   { time: '14:30:05', user: 'A. Diop', action: 'Validation Journal Ventes', impact: 'Moyenne', color: 'indigo' },
                   { time: '12:12:45', user: 'System', action: 'Sauvegarde Cloud Réussie', impact: 'Basse', color: 'emerald' },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                     <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-slate-500">{log.time}</span>
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-white uppercase">{log.action}</span>
                           <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Par : {log.user}</span>
                        </div>
                     </div>
                     <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase bg-${log.color}-500/10 text-${log.color}-400 border border-${log.color}-500/20`}>
                        Impact {log.impact}
                     </span>
                  </div>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InputField = ({ label, value, full }: any) => (
  <div className={`flex flex-col gap-2 ${full ? 'md:col-span-2' : ''}`}>
    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</label>
    <input 
      type="text" 
      defaultValue={value} 
      className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner" 
    />
  </div>
);

const SelectField = ({ label, options, selected }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</label>
    <select className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-all shadow-inner appearance-none">
       {options.map((opt: string) => <option key={opt} selected={opt === selected}>{opt}</option>)}
    </select>
  </div>
);

const SettingRow = ({ label, value, status }: any) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
     <span className="text-xs text-slate-400 font-medium">{label}</span>
     {status ? (
        <span className="text-[10px] font-black uppercase text-emerald-400 flex items-center gap-1">
           <ShieldCheck size={10} /> {status}
        </span>
     ) : (
        <span className="text-xs font-black text-white">{value}</span>
     )}
  </div>
);

const UserRow = ({ name, email, role, last, ip, status }: any) => (
  <tr className="group hover:bg-indigo-500/5 transition-colors">
    <td className="p-6">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-500/20 shadow-inner group-hover:scale-110 transition-transform">
             {name.split(' ').map((n: any) => n[0]).join('')}
          </div>
          <div className="flex flex-col">
             <span className="font-black text-white text-sm uppercase">{name}</span>
             <span className="text-[10px] text-slate-500 font-bold">{email}</span>
          </div>
       </div>
    </td>
    <td className="p-6">
       <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          {role}
       </span>
    </td>
    <td className="p-6">
       <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-400">{last}</span>
          <span className="text-[9px] text-slate-600 font-mono tracking-tighter">IP: {ip}</span>
       </div>
    </td>
    <td className="p-6 text-center">
       <div className={`mx-auto w-fit px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 ${status === 'Actif' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'Actif' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
          {status}
       </div>
    </td>
    <td className="p-6">
       <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button className="p-2 text-slate-500 hover:text-indigo-400 rounded-lg hover:bg-indigo-500/10"><Edit3 size={16} /></button>
          <button className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10"><Lock size={16} /></button>
       </div>
    </td>
  </tr>
);

const SecurityCard = ({ title, status, icon, color }: any) => (
  <div className="card group hover:border-slate-600 transition-all">
     <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform shadow-inner border border-${color}-500/20`}>
           {icon}
        </div>
        <div>
           <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none mb-1.5">{title}</p>
           <h4 className="text-sm font-black text-white">{status}</h4>
        </div>
     </div>
  </div>
);

const ExoCard = ({ year, status, color, active }: any) => (
  <div className={`card group hover:border-indigo-500/30 transition-all relative overflow-hidden ${active ? 'border-emerald-500/20 bg-emerald-500/5' : ''}`}>
     <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col">
           <h3 className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors">{year}</h3>
           <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Exercice Social</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 shadow-inner`}>
           {status}
        </div>
     </div>
     <div className="space-y-3 mb-8">
        <SettingRow label="Ouverture" value={`01/01/${year}`} />
        <SettingRow label="Clôture Prévue" value={`31/12/${year}`} />
     </div>
     <button className={`w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
       active ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20' : 
       status === 'Clôturé' ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' : 
       'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
     }`}>
        {active ? 'Procéder à la Clôture' : status === 'Clôturé' ? 'Consulter Archives' : 'Ouvrir l\'Exercice'}
     </button>
  </div>
);

export default AdminModule;
