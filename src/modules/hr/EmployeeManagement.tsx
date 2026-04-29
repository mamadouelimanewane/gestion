import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, UserPlus, Search, Filter, 
  MoreVertical, Mail, Phone, MapPin,
  Briefcase, Calendar, ShieldCheck, 
  FileText, Download, Edit3, Trash2,
  ChevronRight, Building2, UserCheck
} from 'lucide-react';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const employees = [
    { id: 'MT-001', name: 'Mamadou Kane', role: 'Directeur Technique', dept: 'Informatique', email: 'm.kane@antigravity.sn', phone: '+221 77 123 45 67', status: 'Actif', type: 'CDI', joinDate: '12/01/2020' },
    { id: 'MT-042', name: 'Awa Diop', role: 'Contrôleur de Gestion', dept: 'Finance', email: 'a.diop@antigravity.sn', phone: '+221 70 888 22 11', status: 'Actif', type: 'CDI', joinDate: '05/03/2021' },
    { id: 'MT-088', name: 'Ibrahima Fall', role: 'Ingénieur Cloud', dept: 'Informatique', email: 'i.fall@antigravity.sn', phone: '+221 76 555 00 99', status: 'Actif', type: 'CDD', joinDate: '15/11/2023' },
    { id: 'MT-102', name: 'Khady Ndiaye', role: 'Responsable RH', dept: 'Ressources Humaines', email: 'k.ndiaye@antigravity.sn', phone: '+221 78 444 33 22', status: 'Congé', type: 'CDI', joinDate: '20/06/2019' },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <AnimatePresence mode="wait">
        {!selectedEmployee ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-6"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center">
              <div className="relative w-96">
                <input 
                  type="text" 
                  placeholder="Rechercher un collaborateur (Nom, Matricule, Département)..." 
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition-all shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              <div className="flex gap-3">
                 <button className="btn btn-secondary flex items-center gap-2 px-6 py-2.5">
                    <Filter size={16} /> Filtres Avancés
                 </button>
                 <button className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
                    <UserPlus size={16} /> Nouveau Collaborateur
                 </button>
              </div>
            </div>

            {/* Employee List Table */}
            <div className="bg-slate-800/20 border border-slate-700/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
               <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">
                     <tr>
                        <th className="p-6">Collaborateur</th>
                        <th className="p-6">Matricule</th>
                        <th className="p-6">Département / Poste</th>
                        <th className="p-6">Contrat</th>
                        <th className="p-6 text-center">Statut</th>
                        <th className="p-6 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                     {employees.map((emp) => (
                       <tr 
                         key={emp.id} 
                         onClick={() => setSelectedEmployee(emp)}
                         className="group hover:bg-indigo-600/5 transition-all cursor-pointer"
                       >
                          <td className="p-6">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-500/20 shadow-inner group-hover:scale-110 transition-transform">
                                   {emp.name.split(' ').map((n) => n[0]).join('')}
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors uppercase">{emp.name}</span>
                                   <span className="text-[10px] text-slate-500 font-bold">{emp.email}</span>
                                </div>
                             </div>
                          </td>
                          <td className="p-6">
                             <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">{emp.id}</span>
                          </td>
                          <td className="p-6">
                             <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">{emp.dept}</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase mt-1">{emp.role}</span>
                             </div>
                          </td>
                          <td className="p-6">
                             <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                {emp.type}
                             </span>
                          </td>
                          <td className="p-6 text-center">
                             <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                               emp.status === 'Actif' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                             }`}>
                                {emp.status}
                             </span>
                          </td>
                          <td className="p-6 text-right">
                             <button className="p-2 text-slate-600 hover:text-white transition-colors">
                                <MoreVertical size={18} />
                             </button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          >
             {/* Left Column: Profile Card */}
             <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="card bg-slate-800/30 p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                   <button 
                     onClick={() => setSelectedEmployee(null)}
                     className="absolute top-4 left-4 text-slate-500 hover:text-white flex items-center gap-1 text-[10px] font-black uppercase"
                   >
                      <ChevronRight size={14} className="rotate-180" /> Retour
                   </button>
                   
                   <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-500/10 border-2 border-indigo-500/20 flex items-center justify-center font-black text-4xl text-indigo-400 shadow-2xl mb-6 relative">
                      {selectedEmployee.name.split(' ').map((n: string) => n[0]).join('')}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-2xl border-4 border-slate-900 flex items-center justify-center">
                         <UserCheck size={14} className="text-white" />
                      </div>
                   </div>
                   
                   <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-1">{selectedEmployee.name}</h3>
                   <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-8">{selectedEmployee.role}</p>
                   
                   <div className="w-full space-y-4 border-t border-slate-700/50 pt-6 text-left">
                      <ProfileInfo icon={<Mail size={14} />} label="Email" value={selectedEmployee.email} />
                      <ProfileInfo icon={<Phone size={14} />} label="Téléphone" value={selectedEmployee.phone} />
                      <ProfileInfo icon={<Building2 size={14} />} label="Matricule" value={selectedEmployee.id} />
                      <ProfileInfo icon={<Calendar size={14} />} label="Ancienneté" value={selectedEmployee.joinDate} />
                   </div>
                   
                   <button className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20">
                      Éditer le Profil
                   </button>
                </div>

                <div className="card bg-slate-800/30 p-8 flex flex-col gap-4">
                   <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-700/50 pb-4">Conformité Dossier</h4>
                   <ComplianceItem label="Contrat Signé" status="OK" />
                   <ComplianceItem label="Pièce d'Identité" status="OK" />
                   <ComplianceItem label="Diplômes" status="Manquant" alert />
                   <ComplianceItem label="Certificat Médical" status="OK" />
                </div>
             </div>

             {/* Right Column: Detailed Tabs */}
             <div className="lg:col-span-3 flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <DetailCard title="Informations Administratives" icon={<ShieldCheck size={18} className="text-indigo-400" />}>
                      <div className="grid grid-cols-2 gap-6">
                         <InfoRow label="Numéro de Sécurité Sociale" value="1 85 02 77 123 456" />
                         <InfoRow label="NINEA Personnel" value="2881234 2V2" />
                         <InfoRow label="Situation Matrimoniale" value="Marié(e), 2 enfants" />
                         <InfoRow label="Adresse Dakar" value="HLM Grand Yoff, Villa 45" />
                      </div>
                   </DetailCard>

                   <DetailCard title="Contrat & Rémunération" icon={<Briefcase size={18} className="text-amber-400" />}>
                      <div className="grid grid-cols-2 gap-6">
                         <InfoRow label="Type de Contrat" value={selectedEmployee.type} />
                         <InfoRow label="Salaire de Base Bruts" value="1 250 000 F CFA" />
                         <InfoRow label="Indemnités Transport" value="50 000 F CFA" />
                         <InfoRow label="Prime de Logement" value="150 000 F CFA" />
                      </div>
                   </DetailCard>

                   <div className="md:col-span-2">
                      <DetailCard title="Documents Électroniques (GED)" icon={<FileText size={18} className="text-indigo-400" />}>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DocumentCard label="Contrat_Travail_Signe.pdf" date="12/01/2020" size="1.2 MB" />
                            <DocumentCard label="CNI_Recto_Verso.jpg" date="10/01/2020" size="450 KB" />
                            <DocumentCard label="Bulletin_Avril_2024.pdf" date="29/04/2024" size="85 KB" />
                         </div>
                      </DetailCard>
                   </div>
                </div>

                {/* Timeline / Career events */}
                <div className="card bg-slate-800/20 border-slate-700/50 p-8 shadow-2xl">
                   <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Parcours & Événements</h4>
                   <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-700">
                      <TimelineEvent date="01/01/2024" label="Promotion : Directeur Technique" desc="Passage du grade Senior à Director." />
                      <TimelineEvent date="15/06/2022" label="Formation certifiante" desc="Certification SAP Certified Application Associate." />
                      <TimelineEvent date="12/01/2020" label="Embauche" desc="Intégration au département informatique en CDI." />
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfileInfo = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-3">
     <div className="text-slate-500">{icon}</div>
     <div className="flex flex-col">
        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
        <span className="text-[10px] font-bold text-slate-200">{value}</span>
     </div>
  </div>
);

const DetailCard = ({ title, icon, children }: any) => (
  <div className="card bg-slate-800/20 border-slate-700/50 p-8 shadow-2xl h-full">
     <div className="flex items-center gap-3 mb-8">
        {icon}
        <h4 className="text-xs font-black uppercase tracking-widest text-white">{title}</h4>
     </div>
     {children}
  </div>
);

const InfoRow = ({ label, value }: any) => (
  <div className="flex flex-col gap-1">
     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-tight">{label}</span>
     <span className="text-xs font-bold text-slate-200">{value}</span>
  </div>
);

const ComplianceItem = ({ label, status, alert }: any) => (
  <div className="flex items-center justify-between py-1">
     <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
     <span className={`text-[9px] font-black uppercase ${alert ? 'text-rose-400' : 'text-emerald-400'}`}>{status}</span>
  </div>
);

const DocumentCard = ({ label, date, size }: any) => (
  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all group flex flex-col gap-2 relative">
     <div className="flex justify-between items-start">
        <FileText size={20} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
        <button className="p-1.5 bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all"><Download size={12} /></button>
     </div>
     <span className="text-[10px] font-black text-slate-200 truncate mt-2 uppercase">{label}</span>
     <div className="flex justify-between items-center mt-2">
        <span className="text-[8px] font-bold text-slate-600 uppercase">{date}</span>
        <span className="text-[8px] font-bold text-slate-600 uppercase">{size}</span>
     </div>
  </div>
);

const TimelineEvent = ({ date, label, desc }: any) => (
  <div className="relative pl-12">
     <div className="absolute left-3.5 top-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-slate-900" />
     <div className="flex flex-col">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{date}</span>
        <h5 className="text-xs font-black text-white uppercase tracking-widest mb-1">{label}</h5>
        <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">{desc}</p>
     </div>
  </div>
);

export default EmployeeManagement;
