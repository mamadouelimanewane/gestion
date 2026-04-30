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
  LineChart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AccountingModule    from './modules/accounting/AccountingModule';
import InvoicingModule     from './modules/billing/InvoicingModule';
import PurchasesModule     from './modules/purchases/PurchasesModule';
import InventoryModule     from './modules/inventory/InventoryModule';
import HRModule            from './modules/hr/HRModule';
import TreasuryModule      from './modules/treasury/TreasuryModule';
import ReportingModule     from './modules/reporting/ReportingModule';
import AdminModule         from './modules/admin/AdminModule';
import SecurityModule      from './modules/security/SecurityModule';
import EndToEndDemo        from './modules/demo/EndToEndDemo';
import StatistiquesModule  from './modules/stats/StatistiquesModule';
import JouleAssistant      from './components/ai/JouleAssistant';

/* ─── SAP Fiori Navigation Item ────────────────────────────── */
const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all relative group ${
      active
        ? 'bg-[#e5f0fa] text-[#0a6ed1]'
        : 'text-[#556b82] hover:bg-[#f4f5f6] hover:text-[#1d2d3e]'
    }`}
  >
    {/* Active indicator bar */}
    {active && (
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0a6ed1] rounded-r-sm" />
    )}
    <Icon 
      size={18} 
      strokeWidth={active ? 2.2 : 1.8} 
      className={active ? 'text-[#0a6ed1]' : 'text-[#748ca5] group-hover:text-[#0a6ed1]'} 
    />
    <span className={`text-[13px] font-medium tracking-tight ${active ? 'font-bold' : ''}`}>
      {label}
    </span>
    {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
  </button>
);

/* ─── SAP Section Separator ────────────────────────────────── */
const NavSep = ({ label }: { label: string }) => (
  <p className="px-4 pt-6 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#748ca5] border-t border-[#f4f5f6] mt-2 first:border-t-0 first:mt-0">
    {label}
  </p>
);

/* ─── App Main Shell ────────────────────────────────────────── */
const App = () => {
  const [activeTab, setActiveTab] = useState('Comptabilité');

  const menuItems = [
    { sep: 'Insights' },
    { icon: LineChart,    label: 'Statistiques'  },
    { icon: BarChart3,    label: 'Reporting'     },

    { sep: 'Finance & Administration' },
    { icon: BookOpen,     label: 'Comptabilité'  },
    { icon: FileText,     label: 'Facturation'   },
    { icon: Wallet,       label: 'Trésorerie'    },

    { sep: 'Supply Chain & Personnel' },
    { icon: ShoppingCart, label: 'Achats'        },
    { icon: Package,      label: 'Stocks'        },
    { icon: Users,        label: 'RH'            },

    { sep: 'System & Governance' },
    { icon: Settings,     label: 'Administration'},
    { icon: ShieldCheck,  label: 'Sécurité'      },
    { icon: Sparkles,     label: 'Démonstration' },
  ];

  return (
    <div className="flex h-screen bg-[#f4f5f6] text-[#1d2d3e] font-sans selection:bg-[#0a6ed1]/20">
      
      {/* ── SAP Fiori Sidebar (Side Content Area) ────────────── */}
      <aside className="w-60 flex-shrink-0 flex flex-col bg-white border-r border-[#d9d9d9] shadow-sm z-20">
        
        {/* Brand/Logo Area */}
        <div className="px-5 py-6 bg-[#354a5f] border-b border-[#28323c]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded flex items-center justify-center border border-white/20">
              <BarChart3 size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none text-white tracking-tight">
                Gestion<span className="text-white/70 italic">Pro</span>
              </p>
              <p className="text-[9px] text-white/40 mt-1 font-bold uppercase tracking-widest">
                ERP S/4 Powered
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item: any, i) =>
            item.sep
              ? <NavSep key={`sep-${i}`} label={item.sep} />
              : (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={activeTab === item.label}
                  onClick={() => setActiveTab(item.label)}
                />
              )
          )}
        </nav>

        {/* Footer Sidebar / Profile Quick-view */}
        <div className="px-4 py-4 border-t border-[#f4f5f6] bg-[#fcfcfc]">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded bg-[#354a5f] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              AE
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-[#1d2d3e] truncate">Admin Expert</p>
              <p className="text-[10px] text-[#748ca5] truncate">System Administrator</p>
            </div>
          </div>
          <button className="mt-4 w-full py-2 text-[11px] font-bold text-[#556b82] hover:text-[#0a6ed1] border border-[#d9d9d9] hover:border-[#0a6ed1] rounded transition-all bg-white shadow-sm active:scale-95">
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Main Application Shell ───────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* SAP Fiori Shell Bar (Header) */}
        <header className="h-12 flex-shrink-0 flex items-center justify-between px-6 bg-[#354a5f] text-white shadow-md z-30">
          
          {/* Left: Search Bar (SAP Style) */}
          <div className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded px-4 py-1.5 w-80 transition-all group cursor-text">
            <Search size={14} className="text-white/60 group-hover:text-white" />
            <input
              type="text"
              placeholder="Search SAP S/4HANA app, client..."
              className="bg-transparent border-none outline-none text-xs w-full placeholder:text-white/40 text-white"
            />
          </div>

          {/* Right: Actions and Corporate Logo */}
          <div className="flex items-center gap-5">
            {/* Environment Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] font-bold text-amber-200">
              PROD · FY2024
            </div>

            <div className="h-5 w-px bg-white/10" />

            {/* Notifications */}
            <button className="relative p-1.5 hover:bg-white/10 rounded transition-all group">
              <Bell size={18} className="text-white/70 group-hover:text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#354a5f]" />
            </button>

            {/* User Profile */}
            <button className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-7 h-7 rounded-full bg-indigo-400 border border-white/20 flex items-center justify-center text-[10px] font-bold">
                JD
              </div>
            </button>
          </div>
        </header>

        {/* Dynamic Page Scroll Area */}
        <div className="flex-1 overflow-y-auto bg-[#f4f5f6]">
          
          {/* SAP Launchpad Title Section */}
          <div className="px-8 pt-8 pb-4">
             <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-[#0a6ed1] uppercase tracking-wider">Business Application</span>
                <ChevronRight size={10} className="text-[#d9d9d9]" />
                <span className="text-[11px] font-medium text-[#748ca5]">Global ERP v6.2</span>
             </div>
             <h2 className="text-2xl font-semibold text-[#1d2d3e]">{activeTab}</h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="px-8 pb-10"
            >
              {/* Module dynamic mounting */}
              {activeTab === 'Statistiques'  && <StatistiquesModule />}
              {activeTab === 'Comptabilité'  && <AccountingModule />}
              {activeTab === 'Facturation'   && <InvoicingModule />}
              {activeTab === 'Achats'        && <PurchasesModule />}
              {activeTab === 'Stocks'        && <InventoryModule />}
              {activeTab === 'RH'            && <HRModule />}
              {activeTab === 'Trésorerie'    && <TreasuryModule />}
              {activeTab === 'Reporting'     && <ReportingModule />}
              {activeTab === 'Administration'&& <AdminModule />}
              {activeTab === 'Sécurité'      && <SecurityModule />}
              {activeTab === 'Démonstration' && <EndToEndDemo />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Integrated Joule Assistant */}
        <JouleAssistant />
      </main>
    </div>
  );
};

export default App;
