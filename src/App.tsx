import React, { useState } from 'react';
import {
  BookOpen,
  ShoppingCart,
  Package,
  FileText,
  Users,
  Wallet,
  BarChart3,
  Settings,
  ShieldCheck,
  Bell,
  Search,
  User,
  Sparkles,
  ChevronRight,
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

/* ─── Sidebar nav item ──────────────────────────────────────── */
const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <motion.button
    whileHover={{ x: 3 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${
      active
        ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-600/20'
        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
    }`}
  >
    <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
    <span className="text-[11px] font-semibold tracking-wide">{label}</span>
    {active && <ChevronRight size={13} className="ml-auto opacity-60" />}
  </motion.button>
);

/* ─── App ───────────────────────────────────────────────────── */
const App = () => {
  const [activeTab, setActiveTab] = useState('Comptabilité');

  const menuItems = [
    { icon: BookOpen,     label: 'Comptabilité'   },
    { icon: ShoppingCart, label: 'Achats'         },
    { icon: Package,      label: 'Stocks'         },
    { icon: FileText,     label: 'Facturation'    },
    { icon: Users,        label: 'RH'             },
    { icon: Wallet,       label: 'Trésorerie'     },
    { icon: BarChart3,    label: 'Reporting'      },
    { icon: Settings,     label: 'Administration' },
    { icon: ShieldCheck,  label: 'Sécurité'       },
    { icon: Sparkles,     label: 'Démonstration'  },
  ];

  return (
    <div className="flex h-screen bg-[#0b1120] text-slate-100 overflow-hidden">

      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside className="w-56 flex-shrink-0 flex flex-col bg-[#0d1526] border-r border-white/5">

        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <BarChart3 size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none text-white">
                Gestion<span className="text-indigo-400">Pro</span>
              </p>
              <p className="text-[9px] text-slate-600 mt-0.5 font-medium tracking-wide">
                Enterprise Cloud
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
          {menuItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.label}
              onClick={() => setActiveTab(item.label)}
            />
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-white truncate">Admin Expert</p>
              <p className="text-[9px] text-slate-500 truncate">Expert Comptable</p>
            </div>
          </div>
          <button className="mt-2 w-full py-1.5 text-[10px] text-slate-500 hover:text-slate-200 border border-white/5 hover:border-white/10 rounded-lg transition-all hover:bg-white/5">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header className="h-14 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/5 bg-[#0d1526]/50 backdrop-blur-md">

          {/* Search */}
          <div className="flex items-center gap-2.5 bg-white/5 hover:bg-white/[0.07] border border-white/5 hover:border-white/10 rounded-xl px-3.5 py-2 w-72 transition-all group">
            <Search size={14} className="text-slate-500 group-hover:text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="T-Code, client, pièce comptable..."
              className="bg-transparent border-none outline-none text-[11px] w-full placeholder:text-slate-600 text-slate-300"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-[11px] font-medium text-slate-300">Société Antigravity</p>
              <p className="text-[9px] text-slate-600">Exercice 2024 · OUVERT</p>
            </div>
            <div className="h-5 w-px bg-white/5" />
            <button className="relative p-1.5 rounded-lg hover:bg-white/5 transition-all">
              <Bell size={15} className="text-slate-400" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:border-indigo-500/30 transition-all">
              <User size={15} className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="p-6"
            >
              {/* Page title */}
              <div className="mb-5">
                <h2 className="text-base font-semibold text-white">{activeTab}</h2>
                <p className="text-[10px] text-slate-600 mt-0.5">GestionPro ERP · v6.2</p>
              </div>

              {/* Modules */}
              {activeTab === 'Comptabilité'   && <AccountingModule />}
              {activeTab === 'Facturation'    && <InvoicingModule />}
              {activeTab === 'Achats'         && <PurchasesModule />}
              {activeTab === 'Stocks'         && <InventoryModule />}
              {activeTab === 'RH'             && <HRModule />}
              {activeTab === 'Trésorerie'     && <TreasuryModule />}
              {activeTab === 'Reporting'      && <ReportingModule />}
              {activeTab === 'Administration' && <AdminModule />}
              {activeTab === 'Sécurité'       && <SecurityModule />}
              {activeTab === 'Démonstration'  && <EndToEndDemo />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* IA Joule */}
        <JouleAssistant />
      </main>
    </div>
  );
};

export default App;
