import { Search, Filter, Download, FileSpreadsheet } from 'lucide-react';
import { exportToPDF, exportToExcel } from './ExportService';

const Balance = () => {
  const [balanceData] = useState([
    { compte: '411000', intitule: 'Clients', debitInit: 150000, creditInit: 0, debitMvmt: 50000, creditMvmt: 20000, debitSolde: 180000, creditSolde: 0 },
    { compte: '401000', intitule: 'Fournisseurs', debitInit: 0, creditInit: 80000, debitMvmt: 30000, creditMvmt: 40000, debitSolde: 0, creditSolde: 90000 },
    { compte: '512000', intitule: 'Banques', debitInit: 250000, creditInit: 0, debitMvmt: 120000, creditMvmt: 80000, debitSolde: 290000, creditSolde: 0 },
    { compte: '701000', intitule: 'Ventes de produits finis', debitInit: 0, creditInit: 500000, debitMvmt: 0, creditMvmt: 150000, debitSolde: 0, creditSolde: 650000 },
    { compte: '601000', intitule: 'Achats stockés', debitInit: 180000, creditInit: 0, debitMvmt: 60000, creditMvmt: 0, debitSolde: 240000, creditSolde: 0 },
  ]);

  const formatCurrency = (val: number) => {
    if (val === 0) return '-';
    return val.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' });
  };

  const handleExportPDF = () => {
    const headers = [['Compte', 'Intitulé', 'Débit Init.', 'Crédit Init.', 'Débit Mvmt.', 'Crédit Mvmt.', 'Débit Solde', 'Crédit Solde']];
    const data = balanceData.map(l => [
      l.compte, l.intitule, l.debitInit, l.creditInit, l.debitMvmt, l.creditMvmt, l.debitSolde, l.creditSolde
    ]);
    exportToPDF('Balance Générale des Comptes', headers, data, 'Balance_Comptable');
  };

  const handleExportExcel = () => {
    exportToExcel(balanceData, 'Balance_Comptable');
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Balance Générale des Comptes</h3>
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <Filter size={16} /> Filtres
          </button>
          <button onClick={handleExportPDF} className="btn btn-secondary flex items-center gap-2">
            <Download size={16} /> PDF
          </button>
          <button onClick={handleExportExcel} className="btn btn-primary flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <FileSpreadsheet size={16} /> Excel
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-3 font-medium text-slate-300 border-b border-slate-700" rowSpan={2}>Compte</th>
              <th className="p-3 font-medium text-slate-300 border-b border-r border-slate-700" rowSpan={2}>Intitulé</th>
              <th className="p-2 font-medium text-slate-300 text-center border-b border-r border-slate-700" colSpan={2}>Soldes Initiaux</th>
              <th className="p-2 font-medium text-slate-300 text-center border-b border-r border-slate-700" colSpan={2}>Mouvements Période</th>
              <th className="p-2 font-medium text-slate-300 text-center border-b border-slate-700" colSpan={2}>Soldes Finaux</th>
            </tr>
            <tr>
              <th className="p-2 font-medium text-slate-400 text-right border-b border-slate-700">Débit</th>
              <th className="p-2 font-medium text-slate-400 text-right border-b border-r border-slate-700">Crédit</th>
              <th className="p-2 font-medium text-slate-400 text-right border-b border-slate-700">Débit</th>
              <th className="p-2 font-medium text-slate-400 text-right border-b border-r border-slate-700">Crédit</th>
              <th className="p-2 font-medium text-slate-400 text-right border-b border-slate-700">Débit</th>
              <th className="p-2 font-medium text-slate-400 text-right border-b border-slate-700">Crédit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {balanceData.map((ligne, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-indigo-300">{ligne.compte}</td>
                <td className="p-3 font-medium text-slate-200 border-r border-slate-700/50">{ligne.intitule}</td>
                
                <td className="p-3 text-right text-slate-300">{formatCurrency(ligne.debitInit)}</td>
                <td className="p-3 text-right text-slate-300 border-r border-slate-700/50">{formatCurrency(ligne.creditInit)}</td>
                
                <td className="p-3 text-right text-slate-300">{formatCurrency(ligne.debitMvmt)}</td>
                <td className="p-3 text-right text-slate-300 border-r border-slate-700/50">{formatCurrency(ligne.creditMvmt)}</td>
                
                <td className="p-3 text-right font-medium text-indigo-300">{formatCurrency(ligne.debitSolde)}</td>
                <td className="p-3 text-right font-medium text-indigo-300">{formatCurrency(ligne.creditSolde)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-800/90 font-bold sticky bottom-0">
            <tr>
              <td colSpan={2} className="p-3 text-right border-r border-slate-700/50">TOTAUX GÉNÉRAUX</td>
              <td className="p-3 text-right text-emerald-400">{formatCurrency(580000)}</td>
              <td className="p-3 text-right text-emerald-400 border-r border-slate-700/50">{formatCurrency(580000)}</td>
              <td className="p-3 text-right text-emerald-400">{formatCurrency(260000)}</td>
              <td className="p-3 text-right text-emerald-400 border-r border-slate-700/50">{formatCurrency(260000)}</td>
              <td className="p-3 text-right text-emerald-400">{formatCurrency(710000)}</td>
              <td className="p-3 text-right text-emerald-400">{formatCurrency(710000)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Balance;
