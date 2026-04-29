import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldCheck, Key, Lock, 
  Plus, Search, Filter, MoreVertical,
  ChevronRight, Shield, UserPlus, Eye,
  Check, X, AlertTriangle, Database,
  Layout, Briefcase, Settings, Globe,
  ArrowRight, FileText, Download, Zap
} from 'lucide-react';

const IdentityManager = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'privileges' | 'matrix' | 'wizard'>('users');
  const [wizardStep, setWizardStep] = useState(1);

  const tabs = [
    { id: 'users', label: 'Utilisateurs & Profils', icon: Users },
    { id: 'roles', label: 'Rôles PFCG', icon: ShieldCheck },
    { id: 'privileges', label: 'Privilèges & Granularité', icon: Key },
    { id: 'matrix', label: 'Matrice de Contrôle', icon: Layout },
    { id: 'wizard', label: 'Simulation Auditeur', icon: Zap },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Identity Header */}
      <div className="flex justify-between items-center bg-slate-800/20 border border-slate-700/50 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
               <Shield size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1">Identity & Access Management (IAM)</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">Granularité des Droits • Profils de Sécurité • Gouvernance des Accès</p>
            </div>
         </div>
         <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50 relative z-10 overflow-x-auto no-scrollbar max-w-[60%]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                 <tab.icon size={14} />
                 {tab.label}
              </button>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'users' && <UserTab />}
         {activeTab === 'roles' && <RoleTab />}
         {activeTab === 'privileges' && <PrivilegeTab />}
         {activeTab === 'matrix' && <MatrixTab />}
         {activeTab === 'wizard' && <AuditorWizard step={wizardStep} setStep={setWizardStep} />}
      </AnimatePresence>
    </div>
  );
};

// --- Sub-components for better organization ---

const UserTab = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col gap-6"
  >
     <div className="flex justify-between items-center px-4">
        <div className="relative w-96">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
           <input type="text" placeholder="Rechercher un utilisateur..." className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all shadow-inner" />
        </div>
        <button className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
           <UserPlus size={16} /> Créer Utilisateur
        </button>
     </div>

     <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
           <thead className="bg-slate-900/50 text-[10px] font-black uppercase text-slate-500 tracking-widest">
              <tr>
                 <th className="p-6">Collaborateur</th>
                 <th className="p-6">ID / Matricule</th>
                 <th className="p-6">Profil de Rôle</th>
                 <th className="p-6">Niveau Granularité</th>
                 <th className="p-6 text-center">Status</th>
                 <th className="p-6 text-right">Action</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-700/30">
              <UserRow name="Mamadou Kane" id="ADM_MK01" role="Admin System (SAP_ALL)" grain="Global" status="Actif" />
              <UserRow name="Aïssatou Diop" id="FI_AD02" role="Chef Comptable (Z_FI_MGR)" grain="Société 1000" status="Actif" />
              <UserRow name="Ibrahima Ndiaye" id="RH_IN03" role="HR Manager (Z_RH_ADMIN)" grain="Dpt RH Only" status="Actif" />
              <UserRow name="Moussa Sarr" id="STK_MS04" role="Magasinier (Z_MM_USER)" grain="Entrepôt Dakar" status="Limité" />
           </tbody>
        </table>
     </div>
  </motion.div>
);

const RoleTab = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
  >
     <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
           <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">Maintenance des Rôles Composites</h4>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                 <Plus size={14} /> Nouveau Rôle
              </button>
           </div>
           <div className="p-0 divide-y divide-slate-700/30">
              <RoleDetailRow name="Z_FI_COMPTABLE" desc="Écritures G/L, Taxes, Banques" privs={45} />
              <RoleDetailRow name="Z_RH_PAIE_SENEGAL" desc="Moteur de paie, IPRES, CSS, IR" privs={12} />
              <RoleDetailRow name="Z_MM_ACHATS_LOCAUX" desc="Commandes d'achats < 10M XOF" privs={8} />
           </div>
        </div>
     </div>

     <div className="flex flex-col gap-6">
        <div className="card bg-indigo-600/5 border border-indigo-500/20 p-8 flex flex-col gap-6 shadow-2xl">
           <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-indigo-500/20 pb-4">Analyse de Conformité (SoD)</h4>
           <div className="space-y-4">
              <SodViolation label="Cumul : Saisie Paie + Validation" count={2} color="rose" />
              <SodViolation label="Cumul : Création Fournisseur + Paiement" count={0} color="emerald" />
           </div>
        </div>
     </div>
  </motion.div>
);

