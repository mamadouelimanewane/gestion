import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, LayoutTemplate } from 'lucide-react';

const ModelesSaisie = () => {
  const [modeles] = useState([
    { id: 1, code: 'LOYER', intitule: 'Paiement Loyer Mensuel', journal: 'OD', nbLignes: 2 },
    { id: 2, code: 'SALAIRE', intitule: 'Saisie Paie mensuelle', journal: 'OD', nbLignes: 8 },
    { id: 3, code: 'ABO-TEL', intitule: 'Facture Sonatel / Orange', journal: 'ACH', nbLignes: 3 },
    { id: 4, code: 'TVA-MENS', intitule: 'Déclaration TVA Mensuelle', journal: 'OD', nbLignes: 4 },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
            <LayoutTemplate size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Modèles de Saisie</h3>
            <p className="text-sm text-slate-400">Automatisation des écritures comptables récurrentes</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} /> Nouveau Modèle
          </button>
          <div className="relative w-64">
            <input type="text" placeholder="Rechercher un modèle..." className="input w-full pl-10" />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300 w-32">Code</th>
              <th className="p-4 font-medium text-slate-300">Intitulé du Modèle</th>
              <th className="p-4 font-medium text-slate-300 text-center w-32">Journal</th>
              <th className="p-4 font-medium text-slate-300 text-center w-32">Nb Lignes</th>
              <th className="p-4 font-medium text-slate-300 text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {modeles.map((m) => (
              <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-indigo-400">{m.code}</td>
                <td className="p-4 font-medium text-slate-200">{m.intitule}</td>
                <td className="p-4 text-center">
                  <span className="px-2 py-1 rounded text-xs font-mono bg-slate-700 text-slate-300">
                    {m.journal}
                  </span>
                </td>
                <td className="p-4 text-center text-slate-400 font-medium">{m.nbLignes}</td>
                <td className="p-4 flex justify-center gap-3">
                  <button className="text-slate-400 hover:text-indigo-400 transition-colors" title="Modifier le schéma"><Edit size={16} /></button>
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

export default ModelesSaisie;
