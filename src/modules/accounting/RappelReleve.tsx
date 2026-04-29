import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Printer, Mail, Send, AlertCircle, 
  CheckCircle2, XCircle, FileText, Download, 
  MessageSquare, UserCheck, BarChart3, Clock,
  RefreshCw, MoreVertical, Paperclip
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
    <div className="flex flex-col h-full gap-6">
      {/* Module Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 shadow-inner">
              <AlertCircle className="text-rose-400" size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">Recouvrement & Circularisation</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Pilotage des créances & Confirmation de solde • Audit Ready</p>
           </div>
        </div>
        <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
           {[
             { id: 'relances', label: 'Relances (Dunning)', icon: MessageSquare },
             { id: 'circularisation', label: 'Circularisation', icon: UserCheck },
             { id: 'echeancier', label: 'Balance Âgée', icon: BarChart3 },
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
               }`}
             >
                <tab.icon size={14} />
                {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Encours Total" value="57 150 000 F" sub="Créances Clients" color="indigo" />
        <StatCard title="Échu > 30j" value="9 750 000 F" sub="Risque d'Impayés" color="rose" />
        <StatCard title="Taux de Retour" value="65%" sub="Circularisation" color="emerald" />
        <StatCard title="DSO (Délai Moyen)" value="42 Jours" sub="Objectif : 30j" color="amber" />
      </div>

      {/* Content Area */}
      <div className="card bg-slate-800/20 border-slate-700/50 flex flex-col flex-1 overflow-hidden shadow-2xl">
         {/* Table Toolbar */}
         <div className="p-4 border-b border-slate-700/50 bg-slate-800/30 flex items-center justify-between">
            <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl w-80 shadow-inner">
               <Search size={16} className="text-slate-500" />
               <input type="text" placeholder="Rechercher un tiers..." className="bg-transparent border-none outline-none text-xs w-full text-slate-300" />
            </div>
            <div className="flex gap-3">
               <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                  <Filter size={14} /> Filtres
               </button>
               {activeTab === 'relances' && (
                 <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-600/20">
                    <Send size={14} /> Campagne de Relance
                 </button>
               )}
               {activeTab === 'circularisation' && (
                 <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
                    <Printer size={14} /> Générer Courriers
                 </button>
               )}
            </div>
         </div>

         <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-800/80 border-b border-slate-700 font-black uppercase text-[10px] tracking-widest text-slate-500">
                  <tr>
                     <th className="p-6 w-12 text-center">
                        <CheckCircle2 size={18} className="text-slate-700 mx-auto" />
                     </th>
                     <th className="p-6">Tiers / Client</th>
                     <th className="p-6 text-right">Solde Dû (XOF)</th>
                     <th className="p-6 text-center">Âge Créance</th>
                     <th className="p-6">{activeTab === 'circularisation' ? 'Statut Confirmation' : 'Niveau Relance'}</th>
                     <th className="p-6 text-center">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-700/30">
                  {tiers.map((t) => (
                    <tr 
                      key={t.id} 
                      onClick={() => toggleSelect(t.id)}
                      className={`group cursor-pointer transition-all ${selectedTiers.includes(t.id) ? 'bg-indigo-500/5' : 'hover:bg-slate-700/20'}`}
                    >
                       <td className="p-6 text-center">
                          <div className={`w-5 h-5 rounded border transition-all mx-auto flex items-center justify-center ${selectedTiers.includes(t.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-900 border-slate-700'}`}>
                             {selectedTiers.includes(t.id) && <CheckCircle2 size={14} className="text-white" />}
                          </div>
                       </td>
                       <td className="p-6">
                          <div className="flex flex-col">
                             <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{t.intitule}</span>
                             <span className="text-[10px] font-mono text-slate-500 font-black tracking-widest">{t.compte}</span>
                          </div>
                       </td>
                       <td className="p-6 text-right font-black text-slate-200">
                          {t.solde.toLocaleString()} F
                       </td>
                       <td className="p-6 text-center">
                          <div className="flex flex-col items-center">
                             <span className={`text-xs font-black ${t.retard > 30 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                {t.retard} Jours
                             </span>
                             <div className="w-12 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                <div className={`h-full ${t.retard > 30 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(t.retard, 100)}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="p-6">
                          {activeTab === 'circularisation' ? (
                            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                              t.confirm === 'Confirmed' ? 'text-emerald-400' : t.confirm === 'Disputed' ? 'text-rose-400 font-bold' : 'text-amber-400'
                            }`}>
                               {t.confirm === 'Confirmed' && <CheckCircle2 size={14} />}
                               {t.confirm === 'Disputed' && <XCircle size={14} />}
                               {t.confirm === 'Pending' && <Clock size={14} />}
                               {t.confirm === 'Confirmed' ? 'Confirmé' : t.confirm === 'Disputed' ? 'Litige' : 'En attente'}
                            </div>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                              t.statut === 'Mise en demeure' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}>
                               {t.statut}
                            </span>
                          )}
                       </td>
                       <td className="p-6">
                          <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-slate-800 rounded-lg"><Printer size={16} /></button>
                             <button className="p-2 text-slate-500 hover:text-emerald-400 hover:bg-slate-800 rounded-lg"><Mail size={16} /></button>
                             <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg"><MoreVertical size={16} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Batch Action Bar */}
         <AnimatePresence>
            {selectedTiers.length > 0 && (
              <motion.div 
                initial={{ y: 80 }} 
                animate={{ y: 0 }} 
                exit={{ y: 80 }}
                className="bg-indigo-600 p-4 flex items-center justify-between shadow-2xl"
              >
                 <div className="flex items-center gap-4 text-white">
                    <div className="p-2 bg-white/20 rounded-lg font-black text-xs">{selectedTiers.length}</div>
                    <span className="text-xs font-black uppercase tracking-widest">Tiers sélectionnés pour traitement en masse</span>
                 </div>
                 <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-2 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                       <RefreshCw size={14} /> Actualiser Statut
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all">
                       <Paperclip size={14} /> Joindre Courrier
                    </button>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="card bg-slate-800/10 border-dashed border-slate-700 p-6 flex items-center gap-6 group hover:border-indigo-500/30 transition-all">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-indigo-400 shadow-inner group-hover:scale-110 transition-transform">
               <FileText size={28} />
            </div>
            <div>
               <h4 className="text-xs font-black uppercase tracking-widest text-white mb-2">Modèles de Lettres (F150)</h4>
               <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Personnalisez vos courriers de circularisation et vos textes de relance par niveau (1, 2, 3) directement dans les paramètres.</p>
            </div>
         </div>
         <div className="card bg-slate-800/10 border-dashed border-slate-700 p-6 flex items-center gap-6 group hover:border-indigo-500/30 transition-all">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-rose-400 shadow-inner group-hover:scale-110 transition-transform">
               <RefreshCw size={28} />
            </div>
            <div>
               <h4 className="text-xs font-black uppercase tracking-widest text-white mb-2">Exportation Audit</h4>
               <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Générez un dossier d'audit complet incluant les réponses des tiers et les justifications de soldes pour vos commissaires aux comptes.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, sub, color }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden shadow-xl border-slate-700/50">
    <div className={`absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-2">{title}</p>
    <h3 className={`text-xl font-black text-white group-hover:text-${color}-400 transition-colors`}>{value}</h3>
    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter mt-2">{sub}</p>
  </div>
);

export default RappelReleve;