const AuditorWizard = ({ step, setStep }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card bg-slate-800/20 border-slate-700/50 p-12 shadow-2xl max-w-4xl mx-auto w-full"
  >
     <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 shadow-inner">
              <Zap size={24} />
           </div>
           <div>
              <h4 className="text-lg font-black text-white uppercase tracking-tighter">Assistant Création Auditeur</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Configuration d'un accès granulaire "Lecture Seule"</p>
           </div>
        </div>
        <div className="flex gap-2">
           {[1, 2, 3].map((s) => (
             <div key={s} className={`w-3 h-3 rounded-full ${step >= s ? 'bg-indigo-500' : 'bg-slate-800'} transition-colors`} />
           ))}
        </div>
     </div>

     <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
             <div className="space-y-4">
                <h5 className="text-xs font-black text-white uppercase tracking-widest">Étape 1 : Définition du Profil</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <WizardInput label="Nom du Profil" value="AUDIT_EXTERNE_2024" />
                   <WizardInput label="Description" value="Commissaire aux Comptes - Cabinet Deloitte" />
                   <WizardSelect label="Modèle de Rôle" options={['Z_AUDITEUR_DISPLAY', 'Z_READ_ONLY', 'CUSTOM']} selected="Z_AUDITEUR_DISPLAY" />
                   <WizardInput label="Date d'Expiration" value="31/12/2024" />
                </div>
             </div>
             <button onClick={() => setStep(2)} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                Suivant : Définir Granularité <ArrowRight size={16} />
             </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
             <div className="space-y-4">
                <h5 className="text-xs font-black text-white uppercase tracking-widest">Étape 2 : Granularité & Restrictions</h5>
                <div className="card bg-slate-900 p-8 space-y-6">
                   <GranularControl label="Module Cible" value="Comptabilité (FI)" desc="Restriction au noyau financier uniquement" />
                   <GranularControl label="Objets Autorisés" value="Balance Générale, Balance Tiers" desc="Accès limité aux balances, pas aux journaux de saisie" />
                   <GranularControl label="Privilège" value="Lecture (Display) Uniquement" desc="Toutes les fonctions Write/Delete sont désactivées" />
                   <GranularControl label="Périmètre Société" value="BUKRS 1000 (Dakar HQ)" desc="Restriction à la filiale principale" />
                </div>
             </div>
             <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest">Retour</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">Générer le Profil & Certifier <ArrowRight size={16} /></button>
             </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8">
             <div className="w-24 h-24 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-2xl mb-8">
                <ShieldCheck size={48} />
             </div>
             <h5 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Profil Auditeur Certifié</h5>
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-10 max-w-md mx-auto">
                Le rôle **Z_AUDIT_BAL_1000** a été généré. Les autorisations ont été injectées dans le moteur de sécurité Basis.
             </p>
             <div className="grid grid-cols-3 gap-4 w-full mb-10">
                <AuditStatus label="Lecture Balance" value="OK" />
                <AuditStatus label="Écritures" value="DENIED" color="rose" />
                <AuditStatus label="Paramètres" value="DENIED" color="rose" />
             </div>
             <div className="flex gap-4 w-full">
                <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest">Nouveau Profil</button>
                <button className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">Activer pour l'utilisateur <Check size={16} /></button>
             </div>
          </motion.div>
        )}
     </AnimatePresence>
  </motion.div>
);

