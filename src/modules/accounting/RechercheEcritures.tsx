import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, Tag, DollarSign, ListFilter } from 'lucide-react';

const RechercheEcritures = () => {
  const [filters, setFilters] = useState({
    periode: 'Ce mois-ci',
    journal: 'Tous',
    compte: '',
    montantMin: '',
    montantMax: '',
    libelle: '',
  });

  const [resultats] = useState([
    { date: '12/10/2024', journal: 'VTE', piece: 'FAC-4501', compte: '4110001', libelle: 'Facture Vente N° 4501', debit: 1180000, credit: 0 },
    { date: '15/10/2024', journal: 'BQ1', piece: 'VIR-102', compte: '4110001', libelle: 'Virement Client Alpha', debit: 0, credit: 1180000 },
    { date: '22/10/2024', journal: 'VTE', piece: 'FAC-4588', compte: '4110001', libelle: 'Facture Vente N° 4588', debit: 450000, credit: 0 },
    { date: '10/11/2024', journal: 'ACH', piece: 'FAC-F22', compte: '4010001', libelle: 'Achat Matériel Info', debit: 0, credit: 850000 },
    { date: '15/11/2024', journal: 'BQ1', piece: 'CHQ-885', compte: '4010001', libelle: 'Chèque Fournisseur Tech', debit: 400000, credit: 0 },
  ]);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Search size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Recherche d'Écritures</h3>
            <p className="text-sm text-slate-400">Moteur de recherche multicritère multicomptes</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <ListFilter size={16} /> Effacer les filtres
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Download size={16} /> Exporter les résultats
          </button>
        </div>
      </div>

      {/* Barre de Filtres Avancés */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <Calendar size={12} /> PÉRIODE
          </label>
          <select className="input w-full py-1.5 text-sm bg-slate-900/60">
            <option>Ce mois-ci</option>
            <option>Mois dernier</option>
            <option>Exercice en cours</option>
            <option>Personnalisé...</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <Tag size={12} /> JOURNAL
          </label>
          <select className="input w-full py-1.5 text-sm bg-slate-900/60">
            <option>Tous</option>
            <option>ACH - Achats</option>
            <option>VTE - Ventes</option>
            <option>BQ1 - Banque SGBS</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <DollarSign size={12} /> COMPTE
          </label>
          <input type="text" placeholder="N° Compte" className="input w-full py-1.5 text-sm bg-slate-900/60 font-mono" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <DollarSign size={12} /> MONTANT MIN
          </label>
          <input type="number" placeholder="0" className="input w-full py-1.5 text-sm bg-slate-900/60 text-right" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <DollarSign size={12} /> MONTANT MAX
          </label>
          <input type="number" placeholder="∞" className="input w-full py-1.5 text-sm bg-slate-900/60 text-right" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <Search size={12} /> LIBELLÉ
          </label>
          <input type="text" placeholder="Mots clés..." className="input w-full py-1.5 text-sm bg-slate-900/60" />
        </div>
      </div>

      {/* Résultats de la recherche */}
      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-4 font-medium text-slate-300">Date</th>
              <th className="p-4 font-medium text-slate-300">JNL</th>
              <th className="p-4 font-medium text-slate-300">N° Pièce</th>
              <th className="p-4 font-medium text-slate-300">N° Compte</th>
              <th className="p-4 font-medium text-slate-300">Libellé de l'écriture</th>
              <th className="p-4 font-medium text-slate-300 text-right">Débit</th>
              <th className="p-4 font-medium text-slate-300 text-right">Crédit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {resultats.map((r, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-slate-300">{r.date}</td>
                <td className="p-4 font-medium text-slate-500">{r.journal}</td>
                <td className="p-4 font-mono text-indigo-300/80">{r.piece}</td>
                <td className="p-4 font-mono text-slate-400">{r.compte}</td>
                <td className="p-4 text-slate-200">{r.libelle}</td>
                <td className="p-4 text-right font-medium text-emerald-400">{r.debit > 0 ? r.debit.toLocaleString() : ''}</td>
                <td className="p-4 text-right font-medium text-rose-400">{r.credit > 0 ? r.credit.toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-4 bg-indigo-900/10 rounded-xl border border-indigo-500/10 flex justify-between items-center">
        <div className="text-sm text-slate-400">
          <span className="font-bold text-indigo-400">{resultats.length}</span> écritures trouvées correspondant à vos critères.
        </div>
        <div className="text-sm font-bold">
          <span className="text-slate-400 mr-4">Total Débit : <span className="text-indigo-300">2 030 000</span></span>
          <span className="text-slate-400">Total Crédit : <span className="text-indigo-300">2 030 000</span></span>
        </div>
      </div>
    </div>
  );
};

export default RechercheEcritures;
