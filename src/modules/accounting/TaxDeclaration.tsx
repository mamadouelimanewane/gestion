import React, { useState } from 'react';
import { 
  FileText, Calculator, Download, Calendar, 
  CheckCircle2, AlertCircle, TrendingUp, TrendingDown,
  Percent, ArrowRight, ShieldCheck, Zap,
  History, Info, ChevronRight, FileCheck,
  Landmark, DollarSign, Activity, Printer, Share2, Database, Layers, Check, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaxDeclaration = () => {
  const [period, setPeriod] = useState('2024-04');
  const [isCalculated, setIsCalculated] = useState(false);

  const taxData = {
    caBrut: 12500000,
    tvaCollectee: 2250000,
    achatsHT: 4500000,
    tvaDeductible: 810000,
    tvaDue: 1440000,
    creditTVA: 0
  };

  return (
    <div className="flex flex-col h-full gap-10 bg-white p-10 min-h-screen">
      {/* Premium Header - Diamond Azure Elite */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,94,184,0.08)] relative overflow-hidden group border border-blue-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-48 -mt-48 blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="flex items-center gap-10 relative z-10">
           <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#107e3e] to-emerald-600 flex items-center justify-center text-white shadow-[0_15px_30px_rgba(16,126,62,0.3)] group-hover:rotate-6 transition-transform duration-500">
              <Percent size={40} strokeWidth={2.5} />
           </div>
           <div>
              <h3 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Déclaration de TVA (Tax Compliance CA3)</h3>
              <p className="text-[12px] text-[#64748b] font-black uppercase tracking-[0.3em] italic opacity-80 flex items-center gap-3">
                 <ShieldCheck size={16} className="text-[#0a6ed1]" /> Conformité Fiscale Légale • Formulaire Automatisé • OHADA 2024
              </p>
           </div>
        </div>
        
        <div className="flex items-center gap-6 relative z-10 mt-8 lg:mt-0">
           <div className="bg-blue-50/50 border border-blue-100 rounded-2xl px-8 py-4 flex items-center gap-5 shadow-inner group-focus-within:border-[#0a6ed1] transition-all h-[60px]">
              <Calendar size={24} className="text-blue-300" />
              <input 
                type="month" 
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-transparent text-[12px] font-black text-[#0f172a] outline-none border-none uppercase tracking-widest cursor-pointer"
              />
           </div>
           <button 
             onClick={() => setIsCalculated(true)}
             className="flex items-center gap-4 px-12 py-4 bg-[#0a6ed1] hover:bg-blue-700 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl h-[60px] group/btn scale-105 active:scale-95"
           >
              <Calculator size={24} className="group-hover/btn:rotate-12 transition-transform duration-500" />
              Calculer l'État
           </button>
        </div>
      </div>

      {/* KPI Stats Grid - Diamond Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         <StatCard title="TVA Collectée (Ventes)" value={isCalculated ? taxData.tvaCollectee.toLocaleString() : '---'} color="red" trend="+12.5%" icon={<TrendingUp size={32} />} />
         <StatCard title="TVA Déductible (Achats)" value={isCalculated ? taxData.tvaDeductible.toLocaleString() : '---'} color="green" trend="-05.2%" icon={<TrendingDown size={32} />} />
         <StatCard title="Position Fiscale (Net Due)" value={isCalculated ? taxData.tvaDue.toLocaleString() : '---'} color={taxData.tvaDue > 0 ? 'red' : 'green'} trend="Période" icon={<DollarSign size={32} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 flex-1 min-h-[700px]">
        {/* Main Tax Form Area - Ultra High Contrast */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-blue-50 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.04)] flex flex-col relative">
           <div className="bg-white px-12 py-8 border-b border-blue-50 flex justify-between items-center sticky top-0 z-20 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 bg-blue-50 text-[#0a6ed1] rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner">
                    <FileText size={24} />
                 </div>
                 <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#0f172a]">Formulaire CA3 : Détail des Opérations Imposables</h3>
              </div>
              <div className="flex gap-6">
                 <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] shadow-sm flex items-center justify-center transition-all"><Printer size={24} /></button>
                 <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] shadow-sm flex items-center justify-center transition-all"><Download size={24} /></button>
              </div>
           </div>
           
           <div className="p-12 space-y-16 overflow-auto custom-scrollbar flex-1 bg-gradient-to-b from-white to-blue-50/10">
              <div className="space-y-8">
                 <div className="flex items-center justify-between border-b border-blue-50 pb-8 relative group">
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#0a6ed1] group-hover:w-full transition-all duration-700"></div>
                    <h4 className="text-[14px] font-black text-[#0a6ed1] uppercase tracking-[0.4em] leading-none">Section I : Flux Entrants (TVA Collectée)</h4>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] bg-blue-50 px-6 py-2 rounded-full border border-blue-100 shadow-sm">Taux Standard 18%</span>
                 </div>
                 <div className="space-y-4">
                    <TaxRow label="Ventes de marchandises locales (Sénégal)" base={taxData.caBrut} tax={taxData.tvaCollectee} />
                    <TaxRow label="Prestations de services et travaux" base={0} tax={0} />
                    <TaxRow label="Exportations et livraisons HT (Exonéré)" base={1200000} tax={0} isExempt />
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center justify-between border-b border-blue-50 pb-8 relative group">
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#107e3e] group-hover:w-full transition-all duration-700"></div>
                    <h4 className="text-[14px] font-black text-[#107e3e] uppercase tracking-[0.4em] leading-none">Section II : Flux Sortants (TVA Déductible)</h4>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] bg-emerald-50 px-6 py-2 rounded-full border border-emerald-100 shadow-sm">Articles 350-380 CGI</span>
                 </div>
                 <div className="space-y-4">
                    <TaxRow label="TVA Déductible sur biens et services (Exploit.)" base={taxData.achatsHT} tax={taxData.tvaDeductible} />
                    <TaxRow label="TVA Déductible sur immobilisations (Invest.)" base={0} tax={0} />
                    <TaxRow label="Report de crédit de TVA (Exercice M-1)" base={0} tax={0} />
                 </div>
              </div>

              <div className="pt-14 mt-auto">
                 <div className="flex items-center justify-between p-16 bg-white rounded-[3rem] border border-blue-50 shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative overflow-hidden group/final">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0a6ed1]/5 rounded-full -mr-64 -mt-64 blur-[120px] opacity-0 group-hover/final:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative z-10">
                       <h4 className="text-2xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-4">Solde Fiscal de la Période</h4>
                       <p className="text-[12px] text-slate-400 font-black uppercase tracking-[0.3em] opacity-80 italic leading-relaxed">Réconciliation automatisée via Joule AI Compliance Engine • S/4HANA</p>
                    </div>
                    <div className="relative z-10 flex flex-col items-end">
                       <div className="flex items-baseline gap-4">
                          <p className={`text-7xl font-black tracking-tighter transition-all duration-700 leading-none ${isCalculated ? 'text-[#0f172a]' : 'text-blue-50'}`}>
                             {isCalculated ? taxData.tvaDue.toLocaleString() : '---'}
                          </p>
                          <span className="text-2xl font-black text-slate-200 uppercase tracking-widest">F CFA</span>
                       </div>
                       {isCalculated && (
                          <motion.span 
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex items-center gap-5 text-[12px] font-black text-[#dc2626] uppercase tracking-[0.4em] mt-10 bg-red-50 px-10 py-4 rounded-[2rem] border border-red-100 shadow-2xl shadow-red-500/10"
                          >
                             <AlertCircle size={24} className="animate-pulse" /> Paiement Exigible avant le 15/{period.split('-')[1]}
                          </motion.span>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar Info Panels - Diamond Style */}
        <div className="flex flex-col gap-10">
           <div className="bg-white border border-blue-50 p-12 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.06)] flex flex-col gap-10 relative overflow-hidden group/compliance">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full -mr-24 -mt-24 blur-3xl opacity-60"></div>
              <h4 className="text-[14px] font-black text-[#0f172a] uppercase tracking-[0.5em] flex items-center gap-6 relative z-10 border-b border-blue-50 pb-8 leading-none">
                 <ShieldCheck size={36} className="text-[#107e3e]" /> Conformité
              </h4>
              <div className="space-y-10 relative z-10">
                 <ComplianceItem 
                    icon={<CheckCircle2 className="text-[#107e3e]" size={28} />} 
                    label="Application Taux BCEAO" 
                    desc="Certification des taux de change sur les flux multi-devises." 
                    active 
                 />
                 <ComplianceItem 
                    icon={<CheckCircle2 className="text-[#107e3e]" size={28} />} 
                    label="Validation Lettrage TVA" 
                    desc="Contrôle d'intégrité des comptes de classe 445 (TVA)." 
                    active 
                 />
                 <ComplianceItem 
                    icon={<AlertCircle className="text-[#dc2626]" size={28} />} 
                    label="Audit des Pièces" 
                    desc="2 factures d'achat sans justificatif numérisé détectées." 
                    active={false} 
                 />
              </div>
              <button className="w-full mt-10 py-6 bg-[#0a6ed1] hover:bg-blue-700 text-white text-[12px] font-black uppercase tracking-[0.5em] rounded-[3rem] transition-all shadow-3xl shadow-blue-500/30 flex items-center justify-center gap-5 group/btn scale-105">
                 <FileCheck size={28} className="group-hover/btn:scale-110 transition-transform duration-500" /> Certifier & Clôturer
              </button>
           </div>

           <div className="bg-gradient-to-br from-white to-blue-50/50 border border-blue-50 p-12 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] flex flex-col gap-10 flex-1">
              <div className="flex items-center justify-between border-b border-blue-50 pb-8">
                 <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-5">
                    <History size={24} /> Historique Fiscal
                 </h4>
                 <button className="text-[11px] font-black text-[#0a6ed1] uppercase tracking-[0.3em] hover:scale-110 transition-transform">Archives</button>
              </div>
              <div className="space-y-5">
                 <HistoryItem month="MARS 2024" amount="1 120 000 F" status="PAYÉ" color="green" />
                 <HistoryItem month="FÉVRIER 2024" amount="980 000 F" status="PAYÉ" color="green" />
                 <HistoryItem month="JANVIER 2024" amount="0 F" status="CRÉDIT" color="blue" />
              </div>
           </div>
        </div>
      </div>

      {/* Footer System Integrity - Diamond Style */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-blue-50 p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] gap-10 group/footer overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-1000"></div>
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#107e3e] to-emerald-600 text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 group/shield cursor-pointer">
               <ShieldCheck size={40} className="group-hover/shield:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Conformité Fiscale & Piste d'Audit (CGI Master)</span>
               <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 opacity-70 italic leading-relaxed max-w-4xl">
                  L'intégrité de la déclaration est certifiée par Joule AI Auditor conformément aux articles 350-380 du CGI • Core S/4HANA Engine.
               </p>
            </div>
         </div>
         <div className="flex gap-14 items-center relative z-10">
            <button className="flex items-center gap-5 text-slate-300 hover:text-[#0a6ed1] text-[12px] font-black uppercase tracking-[0.4em] transition-all group/btn">
               <History size={28} className="group-hover/btn:rotate-[-45deg] transition-transform duration-500" /> Journal Audit
            </button>
            <button className="flex items-center gap-6 text-[#0a6ed1] hover:text-blue-700 text-[12px] font-black uppercase tracking-[0.5em] transition-all group/strat border-l border-blue-50 pl-14 h-12">
               <Share2 size={28} className="group-hover:rotate-12 transition-transform duration-500" /> Télédéclarer
               <ArrowRight size={22} className="opacity-10 group-hover/strat:opacity-100 group-hover/strat:translate-x-3 transition-all duration-500" />
            </button>
         </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, trend, icon }: any) => (
  <div className="bg-white border border-blue-50 rounded-[2.5rem] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_rgba(10,110,209,0.08)] hover:border-blue-100 transition-all duration-500 group relative overflow-hidden cursor-pointer">
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full ${color === 'red' ? 'bg-[#dc2626]' : 'bg-[#107e3e]'} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
    <div className="flex justify-between items-start mb-10 relative z-10">
       <div>
          <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 opacity-70 leading-none">{title}</p>
          <div className="flex items-baseline gap-4">
             <h3 className="text-5xl font-black tracking-tighter text-[#0f172a] group-hover:text-[#0a6ed1] transition-colors duration-500">{value}</h3>
             <span className="text-base font-black text-slate-200 uppercase tracking-widest">F</span>
          </div>
       </div>
       <div className={`w-16 h-16 rounded-[1.5rem] border shadow-2xl transition-transform duration-500 group-hover:rotate-12 flex items-center justify-center ${
         color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100 shadow-red-500/10' : 'bg-green-50 text-[#107e3e] border-green-100 shadow-green-500/10'
       }`}>
          {icon}
       </div>
    </div>
    <div className="flex items-center gap-5 pt-8 border-t border-blue-50 relative z-10">
       <span className={`text-[11px] font-black px-5 py-2 rounded-full border shadow-sm ${
          trend.includes('+') ? 'bg-red-50 text-[#dc2626] border-red-100' : 'bg-green-50 text-[#107e3e] border-green-100'
       }`}>{trend}</span>
       <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] opacity-60">Variation Périodique</span>
    </div>
  </div>
);

