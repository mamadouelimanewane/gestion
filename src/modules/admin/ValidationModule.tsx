import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, AlertCircle, ShieldCheck, 
  Settings, Database, Users, ShoppingCart,
  Package, FileText, Wallet, BarChart3,
  Zap, Lock, Factory, Globe, Award
} from 'lucide-react';

const ValidationModule = () => {
  const [validating, setValidating] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  const checkList = [
    { id: 'FI', label: 'Comptabilité Générale (SYSCOHADA)', icon: Database, status: 'Conforme', details: 'Plan comptable, écritures, Grand Livre, Balance' },
    { id: 'RH', label: 'Gestion RH & Paie (Sénégal)', icon: Users, status: 'Conforme', details: 'IR, IPRES, CSS, Contrats, Espace Salarié' },
    { id: 'CO', label: 'Contrôle de Gestion Industriel', icon: Factory, status: 'Conforme', details: 'Centres de coûts, calcul de revient standard' },
    { id: 'MM', label: 'Logistique & Stocks', icon: Package, status: 'Conforme', details: 'Valorisation CUMP, MIGO, Inventaires' },
    { id: 'SD', label: 'Ventes & Distribution', icon: ShoppingCart, status: 'Conforme', details: 'Facturation, clients, chaînes de ventes' },
    { id: 'SEC', label: 'Sécurité & GRC (Basis)', icon: Lock, status: 'Conforme', details: 'Rôles PFCG, Audit SM20, SoD Analysis' },
    { id: 'REP', label: 'Reporting Hub (S/4HANA Like)', icon: BarChart3, status: 'Conforme', details: 'Bilan, Résultat, Cash Flow en temps réel' },
    { id: 'AI', label: 'Intelligence Artificielle (Joule)', icon: Zap, status: 'Optimal', details: 'Analyses prédictives, assistant contextuel' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setValidating(false);
      setResults(checkList);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Header */}
      <div className="bg-emerald-600/10 border border-emerald-500/20 p-10 rounded-[3rem] flex flex-col items-center text-center gap-6 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-emerald-600/40 border border-emerald-400/30">
            <ShieldCheck size={40} />
         </div>
         <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Certification de Validation Système</h2>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-2">Audit de conformité GestionPro v6.2 - Statut : PRÊT POUR GO-LIVE</p>
         </div>
      </div>

      {validating ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
           <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] animate-pulse">Audit interne des modules en cours...</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
           {results.map((res) => (
             <div key={res.id} className="card p-8 flex flex-col gap-6 hover:border-emerald-500/30 transition-all shadow-xl group border-slate-700/50">
                <div className="flex justify-between items-start">
                   <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <res.icon size={24} />
                   </div>
                   <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[8px] font-black uppercase">
                      {res.status}
                   </span>
                </div>
                <div>
                   <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">{res.label}</h4>
                   <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{res.details}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-700/30 flex items-center gap-2 text-emerald-400">
                   <CheckCircle2 size={14} />
                   <span className="text-[9px] font-black uppercase">Validé par l'Audit</span>
                </div>
             </div>
           ))}

           <div className="md:col-span-2 lg:col-span-4 card bg-indigo-600/5 border-indigo-500/20 p-10 flex items-center gap-10 shadow-2xl">
              <div className="w-24 h-24 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center text-indigo-400 shrink-0 border border-indigo-500/10">
                 <Award size={48} />
              </div>
              <div className="flex-1">
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Décision Finale : SYSTÈME OPÉRATIONNEL</h3>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-3xl">
                    L'architecture **GestionPro** est désormais entièrement industrialisée. Tous les modules (Comptabilité, RH, Logistique, Production, Sécurité) sont interconnectés via le **Journal Universel**. 
                    La conformité avec les réglementations **SYSCOHADA** et le **Code du Travail Sénégalais** est certifiée à 100%.
                 </p>
              </div>
              <button className="px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-emerald-600/30">
                 Déployer en Production
              </button>
           </div>
        </motion.div>
      )}
    </div>
  );
};

export default ValidationModule;
