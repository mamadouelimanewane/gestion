import React, { useState } from 'react';
import { Settings, Building, MapPin, Phone, Globe, Lock, ShieldCheck } from 'lucide-react';

const ParametresSociete = () => {
  const [activeTab, setActiveTab] = useState('identification');

  return (
    <div className="card h-full flex flex-col p-0 overflow-hidden bg-slate-900/50">
      <div className="flex h-full">
        {/* Sidebar de navigation interne */}
        <div className="w-64 border-r border-slate-700/50 bg-slate-800/20 p-4 space-y-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase px-3 mb-4">Paramètres Société</h4>
          <button 
            onClick={() => setActiveTab('identification')}
            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'identification' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}
          >
            <Building size={16} /> Identification
          </button>
          <button 
            onClick={() => setActiveTab('comptabilite')}
            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'comptabilite' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}
          >
            <Settings size={16} /> Comptabilité
          </button>
          <button 
            onClick={() => setActiveTab('securite')}
            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'securite' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}
          >
            <Lock size={16} /> Sécurité & Accès
          </button>
        </div>

        {/* Zone de contenu */}
        <div className="flex-1 p-8 overflow-auto">
          {activeTab === 'identification' && (
            <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Identification de l'entreprise</h3>
                <p className="text-slate-400 text-sm">Informations juridiques et coordonnées affichées sur vos documents.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Raison Sociale</label>
                  <input type="text" defaultValue="GESTIONPRO S.A.R.L" className="input w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">NINEA / SIRET</label>
                  <input type="text" defaultValue="SN DKR 2024 B 1234" className="input w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Adresse</label>
                  <div className="relative">
                    <input type="text" defaultValue="Avenue Cheikh Anta Diop" className="input w-full pl-10" />
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Ville / Pays</label>
                  <input type="text" defaultValue="Dakar, Sénégal" className="input w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Téléphone</label>
                  <div className="relative">
                    <input type="text" defaultValue="+221 33 800 00 00" className="input w-full pl-10" />
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Site Web</label>
                  <div className="relative">
                    <input type="text" defaultValue="https://gestionpro.sn" className="input w-full pl-10" />
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700/50 flex justify-end">
                <button className="btn btn-primary px-8">Enregistrer les modifications</button>
              </div>
            </div>
          )}

          {activeTab === 'comptabilite' && (
            <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Options Comptables</h3>
                <p className="text-slate-400 text-sm">Paramétrage des méthodes de calcul et de saisie.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-200">Gestion de la TVA sur les encaissements</p>
                      <p className="text-xs text-slate-500">Activer le calcul automatique de la TVA lors du règlement.</p>
                    </div>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
                    <div>
                      <p className="text-sm font-bold text-slate-200">Lettrage automatique à la saisie</p>
                      <p className="text-xs text-slate-500">Proposer le lettrage dès qu'une écriture de tiers est équilibrée.</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Devise de Tenue de Compte</label>
                    <select className="input w-full">
                      <option>XOF - Franc CFA</option>
                      <option>EUR - Euro</option>
                      <option>USD - Dollar US</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Longueur des comptes G.</label>
                    <input type="number" defaultValue="6" className="input w-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'securite' && (
            <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex gap-4">
                <ShieldCheck className="text-emerald-400 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-emerald-400 text-sm">Protection des données activée</h4>
                  <p className="text-xs text-emerald-300/70 mt-1">
                    Votre base de données est chiffrée selon les standards AES-256. L'accès est restreint aux administrateurs.
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
                <h4 className="font-bold text-slate-200 mb-4 text-sm uppercase tracking-wider">Audit Log</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs py-2 border-b border-slate-700/30">
                    <span className="text-slate-400">Dernière sauvegarde</span>
                    <span className="text-indigo-400 font-mono">29/11/2024 10:15</span>
                  </div>
                  <div className="flex justify-between text-xs py-2 border-b border-slate-700/30">
                    <span className="text-slate-400">Utilisateurs connectés</span>
                    <span className="text-indigo-400 font-mono">3 actifs</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParametresSociete;
