import React, { useState } from 'react';
import { Search, Filter, Download, BookOpen } from 'lucide-react';

const GrandLivre = () => {
  const [comptes] = useState([
    {
      numero: '4110001',
      intitule: 'CLIENT ALPHA',
      soldeInitialDebit: 1500000,
      soldeInitialCredit: 0,
      ecritures: [
        { date: '01/10/2024', journal: 'VTE', piece: 'FAC-4501', libelle: 'Facture Vente N° 4501', debit: 1180000, credit: 0, lettrage: 'A' },
        { date: '15/10/2024', journal: 'BQ1', piece: 'VIR-102', libelle: 'Virement Client Alpha', debit: 0, credit: 1180000, lettrage: 'A' },
        { date: '22/10/2024', journal: 'VTE', piece: 'FAC-4588', libelle: 'Facture Vente N° 4588', debit: 450000, credit: 0, lettrage: '' },
      ],
      totalDebit: 3130000, // 1500000 + 1180000 + 450000
      totalCredit: 1180000,
      soldeFinalDebit: 1950000,
      soldeFinalCredit: 0,
    },
    {
      numero: '4010001',
      intitule: 'FOURNISSEUR TECH',
      soldeInitialDebit: 0,
      soldeInitialCredit: 500000,
      ecritures: [
        { date: '10/11/2024', journal: 'ACH', piece: 'FAC-F22', libelle: 'Achat Matériel Info', debit: 0, credit: 850000, lettrage: '' },
        { date: '15/11/2024', journal: 'BQ1', piece: 'CHQ-885', libelle: 'Chèque Fournisseur Tech', debit: 400000, credit: 0, lettrage: '' },
      ],
      totalDebit: 400000,
      totalCredit: 1350000, // 500000 + 850000
      soldeFinalDebit: 0,
      soldeFinalCredit: 950000,
    }
  ]);

  const formatCfa = (val: number) => {
    if (val === 0) return '';
    return val.toLocaleString('fr-FR');
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Grand-Livre des Comptes</h3>
            <p className="text-sm text-slate-400">Exercice 2024 - Tous les journaux</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <input type="text" placeholder="Rechercher un compte..." className="input w-full pl-10" />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="btn btn-secondary flex items-center gap-2">
            <Filter size={16} /> Filtres
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Download size={16} /> Exporter PDF
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50 p-1 space-y-6">
        {comptes.map((compte, idx) => (
          <div key={idx} className="bg-slate-800/40 rounded-lg border border-slate-700 overflow-hidden">
            {/* En-tête du compte */}
            <div className="bg-slate-800/80 p-3 flex justify-between items-center border-b border-slate-700">
              <div className="flex items-center gap-4">
                <span className="font-mono text-lg font-bold text-indigo-400">{compte.numero}</span>
                <span className="font-semibold text-white">{compte.intitule}</span>
              </div>
            </div>

            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-900/40 text-slate-400">
                <tr>
                  <th className="p-2 w-24">Date</th>
                  <th className="p-2 w-16">JNL</th>
                  <th className="p-2 w-32">N° Pièce</th>
                  <th className="p-2 w-16 text-center">Let.</th>
                  <th className="p-2">Libellé de l'écriture</th>
                  <th className="p-2 text-right w-32">Débit</th>
                  <th className="p-2 text-right w-32">Crédit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {/* Solde initial */}
                <tr className="text-slate-400 font-medium bg-slate-900/20">
                  <td colSpan={5} className="p-2 text-right">Report à nouveau (Solde Initial) :</td>
                  <td className="p-2 text-right">{formatCfa(compte.soldeInitialDebit)}</td>
                  <td className="p-2 text-right">{formatCfa(compte.soldeInitialCredit)}</td>
                </tr>

                {/* Écritures de la période */}
                {compte.ecritures.map((e, eIdx) => (
                  <tr key={eIdx} className="hover:bg-slate-800/60 transition-colors">
                    <td className="p-2 text-slate-300">{e.date}</td>
                    <td className="p-2 font-medium text-slate-500">{e.journal}</td>
                    <td className="p-2 font-mono text-indigo-300/80">{e.piece}</td>
                    <td className="p-2 font-bold text-emerald-400 text-center">{e.lettrage}</td>
                    <td className="p-2 text-slate-200">{e.libelle}</td>
                    <td className="p-2 text-right text-slate-300">{formatCfa(e.debit)}</td>
                    <td className="p-2 text-right text-slate-300">{formatCfa(e.credit)}</td>
                  </tr>
                ))}

                {/* Totaux & Solde Final */}
                <tr className="bg-slate-800/80 font-bold border-t-2 border-slate-600">
                  <td colSpan={5} className="p-2 text-right text-slate-300">Cumul des mouvements :</td>
                  <td className="p-2 text-right text-indigo-300">{formatCfa(compte.totalDebit)}</td>
                  <td className="p-2 text-right text-indigo-300">{formatCfa(compte.totalCredit)}</td>
                </tr>
                <tr className="bg-indigo-900/20 font-bold">
                  <td colSpan={5} className="p-2 text-right text-white">Solde Final de la période :</td>
                  <td className="p-2 text-right text-emerald-400">{formatCfa(compte.soldeFinalDebit)}</td>
                  <td className="p-2 text-right text-rose-400">{formatCfa(compte.soldeFinalCredit)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrandLivre;
