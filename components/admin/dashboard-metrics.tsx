"use client"

import {
  CircleDollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DashboardMetricsProps {
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  totalRevenue: number
  className?: string
}

export function DashboardMetrics({
  totalProducts,
  totalOrders,
  totalCustomers,
  totalRevenue,
  className,
}: DashboardMetricsProps) {
  const metrics = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users,
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: CircleDollarSign,
    },
  ]

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 