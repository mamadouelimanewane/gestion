import React, { useState } from 'react';
import { 
  CreditCard, Send, CheckSquare, Square, 
  Search, Filter, Clock, CheckCircle, 
  AlertCircle, DollarSign, Building, Download,
  Play, RefreshCw, FileJson, ShieldCheck, 
  UserCheck, Lock, Unlock, Eye, Trash2
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
    { id: '1', vendorName: 'SONATEL ORANGE', invoiceRef: 'INV-OR-998', dueDate: '2024-04-25', amount: 850000, iban: 'SN012 01001 0123456789 01', priority: 'Haute', status: 'Open', paymentBlock: false },
    { id: '2', vendorName: 'SENELEC', invoiceRef: 'FAC-SN-450', dueDate: '2024-04-20', amount: 1250000, iban: 'SN012 02002 9876543210 99', priority: 'Haute', status: 'Open', paymentBlock: false },
    { id: '3', vendorName: 'PAPETERIE DU PARC', invoiceRef: 'PAP-2024-012', dueDate: '2024-05-10', amount: 45000, iban: 'SN012 03003 1112223334 55', priority: 'Basse', status: 'Open', paymentBlock: true },
    { id: '4', vendorName: 'SDE EAU', invoiceRef: 'EAU-7781', dueDate: '2024-04-28', amount: 125000, iban: 'SN012 01001 5554443332 10', priority: 'Normale', status: 'Open', paymentBlock: false },
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
    <div className="flex flex-col h-full gap-8">
      {/* Stepper Premium */}
      <div className="flex items-center justify-center pt-4">
        <div className="flex items-center w-full max-w-3xl">
          <StepItem active={step === 'Selection'} completed={['Proposal', 'Approval', 'Payment'].includes(step)} label="Paramètres" icon={<Filter size={16} />} />
          <div className={`flex-1 h-1 mx-2 rounded-full ${['Proposal', 'Approval', 'Payment'].includes(step) ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}></div>
          <StepItem active={step === 'Proposal'} completed={['Approval', 'Payment'].includes(step)} label="Proposition" icon={<Play size={16} />} />
          <div className={`flex-1 h-1 mx-2 rounded-full ${['Approval', 'Payment'].includes(step) ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}></div>
          <StepItem active={step === 'Approval'} completed={step === 'Payment'} label="Validation DAF" icon={<UserCheck size={16} />} />
          <div className={`flex-1 h-1 mx-2 rounded-full ${step === 'Payment' ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}></div>
          <StepItem active={step === 'Payment'} completed={false} label="Exécution ISO" icon={<CreditCard size={16} />} />
        </div>
      </div>

      {/* Main Container */}
      <div className="card bg-slate-800/20 border-slate-700/50 flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50 bg-slate-800/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-inner">
                <RefreshCw className={isProcessing ? 'animate-spin' : ''} size={24} />
             </div>
             <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                   {step === 'Selection' && "Sélection des Postes Ouverts"}
                   {step === 'Proposal' && "Édition de la Proposition"}
                   {step === 'Approval' && "Validation Hiérarchique"}
                   {step === 'Payment' && "Fichier Bancaire ISO 20022"}
                </h3>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Transaction SAP Simulator F110 • v6.2</p>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              value={selectedBank} 
              onChange={(e) => setSelectedBank(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs font-black text-indigo-400 outline-none focus:border-indigo-500 transition-all"
            >
               <option value="ECOBANK-SN">ECOBANK SÉNÉGAL</option>
               <option value="CBAO-SN">CBAO GROUPE ATTIJARIWAFA</option>
               <option value="SGBS-SN">SOCIÉTÉ GÉNÉRALE SN</option>
            </select>
            <div className="w-px h-8 bg-slate-700"></div>
            {step !== 'Payment' && (
              <button 
                onClick={step === 'Approval' ? runPayment : nextStep}
                disabled={selectedIds.length === 0 || isProcessing}
                className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl ${
                   selectedIds.length === 0 || isProcessing ? 'bg-slate-800 text-slate-600' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                }`}
              >
                {step === 'Approval' ? <ShieldCheck size={16} /> : <Send size={16} />}
                {isProcessing ? 'Traitement...' : step === 'Approval' ? 'Autoriser le Paiement' : 'Étape Suivante'}
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {step !== 'Payment' ? (
            <table className="w-full text-left">
              <thead className="bg-slate-800/80 border-b border-slate-700 font-black uppercase text-[10px] tracking-widest text-slate-500 sticky top-0 z-10">
                <tr>
                  <th className="p-6 w-16">
                    {step === 'Selection' && (
                      <button onClick={() => setSelectedIds(selectedIds.length === invoices.length ? [] : invoices.map(i => i.id))}>
                        {selectedIds.length === invoices.length ? <CheckSquare className="text-indigo-400" size={20} /> : <Square className="text-slate-600" size={20} />}
                      </button>
                    )}
                  </th>
                  <th className="p-6">Fournisseur / Compte IBAN</th>
                  <th className="p-6">Référence Pièce</th>
                  <th className="p-6 text-right">Montant Brut</th>
                  <th className="p-6 text-center">Blocage</th>
                  <th className="p-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {invoices.filter(inv => step === 'Selection' || selectedIds.includes(inv.id)).map((inv) => (
                  <tr key={inv.id} className={`group hover:bg-indigo-500/5 transition-all ${selectedIds.includes(inv.id) ? 'bg-indigo-500/5' : ''}`}>
                    <td className="p-6">
                      {step === 'Selection' && (
                        <button onClick={() => toggleSelect(inv.id)}>
                          {selectedIds.includes(inv.id) ? <CheckSquare className="text-indigo-400" size={20} /> : <Square className="text-slate-700" size={20} />}
                        </button>
                      )}
                      {step !== 'Selection' && <CheckCircle size={20} className="text-indigo-500/50" />}
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{inv.vendorName}</span>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">{inv.iban}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-300 font-black uppercase tracking-widest">{inv.invoiceRef}</span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase">Échéance : {new Date(inv.dueDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <span className="text-sm font-black text-white">{inv.amount.toLocaleString()} F</span>
                    </td>
                    <td className="p-6 text-center">
                       <button 
                         onClick={() => toggleBlock(inv.id)}
                         disabled={step === 'Approval' || step === 'Payment'}
                         className={`p-2 rounded-xl border transition-all ${inv.paymentBlock ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-slate-900 border-slate-800 text-slate-600 hover:text-emerald-400'}`}
                       >
                          {inv.paymentBlock ? <Lock size={16} /> : <Unlock size={16} />}
                       </button>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg"><Eye size={16} /></button>
                          <button className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg"><Trash2 size={16} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
               <motion.div 
                 initial={{ scale: 0.5, opacity: 0 }} 
                 animate={{ scale: 1, opacity: 1 }} 
                 className="w-32 h-32 bg-emerald-500/10 rounded-[2rem] border border-emerald-500/20 flex items-center justify-center mb-8 shadow-2xl"
               >
                  <CheckCircle size={64} className="text-emerald-400" />
               </motion.div>
               <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Paiements Exécutés avec Succès</h4>
               <p className="text-slate-400 max-w-xl text-sm leading-relaxed font-medium mb-10">
                 Le fichier de virement bancaire **ISO 20022 XML** a été transmis à la passerelle **{selectedBank}**. 
                 Montant total consolidé : <span className="text-emerald-400 font-black">{totalAmount.toLocaleString()} F CFA</span>.
               </p>
               <div className="flex gap-4">
                  <button className="flex items-center gap-3 px-8 py-4 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                     <Download size={20} /> Télécharger XML
                  </button>
                  <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/30">
                     <FileJson size={20} /> Journal de Bord
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Summary Bar */}
      <AnimatePresence>
         {selectedIds.length > 0 && step !== 'Payment' && (
           <motion.div 
             initial={{ y: 100 }}
             animate={{ y: 0 }}
             exit={{ y: 100 }}
             className="fixed bottom-10 left-[calc(18rem+2rem)] right-8 z-40"
           >
              <div className="bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-6 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                       <DollarSign className="text-white" size={28} />
                    </div>
                    <div>
                       <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1.5">Cycle de Paiement Actuel</p>
                       <h4 className="text-2xl font-black text-white">{totalAmount.toLocaleString()} <span className="text-sm text-slate-500 font-bold ml-1">F CFA</span></h4>
                    </div>
                    <div className="h-10 w-px bg-slate-800 mx-2"></div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{selectedIds.length} Factures</span>
                       <span className="text-[10px] font-bold text-slate-600 uppercase">Prochain Virement : {selectedBank}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase border ${step === 'Approval' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                       <ShieldCheck size={14} />
                       Statut : {step === 'Approval' ? 'En attente de validation DAF' : 'Prêt pour exécution'}
                    </div>
                    <AlertCircle size={20} className="text-indigo-400 animate-pulse" />
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const StepItem = ({ active, completed, label, icon }: any) => (
  <div className="flex flex-col items-center gap-3 relative">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
      completed ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' : 
      active ? 'bg-indigo-500/20 text-indigo-400 border-2 border-indigo-500 shadow-xl shadow-indigo-500/20 scale-110' : 
      'bg-slate-900 text-slate-600 border border-slate-800'
    }`}>
      {completed ? <CheckCircle size={24} /> : icon}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-[0.2em] text-center whitespace-nowrap absolute -bottom-8 ${
      active ? 'text-indigo-400' : 'text-slate-600'
    }`}>
      {label}
    </span>
  </div>
);

export default AutoPaymentProgram;
