import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ProductsContainer } from "@/components/products/products-container"

export const metadata: Metadata = {
  title: "Products | Vintage Store",
  description: "Browse our collection of vintage items and clothing",
}

interface ProductsPageProps {
  searchParams: {
    page?: string
    sort?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    search?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Default values
  const page = Number(searchParams.page) || 1
  const limit = 12 // Products per page
  const skip = (page - 1) * limit

  // Build the query based on search params
  const where: any = {}

  // Category filter
  if (searchParams.category) {
    where.category = {
      slug: searchParams.category,
    }
  }

  // Price range filter
  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {}
    if (searchParams.minPrice) {
      where.price.gte = parseFloat(searchParams.minPrice)
    }
    if (searchParams.maxPrice) {
      where.price.lte = parseFloat(searchParams.maxPrice)
    }
  }

  // Search query
  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: "insensitive" } },
      { description: { contains: searchParams.search, mode: "insensitive" } },
    ]
  }

  // Sorting
  let orderBy: any = { createdAt: "desc" }
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "price-asc":
        orderBy = { price: "asc" }
        break
      case "price-desc":
        orderBy = { price: "desc" }
        break
      case "newest":
        orderBy = { createdAt: "desc" }
        break
      case "oldest":
        orderBy = { createdAt: "asc" }
        break
      case "name-asc":
        orderBy = { name: "asc" }
        break
      case "name-desc":
        orderBy = { name: "desc" }
        break
    }
  }

  // Fetch products with filters applied
  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
    },
    orderBy,
    skip,
    take: limit,
  })

  // Get total count for pagination
  const totalProducts = await prisma.product.count({ where })
  const totalPages = Math.ceil(totalProducts / limit)

  // Get all categories for filters
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground">
          Showing {products.length} of {totalProducts} items
        </p>
      </div>

      <ProductsContainer
        products={products}
        categories={categories}
        currentPage={page}
        totalPages={totalPages}
        searchParams={searchParams}
      />
    </div>
  )
} 