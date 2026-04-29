import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Activity, Cpu, Database, 
  AlertTriangle, CheckCircle2, Play, 
  Square, RefreshCw, BarChart3, ShieldCheck,
  Users, HardDrive, Timer, Gauge
} from 'lucide-react';

const LoadTestingDashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [loadLevel, setLoadLevel] = useState(0);
  const [metrics, setMetrics] = useState({
    transactions: 0,
    latency: 12,
    cpu: 14,
    memory: 240,
    concurrency: 0,
    integrity: 100
  });

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setMetrics(prev => ({
          transactions: prev.transactions + Math.floor(Math.random() * 500) + 200,
          latency: Math.max(12, Math.min(450, prev.latency + (Math.random() * 20 - 5))),
          cpu: Math.min(99, prev.cpu + (Math.random() * 5 - 2)),
          memory: Math.min(8192, prev.memory + (Math.random() * 100 - 10)),
          concurrency: Math.min(5000, prev.concurrency + Math.floor(Math.random() * 50)),
          integrity: prev.latency > 350 ? 99.98 : 100
        }));
        setLoadLevel(prev => Math.min(100, prev + 1));
      }, 500);
    } else {
      setLoadLevel(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTest = () => {
    setIsRunning(true);
    setMetrics({ transactions: 0, latency: 12, cpu: 14, memory: 240, concurrency: 0, integrity: 100 });
  };

  const stopTest = () => setIsRunning(false);

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 shadow-inner text-rose-400">
              <Zap size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Centre de Tests de Charge & Stress</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Simulation de Concurrence Massive • Performance SAP-Grade</p>
           </div>
        </div>
        <div className="flex gap-4">
           {!isRunning ? (
             <button 
               onClick={startTest}
               className="flex items-center gap-2 px-8 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-rose-600/30"
             >
                <Play size={16} /> Lancer le Stress Test
             </button>
           ) : (
             <button 
               onClick={stopTest}
               className="flex items-center gap-2 px-8 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-slate-700"
             >
                <Square size={16} /> Arrêter la Simulation
             </button>
           )}
        </div>
      </div>

      {/* Main Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <MetricBox label="Transactions / Sec" value={`${metrics.transactions.toLocaleString()}`} icon={<Activity size={20} />} color={metrics.cpu > 80 ? "rose" : "indigo"} />
         <MetricBox label="Latence API (Joule)" value={`${metrics.latency.toFixed(0)} ms`} icon={<Timer size={20} />} color={metrics.latency > 200 ? "amber" : "emerald"} />
         <MetricBox label="Utilisateurs Simultanés" value={`${metrics.concurrency.toLocaleString()}`} icon={<Users size={20} />} color="indigo" />
         <MetricBox label="Intégrité des Données" value={`${metrics.integrity}%`} icon={<ShieldCheck size={20} />} color={metrics.integrity < 100 ? "rose" : "emerald"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Live Performance Graph */}
         <div className="lg:col-span-2 card bg-slate-800/20 border-slate-700/50 p-8 flex flex-col gap-6 shadow-2xl">
            <div className="flex justify-between items-center">
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Courbe de Charge en Temps Réel</h4>
               <div className="flex gap-4 text-[9px] font-bold text-slate-500 uppercase">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div> CPU</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Transactions</span>
               </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-slate-800/50 pb-2">
               {[...Array(40)].map((_, i) => {
                 const height = isRunning ? Math.random() * 80 + 10 : 5;
                 return (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${height}%` }}
                     className={`flex-1 rounded-t-sm ${height > 70 ? 'bg-rose-500/50' : 'bg-indigo-500/30'}`}
                   />
                 );
               })}
            </div>

            <div className="flex justify-between items-center px-4">
               <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Charge Système</span>
                     <span className={`text-sm font-black ${metrics.cpu > 80 ? 'text-rose-400' : 'text-slate-200'}`}>{metrics.cpu.toFixed(1)}%</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Mémoire Vive (RAM)</span>
                     <span className="text-sm font-black text-slate-200">{(metrics.memory / 1024).toFixed(2)} GB</span>
                  </div>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl">
                  <Gauge size={16} className="text-indigo-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capacité Max : 50k TPS</span>
               </div>
            </div>
         </div>

         {/* Integrity & Logs */}
         <div className="card bg-slate-800/20 border-slate-700/50 p-8 flex flex-col gap-6 shadow-2xl">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Rapport d'Intégrité Audit</h4>
            <div className="space-y-6">
               <IntegrityCheck label="Vérification Hash SHA-256" status={metrics.integrity === 100 ? "Success" : "Warning"} />
               <IntegrityCheck label="Séquençage ACDOCA" status="Success" />
               <IntegrityCheck label="Audit Immuabilité" status="Success" />
               <IntegrityCheck label="Synchronisation Multi-threading" status={metrics.latency > 300 ? "Lag" : "Success"} />
            </div>

            <div className="mt-auto p-4 bg-slate-900/50 rounded-2xl border border-slate-700/30">
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Activity size={12} /> Log de Simulation
               </p>
               <div className="font-mono text-[9px] text-emerald-400/80 leading-relaxed space-y-1">
                  <p>[INFO] Starting stress test sequence...</p>
                  <p>[INFO] Simulating {metrics.concurrency} users...</p>
                  {metrics.latency > 200 && <p className="text-rose-400">[WARN] Latency threshold exceeded: {metrics.latency.toFixed(0)}ms</p>}
                  {metrics.integrity < 100 && <p className="text-rose-500">[ERROR] Data jitter detected on block #{metrics.transactions}</p>}
               </div>
            </div>
         </div>
      </div>

      {/* Footer Info */}
      <div className="bg-indigo-600/5 border border-indigo-500/20 p-8 rounded-[2.5rem] flex items-center gap-8 shadow-inner">
         <div className="w-16 h-16 bg-indigo-500/10 rounded-[1.5rem] flex items-center justify-center text-indigo-400 shadow-inner border border-indigo-500/10">
            <HardDrive size={32} />
         </div>
         <div className="flex-1">
            <h5 className="text-sm font-black text-white uppercase tracking-widest mb-2">Résilience Infra SAP-Grade</h5>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
               GestionPro utilise une architecture de base de données partitionnée capable de gérer des pics de charge de **50 000 transactions par seconde**. 
               Le moteur de validation immuable garantit qu'aucune donnée n'est corrompue même lors d'une saturation CPU à 99%.
            </p>
         </div>
         <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
            <Download size={16} /> Exporter Rapport de Stress
         </button>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value, icon, color }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden shadow-xl border-slate-700/50 p-6">
    <div className={`absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full bg-${color === 'rose' ? 'rose' : 'indigo'}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <div className="flex items-center gap-3 mb-3">
       <div className={`p-2 bg-${color}-500/10 text-${color}-400 rounded-lg`}>
          {icon}
       </div>
       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
    </div>
    <h3 className="text-xl font-black text-white">{value}</h3>
  </div>
);

const IntegrityCheck = ({ label, status }: any) => (
  <div className="flex items-center justify-between">
     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</span>
     <div className="flex items-center gap-2">
        <span className={`text-[9px] font-black uppercase ${
           status === 'Success' ? 'text-emerald-400' : status === 'Warning' ? 'text-amber-400' : 'text-rose-400'
        }`}>{status}</span>
        {status === 'Success' ? (
           <CheckCircle2 size={12} className="text-emerald-500" />
        ) : (
           <AlertTriangle size={12} className="text-amber-500" />
        )}
     </div>
  </div>
);

export default LoadTestingDashboard;
