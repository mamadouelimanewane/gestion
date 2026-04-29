import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Settings, FileText, Database, 
  Activity, BarChart2, Sparkles, Leaf, 
  ShieldCheck, Zap, Building2, LayoutDashboard,
  Printer, BookOpen, Factory, PieChart, Box,
  Truck, ShoppingCart, Globe, ShieldAlert
} from 'lucide-react';
import ChartOfAccounts from './ChartOfAccounts';
import JournalEntry from './JournalEntry';
import PlanTiers from './PlanTiers';
import CodesJournaux from './CodesJournaux';
import Balance from './Balance';
import BilanResultat from './BilanResultat';
import TauxTaxes from './TauxTaxes';
import InterrogationLettrage from './InterrogationLettrage';
import RapprochementBancaire from './RapprochementBancaire';
import GrandLivre from './GrandLivre';
import Brouillard from './Brouillard';
import PlanAnalytique from './PlanAnalytique';
import JournalCentralise from './JournalCentralise';
import ClotureJournaux from './ClotureJournaux';
import Banques from './Banques';
import ReglementTiers from './ReglementTiers';
import ModelesSaisie from './ModelesSaisie';
import RechercheEcritures from './RechercheEcritures';
import RappelReleve from './RappelReleve';
import ReevaluationDevise from './ReevaluationDevise';
import BasculementExercice from './BasculementExercice';
import LibellesAuto from './LibellesAuto';
import JournauxAnalytiques from './JournauxAnalytiques';
import PostesBudgetaires from './PostesBudgetaires';
import Reimputation from './Reimputation';
import ParametresSociete from './ParametresSociete';
import ImportExport from './ImportExport';
import BalanceAgee from './BalanceAgee';
import Echeancier from './Echeancier';
import DashboardPilotage from './DashboardPilotage';
import FixedAssets from './FixedAssets';
import CustomerDunning from './CustomerDunning';
import AutoPaymentProgram from './AutoPaymentProgram';
import UniversalJournal from './UniversalJournal';
import ESGDashboard from '../reporting/ESGDashboard';
import TaxEDIModule from './TaxEDIModule';
import AIBudgetPlanner from './AIBudgetPlanner';
import LeaseManagement from './LeaseManagement';
import ReportingHub from './ReportingHub';
import IndustrialCosting from './IndustrialCosting';
import LogisticsModule from './LogisticsModule';
import GroupConsolidation from './GroupConsolidation';

