import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product/product-grid"
import { Product } from "@/types"

interface LatestProductsProps {
  products: Product[]
  title?: string
  viewAllLink?: string
}

export function LatestProducts({
  products,
  title = "Latest Products",
  viewAllLink = "/products",
}: LatestProductsProps) {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <Button variant="ghost" asChild>
            <Link href={viewAllLink} className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  )
} 