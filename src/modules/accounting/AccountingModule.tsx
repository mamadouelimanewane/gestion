import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Settings, Database, Activity, BarChart2,
  Sparkles, ShieldCheck, LayoutDashboard, Printer,
  PieChart, CheckCircle2, ChevronRight, FileText,
  FolderOpen, Layers, Calculator, CreditCard,
  Search, RefreshCw, BookOpen, Landmark,
  ClipboardList, TrendingUp, Globe, Leaf,
  Home, FileCheck, ArrowRightLeft, Briefcase
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
import FixedAssets           from './FixedAssets';
import CustomerDunning       from './CustomerDunning';
import AutoPaymentProgram    from './AutoPaymentProgram';
import UniversalJournal      from './UniversalJournal';
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
   MENU SAGE 100 COMPTABILITÉ (CONFIDENTIAL STATISTICS MOVED)
   ═══════════════════════════════════════════════════════════════ */
const sageMenus: MenuGroup[] = [
  {
    title: 'Fichier',
    icon: <FolderOpen size={15} />,
    items: [
      { id: 'home',          label: 'Accueil Comptabilité' },
      { type: 'separator' },
      { id: 'f-params',      label: 'Paramètres Société' },
      { id: 'f-import',      label: 'Importation / Exportation' },
      { id: 'f-communication', label: 'Communication Expert' },
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
    ]
  },
  {
    title: 'Traitement',
    icon: <Activity size={15} />,
    items: [
      { id: 't-saisieecritures',   label: 'Saisie des écritures' },
      { id: 't-brouillard-saisie', label: 'Journaux de saisie' },
      { type: 'separator' },
      { id: 't-interlettrage',     label: 'Interrogation et lettrage' },
      { id: 't-rapproauto',        label: 'Rapprochement bancaire' },
      { type: 'separator' },
      { id: 't-reglementtiers',    label: 'Règlement tiers' },
      { id: 't-autopayment',       label: 'Paiements auto (F110)' },
      { id: 't-relances',          label: 'Rappel / Relevé' },
      { type: 'separator' },
      { id: 't-reevaluation',      label: 'Réévaluation devises' },
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
      { id: 'e-grandlivre',        label: 'Grand-livre des comptes' },
      { id: 'e-balance',           label: 'Balance des comptes' },
      { type: 'separator' },
      { id: 'e-bilan',             label: 'Bilan / Compte de résultat' },
      { id: 'e-tax-declaration',   label: 'Déclaration de TVA' },
      { type: 'separator' },
      { id: 'e-reporting-hub',     label: 'Reporting Hub' },
    ]
  },
  {
    title: 'Analytique',
    icon: <PieChart size={15} />,
    items: [
      { id: 'co-industrial',    label: 'Comptabilité analytique' },
      { id: 'co-consolidation', label: 'Consolidation groupe' },
      { id: 'co-aiplanner',     label: 'Planification IA' },
    ]
  },
];