// --- Menu Data Structure (Sage 100 Clone + SAP Innovations) ---
const sageMenus = [
  {
    title: 'Fichier',
    icon: <FileText size={16} />,
    items: [
      { id: 'dashboard', label: 'Tableau de bord de pilotage' },
      { id: 'esg-dashboard', label: 'Performance ESG & Durabilité' },
      { id: 'ai-planner', label: 'Planification Budgétaire IA' },
      { type: 'separator' },
      { id: 'f-nouveau', label: 'Nouveau' },
      { id: 'f-ouvrir', label: 'Ouvrir...' },
      { id: 'f-params', label: 'Paramètres société' },
      { id: 'f-import', label: 'Import/Export S/4HANA' }
    ]
  },
  {
    title: 'Structure',
    icon: <Database size={16} />,
    items: [
      { id: 's-plancomptable', label: 'Plan comptable (Hiérarchisé)' },
      { id: 's-plananalytique', label: 'Plan analytique' },
      { id: 's-plantiers', label: 'Plan tiers (Limites Crédit)' },
      { type: 'separator' },
      { id: 's-tauxtaxes', label: 'Taux de taxes' },
      { id: 's-codesjournaux', label: 'Codes journaux' },
      { id: 's-banques', label: 'Banques' },
      { type: 'separator' },
      { id: 's-immos', label: 'Immobilisations (FI-AA)' },
      { id: 's-leases', label: 'Gestion des Baux (IFRS 16)' },
      { id: 's-postesbudgetaires', label: 'Postes budgétaires' }
    ]
  },
  {
    title: 'Traitement',
    icon: <Activity size={16} />,
    items: [
      { id: 't-saisieecritures', label: 'Saisie au kilomètre (F-02)' },
      { id: 't-interlettrage', label: 'Interrogation et lettrage' },
      { type: 'separator' },
      { id: 't-rapproauto', label: 'Rapprochement automatique' },
      { id: 't-autopayment', label: 'Paiement automatique (F110)' },
      { id: 't-relances', label: 'Relances & Circularisation' },
      { id: 't-reevaluation', label: 'Réévaluation de devises' },
      { type: 'separator' },
      { id: 't-cloture', label: 'Clôture des journaux' },
      { id: 't-nouvelexercice', label: 'Basculement d\'exercice' }
    ]
  },
  {
    title: 'Logistique & Ventes',
    icon: <Box size={16} />,
    items: [
      { id: 'mm-inventory', label: 'Stocks & Entrepôts (MM)' },
      { id: 'mm-procurement', label: 'Achats & Approvisionnement' },
      { id: 'sd-sales', label: 'Ventes & Distribution (SD)' },
      { type: 'separator' },
      { id: 'mm-valuation', label: 'Valorisation des Stocks (MR21)' }
    ]
  },
  {
    title: 'Contrôle de Gestion',
    icon: <PieChart size={16} />,
    items: [
      { id: 'co-industrial', label: 'Coûts Industriels (CO-PC)' },
      { id: 'co-centers', label: 'Centres de Coûts (KS03)' },
      { id: 'co-profitability', label: 'Analyse de Rentabilité' },
      { id: 'co-allocation', label: 'Cycles d\'Imputation' }
    ]
  },
  {
    title: 'Groupe & Audit',
    icon: <Globe size={16} />,
    items: [
      { id: 'grc-consolidation', label: 'Consolidation Groupe (IFRS)' },
      { id: 'grc-audit', label: 'Audit Interne & GRC' },
      { id: 'grc-compliance', label: 'Conformité OHADA/SOX' },
      { type: 'separator' },
      { id: 'grc-intercos', label: 'Réconciliation Intercos' }
    ]
  },
  {
    title: 'Etat',
    icon: <BarChart2 size={16} />,
    items: [
      { id: 'e-reporting-hub', label: 'Centre d\'Éditions (Aperçu PDF)' },
      { type: 'separator' },
      { id: 'e-universal', label: 'Journal Universel (ACDOCA)' },
      { id: 'e-tax-edi', label: 'Déclaration Fiscale (EDI SIPS)' },
      { id: 'e-brouillard', label: 'Brouillard de saisie' },
      { type: 'separator' },
      { id: 'e-grandlivre', label: 'Grand-livre des comptes' },
      { id: 'e-balance', label: 'Balance des comptes' },
      { id: 'e-bilan', label: 'Bilan / Compte de résultat' },
      { type: 'separator' },
      { id: 'e-balanceagee', label: 'Balance âgée clients' }
    ]
  }
];

