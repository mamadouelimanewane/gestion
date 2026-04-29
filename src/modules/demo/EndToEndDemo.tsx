import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, CheckCircle2, Factory, Box, 
  Users, FileText, BarChart3, ArrowRight,
  Zap, ShieldCheck, Database, Layout,
  Sparkles, RefreshCw, Send, Wallet
} from 'lucide-react';

import EndToEndFlow from './EndToEndFlow';
import CostVarianceScenario from './CostVarianceScenario';

const EndToEndDemo = () => {
  const [activeScenario, setActiveScenario] = useState<'standard' | 'variance'>('standard');

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
      {/* Scenario Selector */}
      <div className="flex justify-center">
         <div className="flex bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700/50 shadow-lg">
            <button 
              onClick={() => setActiveScenario('standard')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeScenario === 'standard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'}`}
            >
               Cycle Standard (FI/MM/RH)
            </button>
            <button 
              onClick={() => setActiveScenario('variance')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeScenario === 'variance' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-slate-400 hover:text-white'}`}
            >
               Écart de Coût (CO/FI/IA)
            </button>
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeScenario === 'standard' ? (
           <motion.div key="std" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <EndToEndFlow />
           </motion.div>
         ) : (
           <motion.div key="var" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <CostVarianceScenario />
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default EndToEndDemo;
