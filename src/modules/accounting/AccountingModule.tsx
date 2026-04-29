import React, { useState } from 'react';
import ChartOfAccounts from './ChartOfAccounts';
import JournalEntry from './JournalEntry';
import { motion, AnimatePresence } from 'framer-motion';

const AccountingModule = () => {
  const [activeSubTab, setActiveSubTab] = useState('plan-de-comptes');

  const tabs = [
    { id: 'plan-de-comptes', label: 'Plan de Comptes' },
    { id: 'saisie-ecritures', label: 'Saisie d\'Écritures' },
    { id: 'journaux', label: 'Journaux' },
    { id: 'rapprochement', label: 'Rapprochement' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 p-1 bg-slate-800/40 rounded-xl border border-slate-700/50 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeSubTab === 'plan-de-comptes' && <ChartOfAccounts />}
          {activeSubTab === 'saisie-ecritures' && <JournalEntry />}
          {(activeSubTab === 'journaux' || activeSubTab === 'rapprochement') && (
            <div className="card h-96 border-dashed flex flex-col items-center justify-center text-slate-500">
              <p>Le module {tabs.find(t => t.id === activeSubTab)?.label} est en cours de développement.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AccountingModule;
