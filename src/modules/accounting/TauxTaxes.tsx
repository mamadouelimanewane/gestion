import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

const TauxTaxes = () => {
  const [taxes] = useState([
    { code: 'D18', intitule: 'TVA Déductible sur Achats 18%', sens: 'Déductible', taux: 18, compte: '445200' },
    { code: 'C18', intitule: 'TVA Collectée sur Ventes 18%', sens: 'Collecté', taux: 18, compte: '443100' },
    { code: 'C10', intitule: 'TVA Collectée Réduite 10%', sens: 'Collecté', taux: 10, compte: '443110' },
    { code: 'IR', intitule: 'Retenue à la Source IR', sens: 'Déductible', taux: 5, compte: '444000' },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={16} /> Créer un Taux
        </button>
        <div className="relative w-64">
          <input type="text" placeholder="Rechercher une taxe..." className="input w-full pl-10" />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300 w-32">Code Taxe</th>
              <th className="p-4 font-medium text-slate-300">Intitulé</th>
              <th className="p-4 font-medium text-slate-300">Sens</th>
              <th className="p-4 font-medium text-slate-300 text-right">Taux (%)</th>
              <th className="p-4 font-medium text-slate-300 text-right">Compte Lié</th>
              <th className="p-4 font-medium text-slate-300 text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {taxes.map((t, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-indigo-400">{t.code}</td>
                <td className="p-4 font-medium text-slate-200">{t.intitule}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    t.sens === 'Collecté' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {t.sens}
                  </span>
                </td>
                <td className="p-4 text-right font-medium text-slate-300">{t.taux} %</td>
                <td className="p-4 text-right font-mono text-slate-400">{t.compte}</td>
                <td className="p-4 flex justify-center gap-3">
                  <button className="text-slate-400 hover:text-indigo-400 transition-colors"><Edit size={16} /></button>
                  <button className="text-slate-400 hover:text-rose-400 transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TauxTaxes;
