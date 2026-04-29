import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Edit, Trash2, Filter, 
  ChevronRight, CreditCard, ShieldAlert, 
  MapPin, Phone, Mail, Globe, Banknote, 
  CheckCircle2, XCircle, Info
} from 'lucide-react';

const PlanTiers = () => {
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const tiers = [
    { 
      compte: '4110001', 
      intitule: 'CLIENT ALPHA SA', 
      type: 'Client', 
      solde: 15400000, 
      limite: 20000000,
      risk: 'Normal',
      email: 'contact@alpha.sn',
      phone: '+221 33 820 00 01'
    },
    { 
      compte: '4110002', 
      intitule: 'ETABLISSEMENT BETA', 
      type: 'Client', 
      solde: 28500000, 
      limite: 25000000,
      risk: 'Critique',
      email: 'finance@beta.sn',
      phone: '+221 33 840 12 45'
    },
    { 
      compte: '4010001', 
      intitule: 'FOURNISSEUR TECH-PLUS', 
      type: 'Fournisseur', 
      solde: -8500000, 
      limite: 50000000,
      risk: 'Normal',
      email: 'sales@techplus.sn',
      phone: '+221 33 860 77 88'
    },
    { 
      compte: '4210001', 
      intitule: 'SALARIE MAMADOU KANE', 
      type: 'Salarié', 
      solde: 0, 
      limite: 500000,
      risk: 'Normal',
      email: 'm.kane@antigravity.sn',
      phone: '+221 77 500 00 00'
    },
  ];

  return (
    <div className="flex h-full gap-6 relative">
      {/* Main List */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
           <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl w-96 shadow-inner focus-within:border-indigo-500 transition-all">
              <Search size={18} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="Rechercher par compte ou nom..." 
                className="bg-transparent border-none outline-none text-xs w-full text-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-700 transition-all">
                 <Filter size={16} /> Filtre Avancé
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20">
                 <Plus size={16} /> Nouveau Tiers
              </button>
           </div>
        </div>

        <div className="bg-slate-800/20 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
           <table className="w-full text-left">
              <thead className="bg-slate-800/80 border-b border-slate-700/50">
                 <tr>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Compte Tiers</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Intitulé / Raison Sociale</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Type</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Limite de Crédit</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Solde (F)</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                 {tiers.map((t) => (
                    <tr 
                      key={t.compte} 
                      onClick={() => setSelectedTier(t)}
                      className={`group cursor-pointer transition-all ${selectedTier?.compte === t.compte ? 'bg-indigo-500/10' : 'hover:bg-slate-700/20'}`}
                    >
                       <td className="p-6">
                          <span className="font-mono text-xs font-black text-indigo-400">{t.compte}</span>
                       </td>
                       <td className="p-6">
                          <div className="flex flex-col">
                             <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{t.intitule}</span>
                             <span className="text-[10px] text-slate-500 font-bold uppercase">{t.email}</span>
                          </div>
                       </td>
                       <td className="p-6 text-center">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                             t.type === 'Client' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                             t.type === 'Fournisseur' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                             'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                             {t.type}
                          </span>
                       </td>
                       <td className="p-6 text-right">
                          <span className="text-xs font-bold text-slate-400">{t.limite.toLocaleString()}</span>
                       </td>
                       <td className="p-6 text-right">
                          <div className="flex flex-col items-end">
                             <span className={`text-sm font-black ${
                                t.solde > t.limite ? 'text-rose-400' : 
                                t.solde > 0 ? 'text-emerald-400' : 
                                t.solde < 0 ? 'text-rose-400' : 'text-slate-400'
                             }`}>
                                {t.solde.toLocaleString()}
                             </span>
                             {t.solde > t.limite && (
                                <span className="text-[9px] font-black text-rose-500/80 uppercase animate-pulse">Dépassement Limite</span>
                             )}
                          </div>
                       </td>
                       <td className="p-6">
                          <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                             <button className="p-2 text-slate-500 hover:text-indigo-400 rounded-lg hover:bg-indigo-500/10"><Edit size={16} /></button>
                             <button className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10"><Trash2 size={16} /></button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Side Drawer (Tier Detail) */}
      <AnimatePresence>
         {selectedTier && (
           <motion.div
             initial={{ x: 400, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             exit={{ x: 400, opacity: 0 }}
             className="w-96 bg-slate-800 border-l border-slate-700 shadow-2xl p-8 overflow-y-auto"
           >
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Fiche Auxiliaire</h3>
                 <button onClick={() => setSelectedTier(null)} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
                    <XCircle size={20} className="text-slate-500" />
                 </button>
              </div>

              <div className="flex flex-col items-center text-center mb-10">
                 <div className="w-20 h-20 rounded-3xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20 shadow-inner">
                    <CreditCard size={32} />
                 </div>
                 <h4 className="text-lg font-black text-white leading-tight uppercase">{selectedTier.intitule}</h4>
                 <p className="text-xs font-mono text-indigo-400 mt-1 font-black">{selectedTier.compte}</p>
                 <div className={`mt-4 px-4 py-1.5 rounded-full text-[9px] font-black uppercase flex items-center gap-2 ${
                   selectedTier.risk === 'Critique' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                 }`}>
                    <div className={`w-2 h-2 rounded-full ${selectedTier.risk === 'Critique' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                    Statut Risque : {selectedTier.risk}
                 </div>
              </div>

              <div className="space-y-8">
                 <DetailSection title="Coordonnées">
                    <DetailRow icon={<Phone size={14} />} label="Téléphone" value={selectedTier.phone} />
                    <DetailRow icon={<Mail size={14} />} label="Email" value={selectedTier.email} />
                    <DetailRow icon={<MapPin size={14} />} label="Siège Social" value="Dakar, Sénégal" />
                 </DetailSection>

                 <DetailSection title="Paramètres de Crédit">
                    <div className="bg-slate-900 rounded-2xl p-4 space-y-4 shadow-inner">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-500 uppercase">Limite Accordée</span>
                          <span className="text-xs font-black text-white">{selectedTier.limite.toLocaleString()} F</span>
                       </div>
                       <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${selectedTier.solde > selectedTier.limite ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${Math.min((selectedTier.solde / selectedTier.limite) * 100, 100)}%` }}
                          />
                       </div>
                       <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase">
                          <span>Encours : {(selectedTier.solde / selectedTier.limite * 100).toFixed(0)}%</span>
                          <span>Disponible : {Math.max(selectedTier.limite - selectedTier.solde, 0).toLocaleString()} F</span>
                       </div>
                    </div>
                 </DetailSection>

                 <DetailSection title="Conditions de Paiement">
                    <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-700/50">
                       <Banknote size={18} className="text-amber-400" />
                       <div>
                          <p className="text-xs font-bold text-white">Virement 30 Jours Fin de Mois</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Conditions Standards</p>
                       </div>
                    </div>
                 </DetailSection>
              </div>

              <div className="mt-12 flex gap-3">
                 <button className="flex-1 py-3 bg-slate-900 border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Extraits</button>
                 <button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 transition-all">Modifier</button>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const DetailSection = ({ title, children }: any) => (
  <div className="flex flex-col gap-4">
     <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 border-b border-slate-700/50 pb-2">{title}</h5>
     {children}
  </div>
);

const DetailRow = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-3 group">
     <div className="text-slate-500 group-hover:text-indigo-400 transition-colors">{icon}</div>
     <div className="flex flex-col">
        <span className="text-[9px] font-bold text-slate-500 uppercase leading-none mb-1">{label}</span>
        <span className="text-xs font-bold text-slate-200">{value}</span>
     </div>
  </div>
);

export default PlanTiers;
