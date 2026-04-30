import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Building2, CreditCard, Landmark, Globe, ShieldCheck, ChevronRight, MoreVertical } from 'lucide-react';

const Banques = () => {
  const [banques] = useState([
    { id: 1, nom: 'SGBS', code: 'BQ1', compteG: '512100', iban: 'SN012 01234 012345678901 23', domiciliation: 'Dakar Plateau' },
    { id: 2, nom: 'BICIS', code: 'BQ2', compteG: '512200', iban: 'SN010 05678 098765432109 87', domiciliation: 'Almadies' },
    { id: 3, nom: 'UBA', code: 'BQ3', compteG: '512300', iban: 'SN079 04321 112233445566 77', domiciliation: 'Maristes' },
  ]);

  return (
    <div className="bg-white border border-[#cbd5e1] rounded-xl p-10 shadow-sm flex flex-col h-full gap-8">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 border-b border-[#f1f5f9] pb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 text-[#005eb8] rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner group">
             <Landmark className="text-[#005eb8] group-hover:rotate-12 transition-transform" size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Gestion des Établissements Bancaires</h3>
            <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] opacity-70">Configuration des comptes • Coordination EBICS • IBAN / SWIFT</p>
          </div>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg">
            <Plus size={20} /> Nouvelle Banque
          </button>
          <div className="relative group flex-1 lg:flex-none lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#005eb8] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Chercher une banque..." 
              className="pl-12 pr-6 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#334155] placeholder:text-[#94a3b8] uppercase tracking-tight outline-none focus:border-[#005eb8] focus:bg-white transition-all w-full shadow-inner"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-[#cbd5e1] shadow-inner bg-[#f8fafc]">
        <table className="w-full text-left whitespace-nowrap border-collapse">
          <thead className="bg-white border-b-2 border-[#cbd5e1] sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Nom de l'Institution</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-center w-40">Code Journal</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-center w-40">Compte G/L</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Coordonnées (IBAN / RIB)</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Domiciliation</th>
              <th className="px-8 py-5 text-center w-32"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {banques.map((b) => (
              <tr key={b.id} className="hover:bg-white transition-all group">
                <td className="px-8 py-6 border-r border-[#f1f5f9]">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#005eb8] shadow-sm group-hover:bg-[#005eb8] group-hover:text-white transition-all">
                      <Building2 size={24} />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-[#0f172a] uppercase tracking-tighter group-hover:text-[#005eb8] transition-colors">{b.nom}</span>
                       <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1 opacity-70 italic">Établissement Principal</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 border-r border-[#f1f5f9] text-center font-mono font-bold text-[#005eb8] text-sm tracking-tighter">{b.code}</td>
                <td className="px-8 py-6 border-r border-[#f1f5f9] text-center font-mono font-bold text-[#64748b] text-xs group-hover:text-[#0f172a] transition-colors">{b.compteG}</td>
                <td className="px-8 py-6 border-r border-[#f1f5f9]">
                  <div className="flex items-center gap-3 text-[#334155] font-mono text-xs font-bold tracking-tight bg-white border border-[#cbd5e1] px-4 py-2 rounded-lg shadow-inner group-hover:border-[#005eb8] transition-all">
                    <CreditCard size={14} className="text-[#94a3b8] group-hover:text-[#005eb8]" />
                    {b.iban}
                  </div>
                </td>
                <td className="px-8 py-6 text-[#64748b] font-bold uppercase text-[10px] tracking-widest opacity-80">{b.domiciliation}</td>
                <td className="px-8 py-6">
                  <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4">
                    <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#005eb8] hover:border-[#005eb8] shadow-sm transition-all"><Edit size={16} /></button>
                    <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#dc2626] hover:border-[#dc2626] shadow-sm transition-all"><Trash2 size={16} /></button>
                    <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#0f172a] hover:border-[#0f172a] shadow-sm transition-all"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-8 bg-green-50 border border-green-100 rounded-xl flex items-center gap-8 group hover:bg-white hover:border-[#107e3e] transition-all cursor-pointer">
         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#107e3e] border border-green-100 shadow-inner group-hover:rotate-12 transition-transform">
            <Globe size={32} />
         </div>
         <div className="flex-1">
            <h4 className="text-[12px] font-bold text-[#107e3e] uppercase tracking-[0.2em] mb-1">Synchronisation EBICS & Flux Automatisés</h4>
            <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-widest opacity-80 italic leading-relaxed">
               Activez la récupération automatique des relevés bancaires journaliers via le protocole sécurisé EBICS. Intégration directe dans le module de rapprochement intelligent Joule.
            </p>
         </div>
         <ShieldCheck size={24} className="text-[#cbd5e1] group-hover:text-[#107e3e] transition-all" />
      </div>
    </div>
  );
};

export default Banques;
