import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, Landmark, ArrowRightLeft, TrendingUp, TrendingDown,
  Search, Plus, Filter, Download, ArrowUpRight, 
  ArrowDownRight, CreditCard, ShieldCheck, RefreshCw,
  Eye, Calendar, CheckCircle2, AlertCircle, FileText
} from 'lucide-react';
import CashForecasting from './CashForecasting';

const TreasuryModule = () => {
  const [activeTab, setActiveTab] = useState('banques');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs = [
    { id: 'banques', label: 'Comptes Bancaires', icon: Landmark },
    { id: 'caisse', label: 'Petite Caisse', icon: Wallet },
    { id: 'rapprochement', label: 'Rapprochement', icon: ArrowRightLeft },
    { id: 'previsions', label: 'Flux de Trésorerie', icon: TrendingUp },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
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
          <div className="flex items-center gap-3">
             <button 
               onClick={handleRefresh}
               className={`p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all ${isRefreshing ? 'animate-spin' : ''}`}
             >
                <RefreshCw size={18} />
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
                <Plus size={16} />
                Nouveau Transfert
             </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Comptes Bancaires */}
        {activeTab === 'banques' && (
          <motion.div
            key="banques"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            {/* Bank Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BankCard 
                bank="Ecobank Sénégal" 
                acc="SN012 01001 0123456789 01" 
                balance="125 450 000 F" 
                type="Compte Courant" 
                color="indigo" 
                trend="+2.4%" 
                icon={<Landmark className="text-indigo-400" size={24} />}
              />
              <BankCard 
                bank="CBAO Groupe Attijari" 
                acc="SN012 08008 9876543210 99" 
                balance="45 230 000 F" 
                type="Compte d'Investissement" 
                color="emerald" 
                trend="+0.5%" 
                icon={<ShieldCheck className="text-emerald-400" size={24} />}
              />
              <BankCard 
                bank="Société Générale (SGBS)" 
                acc="SN012 03003 1112223334 55" 
                balance="12 400 000 F" 
                type="Compte Devises (USD)" 
                color="amber" 
                trend="-1.2%" 
                icon={<CreditCard className="text-amber-400" size={24} />}
              />
            </div>

            {/* Recent Bank Transactions */}
            <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl">
               <div className="p-5 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                      <ArrowRightLeft size={18} />
                    </div>
                    <h3 className="font-black text-sm uppercase tracking-widest">Derniers Mouvements Bancaires</h3>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                      <input 
                        type="text" 
                        placeholder="Filtrer..." 
                        className="pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs outline-none focus:border-indigo-500 transition-all w-48"
                      />
                    </div>
                    <button className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 hover:text-white">
                      <Download size={16} />
                    </button>
                  </div>
               </div>
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-800/80 text-slate-500 border-b border-slate-700/50">
                    <tr>
                      <th className="p-4 font-bold uppercase text-[10px] tracking-tighter">Date & Valeur</th>
                      <th className="p-4 font-bold uppercase text-[10px] tracking-tighter">Nature de l'opération</th>
                      <th className="p-4 font-bold uppercase text-[10px] tracking-tighter text-center">Banque</th>
                      <th className="p-4 font-bold uppercase text-[10px] tracking-tighter text-right">Débit (Sortie)</th>
                      <th className="p-4 font-bold uppercase text-[10px] tracking-tighter text-right">Crédit (Entrée)</th>
                      <th className="p-4 font-bold uppercase text-[10px] tracking-tighter text-center">Rapprochement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {[
                      { date: '29 Oct 2024', label: 'Virement Client GLOBAL TECH SA', bank: 'Ecobank', debit: '', credit: '+ 4 500 000 F', status: 'Rapproché', color: 'emerald' },
                      { date: '28 Oct 2024', label: 'Paiement Facture SENELEC (F110)', bank: 'CBAO', debit: '- 1 250 000 F', credit: '', status: 'En attente', color: 'amber' },
                      { date: '27 Oct 2024', label: 'Virement Salaire Octobre (MAT-001)', bank: 'Ecobank', debit: '- 850 000 F', credit: '', status: 'Rapproché', color: 'emerald' },
                      { date: '26 Oct 2024', label: 'Dépôt Espèces (Recette Magasin)', bank: 'SGBS', debit: '', credit: '+ 320 000 F', status: 'En attente', color: 'amber' },
                    ].map((trx, i) => (
                      <tr key={i} className="hover:bg-indigo-500/5 transition-colors group">
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-slate-300 font-medium">{trx.date}</span>
                            <span className="text-[10px] text-slate-500 uppercase">Val: {trx.date}</span>
                          </div>
                        </td>
                        <td className="p-4 font-bold text-slate-100">{trx.label}</td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-400 font-bold uppercase">{trx.bank}</span>
                        </td>
                        <td className="p-4 text-right text-rose-400 font-black">{trx.debit}</td>
                        <td className="p-4 text-right text-emerald-400 font-black">{trx.credit}</td>
                        <td className="p-4">
                          <div className={`mx-auto w-fit px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-${trx.color}-500/10 text-${trx.color}-400 border border-${trx.color}-500/20 flex items-center gap-1.5`}>
                            {trx.status === 'Rapproché' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
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
            key="rapprochement"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bancaire Section */}
              <div className="card border-indigo-500/20 bg-indigo-500/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-indigo-400">
                    <FileText size={16} />
                    Relevé Bancaire (Banque)
                  </h3>
                  <button className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest border border-slate-700 px-3 py-1 rounded-lg">
                    Importer relevé
                  </button>
                </div>
                <div className="space-y-3">
                   {[
                     { date: '29 Oct', label: 'VIR CLIENT X', amount: '+ 1 500 000 F', match: true },
                     { date: '28 Oct', label: 'SENELEC FAC 450', amount: '- 1 250 000 F', match: true },
                     { date: '27 Oct', label: 'COMMISSION BK', amount: '- 15 000 F', match: false },
                   ].map((op, i) => (
                     <div key={i} className={`flex justify-between items-center p-4 rounded-xl border transition-all ${op.match ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="flex items-center gap-3">
                           {op.match ? <CheckCircle2 size={16} className="text-emerald-400" /> : <AlertCircle size={16} className="text-amber-400" />}
                           <div>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">{op.date}</p>
                              <p className="font-bold text-slate-200 text-sm">{op.label}</p>
                           </div>
                        </div>
                        <p className={`font-black ${op.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{op.amount}</p>
                     </div>
                   ))}
                </div>
              </div>
              
              {/* Comptabilité Section */}
              <div className="card border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-emerald-400">
                    <Landmark size={16} />
                    Grand Livre (Comptabilité)
                  </h3>
                  <button className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest border border-slate-700 px-3 py-1 rounded-lg">
                    Voir Journal BK
                  </button>
                </div>
                <div className="space-y-3">
                   {[
                     { date: '29 Oct', label: 'Règlement Facture F-2024-100', amount: '+ 1 500 000 F', match: true },
                     { date: '28 Oct', label: 'Paiement Fournisseur SENELEC', amount: '- 1 250 000 F', match: true },
                     { date: '26 Oct', label: 'Règlement Facture F-2024-105', amount: '+ 450 000 F', match: false },
                   ].map((op, i) => (
                     <div key={i} className={`flex justify-between items-center p-4 rounded-xl border transition-all ${op.match ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="flex items-center gap-3">
                           {op.match ? <CheckCircle2 size={16} className="text-emerald-400" /> : <AlertCircle size={16} className="text-amber-400" />}
                           <div>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">{op.date}</p>
                              <p className="font-bold text-slate-200 text-sm">{op.label}</p>
                           </div>
                        </div>
                        <p className={`font-black ${op.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{op.amount}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4 bg-slate-800/30 p-8 rounded-3xl border border-slate-700/50 border-dashed">
               <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Écarts de rapprochement</p>
                    <p className="text-xl font-black text-rose-400">465 000 F</p>
                  </div>
                  <div className="w-px h-10 bg-slate-700" />
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Taux de matching</p>
                    <p className="text-xl font-black text-emerald-400">82%</p>
                  </div>
               </div>
               <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/30 flex items-center gap-3">
                  <RefreshCw size={18} />
                  Exécuter le Rapprochement Intelligent (IA)
               </button>
            </div>
          </motion.div>
        )}

        {/* Petite Caisse */}
        {activeTab === 'caisse' && (
          <motion.div
            key="caisse"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card flex flex-col items-center justify-center h-96 border-dashed"
          >
            <div className="w-20 h-20 bg-slate-800/50 rounded-3xl flex items-center justify-center mb-6 border border-slate-700 shadow-inner">
               <Wallet size={32} className="text-amber-400" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-[0.1em]">Gestion de la Caisse</h3>
            <p className="text-slate-500 max-w-sm text-center mt-3 text-sm font-medium">
              Suivez les entrées et sorties en espèces. Édition automatique du brouillard de caisse et arrêtés journaliers.
            </p>
            <button className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-500/20">
              Ouvrir le journal de caisse
            </button>
          </motion.div>
        )}

        {/* Prévisions de Trésorerie */}
        {activeTab === 'previsions' && (
          <motion.div
            key="previsions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
          >
             <CashForecasting />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BankCard = ({ bank, acc, balance, type, color, trend, icon }: any) => (
  <div className={`card group hover:border-${color}-500/50 transition-all cursor-pointer relative overflow-hidden shadow-xl`}>
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-6">
       <div className="z-10">
          <h3 className="font-black text-base text-slate-100 group-hover:text-white transition-colors">{bank}</h3>
          <p className="text-[10px] text-slate-500 font-mono mt-1 tracking-tighter">{acc}</p>
       </div>
       <div className={`p-3 rounded-2xl bg-${color}-500/10 transition-all group-hover:scale-110 shadow-inner`}>
          {icon}
       </div>
    </div>
    <p className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">{type}</p>
    <div className="flex items-end justify-between z-10">
       <h2 className="text-xl font-black text-slate-100 group-hover:text-indigo-400 transition-all">{balance}</h2>
       <div className="flex flex-col items-end">
          <span className={`text-[10px] font-black ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'} flex items-center gap-1`}>
             {trend.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
             {trend}
          </span>
          <span className="text-[8px] font-bold text-slate-600 uppercase">vs M-1</span>
       </div>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all">
       <button className="text-[9px] font-black uppercase text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
          <Eye size={12} /> Détails
       </button>
       <button className="text-[9px] font-black uppercase text-slate-500 hover:text-white flex items-center gap-1">
          <Calendar size={12} /> Relevés
       </button>
    </div>
  </div>
);

const AlertItem = ({ type, msg, impact }: any) => (
  <div className={`flex items-start gap-4 p-4 rounded-2xl border ${
    type === 'Avertissement' ? 'bg-rose-500/5 border-rose-500/20' : 
    type === 'Opportunité' ? 'bg-emerald-500/5 border-emerald-500/20' : 
    'bg-indigo-500/5 border-indigo-500/20'
  }`}>
     <div className={`mt-1 p-1.5 rounded-lg ${
       type === 'Avertissement' ? 'text-rose-400' : 
       type === 'Opportunité' ? 'text-emerald-400' : 
       'text-indigo-400'
     }`}>
        <AlertCircle size={14} />
     </div>
     <div className="flex-1">
        <p className="text-xs font-bold text-slate-200">{msg}</p>
        <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">Impact : <span className={impact.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}>{impact}</span></p>
     </div>
  </div>
);

export default TreasuryModule;