const TaxRow = ({ label, base, tax, isExempt }: any) => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 group hover:bg-blue-50/20 px-10 rounded-2xl transition-all duration-300 border border-transparent hover:border-blue-50 cursor-pointer shadow-sm hover:shadow-xl">
    <div className="flex items-center gap-6">
       <div className={`w-3 h-3 rounded-full ${isExempt ? 'bg-blue-100' : 'bg-[#0a6ed1] shadow-[0_0_15px_rgba(10,110,209,0.4)]'} group-hover:scale-150 transition-transform duration-500`} />
       <span className="text-base text-slate-600 font-black uppercase tracking-tight group-hover:text-[#0a6ed1] transition-colors">{label}</span>
    </div>
    <div className="flex gap-20 w-full md:w-auto mt-8 md:mt-0 pt-8 md:pt-0 border-t md:border-0 border-blue-50">
      <div className="flex flex-col items-end min-w-[160px]">
        <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mb-3 opacity-60">Assiette Fiscale</span>
        <span className="text-lg font-black text-slate-400 tracking-tighter">{base.toLocaleString()} <span className="text-xs ml-1">F</span></span>
      </div>
      <div className="flex flex-col items-end min-w-[160px] border-l border-blue-50 pl-20">
        <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mb-3 opacity-60">Montant Taxe</span>
        <span className={`text-2xl font-black tracking-tighter ${isExempt ? 'text-blue-100 italic' : 'text-[#0f172a]'}`}>{isExempt ? 'EXONÉRÉ' : `${tax.toLocaleString()} F`}</span>
      </div>
    </div>
  </div>
);

