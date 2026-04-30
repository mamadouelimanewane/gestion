import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, Tag, DollarSign, ListFilter, Database, Layers, ShieldCheck, Zap, MoreVertical, ChevronRight, History, Printer, Share2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    { date: '10/11/2024', journal: 'ACH', piece: 'FAC-F22', compte: '4010001', libelle: 'Achat Matériel Info (Serveurs)', debit: 0, credit: 850000 },
    { date: '15/11/2024', journal: 'BQ1', piece: 'CHQ-885', compte: '4010001', libelle: 'Chèque Fournisseur Tech (SGB)', debit: 400000, credit: 0 },
  ]);

  const formatCfa = (val: number) => {
    if (val === 0) return '—';
    return val.toLocaleString('fr-FR') + ' F';
  };

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <Search size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Moteur de Recherche Multicritère</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Extraction des Flux G/L • Audit de Transactions • OHADA v2024</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-sm">
              <ListFilter size={18} /> Reset
           </button>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <Download size={18} /> Exporter Rapport
           </button>
        </div>
      </div>

      {/* Advanced Filter Grid (Crystal White Style) */}
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <FilterBox icon={<Calendar size={14} />} label="Horizon Temporel">
           <select className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner appearance-none cursor-pointer">
              <option>Ce mois-ci (M)</option>
              <option>Mois précédent (M-1)</option>
              <option>Exercice complet (Y)</option>
              <option>Période Personnalisée</option>
           </select>
        </FilterBox>
        <FilterBox icon={<Tag size={14} />} label="Journal Source">
           <select className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner appearance-none cursor-pointer">
              <option>Tous les Journaux</option>
              <option>ACH - Achats</option>
              <option>VTE - Ventes</option>
              <option>BQ1 - Banque SGB</option>
           </select>
        </FilterBox>
        <FilterBox icon={<Database size={14} />} label="Référentiel Compte">
           <input type="text" placeholder="N° Compte ERP..." className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-mono font-black text-[#005eb8] placeholder:text-[#94a3b8] uppercase focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner" />
        </FilterBox>
        <FilterBox icon={<DollarSign size={14} />} label="Plancher (Min)">
           <input type="number" placeholder="0 F" className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-black text-right text-[#334155] focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner" />
        </FilterBox>
        <FilterBox icon={<DollarSign size={14} />} label="Plafond (Max)">
           <input type="number" placeholder="∞" className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-black text-right text-[#334155] focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner" />
        </FilterBox>
        <FilterBox icon={<Zap size={14} />} label="Mots-clés / Libellé">
           <input type="text" placeholder="FAC, VIR, CHE..." className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-black text-[#334155] placeholder:text-[#94a3b8] uppercase focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner" />
        </FilterBox>
      </div>

      {/* Results Table Container */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[500px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Extraction des Écritures Correspondantes</h3>
           </div>
           <div className="flex gap-6">
              <div className="flex items-center gap-3 px-6 py-2 bg-white border border-[#cbd5e1] rounded-xl shadow-sm">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#005eb8] shadow-sm animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase text-[#005eb8] tracking-widest">{resultats.length} Résultats trouvés</span>
              </div>
              <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#005eb8] shadow-sm transition-all">
                 <Printer size={18} />
              </button>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-5">Date</th>
                <th className="px-10 py-5 text-center">JNL</th>
                <th className="px-10 py-5">Pièce</th>
                <th className="px-10 py-5">Compte G/L</th>
                <th className="px-10 py-5">Libellé de l'Écriture</th>
                <th className="px-10 py-5 text-right">Débit (+)</th>
                <th className="px-10 py-5 text-right">Crédit (-)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {resultats.map((r, idx) => (
                <tr key={idx} className="group hover:bg-blue-50/20 transition-all cursor-pointer">
                  <td className="px-10 py-6 border-r border-[#f1f5f9] font-mono font-bold text-[11px] text-[#64748b] tracking-tighter uppercase">{r.date}</td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9] text-center">
                     <span className="px-3 py-1 bg-[#f8fafc] border border-[#cbd5e1] text-[#94a3b8] text-[9px] font-black rounded-lg uppercase tracking-widest group-hover:text-[#005eb8] transition-colors">{r.journal}</span>
                  </td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9] font-black text-[#005eb8] text-xs uppercase tracking-tight group-hover:underline">{r.piece}</td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9] font-mono font-bold text-[#334155] text-sm tracking-tighter">{r.compte}</td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9] text-xs font-bold text-[#334155] uppercase tracking-tight truncate max-w-[250px]">{r.libelle}</td>
                  <td className="px-10 py-6 text-right font-black text-[#107e3e] text-base tracking-tighter border-r border-[#f1f5f9] bg-green-50/5">{formatCfa(r.debit)}</td>
                  <td className="px-10 py-6 text-right font-black text-[#dc2626] text-base tracking-tighter bg-red-50/5">{formatCfa(r.credit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Synthesis Footer (SAP Style) */}
        <div className="bg-[#0f172a] text-white p-10 flex flex-col md:flex-row justify-between items-center gap-10 shadow-[0_-10px_30px_rgba(0,0,0,0.2)] z-30">
           <div className="flex items-center gap-8 border-r border-slate-800 pr-10 h-full">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                 <Zap size={24} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Totalisation des Résultats</span>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Données consolidées multicritères</p>
              </div>
           </div>
           
           <div className="flex gap-20 items-center">
              <div className="flex flex-col items-end">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Cumul Débit</span>
                 <span className="text-4xl font-black text-blue-400 tracking-tighter">2 030 000 <span className="text-sm font-bold opacity-50 uppercase tracking-widest ml-2">F CFA</span></span>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Cumul Crédit</span>
                 <span className="text-4xl font-black text-blue-400 tracking-tighter">2 030 000 <span className="text-sm font-bold opacity-50 uppercase tracking-widest ml-2">F CFA</span></span>
              </div>
           </div>

           <button className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-4">
              <Share2 size={20} />
              Partager la Vue
           </button>
        </div>
      </div>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={28} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Indexation des Écritures Instantanée</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Base de données hautement performante (High-Performance Computing) • Requêtes multi-indexées certifiées.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <History size={20} className="group-hover:rotate-[-45deg] transition-transform" /> Historique Requêtes
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Printer size={20} className="group-hover:scale-110 transition-transform" /> Impression Liste
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

const FilterBox = ({ icon, label, children }: any) => (
  <div className="flex flex-col gap-3">
     <label className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em] flex items-center gap-3">
        <div className="text-[#cbd5e1]">{icon}</div>
        {label}
     </label>
     {children}
  </div>
);

export default RechercheEcritures;
