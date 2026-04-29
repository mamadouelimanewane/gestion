import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, ShoppingCart, Truck, ClipboardList, 
  Search, Filter, Plus, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, Box, ArrowRight,
  Database, RefreshCw, BarChart3, ShieldCheck,
  Building2, HardDrive, MapPin, Layers
} from 'lucide-react';

const LogisticsModule = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'procurement' | 'sales'>('inventory');

  const stockItems = [
    { id: 'RM-001', label: 'Acier Inoxydable 304', category: 'Matières Premières', stock: 1250, unit: 'kg', value: 8750000, status: 'Normal' },
    { id: 'RM-042', label: 'Composant Electronique X1', category: 'Semi-Finis', stock: 450, unit: 'pcs', value: 3150000, status: 'Bas' },
    { id: 'PF-882', label: 'Unité Industrielle A', category: 'Produits Finis', stock: 85, unit: 'u', value: 24500000, status: 'Normal' },
    { id: 'RM-088', label: 'Emballage Standard L', category: 'Consommables', stock: 15, unit: 'pcs', value: 45000, status: 'Critique' },
  ];

  const purchaseOrders = [
    { id: 'PO-2024-001', supplier: 'ACIERIE DU SENEGAL', date: '25/04/2024', amount: 15400000, status: 'En livraison', type: 'Matières' },
    { id: 'PO-2024-042', supplier: 'TECH SOLUTIONS SA', date: '28/04/2024', amount: 3200000, status: 'Validé', type: 'Services' },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Logistics Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-inner text-blue-400">
              <Box size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Gestion Logistique & Supply Chain (MM/SD)</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Intégration Stocks • Achats • Ventes • SAP S/4HANA Standards</p>
           </div>
        </div>
        <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
           {[
             { id: 'inventory', label: 'Stocks & Entrepôts', icon: HardDrive },
             { id: 'procurement', label: 'Achats (MM)', icon: ShoppingCart },
             { id: 'sales', label: 'Ventes (SD)', icon: Truck },
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'
               }`}
             >
                <tab.icon size={14} />
                {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* Supply Chain KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <LogisticsStatCard title="Valeur Totale Stock" value="48.2 M" sub="Valorisation CUMP" color="blue" trend="+2.4%" />
         <LogisticsStatCard title="Commandes en cours" value="12" sub="Volume : 24.5M" color="amber" trend="Stable" />
         <LogisticsStatCard title="Taux de Service" value="96.5 %" sub="Livraisons à temps" color="emerald" trend="+0.8%" />
         <LogisticsStatCard title="Ruptures Détectées" value="3" sub="Action immédiate" color="rose" trend="Alerte" />
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'inventory' && (
           <motion.div 
             key="inventory"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 card bg-slate-800/20 border-slate-700/50 flex flex-col overflow-hidden shadow-2xl">
                 <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <Layers size={18} className="text-blue-400" />
                       <h4 className="text-xs font-black uppercase tracking-widest text-white">Inventaire Temps Réel (MM-IM)</h4>
                    </div>
                    <div className="flex gap-2">
                       <div className="relative">
                          <input type="text" placeholder="Référence..." className="bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-4 py-1.5 text-[10px] uppercase font-bold text-white outline-none focus:border-blue-500 transition-all" />
                          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                       </div>
                       <button className="btn btn-secondary px-4 py-1.5 flex items-center gap-2"><Filter size={14} /> Filtres</button>
                    </div>
                 </div>
                 <div className="overflow-auto">
                    <table className="w-full text-left">
                       <thead className="bg-slate-900/50 text-[9px] font-black uppercase text-slate-500 tracking-widest">
                          <tr>
                             <th className="p-6">Article / Catégorie</th>
                             <th className="p-6 text-right">Stock Actuel</th>
                             <th className="p-6 text-right">Valeur Stock</th>
                             <th className="p-6 text-center">Statut</th>
                             <th className="p-6 text-center">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-700/30">
                          {stockItems.map((item) => (
                            <tr key={item.id} className="group hover:bg-blue-500/5 transition-all cursor-pointer">
                               <td className="p-6">
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 group-hover:text-blue-400 transition-colors">
                                        <Package size={20} />
                                     </div>
                                     <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-wide">{item.label}</span>
                                        <span className="text-[9px] text-slate-500 font-black uppercase mt-1">{item.id} • {item.category}</span>
                                     </div>
                                  </div>
                               </td>
                               <td className="p-6 text-right">
                                  <span className="text-xs font-black text-white">{item.stock.toLocaleString()}</span>
                                  <span className="text-[10px] font-bold text-slate-500 ml-1 uppercase">{item.unit}</span>
                               </td>
                               <td className="p-6 text-right font-medium text-slate-300">{item.value.toLocaleString()} F</td>
                               <td className="p-6 text-center">
                                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                                    item.status === 'Critique' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 
                                    item.status === 'Bas' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 
                                    'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                  }`}>
                                     {item.status}
                                  </span>
                               </td>
                               <td className="p-6 text-center">
                                  <button className="p-2 text-slate-600 hover:text-blue-400 transition-colors"><ArrowRight size={16} /></button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-blue-600/5 border-blue-500/20 p-8 flex flex-col gap-6 shadow-2xl">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-blue-500/20 pb-4">Mapping Entrepôt (WM)</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <WarehouseBin label="Zone A (Matières)" fill={85} />
                       <WarehouseBin label="Zone B (Semi-Finis)" fill={42} />
                       <WarehouseBin label="Zone C (Finis)" fill={65} />
                       <WarehouseBin label="Zone D (Quarantaine)" fill={12} />
                    </div>
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-600/20">
                       Planifier Inventaire Physique
                    </button>
                 </div>

                 <div className="card bg-slate-800/30 border-slate-700/50 p-8 flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-blue-400 mb-2">
                       <AlertTriangle size={18} />
                       <h4 className="text-[10px] font-black uppercase tracking-widest">Optimisation IA Joule</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                       Basé sur vos ordres de fabrication, l'IA suggère de commander **500kg supplémentaires** d'Acier Inoxydable d'ici 3 jours pour éviter une rupture de production.
                    </p>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'procurement' && (
           <motion.div 
             key="procurement"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 flex flex-col gap-6">
                 <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden">
                    <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                       <h4 className="text-xs font-black uppercase tracking-widest text-white">Commandes Fournisseurs (ME21N)</h4>
                       <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                          <Plus size={14} /> Créer Commande
                       </button>
                    </div>
                    <div className="p-0">
                       {purchaseOrders.map((po) => (
                         <div key={po.id} className="p-6 border-b border-slate-700/30 flex items-center justify-between hover:bg-slate-800/30 transition-all group">
                            <div className="flex items-center gap-4">
                               <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 group-hover:text-amber-400">
                                  <ShoppingCart size={18} />
                               </div>
                               <div className="flex flex-col">
                                  <span className="text-xs font-black text-white uppercase tracking-widest">{po.supplier}</span>
                                  <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">{po.id} • {po.date}</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-8">
                               <div className="text-right">
                                  <p className="text-sm font-black text-white">{po.amount.toLocaleString()} F</p>
                                  <p className="text-[9px] text-slate-500 font-bold uppercase">{po.type}</p>
                               </div>
                               <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase">
                                  {po.status}
                               </span>
                               <button className="p-2 text-slate-600 hover:text-white transition-colors"><ArrowRight size={16} /></button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="card bg-slate-800/30 p-6 flex flex-col gap-4">
                       <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Analyse Fournisseurs</h5>
                       <div className="space-y-3">
                          <SupplierRating name="Acierie du Sénégal" score={98} />
                          <SupplierRating name="Tech Solutions" score={85} />
                          <SupplierRating name="Logistique Dakar" score={72} />
                       </div>
                    </div>
                    <div className="card bg-slate-800/30 p-6 flex flex-col gap-4">
                       <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Délai Moyen Livraison</h5>
                       <div className="flex items-end gap-2">
                          <span className="text-3xl font-black text-white">4.2</span>
                          <span className="text-xs font-black text-slate-500 mb-1">JOURS</span>
                       </div>
                       <div className="h-1 bg-slate-900 rounded-full">
                          <div className="h-full bg-emerald-500 w-[85%] rounded-full" />
                       </div>
                       <p className="text-[9px] text-emerald-400 font-bold uppercase">En amélioration de 12%</p>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-slate-800/30 border-slate-700/50 p-8 flex flex-col gap-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Intégration Finance (FI-AP)</h4>
                    <div className="space-y-4">
                       <FinanceSyncItem label="Factures en attente" value="4 250 000 F" icon={<Database size={16} />} />
                       <FinanceSyncItem label="Provisions Stocks" value="1 800 000 F" icon={<ShieldCheck size={16} />} />
                       <FinanceSyncItem label="Écarts de Facturation" value="150 000 F" icon={<AlertTriangle size={16} />} color="rose" />
                    </div>
                    <button className="w-full py-3 bg-slate-900 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                       Vérification Facture (MIRO)
                    </button>
                 </div>

                 <div className="card bg-indigo-600/5 border-indigo-500/20 p-8 flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                       <RefreshCw size={20} className="animate-spin-slow" />
                    </div>
                    <div>
                       <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Auto-Procurement</h5>
                       <p className="text-[9px] text-slate-500 font-medium leading-relaxed mt-1">Le système génère automatiquement des demandes d'achat basées sur les points de commande.</p>
                    </div>
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'sales' && (
           <motion.div 
             key="sales"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           >
              <div className="lg:col-span-2 flex flex-col gap-6">
                 <div className="card bg-slate-800/20 border-slate-700/50 overflow-hidden">
                    <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                       <h4 className="text-xs font-black uppercase tracking-widest text-white">Commandes Clients (VA01)</h4>
                       <div className="flex gap-2">
                          <button className="p-2 text-slate-500 hover:text-white"><Search size={18} /></button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                             <Plus size={14} /> Nouvelle Vente
                          </button>
                       </div>
                    </div>
                    <div className="p-0">
                       {[
                         { id: 'SO-2024-882', client: 'PHARMA PLUS SENEGAL', amount: 8450000, status: 'Prêt pour expédition' },
                         { id: 'SO-2024-901', client: 'MINISTERE DE LA SANTE', amount: 12800000, status: 'Livré' },
                         { id: 'SO-2024-955', client: 'HÔPITAL PRINCIPAL', amount: 3200000, status: 'En préparation' },
                       ].map((so) => (
                         <div key={so.id} className="p-6 border-b border-slate-700/30 flex items-center justify-between hover:bg-slate-800/30 transition-all group">
                            <div className="flex items-center gap-4">
                               <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 group-hover:text-emerald-400">
                                  <Truck size={18} />
                               </div>
                               <div className="flex flex-col">
                                  <span className="text-xs font-black text-white uppercase tracking-widest">{so.client}</span>
                                  <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">{so.id}</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-8">
                               <span className="text-sm font-black text-white">{so.amount.toLocaleString()} F</span>
                               <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${
                                 so.status === 'Livré' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                 so.status === 'En préparation' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                                 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                               }`}>
                                  {so.status}
                               </span>
                               <button className="p-2 text-slate-600 hover:text-white transition-colors"><ArrowRight size={16} /></button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="card bg-slate-800/30 p-8 flex flex-col items-center justify-center text-center gap-4 shadow-2xl">
                       <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                          <MapPin size={32} />
                       </div>
                       <div>
                          <h5 className="text-xs font-black text-white uppercase tracking-widest">Tracking Livraisons</h5>
                          <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">4 camions en transit sur Dakar-Thies</p>
                       </div>
                    </div>
                    <div className="card bg-slate-800/30 p-8 flex flex-col items-center justify-center text-center gap-4 shadow-2xl">
                       <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                          <BarChart3 size={32} />
                       </div>
                       <div>
                          <h5 className="text-xs font-black text-white uppercase tracking-widest">Pipeline Ventes</h5>
                          <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Conversion : 68% (N+1)</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="card bg-slate-800/30 border-slate-700/50 p-8 flex flex-col gap-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Intégration Finance (FI-AR)</h4>
                    <div className="space-y-4">
                       <FinanceSyncItem label="Facturation Prévue" value="21 450 000 F" icon={<Database size={16} />} />
                       <FinanceSyncItem label="Crédit Client Global" value="45 000 000 F" icon={<ShieldCheck size={16} />} />
                    </div>
                    <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20">
                       Facturation de Masse (VF01)
                    </button>
                 </div>

                 <div className="card bg-blue-600/5 border-blue-500/20 p-8 flex flex-col gap-4">
                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Top Destinations</h5>
                    <div className="space-y-2">
                       <DestinationRow city="Dakar" percentage={65} />
                       <DestinationRow city="Thies" percentage={15} />
                       <DestinationRow city="Saint-Louis" percentage={10} />
                       <DestinationRow city="Autres" percentage={10} />
                    </div>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const LogisticsStatCard = ({ title, value, sub, color, trend }: any) => (
  <div className="card group hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden p-8 shadow-xl border-slate-700/50">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-4">
       <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none">{title}</p>
       <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg bg-${trend.includes('+') ? 'emerald' : 'slate'}-500/10 text-${trend.includes('+') ? 'emerald' : 'slate'}-400 border border-${trend.includes('+') ? 'emerald' : 'slate'}-500/20`}>{trend}</span>
    </div>
    <h3 className="text-2xl font-black text-white group-hover:text-white transition-colors">{value}</h3>
    <p className="text-[9px] font-bold text-slate-600 uppercase mt-2 tracking-tighter">{sub}</p>
  </div>
);

const WarehouseBin = ({ label, fill }: any) => (
  <div className="flex flex-col gap-2 p-4 bg-slate-900 border border-slate-800 rounded-2xl group hover:border-blue-500/30 transition-all">
     <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{label}</span>
     <div className="flex items-center justify-between">
        <span className="text-xs font-black text-white">{fill}%</span>
        <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
           <div className={`h-full ${fill > 80 ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ width: `${fill}%` }} />
        </div>
     </div>
  </div>
);

const SupplierRating = ({ name, score }: any) => (
  <div className="flex items-center justify-between">
     <span className="text-[10px] font-bold text-slate-400 uppercase">{name}</span>
     <div className="flex items-center gap-2">
        <div className="w-20 h-1 bg-slate-900 rounded-full overflow-hidden">
           <div className="h-full bg-blue-500" style={{ width: `${score}%` }} />
        </div>
        <span className="text-[10px] font-black text-white">{score}%</span>
     </div>
  </div>
);

const FinanceSyncItem = ({ label, value, icon, color }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
     <div className="flex items-center gap-3">
        <div className={color === 'rose' ? 'text-rose-400' : 'text-slate-500'}>{icon}</div>
        <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
     </div>
     <span className={`text-xs font-black ${color === 'rose' ? 'text-rose-400' : 'text-slate-200'}`}>{value}</span>
  </div>
);

const DestinationRow = ({ city, percentage }: any) => (
  <div className="flex items-center justify-between">
     <span className="text-[10px] font-bold text-slate-500 uppercase">{city}</span>
     <div className="flex items-center gap-3">
        <div className="w-32 h-1 bg-slate-900 rounded-full overflow-hidden">
           <div className="h-full bg-blue-500" style={{ width: `${percentage}%` }} />
        </div>
        <span className="text-[10px] font-black text-white">{percentage}%</span>
     </div>
  </div>
);

export default LogisticsModule;
