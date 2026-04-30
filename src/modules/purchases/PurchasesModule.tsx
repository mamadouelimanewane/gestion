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
    { id: 'CMD-2024-092', provider: 'Sénégal Bureau', date: '22/04/2024', total: '120 000 F', status: 'En transit', color: 'orange' },
    { id: 'CMD-2024-095', provider: 'Dell Technologies', date: '25/04/2024', total: '12 000 000 F', status: 'Payé', color: 'green' },
    { id: 'CMD-2024-102', provider: 'SENELEC', date: '28/04/2024', total: '1 250 000 F', status: 'En attente', color: 'red' },
  ];

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <PurchaseStat label="Commandes (Mois)" value="12" icon={<ShoppingCart size={18} />} color="blue" sub="+3 vs M-1" />
        <PurchaseStat label="Livraisons attendues" value="5" icon={<Truck size={18} />} color="orange" sub="Aujourd'hui" />
        <PurchaseStat label="Masse d'achats" value="18 620 000 F" icon={<TrendingDown size={18} />} color="green" sub="-2.4% vs M-1" />
        <PurchaseStat label="À Régler (30j)" value="4 620 000 F" icon={<CreditCard size={18} />} color="red" sub="8 factures" />
      </div>

      {/* Navigation & Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-xl border border-[#cbd5e1] shadow-sm">
        <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1] shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded text-[11px] font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-white text-[#005eb8] shadow-sm border border-[#cbd5e1]' : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
            <input 
              type="text" 
              placeholder="Chercher fournisseur, commande..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-[#cbd5e1] rounded-lg text-xs font-bold text-[#334155] outline-none focus:border-[#005eb8] transition-all w-full md:w-80 shadow-inner" 
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all shadow-md">
            <Plus size={18} />
            Créer Commande
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {activeTab === 'commandes' && (
            <motion.div
              key="commandes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm h-full flex flex-col"
            >
              <div className="overflow-auto flex-1">
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-[#f8fafc] border-b border-[#cbd5e1] sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b]">ID Commande</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Fournisseur</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Emission</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b] text-right">Montant Total</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#64748b] text-center">Statut Flux</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {purchases.map((p) => (
                      <tr 
                        key={p.id} 
                        className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                        onClick={() => setSelectedPurchase(p)}
                      >
                        <td className="px-6 py-5 font-mono text-[#005eb8] text-xs font-bold uppercase">{p.id}</td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                              <span className="font-bold text-[#334155] group-hover:text-[#005eb8] transition-colors text-xs uppercase tracking-tight">{p.provider}</span>
                              <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1">Dakar, Sénégal</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-xs text-[#475569] font-bold uppercase">{p.date}</td>
                        <td className="px-6 py-5 text-right font-bold text-[#0f172a] text-sm">{p.total}</td>
                        <td className="px-6 py-5">
                          <div className={`mx-auto w-fit px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest ${
                            p.color === 'blue' ? 'bg-blue-50 text-[#005eb8] border-blue-200' :
                            p.color === 'orange' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                            p.color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-200' :
                            'bg-red-50 text-[#dc2626] border-red-200'
                          }`}>
                            {p.status}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="p-2 text-[#94a3b8] group-hover:text-[#005eb8] transition-all">
                              <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Suppliers Tab */}
          {activeTab === 'fournisseurs' && (
            <motion.div
              key="fournisseurs"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <SupplierCard name="Global Tech SA" contact="Seydou Kane" category="Informatique" rating={4.8} />
              <SupplierCard name="Sénégal Bureau" contact="Awa Fall" category="Papeterie" rating={4.5} />
              <SupplierCard name="CFAO Motors" contact="Omar Diop" category="Logistique" rating={4.2} />
            </motion.div>
          )}

          {/* Other tabs */}
          {(activeTab === 'besoins' || activeTab === 'factures') && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-dashed border-[#cbd5e1] flex flex-col items-center justify-center h-96 rounded-xl shadow-inner"
            >
                <div className="w-20 h-20 bg-[#f8fafc] rounded-3xl flex items-center justify-center mb-6 border border-[#cbd5e1] shadow-inner">
                  {activeTab === 'besoins' ? <ClipboardCheck size={32} className="text-[#005eb8]" /> : <FileText size={32} className="text-[#107e3e]" />}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#0f172a]">Module {activeTab}</h3>
                <p className="text-[#64748b] max-w-sm text-center mt-3 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                  Initialisation des workflows SAP-grade pour la validation des besoins d'achat et la dématérialisation des factures.
                </p>
                <button className="mt-8 px-8 py-3 bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-[#cbd5e1] rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all text-[#64748b]">
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
      </div>

      {/* Purchase Detail Drawer */}
      <AnimatePresence>
        {selectedPurchase && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPurchase(null)}
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
                      selectedPurchase.color === 'blue' ? 'bg-blue-50 text-[#005eb8] border-blue-200' :
                      selectedPurchase.color === 'orange' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                      selectedPurchase.color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-200' :
                      'bg-red-50 text-[#dc2626] border-red-200'
                    }`}>
                      Commande {selectedPurchase.status}
                    </div>
                    <h3 className="text-4xl font-bold text-[#0f172a] tracking-tighter uppercase">{selectedPurchase.id}</h3>
                    <p className="text-[#64748b] font-bold uppercase text-[10px] mt-2 tracking-widest">Emise le {selectedPurchase.date}</p>
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
                  {/* Supplier Section */}
                  <div className="flex justify-between items-start p-8 bg-[#f8fafc] rounded-xl border border-[#cbd5e1] shadow-inner">
                     <div className="space-y-6">
                        <h4 className="text-[10px] font-bold uppercase text-[#005eb8] tracking-widest border-b border-blue-100 pb-2">Fournisseur</h4>
                        <div className="space-y-1">
                           <p className="text-xl font-bold text-[#0f172a] uppercase tracking-tight">{selectedPurchase.provider}</p>
                           <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-wider">Zone Industrielle, Dakar, Sénégal</p>
                        </div>
                        <div className="flex flex-col gap-2 text-[10px] font-bold text-[#475569] uppercase tracking-widest">
                           <span className="flex items-center gap-3"><Mail size={14} className="text-[#005eb8]" /> contact@globaltech.sn</span>
                           <span className="flex items-center gap-3"><Phone size={14} className="text-[#005eb8]" /> +221 33 800 00 00</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="w-20 h-20 bg-white rounded-2xl border border-[#cbd5e1] flex items-center justify-center shadow-sm">
                           <Building className="text-[#cbd5e1]" size={40} />
                        </div>
                     </div>
                  </div>

                  {/* Order Workflow */}
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-bold uppercase text-[#64748b] tracking-widest border-b border-[#f1f5f9] pb-2">Suivi Logistique</h4>
                     <div className="flex justify-between relative px-4">
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#f1f5f9] z-0 mx-10 shadow-inner" />
                        <WorkflowStep label="Céation" active completed />
                        <WorkflowStep label="Validation" active completed />
                        <WorkflowStep label="Expédition" active={selectedPurchase.status === 'En transit' || selectedPurchase.status === 'Livré'} completed={selectedPurchase.status === 'Livré'} />
                        <WorkflowStep label="Réception" active={selectedPurchase.status === 'Livré'} completed={selectedPurchase.status === 'Livré'} />
                     </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-bold uppercase text-[#64748b] tracking-widest border-b border-[#f1f5f9] pb-2">Articles commandés</h4>
                     <div className="space-y-2">
                        <PurchaseItem label="PC Portable Latitude 5420" qty="5" unit="Pce" total="3 250 000 F" />
                        <PurchaseItem label="Moniteur Dell 24' P2422H" qty="5" unit="Pce" total="1 250 000 F" />
                     </div>
                  </div>

                  {/* Totals */}
                  <div className="p-10 bg-[#0f172a] rounded-2xl border border-[#0f172a] space-y-4 shadow-xl">
                     <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-bold uppercase text-blue-400 tracking-widest mb-2">Montant Net à Payer</p>
                          <h3 className="text-4xl font-bold text-white tracking-tighter">{selectedPurchase.total} <span className="text-xs font-bold text-blue-300">CFA</span></h3>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Condition</p>
                           <p className="text-xs font-bold text-white uppercase tracking-wider">Net 30 jours</p>
                        </div>
                     </div>
                  </div>
               </div>

               <button 
                onClick={() => setSelectedPurchase(null)}
                className="mt-auto py-6 bg-[#f8fafc] text-[#64748b] hover:text-[#0f172a] transition-all text-[11px] font-bold uppercase tracking-[0.3em] border-t border-[#cbd5e1] hover:bg-[#f1f5f9]"
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

const PurchaseStat = ({ label, value, icon, color, sub }: any) => {
  const colorMap: any = {
    blue: 'text-[#005eb8] border-blue-100 bg-blue-50',
    orange: 'text-orange-600 border-orange-100 bg-orange-50',
    green: 'text-[#107e3e] border-green-100 bg-green-50',
    red: 'text-[#dc2626] border-red-100 bg-red-50',
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow-sm group hover:border-[#005eb8] transition-all cursor-pointer relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-[#005eb8] opacity-0 group-hover:opacity-5 transition-opacity`}></div>
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-xl shadow-inner border transition-transform group-hover:scale-110 ${c}`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mb-1">{label}</p>
          <h4 className="text-xl font-bold text-[#0f172a] tracking-tight">{value}</h4>
          <p className={`text-[9px] font-bold mt-1 uppercase tracking-wider ${sub.includes('+') ? 'text-[#005eb8]' : 'text-[#94a3b8]'}`}>{sub}</p>
        </div>
      </div>
    </div>
  );
};

const SupplierCard = ({ name, contact, category, rating }: any) => (
  <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 shadow-sm group hover:border-[#005eb8] transition-all cursor-pointer">
     <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 bg-[#f8fafc] rounded-2xl flex items-center justify-center text-[#94a3b8] border border-[#cbd5e1] group-hover:text-[#005eb8] group-hover:border-blue-100 transition-all shadow-inner">
           <Building size={28} />
        </div>
        <div className="text-right">
           <p className="text-[10px] font-bold uppercase text-[#64748b] tracking-widest mb-1">Note SAP</p>
           <p className="text-sm font-bold text-orange-500 tracking-tighter">★ {rating}</p>
        </div>
     </div>
     <h4 className="font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{name}</h4>
     <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest mt-2">{category} • {contact}</p>
     <div className="mt-8 pt-6 border-t border-[#f1f5f9] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all">
        <button className="text-[10px] font-bold text-[#005eb8] uppercase tracking-[0.2em]">Fiche Tiers</button>
        <button className="text-[10px] font-bold text-[#64748b] hover:text-[#0f172a] uppercase tracking-[0.2em]">Commandes</button>
     </div>
  </div>
);

const WorkflowStep = ({ label, active, completed }: any) => (
  <div className="flex flex-col items-center gap-3 z-10">
     <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${
       completed ? 'bg-[#107e3e] border-[#107e3e] text-white' : 
       active ? 'bg-white border-[#005eb8] text-[#005eb8]' : 
       'bg-[#f8fafc] border-[#cbd5e1] text-[#cbd5e1]'
     }`}>
        {completed ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
     </div>
     <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-[#0f172a]' : 'text-[#64748b]'}`}>{label}</span>
  </div>
);

const PurchaseItem = ({ label, qty, unit, total }: any) => (
  <div className="flex items-center justify-between group p-4 hover:bg-blue-50/30 rounded-xl transition-all border border-transparent hover:border-blue-100">
     <div className="flex flex-col">
        <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#0f172a]">{label}</span>
        <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest mt-1">Qté: {qty} • Unité: {unit}</span>
     </div>
     <span className="font-bold text-[#0f172a] text-sm tracking-tight">{total}</span>
  </div>
);

export default PurchasesModule;
