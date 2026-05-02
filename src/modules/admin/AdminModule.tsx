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
    <div className="flex flex-col h-full gap-8">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6 bg-white p-6 rounded-xl border border-[#cbd5e1] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1] w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#005eb8] shadow-sm border border-[#cbd5e1]'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                <tab.icon size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-[#107e3e] animate-pulse" />
                <span className="text-[10px] font-bold uppercase text-[#107e3e] tracking-widest">Système Optimal</span>
             </div>
             <button className="p-2 bg-white border border-[#cbd5e1] rounded-lg text-[#64748b] hover:text-[#0f172a] transition-all shadow-sm">
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
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
             <div className="lg:col-span-2 bg-white border border-[#cbd5e1] rounded-xl p-8 flex flex-col gap-8 shadow-sm">
                <div>
                   <h3 className="font-bold text-sm uppercase tracking-widest text-[#0f172a] mb-2">Identité de la Structure</h3>
                   <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-wider italic">Ces informations sont obligatoires pour la liasse fiscale et les factures.</p>
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

                <div className="mt-4 pt-8 border-t border-[#f1f5f9] flex justify-end gap-3">
                   <button className="px-6 py-2.5 bg-[#f1f5f9] border border-[#cbd5e1] rounded-lg text-[11px] font-bold uppercase tracking-widest text-[#64748b] hover:text-[#0f172a] transition-all">Annuler</button>
                   <button 
                     onClick={handleSave}
                     className="px-8 py-2.5 bg-[#005eb8] hover:bg-[#004080] rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 text-white"
                   >
                      {isSaving ? <Activity size={16} className="animate-spin" /> : <Save size={16} />}
                      {isSaving ? 'Synchronisation...' : 'Enregistrer'}
                   </button>
                </div>
             </div>

             <div className="flex flex-col gap-8">
                <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
                   <div className="w-32 h-32 rounded-2xl bg-[#f8fafc] border border-[#cbd5e1] flex items-center justify-center mb-6 relative group cursor-pointer overflow-hidden shadow-inner">
                      <Building size={48} className="text-[#cbd5e1] group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-[#005eb8]/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white">
                         <Cloud size={24} className="mb-2" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Upload</span>
                      </div>
                   </div>
                   <h4 className="font-bold text-[#0f172a] uppercase text-[11px] tracking-widest">Logo Institutionnel</h4>
                   <p className="text-[10px] text-[#64748b] font-bold mt-2 leading-relaxed uppercase tracking-wider">Format PNG/SVG transparent<br/>recommandé pour vos documents.</p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-8 rounded-xl shadow-sm">
                   <div className="flex items-center gap-3 text-[#005eb8] mb-6">
                      <Globe size={20} />
                      <h4 className="font-bold text-xs uppercase tracking-widest">Localisation ERP</h4>
                   </div>
                   <div className="space-y-4">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
             <ExoCard year="2024" status="En cours" color="green" active />
             <ExoCard year="2023" status="Clôturé" color="slate" />
             <div className="bg-white border border-dashed border-[#cbd5e1] rounded-xl flex flex-col items-center justify-center p-12 opacity-50 hover:opacity-100 transition-all cursor-pointer shadow-sm">
                <div className="w-16 h-16 bg-[#f1f5f9] rounded-2xl flex items-center justify-center mb-4 border border-[#cbd5e1] shadow-inner">
                   <Plus size={32} className="text-[#94a3b8]" />
                </div>
                <p className="text-[11px] font-bold uppercase text-[#64748b] tracking-widest">Ouvrir Exercice 2025</p>
             </div>
          </motion.div>
        )}

        {/* Audit Trail */}
        {activeTab === 'audit' && (
          <motion.div
            key="audit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm"
          >
             <div className="p-6 border-b border-[#f1f5f9] flex justify-between items-center bg-[#f8fafc]">
                <h3 className="font-bold text-[11px] uppercase tracking-widest flex items-center gap-3 text-[#0f172a]">
                   <History size={20} className="text-orange-500" />
                   Journal de Sécurité (Audit Trail)
                </h3>
                <div className="flex gap-3">
                   <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
                      <input type="text" placeholder="Chercher log..." className="pl-10 pr-4 py-2 bg-white border border-[#cbd5e1] rounded-lg text-xs font-bold outline-none w-64 shadow-inner" />
                   </div>
                   <button className="p-2 bg-white border border-[#cbd5e1] rounded-lg text-[#64748b] hover:text-[#0f172a] transition-all shadow-sm">
                      <Filter size={18} />
                   </button>
                </div>
             </div>
             <div className="p-0 divide-y divide-[#f1f5f9]">
                {[
                   { time: '14:45:22', user: 'M. Kane', action: 'Modification Plan Comptable', impact: 'Haute', color: 'red' },
                   { time: '14:30:05', user: 'A. Diop', action: 'Validation Journal Ventes', impact: 'Moyenne', color: 'blue' },
                   { time: '12:12:45', user: 'System', action: 'Sauvegarde Cloud Réussie', impact: 'Basse', color: 'green' },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-6 hover:bg-blue-50/30 transition-all group">
                     <div className="flex items-center gap-6">
                        <span className="text-[10px] font-mono font-bold text-[#94a3b8] uppercase">{log.time}</span>
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{log.action}</span>
                           <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider mt-1">Par : {log.user}</span>
                        </div>
                     </div>
                     <span className={`px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${
                        log.impact === 'Haute' ? 'bg-red-50 text-[#dc2626] border-red-200' : 
                        log.impact === 'Moyenne' ? 'bg-blue-50 text-[#005eb8] border-blue-200' : 
                        'bg-green-50 text-[#107e3e] border-green-200'
                     }`}>
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
    <label className="text-[10px] font-bold uppercase text-[#64748b] tracking-widest">{label}</label>
    <input 
      type="text" 
      defaultValue={value} 
      className="bg-white border border-[#cbd5e1] rounded-lg px-4 py-2.5 text-xs font-bold text-[#334155] focus:outline-none focus:border-[#005eb8] transition-all shadow-inner" 
    />
  </div>
);

const SelectField = ({ label, options, selected }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-bold uppercase text-[#64748b] tracking-widest">{label}</label>
    <select defaultValue={selected} className="bg-white border border-[#cbd5e1] rounded-lg px-4 py-2.5 text-xs font-bold text-[#334155] focus:outline-none focus:border-[#005eb8] transition-all shadow-inner appearance-none">
       {options.map((opt: string) => <option key={opt}>{opt}</option>)}
    </select>
  </div>
);

const SettingRow = ({ label, value, status }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-blue-100 last:border-0">
     <span className="text-[11px] text-[#475569] font-bold uppercase tracking-tight">{label}</span>
     {status ? (
        <span className="text-[10px] font-bold uppercase text-[#107e3e] flex items-center gap-2">
           <ShieldCheck size={14} /> {status}
        </span>
     ) : (
        <span className="text-xs font-bold text-[#005eb8] uppercase">{value}</span>
     )}
  </div>
);

const ExoCard = ({ year, status, color, active }: any) => (
  <div className={`bg-white p-8 rounded-xl border transition-all relative overflow-hidden shadow-sm group hover:border-[#005eb8] ${active ? 'border-[#107e3e] border-2' : 'border-[#cbd5e1]'}`}>
     <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col">
           <h3 className="text-4xl font-bold text-[#0f172a] tracking-tighter group-hover:text-[#005eb8] transition-colors">{year}</h3>
           <p className="text-[10px] text-[#64748b] font-bold uppercase mt-1 tracking-widest">Exercice Social</p>
        </div>
        <div className={`px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${
          color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-200' : 
          color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-200' : 
          'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
        }`}>
           {status}
        </div>
     </div>
     <div className="space-y-4 mb-8">
        <SettingRow label="Ouverture" value={`01/01/${year}`} />
        <SettingRow label="Clôture Prévue" value={`31/12/${year}`} />
     </div>
     <button className={`w-full py-3 rounded-lg text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-md ${
       active ? 'bg-[#dc2626] hover:bg-[#b91c1c] text-white' : 
       status === 'Clôturé' ? 'bg-[#f1f5f9] text-[#94a3b8] cursor-not-allowed border border-[#cbd5e1]' : 
       'bg-[#005eb8] hover:bg-[#004080] text-white'
     }`}>
        {active ? 'Procéder à la Clôture' : status === 'Clôturé' ? 'Consulter Archives' : 'Ouvrir l\'Exercice'}
     </button>
  </div>
);

export default AdminModule;
