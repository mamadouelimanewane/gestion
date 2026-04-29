import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShoppingCart, FileText, CheckCircle2, 
  Clock, AlertCircle, Plus, Search, 
  Filter, MoreVertical, Download, ExternalLink,
  Truck, ShieldCheck, Mail, Send,
  Globe, Package, Briefcase
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
      <div className="flex justify-between items-center bg-amber-600/10 border border-amber-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-600/40">
               <Truck size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1">Portail Fournisseurs (SRM Lite)</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">Gestion des Achats • Collaboration Partenaires • Facturation Automatisée</p>
            </div>
         </div>
         <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50 relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:text-white'
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
             className="flex flex-col gap-6"
           >
              <div className="flex justify-between items-center px-4">
                 <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input type="text" placeholder="Rechercher une commande..." className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-all shadow-inner" />
                 </div>
                 <button className="flex items-center gap-2 px-8 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-600/20">
                    <Plus size={16} /> Créer Bon de Commande
                 </button>
              </div>

              <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
                 <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                       <tr>
                          <th className="p-6">N° Commande</th>
                          <th className="p-6">Fournisseur</th>
                          <th className="p-6">Date d'Émission</th>
                          <th className="p-6">Montant Total</th>
                          <th className="p-6">Statut Livraison</th>
                          <th className="p-6 text-center">Paiement</th>
                          <th className="p-6 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30 text-[11px] font-mono">
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
             className="grid grid-cols-1 lg:grid-cols-4 gap-6"
           >
              <div className="lg:col-span-3 card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
                 <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/50">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white italic">Factures en attente de traitement</h4>
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest animate-pulse">4 Nouvelles</span>
                 </div>
                 <div className="p-0 divide-y divide-slate-700/30">
                    <InvoiceItem id="FAC-8892" vendor="SENELEC" amount="1,250,000" date="29/04/2024" status="À Valider" />
                    <InvoiceItem id="FAC-8891" vendor="SONATEL" amount="450,000" date="28/04/2024" status="Lettrage" />
                    <InvoiceItem id="FAC-8890" vendor="Dakar Steel" amount="8,400,000" date="27/04/2024" status="Validé" />
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-amber-600/5 border border-amber-500/20 p-8 flex flex-col gap-6 shadow-2xl">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-amber-500/20 pb-4 italic">Auto-Facturation</h4>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                       Permettre aux fournisseurs stratégiques de générer leurs factures sur la base de vos réceptions de marchandises (ERS).
                    </p>
                    <button className="w-full py-4 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-600/30">Activer le Mode ERS</button>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const PORow = ({ id, vendor, date, amount, delivery, payment }: any) => (
  <tr className="hover:bg-amber-600/5 transition-all group cursor-pointer">
     <td className="p-6 text-amber-400 font-black">{id}</td>
     <td className="p-6">
        <div className="flex flex-col">
           <span className="text-xs font-black text-white uppercase group-hover:text-amber-400 transition-colors">{vendor}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Code: V-44102</span>
        </div>
     </td>
     <td className="p-6 text-slate-500">{date}</td>
     <td className="p-6 text-white font-black">{amount} F</td>
     <td className="p-6">
        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
           delivery === 'Livré' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
        }`}>
           {delivery}
        </span>
     </td>
     <td className="p-6 text-center">
        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
           payment === 'Payé' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
        }`}>
           {payment}
        </span>
     </td>
     <td className="p-6 text-right">
        <button className="p-2 text-slate-600 hover:text-white transition-colors"><MoreVertical size={18} /></button>
     </td>
  </tr>
);

const InvoiceItem = ({ id, vendor, amount, date, status }: any) => (
  <div className="p-6 hover:bg-amber-600/5 transition-all group flex items-center justify-between cursor-pointer">
     <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 group-hover:text-amber-400 transition-colors">
           <FileText size={20} />
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-black text-white uppercase tracking-widest group-hover:text-amber-400 transition-colors">{id} - {vendor}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">Reçue le {date} • {amount} F</span>
        </div>
     </div>
     <div className="flex items-center gap-6">
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${
           status === 'Validé' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
        }`}>
           {status}
        </span>
        <button className="p-2 text-slate-600 hover:text-white"><ChevronRight size={18} /></button>
     </div>
  </div>
);

export default SupplierPortal;
