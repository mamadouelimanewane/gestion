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
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Rocket size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Basculement d'Exercice</h3>
            <p className="text-sm text-slate-400">Préparation et ouverture du nouvel exercice comptable</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Colonne Gauche : Configuration */}
        <div className="space-y-6">
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
            <h4 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" /> Paramètres de l'exercice
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Exercice actuel (N-1)</label>
                <div className="input w-full bg-slate-900/40 opacity-60">2024</div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Nouvel Exercice (N)</label>
                <input type="text" defaultValue="2025" className="input w-full" />
              </div>
              <div className="pt-4 border-t border-slate-700/50">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-700 bg-slate-900" />
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Détailler les reports à nouveau par pièce</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex gap-3 items-start">
            <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-rose-400/80 leading-relaxed">
              <strong>Crucial :</strong> Avant de basculer, assurez-vous d'avoir effectué une sauvegarde complète de votre base de données. 
              Le report à nouveau peut être régénéré plusieurs fois jusqu'à la clôture définitive.
            </p>
          </div>
        </div>

        {/* Colonne Droite : Étapes du processus */}
        <div className="bg-slate-800/20 p-6 rounded-2xl border border-dashed border-slate-700 flex flex-col">
          <h4 className="font-bold text-slate-300 mb-6">Progression du basculement</h4>
          <div className="space-y-4 flex-1">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                    {s.id}
                  </div>
                  <span className="text-sm text-slate-200">{s.label}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  s.status === 'Prêt' ? 'bg-emerald-500/10 text-emerald-400' : 
                  s.status === 'Optionnel' ? 'bg-slate-700 text-slate-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary w-full mt-8 py-4 flex items-center justify-center gap-3 group">
            Lancer l'ouverture de l'exercice 2025 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasculementExercice;
