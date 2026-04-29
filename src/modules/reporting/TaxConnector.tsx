import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Globe, Send, ShieldCheck, 
  Download, AlertCircle, CheckCircle2, 
  BarChart3, Calendar, Filter, Search,
  ExternalLink, Database, Activity, RefreshCw
} from 'lucide-react';

const TaxConnector = () => {
  const [activeTab, setActiveTab] = useState<'declarations' | 'vrs' | 'etax' | 'logs'>('declarations');

  const tabs = [
    { id: 'declarations', label: 'Déclarations Fiscales', icon: FileText },
    { id: 'vrs', label: 'VRS & Retenues', icon: ShieldCheck },
    { id: 'etax', label: 'Connecteur E-Tax', icon: Globe },
    { id: 'logs', label: 'Journal des Dépôts', icon: Activity },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Tax Header */}
      <div className="flex justify-between items-center bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
               <FileText size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-1">Portail Fiscal & Télé-déclarations</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic italic">Sénégal DGI Compliance • TVA / VRS / BRS • Export EDI Etax</p>
            </div>
         </div>
         <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50 relative z-10 overflow-x-auto no-scrollbar max-w-[60%]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                 <tab.icon size={14} />
                 {tab.label}
              </button>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'declarations' && (
           <motion.div 
             key="declarations"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
           >
              <TaxStatCard label="TVA à Décaisser" value="24.8M F" status="Prêt" color="emerald" />
              <TaxStatCard label="Retenues VRS" value="8.4M F" status="À Valider" color="amber" />
              <TaxStatCard label="BRS" value="1.2M F" status="Prêt" color="emerald" />
              <TaxStatCard label="Délai Prochain Dépôt" value="15 Mai" status="Alerte J-16" color="rose" />
              
              <div className="md:col-span-2 lg:col-span-4 card bg-slate-800/20 border-slate-700/50 overflow-hidden shadow-2xl">
                 <div className="p-6 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Génération des fichiers EDI (Format DGI)</h4>
                    <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/30">
                       <RefreshCw size={14} /> Tout Synchroniser
                    </button>
                 </div>
                 <div className="p-0 divide-y divide-slate-700/30">
                    <TaxReportRow name="Déclaration de TVA (Avril 2024)" type="EDI / XML" status="Prêt pour E-Tax" />
                    <TaxReportRow name="État des Sommes Versées (VRS)" type="Excel / CSV" status="Validation Interne" />
                    <TaxReportRow name="Bordereau BRS" type="EDI / XML" status="Prêt pour E-Tax" />
                    <TaxReportRow name="Déclaration de Cotisations Sociales" type="XML (IPRES/CSS)" status="Prêt" />
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'etax' && (
           <motion.div 
             key="etax"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-8"
           >
              <div className="card bg-slate-800/20 border-slate-700/50 p-10 shadow-2xl flex flex-col gap-8">
                 <div className="flex items-center gap-4 text-emerald-400">
                    <Globe size={24} />
                    <h4 className="text-xs font-black uppercase tracking-[0.2em]">Connecteur API E-Tax (DGI Sénégal)</h4>
                 </div>
                 <div className="space-y-4">
                    <ConnectorStatus label="Statut de la Liaison" value="Connecté (HTTPS/TLS)" active />
                    <ConnectorStatus label="Dernière Synchro" value="Aujourd'hui 09:12" active />
                    <ConnectorStatus label="Certificat Numérique" value="Valide (Exp. 2025)" active />
                 </div>
                 <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/30">
                    Lancer le Dépôt Automatisé
                 </button>
              </div>

              <div className="card bg-indigo-600/5 border border-indigo-500/20 p-10 flex flex-col gap-6 shadow-2xl">
                 <h4 className="text-xs font-black uppercase tracking-widest text-white italic">Aide à la Conformité Fiscal</h4>
                 <div className="flex-1 flex flex-col justify-center gap-4">
                    <div className="flex items-start gap-4">
                       <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                       <p className="text-[11px] text-slate-400 font-medium">Les fichiers générés respectent la structure XML **v2.1** de la DGI Sénégal.</p>
                    </div>
                    <div className="flex items-start gap-4">
                       <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                       <p className="text-[11px] text-slate-400 font-medium">La TVA sur encaissement est calculée sur la base du lettrage bancaire.</p>
                    </div>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const TaxStatCard = ({ label, value, status, color }: any) => (
  <div className="card p-8 group hover:border-indigo-500/30 transition-all shadow-xl border-slate-700/50 relative overflow-hidden">
     <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
     <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4 leading-none">{label}</p>
     <h3 className="text-xl font-black text-white">{value}</h3>
     <span className={`text-[9px] font-black uppercase tracking-widest mt-2 block text-${color}-400`}>{status}</span>
  </div>
);

const TaxReportRow = ({ name, type, status }: any) => (
  <div className="p-6 hover:bg-indigo-600/5 transition-all group flex items-center justify-between cursor-pointer">
     <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 group-hover:text-indigo-400 transition-colors">
           <FileText size={20} />
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{name}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">Type: {type}</span>
        </div>
     </div>
     <div className="flex items-center gap-6">
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${
           status.includes('Prêt') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
        }`}>
           {status}
        </span>
        <button className="p-2 text-slate-600 hover:text-white"><Download size={18} /></button>
     </div>
  </div>
);

const ConnectorStatus = ({ label, value, active }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
     <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-white uppercase">{value}</span>
        {active && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
     </div>
  </div>
);

export default TaxConnector;
