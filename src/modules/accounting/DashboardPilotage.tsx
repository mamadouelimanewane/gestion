import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Package, AlertCircle } from 'lucide-react';

const dataPerformance = [
  { name: 'Jan', ventes: 4000, achats: 2400 },
  { name: 'Fév', ventes: 3000, achats: 1398 },
  { name: 'Mar', ventes: 2000, achats: 9800 },
  { name: 'Avr', ventes: 2780, achats: 3908 },
  { name: 'Mai', ventes: 1890, achats: 4800 },
  { name: 'Juin', ventes: 2390, achats: 3800 },
];

const dataTresorerie = [
  { name: 'Sem 1', solde: 4000 },
  { name: 'Sem 2', solde: 3000 },
  { name: 'Sem 3', solde: 5000 },
  { name: 'Sem 4', solde: 4780 },
];

const dataAnalytique = [
  { name: 'Dpt Ventes', value: 400 },
  { name: 'Production', value: 300 },
  { name: 'Admin', value: 300 },
  { name: 'Logistique', value: 200 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

const DashboardPilotage = () => {
  return (
    <div className="space-y-6 overflow-auto h-full pb-8 pr-2">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Chiffre d'Affaires" 
          value="45 823 000 F" 
          trend="+12.5%" 
          trendUp={true} 
          icon={<DollarSign size={20} />}
          color="indigo"
        />
        <KpiCard 
          title="Achats / Charges" 
          value="12 450 000 F" 
          trend="-2.4%" 
          trendUp={false} 
          icon={<Package size={20} />}
          color="rose"
        />
        <KpiCard 
          title="Solde de Trésorerie" 
          value="33 373 000 F" 
          trend="+5.2%" 
          trendUp={true} 
          icon={<TrendingUp size={20} />}
          color="emerald"
        />
        <KpiCard 
          title="Créances Clients" 
          value="8 900 000 F" 
          trend="+1.8%" 
          trendUp={true} 
          icon={<Users size={20} />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique Performance */}
        <div className="card bg-slate-800/20 border-slate-700/50 p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-widest">Performance Ventes vs Achats</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" />
                <Bar dataKey="ventes" fill="#6366f1" radius={[4, 4, 0, 0]} name="Ventes" />
                <Bar dataKey="achats" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Achats" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique Trésorerie */}
        <div className="card bg-slate-800/20 border-slate-700/50 p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-widest">Évolution de la Trésorerie</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataTresorerie}>
                <defs>
                  <linearGradient id="colorSolde" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="solde" stroke="#10b981" fillOpacity={1} fill="url(#colorSolde)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Répartition Analytique */}
        <div className="card bg-slate-800/20 border-slate-700/50 p-6 flex flex-col items-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-widest w-full">Répartition des Charges</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataAnalytique}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataAnalytique.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            {dataAnalytique.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes & Notifications */}
        <div className="lg:col-span-2 card bg-slate-800/20 border-slate-700/50 p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-widest">Alertes de Gestion</h3>
          <div className="space-y-4">
            <AlertItem 
              type="warning" 
              title="Retard de paiement critique" 
              desc="Le client SARL SUNU a dépassé son échéance de 90 jours (1 250 000 F)." 
            />
            <AlertItem 
              type="info" 
              title="Clôture de période" 
              desc="Période Octobre 2024 prête pour la clôture. 98% des écritures sont lettrées." 
            />
            <AlertItem 
              type="error" 
              title="Dépassement Budgétaire" 
              desc="Le poste 'Marketing' a dépassé les prévisions de 12% sur le trimestre." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, trend, trendUp, icon, color }: any) => (
  <div className="card group hover:scale-[1.02] transition-all cursor-pointer overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 bg-${color}-500 group-hover:scale-150 transition-transform duration-700`}></div>
    <div className="relative flex justify-between items-start">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
        {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {trend}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-black text-white mt-1">{value}</p>
    </div>
  </div>
);

const AlertItem = ({ type, title, desc }: any) => {
  const colors = {
    warning: 'amber',
    info: 'indigo',
    error: 'rose'
  };
  const color = colors[type as keyof typeof colors] || 'indigo';

  return (
    <div className={`flex gap-4 p-4 rounded-xl bg-${color}-500/5 border border-${color}-500/10 hover:bg-${color}-500/10 transition-colors`}>
      <AlertCircle className={`text-${color}-400 shrink-0`} size={20} />
      <div>
        <h4 className={`text-sm font-bold text-${color}-400`}>{title}</h4>
        <p className="text-xs text-slate-400 mt-1">{desc}</p>
      </div>
    </div>
  );
};

export default DashboardPilotage;
