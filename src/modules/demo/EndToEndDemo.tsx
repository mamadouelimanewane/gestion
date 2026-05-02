import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import EndToEndFlow from './EndToEndFlow';
import CostVarianceScenario from './CostVarianceScenario';

const EndToEndDemo = () => {
  const [activeScenario, setActiveScenario] = useState<'standard' | 'variance'>('standard');

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
