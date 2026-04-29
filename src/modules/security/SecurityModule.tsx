import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Eye, Key, AlertTriangle, 
  Lock, Search, Filter, ShieldAlert,
  Users, UserCheck, Layout, Database,
  Activity, Zap, Terminal, Shield,
  ChevronRight, RefreshCw, FileText, Plus
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-slate-800/20 border border-slate-700/50 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">
              <Shield size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Centre de Sécurité & Gouvernance (Basis)</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">Rôles PFCG • Audit SM20 • GRC Compliance • OHADA Security Standard</p>
           </div>
        </div>
        <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50 relative z-10">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'
               }`}
             >
                <tab.icon size={14} />
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
             className="flex flex-col gap-6"
           >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                 <SecurityStatCard label="Événements Critiques" value="12" sub="Dernières 24h" color="rose" trend="+2" />
                 <SecurityStatCard label="Actions Admin" value="45" sub="Traçabilité Totale" color="indigo" trend="Stable" />
                 <SecurityStatCard label="Tentatives Intrusion" value="0" sub="Protection IA Joule" color="emerald" trend="Optimal" />
                 <SecurityStatCard label="Conformité OHADA" value="98%" sub="Score Global" color="emerald" trend="+1%" />
              </div>

              <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
                 <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Piste d'Audit Immuable (SM20)</h4>
                    <div className="flex gap-2">
                       <button className="p-2 text-slate-500 hover:text-white"><Search size={18} /></button>
                       <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                          <FileText size={14} /> Exporter Rapport Légal
                       </button>
                    </div>
                 </div>
                 <div className="overflow-auto max-h-[500px]">
                    <table className="w-full text-left">
                       <thead className="bg-slate-900/50 text-[9px] font-black uppercase text-slate-500 tracking-widest">
                          <tr>
                             <th className="p-6">Horodatage</th>
                             <th className="p-6">Utilisateur</th>
                             <th className="p-6">T-Code / Action</th>
                             <th className="p-6">Module</th>
                             <th className="p-6">Détails de la transaction</th>
                             <th className="p-6 text-center">Gravité</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-700/30 font-mono">
                          <AuditRow time="29/04/2024 18:25" user="ADM_KANE" tcode="F-02" module="FI" details="Modif. Compte G/L 401100" severity="Moyenne" />
                          <AuditRow time="29/04/2024 18:10" user="SYSTEM" tcode="SM20" module="BASIS" details="Audit Log Cleanup Simulation" severity="Basse" />
                          <AuditRow time="29/04/2024 17:45" user="RH_NDIAYE" tcode="PA30" module="HR" details="Consultation Infotype 0008 (Salaire)" severity="Élevée" alert />
                          <AuditRow time="29/04/2024 16:20" user="COMPTA_DIOP" tcode="FB60" module="FI" details="Création Facture Fournisseur #882" severity="Basse" />
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
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 flex flex-col gap-6">
                 <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
                    <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                       <h4 className="text-xs font-black uppercase tracking-widest text-white">Maintenance des Rôles (PFCG)</h4>
                       <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                          <Plus size={14} /> Créer Rôle Z_*
                       </button>
                    </div>
                    <div className="p-0 divide-y divide-slate-700/30">
                       <RoleRow name="Z_COMPTABLE_GENERAL" desc="Accès complet FI/CO + États financiers" users={5} status="Actif" />
                       <RoleRow name="Z_RH_ADMIN_PAIE" desc="Gestion des infotypes sensibles & Moteur de paie" users={2} status="Actif" />
                       <RoleRow name="Z_AUDITEUR_EXTERNE" desc="Lecture seule sur l'ensemble du système" users={1} status="Temporaire" />
                       <RoleRow name="Z_USER_SELF_SERVICE" desc="Accès ESS (Espace Salarié) uniquement" users={112} status="Actif" />
                    </div>
                 </div>

                 <div className="card bg-slate-800/30 p-8 flex flex-col gap-6 shadow-2xl">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Objets d'Autorisation (S_TCODE)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <AuthObject label="F_BKPF_BUK (Société)" value="1000, 2000" />
                       <AuthObject label="P_ORGIN (Infotypes HR)" value="0001-0008, 0105" />
                       <AuthObject label="M_MATE_WGR (Stocks)" value="RM-*, PF-*" />
                       <AuthObject label="S_USER_GRP (Groupes)" value="ADM_*, TECH_*" />
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-indigo-600/5 border-indigo-500/20 p-8 flex flex-col gap-6 shadow-2xl">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-indigo-500/20 pb-4">Matrice de Séparation des Tâches (SoD)</h4>
                    <div className="space-y-4">
                       <SodRule label="Créer Fournisseur vs Payer" status="Risque Élevé" color="rose" />
                       <SodRule label="Saisie Paie vs Validation" status="Risque Moyen" color="amber" />
                       <SodRule label="Inventaire vs Ajustement" status="Conforme" color="emerald" />
                    </div>
                    <div className="mt-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                       <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                          L'analyse GRC a détecté 0 conflit de séparation des tâches critique ce mois-ci.
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
             className="flex flex-col gap-6"
           >
              <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
                 <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Sessions Utilisateurs Actives (SM04)</h4>
                    <div className="flex gap-2">
                       <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-black uppercase border border-emerald-500/20">
                          12 En ligne
                       </span>
                       <button className="p-2 text-slate-500 hover:text-white transition-colors"><RefreshCw size={18} /></button>
                    </div>
                 </div>
                 <div className="p-0">
                    <table className="w-full text-left">
                       <thead className="bg-slate-900/50 text-[9px] font-black uppercase text-slate-500 tracking-widest">
                          <tr>
                             <th className="p-6">Utilisateur</th>
                             <th className="p-6">Terminal / IP</th>
                             <th className="p-6">T-Code Actif</th>
                             <th className="p-6">Temps de session</th>
                             <th className="p-6 text-right">Action</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-700/30">
                          <SessionRow user="ADM_KANE" ip="192.168.1.42" tcode="PFCG" time="00:45:12" />
                          <SessionRow user="RH_NDIAYE" ip="192.168.1.102" tcode="ESS_PORTAL" time="00:12:05" />
                          <SessionRow user="COMPTA_DIOP" ip="10.0.4.55" tcode="FBL3N" time="02:30:15" />
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
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
               <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="card bg-slate-800/30 p-8 flex flex-col gap-6">
                     <div className="flex items-center gap-3 text-indigo-400">
                        <Lock size={20} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Politique de Mots de Passe</h4>
                     </div>
                     <div className="space-y-4">
                        <PolicyToggle label="Authentification 2FA" active />
                        <PolicyToggle label="Complexité Spéciale (@#$)" active />
                        <PolicyToggle label="Expiration (90 jours)" active />
                        <PolicyToggle label="Verrouillage après 3 échecs" active />
                     </div>
                  </div>
                  <div className="card bg-slate-800/30 p-8 flex flex-col gap-6">
                     <div className="flex items-center gap-3 text-emerald-400">
                        <ShieldCheck size={20} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Mesures de Protection Active</h4>
                     </div>
                     <div className="space-y-4">
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                           Le pare-feu intelligent (IA Joule Firewall) analyse les patterns de connexion GEO-IP. Toute connexion hors zone Sénégal/UEMOA sans VPN est bloquée.
                        </p>
                        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-[9px] font-black uppercase text-indigo-400">
                           Antivirus Endpoint : Connecté & Actif
                        </div>
                     </div>
                  </div>
               </div>

               <div className="card bg-indigo-600/5 border border-indigo-500/20 p-8 flex flex-col gap-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Score de Compliance GRC</h4>
                  <div className="flex-1 flex items-center justify-center py-10">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                       <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 * (1 - 0.98)} className="text-emerald-500" strokeLinecap="round" />
                       </svg>
                       <div className="absolute flex flex-col items-center">
                          <span className="text-2xl font-black text-white">98%</span>
                          <span className="text-[8px] font-black text-slate-500 uppercase">SAFE</span>
                       </div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">
                     Générer Certificat OHADA
                  </button>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const SecurityStatCard = ({ label, value, sub, color, trend }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden p-8 shadow-xl border-slate-700/50">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-4">
       <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none">{label}</p>
       <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg bg-${trend.includes('+') && color === 'rose' ? 'rose' : 'emerald'}-500/10 text-${trend.includes('+') && color === 'rose' ? 'rose' : 'emerald'}-400 border border-${trend.includes('+') && color === 'rose' ? 'rose' : 'emerald'}-500/20`}>{trend}</span>
    </div>
    <h3 className="text-2xl font-black text-white">{value}</h3>
    <p className="text-[9px] font-bold text-slate-600 uppercase mt-2 tracking-tighter">{sub}</p>
  </div>
);

