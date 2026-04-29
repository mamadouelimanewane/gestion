import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, FileText, Calendar, Wallet, 
  Clock, ShieldCheck, Download, Send,
  Plus, MessageSquare, Briefcase, Award,
  Heart, Zap, Bell, Settings
} from 'lucide-react';

const EmployeeSelfService = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'pay', label: 'Ma Paie', icon: Wallet },
    { id: 'leave', label: 'Mes Congés', icon: Calendar },
    { id: 'training', label: 'Mes Formations', icon: Award },
    { id: 'expenses', label: 'Mes Frais', icon: Zap },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-24 h-24 rounded-[2rem] bg-white/10 border border-white/20 flex items-center justify-center font-black text-4xl text-white shadow-inner">
               MK
            </div>
            <div className="flex flex-col">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Bienvenue, Mamadou</h2>
               <p className="text-sm text-indigo-100 font-medium uppercase tracking-widest mt-1 opacity-80">Directeur Technique • Antigravity Tech</p>
            </div>
         </div>
         <div className="flex gap-4 relative z-10">
            <div className="flex flex-col items-center bg-white/10 px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-md">
               <span className="text-2xl font-black text-white leading-none">22.5</span>
               <span className="text-[9px] font-black text-indigo-100 uppercase tracking-widest mt-1">Jours Restants</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-md">
               <span className="text-2xl font-black text-white leading-none">12</span>
               <span className="text-[9px] font-black text-indigo-100 uppercase tracking-widest mt-1">Avril 2024</span>
            </div>
         </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
         <div className="flex bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700/50 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                 <tab.icon size={18} />
                 <span className="text-[10px] font-black uppercase tracking-[0.1em]">{tab.label}</span>
              </button>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'profile' && (
           <motion.div 
             key="profile"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 card bg-slate-800/20 border-slate-700/50 p-10 flex flex-col gap-8 shadow-2xl">
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                    <ShieldCheck size={16} className="text-indigo-400" /> Informations Personnelles
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InfoField label="Nom Complet" value="Mamadou Kane" />
                    <InfoField label="Matricule" value="MT-001" />
                    <InfoField label="NINEA" value="2881234 2V2" />
                    <InfoField label="Sécurité Sociale" value="1 85 02 77 123 456" />
                    <InfoField label="Date de naissance" value="12 Mai 1985" />
                    <InfoField label="Adresse" value="Villa 45, HLM Grand Yoff, Dakar" />
                 </div>
                 <button className="w-fit px-8 py-3 bg-slate-900 border border-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white rounded-xl transition-all">
                    Demander une Modification
                 </button>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-slate-800/30 p-8 flex flex-col gap-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Mon Contrat</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase">
                          <span className="text-slate-500">Type</span>
                          <span className="text-white">CDI</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px] font-black uppercase">
                          <span className="text-slate-500">Début</span>
                          <span className="text-white">12/01/2020</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px] font-black uppercase">
                          <span className="text-slate-500">Période d'Essai</span>
                          <span className="text-emerald-400">Validée</span>
                       </div>
                    </div>
                    <button className="w-full py-3 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl text-[9px] font-black uppercase transition-all">
                       Voir PDF Signé
                    </button>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'pay' && (
           <motion.div 
             key="pay"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col gap-8"
           >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <PayStatCard label="Dernier Salaire Net" value="945 200 F" sub="Avril 2024" />
                 <PayStatCard label="Cumul Imposable (An)" value="4.8M F" sub="Jan - Avr" />
                 <PayStatCard label="Indemnités" value="250 000 F" sub="Transp + Log" />
                 <PayStatCard label="Prime de Performance" value="150 000 F" sub="Objectifs Atteints" />
              </div>

              <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
                 <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Historique de mes Bulletins</h4>
                 </div>
                 <div className="p-0">
                    {[
                      { period: 'Avril 2024', net: '945.200 F', date: '29/04/2024' },
                      { period: 'Mars 2024', net: '945.200 F', date: '30/03/2024' },
                      { period: 'Février 2024', net: '1.095.200 F', date: '28/02/2024', bonus: 'Prime N-1' },
                    ].map((slip, i) => (
                      <div key={i} className="p-6 border-b border-slate-700/30 hover:bg-slate-800/30 transition-all flex items-center justify-between group">
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 group-hover:text-indigo-400">
                               <FileText size={20} />
                            </div>
                            <div>
                               <p className="text-xs font-black text-white uppercase tracking-widest">{slip.period}</p>
                               <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Versé le {slip.date} {slip.bonus && `• ${slip.bonus}`}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-8">
                            <span className="text-sm font-black text-white">{slip.net}</span>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                               <Download size={14} /> PDF
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'leave' && (
           <motion.div 
             key="leave"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 flex flex-col gap-6">
                 <div className="card bg-slate-800/20 border-slate-700/50 p-10 shadow-2xl">
                    <div className="flex justify-between items-center mb-10">
                       <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Nouvelle Demande d'Absence</h4>
                       <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Type : Congé Annuel</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                       <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Date de Début</label>
                          <input type="date" className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition-all" />
                       </div>
                       <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Date de Fin</label>
                          <input type="date" className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition-all" />
                       </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-8">
                       <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Commentaires / Motif</label>
                       <textarea className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition-all h-24" placeholder="Optionnel..."></textarea>
                    </div>
                    <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3">
                       <Send size={18} /> Soumettre au Responsable
                    </button>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-slate-800/30 p-8 flex flex-col gap-6 shadow-2xl">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-slate-700/50 pb-4">Mes Demandes</h4>
                    <div className="space-y-4">
                       <LeaveStatusItem date="15/05 - 22/05" type="Congé" status="En attente" color="amber" />
                       <LeaveStatusItem date="12/03 - 13/03" type="Maladie" status="Approuvé" color="emerald" />
                       <LeaveStatusItem date="01/01 - 05/01" type="Repos" status="Historique" color="slate" />
                    </div>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const InfoField = ({ label, value }: any) => (
  <div className="flex flex-col gap-1.5 p-4 bg-slate-900/50 border border-slate-800 rounded-2xl group hover:border-indigo-500/20 transition-all">
     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">{label}</span>
     <span className="text-xs font-bold text-slate-200">{value}</span>
  </div>
);

const PayStatCard = ({ label, value, sub }: any) => (
  <div className="card bg-slate-800/30 p-6 flex flex-col gap-2 shadow-xl border-slate-700/50 hover:border-indigo-500/30 transition-all cursor-pointer">
     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">{label}</span>
     <span className="text-xl font-black text-white">{value}</span>
     <span className="text-[9px] font-bold text-indigo-400 uppercase">{sub}</span>
  </div>
);

const LeaveStatusItem = ({ date, type, status, color }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
     <div className="flex flex-col">
        <span className="text-[10px] font-black text-white uppercase">{date}</span>
        <span className="text-[8px] text-slate-500 font-bold uppercase">{type}</span>
     </div>
     <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase border ${
       color === 'amber' ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' : 
       color === 'emerald' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 
       'bg-slate-800 border-slate-700 text-slate-500'
     }`}>
        {status}
     </span>
  </div>
);

export default EmployeeSelfService;
