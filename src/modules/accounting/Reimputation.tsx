import React, { useState } from 'react';
import { Search, Filter, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';

const Reimputation = () => {
  const [ecritures] = useState([
    { id: 1, date: '12/10/2024', piece: 'FAC-4501', compteActuel: '701000', intitule: 'Ventes produits', montant: 1000000, nouveauCompte: '' },
    { id: 2, date: '15/10/2024', piece: 'VIR-102', compteActuel: '411001', intitule: 'Client Alpha', montant: 1180000, nouveauCompte: '' },
    { id: 3, date: '22/10/2024', piece: 'FAC-4588', compteActuel: '701000', intitule: 'Ventes produits', montant: 450000, nouveauCompte: '' },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
            <RefreshCw size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Réimputation d'Écritures</h3>
            <p className="text-sm text-slate-400">Modification en masse des comptes d'affectation</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex items-center gap-2">
            Lancer la réimputation
          </button>
        </div>
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl mb-6 flex gap-3 items-start">
        <AlertCircle className="text-indigo-400 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-bold text-indigo-400 text-sm">Mode de traitement par lot</h4>
          <p className="text-xs text-indigo-300/80 mt-1">
            Utilisez cet écran pour corriger des erreurs d'imputation systématiques. Toutes les écritures sélectionnées seront transférées vers le nouveau compte indiqué.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 w-12 text-center">Sélec.</th>
              <th className="p-4 font-medium text-slate-300">Date / Pièce</th>
              <th className="p-4 font-medium text-slate-300">Compte Actuel</th>
              <th className="p-4 font-medium text-slate-300">Intitulé</th>
              <th className="p-4 font-medium text-slate-300 text-right">Montant</th>
              <th className="p-4 font-medium text-slate-300 text-center w-8"></th>
              <th className="p-4 font-medium text-slate-300">Nouveau Compte</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {ecritures.map((e) => (
              <tr key={e.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900" />
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-slate-300">{e.date}</span>
                    <span className="text-xs font-mono text-indigo-400">{e.piece}</span>
                  </div>
                </td>
                <td className="p-4 font-mono font-bold text-rose-400">{e.compteActuel}</td>
                <td className="p-4 text-slate-300">{e.intitule}</td>
                <td className="p-4 text-right font-medium text-slate-200">{e.montant.toLocaleString()} F</td>
                <td className="p-4 text-center">
                  <ArrowRight size={16} className="text-slate-500" />
                </td>
                <td className="p-4">
                  <input 
                    type="text" 
                    placeholder="Saisir compte cible..." 
                    className="input w-48 py-1.5 text-xs bg-slate-900/60 border-indigo-500/30 focus:border-indigo-500" 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reimputation;
