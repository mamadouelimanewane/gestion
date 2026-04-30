import React, { useState } from 'react';
import { 
  CreditCard, Send, CheckSquare, Square, 
  Search, Filter, Clock, CheckCircle, 
  AlertCircle, DollarSign, Building, Download,
  Play, FileJson, ShieldCheck, 
  UserCheck, Lock, Unlock, Eye, Trash2,
  ChevronRight, ArrowRight, Layers, Database,
  Printer, Share2, Activity, History, Zap, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VendorInvoice {
  id: string;
  vendorName: string;
  invoiceRef: string;
  dueDate: string;
  amount: number;
  iban: string;
  priority: 'Haute' | 'Normale' | 'Basse';
  status: 'Open' | 'Proposed' | 'Blocked' | 'Paid';
  paymentBlock: boolean;
}

const AutoPaymentProgram = () => {
  const [invoices, setInvoices] = useState<VendorInvoice[]>([
    { id: '1', vendorName: 'SONATEL ORANGE SA', invoiceRef: 'INV-OR-998', dueDate: '2024-04-25', amount: 850000, iban: 'SN012 01001 0123456789 01', priority: 'Haute', status: 'Open', paymentBlock: false },
    { id: '2', vendorName: 'SENELEC GROUPE', invoiceRef: 'FAC-SN-450', dueDate: '2024-04-20', amount: 1250000, iban: 'SN012 02002 9876543210 99', priority: 'Haute', status: 'Open', paymentBlock: false },
    { id: '3', vendorName: 'PAPETERIE DU PARC', invoiceRef: 'PAP-2024-012', dueDate: '2024-05-10', amount: 45000, iban: 'SN012 03003 1112223334 55', priority: 'Basse', status: 'Open', paymentBlock: true },
    { id: '4', vendorName: 'SDE EAU EXPLOITATION', invoiceRef: 'EAU-7781', dueDate: '2024-04-28', amount: 125000, iban: 'SN012 01001 5554443332 10', priority: 'Normale', status: 'Open', paymentBlock: false },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [step, setStep] = useState<'Selection' | 'Proposal' | 'Approval' | 'Payment'>('Selection');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBank, setSelectedBank] = useState('ECOBANK-SN');

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleBlock = (id: string) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === id ? { ...inv, paymentBlock: !inv.paymentBlock } : inv
    ));
  };

  const nextStep = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (step === 'Selection') setStep('Proposal');
      else if (step === 'Proposal') setStep('Approval');
      else if (step === 'Approval') setStep('Payment');
      setIsProcessing(false);
    }, 1200);
  };

  const runPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setInvoices(prev => prev.map(inv => 
        selectedIds.includes(inv.id) && !inv.paymentBlock ? { ...inv, status: 'Paid' } : inv
      ));
      setStep('Payment');
      setIsProcessing(false);
    }, 2000);
  };

  const totalAmount = invoices
    .filter(inv => selectedIds.includes(inv.id) && !inv.paymentBlock)
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="flex flex-col h-full gap-10 bg-white p-10 min-h-screen">
      {/* Premium Header - Diamond Azure Elite */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,94,184,0.08)] relative overflow-hidden group border border-blue-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-48 -mt-48 blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="flex items-center gap-10 relative z-10">
           <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0a6ed1] to-blue-600 flex items-center justify-center text-white shadow-[0_15px_30px_rgba(10,110,209,0.3)] group-hover:rotate-6 transition-transform duration-500">
              <CreditCard size={40} strokeWidth={2.5} />
           </div>
           <div>
              <h3 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Programme de Paiement Auto (F110)</h3>
              <p className="text-[12px] text-[#64748b] font-black uppercase tracking-[0.3em] italic opacity-80 flex items-center gap-3">
                 <Landmark size={16} className="text-[#0a6ed1]" /> Ordonnancement Bancaire • ISO 20022 XML • Swift Global Pay
              </p>
           </div>
        </div>
        
        <div className="flex gap-6 relative z-10 mt-8 lg:mt-0">
           <div className="bg-blue-50/50 border border-blue-100 rounded-2xl px-8 py-4 flex items-center gap-5 shadow-inner group-focus-within:border-[#0a6ed1] transition-all h-[60px]">
              <Building size={24} className="text-blue-300" />
              <select 
                value={selectedBank} 
                onChange={(e) => setSelectedBank(e.target.value)}
                className="bg-transparent text-[12px] font-black text-[#0f172a] outline-none border-none uppercase tracking-widest cursor-pointer"
              >
                 <option value="ECOBANK-SN">ECOBANK SÉNÉGAL</option>
                 <option value="CBAO-SN">CBAO GROUPE ATTIJARI</option>
                 <option value="SGBS-SN">SOCIÉTÉ GÉNÉRALE SN</option>
              </select>
           </div>
           {step !== 'Payment' && (
             <button 
               onClick={step === 'Approval' ? runPayment : nextStep}
               disabled={selectedIds.length === 0 || isProcessing}
               className={`flex items-center gap-4 px-12 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl h-[60px] ${
                 selectedIds.length === 0 || isProcessing 
                 ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100' 
                 : 'bg-[#0a6ed1] hover:bg-blue-700 text-white shadow-blue-500/30 scale-105 active:scale-95'
               }`}
             >
                {isProcessing ? <RefreshCw className="animate-spin" size={24} /> : step === 'Approval' ? <ShieldCheck size={24} /> : <Send size={24} />}
                {isProcessing ? 'Traitement...' : step === 'Approval' ? 'Exécuter le Virement' : 'Générer Proposition'}
             </button>
           )}
        </div>
      </div>

      {/* Stepper Logic - Diamond Style */}
      <div className="bg-white border border-blue-50 p-12 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,94,184,0.03)] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-blue-50/30"></div>
         <div className="flex items-center justify-between w-full max-w-6xl mx-auto relative">
            <div className="absolute top-8 left-0 right-0 h-1 bg-blue-50 -z-0 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: step === 'Selection' ? '0%' : step === 'Proposal' ? '33.3%' : step === 'Approval' ? '66.6%' : '100%' }}
                 className="h-full bg-gradient-to-r from-[#0a6ed1] to-blue-400 shadow-[0_0_20px_rgba(10,110,209,0.4)] transition-all duration-1000"
               />
            </div>
            <StepItem active={step === 'Selection'} completed={['Proposal', 'Approval', 'Payment'].includes(step)} label="Paramètres" icon={<Filter size={24} />} />
            <StepItem active={step === 'Proposal'} completed={['Approval', 'Payment'].includes(step)} label="Proposition" icon={<Play size={24} />} />
            <StepItem active={step === 'Approval'} completed={step === 'Payment'} label="Validation DAF" icon={<UserCheck size={24} />} />
            <StepItem active={step === 'Payment'} completed={false} label="Exécution ISO" icon={<ShieldCheck size={24} />} />
         </div>
      </div>

      {/* Main Table Container - Ultra High Contrast */}
      <div className="bg-white rounded-[2.5rem] border border-blue-50 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.04)] flex flex-col flex-1 min-h-[600px]">
        <div className="bg-white px-12 py-8 border-b border-blue-50 flex justify-between items-center sticky top-0 z-20 shadow-sm backdrop-blur-md">
           <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 text-[#0a6ed1] rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={24} />
              </div>
              <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#0f172a]">
                 {step === 'Selection' && "Sélection des Postes Ouverts (Classe 4)"}
                 {step === 'Proposal' && "Édition de la Proposition de Paiement"}
                 {step === 'Approval' && "Validation Hiérarchique du Cycle"}
                 {step === 'Payment' && "Confirmation de l'Ordre de Virement"}
              </h3>
           </div>
           <div className="flex gap-6">
              <div className="relative group w-72">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200 group-focus-within:text-[#0a6ed1] transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Chercher facture..." 
                  className="pl-14 pr-8 py-4 bg-blue-50/30 border border-blue-100 rounded-2xl text-[12px] font-black uppercase tracking-widest text-[#0f172a] placeholder:text-blue-200 outline-none focus:border-[#0a6ed1] transition-all w-full shadow-inner h-[55px]"
                />
              </div>
              <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] hover:border-[#0a6ed1] shadow-sm flex items-center justify-center transition-all">
                 <Printer size={24} />
              </button>
           </div>
        </div>

        <div className="overflow-auto flex-1 custom-scrollbar">
          {step !== 'Payment' ? (
            <table className="w-full text-left whitespace-nowrap border-collapse">
              <thead className="bg-white border-b-2 border-blue-50 text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] sticky top-0 z-20 shadow-sm">
                <tr>
                  <th className="px-12 py-8 w-24 text-center">
                    {step === 'Selection' && (
                      <button onClick={() => setSelectedIds(selectedIds.length === invoices.length ? [] : invoices.map(i => i.id))} className="w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all mx-auto border-blue-100 bg-white hover:border-[#0a6ed1]">
                        {selectedIds.length === invoices.length ? <Check size={24} className="text-[#0a6ed1]" strokeWidth={4} /> : null}
                      </button>
                    )}
                  </th>
                  <th className="px-12 py-8">Fournisseur / Compte Bancaire</th>
                  <th className="px-12 py-8">Référence Pièce</th>
                  <th className="px-12 py-8 text-right font-black text-[#0a6ed1]">Montant Brut (F)</th>
                  <th className="px-12 py-8 text-center w-40">Statut/Blocage</th>
                  <th className="px-12 py-8 w-20 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50/50">
                {invoices.filter(inv => step === 'Selection' || selectedIds.includes(inv.id)).map((inv) => (
                  <tr key={inv.id} className={`group cursor-pointer transition-all duration-300 ${selectedIds.includes(inv.id) ? 'bg-blue-50/50' : 'hover:bg-blue-50/20'}`}>
                    <td className="px-12 py-8 text-center border-r border-blue-50/30">
                      {step === 'Selection' && (
                        <div onClick={() => toggleSelect(inv.id)} className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all mx-auto duration-500 ${
                          selectedIds.includes(inv.id) ? 'bg-[#0a6ed1] border-[#0a6ed1] shadow-2xl scale-110' : 'border-blue-100 bg-white group-hover:border-blue-300'
                        }`}>
                          {selectedIds.includes(inv.id) && <Check size={24} className="text-white" strokeWidth={4} />}
                        </div>
                      )}
                      {step !== 'Selection' && <CheckCircle size={28} className="text-[#107e3e] mx-auto shadow-sm" />}
                    </td>
                    <td className="px-12 py-8 border-r border-blue-50/30">
                      <div className="flex flex-col">
                        <span className="text-base font-black text-[#0f172a] uppercase tracking-tight group-hover:text-[#0a6ed1] transition-colors">{inv.vendorName}</span>
                        <span className="text-[11px] font-mono text-slate-400 font-black mt-2 tracking-widest flex items-center gap-3">
                           <Landmark size={14} /> {inv.iban}
                        </span>
                      </div>
                    </td>
                    <td className="px-12 py-8 border-r border-blue-50/30">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-black text-[#0a6ed1] uppercase tracking-[0.2em]">{inv.invoiceRef}</span>
                        <span className="text-[10px] text-slate-300 font-black uppercase mt-2 tracking-widest opacity-80">Échéance : {new Date(inv.dueDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </td>
                    <td className="px-12 py-8 text-right border-r border-blue-50/30">
                      <span className="text-2xl font-black text-[#0f172a] tracking-tighter block leading-none group-hover:scale-105 transition-transform origin-right">{inv.amount.toLocaleString()} <span className="text-sm opacity-20 ml-1">F</span></span>
                    </td>
                    <td className="px-12 py-8 text-center border-r border-blue-50/30">
                       <button 
                         onClick={(e) => { e.stopPropagation(); toggleBlock(inv.id); }}
                         disabled={step === 'Approval' || step === 'Payment'}
                         className={`w-14 h-14 rounded-2xl border transition-all duration-500 flex items-center justify-center ${inv.paymentBlock ? 'bg-red-50 border-red-100 text-[#dc2626] shadow-inner' : 'bg-white border-blue-100 text-slate-300 hover:text-[#0a6ed1] hover:border-[#0a6ed1] hover:bg-blue-50'}`}
                       >
                          {inv.paymentBlock ? <Lock size={22} /> : <Unlock size={22} />}
                       </button>
                    </td>
                    <td className="px-12 py-8 text-right">
                       <div className="flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                          <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] shadow-sm flex items-center justify-center transition-all"><Eye size={22} /></button>
                          <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#dc2626] shadow-sm flex items-center justify-center transition-all"><Trash2 size={22} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-32 bg-white relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-transparent pointer-events-none"></div>
               <motion.div 
                 initial={{ scale: 0.5, opacity: 0 }} 
                 animate={{ scale: 1, opacity: 1 }} 
                 className="w-40 h-40 bg-[#107e3e]/10 rounded-[4rem] border border-[#107e3e]/20 flex items-center justify-center mb-12 shadow-3xl relative z-10"
               >
                  <div className="absolute inset-0 bg-[#107e3e]/5 animate-ping rounded-[4rem]"></div>
                  <CheckCircle size={80} className="text-[#107e3e] relative z-10" strokeWidth={1.5} />
               </motion.div>
               <h4 className="text-5xl font-black text-[#0f172a] uppercase tracking-tighter mb-8 leading-none relative z-10">Transmission Réussie (ISO 20022)</h4>
               <p className="text-slate-400 max-w-2xl text-lg leading-relaxed font-black uppercase tracking-[0.3em] opacity-80 mb-16 relative z-10">
                 Le fichier de virement bancaire hautement sécurisé a été transmis à la passerelle **{selectedBank}**. 
                 <br />Total consolidé : <span className="text-[#107e3e] underline underline-offset-[12px] decoration-4 text-3xl ml-3">{totalAmount.toLocaleString()} F CFA</span>.
               </p>
               <div className="flex gap-8 relative z-10">
                  <button className="flex items-center gap-5 px-12 py-6 bg-white border border-blue-100 hover:border-[#0a6ed1] text-[#0a6ed1] rounded-3xl text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-xl shadow-blue-500/5 group">
                     <Download size={28} className="group-hover:translate-y-2 transition-transform duration-500" /> Télécharger XML Swift
                  </button>
                  <button className="flex items-center gap-5 px-12 py-6 bg-[#0a6ed1] hover:bg-blue-700 text-white rounded-3xl text-[12px] font-black uppercase tracking-[0.5em] transition-all shadow-3xl shadow-blue-500/30 group scale-105">
                     <FileJson size={28} className="group-hover:rotate-12 transition-transform duration-500" /> Journal de Bord ISO
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Synthesis Panel - Diamond Azure Elite */}
      <AnimatePresence>
         {selectedIds.length > 0 && step !== 'Payment' && (
           <motion.div 
             initial={{ y: 150, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: 150, opacity: 0 }}
             className="fixed bottom-14 left-14 right-14 z-50 pointer-events-none"
           >
              <div className="bg-white/95 backdrop-blur-3xl border border-blue-100 rounded-[3rem] p-12 flex items-center justify-between shadow-[0_40px_100px_rgba(0,0,0,0.12)] pointer-events-auto ring-1 ring-blue-50 group/synthesis">
                 <div className="flex items-center gap-14">
                    <div className="w-20 h-20 bg-[#0a6ed1] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/40 group cursor-pointer overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-transparent opacity-40"></div>
                       <DollarSign className="text-white relative z-10 group-hover:scale-125 transition-transform duration-700" size={40} />
                    </div>
                    <div className="flex flex-col">
                       <p className="text-[14px] text-slate-400 uppercase font-black tracking-[0.5em] leading-none mb-4 opacity-70">Cycle de Paiement Consolidé</p>
                       <h4 className="text-5xl font-black text-[#0f172a] tracking-tighter leading-none group-hover:text-[#0a6ed1] transition-colors duration-500">{totalAmount.toLocaleString()} <span className="text-base text-slate-200 font-black ml-3 tracking-[0.3em] uppercase">F CFA</span></h4>
                    </div>
                    <div className="h-16 w-px bg-blue-50 mx-10"></div>
                    <div className="flex flex-col">
                       <span className="text-[14px] font-black text-[#0a6ed1] uppercase tracking-[0.4em] flex items-center gap-4">
                          <CheckCircle size={20} /> {selectedIds.length} Factures Prêtes
                       </span>
                       <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mt-3 italic">Gateway : {selectedBank} • Swift Active</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-8">
                    <div className={`flex items-center gap-4 px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] border shadow-sm ${step === 'Approval' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-emerald-50 border-emerald-200 text-[#107e3e]'}`}>
                       <ShieldCheck size={24} />
                       {step === 'Approval' ? 'Attente Validation DAF' : 'Flux Certifié Joule'}
                    </div>
                    <div className="w-14 h-14 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-200 animate-pulse">
                       <Zap size={28} />
                    </div>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>

      {/* Footer System Integrity - Diamond Style */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-blue-50 p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] gap-10 mt-auto group/footer overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-1000"></div>
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#107e3e] to-emerald-600 text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 group/shield cursor-pointer">
               <ShieldCheck size={40} className="group-hover/shield:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Souveraineté des Paiements (F110 Master)</span>
               <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 opacity-70 italic leading-relaxed max-w-3xl">
                  L'intégrité des virements est certifiée par Joule AI Auditor conformément aux normes bancaires internationales **ISO 20022** et **SEPA XML**.
               </p>
            </div>
         </div>
         <div className="flex gap-14 items-center relative z-10">
            <button className="flex items-center gap-5 text-slate-300 hover:text-[#0a6ed1] text-[12px] font-black uppercase tracking-[0.4em] transition-all group/btn">
               <History size={28} className="group-hover/btn:rotate-[-45deg] transition-transform duration-500" /> Swift Logs
            </button>
            <button className="flex items-center gap-6 text-[#0a6ed1] hover:text-blue-700 text-[12px] font-black uppercase tracking-[0.5em] transition-all group/strat border-l border-blue-50 pl-14 h-12">
               <Share2 size={28} className="group-hover:rotate-12 transition-transform duration-500" /> Transmission ISO
               <ArrowRight size={22} className="opacity-10 group-hover/strat:opacity-100 group-hover/strat:translate-x-3 transition-all duration-500" />
            </button>
         </div>
      </div>
    </div>
  );
};

const StepItem = ({ active, completed, label, icon }: any) => (
  <div className="flex flex-col items-center gap-6 relative z-10 px-10">
    <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center transition-all duration-700 shadow-sm border-2 ${
      completed ? 'bg-[#107e3e] text-white border-[#107e3e] shadow-emerald-500/30' : 
      active ? 'bg-white text-[#0a6ed1] border-[#0a6ed1] shadow-blue-500/30 scale-125 rotate-3' : 
      'bg-white text-slate-100 border-blue-50'
    }`}>
      {completed ? <Check size={40} strokeWidth={4} /> : icon}
    </div>
    <span className={`text-[11px] font-black uppercase tracking-[0.5em] text-center transition-all duration-700 ${
      active ? 'text-[#0a6ed1] scale-110' : 'text-slate-200'
    }`}>
      {label}
    </span>
  </div>
);

const RefreshCw = ({ size, className }: any) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);

export default AutoPaymentProgram;
