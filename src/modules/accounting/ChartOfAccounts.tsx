import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Filter, Download, ChevronRight, 
  ChevronDown, Folder, FileText, Info, MoreVertical,
  Landmark, Database, BookOpen, Layers, ShieldCheck,
  Zap, ArrowRight, Printer, Share2
} from 'lucide-react';

const ChartOfAccounts = () => {
  const [expandedClasses, setExpandedClasses] = useState<string[]>(['1', '2', '4', '5', '6', '7']);
  const [searchTerm, setSearchTerm] = useState('');

  const accountStructure = [
    { 
      id: '1', label: 'Classe 1 : Comptes de Ressources Durables', 
      accounts: [
        { code: '101', name: 'CAPITAL SOCIAL', type: 'Capitaux', balance: '100 000 000 F' },
        { code: '131', name: 'SUBVENTIONS D\'INVESTISSEMENT', type: 'Capitaux', balance: '12 500 000 F' },
      ]
    },
    { 
      id: '2', label: 'Classe 2 : Comptes d\'Actif Immobilisé', 
      accounts: [
        { code: '211', name: 'TERRAINS (FONDS COMMERCIAUX)', type: 'Immos', balance: '50 000 000 F' },
        { code: '241', name: 'MATÉRIEL DE TRANSPORT', type: 'Immos', balance: '25 000 000 F' },
      ]
    },
    { 
      id: '4', label: 'Classe 4 : Comptes de Tiers (AP/AR)', 
      accounts: [
        { code: '401', name: 'FOURNISSEURS LOCAUX', type: 'Dettes', balance: '12 450 000 F' },
        { code: '411', name: 'CLIENTS SÉNÉGAL SA', type: 'Créances', balance: '45 820 000 F' },
      ]
    },
    { 
      id: '5', label: 'Classe 5 : Comptes de Trésorerie', 
      accounts: [
        { code: '512', name: 'BANQUE SOCIÉTÉ GÉNÉRALE', type: 'Liquidités', balance: '333 730 000 F' },
        { code: '521', name: 'CAISSE CENTRALE DAKAR', type: 'Liquidités', balance: '1 250 000 F' },
      ]
    },
    { 
      id: '6', label: 'Classe 6 : Comptes de Charges (Nature)', 
      accounts: [
        { code: '601', name: 'ACHATS DE MATIÈRES PREMIÈRES', type: 'Charges', balance: '25 000 000 F' },
        { code: '611', name: 'SERVICES EXTÉRIEURS (TRANSIT)', type: 'Charges', balance: '850 000 F' },
      ]
    },
    { 
      id: '7', label: 'Classe 7 : Comptes de Produits', 
      accounts: [
        { code: '701', name: 'VENTES DE PRODUITS FINIS', type: 'Produits', balance: '458 230 000 F' },
        { code: '707', name: 'VENTES DE MARCHANDISES', type: 'Produits', balance: '124 500 000 F' },
      ]
    },
  ];

  const toggleClass = (id: string) => {
    setExpandedClasses(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full gap-8 overflow-auto pb-12">
      {/* Header Actions (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <Database size={32} />
           </div>
           <div>
              <h3 className="text-3xl font-bold text-[#0f172a] uppercase tracking-tighter leading-none mb-1">Plan Comptable Hiérarchisé</h3>
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-[0.2em] italic opacity-80">Normes SYSCOHADA v2024 • Nomenclature Révisée • Audit Ready</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10 mt-6 lg:mt-0">
           <div className="relative group w-[400px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#005eb8] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Chercher par code ou libellé (ex: 411, Clients)..." 
                className="pl-12 pr-6 py-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-xs font-bold text-[#334155] placeholder:text-[#94a3b8] uppercase tracking-tight outline-none focus:border-[#005eb8] focus:bg-white transition-all w-full shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="flex items-center gap-3 px-10 py-3 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/20">
              <Plus size={20} /> Créer Compte
           </button>
        </div>
      </div>

      {/* Hierarchical View Area */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] overflow-hidden shadow-sm flex flex-col flex-1 min-h-[600px]">
        <div className="bg-[#f8fafc] px-10 py-6 border-b border-[#cbd5e1] flex justify-between items-center sticky top-0 z-10 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-[#005eb8] rounded-xl flex items-center justify-center border border-blue-100 shadow-inner">
                 <Layers size={20} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a]">Structure de la Nomenclature Fiscale</h3>
           </div>
           <div className="flex gap-8 text-[10px] font-bold text-[#64748b] uppercase tracking-widest">
              <span className="flex items-center gap-2 transition-colors hover:text-[#005eb8] cursor-pointer"><div className="w-2.5 h-2.5 rounded-full bg-[#005eb8] shadow-sm"></div> Comptes de Bilan</span>
              <span className="flex items-center gap-2 transition-colors hover:text-[#dc2626] cursor-pointer"><div className="w-2.5 h-2.5 rounded-full bg-[#dc2626] shadow-sm"></div> Comptes de Gestion</span>
           </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4">
           {accountStructure.map((group) => (
              <div key={group.id} className="group/class">
                 <button 
                   onClick={() => toggleClass(group.id)}
                   className={`w-full flex items-center gap-6 px-8 py-5 rounded-2xl transition-all border ${expandedClasses.includes(group.id) ? 'bg-[#f8fafc] border-[#cbd5e1] shadow-inner' : 'bg-white border-transparent hover:bg-blue-50/30'}`}
                 >
                    <div className={`${expandedClasses.includes(group.id) ? 'text-[#005eb8]' : 'text-[#94a3b8]'} transition-all transform ${expandedClasses.includes(group.id) ? 'rotate-0' : '-rotate-90'}`}>
                       <ChevronDown size={22} />
                    </div>
                    <div className={`p-3 rounded-xl border ${expandedClasses.includes(group.id) ? 'bg-white border-blue-100 shadow-sm' : 'bg-[#f8fafc] border-transparent'}`}>
                       <Folder size={24} className={expandedClasses.includes(group.id) ? 'text-amber-500' : 'text-[#cbd5e1]'} />
                    </div>
                    <div className="flex flex-col items-start">
                       <span className={`text-[13px] font-black uppercase tracking-widest ${expandedClasses.includes(group.id) ? 'text-[#0f172a]' : 'text-[#64748b]'}`}>{group.label}</span>
                       <span className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-[0.3em] mt-1">{group.accounts.length} Postes Comptables Certifiés</span>
                    </div>
                    <div className="ml-auto flex items-center gap-6">
                       <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#005eb8] shadow-sm transition-all">
                          <Plus size={18} />
                       </button>
                       <button className="p-2.5 bg-white border border-[#cbd5e1] rounded-xl text-[#94a3b8] hover:text-[#0f172a] shadow-sm transition-all">
                          <MoreVertical size={18} />
                       </button>
                    </div>
                 </button>

                 <AnimatePresence>
                    {expandedClasses.includes(group.id) && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="overflow-hidden ml-20"
                       >
                          <div className="py-6 space-y-3 pr-8">
                             {group.accounts.map((acc) => (
                                <div key={acc.code} className="flex items-center justify-between p-6 rounded-2xl bg-white border border-transparent hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all group/item cursor-pointer group">
                                   <div className="flex items-center gap-10">
                                      <div className="w-16 font-mono font-black text-lg text-[#005eb8] tracking-tighter group-hover/item:scale-110 transition-transform">{acc.code}</div>
                                      <div className="flex flex-col">
                                         <span className="text-sm font-black text-[#334155] uppercase tracking-tight group-hover/item:text-[#005eb8] transition-colors">{acc.name}</span>
                                         <div className="flex items-center gap-3 mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1] group-hover/item:bg-[#005eb8] transition-colors" />
                                            <span className="text-[9px] text-[#94a3b8] uppercase font-bold tracking-widest">{acc.type} • Postes Analytiques Associés</span>
                                         </div>
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-12">
                                      <div className="text-right">
                                         <p className="text-base font-black text-[#0f172a] tracking-tighter">{acc.balance}</p>
                                         <p className="text-[9px] text-[#94a3b8] font-black uppercase tracking-widest mt-1 opacity-70">Solde Net Comptable</p>
                                      </div>
                                      <div className="flex gap-3 opacity-0 group-hover/item:opacity-100 transition-all transform translate-x-4 group-hover/item:translate-x-0">
                                         <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#005eb8] hover:border-[#005eb8] shadow-sm transition-all">
                                            <Printer size={18} />
                                         </button>
                                         <button className="p-3 bg-white border border-[#cbd5e1] rounded-xl text-[#64748b] hover:text-[#0f172a] hover:border-[#0f172a] shadow-sm transition-all">
                                            <Share2 size={18} />
                                         </button>
                                      </div>
                                   </div>
                                </div>
                             ))}
                             <button className="w-full py-5 mt-4 border-2 border-dashed border-[#cbd5e1] rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] text-[#94a3b8] hover:text-[#005eb8] hover:border-[#005eb8] hover:bg-blue-50/20 transition-all flex items-center justify-center gap-4">
                                <Plus size={20} />
                                Créer une Extension en Classe {group.id}
                             </button>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           ))}
        </div>
      </div>

      {/* Footer System Integrity (Morning Horizon) */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#f8fafc] border border-[#cbd5e1] p-8 rounded-xl shadow-inner gap-8">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#cbd5e1] shadow-sm text-[#107e3e]">
               <ShieldCheck size={28} />
            </div>
            <div className="flex flex-col">
               <span className="text-[12px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Synchronisation Référentielle Active</span>
               <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mt-1 opacity-70 italic">
                  Dernière mise à jour : 29/04/2024 • Certifié par Joule AI Audit • Conformité OHADA 100%
               </p>
            </div>
         </div>
         <div className="flex gap-10">
            <button className="flex items-center gap-3 text-[#64748b] hover:text-[#005eb8] text-[10px] font-bold uppercase tracking-[0.3em] transition-all group">
               <History size={20} className="group-hover:rotate-[-45deg] transition-transform" /> Journal de Tracé
            </button>
            <button className="flex items-center gap-3 text-[#005eb8] hover:text-[#004080] text-[10px] font-bold uppercase tracking-[0.4em] transition-all group border-l border-[#cbd5e1] pl-10">
               <Download size={20} className="group-hover:translate-y-1 transition-transform" /> Télécharger Plan (PDF)
               <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default ChartOfAccounts;
