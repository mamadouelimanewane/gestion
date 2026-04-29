import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, Building, DollarSign } from 'lucide-react';

const RapprochementBancaire = () => {
  const [ecritures] = useState([
    { date: '02/11/2024', libelle: 'Virement Client Alpha', debit: 1180000, credit: 0, pointe: true },
    { date: '05/11/2024', libelle: 'Prélèvement Senelec', debit: 0, credit: 250000, pointe: false },
    { date: '10/11/2024', libelle: 'Chèque Fournisseur Tech', debit: 0, credit: 400000, pointe: true },
    { date: '12/11/2024', libelle: 'Frais Bancaires', debit: 0, credit: 15000, pointe: false },
    { date: '15/11/2024', libelle: 'Remise de Chèques', debit: 350000, credit: 0, pointe: false },
    { date: '20/11/2024', libelle: 'Paiement Salaire', debit: 0, credit: 500000, pointe: false },
  ]);

  const [selected, setSelected] = useState<number[]>([0, 2]); // Déjà pointés simulés

  const toggleSelect = (idx: number) => {
    setSelected(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const soldeComptable = 2500000;
  const soldeReleve = 2865000;
  const ecrituresPointeesDebit = selected.reduce((sum, idx) => sum + ecritures[idx].debit, 0);
  const ecrituresPointeesCredit = selected.reduce((sum, idx) => sum + ecritures[idx].credit, 0);
  const soldeTheorique = soldeComptable + ecrituresPointeesDebit - ecrituresPointeesCredit;
  const ecart = soldeTheorique - soldeReleve;

  const formatCfa = (val: number) => val.toLocaleString('fr-FR') + ' F CFA';

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Building size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Banque SGBS (512001)</h3>
              <p className="text-slate-400 text-sm">Rapprochement pour Novembre 2024</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="btn btn-secondary flex items-center gap-2">
              <Filter size={16} /> Écritures non pointées
            </button>
            <div className="relative w-64">
              <input type="text" placeholder="Rechercher un montant..." className="input w-full pl-10" />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Panneau de synthèse du rapprochement */}
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 w-80">
          <h4 className="font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <DollarSign size={16} className="text-indigo-400"/> Synthèse du compte
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Solde Comptable:</span>
              <span className="font-medium text-slate-200">{formatCfa(soldeComptable)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Mvts Pointés:</span>
              <span className="font-medium text-emerald-400">+{formatCfa(ecrituresPointeesDebit - ecrituresPointeesCredit)}</span>
            </div>
            <div className="h-px bg-slate-700 my-2"></div>
            <div className="flex justify-between">
              <span className="text-slate-400">Solde Théorique:</span>
              <span className="font-medium text-indigo-300">{formatCfa(soldeTheorique)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-slate-400">Solde du Relevé:</span>
              <span className="font-medium text-white">{formatCfa(soldeReleve)}</span>
            </div>
            <div className="h-px bg-slate-700 my-2"></div>
            <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg mt-2">
              <span className="text-slate-400">Écart Rapprochement:</span>
              <span className={`font-bold ${ecart === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatCfa(ecart)}
              </span>
            </div>
          </div>
          <button 
            disabled={ecart !== 0}
            className={`w-full mt-4 btn ${ecart === 0 ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
          >
            Valider le rapprochement
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 w-12 text-center">Pointé</th>
              <th className="p-4 font-medium text-slate-300">Date Opération</th>
              <th className="p-4 font-medium text-slate-300 w-1/2">Libellé</th>
              <th className="p-4 font-medium text-slate-300 text-right">Débit (Encaissement)</th>
              <th className="p-4 font-medium text-slate-300 text-right">Crédit (Décaissement)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {ecritures.map((e, idx) => (
              <tr key={idx} 
                  onClick={() => toggleSelect(idx)}
                  className={`transition-colors cursor-pointer hover:bg-slate-800/40 ${selected.includes(idx) ? 'bg-indigo-900/20' : ''}`}>
                <td className="p-4">
                  <div className={`w-6 h-6 mx-auto rounded-full border-2 flex items-center justify-center transition-colors ${selected.includes(idx) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500'}`}>
                    {selected.includes(idx) && <CheckCircle2 size={16} className="text-white" />}
                  </div>
                </td>
                <td className="p-4 text-slate-300">{e.date}</td>
                <td className="p-4 text-slate-200">{e.libelle}</td>
                <td className="p-4 text-right font-medium text-emerald-400">{e.debit > 0 ? formatCfa(e.debit) : ''}</td>
                <td className="p-4 text-right font-medium text-rose-400">{e.credit > 0 ? formatCfa(e.credit) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RapprochementBancaire;
