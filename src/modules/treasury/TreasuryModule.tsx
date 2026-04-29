import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Landmark, ArrowRightLeft, TrendingUp, Search, Plus, Filter, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TreasuryModule = () => {
  const [activeTab, setActiveTab] = useState('banques');

  const tabs = [
    { id: 'banques', label: 'Comptes Bancaires', icon: Landmark },
    { id: 'caisse', label: 'Caisse', icon: Wallet },
    { id: 'rapprochement', label: 'Rapprochement', icon: ArrowRightLeft },
    { id: 'previsions', label: 'Prévisions', icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on tab */}
      {activeTab === 'banques' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          {/* Action Bar */}
          <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher un compte..."
                  className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 w-64"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm transition-colors">
                <Download size={16} />
                Relevés
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
                <Plus size={16} />
                Nouveau Compte
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
            {[
              { bank: 'BNP Paribas', acc: 'FR76 3000 4000 1234', balance: '124,500.00 €', type: 'Compte Courant', color: 'emerald', trend: '+2.4%' },
              { bank: 'Société Générale', acc: 'FR76 3000 4000 5678', balance: '45,230.00 €', type: 'Compte Épargne', color: 'indigo', trend: '+0.5%' },
              { bank: 'Crédit Mutuel', acc: 'FR76 3000 4000 9012', balance: '12,400.00 €', type: 'Compte Devises (USD)', color: 'amber', trend: '-1.2%' },
            ].map((account, i) => (
               <div key={i} className={`card border-${account.color}-500/20`}>
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="font-bold text-lg">{account.bank}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-1">{account.acc}</p>
                     </div>
                     <div className={`w-8 h-8 rounded-full bg-${account.color}-500/10 flex items-center justify-center`}>
                        <Landmark size={16} className={`text-${account.color}-400`} />
                     </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-1">{account.type}</p>
                  <div className="flex items-end justify-between">
                     <h2 className="text-2xl font-bold text-slate-100">{account.balance}</h2>
                     <span className={`text-xs font-bold text-${account.trend.startsWith('+') ? 'emerald' : 'rose'}-400`}>
                        {account.trend} ce mois
                     </span>
                  </div>
               </div>
            ))}
          </div>

          {/* Table Transactions */}
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden mt-4">
             <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
                <h3 className="font-semibold">Dernières Opérations Bancaires</h3>
                <button className="text-sm text-indigo-400 hover:text-indigo-300">Voir tout</button>
             </div>
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700/50">
                  <tr>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Libellé</th>
                    <th className="p-4 font-medium">Banque</th>
                    <th className="p-4 font-medium text-right">Débit</th>
                    <th className="p-4 font-medium text-right">Crédit</th>
                    <th className="p-4 font-medium text-center">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {[
                    { date: '29 Oct 2024', label: 'Virement Client ALPHA', bank: 'BNP Paribas', debit: '', credit: '+ 4,500.00', status: 'Rapproché', color: 'emerald' },
                    { date: '28 Oct 2024', label: 'Prélèvement URSSAF', bank: 'Société Générale', debit: '- 2,340.00', credit: '', status: 'En attente', color: 'amber' },
                    { date: '27 Oct 2024', label: 'Paiement Fournisseur BETA', bank: 'BNP Paribas', debit: '- 1,200.00', credit: '', status: 'Rapproché', color: 'emerald' },
                  ].map((trx, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4">{trx.date}</td>
                      <td className="p-4 font-medium">{trx.label}</td>
                      <td className="p-4 text-slate-400">{trx.bank}</td>
                      <td className="p-4 text-right text-rose-400 font-medium">{trx.debit}</td>
                      <td className="p-4 text-right text-emerald-400 font-medium">{trx.credit}</td>
                      <td className="p-4">
                        <div className={`mx-auto w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-${trx.color}-500/10 text-${trx.color}-400 border border-${trx.color}-500/20`}>
                          {trx.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </motion.div>
      )}

      {/* Rapprochement */}
      {activeTab === 'rapprochement' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                 <Landmark size={18} className="text-indigo-400" />
                 Relevé Bancaire
              </h3>
              <div className="space-y-3">
                 {[
                   { date: '29 Oct', label: 'VIR CLIENT X', amount: '+ 1,500.00', match: true },
                   { date: '28 Oct', label: 'PRLV EDF', amount: '- 450.00', match: false },
                   { date: '27 Oct', label: 'CHQ 456789', amount: '- 1,200.00', match: false },
                 ].map((op, i) => (
                   <div key={i} className={`flex justify-between items-center p-3 rounded-lg border ${op.match ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
                      <div>
                         <p className="text-xs text-slate-400">{op.date}</p>
                         <p className="font-medium">{op.label}</p>
                      </div>
                      <p className={`font-bold ${op.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{op.amount}</p>
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="card">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                 <Wallet size={18} className="text-emerald-400" />
                 Écritures Comptables
              </h3>
              <div className="space-y-3">
                 {[
                   { date: '29 Oct', label: 'Règlement Facture F-2024-100', amount: '+ 1,500.00', match: true },
                   { date: '26 Oct', label: 'Paiement Fournisseur Y', amount: '- 1,200.00', match: false },
                 ].map((op, i) => (
                   <div key={i} className={`flex justify-between items-center p-3 rounded-lg border ${op.match ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
                      <div>
                         <p className="text-xs text-slate-400">{op.date}</p>
                         <p className="font-medium">{op.label}</p>
                      </div>
                      <p className={`font-bold ${op.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{op.amount}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
             <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                <ArrowRightLeft size={18} />
                Lancer le Rapprochement Automatique
             </button>
          </div>
        </motion.div>
      )}

      {/* Prévisions */}
      {activeTab === 'previsions' && (
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card flex flex-col items-center justify-center h-96 border-dashed"
         >
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <TrendingUp size={32} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Prévisions de Trésorerie</h3>
            <p className="text-slate-400 max-w-md text-center mb-6">
              Anticipez vos besoins de liquidités. Ce module croise vos factures en attente, vos charges récurrentes et l'historique de votre BFR.
            </p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
              Générer le rapport prévisionnel
            </button>
         </motion.div>
      )}
      
      {/* Caisse */}
      {activeTab === 'caisse' && (
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card flex flex-col items-center justify-center h-96 border-dashed"
         >
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <Wallet size={32} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Gestion de la Caisse</h3>
            <p className="text-slate-400 max-w-md text-center mb-6">
              Saisissez les mouvements d'espèces, éditez les brouillards de caisse et effectuez vos arrêtés journaliers.
            </p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
              Ouvrir la caisse du jour
            </button>
         </motion.div>
      )}

    </div>
  );
};

export default TreasuryModule;
