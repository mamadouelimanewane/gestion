import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, ShieldCheck, Landmark, GitMerge, 
  AlertCircle, CheckCircle2, TrendingUp, BarChart3,
  Building2, Users, FileText, Download, 
  RefreshCw, Search, Filter, Activity,
  Lock, Eye, ArrowRight, PieChart
} from 'lucide-react';

const GroupConsolidation = () => {
  const [activeTab, setActiveTab] = useState<'consolidation' | 'audit' | 'entities'>('consolidation');

  const entities = [
    { id: 'HQ-DKR', name: 'ANTIGRAVITY TECH HQ', country: 'Sénégal', currency: 'XOF', ownership: 100, status: 'Consolidé' },
    { id: 'SUB-CIV', name: 'AG TECH CÔTE D\'IVOIRE', country: 'Côte d\'Ivoire', currency: 'XOF', ownership: 80, status: 'Consolidé' },
    { id: 'SUB-MLI', name: 'AG TECH MALI', country: 'Mali', currency: 'XOF', ownership: 60, status: 'Mise en équivalence' },
    { id: 'SUB-FRA', name: 'AG TECH EUROPE', country: 'France', currency: 'EUR', ownership: 100, status: 'Consolidé' },
  ];

  const risks = [
    { id: 'R-01', label: 'Écart Inter-compagnies', severity: 'Moyenne', status: 'En cours', desc: 'Différence de 1.2M XOF entre HQ et CIV.' },
    { id: 'R-02', label: 'Exposition Change EUR/XOF', severity: 'Basse', status: 'Sous contrôle', desc: 'Couverture FX activée pour AG TECH EUROPE.' },
    { id: 'R-03', label: 'Conformité Fiscale (DGI)', severity: 'Haute', status: 'Alerte', desc: 'Retard sur déclaration CA3 filiale Mali.' },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Group Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-inner text-indigo-400">
              <Globe size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Consolidation Groupe & Audit Interne (SEM-BCS)</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Pilotage Multi-Filiales • Éliminations Intercos • IFRS 10/11/12</p>
           </div>
        </div>
        <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
           {[
             { id: 'entities', label: 'Périmètre Groupe', icon: Building2 },
             { id: 'consolidation', label: 'Consolidation', icon: GitMerge },
             { id: 'audit', label: 'Audit & GRC', icon: ShieldCheck },
           ].map((tab) => (
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

      {/* Group KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <GroupStatCard title="Chiffre d'Affaires Groupe" value="2.45 B" sub="Consolidé (XOF)" color="indigo" trend="+12%" />
         <GroupStatCard title="Résultat Net Part du Groupe" value="385 M" sub="Après minoritaires" color="emerald" trend="+8.5%" />
         <GroupStatCard title="Éliminations Intercos" value="142 M" sub="Flux Intra-groupe" color="amber" trend="Stable" />
         <GroupStatCard title="Indice de Risque GRC" value="12%" sub="Niveau Très Bas" color="emerald" trend="-2%" />
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'entities' && (
           <motion.div 
             key="entities"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 card bg-slate-800/20 border-slate-700/50 flex flex-col overflow-hidden shadow-2xl">
                 <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Périmètre de Consolidation (IFRS)</h4>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
                       <Plus size={14} /> Ajouter Filiale
                    </button>
                 </div>
                 <div className="overflow-auto">
                    <table className="w-full text-left">
                       <thead className="bg-slate-900/50 text-[9px] font-black uppercase text-slate-500 tracking-widest">
                          <tr>
                             <th className="p-6">Entité Juridique</th>
                             <th className="p-6 text-center">Pays / Devise</th>
                             <th className="p-6 text-center">% Détention</th>
                             <th className="p-6 text-center">Méthode</th>
                             <th className="p-6 text-center">Statut</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-700/30">
                          {entities.map((ent) => (
                            <tr key={ent.id} className="group hover:bg-indigo-500/5 transition-all cursor-pointer">
                               <td className="p-6">
                                  <div className="flex flex-col">
                                     <span className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-wide">{ent.name}</span>
                                     <span className="text-[9px] text-slate-500 font-black uppercase mt-1">{ent.id}</span>
                                  </div>
                               </td>
                               <td className="p-6 text-center">
                                  <div className="flex flex-col items-center">
                                     <span className="text-[10px] font-bold text-slate-300">{ent.country}</span>
                                     <span className="text-[9px] font-black text-indigo-400 mt-0.5">{ent.currency}</span>
                                  </div>
                               </td>
                               <td className="p-6 text-center">
                                  <span className="text-xs font-black text-white">{ent.ownership}%</span>
                               </td>
                               <td className="p-6 text-center">
                                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[8px] font-black uppercase text-slate-400">
                                     {ent.ownership > 50 ? 'Intégration Globale' : 'Mise en Équivalence'}
                                  </span>
                               </td>
                               <td className="p-6 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                     <span className="text-[9px] font-black uppercase text-emerald-400">{ent.status}</span>
                                  </div>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-indigo-600/5 border-indigo-500/20 p-8 flex flex-col gap-6 shadow-2xl">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-indigo-500/20 pb-4">Structure Actionnariale</h4>
                    <div className="h-48 flex items-center justify-center">
                       {/* Mini Chart Mockup */}
                       <div className="relative w-32 h-32 rounded-full border-[10px] border-slate-800 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-[10px] border-indigo-500 border-t-transparent -rotate-45" />
                          <span className="text-xl font-black text-white">82%</span>
                       </div>
                    </div>
                    <div className="space-y-3">
                       <KpiRow label="Part du Groupe" value="82%" color="indigo" />
                       <KpiRow label="Intérêts Minoritaires" value="18%" color="slate" />
                    </div>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'consolidation' && (
           <motion.div 
             key="consolidation"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col gap-8"
           >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="card bg-slate-800/30 border-slate-700/50 p-8 flex flex-col gap-6">
                    <div className="flex justify-between items-center mb-4">
                       <h4 className="text-xs font-black uppercase tracking-widest text-white">Bilan Consolidé (Flux Group)</h4>
                       <button className="text-[10px] font-black text-indigo-400 uppercase flex items-center gap-2">
                          <Download size={14} /> Exporter IFRS
                       </button>
                    </div>
                    <div className="space-y-4">
                       <ConsolidationItem label="Actifs Immobilisés" values={['2.1B', '450M', '2.55B']} />
                       <ConsolidationItem label="Trésorerie Groupe" values={['580M', '120M', '700M']} />
                       <ConsolidationItem label="Capitaux Propres" values={['1.2B', '300M', '1.5B']} />
                       <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center">
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Légende : [Entités] [Éliminations] [Consolidé]</span>
                       </div>
                    </div>
                 </div>

                 <div className="card bg-indigo-600/5 border-indigo-500/20 p-8 flex flex-col gap-8">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Moteur d'Éliminations Automatiques</h4>
                    <div className="space-y-4">
                       <EliminationCard title="Dettes / Créances Intercos" count={12} amount="85 400 000 F" status="Équilibré" />
                       <EliminationCard title="Dividendes Internes" count={4} amount="42 000 000 F" status="Équilibré" />
                       <EliminationCard title="Marge en Stock Intercos" count={8} amount="14 700 000 F" status="En attente" alert />
                    </div>
                    <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20">
                       Lancer Processus de Consolidation
                    </button>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'audit' && (
           <motion.div 
             key="audit"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 flex flex-col gap-6">
                 <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
                    <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                       <h4 className="text-xs font-black uppercase tracking-widest text-white">Cartographie des Risques & Conformité</h4>
                       <div className="flex gap-2">
                          <button className="p-2 text-slate-500 hover:text-white transition-colors"><Search size={18} /></button>
                          <button className="p-2 text-slate-500 hover:text-white transition-colors"><Filter size={18} /></button>
                       </div>
                    </div>
                    <div className="p-0 divide-y divide-slate-700/30">
                       {risks.map((risk) => (
                         <div key={risk.id} className="p-6 hover:bg-slate-800/30 transition-all group flex items-start gap-6">
                            <div className={`p-3 rounded-xl ${
                              risk.severity === 'Haute' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                              risk.severity === 'Moyenne' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                              'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>
                               <AlertCircle size={20} />
                            </div>
                            <div className="flex-1">
                               <div className="flex justify-between items-start mb-1">
                                  <h5 className="text-xs font-black text-white uppercase tracking-widest">{risk.label}</h5>
                                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-lg border ${
                                    risk.status === 'Alerte' ? 'border-rose-500/20 text-rose-400' : 'border-slate-700 text-slate-500'
                                  }`}>{risk.status}</span>
                               </div>
                               <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{risk.desc}</p>
                            </div>
                            <button className="p-2 text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                               <ArrowRight size={18} />
                            </button>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="card bg-slate-800/30 p-8 flex flex-col items-center justify-center text-center gap-4">
                       <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                          <CheckCircle2 size={24} />
                       </div>
                       <div>
                          <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Contrôles SOX/OHADA</h5>
                          <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">98.5% de conformité</p>
                       </div>
                    </div>
                    <div className="card bg-slate-800/30 p-8 flex flex-col items-center justify-center text-center gap-4">
                       <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                          <Activity size={24} />
                       </div>
                       <div>
                          <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Dernière Audit Scan</h5>
                          <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Il y a 12 minutes</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-slate-800/30 border-slate-700/50 p-8 flex flex-col gap-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">IA Anti-Fraude Joule</h4>
                    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl">
                       <div className="flex items-center gap-3 text-emerald-400 mb-3">
                          <ShieldCheck size={18} />
                          <span className="text-[10px] font-black uppercase">Statut : Sécurisé</span>
                       </div>
                       <p className="text-[9px] text-slate-500 font-medium leading-relaxed italic">
                          L'IA Joule analyse les patterns transactionnels en continu. Aucun comportement suspect détecté sur les flux de trésorerie inter-filiales.
                       </p>
                    </div>
                    <button className="w-full py-3 bg-slate-900 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                       Lancer Scan Profond
                    </button>
                 </div>

                 <div className="card bg-rose-600/5 border-rose-500/20 p-8 flex flex-col gap-4">
                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Points d'Attention Audit</h5>
                    <div className="space-y-2">
                       <KpiMini label="Mali (Retard Tax)" value="CRITIQUE" color="rose" />
                       <KpiMini label="Europe (FX Exposure)" value="STABLE" color="indigo" />
                    </div>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const GroupStatCard = ({ title, value, sub, color, trend }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden p-8 shadow-xl border-slate-700/50">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color === 'emerald' ? 'emerald' : 'indigo'}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-4">
       <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none">{title}</p>
       <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg bg-${trend.includes('+') ? 'emerald' : 'slate'}-500/10 text-${trend.includes('+') ? 'emerald' : 'slate'}-400 border border-${trend.includes('+') ? 'emerald' : 'slate'}-500/20`}>{trend}</span>
    </div>
    <h3 className="text-2xl font-black text-white group-hover:text-white transition-colors">{value}</h3>
    <p className="text-[9px] font-bold text-slate-600 uppercase mt-2 tracking-tighter">{sub}</p>
  </div>
);

const ConsolidationItem = ({ label, values }: any) => (
  <div className="flex flex-col gap-2 p-4 bg-slate-900/40 border border-slate-800 rounded-2xl group hover:border-indigo-500/30 transition-all">
     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <div className="flex gap-4">
           <span className="text-slate-500">{values[0]}</span>
           <span className="text-amber-400">{values[1]}</span>
           <span className="text-white font-black">{values[2]}</span>
        </div>
     </div>
  </div>
);

const EliminationCard = ({ title, count, amount, status, alert }: any) => (
  <div className={`p-4 rounded-2xl border ${alert ? 'bg-amber-500/5 border-amber-500/20' : 'bg-slate-900 border-slate-800'} flex items-center justify-between`}>
     <div className="flex flex-col">
        <span className="text-[10px] font-black text-white uppercase tracking-widest">{title}</span>
        <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">{count} opérations détectées</span>
     </div>
     <div className="text-right">
        <p className="text-xs font-black text-white">{amount}</p>
        <p className={`text-[8px] font-black uppercase ${alert ? 'text-amber-400' : 'text-emerald-400'}`}>{status}</p>
     </div>
  </div>
);

const KpiRow = ({ label, value, color }: any) => (
  <div className="flex items-center justify-between">
     <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
     <span className={`text-[10px] font-black uppercase text-${color}-400`}>{value}</span>
  </div>
);

const KpiMini = ({ label, value, color }: any) => (
  <div className={`flex items-center justify-between p-2 rounded-lg bg-${color}-500/5 border border-${color}-500/10`}>
     <span className="text-[9px] font-bold text-slate-500 uppercase">{label}</span>
     <span className={`text-[9px] font-black text-${color}-400 uppercase`}>{value}</span>
  </div>
);

export default GroupConsolidation;
