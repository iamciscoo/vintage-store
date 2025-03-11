import { ProductGrid } from "@/components/product/product-grid"
import { ProductCard } from "@/components/product/product-card"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  category: {
    name: string
    slug: string
  }
}

interface SearchResultsProps {
  products: Product[]
  searchQuery: string
}

export function SearchResults({ products, searchQuery }: SearchResultsProps) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!searchQuery) {
    return (
      <div className="text-center text-muted-foreground">
        Start typing to search products...
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No products found for &quot;{searchQuery}&quot;
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Found {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
      </p>
      <ProductGrid products={filteredProducts} />
    </div>
  )
} 