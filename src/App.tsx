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
  Sparkles,
  ChevronRight,
  LineChart,
  LogOut,
  HelpCircle,
  Cpu,
  ChevronLeft,
  ChevronDown,
  Building2,
  Globe
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

/* ─── Sidebar Nav Item ──────────────────────────────────────── */
interface NavItemProps {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, collapsed, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    title={collapsed ? label : undefined}
    className={`sidebar-nav-item ${active ? 'active' : ''}`}
    style={{ justifyContent: collapsed ? 'center' : 'flex-start', paddingLeft: collapsed ? '0.75rem' : '0.875rem' }}
  >
    <Icon size={18} strokeWidth={active ? 2 : 1.75} />
    {!collapsed && <span>{label}</span>}
    {!collapsed && active && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
  </button>
);

/* ─── Sidebar Section Label ─────────────────────────────────── */
const NavSection = ({ label, collapsed }: { label: string; collapsed: boolean }) => (
  collapsed
    ? <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.5rem 0.75rem' }} />
    : <p style={{
        padding: '1rem 1rem 0.375rem',
        fontSize: '0.6rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#475569',
        lineHeight: 1,
      }}>
        {label}
      </p>
);

/* ─── Main App ──────────────────────────────────────────────── */
const App = () => {
  const [activeTab, setActiveTab] = useState('Comptabilité');
  const [collapsed, setCollapsed] = useState(false);

  const menuGroups = [
    {
      label: 'Tableau de bord',
      items: [
        { icon: LineChart,    label: 'Statistiques'   },
        { icon: BarChart3,    label: 'Reporting'      },
      ]
    },
    {
      label: 'Finance',
      items: [
        { icon: BookOpen,     label: 'Comptabilité'   },
        { icon: FileText,     label: 'Facturation'    },
        { icon: Wallet,       label: 'Trésorerie'     },
      ]
    },
    {
      label: 'Opérations',
      items: [
        { icon: ShoppingCart, label: 'Achats'         },
        { icon: Package,      label: 'Stocks'         },
        { icon: Users,        label: 'RH'             },
      ]
    },
    {
      label: 'Système',
      items: [
        { icon: Settings,     label: 'Administration' },
        { icon: ShieldCheck,  label: 'Sécurité'       },
        { icon: Sparkles,     label: 'Démonstration'  },
      ]
    },
  ];

  const sidebarWidth = collapsed ? 64 : 240;

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--clr-bg)', overflow: 'hidden' }}>

