"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { Search as SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface Product {
  id: string
  name: string
  slug: string
  category: {
    name: string
    slug: string
  }
}

interface SearchInputProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[]
}

export function SearchInput({ products, className, ...props }: SearchInputProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = useCallback((slug: string) => {
    setIsOpen(false)
    router.push(`/products/${slug}`)
  }, [router])

  return (
    <div className={cn("relative", className)} {...props}>
      <Button
        variant="outline"
        className="h-9 w-9 p-0 sm:h-10 sm:w-60 sm:justify-start sm:px-3 sm:py-2"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline-flex">Search products...</span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search products..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {products.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => handleSelect(product.slug)}
              >
                <span>{product.name}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  in {product.category.name}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
} 