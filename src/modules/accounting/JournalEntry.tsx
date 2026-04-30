import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, X, Plus, Trash2, Calendar, FileText, 
  CreditCard, Sparkles, BrainCircuit, RefreshCw, 
  AlertCircle, CheckCircle2, History, Info,
  Search, Calculator, ArrowRight, ShieldCheck,
  Zap, Database, ChevronRight, XCircle, Printer, Share2, Target, Layers
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
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Assistant IA flottant (Morning Horizon Style) */}
      <AnimatePresence>
        {isAIOpen && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-12 right-12 z-[110] w-96"
          >
            <div className="bg-white border border-[#cbd5e1] rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-125 transition-transform"></div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#005eb8] text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Sparkles size={22} className="animate-pulse" />
                  </div>
                  <span className="font-bold text-[#0f172a] text-sm tracking-widest uppercase">Assistant Joule Saisie</span>
                </div>
                <button onClick={() => setIsAIOpen(false)} className="text-[#94a3b8] hover:text-[#0f172a] transition-colors"><XCircle size={22} /></button>
              </div>
              <p className="text-[11px] text-[#64748b] font-bold leading-relaxed uppercase tracking-widest mb-6 opacity-80">
                Je surveille votre saisie en temps réel. Je suggère automatiquement les numéros de comptes basés sur l'historique et les patterns SYSCOHADA.
              </p>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-4 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-[#107e3e] animate-pulse"></div>
                <span className="text-[10px] text-[#107e3e] font-black uppercase tracking-[0.2em]">IA Joule en Écoute Active...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <BrainCircuit size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Saisie au Kilomètre (F-02)</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Poste de Travail Expert • Plan Comptable SYSCOHADA v2024 • AI-Powered</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <button 
             onClick={() => setIsAIOpen(!isAIOpen)}
             className={`flex items-center gap-3 px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-md ${isAIOpen ? 'bg-[#ea580c] text-white shadow-orange-500/20' : 'bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a]'}`}
           >
              <Sparkles size={18} /> {isAIOpen ? 'Assistant Actif' : 'Assistant Joule'}
           </button>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <History size={18} /> Historique
           </button>
        </div>
      </div>

      {/* Main Entry Container */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl p-10 shadow-sm flex flex-col gap-10">
        {/* Header Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <InputGroup label="Date d'Écriture Comptable" icon={<Calendar size={20} />} type="date" defaultValue="2024-04-29" />
          
          <div className="flex flex-col gap-4">
            <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.3em] px-1">Journal Auxiliaire</label>
            <div className="flex items-center gap-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-6 py-3.5 shadow-inner group focus-within:border-[#005eb8] focus-within:bg-white transition-all">
              <FileText size={20} className="text-[#cbd5e1] group-focus-within:text-[#005eb8] transition-colors" />
              <select className="bg-transparent border-none outline-none text-xs w-full appearance-none font-black text-[#334155] uppercase tracking-tight cursor-pointer">
                <option>Journal des Achats (AC)</option>
                <option>Journal des Ventes (VE)</option>
                <option>Journal de Banque (BQ)</option>
                <option>Journal d'Opérations Diverses (OD)</option>
              </select>
            </div>
          </div>

          <InputGroup label="Référence de Pièce ERP" icon={<Database size={20} />} placeholder="Ex: FAC-2024-882" />
          
          <div className="flex flex-col gap-4">
            <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.3em] px-1">Contre-passation (FBS1)</label>
            <div className="flex items-center justify-between bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-6 py-3 shadow-inner group hover:bg-white transition-all">
               <div className="flex items-center gap-4">
                  <RefreshCw size={18} className={isAutoReversal ? 'text-[#005eb8] animate-spin' : 'text-[#cbd5e1]'} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isAutoReversal ? 'text-[#0f172a]' : 'text-[#cbd5e1]'}`}>Automatique</span>
               </div>
               <button 
                 onClick={() => setIsAutoReversal(!isAutoReversal)}
                 className={`w-12 h-6 rounded-full transition-all relative ${isAutoReversal ? 'bg-[#005eb8]' : 'bg-[#cbd5e1]'}`}
               >
                  <motion.div animate={{ x: isAutoReversal ? 24 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg" />
               </button>
            </div>
          </div>
        </div>

        {/* Reversal Date Selection (Conditional) */}
        <AnimatePresence>
           {isAutoReversal && (
             <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="p-8 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-12 shadow-inner"
             >
                <div className="flex items-center gap-6 text-[#005eb8]">
                   <Info size={28} className="shrink-0" />
                   <p className="text-[11px] font-black uppercase tracking-[0.2em] leading-relaxed">Une écriture d'inversion automatique sera générée par le système le :</p>
                </div>
                <input 
                  type="date" 
                  value={reversalDate} 
                  onChange={(e) => setReversalDate(e.target.value)}
                  className="bg-white border border-blue-200 rounded-xl px-8 py-3 text-sm text-[#005eb8] font-black outline-none focus:border-[#005eb8] transition-all shadow-sm" 
                />
             </motion.div>
           )}
        </AnimatePresence>

        {/* Multi-line Entry Table */}
        <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl overflow-hidden shadow-inner flex flex-col">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b-2 border-[#cbd5e1]">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#64748b] w-[18%]">Compte G/L</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#64748b] w-[35%]">Désignation du Libellé Flux</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#64748b] text-right w-[20%]">Débit (S)</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#64748b] text-right w-[20%]">Crédit (H)</th>
                <th className="px-10 py-6 text-center w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {lines.map((line, idx) => (
                <tr key={line.id} className="group hover:bg-white transition-all group/row">
                  <td className="px-8 py-5">
                    <input 
                      type="text" 
                      placeholder="N° Compte" 
                      value={line.account}
                      onChange={(e) => updateLine(line.id, 'account', e.target.value)}
                      className="bg-white border border-[#cbd5e1] rounded-xl px-6 py-3.5 text-sm w-full focus:border-[#005eb8] focus:shadow-xl focus:shadow-blue-500/5 outline-none transition-all font-mono text-[#005eb8] font-black uppercase tracking-tighter"
                    />
                  </td>
                  <td className="px-8 py-5">
                    <input 
                      type="text" 
                      placeholder="Libellé de l'opération..." 
                      value={line.label}
                      onChange={(e) => {
                        updateLine(line.id, 'label', e.target.value);
                        if (isAIOpen) predictAccount(e.target.value, idx);
                      }}
                      className="bg-white border border-[#cbd5e1] rounded-xl px-6 py-3.5 text-xs w-full focus:border-[#005eb8] focus:shadow-xl focus:shadow-blue-500/5 outline-none transition-all text-[#334155] font-black uppercase tracking-tight"
                    />
                  </td>
                  <td className="px-8 py-5">
                    <input 
                      type="number" 
                      placeholder="0" 
                      value={line.debit}
                      onChange={(e) => updateLine(line.id, 'debit', e.target.value)}
                      className="bg-white border border-[#cbd5e1] rounded-xl px-6 py-3.5 text-lg w-full text-right focus:border-[#107e3e] focus:shadow-xl focus:shadow-green-500/5 outline-none transition-all font-black text-[#107e3e] tracking-tighter"
                    />
                  </td>
                  <td className="px-8 py-5">
                    <input 
                      type="number" 
                      placeholder="0" 
                      value={line.credit}
                      onChange={(e) => updateLine(line.id, 'credit', e.target.value)}
                      className="bg-white border border-[#cbd5e1] rounded-xl px-6 py-3.5 text-lg w-full text-right focus:border-[#dc2626] focus:shadow-xl focus:shadow-red-500/5 outline-none transition-all font-black text-[#dc2626] tracking-tighter"
                    />
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button 
                      onClick={() => removeLine(line.id)}
                      className="text-[#cbd5e1] hover:text-[#dc2626] p-4 transition-all transform hover:scale-125 opacity-0 group-hover/row:opacity-100"
                    >
                      <Trash2 size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#f8fafc] border-t-2 border-[#cbd5e1]">
              <tr className="font-black">
                <td colSpan={2} className="px-10 py-10 text-[11px] uppercase tracking-[0.4em] text-[#64748b]">Totalisation de la Pièce en Cours</td>
                <td className="px-10 py-10 text-right text-4xl text-[#107e3e] tracking-tighter border-l border-[#cbd5e1]">{totals.debit.toLocaleString()} <span className="text-xs font-black text-[#94a3b8] opacity-50">F</span></td>
                <td className="px-10 py-10 text-right text-4xl text-[#dc2626] tracking-tighter border-l border-[#cbd5e1]">{totals.credit.toLocaleString()} <span className="text-xs font-black text-[#94a3b8] opacity-50">F</span></td>
                <td className="border-l border-[#cbd5e1]"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Validation Dashboard Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 pt-4 border-t border-[#f1f5f9] mt-4">
          <div className="flex items-center gap-10">
            <button 
              onClick={addLine}
              className="flex items-center gap-4 px-10 py-4 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#005eb8] hover:border-[#005eb8] rounded-xl text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-sm group"
            >
              <Plus size={22} className="group-hover:rotate-90 transition-transform" /> Insérer Poste
            </button>
            <div className="flex items-center gap-4">
               {isBalanced ? (
                 <div className="flex items-center gap-4 px-8 py-3.5 bg-green-50 border border-green-200 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-[#107e3e] shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#107e3e] animate-ping"></div>
                    <CheckCircle2 size={20} /> Équilibre Vérifié (O)
                 </div>
               ) : (
                 <div className="flex items-center gap-4 px-8 py-3.5 bg-red-50 border border-red-200 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-[#dc2626] shadow-sm animate-pulse">
                    <AlertCircle size={20} /> Déséquilibre : {Math.abs(totals.debit - totals.credit).toLocaleString()} F
                 </div>
               )}
            </div>
          </div>
          
          <div className="flex gap-6">
            <button className="px-10 py-4 text-[#64748b] hover:text-[#0f172a] text-[11px] font-black uppercase tracking-[0.3em] transition-all">
              Mise en Attente
            </button>
            <button 
              disabled={!isBalanced}
              className={`flex items-center gap-5 px-16 py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl ${isBalanced ? 'bg-[#005eb8] hover:bg-[#004080] text-white shadow-blue-500/30 scale-105 active:scale-95' : 'bg-[#f8fafc] text-[#cbd5e1] cursor-not-allowed border border-[#cbd5e1]'}`}
            >
              <Save size={24} /> Comptabiliser (F-02)
            </button>
          </div>
        </div>
      </div>

      {/* Footer Tools & AI Synthesis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ToolCard 
          icon={<CreditCard className="text-[#107e3e]" size={32} />} 
          title="Module Trésorerie (FF67)" 
          desc="Optimisez vos rapprochements bancaires. L'IA Joule suggère automatiquement le lettrage des règlements." 
        />
        <ToolCard 
          icon={<Calculator className="text-orange-600" size={32} />} 
          title="Modèles Périodiques (FBD1)" 
          desc="Automatisez vos charges d'abonnement (Loyers, Assurances). Génération certifiée OHADA." 
        />
      </div>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-8">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={32} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Validation Croisée ACDOCA Active</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic leading-relaxed">
                  Chaque pièce est soumise au contrôle de cohérence multicritère avant injection dans le Ledger • Joule AI Compliance Suite.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-4 text-[#64748b] hover:text-[#005eb8] text-[10px] font-black uppercase tracking-[0.4em] transition-all group">
               <Printer size={22} className="group-hover:scale-110 transition-transform" /> Imprimer Brouillon
            </button>
            <button className="flex items-center gap-4 text-[#005eb8] hover:text-[#004080] text-[10px] font-black uppercase tracking-[0.5em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={22} className="group-hover:rotate-12 transition-transform" /> Partager Pièce
               <ArrowRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, icon, ...props }: any) => (
  <div className="flex flex-col gap-4">
    <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.3em] px-1">{label}</label>
    <div className="flex items-center gap-5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-6 py-4 focus-within:border-[#005eb8] focus-within:bg-white transition-all shadow-inner group">
      <div className="text-[#cbd5e1] group-focus-within:text-[#005eb8] transition-colors">{icon}</div>
      <input className="bg-transparent border-none outline-none text-xs w-full text-[#334155] font-black uppercase tracking-tight placeholder:text-[#cbd5e1]" {...props} />
    </div>
  </div>
);

const ToolCard = ({ icon, title, desc }: any) => (
  <div className="bg-white border-2 border-dashed border-[#cbd5e1] p-12 rounded-2xl group hover:border-[#005eb8] hover:bg-blue-50/10 transition-all cursor-pointer shadow-sm relative overflow-hidden">
     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
     <div className="flex items-start gap-10 relative z-10">
        <div className="p-6 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1] shadow-inner group-hover:scale-110 transition-transform group-hover:bg-white group-hover:border-[#005eb8] group-hover:text-[#005eb8]">
           {icon}
        </div>
        <div className="flex-1">
           <h4 className="font-black text-[#0f172a] text-sm uppercase tracking-[0.3em] mb-3 group-hover:text-[#005eb8] transition-colors">{title}</h4>
           <p className="text-[11px] text-[#64748b] leading-relaxed font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100">{desc}</p>
        </div>
        <ChevronRight className="text-[#cbd5e1] group-hover:text-[#005eb8] transition-all mt-2 group-hover:translate-x-1" size={28} />
     </div>
  </div>
);

export default JournalEntry;
