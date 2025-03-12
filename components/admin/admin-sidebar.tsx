"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Box,
  ClipboardList,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  {
    title: "Overview",
    href: "/admin",
    icon: BarChart,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Box,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col border-r">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="font-semibold">
          Vintage Store
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Button
              key={link.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive && "bg-secondary"
              )}
              asChild
            >
              <Link href={link.href}>
                <Icon className="mr-2 h-5 w-5" />
                {link.title}
              </Link>
            </Button>
          )
        })}
      </nav>
    </aside>
  )
} 