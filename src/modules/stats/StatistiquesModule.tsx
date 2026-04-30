import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, Activity,
  ArrowUpRight, ArrowDownRight, ShieldCheck, AlertCircle,
  PieChart as PieChartIcon, Download, RefreshCw, Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ─── Sample Data ───────────────────────────────────────────── */
const dataPerf = [
  { name: 'Jan', Achats: 2400, Ventes: 4000 },
  { name: 'Fév', Achats: 1398, Ventes: 3000 },
  { name: 'Mar', Achats: 2800, Ventes: 5200 },
  { name: 'Avr', Achats: 3200, Ventes: 4780 },
  { name: 'Mai', Achats: 3800, Ventes: 5890 },
  { name: 'Juin', Achats: 3200, Ventes: 6390 },
];
const dataTreso = [
  { name: 'S1', solde: 28000 },
  { name: 'S2', solde: 31000 },
  { name: 'S3', solde: 27500 },
  { name: 'S4', solde: 33373 },
];
const dataAnalytique = [
  { name: 'Ventes', value: 400 },
  { name: 'Production', value: 300 },
  { name: 'Admin', value: 150 },
  { name: 'Logistique', value: 100 },
];
const COLORS = ['#2563eb', '#16a34a', '#d97706', '#9333ea'];

/* ─── KPI Card ──────────────────────────────────────────────── */
const KpiCard = ({ label, value, unit, trend, trendPositive }: {
  label: string; value: string; unit: string; trend: string; trendPositive: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="erp-card"
    style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem' }}
  >
    <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--clr-text-muted)' }}>
      {label}
    </p>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
      <span style={{ fontSize: '1.625rem', fontWeight: 700, color: 'var(--clr-text-h)', lineHeight: 1 }}>
        {value}
      </span>
      <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>{unit}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      {trendPositive
        ? <ArrowUpRight size={14} style={{ color: 'var(--clr-success)' }} />
        : <ArrowDownRight size={14} style={{ color: 'var(--clr-danger)' }} />
      }
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: trendPositive ? 'var(--clr-success)' : 'var(--clr-danger)' }}>
        {trend}
      </span>
      <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>vs période préc.</span>
    </div>
  </motion.div>
);

/* ─── Alert Item ────────────────────────────────────────────── */
const AlertItem = ({ type, title, desc }: { type: 'warning' | 'info' | 'danger' | 'success'; title: string; desc: string; }) => {
  const colors: Record<string, { border: string; dot: string }> = {
    warning: { border: 'var(--clr-warning)', dot: 'var(--clr-warning)' },
    danger:  { border: 'var(--clr-danger)',  dot: 'var(--clr-danger)' },
    info:    { border: 'var(--clr-primary)', dot: 'var(--clr-primary)' },
    success: { border: 'var(--clr-success)', dot: 'var(--clr-success)' },
  };
  return (
    <div style={{ display: 'flex', gap: '0.875rem', padding: '0.875rem 1rem', borderRadius: 8, background: 'var(--clr-bg)', border: '1px solid var(--clr-border)', borderLeft: `3px solid ${colors[type].border}` }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[type].dot, flexShrink: 0, marginTop: 5 }} />
      <div>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--clr-text-h)', marginBottom: '0.25rem' }}>{title}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN MODULE
   ═══════════════════════════════════════════════════════════════ */
const StatistiquesModule = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'analytique'>('dashboard');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── Toolbar ───────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['dashboard', 'analytique'] as const).map(v => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              style={{
                padding: '0.375rem 0.875rem', borderRadius: 6,
                fontSize: '0.8125rem', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.15s',
                background: activeView === v ? 'var(--clr-primary)' : 'var(--clr-surface)',
                color: activeView === v ? '#fff' : 'var(--clr-text-body)',
                border: activeView === v ? 'none' : '1px solid var(--clr-border)',
              }}
            >
              {v === 'dashboard' ? 'Dashboard CFO' : 'Vue Analytique'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--clr-text-muted)', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 6, padding: '0.3rem 0.625rem' }}>
            <Lock size={11} /> Accès restreint — Confidentiel
          </div>
          <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
            <Download size={14} /> Exporter
          </button>
        </div>
      </div>

      {/* ── KPI Row ───────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <KpiCard label="Chiffre d'Affaires"    value="45 823 000" unit="F CFA" trend="+12.5%" trendPositive />
        <KpiCard label="Charges d'Exploitation" value="12 450 000" unit="F CFA" trend="-2.4%"  trendPositive={false} />
        <KpiCard label="Solde Trésorerie"       value="33 373 000" unit="F CFA" trend="+5.2%"  trendPositive />
        <KpiCard label="Créances Clients"       value="8 900 000"  unit="F CFA" trend="+1.8%"  trendPositive />
      </div>

      {/* ── Charts Row ────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1rem' }}>
        {/* Bar Chart */}
        <div className="erp-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>Performance d'Exploitation</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>Ventes vs Charges — 6 derniers mois</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dataPerf} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--clr-border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--clr-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--clr-text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--clr-border)', fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Achats" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Ventes" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="erp-card" style={{ padding: '1.25rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>Cinétique de Trésorerie</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>Solde hebdomadaire (F CFA)</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={dataTreso}>
              <defs>
                <linearGradient id="colorSolde" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--clr-border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--clr-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--clr-text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--clr-border)', fontSize: 12 }} />
              <Area type="monotone" dataKey="solde" stroke="#2563eb" strokeWidth={2} fill="url(#colorSolde)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bottom Row ────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
        {/* Pie Chart */}
        <div className="erp-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem' }}>Structure Analytique</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)', marginBottom: '1rem' }}>Répartition budgétaire</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={dataAnalytique} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {dataAnalytique.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--clr-border)', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
            {dataAnalytique.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i] }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="erp-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>Signaux de Gestion</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>Alertes nécessitant une action</p>
            </div>
            <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.625rem' }}>Traiter tout</button>
          </div>
          <AlertItem type="danger"  title="Retard de paiement — SARL SUNU" desc="Encours de 1 250 000 F CFA dépassé depuis 90 jours. Action de relance recommandée." />
          <AlertItem type="info"   title="Clôture périodique disponible"   desc="La période Octobre 2024 est prête pour clôture légale. Taux de lettrage : 98.4%." />
          <AlertItem type="warning" title="Dépassement budgétaire — Marketing" desc="Le poste Marketing & Communication dépasse les prévisions de 12% ce trimestre." />
          <AlertItem type="success" title="Piste d'audit universelle active (ACDOCA)" desc="Hash SHA-256 : 8f2e91a0-4d1c9e82 • Certifié par Joule AI Auditor" />
        </div>
      </div>

    </div>
  );
};

export default StatistiquesModule;
