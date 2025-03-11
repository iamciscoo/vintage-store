import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"

interface ProductHighlightsProps {
  title?: string
  subtitle?: string
  products: Product[]
  limit?: number
}

export default function ProductHighlights({
  title = "Featured Products",
  subtitle = "Discover our handpicked selection of exceptional pieces",
  products,
  limit = 3,
}: ProductHighlightsProps) {
  // Get a limited number of products
  const highlightedProducts = products.slice(0, limit)

  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlightedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.images[0] || "/placeholder-product.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <span className="font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                  {product.description.substring(0, 100)}
                  {product.description.length > 100 ? "..." : ""}
                </p>
                <Button asChild className="w-full">
                  <Link href={`/products/${product.slug}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 