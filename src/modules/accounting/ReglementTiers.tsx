import React, { useState } from 'react';
import { Search, Save, Trash2, Plus, DollarSign, User, Database, Layers, ShieldCheck, Zap, MoreVertical, ChevronRight, History, Printer, Download, Share2, ArrowRight, CreditCard, Landmark, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReglementTiers = () => {
  const [lignes, setLignes] = useState([
    { id: 1, tiers: 'CLIENT ALPHA SÉNÉGAL SA', compte: '4110001', facture: 'FAC-4501', montant: 1180000, mode: 'Virement', banque: 'SOCIÉTÉ GÉNÉRALE' },
  ]);

  const addLigne = () => {
    setLignes([...lignes, { id: Date.now(), tiers: '', compte: '', facture: '', montant: 0, mode: 'Virement', banque: 'SOCIÉTÉ GÉNÉRALE' }]);
  };

  const removeLigne = (id: number) => {
    setLignes(lignes.filter(l => l.id !== id));
  };

  const total = lignes.reduce((sum, l) => sum + Number(l.montant), 0);

  const formatCfa = (val: number) => {
    return val.toLocaleString('fr-FR') + ' F';
  };

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <DollarSign size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Règlement & Encaissement de Tiers</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Saisie des Flux de Trésorerie Auxiliaires • Postes Ouverts • OHADA v2024</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#cbd5e1] text-[#64748b] hover:text-[#0f172a] rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-sm">
              <Download size={18} /> Importer Relevé
           </button>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <Save size={18} /> Enregistrer
           </button>
        </div>
      </div>

      {/* Main Grid Entry Area */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[500px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Grille de Saisie de Règlement Multiple</h3>
           </div>
           <div className="flex gap-6">
              <button 
                onClick={addLigne}
                className="flex items-center gap-3 px-6 py-2 bg-white border border-[#cbd5e1] rounded-xl shadow-sm text-[10px] font-black uppercase text-[#005eb8] hover:bg-blue-50 transition-all"
              >
                 <Plus size={16} /> Ajouter une Ligne
              </button>
           </div>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead className="bg-[#f8fafc] border-b-2 border-[#cbd5e1] text-[10px] font-bold uppercase text-[#64748b] tracking-[0.2em] sticky top-[72px] z-20 shadow-sm">
              <tr>
                <th className="px-10 py-6">Tiers / Référence Compte</th>
                <th className="px-10 py-6 w-56">Référence Facture</th>
                <th className="px-10 py-6 w-56 text-right">Montant (F CFA)</th>
                <th className="px-10 py-6 w-56">Mode de Paiement</th>
                <th className="px-10 py-6 w-56">Établissement / Banque</th>
                <th className="px-10 py-6 w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {lignes.map((l, idx) => (
                <tr key={l.id} className="group hover:bg-blue-50/10 transition-all">
                  <td className="px-10 py-4 border-r border-[#f1f5f9]">
                    <div className="relative group/input">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within/input:text-[#005eb8] transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Rechercher entité..."
                        defaultValue={l.tiers}
                        className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-black text-[#0f172a] uppercase tracking-tight focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner"
                      />
                    </div>
                  </td>
                  <td className="px-10 py-4 border-r border-[#f1f5f9]">
                    <div className="relative group/input">
                      <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                      <input 
                        type="text" 
                        defaultValue={l.facture} 
                        placeholder="N° FAC..." 
                        className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-mono font-black text-[#005eb8] uppercase focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner" 
                      />
                    </div>
                  </td>
                  <td className="px-10 py-4 border-r border-[#f1f5f9]">
                    <div className="relative group/input">
                      <input 
                        type="number" 
                        defaultValue={l.montant} 
                        className="w-full px-6 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-lg font-black text-[#107e3e] text-right tracking-tighter focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner" 
                      />
                    </div>
                  </td>
                  <td className="px-10 py-4 border-r border-[#f1f5f9]">
                    <select className="w-full px-6 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-black text-[#334155] uppercase tracking-widest focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner appearance-none cursor-pointer">
                      <option>Virement Bancaire</option>
                      <option>Chèque Certifié</option>
                      <option>Espèces (Caisse)</option>
                      <option>Carte Corporative</option>
                    </select>
                  </td>
                  <td className="px-10 py-4 border-r border-[#f1f5f9]">
                    <select className="w-full px-6 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-[10px] font-black text-[#334155] uppercase tracking-widest focus:bg-white focus:border-[#005eb8] outline-none transition-all shadow-inner appearance-none cursor-pointer">
                      <option>SOCIÉTÉ GÉNÉRALE</option>
                      <option>BICIS GROUPE</option>
                      <option>UBA SÉNÉGAL</option>
                      <option>CAISSE CENTRALE</option>
                    </select>
                  </td>
                  <td className="px-10 py-4 text-center">
                    <button onClick={() => removeLigne(l.id)} className="p-3 bg-white border border-[#cbd5e1] text-[#94a3b8] hover:text-[#dc2626] hover:border-red-100 rounded-xl shadow-sm transition-all group-hover:scale-110">
                      <Trash2 size={18} />
                    </button>
                  </td>
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
                 <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Totalisation des Flux</span>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Prêt pour imputation comptable</p>
              </div>
           </div>
           
           <div className="flex-1 flex justify-center">
              <div className="flex flex-col items-center">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Total Brut à Enregistrer</span>
                 <span className="text-5xl font-black tracking-tighter text-blue-400">{total.toLocaleString()} <span className="text-sm font-bold opacity-50 uppercase tracking-widest ml-2">F CFA</span></span>
              </div>
           </div>

           <button className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-blue-500/30 transition-all flex items-center gap-4 group">
              <FileCheck size={22} className="group-hover:scale-110 transition-transform" />
              Valider les Règlements
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
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Sécurisation des Flux Bancaires</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Protocole EBICS/SWIFT Ready • Double validation signataire activée sur les règlements sensibles • Audit Joule IA.
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <History size={20} className="group-hover:rotate-[-45deg] transition-transform" /> Historique Flux
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Share2 size={20} className="group-hover:rotate-12 transition-transform" /> Partager Bordereau
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default ReglementTiers;
