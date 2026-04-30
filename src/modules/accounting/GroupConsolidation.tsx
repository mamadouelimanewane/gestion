import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, ShieldCheck, Landmark, GitMerge, 
  AlertCircle, CheckCircle2, TrendingUp, BarChart3,
  Building2, Users, FileText, Download, 
  RefreshCw, Search, Filter, Activity,
  Lock, Eye, ArrowRight, PieChart, Plus,
  History, Printer, Share2, MoreVertical,
  Layers, Zap, Database, Target, ChevronRight
} from 'lucide-react';

const GroupConsolidation = () => {
  const [activeTab, setActiveTab] = useState<'consolidation' | 'audit' | 'entities'>('consolidation');

  const entities = [
    { id: 'HQ-DKR', name: 'ANTIGRAVITY TECHNOLOGY HOLDING', country: 'SÉNÉGAL', currency: 'XOF', ownership: 100, status: 'Consolidé' },
    { id: 'SUB-CIV', name: 'AG TECH CÔTE D\'IVOIRE SAS', country: 'CÔTE D\'IVOIRE', currency: 'XOF', ownership: 80, status: 'Consolidé' },
    { id: 'SUB-MLI', name: 'AG TECH MALI SERVICES SARL', country: 'MALI', currency: 'XOF', ownership: 60, status: 'Équivalence' },
    { id: 'SUB-FRA', name: 'AG TECH EUROPE SOLUTIONS', country: 'FRANCE', currency: 'EUR', ownership: 100, status: 'Consolidé' },
  ];

  const risks = [
    { id: 'R-01', label: 'ÉCART DE RÉCONCILIATION INTERCO', severity: 'Moyenne', status: 'En cours', desc: 'Différence de 1.2M XOF entre HQ et CIV (Flux logistiques).' },
    { id: 'R-02', label: 'EXPOSITION CHANGE STRUCTURELLE (EUR)', severity: 'Basse', status: 'Couverte', desc: 'Couverture de change (Forward) active pour AG Tech Europe.' },
    { id: 'R-03', label: 'CONFORMITÉ FISCALE FILIALE MALI', severity: 'Haute', status: 'Alerte', desc: 'Retard de 15 jours sur la liasse fiscale annuelle (OHADA).' },
  ];

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <Globe size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Consolidation Groupe & Audit (SEM-BCS)</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Pilotage Multi-Filiales • Éliminations Intercos • Standards IFRS & OHADA</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <div className="flex bg-[#f8fafc] p-1.5 rounded-2xl border border-[#cbd5e1] shadow-inner">
              {[
                { id: 'entities', label: 'Périmètre', icon: Building2 },
                { id: 'consolidation', label: 'Consolidation', icon: GitMerge },
                { id: 'audit', label: 'Audit & GRC', icon: ShieldCheck },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    activeTab === tab.id ? 'bg-white text-[#005eb8] shadow-md border border-[#cbd5e1]' : 'text-[#64748b] hover:text-[#0f172a]'
                  }`}
                >
                   <tab.icon size={16} />
                   {tab.label}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <GroupStatCard title="Chiffre d'Affaires Groupe" value="2.45 B" sub="Consolidé XOF (IFRS 15)" color="blue" trend="+12%" />
         <GroupStatCard title="Résultat Net (RNPG)" value="385 M" sub="Part du Groupe Consolidée" color="green" trend="+8.5%" />
         <GroupStatCard title="Flux Éliminés (Intercos)" value="142 M" sub="Reciprocités Équilibrées" color="amber" trend="Stable" />
         <GroupStatCard title="Exposition Risque GRC" value="12 %" sub="Global Group Risk Index" color="indigo" trend="-2%" />
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'entities' && (
           <motion.div 
             key="entities"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 bg-white rounded-xl border border-[#cbd5e1] flex flex-col overflow-hidden shadow-sm">
                 <div className="p-8 bg-[#f8fafc] border-b border-[#cbd5e1] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                          <Building2 size={20} />
                       </div>
                       <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Périmètre de Consolidation des Filiales (IFRS)</h3>
                    </div>
                    <button className="flex items-center gap-3 px-6 py-2.5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20">
                       <Plus size={18} /> Ajouter Entité
                    </button>
                 </div>
                 <div className="overflow-auto">
                    <table className="w-full text-left whitespace-nowrap border-collapse">
                       <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em]">
                          <tr>
                             <th className="px-10 py-6">Dénomination Sociale</th>
                             <th className="px-10 py-6 text-center">Localisation / Devise</th>
                             <th className="px-10 py-6 text-center">% Contrôle</th>
                             <th className="px-10 py-6 text-center">Méthode IFRS</th>
                             <th className="px-10 py-6 text-center">Statut Consolidation</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-[#f1f5f9]">
                          {entities.map((ent) => (
                            <tr key={ent.id} className="group hover:bg-blue-50/20 transition-all cursor-pointer">
                               <td className="px-10 py-6 border-r border-[#f1f5f9]">
                                  <div className="flex flex-col">
                                     <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{ent.name}</span>
                                     <span className="text-[9px] font-mono font-bold text-[#94a3b8] tracking-widest mt-1 uppercase">{ent.id}</span>
                                  </div>
                               </td>
                               <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                                  <div className="flex flex-col items-center">
                                     <span className="text-[11px] font-black text-[#334155] uppercase tracking-widest">{ent.country}</span>
                                     <span className="text-[10px] font-black text-[#005eb8] mt-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 tracking-[0.2em]">{ent.currency}</span>
                                  </div>
                               </td>
                               <td className="px-10 py-6 text-center border-r border-[#f1f5f9] font-black text-[#0f172a] text-base tracking-tighter">
                                  {ent.ownership}<span className="text-xs opacity-30">%</span>
                               </td>
                               <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                                  <span className="px-4 py-1.5 rounded-[2rem] bg-[#f8fafc] border border-[#cbd5e1] text-[9px] font-black text-[#64748b] uppercase tracking-widest shadow-sm group-hover:bg-white group-hover:border-[#005eb8] group-hover:text-[#005eb8] transition-all">
                                     {ent.ownership > 50 ? 'Intégration Globale' : 'Mise en Équivalence'}
                                  </span>
                               </td>
                               <td className="px-10 py-6 text-center">
                                  <div className="flex items-center justify-center gap-3">
                                     <div className="w-2.5 h-2.5 rounded-full bg-[#107e3e] shadow-sm animate-pulse" />
                                     <span className="text-[10px] font-black uppercase text-[#107e3e] tracking-widest">{ent.status}</span>
                                  </div>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="flex flex-col gap-8">
                 <div className="bg-white border border-[#cbd5e1] rounded-xl p-10 flex flex-col gap-8 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50 transition-transform group-hover:scale-125"></div>
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a] border-b border-[#f1f5f9] pb-6 relative z-10 flex items-center gap-3">
                       <PieChart size={18} className="text-[#005eb8]" /> Structure Actionnariale Consolidée
                    </h4>
                    <div className="h-48 flex items-center justify-center relative z-10">
                       <div className="relative w-40 h-40 rounded-full border-[14px] border-[#f1f5f9] flex items-center justify-center group/chart">
                          <motion.div 
                             initial={{ rotate: -180, opacity: 0 }}
                             animate={{ rotate: -45, opacity: 1 }}
                             transition={{ duration: 1, ease: "easeOut" }}
                             className="absolute inset-0 rounded-full border-[14px] border-[#005eb8] border-t-transparent shadow-lg" 
                          />
                          <div className="flex flex-col items-center">
                             <span className="text-4xl font-black text-[#0f172a] tracking-tighter">82<span className="text-xl opacity-30">%</span></span>
                             <span className="text-[8px] font-black text-[#64748b] uppercase tracking-widest mt-1">Part Groupe</span>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4 relative z-10">
                       <KpiRow label="Participations Maj." value="82%" color="blue" />
                       <KpiRow label="Intérêts Minoritaires" value="18%" color="slate" />
                    </div>
                 </div>

                 <div className="bg-blue-50 border border-blue-100 p-8 rounded-xl flex items-center gap-6 shadow-sm group hover:bg-white hover:border-[#005eb8] transition-all cursor-pointer">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#005eb8] border border-blue-200 shadow-sm group-hover:rotate-12 transition-transform">
                       <Target size={28} />
                    </div>
                    <div className="flex-1">
                       <h5 className="text-[10px] font-black text-[#005eb8] uppercase tracking-widest mb-1">Objectifs Stratégiques 2025</h5>
                       <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest opacity-80 italic leading-relaxed">
                          Expansion prévue sur le marché UEMOA avec 2 nouvelles filiales opérationnelles en phase Q3.
                       </p>
                    </div>
                    <ChevronRight size={20} className="text-[#cbd5e1] group-hover:text-[#005eb8] transition-all group-hover:translate-x-1" />
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'consolidation' && (
           <motion.div 
             key="consolidation"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.98 }}
             className="flex flex-col gap-8"
           >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-white border border-[#cbd5e1] rounded-2xl p-10 flex flex-col gap-8 shadow-sm relative overflow-hidden group hover:border-[#005eb8] transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-center mb-4 relative z-10 border-b border-[#f1f5f9] pb-6">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                             <FileText size={24} />
                          </div>
                          <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#0f172a]">Bilan & Résultat Consolidé (Flux Group)</h4>
                       </div>
                       <button className="text-[10px] font-black text-[#005eb8] uppercase tracking-[0.2em] flex items-center gap-3 hover:underline bg-blue-50 px-4 py-2 rounded-lg transition-all">
                          <Download size={18} /> Rapports IFRS
                       </button>
                    </div>
                    <div className="space-y-6 relative z-10">
                       <ConsolidationItem label="Actifs Immobilisés Bruts" values={['2.1 B', '450 M', '2.55 B']} />
                       <ConsolidationItem label="Trésorerie Centrale Groupe" values={['580 M', '120 M', '700 M']} />
                       <ConsolidationItem label="Capitaux Propres Consolidés" values={['1.2 B', '300 M', '1.5 B']} />
                       <div className="pt-6 mt-4 flex items-center gap-6">
                          <div className="flex items-center gap-3">
                             <div className="w-3 h-3 bg-[#f1f5f9] border border-[#cbd5e1] rounded-full shadow-inner"></div>
                             <span className="text-[9px] font-black text-[#94a3b8] uppercase tracking-widest">Filiales</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="w-3 h-3 bg-amber-100 border border-amber-200 rounded-full shadow-inner"></div>
                             <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Éliminations</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="w-3 h-3 bg-[#005eb8] rounded-full shadow-inner shadow-blue-500/50"></div>
                             <span className="text-[9px] font-black text-[#0f172a] uppercase tracking-widest">Consolidé</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-indigo-600 border border-indigo-700 p-10 rounded-2xl flex flex-col gap-10 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-6 relative z-10">
                       <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-inner group-hover:rotate-12 transition-transform">
                          <Zap size={32} />
                       </div>
                       <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-none">Moteur d'Éliminations Automatisé</h4>
                    </div>
                    <div className="space-y-6 relative z-10">
                       <EliminationCard title="Dettes / Créances Réciproques" count={12} amount="85 400 000 F" status="Équilibré (OK)" />
                       <EliminationCard title="Dividendes Intra-Groupe" count={4} amount="42 000 000 F" status="Équilibré (OK)" />
                       <EliminationCard title="Marge en Stock Inter-Filiales" count={8} amount="14 700 000 F" status="En attente (Audit)" alert />
                    </div>
                    <button className="w-full py-5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl relative z-10 flex items-center justify-center gap-4 group/btn">
                       <RefreshCw size={24} className="group-hover/btn:animate-spin" /> Exécuter Consolidation Globale
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
             exit={{ opacity: 0, x: -20 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 flex flex-col gap-8">
                 <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col">
                    <div className="p-8 bg-[#f8fafc] border-b border-[#cbd5e1] flex justify-between items-center">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100 shadow-inner">
                             <ShieldCheck size={20} />
                          </div>
                          <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Registre des Risques & Conformité GRC</h3>
                       </div>
                       <div className="flex gap-4">
                          <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#0f172a] transition-all shadow-sm"><Search size={20} /></button>
                          <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#0f172a] transition-all shadow-sm"><Filter size={20} /></button>
                       </div>
                    </div>
                    <div className="p-0 divide-y divide-[#f1f5f9]">
                       {risks.map((risk) => (
                          <div key={risk.id} className="p-8 hover:bg-blue-50/20 transition-all group flex items-start gap-8">
                             <div className={`p-4 rounded-2xl border shadow-sm transition-transform group-hover:scale-110 ${
                               risk.severity === 'Haute' ? 'bg-red-50 text-[#dc2626] border-red-200' : 
                               risk.severity === 'Moyenne' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                               'bg-green-50 text-[#107e3e] border-green-200'
                             }`}>
                                <AlertCircle size={24} />
                             </div>
                             <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                   <h5 className="text-base font-black text-[#0f172a] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{risk.label}</h5>
                                   <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-[2rem] border tracking-widest shadow-sm ${
                                     risk.status === 'Alerte' ? 'bg-red-50 border-red-200 text-[#dc2626]' : 'bg-[#f8fafc] border-[#cbd5e1] text-[#64748b]'
                                   }`}>{risk.status}</span>
                                </div>
                                <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-tight opacity-70 leading-relaxed max-w-2xl">{risk.desc}</p>
                             </div>
                             <button className="p-3 text-[#cbd5e1] hover:text-[#005eb8] opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                <ArrowRight size={22} />
                             </button>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="bg-white border border-[#cbd5e1] rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-6 shadow-sm group hover:border-green-500 transition-all cursor-pointer">
                       <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-[#107e3e] border border-green-100 shadow-inner group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={32} />
                       </div>
                       <div>
                          <h5 className="text-[12px] font-black text-[#0f172a] uppercase tracking-widest">Score Conformité SOX/OHADA</h5>
                          <p className="text-3xl font-black text-[#107e3e] mt-2 tracking-tighter">98.5<span className="text-sm opacity-30">%</span></p>
                       </div>
                    </div>
                    <div className="bg-white border border-[#cbd5e1] rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-6 shadow-sm group hover:border-[#005eb8] transition-all cursor-pointer">
                       <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#005eb8] border border-blue-100 shadow-inner group-hover:scale-110 transition-transform">
                          <Activity size={32} />
                       </div>
                       <div>
                          <h5 className="text-[12px] font-black text-[#0f172a] uppercase tracking-widest">Dernière Audit Scan (Joule AI)</h5>
                          <p className="text-[11px] font-black text-[#334155] uppercase mt-2 tracking-widest bg-blue-50 px-4 py-1 rounded-full border border-blue-100">Il y a 12 minutes</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-8">
                 <div className="bg-white border border-[#cbd5e1] rounded-2xl p-10 flex flex-col gap-8 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a] relative z-10 flex items-center gap-3 border-b border-[#f1f5f9] pb-6">
                       <ShieldCheck size={18} className="text-indigo-600" /> IA Anti-Fraude Joule
                    </h4>
                    <div className="p-6 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl shadow-inner relative z-10 group-hover:bg-white transition-colors">
                       <div className="flex items-center gap-4 text-[#107e3e] mb-4">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#107e3e] animate-ping" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Statut : Périmètre Sécurisé</span>
                       </div>
                       <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-tight leading-relaxed italic opacity-80">
                          L'IA Joule analyse les patterns transactionnels en continu sur tout le Ledger. Aucun comportement suspect détecté sur les flux inter-filiales.
                       </p>
                    </div>
                    <button className="w-full py-4 bg-[#f8fafc] border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] hover:border-[#005eb8] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm relative z-10">
                       Lancer Scan Profond (Deep Audit)
                    </button>
                 </div>

                 <div className="bg-red-50 border border-red-100 p-8 rounded-2xl flex flex-col gap-6 shadow-sm">
                    <div className="flex items-center gap-4 border-b border-red-100 pb-4">
                       <AlertCircle size={20} className="text-[#dc2626]" />
                       <h5 className="text-[10px] font-black text-[#dc2626] uppercase tracking-widest leading-none">Points d'Attention Audit</h5>
                    </div>
                    <div className="space-y-4">
                       <KpiMini label="Mali (Tax Compliance)" value="CRITIQUE" color="red" />
                       <KpiMini label="Europe (FX Exposure)" value="STABLE" color="blue" />
                    </div>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-8">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={32} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Consolidation Financière Certifiée (IFRS/OHADA)</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic leading-relaxed">
                  L'intégrité des éliminations inter-compagnies est certifiée par Joule AI Auditor conformément aux normes IFRS 10/11 • S/4HANA Engine.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-4 text-[#64748b] hover:text-[#005eb8] text-[10px] font-black uppercase tracking-[0.4em] transition-all group">
               <History size={22} className="group-hover:rotate-[-45deg] transition-transform" /> Journal GRC
            </button>
            <button className="flex items-center gap-4 text-[#005eb8] hover:text-[#004080] text-[10px] font-black uppercase tracking-[0.5em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={22} className="group-hover:rotate-12 transition-transform" /> Certifier Groupe
               <ArrowRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

const GroupStatCard = ({ title, value, sub, color, trend }: any) => (
  <div className="bg-white border border-[#cbd5e1] p-8 rounded-2xl relative overflow-hidden group hover:border-[#005eb8] transition-all shadow-sm cursor-pointer">
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full ${
      color === 'green' ? 'bg-[#107e3e]' : color === 'blue' ? 'bg-[#005eb8]' : 'bg-indigo-500'
    } opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
       <p className="text-[11px] font-black text-[#94a3b8] uppercase tracking-widest leading-none">{title}</p>
       <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
         trend.includes('+') ? 'bg-green-50 text-[#107e3e] border border-green-100' : 'bg-blue-50 text-[#005eb8] border border-blue-100'
       } shadow-sm`}>{trend}</span>
    </div>
    <h3 className="text-2xl font-black text-[#0f172a] tracking-tighter relative z-10 group-hover:text-[#005eb8] transition-colors">{value}</h3>
    <p className="text-[9px] font-bold text-[#94a3b8] uppercase mt-2 tracking-widest relative z-10">{sub}</p>
  </div>
);

const ConsolidationItem = ({ label, values }: any) => (
  <div className="flex flex-col gap-3 p-6 bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl group hover:border-[#005eb8] hover:bg-white transition-all shadow-sm cursor-pointer">
     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#64748b] group-hover:text-[#0f172a] transition-colors">
        <span>{label}</span>
        <div className="flex gap-8 items-center">
           <span className="text-[#94a3b8] font-mono">{values[0]}</span>
           <span className="text-amber-600 font-mono italic">{values[1]}</span>
           <span className="text-[#0f172a] font-black text-base tracking-tighter border-l border-[#cbd5e1] pl-6 ml-2">{values[2]}</span>
        </div>
     </div>
  </div>
);

const EliminationCard = ({ title, count, amount, status, alert }: any) => (
  <div className={`p-6 rounded-2xl border flex items-center justify-between transition-all group/card ${
    alert ? 'bg-amber-50/50 border-amber-200 shadow-amber-500/10 shadow-lg scale-[1.02]' : 'bg-white/5 border-white/10 hover:bg-white/10'
  }`}>
     <div className="flex flex-col gap-1">
        <span className={`text-[11px] font-black uppercase tracking-widest ${alert ? 'text-amber-700' : 'text-white'}`}>{title}</span>
        <span className={`text-[9px] font-bold uppercase tracking-widest opacity-60 ${alert ? 'text-amber-600' : 'text-indigo-200'}`}>{count} Opérations Détectées</span>
     </div>
     <div className="text-right">
        <p className={`text-base font-black tracking-tighter ${alert ? 'text-amber-700' : 'text-white'}`}>{amount}</p>
        <p className={`text-[9px] font-black uppercase tracking-[0.2em] mt-1 ${alert ? 'text-amber-600' : 'text-[#107e3e]'}`}>{status}</p>
     </div>
  </div>
);

const KpiRow = ({ label, value, color }: any) => (
  <div className="flex items-center justify-between py-2 group/kpi">
     <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-tight group-hover/kpi:text-[#0f172a] transition-colors">{label}</span>
     <span className={`text-[11px] font-black uppercase tracking-widest ${color === 'blue' ? 'text-[#005eb8]' : 'text-[#334155]'}`}>{value}</span>
  </div>
);

const KpiMini = ({ label, value, color }: any) => (
  <div className={`flex items-center justify-between p-4 rounded-xl border shadow-sm ${
    color === 'red' ? 'bg-white border-red-200' : 'bg-white border-blue-200'
  }`}>
     <span className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">{label}</span>
     <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
       color === 'red' ? 'bg-red-50 text-[#dc2626] border border-red-100' : 'bg-blue-50 text-[#005eb8] border border-blue-100'
     } tracking-widest`}>{value}</span>
  </div>
);

export default GroupConsolidation;
