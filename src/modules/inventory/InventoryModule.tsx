import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRightLeft, AlertTriangle, ClipboardList, Search, Plus, Filter, Download } from 'lucide-react';

const InventoryModule = () => {
  const [activeTab, setActiveTab] = useState('articles');

  const tabs = [
    { id: 'articles', label: 'Articles en Stock', icon: Package },
    { id: 'mouvements', label: 'Mouvements', icon: ArrowRightLeft },
    { id: 'alertes', label: 'Alertes', icon: AlertTriangle },
    { id: 'inventaires', label: 'Inventaires', icon: ClipboardList },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4">
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
      </div>

      {/* Content based on tab */}
      {activeTab === 'articles' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          {/* Action Bar */}
          <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm transition-colors">
                <Filter size={16} />
                Filtres
              </button>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm transition-colors">
                <Download size={16} />
                Exporter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
                <Plus size={16} />
                Nouvel Article
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700/50">
                <tr>
                  <th className="p-4 font-medium">Réf.</th>
                  <th className="p-4 font-medium">Désignation</th>
                  <th className="p-4 font-medium">Famille</th>
                  <th className="p-4 font-medium text-right">Quantité</th>
                  <th className="p-4 font-medium text-right">CUMP (€)</th>
                  <th className="p-4 font-medium text-right">Valeur Totale (€)</th>
                  <th className="p-4 font-medium text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {[
                  { ref: 'ART-001', name: 'Ordinateur Portable Pro X1', family: 'Informatique', qty: 45, cump: '850.00', value: '38,250.00', status: 'En stock', color: 'emerald' },
                  { ref: 'ART-002', name: 'Imprimante Laser M500', family: 'Informatique', qty: 8, cump: '220.00', value: '1,760.00', status: 'Alerte', color: 'amber' },
                  { ref: 'ART-003', name: 'Papier A4 (Carton)', family: 'Fournitures', qty: 120, cump: '15.50', value: '1,860.00', status: 'En stock', color: 'emerald' },
                  { ref: 'ART-004', name: 'Cartouche Toner Noire', family: 'Consommables', qty: 0, cump: '45.00', value: '0.00', status: 'Rupture', color: 'rose' },
                  { ref: 'ART-005', name: 'Bureau Ergonomique', family: 'Mobilier', qty: 12, cump: '350.00', value: '4,200.00', status: 'En stock', color: 'emerald' },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-medium text-slate-300">{item.ref}</td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4 text-slate-400">{item.family}</td>
                    <td className="p-4 text-right">{item.qty}</td>
                    <td className="p-4 text-right">{item.cump}</td>
                    <td className="p-4 text-right font-medium">{item.value}</td>
                    <td className="p-4">
                      <div className={`mx-auto w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20`}>
                        {item.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Mouvements de stock */}
      {activeTab === 'mouvements' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            <div className="card">
              <p className="text-sm text-slate-400">Entrées (30j)</p>
              <h3 className="text-2xl font-bold mt-2 text-emerald-400">+145</h3>
              <p className="text-xs text-slate-500 mt-1">Volume de réception</p>
            </div>
            <div className="card">
              <p className="text-sm text-slate-400">Sorties (30j)</p>
              <h3 className="text-2xl font-bold mt-2 text-rose-400">-89</h3>
              <p className="text-xs text-slate-500 mt-1">Volume d'expédition/consommation</p>
            </div>
            <div className="card">
              <p className="text-sm text-slate-400">Transferts Internes</p>
              <h3 className="text-2xl font-bold mt-2 text-indigo-400">12</h3>
              <p className="text-xs text-slate-500 mt-1">Inter-dépôts</p>
            </div>
          </div>
          
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
             <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
                <h3 className="font-semibold">Historique des mouvements</h3>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-lg text-sm transition-colors">
                  <ArrowRightLeft size={14} />
                  Saisir un mouvement
                </button>
             </div>
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700/50">
                  <tr>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Article</th>
                    <th className="p-4 font-medium text-right">Quantité</th>
                    <th className="p-4 font-medium">Document Réf.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {[
                    { date: '12 Oct 2024', type: 'Entrée (Achat)', typeColor: 'emerald', item: 'Ordinateur Portable Pro X1', qty: '+15', doc: 'BL-2024-105' },
                    { date: '11 Oct 2024', type: 'Sortie (Vente)', typeColor: 'rose', item: 'Papier A4 (Carton)', qty: '-5', doc: 'BLC-2024-892' },
                    { date: '10 Oct 2024', type: 'Transfert', typeColor: 'indigo', item: 'Bureau Ergonomique', qty: '2', doc: 'TR-045' },
                  ].map((mov, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4">{mov.date}</td>
                      <td className="p-4">
                         <span className={`text-${mov.typeColor}-400 font-medium`}>{mov.type}</span>
                      </td>
                      <td className="p-4">{mov.item}</td>
                      <td className={`p-4 text-right font-bold text-${mov.typeColor}-400`}>{mov.qty}</td>
                      <td className="p-4 text-slate-400">{mov.doc}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </motion.div>
      )}

      {/* Alertes de stock */}
      {activeTab === 'alertes' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="card border-rose-500/30 bg-rose-500/5">
             <div className="flex items-center gap-3 text-rose-400 mb-4">
                <AlertTriangle size={24} />
                <h3 className="font-bold text-lg">Articles nécessitant une attention</h3>
             </div>
             
             <div className="space-y-3">
                {[
                  { item: 'Cartouche Toner Noire', status: 'Rupture de stock', qty: 0, min: 5 },
                  { item: 'Imprimante Laser M500', status: 'Seuil critique', qty: 8, min: 10 },
                  { item: 'Câble HDMI 2m', status: 'Sous le seuil d\'alerte', qty: 15, min: 20 },
                ].map((alert, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                    <div>
                      <p className="font-medium">{alert.item}</p>
                      <p className="text-sm text-rose-400">{alert.status}</p>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="text-right">
                          <p className="text-xs text-slate-500">Stock Actuel</p>
                          <p className="font-bold text-lg">{alert.qty}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-xs text-slate-500">Stock Minimum</p>
                          <p className="font-medium text-slate-400">{alert.min}</p>
                       </div>
                       <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm transition-colors">
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card flex flex-col items-center justify-center h-96 border-dashed"
         >
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <ClipboardList size={32} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Campagnes d'Inventaire</h3>
            <p className="text-slate-400 max-w-md text-center mb-6">
              Planifiez et exécutez vos inventaires tournants ou annuels. La réconciliation générera automatiquement les écritures de régularisation.
            </p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
              Démarrer un nouvel inventaire
            </button>
         </motion.div>
      )}

    </div>
  );
};

export default InventoryModule;
