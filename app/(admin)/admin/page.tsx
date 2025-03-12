import { DashboardMetrics } from "@/components/admin/dashboard-metrics"
import { DashboardCharts } from "@/components/admin/dashboard-charts"
import { RecentOrders } from "@/components/admin/recent-orders"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Admin Dashboard | Vintage Store",
  description: "Admin dashboard for managing the Vintage Store",
}

export default async function AdminDashboardPage() {
  // Fetch metrics data
  const [totalProducts, totalOrders, totalCustomers, totalRevenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: {
        total: true,
      },
    }),
  ])

  // Fetch recent orders
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <DashboardMetrics
          totalProducts={totalProducts}
          totalOrders={totalOrders}
          totalCustomers={totalCustomers}
          totalRevenue={totalRevenue._sum.total || 0}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <DashboardCharts />
          </div>
          <div className="col-span-3">
            <RecentOrders orders={recentOrders} />
          </div>
        </div>
      </div>
    </div>
  )
} 