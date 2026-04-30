import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, Users, Package, AlertCircle,
  Activity, ArrowUpRight, ArrowDownRight, Briefcase,
  PieChart as PieChartIcon, ArrowRight, ShieldCheck
} from 'lucide-react';

const dataPerformance = [
  { name: 'Jan', ventes: 4000, achats: 2400 },
  { name: 'Fév', ventes: 3000, achats: 1398 },
  { name: 'Mar', ventes: 5200, achats: 2800 },
  { name: 'Avr', ventes: 4780, achats: 3200 },
  { name: 'Mai', ventes: 5890, achats: 3800 },
  { name: 'Juin', ventes: 6390, achats: 3200 },
];

const dataTresorerie = [
  { name: 'S1', solde: 28000 },
  { name: 'S2', solde: 31000 },
  { name: 'S3', solde: 27500 },
  { name: 'S4', solde: 33373 },
];

const dataAnalytique = [
  { name: 'Ventes',      value: 400 },
  { name: 'Production',  value: 300 },
  { name: 'Admin',       value: 200 },
  { name: 'Logistique',  value: 150 },
];

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626'];

/* ─── KPI Card ──────────────────────────────────────────────── */
interface KpiProps {
  title: string;
  value: string;
  unit?: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  color: 'blue' | 'red' | 'green' | 'orange';
}

const KpiCard = ({ title, value, unit = 'F CFA', trend, trendUp, icon, color }: KpiProps) => {
  const palette = {
    blue:   { iconBg: '#eff6ff', iconColor: '#2563eb', trendBg: trendUp ? '#f0fdf4' : '#fef2f2' },
    red:    { iconBg: '#fef2f2', iconColor: '#dc2626', trendBg: trendUp ? '#f0fdf4' : '#fef2f2' },
    green:  { iconBg: '#f0fdf4', iconColor: '#16a34a', trendBg: trendUp ? '#f0fdf4' : '#fef2f2' },
    orange: { iconBg: '#fffbeb', iconColor: '#d97706', trendBg: trendUp ? '#f0fdf4' : '#fef2f2' },
  };
  const p = palette[color];

  return (
    <div className="erp-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: p.iconBg, color: p.iconColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.2rem',
          padding: '0.2rem 0.5rem', borderRadius: 999,
          background: trendUp ? '#f0fdf4' : '#fef2f2',
          fontSize: '0.7rem', fontWeight: 600,
          color: trendUp ? '#16a34a' : '#dc2626',
        }}>
          {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </div>
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)', marginBottom: '0.25rem', fontWeight: 500 }}>
        {title}
      </p>
      <p style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--clr-text-h)', lineHeight: 1.2 }}>
        {value} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--clr-text-muted)' }}>{unit}</span>
      </p>
    </div>
  );
};

/* ─── Alert Item ─────────────────────────────────────────────── */
interface AlertProps {
  type: 'warning' | 'info' | 'error';
  title: string;
  desc: string;
}

const AlertItem = ({ type, title, desc }: AlertProps) => {
  const styles = {
    warning: { accent: '#d97706', bg: '#fffbeb', border: '#fde68a' },
    info:    { accent: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    error:   { accent: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  };
  const s = styles[type];

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
      padding: '0.875rem', borderRadius: 10,
      background: s.bg, border: `1px solid ${s.border}`,
      borderLeft: `3px solid ${s.accent}`,
    }}>
      <AlertCircle size={16} style={{ color: s.accent, flexShrink: 0, marginTop: 1 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--clr-text-body)', marginBottom: '0.15rem' }}>{title}</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-sub)', lineHeight: 1.5 }}>{desc}</p>
      </div>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-text-muted)', padding: '0.25rem', flexShrink: 0 }}>
        <ArrowRight size={14} />
      </button>
    </div>
  );
};

