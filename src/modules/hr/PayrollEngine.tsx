import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, Printer, Calculator, FileText, 
  Search, Filter, Play, CheckCircle2,
  AlertTriangle, Download, Database,
  TrendingUp, Activity, PieChart, Info,
  ShieldCheck, RefreshCw, Layers
} from 'lucide-react';

const PayrollEngine = () => {
  const [activeView, setActiveView] = useState<'calculator' | 'declarations' | 'slips'>('calculator');
  const [isCalculating, setIsCalculating] = useState(false);

  const runPayroll = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Payroll Header */}
      <div className="flex justify-between items-center bg-slate-800/20 border border-slate-700/50 p-6 rounded-3xl shadow-xl">
         <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
               <Calculator size={24} />
            </div>
            <div>
               <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Moteur de Paie Certifié (Sénégal)</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">IR • IPRES • CSS • TRIMF • Conformité DGTSS 2024</p>
            </div>
         </div>
         <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50">
            {[
              { id: 'calculator', label: 'Calcul Paie', icon: Play },
              { id: 'slips', label: 'Bulletins', icon: FileText },
              { id: 'declarations', label: 'Déclarations', icon: ShieldCheck },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveView(v.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeView === v.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                 <v.icon size={14} />
                 {v.label}
              </button>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeView === 'calculator' && (
           <motion.div 
             key="calc"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              {/* Left: Execution Card */}
              <div className="card bg-slate-800/30 p-8 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-emerald-500/5 rounded-full blur-3xl"></div>
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Exécution de la Paie (Avril 2024)</h4>
                 
                 <div className="space-y-4">
                    <ParamRow label="Société Juridique" value="ANTIGRAVITY TECH HQ" />
                    <ParamRow label="Nombre de Salariés" value="124" />
                    <ParamRow label="Période" value="01/04 - 30/04/2024" />
                    <ParamRow label="Devise de Calcul" value="XOF (F CFA)" />
                 </div>

                 <div className="mt-4 p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-start gap-4">
                    <AlertTriangle size={18} className="text-amber-400 mt-0.5" />
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                       2 salariés n'ont pas encore leurs relevés d'absences validés pour cette période. Le calcul utilisera les données par défaut.
                    </p>
                 </div>

                 <button 
                   onClick={runPayroll}
                   disabled={isCalculating}
                   className={`w-full py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center justify-center gap-3 ${
                     isCalculating ? 'bg-slate-700 text-slate-500' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                   }`}
                 >
                    {isCalculating ? (
                      <>
                         <RefreshCw size={18} className="animate-spin" /> Calcul en cours...
                      </>
                    ) : (
                      <>
                         <Play size={18} /> Lancer le Calcul
                      </>
                    )}
                 </button>
              </div>

              {/* Right: Summary Metrics */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="card bg-slate-800/30 p-8 flex flex-col gap-6">
                       <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Répartition des Bruts</h5>
                       <div className="space-y-4">
                          <DistributionRow label="Salaires de Base" amount="32.500.000 F" percentage={71} color="emerald" />
                          <DistributionRow label="Heures Sup (DGTSS)" amount="2.100.000 F" percentage={5} color="indigo" />
                          <DistributionRow label="Primes & Indemnités" amount="11.200.000 F" percentage={24} color="amber" />
                       </div>
                    </div>
                    <div className="card bg-slate-800/30 p-8 flex flex-col gap-6">
                       <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Retenues Fiscales & Sociales</h5>
                       <div className="space-y-4">
                          <DistributionRow label="IPRES (Retraite)" amount="3.450.000 F" percentage={30} color="rose" />
                          <DistributionRow label="IR (Impôt Revenu)" amount="5.120.000 F" percentage={45} color="rose" />
                          <DistributionRow label="CSS (Charges)" amount="820.000 F" percentage={10} color="rose" />
                       </div>
                    </div>
                 </div>

                 <div className="card bg-emerald-600/5 border border-emerald-500/20 p-8 rounded-[2.5rem] flex items-center gap-8 shadow-inner">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center text-emerald-400 shadow-inner border border-emerald-500/10">
                       <TrendingUp size={32} />
                    </div>
                    <div className="flex-1">
                       <h5 className="text-sm font-black text-white uppercase tracking-widest mb-2">Simulateur de Masse Salariale</h5>
                       <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                          L'IA Joule a analysé vos prévisions. Une augmentation générale de **3%** sur le grade Senior impacterait votre trésorerie de **1.2M XOF/mois**.
                       </p>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-3 bg-slate-900 border border-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                       Simuler Augmentation
                    </button>
                 </div>
              </div>
           </motion.div>
         )}

         {activeView === 'slips' && (
           <motion.div 
             key="slips"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col gap-6"
           >
              <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
                 <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Archives des Bulletins (GED Paie)</h4>
                    <div className="flex gap-2">
                       <div className="relative">
                          <input type="text" placeholder="Nom ou Matricule..." className="bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-4 py-1.5 text-[10px] uppercase font-bold text-white outline-none focus:border-emerald-500 transition-all" />
                          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                       </div>
                       <button className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest"><Printer size={14} /> Impression de Masse</button>
                    </div>
                 </div>
                 <div className="overflow-auto max-h-[500px]">
                    <table className="w-full text-left">
                       <thead className="bg-slate-900/50 text-[9px] font-black uppercase text-slate-500 tracking-widest sticky top-0">
                          <tr>
                             <th className="p-6">Collaborateur</th>
                             <th className="p-6 text-right">Salaire Net</th>
                             <th className="p-6 text-right">Charges Salariales</th>
                             <th className="p-6 text-right">Charges Patronales</th>
                             <th className="p-6 text-center">Status</th>
                             <th className="p-6 text-right">Action</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-700/30">
                          {[
                            { name: 'Mamadou Kane', net: '945.200 F', sal: '185.000 F', pat: '240.000 F', status: 'Généré' },
                            { name: 'Awa Diop', net: '712.000 F', sal: '142.000 F', pat: '190.000 F', status: 'Généré' },
                            { name: 'Ibrahima Fall', net: '450.500 F', sal: '95.000 F', pat: '120.000 F', status: 'Envoyé' },
                          ].map((slip, i) => (
                            <tr key={i} className="group hover:bg-emerald-500/5 transition-all cursor-pointer">
                               <td className="p-6">
                                  <div className="flex flex-col">
                                     <span className="text-xs font-bold text-white uppercase group-hover:text-emerald-400 transition-colors">{slip.name}</span>
                                     <span className="text-[9px] text-slate-500 font-black uppercase mt-1">Avril 2024</span>
                                  </div>
                               </td>
                               <td className="p-6 text-right font-black text-white">{slip.net}</td>
                               <td className="p-6 text-right font-medium text-rose-400">{slip.sal}</td>
                               <td className="p-6 text-right font-medium text-slate-400">{slip.pat}</td>
                               <td className="p-6 text-center">
                                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${slip.status === 'Envoyé' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                     {slip.status}
                                  </span>
                               </td>
                               <td className="p-6 text-right">
                                  <button className="p-2 text-slate-600 hover:text-white transition-colors"><Download size={16} /></button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </motion.div>
         )}

         {activeView === 'declarations' && (
           <motion.div 
             key="decl"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-8"
           >
              <div className="card bg-slate-800/30 p-8 flex flex-col gap-8 shadow-2xl">
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Déclarations Sociales & Fiscales (SIPS)</h4>
                 <div className="space-y-4">
                    <DeclarationItem label="IPRES (Régime Général & Cadre)" amount="3.450.000 F" deadline="15/05/2024" status="Prêt" />
                    <DeclarationItem label="CSS (Prestations Familiales)" amount="820.000 F" deadline="15/05/2024" status="Prêt" />
                    <DeclarationItem label="IR (VRS - Impôt Retenu)" amount="5.120.000 F" deadline="15/05/2024" status="En attente" alert />
                    <DeclarationItem label="TRIMF (Contribution Forfaitaire)" amount="450.000 F" deadline="15/05/2024" status="Prêt" />
                 </div>
                 <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20">
                    Générer Fichiers EDI (Format SIPS/Senegal)
                 </button>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-slate-800/30 p-8 flex flex-col gap-6 shadow-2xl">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Journal de Paie (Comptabilisation)</h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                       Générez automatiquement les écritures comptables (OD de Paie) pour intégration dans le Journal Universel.
                    </p>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                       <div className="flex justify-between text-[9px] font-black uppercase">
                          <span className="text-slate-400">661 Salaries</span>
                          <span className="text-white">45.800.000 F (D)</span>
                       </div>
                       <div className="flex justify-between text-[9px] font-black uppercase">
                          <span className="text-slate-400">421 Personnel dû</span>
                          <span className="text-white">36.410.000 F (C)</span>
                       </div>
                    </div>
                    <button className="w-full py-3 bg-slate-900 border border-slate-700 text-indigo-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                       Transférer en Comptabilité
                    </button>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const ParamRow = ({ label, value }: any) => (
  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
     <span className="text-slate-500">{label}</span>
     <span className="text-white">{value}</span>
  </div>
);

const DistributionRow = ({ label, amount, percentage, color }: any) => (
  <div className="flex flex-col gap-2">
     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{amount}</span>
     </div>
     <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
        <div className={`h-full bg-${color}-500`} style={{ width: `${percentage}%` }} />
     </div>
  </div>
);

const DeclarationItem = ({ label, amount, deadline, status, alert }: any) => (
  <div className={`p-4 rounded-2xl border flex items-center justify-between ${alert ? 'bg-amber-500/5 border-amber-500/20' : 'bg-slate-900 border-slate-800'}`}>
     <div className="flex flex-col">
        <span className="text-[10px] font-black text-white uppercase tracking-widest">{label}</span>
        <span className="text-[8px] font-bold text-slate-500 uppercase mt-1">Echéance : {deadline}</span>
     </div>
     <div className="text-right">
        <p className="text-xs font-black text-white">{amount}</p>
        <p className={`text-[8px] font-black uppercase ${alert ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>{status}</p>
     </div>
  </div>
);

export default PayrollEngine;
