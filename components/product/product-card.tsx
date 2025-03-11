import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

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

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onAddToCart?: (productId: string) => void
}

export function ProductCard({
  product,
  variant = "default",
  isAddedToCart = false,
  onAddToCart,
  className,
  ...props
}: ProductCardProps) {
  const { id, name, slug, price, images, category } = product

  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <CardHeader className="border-b p-0">
        <Link
          href={`/products/${slug}`}
          className="aspect-square relative block bg-muted"
        >
          <Image
            src={images[0]}
            alt={name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-cover transition-transform hover:scale-105"
            priority={variant === "default"}
          />
        </Link>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4">
        <Link
          href={`/categories/${category.slug}`}
          className="text-xs text-muted-foreground hover:underline"
        >
          {category.name}
        </Link>
        <Link href={`/products/${slug}`} className="group">
          <h3 className="line-clamp-2 text-sm font-semibold group-hover:underline">
            {name}
          </h3>
          <p className="font-semibold text-primary">
            ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          aria-label={isAddedToCart ? "Remove from cart" : "Add to cart"}
          size="sm"
          className="w-full"
          onClick={() => onAddToCart?.(id)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAddedToCart ? "Remove from cart" : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  )
} 