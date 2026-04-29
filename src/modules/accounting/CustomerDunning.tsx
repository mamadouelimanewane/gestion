import React, { useState } from 'react';
import { 
  Mail, Send, FileText, AlertTriangle, Clock, 
  CheckCircle, Search, Filter, ArrowRight, Printer,
  User, DollarSign, Calendar
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
    { id: '1', customerName: 'SARL SUNU SERVICES', invoiceNumber: 'FAC-2024-102', dueDate: '2024-03-01', amount: 1250000, daysOverdue: 60, dunningLevel: 2, status: 'Pending' },
    { id: '2', customerName: 'ETS DIALLO & FILS', invoiceNumber: 'FAC-2024-115', dueDate: '2024-04-10', amount: 450000, daysOverdue: 19, dunningLevel: 1, status: 'Pending' },
    { id: '3', customerName: 'GLOBAL TECH SA', invoiceNumber: 'FAC-2024-098', dueDate: '2024-02-15', amount: 3200000, daysOverdue: 74, dunningLevel: 3, status: 'Sent' },
    { id: '4', customerName: 'BOUTIQUE HORIZON', invoiceNumber: 'FAC-2024-120', dueDate: '2024-04-20', amount: 150000, daysOverdue: 9, dunningLevel: 0, status: 'Pending' },
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
      case 1: return <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">Niveau 1 : Rappel doux</span>;
      case 2: return <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">Niveau 2 : Relance ferme</span>;
      case 3: return <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">Niveau 3 : Mise en demeure</span>;
      default: return <span className="px-2 py-0.5 bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">Nouveau retard</span>;
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 rounded-xl">
            <AlertTriangle className="text-amber-400" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Gestion des Relances Clients (FI-AR)</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Recouvrement et suivi des impayés</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn bg-slate-800 text-slate-300 hover:text-white border-slate-700">
            <Printer size={18} />
            <span>Paramètres Relance</span>
          </button>
          <button 
            disabled={selectedInvoices.length === 0 || isProcessing}
            onClick={processDunning}
            className={`btn bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-lg shadow-indigo-600/20 transition-all ${isProcessing ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isProcessing ? (
              <Clock className="animate-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
            <span>Lancer les Relances ({selectedInvoices.length})</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Impayés" value="5 050 000 F" icon={<DollarSign size={18} />} color="indigo" />
        <StatCard title="En Retard > 60j" value="4 450 000 F" icon={<Clock size={18} />} color="rose" />
        <StatCard title="Relances Envoyées" value="12" icon={<Send size={18} />} color="emerald" />
        <StatCard title="Taux de Recouvrement" value="84%" icon={<CheckCircle size={18} />} color="amber" />
      </div>

      {/* Main List */}
      <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex flex-wrap gap-4 items-center justify-between bg-slate-800/30">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-indigo-400">Toutes les factures</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors">Niveau 2 & 3</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors">Contentieux</button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher un client..." 
              className="bg-slate-900/50 border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-xs outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                    onChange={(e) => setSelectedInvoices(e.target.checked ? invoices.map(i => i.id) : [])}
                  />
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Client / Facture</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Échéance / Retard</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Montant</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Niveau Relance</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {invoices.map((inv) => (
                <tr key={inv.id} className={`group hover:bg-slate-700/10 transition-colors ${selectedInvoices.includes(inv.id) ? 'bg-indigo-500/5' : ''}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedInvoices.includes(inv.id)}
                      onChange={() => toggleSelect(inv.id)}
                      className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                        <User size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{inv.customerName}</span>
                        <span className="text-[10px] font-mono text-slate-500">{inv.invoiceNumber}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-300">{new Date(inv.dueDate).toLocaleDateString()}</span>
                      <span className={`text-[10px] font-bold ${inv.daysOverdue > 30 ? 'text-rose-400' : 'text-amber-400'}`}>
                        {inv.daysOverdue} jours de retard
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-white">{inv.amount.toLocaleString()} F</span>
                  </td>
                  <td className="px-6 py-4">
                    {getLevelBadge(inv.dunningLevel)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        inv.status === 'Sent' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                      }`}>
                        {inv.status === 'Sent' ? 'Relance Envoyée' : 'À relancer'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dunning Letter Template Preview (Contextual) */}
      {selectedInvoices.length === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-slate-800/40 border-indigo-500/30 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-indigo-400" />
              Aperçu du courrier de relance
            </h4>
            <div className="flex gap-2">
              <button className="p-1.5 hover:bg-slate-700 rounded text-slate-400 transition-all"><Mail size={16} /></button>
              <button className="p-1.5 hover:bg-slate-700 rounded text-slate-400 transition-all"><Printer size={16} /></button>
            </div>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-lg text-[10px] text-slate-400 font-serif leading-relaxed space-y-4 border border-slate-800">
            <p className="text-right">Dakar, le {new Date().toLocaleDateString()}</p>
            <p>Objet : {getLevelBadge(invoices.find(i => i.id === selectedInvoices[0])?.dunningLevel || 0)}</p>
            <p>Monsieur/Madame,</p>
            <p>
              Sauf erreur de notre part, le règlement de la facture **{invoices.find(i => i.id === selectedInvoices[0])?.invoiceNumber}** 
              d'un montant de **{invoices.find(i => i.id === selectedInvoices[0])?.amount.toLocaleString()} F** ne nous est pas parvenu.
            </p>
            <p>Nous vous prions de bien vouloir régulariser cette situation dans les plus brefs délais.</p>
            <p>Cordialement,<br/>Le service comptabilité</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="card bg-slate-800/20 border-slate-700/50">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-400`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
        <p className="text-lg font-black text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default CustomerDunning;
