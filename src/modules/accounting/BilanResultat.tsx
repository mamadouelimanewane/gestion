import React, { useState } from 'react';
import { Download, Filter, FileText, PieChart, TrendingUp, ShieldCheck, Zap, Printer, Share2, Layers, BookOpen, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BilanResultat = () => {
  const [activeTab, setActiveTab] = useState('bilan-actif');

  const actifData = [
    { poste: 'IMMOBILISATIONS INCORPORELLES', brut: 2500000, amort: 500000, net: 2000000, netPrec: 1800000 },
    { poste: 'IMMOBILISATIONS CORPORELLES', brut: 15000000, amort: 3500000, net: 11500000, netPrec: 12000000 },
    { poste: 'IMMOBILISATIONS FINANCIÈRES', brut: 500000, amort: 0, net: 500000, netPrec: 500000 },
    { poste: 'TOTAL ACTIF IMMOBILISÉ', brut: 18000000, amort: 4000000, net: 14000000, netPrec: 14300000, isTotal: true },
    
    { poste: 'STOCKS', brut: 4500000, amort: 200000, net: 4300000, netPrec: 3800000 },
    { poste: 'CRÉANCES CLIENTS ET COMPTES RATTACHÉS', brut: 3200000, amort: 150000, net: 3050000, netPrec: 2900000 },
    { poste: 'TOTAL ACTIF CIRCULANT', brut: 7700000, amort: 350000, net: 7350000, netPrec: 6700000, isTotal: true },

    { poste: 'TRÉSORERIE ACTIF (BANQUE & CAISSE)', brut: 2800000, amort: 0, net: 2800000, netPrec: 1500000 },
    { poste: 'TOTAL GÉNÉRAL ACTIF', brut: 28500000, amort: 4350000, net: 24150000, netPrec: 22500000, isGrandTotal: true },
  ];

  const passifData = [
    { poste: 'CAPITAL', net: 10000000, netPrec: 10000000 },
    { poste: 'RÉSERVES', net: 2500000, netPrec: 1800000 },
    { poste: 'RÉSULTAT NET DE L\'EXERCICE', net: 3250000, netPrec: 2800000 },
    { poste: 'TOTAL CAPITAUX PROPRES', net: 15750000, netPrec: 14600000, isTotal: true },

    { poste: 'EMPRUNTS ET DETTES FINANCIÈRES', net: 4200000, netPrec: 5000000 },
    { poste: 'TOTAL DETTES FINANCIÈRES', net: 4200000, netPrec: 5000000, isTotal: true },

    { poste: 'DETTES FOURNISSEURS', net: 2800000, netPrec: 2100000 },
    { poste: 'DETTES FISCALES ET SOCIALES', net: 1400000, netPrec: 800000 },
    { poste: 'TOTAL PASSIF CIRCULANT', net: 4200000, netPrec: 2900000, isTotal: true },

    { poste: 'TOTAL GÉNÉRAL PASSIF', net: 24150000, netPrec: 22500000, isGrandTotal: true },
  ];

  const resultatData = [
    { poste: 'CHIFFRE D\'AFFAIRES', montant: 45000000, montantPrec: 38000000 },
    { poste: 'AUTRES PRODUITS', montant: 1200000, montantPrec: 900000 },
    { poste: 'TOTAL PRODUITS D\'EXPLOITATION', montant: 46200000, montantPrec: 38900000, isTotal: true },

    { poste: 'ACHATS DE MARCHANDISES', montant: 18000000, montantPrec: 15000000 },
    { poste: 'SERVICES EXTÉRIEURS', montant: 5500000, montantPrec: 4800000 },
    { poste: 'CHARGES DE PERSONNEL', montant: 12000000, montantPrec: 11000000 },
    { poste: 'IMPÔTS ET TAXES', montant: 2500000, montantPrec: 2200000 },
    { poste: 'TOTAL CHARGES D\'EXPLOITATION', montant: 38000000, montantPrec: 33000000, isTotal: true },

    { poste: 'RÉSULTAT D\'EXPLOITATION', montant: 8200000, montantPrec: 5900000, isTotal: true },
    { poste: 'RÉSULTAT FINANCIER', montant: -1200000, montantPrec: -1500000, isTotal: true },
    { poste: 'RÉSULTAT AVANT IMPÔTS (HAO)', montant: 7000000, montantPrec: 4400000, isTotal: true },
    { poste: 'IMPÔTS SUR LE RÉSULTAT', montant: 3750000, montantPrec: 1600000 },
    { poste: 'RÉSULTAT NET', montant: 3250000, montantPrec: 2800000, isGrandTotal: true },
  ];

  const formatCfa = (val: number) => val.toLocaleString('fr-FR') + ' F';

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <PieChart size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">États Financiers de Synthèse</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Bilan & Compte de Résultat • Normes SYSCOHADA • Exercice 2024</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <div className="flex p-1 bg-[#f8fafc] rounded-xl border border-[#cbd5e1] shadow-inner">
             {['bilan-actif', 'bilan-passif', 'compte-resultat'].map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                   activeTab === tab 
                     ? 'bg-white text-[#005eb8] shadow-md border border-blue-50' 
                     : 'text-[#64748b] hover:text-[#0f172a]'
                 }`}
               >
                 {tab.replace('-', ' ')}
               </button>
             ))}
           </div>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <FileText size={18} /> Éditer Liasse
           </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[600px]">
         <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">
                 {activeTab === 'bilan-actif' ? 'Tableau Actif du Bilan' : activeTab === 'bilan-passif' ? 'Tableau Passif du Bilan' : 'Compte de Résultat de l\'Exercice'}
              </h3>
           </div>
           <div className="flex gap-6">
              <div className="flex items-center gap-3 px-6 py-2 bg-white border border-[#cbd5e1] rounded-xl shadow-sm">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#107e3e] shadow-sm animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase text-[#107e3e] tracking-widest">Postes Équilibrés</span>
              </div>
              <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#005eb8] shadow-sm">
                 <Printer size={18} />
              </button>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-6 w-1/2">Rubriques & Libellés des Postes</th>
                {activeTab === 'bilan-actif' ? (
                  <>
                    <th className="px-10 py-6 text-right border-x border-[#f1f5f9]">Brut</th>
                    <th className="px-10 py-6 text-right border-r border-[#f1f5f9]">Amort. & Prov.</th>
                    <th className="px-10 py-6 text-right border-r border-[#f1f5f9] bg-blue-50/30 text-[#005eb8]">Net (N)</th>
                  </>
                ) : (
                  <th className="px-10 py-6 text-right border-x border-[#f1f5f9] bg-blue-50/30 text-[#005eb8]">Montant Net (N)</th>
                )}
                <th className="px-10 py-6 text-right text-[#94a3b8]">Net (N-1)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {activeTab === 'bilan-actif' && actifData.map((row, idx) => (
                <tr key={idx} className={`group transition-all ${row.isGrandTotal ? 'bg-[#0f172a] text-white shadow-xl' : row.isTotal ? 'bg-[#f8fafc] font-black' : 'hover:bg-blue-50/20'}`}>
                  <td className={`px-10 py-6 ${row.isGrandTotal ? 'text-white' : 'text-[#334155]'} font-bold uppercase tracking-tight text-xs`}>{row.poste}</td>
                  <td className="px-10 py-6 text-right text-[#64748b] font-bold text-xs">{row.brut !== undefined ? formatCfa(row.brut) : ''}</td>
                  <td className="px-10 py-6 text-right text-[#64748b] font-bold text-xs">{row.amort !== undefined ? formatCfa(row.amort) : ''}</td>
                  <td className={`px-10 py-6 text-right font-black ${row.isGrandTotal ? 'text-[#4ade80] text-xl' : row.isTotal ? 'text-[#0f172a] text-sm' : 'text-[#107e3e] text-sm'} tracking-tighter`}>{formatCfa(row.net)}</td>
                  <td className={`px-10 py-6 text-right font-bold text-xs ${row.isGrandTotal ? 'text-slate-500' : 'text-[#94a3b8]'} tracking-tighter`}>{formatCfa(row.netPrec)}</td>
                </tr>
              ))}

              {activeTab === 'bilan-passif' && passifData.map((row, idx) => (
                <tr key={idx} className={`group transition-all ${row.isGrandTotal ? 'bg-[#0f172a] text-white shadow-xl' : row.isTotal ? 'bg-[#f8fafc] font-black' : 'hover:bg-blue-50/20'}`}>
                  <td className={`px-10 py-6 ${row.isGrandTotal ? 'text-white' : 'text-[#334155]'} font-bold uppercase tracking-tight text-xs`}>{row.poste}</td>
                  <td className={`px-10 py-6 text-right font-black ${row.isGrandTotal ? 'text-[#f87171] text-xl' : row.isTotal ? 'text-[#0f172a] text-sm' : 'text-[#dc2626] text-sm'} tracking-tighter`}>{formatCfa(row.net)}</td>
                  <td className={`px-10 py-6 text-right font-bold text-xs ${row.isGrandTotal ? 'text-slate-500' : 'text-[#94a3b8]'} tracking-tighter`}>{formatCfa(row.netPrec)}</td>
                </tr>
              ))}

              {activeTab === 'compte-resultat' && resultatData.map((row, idx) => (
                <tr key={idx} className={`group transition-all ${row.isGrandTotal ? 'bg-[#107e3e] text-white shadow-xl' : row.isTotal ? 'bg-[#f8fafc] font-black' : 'hover:bg-blue-50/20'}`}>
                  <td className={`px-10 py-6 ${row.isGrandTotal ? 'text-white' : 'text-[#334155]'} font-bold uppercase tracking-tight text-xs`}>{row.poste}</td>
                  <td className={`px-10 py-6 text-right font-black ${row.isGrandTotal ? 'text-white text-2xl' : row.montant < 0 ? 'text-[#dc2626]' : 'text-[#0f172a]'} text-sm tracking-tighter`}>{formatCfa(row.montant)}</td>
                  <td className={`px-10 py-6 text-right font-bold text-xs ${row.isGrandTotal ? 'text-green-100' : 'text-[#94a3b8]'} tracking-tighter`}>{formatCfa(row.montantPrec)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={28} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Consolidation Légale Certifiée</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Généré le {new Date().toLocaleDateString('fr-FR')} • Conforme au référentiel SYSCOHADA Révisé • Audit de cohérence Passif/Actif Validé.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <TrendingUp size={20} className="group-hover:scale-110 transition-transform" /> Analyse EBE
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={20} className="group-hover:rotate-12 transition-transform" /> Envoyer Expert
               <ChevronRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default BilanResultat;
