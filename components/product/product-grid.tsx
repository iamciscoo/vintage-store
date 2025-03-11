import { ProductCard } from "@/components/product/product-card"
import { cn } from "@/lib/utils"

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

interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[]
  onAddToCart?: (productId: string) => void
}

export function ProductGrid({
  products,
  onAddToCart,
  className,
  ...props
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex h-[450px] w-full items-center justify-center">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
      {...props}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
} 