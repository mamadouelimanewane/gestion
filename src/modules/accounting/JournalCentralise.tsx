import React, { useState } from 'react';
import { Search, Filter, Download, List } from 'lucide-react';

const JournalCentralise = () => {
  const [data] = useState([
    { mois: 'Janvier 2024', journal: 'Achats', debit: 4500000, credit: 4500000 },
    { mois: 'Janvier 2024', journal: 'Ventes', debit: 12800000, credit: 12800000 },
    { mois: 'Janvier 2024', journal: 'Banque SGBS', debit: 8400000, credit: 8400000 },
    { mois: 'Février 2024', journal: 'Achats', debit: 3200000, credit: 3200000 },
    { mois: 'Février 2024', journal: 'Ventes', debit: 15600000, credit: 15600000 },
    { mois: 'Février 2024', journal: 'Banque SGBS', debit: 9200000, credit: 9200000 },
  ]);

  const totalDebit = data.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = data.reduce((sum, item) => sum + item.credit, 0);

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-[#cbd5e1] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-[#005eb8] rounded-2xl border border-blue-100 shadow-inner">
            <List size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0f172a] uppercase tracking-tight">Journal Centralisé</h3>
            <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-widest">Récapitulatif mensuel par code journal</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#f1f5f9] border border-[#cbd5e1] rounded-lg text-[11px] font-bold text-[#64748b] hover:text-[#0f172a] transition-all shadow-sm">
            <Filter size={16} /> Période
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-[#005eb8] hover:bg-[#004080] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all shadow-md">
            <Download size={16} /> Exporter PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex-1">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-[#f8fafc] border-b border-[#cbd5e1]">
            <tr>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Période (Mois)</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Journal</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-[#64748b] text-right">Total Débit</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-[#64748b] text-right">Total Crédit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-6 text-xs font-bold text-[#334155] uppercase">{item.mois}</td>
                <td className="p-6 font-bold text-[#005eb8] uppercase text-xs tracking-tight">{item.journal}</td>
                <td className="p-6 text-right font-bold text-[#107e3e] text-sm">
                  {item.debit.toLocaleString()} F CFA
                </td>
                <td className="p-6 text-right font-bold text-[#107e3e] text-sm">
                  {item.credit.toLocaleString()} F CFA
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[#f8fafc] border-t border-[#cbd5e1] font-bold">
            <tr>
              <td colSpan={2} className="p-6 text-right text-[#0f172a] uppercase text-xs tracking-widest">TOTAUX GÉNÉRAUX</td>
              <td className="p-6 text-right text-[#005eb8] text-sm">{totalDebit.toLocaleString()} F CFA</td>
              <td className="p-6 text-right text-[#005eb8] text-sm">{totalCredit.toLocaleString()} F CFA</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default JournalCentralise;
