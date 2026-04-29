import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Download, FileSpreadsheet, FileText, 
  CheckCircle2, AlertCircle, ArrowRight, RefreshCw,
  Search, Filter, Database, ShieldCheck, Zap
} from 'lucide-react';

const ImportExport = () => {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('excel');
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const startProcessing = () => {
    setIsProcessing(true);
    setStep(2);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStep(3);
        setIsProcessing(false);
      }
    }, 100);
  };

  const reset = () => {
    setStep(1);
    setProgress(0);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-inner text-indigo-400">
              <Database size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Moteur d'Import/Export SAP-Sync</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Transfert de Données Haute Précision • XLSX / CSV / TXT</p>
           </div>
        </div>
        <div className="flex bg-slate-800/50 p-1 rounded-2xl border border-slate-700/50 shadow-inner">
           <button 
             onClick={() => { setActiveTab('import'); reset(); }}
             className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'import' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
           >
              <Upload size={14} /> Importation
           </button>
           <button 
             onClick={() => { setActiveTab('export'); reset(); }}
             className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'export' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
           >
              <Download size={14} /> Exportation
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
         {/* Sidebar: Config */}
         <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="card bg-slate-800/30 p-6 flex flex-col gap-4">
               <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">Paramètres de Format</h4>
               <div className="flex flex-col gap-2">
                  <FormatButton active={selectedFormat === 'excel'} onClick={() => setSelectedFormat('excel')} label="Microsoft Excel" ext=".xlsx" icon={<FileSpreadsheet size={18} />} />
                  <FormatButton active={selectedFormat === 'csv'} onClick={() => setSelectedFormat('csv')} label="CSV Délimité" ext=".csv" icon={<FileText size={18} />} />
                  <FormatButton active={selectedFormat === 'sage'} onClick={() => setSelectedFormat('sage')} label="Sage 100 PNM" ext=".txt" icon={<Zap size={18} />} />
               </div>
            </div>

            <div className="card bg-slate-800/30 p-6 flex flex-col gap-4">
               <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">Cibles de Données</h4>
               <div className="space-y-2">
                  {['Journal des Ventes', 'Journal des Achats', 'Balance d\'Ouverture', 'Plan Comptable', 'Référentiel Tiers'].map((target) => (
                    <label key={target} className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800 transition-all group">
                       <input type="checkbox" defaultChecked className="w-4 h-4 rounded-md border-slate-700 bg-slate-950 text-indigo-500 focus:ring-indigo-500" />
                       <span className="text-[10px] font-bold text-slate-400 group-hover:text-white uppercase tracking-widest">{target}</span>
                    </label>
                  ))}
               </div>
            </div>
         </div>

         {/* Main Execution Area */}
         <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="card bg-slate-800/20 border-slate-700/50 flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
               <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center"
                    >
                       <div className="w-24 h-24 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-8 shadow-2xl shadow-indigo-500/10">
                          {activeTab === 'import' ? <Upload size={40} /> : <Download size={40} />}
                       </div>
                       <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
                          {activeTab === 'import' ? 'Sélectionner le fichier source' : 'Prêt pour la génération'}
                       </h3>
                       <p className="text-xs text-slate-500 max-w-sm font-medium uppercase tracking-widest leading-relaxed mb-8">
                          {activeTab === 'import' 
                            ? "Déposez votre fichier Excel ou CSV ici pour synchroniser vos écritures ou votre balance avec le Journal Universel." 
                            : "Générez un export complet de vos états comptables au format Excel certifié SAP."}
                       </p>
                       <button 
                         onClick={startProcessing}
                         className={`flex items-center gap-3 px-12 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl ${activeTab === 'import' ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'}`}
                       >
                          {activeTab === 'import' ? 'Lancer l\'Importation' : 'Lancer l\'Exportation'} <ArrowRight size={18} />
                       </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center w-full max-w-md"
                    >
                       <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mb-8 relative">
                          <RefreshCw className="text-indigo-400 animate-spin" size={32} />
                       </div>
                       <h4 className="text-lg font-black text-white uppercase tracking-widest mb-2">{progress}% Terminé</h4>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mb-8">Traitement des métadonnées ACDOCA...</p>
                       <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <motion.div 
                            className="h-full bg-indigo-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                          />
                       </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center"
                    >
                       <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-8">
                          <CheckCircle2 size={40} />
                       </div>
                       <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Opération Réussie</h3>
                       <p className="text-xs text-slate-500 font-medium uppercase tracking-widest leading-relaxed mb-8">
                          {activeTab === 'import' 
                            ? "1 245 écritures ont été intégrées avec succès dans le Journal Universel. Aucun rejet détecté." 
                            : "Votre export Excel a été généré et téléchargé avec succès."}
                       </p>
                       <div className="flex gap-4">
                          <button onClick={reset} className="px-8 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Nouveau Transfert</button>
                          <button className="px-8 py-3 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
                             <ShieldCheck size={14} /> Voir Log d'Audit
                          </button>
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>

               {/* Integrity Check Footer */}
               <div className="absolute bottom-8 left-8 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Validation Immuable : ACTIVE</span>
               </div>
            </div>

            {/* Quick Stats / Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="card bg-slate-800/20 border-slate-700/50 p-6 flex flex-col gap-3">
                  <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dernier Import Réussi</h5>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-black text-white">PLAN_COMPTABLE_2024.xlsx</span>
                     <span className="text-[9px] font-bold text-emerald-400 uppercase">Aujourd'hui, 14:22</span>
                  </div>
               </div>
               <div className="card bg-slate-800/20 border-slate-700/50 p-6 flex flex-col gap-3">
                  <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Volume Cumulé (Mois)</h5>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-black text-white">45 820 Lignes Transférées</span>
                     <span className="text-[9px] font-bold text-indigo-400 uppercase">Taux Succès : 100%</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const FormatButton = ({ active, onClick, label, ext, icon }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
      active ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-inner' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:bg-slate-800/50'
    }`}
  >
     <div className="flex items-center gap-3">
        <div className={active ? 'text-indigo-400' : 'text-slate-600'}>{icon}</div>
        <div className="flex flex-col items-start">
           <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
           <span className="text-[8px] font-bold uppercase opacity-50">{ext}</span>
        </div>
     </div>
     {active && <CheckCircle2 size={16} className="text-indigo-400" />}
  </button>
);

export default ImportExport;