const PrivilegeTab = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
  >
     <div className="card bg-slate-800/20 border-slate-700/50 p-10 shadow-2xl">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Granularité des Objets d'Autorisation</h4>
        <div className="space-y-8">
           <GranularControl label="F_BKPF_BUK (Société)" value="1000 - 2000" desc="Restriction par code société OHADA" />
           <GranularControl label="P_ORGIN (Dossier Personnel)" value="Dpt Prod, Dpt IT" desc="Accès aux données RH par département" />
           <GranularControl label="M_MATE_WRK (Magasins)" value="Dakar_Log, Thies_Log" desc="Gestion des stocks par site géographique" />
           <GranularControl label="K_ORDER (Ordres de Coûts)" value="C_PROD_*" desc="Contrôle des ordres de fabrication" />
        </div>
     </div>

     <div className="flex flex-col gap-6">
        <div className="card bg-slate-800/30 p-8 flex flex-col gap-6 shadow-2xl">
           <h4 className="text-xs font-black uppercase tracking-widest text-white">Niveau de Privilège</h4>
           <div className="space-y-4">
              <PrivilegeLevel label="Lecture Seule (Display)" active />
              <PrivilegeLevel label="Création / Modification (Change)" active />
              <PrivilegeLevel label="Suppression (Delete)" />
              <PrivilegeLevel label="Approbation / Validation (Release)" active />
           </div>
        </div>
     </div>
  </motion.div>
);

const MatrixTab = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl"
  >
     <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
        <h4 className="text-xs font-black uppercase tracking-widest text-white">Matrice de Contrôle d'Accès (RBAC Grid)</h4>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
              <Eye size={14} /> Vue par Module
           </button>
        </div>
     </div>
     <div className="overflow-auto">
        <table className="w-full text-left">
           <thead className="bg-slate-900/50 text-[9px] font-black uppercase text-slate-500 tracking-widest">
              <tr>
                 <th className="p-6">Rôles / Modules</th>
                 <th className="p-6 text-center">FI (Finance)</th>
                 <th className="p-6 text-center">RH (Pay)</th>
                 <th className="p-6 text-center">MM (Stocks)</th>
                 <th className="p-6 text-center">CO (Costing)</th>
                 <th className="p-6 text-center">ADMIN</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-700/30">
              <MatrixRow role="Directeur Financier" fi="RW" rh="R" mm="R" co="RW" admin="-" />
              <MatrixRow role="Gestionnaire Paie" fi="R" rh="RW" mm="-" co="R" admin="-" />
              <MatrixRow role="Admin Basis" fi="RW" rh="RW" mm="RW" co="RW" admin="RW" />
              <MatrixRow role="Auditeur Interne" fi="R" rh="R" mm="R" co="R" admin="R" />
           </tbody>
        </table>
     </div>
  </motion.div>
);

// --- Sub-sub components ---

const UserRow = ({ name, id, role, grain, status }: any) => (
  <tr className="hover:bg-indigo-600/5 transition-all group cursor-pointer">
     <td className="p-6">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-xs text-slate-600 group-hover:text-indigo-400 transition-colors">
              {name.split(' ').map((n: string) => n[0]).join('')}
           </div>
           <div className="flex flex-col">
              <span className="text-xs font-black text-white uppercase group-hover:text-indigo-400 transition-colors">{name}</span>
              <span className="text-[10px] text-slate-500 font-bold">Connecté : Aujourd'hui 14:00</span>
           </div>
        </div>
     </td>
     <td className="p-6 text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">{id}</td>
     <td className="p-6 text-[10px] font-black text-white uppercase tracking-widest">{role}</td>
     <td className="p-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">{grain}</td>
     <td className="p-6 text-center">
        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[9px] font-black uppercase">
           {status}
        </span>
     </td>
     <td className="p-6 text-right">
        <button className="p-2 text-slate-600 hover:text-white transition-colors"><MoreVertical size={18} /></button>
     </td>
  </tr>
);

