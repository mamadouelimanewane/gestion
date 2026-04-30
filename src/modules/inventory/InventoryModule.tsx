import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, ArrowRightLeft, AlertTriangle, ClipboardList, 
  Search, Plus, Filter, Download, ArrowUpRight, 
  ArrowDownRight, Barcode, Warehouse, Eye,
  ChevronRight, History, Settings, Trash2, Edit3, Wrench,
  XCircle, MapPin, Boxes, Activity, Info, MoreVertical
} from 'lucide-react';
import PlantMaintenance from './PlantMaintenance';

const InventoryModule = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const tabs = [
    { id: 'articles', label: 'Catalogue Articles', icon: Package },
    { id: 'mouvements', label: 'Flux & Transferts', icon: ArrowRightLeft },
    { id: 'depots', label: 'Entrepôts', icon: Warehouse },
    { id: 'alertes', label: 'Alertes Stock', icon: AlertTriangle },
    { id: 'inventaires', label: 'Inventaires', icon: ClipboardList },
    { id: 'maintenance', label: 'Maintenance (PM)', icon: Wrench },
  ];

  const articles = [
    { ref: 'ART-GEN-001', name: 'Groupe Électrogène 50KVA', family: 'Matériel Lourd', qty: 12, min: 5, cump: '4 500 000', value: '54 000 000', status: 'En stock', color: 'green' },
    { ref: 'ART-INF-089', name: 'Serveur Dell PowerEdge R740', family: 'Informatique', qty: 3, min: 10, cump: '2 850 000', value: '8 550 000', status: 'Alerte', color: 'orange' },
    { ref: 'ART-CONS-45', name: 'Câble Réseau Cat6 (305m)', family: 'Consommables', qty: 45, min: 20, cump: '35 000', value: '1 575 000', status: 'En stock', color: 'green' },
    { ref: 'ART-CONS-12', name: 'Huile Moteur 5L (Synthétique)', family: 'Maintenance', qty: 0, min: 5, cump: '25 000', value: '0', status: 'Rupture', color: 'red' },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 rounded-xl border border-[#cbd5e1] shadow-sm">
        <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1] shadow-inner overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-2.5 rounded text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-[#005eb8] shadow-sm border border-[#cbd5e1]'
                  : 'text-[#64748b] hover:text-[#0f172a] hover:bg-white/50'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-3 px-6 py-2.5 bg-white border border-[#cbd5e1] rounded-lg text-[11px] font-bold uppercase tracking-widest text-[#64748b] hover:text-[#005eb8] hover:bg-blue-50 transition-all shadow-sm">
              <Barcode size={20} />
              Scanner Code-Barres
           </button>
           <button className="flex items-center gap-3 px-8 py-2.5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg">
              <Plus size={20} />
              Nouvel Article
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Catalogue Articles */}
        {activeTab === 'articles' && (
          <motion.div
            key="articles"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6 h-full"
          >
            {/* Filter Bar */}
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-[#cbd5e1] shadow-sm">
              <div className="flex gap-4 items-center">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#005eb8] transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Chercher par référence, désignation, famille..."
                    className="w-[500px] bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-12 pr-6 py-3 text-xs font-bold text-[#334155] placeholder:text-[#94a3b8] uppercase tracking-tight outline-none focus:border-[#005eb8] focus:bg-white transition-all shadow-inner"
                  />
                </div>
                <button className="flex items-center gap-3 px-6 py-3 bg-white border border-[#cbd5e1] rounded-lg text-[11px] font-bold text-[#64748b] uppercase tracking-widest hover:bg-[#f1f5f9] transition-all shadow-sm">
                  <Filter size={18} />
                  Familles
                </button>
              </div>
              <div className="flex items-center gap-4 px-6 py-3 bg-green-50 border border-green-100 rounded-xl shadow-inner">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#107e3e] animate-pulse" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#107e3e]">Stock Cloud Synchronisé</span>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex-1 flex flex-col">
              <div className="overflow-auto flex-1">
                <table className="w-full text-left whitespace-nowrap border-collapse">
                  <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Référence SKU</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Désignation de l'Article</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Famille Logistique</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-right">Stock Actuel</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-right">CUMP (F)</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-right">Valeur Stock</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-center">Statut</th>
                      <th className="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {articles.map((item, i) => (
                      <tr key={i} className="group hover:bg-blue-50/30 transition-all cursor-pointer" onClick={() => setSelectedItem(item)}>
                        <td className="px-8 py-5">
                           <span className="font-mono font-bold text-sm text-[#005eb8] tracking-tighter uppercase">{item.ref}</span>
                        </td>
                        <td className="px-8 py-5">
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{item.name}</span>
                              <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1 opacity-70">Localisation: DKR-A12</span>
                           </div>
                        </td>
                        <td className="px-8 py-5">
                           <span className="px-3 py-1 bg-[#f8fafc] border border-[#cbd5e1] rounded text-[9px] font-bold uppercase tracking-widest text-[#64748b]">
                              {item.family}
                           </span>
                        </td>
                        <td className={`px-8 py-5 text-right font-bold text-base tracking-tighter ${item.qty <= item.min ? 'text-[#dc2626]' : 'text-[#0f172a]'}`}>
                           {item.qty}
                        </td>
                        <td className="px-8 py-5 text-right font-bold text-[#64748b] text-xs">
                           {item.cump}
                        </td>
                        <td className="px-8 py-5 text-right font-bold text-[#0f172a] text-sm tracking-tighter">
                           {item.value}
                        </td>
                        <td className="px-8 py-5 text-center">
                           <span className={`px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest ${
                              item.color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-200' :
                              item.color === 'orange' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                              'bg-red-50 text-[#dc2626] border-red-200'
                           }`}>
                              {item.status}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-lg text-[#94a3b8] hover:text-[#0f172a] shadow-sm transition-all">
                              <MoreVertical size={18} />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mouvements */}
        {activeTab === 'mouvements' && (
          <motion.div
            key="mouvements"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-8 h-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <MouvementCard title="Entrées Magasin (M-1)" value="125" trend="+12%" icon={<ArrowDownRight size={24} />} color="green" />
               <MouvementCard title="Sorties / Livraisons" value="84" trend="+5%" icon={<ArrowUpRight size={24} />} color="red" />
               <MouvementCard title="Transferts Inter-Dépôts" value="12" trend="0%" icon={<ArrowRightLeft size={24} />} color="blue" />
            </div>

            <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex-1 flex flex-col">
               <div className="p-6 border-b border-[#cbd5e1] flex justify-between items-center bg-[#f8fafc]">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                        <History size={20} />
                     </div>
                     <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Journal des Flux de Stock en Temps Réel</h3>
                  </div>
                  <button className="px-6 py-2.5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-md flex items-center gap-3">
                     <Plus size={16} /> Saisir un Bon de Sortie
                  </button>
               </div>
               <div className="overflow-auto flex-1">
                 <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#cbd5e1] font-bold uppercase text-[10px] tracking-widest sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="px-8 py-4">Horodatage</th>
                        <th className="px-8 py-4">Nature du flux</th>
                        <th className="px-8 py-4">Article / Désignation</th>
                        <th className="px-8 py-4 text-center">Entrepôt / Zone</th>
                        <th className="px-8 py-4 text-right">Quantité</th>
                        <th className="px-8 py-4 text-right">Réf. Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {[
                        { date: '12/10 14:30', type: 'Entrée (Achat)', color: 'green', item: 'Groupe Électrogène 50KVA', wh: 'MAGASIN DAKAR', qty: '+5', doc: 'BE-2024-045' },
                        { date: '12/10 11:15', type: 'Sortie (Chantier)', color: 'red', item: 'Câble Réseau Cat6 (305m)', wh: 'DEPOT THIES', qty: '-12', doc: 'BS-2024-892' },
                        { date: '11/10 16:45', type: 'Transfert Interne', color: 'blue', item: 'Serveur Dell PowerEdge R740', wh: 'DAKAR → SAINT-LOUIS', qty: '1', doc: 'TR-102' },
                      ].map((m, i) => (
                        <tr key={i} className="hover:bg-blue-50/30 transition-all group cursor-pointer">
                          <td className="px-8 py-5 text-[#64748b] font-mono font-bold text-xs uppercase tracking-tighter">{m.date}</td>
                          <td className="px-8 py-5">
                             <div className={`w-fit px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest ${
                                m.color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-200' :
                                m.color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-200' :
                                'bg-blue-50 text-[#005eb8] border-blue-200'
                             }`}>
                                {m.type}
                             </div>
                          </td>
                          <td className="px-8 py-5 font-bold text-[#334155] text-xs uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{m.item}</td>
                          <td className="px-8 py-5 text-center">
                             <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest opacity-80">{m.wh}</span>
                          </td>
                          <td className={`px-8 py-5 text-right font-black text-sm tracking-tighter ${m.color === 'green' ? 'text-[#107e3e]' : m.color === 'red' ? 'text-[#dc2626]' : 'text-[#005eb8]'}`}>{m.qty}</td>
                          <td className="px-8 py-5 text-[#005eb8] font-mono font-bold text-xs text-right tracking-widest">{m.doc}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </motion.div>
        )}

        {/* Entrepôts */}
        {activeTab === 'depots' && (
          <motion.div
            key="depots"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
             <WarehouseCard name="Magasin Central - Dakar Plateau" manager="Amadou Diop" items={850} capacity={85} color="blue" />
             <WarehouseCard name="Dépôt Régional - Thiès Escale" manager="Fatou Fall" items={230} capacity={45} color="green" />
             <WarehouseCard name="Plateforme Logistique - Saint-Louis" manager="Omar Sy" items={112} capacity={20} color="green" />
             <div className="bg-white border-2 border-dashed border-[#cbd5e1] rounded-xl flex flex-col items-center justify-center p-12 opacity-50 hover:opacity-100 hover:border-[#005eb8] hover:bg-blue-50/20 transition-all cursor-pointer group">
                <Plus size={48} className="text-[#94a3b8] group-hover:text-[#005eb8] mb-4 transition-transform group-hover:scale-110" />
                <p className="text-[12px] font-bold uppercase text-[#64748b] tracking-[0.2em] text-center group-hover:text-[#0f172a]">Enregistrer un Nouvel Entrepôt</p>
             </div>
          </motion.div>
        )}

        {/* Alertes Stock */}
        {activeTab === 'alertes' && (
          <motion.div
            key="alertes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8 h-full"
          >
            <div className="bg-red-50 border border-red-100 p-10 rounded-xl shadow-sm relative overflow-hidden group flex-1">
               <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/50 rounded-full -mr-48 -mt-48 blur-3xl group-hover:scale-110 transition-transform"></div>
               <div className="flex items-center gap-6 text-[#dc2626] mb-12 relative z-10">
                  <div className="p-5 bg-white border border-red-100 rounded-[2rem] shadow-xl shadow-red-500/10">
                    <AlertTriangle size={48} className="animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-bold text-4xl uppercase tracking-tighter">Seuils Critiques Atteints</h3>
                    <p className="text-[12px] text-[#dc2626] font-bold uppercase tracking-[0.2em] opacity-80 mt-2">Réapprovisionnement suggéré pour maintenir la continuité d'exploitation</p>
                  </div>
               </div>
               
               <div className="space-y-4 relative z-10 max-w-5xl mx-auto">
                  {articles.filter(a => a.qty <= a.min).map((alert, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-white border border-red-100 rounded-2xl hover:border-red-500 transition-all shadow-md group/item">
                      <div className="flex items-center gap-8">
                         <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center text-[#dc2626] border border-red-100 shadow-inner group-hover/item:scale-110 transition-transform">
                            <Package size={32} />
                         </div>
                         <div className="space-y-1">
                           <p className="font-bold text-[#0f172a] text-lg uppercase tracking-tight">{alert.name}</p>
                           <div className="flex items-center gap-4 text-[11px] font-bold text-[#64748b] uppercase tracking-widest">
                              <span className="flex items-center gap-2"><MapPin size={14} /> {alert.family}</span>
                              <span className="w-1 h-1 bg-[#cbd5e1] rounded-full" />
                              <span className="flex items-center gap-2"><Warehouse size={14} /> MAGASIN DKR</span>
                           </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-12">
                         <div className="text-right">
                            <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest mb-1">Stock Reel</p>
                            <p className="font-black text-[#dc2626] text-3xl tracking-tighter">{alert.qty}</p>
                         </div>
                         <div className="text-right border-l border-[#f1f5f9] pl-12">
                            <p className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest mb-1">Seuil Min</p>
                            <p className="font-bold text-[#64748b] text-xl tracking-tight">{alert.min}</p>
                         </div>
                         <button className="px-8 py-4 bg-[#dc2626] hover:bg-red-700 text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-red-500/20 transition-all flex items-center gap-3">
                            <Plus size={18} /> Commander en Urgence
                         </button>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}

        {/* Inventaires */}
        {activeTab === 'inventaires' && (
           <motion.div
            key="inventaires"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#cbd5e1] rounded-xl flex flex-col items-center justify-center p-24 shadow-sm relative overflow-hidden h-full"
           >
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-50"></div>
              <div className="w-28 h-28 bg-[#f8fafc] rounded-[2.5rem] flex items-center justify-center mb-10 shadow-inner border border-[#cbd5e1] relative group">
                 <ClipboardList size={54} className="text-[#005eb8] group-hover:scale-110 transition-transform" />
                 <div className="absolute -bottom-2 -right-2 bg-white border border-blue-100 p-2 rounded-xl shadow-lg">
                    <Activity size={24} className="text-[#005eb8] animate-pulse" />
                 </div>
              </div>
              <h3 className="text-3xl font-bold uppercase tracking-tighter text-[#0f172a]">Campagnes d'Inventaire Tournant</h3>
              <p className="text-[#64748b] max-w-lg text-center mt-6 text-[12px] font-bold uppercase tracking-widest leading-relaxed opacity-70">
                Gérez vos inventaires cycliques ou de fin d'exercice avec validation multi-niveaux. Calculez les écarts de stock et générez les écritures de régularisation comptables automatiquement.
              </p>
              <div className="flex gap-4 mt-12">
                 <button className="px-10 py-5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-[2rem] text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 transition-all flex items-center gap-4 group">
                   <Plus size={22} className="group-hover:rotate-90 transition-transform" />
                   Démarrer un nouvel inventaire
                 </button>
                 <button className="px-10 py-5 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-[2rem] text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-4">
                   <History size={20} />
                   Historique des Campagnes
                 </button>
              </div>
           </motion.div>
        )}

        {activeTab === 'maintenance' && (
          <motion.div key="maintenance" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="h-full">
             <PlantMaintenance />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Item Detail Drawer */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="relative w-full max-w-2xl bg-white border-l border-[#cbd5e1] shadow-2xl h-full flex flex-col overflow-hidden"
            >
               {/* Drawer Header */}
               <div className="p-10 border-b border-[#cbd5e1] flex justify-between items-start bg-[#f8fafc] sticky top-0 z-10">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-blue-100 flex items-center justify-center shadow-xl shadow-blue-500/10 group overflow-hidden">
                       <Package size={54} className="text-[#005eb8] group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <div className={`w-fit px-3 py-1 rounded border text-[9px] font-bold uppercase mb-4 tracking-widest ${
                        selectedItem.color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-200' : 
                        selectedItem.color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-200' : 'bg-orange-50 text-orange-600 border-orange-200'
                      }`}>
                        Statut : {selectedItem.status}
                      </div>
                      <h3 className="text-4xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none">{selectedItem.name}</h3>
                      <p className="text-[12px] text-[#005eb8] font-bold uppercase mt-3 tracking-[0.3em] font-mono">{selectedItem.ref}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="p-3 hover:bg-white border border-transparent hover:border-[#cbd5e1] rounded-2xl transition-all shadow-sm text-[#94a3b8] hover:text-[#0f172a]">
                    <XCircle size={24} />
                  </button>
               </div>

               {/* Drawer Body */}
               <div className="flex-1 overflow-y-auto p-12 space-y-12">
                  <div className="grid grid-cols-2 gap-8">
                     <div className="p-10 bg-[#f8fafc] rounded-3xl border border-[#cbd5e1] text-center shadow-inner group cursor-pointer hover:bg-white transition-all">
                        <p className="text-[10px] font-bold uppercase text-[#64748b] tracking-[0.3em] mb-4">Stock Disponible Total</p>
                        <p className={`text-5xl font-black tracking-tighter ${selectedItem.qty <= selectedItem.min ? 'text-[#dc2626]' : 'text-[#0f172a]'}`}>{selectedItem.qty}</p>
                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase mt-2 tracking-widest">Unités Logistiques</p>
                     </div>
                     <div className="p-10 bg-[#0f172a] rounded-3xl border border-[#0f172a] text-center shadow-xl relative overflow-hidden">
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.3em] mb-4">CUMP (Valeur Unitaire)</p>
                        <p className="text-4xl font-black text-white tracking-tighter">{selectedItem.cump} <span className="text-xs font-bold text-blue-300">F</span></p>
                        <div className="mt-4 flex items-center justify-center gap-2">
                           <TrendingUp size={14} className="text-green-400" />
                           <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">+2.5% Vs M-1</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-12">
                     <InfoSection title="Localisation & Stockage par Zone">
                        <div className="space-y-4">
                           <WarehouseRow name="Magasin Central Dakar (Plateau)" qty="8 unités" color="blue" />
                           <WarehouseRow name="Dépôt Thiès (Zone Industrielle)" qty="4 unités" color="green" />
                        </div>
                     </InfoSection>

                     <InfoSection title="Paramètres de Réapprovisionnement">
                        <div className="grid grid-cols-1 gap-6">
                           <DetailPropRow label="Stock de Sécurité Critique" value="5 unités" icon={<ShieldAlert size={18} />} />
                           <DetailPropRow label="Seuil d'Alerte Commande" value="10 unités" icon={<Clock size={18} />} />
                           <DetailPropRow label="Délai Moyen Fournisseur" value="15 Jours Calendaires" icon={<Boxes size={18} />} />
                        </div>
                     </InfoSection>

                     <div className="flex gap-4">
                        <button className="flex-1 py-4 bg-white border border-[#cbd5e1] rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748b] hover:text-[#005eb8] hover:border-[#005eb8] transition-all shadow-sm flex items-center justify-center gap-3">
                           <Edit3 size={18} /> Modifier l'Article
                        </button>
                        <button className="flex-1 py-4 bg-red-50 border border-red-200 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] text-[#dc2626] hover:bg-[#dc2626] hover:text-white transition-all shadow-sm flex items-center justify-center gap-3">
                           <Trash2 size={18} /> Supprimer
                        </button>
                     </div>
                  </div>
               </div>

               <button 
                onClick={() => setSelectedItem(null)}
                className="mt-auto py-8 bg-[#f8fafc] text-[#64748b] hover:text-[#0f172a] transition-all text-[11px] font-bold uppercase tracking-[0.3em] border-t border-[#cbd5e1] hover:bg-[#f1f5f9]"
              >
                Fermer la Fiche Article
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MouvementCard = ({ title, value, trend, icon, color }: any) => (
  <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 group hover:border-[#005eb8] transition-all cursor-pointer relative overflow-hidden shadow-sm">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${color === 'green' ? 'bg-[#107e3e]' : color === 'red' ? 'bg-[#dc2626]' : 'bg-[#005eb8]'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-6">
       <div>
          <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-[0.2em] leading-none mb-3">{title}</p>
          <h3 className="text-3xl font-bold tracking-tighter text-[#0f172a]">{value}</h3>
       </div>
       <div className={`p-4 rounded-2xl border shadow-inner transition-transform group-hover:scale-110 ${
         color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-100' : color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100' : 'bg-blue-50 text-[#005eb8] border-blue-100'
       }`}>
          {icon}
       </div>
    </div>
    <div className="flex items-center gap-3">
       <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100' : 'bg-green-50 text-[#107e3e] border-green-100'}`}>
          {trend} {trend !== '0%' && 'Vs M-1'}
       </span>
       <div className="flex-1 h-2.5 bg-[#f1f5f9] rounded-full overflow-hidden shadow-inner">
          <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className={`${color === 'red' ? 'bg-[#dc2626]' : 'bg-[#107e3e]'} h-full shadow-lg`} />
       </div>
    </div>
  </div>
);

const WarehouseCard = ({ name, manager, items, capacity, color }: any) => (
  <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 group hover:border-[#005eb8] transition-all cursor-pointer shadow-sm relative overflow-hidden">
     <div className="flex items-start justify-between mb-8">
        <div className={`p-5 rounded-2xl border shadow-inner group-hover:scale-110 transition-transform ${color === 'blue' ? 'bg-blue-50 text-[#005eb8] border-blue-100' : 'bg-green-50 text-[#107e3e] border-green-100'}`}>
           <Warehouse size={32} />
        </div>
        <div className="text-right">
           <p className="text-[10px] font-bold uppercase text-[#94a3b8] tracking-widest mb-1">Occupation</p>
           <p className={`text-2xl font-black tracking-tighter ${capacity > 80 ? 'text-[#dc2626]' : 'text-[#107e3e]'}`}>{capacity}%</p>
        </div>
     </div>
     <h4 className="text-lg font-bold text-[#0f172a] group-hover:text-[#005eb8] transition-colors uppercase tracking-tight leading-tight">{name}</h4>
     <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] mt-3 opacity-70 italic">Manager: {manager}</p>
     
     <div className="mt-8 flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748b] border-t border-[#f1f5f9] pt-4">
        <span className="flex items-center gap-2 text-[#005eb8]"><Boxes size={14} /> {items} Références</span>
        <button className="p-2.5 hover:bg-[#f8fafc] rounded-xl transition-all border border-transparent hover:border-[#cbd5e1]">
           <Settings size={18} className="text-[#94a3b8]" />
        </button>
     </div>
  </div>
);

const WarehouseRow = ({ name, qty, color }: any) => (
  <div className="flex justify-between items-center p-5 bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl hover:bg-white hover:border-[#005eb8] transition-all group cursor-pointer shadow-inner">
     <div className="flex items-center gap-4">
        <MapPin size={18} className={`text-${color === 'blue' ? '[#005eb8]' : '[#107e3e]'} group-hover:scale-110 transition-transform`} />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b] group-hover:text-[#0f172a] transition-colors">{name}</span>
     </div>
     <span className="text-sm font-black text-[#0f172a] tracking-tight">{qty}</span>
  </div>
);

const DetailPropRow = ({ icon, label, value }: any) => (
  <div className="flex items-center justify-between p-4 border-b border-[#f1f5f9] last:border-0 group">
     <div className="flex items-center gap-4">
        <div className="text-[#94a3b8] group-hover:text-[#005eb8] transition-colors">{icon}</div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">{label}</span>
     </div>
     <span className="text-[11px] font-black text-[#0f172a] uppercase tracking-widest">{value}</span>
  </div>
);

const InfoSection = ({ title, children }: any) => (
  <div className="space-y-6">
    <h4 className="text-[11px] font-bold uppercase text-[#005eb8] tracking-[0.3em] mb-6 border-b border-blue-50 pb-3">{title}</h4>
    {children}
  </div>
);

export default InventoryModule;
