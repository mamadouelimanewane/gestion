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
      <div className="flex justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
               <Shield size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-[#0f172a] uppercase tracking-tight leading-none mb-1">Identity & Access Management (IAM)</h3>
               <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest italic">Granularité des Droits • Profils de Sécurité • Gouvernance des Accès</p>
            </div>
         </div>
         <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1] relative z-10 overflow-x-auto no-scrollbar max-w-[60%] shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-white text-[#005eb8] shadow-sm border border-[#cbd5e1]' : 'text-[#64748b] hover:text-[#0f172a]'
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
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={18} />
           <input type="text" placeholder="Rechercher un utilisateur..." className="w-full bg-white border border-[#cbd5e1] rounded-lg pl-10 pr-4 py-2.5 text-xs font-bold text-[#334155] outline-none focus:border-[#005eb8] transition-all shadow-inner" />
        </div>
        <button className="flex items-center gap-2 px-8 py-2.5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all shadow-md">
           <UserPlus size={16} /> Créer Utilisateur
        </button>
     </div>

     <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm">
        <table className="w-full text-left">
           <thead className="bg-[#f8fafc] text-[10px] font-bold uppercase text-[#64748b] tracking-widest border-b border-[#cbd5e1]">
              <tr>
                 <th className="p-6">Collaborateur</th>
                 <th className="p-6">ID / Matricule</th>
                 <th className="p-6">Profil de Rôle</th>
                 <th className="p-6">Niveau Granularité</th>
                 <th className="p-6 text-center">Status</th>
                 <th className="p-6 text-right">Action</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-[#f1f5f9]">
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
        <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm">
           <div className="p-6 bg-[#f8fafc] border-b border-[#cbd5e1] flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#0f172a]">Maintenance des Rôles Composites</h4>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#005eb8] hover:bg-[#004080] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm">
                 <Plus size={14} /> Nouveau Rôle
              </button>
           </div>
           <div className="p-0 divide-y divide-[#f1f5f9]">
              <RoleDetailRow name="Z_FI_COMPTABLE" desc="Écritures G/L, Taxes, Banques" privs={45} />
              <RoleDetailRow name="Z_RH_PAIE_SENEGAL" desc="Moteur de paie, IPRES, CSS, IR" privs={12} />
              <RoleDetailRow name="Z_MM_ACHATS_LOCAUX" desc="Commandes d'achats < 10M XOF" privs={8} />
           </div>
        </div>
     </div>

     <div className="flex flex-col gap-6">
        <div className="bg-blue-50 border border-blue-100 p-8 rounded-xl flex flex-col gap-8 shadow-sm">
           <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#005eb8] border-b border-blue-200 pb-4">Analyse de Conformité (SoD)</h4>
           <div className="space-y-4">
              <SodViolation label="Cumul : Saisie Paie + Validation" count={2} color="red" />
              <SodViolation label="Cumul : Création Fournisseur + Paiement" count={0} color="green" />
           </div>
        </div>
     </div>
  </motion.div>
);

const AuditorWizard = ({ step, setStep }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-[#cbd5e1] p-12 rounded-xl shadow-sm max-w-4xl mx-auto w-full"
  >
     <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100 shadow-inner">
              <Zap size={24} />
           </div>
           <div>
              <h4 className="text-xl font-bold text-[#0f172a] uppercase tracking-tight">Assistant Création Auditeur</h4>
              <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest">Configuration d'un accès granulaire "Lecture Seule"</p>
           </div>
        </div>
        <div className="flex gap-3">
           {[1, 2, 3].map((s) => (
             <div key={s} className={`w-3 h-3 rounded-full ${step >= s ? 'bg-[#005eb8]' : 'bg-[#f1f5f9] border border-[#cbd5e1]'} transition-all`} />
           ))}
        </div>
     </div>

     <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
             <div className="space-y-6">
                <h5 className="text-[10px] font-bold text-[#005eb8] uppercase tracking-widest">Étape 1 : Définition du Profil</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <WizardInput label="Nom du Profil" value="AUDIT_EXTERNE_2024" />
                   <WizardInput label="Description" value="Commissaire aux Comptes - Cabinet Deloitte" />
                   <WizardSelect label="Modèle de Rôle" options={['Z_AUDITEUR_DISPLAY', 'Z_READ_ONLY', 'CUSTOM']} selected="Z_AUDITEUR_DISPLAY" />
                   <WizardInput label="Date d'Expiration" value="31/12/2024" />
                </div>
             </div>
             <button onClick={() => setStep(2)} className="w-full py-4 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg">
                Suivant : Définir Granularité <ArrowRight size={16} />
             </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
             <div className="space-y-6">
                <h5 className="text-[10px] font-bold text-[#005eb8] uppercase tracking-widest">Étape 2 : Granularité & Restrictions</h5>
                <div className="bg-[#f8fafc] border border-[#cbd5e1] p-8 space-y-8 rounded-xl shadow-inner">
                   <GranularControl label="Module Cible" value="Comptabilité (FI)" desc="Restriction au noyau financier uniquement" />
                   <GranularControl label="Objets Autorisés" value="Balance Générale, Balance Tiers" desc="Accès limité aux balances, pas aux journaux de saisie" />
                   <GranularControl label="Privilège" value="Lecture (Display) Uniquement" desc="Toutes les fonctions Write/Delete sont désactivées" />
                   <GranularControl label="Périmètre Société" value="BUKRS 1000 (Dakar HQ)" desc="Restriction à la filiale principale" />
                </div>
             </div>
             <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 bg-[#f1f5f9] border border-[#cbd5e1] text-[#64748b] rounded-xl text-[11px] font-bold uppercase tracking-widest hover:text-[#0f172a] transition-all">Retour</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-[#005eb8] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg">Générer le Profil & Certifier <ArrowRight size={16} /></button>
             </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8">
             <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center text-[#107e3e] border border-green-100 shadow-inner mb-8">
                <ShieldCheck size={48} />
             </div>
             <h5 className="text-2xl font-bold text-[#0f172a] uppercase tracking-tight mb-2">Profil Auditeur Certifié</h5>
             <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest mb-10 max-w-md mx-auto leading-relaxed">
                Le rôle **Z_AUDIT_BAL_1000** a été généré. Les autorisations ont été injectées dans le moteur de sécurité Basis.
             </p>
             <div className="grid grid-cols-3 gap-6 w-full mb-10">
                <AuditStatus label="Lecture Balance" value="OK" />
                <AuditStatus label="Écritures" value="DENIED" color="red" />
                <AuditStatus label="Paramètres" value="DENIED" color="red" />
             </div>
             <div className="flex gap-4 w-full">
                <button onClick={() => setStep(1)} className="flex-1 py-4 bg-[#f1f5f9] border border-[#cbd5e1] text-[#64748b] rounded-xl text-[11px] font-bold uppercase tracking-widest hover:text-[#0f172a] transition-all">Nouveau Profil</button>
                <button className="flex-[2] py-4 bg-[#107e3e] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg">Activer pour l'utilisateur <Check size={16} /></button>
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
     <div className="bg-white border border-[#cbd5e1] rounded-xl p-10 shadow-sm">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#005eb8] mb-10 border-b border-[#f1f5f9] pb-4">Granularité des Objets d'Autorisation</h4>
        <div className="space-y-10">
           <GranularControl label="F_BKPF_BUK (Société)" value="1000 - 2000" desc="Restriction par code société OHADA" />
           <GranularControl label="P_ORGIN (Dossier Personnel)" value="Dpt Prod, Dpt IT" desc="Accès aux données RH par département" />
           <GranularControl label="M_MATE_WRK (Magasins)" value="Dakar_Log, Thies_Log" desc="Gestion des stocks par site géographique" />
           <GranularControl label="K_ORDER (Ordres de Coûts)" value="C_PROD_*" desc="Contrôle des ordres de fabrication" />
        </div>
     </div>

     <div className="flex flex-col gap-6">
        <div className="bg-[#f8fafc] border border-[#cbd5e1] p-10 flex flex-col gap-8 rounded-xl shadow-inner">
           <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">Niveau de Privilège</h4>
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
    className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm"
  >
     <div className="p-6 bg-[#f8fafc] border-b border-[#cbd5e1] flex justify-between items-center">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#0f172a]">Matrice de Contrôle d'Accès (RBAC Grid)</h4>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#cbd5e1] rounded-lg text-[10px] font-bold uppercase tracking-widest text-[#64748b] hover:text-[#0f172a] transition-all shadow-sm">
              <Eye size={14} /> Vue par Module
           </button>
        </div>
     </div>
     <div className="overflow-auto">
        <table className="w-full text-left whitespace-nowrap">
           <thead className="bg-[#f1f5f9] text-[9px] font-bold uppercase text-[#64748b] tracking-widest border-b border-[#cbd5e1]">
              <tr>
                 <th className="p-6">Rôles / Modules</th>
                 <th className="p-6 text-center">FI (Finance)</th>
                 <th className="p-6 text-center">RH (Pay)</th>
                 <th className="p-6 text-center">MM (Stocks)</th>
                 <th className="p-6 text-center">CO (Costing)</th>
                 <th className="p-6 text-center">ADMIN</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-[#f1f5f9]">
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
  <tr className="hover:bg-blue-50/30 transition-all group cursor-pointer">
     <td className="p-6">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] flex items-center justify-center font-bold text-xs text-[#94a3b8] group-hover:text-[#005eb8] group-hover:border-[#005eb8] transition-all shadow-inner">
              {name.split(' ').map((n: string) => n[0]).join('')}
           </div>
           <div className="flex flex-col">
              <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{name}</span>
              <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider mt-1">Connecté : Aujourd'hui 14:00</span>
           </div>
        </div>
     </td>
     <td className="p-6 text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-widest">{id}</td>
     <td className="p-6 text-[10px] font-bold text-[#334155] uppercase tracking-widest">{role}</td>
     <td className="p-6 text-[10px] font-bold text-[#005eb8] uppercase tracking-widest italic">{grain}</td>
     <td className="p-6 text-center">
        <span className="px-3 py-1 bg-green-50 text-[#107e3e] border border-green-100 rounded text-[9px] font-bold uppercase tracking-wider">
           {status}
        </span>
     </td>
     <td className="p-6 text-right">
        <button className="p-2 text-[#94a3b8] hover:text-[#0f172a] transition-colors"><MoreVertical size={18} /></button>
     </td>
  </tr>
);

const RoleDetailRow = ({ name, desc, privs }: any) => (
  <div className="p-6 hover:bg-blue-50/30 transition-all group flex items-center justify-between cursor-pointer border-transparent border-l-4 hover:border-[#005eb8]">
     <div className="flex items-center gap-6">
        <div className="p-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[#94a3b8] group-hover:text-[#005eb8] group-hover:border-blue-100 transition-all shadow-inner">
           <ShieldCheck size={24} />
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-bold text-[#334155] uppercase tracking-widest group-hover:text-[#005eb8] transition-colors">{name}</span>
           <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest mt-1">{desc}</span>
        </div>
     </div>
     <div className="flex items-center gap-12">
        <div className="text-right">
           <p className="text-sm font-bold text-[#0f172a]">{privs}</p>
           <p className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest">Privilèges</p>
        </div>
        <button className="p-2 text-[#94a3b8] hover:text-[#0f172a] transition-all"><ChevronRight size={20} /></button>
     </div>
  </div>
);

const SodViolation = ({ label, count, color }: any) => (
  <div className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
    color === 'red' ? 'bg-red-50 border-red-100 text-[#dc2626]' : 'bg-green-50 border-green-100 text-[#107e3e]'
  }`}>
     <span className="text-[11px] font-bold uppercase tracking-tight">{label}</span>
     <div className="flex items-center gap-3">
        <span className="text-sm font-bold">{count}</span>
        <AlertTriangle size={16} className={count > 0 ? `animate-pulse` : 'opacity-20'} />
     </div>
  </div>
);

const GranularControl = ({ label, value, desc }: any) => (
  <div className="flex flex-col gap-4 group">
     <div className="flex justify-between items-center">
        <span className="text-[11px] font-bold text-[#005eb8] uppercase tracking-widest">{label}</span>
        <span className="text-[10px] font-bold text-[#0f172a] px-3 py-1 bg-white rounded border border-[#cbd5e1] shadow-sm group-hover:border-[#005eb8] transition-all">{value}</span>
     </div>
     <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider italic leading-relaxed">{desc}</p>
  </div>
);

const PrivilegeLevel = ({ label, active }: any) => (
  <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
    active ? 'bg-white border-[#005eb8] shadow-sm' : 'bg-[#f8fafc] border-[#cbd5e1] opacity-50'
  }`}>
     <span className={`text-[11px] font-bold uppercase tracking-widest ${active ? 'text-[#0f172a]' : 'text-[#94a3b8]'}`}>{label}</span>
     {active ? <Check size={18} className="text-[#107e3e]" /> : <X size={18} className="text-[#94a3b8]" />}
  </div>
);

const MatrixRow = ({ role, fi, rh, mm, co, admin }: any) => (
  <tr className="hover:bg-blue-50/30 transition-all group cursor-pointer border-b border-[#f1f5f9]">
     <td className="p-6 text-xs font-bold text-[#334155] uppercase tracking-widest border-r border-[#f1f5f9] group-hover:text-[#005eb8] transition-colors">{role}</td>
     <td className="p-6 text-center border-r border-[#f1f5f9]"><StatusMatrix value={fi} /></td>
     <td className="p-6 text-center border-r border-[#f1f5f9]"><StatusMatrix value={rh} /></td>
     <td className="p-6 text-center border-r border-[#f1f5f9]"><StatusMatrix value={mm} /></td>
     <td className="p-6 text-center border-r border-[#f1f5f9]"><StatusMatrix value={co} /></td>
     <td className="p-6 text-center"><StatusMatrix value={admin} /></td>
  </tr>
);

const StatusMatrix = ({ value }: any) => {
  if (value === '-') return <span className="text-[#cbd5e1]">—</span>;
  return (
    <div className="flex items-center justify-center gap-2">
       {value.includes('R') && <span className="w-7 h-7 bg-green-50 text-[#107e3e] rounded border border-green-100 flex items-center justify-center font-bold text-[10px] shadow-sm">R</span>}
       {value.includes('W') && <span className="w-7 h-7 bg-red-50 text-[#dc2626] rounded border border-red-100 flex items-center justify-center font-bold text-[10px] shadow-sm">W</span>}
    </div>
  );
};

const WizardInput = ({ label, value }: any) => (
  <div className="flex flex-col gap-2">
     <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">{label}</label>
     <input type="text" defaultValue={value} className="bg-white border border-[#cbd5e1] rounded-lg px-4 py-3 text-xs font-bold text-[#334155] outline-none focus:border-[#005eb8] transition-all shadow-inner" />
  </div>
);

const WizardSelect = ({ label, options, selected }: any) => (
  <div className="flex flex-col gap-2">
     <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">{label}</label>
     <select defaultValue={selected} className="bg-white border border-[#cbd5e1] rounded-lg px-4 py-3 text-xs font-bold text-[#334155] outline-none focus:border-[#005eb8] transition-all shadow-inner appearance-none cursor-pointer">
        {options.map((o: any) => <option key={o}>{o}</option>)}
     </select>
  </div>
);

const AuditStatus = ({ label, value, color }: any) => (
  <div className="p-6 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl flex flex-col gap-2 shadow-inner">
     <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">{label}</span>
     <span className={`text-[11px] font-bold uppercase tracking-widest ${color === 'red' ? 'text-[#dc2626]' : 'text-[#107e3e]'}`}>{value}</span>
  </div>
);

export default IdentityManager;
