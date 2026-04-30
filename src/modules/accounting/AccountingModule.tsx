import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Settings, Database, Activity, BarChart2,
  Sparkles, ShieldCheck, LayoutDashboard, Printer,
  PieChart, CheckCircle2, ChevronRight, FileText,
  FolderOpen, Layers, Calculator, CreditCard,
  Search, RefreshCw, BookOpen, Landmark,
  ClipboardList, TrendingUp, Globe, Leaf
} from 'lucide-react';

import ChartOfAccounts       from './ChartOfAccounts';
import JournalEntry          from './JournalEntry';
import PlanTiers             from './PlanTiers';
import CodesJournaux         from './CodesJournaux';
import Balance               from './Balance';
import BilanResultat         from './BilanResultat';
import TauxTaxes             from './TauxTaxes';
import InterrogationLettrage from './InterrogationLettrage';
import RapprochementBancaire from './RapprochementBancaire';
import GrandLivre            from './GrandLivre';
import Brouillard            from './Brouillard';
import PlanAnalytique        from './PlanAnalytique';
import JournalCentralise     from './JournalCentralise';
import ClotureJournaux       from './ClotureJournaux';
import Banques               from './Banques';
import ReglementTiers        from './ReglementTiers';
import ModelesSaisie         from './ModelesSaisie';
import RechercheEcritures    from './RechercheEcritures';
import RappelReleve          from './RappelReleve';
import ReevaluationDevise    from './ReevaluationDevise';
import BasculementExercice   from './BasculementExercice';
import LibellesAuto          from './LibellesAuto';
import JournauxAnalytiques   from './JournauxAnalytiques';
import PostesBudgetaires     from './PostesBudgetaires';
import Reimputation          from './Reimputation';
import ParametresSociete     from './ParametresSociete';
import ImportExport          from './ImportExport';
import BalanceAgee           from './BalanceAgee';
import Echeancier            from './Echeancier';
import DashboardPilotage     from './DashboardPilotage';
import FixedAssets           from './FixedAssets';
import CustomerDunning       from './CustomerDunning';
import AutoPaymentProgram    from './AutoPaymentProgram';
import UniversalJournal      from './UniversalJournal';
import ESGDashboard          from '../reporting/ESGDashboard';
import TaxEDIModule          from './TaxEDIModule';
import AIBudgetPlanner       from './AIBudgetPlanner';
import LeaseManagement       from './LeaseManagement';
import ReportingHub          from './ReportingHub';
import IndustrialCosting     from './IndustrialCosting';
import GroupConsolidation    from './GroupConsolidation';
import TaxDeclaration        from './TaxDeclaration';

/* ─── Types ──────────────────────────────────────────────────── */
interface MenuItem { id: string; label: string; type?: never; }
interface SeparatorItem { type: 'separator'; id?: never; label?: never; }
type AnyItem = MenuItem | SeparatorItem;
interface MenuGroup { title: string; icon: React.ReactNode; items: AnyItem[]; }

/* ═══════════════════════════════════════════════════════════════
   MENU SAGE 100 COMPTABILITÉ
   Fidèle à l'architecture Sage Saari Comptabilité 100
   ═══════════════════════════════════════════════════════════════ */
