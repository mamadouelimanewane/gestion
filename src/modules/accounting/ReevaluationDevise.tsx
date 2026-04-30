import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, RefreshCw, DollarSign, ArrowRightLeft, 
  TrendingDown, TrendingUp, Calendar, Save, Globe, 
  Info, CheckCircle2, AlertCircle, History, FileText,
  Database, Layers, ShieldCheck, Zap, MoreVertical,
  ChevronRight, Printer, Download, Share2, ArrowRight,
  TrendingUp as TrendUpIcon, TrendingDown as TrendDownIcon
} from 'lucide-react';

const ReevaluationDevise = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('Lowest Value Principle');

  const ecritures = [
    { id: 1, compte: '4010001', intitule: 'FOURNISSEUR TECH-GLOBAL SA', devise: 'USD', soldeDevise: 50000, coursOrigine: 610, coursActuel: 625, ecart: 750000, type: 'Perte de change latente' },
    { id: 2, compte: '4110001', intitule: 'CLIENT ALPHA INTERNATIONAL (EU)', devise: 'EUR', soldeDevise: 120000, coursOrigine: 655.957, coursActuel: 655.957, ecart: 0, type: 'Aucun' },
    { id: 3, compte: '4010005', intitule: 'GLOBAL TRADING LOGISTICS LTD', devise: 'USD', soldeDevise: 85000, coursOrigine: 630, coursActuel: 625, ecart: -425000, type: 'Gain de change latent' },
  ];

  const handleRevaluation = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const formatCfa = (val: number) => {
    return val.toLocaleString('fr-FR') + ' F';
  };

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <Globe size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Réévaluation des Devises (FAGL_FC)</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Standard SAP FI-GL • Postes Non Soldés • Normes IAS 21 / OHADA</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-sm">
              <History size={18} /> Historique
           </button>
           <button 
             onClick={handleRevaluation}
             disabled={isProcessing}
             className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20"
           >
              {isProcessing ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
              {isProcessing ? 'Traitement...' : 'Exécuter Run'}
           </button>
        </div>
      </div>

      {/* FX Rates Synthesis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <RateCard currency="USD / XOF" rate="625.40" trend="+0.2%" color="amber" icon={<DollarSign size={20} />} />
         <RateCard currency="EUR / XOF" rate="655.957" trend="FIXE" color="blue" icon={<ArrowRightLeft size={20} />} />
         <RateCard currency="GBP / XOF" rate="764.20" trend="-0.5%" color="rose" icon={<Globe size={20} />} />
         
         <div className="bg-white border border-[#cbd5e1] rounded-2xl p-8 shadow-sm flex flex-col justify-center">
            <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
               <Layers size={14} /> Méthode d'Évaluation
            </label>
            <select 
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner appearance-none cursor-pointer text-[#334155]"
            >
               <option>Lowest Value Principle</option>
               <option>Strict Value Principle</option>
               <option>Always Revaluate (Full)</option>
            </select>
         </div>
      </div>

      {/* Main Analysis Table Container */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[500px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Zap size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Calcul des Écarts Latents par Poste Individuel</h3>
           </div>
           <div className="flex gap-6">
              <div className="flex items-center gap-3 px-6 py-2 bg-white border border-[#cbd5e1] rounded-xl shadow-sm">
                 <Calendar size={14} className="text-[#94a3b8]" />
                 <span className="text-[10px] font-black uppercase text-[#64748b] tracking-widest">Période de clôture : Avril 2024</span>
              </div>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-6">Compte / Tiers Institutionnel</th>
                <th className="px-10 py-6 text-center">Devise</th>
                <th className="px-10 py-6 text-right">Solde Origine</th>
                <th className="px-10 py-6 text-right">Cours Initial</th>
                <th className="px-10 py-6 text-right bg-blue-50/30 text-[#005eb8]">Cours de Clôture</th>
                <th className="px-10 py-6 text-right">Écart Latent (XOF)</th>
                <th className="px-10 py-6 text-center">Imputation Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {ecritures.map((e) => (
                <tr key={e.id} className="group hover:bg-blue-50/20 transition-all cursor-pointer">
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                    <div className="flex flex-col">
                       <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{e.intitule}</span>
                       <span className="text-[9px] font-mono font-bold text-[#94a3b8] tracking-widest mt-1 uppercase">{e.compte}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                     <span className="px-4 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-[10px] font-black text-[#005eb8] uppercase tracking-widest shadow-sm">{e.devise}</span>
                  </td>
                  <td className="px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-[#0f172a] text-sm tracking-tighter">
                     {e.soldeDevise.toLocaleString()}
                  </td>
                  <td className="px-10 py-6 text-right border-r border-[#f1f5f9] font-bold text-[#64748b] text-xs">
                     {e.coursOrigine}
                  </td>
                  <td className="px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-[#005eb8] text-sm bg-blue-50/10">
                     {e.coursActuel}
                  </td>
                  <td className={`px-10 py-6 text-right border-r border-[#f1f5f9] font-black text-base tracking-tighter ${
                    e.ecart > 0 ? 'text-[#dc2626] bg-red-50/5' : e.ecart < 0 ? 'text-[#107e3e] bg-green-50/5' : 'text-[#94a3b8]'
                  }`}>
                    {e.ecart > 0 ? '+' : ''}{e.ecart.toLocaleString()} F
                  </td>
                  <td className="px-10 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-[2rem] border text-[9px] font-black uppercase tracking-widest shadow-sm ${
                      e.type.includes('Perte') ? 'bg-red-50 text-[#dc2626] border-red-200' :
                      e.type.includes('Gain') ? 'bg-green-50 text-[#107e3e] border-green-200' :
                      'bg-[#f8fafc] text-[#64748b] border-[#cbd5e1]'
                    }`}>
                      {e.type === 'Aucun' ? 'Stable' : e.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Synthesis Dashboard Footer (SAP Style) */}
        <div className="bg-[#0f172a] text-white p-10 grid grid-cols-1 md:grid-cols-3 gap-12 shadow-[0_-10px_30px_rgba(0,0,0,0.2)] z-30">
           <div className="flex items-center gap-8 border-r border-slate-800 pr-10">
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-[#f87171] border border-red-500/20">
                 <TrendDownIcon size={28} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Cumul Pertes Latentes</span>
                 <p className="text-3xl font-black text-[#f87171] tracking-tighter mt-1">750 000 <span className="text-xs font-bold opacity-30">F</span></p>
              </div>
           </div>

           <div className="flex items-center gap-8 border-r border-slate-800 pr-10">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-[#4ade80] border border-green-500/20">
                 <TrendUpIcon size={28} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Cumul Gains Latents</span>
                 <p className="text-3xl font-black text-[#4ade80] tracking-tighter mt-1">425 000 <span className="text-xs font-bold opacity-30">F</span></p>
              </div>
           </div>

           <div className="flex items-center gap-8">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 border border-amber-500/20">
                 <DollarSign size={28} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Impact Net Provisionnel</span>
                 <p className="text-3xl font-black text-amber-400 tracking-tighter mt-1">- 325 000 <span className="text-xs font-bold opacity-30">F</span></p>
              </div>
           </div>
        </div>
      </div>

      {/* Info Warning (Morning Horizon Style) */}
      <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl flex items-center gap-8 shadow-sm group">
         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#005eb8] border border-blue-200 shadow-sm group-hover:scale-110 transition-transform">
            <Info size={32} />
         </div>
         <div className="flex-1">
            <h5 className="text-sm font-black text-[#0f172a] uppercase tracking-widest mb-1">Traitement de Clôture Périodique (FX Settlement)</h5>
            <p className="text-[11px] text-[#64748b] font-medium leading-relaxed uppercase tracking-tight opacity-80">
               Le run de réévaluation créera automatiquement une pièce comptable dans le journal des OD pour constater les écarts. 
               Ces écritures seront contre-passées au 01/{new Date().getMonth() + 2}/{new Date().getFullYear()} pour rétablir les cours historiques.
            </p>
         </div>
         <button className="px-8 py-3 bg-white border border-[#cbd5e1] text-[#005eb8] hover:text-[#0f172a] hover:border-[#005eb8] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-3">
            <FileText size={18} /> Rapport d'Exécution
         </button>
      </div>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={28} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Conformité IAS 21 / SYSCOHADA Certifiée</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Les cours de clôture sont synchronisés avec le référentiel BCEAO • Intégrité des calculs validée par Joule AI Financial Audit.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <History size={20} className="group-hover:rotate-[-45deg] transition-transform" /> Logs de Revaluation
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={20} className="group-hover:rotate-12 transition-transform" /> Partager Rapport
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

const RateCard = ({ currency, rate, trend, color, icon }: any) => (
  <div className="bg-white border border-[#cbd5e1] p-8 rounded-2xl relative overflow-hidden group hover:border-[#005eb8] transition-all shadow-sm cursor-pointer">
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full ${color === 'blue' ? 'bg-[#005eb8]' : color === 'amber' ? 'bg-amber-500' : 'bg-[#dc2626]'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
       <p className="text-[11px] font-black text-[#94a3b8] uppercase tracking-widest leading-none">{currency}</p>
       <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
         trend.startsWith('+') ? 'bg-green-50 text-[#107e3e] border border-green-100' : 
         trend.startsWith('-') ? 'bg-red-50 text-[#dc2626] border border-red-100' : 
         'bg-blue-50 text-[#005eb8] border border-blue-100'
       } shadow-sm`}>{trend}</span>
    </div>
    <h3 className="text-3xl font-black text-[#0f172a] tracking-tighter relative z-10">{rate}</h3>
    <div className="flex items-center gap-3 mt-4 relative z-10">
       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color === 'blue' ? 'bg-blue-50 text-[#005eb8]' : color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-[#dc2626]'} shadow-inner`}>
          {icon}
       </div>
       <p className="text-[8px] font-bold text-[#94a3b8] uppercase tracking-tighter">Cours de clôture Certifié</p>
    </div>
  </div>
);

export default ReevaluationDevise;
