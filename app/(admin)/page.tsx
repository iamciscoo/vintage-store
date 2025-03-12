import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { DashboardMetrics } from "@/components/admin/dashboard-metrics"
import { DashboardCharts } from "@/components/admin/dashboard-charts"
import { RecentOrders } from "@/components/admin/recent-orders"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const revalidate = 0

export default async function AdminDashboard() {
  // Fetch key metrics
  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    totalRevenue,
    recentOrders,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({
      where: {
        role: "USER",
      },
    }),
    prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: "COMPLETED",
      },
    }),
    prisma.order.findMany({
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
    }),
  ])

  const metrics = {
    totalProducts,
    totalOrders,
    totalCustomers,
    totalRevenue: totalRevenue._sum.total || 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <Suspense fallback={<div>Loading metrics...</div>}>
        <DashboardMetrics metrics={metrics} />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<div>Loading charts...</div>}>
          <DashboardCharts />
        </Suspense>
      </div>

      <div className="mt-6">
        <Suspense fallback={<div>Loading recent orders...</div>}>
          <RecentOrders orders={recentOrders} />
        </Suspense>
      </div>
    </div>
  )
} 