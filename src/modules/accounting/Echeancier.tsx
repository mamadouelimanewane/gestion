import React, { useState } from 'react';
import { Search, Filter, Calendar, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';

const Echeancier = () => {
  const [echeances] = useState([
    { id: 1, date: '05/12/2024', tiers: 'FOURNISSEUR TECH', piece: 'FAC-889', montant: 850000, statut: 'À payer' },
    { id: 2, date: '10/12/2024', tiers: 'CLIENT ALPHA', piece: 'FAC-4501', montant: 1180000, statut: 'À encaisser' },
    { id: 3, date: '15/12/2024', tiers: 'LOYER BUREAU', piece: 'LOY-DEC', montant: 450000, statut: 'À payer' },
    { id: 4, date: '20/12/2024', tiers: 'SONATEL', piece: 'TEL-88', montant: 85000, statut: 'À payer' },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Échéancier Financier</h3>
            <p className="text-sm text-slate-400">Prévisions de trésorerie (Encaissements / Décaissements)</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <Filter size={16} /> Par semaine
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <DollarSign size={16} /> Planifier règlements
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl">
          <p className="text-xs font-bold text-emerald-500 uppercase">Encaissements prévus</p>
          <p className="text-2xl font-black text-white mt-2">1 180 000 F</p>
        </div>
        <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl">
          <p className="text-xs font-bold text-rose-500 uppercase">Décaissements prévus</p>
          <p className="text-2xl font-black text-white mt-2">1 385 000 F</p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-2xl">
          <p className="text-xs font-bold text-indigo-500 uppercase">Solde Prévisionnel</p>
          <p className="text-2xl font-black text-white mt-2">-205 000 F</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300">Date d'échéance</th>
              <th className="p-4 font-medium text-slate-300">Tiers / Bénéficiaire</th>
              <th className="p-4 font-medium text-slate-300">Référence</th>
              <th className="p-4 font-medium text-slate-300 text-right">Montant</th>
              <th className="p-4 font-medium text-slate-300 text-center">Type</th>
              <th className="p-4 font-medium text-slate-300 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {echeances.map((e) => (
              <tr key={e.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${e.statut === 'À encaisser' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    <span className="font-bold text-slate-200">{e.date}</span>
                  </div>
                </td>
                <td className="p-4 font-medium text-slate-300">{e.tiers}</td>
                <td className="p-4 font-mono text-slate-500 text-xs">{e.piece}</td>
                <td className={`p-4 text-right font-bold ${e.statut === 'À encaisser' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {e.montant.toLocaleString()} F
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    e.statut === 'À encaisser' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {e.statut}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-slate-700 rounded-lg transition-all">
                    <CheckCircle2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Echeancier;
