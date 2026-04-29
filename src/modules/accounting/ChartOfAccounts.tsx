import React from 'react';
import { Search, Plus, Filter, Download } from 'lucide-react';

const ChartOfAccounts = () => {
  const accounts = [
    { code: '101', name: 'Capital social', type: 'Capitaux', balance: '100,000.00 €' },
    { code: '211', name: 'Terrains', type: 'Immobilisations', balance: '50,000.00 €' },
    { code: '401', name: 'Fournisseurs', type: 'Dettes', balance: '12,450.00 €' },
    { code: '411', name: 'Clients', type: 'Créances', balance: '45,820.00 €' },
    { code: '512', name: 'Banque', type: 'Trésorerie', balance: '333,730.00 €' },
    { code: '601', name: 'Achats de matières premières', type: 'Charges', balance: '25,000.00 €' },
    { code: '701', name: 'Ventes de produits finis', type: 'Produits', balance: '458,230.00 €' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 bg-slate-800/30 px-4 py-2 rounded-xl border border-slate-700/30 w-72">
          <Search size={16} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher un compte..." 
            className="bg-transparent border-none outline-none text-xs w-full"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium border border-slate-700 transition-colors">
            <Filter size={14} /> Filtrer
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium border border-slate-700 transition-colors">
            <Download size={14} /> Exporter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-500/20">
            <Plus size={14} /> Nouveau Compte
          </button>
        </div>
      </div>

      <div className="card overflow-hidden !p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700/50">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Code</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Libellé</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Type</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Solde</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {accounts.map((acc) => (
              <tr key={acc.code} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-indigo-400 font-bold">{acc.code}</td>
                <td className="px-6 py-4 font-medium">{acc.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md bg-slate-800 text-[10px] font-bold uppercase border border-slate-700">
                    {acc.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold">{acc.balance}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-slate-500 hover:text-white transition-colors p-1">Modifier</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChartOfAccounts;
