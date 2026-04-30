import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Type, Database, Info, MoreVertical, ChevronRight } from 'lucide-react';

const LibellesAuto = () => {
  const [libelles] = useState([
    { id: 1, code: 'FAC', intitule: 'Facture N° [PIECE] - [TIERS]', usage: 'Journal Ventes' },
    { id: 2, code: 'REGT', intitule: 'Règlement Facture [PIECE] / [TIERS]', usage: 'Journal Trésorerie' },
    { id: 3, code: 'SAL', intitule: 'Salaire mois de [MOIS] - [LIBELLE]', usage: 'Journal OD' },
    { id: 4, code: 'ACH', intitule: 'Achat Fournisseur [TIERS] - [PIECE]', usage: 'Journal Achats' },
  ]);

  return (
    <div className="bg-white border border-[#cbd5e1] rounded-xl p-10 shadow-sm flex flex-col h-full gap-8">
      <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-blue-50 text-[#005eb8] rounded-2xl border border-blue-100 shadow-inner group">
            <Type size={32} className="group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-2">Libellés Automatiques (Variables)</h3>
            <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] opacity-70 italic">Paramétrage des schémas de texte pour une saisie assistée</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-8 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg">
            <Plus size={20} /> Nouveau Modèle
          </button>
        </div>
      </div>

      <div className="bg-[#f8fafc] border-2 border-dashed border-[#cbd5e1] p-8 rounded-xl flex flex-col gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-4 text-[#005eb8] relative z-10">
           <Database size={20} />
           <h4 className="text-[12px] font-bold uppercase tracking-[0.2em]">Variables Dynamiques Disponibles</h4>
        </div>
        <div className="flex flex-wrap gap-4 relative z-10">
          {['[PIECE]', '[TIERS]', '[MOIS]', '[JOUR]', '[ANNEE]', '[COMPTE]', '[LIBELLE]'].map(v => (
            <span key={v} className="px-4 py-2 bg-white border border-[#cbd5e1] text-[#005eb8] rounded-lg font-mono text-[11px] font-black shadow-sm hover:border-[#005eb8] transition-all cursor-default">
              {v}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
           <Info size={14} /> Ces variables seront remplacées en temps réel lors de la saisie assistée par Joule AI.
        </p>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-[#cbd5e1] shadow-inner bg-[#f8fafc]">
        <table className="w-full text-left whitespace-nowrap border-collapse">
          <thead className="bg-white border-b-2 border-[#cbd5e1] sticky top-0 z-10">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] w-40">Code Technique</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Schéma de Libellé Paramétré</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-center w-48">Journal Cible</th>
              <th className="px-8 py-5 text-center w-32"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {libelles.map((l) => (
              <tr key={l.id} className="hover:bg-white transition-all group">
                <td className="px-8 py-6 border-r border-[#f1f5f9]">
                   <span className="font-mono font-bold text-[#005eb8] text-sm tracking-tighter uppercase">{l.code}</span>
                </td>
                <td className="px-8 py-6 border-r border-[#f1f5f9]">
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{l.intitule}</span>
                      <div className="flex items-center gap-2 mt-2 opacity-50">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#005eb8]"></div>
                         <span className="text-[9px] font-bold text-[#64748b] uppercase tracking-widest">Format Dynamique Actif</span>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6 border-r border-[#f1f5f9] text-center">
                  <span className="px-4 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] text-[#64748b] font-bold rounded-[2rem] text-[9px] uppercase tracking-widest shadow-sm group-hover:bg-blue-50 group-hover:text-[#005eb8] group-hover:border-blue-200 transition-all">
                    {l.usage}
                  </span>
                </td>
                <td className="px-8 py-6">
                   <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#005eb8] hover:border-[#005eb8] shadow-sm transition-all">
                        <Edit size={16} />
                      </button>
                      <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#dc2626] hover:border-[#dc2626] shadow-sm transition-all">
                        <Trash2 size={16} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibellesAuto;
