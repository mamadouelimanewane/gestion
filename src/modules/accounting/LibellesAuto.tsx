import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Type } from 'lucide-react';

const LibellesAuto = () => {
  const [libelles] = useState([
    { id: 1, code: 'FAC', intitule: 'Facture N° [PIECE] - [TIERS]', usage: 'Journal Ventes' },
    { id: 2, code: 'REGT', intitule: 'Règlement Facture [PIECE] / [TIERS]', usage: 'Journal Trésorerie' },
    { id: 3, code: 'SAL', intitule: 'Salaire mois de [MOIS] - [LIBELLE]', usage: 'Journal OD' },
    { id: 4, code: 'ACH', intitule: 'Achat Fournisseur [TIERS] - [PIECE]', usage: 'Journal Achats' },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Type size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Libellés Automatiques</h3>
            <p className="text-sm text-slate-400">Paramétrage des variables pour la saisie automatique</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} /> Nouveau Libellé
          </button>
        </div>
      </div>

      <div className="bg-slate-800/20 p-4 rounded-xl mb-6 border border-slate-700/50">
        <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Variables disponibles</h4>
        <div className="flex flex-wrap gap-2">
          {['[PIECE]', '[TIERS]', '[MOIS]', '[JOUR]', '[ANNEE]', '[COMPTE]', '[LIBELLE]'].map(v => (
            <span key={v} className="px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded font-mono text-xs border border-indigo-500/20">
              {v}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300 w-32">Code</th>
              <th className="p-4 font-medium text-slate-300">Schéma du Libellé</th>
              <th className="p-4 font-medium text-slate-300">Application</th>
              <th className="p-4 font-medium text-slate-300 text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {libelles.map((l) => (
              <tr key={l.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-indigo-400">{l.code}</td>
                <td className="p-4 font-medium text-slate-200">{l.intitule}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
                    {l.usage}
                  </span>
                </td>
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

export default LibellesAuto;
