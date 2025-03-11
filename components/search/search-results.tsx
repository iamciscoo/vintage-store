"use client"

import { ProductGrid } from "@/components/product/product-grid"
import { type Product } from "@/types"

interface SearchResultsProps {
  query: string
  products: Product[]
}

export function SearchResults({ query, products }: SearchResultsProps) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return <ProductGrid products={filteredProducts} />
} 