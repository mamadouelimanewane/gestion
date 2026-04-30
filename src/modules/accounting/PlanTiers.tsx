import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Edit, Trash2, Filter, 
  ChevronRight, CreditCard, ShieldAlert, 
  MapPin, Phone, Mail, Globe, Banknote, 
  CheckCircle2, XCircle, Info, MoreVertical,
  Briefcase, User, Database, Layers, ShieldCheck,
  Zap, ArrowRight, Printer, Share2, Activity,
  Lock, Unlock, Target, BarChart, History, Download,
  Check, X
} from 'lucide-react';

const PlanTiers = () => {
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const tiers = [
    { 
      compte: '4110001', 
      intitule: 'CLIENT ALPHA SÉNÉGAL SA', 
      type: 'Client', 
      solde: 15400000, 
      limite: 20000000,
      risk: 'Normal',
      email: 'contact@alpha.sn',
      phone: '+221 33 820 00 01'
    },
    { 
      compte: '4110002', 
      intitule: 'ÉTABLISSEMENT BETA-GROUP', 
      type: 'Client', 
      solde: 28500000, 
      limite: 25000000,
      risk: 'Critique',
      email: 'finance@beta-group.sn',
      phone: '+221 33 840 12 45'
    },
    { 
      compte: '4010001', 
      intitule: 'FOURNISSEUR TECH-PLUS AFRICA', 
      type: 'Fournisseur', 
      solde: -8500000, 
      limite: 50000000,
      risk: 'Normal',
      email: 'sales@techplus-africa.sn',
      phone: '+221 33 860 77 88'
    },
    { 
      compte: '4210001', 
      intitule: 'SALARIÉ MAMADOU KANE (RH)', 
      type: 'Personnel', 
      solde: 125000, 
      limite: 500000,
      risk: 'Normal',
      email: 'm.kane@gestionpro.sn',
      phone: '+221 77 500 00 00'
    },
  ];

  return (
    <div className="flex flex-col h-full gap-10 bg-white p-10 min-screen overflow-hidden">
      <div className="flex h-full gap-10 relative">
        {/* Main List Area */}
        <div className="flex-1 flex flex-col gap-10 min-w-0">
          {/* Header Actions - Diamond Azure Elite */}
          <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,94,184,0.08)] relative overflow-hidden group border border-blue-50">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-48 -mt-48 blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="flex items-center gap-10 relative z-10">
               <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0a6ed1] to-blue-600 flex items-center justify-center text-white shadow-[0_15px_30px_rgba(10,110,209,0.3)] group-hover:rotate-6 transition-transform duration-500">
                  <Briefcase size={40} strokeWidth={2.5} />
               </div>
               <div>
                  <h3 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Référentiel des Tiers (AP/AR Master Data)</h3>
                  <p className="text-[12px] text-[#64748b] font-black uppercase tracking-[0.3em] italic opacity-80 flex items-center gap-3">
                     <ShieldCheck size={16} className="text-[#0a6ed1]" /> Gestion du Risque Client • Cycle Fournisseurs • OHADA v2024
                  </p>
               </div>
            </div>
            <div className="flex gap-6 relative z-10 mt-8 lg:mt-0">
               <div className="relative group w-80">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200 group-focus-within:text-[#0a6ed1] transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Chercher compte ou raison sociale..." 
                    className="pl-14 pr-8 py-4 bg-blue-50/30 border border-blue-100 rounded-2xl text-[12px] font-black uppercase tracking-widest text-[#0f172a] placeholder:text-blue-200 outline-none focus:border-[#0a6ed1] focus:bg-white transition-all w-full shadow-inner h-[60px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <button className="flex items-center gap-4 px-10 py-4 bg-[#0a6ed1] hover:bg-blue-700 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl h-[60px] group/btn">
                  <Plus size={24} className="group-hover/btn:rotate-90 transition-transform duration-500" /> Nouveau Tiers
               </button>
            </div>
          </div>

          {/* Table Container - Diamond Style */}
          <div className="bg-white rounded-[2.5rem] border border-blue-50 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.04)] flex-1 flex flex-col min-h-[500px]">
             <div className="bg-white px-12 py-8 border-b border-blue-50 flex justify-between items-center sticky top-0 z-20 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 bg-blue-50 text-[#0a6ed1] rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner">
                      <Layers size={24} />
                   </div>
                   <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#0f172a]">Postes Auxiliaires du Grand-Livre (Classe 4)</h3>
                </div>
                <div className="flex gap-6">
                   <div className="flex items-center gap-4 px-8 py-3 bg-white border border-emerald-100 rounded-2xl shadow-sm bg-emerald-50/30">
                      <div className="w-3 h-3 rounded-full bg-[#107e3e] shadow-sm animate-pulse"></div>
                      <span className="text-[12px] font-black uppercase text-[#107e3e] tracking-widest">Master Data Active</span>
                   </div>
                   <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] shadow-sm flex items-center justify-center transition-all">
                      <Filter size={24} />
                   </button>
                </div>
             </div>

             <div className="overflow-auto flex-1 custom-scrollbar">
                <table className="w-full text-left whitespace-nowrap border-collapse">
                   <thead className="bg-white border-b-2 border-blue-50 text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] sticky top-0 z-20 shadow-sm">
                      <tr>
                         <th className="px-12 py-8">Compte Auxiliaire</th>
                         <th className="px-12 py-8">Raison Sociale / Entité Juridique</th>
                         <th className="px-12 py-8 text-center">Catégorie Analytique</th>
                         <th className="px-12 py-8 text-right">Limite de Crédit</th>
                         <th className="px-12 py-8 text-right font-black text-[#0a6ed1]">Solde Net Consolidé (F)</th>
                         <th className="px-12 py-8 w-20 text-center"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-blue-50/50">
                      {tiers.map((t) => (
                         <tr 
                           key={t.compte} 
                           onClick={() => setSelectedTier(t)}
                           className={`group cursor-pointer transition-all duration-300 ${selectedTier?.compte === t.compte ? 'bg-blue-50/50' : 'hover:bg-blue-50/20'}`}
                         >
                            <td className="px-12 py-8 border-r border-blue-50/30">
                               <span className="font-mono font-black text-base text-[#0a6ed1] tracking-tighter uppercase group-hover:scale-105 transition-transform origin-left block">{t.compte}</span>
                            </td>
                            <td className="px-12 py-8 border-r border-blue-50/30">
                               <div className="flex flex-col">
                                  <span className="text-base font-black text-[#0f172a] uppercase tracking-tight group-hover:text-[#0a6ed1] transition-colors">{t.intitule}</span>
                                  <div className="flex items-center gap-4 mt-2 opacity-60">
                                     <Mail size={14} className="text-blue-300" />
                                     <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">{t.email}</span>
                                  </div>
                               </div>
                            </td>
                            <td className="px-12 py-8 text-center border-r border-blue-50/30">
                               <span className={`px-6 py-2 rounded-[2rem] border text-[10px] font-black uppercase tracking-[0.3em] shadow-sm ${
                                  t.type === 'Client' ? 'bg-emerald-50 text-[#107e3e] border-emerald-100' :
                                  t.type === 'Fournisseur' ? 'bg-red-50 text-[#dc2626] border-red-100' :
                                  'bg-amber-50 text-amber-700 border-amber-100'
                               }`}>
                                  {t.type}
                               </span>
                            </td>
                            <td className="px-12 py-8 text-right font-black text-slate-400 text-sm border-r border-blue-50/30 tracking-tighter italic opacity-60">
                               {t.limite.toLocaleString()} <span className="text-[10px] ml-1">F</span>
                            </td>
                            <td className="px-12 py-8 text-right border-r border-blue-50/30">
                               <div className="flex flex-col items-end">
                                  <span className={`text-2xl font-black tracking-tighter leading-none block group-hover:scale-110 transition-transform origin-right ${
                                     t.solde > t.limite ? 'text-[#dc2626]' : 
                                     t.solde > 0 ? 'text-[#107e3e]' : 
                                     t.solde < 0 ? 'text-[#dc2626]' : 'text-slate-400'
                                  }`}>
                                     {t.solde.toLocaleString()} <span className="text-sm opacity-20 ml-1">F</span>
                                  </span>
                                  {t.solde > t.limite && (
                                     <motion.div 
                                       initial={{ scale: 0.9, opacity: 0 }}
                                       animate={{ scale: 1, opacity: 1 }}
                                       className="flex items-center gap-3 text-[9px] font-black text-[#dc2626] uppercase tracking-[0.2em] mt-3 bg-red-50 px-4 py-1.5 rounded-full border border-red-100 shadow-sm"
                                     >
                                        <ShieldAlert size={14} className="animate-pulse" /> Risque de Crédit Critique
                                     </motion.div>
                                  )}
                               </div>
                            </td>
                            <td className="px-12 py-8 text-right">
                               <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                  <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] hover:border-[#0a6ed1] shadow-sm flex items-center justify-center transition-all transform hover:rotate-12"><Edit size={22} /></button>
                                  <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#dc2626] hover:border-red-100 shadow-sm flex items-center justify-center transition-all transform hover:rotate-12"><MoreVertical size={22} /></button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Side Drawer - Diamond Azure Detail Fiche */}
        <AnimatePresence>
           {selectedTier && (
             <motion.div
               initial={{ x: 600, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: 600, opacity: 0 }}
               transition={{ type: "spring", stiffness: 200, damping: 25 }}
               className="w-[600px] bg-white border-l border-blue-50 shadow-[0_0_100px_rgba(0,94,184,0.15)] flex flex-col overflow-hidden h-full fixed top-0 right-0 z-[100]"
             >
                {/* Drawer Header */}
                <div className="p-12 bg-gradient-to-r from-white to-blue-50/30 border-b border-blue-50 flex justify-between items-center relative overflow-hidden group/drawer">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#0a6ed1]/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-0 group-hover/drawer:opacity-100 transition-opacity duration-1000"></div>
                   <div className="relative z-10">
                      <h3 className="text-[14px] font-black uppercase tracking-[0.5em] text-[#0a6ed1]">Profil Maître Auxiliaire</h3>
                      <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mt-2 opacity-80 italic">Système Synchronisé S/4HANA Master Data</p>
                   </div>
                   <button onClick={() => setSelectedTier(null)} className="relative z-10 w-14 h-14 bg-white border border-blue-50 rounded-2xl flex items-center justify-center text-slate-200 hover:text-[#dc2626] hover:border-red-100 transition-all shadow-sm group/close">
                      <X size={32} className="group-hover/close:rotate-90 transition-transform duration-500" />
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto p-14 space-y-16 custom-scrollbar bg-white">
                   {/* Brand Identity */}
                   <div className="flex flex-col items-center text-center">
                      <div className="w-40 h-40 rounded-[3.5rem] bg-white text-[#0a6ed1] flex items-center justify-center mb-10 border border-blue-50 shadow-[0_25px_60px_rgba(10,110,209,0.15)] relative group cursor-pointer overflow-hidden hover:rotate-3 transition-all duration-500">
                         <User size={80} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-tr from-[#0a6ed1] to-blue-400 opacity-0 group-hover:opacity-95 flex items-center justify-center transition-all duration-500">
                            <Plus size={40} className="text-white" />
                         </div>
                      </div>
                      <h4 className="text-5xl font-black text-[#0f172a] tracking-tighter uppercase leading-none max-w-md mx-auto">{selectedTier.intitule}</h4>
                      <div className="flex items-center justify-center gap-6 mt-8">
                         <div className="px-8 py-3 bg-blue-50 text-[#0a6ed1] rounded-[2.5rem] border border-blue-100 font-mono font-black text-lg tracking-widest shadow-sm">#{selectedTier.compte}</div>
                         <div className={`px-8 py-3 rounded-[2.5rem] border text-[11px] font-black uppercase tracking-[0.3em] shadow-sm flex items-center gap-4 ${
                            selectedTier.risk === 'Critique' ? 'bg-red-50 text-[#dc2626] border-red-200 shadow-red-500/10' : 'bg-emerald-50 text-[#107e3e] border-emerald-200 shadow-emerald-500/10'
                         }`}>
                            <div className={`w-3 h-3 rounded-full ${selectedTier.risk === 'Critique' ? 'bg-[#dc2626] animate-pulse' : 'bg-[#107e3e]'}`} />
                            Risque : {selectedTier.risk}
                         </div>
                      </div>
                   </div>

                   {/* Content Sections */}
                   <div className="space-y-16">
                      <DetailSection title="Données de Pilotage">
                         <div className="grid grid-cols-1 gap-10">
                            <DetailRow icon={<Phone size={28} />} label="Ligne Directe / Finance HQ" value={selectedTier.phone} />
                            <DetailRow icon={<Mail size={28} />} label="Support Email / ERP Sync" value={selectedTier.email} />
                            <DetailRow icon={<MapPin size={28} />} label="Siège Social (Localisation)" value="Avenue Cheikh Anta Diop, Dakar, Sénégal" />
                         </div>
                      </DetailSection>

                      <DetailSection title="Analyse de Crédit & Limites">
                         <div className="bg-white border border-blue-50 rounded-[2.5rem] p-12 space-y-12 shadow-[0_15px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group/risk">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-60"></div>
                            <div className="flex justify-between items-center relative z-10 border-b border-blue-50 pb-8">
                               <div className="flex items-center gap-5">
                                  <CreditCard size={32} className="text-[#0a6ed1]" />
                                  <span className="text-[14px] font-black text-slate-400 uppercase tracking-[0.4em]">Limite Autorisée</span>
                               </div>
                               <span className="text-4xl font-black text-[#0f172a] tracking-tighter">{selectedTier.limite.toLocaleString()} <span className="text-sm opacity-20">F</span></span>
                            </div>
                            
                            <div className="relative z-10">
                               <div className="w-full h-6 bg-blue-50 border border-blue-100 rounded-full overflow-hidden shadow-inner p-1">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((selectedTier.solde / selectedTier.limite) * 100, 100)}%` }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
                                    className={`h-full rounded-full shadow-2xl ${selectedTier.solde > selectedTier.limite ? 'bg-gradient-to-r from-red-500 to-red-700' : 'bg-gradient-to-r from-[#0a6ed1] to-blue-500'}`} 
                                  />
                               </div>
                               <div className="flex justify-between items-center mt-8 text-[12px] font-black uppercase tracking-[0.4em]">
                                  <span className={selectedTier.solde > selectedTier.limite ? 'text-[#dc2626]' : 'text-[#0a6ed1]'}>
                                     Consommation : {(selectedTier.solde / selectedTier.limite * 100).toFixed(1)}%
                                  </span>
                                  <span className="text-slate-300">Disponible : {Math.max(selectedTier.limite - selectedTier.solde, 0).toLocaleString()} F</span>
                               </div>
                            </div>
                         </div>
                      </DetailSection>

                      <DetailSection title="Score de Performance Joule">
                         <div className="grid grid-cols-2 gap-8">
                            <KPISmall label="DSO (Paiement)" value="34 Jours" color="blue" icon={<Activity size={24} />} />
                            <KPISmall label="Conformité AR" value="98.5%" color="green" icon={<ShieldCheck size={24} />} />
                         </div>
                      </DetailSection>
                   </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="p-12 bg-white border-t border-blue-50 flex gap-8">
                   <button className="flex-1 py-6 bg-white border border-blue-100 rounded-3xl text-[12px] font-black uppercase tracking-[0.5em] text-slate-300 hover:text-[#0a6ed1] hover:border-[#0a6ed1] transition-all shadow-sm flex items-center justify-center gap-5 group/btn">
                      <History size={28} className="group-hover/btn:rotate-[-45deg] transition-transform duration-500" /> Archives
                   </button>
                   <button className="flex-1 py-6 bg-[#0a6ed1] hover:bg-blue-700 rounded-3xl text-[12px] font-black uppercase tracking-[0.5em] text-white shadow-3xl shadow-blue-500/40 transition-all flex items-center justify-center gap-5 group/btn scale-105">
                      <Edit size={28} className="group-hover/btn:scale-110 transition-transform duration-500" /> Éditer Fiche
                   </button>
                </div>
             </motion.div>
           )}
        </AnimatePresence>

        {/* Footer System Integrity - Diamond Azure Elite */}
        <div className="fixed bottom-12 left-10 right-10 flex flex-col lg:flex-row justify-between items-center bg-white/95 backdrop-blur-3xl border border-blue-100 p-10 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.15)] z-50 gap-10">
           <div className="flex items-center gap-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#107e3e] to-emerald-600 text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 group/shield cursor-pointer">
                 <ShieldCheck size={40} className="group-hover/shield:rotate-12 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                 <span className="text-xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Souveraineté des Données Tiers (Master Data Management)</span>
                 <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 opacity-70 italic leading-relaxed max-w-4xl">
                    Base de données synchronisée en temps réel avec le Universal Ledger • Intégrité garantie par SHA-256 conformément aux standards **OHADA** et **S/4HANA Core**.
                 </p>
              </div>
           </div>
           <div className="flex gap-14 items-center">
              <button className="flex items-center gap-5 text-slate-300 hover:text-[#0a6ed1] text-[12px] font-black uppercase tracking-[0.4em] transition-all group/btn">
                 <Share2 size={28} className="group-hover/btn:rotate-[-12deg] transition-transform duration-500" /> Circulariser
              </button>
              <button className="flex items-center gap-6 text-[#0a6ed1] hover:text-blue-700 text-[12px] font-black uppercase tracking-[0.5em] transition-all group/strat border-l border-blue-50 pl-14 h-12">
                 <Download size={28} className="group-hover:translate-y-2 transition-transform duration-500" /> Exporter Data
                 <ArrowRight size={22} className="opacity-10 group-hover/strat:opacity-100 group-hover/strat:translate-x-3 transition-all duration-500" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const DetailSection = ({ title, children }: any) => (
  <div className="flex flex-col gap-10">
     <div className="flex items-center gap-8">
        <h5 className="text-[13px] font-black uppercase tracking-[0.5em] text-blue-100 whitespace-nowrap">{title}</h5>
        <div className="h-px bg-blue-50 flex-1" />
     </div>
     <div className="grid grid-cols-1 gap-10">
        {children}
     </div>
  </div>
);

const DetailRow = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-10 group/row cursor-pointer p-4 rounded-[2rem] hover:bg-blue-50/20 transition-all duration-300">
     <div className="w-16 h-16 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-blue-200 group-hover/row:text-[#0a6ed1] group-hover/row:border-[#0a6ed1] transition-all shadow-inner group-hover/row:rotate-6 group-hover/row:scale-110">
        {icon}
     </div>
     <div className="flex flex-col">
        <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] leading-none mb-3">{label}</span>
        <span className="text-xl font-black text-[#0f172a] uppercase tracking-tight group-hover/row:text-[#0a6ed1] transition-colors">{value}</span>
     </div>
  </div>
);

const KPISmall = ({ label, value, color, icon }: any) => (
  <div className="bg-white border border-blue-50 p-10 rounded-[2.5rem] flex items-center justify-between group hover:border-[#0a6ed1]/30 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(10,110,209,0.08)] cursor-pointer">
     <div className="flex flex-col">
        <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mb-3">{label}</span>
        <span className={`text-3xl font-black tracking-tighter ${color === 'blue' ? 'text-[#0a6ed1]' : 'text-[#107e3e]'}`}>{value}</span>
     </div>
     <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 ${color === 'blue' ? 'bg-blue-50 text-[#0a6ed1] border-blue-100 shadow-blue-500/5' : 'bg-emerald-50 text-[#107e3e] border-emerald-100 shadow-emerald-500/5'} opacity-30 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12`}>
        {icon}
     </div>
  </div>
);

export default PlanTiers;
