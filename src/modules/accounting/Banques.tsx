import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Building2, CreditCard } from 'lucide-react';

const Banques = () => {
  const [banques] = useState([
    { id: 1, nom: 'SGBS', code: 'BQ1', compteG: '512100', iban: 'SN012 01234 012345678901 23', domiciliation: 'Dakar Plateau' },
    { id: 2, nom: 'BICIS', code: 'BQ2', compteG: '512200', iban: 'SN010 05678 098765432109 87', domiciliation: 'Almadies' },
    { id: 3, nom: 'UBA', code: 'BQ3', compteG: '512300', iban: 'SN079 04321 112233445566 77', domiciliation: 'Maristes' },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Building2 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Gestion des Banques</h3>
            <p className="text-sm text-slate-400">Paramétrage des comptes bancaires et coordonnées</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} /> Ajouter une Banque
          </button>
          <div className="relative w-64">
            <input type="text" placeholder="Rechercher une banque..." className="input w-full pl-10" />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300">Nom de la Banque</th>
              <th className="p-4 font-medium text-slate-300 w-32 text-center">Code Journal</th>
              <th className="p-4 font-medium text-slate-300 w-32 text-center">Compte G.</th>
              <th className="p-4 font-medium text-slate-300">Coordonnées (IBAN/RIB)</th>
              <th className="p-4 font-medium text-slate-300">Domiciliation</th>
              <th className="p-4 font-medium text-slate-300 text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {banques.map((b) => (
              <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-indigo-400">
                      <Building2 size={16} />
                    </div>
                    <span className="font-bold text-slate-200">{b.nom}</span>
                  </div>
                </td>
                <td className="p-4 text-center font-mono text-indigo-400">{b.code}</td>
                <td className="p-4 text-center font-mono text-slate-400">{b.compteG}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-slate-300 font-mono text-xs">
                    <CreditCard size={14} className="text-slate-500" />
                    {b.iban}
                  </div>
                </td>
                <td className="p-4 text-slate-400">{b.domiciliation}</td>
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

export default Banques;
