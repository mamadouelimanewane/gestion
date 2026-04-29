import React, { useState } from 'react';
import { Search, Save, Trash2, Plus, DollarSign, User } from 'lucide-react';

const ReglementTiers = () => {
  const [lignes, setLignes] = useState([
    { id: 1, tiers: 'CLIENT ALPHA', compte: '4110001', facture: 'FAC-4501', montant: 1180000, mode: 'Virement', banque: 'SGBS' },
  ]);

  const addLigne = () => {
    setLignes([...lignes, { id: Date.now(), tiers: '', compte: '', facture: '', montant: 0, mode: 'Chèque', banque: 'SGBS' }]);
  };

  const removeLigne = (id: number) => {
    setLignes(lignes.filter(l => l.id !== id));
  };

  const total = lignes.reduce((sum, l) => sum + Number(l.montant), 0);

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <DollarSign size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Règlement des Tiers</h3>
            <p className="text-sm text-slate-400">Enregistrement rapide des encaissements et décaissements</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            Importer un relevé
          </button>
          <button className="btn btn-primary flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <Save size={16} /> Enregistrer les règlements
          </button>
        </div>
      </div>

      {/* Table de saisie au kilomètre */}
      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-3 font-medium text-slate-300">Tiers / Compte</th>
              <th className="p-3 font-medium text-slate-300 w-48">Référence Facture</th>
              <th className="p-3 font-medium text-slate-300 w-48 text-right">Montant Règlement</th>
              <th className="p-3 font-medium text-slate-300 w-40">Mode</th>
              <th className="p-3 font-medium text-slate-300 w-40">Banque</th>
              <th className="p-3 w-16 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {lignes.map((l, idx) => (
              <tr key={l.id} className="hover:bg-slate-800/20">
                <td className="p-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Rechercher client/fournisseur..."
                      defaultValue={l.tiers}
                      className="input w-full pl-9 py-2 bg-slate-900/40"
                    />
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </td>
                <td className="p-2">
                  <input type="text" defaultValue={l.facture} placeholder="N° Facture" className="input w-full py-2 bg-slate-900/40 font-mono" />
                </td>
                <td className="p-2">
                  <input type="number" defaultValue={l.montant} className="input w-full py-2 bg-slate-900/40 text-right font-bold text-emerald-400" />
                </td>
                <td className="p-2">
                  <select className="input w-full py-2 bg-slate-900/40">
                    <option>Virement</option>
                    <option>Chèque</option>
                    <option>Espèces</option>
                    <option>Carte Bancaire</option>
                  </select>
                </td>
                <td className="p-2">
                  <select className="input w-full py-2 bg-slate-900/40">
                    <option>SGBS</option>
                    <option>BICIS</option>
                    <option>UBA</option>
                    <option>Caisse</option>
                  </select>
                </td>
                <td className="p-2 text-center">
                  <button onClick={() => removeLigne(l.id)} className="text-slate-500 hover:text-rose-400 p-2">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-800/60 font-bold sticky bottom-0">
            <tr>
              <td colSpan={2} className="p-3 text-right">TOTAL À ENREGISTRER :</td>
              <td className="p-3 text-right text-lg text-emerald-400">{total.toLocaleString()} F CFA</td>
              <td colSpan={3} className="p-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4">
        <button onClick={addLigne} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors">
          <Plus size={18} /> Ajouter une ligne de règlement
        </button>
      </div>
    </div>
  );
};

export default ReglementTiers;
