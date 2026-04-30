import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Calculator, Plus, 
  Search, ArrowUpRight,
  FileText, Settings,
  Download, Trash2,
  Edit3, BarChart3, Layers
} from 'lucide-react';

const FixedAssetsModule = () => {
  const [activeTab, setActiveTab] = useState<'registry' | 'depreciation' | 'acquisition' | 'reporting'>('registry');

  const tabs = [
    { id: 'registry',     label: 'Registre des Immo',        icon: Building2 },
    { id: 'depreciation', label: 'Amortissements',            icon: Calculator },
    { id: 'acquisition',  label: 'Acquisitions & Cessions',   icon: Plus },
    { id: 'reporting',    label: 'États Réglementaires',      icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Asset Header */}
      <div className="flex justify-between items-center bg-white border border-[#cbd5e1] p-8 rounded-xl shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#005eb8] flex items-center justify-center text-white shadow-md">
               <Building2 size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-[#0f172a] uppercase tracking-tight leading-none mb-1">Gestion des Immobilisations (FI-AA)</h3>
               <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest">Actifs Immobilisés • Amortissements SYSCOHADA • Inventaire Physique</p>
            </div>
         </div>
         <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1] relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id ? 'bg-white text-[#005eb8] shadow-sm border border-[#cbd5e1]' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                 <tab.icon size={14} />
                 {tab.label}
              </button>
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'registry' && (
           <motion.div 
             key="registry"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col gap-6"
           >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <AssetStatCard label="Valeur Brute Totale" value="842.5M F" trend="+12.5%" color="blue" />
                 <AssetStatCard label="Amortissements Cumulés" value="215.8M F" trend="+8.2%" color="orange" />
                 <AssetStatCard label="Valeur Nette (VNC)" value="626.7M F" trend="-2.4%" color="green" />
                 <AssetStatCard label="Nombre d'Actifs" value="124" trend="+3" color="blue" />
              </div>

              <div className="flex justify-between items-center px-4">
                 <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
                    <input type="text" placeholder="Rechercher une immobilisation..." className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#005eb8] transition-all shadow-inner font-medium" />
                 </div>
                 <button className="flex items-center gap-2 px-8 py-2.5 bg-[#005eb8] hover:bg-[#004080] text-white rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all shadow-md">
                    <Plus size={16} /> Créer Actif
                 </button>
              </div>

              <div className="bg-white rounded border border-[#cbd5e1] overflow-hidden shadow-sm">
                 <table className="w-full text-left">
                    <thead className="bg-[#f8fafc] text-[11px] font-bold uppercase text-[#475569] tracking-widest border-b border-[#cbd5e1]">
                       <tr>
                          <th className="p-6">Référence / Désignation</th>
                          <th className="p-6">Compte Immo</th>
                          <th className="p-6">Date Mise en Service</th>
                          <th className="p-6">Valeur d'Acquisition</th>
                          <th className="p-6">Amortissement Cumulé</th>
                          <th className="p-6">VNC</th>
                          <th className="p-6 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9] text-[13px]">
                       <AssetRow assetRef="IMMO-2024-001" name="Machine d'Extrusion Plastique" account="241100" date="01/01/2024" value="125 000 000" cumul="0" vnc="125 000 000" />
                       <AssetRow assetRef="IMMO-2022-042" name="Camion Logistique 15T" account="245100" date="15/06/2022" value="45 000 000" cumul="18 000 000" vnc="27 000 000" />
                       <AssetRow assetRef="IMMO-2023-015" name="Serveur Datacenter" account="244300" date="10/02/2023" value="12 500 000" cumul="4 166 667" vnc="8 333 333" />
                       <AssetRow assetRef="IMMO-2021-088" name="Mobilier de Bureau" account="244400" date="01/01/2021" value="8 400 000" cumul="5 600 000" vnc="2 800 000" />
                    </tbody>
                 </table>
              </div>
           </motion.div>
         )}

         {activeTab === 'depreciation' && (
           <motion.div 
             key="depreciation"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-8"
           >
              <div className="bg-white border border-[#cbd5e1] rounded-xl p-10 shadow-sm flex flex-col gap-8">
                 <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#475569]">Calcul des Amortissements</h4>
                 <div className="grid grid-cols-2 gap-6">
                    <DepreciationParam label="Période" value="Mensuelle" />
                    <DepreciationParam label="Mode" value="Linéaire / Dégressif" />
                    <DepreciationParam label="Dernier Calcul" value="31/03/2024" />
                    <DepreciationParam label="Statut" value="À jour" color="green" />
                 </div>
                 <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl flex flex-col gap-4">
                    <p className="text-xs text-[#334155] font-medium leading-relaxed italic">
                       Prochain passage des écritures d'amortissement prévu pour le 30/04/2024. Montant estimé : 12 450 000 F.
                    </p>
                    <button className="w-full py-4 bg-[#005eb8] text-white rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-md hover:bg-[#004080] transition-colors">
                       Lancer le calcul (AFAB)
                    </button>
                 </div>
              </div>

              <div className="bg-white border border-[#cbd5e1] rounded-xl p-10 shadow-sm">
                 <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-8">Tableau de Bord Prévisionnel</h4>
                 <div className="space-y-6">
                    <PredictiveBar label="2024" value="149.4M F" percent={100} />
                    <PredictiveBar label="2025" value="132.8M F" percent={88} />
                    <PredictiveBar label="2026" value="115.2M F" percent={77} />
                    <PredictiveBar label="2027" value="98.5M F" percent={65} />
                 </div>
              </div>
           </motion.div>
         )}

         {activeTab === 'reporting' && (
           <motion.div 
             key="reporting"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
           >
              <ReportCard title="Tableau 3 : Immobilisations" desc="État réglementaire SYSCOHADA des mouvements de l'exercice." icon={<Layers size={24} />} />
              <ReportCard title="Tableau 4 : Amortissements" desc="Détail des dotations et amortissements cumulés par catégorie." icon={<Calculator size={24} />} />
              <ReportCard title="Fiches d'Immobilisation" desc="Édition groupée des fiches individuelles avec QR Code d'inventaire." icon={<FileText size={24} />} />
           </motion.div>
         )}

         {activeTab === 'acquisition' && (
           <motion.div
             key="acquisition"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white border border-[#cbd5e1] rounded-xl p-12 shadow-sm flex flex-col items-center gap-8 text-center"
           >
             <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#005eb8]">
               <Plus size={32} />
             </div>
             <div>
               <h4 className="text-lg font-bold text-[#0f172a] mb-2">Acquisitions & Cessions</h4>
               <p className="text-sm text-[#64748b]">Module de saisie des mouvements d'actifs disponible dans la prochaine version.</p>
             </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const AssetStatCard = ({ label, value, trend, color }: any) => (
  <div className="bg-white border border-[#cbd5e1] rounded-xl p-8 shadow-sm group hover:border-[#005eb8] transition-all relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full ${
      color === 'blue' ? 'bg-blue-500' : 
      color === 'orange' ? 'bg-orange-500' : 
      'bg-green-500'
    } opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <p className="text-[#64748b] text-[10px] font-bold uppercase tracking-widest leading-none mb-4">{label}</p>
    <h3 className="text-xl font-bold text-[#0f172a]">{value}</h3>
    <p className={`text-[10px] font-bold uppercase mt-2 tracking-tight flex items-center gap-1 ${
      color === 'green' ? 'text-[#107e3e]' : 'text-[#005eb8]'
    }`}>
       <ArrowUpRight size={12} /> {trend}
    </p>
  </div>
);

const AssetRow = ({ assetRef, name, account, date, value, cumul, vnc }: any) => (
  <tr className="hover:bg-blue-50/30 transition-all group cursor-pointer">
     <td className="p-6">
        <div className="flex flex-col">
           <span className="text-sm font-bold text-[#0f172a] group-hover:text-[#005eb8] transition-colors">{name}</span>
           <span className="text-[10px] text-[#64748b] font-bold tracking-widest">{assetRef}</span>
        </div>
     </td>
     <td className="p-6 text-[#334155] font-bold">{account}</td>
     <td className="p-6 text-[#64748b] font-medium">{date}</td>
     <td className="p-6 text-[#0f172a] font-bold">{value} F</td>
     <td className="p-6 text-[#dc2626] font-medium">{cumul} F</td>
     <td className="p-6 text-[#107e3e] font-bold">{vnc} F</td>
     <td className="p-6 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
           <button className="p-2 text-[#94a3b8] hover:text-[#0f172a] transition-colors"><Edit3 size={16} /></button>
           <button className="p-2 text-[#94a3b8] hover:text-[#dc2626] transition-colors"><Trash2 size={16} /></button>
        </div>
     </td>
  </tr>
);

const DepreciationParam = ({ label, value, color }: any) => (
  <div className="flex flex-col gap-1 p-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl shadow-inner">
     <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">{label}</span>
     <span className={`text-sm font-bold uppercase tracking-tight ${color === 'green' ? 'text-[#107e3e]' : 'text-[#0f172a]'}`}>{value}</span>
  </div>
);

const PredictiveBar = ({ label, value, percent }: any) => (
  <div className="flex flex-col gap-2">
     <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">{label}</span>
        <span className="text-[11px] font-bold text-[#0f172a]">{value}</span>
     </div>
     <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-[#005eb8] shadow-sm"
        />
     </div>
  </div>
);

const ReportCard = ({ title, desc, icon }: any) => (
  <div className="bg-white border border-[#cbd5e1] p-8 group hover:border-[#005eb8] transition-all shadow-sm rounded-xl flex flex-col gap-6 cursor-pointer">
     <div className="w-14 h-14 rounded-2xl bg-[#f8fafc] border border-[#cbd5e1] flex items-center justify-center text-[#005eb8] group-hover:bg-[#005eb8] group-hover:text-white transition-all">
        {icon}
     </div>
     <div>
        <h4 className="text-[11px] font-bold text-[#0f172a] uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-[11px] text-[#64748b] font-medium leading-relaxed">{desc}</p>
     </div>
     <button className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#005eb8] group-hover:translate-x-1 transition-transform">
        Générer <Download size={14} />
     </button>
  </div>
);

export default FixedAssetsModule;
