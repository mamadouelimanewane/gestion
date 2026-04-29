import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, MoreVertical, FileText, 
  Send, Download, CheckCircle2, Clock, AlertCircle,
  Eye, FileEdit, Trash2, Printer, Mail,
  ChevronRight, Calendar, User, DollarSign,
  Briefcase, ArrowUpRight, TrendingUp
} from 'lucide-react';

const InvoicingModule = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const invoices = [
    { id: 'FAC-2024-001', client: 'Alpha Services SARL', date: '15/04/2024', amount: '1 250 000 F', tva: '225 000 F', status: 'Payé', color: 'emerald' },
    { id: 'FAC-2024-002', client: 'Beta Tech Africa', date: '20/04/2024', amount: '3 420 000 F', tva: '615 600 F', status: 'En attente', color: 'amber' },
    { id: 'FAC-2024-003', client: 'Gamma Corp SN', date: '25/04/2024', amount: '890 000 F', tva: '160 200 F', status: 'En retard', color: 'rose' },
    { id: 'FAC-2024-004', client: 'Delta Solutions', date: '28/04/2024', amount: '2 100 000 F', tva: '378 000 F', status: 'En attente', color: 'amber' },
    { id: 'FAC-2024-005', client: 'Sonatel Orange', date: '02/05/2024', amount: '15 400 000 F', tva: '2 772 000 F', status: 'Brouillon', color: 'slate' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Facturé (Mois)" value="23 060 000 F" sub="+15% vs M-1" color="indigo" icon={<FileText size={20} />} />
        <StatCard title="Encaissements" value="1 250 000 F" sub="5.4% du total" color="emerald" icon={<CheckCircle2 size={20} />} />
        <StatCard title="En attente" value="5 520 000 F" sub="Action requise" color="amber" icon={<Clock size={20} />} />
        <StatCard title="Impayés / Retard" value="890 000 F" sub="Critique" color="rose" icon={<AlertCircle size={20} />} />
      </div>

      {/* Main Header & Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {['Toutes', 'Payées', 'En attente', 'En retard', 'Brouillons'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.toLowerCase() ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Chercher client, numéro..." 
              className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs outline-none focus:border-indigo-500 transition-all w-full md:w-64" 
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/30">
            <Plus size={18} />
            Nouvelle Facture
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-800/20 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-800/80 border-b border-slate-700/50">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Référence</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Client</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Date d'émission</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Montant HT</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">TVA (18%)</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Total TTC</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Statut</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 font-medium">
            {invoices.map((inv) => (
              <tr 
                key={inv.id} 
                className="group hover:bg-indigo-500/5 transition-colors cursor-pointer"
                onClick={() => setSelectedInvoice(inv)}
              >
                <td className="px-6 py-4 font-mono text-indigo-400 text-xs font-bold">{inv.id}</td>
                <td className="px-6 py-4">
                   <div className="flex flex-col">
                      <span className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{inv.client}</span>
                      <span className="text-[10px] text-slate-500">Sénégal • Client B2B</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-400 font-bold">{inv.date}</td>
                <td className="px-6 py-4 text-right text-slate-300 font-bold">{inv.amount}</td>
                <td className="px-6 py-4 text-right text-slate-500 text-xs">{inv.tva}</td>
                <td className="px-6 py-4 text-right font-black text-white">{inv.amount}</td>
                <td className="px-6 py-4">
                  <div className={`mx-auto w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 bg-${inv.color}-500/10 text-${inv.color}-400 border border-${inv.color}-500/20`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-${inv.color}-400`} />
                    {inv.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all" title="Aperçu">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all" title="Télécharger PDF">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
                        <MoreVertical size={16} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Detail Drawer */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="relative w-full max-w-xl bg-slate-900 border-l border-slate-700 shadow-2xl h-full flex flex-col overflow-y-auto"
            >
               {/* Drawer Header */}
               <div className="p-8 border-b border-slate-800 flex justify-between items-start bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md">
                  <div>
                    <div className={`w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 bg-${selectedInvoice.color}-500/10 text-${selectedInvoice.color}-400 border border-${selectedInvoice.color}-500/20`}>
                      Facture {selectedInvoice.status}
                    </div>
                    <h3 className="text-3xl font-black text-white">{selectedInvoice.id}</h3>
                    <p className="text-slate-500 font-bold uppercase text-[10px] mt-2 tracking-widest">Émise le {selectedInvoice.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-slate-400 hover:text-white transition-all shadow-inner border border-slate-700">
                      <Printer size={20} />
                    </button>
                    <button className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-white transition-all shadow-lg shadow-indigo-500/20">
                      <Send size={20} />
                    </button>
                  </div>
               </div>

               {/* Drawer Body */}
               <div className="p-8 space-y-10">
                  {/* Client Info */}
                  <div className="flex justify-between items-start p-6 bg-slate-800/30 rounded-3xl border border-slate-700/50">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em]">Client</h4>
                        <div className="space-y-1">
                           <p className="text-xl font-black text-white">{selectedInvoice.client}</p>
                           <p className="text-sm text-slate-400 font-medium">BP 4501, Almadies, Dakar</p>
                           <p className="text-sm text-slate-400 font-medium">Sénégal</p>
                        </div>
                        <div className="flex gap-3 text-xs font-bold text-indigo-400">
                           <span className="flex items-center gap-1"><Mail size={12} /> contact@client.sn</span>
                           <span className="flex items-center gap-1"><User size={12} /> ID: CL-9982</span>
                        </div>
                     </div>
                     <div className="text-right space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Échéance</h4>
                        <p className="text-lg font-black text-rose-400 italic">Sous 30 jours</p>
                     </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] border-b border-slate-800 pb-2">Détails de la facturation</h4>
                     <div className="space-y-4">
                        <InvoiceItem label="Audit & Conseil Stratégique" qty="1" unit="Global" total="850 000 F" />
                        <InvoiceItem label="Frais de déplacement" qty="3" unit="Jours" total="150 000 F" />
                        <InvoiceItem label="Hébergement & Logistique" qty="1" unit="Forfait" total="250 000 F" />
                     </div>
                  </div>

                  {/* Totals */}
                  <div className="p-8 bg-slate-950 rounded-3xl border border-slate-800 space-y-4 shadow-inner">
                     <div className="flex justify-between text-sm font-bold text-slate-500">
                        <span>Total Hors Taxes</span>
                        <span className="text-slate-300">1 250 000 F CFA</span>
                     </div>
                     <div className="flex justify-between text-sm font-bold text-slate-500">
                        <span>TVA (18%)</span>
                        <span className="text-slate-300">225 000 F CFA</span>
                     </div>
                     <div className="h-px bg-slate-800 my-2" />
                     <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Total Net à Payer</p>
                          <h3 className="text-3xl font-black text-white mt-1">1 475 000 F <span className="text-xs font-bold text-slate-500">CFA</span></h3>
                        </div>
                        <p className="text-[10px] text-slate-500 italic max-w-[150px] text-right leading-tight">Arrêté à la somme de un million quatre cent soixante quinze mille francs CFA.</p>
                     </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex gap-4">
                     <button className="flex-1 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                        <FileEdit size={16} className="inline mr-2" /> Modifier
                     </button>
                     <button className="flex-1 py-4 bg-rose-600/10 border border-rose-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-600 hover:text-white transition-all">
                        <Trash2 size={16} className="inline mr-2" /> Annuler
                     </button>
                  </div>
               </div>

               <button 
                onClick={() => setSelectedInvoice(null)}
                className="mt-auto py-6 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em] border-t border-slate-800/50"
              >
                Fermer l'aperçu
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ title, value, sub, color, icon }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">{title}</p>
        <h4 className="text-lg font-black text-white">{value}</h4>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp size={10} className={sub.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'} />
          <p className={`text-[10px] font-bold ${sub.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{sub}</p>
        </div>
      </div>
    </div>
  </div>
);

const InvoiceItem = ({ label, qty, unit, total }: any) => (
  <div className="flex items-center justify-between group p-2 hover:bg-slate-800/50 rounded-xl transition-all">
     <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-200">{label}</span>
        <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Qté: {qty} • Unité: {unit}</span>
     </div>
     <span className="font-black text-slate-200 text-sm">{total}</span>
  </div>
);

export default InvoicingModule;