const RoleDetailRow = ({ name, desc, privs }: any) => (
  <div className="p-6 hover:bg-indigo-600/5 transition-all group flex items-center justify-between cursor-pointer">
     <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 group-hover:text-indigo-400 transition-colors">
           <ShieldCheck size={20} />
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{name}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">{desc}</span>
        </div>
     </div>
     <div className="flex items-center gap-8">
        <div className="text-right">
           <p className="text-xs font-black text-white">{privs}</p>
           <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Privilèges</p>
        </div>
        <button className="p-2 text-slate-600 hover:text-white transition-colors"><ChevronRight size={18} /></button>
     </div>
  </div>
);

const SodViolation = ({ label, count, color }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
     <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
     <div className="flex items-center gap-2">
        <span className={`text-xs font-black text-${color}-400`}>{count}</span>
        <AlertTriangle size={14} className={count > 0 ? `text-${color}-400 animate-pulse` : 'text-slate-700'} />
     </div>
  </div>
);

const GranularControl = ({ label, value, desc }: any) => (
  <div className="flex flex-col gap-3">
     <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{label}</span>
        <span className="text-[10px] font-bold text-white px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 shadow-inner">{value}</span>
     </div>
     <p className="text-[9px] text-slate-500 font-medium italic">{desc}</p>
     <div className="h-[1px] bg-slate-800 w-full" />
  </div>
);

const PrivilegeLevel = ({ label, active }: any) => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-all group">
     <span className={`text-[10px] font-black uppercase ${active ? 'text-white' : 'text-slate-600'}`}>{label}</span>
     {active ? <Check size={16} className="text-emerald-400" /> : <X size={16} className="text-slate-700" />}
  </div>
);

const MatrixRow = ({ role, fi, rh, mm, co, admin }: any) => (
  <tr className="hover:bg-indigo-600/5 transition-all group cursor-pointer">
     <td className="p-6 text-xs font-black text-white uppercase tracking-widest border-r border-slate-700/30">{role}</td>
     <td className="p-6 text-center text-[10px] font-black text-slate-400 border-r border-slate-700/30"><StatusMatrix value={fi} /></td>
     <td className="p-6 text-center text-[10px] font-black text-slate-400 border-r border-slate-700/30"><StatusMatrix value={rh} /></td>
     <td className="p-6 text-center text-[10px] font-black text-slate-400 border-r border-slate-700/30"><StatusMatrix value={mm} /></td>
     <td className="p-6 text-center text-[10px] font-black text-slate-400 border-r border-slate-700/30"><StatusMatrix value={co} /></td>
     <td className="p-6 text-center text-[10px] font-black text-slate-400"><StatusMatrix value={admin} /></td>
  </tr>
);

const StatusMatrix = ({ value }: any) => {
  if (value === '-') return <span className="opacity-20">-</span>;
  return (
    <div className="flex items-center justify-center gap-1">
       {value.includes('R') && <span className="w-6 h-6 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center border border-emerald-500/20">R</span>}
       {value.includes('W') && <span className="w-6 h-6 bg-rose-500/10 text-rose-400 rounded-lg flex items-center justify-center border border-rose-500/20">W</span>}
    </div>
  );
};

const WizardInput = ({ label, value }: any) => (
  <div className="flex flex-col gap-2">
     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
     <input type="text" defaultValue={value} className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition-all" />
  </div>
);

const WizardSelect = ({ label, options, selected }: any) => (
  <div className="flex flex-col gap-2">
     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
     <select className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition-all">
        {options.map((o: any) => <option key={o} selected={o === selected}>{o}</option>)}
     </select>
  </div>
);

const AuditStatus = ({ label, value, color }: any) => (
  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-1">
     <span className="text-[9px] font-black text-slate-500 uppercase">{label}</span>
     <span className={`text-[10px] font-black uppercase ${color === 'rose' ? 'text-rose-400' : 'text-emerald-400'}`}>{value}</span>
  </div>
);

export default IdentityManager;