const AuditRow = ({ time, user, tcode, module, details, severity, alert }: any) => (
  <tr className="hover:bg-indigo-600/5 transition-all group cursor-pointer">
     <td className="p-6 text-slate-500 text-[10px]">{time}</td>
     <td className="p-6 font-black text-white text-[10px] uppercase tracking-widest">{user}</td>
     <td className="p-6">
        <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-indigo-400 text-[10px] font-black">{tcode}</span>
     </td>
     <td className="p-6 text-slate-400 text-[10px] font-black">{module}</td>
     <td className="p-6 text-slate-500 text-[10px] truncate max-w-xs">{details}</td>
     <td className="p-6 text-center">
        <span className={`text-[9px] font-black uppercase ${
           severity === 'Élevée' ? 'text-rose-400' : severity === 'Moyenne' ? 'text-amber-400' : 'text-slate-500'
        } ${alert ? 'animate-pulse' : ''}`}>
           {severity}
        </span>
     </td>
  </tr>
);

const RoleRow = ({ name, desc, users, status }: any) => (
  <div className="p-6 hover:bg-indigo-600/5 transition-all group flex items-center justify-between cursor-pointer">
     <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 group-hover:text-indigo-400">
           <ShieldCheck size={20} />
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{name}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">{desc}</span>
        </div>
     </div>
     <div className="flex items-center gap-8">
        <div className="text-right">
           <p className="text-xs font-black text-white">{users}</p>
           <p className="text-[9px] text-slate-500 font-bold uppercase">Utilisateurs</p>
        </div>
        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-[9px] font-black uppercase">
           {status}
        </span>
        <button className="p-2 text-slate-600 hover:text-white"><ChevronRight size={18} /></button>
     </div>
  </div>
);

