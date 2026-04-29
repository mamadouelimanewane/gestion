import React, { useState } from 'react';
import { Search, Filter, Printer, FileEdit } from 'lucide-react';

const Brouillard = () => {
  const [brouillard] = useState([
    { id: 1, date: '10/11/2024', journal: 'VTE', piece: 'FAC-4599', compte: '4110001', intitule: 'CLIENT ALPHA', libelle: 'Facture Vente N° 4599', debit: 2360000, credit: 0, statut: 'Brouillard' },
    { id: 2, date: '10/11/2024', journal: 'VTE', piece: 'FAC-4599', compte: '7010000', intitule: 'VENTES DE PRODUITS', libelle: 'Facture Vente N° 4599', debit: 0, credit: 2000000, statut: 'Brouillard' },
    { id: 3, date: '10/11/2024', journal: 'VTE', piece: 'FAC-4599', compte: '4431000', intitule: 'TVA COLLECTEE 18%', libelle: 'Facture Vente N° 4599', debit: 0, credit: 360000, statut: 'Brouillard' },
    { id: 4, date: '12/11/2024', journal: 'ACH', piece: 'FAC-F88', compte: '6010000', intitule: 'ACHATS MARCHANDISES', libelle: 'Achat Fourniture Bureau', debit: 150000, credit: 0, statut: 'Brouillard' },
    { id: 5, date: '12/11/2024', journal: 'ACH', piece: 'FAC-F88', compte: '4452000', intitule: 'TVA DEDUCTIBLE 18%', libelle: 'Achat Fourniture Bureau', debit: 27000, credit: 0, statut: 'Brouillard' },
    { id: 6, date: '12/11/2024', journal: 'ACH', piece: 'FAC-F88', compte: '4010002', intitule: 'FOURNISSEUR BUREAU', libelle: 'Achat Fourniture Bureau', debit: 0, credit: 177000, statut: 'Brouillard' },
  ]);

  const totalDebit = brouillard.reduce((sum, ligne) => sum + ligne.debit, 0);
  const totalCredit = brouillard.reduce((sum, ligne) => sum + ligne.credit, 0);
  const equilibre = totalDebit === totalCredit;

  const formatCfa = (val: number) => {
    if (val === 0) return '';
    return val.toLocaleString('fr-FR');
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <FileEdit size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Brouillard de Saisie</h3>
            <p className="text-sm text-slate-400">Écritures en attente de validation définitive</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <input type="text" placeholder="Rechercher une pièce..." className="input w-full pl-10" />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="btn btn-secondary flex items-center gap-2">
            <Filter size={16} /> Filtres
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Printer size={16} /> Imprimer
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-3 font-medium text-slate-300 w-24">Date</th>
              <th className="p-3 font-medium text-slate-300 w-16">JNL</th>
              <th className="p-3 font-medium text-slate-300 w-24">Pièce</th>
              <th className="p-3 font-medium text-slate-300 w-24">Compte</th>
              <th className="p-3 font-medium text-slate-300 w-48">Intitulé Compte</th>
              <th className="p-3 font-medium text-slate-300">Libellé</th>
              <th className="p-3 font-medium text-slate-300 text-right w-32">Débit</th>
              <th className="p-3 font-medium text-slate-300 text-right w-32">Crédit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {brouillard.map((ligne) => (
              <tr key={ligne.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3 text-slate-300">{ligne.date}</td>
                <td className="p-3 font-medium text-slate-500">{ligne.journal}</td>
                <td className="p-3 font-mono text-indigo-300/80">{ligne.piece}</td>
                <td className="p-3 font-mono font-medium text-indigo-400">{ligne.compte}</td>
                <td className="p-3 text-slate-300 truncate max-w-xs">{ligne.intitule}</td>
                <td className="p-3 text-slate-200">{ligne.libelle}</td>
                <td className="p-3 text-right font-medium text-emerald-400">{formatCfa(ligne.debit)}</td>
                <td className="p-3 text-right font-medium text-rose-400">{formatCfa(ligne.credit)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-800/90 font-bold sticky bottom-0">
            <tr>
              <td colSpan={6} className="p-3 text-right text-slate-300">TOTAL BROUILLARD :</td>
              <td className={`p-3 text-right ${equilibre ? 'text-indigo-400' : 'text-rose-500'}`}>{totalDebit.toLocaleString()}</td>
              <td className={`p-3 text-right ${equilibre ? 'text-indigo-400' : 'text-rose-500'}`}>{totalCredit.toLocaleString()}</td>
            </tr>
            {!equilibre && (
              <tr>
                <td colSpan={8} className="p-2 text-center text-rose-400 bg-rose-500/10">
                  ⚠️ Le brouillard est déséquilibré. Écart : {Math.abs(totalDebit - totalCredit).toLocaleString()}
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button disabled={!equilibre} className={`btn ${equilibre ? 'btn-primary' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>
          Valider définitivement les écritures
        </button>
      </div>
    </div>
  );
};

export default Brouillard;
