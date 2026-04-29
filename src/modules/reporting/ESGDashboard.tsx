import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, Users, ShieldCheck, TrendingDown, 
  Droplets, Wind, Zap, Globe, BarChart3, 
  FileText, Download, Info, Heart, Award
} from 'lucide-react';

const ESGDashboard = () => {
  return (
    <div className="flex flex-col h-full gap-8">
      {/* ESG Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-inner">
              <Leaf className="text-emerald-400" size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Impact ESG & Durabilité</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Responsabilité Sociétale des Entreprises • Conformité ISR</p>
           </div>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              <FileText size={16} /> Rapport Annuel
           </button>
           <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20">
              <Download size={16} /> Certificat ESG
           </button>
        </div>
      </div>

      {/* ESG Three Pillars Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* Environment */}
         <PillarCard 
           icon={<Wind className="text-emerald-400" />} 
           title="Environnement (E)" 
           score="72/100" 
           status="En progrès"
           color="emerald"
           stats={[
             { label: "Empreinte Carbone", value: "14.2 tCO2e", trend: "-5%" },
             { label: "Consommation Eau", value: "1,240 m3", trend: "-12%" },
             { label: "Énergie Renouvelable", value: "35%", trend: "+8%" }
           ]}
         />
         {/* Social */}
         <PillarCard 
           icon={<Users className="text-indigo-400" />} 
           title="Social (S)" 
           score="85/100" 
           status="Excellent"
           color="indigo"
           stats={[
             { label: "Index Parité", value: "92/100", trend: "+2%" },
             { label: "Taux de Formation", value: "98%", trend: "Stable" },
             { label: "Diversité Inclusion", value: "A+", trend: "+5%" }
           ]}
         />
         {/* Governance */}
         <PillarCard 
           icon={<ShieldCheck className="text-amber-400" />} 
           title="Gouvernance (G)" 
           score="94/100" 
           status="Leader"
           color="amber"
           stats={[
             { label: "Transparence Audit", value: "100%", trend: "Certifié" },
             { label: "Éthique des Affaires", value: "AAA", trend: "Audité" },
             { label: "Indépendance Conseil", value: "75%", trend: "Stable" }
           ]}
         />
      </div>

      {/* Detailed Analysis & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Carbon Footprint Chart Simulation */}
         <div className="card bg-slate-800/20 border-slate-700/50 p-8 flex flex-col gap-6 shadow-2xl">
            <div className="flex justify-between items-center">
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Évolution de l'Empreinte Carbone (Scope 1, 2, 3)</h4>
               <div className="flex gap-4 text-[9px] font-bold text-slate-500 uppercase">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Direct</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Énergie</span>
               </div>
            </div>
            
            <div className="flex-1 flex items-end justify-between gap-4 h-48 px-4">
               {[45, 65, 35, 85, 55, 95, 45, 75, 65, 85, 45, 65].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col gap-1 items-center group">
                    <div className="w-full bg-slate-800/50 rounded-t-lg relative overflow-hidden h-full">
                       <motion.div 
                         initial={{ height: 0 }} 
                         animate={{ height: `${h}%` }} 
                         transition={{ delay: i * 0.05 }}
                         className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" 
                       />
                    </div>
                    <span className="text-[8px] font-black text-slate-600">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                 </div>
               ))}
            </div>

            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4">
               <Zap className="text-emerald-400" size={20} />
               <p className="text-[10px] text-emerald-100/70 font-medium leading-relaxed">
                  Votre consommation énergétique a baissé de **8.4%** ce trimestre grâce à l'optimisation des centres de coûts IA.
               </p>
            </div>
         </div>

         {/* Supply Chain Sustainability */}
         <div className="card bg-slate-800/20 border-slate-700/50 p-8 flex flex-col gap-6 shadow-2xl">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Durabilité de la Chaîne d'Approvisionnement</h4>
            <div className="space-y-4">
               <SupplierRow name="SONATEL SÉNÉGAL" rating="Gold" impact="-15% CO2" />
               <SupplierRow name="TOTAL ENERGIES" rating="Silver" impact="-5% CO2" />
               <SupplierRow name="SENELEC" rating="Platinum" impact="-25% CO2" />
               <SupplierRow name="DHL AFRICA" rating="Gold" impact="-10% CO2" />
            </div>
            <button className="w-full py-3 bg-slate-900 border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
               Voir l'analyse complète des fournisseurs
            </button>
         </div>
      </div>

      {/* ESG Badges & Certifications */}
      <div className="flex flex-wrap justify-center gap-8 py-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
         <CertificationBadge icon={<Globe size={24} />} label="ISO 14001" />
         <CertificationBadge icon={<Award size={24} />} label="EcoVadis Gold" />
         <CertificationBadge icon={<Heart size={24} />} label="B-Corp Certified" />
         <CertificationBadge icon={<Droplets size={24} />} label="Water Stewardship" />
      </div>
    </div>
  );
};

const PillarCard = ({ icon, title, score, status, color, stats }: any) => (
  <div className="card bg-slate-800/20 border-slate-700/50 p-8 flex flex-col gap-6 group hover:border-emerald-500/30 transition-all shadow-xl">
     <div className="flex justify-between items-start">
        <div className={`p-4 bg-${color}-500/10 rounded-2xl border border-${color}-500/20 shadow-inner`}>
           {icon}
        </div>
        <div className="text-right">
           <h4 className="text-2xl font-black text-white">{score}</h4>
           <span className={`text-[10px] font-black uppercase tracking-widest text-${color}-400`}>{status}</span>
        </div>
     </div>
     <h3 className="text-sm font-black text-white uppercase tracking-widest">{title}</h3>
     <div className="space-y-4">
        {stats.map((s: any, i: number) => (
          <div key={i} className="flex justify-between items-center border-b border-slate-700/30 pb-2">
             <span className="text-[10px] font-bold text-slate-500 uppercase">{s.label}</span>
             <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-200">{s.value}</span>
                <span className={`text-[9px] font-bold ${s.trend.includes('-') ? 'text-emerald-400' : s.trend.includes('+') ? 'text-rose-400' : 'text-slate-500'}`}>{s.trend}</span>
             </div>
          </div>
        ))}
     </div>
  </div>
);

const SupplierRow = ({ name, rating, impact }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700/50 rounded-2xl group hover:border-emerald-500/30 transition-all cursor-pointer">
     <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-emerald-400 transition-all">
           <Globe size={20} />
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-bold text-white uppercase tracking-wide">{name}</span>
           <span className="text-[9px] text-slate-500 font-bold uppercase">{impact}</span>
        </div>
     </div>
     <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
        rating === 'Platinum' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
        rating === 'Gold' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
        'bg-slate-800 text-slate-400 border border-slate-700'
     }`}>
        {rating}
     </span>
  </div>
);

const CertificationBadge = ({ icon, label }: any) => (
  <div className="flex flex-col items-center gap-2">
     <div className="p-3 bg-slate-800 rounded-full border border-slate-700 text-slate-400">
        {icon}
     </div>
     <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span>
  </div>
);

export default ESGDashboard;
