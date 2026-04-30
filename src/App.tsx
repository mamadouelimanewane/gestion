import React, { useState, useEffect } from 'react';
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
  Sun,
  Moon,
  Palette,
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

/* ── Types ─────────────────────────────────────────────────── */
type Theme = 'dark' | 'light' | 'blue';

/* ── Theme cycle button ────────────────────────────────────── */
const themeConfig: Record<Theme, { label: string; next: Theme; icon: React.ReactNode }> = {
  dark:  { label: 'Sombre',  next: 'light', icon: <Moon  size={14} /> },
  light: { label: 'Clair',   next: 'blue',  icon: <Sun   size={14} /> },
  blue:  { label: 'Océan',   next: 'dark',  icon: <Palette size={14} /> },
};

/* ── Sidebar nav item ──────────────────────────────────────── */
const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <motion.button
    whileHover={{ x: 3 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{
      background: active ? 'var(--primary)' : 'transparent',
      color:      active ? '#fff'            : 'var(--text-sub)',
    }}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 hover:opacity-100"
    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--border)'; }}
    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
  >
    <Icon size={16} strokeWidth={active ? 2.2 : 1.8} />
    <span className="text-[11px] font-semibold tracking-wide" style={{ color: active ? '#fff' : 'var(--text-sub)' }}>
      {label}
    </span>
    {active && <ChevronRight size={12} className="ml-auto opacity-50" />}
  </motion.button>
);

/* ── Separator ─────────────────────────────────────────────── */
const NavSep = ({ label }: { label: string }) => (
  <p className="px-3 pt-4 pb-1 text-[9px] font-bold uppercase tracking-[0.15em]"
     style={{ color: 'var(--text-muted)' }}>
    {label}
  </p>
);

/* ─────────────────────────────────────────────────────────── */
const App = () => {
  const [activeTab, setActiveTab] = useState('Comptabilité');
  const [theme, setTheme]         = useState<Theme>('light');

  /* Apply theme to <html> */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const cycleTheme = () => setTheme(themeConfig[theme].next);

  const menuItems = [
    /* ── Analyse */
    { sep: 'Analyse' },
    { icon: LineChart,    label: 'Statistiques'  },
    { icon: BarChart3,    label: 'Reporting'     },

    /* ── Finance */
    { sep: 'Finance' },
    { icon: BookOpen,     label: 'Comptabilité'  },
    { icon: FileText,     label: 'Facturation'   },
    { icon: Wallet,       label: 'Trésorerie'    },

    /* ── Opérations */
    { sep: 'Opérations' },
    { icon: ShoppingCart, label: 'Achats'        },
    { icon: Package,      label: 'Stocks'        },
    { icon: Users,        label: 'RH'            },

    /* ── Système */
    { sep: 'Système' },
    { icon: Settings,     label: 'Administration'},
    { icon: ShieldCheck,  label: 'Sécurité'      },
    { icon: Sparkles,     label: 'Démonstration' },
  ];

  const tc = themeConfig[theme];

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: 'var(--bg-app)', color: 'var(--text-main)' }}
    >
      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside
        className="w-52 flex-shrink-0 flex flex-col border-r"
        style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border)' }}
      >
        {/* Logo */}
        <div className="px-4 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shadow-md"
                 style={{ background: 'var(--primary)' }}>
              <BarChart3 size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none" style={{ color: 'var(--text-main)' }}>
                Gestion<span style={{ color: 'var(--primary)' }}>Pro</span>
              </p>
              <p className="text-[9px] mt-0.5 font-medium tracking-wide"
                 style={{ color: 'var(--text-muted)' }}>
                Enterprise Cloud
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 pb-2 overflow-y-auto">
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

        {/* User + theme */}
        <div className="px-3 py-3" style={{ borderTop: '1px solid var(--border)' }}>
          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-2 text-[10px] font-semibold transition-all"
            style={{
              background: 'var(--border)',
              color: 'var(--text-sub)',
              border: '1px solid var(--border)',
            }}
          >
            {tc.icon}
            <span>Thème : {tc.label}</span>
          </button>

          {/* User row */}
          <div className="flex items-center gap-2.5 px-1 py-1">
            <div className="w-6 h-6 rounded-md flex-shrink-0"
                 style={{ background: 'linear-gradient(135deg, var(--primary), #c084fc)' }} />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold truncate" style={{ color: 'var(--text-main)' }}>
                Admin Expert
              </p>
              <p className="text-[9px] truncate" style={{ color: 'var(--text-muted)' }}>
                Expert Comptable
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ───────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header
          className="h-13 flex-shrink-0 flex items-center justify-between px-5 border-b backdrop-blur-md"
          style={{
            background: 'var(--bg-header)',
            borderColor: 'var(--border)',
            height: '52px',
          }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 w-64 transition-all group"
            style={{ background: 'var(--border)', border: '1px solid var(--border)' }}
          >
            <Search size={13} style={{ color: 'var(--text-muted)' }} className="flex-shrink-0" />
            <input
              type="text"
              placeholder="T-Code, client, pièce..."
              className="bg-transparent border-none outline-none text-[11px] w-full"
              style={{ color: 'var(--text-main)' }}
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-[11px] font-medium" style={{ color: 'var(--text-main)' }}>
                Société Antigravity
              </p>
              <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
                Exercice 2024 · OUVERT
              </p>
            </div>

            <div className="h-4 w-px" style={{ background: 'var(--border)' }} />

            <button className="relative p-1.5 rounded-lg transition-all"
                    style={{ background: 'var(--border)' }}>
              <Bell size={14} style={{ color: 'var(--text-sub)' }} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: 'var(--border)', border: '1px solid var(--border)' }}>
              <User size={13} style={{ color: 'var(--text-sub)' }} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="p-5"
            >
              {/* Page title */}
              <div className="mb-5">
                <h2 className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                  {activeTab}
                </h2>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  GestionPro ERP · v6.2
                </p>
              </div>

              {/* Modules */}
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

        <JouleAssistant />
      </main>
    </div>
  );
};

export default App;
