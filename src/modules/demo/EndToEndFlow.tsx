import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, CheckCircle2, Factory, Box, 
  Users, FileText, BarChart3, ArrowRight,
  Zap, ShieldCheck, Database, Layout,
  Sparkles, RefreshCw, Send, Wallet, Terminal
} from 'lucide-react';

const EndToEndFlow = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      title: "1. Calcul du Coût Industriel (CO-PC)",
      module: "Contrôle de Gestion",
      icon: <Factory className="text-amber-400" />,
      desc: "Définition du coût de revient de l'Unité Industrielle A incluant matières premières, main d'œuvre et overhead.",
      action: "Calcul du coût standard...",
      result: "Coût Standard : 17 200 F / unité"
    },
    {
      title: "2. Flux Logistique & Stocks (MM)",
      module: "Logistique",
      icon: <Box className="text-blue-400" />,
      desc: "Réception des matières premières et mise à jour automatique de la valorisation des stocks au CUMP.",
      action: "Entrée de marchandises (MIGO)...",
      result: "Stock mis à jour : +500kg (8.75M F)"
    },
    {
      title: "3. Traitement de la Paie (SIRH)",
      module: "Ressources Humaines",
      icon: <Users className="text-indigo-400" />,
      desc: "Calcul des salaires de l'équipe de production avec intégration des charges sociales sénégalaises (IPRES/CSS).",
      action: "Génération des bulletins...",
      result: "Masse Salariale : 45.8M F (Net à payer généré)"
    },
    {
      title: "4. Intégration FI/CO (Noyau)",
      module: "Comptabilité",
      icon: <Database className="text-emerald-400" />,
      desc: "Synchronisation de tous les flux dans le Journal Universel (ACDOCA) avec lettrage automatique.",
      action: "Passage des écritures OD...",
      result: "Journal Universel à jour (Équilibre D/C)"
    },
    {
      title: "5. Reporting & États Financiers",
      module: "Reporting Hub",
      icon: <FileText className="text-rose-400" />,
      desc: "Génération du Bilan et du Compte de Résultat consolidé en temps réel (Temps Réel SAP S/4HANA).",
      action: "Édition du Bilan...",
      result: "Bilan Certifié OHADA disponible"
    }
  ];

  const startDemo = () => {
    setIsRunning(true);
    setStep(1);
    setProgress(0);
  };

  useEffect(() => {
    if (isRunning && step > 0 && step <= steps.length) {
      const timer = setInterval(() => {
        setProgress((old) => {
          if (old >= 100) {
            if (step < steps.length) {
              setStep(step + 1);
              return 0;
            } else {
              setIsRunning(false);
              return 100;
            }
          }
          return old + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isRunning, step]);

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Demo Header */}
      <div className="flex justify-between items-center bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
               <Sparkles size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1">Démonstration Flux "End-to-End"</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Simulation de cycle complet : Production ➡️ Logistique ➡️ Paie ➡️ Finance</p>
            </div>
         </div>
         <button 
           onClick={startDemo}
           disabled={isRunning}
           className={`px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 shadow-2xl ${
             isRunning ? 'bg-slate-800 text-slate-500' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
           }`}
         >
            {isRunning ? <RefreshCw size={18} className="animate-spin" /> : <Play size={18} />}
            {isRunning ? 'Simulation en cours...' : 'Lancer la Démo'}
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Left: Workflow Steps */}
         <div className="flex flex-col gap-4 relative">
            <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-800 -z-10" />
            {steps.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: step === i + 1 ? 1 : step > i + 1 ? 0.6 : 0.3,
                  x: step === i + 1 ? 10 : 0
                }}
                className={`card p-6 flex items-start gap-6 transition-all border-slate-700/50 ${
                  step === i + 1 ? 'border-indigo-500/50 bg-indigo-500/5 shadow-indigo-500/10' : 'bg-slate-800/10'
                }`}
              >
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner shrink-0 ${
                   step === i + 1 ? 'bg-indigo-600 text-white' : step > i + 1 ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-slate-600'
                 }`}>
                    {step > i + 1 ? <CheckCircle2 size={24} /> : s.icon}
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">{s.module}</span>
                       {step === i + 1 && (
                         <span className="text-[9px] font-black text-white px-2 py-0.5 bg-indigo-600 rounded-lg animate-pulse">Running</span>
                       )}
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">{s.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                    
                    {step === i + 1 && (
                       <div className="mt-4 flex flex-col gap-2">
                          <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 italic">
                             <span>{s.action}</span>
                             <span>{progress}%</span>
                          </div>
                          <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                             <motion.div 
                               className="h-full bg-indigo-500"
                               initial={{ width: 0 }}
                               animate={{ width: `${progress}%` }}
                             />
                          </div>
                       </div>
                    )}

                    {step > i + 1 && (
                       <div className="mt-3 py-2 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                          <CheckCircle2 size={14} className="text-emerald-400" />
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{s.result}</span>
                       </div>
                    )}
                 </div>
              </motion.div>
            ))}
         </div>

         {/* Right: Live Data Preview */}
         <div className="flex flex-col gap-8">
            <div className="card bg-slate-800/20 border-slate-700/50 p-10 shadow-2xl h-full flex flex-col gap-8 relative overflow-hidden">
               <div className="flex justify-between items-center border-b border-slate-700 pb-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Console Système Temps Réel</h4>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[9px] font-black text-slate-500 uppercase">Live SAP-Sync</span>
                  </div>
               </div>

               <div className="flex-1 bg-slate-950/80 rounded-3xl p-8 font-mono text-[11px] text-slate-400 overflow-auto border border-slate-800 shadow-inner">
                  {step >= 1 && (
                    <div className="space-y-4">
                       <p className="text-indigo-400 font-bold tracking-tighter">[SYS-LOAD] Initialisation module CO-PC...</p>
                       <p>Determining activity types for CC-PROD-01...</p>
                       <p className="text-emerald-400 font-bold">&gt; Unit Cost calculated: 17,200.00 XOF</p>
                    </div>
                  )}
                  {step >= 2 && (
                    <div className="space-y-4 mt-6">
                       <p className="text-blue-400 font-bold tracking-tighter">[MM-GATEWAY] Goods Receipt MIGO detected...</p>
                       <p>Material RM-001 (Steel) updated in Warehouse Zone A.</p>
                       <p className="text-emerald-400 font-bold">&gt; Inventory Valuation (WAC): +8,750,000.00 XOF</p>
                    </div>
                  )}
                  {step >= 3 && (
                    <div className="space-y-4 mt-6">
                       <p className="text-indigo-400 font-bold tracking-tighter">[HR-PAY] Payroll Engine execution for period 04/2024...</p>
                       <p>Applying OHADA rules (IPRES 5.6%, CSS 7%, IR Progressive)...</p>
                       <p className="text-emerald-400 font-bold">&gt; Net to Pay generated for 124 employees.</p>
                    </div>
                  )}
                  {step >= 4 && (
                    <div className="space-y-4 mt-6">
                       <p className="text-emerald-400 font-bold tracking-tighter">[FI-CORE] Writing to Universal Journal (ACDOCA)...</p>
                       <p>Debit: 661000 Salaries | Credit: 421000 Personnel</p>
                       <p>Debit: 401000 Vendors | Credit: 521000 Bank</p>
                       <p className="text-emerald-400 font-bold">&gt; Transaction complete. Audit Trail SM20 created.</p>
                    </div>
                  )}
                  {step >= 5 && (
                    <div className="space-y-4 mt-6">
                       <p className="text-rose-400 font-bold tracking-tighter">[REP-HUB] Consolidated Statements rendering...</p>
                       <p>Generating PDF preview (High Fidelity)...</p>
                       <p className="text-emerald-400 font-bold">&gt; Bilan & Résultat ready for download.</p>
                    </div>
                  )}
                  
                  {!isRunning && step === 0 && (
                    <div className="h-full flex items-center justify-center text-center opacity-40">
                       <p className="text-[10px] font-black uppercase tracking-widest italic leading-relaxed">
                          En attente de lancement de la simulation.<br/>Utilisez le bouton "Lancer la Démo" pour visualiser le flux.<br/>
                          <Terminal size={32} className="mx-auto mt-6" />
                       </p>
                    </div>
                  )}

                  {step === steps.length && progress === 100 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col items-center gap-4 text-center"
                    >
                       <CheckCircle2 size={40} className="text-emerald-400" />
                       <div>
                          <p className="text-xs font-black text-white uppercase tracking-widest">Cycle Complet Terminé</p>
                          <p className="text-[9px] text-slate-500 font-medium uppercase mt-1">Données synchronisées dans le Cloud</p>
                       </div>
                    </motion.div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default EndToEndFlow;
