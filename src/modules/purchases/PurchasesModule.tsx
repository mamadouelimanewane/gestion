import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Truck, CreditCard, Clock, Search, Plus,
  Filter, Download, ChevronRight, FileText, Building,
  CheckCircle2, AlertCircle, Eye, Printer, Send,
  Package, ShoppingCart, TrendingDown, ClipboardCheck,
  User, Mail, Phone, MapPin, Globe
} from 'lucide-react';
import SupplierPortal from './SupplierPortal';

const PurchasesModule = () => {
  const [activeTab, setActiveTab] = useState('commandes');
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);

  const tabs = [
    { id: 'commandes', label: 'Bons de Commande', icon: ShoppingBag },
    { id: 'fournisseurs', label: 'Fournisseurs', icon: Building },
    { id: 'besoins', label: 'Demandes d\'Achat', icon: ClipboardCheck },
    { id: 'factures', label: 'Factures Fournisseurs', icon: FileText },
    { id: 'portal', label: 'Portail SRM', icon: Globe },
  ];

  const purchases = [
    { id: 'CMD-2024-089', provider: 'Global Tech SA', date: '20/04/2024', total: '4 500 000 F', status: 'Livré', color: 'blue' },
    { id: 'CMD-2024-092', provider: 'Sénégal Bureau', date: '22/04/2024', total: '120 000 F', status: 'En transit', color: 'amber' },
    { id: 'CMD-2024-095', provider: 'Dell Technologies', date: '25/04/2024', total: '12 000 000 F', status: 'Payé', color: 'emerald' },
    { id: 'CMD-2024-102', provider: 'SENELEC', date: '28/04/2024', total: '1 250 000 F', status: 'En attente', color: 'rose' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <PurchaseStat label="Commandes (Mois)" value="12" icon={<ShoppingCart size={18} />} color="indigo" sub="+3 vs M-1" />
        <PurchaseStat label="Livraisons attendues" value="5" icon={<Truck size={18} />} color="amber" sub="Aujourd'hui" />
        <PurchaseStat label="Masse d'achats" value="18 620 000 F" icon={<TrendingDown size={18} />} color="emerald" sub="-2.4% vs M-1" />
        <PurchaseStat label="À Régler (30j)" value="4 620 000 F" icon={<CreditCard size={18} />} color="rose" sub="8 factures" />
      </div>

      {/* Navigation & Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Chercher fournisseur, commande..." 
              className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs outline-none focus:border-indigo-500 transition-all w-full md:w-64" 
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/30">
            <Plus size={18} />
            Créer Commande
          </button>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'commandes' && (
          <motion.div
            key="commandes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-800/20 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-700/50">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">ID Commande</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Fournisseur</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Émission</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Montant Total</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Statut Flux</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {purchases.map((p) => (
                  <tr 
                    key={p.id} 
                    className="group hover:bg-indigo-500/5 transition-colors cursor-pointer"
                    onClick={() => setSelectedPurchase(p)}
                  >
                    <td className="px-6 py-4 font-mono text-indigo-400 text-xs font-bold">{p.id}</td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col">
                          <span className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{p.provider}</span>
                          <span className="text-[10px] text-slate-500">Dakar, Sénégal</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-bold">{p.date}</td>
                    <td className="px-6 py-4 text-right font-black text-white">{p.total}</td>
                    <td className="px-6 py-4">
                      <div className={`mx-auto w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 bg-${p.color}-500/10 text-${p.color}-400 border border-${p.color}-500/20`}>
                        <div className={`w-1.5 h-1.5 rounded-full bg-${p.color}-400`} />
                        {p.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="p-2 text-slate-600 group-hover:text-indigo-400 transition-all">
                          <ChevronRight size={18} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Suppliers Tab Placeholder */}
        {activeTab === 'fournisseurs' && (
          <motion.div
            key="fournisseurs"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
             <SupplierCard name="Global Tech SA" contact="Seydou Kane" category="Informatique" rating={4.8} />
             <SupplierCard name="Sénégal Bureau" contact="Awa Fall" category="Papeterie" rating={4.5} />
             <SupplierCard name="CFAO Motors" contact="Omar Diop" category="Logistique" rating={4.2} />
          </motion.div>
        )}

        {/* Other tabs Coming Soon */}
        {(activeTab === 'besoins' || activeTab === 'factures') && (
           <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card flex flex-col items-center justify-center h-96 border-dashed"
           >
              <div className="w-20 h-20 bg-slate-800/50 rounded-3xl flex items-center justify-center mb-6 border border-slate-700">
                 {activeTab === 'besoins' ? <ClipboardCheck size={32} className="text-indigo-400" /> : <FileText size={32} className="text-emerald-400" />}
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest">Module {activeTab}</h3>
              <p className="text-slate-500 max-w-sm text-center mt-3 text-sm font-medium">
                Initialisation des workflows SAP-grade pour la validation des besoins d'achat et la dématérialisation des factures.
              </p>
              <button className="mt-8 px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                Activer la fonctionnalité
              </button>
           </motion.div>
        )}

        {activeTab === 'portal' && (
          <motion.div key="portal" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="h-full">
             <SupplierPortal />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchase Detail Drawer */}
      <AnimatePresence>
        {selectedPurchase && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPurchase(null)}
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
                    <div className={`w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 bg-${selectedPurchase.color}-500/10 text-${selectedPurchase.color}-400 border border-${selectedPurchase.color}-500/20`}>
                      Commande {selectedPurchase.status}
                    </div>
                    <h3 className="text-3xl font-black text-white">{selectedPurchase.id}</h3>
                    <p className="text-slate-500 font-bold uppercase text-[10px] mt-2 tracking-widest">Émise le {selectedPurchase.date}</p>
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
                  {/* Supplier Section */}
                  <div className="flex justify-between items-start p-6 bg-slate-800/30 rounded-3xl border border-slate-700/50">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em]">Fournisseur</h4>
                        <div className="space-y-1">
                           <p className="text-xl font-black text-white">{selectedPurchase.provider}</p>
                           <p className="text-sm text-slate-400 font-medium">Zone Industrielle, Dakar</p>
                           <p className="text-sm text-slate-400 font-medium">Sénégal</p>
                        </div>
                        <div className="flex flex-col gap-2 text-xs font-bold text-slate-500">
                           <span className="flex items-center gap-2"><Mail size={12} className="text-indigo-400" /> contact@globaltech.sn</span>
                           <span className="flex items-center gap-2"><Phone size={12} className="text-indigo-400" /> +221 33 800 00 00</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="w-16 h-16 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center">
                           <Building className="text-slate-700" size={32} />
                        </div>
                     </div>
                  </div>

                  {/* Order Workflow */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] border-b border-slate-800 pb-2">Suivi Logistique</h4>
                     <div className="flex justify-between relative px-2">
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-800 z-0 mx-8" />
                        <WorkflowStep label="Céation" active completed />
                        <WorkflowStep label="Validation" active completed />
                        <WorkflowStep label="Expédition" active={selectedPurchase.status === 'En transit' || selectedPurchase.status === 'Livré'} completed={selectedPurchase.status === 'Livré'} />
                        <WorkflowStep label="Réception" active={selectedPurchase.status === 'Livré'} completed={selectedPurchase.status === 'Livré'} />
                     </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] border-b border-slate-800 pb-2">Articles commandés</h4>
                     <div className="space-y-3">
                        <PurchaseItem label="PC Portable Latitude 5420" qty="5" unit="Pce" total="3 250 000 F" />
                        <PurchaseItem label="Moniteur Dell 24' P2422H" qty="5" unit="Pce" total="1 250 000 F" />
                     </div>
                  </div>

                  {/* Totals */}
                  <div className="p-8 bg-slate-950 rounded-3xl border border-slate-800 space-y-4 shadow-inner">
                     <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Montant Net à Payer</p>
                          <h3 className="text-3xl font-black text-white mt-1">{selectedPurchase.total} <span className="text-xs font-bold text-slate-500">CFA</span></h3>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] text-slate-500 font-bold uppercase">Condition</p>
                           <p className="text-xs font-bold text-slate-300">Net 30 jours</p>
                        </div>
                     </div>
                  </div>
               </div>

               <button 
                onClick={() => setSelectedPurchase(null)}
                className="mt-auto py-6 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em] border-t border-slate-800/50"
              >
                Fermer la commande
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PurchaseStat = ({ label, value, icon, color, sub }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">{label}</p>
        <h4 className="text-lg font-black text-white">{value}</h4>
        <p className={`text-[10px] font-bold mt-0.5 ${sub.includes('+') ? 'text-indigo-400' : 'text-slate-500'}`}>{sub}</p>
      </div>
    </div>
  </div>
);

