import React, { useState } from 'react';
import { 
  Mail, Send, FileText, AlertTriangle, Clock, 
  CheckCircle, Search, Filter, ArrowRight, Printer,
  User, DollarSign, Calendar, ChevronRight, Share2,
  Download, History, ShieldCheck, Zap, Activity,
  MoreVertical, Bell, Info, Landmark, Layers, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OverdueInvoice {
  id: string;
  customerName: string;
  invoiceNumber: string;
  dueDate: string;
  amount: number;
  daysOverdue: number;
  dunningLevel: 0 | 1 | 2 | 3;
  status: 'Pending' | 'Sent' | 'Paid';
}

const CustomerDunning = () => {
  const [invoices, setInvoices] = useState<OverdueInvoice[]>([
    { id: '1', customerName: 'SARL SUNU SERVICES DAKAR', invoiceNumber: 'FAC-2024-102', dueDate: '2024-03-01', amount: 1250000, daysOverdue: 60, dunningLevel: 2, status: 'Pending' },
    { id: '2', customerName: 'ETS DIALLO & FILS EXPORT', invoiceNumber: 'FAC-2024-115', dueDate: '2024-04-10', amount: 450000, daysOverdue: 19, dunningLevel: 1, status: 'Pending' },
    { id: '3', customerName: 'GLOBAL TECH SA ATLANTIC', invoiceNumber: 'FAC-2024-098', dueDate: '2024-02-15', amount: 3200000, daysOverdue: 74, dunningLevel: 3, status: 'Sent' },
    { id: '4', customerName: 'BOUTIQUE HORIZON FASHION', invoiceNumber: 'FAC-2024-120', dueDate: '2024-04-20', amount: 150000, daysOverdue: 9, dunningLevel: 0, status: 'Pending' },
  ]);

  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedInvoices(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getLevelBadge = (level: number) => {
    switch(level) {
      case 1: return <span className="px-5 py-1.5 bg-blue-50 text-[#005eb8] border border-blue-200 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Niveau 1 : Rappel Préventif</span>;
      case 2: return <span className="px-5 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Niveau 2 : Relance Impérative</span>;
      case 3: return <span className="px-5 py-1.5 bg-red-50 text-[#dc2626] border border-red-200 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm animate-pulse">Niveau 3 : Mise en Demeure</span>;
      default: return <span className="px-5 py-1.5 bg-slate-50 text-[#64748b] border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Nouveau Retard Détecté</span>;
    }
  };

  const processDunning = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setInvoices(prev => prev.map(inv => 
        selectedInvoices.includes(inv.id) 
          ? { ...inv, dunningLevel: Math.min(inv.dunningLevel + 1, 3) as any, status: 'Sent' }
          : inv
      ));
      setSelectedInvoices([]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full gap-10 bg-white p-10 min-h-screen">
      {/* Premium Header - Diamond Azure Elite */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,94,184,0.08)] relative overflow-hidden group border border-blue-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-48 -mt-48 blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="flex items-center gap-10 relative z-10">
           <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0a6ed1] to-blue-600 flex items-center justify-center text-white shadow-[0_15px_30px_rgba(10,110,209,0.3)] group-hover:rotate-6 transition-transform duration-500">
              <Bell size={40} strokeWidth={2.5} />
           </div>
           <div>
              <h3 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Gestion des Relances (Dunning AR)</h3>
              <p className="text-[12px] text-[#64748b] font-black uppercase tracking-[0.3em] italic opacity-80 flex items-center gap-3">
                 <ShieldCheck size={16} className="text-[#0a6ed1]" /> Recouvrement Intelligent • Joule AI Compliance • OHADA v2024
              </p>
           </div>
        </div>
        
        <div className="flex gap-6 relative z-10 mt-8 lg:mt-0">
           <button className="flex items-center gap-4 px-8 py-4 bg-white border border-blue-100 rounded-2xl text-[12px] font-black text-[#64748b] hover:text-[#0a6ed1] hover:border-[#0a6ed1] hover:bg-blue-50/30 transition-all shadow-sm h-[60px]">
              <Printer size={22} /> Paramètres
           </button>
           <button 
             disabled={selectedInvoices.length === 0 || isProcessing}
             onClick={processDunning}
             className={`flex items-center gap-4 px-12 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl h-[60px] ${
               selectedInvoices.length === 0 || isProcessing 
               ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100' 
               : 'bg-[#0a6ed1] hover:bg-blue-700 text-white shadow-blue-500/30 scale-105 active:scale-95'
             }`}
           >
              {isProcessing ? <RefreshCw className="animate-spin" size={24} /> : <Send size={24} />}
              Lancer les Relances ({selectedInvoices.length})
           </button>
        </div>
      </div>

      {/* KPI Stats Grid - No Grey Cards, Only Pure White & Pure Blue Shadows */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <StatCard title="Total Impayés" value="5 050 000 F" icon={<DollarSign size={28} />} color="blue" trend="+12%" />
        <StatCard title="Retard > 60 Jours" value="4 450 000 F" icon={<Clock size={28} />} color="red" trend="+5%" />
        <StatCard title="Relances du Mois" value="128" icon={<Mail size={28} />} color="green" trend="-2%" />
        <StatCard title="Taux Recouvrement" value="84.2%" icon={<Activity size={28} />} color="amber" trend="+3%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main List Area - Ultra High Contrast */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-blue-50 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.04)] flex flex-col min-h-[700px]">
           <div className="bg-white px-12 py-8 border-b border-blue-50 flex justify-between items-center sticky top-0 z-20 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 bg-blue-50 text-[#0a6ed1] rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner">
                    <Layers size={24} />
                 </div>
                 <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#0f172a]">Factures en Souffrance (Aging Engine)</h3>
              </div>
              <div className="flex gap-6">
                 <div className="relative group w-80">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200 group-focus-within:text-[#0a6ed1] transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="Chercher client..." 
                      className="pl-14 pr-8 py-4 bg-blue-50/30 border border-blue-100 rounded-2xl text-[12px] font-black uppercase tracking-widest text-[#0f172a] placeholder:text-blue-200 outline-none focus:border-[#0a6ed1] focus:bg-white transition-all w-full shadow-inner h-[55px]"
                    />
                 </div>
              </div>
           </div>

           <div className="overflow-auto flex-1 custom-scrollbar">
              <table className="w-full text-left whitespace-nowrap border-collapse">
                 <thead className="bg-white border-b-2 border-blue-50 text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] sticky top-0 z-20 shadow-sm">
                    <tr>
                       <th className="px-12 py-8 w-24 text-center">
                          <button onClick={() => setSelectedInvoices(selectedInvoices.length === invoices.length ? [] : invoices.map(i => i.id))} className="w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all mx-auto border-blue-100 bg-white hover:border-[#0a6ed1]">
                            {selectedInvoices.length === invoices.length ? <Check size={24} className="text-[#0a6ed1]" strokeWidth={4} /> : null}
                          </button>
                       </th>
                       <th className="px-12 py-8">Client / Raison Sociale</th>
                       <th className="px-12 py-8 text-center">Niveau Actuel</th>
                       <th className="px-12 py-8 text-right font-black text-[#0a6ed1]">Montant (F)</th>
                       <th className="px-12 py-8 text-center w-40">Délai</th>
                       <th className="px-12 py-8 w-20 text-center"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-blue-50/50">
                    {invoices.map((inv) => (
                       <tr key={inv.id} className={`group cursor-pointer transition-all duration-300 ${selectedInvoices.includes(inv.id) ? 'bg-blue-50/50' : 'hover:bg-blue-50/20'}`}>
                          <td className="px-12 py-8 text-center border-r border-blue-50/30">
                             <div onClick={() => toggleSelect(inv.id)} className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all mx-auto duration-500 ${
                               selectedInvoices.includes(inv.id) ? 'bg-[#0a6ed1] border-[#0a6ed1] shadow-2xl scale-110' : 'border-blue-100 bg-white group-hover:border-blue-300'
                             }`}>
                                {selectedInvoices.includes(inv.id) && <Check size={24} className="text-white" strokeWidth={4} />}
                             </div>
                          </td>
                          <td className="px-12 py-8 border-r border-blue-50/30">
                             <div className="flex flex-col">
                                <span className="text-base font-black text-[#0f172a] uppercase tracking-tight group-hover:text-[#0a6ed1] transition-colors">{inv.customerName}</span>
                                <span className="text-[11px] font-mono text-slate-400 font-black mt-2 tracking-widest leading-none flex items-center gap-3">
                                   <Database size={14} /> {inv.invoiceNumber}
                                </span>
                             </div>
                          </td>
                          <td className="px-12 py-8 border-r border-blue-50/30 text-center">
                             {getLevelBadge(inv.dunningLevel)}
                          </td>
                          <td className="px-12 py-8 text-right border-r border-blue-50/30">
                             <span className="text-2xl font-black text-[#0f172a] tracking-tighter group-hover:scale-105 transition-transform origin-right block leading-none">{inv.amount.toLocaleString()} <span className="text-sm opacity-20 ml-1">F</span></span>
                          </td>
                          <td className="px-12 py-8 text-center border-r border-blue-50/30">
                             <div className="flex flex-col items-center">
                                <span className={`text-xl font-black tracking-tighter leading-none ${inv.daysOverdue > 60 ? 'text-[#dc2626]' : inv.daysOverdue > 30 ? 'text-amber-600' : 'text-[#107e3e]'}`}>
                                   {inv.daysOverdue} J
                                </span>
                                <span className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em] mt-2">Dépassement</span>
                             </div>
                          </td>
                          <td className="px-12 py-8 text-right">
                             <div className="flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-slate-300 hover:text-[#0a6ed1] hover:border-[#0a6ed1] shadow-sm flex items-center justify-center transition-all"><MoreVertical size={24} /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Preview Panel Area - Crystal Card */}
        <div className="flex flex-col gap-10">
           <AnimatePresence mode="wait">
              {selectedInvoices.length === 1 ? (
                 <motion.div 
                   key="preview"
                   initial={{ opacity: 0, x: 50, scale: 0.95 }}
                   animate={{ opacity: 1, x: 0, scale: 1 }}
                   exit={{ opacity: 0, x: 50, scale: 0.95 }}
                   transition={{ type: "spring", stiffness: 200, damping: 25 }}
                   className="bg-white border border-blue-50 rounded-[3rem] shadow-[0_35px_80px_rgba(0,0,0,0.08)] flex flex-col h-full relative overflow-hidden"
                 >
                    <div className="p-10 border-b border-blue-50 bg-gradient-to-r from-white to-blue-50/20 flex items-center justify-between relative">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100 shadow-inner">
                             <FileText size={28} />
                          </div>
                          <div>
                             <h4 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#0f172a]">Aperçu du Courrier</h4>
                             <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1 italic">Draft généré par Joule AI</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-[#64748b] hover:text-[#0a6ed1] hover:border-[#0a6ed1] shadow-sm flex items-center justify-center transition-all"><Printer size={22} /></button>
                          <button className="w-12 h-12 bg-white border border-blue-100 rounded-2xl text-[#64748b] hover:text-[#0a6ed1] hover:border-[#0a6ed1] shadow-sm flex items-center justify-center transition-all"><Download size={22} /></button>
                       </div>
                    </div>
                    
                    <div className="p-12 flex-1 overflow-auto bg-slate-50/20">
                       <div className="bg-white p-14 rounded-2xl border border-blue-100 shadow-2xl max-w-lg mx-auto relative overflow-hidden font-serif text-[#0f172a] leading-[1.8] text-base group/doc">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full -mr-24 -mt-24 blur-3xl opacity-0 group-hover/doc:opacity-100 transition-opacity duration-700"></div>
                          
                          <div className="flex justify-between items-start mb-20 border-b border-blue-50 pb-10">
                             <div className="flex flex-col gap-2">
                                <span className="text-2xl font-black text-[#0f172a] uppercase tracking-tighter">GESTIONPRO SA</span>
                                <span className="text-[11px] text-[#64748b] uppercase font-black tracking-[0.4em] font-sans opacity-70">Service Recouvrement Elite</span>
                             </div>
                             <div className="text-right flex flex-col gap-2">
                                <span className="text-[11px] font-black text-[#0f172a] uppercase tracking-widest font-sans">{new Date().toLocaleDateString('fr-FR')}</span>
                                <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] font-sans">DAKAR, SN</span>
                             </div>
                          </div>
                          
                          <div className="mb-14 bg-amber-50/30 p-6 rounded-2xl border border-amber-100/50">
                             <p className="font-black uppercase text-[#0f172a] mb-3 font-sans tracking-[0.2em] text-sm">OBJET : RELANCE POUR IMPAYÉ - NIVEAU {invoices.find(i => i.id === selectedInvoices[0])?.dunningLevel || '1'}</p>
                             <p className="text-[11px] text-amber-700 font-black tracking-[0.3em] font-sans">RÉF : {invoices.find(i => i.id === selectedInvoices[0])?.invoiceNumber}</p>
                          </div>

                          <div className="space-y-8">
                             <p className="font-bold">Monsieur/Madame,</p>
                             <p>
                                Sauf erreur de notre part, le règlement de la facture **{invoices.find(i => i.id === selectedInvoices[0])?.invoiceNumber}** 
                                d'un montant de <span className="font-black underline underline-offset-4 decoration-amber-500 decoration-2 text-lg">{invoices.find(i => i.id === selectedInvoices[0])?.amount.toLocaleString()} F CFA</span> ne nous est pas parvenu à ce jour.
                             </p>
                             <p>
                                Nous vous prions de bien vouloir régulariser cette situation dans les plus brefs délais afin d'éviter toute transmission de votre dossier au service juridique pour recouvrement forcé.
                             </p>
                             <p className="pt-10 italic">Veuillez agréer, Monsieur/Madame, l'expression de nos salutations distinguées.</p>
                          </div>

                          <div className="mt-20 pt-10 border-t border-blue-50 flex flex-col items-end">
                             <span className="text-[11px] font-black text-[#64748b] uppercase tracking-[0.3em] font-sans mb-5">Le Responsable Recouvrement</span>
                             <div className="w-40 h-20 bg-blue-50/20 border-2 border-dashed border-blue-100 rounded-3xl flex items-center justify-center group/sign cursor-pointer overflow-hidden relative">
                                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/sign:opacity-100 transition-opacity"></div>
                                <span className="text-[12px] text-blue-200 font-black italic font-sans uppercase tracking-[0.4em] relative z-10 group-hover/sign:text-[#0a6ed1] transition-colors">Seal Active</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </motion.div>
              ) : (
                 <motion.div 
                   key="empty"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-white border-4 border-dashed border-blue-50 rounded-[3rem] flex-1 flex flex-col items-center justify-center p-20 text-center"
                 >
                    <div className="w-28 h-28 bg-blue-50/50 rounded-[2.5rem] flex items-center justify-center text-blue-200 border border-blue-100 shadow-inner mb-10 group">
                       <Info size={48} className="group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <h4 className="text-lg font-black text-[#0f172a] uppercase tracking-[0.4em] mb-4 leading-none">Sélectionné pour Aperçu</h4>
                    <p className="text-[11px] text-slate-300 font-black uppercase tracking-[0.3em] max-w-[280px] leading-relaxed">Veuillez choisir une ligne dans l'Aging Engine pour visualiser le courrier juridique.</p>
                 </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>

      {/* Footer System Integrity (Diamond Azure Elite) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-blue-50 p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] gap-10 relative overflow-hidden group/footer">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-700"></div>
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#107e3e] to-emerald-600 text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 group/shield cursor-pointer">
               <ShieldCheck size={40} className="group-hover/shield:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-3">Souveraineté du Recouvrement (Joule AI)</span>
               <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] italic leading-relaxed max-w-2xl">
                  L'intégrité des flux de relance est certifiée par Joule AI Auditor conformément aux normes de gestion des créances **SYSCOHADA** et **IFRS 9**.
               </p>
            </div>
         </div>
         <div className="flex gap-14 items-center relative z-10">
            <button className="flex items-center gap-5 text-slate-300 hover:text-[#0a6ed1] text-[12px] font-black uppercase tracking-[0.4em] transition-all group/btn">
               <History size={28} className="group-hover/btn:rotate-[-45deg] transition-transform duration-500" /> Archives Logs
            </button>
            <button className="flex items-center gap-6 text-[#0a6ed1] hover:text-blue-700 text-[12px] font-black uppercase tracking-[0.5em] transition-all group/strat border-l border-blue-50 pl-14 h-12">
               <Zap size={28} className="group-hover/strat:scale-125 transition-transform duration-500" /> Stratégie Joule AI
               <ArrowRight size={22} className="opacity-10 group-hover/strat:opacity-100 group-hover/strat:translate-x-3 transition-all duration-500" />
            </button>
         </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, trend }: any) => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(10,110,209,0.08)] hover:border-[#0a6ed1]/30 border border-blue-50 transition-all duration-500 group relative overflow-hidden cursor-pointer">
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full ${
      color === 'blue' ? 'bg-[#0a6ed1]' : color === 'red' ? 'bg-[#dc2626]' : color === 'green' ? 'bg-[#107e3e]' : 'bg-amber-500'
    } opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
    
    <div className="flex justify-between items-start mb-8 relative z-10">
       <div className={`p-5 rounded-[1.5rem] border transition-all duration-500 group-hover:rotate-12 ${
         color === 'blue' ? 'bg-blue-50 text-[#0a6ed1] border-blue-100 shadow-[0_10px_20px_rgba(10,110,209,0.1)]' : 
         color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100 shadow-[0_10px_20px_rgba(220,38,38,0.1)]' : 
         color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-100 shadow-[0_10px_20px_rgba(16,126,62,0.1)]' : 
         'bg-amber-50 text-amber-700 border-amber-100 shadow-[0_10px_20px_rgba(245,158,11,0.1)]'
       }`}>
          {icon}
       </div>
       <span className={`text-[12px] font-black px-4 py-1.5 rounded-full border shadow-sm ${
          trend.includes('+') ? 'bg-red-50 text-[#dc2626] border-red-100' : 'bg-green-50 text-[#107e3e] border-green-100'
       }`}>{trend}</span>
    </div>
    
    <div className="relative z-10">
       <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3 opacity-60 leading-none">{title}</p>
       <p className="text-4xl font-black text-[#0f172a] tracking-tighter leading-none group-hover:text-[#0a6ed1] transition-colors duration-500">{value}</p>
    </div>
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

export default CustomerDunning;
