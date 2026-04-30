import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Settings, Database, Activity, BarChart2,
  Sparkles, ShieldCheck, LayoutDashboard, Printer,
  PieChart, CheckCircle2, ChevronRight
} from 'lucide-react';

import ChartOfAccounts    from './ChartOfAccounts';
import JournalEntry       from './JournalEntry';
import PlanTiers          from './PlanTiers';
import CodesJournaux      from './CodesJournaux';
import Balance            from './Balance';
import BilanResultat      from './BilanResultat';
import TauxTaxes          from './TauxTaxes';
import InterrogationLettrage from './InterrogationLettrage';
import RapprochementBancaire from './RapprochementBancaire';
import GrandLivre         from './GrandLivre';
import Brouillard         from './Brouillard';
import PlanAnalytique     from './PlanAnalytique';
import JournalCentralise  from './JournalCentralise';
import ClotureJournaux    from './ClotureJournaux';
import Banques            from './Banques';
import ReglementTiers     from './ReglementTiers';
import ModelesSaisie      from './ModelesSaisie';
import RechercheEcritures from './RechercheEcritures';
import RappelReleve       from './RappelReleve';
import ReevaluationDevise from './ReevaluationDevise';
import BasculementExercice from './BasculementExercice';
import LibellesAuto       from './LibellesAuto';
import JournauxAnalytiques from './JournauxAnalytiques';
import PostesBudgetaires  from './PostesBudgetaires';
import Reimputation       from './Reimputation';
import ParametresSociete  from './ParametresSociete';
import ImportExport       from './ImportExport';
import BalanceAgee        from './BalanceAgee';
import Echeancier         from './Echeancier';
import DashboardPilotage  from './DashboardPilotage';
import FixedAssets        from './FixedAssets';
import CustomerDunning    from './CustomerDunning';
import AutoPaymentProgram from './AutoPaymentProgram';
import UniversalJournal   from './UniversalJournal';
import ESGDashboard       from '../reporting/ESGDashboard';
import TaxEDIModule       from './TaxEDIModule';
import AIBudgetPlanner    from './AIBudgetPlanner';
import LeaseManagement    from './LeaseManagement';
import ReportingHub       from './ReportingHub';
import IndustrialCosting  from './IndustrialCosting';
import LogisticsModule    from './LogisticsModule';
import GroupConsolidation from './GroupConsolidation';

interface MenuItem {
  id: string;
  label: string;
  type?: never;
}
interface SeparatorItem { type: 'separator'; id?: never; label?: never; }
type AnyItem = MenuItem | SeparatorItem;

interface MenuGroup {
  title: string;
  icon: React.ReactNode;
  items: AnyItem[];
}

const sageMenus: MenuGroup[] = [
  {
    title: 'Pilotage',
    icon: <LayoutDashboard size={15} />,
    items: [
      { id: 'dashboard',  label: 'Dashboard CFO' },
      { id: 'esg-dashboard', label: 'Performance ESG' },
      { id: 'ai-planner', label: 'Planification IA' },
      { type: 'separator' },
      { id: 'f-params',   label: 'Paramètres Société' },
      { id: 'f-import',   label: 'Import / Export Données' },
    ]
  },
  {
    title: 'Référentiels',
    icon: <Database size={15} />,
    items: [
      { id: 's-plancomptable',  label: 'Plan Comptable (SYSCOHADA)' },
      { id: 's-plananalytique', label: 'Plan Analytique (CO)' },
      { id: 's-plantiers',      label: 'Référentiel Tiers' },
      { type: 'separator' },
      { id: 's-tauxtaxes',      label: 'Taux & Codes de Taxes' },
      { id: 's-codesjournaux',  label: 'Codes Journaux' },
      { id: 's-banques',        label: 'Gestion Banques' },
      { type: 'separator' },
      { id: 's-immos',          label: 'Immobilisations (FI-AA)' },
      { id: 's-leases',         label: 'IFRS 16 / Leases' },
    ]
  },
  {
    title: 'Opérations',
    icon: <Activity size={15} />,
    items: [
      { id: 't-saisieecritures', label: 'Saisie au Kilomètre' },
      { id: 't-interlettrage',   label: 'Lettrage & Interrogation' },
      { type: 'separator' },
      { id: 't-rapproauto',      label: 'Rapprochement Bancaire' },
      { id: 't-autopayment',     label: 'Paiements Auto (F110)' },
      { id: 't-relances',        label: 'Relances & Circularisation' },
      { type: 'separator' },
      { id: 't-cloture',         label: 'Clôture Périodique' },
      { id: 't-nouvelexercice',  label: 'Basculement d\'Exercice' },
    ]
  },
  {
    title: 'Analytique',
    icon: <PieChart size={15} />,
    items: [
      { id: 'co-industrial',    label: 'Coûts Industriels (CO-PC)' },
      { id: 'co-profitability', label: 'Analyse de Rentabilité' },
      { id: 'co-allocation',    label: 'Cycles d\'Allocation' },
    ]
  },
  {
    title: 'Reporting',
    icon: <BarChart2 size={15} />,
    items: [
      { id: 'e-reporting-hub', label: 'Reporting Hub (PDF/Excel)' },
      { type: 'separator' },
      { id: 'e-universal',     label: 'Journal Universel (ACDOCA)' },
      { id: 'e-tax-edi',       label: 'Déclaration Fiscale (EDI)' },
      { id: 'e-grandlivre',    label: 'Grand-Livre des Comptes' },
      { id: 'e-balance',       label: 'Balance de Vérification' },
      { id: 'e-bilan',         label: 'Bilan & Résultat OHADA' },
    ]
  },
];