      {/* ══ SIDEBAR ═══════════════════════════════════════════════ */}
      <aside style={{
        width: sidebarWidth,
        flexShrink: 0,
        background: 'var(--clr-sidebar)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        zIndex: 40,
        position: 'relative',
      }}>
        {/* Brand */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.625rem',
          padding: collapsed ? '1.125rem 0' : '1.125rem 1rem',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          minHeight: 60,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--clr-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Cpu size={18} color="#fff" strokeWidth={2} />
          </div>
          {!collapsed && (
            <div style={{ overflow: 'hidden', minWidth: 0 }}>
              <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#F1F5F9', lineHeight: 1.2, whiteSpace: 'nowrap', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}>
                Gestion<span style={{ color: '#A5B4FC' }}>Pro</span>
              </p>
              <p style={{ fontSize: '0.6rem', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2, whiteSpace: 'nowrap' }}>
                ERP Enterprise
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.125rem' }}
          className="custom-scrollbar">
          {menuGroups.map((group) => (
            <div key={group.label}>
              <NavSection label={group.label} collapsed={collapsed} />
              {group.items.map((item) => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={activeTab === item.label}
                  collapsed={collapsed}
                  onClick={() => setActiveTab(item.label)}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem' }}>
          {!collapsed && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.5rem 0.5rem', marginBottom: '0.5rem',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'rgba(79, 70, 229, 0.25)',
                border: '1px solid rgba(129, 140, 248, 0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.6875rem', fontWeight: 700, color: '#A5B4FC',
                flexShrink: 0,
              }}>MK</div>
              <div style={{ overflow: 'hidden', minWidth: 0 }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#E2E8F0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Mamadou Kane
                </p>
                <p style={{ fontSize: '0.7rem', color: '#4B5563', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Chef Comptable
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
              padding: '0.4rem',
              borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)',
              background: 'transparent', color: '#4B5563',
              fontSize: '0.75rem', fontWeight: 500,
              cursor: 'pointer', transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Réduire</span></>}
          </button>
        </div>
      </aside>

      {/* ══ MAIN AREA ═════════════════════════════════════════════ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

        {/* ─ TOPBAR ─────────────────────────────────────────────── */}
        <header style={{
          height: 56,
          flexShrink: 0,
          background: 'var(--clr-surface)',
          borderBottom: '1px solid var(--clr-border)',
          display: 'flex', alignItems: 'center',
          padding: '0 1.25rem', gap: '1rem',
          zIndex: 30,
        }}>
          {/* Search */}
          <div style={{ flex: 1, maxWidth: 400, position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} />
            <input
              type="text"
              placeholder="Rechercher un module, un compte..."
              style={{
                width: '100%',
                background: 'var(--clr-bg)',
                border: '1px solid var(--clr-border)',
                borderRadius: 8,
                padding: '0.375rem 0.75rem 0.375rem 2rem',
                fontSize: '0.8125rem',
                color: 'var(--clr-text-body)',
                outline: 'none',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--clr-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.10)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--clr-border)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ flex: 1 }} />

          {/* Status */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.3rem 0.75rem',
            background: 'var(--clr-success-lt)',
            borderRadius: 999,
            border: '1px solid var(--clr-success-mid)',
          }}>
            <span className="status-dot online" />
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--clr-success)' }}>Exercice 2024</span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <button className="btn-ghost" style={{ position: 'relative', padding: '0.4rem' }}>
              <Bell size={18} />
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--clr-danger)',
                border: '1.5px solid white',
              }} />
            </button>
            <button className="btn-ghost" style={{ padding: '0.4rem' }}>
              <HelpCircle size={18} />
            </button>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 24, background: 'var(--clr-border)' }} />

          {/* User */}
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.5rem' }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'var(--clr-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.6875rem', fontWeight: 700, color: '#fff',
            }}>MK</div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--clr-text-body)', lineHeight: 1.2 }}>M. Kane</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--clr-text-muted)', lineHeight: 1.2 }}>Chef Comptable</p>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--clr-text-muted)' }} />
          </button>
        </header>

        {/* ─ PAGE CONTENT ───────────────────────────────────────── */}
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Page Header */}
          <div style={{
            padding: '1rem 1.5rem 0',
            background: 'var(--clr-surface)',
            borderBottom: '1px solid var(--clr-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.375rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>GestionPro</span>
                <ChevronRight size={12} style={{ color: 'var(--clr-text-muted)' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--clr-primary)', fontWeight: 500 }}>{activeTab}</span>
              </div>
              {/* Title */}
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--clr-text-h)', lineHeight: 1.2, marginBottom: '0.875rem' }}>
                {activeTab}
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
              <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
                <Globe size={14} /> Temps réel
              </button>
              <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
                Historique
              </button>
            </div>
          </div>

          {/* Module Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }} className="custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ height: '100%' }}
              >
                {activeTab === 'Statistiques'   && <StatistiquesModule />}
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
        </main>

        {/* ─ FOOTER ─────────────────────────────────────────────── */}
        <footer style={{
          height: 36,
          flexShrink: 0,
          background: 'var(--clr-surface)',
          borderTop: '1px solid var(--clr-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={13} style={{ color: 'var(--clr-success)' }} />
            <span style={{ fontSize: '0.6875rem', color: 'var(--clr-text-muted)' }}>
              SHA-256 • Infrastructure sécurisée • 99.9% Uptime
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--clr-text-muted)' }}>Build 2.0.4</span>
            <button style={{ fontSize: '0.6875rem', color: 'var(--clr-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              Support →
            </button>
          </div>
        </footer>
      </div>

      {/* Joule AI Assistant */}
      <JouleAssistant />
    </div>
  );
};

export default App;