/* ─── Chart Wrapper ──────────────────────────────────────────── */
const ChartCard = ({ title, subtitle, children, action }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }) => (
  <div className="erp-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--clr-text-h)' }}>{title}</h3>
        {subtitle && <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)', marginTop: '0.1rem' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

/* ─── Main Dashboard ─────────────────────────────────────────── */
const DashboardPilotage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <KpiCard
          title="Chiffre d'Affaires"
          value="45 823 000"
          trend="+12.5%"
          trendUp={true}
          icon={<DollarSign size={18} />}
          color="blue"
        />
        <KpiCard
          title="Charges d'Exploitation"
          value="12 450 000"
          trend="-2.4%"
          trendUp={false}
          icon={<Package size={18} />}
          color="red"
        />
        <KpiCard
          title="Solde Trésorerie"
          value="33 373 000"
          trend="+5.2%"
          trendUp={true}
          icon={<Activity size={18} />}
          color="green"
        />
        <KpiCard
          title="Créances Clients"
          value="8 900 000"
          trend="+1.8%"
          trendUp={true}
          icon={<Briefcase size={18} />}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <ChartCard
          title="Performance d'Exploitation"
          subtitle="Ventes vs Charges — 6 derniers mois"
          action={
            <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>
              Exporter
            </button>
          }
        >
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPerformance} barGap={4}>
                <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  cursor={{ fill: 'rgba(37,99,235,0.04)' }}
                  contentStyle={{
                    background: '#fff', border: '1px solid #e2e8f0',
                    borderRadius: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    fontSize: 12, padding: '8px 12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="ventes" name="Ventes" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="achats" name="Achats" fill="#fca5a5" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Cinétique de Trésorerie"
          subtitle="Solde hebdomadaire (F CFA)"
          action={
            <button className="btn-ghost" style={{ fontSize: '0.75rem' }}>Voir tout</button>
          }
        >
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataTresorerie}>
                <defs>
                  <linearGradient id="gradSolde" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#16a34a" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    background: '#fff', border: '1px solid #e2e8f0',
                    borderRadius: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    fontSize: 12, padding: '8px 12px',
                  }}
                />
                <Area type="monotone" dataKey="solde" name="Solde" stroke="#16a34a" fill="url(#gradSolde)" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#fff', stroke: '#16a34a', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1rem' }}>
        {/* Pie */}
        <ChartCard title="Structure Analytique" subtitle="Répartition budgétaire">
          <div style={{ height: 180, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataAnalytique} cx="50%" cy="50%" innerRadius={55} outerRadius={75}
                  paddingAngle={4} dataKey="value" stroke="none">
                  {dataAnalytique.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem', paddingTop: '0.25rem', borderTop: '1px solid var(--clr-border)' }}>
            {dataAnalytique.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[i], flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-sub)' }}>{d.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Alerts */}
        <ChartCard
          title="Signaux de Gestion"
          subtitle="Alertes nécessitant une action"
          action={
            <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', color: 'var(--clr-danger)' }}>
              Traiter tout
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <AlertItem
              type="warning"
              title="Retard de paiement — SARL SUNU"
              desc="Encours de 1 250 000 F CFA dépassé depuis 90 jours. Action de relance recommandée."
            />
            <AlertItem
              type="info"
              title="Clôture périodique disponible"
              desc="La période Octobre 2024 est prête pour clôture légale. Taux de lettrage : 98.4%."
            />
            <AlertItem
              type="error"
              title="Dépassement budgétaire — Marketing"
              desc="Le poste Marketing & Communication dépasse les prévisions de 12% ce trimestre."
            />
          </div>
        </ChartCard>
      </div>

      {/* System Status Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        background: 'var(--clr-surface)',
        border: '1px solid var(--clr-border)',
        borderRadius: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <ShieldCheck size={16} style={{ color: 'var(--clr-success)' }} />
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--clr-text-body)' }}>Piste d'audit universelle active (ACDOCA)</p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--clr-text-muted)' }}>
              Hash SHA-256 : <code style={{ fontFamily: 'monospace', background: '#f1f5f9', padding: '0.1rem 0.3rem', borderRadius: 4 }}>8f2e91a0-4d1c9e82</code> • Certifié par Joule AI Auditor
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>Journal Logs</button>
          <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>Réconciliation</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPilotage;
