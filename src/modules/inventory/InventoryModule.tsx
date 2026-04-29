import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, ArrowRightLeft, AlertTriangle, ClipboardList, 
  Search, Plus, Filter, Download, ArrowUpRight, 
  ArrowDownRight, Barcode, Warehouse, Eye,
  ChevronRight, History, Settings, Trash2, Edit3, Wrench
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

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-bold text-slate-300 hover:text-white transition-all">
                <Barcode size={18} />
                Scanner
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
                <Plus size={16} />
                Nouvel Article
             </button>
          </div>
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
            className="flex flex-col gap-4"
          >
            {/* Filter Bar */}
            <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="text"
                    placeholder="Rechercher par référence, désignation..."
                    className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-all w-80"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-white">
                  <Filter size={16} />
                  Trier par Famille
                </button>
              </div>
              <div className="flex gap-2">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-emerald-400">Sync. Entrepôts OK</span>
                 </div>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-slate-500 border-b border-slate-700/50 font-bold uppercase text-[10px] tracking-widest">
                  <tr>
                    <th className="p-4">Référence</th>
                    <th className="p-4">Désignation</th>
                    <th className="p-4">Famille</th>
                    <th className="p-4 text-right">Stock Total</th>
                    <th className="p-4 text-right">CUMP</th>
                    <th className="p-4 text-right">Valeur Stock</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {[
                    { ref: 'ART-GEN-001', name: 'Groupe Électrogène 50KVA', family: 'Matériel Lourd', qty: 12, cump: '4 500 000 F', value: '54 000 000 F', status: 'En stock', color: 'emerald' },
                    { ref: 'ART-INF-089', name: 'Serveur Dell PowerEdge R740', family: 'Informatique', qty: 3, cump: '2 850 000 F', value: '8 550 000 F', status: 'Alerte', color: 'amber' },
                    { ref: 'ART-CONS-45', name: 'Câble Réseau Cat6 (305m)', family: 'Consommables', qty: 45, cump: '35 000 F', value: '1 575 000 F', status: 'En stock', color: 'emerald' },
                    { ref: 'ART-CONS-12', name: 'Huile Moteur 5L (Synthétique)', family: 'Maintenance', qty: 0, cump: '25 000 F', value: '0 F', status: 'Rupture', color: 'rose' },
                    { ref: 'ART-OFF-001', name: 'Fauteuil Bureau Ergonomique', family: 'Mobilier', qty: 124, cump: '85 000 F', value: '10 540 000 F', status: 'En stock', color: 'emerald' },
                  ].map((item, i) => (
                    <tr 
                      key={i} 
                      className="group hover:bg-indigo-500/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <td className="p-4 font-mono text-indigo-400 text-xs font-bold">{item.ref}</td>
                      <td className="p-4">
                         <div className="flex flex-col">
                            <span className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{item.name}</span>
                            <span className="text-[10px] text-slate-500">Dernier mouvement: 12/10/2024</span>
                         </div>
                      </td>
                      <td className="p-4">
                         <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            {item.family}
                         </span>
                      </td>
                      <td className="p-4 text-right font-black text-slate-200">{item.qty} unités</td>
                      <td className="p-4 text-right text-slate-400 font-medium">{item.cump}</td>
                      <td className="p-4 text-right font-black text-white">{item.value}</td>
                      <td className="p-4 text-center">
                        <div className={`mx-auto w-fit px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20`}>
                          {item.status}
                        </div>
                      </td>
                      <td className="p-4">
                         <button className="p-2 text-slate-600 group-hover:text-indigo-400 transition-all">
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

        {/* Mouvements */}
        {activeTab === 'mouvements' && (
          <motion.div
            key="mouvements"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <MouvementCard title="Entrées Magasin" value="125" trend="+12%" icon={<ArrowDownRight size={24} />} color="emerald" />
               <MouvementCard title="Sorties / Livraisons" value="84" trend="+5%" icon={<ArrowUpRight size={24} />} color="rose" />
               <MouvementCard title="Transferts Inter-Dépôts" value="12" trend="0%" icon={<ArrowRightLeft size={24} />} color="indigo" />
            </div>

            <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl">
               <div className="p-5 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/50">
                  <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2">
                    <History size={18} className="text-indigo-400" />
                    Journal des Flux de Stock
                  </h3>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                    Saisir un Bon de Sortie
                  </button>
               </div>
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-800/80 text-slate-500 border-b border-slate-700/50 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Date & Heure</th>
                      <th className="p-4">Nature du flux</th>
                      <th className="p-4">Article</th>
                      <th className="p-4 text-center">Entrepôt</th>
                      <th className="p-4 text-right">Quantité</th>
                      <th className="p-4">Réf. Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {[
                      { date: '12/10 14:30', type: 'Entrée (Achat)', color: 'emerald', item: 'Groupe Électrogène 50KVA', wh: 'MAGASIN DAKAR', qty: '+5', doc: 'BE-2024-045' },
                      { date: '12/10 11:15', type: 'Sortie (Chantier)', color: 'rose', item: 'Câble Réseau Cat6', wh: 'DEPOT THIES', qty: '-12', doc: 'BS-2024-892' },
                      { date: '11/10 16:45', type: 'Transfert Interne', color: 'indigo', item: 'Serveur Dell R740', wh: 'DAKAR → SAINT-LOUIS', qty: '1', doc: 'TR-102' },
                    ].map((m, i) => (
                      <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-4 text-slate-400 font-mono text-xs">{m.date}</td>
                        <td className="p-4">
                           <div className={`w-fit px-2 py-0.5 rounded bg-${m.color}-500/10 text-${m.color}-400 text-[10px] font-black uppercase border border-${m.color}-500/20`}>
                              {m.type}
                           </div>
                        </td>
                        <td className="p-4 font-bold text-slate-200">{m.item}</td>
                        <td className="p-4 text-center">
                           <span className="text-[10px] font-bold text-slate-500">{m.wh}</span>
                        </td>
                        <td className={`p-4 text-right font-black text-${m.color}-400`}>{m.qty}</td>
                        <td className="p-4 text-indigo-400 font-mono text-xs">{m.doc}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </motion.div>
        )}

        {/* Entrepôts */}
        {activeTab === 'depots' && (
          <motion.div
            key="depots"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
             <WarehouseCard name="Magasin Central - Dakar" manager="Amadou Diop" items={850} capacity={85} />
             <WarehouseCard name="Dépôt Régional - Thiès" manager="Fatou Fall" items={230} capacity={45} />
             <WarehouseCard name="Plateforme - Saint-Louis" manager="Omar Sy" items={112} capacity={20} />
             <div className="card border-dashed flex flex-col items-center justify-center p-8 opacity-50 hover:opacity-100 transition-opacity">
                <Plus size={32} className="text-slate-600 mb-2" />
                <p className="text-xs font-black uppercase text-slate-500 tracking-widest">Ajouter un Dépôt</p>
             </div>
          </motion.div>
        )}

        {/* Alertes Stock */}
        {activeTab === 'alertes' && (
          <motion.div
            key="alertes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="card border-rose-500/30 bg-rose-500/5">
               <div className="flex items-center gap-3 text-rose-400 mb-6">
                  <div className="p-3 bg-rose-500/10 rounded-2xl">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">Seuils Critiques Atteints</h3>
                    <p className="text-xs text-rose-500/70 font-medium">Réapprovisionnement suggéré pour maintenir le flux</p>
                  </div>
               </div>
               
               <div className="space-y-3">
                  {[
                    { item: 'Huile Moteur 5L (Synthétique)', wh: 'Magasin Dakar', qty: 0, min: 5, status: 'Rupture' },
                    { item: 'Serveur Dell PowerEdge R740', wh: 'Saint-Louis', qty: 3, min: 10, status: 'Critique' },
                    { item: 'Câble Réseau Cat6 (305m)', wh: 'Thiès', qty: 15, min: 50, status: 'Alerte' },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-rose-500/30 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-rose-400 shadow-inner">
                            <Package size={20} />
                         </div>
                         <div>
                           <p className="font-bold text-slate-100 text-sm">{alert.item}</p>
                           <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{alert.wh}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-8">
                         <div className="text-right">
                            <p className="text-[10px] text-slate-500 font-bold uppercase">Stock</p>
                            <p className="font-black text-rose-400 text-lg leading-none">{alert.qty}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] text-slate-500 font-bold uppercase">Min</p>
                            <p className="font-bold text-slate-400">{alert.min}</p>
                         </div>
                         <button className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-600/20 transition-all">
                            Commander
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card flex flex-col items-center justify-center h-96 border-dashed"
           >
              <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-slate-700">
                 <ClipboardList size={32} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-[0.1em]">Campagnes d'Inventaire</h3>
              <p className="text-slate-500 max-w-sm text-center mt-3 text-sm font-medium">
                Gerez vos inventaires tournants ou de fin d'exercice. Calculez les ecarts et generez les ecritures de regularisation auto.
              </p>
              <button className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20 transition-all">
                Démarrer un nouvel inventaire
              </button>
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
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="relative w-full max-w-lg bg-slate-900 border-l border-slate-700 shadow-2xl h-full p-8 flex flex-col overflow-y-auto"
            >
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-24 h-24 rounded-3xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center mb-6 shadow-2xl">
                  <Package size={48} className="text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-white">{selectedItem.name}</h3>
                <p className="text-indigo-400 font-mono text-sm mt-1">{selectedItem.ref}</p>
                
                <div className="flex gap-2 mt-6">
                  <span className="px-4 py-1 bg-slate-800 border border-slate-700 rounded-full text-[10px] font-black uppercase tracking-[0.1em] text-slate-300">
                    {selectedItem.family}
                  </span>
                  <span className={`px-4 py-1 bg-${selectedItem.color}-500/10 border border-${selectedItem.color}-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.1em] text-${selectedItem.color}-400`}>
                    {selectedItem.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-center">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Stock Disponible</p>
                    <p className="text-2xl font-black text-white">{selectedItem.qty}</p>
                 </div>
                 <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-center">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">CUMP</p>
                    <p className="text-2xl font-black text-indigo-400">{selectedItem.cump.split(' ')[0]} <span className="text-xs font-bold text-slate-500">F</span></p>
                 </div>
              </div>

              <div className="space-y-8">
                 <InfoSection title="Localisation du Stock">
                    <whRow name="Magasin Dakar" qty="8 unités" />
                    <whRow name="Dépôt Thiès" qty="4 unités" />
                 </InfoSection>

                 <InfoSection title="Paramètres d'Appro">
                    <PropRow label="Stock de Sécurité" value="5 unités" />
                    <PropRow label="Stock Alerte" value="10 unités" />
                    <PropRow label="Délai Fournisseur" value="15 jours" />
                 </InfoSection>

                 <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                       <Edit3 size={14} className="inline mr-2" /> Éditer
                    </button>
                    <button className="flex-1 py-3 bg-rose-600/10 border border-rose-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-600 hover:text-white transition-all">
                       <Trash2 size={14} className="inline mr-2" /> Supprimer
                    </button>
                 </div>
              </div>

              <button 
                onClick={() => setSelectedItem(null)}
                className="mt-12 py-4 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em] border-t border-slate-800/50"
              >
                Fermer la fiche
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MouvementCard = ({ title, value, trend, icon, color }: any) => (
  <div className="card">
    <div className="flex justify-between items-start mb-4">
       <div>
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{title}</p>
          <h3 className="text-2xl font-black mt-1 text-white">{value}</h3>
       </div>
       <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400`}>
          {icon}
       </div>
    </div>
    <div className="flex items-center gap-2">
       <span className={`text-[10px] font-black ${color === 'rose' ? 'text-rose-400' : 'text-emerald-400'}`}>
          {trend} {trend !== '0%' && 'vs M-1'}
       </span>
       <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className={`bg-${color}-500 h-full`} style={{ width: '65%' }} />
       </div>
    </div>
  </div>
);

const WarehouseCard = ({ name, manager, items, capacity }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer">
     <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform">
           <Warehouse size={24} />
        </div>
        <div className="text-right">
           <p className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">Taux d'occupation</p>
           <p className={`text-sm font-black ${capacity > 80 ? 'text-rose-400' : 'text-emerald-400'}`}>{capacity}%</p>
        </div>
     </div>
     <h4 className="font-black text-slate-100 group-hover:text-indigo-400 transition-colors">{name}</h4>
     <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Gérant: {manager}</p>
     
     <div className="mt-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
        <span>{items} Références</span>
        <button className="p-2 hover:bg-slate-700 rounded-lg">
           <Settings size={14} />
        </button>
     </div>
  </div>
);

const whRow = ({ name, qty }: any) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
     <span className="text-xs text-slate-300 font-medium">{name}</span>
     <span className="text-xs font-black text-white">{qty}</span>
  </div>
);

const PropRow = ({ label, value }: any) => (
  <div className="flex justify-between items-center py-1">
     <span className="text-[11px] text-slate-500 font-medium">{label}</span>
     <span className="text-[11px] font-bold text-slate-200">{value}</span>
  </div>
);

const InfoSection = ({ title, children }: any) => (
  <div className="space-y-3">
    <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] mb-4 border-b border-indigo-500/10 pb-2">{title}</h4>
    {children}
  </div>
);

export default InventoryModule;