const ComplianceItem = ({ icon, label, desc, active }: any) => (
  <div className="flex gap-8 group/item">
    <div className={`w-16 h-16 bg-white rounded-2xl border shadow-sm group-hover/item:scale-110 transition-transform duration-500 flex items-center justify-center ${active ? 'border-emerald-100 shadow-emerald-500/10' : 'border-red-100 shadow-red-500/10'}`}>
      {icon}
    </div>
    <div className="flex flex-col gap-2">
       <span className={`text-[12px] font-black uppercase tracking-[0.3em] leading-none ${active ? 'text-[#107e3e]' : 'text-[#dc2626]'}`}>{label}</span>
       <p className="text-[11px] text-slate-400 font-black uppercase tracking-tight opacity-60 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const HistoryItem = ({ month, amount, status, color }: any) => (
  <div className="flex items-center justify-between p-6 bg-white border border-blue-50 rounded-[2rem] hover:border-[#0a6ed1]/30 hover:shadow-2xl transition-all duration-300 group/hist cursor-pointer shadow-sm">
    <div className="flex flex-col gap-2">
      <span className="text-base font-black text-[#0f172a] uppercase tracking-tighter group-hover/hist:text-[#0a6ed1] transition-colors">{month}</span>
      <span className={`text-[10px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full border shadow-inner w-fit ${
         color === 'green' ? 'bg-emerald-50 text-[#107e3e] border-emerald-100' : 'bg-blue-50 text-[#0a6ed1] border-blue-100'
      }`}>{status}</span>
    </div>
    <div className="flex items-center gap-8">
       <span className="text-xl font-black text-[#0f172a] tracking-tighter group-hover/hist:scale-110 transition-transform origin-right">{amount}</span>
       <div className="w-12 h-12 bg-blue-50/50 rounded-2xl flex items-center justify-center text-blue-200 group-hover/hist:text-[#0a6ed1] group-hover/hist:bg-white transition-all border border-transparent group-hover/hist:border-blue-100">
          <ChevronRight size={28} />
       </div>
    </div>
  </div>
);

export default TaxDeclaration;
