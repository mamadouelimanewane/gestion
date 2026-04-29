import React, { useState } from 'react';
import { Search, Filter, Lock, Unlock, AlertTriangle } from 'lucide-react';

const ClotureJournaux = () => {
  const [journaux, setJournaux] = useState([
    { code: 'ACH', intitule: 'Achats', periode: 'Novembre 2024', statut: 'Ouvert' },
    { code: 'VTE', intitule: 'Ventes', periode: 'Novembre 2024', statut: 'Ouvert' },
    { code: 'BQ1', intitule: 'Banque SGBS', periode: 'Novembre 2024', statut: 'Ouvert' },
    { code: 'ACH', intitule: 'Achats', periode: 'Octobre 2024', statut: 'Clôturé' },
    { code: 'VTE', intitule: 'Ventes', periode: 'Octobre 2024', statut: 'Clôturé' },
    { code: 'BQ1', intitule: 'Banque SGBS', periode: 'Octobre 2024', statut: 'Clôturé' },
  ]);

  const toggleStatut = (idx: number) => {
    const updated = [...journaux];
    updated[idx].statut = updated[idx].statut === 'Ouvert' ? 'Clôturé' : 'Ouvert';
    setJournaux(updated);
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Lock size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Clôture des Journaux</h3>
            <p className="text-sm text-slate-400">Verrouillage définitif des périodes comptables</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <Filter size={16} /> Période
          </button>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl mb-6 flex gap-3 items-start">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-bold text-amber-500 text-sm">Attention : Action irréversible</h4>
          <p className="text-xs text-amber-400/80 mt-1">
            La clôture d'un journal empêche toute modification, suppression ou ajout d'écriture pour la période concernée. 
            Assurez-vous que tous vos brouillards sont validés avant de procéder.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300">Période</th>
              <th className="p-4 font-medium text-slate-300">Code Journal</th>
              <th className="p-4 font-medium text-slate-300">Intitulé</th>
              <th className="p-4 font-medium text-slate-300">Statut Actuel</th>
              <th className="p-4 font-medium text-slate-300 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {journaux.map((j, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-slate-300 font-medium">{j.periode}</td>
                <td className="p-4 font-bold text-indigo-400">{j.code}</td>
                <td className="p-4 text-slate-200">{j.intitule}</td>
                <td className="p-4">
                  <span className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-xs font-bold ${
                    j.statut === 'Ouvert' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {j.statut === 'Ouvert' ? <Unlock size={12} /> : <Lock size={12} />}
                    {j.statut.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => toggleStatut(idx)}
                    className={`btn text-xs px-4 py-2 ${
                      j.statut === 'Ouvert' ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {j.statut === 'Ouvert' ? 'Clôturer la période' : 'Réouvrir (Admin)'}
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

export default ClotureJournaux;