const sageMenus: MenuGroup[] = [
  {
    title: 'Fichier',
    icon: <FolderOpen size={15} />,
    items: [
      { id: 'dashboard',     label: 'Tableau de bord' },
      { id: 'esg-dashboard', label: 'Performance ESG & Durabilité' },
      { type: 'separator' },
      { id: 'f-params',      label: 'A propos de… / Paramètres Société' },
      { id: 'f-import',      label: 'Importation / Exportation' },
    ]
  },
  {
    title: 'Structure',
    icon: <Database size={15} />,
    items: [
      { id: 's-plancomptable',     label: 'Plan comptable' },
      { id: 's-plananalytique',    label: 'Plan analytique' },
      { id: 's-plantiers',         label: 'Plan tiers' },
      { type: 'separator' },
      { id: 's-tauxtaxes',         label: 'Taux de taxes' },
      { id: 's-codesjournaux',     label: 'Codes journaux' },
      { id: 's-journauxanalytiq',  label: 'Codes journaux analytiques' },
      { id: 's-banques',           label: 'Banques' },
      { type: 'separator' },
      { id: 's-modelessaisie',     label: 'Modèles de saisie' },
      { id: 's-libelles',          label: 'Libellés' },
      { id: 's-postesbudgetaires', label: 'Postes budgétaires' },
      { type: 'separator' },
      { id: 's-immos',             label: 'Immobilisations (FI-AA)' },
      { id: 's-leases',            label: 'Gestion IFRS 16 / Leases' },
    ]
  },
  {
    title: 'Traitement',
    icon: <Activity size={15} />,
    items: [
      { id: 't-saisieecritures',   label: 'Saisie des écritures' },
      { id: 't-brouillard-saisie', label: 'Journaux de saisie (Brouillard)' },
      { type: 'separator' },
      { id: 't-cloture',           label: 'Clôture des journaux' },
      { id: 't-interlettrage',     label: 'Interrogation et lettrage' },
      { type: 'separator' },
      { id: 't-rapproauto',        label: 'Rapprochement bancaire' },
      { id: 't-reglementtiers',    label: 'Règlement tiers' },
      { id: 't-autopayment',       label: 'Paiements automatiques (F110)' },
      { type: 'separator' },
      { id: 't-relances',          label: 'Rappel / Relevé' },
      { id: 't-dunning',           label: 'Relances clients (Dunning)' },
      { id: 't-reevaluation',      label: 'Réévaluation devises' },
      { type: 'separator' },
      { id: 't-recherche',         label: 'Recherche d\'écritures' },
      { id: 't-reimputation',      label: 'Réimputation' },
      { type: 'separator' },
      { id: 't-nouvelexercice',    label: 'Fin d\'exercice' },
    ]
  },
  {
    title: 'État',
    icon: <FileText size={15} />,
    items: [
      { id: 'e-brouillard',        label: 'Brouillard' },
      { id: 'e-journalcentralise', label: 'Journal centralisé' },
      { id: 'e-universal',         label: 'Journal universel (ACDOCA)' },
      { type: 'separator' },
      { id: 'e-grandlivre',        label: 'Grand-livre des comptes' },
      { id: 'e-balance',           label: 'Balance des comptes' },
      { id: 'e-balanceagee',       label: 'Balance âgée' },
      { id: 'e-echeancier',        label: 'Échéancier' },
      { type: 'separator' },
      { id: 'e-bilan',             label: 'Bilan / Compte de résultat' },
      { id: 'e-tax-declaration',   label: 'Déclaration de TVA' },
      { id: 'e-tax-edi',           label: 'Déclaration fiscale (EDI)' },
      { type: 'separator' },
      { id: 'e-reporting-hub',     label: 'Reporting Hub (PDF / Excel)' },
    ]
  },
  {
    title: 'Analytique',
    icon: <PieChart size={15} />,
    items: [
      { id: 'co-industrial',    label: 'Comptabilité analytique / Coûts' },
      { id: 'co-consolidation', label: 'Consolidation groupe' },
      { type: 'separator' },
      { id: 'co-aiplanner',     label: 'Planification budgétaire (IA)' },
    ]
  },
];

/* ─── View ID → Component Mapping ──────────────────────────── */
const VIEW_MAP: Record<string, React.ComponentType> = {
  'dashboard':           DashboardPilotage,
  'esg-dashboard':       ESGDashboard,
  'f-params':            ParametresSociete,
  'f-import':            ImportExport,
  's-plancomptable':     ChartOfAccounts,
  's-plananalytique':    PlanAnalytique,
  's-plantiers':         PlanTiers,
  's-tauxtaxes':         TauxTaxes,
  's-codesjournaux':     CodesJournaux,
  's-journauxanalytiq':  JournauxAnalytiques,
  's-banques':           Banques,
  's-modelessaisie':     ModelesSaisie,
  's-libelles':          LibellesAuto,
  's-postesbudgetaires': PostesBudgetaires,
  's-immos':             FixedAssets,
  's-leases':            LeaseManagement,
  't-saisieecritures':   JournalEntry,
  't-brouillard-saisie': Brouillard,
  't-cloture':           ClotureJournaux,
  't-interlettrage':     InterrogationLettrage,
  't-rapproauto':        RapprochementBancaire,
  't-reglementtiers':    ReglementTiers,
  't-autopayment':       AutoPaymentProgram,
  't-relances':          RappelReleve,
  't-dunning':           CustomerDunning,
  't-reevaluation':      ReevaluationDevise,
  't-recherche':         RechercheEcritures,
  't-reimputation':      Reimputation,
  't-nouvelexercice':    BasculementExercice,
  'e-brouillard':        Brouillard,
  'e-journalcentralise': JournalCentralise,
  'e-universal':         UniversalJournal,
  'e-grandlivre':        GrandLivre,
  'e-balance':           Balance,
  'e-balanceagee':       BalanceAgee,
  'e-echeancier':        Echeancier,
  'e-bilan':             BilanResultat,
  'e-tax-declaration':   TaxDeclaration,
  'e-tax-edi':           TaxEDIModule,
  'e-reporting-hub':     ReportingHub,
  'co-industrial':       IndustrialCosting,
  'co-consolidation':    GroupConsolidation,
  'co-aiplanner':        AIBudgetPlanner,
};

