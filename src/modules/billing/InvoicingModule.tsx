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
    { id: 'FAC-2024-001', client: 'Alpha Services SARL', date: '15/04/2024', due: '15/05/2024', amount: '1 250 000 F', tva: '225 000 F', status: 'Payé', color: 'green' },
    { id: 'FAC-2024-002', client: 'Beta Tech Africa', date: '20/04/2024', due: '20/05/2024', amount: '3 420 000 F', tva: '615 600 F', status: 'En attente', color: 'orange' },
    { id: 'FAC-2024-003', client: 'Gamma Corp SN', date: '25/04/2024', due: '25/05/2024', amount: '890 000 F', tva: '160 200 F', status: 'En retard', color: 'red' },
    { id: 'FAC-2024-004', client: 'Delta Solutions', date: '28/04/2024', due: '28/05/2024', amount: '2 100 000 F', tva: '378 000 F', status: 'En attente', color: 'orange' },
    { id: 'FAC-2024-005', client: 'Sonatel Orange', date: '02/05/2024', due: '02/06/2024', amount: '15 400 000 F', tva: '2 772 000 F', status: 'Brouillon', color: 'slate' },
  ];

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Facturé (Mois)" value="23 060 000 F" sub="+15% vs M-1" color="blue" icon={<FileText size={20} />} />
        <StatCard title="Encaissements" value="1 250 000 F" sub="5.4% du total" color="green" icon={<CheckCircle2 size={20} />} />
        <StatCard title="En attente" value="5 520 000 F" sub="Action requise" color="orange" icon={<Clock size={20} />} />
        <StatCard title="Impayés / Retard" value="890 000 F" sub="Critique" color="red" icon={<AlertCircle size={20} />} />
      </div>

      {/* Main Header & Actions */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 rounded-xl border border-[#cbd5e1] shadow-sm">
        <div className="flex items-center gap-2 p-1 bg-[#f1f5f9] rounded-lg border border-[#cbd5e1] shadow-inner">
          {['Toutes', 'Payées', 'En attente', 'En retard', 'Brouillons'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 rounded text-[11px] font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.toLowerCase() ? 'bg-white text-[#005eb8] shadow-sm border border-[#cbd5e1]' : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#005eb8] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Chercher client, numéro..." 
              className="bg-white border border-[#cbd5e1] rounded-lg pl-10 pr-4 py-2.5 text-xs font-bold text-[#334155] outline-none focus:border-[#005eb8] transition-all w-full lg:w-80 shadow-inner" 
            />
          </div>
          <button className="flex items-center justify-center gap-3 px-8 py-2.5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg">
            <Plus size={20} />
            Nouvelle Facture
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex-1 flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#f8fafc] border-b border-[#cbd5e1] sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Référence</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Client</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Date d'émission</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b] text-right">Montant HT</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b] text-right">Total TTC</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b] text-center">Statut</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {invoices.map((invoice, i) => (
                <tr key={i} className="group hover:bg-blue-50/30 transition-colors cursor-pointer" onClick={() => setSelectedInvoice(invoice)}>
                  <td className="px-6 py-5 font-bold text-[#005eb8] text-xs uppercase tracking-tight">{invoice.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{invoice.client}</span>
                        <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1">Client Premium • ID: CL-992</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-[#475569] uppercase">{invoice.date}</td>
                  <td className="px-6 py-5 text-right font-bold text-[#334155] text-sm tracking-tight">{invoice.amount}</td>
                  <td className="px-6 py-5 text-right font-bold text-[#0f172a] text-sm tracking-tight">{invoice.amount}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest ${
                        invoice.status === 'Payé' ? 'bg-green-50 text-[#107e3e] border-green-200' : 
                        invoice.status === 'En retard' ? 'bg-red-50 text-[#dc2626] border-red-200' : 
                        invoice.status === 'En attente' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                        'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
                    }`}>
                        {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-[#94a3b8] hover:text-[#0f172a] hover:bg-white rounded-lg transition-all border border-transparent hover:border-[#cbd5e1] shadow-sm">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Drawer */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="relative w-full max-w-2xl bg-white border-l border-[#cbd5e1] shadow-2xl h-full flex flex-col overflow-hidden"
            >
               {/* Drawer Header */}
               <div className="p-8 border-b border-[#cbd5e1] flex justify-between items-start bg-[#f8fafc] sticky top-0 z-10">
                  <div>
                    <div className={`w-fit px-3 py-1 rounded border text-[9px] font-bold uppercase mb-4 tracking-widest ${
                      selectedInvoice.status === 'Payé' ? 'bg-green-50 text-[#107e3e] border-green-200' : 
                      selectedInvoice.status === 'En retard' ? 'bg-red-50 text-[#dc2626] border-red-200' : 'bg-orange-50 text-orange-600 border-orange-200'
                    }`}>
                      Facture {selectedInvoice.status}
                    </div>
                    <h3 className="text-4xl font-bold text-[#0f172a] uppercase tracking-tighter">{selectedInvoice.id}</h3>
                    <p className="text-[10px] text-[#64748b] font-bold uppercase mt-2 tracking-widest">Émise le {selectedInvoice.date}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-3 bg-white hover:bg-[#f1f5f9] rounded-xl text-[#64748b] hover:text-[#0f172a] transition-all shadow-sm border border-[#cbd5e1]">
                      <Printer size={20} />
                    </button>
                    <button className="p-3 bg-[#005eb8] hover:bg-[#004080] rounded-xl text-white transition-all shadow-lg">
                      <Send size={20} />
                    </button>
                  </div>
               </div>

               {/* Drawer Body */}
               <div className="flex-1 overflow-y-auto p-8 space-y-10">
                  {/* Client Info */}
                  <div className="flex justify-between items-start p-10 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1] shadow-inner relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Briefcase size={80} className="text-[#005eb8]" />
                     </div>
                     <div className="space-y-6 relative z-10">
                        <h4 className="text-[10px] font-bold uppercase text-[#005eb8] tracking-widest border-b border-blue-100 pb-2">Client Débiteur</h4>
                        <div className="space-y-1">
                           <p className="text-2xl font-bold text-[#0f172a] uppercase tracking-tight">{selectedInvoice.client}</p>
                           <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-wider">BP 4501, Almadies, Dakar, Sénégal</p>
                        </div>
                        <div className="flex flex-col gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest">
                           <span className="flex items-center gap-3"><Mail size={14} className="text-[#005eb8]" /> contact@client.sn</span>
                           <span className="flex items-center gap-3"><User size={14} className="text-[#005eb8]" /> ID SAP: CL-9982-OHADA</span>
                        </div>
                     </div>
                     <div className="text-right space-y-4 relative z-10">
                        <h4 className="text-[10px] font-bold uppercase text-[#64748b] tracking-widest">Échéance de Paiement</h4>
                        <div className="bg-red-50 border border-red-100 px-4 py-2 rounded-lg">
                           <p className="text-lg font-bold text-[#dc2626] italic uppercase tracking-tighter">{selectedInvoice.due}</p>
                        </div>
                     </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-bold uppercase text-[#64748b] tracking-widest border-b border-[#f1f5f9] pb-2">Détails de la prestation / livraison</h4>
                     <div className="space-y-2">
                        <InvoiceDetailItem label="Audit & Conseil Stratégique (Finance)" qty="1" unit="Global" total="850 000 F" />
                        <InvoiceDetailItem label="Frais de déplacement inter-filiales" qty="3" unit="Jours" total="150 000 F" />
                        <InvoiceDetailItem label="Hébergement & Logistique (Hôtel Terrou-Bi)" qty="1" unit="Forfait" total="250 000 F" />
                     </div>
                  </div>

                  {/* Totals */}
                  <div className="p-10 bg-[#0f172a] rounded-2xl border border-[#0f172a] space-y-6 shadow-xl relative overflow-hidden">
                     <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                     <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <span>Total Net Hors Taxes</span>
                        <span className="text-white">1 250 000 F CFA</span>
                     </div>
                     <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <span>TVA OHADA (18%)</span>
                        <span className="text-white">225 000 F CFA</span>
                     </div>
                     <div className="h-[1px] bg-slate-800 my-2" />
                     <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[11px] font-bold uppercase text-blue-400 tracking-[0.3em] mb-2">Total Net à Payer (TTC)</p>
                          <h3 className="text-4xl font-bold text-white tracking-tighter uppercase">1 475 000 F <span className="text-xs font-bold text-blue-300">CFA</span></h3>
                        </div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase italic max-w-[200px] text-right leading-relaxed tracking-wider">Arrêté à la somme de un million quatre cent soixante quinze mille francs CFA.</p>
                     </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex gap-4">
                     <button className="flex-1 py-4 bg-white border border-[#cbd5e1] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748b] hover:text-[#005eb8] hover:border-[#005eb8] transition-all shadow-sm flex items-center justify-center gap-3">
                        <FileEdit size={18} /> Modifier
                     </button>
                     <button className="flex-1 py-4 bg-red-50 border border-red-200 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] text-[#dc2626] hover:bg-[#dc2626] hover:text-white transition-all shadow-sm flex items-center justify-center gap-3">
                        <Trash2 size={18} /> Annuler
                     </button>
                  </div>
               </div>

               <button 
                onClick={() => setSelectedInvoice(null)}
                className="mt-auto py-6 bg-[#f8fafc] text-[#64748b] hover:text-[#0f172a] transition-all text-[11px] font-bold uppercase tracking-[0.3em] border-t border-[#cbd5e1] hover:bg-[#f1f5f9]"
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
  <div className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-sm group hover:border-[#005eb8] transition-all cursor-pointer relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${
      color === 'blue' ? 'bg-[#005eb8]' : 
      color === 'green' ? 'bg-[#107e3e]' : 
      color === 'red' ? 'bg-[#dc2626]' : 'bg-orange-500'
    } opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex items-center gap-5">
      <div className={`p-4 rounded-xl border shadow-inner transition-transform group-hover:scale-110 ${
        color === 'blue' ? 'bg-blue-50 text-[#005eb8] border-blue-100' : 
        color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-100' : 
        color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100' : 
        'bg-orange-50 text-orange-600 border-orange-100'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest leading-none mb-2">{title}</p>
        <h4 className="text-xl font-bold text-[#0f172a] tracking-tight">{value}</h4>
        <div className="flex items-center gap-2 mt-1.5">
          <TrendingUp size={12} className={sub.startsWith('+') ? 'text-[#107e3e]' : 'text-[#dc2626]'} />
          <p className={`text-[10px] font-bold uppercase tracking-wider ${sub.startsWith('+') ? 'text-[#107e3e]' : 'text-[#dc2626]'}`}>{sub}</p>
        </div>
      </div>
    </div>
  </div>
);

const InvoiceDetailItem = ({ label, qty, unit, total }: any) => (
  <div className="flex items-center justify-between group p-4 hover:bg-blue-50/30 rounded-xl transition-all border border-transparent hover:border-blue-100">
     <div className="flex flex-col">
        <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#0f172a] transition-colors">{label}</span>
        <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1">Qté: {qty} • Unité: {unit}</span>
     </div>
     <span className="font-bold text-[#0f172a] text-sm tracking-tight">{total}</span>
  </div>
);

export default InvoicingModule;
