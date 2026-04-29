import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, PieChart } from 'lucide-react';

const PlanAnalytique = () => {
  const [sections] = useState([
    { code: 'ADM', intitule: 'ADMINISTRATION GÉNÉRALE', type: 'Section', cumul: 4500000 },
    { code: 'COM', intitule: 'COMMERCIAL & VENTES', type: 'Section', cumul: 12800000 },
    { code: 'LOG', intitule: 'LOGISTIQUE & TRANSPORT', type: 'Section', cumul: 3200000 },
    { code: 'PROD', intitule: 'PRODUCTION / ATELIER', type: 'Section', cumul: 15600000 },
    { code: 'SAV', intitule: 'SERVICE APRÈS-VENTE', type: 'Section', cumul: 1450000 },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <PieChart size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Plan Analytique</h3>
            <p className="text-sm text-slate-400">Centres de coûts et sections d'analyse</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} /> Créer une Section
          </button>
          <div className="relative w-64">
            <input type="text" placeholder="Rechercher une section..." className="input w-full pl-10" />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300 w-32">Code Section</th>
              <th className="p-4 font-medium text-slate-300">Intitulé</th>
              <th className="p-4 font-medium text-slate-300">Type</th>
              <th className="p-4 font-medium text-slate-300 text-right">Cumul Période</th>
              <th className="p-4 font-medium text-slate-300 text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {sections.map((s, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-indigo-400">{s.code}</td>
                <td className="p-4 font-medium text-slate-200">{s.intitule}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-slate-500/10 text-slate-400">
                    {s.type}
                  </span>
                </td>
                <td className="p-4 text-right font-medium text-emerald-400">
                  {s.cumul.toLocaleString()} F CFA
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

export default PlanAnalytique;
