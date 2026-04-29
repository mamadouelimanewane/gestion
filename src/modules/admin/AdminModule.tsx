import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Users, Building, CalendarClock, Globe, Percent, Sliders, Database, Save } from 'lucide-react';

const AdminModule = () => {
  const [activeTab, setActiveTab] = useState('societe');

  const tabs = [
    { id: 'societe', label: 'Société', icon: Building },
    { id: 'utilisateurs', label: 'Utilisateurs & Rôles', icon: Users },
    { id: 'exercices', label: 'Exercices Comptables', icon: CalendarClock },
    { id: 'parametres', label: 'Taxes & Devises', icon: Percent },
    { id: 'systeme', label: 'Système', icon: Sliders },
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

      {/* Société */}
      {activeTab === 'societe' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 card">
                <h3 className="font-bold text-lg mb-6 border-b border-slate-700/50 pb-4">Informations de l'Entreprise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex flex-col gap-2">
                      <label className="text-sm text-slate-400">Raison Sociale</label>
                      <input type="text" defaultValue="Société Antigravity" className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500" />
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-sm text-slate-400">Forme Juridique</label>
                      <select className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-200">
                         <option>SA</option>
                         <option>SARL</option>
                         <option>SAS</option>
                         <option>SUARL</option>
                      </select>
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-sm text-slate-400">Numéro d'Identification Fiscale (NINEA/NIF)</label>
                      <input type="text" defaultValue="0012345672V2" className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500" />
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-sm text-slate-400">Registre du Commerce (RCCM)</label>
                      <input type="text" defaultValue="SN DKR 2024 B 1234" className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500" />
                   </div>
                   <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-sm text-slate-400">Adresse Complète</label>
                      <input type="text" defaultValue="123 Avenue de l'Innovation, Dakar, Sénégal" className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500" />
                   </div>
                </div>
                <div className="mt-8 flex justify-end">
                   <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
                      <Save size={18} />
                      Enregistrer les modifications
                   </button>
                </div>
             </div>
             
             <div className="card flex flex-col items-center justify-center border-dashed">
                <div className="w-32 h-32 rounded-full bg-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center mb-4 relative group cursor-pointer overflow-hidden">
                   <Building size={48} className="text-slate-500" />
                   <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Modifier le logo</span>
                   </div>
                </div>
                <h3 className="font-bold">Logo de l'entreprise</h3>
                <p className="text-xs text-slate-500 text-center mt-2">Ce logo apparaîtra sur vos factures, devis et états financiers.</p>
             </div>
          </div>
        </motion.div>
      )}

      {/* Utilisateurs */}
      {activeTab === 'utilisateurs' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h3 className="font-bold text-lg">Gestion des Utilisateurs</h3>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
              Ajouter un utilisateur
            </button>
          </div>

          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700/50">
                  <tr>
                    <th className="p-4 font-medium">Utilisateur</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Rôle</th>
                    <th className="p-4 font-medium">Dernière connexion</th>
                    <th className="p-4 font-medium text-center">Statut</th>
                    <th className="p-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {[
                    { name: 'Admin Principal', email: 'admin@antigravity.sn', role: 'Administrateur', lastLogin: 'A l\'instant', status: 'Actif', color: 'emerald' },
                    { name: 'Comptable Junior', email: 'compta@antigravity.sn', role: 'Saisie Comptable', lastLogin: 'Hier à 14:30', status: 'Actif', color: 'emerald' },
                    { name: 'Directeur Financier', email: 'daf@antigravity.sn', role: 'Superviseur', lastLogin: 'Il y a 2 jours', status: 'Inactif', color: 'slate' },
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-medium">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                               {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            {user.name}
                         </div>
                      </td>
                      <td className="p-4 text-slate-400">{user.email}</td>
                      <td className="p-4"><span className="px-2 py-1 bg-slate-700 rounded-md text-xs font-medium">{user.role}</span></td>
                      <td className="p-4 text-slate-500 text-xs">{user.lastLogin}</td>
                      <td className="p-4">
                        <div className={`mx-auto w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-${user.color}-500/10 text-${user.color}-400 border border-${user.color}-500/20`}>
                          {user.status}
                        </div>
                      </td>
                      <td className="p-4">
                         <button className="text-indigo-400 hover:text-indigo-300 transition-colors mx-auto block text-xs font-medium">
                            Gérer les droits
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </motion.div>
      )}

      {/* Exercices */}
      {activeTab === 'exercices' && (
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
         >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { year: '2024', start: '01/01/2024', end: '31/12/2024', status: 'En cours', color: 'emerald', active: true },
                 { year: '2023', start: '01/01/2023', end: '31/12/2023', status: 'Clôturé', color: 'slate', active: false },
                 { year: '2025', start: '01/01/2025', end: '31/12/2025', status: 'Prévu', color: 'indigo', active: false },
               ].map((exo, i) => (
                  <div key={i} className={`card border ${exo.active ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-700'}`}>
                     <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-2xl">{exo.year}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${exo.color}-500/10 text-${exo.color}-400 border border-${exo.color}-500/20`}>
                           {exo.status}
                        </span>
                     </div>
                     <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                           <span className="text-slate-500">Date d'ouverture</span>
                           <span className="font-medium">{exo.start}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-slate-500">Date de clôture</span>
                           <span className="font-medium">{exo.end}</span>
                        </div>
                     </div>
                     <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${exo.active ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : exo.status === 'Prévu' ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-slate-800/50 text-slate-500 cursor-not-allowed'}`}>
                        {exo.active ? 'Clôturer l\'exercice' : exo.status === 'Prévu' ? 'Ouvrir l\'exercice' : 'Voir l\'archive'}
                     </button>
                  </div>
               ))}
            </div>
         </motion.div>
      )}

      {/* Système */}
      {activeTab === 'systeme' && (
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
         >
            <div className="card">
               <div className="flex items-center gap-3 mb-6">
                  <Database className="text-indigo-400" />
                  <h3 className="font-bold text-lg">Sauvegardes & Données</h3>
               </div>
               <p className="text-sm text-slate-400 mb-6">Vos données sont sauvegardées automatiquement dans le cloud toutes les heures.</p>
               <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-between p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
                     <span className="text-sm font-medium">Lancer une sauvegarde manuelle</span>
                     <Save size={16} className="text-slate-400" />
                  </button>
                  <button className="flex items-center justify-between p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
                     <span className="text-sm font-medium">Restaurer à partir d'un point</span>
                     <Sliders size={16} className="text-slate-400" />
                  </button>
               </div>
            </div>

            <div className="card">
               <div className="flex items-center gap-3 mb-6">
                  <Globe className="text-emerald-400" />
                  <h3 className="font-bold text-lg">Préférences Générales</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="font-medium">Langue par défaut</p>
                        <p className="text-xs text-slate-500">Interface utilisateur</p>
                     </div>
                     <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm">
                        <option>Français (FR)</option>
                        <option>Anglais (EN)</option>
                     </select>
                  </div>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="font-medium">Format de date</p>
                        <p className="text-xs text-slate-500">Affichage dans les rapports</p>
                     </div>
                     <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm">
                        <option>JJ/MM/AAAA</option>
                        <option>MM/JJ/AAAA</option>
                     </select>
                  </div>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="font-medium">Plan Comptable par défaut</p>
                        <p className="text-xs text-slate-500">Référentiel</p>
                     </div>
                     <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm">
                        <option>SYSCOHADA Révisé</option>
                        <option>PCG 2014</option>
                     </select>
                  </div>
               </div>
            </div>
         </motion.div>
      )}

      {/* Paramètres (Taxes & Devises) */}
      {activeTab === 'parametres' && (
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card flex flex-col items-center justify-center h-96 border-dashed"
         >
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <Percent size={32} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Taxes & Devises</h3>
            <p className="text-slate-400 max-w-md text-center mb-6">
              Configurez les taux de TVA applicables (ex: 18%), les retenues à la source, et les devises gérées avec leurs taux de conversion temporels.
            </p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
              Gérer les taux de TVA
            </button>
         </motion.div>
      )}

    </div>
  );
};

export default AdminModule;