const AuthObject = ({ label, value }: any) => (
  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-1">
     <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{label}</span>
     <span className="text-[10px] font-bold text-slate-200">{value}</span>
  </div>
);

const SodRule = ({ label, status, color }: any) => (
  <div className="flex items-center justify-between">
     <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
     <span className={`text-[9px] font-black uppercase text-${color}-400`}>{status}</span>
  </div>
);

const SessionRow = ({ user, ip, tcode, time }: any) => (
  <tr className="hover:bg-indigo-600/5 transition-all group cursor-pointer font-mono">
     <td className="p-6 text-xs font-black text-white uppercase">{user}</td>
     <td className="p-6 text-xs text-slate-500">{ip}</td>
     <td className="p-6">
        <span className="text-[10px] font-black text-indigo-400">{tcode}</span>
     </td>
     <td className="p-6 text-[10px] text-slate-500">{time}</td>
     <td className="p-6 text-right">
        <button className="text-[9px] font-black text-rose-500 hover:text-rose-400 uppercase">Terminer</button>
     </td>
  </tr>
);

const PolicyToggle = ({ label, active }: any) => (
  <div className="flex items-center justify-between">
     <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
     <div className={`w-8 h-4 rounded-full relative transition-colors ${active ? 'bg-indigo-600' : 'bg-slate-700'}`}>
        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-4.5' : 'left-0.5'}`} />
     </div>
  </div>
);

export default SecurityModule;
