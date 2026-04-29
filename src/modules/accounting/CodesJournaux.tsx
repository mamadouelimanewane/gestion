import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

const CodesJournaux = () => {
  const [journaux] = useState([
    { code: 'ACH', intitule: 'Journal des Achats', type: 'Achat' },
    { code: 'VTE', intitule: 'Journal des Ventes', type: 'Vente' },
    { code: 'BQ1', intitule: 'Banque SGBS', type: 'Trésorerie' },
    { code: 'CAI', intitule: 'Caisse Principale', type: 'Trésorerie' },
    { code: 'OD', intitule: 'Opérations Diverses', type: 'Général' },
    { code: 'AN', intitule: 'A-Nouveaux', type: 'Situation' },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={16} /> Créer un Journal
        </button>
        <div className="relative w-64">
          <input type="text" placeholder="Rechercher un code..." className="input w-full pl-10" />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300 w-32">Code</th>
              <th className="p-4 font-medium text-slate-300">Intitulé du Journal</th>
              <th className="p-4 font-medium text-slate-300">Type de Journal</th>
              <th className="p-4 font-medium text-slate-300 text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {journaux.map((j, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-indigo-400">{j.code}</td>
                <td className="p-4 font-medium text-slate-200">{j.intitule}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    j.type === 'Trésorerie' ? 'bg-cyan-500/10 text-cyan-400' :
                    j.type === 'Achat' ? 'bg-rose-500/10 text-rose-400' :
                    j.type === 'Vente' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-slate-500/20 text-slate-300'
                  }`}>
                    {j.type}
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

export default CodesJournaux;
