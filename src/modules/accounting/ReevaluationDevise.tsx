import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, RefreshCw, DollarSign, ArrowRightLeft, 
  TrendingDown, TrendingUp, Calendar, Save, Globe, 
  Info, CheckCircle2, AlertCircle, History, FileText
} from 'lucide-react';

const ReevaluationDevise = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('Lowest Value Principle');

  const ecritures = [
    { id: 1, compte: '4010001', intitule: 'FOURNISSEUR TECH-GLOBAL', devise: 'USD', soldeDevise: 50000, coursOrigine: 610, coursActuel: 625, ecart: 750000, type: 'Perte de change latente' },
    { id: 2, compte: '4110001', intitule: 'CLIENT ALPHA INTERNATIONAL', devise: 'EUR', soldeDevise: 120000, coursOrigine: 655.957, coursActuel: 655.957, ecart: 0, type: 'Aucun' },
    { id: 3, compte: '4010005', intitule: 'GLOBAL TRADING LTD', devise: 'USD', soldeDevise: 85000, coursOrigine: 630, coursActuel: 625, ecart: -425000, type: 'Gain de change latent' },
  ];

  const handleRevaluation = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-inner text-amber-400">
              <Globe size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Réévaluation de Devises (FAGL_FC_VAL)</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Standard SAP FI-GL • Évaluation des postes non soldés</p>
           </div>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              <History size={16} /> Historique Runs
           </button>
           <button 
             onClick={handleRevaluation}
             disabled={isProcessing}
             className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20"
           >
              {isProcessing ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              {isProcessing ? 'Calcul en cours...' : 'Comptabiliser le Run'}
           </button>
        </div>
      </div>

      {/* FX Rates Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <RateCard currency="USD" rate="625.40" trend="+0.2%" color="amber" />
         <RateCard currency="EUR" rate="655.957" trend="FIXE" color="indigo" />
         <RateCard currency="GBP" rate="764.20" trend="-0.5%" color="rose" />
         <div className="card bg-slate-800/20 border-slate-700/50 flex flex-col justify-center p-6">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Méthode d'Évaluation</p>
            <select 
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-200 outline-none focus:border-indigo-500"
            >
               <option>Lowest Value Principle</option>
               <option>Strict Value Principle</option>
               <option>Always Revaluate</option>
            </select>
         </div>
      </div>

      {/* Main Analysis Table */}
      <div className="card bg-slate-800/20 border-slate-700/50 flex flex-col flex-1 overflow-hidden shadow-2xl">
         <div className="p-4 border-b border-slate-700/50 bg-slate-800/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
               <h4 className="text-xs font-black uppercase tracking-widest text-white">Analyse des Écarts de Conversion Latents</h4>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg border border-slate-700">
               <Calendar size={14} className="text-slate-500" />
               <span className="text-[10px] font-black text-slate-400 uppercase">Période : Avril 2024</span>
            </div>
         </div>

         <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-800/80 border-b border-slate-700 font-black uppercase text-[10px] tracking-widest text-slate-500">
                  <tr>
                     <th className="p-6">Compte / Tiers</th>
                     <th className="p-6 text-center">Devise</th>
                     <th className="p-6 text-right">Solde Devise</th>
                     <th className="p-6 text-right">Cours d'Origine</th>
                     <th className="p-6 text-right">Cours Actuel</th>
                     <th className="p-6 text-right">Écart Latent (XOF)</th>
                     <th className="p-6 text-center">Recommandation</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-700/30">
                  {ecritures.map((e) => (
                    <tr key={e.id} className="group hover:bg-slate-700/20 transition-all cursor-pointer">
                       <td className="p-6">
                          <div className="flex flex-col">
                             <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{e.intitule}</span>
                             <span className="text-[10px] font-mono text-slate-500 font-black tracking-widest">{e.compte}</span>
                          </div>
                       </td>
                       <td className="p-6 text-center">
                          <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-black text-indigo-400">{e.devise}</span>
                       </td>
                       <td className="p-6 text-right font-black text-slate-200">
                          {e.soldeDevise.toLocaleString()}
                       </td>
                       <td className="p-6 text-right font-bold text-slate-500">
                          {e.coursOrigine}
                       </td>
                       <td className="p-6 text-right font-bold text-slate-300">
                          {e.coursActuel}
                       </td>
                       <td className={`p-6 text-right font-black text-sm ${
                          e.ecart > 0 ? 'text-rose-400' : e.ecart < 0 ? 'text-emerald-400' : 'text-slate-600'
                       }`}>
                          {e.ecart > 0 ? '+' : ''}{e.ecart.toLocaleString()}
                       </td>
                       <td className="p-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-inner ${
                             e.type.includes('Perte') ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                             e.type.includes('Gain') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                             'bg-slate-800 border-slate-700 text-slate-500'
                          }`}>
                             {e.type === 'Aucun' ? 'Aucun écart' : e.type}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-6 border-t border-slate-700/50 bg-slate-800/30 flex justify-between items-center">
            <div className="flex gap-8">
               <SummaryItem label="Total Pertes Latentes" value="750 000 F" color="rose" />
               <SummaryItem label="Total Gains Latents" value="425 000 F" color="emerald" />
               <SummaryItem label="Impact Net Résultat" value="-325 000 F" color="amber" />
            </div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Calculé selon IAS 21 / SYSCOHADA</p>
         </div>
      </div>

      {/* Info Message */}
      <div className="bg-indigo-600/5 border border-indigo-500/20 p-6 rounded-3xl flex items-center gap-6">
         <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 shadow-inner border border-indigo-500/10">
            <Info size={24} />
         </div>
         <div className="flex-1">
            <h5 className="text-sm font-black text-white uppercase tracking-widest mb-1">Traitement de fin de mois</h5>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
               Le run de réévaluation créera automatiquement une pièce comptable dans le journal des OD (Opérations Diverses) pour constater les écarts. 
               Ces écritures seront contre-passées au 01/{new Date().getMonth() + 2}/{new Date().getFullYear()} pour repartir sur les cours d'origine.
            </p>
         </div>
         <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
            <FileText size={16} /> Rapport d'Exécution
         </button>
      </div>
    </div>
  );
};

const RateCard = ({ currency, rate, trend, color }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden shadow-xl border-slate-700/50">
    <div className={`absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-2">
       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{currency} / XOF</p>
       <span className={`text-[10px] font-black px-1.5 py-0.5 rounded bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>{trend}</span>
    </div>
    <h3 className="text-xl font-black text-white">{rate}</h3>
    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter mt-2">Cours de clôture BCEAO</p>
  </div>
);

const SummaryItem = ({ label, value, color }: any) => (
  <div className="flex flex-col">
     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</span>
     <span className={`text-sm font-black text-${color}-400`}>{value}</span>
  </div>
);

export default ReevaluationDevise;
