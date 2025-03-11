import Link from "next/link"
import Image from "next/image"
import { Search, User, ShoppingBag } from "lucide-react"
import { auth } from "@/auth"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/layout/main-nav"
import { CartSheet } from "@/components/cart/cart-sheet"
import { UserAccountNav } from "@/components/layout/user-account-nav"
import { SearchInput } from "@/components/search/search-input"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { LanguageSelector } from "@/components/preferences/language-selector"
import { CurrencySelector } from "@/components/preferences/currency-selector"

export default async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Vintage Store"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-bold hidden md:inline-block">
              Vintage Store
            </span>
          </Link>
          <MainNav className="hidden lg:flex mx-6" />
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <SearchInput className="hidden sm:flex" />
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
            <CurrencySelector />
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
          </nav>
        </div>
      </div>
    </header>
  )
} 