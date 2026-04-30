import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Landmark, Filter, ChevronRight, Calculator, MoreVertical } from 'lucide-react';

const TauxTaxes = () => {
  const [taxes] = useState([
    { code: 'D18', intitule: 'TVA Déductible sur Achats 18%', sens: 'Déductible', taux: 18, compte: '445200' },
    { code: 'C18', intitule: 'TVA Collectée sur Ventes 18%', sens: 'Collecté', taux: 18, compte: '443100' },
    { code: 'C10', intitule: 'TVA Collectée Réduite 10%', sens: 'Collecté', taux: 10, compte: '443110' },
    { code: 'IR', intitule: 'Retenue à la Source IR', sens: 'Déductible', taux: 5, compte: '444000' },
  ]);

  return (
    <div className="bg-white border border-[#cbd5e1] rounded-xl p-10 shadow-sm flex flex-col h-full gap-8">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 border-b border-[#f1f5f9] pb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 text-[#005eb8] rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner group">
             <Calculator className="text-[#005eb8] group-hover:rotate-12 transition-transform" size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Paramétrage des Taxes & Taux</h3>
            <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] opacity-70">Configuration fiscale • Directives OHADA v2024</p>
          </div>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg">
            <Plus size={20} /> Nouveau Code Taxe
          </button>
          <div className="relative group flex-1 lg:flex-none lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#005eb8] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Chercher un code ou un compte..." 
              className="pl-12 pr-6 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#334155] placeholder:text-[#94a3b8] uppercase tracking-tight outline-none focus:border-[#005eb8] focus:bg-white transition-all w-full shadow-inner"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-[#cbd5e1] shadow-inner bg-[#f8fafc]">
        <table className="w-full text-left whitespace-nowrap border-collapse">
          <thead className="bg-white border-b-2 border-[#cbd5e1] sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] w-40">Code Taxe</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Libellé Fiscal / Intitulé</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-center w-40">Sens du Flux</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-right w-40">Valeur Taux (%)</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b] text-right w-48">Compte G/L Associé</th>
              <th className="px-8 py-5 text-center w-32"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {taxes.map((t, idx) => (
              <tr key={idx} className="hover:bg-white transition-all group">
                <td className="px-8 py-6 border-r border-[#f1f5f9]">
                  <span className="font-mono font-bold text-[#005eb8] text-sm tracking-tighter uppercase">{t.code}</span>
                </td>
                <td className="px-8 py-6 border-r border-[#f1f5f9]">
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{t.intitule}</span>
                     <span className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1">Calcul Automatique en Saisie</span>
                  </div>
                </td>
                <td className="px-8 py-6 border-r border-[#f1f5f9] text-center">
                  <span className={`px-4 py-1.5 rounded-[2rem] border text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 w-fit mx-auto shadow-sm ${
                    t.sens === 'Collecté' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-[#107e3e] border-green-100'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${t.sens === 'Collecté' ? 'bg-orange-600' : 'bg-[#107e3e]'}`} />
                    {t.sens}
                  </span>
                </td>
                <td className="px-8 py-6 text-right border-r border-[#f1f5f9]">
                  <span className="text-xl font-black text-[#0f172a] tracking-tighter">{t.taux} <span className="text-xs text-[#94a3b8]">%</span></span>
                </td>
                <td className="px-8 py-6 text-right border-r border-[#f1f5f9]">
                  <span className="font-mono font-bold text-[#64748b] text-xs group-hover:text-[#0f172a] transition-colors">{t.compte}</span>
                </td>
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

      <div className="p-8 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-8 group hover:bg-white hover:border-[#005eb8] transition-all cursor-pointer">
         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#005eb8] border border-blue-100 shadow-inner group-hover:rotate-12 transition-transform">
            <Landmark size={32} />
         </div>
         <div className="flex-1">
            <h4 className="text-[12px] font-bold text-[#005eb8] uppercase tracking-[0.2em] mb-1">Liaison Plan Comptable & États de TVA</h4>
            <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-widest opacity-80 italic leading-relaxed">
               Chaque code taxe est lié dynamiquement aux rubriques de la déclaration de TVA (G50 / CA3). Toute modification ici impacte l'ensemble des journaux en temps réel.
            </p>
         </div>
         <ChevronRight size={24} className="text-[#cbd5e1] group-hover:text-[#005eb8] transition-all" />
      </div>
    </div>
  );
};

export default TauxTaxes;
