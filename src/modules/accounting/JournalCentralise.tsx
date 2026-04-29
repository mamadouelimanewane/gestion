import React, { useState } from 'react';
import { Search, Filter, Download, List } from 'lucide-react';

const JournalCentralise = () => {
  const [data] = useState([
    { mois: 'Janvier 2024', journal: 'Achats', debit: 4500000, credit: 4500000 },
    { mois: 'Janvier 2024', journal: 'Ventes', debit: 12800000, credit: 12800000 },
    { mois: 'Janvier 2024', journal: 'Banque SGBS', debit: 8400000, credit: 8400000 },
    { mois: 'Février 2024', journal: 'Achats', debit: 3200000, credit: 3200000 },
    { mois: 'Février 2024', journal: 'Ventes', debit: 15600000, credit: 15600000 },
    { mois: 'Février 2024', journal: 'Banque SGBS', debit: 9200000, credit: 9200000 },
  ]);

  const totalDebit = data.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = data.reduce((sum, item) => sum + item.credit, 0);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <List size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Journal Centralisé</h3>
            <p className="text-sm text-slate-400">Récapitulatif mensuel par code journal</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <Filter size={16} /> Période
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Download size={16} /> Exporter PDF
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300">Période (Mois)</th>
              <th className="p-4 font-medium text-slate-300">Journal</th>
              <th className="p-4 font-medium text-slate-300 text-right">Total Débit</th>
              <th className="p-4 font-medium text-slate-300 text-right">Total Crédit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-slate-300">{item.mois}</td>
                <td className="p-4 font-medium text-slate-200">{item.journal}</td>
                <td className="p-4 text-right font-medium text-emerald-400">
                  {item.debit.toLocaleString()} F CFA
                </td>
                <td className="p-4 text-right font-medium text-emerald-400">
                  {item.credit.toLocaleString()} F CFA
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-800/90 font-bold sticky bottom-0">
            <tr>
              <td colSpan={2} className="p-4 text-right text-slate-300 uppercase">TOTAUX GÉNÉRAUX</td>
              <td className="p-4 text-right text-indigo-400">{totalDebit.toLocaleString()} F CFA</td>
              <td className="p-4 text-right text-indigo-400">{totalCredit.toLocaleString()} F CFA</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default JournalCentralise;
