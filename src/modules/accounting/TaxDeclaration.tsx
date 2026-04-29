import React, { useState } from 'react';
import { 
  FileText, Calculator, Download, Calendar, 
  CheckCircle2, AlertCircle, TrendingUp, TrendingDown,
  Percent, ArrowRight, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const TaxDeclaration = () => {
  const [period, setPeriod] = useState('2024-04');
  const [isCalculated, setIsCalculated] = useState(false);

  // Simulation des données fiscales
  const taxData = {
    caBrut: 12500000,
    tvaCollectee: 2250000, // 18% de CA
    achatsHT: 4500000,
    tvaDeductible: 810000,
    tvaDue: 1440000,
    creditTVA: 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <Percent className="text-emerald-400" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Déclaration de TVA (Tax Accounting)</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Conformité fiscale et formulaires CA3</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <Calendar size={16} className="text-slate-500" />
            <input 
              type="month" 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-transparent text-xs text-white outline-none border-none"
            />
          </div>
          <button 
            onClick={() => setIsCalculated(true)}
            className="btn bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-lg shadow-indigo-600/20"
          >
            <Calculator size={18} />
            <span>Calculer l'état</span>
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-slate-800/20 border-slate-700/50">
          <p className="text-xs font-bold text-slate-500 uppercase">TVA Collectée (Ventes)</p>
          <div className="flex items-end justify-between mt-1">
            <p className="text-2xl font-black text-white">{isCalculated ? taxData.tvaCollectee.toLocaleString() : '---'} F</p>
            <TrendingUp size={20} className="text-rose-400 mb-1" />
          </div>
        </div>
        <div className="card bg-slate-800/20 border-slate-700/50">
          <p className="text-xs font-bold text-slate-500 uppercase">TVA Déductible (Achats)</p>
          <div className="flex items-end justify-between mt-1">
            <p className="text-2xl font-black text-white">{isCalculated ? taxData.tvaDeductible.toLocaleString() : '---'} F</p>
            <TrendingDown size={20} className="text-emerald-400 mb-1" />
          </div>
        </div>
        <div className="card bg-slate-800/20 border-slate-700/50 relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 bg-${taxData.tvaDue > 0 ? 'rose' : 'emerald'}-500`}></div>
          <p className="text-xs font-bold text-slate-500 uppercase">Net à Payer (TVA Due)</p>
          <p className={`text-2xl font-black mt-1 ${taxData.tvaDue > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {isCalculated ? taxData.tvaDue.toLocaleString() : '---'} F
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulaire CA3 Style */}
        <div className="lg:col-span-2 card bg-slate-800/20 border-slate-700/50 p-0 overflow-hidden">
          <div className="p-4 border-b border-slate-700/50 bg-slate-800/30 flex items-center justify-between">
            <span className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <FileText size={16} className="text-indigo-400" />
              État de la Déclaration CA3
            </span>
            <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all">
              <Download size={18} />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] border-b border-indigo-500/20 pb-2">A. Opérations Imposables (TVA Collectée)</h4>
              <TaxRow label="Ventes de marchandises (Taux 18%)" base={taxData.caBrut} tax={taxData.tvaCollectee} />
              <TaxRow label="Ventes de services (Taux 18%)" base={0} tax={0} />
              <TaxRow label="Exportations et livraisons intracommunautaires" base={1200000} tax={0} isExempt />
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] border-b border-indigo-500/20 pb-2">B. Déductions (TVA Déductible)</h4>
              <TaxRow label="TVA sur biens et services" base={taxData.achatsHT} tax={taxData.tvaDeductible} />
              <TaxRow label="TVA sur immobilisations" base={0} tax={0} />
              <TaxRow label="Report de crédit de TVA antérieur" base={0} tax={0} />
            </div>

            <div className="pt-4 border-t border-slate-700/50">
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-white uppercase">Total TVA à payer ce mois</p>
                  <p className="text-[10px] text-slate-500 font-medium">Calculé sur la base des écritures lettrées</p>
                </div>
                <p className="text-xl font-black text-rose-400">{isCalculated ? taxData.tvaDue.toLocaleString() : '---'} F</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="card bg-indigo-500/5 border-indigo-500/20 p-6">
            <h4 className="text-xs font-bold text-indigo-300 uppercase mb-4 flex items-center gap-2">
              <ShieldCheck size={16} />
              Conformité Fiscale
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-300">Taux de change BCEAO appliqué pour les devises.</p>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-300">Lettrage des comptes de TVA (445) vérifié à 100%.</p>
              </li>
              <li className="flex gap-3 text-rose-400">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold">Attention : 2 factures d'achat sans justificatif PDF.</p>
              </li>
            </ul>
            <button className="w-full mt-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold uppercase rounded-lg transition-all">
              Valider et Verrouiller la Période
            </button>
          </div>

          <div className="card bg-slate-800/20 border-slate-700/50 p-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Historique des Déclarations</h4>
            <div className="space-y-3">
              <HistoryItem month="Mars 2024" amount="1 120 000 F" status="Payé" />
              <HistoryItem month="Février 2024" amount="980 000 F" status="Payé" />
              <HistoryItem month="Janvier 2024" amount="0 F" status="Crédit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaxRow = ({ label, base, tax, isExempt }: any) => (
  <div className="flex items-center justify-between text-xs py-1 group hover:bg-slate-800/30 px-2 rounded transition-colors">
    <span className="text-slate-400 group-hover:text-slate-200">{label}</span>
    <div className="flex gap-8">
      <div className="w-32 text-right">
        <span className="text-slate-500 font-mono text-[10px]">Base: </span>
        <span className="text-slate-300 font-bold">{base.toLocaleString()}</span>
      </div>
      <div className="w-32 text-right">
        <span className="text-slate-500 font-mono text-[10px]">Taxe: </span>
        <span className={`font-bold ${isExempt ? 'text-slate-600' : 'text-white'}`}>{tax.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

const HistoryItem = ({ month, amount, status }: any) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0">
    <div className="flex flex-col">
      <span className="text-xs font-bold text-white">{month}</span>
      <span className="text-[9px] text-slate-500">{status}</span>
    </div>
    <span className="text-xs text-slate-300 font-bold">{amount}</span>
  </div>
);

export default TaxDeclaration;
