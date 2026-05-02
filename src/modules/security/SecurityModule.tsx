import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Eye, Key, AlertTriangle,
  Lock, Search, Filter, ShieldAlert,
  Users, UserCheck, Layout, Database,
  Activity, Zap, Terminal, Shield,
  ChevronRight, RefreshCw, FileText, Plus,
  MoreVertical, Power, Globe, Server,
  Fingerprint, FileCheck, History, Landmark
} from 'lucide-react';

const SecurityModule = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'roles' | 'sessions' | 'policies'>('audit');

  const tabs = [
    { id: 'audit', label: 'Piste d\'Audit (SM20)', icon: Eye },
    { id: 'roles', label: 'Rôles & Autorisations (PFCG)', icon: ShieldCheck },
    { id: 'sessions', label: 'Sessions Actives (SM04)', icon: Activity },
    { id: 'policies', label: 'Gouvernance & Risques (GRC)', icon: ShieldAlert },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Security Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <Shield size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Centre de Sécurité & Gouvernance (Basis)</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Rôles PFCG • Audit SM20 • GRC Compliance • Standards OHADA</p>
           </div>
        </div>
        <div className="flex bg-[#f1f5f9] p-1 rounded-xl border border-[#cbd5e1] relative z-10 overflow-x-auto no-scrollbar shadow-inner mt-6 lg:mt-0">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-3 px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                 activeTab === tab.id ? 'bg-white text-[#005eb8] shadow-md border border-[#cbd5e1]' : 'text-[#64748b] hover:text-[#0f172a] hover:bg-white/50'
               }`}
             >
                <tab.icon size={16} />
                {tab.label}
             </button>
           ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'audit' && (
           <motion.div 
             key="audit"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="flex flex-col gap-8 h-full"
           >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                 <SecurityStatCard label="Événements Critiques" value="12" sub="Dernières 24h" color="red" icon={<AlertTriangle size={24} />} />
                 <SecurityStatCard label="Actions Administrateur" value="45" sub="Traçabilité Complète" color="blue" icon={<Terminal size={24} />} />
                 <SecurityStatCard label="Tentatives d'Intrusion" value="00" sub="Protection Joule AI" color="green" icon={<ShieldCheck size={24} />} />
                 <SecurityStatCard label="Conformité Globale" value="98%" sub="Score OHADA GRC" color="green" icon={<FileCheck size={24} />} />
              </div>

              <div className="bg-white border border-[#cbd5e1] rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
                 <div className="p-8 bg-[#f8fafc] border-b border-[#cbd5e1] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                          <Eye size={20} />
                       </div>
                       <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Piste d'Audit Immuable (Journal SM20)</h4>
                    </div>
                    <div className="flex gap-4">
                       <div className="relative group">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#005eb8] transition-colors" size={18} />
                          <input 
                            type="text" 
                            placeholder="Chercher utilisateur, T-Code..." 
                            className="pl-12 pr-6 py-2.5 bg-white border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#334155] placeholder:text-[#94a3b8] uppercase tracking-tight outline-none focus:border-[#005eb8] transition-all w-64 shadow-inner"
                          />
                       </div>
                       <button className="flex items-center gap-3 px-6 py-2.5 bg-[#f8fafc] hover:bg-white border border-[#cbd5e1] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#005eb8] transition-all shadow-sm">
                          <FileText size={18} /> Exporter Rapport
                       </button>
                    </div>
                 </div>
                 <div className="overflow-auto flex-1">
                    <table className="w-full text-left whitespace-nowrap">
                       <thead className="bg-[#f8fafc] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] border-b-2 border-[#cbd5e1] sticky top-0 z-10 shadow-sm">
                          <tr>
                             <th className="px-8 py-5">Horodatage</th>
                             <th className="px-8 py-5">Utilisateur</th>
                             <th className="px-8 py-5">T-Code / Action</th>
                             <th className="px-8 py-5">Module ERP</th>
                             <th className="px-8 py-5">Détails de la Transaction</th>
                             <th className="px-8 py-5 text-center">Niveau de Gravité</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-[#f1f5f9]">
                          <AuditRow time="29/04/2024 18:25" user="ADM_KANE" tcode="F-02" module="FI" details="Modification Compte G/L 401100 (Collectif)" severity="Moyenne" />
                          <AuditRow time="29/04/2024 18:10" user="SYSTEM" tcode="SM20" module="BASIS" details="Simulation Cleanup du Journal d'Audit" severity="Basse" />
                          <AuditRow time="29/04/2024 17:45" user="RH_NDIAYE" tcode="PA30" module="HR" details="Consultation Infotype Sensible 0008 (Salaire de Base)" severity="Élevée" alert />
                          <AuditRow time="29/04/2024 16:20" user="COMPTA_DIOP" tcode="FB60" module="FI" details="Création Facture Fournisseur #2024-882" severity="Basse" />
                       </tbody>
                    </table>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'roles' && (
           <motion.div 
             key="roles"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.98 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full"
           >
              <div className="lg:col-span-2 flex flex-col gap-8 overflow-hidden">
                 <div className="bg-white border border-[#cbd5e1] rounded-xl overflow-hidden shadow-sm flex flex-col flex-1">
                    <div className="p-8 bg-[#f8fafc] border-b border-[#cbd5e1] flex justify-between items-center">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                             <Users size={20} />
                          </div>
                          <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Maintenance des Rôles Standard & Z (PFCG)</h4>
                       </div>
                       <button className="flex items-center gap-3 px-8 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg">
                          <Plus size={20} /> Créer un Nouveau Rôle
                       </button>
                    </div>
                    <div className="overflow-auto flex-1 divide-y divide-[#f1f5f9]">
                       <RoleRow name="Z_COMPTABLE_GENERAL" desc="Accès complet FI/CO + États financiers OHADA" users={5} status="Actif" />
                       <RoleRow name="Z_RH_ADMIN_PAIE" desc="Gestion des infotypes sensibles & Moteur de paie" users={2} status="Actif" />
                       <RoleRow name="Z_AUDITEUR_EXTERNE" desc="Lecture seule sur l'ensemble du système ERP" users={1} status="Temporaire" />
                       <RoleRow name="Z_USER_SELF_SERVICE" desc="Accès ESS (Espace Salarié) uniquement" users={112} status="Actif" />
                    </div>
                 </div>

                 <div className="bg-white border border-[#cbd5e1] p-10 rounded-xl shadow-sm flex flex-col gap-8">
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a] border-b border-[#f1f5f9] pb-4">Objets d'Autorisation & Valeurs Techniques</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <AuthObject label="F_BKPF_BUK (Société Gérée)" value="1000, 2000, 3000" icon={<Landmark size={18} />} />
                       <AuthObject label="P_ORGIN (Infotypes RH Sensibles)" value="0001-0008, 0105, 2001" icon={<Fingerprint size={18} />} />
                       <AuthObject label="M_MATE_WGR (Groupes de Marchandises)" value="RM-*, PF-*, CONS-*" icon={<Database size={18} />} />
                       <AuthObject label="S_USER_GRP (Groupes d'Utilisateurs)" value="ADM_*, TECH_*, COMPTA_*" icon={<Users size={18} />} />
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-8 h-full">
                 <div className="bg-blue-50 border border-blue-100 p-10 rounded-xl flex flex-col gap-8 shadow-inner flex-1">
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#005eb8] border-b border-blue-200 pb-4">Matrice de Séparation des Tâches (SoD)</h4>
                    <div className="space-y-6">
                       <SodRule label="Créer Fournisseur vs Valider Paiement" status="Risque Élevé" color="red" />
                       <SodRule label="Saisie Éléments Paie vs Validation" status="Risque Moyen" color="orange" />
                       <SodRule label="Saisie Inventaire vs Ajustement Stock" status="Conforme" color="green" />
                    </div>
                    <div className="mt-auto p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                       <p className="text-[11px] text-[#64748b] font-bold leading-relaxed italic uppercase tracking-widest opacity-80">
                          "L'analyse GRC en temps réel n'a détecté aucun conflit de séparation des tâches critique ce mois-ci."
                       </p>
                    </div>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'sessions' && (
           <motion.div 
             key="sessions"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
             className="flex flex-col gap-8 h-full"
           >
              <div className="bg-white border border-[#cbd5e1] rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
                 <div className="p-8 bg-[#f8fafc] border-b border-[#cbd5e1] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-green-50 text-[#107e3e] rounded-xl flex items-center justify-center border border-green-100 shadow-inner">
                          <Activity size={20} />
                       </div>
                       <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Sessions Utilisateurs Actives (SM04 Monitor)</h4>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-3 px-6 py-2.5 bg-green-50 text-[#107e3e] rounded-[2rem] text-[10px] font-bold uppercase tracking-widest border border-green-100 shadow-sm animate-pulse">
                          <div className="w-2 h-2 bg-[#107e3e] rounded-full" />
                          12 Utilisateurs en Ligne
                       </span>
                       <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#005eb8] transition-all shadow-sm">
                          <RefreshCw size={20} />
                       </button>
                    </div>
                 </div>
                 <div className="overflow-auto flex-1">
                    <table className="w-full text-left whitespace-nowrap">
                       <thead className="bg-[#f8fafc] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] border-b-2 border-[#cbd5e1] sticky top-0 z-10 shadow-sm">
                          <tr>
                             <th className="px-8 py-5">Utilisateur ERP</th>
                             <th className="px-8 py-5">Terminal / Adresse IP</th>
                             <th className="px-8 py-5 text-center">T-Code Actif</th>
                             <th className="px-8 py-5 text-center">Durée de Session</th>
                             <th className="px-8 py-5 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-[#f1f5f9]">
                          <SessionRow user="ADM_KANE" ip="192.168.1.42" tcode="PFCG" time="00:45:12" server="APP_SRV_01" />
                          <SessionRow user="RH_NDIAYE" ip="192.168.1.102" tcode="ESS_PORTAL" time="00:12:05" server="APP_SRV_02" />
                          <SessionRow user="COMPTA_DIOP" ip="10.0.4.55" tcode="FBL3N" time="02:30:15" server="APP_SRV_01" />
                       </tbody>
                    </table>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'policies' && (
            <motion.div 
             key="policies"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full"
            >
               <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-[#cbd5e1] p-10 rounded-xl shadow-sm flex flex-col gap-10">
                     <div className="flex items-center gap-4 text-[#005eb8] border-b border-[#f1f5f9] pb-6">
                        <Lock size={24} />
                        <h4 className="text-[12px] font-bold uppercase tracking-[0.2em]">Politique de Mots de Passe ERP</h4>
                     </div>
                     <div className="space-y-6">
                        <PolicyToggle label="Authentification Multi-Facteurs (2FA)" active />
                        <PolicyToggle label="Complexité Spéciale Obligatoire" active />
                        <PolicyToggle label="Expiration Périodique (90 Jours)" active />
                        <PolicyToggle label="Verrouillage Automatique (3 Échecs)" active />
                     </div>
                  </div>
                  <div className="bg-white border border-[#cbd5e1] p-10 rounded-xl shadow-sm flex flex-col gap-10">
                     <div className="flex items-center gap-4 text-[#107e3e] border-b border-[#f1f5f9] pb-6">
                        <ShieldCheck size={24} />
                        <h4 className="text-[12px] font-bold uppercase tracking-[0.2em]">Mesures de Protection Cyber</h4>
                     </div>
                     <div className="space-y-6">
                        <p className="text-[11px] text-[#64748b] font-bold leading-relaxed italic uppercase tracking-widest opacity-80">
                           Le pare-feu intelligent Joule analyse les patterns de connexion GEO-IP. Toute tentative hors zone Sénégal/UEMOA est bloquée par défaut.
                        </p>
                        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-[10px] font-bold uppercase tracking-[0.2em] text-[#005eb8] flex items-center gap-3">
                           <Globe size={18} /> Antivirus Endpoint : Actif & Synchronisé
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-white border border-[#cbd5e1] p-10 rounded-xl shadow-sm flex flex-col gap-10 relative overflow-hidden group h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-125 transition-transform"></div>
                  <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a] relative z-10 border-b border-[#f1f5f9] pb-6">Score de Conformité Globale GRC</h4>
                  <div className="flex-1 flex flex-col items-center justify-center gap-10 relative z-10">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                       <svg className="w-full h-full transform -rotate-90">
                          <circle cx="96" cy="96" r="88" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                          <circle cx="96" cy="96" r="88" stroke="#107e3e" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 * (1 - 0.98)} className="transition-all duration-1000" strokeLinecap="round" />
                       </svg>
                       <div className="absolute flex flex-col items-center">
                          <span className="text-5xl font-black text-[#0f172a] tracking-tighter">98%</span>
                          <span className="text-[10px] font-black text-[#107e3e] uppercase tracking-[0.2em] mt-2">Niveau : Optimal</span>
                       </div>
                    </div>
                    <p className="text-[11px] text-[#64748b] font-bold text-center uppercase tracking-widest leading-relaxed px-4">Conformité aux directives OHADA relative à la sécurité des systèmes comptables informatisés.</p>
                  </div>
                  <button className="w-full py-5 bg-[#005eb8] text-white rounded-[2rem] text-[11px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20 hover:bg-[#004080] transition-all relative z-10 flex items-center justify-center gap-4">
                     <Fingerprint size={22} />
                     Générer Certificat OHADA
                  </button>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const SecurityStatCard = ({ label, value, sub, color, icon }: any) => (
  <div className="bg-white border border-[#cbd5e1] p-8 rounded-xl group hover:border-[#005eb8] transition-all shadow-sm relative overflow-hidden cursor-pointer">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${color === 'red' ? 'bg-[#dc2626]' : color === 'blue' ? 'bg-[#005eb8]' : 'bg-[#107e3e]'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
       <div>
          <p className="text-[#64748b] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 leading-none opacity-80">{label}</p>
          <h3 className="text-3xl font-bold tracking-tighter text-[#0f172a]">{value}</h3>
       </div>
       <div className={`p-4 rounded-2xl border shadow-inner transition-transform group-hover:scale-110 ${
         color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100' : 
         color === 'blue' ? 'bg-blue-50 text-[#005eb8] border-blue-100' : 
         'bg-green-50 text-[#107e3e] border-green-100'
       }`}>
          {icon}
       </div>
    </div>
    <p className="text-[10px] font-bold text-[#64748b] uppercase mt-2 tracking-widest opacity-70 italic">{sub}</p>
  </div>
);

const AuditRow = ({ time, user, tcode, module, details, severity, alert }: any) => (
  <tr className="hover:bg-blue-50/30 transition-all group cursor-pointer">
     <td className="px-8 py-6 border-r border-[#f1f5f9]">
        <span className="font-mono font-bold text-[#64748b] text-[11px] tracking-tighter uppercase">{time}</span>
     </td>
     <td className="px-8 py-6 border-r border-[#f1f5f9]">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-[#f8fafc] border border-[#cbd5e1] rounded-full flex items-center justify-center text-[#0f172a] group-hover:border-[#005eb8] transition-colors shadow-sm">
              <Users size={14} />
           </div>
           <span className="font-bold text-[#0f172a] text-[11px] uppercase tracking-widest">{user}</span>
        </div>
     </td>
     <td className="px-8 py-6 border-r border-[#f1f5f9] text-center">
        <span className="px-3 py-1 bg-[#f8fafc] border border-[#cbd5e1] rounded text-[#005eb8] text-[10px] font-bold uppercase tracking-widest shadow-inner">{tcode}</span>
     </td>
     <td className="px-8 py-6 text-center border-r border-[#f1f5f9]">
        <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-widest opacity-80">{module}</span>
     </td>
     <td className="px-8 py-6 border-r border-[#f1f5f9]">
        <span className="text-[#334155] text-xs font-bold uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{details}</span>
     </td>
     <td className="px-8 py-6 text-center">
        <span className={`px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 w-fit mx-auto ${
           severity === 'Élevée' ? 'bg-red-50 text-[#dc2626] border-red-200' : 
           severity === 'Moyenne' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
           'bg-[#f8fafc] text-[#64748b] border-[#cbd5e1]'
        } ${alert ? 'animate-pulse' : ''}`}>
           {severity === 'Élevée' && <AlertTriangle size={12} />}
           {severity}
        </span>
     </td>
  </tr>
);

const RoleRow = ({ name, desc, users, status }: any) => (
  <div className="px-10 py-8 hover:bg-blue-50/30 transition-all group flex items-center justify-between cursor-pointer">
     <div className="flex items-center gap-8">
        <div className="w-14 h-14 bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl flex items-center justify-center text-[#94a3b8] group-hover:text-[#005eb8] group-hover:border-[#005eb8] transition-all shadow-sm">
           <Shield size={28} />
        </div>
        <div className="flex flex-col">
           <span className="text-sm font-bold text-[#0f172a] uppercase tracking-tighter group-hover:text-[#005eb8] transition-colors">{name}</span>
           <span className="text-[11px] text-[#64748b] font-bold uppercase tracking-widest mt-2 opacity-70 italic">{desc}</span>
        </div>
     </div>
     <div className="flex items-center gap-12">
        <div className="text-right border-r border-[#f1f5f9] pr-12">
           <p className="text-xl font-black text-[#0f172a] tracking-tighter">{users}</p>
           <p className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1">Effectifs</p>
        </div>
        <span className={`px-4 py-1.5 rounded-[2rem] border text-[9px] font-bold uppercase tracking-widest ${
          status === 'Actif' ? 'bg-green-50 text-[#107e3e] border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'
        }`}>
           {status}
        </span>
        <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#0f172a] shadow-sm transition-all">
           <ChevronRight size={20} />
        </button>
     </div>
  </div>
);

const AuthObject = ({ label, value, icon }: any) => (
  <div className="p-8 bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl flex flex-col gap-3 shadow-inner hover:bg-white hover:border-[#005eb8] transition-all group cursor-pointer">
     <div className="flex items-center gap-4 text-[#94a3b8] group-hover:text-[#005eb8] transition-colors">
        {icon}
        <span className="text-[10px] font-bold text-[#005eb8] uppercase tracking-[0.2em]">{label}</span>
     </div>
     <span className="text-sm font-bold text-[#334155] tracking-tight">{value}</span>
  </div>
);

const SodRule = ({ label, status, color }: any) => (
  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-transparent hover:border-blue-200 transition-all cursor-pointer group">
     <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-widest group-hover:text-[#0f172a] transition-colors">{label}</span>
     <span className={`text-[10px] font-black uppercase tracking-widest ${
       color === 'red' ? 'text-[#dc2626]' : color === 'orange' ? 'text-orange-600' : 'text-[#107e3e]'
     }`}>{status}</span>
  </div>
);

const SessionRow = ({ user, ip, tcode, time, server }: any) => (
  <tr className="hover:bg-blue-50/30 transition-all group cursor-pointer font-mono">
     <td className="px-8 py-6 border-r border-[#f1f5f9]">
        <div className="flex flex-col">
           <span className="text-xs font-bold text-[#0f172a] uppercase tracking-widest group-hover:text-[#005eb8] transition-colors">{user}</span>
           <span className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1 italic">{server}</span>
        </div>
     </td>
     <td className="px-8 py-6 border-r border-[#f1f5f9] text-[#64748b] text-xs font-bold">{ip}</td>
     <td className="px-8 py-6 border-r border-[#f1f5f9] text-center">
        <span className="px-3 py-1 bg-blue-50 text-[#005eb8] rounded border border-blue-100 text-[10px] font-black">{tcode}</span>
     </td>
     <td className="px-8 py-6 text-center border-r border-[#f1f5f9]">
        <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-tighter">{time}</span>
     </td>
     <td className="px-8 py-6 text-right">
        <button className="px-6 py-2.5 bg-red-50 hover:bg-[#dc2626] text-[#dc2626] hover:text-white border border-red-100 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all shadow-sm">
           Terminer Session
        </button>
     </td>
  </tr>
);

const PolicyToggle = ({ label, active }: any) => (
  <div className="flex items-center justify-between p-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl transition-all group hover:bg-white hover:border-[#005eb8] cursor-pointer">
     <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-widest group-hover:text-[#0f172a] transition-colors">{label}</span>
     <div className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-[#005eb8]' : 'bg-[#cbd5e1]'} shadow-inner`}>
        <motion.div animate={{ x: active ? 26 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg" />
     </div>
  </div>
);

export default SecurityModule;
