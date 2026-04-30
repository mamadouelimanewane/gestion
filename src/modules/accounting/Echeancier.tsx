import React, { useState } from 'react';
import { Search, Filter, Calendar, DollarSign, ArrowRight, CheckCircle2, TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Echeancier = () => {
  const [echeances] = useState([
    { id: 1, date: '05/12/2024', tiers: 'FOURNISSEUR TECH-PLUS SA', piece: 'FAC-889', montant: 850000, statut: 'À payer', priority: 'Haute' },
    { id: 2, date: '10/12/2024', tiers: 'CLIENT ALPHA SERVICES', piece: 'FAC-4501', montant: 1180000, statut: 'À encaisser', priority: 'Normale' },
    { id: 3, date: '15/12/2024', tiers: 'LOYER BUREAU (PLATEAU)', piece: 'LOY-DEC', montant: 450000, statut: 'À payer', priority: 'Urgent' },
    { id: 4, date: '20/12/2024', tiers: 'SONATEL ORANGE SN', piece: 'TEL-88', montant: 85000, statut: 'À payer', priority: 'Normale' },
  ]);

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-white p-8 rounded-xl border border-[#cbd5e1] shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-blue-50 text-[#005eb8] rounded-2xl border border-blue-100 flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
            <Calendar size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Échéancier de Trésorerie</h3>
            <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Planification des flux • Encaissements & Décaissements prévisionnels</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
          <button className="flex items-center gap-3 px-6 py-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[11px] font-bold text-[#64748b] uppercase tracking-widest hover:text-[#005eb8] hover:border-blue-100 transition-all shadow-sm">
            <Filter size={18} /> Filtre Hebdomadaire
          </button>
          <button className="flex items-center gap-3 px-8 py-2.5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all shadow-lg">
            <DollarSign size={20} /> Planifier les Règlements
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          title="Encaissements Attendus" 
          value="1 180 000 F" 
          percentage={65} 
          color="green" 
          icon={<TrendingUp size={24} />} 
          sub="3 Factures Clients" 
        />
        <StatCard 
          title="Décaissements Prévus" 
          value="1 385 000 F" 
          percentage={75} 
          color="red" 
          icon={<TrendingDown size={24} />} 
          sub="5 Factures Fournisseurs" 
        />
        <StatCard 
          title="Position de Trésorerie" 
          value="-205 000 F" 
          percentage={10} 
          color="blue" 
          icon={<Activity size={24} />} 
          sub="Solde Net Périodique" 
        />
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex-1 flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Échéance</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Tiers / Bénéficiaire</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">N° de Pièce</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-right">Montant (F CFA)</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-center">Nature du Flux</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {echeances.map((e) => (
                <tr key={e.id} className="group hover:bg-blue-50/30 transition-all cursor-pointer">
                  <td className="px-8 py-5 border-r border-[#f1f5f9]">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full shadow-inner ${e.statut === 'À encaisser' ? 'bg-[#107e3e] shadow-green-500/20' : 'bg-[#dc2626] shadow-red-500/20'}`}></div>
                      <span className="font-mono font-bold text-[#334155] text-sm tracking-tighter uppercase">{e.date}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 border-r border-[#f1f5f9]">
                    <div className="flex flex-col">
                       <span className="font-bold text-[#0f172a] uppercase text-xs tracking-tight group-hover:text-[#005eb8] transition-colors">{e.tiers}</span>
                       <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1 opacity-70">Priorité : {e.priority}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-mono text-[11px] font-bold text-[#64748b] uppercase tracking-widest border-r border-[#f1f5f9]">{e.piece}</td>
                  <td className={`px-8 py-5 text-right font-bold text-base tracking-tighter border-r border-[#f1f5f9] ${e.statut === 'À encaisser' ? 'text-[#107e3e]' : 'text-[#dc2626]'}`}>
                    {e.montant.toLocaleString()}
                  </td>
                  <td className="px-8 py-5 text-center border-r border-[#f1f5f9]">
                    <span className={`px-3 py-1 rounded border text-[9px] font-bold uppercase tracking-widest ${
                      e.statut === 'À encaisser' ? 'bg-green-50 text-[#107e3e] border-green-200' : 'bg-red-50 text-[#dc2626] border-red-200'
                    }`}>
                      {e.statut}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button className="p-3 bg-white border border-[#cbd5e1] text-[#94a3b8] hover:text-[#005eb8] hover:border-blue-100 rounded-xl transition-all shadow-sm">
                      <CheckCircle2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer System Integrity */}
      <div className="flex justify-between items-center px-8 py-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl shadow-inner">
         <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
            <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-[0.2em] leading-none">Analyse de trésorerie mise à jour à {(new Date()).toLocaleTimeString()} • Synchronisation ERP 100%</p>
         </div>
         <div className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] transition-colors text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer">
            <Clock size={16} /> Historique des règlements
         </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, percentage, color, icon, sub }: any) => (
  <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 shadow-sm hover:border-[#005eb8] transition-all group relative overflow-hidden cursor-pointer">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${color === 'green' ? 'bg-[#107e3e]' : color === 'red' ? 'bg-[#dc2626]' : 'bg-[#005eb8]'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-6">
       <div>
          <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-[0.2em] leading-none mb-3">{title}</p>
          <p className={`text-3xl font-bold tracking-tighter ${color === 'green' ? 'text-[#107e3e]' : color === 'red' ? 'text-[#dc2626]' : 'text-[#0f172a]'}`}>{value}</p>
       </div>
       <div className={`p-4 rounded-2xl border shadow-inner transition-transform group-hover:scale-110 ${
         color === 'green' ? 'bg-green-50 text-[#107e3e] border-green-100' : 
         color === 'red' ? 'bg-red-50 text-[#dc2626] border-red-100' : 
         'bg-blue-50 text-[#005eb8] border-blue-100'
       }`}>
          {icon}
       </div>
    </div>
    <div className="space-y-3">
       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
          <span>Consommation de flux</span>
          <span>{percentage}%</span>
       </div>
       <div className="w-full bg-[#f1f5f9] h-2.5 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className={`h-full shadow-lg ${color === 'green' ? 'bg-[#107e3e]' : color === 'red' ? 'bg-[#dc2626]' : 'bg-[#005eb8]'}`} 
          />
       </div>
       <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-2 opacity-70 italic">{sub}</p>
    </div>
  </div>
);

export default Echeancier;
