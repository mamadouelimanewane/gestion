import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, PieChart } from 'lucide-react';

const JournauxAnalytiques = () => {
  const [journaux] = useState([
    { code: 'ANA-G', intitule: 'Analytique Général', type: 'Général' },
    { code: 'ANA-V', intitule: 'Analytique Ventes', type: 'Ventes' },
    { code: 'ANA-A', intitule: 'Analytique Achats', type: 'Achats' },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <PieChart size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Codes Journaux Analytiques</h3>
            <p className="text-sm text-slate-400">Paramétrage des journaux spécifiques à l'analyse de coûts</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} /> Nouveau Journal Analytique
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300 w-32">Code</th>
              <th className="p-4 font-medium text-slate-300">Intitulé du Journal Analytique</th>
              <th className="p-4 font-medium text-slate-300 text-center">Type</th>
              <th className="p-4 font-medium text-slate-300 text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {journaux.map((j, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-indigo-400">{j.code}</td>
                <td className="p-4 font-medium text-slate-200">{j.intitule}</td>
                <td className="p-4 text-center">
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium">
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

export default JournauxAnalytiques;
