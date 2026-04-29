import React from 'react';
import { ShoppingBag, Truck, CreditCard, Clock, Search, Plus } from 'lucide-react';

const PurchasesModule = () => {
  const purchases = [
    { id: 'COM-2024-089', provider: 'Fournisseur Global', date: '2024-04-20', total: '4,500.00 €', status: 'Livré' },
    { id: 'COM-2024-092', provider: 'Office Supplies', date: '2024-04-22', total: '120.00 €', status: 'En transit' },
    { id: 'COM-2024-095', provider: 'Tech Partner', date: '2024-04-25', total: '12,000.00 €', status: 'Payé' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Commandes en cours', value: '5', icon: Clock, color: 'indigo' },
          { label: 'Livraisons attendues', value: '2', icon: Truck, color: 'amber' },
          { label: 'Total Achats Mois', value: '18,620 €', icon: ShoppingBag, color: 'emerald' },
          { label: 'À Régler', value: '4,620 €', icon: CreditCard, color: 'rose' },
        ].map((stat, i) => (
          <div key={i} className="card !p-4 flex flex-col gap-2">
            <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-400`}>
              <stat.icon size={18} />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">{stat.label}</p>
            <h4 className="text-lg font-bold">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 bg-slate-800/30 px-4 py-2 rounded-xl border border-slate-700/30 w-80">
          <Search size={16} className="text-slate-500" />
          <input type="text" placeholder="Rechercher un fournisseur ou une commande..." className="bg-transparent border-none outline-none text-xs w-full" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/20">
          <Plus size={16} /> Nouvel Achat
        </button>
      </div>

      <div className="card !p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700/50">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">ID Commande</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Fournisseur</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Montant</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {purchases.map((p) => (
              <tr key={p.id} className="hover:bg-slate-800/30 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-mono text-indigo-400 text-xs font-bold">{p.id}</td>
                <td className="px-6 py-4 font-medium">{p.provider}</td>
                <td className="px-6 py-4 text-xs text-slate-500">{p.date}</td>
                <td className="px-6 py-4 text-right font-bold text-slate-300">{p.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase border ${
                    p.status === 'Payé' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                    p.status === 'Livré' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasesModule;
