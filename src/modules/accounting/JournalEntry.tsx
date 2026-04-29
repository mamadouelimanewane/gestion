import React, { useState, useEffect } from 'react';
import { 
  Save, X, Plus, Trash2, Calendar, FileText, 
  CreditCard, Sparkles, BrainCircuit, RefreshCw, 
  AlertCircle, CheckCircle2, History, Info
} from 'lucide-react';

const JournalEntry = () => {
  const [lines, setLines] = useState([
    { id: 1, account: '', label: '', debit: '', credit: '' },
    { id: 2, account: '', label: '', debit: '', credit: '' },
  ]);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isAutoReversal, setIsAutoReversal] = useState(false);
  const [reversalDate, setReversalDate] = useState('2024-05-01');
  const [totals, setTotals] = useState({ debit: 0, credit: 0 });

  useEffect(() => {
    const d = lines.reduce((acc, l) => acc + (parseFloat(l.debit) || 0), 0);
    const c = lines.reduce((acc, l) => acc + (parseFloat(l.credit) || 0), 0);
    setTotals({ debit: d, credit: c });
  }, [lines]);

  const predictAccount = (label: string, index: number) => {
    const text = label.toLowerCase();
    let suggested = '';
    if (text.includes('loyer')) suggested = '613200';
    else if (text.includes('salaire') || text.includes('paie')) suggested = '641100';
    else if (text.includes('orange') || text.includes('teleph')) suggested = '626100';
    else if (text.includes('vende') || text.includes('facture')) suggested = '701000';
    
    if (suggested) {
      const newLines = [...lines];
      newLines[index].account = suggested;
      setLines(newLines);
    }
  };

  const updateLine = (id: number, field: string, value: string) => {
    setLines(lines.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const addLine = () => {
    setLines([...lines, { id: Date.now(), account: '', label: '', debit: '', credit: '' }]);
  };

  const removeLine = (id: number) => {
    if (lines.length > 2) {
      setLines(lines.filter(l => l.id !== id));
    }
  };

  const isBalanced = totals.debit === totals.credit && totals.debit > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Assistant IA flottant */}
      <div className={`fixed bottom-8 right-8 z-[100] w-80 transition-all duration-500 transform ${isAIOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="bg-indigo-900/90 backdrop-blur-xl border border-indigo-400/30 rounded-2xl p-4 shadow-2xl shadow-indigo-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="text-amber-400 animate-pulse" size={18} />
              <span className="font-bold text-white text-sm tracking-wide uppercase">Assistant IA Saisie</span>
            </div>
            <button onClick={() => setIsAIOpen(false)} className="text-indigo-300 hover:text-white"><X size={16} /></button>
          </div>
          <p className="text-xs text-indigo-100/70 mb-4 leading-relaxed">
            Je surveille votre saisie. Je suggère automatiquement les numéros de comptes basés sur vos libellés.
          </p>
          <div className="bg-white/10 rounded-lg p-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[10px] text-white font-medium uppercase tracking-widest">En écoute...</span>
          </div>
        </div>
      </div>

      <div className="card bg-slate-800/20 border-slate-700/50 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
               <BrainCircuit className="text-indigo-400" size={24} />
            </div>
            <div>
               <h3 className="text-xl font-black text-white uppercase tracking-tighter">Saisie au Kilomètre (F-02)</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Poste de travail expert • SYSCOHADA v2024</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsAIOpen(!isAIOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isAIOpen ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'}`}
            >
              <Sparkles size={14} /> {isAIOpen ? 'Assistant Actif' : 'IA Assistant'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-400 hover:text-white border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
               <History size={14} /> Brouillards
            </button>
          </div>
        </div>

        {/* Header Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <InputGroup label="Date d'Écriture" icon={<Calendar size={16} />} type="date" defaultValue="2024-04-29" />
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Journal de Saisie</label>
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5">
              <FileText size={16} className="text-slate-500" />
              <select className="bg-transparent border-none outline-none text-xs w-full appearance-none font-bold text-slate-200">
                <option>Journal des Achats (AC)</option>
                <option>Journal des Ventes (VE)</option>
                <option>Journal de Banque (BQ)</option>
                <option>Journal d'Opérations Diverses (OD)</option>
              </select>
            </div>
          </div>
          <InputGroup label="Référence Pièce" icon={<FileText size={16} />} placeholder="Ex: FAC-2024-882" />
          
          {/* SAP Feature: Auto-Reversal Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Option d'Inversion (FBS1)</label>
            <div className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-xl px-4 py-2">
               <div className="flex items-center gap-2">
                  <RefreshCw size={14} className={isAutoReversal ? 'text-indigo-400' : 'text-slate-600'} />
                  <span className={`text-[10px] font-bold ${isAutoReversal ? 'text-slate-200' : 'text-slate-500'}`}>Automatique</span>
               </div>
               <button 
                 onClick={() => setIsAutoReversal(!isAutoReversal)}
                 className={`w-10 h-5 rounded-full transition-all relative ${isAutoReversal ? 'bg-indigo-600' : 'bg-slate-700'}`}
               >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isAutoReversal ? 'right-1' : 'left-1'}`} />
               </button>
            </div>
          </div>
        </div>

        {/* Reversal Date Selection (Conditional) */}
        <AnimatePresence>
           {isAutoReversal && (
             <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="mb-8 p-4 bg-indigo-600/5 border border-indigo-500/20 rounded-2xl flex items-center gap-6"
             >
                <div className="flex items-center gap-3 text-indigo-400">
                   <Info size={18} />
                   <p className="text-xs font-bold uppercase tracking-widest">Une écriture de contre-passation sera générée le :</p>
                </div>
                <input 
                  type="date" 
                  value={reversalDate} 
                  onChange={(e) => setReversalDate(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-1.5 text-xs text-indigo-400 font-black outline-none focus:border-indigo-500 transition-all" 
                />
             </motion.div>
           )}
        </AnimatePresence>

        {/* Lines Table */}
        <div className="overflow-hidden border border-slate-700/50 rounded-2xl bg-slate-900/50 shadow-inner">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 w-1/5">Compte G/L</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 w-1/3">Désignation / Libellé</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Débit (XOF)</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Crédit (XOF)</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {lines.map((line, idx) => (
                <tr key={line.id} className="group hover:bg-indigo-500/5 transition-all">
                  <td className="px-4 py-3">
                    <input 
                      type="text" 
                      placeholder="Ex: 401100" 
                      value={line.account}
                      onChange={(e) => updateLine(line.id, 'account', e.target.value)}
                      className="bg-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs w-full focus:border-indigo-500 outline-none transition-all font-mono text-indigo-400 font-black"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input 
                      type="text" 
                      placeholder="Nature de l'opération" 
                      value={line.label}
                      onChange={(e) => {
                        updateLine(line.id, 'label', e.target.value);
                        if (isAIOpen) predictAccount(e.target.value, idx);
                      }}
                      className="bg-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs w-full focus:border-indigo-500 outline-none transition-all text-slate-200 font-medium"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input 
                      type="number" 
                      placeholder="0" 
                      value={line.debit}
                      onChange={(e) => updateLine(line.id, 'debit', e.target.value)}
                      className="bg-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs w-full text-right focus:border-indigo-500 outline-none transition-all font-black text-emerald-400"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input 
                      type="number" 
                      placeholder="0" 
                      value={line.credit}
                      onChange={(e) => updateLine(line.id, 'credit', e.target.value)}
                      className="bg-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs w-full text-right focus:border-indigo-500 outline-none transition-all font-black text-rose-400"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => removeLine(line.id)}
                      className="text-slate-600 hover:text-rose-500 p-2 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 font-black border-t border-slate-700/50">
                <td colSpan={2} className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-500">Total de la Pièce</td>
                <td className="px-8 py-5 text-right text-lg text-emerald-400">{totals.debit.toLocaleString()} <span className="text-[10px]">F</span></td>
                <td className="px-8 py-5 text-right text-lg text-rose-400">{totals.credit.toLocaleString()} <span className="text-[10px]">F</span></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Validation Bar */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-6">
            <button 
              onClick={addLine}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              <Plus size={16} /> Ligne Suivante
            </button>
            <div className="flex items-center gap-2">
               {isBalanced ? (
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-black uppercase text-emerald-400">
                    <CheckCircle2 size={14} /> Écritures Équilibrées
                 </div>
               ) : (
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-[10px] font-black uppercase text-rose-400">
                    <AlertCircle size={14} /> Différence : {Math.abs(totals.debit - totals.credit).toLocaleString()} F
                 </div>
               )}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
              Brouillon
            </button>
            <button 
              disabled={!isBalanced}
              className={`flex items-center gap-2 px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl ${isBalanced ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'}`}
            >
              <Save size={18} /> Comptabiliser (F-02)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ToolCard 
          icon={<CreditCard className="text-emerald-400" />} 
          title="Rapprochement Bancaire (FF67)" 
          desc="Synchronisez vos relevés bancaires EBICS/CSV pour une intégration automatique des flux de trésorerie." 
        />
        <ToolCard 
          icon={<Plus className="text-amber-400" />} 
          title="Modèles d'Abonnement (FBD1)" 
          desc="Gérez les loyers, crédits-baux et charges récurrentes avec génération automatique de pièces." 
        />
      </div>
    </div>
  );
};

const InputGroup = ({ label, icon, ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
    <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus-within:border-indigo-500 transition-all">
      <div className="text-slate-500">{icon}</div>
      <input className="bg-transparent border-none outline-none text-xs w-full text-slate-200 font-bold" {...props} />
    </div>
  </div>
);

const ToolCard = ({ icon, title, desc }: any) => (
  <div className="card bg-slate-800/10 border-dashed border-slate-700 p-8 group hover:border-indigo-500/30 transition-all cursor-pointer">
     <div className="flex items-start gap-6">
        <div className="p-4 bg-slate-900 rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
           {icon}
        </div>
        <div>
           <h4 className="font-black text-white text-sm uppercase tracking-widest mb-2">{title}</h4>
           <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
        </div>
     </div>
  </div>
);

const BookOpen = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

export default JournalEntry;
