import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"
import { auth } from "@/auth"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/layout/main-nav"
import { CartSheet } from "@/components/cart/cart-sheet"
import { UserAccountNav } from "@/components/layout/user-account-nav"

export default async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Vintage Store</span>
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="mr-2" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <CartSheet />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/auth/signin">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
} 