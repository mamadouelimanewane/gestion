import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, BarChart3, TrendingUp, DollarSign, 
  Download, Printer, Filter, Calendar, 
  Search, ShieldCheck, PieChart, Info,
  BookOpen, Activity, LayoutDashboard,
  FileSpreadsheet, Zap, RefreshCw
} from 'lucide-react';

const ReportingHub = () => {
  const [activeReport, setActiveReport] = useState('bilan');
  const [isExporting, setIsExporting] = useState(false);

  const reports = [
    { id: 'bilan', label: 'Bilan (Actif/Passif)', icon: LayoutDashboard, desc: 'État de la situation patrimoniale de l\'entreprise.' },
    { id: 'resultat', label: 'Compte de Résultat', icon: BarChart3, desc: 'Performance économique et rentabilité de l\'exercice.' },
    { id: 'tft', label: 'Flux de Trésorerie (TFT)', icon: TrendingUp, desc: 'Analyse des mouvements de liquidités (Opérationnel, Investissement, Financement).' },
    { id: 'balance', label: 'Balance Générale', icon: Activity, desc: 'Récapitulatif des soldes de tous les comptes du plan comptable.' },
    { id: 'grandlivre', label: 'Grand Livre Expert', icon: BookOpen, desc: 'Détail exhaustif des écritures par compte.' },
    { id: 'liasse', label: 'Liasse Fiscale (DGI)', icon: ShieldCheck, desc: 'États réglementaires pour la télédéclaration SIPS.' },
  ];

  const handleExport = (format: 'pdf' | 'excel') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Exportation ${format.toUpperCase()} réussie pour ${activeReport}.`);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Reporting Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-inner text-indigo-400">
              <FileText size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Centre d'Éditions & Reporting Légal</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">SYSCOHADA Révisé • Normes IFRS • Certifié Audit</p>
           </div>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              <Calendar size={16} /> Exercice 2024
           </button>
           <button 
             onClick={() => handleExport('pdf')}
             className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20"
           >
              <Printer size={16} /> Imprimer Tout
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
         {/* Sidebar Navigation */}
         <div className="lg:col-span-1 flex flex-col gap-4">
            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-2 mb-2">États Réglementaires</h4>
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => setActiveReport(report.id)}
                className={`flex flex-col gap-1 p-4 rounded-2xl border transition-all text-left group ${
                  activeReport === report.id 
                    ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-600/20 text-white' 
                    : 'bg-slate-800/30 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                 <div className="flex items-center gap-3">
                    <report.icon size={18} className={activeReport === report.id ? 'text-white' : 'text-indigo-400 group-hover:text-white transition-colors'} />
                    <span className="text-xs font-black uppercase tracking-widest">{report.label}</span>
                 </div>
                 <p className={`text-[9px] font-medium leading-relaxed mt-1 ${activeReport === report.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {report.desc}
                 </p>
              </button>
            ))}

            <div className="mt-auto p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem]">
               <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Validité Audit</span>
               </div>
               <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed">Tous les états sont synchronisés avec le Journal Universel ACDOCA.</p>
            </div>
         </div>

         {/* Report Preview Area */}
         <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="card bg-slate-800/20 border-slate-700/50 flex-1 flex flex-col overflow-hidden shadow-2xl relative">
               <div className="p-6 border-b border-slate-700/50 bg-slate-800/50 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Aperçu de l'Édition</span>
                     <h4 className="text-sm font-black text-white uppercase tracking-widest">{reports.find(r => r.id === activeReport)?.label}</h4>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 text-slate-500 hover:text-white bg-slate-900 border border-slate-700 rounded-lg transition-all"><Search size={16} /></button>
                     <button className="p-2 text-slate-500 hover:text-white bg-slate-900 border border-slate-700 rounded-lg transition-all"><Filter size={16} /></button>
                     <div className="flex gap-2 ml-2">
                        <button 
                          onClick={() => handleExport('excel')}
                          disabled={isExporting}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                        >
                           {isExporting ? <RefreshCw className="animate-spin" size={14} /> : <FileSpreadsheet size={14} />}
                           Export Excel
                        </button>
                        <button 
                          onClick={() => handleExport('pdf')}
                          disabled={isExporting}
                          className="flex items-center gap-2 px-4 py-2 bg-rose-600/10 border border-rose-500/20 text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all"
                        >
                           <Download size={14} /> Télécharger PDF
                        </button>
                     </div>
                  </div>
               </div>

               <div className="flex-1 p-8 overflow-auto bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                  <AnimatePresence mode="wait">
                     <motion.div
                       key={activeReport}
                       initial={{ opacity: 0, scale: 0.98 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.98 }}
                       transition={{ duration: 0.2 }}
                       className="bg-white text-slate-900 p-12 min-h-[1000px] shadow-2xl rounded-sm mx-auto w-[800px] relative font-serif"
                     >
                        {/* Fake Document Header */}
                        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8">
                           <div>
                              <h1 className="text-2xl font-black uppercase tracking-tighter">ANTIGRAVITY TECH SA</h1>
                              <p className="text-[10px] font-bold uppercase text-slate-500">NINEA : 001234567 2V2 • RCCM : SN DKR 2024 B 8892</p>
                              <p className="text-[10px] font-bold uppercase text-slate-500">Adresse : Almadies, Lot 45, Dakar</p>
                           </div>
                           <div className="text-right">
                              <h2 className="text-lg font-black uppercase underline">{reports.find(r => r.id === activeReport)?.label}</h2>
                              <p className="text-[10px] font-bold uppercase text-slate-700 mt-1 italic">Période du 01/01/2024 au 31/12/2024</p>
                           </div>
                        </div>

                        {/* Mock Content based on report type */}
                        <div className="space-y-6">
                           {activeReport === 'bilan' && <MockTable headers={['Rubriques', 'Brut', 'Amort/Prov', 'Net N', 'Net N-1']} rows={[['IMMOBILISATIONS', '18.000.000', '4.000.000', '14.000.000', '14.300.000'], ['STOCKS', '4.500.000', '200.000', '4.300.000', '3.800.000'], ['CREANCES', '3.200.000', '150.000', '3.050.000', '2.900.000']]} total="24.150.000" />}
                           {activeReport === 'resultat' && <MockTable headers={['Postes', 'Produits', 'Charges', 'Solde N', 'Solde N-1']} rows={[['CHIFFRE D\'AFFAIRES', '45.000.000', '0', '45.000.000', '38.000.000'], ['ACHATS MARCHANDISES', '0', '18.000.000', '-18.000.000', '-15.000.000'], ['CHARGES PERSO', '0', '12.000.000', '-12.000.000', '-11.000.000']]} total="3.250.000" />}
                           {activeReport === 'tft' && <MockTable headers={['Flux de Trésorerie', 'Entrées', 'Sorties', 'Net N', 'Net N-1']} rows={[['ACTIVITES OPERATIONNELLES', '42.000.000', '34.000.000', '8.000.000', '6.500.000'], ['ACTIVITES INVESTISSEMENT', '0', '5.000.000', '-5.000.000', '-8.000.000'], ['ACTIVITES FINANCEMENT', '2.000.000', '1.000.000', '1.000.000', '500.000']]} total="4.000.000" />}
                           {activeReport === 'balance' && <MockTable headers={['Compte', 'Intitulé', 'Débit N', 'Crédit N', 'Solde']} rows={[['411000', 'CLIENTS', '15.000.000', '12.000.000', '3.000.000'], ['401000', 'FOURNISSEURS', '8.000.000', '10.500.000', '-2.500.000'], ['512000', 'BANQUES', '25.000.000', '18.000.000', '7.000.000']]} total="7.500.000" />}
                           
                           <div className="mt-20 border-t border-slate-300 pt-8 flex justify-between items-end">
                              <div className="text-[9px] text-slate-400 italic">
                                 Édité par GestionPro ERP v6.2 • Certifié Conforme SYSCOHADA<br/>
                                 Date d'édition : {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}
                              </div>
                              <div className="flex flex-col items-center">
                                 <p className="text-[10px] font-black uppercase mb-12">Cachet et Signature</p>
                                 <div className="w-32 h-16 border border-dashed border-slate-300 rounded flex items-center justify-center text-[8px] text-slate-300">Emplacement Signature</div>
                              </div>
                           </div>
                        </div>

                        {/* Watermark SAP Style */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-[0.03] text-8xl font-black select-none pointer-events-none">
                           CONFIDENTIEL
                        </div>
                     </motion.div>
                  </AnimatePresence>
               </div>
            </div>

            {/* Quick Insights below preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="card bg-slate-800/40 p-5 flex items-center gap-4 border-slate-700/50">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                     <PieChart size={20} />
                  </div>
                  <div>
                     <p className="text-[9px] font-black text-slate-500 uppercase">Ratio Solvabilité</p>
                     <p className="text-sm font-black text-white">1.85</p>
                  </div>
               </div>
               <div className="card bg-slate-800/40 p-5 flex items-center gap-4 border-slate-700/50">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                     <TrendingUp size={20} />
                  </div>
                  <div>
                     <p className="text-[9px] font-black text-slate-500 uppercase">Croissance CA</p>
                     <p className="text-sm font-black text-white">+18.4%</p>
                  </div>
               </div>
               <div className="card bg-slate-800/40 p-5 flex items-center gap-4 border-slate-700/50">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400">
                     <Info size={20} />
                  </div>
                  <div>
                     <p className="text-[9px] font-black text-slate-500 uppercase">Statut Fiscal</p>
                     <p className="text-sm font-black text-white">CONFORME</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const MockTable = ({ headers, rows, total }: any) => (
  <div className="w-full">
     <table className="w-full text-left text-[11px] border-collapse">
        <thead>
           <tr className="bg-slate-100 border-y-2 border-slate-900">
              {headers.map((h: string, i: number) => (
                <th key={i} className={`p-3 font-black uppercase ${i > 0 ? 'text-right' : ''}`}>{h}</th>
              ))}
           </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
           {rows.map((row: string[], i: number) => (
             <tr key={i}>
                {row.map((cell: string, ci: number) => (
                  <td key={ci} className={`p-3 ${ci > 0 ? 'text-right font-mono' : 'font-bold'}`}>{cell}</td>
                ))}
             </tr>
           ))}
        </tbody>
        <tfoot>
           <tr className="bg-slate-50 border-t-2 border-slate-900 font-black">
              <td className="p-3 uppercase">TOTAL GÉNÉRAL</td>
              <td colSpan={headers.length - 2}></td>
              <td className="p-3 text-right font-mono text-base">{total} F CFA</td>
           </tr>
        </tfoot>
     </table>
  </div>
);

export default ReportingHub;
