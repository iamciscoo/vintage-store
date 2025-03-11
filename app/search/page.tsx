import { prisma } from "@/lib/prisma"
import { SearchInput } from "@/components/search/search-input"
import { SearchResults } from "@/components/search/search-results"
import { SearchFilters } from "@/components/search/search-filters"

interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  })

  const categories = await prisma.category.findMany()

  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <SearchFilters
          categories={categories}
          selectedCategory={searchParams.category ?? null}
          onCategoryChange={() => {}}
          selectedPriceRange={null}
          onPriceRangeChange={() => {}}
        />
        <div className="space-y-6">
          <SearchInput products={products} />
          <SearchResults products={products} searchQuery={searchParams.q ?? ""} />
        </div>
      </div>
    </div>
  )
} 