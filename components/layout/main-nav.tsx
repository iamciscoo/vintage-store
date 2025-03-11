import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const links = [
  {
    title: "Products",
    href: "/products",
    description: "Browse our full collection of vintage items",
  },
  {
    title: "Categories",
    items: [
      {
        title: "Clothing",
        href: "/categories/clothing",
        description: "Vintage clothing from different eras",
      },
      {
        title: "Accessories",
        href: "/categories/accessories",
        description: "Complete your look with vintage accessories",
      },
      {
        title: "Jewelry",
        href: "/categories/jewelry",
        description: "Unique vintage jewelry pieces",
      },
      {
        title: "Home Decor",
        href: "/categories/home-decor",
        description: "Add vintage charm to your space",
      },
    ],
  },
  {
    title: "New Arrivals",
    href: "/new-arrivals",
    description: "Check out our latest vintage finds",
  },
  {
    title: "Sale",
    href: "/sale",
    description: "Great deals on selected vintage items",
  },
]

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  return (
    <NavigationMenu className={cn("", className)}>
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link.title}>
            {link.items ? (
              <>
                <NavigationMenuTrigger className="h-9">
                  {link.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {link.items.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link
                href={link.href}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                {link.title}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
} 