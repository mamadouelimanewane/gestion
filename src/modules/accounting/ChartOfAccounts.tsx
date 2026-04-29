import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Filter, Download, ChevronRight, 
  ChevronDown, Folder, FileText, Info, MoreVertical 
} from 'lucide-react';

const ChartOfAccounts = () => {
  const [expandedClasses, setExpandedClasses] = useState<string[]>(['1', '2', '4', '5', '6', '7']);
  const [searchTerm, setSearchTerm] = useState('');

  const accountStructure = [
    { 
      id: '1', label: 'Classe 1 : Comptes de ressources durables', 
      accounts: [
        { code: '101', name: 'Capital social', type: 'Capitaux', balance: '100 000 000 F' },
        { code: '131', name: 'Subventions d\'investissement', type: 'Capitaux', balance: '12 500 000 F' },
      ]
    },
    { 
      id: '2', label: 'Classe 2 : Comptes d\'actif immobilisé', 
      accounts: [
        { code: '211', name: 'Terrains', type: 'Immos', balance: '50 000 000 F' },
        { code: '241', name: 'Matériel de transport', type: 'Immos', balance: '25 000 000 F' },
      ]
    },
    { 
      id: '4', label: 'Classe 4 : Comptes de tiers', 
      accounts: [
        { code: '401', name: 'Fournisseurs', type: 'Dettes', balance: '12 450 000 F' },
        { code: '411', name: 'Clients', type: 'Créances', balance: '45 820 000 F' },
      ]
    },
    { 
      id: '5', label: 'Classe 5 : Comptes de trésorerie', 
      accounts: [
        { code: '512', name: 'Banque (SGB)', type: 'Trésorerie', balance: '333 730 000 F' },
        { code: '521', name: 'Caisse centrale', type: 'Trésorerie', balance: '1 250 000 F' },
      ]
    },
    { 
      id: '6', label: 'Classe 6 : Comptes de charges', 
      accounts: [
        { code: '601', name: 'Achats de matières premières', type: 'Charges', balance: '25 000 000 F' },
        { code: '611', name: 'Transports', type: 'Charges', balance: '850 000 F' },
      ]
    },
    { 
      id: '7', label: 'Classe 7 : Comptes de produits', 
      accounts: [
        { code: '701', name: 'Ventes de produits finis', type: 'Produits', balance: '458 230 000 F' },
        { code: '707', name: 'Ventes de marchandises', type: 'Produits', balance: '124 500 000 F' },
      ]
    },
  ];

  const toggleClass = (id: string) => {
    setExpandedClasses(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl w-96 shadow-inner focus-within:border-indigo-500 transition-all">
          <Search size={18} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher par code ou libellé..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-700 transition-all">
            <Filter size={16} /> Filtrer
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20">
            <Plus size={16} /> Nouveau Compte
          </button>
        </div>
      </div>

      {/* Hierarchical View */}
      <div className="bg-slate-800/20 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
        <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700/50 flex justify-between items-center">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Structure du Plan Comptable (SYSCOHADA)</h3>
           <div className="flex gap-4 text-[10px] font-bold text-slate-500">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Actif</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Passif</span>
           </div>
        </div>

        <div className="p-2">
           {accountStructure.map((group) => (
              <div key={group.id} className="mb-1">
                 <button 
                   onClick={() => toggleClass(group.id)}
                   className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/30 rounded-xl transition-all group"
                 >
                    <div className="text-slate-500 group-hover:text-indigo-400 transition-colors">
                       {expandedClasses.includes(group.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                    <Folder size={18} className="text-amber-500/70" />
                    <span className="text-sm font-black text-slate-200 uppercase tracking-wide">{group.label}</span>
                    <div className="ml-auto flex items-center gap-4">
                       <span className="text-[10px] font-bold text-slate-500">{group.accounts.length} comptes</span>
                       <div className="w-px h-4 bg-slate-700"></div>
                       <MoreVertical size={16} className="text-slate-600" />
                    </div>
                 </button>

                 <AnimatePresence>
                    {expandedClasses.includes(group.id) && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="overflow-hidden ml-12"
                       >
                          <div className="py-2 space-y-1 pr-4">
                             {group.accounts.map((acc) => (
                                <div key={acc.code} className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-500/5 border border-transparent hover:border-indigo-500/20 transition-all group cursor-pointer">
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 font-mono text-xs font-black text-indigo-400">{acc.code}</div>
                                      <div className="flex flex-col">
                                         <span className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">{acc.name}</span>
                                         <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{acc.type}</span>
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-6">
                                      <div className="text-right">
                                         <p className="text-xs font-black text-white">{acc.balance}</p>
                                         <p className="text-[9px] text-slate-600 uppercase font-bold">Solde actuel</p>
                                      </div>
                                      <button className="p-2 text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                                         <Info size={16} />
                                      </button>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center px-4">
         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dernière mise à jour : 29/04/2024 • Base SYSCOHADA Révisée</p>
         <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-[10px] font-black uppercase tracking-widest">
            <Download size={14} /> Télécharger le plan complet (PDF)
         </button>
      </div>
    </div>
  );
};

export default ChartOfAccounts;
