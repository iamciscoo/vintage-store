"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductSorting } from "@/components/products/product-sorting"
import { Pagination } from "@/components/products/pagination"
import { Product } from "@/types"

interface ProductsContainerProps {
  products: Product[]
  categories: {
    id: string
    name: string
    slug: string
  }[]
  currentPage: number
  totalPages: number
  searchParams: {
    page?: string
    sort?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    search?: string
  }
}

export function ProductsContainer({
  products,
  categories,
  currentPage,
  totalPages,
  searchParams,
}: ProductsContainerProps) {
  const router = useRouter()
  const queryParams = useSearchParams()
  const [isMounted, setIsMounted] = useState(false)

  // Ensure hydration safety
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Function to update URL params
  const updateParams = (name: string, value: string | null) => {
    const params = new URLSearchParams(queryParams.toString())
    
    if (value === null || value === "") {
      params.delete(name)
    } else {
      params.set(name, value)
    }
    
    // Reset page when changing filters
    if (name !== "page") {
      params.delete("page")
    }
    
    router.push(`/products?${params.toString()}`)
  }

  // Handle category change
  const handleCategoryChange = (category: string | null) => {
    updateParams("category", category)
  }

  // Handle price range change
  const handlePriceChange = (min: number | null, max: number | null) => {
    if (min !== null) {
      updateParams("minPrice", min.toString())
    } else {
      updateParams("minPrice", null)
    }
    
    if (max !== null) {
      updateParams("maxPrice", max.toString())
    } else {
      updateParams("maxPrice", null)
    }
  }

  // Handle sorting change
  const handleSortChange = (sort: string) => {
    updateParams("sort", sort)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    updateParams("page", page.toString())
  }

  if (!isMounted) {
    // Return placeholder for SSR
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <ProductFilters
            categories={categories}
            selectedCategory={searchParams.category || null}
            onCategoryChange={handleCategoryChange}
            minPrice={searchParams.minPrice ? Number(searchParams.minPrice) : null}
            maxPrice={searchParams.maxPrice ? Number(searchParams.maxPrice) : null}
            onPriceChange={handlePriceChange}
          />
        </div>

        {/* Products grid */}
        <div className="flex-grow">
          <div className="mb-6">
            <ProductSorting
              sort={searchParams.sort || "newest"}
              onSortChange={handleSortChange}
            />
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
              <button 
                onClick={() => router.push("/products")}
                className="mt-4 text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <ProductGrid products={products} />
              
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 