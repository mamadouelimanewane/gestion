import React, { useState } from 'react';
import { Save, X, Plus, Trash2, Calendar, FileText, CreditCard } from 'lucide-react';

const JournalEntry = () => {
  const [lines, setLines] = useState([
    { id: 1, account: '', label: '', debit: '', credit: '' },
    { id: 2, account: '', label: '', debit: '', credit: '' },
  ]);

  const addLine = () => {
    setLines([...lines, { id: Date.now(), account: '', label: '', debit: '', credit: '' }]);
  };

  const removeLine = (id: number) => {
    if (lines.length > 2) {
      setLines(lines.filter(l => l.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="card bg-slate-800/20 border-slate-700/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Date de l'écriture</label>
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5">
              <Calendar size={18} className="text-slate-500" />
              <input type="date" className="bg-transparent border-none outline-none text-sm w-full" defaultValue="2024-04-29" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Journal</label>
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5">
              <BookOpen size={18} className="text-slate-500" />
              <select className="bg-transparent border-none outline-none text-sm w-full appearance-none">
                <option>Journal des Achats (AC)</option>
                <option>Journal des Ventes (VE)</option>
                <option>Journal de Banque (BQ)</option>
                <option>Journal d'Opérations Diverses (OD)</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Référence Pièce</label>
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5">
              <FileText size={18} className="text-slate-500" />
              <input type="text" placeholder="FAC-2024-001" className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-slate-700/50 rounded-xl bg-slate-900/50">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700/50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 w-1/4">Compte</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 w-1/3">Libellé</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Débit</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Crédit</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {lines.map((line) => (
                <tr key={line.id} className="group hover:bg-slate-800/20">
                  <td className="px-4 py-2">
                    <input 
                      type="text" 
                      placeholder="Ex: 401000" 
                      className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm w-full focus:border-indigo-500 outline-none transition-all"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input 
                      type="text" 
                      placeholder="Libellé de la ligne" 
                      className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm w-full focus:border-indigo-500 outline-none transition-all"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm w-full text-right focus:border-indigo-500 outline-none transition-all"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm w-full text-right focus:border-indigo-500 outline-none transition-all"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button 
                      onClick={() => removeLine(line.id)}
                      className="text-slate-600 hover:text-rose-400 p-2 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-800/30 font-bold border-t border-slate-700">
                <td colSpan={2} className="px-6 py-4 text-sm">TOTAUX</td>
                <td className="px-6 py-4 text-right text-emerald-400">0.00 €</td>
                <td className="px-6 py-4 text-right text-rose-400">0.00 €</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button 
            onClick={addLine}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-bold transition-colors"
          >
            <Plus size={18} /> Ajouter une ligne
          </button>
          
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold border border-slate-700 transition-all">
              Annuler
            </button>
            <button className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all">
              <Save size={18} /> Valider l'écriture
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-slate-800/10 border-dashed border-slate-700 flex flex-col items-center justify-center p-8 text-center">
          <CreditCard size={32} className="text-slate-600 mb-4" />
          <h4 className="font-bold text-slate-300">Rapprochement Automatique</h4>
          <p className="text-xs text-slate-500 mt-2">Déposez un relevé bancaire (PDF, CSV) pour générer automatiquement les écritures.</p>
        </div>
        <div className="card bg-slate-800/10 border-dashed border-slate-700 flex flex-col items-center justify-center p-8 text-center">
          <Plus size={32} className="text-slate-600 mb-4" />
          <h4 className="font-bold text-slate-300">Modèles d'Ecritures</h4>
          <p className="text-xs text-slate-500 mt-2">Utilisez un modèle pour les écritures récurrentes (Loyer, Salaires, etc.).</p>
        </div>
      </div>
    </div>
  );
};

const BookOpen = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

export default JournalEntry;
