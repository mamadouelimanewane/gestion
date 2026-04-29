import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Banknote, Calendar, Clock, UserPlus, Search, Plus, Filter, Download, Briefcase } from 'lucide-react';

const HRModule = () => {
  const [activeTab, setActiveTab] = useState('personnel');

  const tabs = [
    { id: 'personnel', label: 'Personnel', icon: Users },
    { id: 'paie', label: 'Paie', icon: Banknote },
    { id: 'conges', label: 'Congés & Absences', icon: Calendar },
    { id: 'presences', label: 'Présences', icon: Clock },
    { id: 'recrutement', label: 'Recrutement', icon: UserPlus },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on tab */}
      {activeTab === 'personnel' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          {/* Action Bar */}
          <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher un employé..."
                  className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm transition-colors">
                <Filter size={16} />
                Filtres
              </button>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm transition-colors">
                <Download size={16} />
                Exporter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
                <Plus size={16} />
                Nouvel Employé
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700/50">
                <tr>
                  <th className="p-4 font-medium">Matricule</th>
                  <th className="p-4 font-medium">Nom & Prénom</th>
                  <th className="p-4 font-medium">Département</th>
                  <th className="p-4 font-medium">Poste</th>
                  <th className="p-4 font-medium">Date d'embauche</th>
                  <th className="p-4 font-medium text-center">Statut</th>
                  <th className="p-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {[
                  { id: 'EMP-001', name: 'Sophie Martin', dept: 'Comptabilité', role: 'Directrice Financière', date: '12 Jan 2020', status: 'Actif', color: 'emerald' },
                  { id: 'EMP-002', name: 'Lucas Bernard', dept: 'Informatique', role: 'Développeur Senior', date: '05 Mar 2021', status: 'Actif', color: 'emerald' },
                  { id: 'EMP-003', name: 'Emma Dubois', dept: 'Ressources Humaines', role: 'Chargée de Recrutement', date: '18 Fév 2022', status: 'Actif', color: 'emerald' },
                  { id: 'EMP-004', name: 'Thomas Petit', dept: 'Marketing', role: 'Chef de Projet', date: '30 Juin 2023', status: 'En Congé', color: 'amber' },
                  { id: 'EMP-005', name: 'Julie Leroy', dept: 'Ventes', role: 'Commerciale', date: '15 Sep 2023', status: 'Actif', color: 'emerald' },
                ].map((emp, i) => (
                  <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-medium text-slate-300">{emp.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                           {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {emp.name}
                      </div>
                    </td>
                    <td className="p-4 text-slate-400">{emp.dept}</td>
                    <td className="p-4 text-slate-300">{emp.role}</td>
                    <td className="p-4 text-slate-400">{emp.date}</td>
                    <td className="p-4">
                      <div className={`mx-auto w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-${emp.color}-500/10 text-${emp.color}-400 border border-${emp.color}-500/20`}>
                        {emp.status}
                      </div>
                    </td>
                    <td className="p-4">
                      <button className="text-slate-400 hover:text-indigo-400 transition-colors mx-auto block">
                        Voir profil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Paie */}
      {activeTab === 'paie' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            <div className="card">
              <p className="text-sm text-slate-400">Masse Salariale (Mois en cours)</p>
              <h3 className="text-2xl font-bold mt-2 text-slate-100">84,500 €</h3>
              <p className="text-xs text-rose-400 mt-1">+2.4% vs mois précédent</p>
            </div>
            <div className="card">
              <p className="text-sm text-slate-400">Fiches de Paie Générées</p>
              <h3 className="text-2xl font-bold mt-2 text-slate-100">42 / 45</h3>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mt-3">
                 <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '93%' }}></div>
              </div>
            </div>
            <div className="card flex flex-col justify-center items-center">
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
                Générer la Paie d'Octobre
              </button>
            </div>
          </div>
          
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
             <div className="p-4 border-b border-slate-700/50">
                <h3 className="font-semibold">Historique des Campagnes de Paie</h3>
             </div>
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700/50">
                  <tr>
                    <th className="p-4 font-medium">Période</th>
                    <th className="p-4 font-medium">Effectif</th>
                    <th className="p-4 font-medium text-right">Masse Salariale Brute</th>
                    <th className="p-4 font-medium text-right">Charges Sociales</th>
                    <th className="p-4 font-medium text-right">Net à Payer</th>
                    <th className="p-4 font-medium text-center">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {[
                    { period: 'Septembre 2024', eff: 45, brut: '105,200 €', charges: '42,080 €', net: '82,550 €', status: 'Clôturé', color: 'emerald' },
                    { period: 'Août 2024', eff: 44, brut: '102,500 €', charges: '41,000 €', net: '80,450 €', status: 'Clôturé', color: 'emerald' },
                    { period: 'Juillet 2024', eff: 44, brut: '102,500 €', charges: '41,000 €', net: '80,450 €', status: 'Clôturé', color: 'emerald' },
                  ].map((pay, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-medium">{pay.period}</td>
                      <td className="p-4 text-slate-400">{pay.eff} employés</td>
                      <td className="p-4 text-right text-slate-300">{pay.brut}</td>
                      <td className="p-4 text-right text-slate-400">{pay.charges}</td>
                      <td className="p-4 text-right font-bold text-slate-200">{pay.net}</td>
                      <td className="p-4">
                        <div className={`mx-auto w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-${pay.color}-500/10 text-${pay.color}-400 border border-${pay.color}-500/20`}>
                          {pay.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </motion.div>
      )}

      {/* Congés & Absences */}
      {activeTab === 'conges' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="card border-indigo-500/30 bg-indigo-500/5">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-indigo-400">
                    <Calendar size={24} />
                    <h3 className="font-bold text-lg">Demandes en attente d'approbation</h3>
                </div>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-bold">
                    3 demandes
                </span>
             </div>
             
             <div className="space-y-3">
                {[
                  { name: 'Thomas Petit', type: 'Congés Payés', dates: '12 Nov - 18 Nov 2024', duration: '5 jours', requestedOn: 'Aujourd\'hui' },
                  { name: 'Sophie Martin', type: 'RTT', dates: '25 Oct 2024', duration: '1 jour', requestedOn: 'Hier' },
                  { name: 'Lucas Bernard', type: 'Télétravail Exceptionnel', dates: '22 Oct 2024', duration: '1 jour', requestedOn: 'Il y a 2 jours' },
                ].map((req, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sm border border-slate-700">
                           {req.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">{req.name}</p>
                          <p className="text-xs text-slate-400">{req.type} • {req.dates} ({req.duration})</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <p className="text-xs text-slate-500 hidden md:block">Demandé: {req.requestedOn}</p>
                       <div className="flex gap-2">
                           <button className="px-3 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg text-sm transition-colors">
                              Refuser
                           </button>
                           <button className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-sm transition-colors">
                              Approuver
                           </button>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>
      )}

      {/* Recrutement */}
      {activeTab === 'recrutement' && (
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card flex flex-col items-center justify-center h-96 border-dashed"
         >
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <Briefcase size={32} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Module Recrutement</h3>
            <p className="text-slate-400 max-w-md text-center mb-6">
              Gérez vos offres d'emploi, suivez les candidats, planifiez des entretiens et centralisez les évaluations.
            </p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
              Créer une offre d'emploi
            </button>
         </motion.div>
      )}
      
      {/* Présences */}
      {activeTab === 'presences' && (
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card flex flex-col items-center justify-center h-96 border-dashed"
         >
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <Clock size={32} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Suivi des Présences</h3>
            <p className="text-slate-400 max-w-md text-center mb-6">
              Visualisez les pointages, les retards, les heures supplémentaires et exportez les données vers la paie.
            </p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
              Voir le planning d'aujourd'hui
            </button>
         </motion.div>
      )}

    </div>
  );
};

export default HRModule;
