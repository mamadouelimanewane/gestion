import React, { useState } from 'react';
import { Search, Filter, Lock, Unlock, AlertTriangle, Info, CheckCircle2, MoreVertical, Database, Calendar, History, Printer, Download, Share2, ArrowRight, Layers, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClotureJournaux = () => {
  const [journaux, setJournaux] = useState([
    { code: 'ACH', intitule: 'Achats / Fournisseurs Locaux', periode: 'Novembre 2024', statut: 'Ouvert', entries: 1240 },
    { code: 'VTE', intitule: 'Ventes / Clients Export', periode: 'Novembre 2024', statut: 'Ouvert', entries: 3580 },
    { code: 'BQ1', intitule: 'Banque Société Générale (SGBS)', periode: 'Novembre 2024', statut: 'Ouvert', entries: 850 },
    { code: 'ACH', intitule: 'Achats / Fournisseurs Locaux', periode: 'Octobre 2024', statut: 'Clôturé', entries: 1100 },
    { code: 'VTE', intitule: 'Ventes / Clients Export', periode: 'Octobre 2024', statut: 'Clôturé', entries: 3200 },
    { code: 'BQ1', intitule: 'Banque Société Générale (SGBS)', periode: 'Octobre 2024', statut: 'Clôturé', entries: 780 },
  ]);

  const toggleStatut = (idx: number) => {
    const updated = [...journaux];
    updated[idx].statut = updated[idx].statut === 'Ouvert' ? 'Clôturé' : 'Ouvert';
    setJournaux(updated);
  };

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#dc2626] flex items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:rotate-6 transition-transform">
              <Lock size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Clôture & Verrouillage des Journaux</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Arrêté des Périodes Comptables • Intégrité SAP ACDOCA • Certification Finale</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <div className="flex items-center gap-4 px-6 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl shadow-inner">
              <Calendar size={18} className="text-[#94a3b8]" />
              <span className="text-[11px] font-black text-[#334155] uppercase tracking-widest">Novembre 2024 (M)</span>
           </div>
           <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-sm">
              <Filter size={18} /> Période
           </button>
        </div>
      </div>

      {/* Irreversible Warning Area (Morning Horizon Alert Style) */}
      <div className="bg-orange-50 border border-orange-100 p-8 rounded-2xl flex items-center gap-8 shadow-sm group hover:bg-white hover:border-orange-600 transition-all cursor-pointer relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-600 border border-orange-200 shadow-sm group-hover:scale-110 transition-transform relative z-10">
            <AlertTriangle size={32} />
         </div>
         <div className="flex-1 relative z-10">
            <h5 className="text-sm font-black text-orange-700 uppercase tracking-widest mb-1">Protocole de Verrouillage Définitif</h5>
            <p className="text-[11px] text-orange-800 font-medium leading-relaxed uppercase tracking-tight opacity-80 max-w-4xl">
               La clôture d'un journal empêche toute modification, suppression ou ajout d'écriture pour la période sélectionnée. 
               Veuillez certifier que tous les brouillards ont été validés et que le rapprochement bancaire est finalisé. 
               Cette action est irréversible sans validation hiérarchique (CFO/Auditeur).
            </p>
         </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[500px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Grille d'Administration des Périodes par Journal</h3>
           </div>
           <div className="flex gap-6">
              <div className="flex items-center gap-3 px-6 py-2 bg-white border border-[#cbd5e1] rounded-xl shadow-sm">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#107e3e] shadow-sm animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase text-[#107e3e] tracking-widest">Contrôle d'Intégrité Actif</span>
              </div>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-6 w-48">Période Fiscale</th>
                <th className="px-10 py-6 w-32">Code ERP</th>
                <th className="px-10 py-6">Désignation du Registre Auxiliaire</th>
                <th className="px-10 py-6 text-center">Volume Écritures</th>
                <th className="px-10 py-6 text-center">Statut Actuel</th>
                <th className="px-10 py-6 text-right">Actions d'Administration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {journaux.map((j, idx) => (
                <tr key={idx} className="group hover:bg-blue-50/10 transition-all cursor-pointer">
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                     <span className="text-[11px] font-black text-[#334155] uppercase tracking-[0.2em]">{j.periode}</span>
                  </td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                     <span className="font-mono font-black text-lg text-[#005eb8] tracking-tighter group-hover:scale-110 transition-transform origin-left block">{j.code}</span>
                  </td>
                  <td className="px-10 py-6 border-r border-[#f1f5f9]">
                     <div className="flex flex-col">
                        <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover:text-[#0f172a] transition-colors">{j.intitule}</span>
                        <span className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest mt-1 opacity-60 italic">Référentiel des écritures validées</span>
                     </div>
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9] font-black text-[#334155] text-xs tracking-widest">
                     {j.entries.toLocaleString()} <span className="text-[9px] opacity-40">Mvts</span>
                  </td>
                  <td className="px-10 py-6 text-center border-r border-[#f1f5f9]">
                    <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-[2rem] text-[9px] font-black uppercase tracking-widest border shadow-sm transition-all ${
                      j.statut === 'Ouvert' ? 'bg-green-50 text-[#107e3e] border-green-200' : 'bg-red-50 text-[#dc2626] border-red-200'
                    }`}>
                      {j.statut === 'Ouvert' ? <Unlock size={14} /> : <Lock size={14} />}
                      {j.statut}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleStatut(idx); }}
                      className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-md ${
                        j.statut === 'Ouvert' ? 'bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-red-500/20' : 'bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] border border-[#cbd5e1]'
                      }`}
                    >
                      {j.statut === 'Ouvert' ? 'Clôturer Période' : 'Demander Réouverture'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Synthèse Footer (Morning Horizon Style) */}
      <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl flex items-center gap-8 shadow-sm group hover:bg-white hover:border-[#005eb8] transition-all cursor-pointer">
         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#005eb8] border border-blue-200 shadow-sm group-hover:rotate-12 transition-transform">
            <Zap size={32} />
         </div>
         <div className="flex-1">
            <h5 className="text-sm font-black text-[#0f172a] uppercase tracking-widest mb-1">Génération du Rapport Centralisateur de Clôture</h5>
            <p className="text-[11px] text-[#64748b] font-medium leading-relaxed uppercase tracking-tight opacity-80 max-w-4xl">
               Avant le verrouillage global, générez le journal centralisateur consolidé et l'état de lettrage complet pour validation par le CFO. 
               Le rapport certifie que le solde des journaux auxiliaires correspond au Grand-Livre Statutaire.
            </p>
         </div>
         <button className="px-8 py-3 bg-white border border-[#cbd5e1] text-[#005eb8] hover:text-[#0f172a] hover:border-[#005eb8] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-3">
            <Printer size={18} /> Imprimer Synthèse
         </button>
      </div>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={28} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Souveraineté des Données & Piste d'Audit</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic leading-relaxed">
                  L'intégrité de la période est verrouillée par Joule AI Financial Compliance • Empreinte temporelle certifiée (Blockchain-like audit trail).
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <History size={20} className="group-hover:rotate-[-45deg] transition-transform" /> Logs Verrouillage
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={20} className="group-hover:rotate-12 transition-transform" /> Certifier Période
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default ClotureJournaux;
