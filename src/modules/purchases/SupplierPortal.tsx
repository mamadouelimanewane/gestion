import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShoppingCart, FileText, CheckCircle2, 
  Clock, AlertCircle, Plus, Search, 
  Filter, MoreVertical, Download, ExternalLink,
  Truck, ShieldCheck, Mail, Send,
  Globe, Package, Briefcase, ChevronRight
} from 'lucide-react';

const SupplierPortal = () => {
  const [activeTab, setActiveTab] = useState<'pos' | 'invoices' | 'vendors' | 'onboarding'>('pos');

  const tabs = [
    { id: 'pos', label: 'Commandes (PO)', icon: ShoppingCart },
    { id: 'invoices', label: 'Factures Fournisseurs', icon: FileText },
    { id: 'vendors', label: 'Base Fournisseurs', icon: Users },
    { id: 'onboarding', label: 'Auto-Enregistrement', icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* SRM Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
               <Truck size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-[#0f172a] uppercase tracking-tight leading-none mb-1">Portail Fournisseurs (SRM Lite)</h3>
               <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest italic leading-none">Gestion des Achats • Collaboration Partenaires • Facturation Automatisée</p>
            </div>
         </div>
         <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1] relative z-10 shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? 'bg-white text-orange-600 shadow-sm border border-[#cbd5e1]' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                 <tab.icon size={14} />
                 {tab.label}
              </button>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'pos' && (
           <motion.div 
             key="pos"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col gap-6 h-full"
           >
              <div className="flex justify-between items-center px-4">
                 <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={18} />
                    <input type="text" placeholder="Rechercher une commande..." className="w-full bg-white border border-[#cbd5e1] rounded-lg pl-10 pr-4 py-2.5 text-xs font-bold text-[#334155] outline-none focus:border-orange-500 transition-all shadow-inner" />
                 </div>
                 <button className="flex items-center gap-2 px-8 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all shadow-md">
                    <Plus size={18} /> Créer Bon de Commande
                 </button>
              </div>

              <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex-1">
                 <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-[#f8fafc] text-[10px] font-bold uppercase text-[#64748b] tracking-widest border-b border-[#cbd5e1]">
                       <tr>
                          <th className="p-6">N° Commande</th>
                          <th className="p-6">Fournisseur</th>
                          <th className="p-6">Date d'Emission</th>
                          <th className="p-6">Montant Total</th>
                          <th className="p-6">Statut Livraison</th>
                          <th className="p-6 text-center">Paiement</th>
                          <th className="p-6 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                       <PORow id="BC-2024-0012" vendor="SENELEC SA" date="25/04/2024" amount="4,500,000" delivery="Partiel" payment="En attente" />
                       <PORow id="BC-2024-0011" vendor="Dakar Steel & Iron" date="22/04/2024" amount="12,750,000" delivery="Livré" payment="Payé" />
                       <PORow id="BC-2024-0010" vendor="Outil-Sénégal SARL" date="18/04/2024" amount="1,200,000" delivery="En cours" payment="En attente" />
                       <PORow id="BC-2024-0009" vendor="Office Depot Dakar" date="15/04/2024" amount="850,000" delivery="Livré" payment="Payé" />
                    </tbody>
                 </table>
              </div>
           </motion.div>
         )}

         {activeTab === 'invoices' && (
           <motion.div 
             key="invoices"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="grid grid-cols-1 lg:grid-cols-4 gap-8"
           >
              <div className="lg:col-span-3 bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm">
                 <div className="p-6 border-b border-[#f1f5f9] flex justify-between items-center bg-[#f8fafc]">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0f172a]">Factures en attente de traitement</h4>
                    <span className="px-3 py-1 bg-orange-50 text-orange-600 border border-orange-100 rounded text-[9px] font-bold uppercase tracking-widest animate-pulse shadow-sm">4 Nouvelles</span>
                 </div>
                 <div className="p-0 divide-y divide-[#f1f5f9]">
                    <InvoiceItem id="FAC-8892" vendor="SENELEC" amount="1,250,000" date="29/04/2024" status="À Valider" />
                    <InvoiceItem id="FAC-8891" vendor="SONATEL" amount="450,000" date="28/04/2024" status="Lettrage" />
                    <InvoiceItem id="FAC-8890" vendor="Dakar Steel" amount="8,400,000" date="27/04/2024" status="Validé" />
                 </div>
              </div>

              <div className="flex flex-col gap-8">
                 <div className="bg-orange-50 border border-orange-100 p-8 rounded-xl flex flex-col gap-6 shadow-sm">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-orange-600 border-b border-orange-200 pb-4">Auto-Facturation</h4>
                    <p className="text-[10px] text-orange-700 font-bold uppercase tracking-wider leading-relaxed">
                       Permettre aux fournisseurs stratégiques de générer leurs factures sur la base de vos réceptions de marchandises (ERS).
                    </p>
                    <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg transition-all">Activer le Mode ERS</button>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const PORow = ({ id, vendor, date, amount, delivery, payment }: any) => (
  <tr className="hover:bg-blue-50/30 transition-all group cursor-pointer">
     <td className="p-6 text-orange-600 font-bold text-xs uppercase tracking-tight">{id}</td>
     <td className="p-6">
        <div className="flex flex-col">
           <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{vendor}</span>
           <span className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1">Code: V-44102</span>
        </div>
     </td>
     <td className="p-6 text-xs font-bold text-[#64748b] uppercase">{date}</td>
     <td className="p-6 text-[#0f172a] font-bold text-sm tracking-tight">{amount} F</td>
     <td className="p-6">
        <span className={`px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest ${
           delivery === 'Livré' ? 'bg-green-50 text-[#107e3e] border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'
        }`}>
           {delivery}
        </span>
     </td>
     <td className="p-6 text-center">
        <span className={`px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest ${
           payment === 'Payé' ? 'bg-green-50 text-[#107e3e] border-green-200' : 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
        }`}>
           {payment}
        </span>
     </td>
     <td className="p-6 text-right">
        <button className="p-2 text-[#94a3b8] hover:text-[#0f172a] transition-colors"><MoreVertical size={18} /></button>
     </td>
  </tr>
);

const InvoiceItem = ({ id, vendor, amount, date, status }: any) => (
  <div className="p-6 hover:bg-blue-50/30 transition-all group flex items-center justify-between cursor-pointer border-transparent border-l-4 hover:border-orange-500">
     <div className="flex items-center gap-6">
        <div className="p-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[#94a3b8] group-hover:text-orange-600 group-hover:border-orange-100 transition-all shadow-inner">
           <FileText size={24} />
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#0f172a] transition-colors">{id} — {vendor}</span>
           <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest mt-1">Reçue le {date} • {amount} F</span>
        </div>
     </div>
     <div className="flex items-center gap-8">
        <span className={`px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest ${
           status === 'Validé' ? 'bg-green-50 text-[#107e3e] border-green-200' : 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
        }`}>
           {status}
        </span>
        <button className="p-2 text-[#94a3b8] hover:text-[#0f172a] transition-all"><ChevronRight size={20} /></button>
     </div>
  </div>
);

export default SupplierPortal;