const HANDLED_IDS = [
  'dashboard','esg-dashboard','ai-planner','f-params','f-import',
  's-plancomptable','s-plananalytique','s-plantiers','s-immos','s-leases',
  's-tauxtaxes','s-codesjournaux','s-banques',
  't-saisieecritures','t-interlettrage','t-rapproauto','t-autopayment',
  't-relances','t-cloture','t-nouvelexercice',
  'co-industrial','co-profitability',
  'e-reporting-hub','e-universal','e-tax-edi','e-grandlivre','e-balance','e-bilan',
];

/* ─── Dropdown Button ────────────────────────────────────────── */
const MenuDropdown = ({ menu, activeMenu, currentViewId, onMenuClick, onItemClick }: {
  menu: MenuGroup;
  activeMenu: string | null;
  currentViewId: string;
  onMenuClick: (title: string) => void;
  onItemClick: (item: MenuItem) => void;
}) => {
  const isOpen = activeMenu === menu.title;
  const hasActive = menu.items.some(i => !i.type && i.id === currentViewId);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => onMenuClick(menu.title)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.375rem',
          padding: '0.375rem 0.75rem',
          borderRadius: 6,
          background: isOpen ? 'var(--clr-primary)' : hasActive ? 'var(--clr-primary-lt)' : 'transparent',
          border: isOpen ? 'none' : hasActive ? '1px solid var(--clr-primary-mid)' : '1px solid var(--clr-border)',
          color: isOpen ? '#fff' : hasActive ? 'var(--clr-primary)' : 'var(--clr-text-body)',
          fontSize: '0.8125rem', fontWeight: 500,
          cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'all 0.15s',
        }}
      >
        {menu.icon}
        {menu.title}
        <ChevronDown size={13} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="erp-dropdown"
            style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, minWidth: 230, zIndex: 200 }}
          >
            {menu.items.map((item, idx) => {
              if (item.type === 'separator') return <div key={idx} className="erp-dropdown-sep" />;
              const mi = item as MenuItem;
              const isActive = currentViewId === mi.id;
              return (
                <button
                  key={mi.id}
                  onClick={() => onItemClick(mi)}
                  className={`erp-dropdown-item ${isActive ? 'active' : ''}`}
                >
                  {isActive
                    ? <CheckCircle2 size={13} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                    : <ChevronRight size={13} style={{ color: 'var(--clr-text-muted)', flexShrink: 0 }} />
                  }
                  {mi.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Module ────────────────────────────────────────────── */
const AccountingModule = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentViewId, setCurrentViewId] = useState<string>('dashboard');
  const [currentViewLabel, setCurrentViewLabel] = useState<string>('Dashboard de Pilotage CFO');

  const handleMenuClick = (title: string) => {
    setActiveMenu(activeMenu === title ? null : title);
  };

  const handleItemClick = (item: MenuItem) => {
    setCurrentViewId(item.id);
    setCurrentViewLabel(item.label);
    setActiveMenu(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2rem', position: 'relative' }}>

      {/* Backdrop */}
      {activeMenu && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 190 }}
          onClick={() => setActiveMenu(null)}
        />
      )}

      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--clr-surface)',
        border: '1px solid var(--clr-border)',
        borderRadius: 10,
        padding: '0.625rem 0.875rem',
        position: 'relative', zIndex: 195,
      }}>
        {/* Menus */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
          {sageMenus.map((menu) => (
            <MenuDropdown
              key={menu.title}
              menu={menu}
              activeMenu={activeMenu}
              currentViewId={currentViewId}
              onMenuClick={handleMenuClick}
              onItemClick={handleItemClick}
            />
          ))}
        </div>

        {/* Status Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.3rem 0.625rem', borderRadius: 6,
            background: 'var(--clr-success-lt)', border: '1px solid var(--clr-success-mid)',
            fontSize: '0.75rem', fontWeight: 500, color: 'var(--clr-success)',
          }}>
            <CheckCircle2 size={13} />
            Exercice 2024 — Ouvert
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.3rem 0.625rem', borderRadius: 6,
            background: 'var(--clr-primary-lt)', border: '1px solid var(--clr-primary-mid)',
            fontSize: '0.75rem', fontWeight: 500, color: 'var(--clr-primary)',
          }}>
            <ShieldCheck size={13} />
            SYSCOHADA v2.4
          </div>
          <button className="btn-secondary" style={{ padding: '0.3rem 0.5rem' }}>
            <Printer size={14} />
          </button>
          <button className="btn-secondary" style={{ padding: '0.3rem 0.5rem' }}>
            <Settings size={14} />
          </button>
        </div>
      </div>

      {/* Sub-title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0 0.25rem',
      }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>FI / CO</span>
        <ChevronRight size={12} style={{ color: 'var(--clr-text-muted)' }} />
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--clr-text-body)' }}>{currentViewLabel}</span>
      </div>

      {/* View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentViewId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {currentViewId === 'dashboard'          && <DashboardPilotage />}
          {currentViewId === 'esg-dashboard'      && <ESGDashboard />}
          {currentViewId === 'ai-planner'         && <AIBudgetPlanner />}
          {currentViewId === 'f-params'           && <ParametresSociete />}
          {currentViewId === 'f-import'           && <ImportExport />}
          {currentViewId === 's-plancomptable'    && <ChartOfAccounts />}
          {currentViewId === 's-plananalytique'   && <PlanAnalytique />}
          {currentViewId === 's-plantiers'        && <PlanTiers />}
          {currentViewId === 's-immos'            && <FixedAssets />}
          {currentViewId === 's-leases'           && <LeaseManagement />}
          {currentViewId === 's-tauxtaxes'        && <TauxTaxes />}
          {currentViewId === 's-codesjournaux'    && <CodesJournaux />}
          {currentViewId === 's-banques'          && <Banques />}
          {currentViewId === 't-saisieecritures'  && <JournalEntry />}
          {currentViewId === 't-interlettrage'    && <InterrogationLettrage />}
          {currentViewId === 't-rapproauto'       && <RapprochementBancaire />}
          {currentViewId === 't-autopayment'      && <AutoPaymentProgram />}
          {currentViewId === 't-relances'         && <RappelReleve />}
          {currentViewId === 't-cloture'          && <ClotureJournaux />}
          {currentViewId === 't-nouvelexercice'   && <BasculementExercice />}
          {currentViewId === 'co-industrial'      && <IndustrialCosting />}
          {currentViewId === 'co-profitability'   && <IndustrialCosting />}
          {currentViewId === 'e-reporting-hub'    && <ReportingHub />}
          {currentViewId === 'e-universal'        && <UniversalJournal />}
          {currentViewId === 'e-tax-edi'          && <TaxEDIModule />}
          {currentViewId === 'e-grandlivre'       && <GrandLivre />}
          {currentViewId === 'e-balance'          && <Balance />}
          {currentViewId === 'e-bilan'            && <BilanResultat />}

          {!HANDLED_IDS.includes(currentViewId) && (
            <div className="erp-card" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              minHeight: 360, padding: '3rem', textAlign: 'center', gap: '1rem',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: 'var(--clr-primary-lt)', color: 'var(--clr-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Settings size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--clr-text-h)', marginBottom: '0.5rem' }}>
                  {currentViewLabel}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', maxWidth: 480 }}>
                  Ce module est en cours de déploiement. La version certifiée SYSCOHADA 2024 sera disponible lors du prochain cycle de maintenance.
                </p>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.375rem 0.875rem', borderRadius: 6,
                background: 'var(--clr-warning-lt)', border: '1px solid var(--clr-warning-mid)',
                fontSize: '0.75rem', fontWeight: 500, color: 'var(--clr-warning)',
              }}>
                Déploiement en cours — Priorité maximale
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AccountingModule;
