import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, Landmark, ArrowRightLeft, TrendingUp, TrendingDown,
  Search, Plus, Filter, Download, ArrowUpRight, 
  ArrowDownRight, CreditCard, ShieldCheck, RefreshCw,
  Eye, Calendar, CheckCircle2, AlertCircle, FileText,
  ChevronRight, ArrowLeftRight, Activity, BrainCircuit,
  Printer, History
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
    <div className="flex flex-col h-full gap-8">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 rounded-xl border border-[#cbd5e1] shadow-sm">
        <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1] shadow-inner overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-2.5 rounded text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-[#005eb8] shadow-sm border border-[#cbd5e1]'
                  : 'text-[#64748b] hover:text-[#0f172a] hover:bg-white/50'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={handleRefresh}
             className={`p-3 rounded-xl bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#005eb8] hover:bg-blue-50 transition-all shadow-sm ${isRefreshing ? 'animate-spin' : ''}`}
           >
              <RefreshCw size={20} />
           </button>
           <button className="flex items-center gap-3 px-8 py-2.5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg">
              <Plus size={20} />
              Nouveau Transfert
           </button>
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
            className="flex flex-col gap-8 h-full"
          >
            {/* Bank Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BankCard 
                bank="Ecobank Sénégal" 
                acc="SN012 01001 0123456789 01" 
                balance="125 450 000" 
                type="Compte Courant Institutionnel" 
                color="blue" 
                trend="+2.4%" 
                icon={<Landmark size={28} />}
              />
              <BankCard 
                bank="CBAO Groupe Attijari" 
                acc="SN012 08008 9876543210 99" 
                balance="45 230 000" 
                type="Compte d'Investissement" 
                color="green" 
                trend="+0.5%" 
                icon={<ShieldCheck size={28} />}
              />
              <BankCard 
                bank="Société Générale (SGBS)" 
                acc="SN012 03003 1112223334 55" 
                balance="12 400 000" 
                type="Compte Devises (USD)" 
                color="orange" 
                trend="-1.2%" 
                icon={<CreditCard size={28} />}
              />
            </div>

            {/* Recent Bank Transactions */}
            <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex-1 flex flex-col">
               <div className="p-6 border-b border-[#cbd5e1] flex justify-between items-center bg-[#f8fafc]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                      <ArrowLeftRight size={20} />
                    </div>
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Derniers Mouvements Bancaires Consolidés</h3>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#005eb8] transition-colors" size={18} />
                      <input 
                        type="text" 
                        placeholder="Recherche (Libellé, Montant)..." 
                        className="pl-12 pr-6 py-2.5 bg-white border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#334155] placeholder:text-[#94a3b8] uppercase tracking-tight outline-none focus:border-[#005eb8] transition-all w-64 shadow-inner"
                      />
                    </div>
                    <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#0f172a] transition-all shadow-sm">
                      <Download size={20} />
                    </button>
                  </div>
               </div>
               <div className="overflow-auto flex-1">
                 <table className="w-full text-left whitespace-nowrap border-collapse">
                    <thead className="bg-[#f8fafc] text-[#64748b] border-b-2 border-[#cbd5e1] sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Date & Valeur</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Libellé de l'opération</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-center">Établissement</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">Débit (Flux -)</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">Crédit (Flux +)</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-center">Rapprochement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {[
                        { date: '29 OCT 2024', label: 'Virement Client GLOBAL TECH SA (FAC-2024-44)', bank: 'Ecobank', debit: '', credit: '4 500 000', status: 'Rapproché', color: 'green' },
                        { date: '28 OCT 2024', label: 'Paiement Facture SENELEC (Période OCT)', bank: 'CBAO', debit: '1 250 000', credit: '', status: 'En attente', color: 'orange' },
                        { date: '27 OCT 2024', label: 'Virement Salaire Mensuel (Admin Basis)', bank: 'Ecobank', debit: '850 000', credit: '', status: 'Rapproché', color: 'green' },
                        { date: '26 OCT 2024', label: 'Dépôt Espèces (Recette Journalière Magasin)', bank: 'SGBS', debit: '', credit: '320 000', status: 'En attente', color: 'orange' },
                      ].map((trx, i) => (
                        <tr key={i} className="hover:bg-blue-50/30 transition-all group cursor-pointer">
                          <td className="px-8 py-5 border-r border-[#f1f5f9]">
                            <div className="flex flex-col">
                              <span className="text-[#334155] font-mono font-bold text-xs tracking-tighter uppercase">{trx.date}</span>
                              <span className="text-[9px] text-[#94a3b8] uppercase font-bold tracking-widest mt-0.5 opacity-70 italic">V: {trx.date}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 font-bold text-[#334155] text-xs uppercase tracking-tight group-hover:text-[#005eb8] transition-colors border-r border-[#f1f5f9]">{trx.label}</td>
                          <td className="px-8 py-5 text-center border-r border-[#f1f5f9]">
                            <span className="px-3 py-1 bg-[#f8fafc] border border-[#cbd5e1] rounded text-[9px] font-bold uppercase tracking-widest text-[#64748b]">{trx.bank}</span>
                          </td>
                          <td className="px-8 py-5 text-right text-[#dc2626] font-bold text-sm tracking-tighter border-r border-[#f1f5f9] bg-red-50/10">{trx.debit ? `- ${trx.debit}` : ''}</td>
                          <td className="px-8 py-5 text-right text-[#107e3e] font-bold text-sm tracking-tighter border-r border-[#f1f5f9] bg-green-50/10">{trx.credit ? `+ ${trx.credit}` : ''}</td>
                          <td className="px-8 py-5">
                            <div className={`mx-auto w-fit px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                              trx.color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'
                            }`}>
                              {trx.status === 'Rapproché' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} className="animate-pulse" />}
                              {trx.status}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
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
            className="flex flex-col gap-8 h-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bancaire Section */}
              <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 text-[#005eb8]">
                    <FileText size={20} />
                    Relevé Bancaire Institutionnel
                  </h3>
                  <button className="text-[10px] font-bold text-[#64748b] hover:text-[#0f172a] uppercase tracking-widest border border-[#cbd5e1] px-4 py-2 rounded-lg bg-[#f8fafc] hover:bg-white transition-all shadow-sm">
                    Importer .MT940
                  </button>
                </div>
                <div className="space-y-4">
                   {[
                     { date: '29 OCT', label: 'VIR CLIENT GLOBAL TECH', amount: '+ 1 500 000 F', match: true },
                     { date: '28 OCT', label: 'SENELEC FACTURE OCTOBRE', amount: '- 1 250 000 F', match: true },
                     { date: '27 OCT', label: 'FRAIS TENUE COMPTE BK', amount: '- 15 000 F', match: false },
                   ].map((op, i) => (
                     <div key={i} className={`flex justify-between items-center p-6 rounded-2xl border transition-all ${op.match ? 'bg-green-50/50 border-green-200' : 'bg-[#f8fafc] border-[#cbd5e1] shadow-inner'}`}>
                        <div className="flex items-center gap-4">
                           <div className={`p-2.5 rounded-xl border ${op.match ? 'bg-white text-[#107e3e] border-green-100 shadow-sm' : 'bg-white text-orange-600 border-[#cbd5e1]'}`}>
                              {op.match ? <CheckCircle2 size={18} /> : <AlertCircle size={18} className="animate-pulse" />}
                           </div>
                           <div>
                              <p className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest">{op.date}</p>
                              <p className="font-bold text-[#334155] text-xs uppercase tracking-tight">{op.label}</p>
                           </div>
                        </div>
                        <p className={`font-black tracking-tighter text-sm ${op.amount.startsWith('+') ? 'text-[#107e3e]' : 'text-[#dc2626]'}`}>{op.amount}</p>
                     </div>
                   ))}
                </div>
              </div>
              
              {/* Comptabilité Section */}
              <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 text-[#107e3e]">
                    <History size={20} />
                    Grand Livre de Trésorerie
                  </h3>
                  <button className="text-[10px] font-bold text-[#64748b] hover:text-[#0f172a] uppercase tracking-widest border border-[#cbd5e1] px-4 py-2 rounded-lg bg-[#f8fafc] hover:bg-white transition-all shadow-sm">
                    Journal 521000
                  </button>
                </div>
                <div className="space-y-4">
                   {[
                     { date: '29 OCT', label: 'Règlement Facture Client F-2024-44', amount: '+ 1 500 000 F', match: true },
                     { date: '28 OCT', label: 'Virement Fournisseur SENELEC', amount: '- 1 250 000 F', match: true },
                     { date: '26 OCT', label: 'Règlement Facture Client F-2024-45', amount: '+ 450 000 F', match: false },
                   ].map((op, i) => (
                     <div key={i} className={`flex justify-between items-center p-6 rounded-2xl border transition-all ${op.match ? 'bg-green-50/50 border-green-200' : 'bg-[#f8fafc] border-[#cbd5e1] shadow-inner'}`}>
                        <div className="flex items-center gap-4">
                           <div className={`p-2.5 rounded-xl border ${op.match ? 'bg-white text-[#107e3e] border-green-100 shadow-sm' : 'bg-white text-orange-600 border-[#cbd5e1]'}`}>
                              {op.match ? <CheckCircle2 size={18} /> : <AlertCircle size={18} className="animate-pulse" />}
                           </div>
                           <div>
                              <p className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest">{op.date}</p>
                              <p className="font-bold text-[#334155] text-xs uppercase tracking-tight">{op.label}</p>
                           </div>
                        </div>
                        <p className={`font-black tracking-tighter text-sm ${op.amount.startsWith('+') ? 'text-[#107e3e]' : 'text-[#dc2626]'}`}>{op.amount}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-6 bg-white p-12 rounded-xl border-2 border-dashed border-[#cbd5e1] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-[#005eb8] to-emerald-500"></div>
               <div className="flex gap-12 relative z-10">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-[#94a3b8] tracking-[0.2em] mb-2">Écarts de rapprochement</p>
                    <p className="text-4xl font-black text-[#dc2626] tracking-tighter">465 000 F</p>
                  </div>
                  <div className="w-px h-16 bg-[#cbd5e1]" />
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-[#94a3b8] tracking-[0.2em] mb-2">Qualité du Matching (IA)</p>
                    <p className="text-4xl font-black text-[#107e3e] tracking-tighter">82%</p>
                  </div>
               </div>
               <button className="px-12 py-5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-[2rem] font-bold text-[11px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20 flex items-center gap-4 group/btn relative z-10">
                  <BrainCircuit size={22} className="group-hover/btn:scale-110 transition-transform" />
                  Exécuter le Rapprochement Intelligent Joule
               </button>
            </div>
          </motion.div>
        )}

        {/* Petite Caisse */}
        {activeTab === 'caisse' && (
          <motion.div
            key="caisse"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-white border border-[#cbd5e1] rounded-xl flex flex-col items-center justify-center p-24 shadow-sm relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-50"></div>
            <div className="w-28 h-28 bg-[#f8fafc] rounded-[2.5rem] flex items-center justify-center mb-10 shadow-inner border border-[#cbd5e1] relative group">
               <Wallet size={54} className="text-orange-500 group-hover:scale-110 transition-transform" />
               <div className="absolute -bottom-2 -right-2 bg-white border border-orange-100 p-2 rounded-xl shadow-lg">
                  <Activity size={24} className="text-orange-500 animate-pulse" />
               </div>
            </div>
            <h3 className="text-3xl font-bold uppercase tracking-tighter text-[#0f172a]">Gestion Institutionnelle de la Caisse</h3>
            <p className="text-[#64748b] max-w-lg text-center mt-6 text-[12px] font-bold uppercase tracking-widest leading-relaxed opacity-70">
              Pilotez vos flux d'espèces en temps réel. Édition automatique du brouillard de caisse, arrêtés journaliers certifiés et gestion des bons de caisse numérisés.
            </p>
            <div className="flex gap-4 mt-12">
               <button className="px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-[2rem] text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 transition-all flex items-center gap-4">
                 <History size={22} />
                 Ouvrir le Journal de Caisse
               </button>
               <button className="px-10 py-5 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-[2rem] text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-4 shadow-sm">
                 <Printer size={20} />
                 Dernier Arrêté
               </button>
            </div>
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
  <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 group hover:border-[#005eb8] transition-all cursor-pointer relative overflow-hidden shadow-sm">
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full ${color === 'blue' ? 'bg-[#005eb8]' : color === 'green' ? 'bg-[#107e3e]' : 'bg-orange-500'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-8 relative z-10">
       <div>
          <h3 className="font-bold text-lg text-[#0f172a] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{bank}</h3>
          <p className="text-[11px] text-[#94a3b8] font-mono font-bold mt-2 tracking-widest opacity-80">{acc}</p>
       </div>
       <div className={`p-4 rounded-2xl border shadow-inner transition-transform group-hover:scale-110 ${
         color === 'blue' ? 'bg-blue-50 text-[#005eb8] border-blue-100' : 
         color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-100' : 
         'bg-orange-50 text-orange-600 border-orange-100'
       }`}>
          {icon}
       </div>
    </div>
    <p className="text-[10px] font-bold uppercase text-[#64748b] mb-2 tracking-[0.2em]">{type}</p>
    <div className="flex items-end justify-between relative z-10">
       <h2 className="text-3xl font-black text-[#0f172a] tracking-tighter">{balance} <span className="text-sm font-bold text-[#94a3b8]">F CFA</span></h2>
       <div className="flex flex-col items-end">
          <span className={`text-[11px] font-bold uppercase tracking-widest ${trend.startsWith('+') ? 'text-[#107e3e]' : 'text-[#dc2626]'} flex items-center gap-2`}>
             {trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
             {trend}
          </span>
          <span className="text-[8px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] mt-1 italic">Vs Mois N-1</span>
       </div>
    </div>
    <div className="mt-6 pt-6 border-t border-[#f1f5f9] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-0 translate-y-2">
       <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#005eb8] hover:underline flex items-center gap-2">
          <Eye size={16} /> Détails de compte
       </button>
       <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] hover:text-[#0f172a] flex items-center gap-2">
          <Calendar size={16} /> Relevés mensuels
       </button>
    </div>
  </div>
);

export default TreasuryModule;