const AccountingModule = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [currentViewId, setCurrentViewId] = useState<string>('s-plancomptable');
  const [currentViewLabel, setCurrentViewLabel] = useState<string>('Plan comptable (Hiérarchisé)');

  const handleMenuClick = (menuTitle: string) => {
    setActiveMenu(activeMenu === menuTitle ? null : menuTitle);
    setActiveSubMenu(null);
  };

  const handleItemClick = (item: any) => {
    if (item.subItems) {
      setActiveSubMenu(activeSubMenu === item.id ? null : item.id);
    } else {
      setCurrentViewId(item.id);
      setCurrentViewLabel(item.label);
      setActiveMenu(null);
      setActiveSubMenu(null);
    }
  };

  const closeMenus = () => {
    setActiveMenu(null);
    setActiveSubMenu(null);
  };

  return (
    <div className="flex flex-col h-full gap-4 relative">
      {activeMenu && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={closeMenus}
        ></div>
      )}

      {/* Barre de menu type SAP / Sage */}
      <div className="flex items-center gap-1 bg-slate-800/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/50 shadow-sm z-50">
        {sageMenus.map((menu, mIdx) => (
          <div key={mIdx} className="relative">
            <button
              onClick={() => handleMenuClick(menu.title)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                activeMenu === menu.title 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {menu.icon}
              {menu.title}
            </button>

            <AnimatePresence>
              {activeMenu === menu.title && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden py-1 z-50"
                >
                  {menu.items.map((item: any, iIdx) => {
                    if (item.type === 'separator') {
                      return <div key={iIdx} className="h-[1px] bg-slate-800 my-1"></div>;
                    }

                    return (
                      <div key={item.id} className="relative group">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick(item);
                          }}
                          className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between transition-colors ${
                            activeSubMenu === item.id || currentViewId === item.id
                              ? 'bg-indigo-600/20 text-indigo-400 border-l-4 border-indigo-600' 
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                             {(item.id === 'ai-planner' || item.id === 'dashboard' || item.id === 's-leases' || item.id === 'e-reporting-hub' || item.id.startsWith('co-') || item.id.startsWith('mm-') || item.id.startsWith('sd-') || item.id.startsWith('grc-')) && <Sparkles size={12} className="text-amber-400" />}
                             {item.label}
                          </div>
                          {item.subItems && <ChevronRight size={14} className="text-slate-600" />}
                        </button>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Main View Area */}
      <div className="flex-1 bg-transparent rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentViewId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {currentViewId === 'dashboard' && <DashboardPilotage />}
            {currentViewId === 'esg-dashboard' && <ESGDashboard />}
            {currentViewId === 'ai-planner' && <AIBudgetPlanner />}
            {currentViewId === 's-plancomptable' && <ChartOfAccounts />}
            {currentViewId === 's-plantiers' && <PlanTiers />}
            {currentViewId === 's-immos' && <FixedAssets />}
            {currentViewId === 's-leases' && <LeaseManagement />}
            {currentViewId === 't-saisieecritures' && <JournalEntry />}
            {currentViewId === 't-relances' && <RappelReleve />}
            {currentViewId === 't-autopayment' && <AutoPaymentProgram />}
            {currentViewId === 't-reevaluation' && <ReevaluationDevise />}
            {currentViewId === 'mm-inventory' && <LogisticsModule />}
            {currentViewId === 'mm-procurement' && <LogisticsModule />}
            {currentViewId === 'sd-sales' && <LogisticsModule />}
            {currentViewId === 'co-industrial' && <IndustrialCosting />}
            {currentViewId === 'grc-consolidation' && <GroupConsolidation />}
            {currentViewId === 'grc-audit' && <GroupConsolidation />}
            {currentViewId === 'e-reporting-hub' && <ReportingHub />}
            {currentViewId === 'e-universal' && <UniversalJournal />}
            {currentViewId === 'e-tax-edi' && <TaxEDIModule />}
            {currentViewId === 'e-balance' && <Balance />}
            {currentViewId === 'e-bilan' && <BilanResultat />}
            {currentViewId === 'e-grandlivre' && <GrandLivre />}
            {currentViewId === 'e-brouillard' && <Brouillard />}
            {currentViewId === 'e-balanceagee' && <BalanceAgee />}
            
            {/* Fallback for other IDs */}
            {!['dashboard', 'esg-dashboard', 'ai-planner', 's-plancomptable', 's-plantiers', 's-immos', 's-leases', 't-saisieecritures', 't-relances', 't-autopayment', 't-reevaluation', 'mm-inventory', 'mm-procurement', 'sd-sales', 'co-industrial', 'grc-consolidation', 'grc-audit', 'e-reporting-hub', 'e-universal', 'e-tax-edi', 'e-balance', 'e-bilan', 'e-grandlivre', 'e-brouillard', 'e-balanceagee'].includes(currentViewId) && (
              <div className="card h-full border-dashed flex flex-col items-center justify-center text-slate-500 bg-slate-800/10 p-20 text-center">
                <div className="p-6 bg-slate-800/50 rounded-3xl mb-6 ring-1 ring-slate-700 shadow-inner">
                   <Settings size={48} className="text-slate-600 animate-spin-slow" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">{currentViewLabel}</h3>
                <p className="text-xs max-w-md text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                   Ce module est actuellement en cours de synchronisation avec le noyau SAP S/4HANA. 
                   La version SYSCOHADA certifiée sera disponible dans la prochaine mise à jour.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccountingModule;
