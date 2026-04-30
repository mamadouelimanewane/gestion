import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Printer, Mail, Send, AlertCircle, 
  CheckCircle2, XCircle, FileText, Download, 
  MessageSquare, UserCheck, BarChart3, Clock,
  RefreshCw, MoreVertical, Paperclip, ChevronRight,
  TrendingDown, Activity, ArrowUpRight, ArrowDownRight,
  ShieldCheck, BrainCircuit
} from 'lucide-react';

const RappelReleve = () => {
  const [activeTab, setActiveTab] = useState<'relances' | 'circularisation' | 'echeancier'>('relances');
  const [selectedTiers, setSelectedTiers] = useState<number[]>([]);

  const tiers = [
    { id: 1, compte: '4110001', intitule: 'CLIENT ALPHA SA', solde: 15400000, retard: 12, statut: '1er Relance', confirm: 'Pending' },
    { id: 2, compte: '4110002', intitule: 'ETABLISSEMENT BETA', solde: 8500000, retard: 45, statut: '2ème Relance', confirm: 'Confirmed' },
    { id: 3, compte: '4110005', intitule: 'SARL SUNU SERVICES', solde: 32000000, retard: 5, statut: 'A surveiller', confirm: 'Pending' },
    { id: 4, compte: '4110009', intitule: 'CFAO RETAIL SN', solde: 1250000, retard: 90, statut: 'Mise en demeure', confirm: 'Disputed' },
  ];

  const toggleSelect = (id: number) => {
    setSelectedTiers(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full gap-8 pb-12 overflow-auto">
      {/* Module Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#dc2626] flex items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:rotate-6 transition-transform">
              <TrendingDown size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Recouvrement & Circularisation</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Pilotage des créances • Confirmation de solde • Audit Ready (OHADA)</p>
           </div>
        </div>
        <div className="flex bg-[#f1f5f9] p-1 rounded-xl border border-[#cbd5e1] relative z-10 overflow-x-auto no-scrollbar shadow-inner mt-6 lg:mt-0">
           {[
             { id: 'relances', label: 'Relances (Dunning)', icon: MessageSquare },
             { id: 'circularisation', label: 'Circularisation', icon: UserCheck },
             { id: 'echeancier', label: 'Balance Âgée', icon: BarChart3 },
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-3 px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                 activeTab === tab.id ? 'bg-white text-[#dc2626] shadow-md border border-[#cbd5e1]' : 'text-[#64748b] hover:text-[#0f172a] hover:bg-white/50'
               }`}
             >
                <tab.icon size={16} />
                {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard title="Encours Total Brut" value="57 150 000" sub="Créances Clients Actives" color="blue" icon={<FileText size={24} />} />
        <StatCard title="Total Échu > 30j" value="09 750 000" sub="Risque Critique d'Impayés" color="red" icon={<AlertCircle size={24} />} />
        <StatCard title="Taux de Retour" value="65%" sub="Confirmation des Soldes" color="green" icon={<UserCheck size={24} />} />
        <StatCard title="DSO (Délai Moyen)" value="42 Jours" sub="Objectif Stratégique : 30j" color="orange" icon={<Clock size={24} />} />
      </div>

      {/* Content Area */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl flex flex-col flex-1 overflow-hidden shadow-sm min-h-[500px]">
         {/* Table Toolbar */}
         <div className="p-8 border-b border-[#cbd5e1] bg-[#f8fafc] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative group w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#005eb8] transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="Chercher un tiers, un compte..." 
                 className="pl-12 pr-6 py-3 bg-white border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#334155] placeholder:text-[#94a3b8] uppercase tracking-tight outline-none focus:border-[#005eb8] transition-all w-full shadow-inner"
               />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-3 bg-white border border-[#cbd5e1] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#64748b] hover:text-[#0f172a] hover:border-[#0f172a] transition-all shadow-sm">
                  <Filter size={18} /> Paramètres Avancés
               </button>
               {activeTab === 'relances' && (
                 <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-red-500/20 group">
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Lancer la Campagne
                 </button>
               )}
               {activeTab === 'circularisation' && (
                 <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20">
                    <Printer size={18} /> Générer Courriers Légaux
                 </button>
               )}
            </div>
         </div>

         <div className="flex-1 overflow-auto">
            <table className="w-full text-left whitespace-nowrap">
               <thead className="bg-[#f8fafc] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] border-b-2 border-[#cbd5e1] sticky top-0 z-20 shadow-sm">
                  <tr>
                     <th className="px-8 py-5 w-16 text-center">
                        <div className="w-5 h-5 rounded border-2 border-[#cbd5e1] mx-auto cursor-pointer hover:border-[#005eb8] transition-colors" />
                     </th>
                     <th className="px-8 py-5">Tiers / Client ERP</th>
                     <th className="px-8 py-5 text-right">Solde Net Dû (XOF)</th>
                     <th className="px-8 py-5 text-center">Âge Moyen Créance</th>
                     <th className="px-8 py-5 text-center">{activeTab === 'circularisation' ? 'Statut Confirmation' : 'Niveau de Relance'}</th>
                     <th className="px-8 py-5 text-right">Actions de Suivi</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#f1f5f9]">
                  {tiers.map((t) => (
                    <tr 
                      key={t.id} 
                      onClick={() => toggleSelect(t.id)}
                      className={`group cursor-pointer transition-all ${selectedTiers.includes(t.id) ? 'bg-blue-50/50' : 'hover:bg-blue-50/20'}`}
                    >
                       <td className="px-8 py-6 text-center border-r border-[#f1f5f9]">
                          <div className={`w-5 h-5 rounded border-2 transition-all mx-auto flex items-center justify-center ${selectedTiers.includes(t.id) ? 'bg-[#005eb8] border-[#005eb8]' : 'bg-white border-[#cbd5e1] shadow-inner'}`}>
                             {selectedTiers.includes(t.id) && <CheckCircle2 size={14} className="text-white" />}
                          </div>
                       </td>
                       <td className="px-8 py-6 border-r border-[#f1f5f9]">
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow-inner border ${
                               t.retard > 60 ? 'bg-red-50 text-[#dc2626] border-red-100' : 'bg-blue-50 text-[#005eb8] border-blue-100'
                             }`}>
                                {t.intitule.charAt(0)}
                             </div>
                             <div className="flex flex-col">
                                <span className="text-sm font-bold text-[#0f172a] uppercase tracking-tighter group-hover:text-[#005eb8] transition-colors">{t.intitule}</span>
                                <span className="text-[10px] font-mono text-[#94a3b8] font-black tracking-widest mt-1 uppercase">{t.compte}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right font-black text-[#0f172a] text-base border-r border-[#f1f5f9] tracking-tighter">
                          {t.solde.toLocaleString()} <span className="text-[10px] font-bold text-[#94a3b8]">F</span>
                       </td>
                       <td className="px-8 py-6 text-center border-r border-[#f1f5f9]">
                          <div className="flex flex-col items-center gap-2">
                             <span className={`text-[11px] font-black tracking-tighter ${t.retard > 30 ? 'text-[#dc2626]' : 'text-[#107e3e]'}`}>
                                {t.retard} JOURS
                             </span>
                             <div className="w-24 h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden shadow-inner border border-transparent group-hover:border-[#cbd5e1] transition-all">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(t.retard, 100)}%` }}
                                  className={`h-full ${t.retard > 60 ? 'bg-[#dc2626]' : t.retard > 30 ? 'bg-orange-500' : 'bg-[#107e3e]'}`} 
                                />
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-center border-r border-[#f1f5f9]">
                          {activeTab === 'circularisation' ? (
                            <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-[2rem] border text-[9px] font-bold uppercase tracking-widest ${
                              t.confirm === 'Confirmed' ? 'bg-green-50 text-[#107e3e] border-green-200' : 
                              t.confirm === 'Disputed' ? 'bg-red-50 text-[#dc2626] border-red-200' : 
                              'bg-orange-50 text-orange-600 border-orange-200'
                            }`}>
                               {t.confirm === 'Confirmed' && <CheckCircle2 size={12} />}
                               {t.confirm === 'Disputed' && <XCircle size={12} />}
                               {t.confirm === 'Pending' && <Clock size={12} className="animate-pulse" />}
                               {t.confirm === 'Confirmed' ? 'Confirmé' : t.confirm === 'Disputed' ? 'Litige / Discordance' : 'Confirmation en Attente'}
                            </div>
                          ) : (
                            <span className={`px-4 py-1.5 rounded-[2rem] border text-[9px] font-bold uppercase tracking-[0.1em] ${
                              t.statut === 'Mise en demeure' ? 'bg-red-50 text-[#dc2626] border-red-200 shadow-sm' : 'bg-[#f8fafc] text-[#64748b] border-[#cbd5e1]'
                            }`}>
                               {t.statut}
                            </span>
                          )}
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4">
                             <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#005eb8] hover:border-[#005eb8] shadow-sm transition-all"><Printer size={18} /></button>
                             <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#107e3e] hover:border-[#107e3e] shadow-sm transition-all"><Mail size={18} /></button>
                             <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#0f172a] hover:border-[#0f172a] shadow-sm transition-all"><MoreVertical size={18} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Batch Action Bar (Morning Horizon) */}
         <AnimatePresence>
            {selectedTiers.length > 0 && (
              <motion.div 
                initial={{ y: 100 }} 
                animate={{ y: 0 }} 
                exit={{ y: 100 }}
                className="bg-[#0f172a] border-t border-[#1e293b] p-6 flex items-center justify-between shadow-2xl relative z-30"
              >
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-[#005eb8] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                       {selectedTiers.length}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[12px] font-bold text-white uppercase tracking-[0.2em]">Sélection Multiple Active</span>
                       <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1">Actions groupées sur les comptes sélectionnés</span>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-3 bg-white text-[#0f172a] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#f1f5f9] transition-all">
                       <RefreshCw size={18} /> Actualiser les Soldes
                    </button>
                    <button className="flex items-center gap-3 px-8 py-3 bg-[#005eb8] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#004080] transition-all border border-blue-400/20">
                       <Paperclip size={18} /> Pièce Jointe Groupée
                    </button>
                    <button onClick={() => setSelectedTiers([])} className="p-3 text-[#94a3b8] hover:text-white transition-colors">
                       <XCircle size={24} />
                    </button>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Footer Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
         <ToolCard 
           icon={<FileText className="text-[#005eb8]" size={32} />} 
           title="Schémas de Dunning (F150)" 
           desc="Personnalisez vos niveaux de relance et vos modèles de lettres officiels. Intégration native des mentions légales OHADA 2024." 
         />
         <ToolCard 
           icon={<BrainCircuit className="text-[#107e3e]" size={32} />} 
           title="Rapport de Circularisation" 
           desc="Générez un dossier d'audit complet prêt pour les CAC. Traçabilité totale des envois et des confirmations reçues via portail tiers." 
         />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, sub, color, icon }: any) => (
  <div className="bg-white border border-[#cbd5e1] p-8 rounded-xl group hover:border-[#005eb8] transition-all shadow-sm relative overflow-hidden cursor-pointer">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${color === 'red' ? 'bg-[#dc2626]' : color === 'green' ? 'bg-[#107e3e]' : color === 'blue' ? 'bg-[#005eb8]' : 'bg-orange-600'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-6">
       <div className="relative z-10">
          <p className="text-[#64748b] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 leading-none opacity-80">{title}</p>
          <h3 className="text-3xl font-black tracking-tighter text-[#0f172a]">{value} <span className="text-xs font-bold text-[#94a3b8]">{title.includes('DSO') ? '' : 'F'}</span></h3>
       </div>
       <div className={`p-4 rounded-2xl border shadow-inner transition-transform group-hover:scale-110 ${
         color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100' : 
         color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-100' : 
         color === 'blue' ? 'bg-blue-50 text-[#005eb8] border-blue-100' :
         'bg-orange-50 text-orange-600 border-orange-100'
       }`}>
          {icon}
       </div>
    </div>
    <p className="text-[10px] font-bold text-[#94a3b8] uppercase mt-2 tracking-widest italic opacity-70">{sub}</p>
  </div>
);

const ToolCard = ({ icon, title, desc }: any) => (
  <div className="bg-white border-2 border-dashed border-[#cbd5e1] p-10 rounded-xl group hover:border-[#005eb8] hover:bg-blue-50/20 transition-all cursor-pointer shadow-sm flex items-start gap-8">
     <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1] shadow-inner group-hover:scale-110 transition-transform group-hover:bg-white group-hover:border-[#005eb8] group-hover:text-[#005eb8]">
        {icon}
     </div>
     <div className="flex-1">
        <h4 className="font-bold text-[#0f172a] text-sm uppercase tracking-[0.2em] mb-3 group-hover:text-[#005eb8] transition-colors">{title}</h4>
        <p className="text-[11px] text-[#64748b] leading-relaxed font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100">{desc}</p>
     </div>
     <ChevronRight className="text-[#cbd5e1] group-hover:text-[#005eb8] transition-colors mt-1" size={24} />
  </div>
);

export default RappelReleve;