const SupplierCard = ({ name, contact, category, rating }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer">
     <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-400 border border-slate-700 group-hover:bg-slate-700 transition-all">
           <Building size={24} />
        </div>
        <div className="text-right">
           <p className="text-[10px] font-black uppercase text-slate-500">Note</p>
           <p className="text-sm font-black text-amber-400">★ {rating}</p>
        </div>
     </div>
     <h4 className="font-black text-white group-hover:text-indigo-400 transition-colors">{name}</h4>
     <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-tighter">{category} • {contact}</p>
     <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all">
        <button className="text-[10px] font-black uppercase text-indigo-400">Fiche tiers</button>
        <button className="text-[10px] font-black uppercase text-slate-500 hover:text-white">Commandes</button>
     </div>
  </div>
);

const WorkflowStep = ({ label, active, completed }: any) => (
  <div className="flex flex-col items-center gap-2 z-10">
     <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
       completed ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 
       active ? 'bg-slate-900 border-indigo-500 text-indigo-400 shadow-lg shadow-indigo-500/20' : 
       'bg-slate-900 border-slate-800 text-slate-700'
     }`}>
        {completed ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 rounded-full bg-current" />}
     </div>
     <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-slate-300' : 'text-slate-600'}`}>{label}</span>
  </div>
);

const PurchaseItem = ({ label, qty, unit, total }: any) => (
  <div className="flex items-center justify-between group p-2 hover:bg-slate-800/50 rounded-xl transition-all">
     <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-200">{label}</span>
        <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Qté: {qty} • Unité: {unit}</span>
     </div>
     <span className="font-black text-slate-200 text-sm">{total}</span>
  </div>
);

export default PurchasesModule;
