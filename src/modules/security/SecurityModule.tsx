import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Key, AlertTriangle, Lock, Search, Filter, ShieldAlert } from 'lucide-react';

const SecurityModule = () => {
  const [activeTab, setActiveTab] = useState('audit');

  const tabs = [
    { id: 'audit', label: 'Piste d\'Audit', icon: Eye },
    { id: 'connexions', label: 'Journal des Connexions', icon: ShieldCheck },
    { id: 'alertes', label: 'Alertes de Sécurité', icon: ShieldAlert },
    { id: 'politiques', label: 'Politiques & Mots de passe', icon: Key },
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
      {/* Piste d'Audit */}
      {activeTab === 'audit' && (
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
                  placeholder="Rechercher une action..."
                  className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm transition-colors">
                <Filter size={16} />
                Filtrer par module
              </button>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm transition-colors text-slate-300">
                Exporter le journal (PDF/CSV)
              </button>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700/50">
                  <tr>
                    <th className="p-4 font-medium">Horodatage</th>
                    <th className="p-4 font-medium">Utilisateur</th>
                    <th className="p-4 font-medium">Action</th>
                    <th className="p-4 font-medium">Module / Ressource</th>
                    <th className="p-4 font-medium">Détails (Ancien -&gt; Nouveau)</th>
                    <th className="p-4 font-medium text-center">Niveau</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {[
                    { time: '29/10/2024 10:45:12', user: 'Admin Principal', action: 'Modification', module: 'Paramètres Société', details: 'NINEA: 001... -> 001...V2', level: 'Critique', color: 'rose' },
                    { time: '29/10/2024 09:30:00', user: 'Comptable Junior', action: 'Création', module: 'Écriture Comptable', details: 'Saisie pièce HA-2024-10', level: 'Information', color: 'slate' },
                    { time: '28/10/2024 16:15:44', user: 'Directeur Financier', action: 'Validation', module: 'Paiements', details: 'Approbation virement fournisseur BETA', level: 'Important', color: 'amber' },
                    { time: '28/10/2024 14:02:10', user: 'Admin Principal', action: 'Archivage', module: 'Exercices', details: 'Clôture de l\'exercice 2023', level: 'Critique', color: 'rose' },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 text-slate-400 font-mono text-xs">{log.time}</td>
                      <td className="p-4 font-medium text-slate-300">{log.user}</td>
                      <td className="p-4 font-medium">{log.action}</td>
                      <td className="p-4 text-slate-400">{log.module}</td>
                      <td className="p-4 text-slate-500 text-xs truncate max-w-xs">{log.details}</td>
                      <td className="p-4">
                        <div className={`mx-auto w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-${log.color}-500/10 text-${log.color}-400 border border-${log.color}-500/20`}>
                          {log.level}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </motion.div>
      )}

      {/* Journal des Connexions */}
      {activeTab === 'connexions' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            <div className="card border-emerald-500/20 bg-emerald-500/5">
              <h3 className="text-emerald-400 font-bold mb-1">Connexions Réussies (24h)</h3>
              <p className="text-3xl font-bold">142</p>
            </div>
            <div className="card border-rose-500/20 bg-rose-500/5">
              <h3 className="text-rose-400 font-bold mb-1">Échecs de Connexion (24h)</h3>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="card">
              <h3 className="text-slate-400 font-bold mb-1">IP Uniques (24h)</h3>
              <p className="text-3xl font-bold">12</p>
            </div>
          </div>
          
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
             <div className="p-4 border-b border-slate-700/50">
                <h3 className="font-semibold">Tentatives récentes</h3>
             </div>
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700/50">
                  <tr>
                    <th className="p-4 font-medium">Date & Heure</th>
                    <th className="p-4 font-medium">Identifiant</th>
                    <th className="p-4 font-medium">Adresse IP</th>
                    <th className="p-4 font-medium">Localisation (GeoIP)</th>
                    <th className="p-4 font-medium">Appareil / Navigateur</th>
                    <th className="p-4 font-medium text-center">Résultat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {[
                    { time: '29/10/2024 10:50:11', email: 'admin@antigravity.sn', ip: '197.214.X.X', geo: 'Dakar, SN', device: 'Windows / Chrome', status: 'Succès', color: 'emerald' },
                    { time: '29/10/2024 08:15:00', email: 'compta@antigravity.sn', ip: '197.214.X.Y', geo: 'Dakar, SN', device: 'Mac / Safari', status: 'Succès', color: 'emerald' },
                    { time: '29/10/2024 02:34:12', email: 'admin@antigravity.sn', ip: '45.133.X.X', geo: 'Moscou, RU', device: 'Unknown / Firefox', status: 'Échec (Mot de passe)', color: 'rose' },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 text-slate-400 font-mono text-xs">{log.time}</td>
                      <td className="p-4 font-medium">{log.email}</td>
                      <td className="p-4 font-mono text-slate-400 text-xs">{log.ip}</td>
                      <td className="p-4 text-slate-400">{log.geo}</td>
                      <td className="p-4 text-slate-500 text-xs">{log.device}</td>
                      <td className="p-4">
                        <div className={`mx-auto w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-${log.color}-500/10 text-${log.color}-400 border border-${log.color}-500/20`}>
                          {log.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </motion.div>
      )}

      {/* Alertes de Sécurité */}
      {activeTab === 'alertes' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="card border-amber-500/30 bg-amber-500/5">
             <div className="flex items-center gap-3 text-amber-400 mb-4">
                <AlertTriangle size={24} />
                <h3 className="font-bold text-lg">Alertes en cours</h3>
             </div>
             
             <div className="space-y-3">
                {[
                  { title: 'Tentative de connexion suspecte (Étranger)', details: 'Adresse IP: 45.133.X.X (Moscou, RU) ciblant le compte admin@antigravity.sn', severity: 'Élevée', date: 'Aujourd\'hui, 02:34' },
                  { title: 'Mot de passe obsolète détecté', details: 'L\'utilisateur compta@antigravity.sn n\'a pas changé son mot de passe depuis 90 jours.', severity: 'Moyenne', date: 'Hier, 10:00' },
                ].map((alert, i) => (
                  <div key={i} className="flex items-start justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                    <div>
                      <p className="font-medium text-slate-200">{alert.title}</p>
                      <p className="text-sm text-slate-400 mt-1">{alert.details}</p>
                      <p className="text-xs text-slate-500 mt-2">{alert.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${alert.severity === 'Élevée' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                          Sévérité : {alert.severity}
                       </span>
                       <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 mt-2">
                          Marquer comme résolu
                       </button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>
      )}

      {/* Politiques */}
      {activeTab === 'politiques' && (
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
         >
            <div className="card">
               <div className="flex items-center gap-3 mb-6">
                  <Lock className="text-indigo-400" />
                  <h3 className="font-bold text-lg">Politique de Mots de Passe</h3>
               </div>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-sm">Longueur minimale</span>
                     <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm w-24">
                        <option>8</option>
                        <option selected>12</option>
                        <option>16</option>
                     </select>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm">Caractères spéciaux requis</span>
                     <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-slate-900" />
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm">Expiration du mot de passe (Jours)</span>
                     <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm w-24">
                        <option>30</option>
                        <option>60</option>
                        <option selected>90</option>
                        <option>Jamais</option>
                     </select>
                  </div>
               </div>
            </div>

            <div className="card">
               <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-emerald-400" />
                  <h3 className="font-bold text-lg">Mesures Actives</h3>
               </div>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
                     <div>
                        <p className="font-medium text-emerald-400">Double Authentification (2FA)</p>
                        <p className="text-xs text-slate-400 mt-1">Obligatoire pour les administrateurs</p>
                     </div>
                     <button className="text-xs font-medium bg-emerald-500 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-colors">
                        Configuré
                     </button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-800">
                     <div>
                        <p className="font-medium text-slate-300">Verrouillage de session</p>
                        <p className="text-xs text-slate-500 mt-1">Après 15 minutes d'inactivité</p>
                     </div>
                     <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">
                        Modifier
                     </button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-800">
                     <div>
                        <p className="font-medium text-slate-300">Restriction par IP</p>
                        <p className="text-xs text-slate-500 mt-1">Non configuré</p>
                     </div>
                     <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">
                        Configurer
                     </button>
                  </div>
               </div>
            </div>
         </motion.div>
      )}

    </div>
  );
};

export default SecurityModule;
