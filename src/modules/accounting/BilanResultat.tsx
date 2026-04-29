import React, { useState } from 'react';
import { Download, Filter, FileText } from 'lucide-react';

const BilanResultat = () => {
  const [activeTab, setActiveTab] = useState('bilan-actif');

  const actifData = [
    { poste: 'IMMOBILISATIONS INCORPORELLES', brut: 2500000, amort: 500000, net: 2000000, netPrec: 1800000 },
    { poste: 'IMMOBILISATIONS CORPORELLES', brut: 15000000, amort: 3500000, net: 11500000, netPrec: 12000000 },
    { poste: 'IMMOBILISATIONS FINANCIÈRES', brut: 500000, amort: 0, net: 500000, netPrec: 500000 },
    { poste: 'TOTAL ACTIF IMMOBILISÉ', brut: 18000000, amort: 4000000, net: 14000000, netPrec: 14300000, isTotal: true },
    
    { poste: 'STOCKS', brut: 4500000, amort: 200000, net: 4300000, netPrec: 3800000 },
    { poste: 'CRÉANCES CLIENTS ET COMPTES RATTACHÉS', brut: 3200000, amort: 150000, net: 3050000, netPrec: 2900000 },
    { poste: 'TOTAL ACTIF CIRCULANT', brut: 7700000, amort: 350000, net: 7350000, netPrec: 6700000, isTotal: true },

    { poste: 'TRÉSORERIE ACTIF (Banque & Caisse)', brut: 2800000, amort: 0, net: 2800000, netPrec: 1500000 },
    { poste: 'TOTAL GÉNÉRAL ACTIF', brut: 28500000, amort: 4350000, net: 24150000, netPrec: 22500000, isGrandTotal: true },
  ];

  const passifData = [
    { poste: 'CAPITAL', net: 10000000, netPrec: 10000000 },
    { poste: 'RÉSERVES', net: 2500000, netPrec: 1800000 },
    { poste: 'RÉSULTAT NET DE L\'EXERCICE', net: 3250000, netPrec: 2800000 },
    { poste: 'TOTAL CAPITAUX PROPRES', net: 15750000, netPrec: 14600000, isTotal: true },

    { poste: 'EMPRUNTS ET DETTES FINANCIÈRES', net: 4200000, netPrec: 5000000 },
    { poste: 'TOTAL DETTES FINANCIÈRES', net: 4200000, netPrec: 5000000, isTotal: true },

    { poste: 'DETTES FOURNISSEURS', net: 2800000, netPrec: 2100000 },
    { poste: 'DETTES FISCALES ET SOCIALES', net: 1400000, netPrec: 800000 },
    { poste: 'TOTAL PASSIF CIRCULANT', net: 4200000, netPrec: 2900000, isTotal: true },

    { poste: 'TOTAL GÉNÉRAL PASSIF', net: 24150000, netPrec: 22500000, isGrandTotal: true },
  ];

  const resultatData = [
    { poste: 'CHIFFRE D\'AFFAIRES', montant: 45000000, montantPrec: 38000000 },
    { poste: 'AUTRES PRODUITS', montant: 1200000, montantPrec: 900000 },
    { poste: 'TOTAL PRODUITS D\'EXPLOITATION', montant: 46200000, montantPrec: 38900000, isTotal: true },

    { poste: 'ACHATS DE MARCHANDISES', montant: 18000000, montantPrec: 15000000 },
    { poste: 'SERVICES EXTÉRIEURS', montant: 5500000, montantPrec: 4800000 },
    { poste: 'CHARGES DE PERSONNEL', montant: 12000000, montantPrec: 11000000 },
    { poste: 'IMPÔTS ET TAXES', montant: 2500000, montantPrec: 2200000 },
    { poste: 'TOTAL CHARGES D\'EXPLOITATION', montant: 38000000, montantPrec: 33000000, isTotal: true },

    { poste: 'RÉSULTAT D\'EXPLOITATION', montant: 8200000, montantPrec: 5900000, isTotal: true },
    { poste: 'RÉSULTAT FINANCIER', montant: -1200000, montantPrec: -1500000, isTotal: true },
    { poste: 'RÉSULTAT AVANT IMPÔTS (HAO)', montant: 7000000, montantPrec: 4400000, isTotal: true },
    { poste: 'IMPÔTS SUR LE RÉSULTAT', montant: 3750000, montantPrec: 1600000 },
    { poste: 'RÉSULTAT NET', montant: 3250000, montantPrec: 2800000, isGrandTotal: true },
  ];

  const formatCfa = (val: number) => val.toLocaleString('fr-FR') + ' F CFA';

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 p-1 bg-slate-800 rounded-lg">
          <button 
            onClick={() => setActiveTab('bilan-actif')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'bilan-actif' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Bilan (Actif)
          </button>
          <button 
            onClick={() => setActiveTab('bilan-passif')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'bilan-passif' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Bilan (Passif)
          </button>
          <button 
            onClick={() => setActiveTab('compte-resultat')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'compte-resultat' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Compte de Résultat
          </button>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <Filter size={16} /> Exercice 2024
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <FileText size={16} /> Imprimer Liasse Fiscale
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            {activeTab === 'bilan-actif' && (
              <tr>
                <th className="p-4 font-medium text-slate-300 w-1/3">RUBRIQUES (ACTIF)</th>
                <th className="p-4 font-medium text-slate-300 text-right">BRUT</th>
                <th className="p-4 font-medium text-slate-300 text-right">AMORT & PROV</th>
                <th className="p-4 font-bold text-white text-right">NET (Exercice N)</th>
                <th className="p-4 font-medium text-slate-400 text-right">NET (Exercice N-1)</th>
              </tr>
            )}
            {activeTab === 'bilan-passif' && (
              <tr>
                <th className="p-4 font-medium text-slate-300 w-1/2">RUBRIQUES (PASSIF)</th>
                <th className="p-4 font-bold text-white text-right">NET (Exercice N)</th>
                <th className="p-4 font-medium text-slate-400 text-right">NET (Exercice N-1)</th>
              </tr>
            )}
            {activeTab === 'compte-resultat' && (
              <tr>
                <th className="p-4 font-medium text-slate-300 w-1/2">POSTES DU COMPTE DE RÉSULTAT</th>
                <th className="p-4 font-bold text-white text-right">MONTANT (Exercice N)</th>
                <th className="p-4 font-medium text-slate-400 text-right">MONTANT (Exercice N-1)</th>
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {activeTab === 'bilan-actif' && actifData.map((row, idx) => (
              <tr key={idx} className={`${row.isGrandTotal ? 'bg-indigo-900/40 font-bold text-lg' : row.isTotal ? 'bg-slate-800/60 font-bold' : 'hover:bg-slate-800/30'}`}>
                <td className="p-4 text-slate-200">{row.poste}</td>
                <td className="p-4 text-right text-slate-400">{row.brut !== undefined ? formatCfa(row.brut) : ''}</td>
                <td className="p-4 text-right text-slate-400">{row.amort !== undefined ? formatCfa(row.amort) : ''}</td>
                <td className={`p-4 text-right ${row.isGrandTotal ? 'text-indigo-300' : 'text-emerald-400'}`}>{formatCfa(row.net)}</td>
                <td className="p-4 text-right text-slate-500">{formatCfa(row.netPrec)}</td>
              </tr>
            ))}

            {activeTab === 'bilan-passif' && passifData.map((row, idx) => (
              <tr key={idx} className={`${row.isGrandTotal ? 'bg-indigo-900/40 font-bold text-lg' : row.isTotal ? 'bg-slate-800/60 font-bold' : 'hover:bg-slate-800/30'}`}>
                <td className="p-4 text-slate-200">{row.poste}</td>
                <td className={`p-4 text-right ${row.isGrandTotal ? 'text-indigo-300' : 'text-rose-400'}`}>{formatCfa(row.net)}</td>
                <td className="p-4 text-right text-slate-500">{formatCfa(row.netPrec)}</td>
              </tr>
            ))}

            {activeTab === 'compte-resultat' && resultatData.map((row, idx) => (
              <tr key={idx} className={`${row.isGrandTotal ? 'bg-emerald-900/40 font-bold text-lg' : row.isTotal ? 'bg-slate-800/60 font-bold' : 'hover:bg-slate-800/30'}`}>
                <td className="p-4 text-slate-200">{row.poste}</td>
                <td className={`p-4 text-right ${row.isGrandTotal ? 'text-emerald-400' : row.montant < 0 ? 'text-rose-400' : 'text-slate-300'}`}>{formatCfa(row.montant)}</td>
                <td className="p-4 text-right text-slate-500">{formatCfa(row.montantPrec)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BilanResultat;