/* ─── Dropdown Component ─────────────────────────────────────── */
const MenuDropdown = ({ menu, activeMenu, currentViewId, onMenuClick, onItemClick }: {
  menu: MenuGroup; activeMenu: string | null; currentViewId: string;
  onMenuClick: (t: string) => void; onItemClick: (i: MenuItem) => void;
}) => {
  const isOpen = activeMenu === menu.title;
  const hasActive = menu.items.some(i => !i.type && i.id === currentViewId);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => onMenuClick(menu.title)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.375rem',
          padding: '0.375rem 0.75rem', borderRadius: 6,
          background: isOpen ? 'var(--clr-primary)' : hasActive ? 'var(--clr-primary-lt)' : 'transparent',
          border: isOpen ? 'none' : hasActive ? '1px solid var(--clr-primary-mid)' : '1px solid transparent',
          color: isOpen ? '#fff' : hasActive ? 'var(--clr-primary)' : 'var(--clr-text-body)',
          fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { if (!isOpen && !hasActive) e.currentTarget.style.background = 'var(--clr-surface-2)'; }}
        onMouseLeave={e => { if (!isOpen && !hasActive) e.currentTarget.style.background = 'transparent'; }}
      >
        {menu.icon} {menu.title}
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
            style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, minWidth: 260, zIndex: 200, maxHeight: 420, overflowY: 'auto' }}
          >
            <div style={{ padding: '0.375rem 0.75rem 0.25rem', fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--clr-text-muted)' }}>
              {menu.title}
            </div>
            {menu.items.map((item, idx) => {
              if (item.type === 'separator') return <div key={idx} className="erp-dropdown-sep" />;
              const mi = item as MenuItem;
              const isActive = currentViewId === mi.id;
              return (
                <button key={mi.id} onClick={() => onItemClick(mi)}
                  className={`erp-dropdown-item ${isActive ? 'active' : ''}`}>
                  {isActive
                    ? <CheckCircle2 size={13} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                    : <ChevronRight size={13} style={{ color: 'var(--clr-text-muted)', flexShrink: 0, opacity: 0.4 }} />
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

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const AccountingModule = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentViewId, setCurrentViewId] = useState<string>('dashboard');
  const [currentViewLabel, setCurrentViewLabel] = useState<string>('Tableau de bord');

  const handleMenuClick = (title: string) => setActiveMenu(activeMenu === title ? null : title);
  const handleItemClick = (item: MenuItem) => {
    setCurrentViewId(item.id);
    setCurrentViewLabel(item.label);
    setActiveMenu(null);
  };

  // Find which menu group contains current view
  const parentMenu = sageMenus.find(m => m.items.some(i => !i.type && i.id === currentViewId));
  const ViewComponent = VIEW_MAP[currentViewId];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2rem', position: 'relative' }}>

      {/* Backdrop for dropdown close */}
      {activeMenu && <div style={{ position: 'fixed', inset: 0, zIndex: 190 }} onClick={() => setActiveMenu(null)} />}

      {/* ── Menu Bar (Sage 100 Style) ──────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--clr-surface)', border: '1px solid var(--clr-border)',
        borderRadius: 10, padding: '0.5rem 0.875rem',
        position: 'relative', zIndex: 195,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
          {sageMenus.map(menu => (
            <MenuDropdown key={menu.title} menu={menu} activeMenu={activeMenu}
              currentViewId={currentViewId} onMenuClick={handleMenuClick} onItemClick={handleItemClick} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <div className="badge badge-green"><CheckCircle2 size={11} /> Exercice 2024</div>
          <div className="badge badge-blue"><ShieldCheck size={11} /> SYSCOHADA</div>
          <button className="btn-ghost" style={{ padding: '0.3rem' }}><Printer size={14} /></button>
          <button className="btn-ghost" style={{ padding: '0.3rem' }}><Settings size={14} /></button>
        </div>
      </div>

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0 0.25rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>Comptabilité</span>
        {parentMenu && (
          <>
            <ChevronRight size={12} style={{ color: 'var(--clr-text-muted)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>{parentMenu.title}</span>
          </>
        )}
        <ChevronRight size={12} style={{ color: 'var(--clr-text-muted)' }} />
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--clr-text-body)' }}>{currentViewLabel}</span>
      </div>

      {/* ── Active View ────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div key={currentViewId}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {ViewComponent ? (
            <ViewComponent />
          ) : (
            <div className="erp-card" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              minHeight: 320, padding: '3rem', textAlign: 'center', gap: '1rem',
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--clr-primary-lt)',
                color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Settings size={24} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{currentViewLabel}</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--clr-text-muted)', maxWidth: 400 }}>
                Ce module est en cours de déploiement.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AccountingModule;
