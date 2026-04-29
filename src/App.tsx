import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingCart, 
  Package, 
  FileText, 
  Users, 
  Wallet, 
  BarChart3, 
  Settings, 
  ShieldCheck,
  ChevronRight,
  Bell,
  Search,
  User,
  TrendingUp,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AccountingModule from './modules/accounting/AccountingModule';
import InvoicingModule from './modules/billing/InvoicingModule';
import PurchasesModule from './modules/purchases/PurchasesModule';
import InventoryModule from './modules/inventory/InventoryModule';
import HRModule from './modules/hr/HRModule';
import TreasuryModule from './modules/treasury/TreasuryModule';
import ReportingModule from './modules/reporting/ReportingModule';
import AdminModule from './modules/admin/AdminModule';
import SecurityModule from './modules/security/SecurityModule';
import EndToEndDemo from './modules/demo/EndToEndDemo';
import JouleAssistant from './components/ai/JouleAssistant';

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <motion.div
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-xs font-black uppercase tracking-widest">{label}</span>
    {active && (
      <motion.div layoutId="active-pill" className="ml-auto">
        <ChevronRight size={16} />
      </motion.div>
    )}
  </motion.div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('Tableau de bord');

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord' },
    { icon: BookOpen, label: 'Comptabilité' },
    { icon: ShoppingCart, label: 'Achats' },
    { icon: Package, label: 'Stocks' },
    { icon: FileText, label: 'Facturation' },
    { icon: Users, label: 'RH' },
    { icon: Wallet, label: 'Trésorerie' },
    { icon: BarChart3, label: 'Reporting' },
    { icon: Settings, label: 'Administration' },
    { icon: ShieldCheck, label: 'Sécurité' },
    { icon: Sparkles, label: 'Démonstration' },
  ];

  return (
    <div className="flex min-h-screen bg-[#060b18] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Ultra-Premium */}
      <aside className="w-72 border-r border-slate-800/50 p-6 flex flex-col gap-8 bg-slate-900/50 backdrop-blur-3xl relative z-20">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 border border-indigo-400/30">
            <BarChart3 className="text-white" size={28} />
          </div>
          <div>
            <h1 className="font-black text-2xl tracking-tighter leading-none">Gestion<span className="text-indigo-400 italic">Pro</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mt-1">Enterprise Cloud</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.label}
              onClick={() => setActiveTab(item.label)}
            />
          ))}
        </nav>

        <div className="mt-auto p-5 bg-gradient-to-br from-indigo-600/10 to-transparent rounded-[2rem] border border-indigo-500/10 shadow-inner">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg border border-white/10" />
            <div>
              <p className="text-xs font-black uppercase text-white tracking-widest">Admin Expert</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase">Expert Comptable</p>
            </div>
          </div>
          <button className="w-full py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] -z-10 rounded-full" />
        
        {/* Topbar SAP-Style */}
        <header className="h-20 border-b border-slate-800/50 px-8 flex items-center justify-between bg-slate-900/30 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4 bg-slate-800/50 px-5 py-2.5 rounded-2xl border border-slate-700/50 w-[450px] shadow-inner focus-within:border-indigo-500/50 transition-all group">
            <Search size={18} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher une transaction (T-Code), un client, une pièce..." 
              className="bg-transparent border-none outline-none text-xs w-full placeholder:text-slate-600 text-slate-200 font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative p-2 hover:bg-slate-800 rounded-xl cursor-pointer transition-all">
              <Bell size={20} className="text-slate-400 hover:text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#060b18]" />
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right">
                <p className="text-xs font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-widest">Société Antigravity</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Exercice Fiscal 2024 • OUVERT</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-indigo-500/50 group-hover:scale-105 transition-all shadow-inner">
                <User size={22} className="text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(circle_at_20%_20%,_rgba(30,41,59,0.1)_0%,_rgba(6,11,24,0)_100%)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {/* Header Title with Subtext */}
              <div className="flex items-center justify-between mb-10">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                      <div className="h-px w-8 bg-indigo-500"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Navigation ERP v6.2</span>
                   </div>
                   <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{activeTab}</h2>
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-800/50 hover:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all border border-slate-700">
                     <FileText size={16} /> Exporter Rapport
                  </button>
                  <button className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-600/30">
                     <Zap size={16} /> Action Rapide
                  </button>
                </div>
              </div>

              {/* Module Content */}
              {activeTab === 'Tableau de bord' && (
                <div className="flex flex-col gap-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <DashboardStat label="Chiffre d'Affaires" value="458 230 000 F" trend="+12.5%" color="indigo" sub="Performance vs N-1" />
                    <DashboardStat label="Liquidité Totale" value="333 730 000 F" trend="+8.4%" color="emerald" sub="Position Cash Réelle" />
                    <DashboardStat label="DSO (Créances)" value="124 500 000 F" trend="-2.1%" color="rose" sub="Délai de Paiement Client" />
                    <DashboardStat label="Score ESG Index" value="84/100" trend="+4.0%" color="amber" sub="Indice de Durabilité" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 card bg-slate-800/20 border-slate-700/50 p-10 flex flex-col gap-8 group hover:border-indigo-500/30 transition-all shadow-2xl">
                       <div className="flex justify-between items-center">
                          <div>
                             <h3 className="text-sm font-black uppercase tracking-[0.25em] text-white">Analyse Prédictive des Revenus</h3>
                             <p className="text-xs text-slate-500 font-medium mt-1 italic">Simulation IA Joule basées sur les cycles saisonniers OHADA</p>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800">
                             <TrendingUp size={14} className="text-indigo-400" />
                             <span className="text-[10px] font-black text-slate-300 uppercase">+15.4% Est.</span>
                          </div>
                       </div>
                       <div className="h-[400px] bg-slate-900/50 rounded-3xl border border-slate-800 flex items-center justify-center relative overflow-hidden group/chart">
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                          <BarChart3 size={100} className="text-slate-800 opacity-20 group-hover/chart:opacity-40 group-hover/chart:scale-110 transition-all duration-1000" />
                          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                             <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] bg-slate-950 px-6 py-2.5 rounded-full border border-slate-800 shadow-2xl backdrop-blur-xl">Moteur d'Intelligence Business v4.0</p>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col gap-8">
                       <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-600 px-2 flex items-center gap-2">
                          <Zap size={14} /> Transactions Favoris
                       </h3>
                       <div className="grid grid-cols-2 gap-5">
                          <QuickTile label="F-02" sub="Journal Entry" icon={<BookOpen size={22} />} color="indigo" />
                          <QuickTile label="FB60" sub="Vendor Invoice" icon={<ShoppingCart size={22} />} color="emerald" />
                          <QuickTile label="F110" sub="Auto Payment" icon={<Wallet size={22} />} color="amber" />
                          <QuickTile label="FS10N" sub="G/L Balances" icon={<BarChart3 size={22} />} color="purple" />
                          <QuickTile label="ACDOCA" sub="Universal Journal" icon={<LayoutDashboard size={22} />} color="rose" />
                          <QuickTile label="ESG" sub="Sustainability" icon={<BarChart3 size={22} />} color="blue" />
                       </div>
                       
                       <div className="card bg-slate-800/40 border-slate-700/50 p-8 flex flex-col gap-6 shadow-2xl">
                          <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-slate-700/50 pb-4">Activité du Système</h3>
                          <div className="space-y-6">
                             {[
                               { label: 'Facture Client validée', time: '14:30', user: 'Admin', color: 'emerald' },
                               { label: 'Run de réévaluation devise', time: '12:15', user: 'System', color: 'indigo' },
                               { label: 'Ajustement inventaire', time: '10:00', user: 'Stock', color: 'amber' },
                             ].map((act, i) => (
                               <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                  <div className={`w-2 h-2 rounded-full bg-${act.color}-500 shadow-[0_0_12px_rgba(var(--tw-color-${act.color}-500),0.6)] group-hover:scale-150 transition-transform`} />
                                  <div className="flex-1">
                                     <p className="text-[11px] font-black text-slate-200 uppercase tracking-wide group-hover:text-indigo-400 transition-colors">{act.label}</p>
                                     <p className="text-[9px] text-slate-600 uppercase font-black mt-1">{act.time} • Opérateur {act.user}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Comptabilité' && <AccountingModule />}
              {activeTab === 'Facturation' && <InvoicingModule />}
              {activeTab === 'Achats' && <PurchasesModule />}
              {activeTab === 'Stocks' && <InventoryModule />}
              {activeTab === 'RH' && <HRModule />}
              {activeTab === 'Trésorerie' && <TreasuryModule />}
              {activeTab === 'Reporting' && <ReportingModule />}
              {activeTab === 'Administration' && <AdminModule />}
              { activeTab === 'Sécurité' && <SecurityModule /> }
              { activeTab === 'Démonstration' && <EndToEndDemo /> }

              {/* Module en cours Fallback */}
              {!['Tableau de bord', 'Comptabilité', 'Facturation', 'Achats', 'Stocks', 'RH', 'Trésorerie', 'Reporting', 'Administration', 'Sécurité'].includes(activeTab) && (
                <div className="card h-full flex flex-col items-center justify-center border-dashed p-32 text-center bg-slate-800/10 rounded-[3rem]">
                   <div className="p-8 bg-slate-800/50 rounded-3xl mb-8 ring-1 ring-slate-700 shadow-inner">
                      <Package size={64} className="text-slate-600 animate-pulse" />
                   </div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Module {activeTab}</h3>
                   <p className="text-slate-500 max-w-lg text-sm font-bold uppercase tracking-widest leading-relaxed">
                      Ce module est en cours de déploiement selon les spécifications SAP/OHADA fournies. 
                      L'activation complète est prévue pour la prochaine itération de développement.
                   </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global AI Assistant Joule */}
        <JouleAssistant />
      </main>
    </div>
  );
};

export default App;

const DashboardStat = ({ label, value, trend, color, sub }: any) => (
  <div className="card group hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden p-8 shadow-2xl">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-${color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}></div>
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-3">{label}</p>
    <div className="flex flex-col">
      <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors mb-4">{value}</h3>
      <div className="flex items-center justify-between">
        <span className={`text-[9px] font-black px-2 py-1 rounded-lg bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 uppercase tracking-widest`}>
          {trend}
        </span>
        <p className="text-[8px] font-black text-slate-700 uppercase tracking-tighter">{sub}</p>
      </div>
    </div>
  </div>
);

const QuickTile = ({ label, sub, icon, color }: any) => (
  <motion.div 
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl cursor-pointer hover:bg-slate-800/80 transition-all group flex flex-col gap-4 shadow-xl hover:shadow-indigo-500/20"
  >
     <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 flex items-center justify-center text-${color}-400 group-hover:scale-110 transition-all shadow-inner border border-${color}-500/10 group-hover:bg-indigo-600 group-hover:text-white`}>
        {icon}
     </div>
     <div>
        <h4 className="text-xs font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-widest leading-none mb-1">{label}</h4>
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">{sub}</p>
     </div>
  </motion.div>
);
