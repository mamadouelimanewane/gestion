import React, { useState } from 'react';
import { Search, Link as LinkIcon, Filter, CheckCircle2 } from 'lucide-react';

const InterrogationLettrage = () => {
  const [ecritures] = useState([
    { date: '12/10/2024', journal: 'VTE', piece: 'FAC-4501', compte: '4110001', tiers: 'CLIENT ALPHA', libelle: 'Facture Vente N° 4501', debit: 1180000, credit: 0, lettre: 'A' },
    { date: '25/10/2024', journal: 'BQ1', piece: 'VIR-102', compte: '4110001', tiers: 'CLIENT ALPHA', libelle: 'Virement Client Alpha', debit: 0, credit: 1180000, lettre: 'A' },
    { date: '05/11/2024', journal: 'VTE', piece: 'FAC-4588', compte: '4110001', tiers: 'CLIENT ALPHA', libelle: 'Facture Vente N° 4588', debit: 450000, credit: 0, lettre: '' },
    { date: '10/11/2024', journal: 'ACH', piece: 'FAC-F22', compte: '4010001', tiers: 'FOURNISSEUR TECH', libelle: 'Achat Matériel Info', debit: 0, credit: 850000, lettre: '' },
    { date: '15/11/2024', journal: 'BQ1', piece: 'CHQ-885', compte: '4010001', tiers: 'FOURNISSEUR TECH', libelle: 'Chèque Fournisseur Tech', debit: 400000, credit: 0, lettre: '' },
  ]);

  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (idx: number) => {
    setSelected(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const selectedDebit = selected.reduce((sum, idx) => sum + ecritures[idx].debit, 0);
  const selectedCredit = selected.reduce((sum, idx) => sum + ecritures[idx].credit, 0);
  const soldeDiff = Math.abs(selectedDebit - selectedCredit);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <div className="relative w-64">
            <input type="text" placeholder="Compte de tiers (ex: 4110001)" className="input w-full pl-10" />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="btn btn-secondary flex items-center gap-2">
            <Filter size={16} /> Non lettrées
          </button>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
          <div className="text-sm">
            <span className="text-slate-400">Débit sélec. : </span>
            <span className="font-medium text-emerald-400">{selectedDebit.toLocaleString()}</span>
          </div>
          <div className="text-sm">
            <span className="text-slate-400">Crédit sélec. : </span>
            <span className="font-medium text-rose-400">{selectedCredit.toLocaleString()}</span>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="text-sm">
            <span className="text-slate-400">Écart : </span>
            <span className={`font-bold ${soldeDiff === 0 && selected.length > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {soldeDiff.toLocaleString()}
            </span>
          </div>
          <button 
            disabled={soldeDiff !== 0 || selected.length === 0}
            className={`btn flex items-center gap-2 ml-2 ${soldeDiff === 0 && selected.length > 0 ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
          >
            <LinkIcon size={16} /> Lettrer
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 w-12"></th>
              <th className="p-4 font-medium text-slate-300">Lettrage</th>
              <th className="p-4 font-medium text-slate-300">Date</th>
              <th className="p-4 font-medium text-slate-300">JNL</th>
              <th className="p-4 font-medium text-slate-300">Pièce</th>
              <th className="p-4 font-medium text-slate-300">Compte Tiers</th>
              <th className="p-4 font-medium text-slate-300">Libellé de l'écriture</th>
              <th className="p-4 font-medium text-slate-300 text-right">Débit</th>
              <th className="p-4 font-medium text-slate-300 text-right">Crédit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {ecritures.map((e, idx) => (
              <tr key={idx} 
                  onClick={() => !e.lettre && toggleSelect(idx)}
                  className={`transition-colors ${e.lettre ? 'bg-slate-800/20 opacity-60' : selected.includes(idx) ? 'bg-indigo-900/30' : 'hover:bg-slate-800/40 cursor-pointer'}`}>
                <td className="p-4">
                  {!e.lettre && (
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selected.includes(idx) ? 'bg-indigo-500 border-indigo-500' : 'border-slate-500'}`}>
                      {selected.includes(idx) && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                  )}
                </td>
                <td className="p-4 font-bold text-emerald-400">{e.lettre}</td>
                <td className="p-4 text-slate-300">{e.date}</td>
                <td className="p-4 font-medium text-slate-400">{e.journal}</td>
                <td className="p-4 font-mono text-indigo-300">{e.piece}</td>
                <td className="p-4 font-medium text-slate-300">{e.compte}</td>
                <td className="p-4 text-slate-200">{e.libelle}</td>
                <td className="p-4 text-right font-medium text-slate-300">{e.debit > 0 ? e.debit.toLocaleString() : ''}</td>
                <td className="p-4 text-right font-medium text-slate-300">{e.credit > 0 ? e.credit.toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterrogationLettrage;
