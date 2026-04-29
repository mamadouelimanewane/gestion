import React, { useState } from 'react';
import { Search, Filter, Printer, Download, Clock } from 'lucide-react';

const BalanceAgee = () => {
  const [data] = useState([
    { compte: '4110001', tiers: 'CLIENT ALPHA', nonEchu: 1180000, retard30: 0, retard60: 450000, retard90: 0, total: 1630000 },
    { compte: '4110002', tiers: 'CLIENT BETA', nonEchu: 850000, retard30: 250000, retard60: 0, retard90: 125000, total: 1225000 },
    { compte: '4110005', tiers: 'ETABLISSEMENTS DIOP', nonEchu: 3200000, retard30: 0, retard60: 0, retard90: 0, total: 3200000 },
    { compte: '4110009', tiers: 'SARL SUNU', nonEchu: 0, retard30: 0, retard60: 0, retard90: 125000, total: 125000 },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Balance Âgée Clients</h3>
            <p className="text-sm text-slate-400">Analyse de l'ancienneté des créances par tiers</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <Printer size={16} /> Imprimer
          </button>
          <button className="btn btn-primary flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <Download size={16} /> Exporter Excel
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300">N° Compte / Tiers</th>
              <th className="p-4 font-medium text-slate-300 text-right">Non Échu</th>
              <th className="p-4 font-medium text-slate-300 text-right">Retard &lt; 30j</th>
              <th className="p-4 font-medium text-slate-300 text-right">Retard 30-60j</th>
              <th className="p-4 font-medium text-slate-300 text-right">Retard &gt; 90j</th>
              <th className="p-4 font-medium text-slate-300 text-right">Solde Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-200">{item.tiers}</span>
                    <span className="text-xs text-slate-500 font-mono">{item.compte}</span>
                  </div>
                </td>
                <td className="p-4 text-right text-slate-300">{item.nonEchu.toLocaleString()}</td>
                <td className={`p-4 text-right font-medium ${item.retard30 > 0 ? 'text-amber-400' : 'text-slate-500'}`}>{item.retard30.toLocaleString()}</td>
                <td className={`p-4 text-right font-medium ${item.retard60 > 0 ? 'text-rose-400' : 'text-slate-500'}`}>{item.retard60.toLocaleString()}</td>
                <td className={`p-4 text-right font-bold ${item.retard90 > 0 ? 'text-rose-600' : 'text-slate-500'}`}>{item.retard90.toLocaleString()}</td>
                <td className="p-4 text-right font-bold text-indigo-400">{item.total.toLocaleString()} F</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-800/90 font-bold sticky bottom-0">
            <tr>
              <td className="p-4 text-slate-300">TOTAL GÉNÉRAL</td>
              <td className="p-4 text-right text-slate-200">5 230 000</td>
              <td className="p-4 text-right text-amber-400">250 000</td>
              <td className="p-4 text-right text-rose-400">450 000</td>
              <td className="p-4 text-right text-rose-600">250 000</td>
              <td className="p-4 text-right text-indigo-400">6 180 000 F</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BalanceAgee;
