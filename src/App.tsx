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
  User
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
    <span className="font-medium">{label}</span>
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
  ];

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-100">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-800/50 p-6 flex flex-col gap-8 glass">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
            <BarChart3 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">Gestion<span className="text-indigo-400">Pro</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Comptabilité & Finance</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
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

        <div className="mt-auto p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
            <div>
              <p className="text-sm font-semibold">Admin Expert</p>
              <p className="text-xs text-slate-500">Expert Comptable</p>
            </div>
          </div>
          <button className="w-full py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors border border-slate-700 rounded-lg hover:bg-slate-800">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 border-b border-slate-800/50 px-8 flex items-center justify-between glass">
          <div className="flex items-center gap-4 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50 w-96">
            <Search size={18} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Rechercher une écriture, une facture..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell size={20} className="text-slate-400 cursor-pointer hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0f172a]" />
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-medium group-hover:text-indigo-400 transition-colors">Société Antigravity</p>
                <p className="text-xs text-slate-500">Exercice 2024</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-indigo-500/50 transition-all">
                <User size={20} className="text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#0f172a] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold">{activeTab}</h2>
                  <p className="text-slate-400 mt-1">Gérez votre {activeTab.toLowerCase()} en toute simplicité.</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium transition-colors border border-slate-700">
                    Exporter PDF
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
                    Nouvelle Action
                  </button>
                </div>
              </div>

              {/* Dashboard Content Mockup */}
              {activeTab === 'Tableau de bord' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Chiffre d\'Affaires', value: '458,230 €', trend: '+12.5%', color: 'indigo' },
                    { label: 'Charges Totales', value: '124,500 €', trend: '-2.1%', color: 'rose' },
                    { label: 'Trésorerie Net', value: '333,730 €', trend: '+8.4%', color: 'emerald' },
                    { label: 'Factures en Retard', value: '12', trend: '+2', color: 'amber' },
                  ].map((stat, i) => (
                    <div key={i} className="card">
                      <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                      <div className="flex items-end justify-between mt-2">
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400 border border-${stat.color}-500/20`}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="col-span-1 md:col-span-2 lg:col-span-3 card h-96 flex flex-col items-center justify-center border-dashed">
                    <BarChart3 size={48} className="text-slate-700 mb-4" />
                    <p className="text-slate-500 font-medium">Graphique d'évolution des flux financiers</p>
                    <p className="text-xs text-slate-600 mt-1">Données temps réel synchronisées</p>
                  </div>

                  <div className="col-span-1 card flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Activités Récentes</h3>
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <div className="flex-1">
                          <p className="text-xs font-medium">Vente Facture #4501</p>
                          <p className="text-[10px] text-slate-500">Il y a 2 heures • Client Alpha</p>
                        </div>
                        <p className="text-xs font-bold">+1,200 €</p>
                      </div>
                    ))}
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
              {activeTab === 'Sécurité' && <SecurityModule />}

              {activeTab !== 'Tableau de bord' && activeTab !== 'Comptabilité' && activeTab !== 'Facturation' && activeTab !== 'Achats' && activeTab !== 'Stocks' && activeTab !== 'RH' && activeTab !== 'Trésorerie' && activeTab !== 'Reporting' && activeTab !== 'Administration' && activeTab !== 'Sécurité' && (
                <div className="card h-[600px] flex flex-col items-center justify-center border-dashed">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-700">
                    <Package size={32} className="text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold">Module {activeTab}</h3>
                  <p className="text-slate-400 mt-2 text-center max-w-md">
                    Le module de {activeTab.toLowerCase()} est en cours d'initialisation. Les fonctionnalités spécifiées dans le cahier des charges sont en cours d'implémentation.
                  </p>
                  <button className="mt-8 px-6 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl transition-all">
                    En savoir plus sur ce module
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
