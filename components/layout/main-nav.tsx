import Link from "next/link"
import { cn } from "@/lib/utils"

const links = [
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/sale", label: "Sale" },
]

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  return (
    <nav className={cn("flex items-center space-x-6", className)}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
} 