/* ─── Welcome Page ───────────────────────────────────────────── */
const AccountingHome = ({ onNavigate }: { onNavigate: (id: string, label: string) => void }) => {
  return (
    <div className="erp-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--clr-primary-lt)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Briefcase size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Espace de Travail Comptable</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)' }}>Gestion certifiée SYSCOHADA v2.4 • Architecture Sage 100</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <ShortcutCard 
          icon={<BookOpen size={20} />} 
          title="Plan Comptable" 
          desc="Gérer les comptes généraux et auxiliaires" 
          onClick={() => onNavigate('s-plancomptable', 'Plan comptable')}
        />
        <ShortcutCard 
          icon={<Activity size={20} />} 
          title="Saisie au Borne" 
          desc="Enregistrement rapide des pièces comptables" 
          onClick={() => onNavigate('t-saisieecritures', 'Saisie des écritures')}
        />
        <ShortcutCard 
          icon={<ArrowRightLeft size={20} />} 
          title="Lettrage" 
          desc="Rapprochement des écritures tiers" 
          onClick={() => onNavigate('t-interlettrage', 'Interrogation et lettrage')}
        />
        <ShortcutCard 
          icon={<FileCheck size={20} />} 
          title="Balance" 
          desc="Édition de la balance de vérification" 
          onClick={() => onNavigate('e-balance', 'Balance des comptes')}
        />
      </div>

      <div style={{ padding: '1rem', background: 'var(--clr-bg)', borderRadius: 10, border: '1px solid var(--clr-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ShieldCheck size={20} style={{ color: 'var(--clr-success)' }} />
        <p style={{ fontSize: '0.8125rem', color: 'var(--clr-text-muted)' }}>
          <strong>Note de sécurité :</strong> Les statistiques et dashboards de pilotage ont été déplacés vers le module dédié **Statistiques** pour garantir la confidentialité des données financières.
        </p>
      </div>
    </div>
  );
};

const ShortcutCard = ({ icon, title, desc, onClick }: any) => (
  <button onClick={onClick} className="erp-card-interactive" style={{ textAlign: 'left', padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', width: '100%', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--clr-primary-lt)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {icon}
    </div>
    <div>
      <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h4>
      <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)', lineHeight: 1.4 }}>{desc}</p>
    </div>
  </button>
);

/* ─── View ID → Component Mapping ──────────────────────────── */
const VIEW_MAP: Record<string, React.ComponentType<any>> = {
  'home':                AccountingHome,
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
  't-saisieecritures':   JournalEntry,
  't-brouillard-saisie': Brouillard,
  't-cloture':           ClotureJournaux,
  't-interlettrage':     InterrogationLettrage,
  't-rapproauto':        RapprochementBancaire,
  't-reglementtiers':    ReglementTiers,
  't-autopayment':       AutoPaymentProgram,
  't-relances':          RappelReleve,
  't-reevaluation':      ReevaluationDevise,
  't-recherche':         RechercheEcritures,
  't-reimputation':      Reimputation,
  't-nouvelexercice':    BasculementExercice,
  'e-brouillard':        Brouillard,
  'e-grandlivre':        GrandLivre,
  'e-balance':           Balance,
  'e-bilan':             BilanResultat,
  'e-tax-declaration':   TaxDeclaration,
  'e-reporting-hub':     ReportingHub,
  'co-industrial':       IndustrialCosting,
  'co-consolidation':    GroupConsolidation,
  'co-aiplanner':        AIBudgetPlanner,
};

const DarkIconBtn = ({ children }: { children: React.ReactNode }) => (
  <button
    style={{ padding: '0.3rem', background: 'transparent', border: 'none', cursor: 'pointer', color: '#475569', borderRadius: 5, transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#475569'; }}
  >{children}</button>
);

const AccountingModule = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentViewId, setCurrentViewId] = useState<string>('home');
  const [currentViewLabel, setCurrentViewLabel] = useState<string>('Accueil Comptabilité');

  const handleMenuClick = (title: string) => setActiveMenu(activeMenu === title ? null : title);
  const handleItemClick = (item: MenuItem) => {
    setCurrentViewId(item.id);
    setCurrentViewLabel(item.label);
    setActiveMenu(null);
  };

  const handleNavigate = (id: string, label: string) => {
    setCurrentViewId(id);
    setCurrentViewLabel(label);
  };

  const parentMenu = sageMenus.find(m => m.items.some(i => !i.type && i.id === currentViewId));
  const ViewComponent = VIEW_MAP[currentViewId];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2rem', position: 'relative' }}>
      {activeMenu && <div style={{ position: 'fixed', inset: 0, zIndex: 190 }} onClick={() => setActiveMenu(null)} />}

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #0F172A 0%, #162032 100%)',
        borderRadius: 10, padding: '0.5rem 0.875rem',
        position: 'relative', zIndex: 195,
        boxShadow: '0 4px 18px rgba(10, 15, 40, 0.22), 0 1px 3px rgba(10,15,40,0.14)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
          {sageMenus.map(menu => (
            <MenuDropdown key={menu.title} menu={menu} activeMenu={activeMenu}
              currentViewId={currentViewId} onMenuClick={handleMenuClick} onItemClick={handleItemClick} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.22rem 0.6rem', background: 'rgba(21,128,61,0.18)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.01em' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 6px rgba(74,222,128,0.6)', flexShrink: 0, display: 'inline-block' }} />
            Exercice 2024
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '0.22rem 0.6rem', background: 'rgba(79,70,229,0.22)', color: '#A5B4FC', border: '1px solid rgba(129,140,248,0.3)', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 500 }}>SYSCOHADA</div>
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)' }} />
          <DarkIconBtn><Printer size={14} /></DarkIconBtn>
          <DarkIconBtn><Settings size={14} /></DarkIconBtn>
        </div>
      </div>

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

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={currentViewId}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
          {ViewComponent ? (
            <ViewComponent onNavigate={handleNavigate} />
          ) : (
            <div className="erp-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, padding: '3rem', textAlign: 'center', gap: '1rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--clr-primary-lt)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Settings size={24} /></div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{currentViewLabel}</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--clr-text-muted)', maxWidth: 400 }}>Module en cours de déploiement.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const MenuDropdown = ({ menu, activeMenu, currentViewId, onMenuClick, onItemClick }: any) => {
  const isOpen = activeMenu === menu.title;
  const hasActive = menu.items.some((i: any) => !i.type && i.id === currentViewId);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => onMenuClick(menu.title)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.375rem',
          padding: '0.375rem 0.75rem', borderRadius: 6,
          background: isOpen ? 'var(--clr-primary)' : hasActive ? 'rgba(79,70,229,0.22)' : 'transparent',
          border: isOpen ? '1px solid rgba(129,140,248,0.4)' : hasActive ? '1px solid rgba(129,140,248,0.35)' : '1px solid transparent',
          color: isOpen ? '#fff' : hasActive ? '#A5B4FC' : '#94A3B8',
          fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'all 0.15s',
          boxShadow: isOpen ? '0 2px 8px rgba(79,70,229,0.35)' : 'none',
        }}
        onMouseEnter={e => { if (!isOpen && !hasActive) { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLButtonElement).style.color = '#CBD5E1'; } }}
        onMouseLeave={e => { if (!isOpen && !hasActive) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8'; } }}
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
            {menu.items.map((item: any, idx: number) => {
              if (item.type === 'separator') return <div key={idx} className="erp-dropdown-sep" />;
              const isActive = currentViewId === item.id;
              return (
                <button key={item.id} onClick={() => onItemClick(item)}
                  className={`erp-dropdown-item ${isActive ? 'active' : ''}`}>
                  {isActive
                    ? <CheckCircle2 size={13} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                    : <ChevronRight size={13} style={{ color: 'var(--clr-text-muted)', flexShrink: 0, opacity: 0.4 }} />
                  }
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountingModule;
