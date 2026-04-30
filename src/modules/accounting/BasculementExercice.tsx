import React, { useState } from 'react';
import { Rocket, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

const BasculementExercice = () => {
  const [steps] = useState([
    { id: 1, label: 'Génération du report à nouveau (Balances)', status: 'Prêt' },
    { id: 2, label: 'Clôture définitive des journaux N-1', status: 'En attente' },
    { id: 3, label: 'Ouverture des nouveaux codes journaux N', status: 'Prêt' },
    { id: 4, label: 'Transfert des postes budgétaires', status: 'Optionnel' },
  ]);

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-[#cbd5e1] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-[#005eb8] rounded-2xl border border-blue-100 shadow-inner">
            <Rocket size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0f172a] uppercase tracking-tight">Basculement d'Exercice</h3>
            <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-widest">Préparation et ouverture du nouvel exercice comptable</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Colonne Gauche : Configuration */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl border border-[#cbd5e1] shadow-sm">
            <h4 className="text-sm font-bold text-[#0f172a] mb-6 flex items-center gap-3 uppercase tracking-tight">
              <ShieldCheck size={18} className="text-[#107e3e]" /> Paramètres de l'exercice
            </h4>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest block mb-2">Exercice actuel (N-1)</label>
                <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-4 py-2 text-sm font-bold text-[#94a3b8] shadow-inner">2024</div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest block mb-2">Nouvel Exercice (N)</label>
                <input type="text" defaultValue="2025" className="w-full bg-white border border-[#cbd5e1] rounded-lg px-4 py-2 text-sm font-bold text-[#334155] outline-none focus:border-[#005eb8] shadow-inner transition-all" />
              </div>
              <div className="pt-6 border-t border-[#f1f5f9]">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-[#cbd5e1] text-[#005eb8] focus:ring-[#005eb8]" />
                  <span className="text-xs font-bold text-[#475569] uppercase tracking-wider group-hover:text-[#0f172a] transition-colors">Détailler les reports à nouveau par pièce</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-6 rounded-xl flex gap-4 items-start shadow-sm">
            <AlertCircle className="text-[#dc2626] shrink-0" size={24} />
            <p className="text-[11px] text-[#b91c1c] font-bold uppercase tracking-wider leading-relaxed">
              <strong>Crucial :</strong> Avant de basculer, assurez-vous d'avoir effectué une sauvegarde complète de votre base de données. 
              Le report à nouveau peut être régénéré plusieurs fois jusqu'à la clôture définitive.
            </p>
          </div>
        </div>

        {/* Colonne Droite : Étapes du processus */}
        <div className="bg-[#f8fafc] p-8 rounded-xl border border-dashed border-[#cbd5e1] flex flex-col shadow-inner">
          <h4 className="text-[11px] font-bold text-[#64748b] uppercase tracking-widest mb-8">Progression du basculement</h4>
          <div className="space-y-4 flex-1">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#cbd5e1] shadow-sm hover:border-[#005eb8] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#f1f5f9] border border-[#cbd5e1] flex items-center justify-center text-xs font-bold text-[#64748b] shadow-inner">
                    {s.id}
                  </div>
                  <span className="text-xs font-bold text-[#334155] uppercase tracking-tight">{s.label}</span>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded border uppercase tracking-wider ${
                  s.status === 'Prêt' ? 'bg-green-50 text-[#107e3e] border-green-200' : 
                  s.status === 'Optionnel' ? 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]' : 'bg-orange-50 text-orange-600 border-orange-200'
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 py-4 bg-[#005eb8] hover:bg-[#004080] text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3 group">
            Lancer l'ouverture de l'exercice 2025 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasculementExercice;
