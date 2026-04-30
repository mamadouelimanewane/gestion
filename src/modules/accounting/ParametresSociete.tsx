import React, { useState } from 'react';
import { Settings, Building, MapPin, Phone, Globe, Lock, ShieldCheck, Save, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ParametresSociete = () => {
  const [activeTab, setActiveTab] = useState('identification');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const tabs = [
    { id: 'identification', label: 'Identification', icon: Building },
    { id: 'comptabilite', label: 'Comptabilité', icon: Settings },
    { id: 'securite', label: 'Sécurité & Accès', icon: Lock },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#cbd5e1] h-full flex flex-col overflow-hidden shadow-sm">
      <div className="flex h-full">
        {/* Sidebar de navigation interne */}
        <div className="w-80 border-r border-[#cbd5e1] bg-[#f8fafc] p-6 flex flex-col gap-8">
          <div>
            <h4 className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest px-4 mb-6">Paramètres Société</h4>
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-4 ${
                    activeTab === tab.id 
                    ? 'bg-white text-[#005eb8] shadow-sm border border-[#cbd5e1]' 
                    : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
                  }`}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto">
             <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-4">
                <Activity size={20} className="text-[#005eb8]" />
                <div>
                   <p className="text-[10px] font-bold text-[#005eb8] uppercase tracking-widest leading-none mb-1">Status Système</p>
                   <p className="text-[11px] text-[#334155] font-bold uppercase">Connecté (Live)</p>
                </div>
             </div>
          </div>
        </div>

        {/* Zone de contenu */}
        <div className="flex-1 p-12 overflow-auto bg-white">
          <AnimatePresence mode="wait">
            {activeTab === 'identification' && (
              <motion.div 
                key="id"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl space-y-12"
              >
                <div>
                  <h3 className="text-3xl font-bold text-[#0f172a] tracking-tighter uppercase mb-2">Identification de l'entreprise</h3>
                  <p className="text-[#64748b] text-[11px] font-bold uppercase tracking-widest italic">Informations juridiques et coordonnées affichées sur vos documents.</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <InputField label="Raison Sociale" value="GESTIONPRO S.A.R.L" />
                  <InputField label="NINEA / SIRET" value="SN DKR 2024 B 1234" />
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">Adresse</label>
                    <div className="relative">
                      <input type="text" defaultValue="Avenue Cheikh Anta Diop" className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-10 pr-4 py-3 text-xs font-bold text-[#334155] outline-none focus:border-[#005eb8] transition-all shadow-inner" />
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    </div>
                  </div>
                  <InputField label="Ville / Pays" value="Dakar, Sénégal" />
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">Téléphone</label>
                    <div className="relative">
                      <input type="text" defaultValue="+221 33 800 00 00" className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-10 pr-4 py-3 text-xs font-bold text-[#334155] outline-none focus:border-[#005eb8] transition-all shadow-inner" />
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">Site Web</label>
                    <div className="relative">
                      <input type="text" defaultValue="https://gestionpro.sn" className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-10 pr-4 py-3 text-xs font-bold text-[#334155] outline-none focus:border-[#005eb8] transition-all shadow-inner" />
                      <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-[#f1f5f9] flex justify-end gap-4">
                  <button className="px-8 py-3 bg-[#f1f5f9] text-[#64748b] rounded-xl text-[11px] font-bold uppercase tracking-widest hover:text-[#0f172a] transition-all">Annuler</button>
                  <button 
                    onClick={handleSave}
                    className="px-10 py-3 bg-[#005eb8] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-3 transition-all hover:bg-[#004080]"
                  >
                    {isSaving ? <Activity size={18} className="animate-spin" /> : <Save size={18} />}
                    {isSaving ? 'Synchronisation...' : 'Enregistrer les modifications'}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'comptabilite' && (
              <motion.div 
                key="acc"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl space-y-10"
              >
                <div>
                  <h3 className="text-3xl font-bold text-[#0f172a] tracking-tighter uppercase mb-2">Options Comptables</h3>
                  <p className="text-[#64748b] text-[11px] font-bold uppercase tracking-widest italic">Paramétrage des méthodes de calcul et de saisie.</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-[#f8fafc] p-8 rounded-xl border border-[#cbd5e1] space-y-6 shadow-inner">
                    <ToggleField label="Gestion de la TVA sur les encaissements" desc="Activer le calcul automatique de la TVA lors du règlement." active />
                    <div className="h-[1px] bg-[#cbd5e1] w-full" />
                    <ToggleField label="Lettrage automatique à la saisie" desc="Proposer le lettrage dès qu'une écriture de tiers est équilibrée." />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">Devise de Tenue de Compte</label>
                      <select className="w-full bg-white border border-[#cbd5e1] rounded-lg px-4 py-3 text-xs font-bold text-[#334155] outline-none focus:border-[#005eb8] transition-all shadow-inner appearance-none cursor-pointer">
                        <option>XOF - Franc CFA</option>
                        <option>EUR - Euro</option>
                        <option>USD - Dollar US</option>
                      </select>
                    </div>
                    <InputField label="Longueur des comptes G." value="6" type="number" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'securite' && (
              <motion.div 
                key="sec"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl space-y-8"
              >
                <div className="p-8 bg-green-50 border border-green-100 rounded-xl flex gap-6 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#107e3e] flex items-center justify-center text-white shadow-lg shadow-green-500/20 shrink-0">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#107e3e] text-sm uppercase tracking-tight mb-1">Protection des données certifiée</h4>
                    <p className="text-[11px] text-[#107e3e] font-bold uppercase tracking-widest opacity-80 leading-relaxed">
                      Votre base de données est chiffrée selon les standards AES-256. L'accès est restreint aux administrateurs Basis et auditeurs certifiés.
                    </p>
                  </div>
                </div>
                
                <div className="bg-[#f8fafc] p-8 rounded-xl border border-[#cbd5e1] shadow-inner">
                  <h4 className="text-[11px] font-bold text-[#0f172a] mb-8 uppercase tracking-widest border-b border-[#cbd5e1] pb-4">Audit Log & Disponibilité</h4>
                  <div className="space-y-6">
                    <AuditRow label="Dernière sauvegarde intégrale" value="29/11/2024 10:15" />
                    <AuditRow label="Utilisateurs connectés en temps réel" value="3 actifs" />
                    <AuditRow label="Taux de disponibilité mensuel" value="99.98%" color="green" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value, type = "text" }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">{label}</label>
    <input 
      type={type} 
      defaultValue={value} 
      className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-4 py-3 text-xs font-bold text-[#334155] outline-none focus:border-[#005eb8] transition-all shadow-inner" 
    />
  </div>
);

const ToggleField = ({ label, desc, active }: any) => (
  <div className="flex items-center justify-between group">
    <div className="space-y-1">
      <p className="text-xs font-bold text-[#334155] uppercase tracking-tight group-hover:text-[#005eb8] transition-colors">{label}</p>
      <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-widest opacity-70">{desc}</p>
    </div>
    <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${active ? 'bg-[#005eb8]' : 'bg-[#cbd5e1]'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${active ? 'right-1' : 'left-1'}`}></div>
    </div>
  </div>
);

const AuditRow = ({ label, value, color }: any) => (
  <div className="flex justify-between items-center py-4 border-b border-[#f1f5f9] last:border-0">
    <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest">{label}</span>
    <span className={`text-[11px] font-bold uppercase tracking-widest ${color === 'green' ? 'text-[#107e3e]' : 'text-[#005eb8]'} font-mono`}>{value}</span>
  </div>
);

export default ParametresSociete;
