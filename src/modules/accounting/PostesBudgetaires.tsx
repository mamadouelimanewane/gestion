import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Target, TrendingUp } from 'lucide-react';

const PostesBudgetaires = () => {
  const [postes] = useState([
    { id: 1, code: 'BUD-VTE', intitule: 'Objectif Ventes 2024', prevu: 50000000, realise: 45823000, ecart: -4177000 },
    { id: 2, code: 'BUD-SAL', intitule: 'Masse Salariale', prevu: 15000000, realise: 12000000, ecart: 3000000 },
    { id: 3, code: 'BUD-PUB', intitule: 'Budget Marketing', prevu: 5000000, realise: 6200000, ecart: -1200000 },
    { id: 4, code: 'BUD-INV', intitule: 'Investissements Matériel', prevu: 10000000, realise: 8500000, ecart: 1500000 },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Postes Budgétaires</h3>
            <p className="text-sm text-slate-400">Suivi des prévisions vs réalisations</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} /> Nouveau Poste Budgétaire
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {postes.map((p) => {
          const ratio = (p.realise / p.prevu) * 100;
          return (
            <div key={p.id} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{p.code}</span>
                <TrendingUp size={14} className={ratio > 100 ? 'text-rose-400' : 'text-emerald-400'} />
              </div>
              <h4 className="text-sm font-bold text-slate-200 truncate">{p.intitule}</h4>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Réalisation</span>
                  <span className="text-slate-300">{ratio.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${ratio > 100 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${Math.min(ratio, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300">Intitulé du Poste</th>
              <th className="p-4 font-medium text-slate-300 text-right">Prévu (Budget)</th>
              <th className="p-4 font-medium text-slate-300 text-right">Réalisé (Réel)</th>
              <th className="p-4 font-medium text-slate-300 text-right">Écart</th>
              <th className="p-4 font-medium text-slate-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {postes.map((p) => (
              <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-medium text-slate-200">{p.intitule}</td>
                <td className="p-4 text-right font-bold text-indigo-400">{p.prevu.toLocaleString()} F</td>
                <td className="p-4 text-right font-bold text-emerald-400">{p.realise.toLocaleString()} F</td>
                <td className={`p-4 text-right font-bold ${p.ecart < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {p.ecart > 0 ? '+' : ''}{p.ecart.toLocaleString()} F
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

export default PostesBudgetaires;
