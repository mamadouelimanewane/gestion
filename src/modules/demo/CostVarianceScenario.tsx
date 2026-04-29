import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, Factory, Zap, TrendingUp,
  ArrowRight, CheckCircle2, ShieldCheck,
  FileText, Database, Calculator, Activity,
  Bell, MessageSquare, Sparkles
} from 'lucide-react';

const CostVarianceScenario = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const scenarioSteps = [
    {
      title: "1. Détection d'Écart de Coût (CO-PA)",
      icon: <AlertTriangle className="text-rose-400" />,
      desc: "Le système détecte un dépassement de 15% sur le centre de coût 'Énergie' de l'Unité de Production A.",
      action: "Analyse des variances...",
      result: "Écart identifié : +2.4M XOF"
    },
    {
      title: "2. Imputation Secondaire (CO-OM)",
      icon: <Calculator className="text-indigo-400" />,
      desc: "Réallocation automatique de l'écart sur les produits finis (PF) fabriqués durant la période.",
      action: "Cycle de répartition en cours...",
      result: "Coût de revient mis à jour"
    },
    {
      title: "3. Provision Comptable (FI)",
      icon: <Database className="text-emerald-400" />,
      desc: "Génération automatique d'une écriture d'ajustement (Provision pour charges) dans le Journal Universel.",
      action: "Passage de l'OD de régularisation...",
      result: "Écriture 6xx vs 48x générée"
    },
    {
      title: "4. Alerte IA Joule & Décision",
      icon: <Sparkles className="text-amber-400" />,
      desc: "L'IA analyse l'impact sur la marge brute et suggère une révision des prix de vente pour le prochain lot.",
      action: "Calcul de l'impact marge...",
      result: "Suggestion : +3.5% sur PV"
    }
  ];

  const startScenario = () => {
    setIsRunning(true);
    setStep(1);
  };

  useEffect(() => {
    if (isRunning && step > 0 && step <= scenarioSteps.length) {
      const timer = setTimeout(() => {
        if (step < scenarioSteps.length) {
          setStep(step + 1);
        } else {
          setIsRunning(false);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isRunning, step]);

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Scenario Header */}
      <div className="bg-rose-600/10 border border-rose-500/20 p-8 rounded-[2.5rem] flex justify-between items-center shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-lg">
               <AlertTriangle size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1">Scénario : Écart de Coût Industriel</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Analyse des variances CO-PC ➡️ Provision FI ➡️ Recommandation IA</p>
            </div>
         </div>
         <button 
           onClick={startScenario}
           disabled={isRunning}
           className="px-10 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-rose-600/30 flex items-center gap-3"
         >
            {isRunning ? <Activity size={18} className="animate-spin" /> : <PlayIcon size={18} />}
            {isRunning ? 'Analyse en cours...' : 'Lancer le Scénario'}
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Workflow */}
         <div className="space-y-4">
            {scenarioSteps.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0.3, x: -20 }}
                animate={{ 
                  opacity: step === i + 1 ? 1 : step > i + 1 ? 0.6 : 0.3,
                  x: step === i + 1 ? 10 : 0
                }}
                className={`card p-6 flex items-start gap-6 border-slate-700/50 ${
                  step === i + 1 ? 'border-rose-500/30 bg-rose-500/5' : 'bg-slate-800/10'
                }`}
              >
                 <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-inner ${
                   step === i + 1 ? 'bg-rose-600 text-white' : step > i + 1 ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-slate-600'
                 }`}>
                    {step > i + 1 ? <CheckCircle2 size={24} /> : s.icon}
                 </div>
                 <div className="flex-1">
                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">{s.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-3">{s.desc}</p>
                    {step === i + 1 && (
                       <div className="flex items-center gap-2 text-[9px] font-black text-rose-400 uppercase italic animate-pulse">
                          <Zap size={12} /> {s.action}
                       </div>
                    )}
                    {step > i + 1 && (
                       <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={12} /> {s.result}
                       </div>
                    )}
                 </div>
              </motion.div>
            ))}
         </div>

         {/* Visual Impact */}
         <div className="flex flex-col gap-6">
            <div className="card bg-slate-800/30 p-8 flex flex-col gap-8 shadow-2xl relative overflow-hidden h-full">
               <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-slate-700 pb-4">Analyse d'Impact Financier</h4>
               
               <div className="flex-1 flex flex-col justify-center gap-10">
                  <div className="space-y-4">
                     <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Coût Énergie Prévu</span>
                        <span className="text-sm font-black text-white">15 800 000 F</span>
                     </div>
                     <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[70%]" />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-rose-400 uppercase">Coût Énergie Réel</span>
                        <span className="text-sm font-black text-rose-400">18 200 000 F</span>
                     </div>
                     <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 w-[85%]" />
                     </div>
                  </div>

                  <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                     <div className="flex items-center gap-3 text-amber-400 mb-2">
                        <MessageSquare size={18} />
                        <span className="text-[10px] font-black uppercase">Recommandation Joule</span>
                     </div>
                     <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                        "L'écart est principalement dû à la hausse des tarifs Senelec. Impact sur la marge brute du lot #882 : **-4.2%**. Je recommande d'ajuster le prix de vente unitaire à **18 500 F** pour maintenir votre rentabilité cible."
                     </p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <button className="py-3 bg-slate-900 border border-slate-700 rounded-xl text-[9px] font-black uppercase text-slate-400 hover:text-white transition-all">Générer Rapport CO</button>
                  <button className="py-3 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">Ajuster Prix (SD)</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const PlayIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default CostVarianceScenario;
