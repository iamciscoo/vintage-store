"use client"

import Link from "next/link"
import { User } from "next-auth"
import { Bell, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { UserAccountNav } from "@/components/layout/user-account-nav"

interface AdminHeaderProps {
  user: User
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-semibold">
            Admin Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">View notifications</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
          <UserAccountNav user={user} />
        </div>
      </div>
    </header>
  )
} 