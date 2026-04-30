import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { KPICard } from '@/components/dashboard/KPICard'
import { TrendingUp, BarChart3, Users, Package } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const chartData = [
  { month: 'Jan', revenue: 4000, profit: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398 },
  { month: 'Mar', revenue: 2000, profit: 9800 },
  { month: 'Apr', revenue: 2780, profit: 3908 },
  { month: 'May', revenue: 1890, profit: 4800 },
  { month: 'Jun', revenue: 2390, profit: 3800 },
]

const recentOrders = [
  { id: 'CMD-2024-001', client: 'ACME Corp', amount: 150000, status: 'Validée' },
  { id: 'CMD-2024-002', client: 'Tech Solutions', amount: 320000, status: 'En attente' },
  { id: 'CMD-2024-003', client: 'Global Industries', amount: 450000, status: 'Livrée' },
  { id: 'CMD-2024-004', client: 'StartUp Inc', amount: 95000, status: 'Annulée' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Dashboard() {
  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants}>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-0">
              Tableau de Bord
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Bienvenue sur GestionPro ERP - Aperçu de votre activité
            </p>
          </div>
        </motion.div>

        {/* KPIs Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <KPICard
            title="Chiffre d'Affaires HT"
            value="12.5"
            unit="M XOF"
            trend={{ value: 12, isPositive: true }}
            icon={<TrendingUp className="h-6 w-6" />}
            color="primary"
          />
          <KPICard
            title="Marge Commerciale"
            value="35.8"
            unit="%"
            trend={{ value: 2.1, isPositive: true }}
            icon={<BarChart3 className="h-6 w-6" />}
            color="success"
          />
          <KPICard
            title="Effectif Total"
            value="248"
            trend={{ value: 5, isPositive: true }}
            icon={<Users className="h-6 w-6" />}
            color="secondary"
          />
          <KPICard
            title="Stock Valorisé"
            value="8.2"
            unit="M XOF"
            trend={{ value: 3, isPositive: false }}
            icon={<Package className="h-6 w-6" />}
            color="warning"
          />
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader
              title="Chiffre d'Affaires Mensuel"
              subtitle="Tendance des 6 derniers mois"
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    style={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#9ca3af" style={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0284c7"
                    strokeWidth={2}
                    dot={{ fill: '#0284c7', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Revenu"
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={{ fill: '#16a34a', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Profit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader title="Statistiques Rapides" />
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Commandes</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-0">156</p>
                  </div>
                  <span className="rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    +12%
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Factures</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-0">892</p>
                  </div>
                  <span className="rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
                    +8%
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Impayés</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-0">2.1M</p>
                  </div>
                  <span className="rounded-lg bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 dark:bg-red-900 dark:text-red-300">
                    +2%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader
              title="Commandes Récentes"
              action={
                <Button size="sm" variant="outline">
                  Voir tout
                </Button>
              }
            />
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-neutral-200 dark:border-neutral-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                        Commande
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                        Client
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                        Montant
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
                      >
                        <td className="px-4 py-3 font-mono text-neutral-900 dark:text-neutral-0">
                          {order.id}
                        </td>
                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                          {order.client}
                        </td>
                        <td className="px-4 py-3 font-semibold text-neutral-900 dark:text-neutral-0">
                          {order.amount.toLocaleString('fr-SN')} XOF
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                              order.status === 'Validée'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : order.status === 'En attente'
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                                  : order.status === 'Livrée'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  )
}

export default Dashboard
