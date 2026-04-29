import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  FileText, 
  Send, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

const InvoicingModule = () => {
  const [activeTab, setActiveTab] = useState('all');

  const invoices = [
    { id: 'FAC-2024-001', client: 'Alpha Services', date: '2024-04-15', amount: '1,250.00 €', status: 'Payé' },
    { id: 'FAC-2024-002', client: 'Beta Tech', date: '2024-04-20', amount: '3,420.00 €', status: 'En attente' },
    { id: 'FAC-2024-003', client: 'Gamma Corp', date: '2024-04-25', amount: '890.00 €', status: 'En retard' },
    { id: 'FAC-2024-004', client: 'Delta Solutions', date: '2024-04-28', amount: '2,100.00 €', status: 'En attente' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Payé': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'En attente': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'En retard': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Payé': return <CheckCircle2 size={12} />;
      case 'En attente': return <Clock size={12} />;
      case 'En retard': return <AlertCircle size={12} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card !p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Total Facturé</p>
            <h4 className="text-xl font-bold">45,820.00 €</h4>
          </div>
        </div>
        <div className="card !p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">En attente</p>
            <h4 className="text-xl font-bold">12,450.00 €</h4>
          </div>
        </div>
        <div className="card !p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">En retard</p>
            <h4 className="text-xl font-bold">2,100.00 €</h4>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 p-1 bg-slate-800/40 rounded-xl border border-slate-700/50">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Toutes
          </button>
          <button 
            onClick={() => setActiveTab('paid')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'paid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Payées
          </button>
          <button 
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'pending' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            En attente
          </button>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-3 bg-slate-800/30 px-4 py-2 rounded-xl border border-slate-700/30 w-64">
            <Search size={16} className="text-slate-500" />
            <input type="text" placeholder="Rechercher une facture..." className="bg-transparent border-none outline-none text-xs w-full" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/20">
            <Plus size={16} /> Nouvelle Facture
          </button>
        </div>
      </div>

      <div className="card !p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700/50">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Numéro</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Client</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Montant TTC</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Statut</th>
              <th className="px-6 py-4 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {invoices.map((inv) => (
              <tr key={inv.id} className="group hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-300">{inv.id}</td>
                <td className="px-6 py-4 font-medium">{inv.client}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{inv.date}</td>
                <td className="px-6 py-4 text-right font-bold">{inv.amount}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(inv.status)}`}>
                    {getStatusIcon(inv.status)}
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button title="Envoyer par email" className="p-2 text-slate-400 hover:text-indigo-400 transition-colors">
                      <Send size={16} />
                    </button>
                    <button title="Télécharger PDF" className="p-2 text-slate-400 hover:text-indigo-400 transition-colors">
                      <Download size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicingModule;
