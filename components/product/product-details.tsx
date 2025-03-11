import { ShoppingCart } from "lucide-react"

import { ProductGallery } from "@/components/product/product-gallery"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  stock: number
  category: {
    name: string
    slug: string
  }
}

interface ProductDetailsProps {
  product: Product
  onAddToCart?: (productId: string) => void
  isAddedToCart?: boolean
}

export function ProductDetails({
  product,
  onAddToCart,
  isAddedToCart = false,
}: ProductDetailsProps) {
  const { id, name, description, price, images, stock, category } = product

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ProductGallery images={images} className="w-full" />
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold lg:text-3xl">{name}</h1>
          <p className="text-sm text-muted-foreground">{category.name}</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            {stock > 0 ? (
              <span className="text-sm text-muted-foreground">
                {stock} in stock
              </span>
            ) : (
              <span className="text-sm font-medium text-destructive">
                Out of stock
              </span>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                View size guide
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xl">
              <SheetHeader className="space-y-2.5">
                <SheetTitle>Size Guide</SheetTitle>
                <SheetDescription>
                  Please refer to this size guide to find your perfect fit.
                </SheetDescription>
              </SheetHeader>
              <Separator className="my-4" />
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Measurements may vary by size. Please contact us if you need
                  specific measurements for your size.
                </p>
                <div className="grid gap-4">
                  <div className="grid gap-1">
                    <h4 className="text-sm font-medium">General Advice</h4>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      <li>If you&apos;re between sizes, order a size up</li>
                      <li>
                        Refer to your measurements, not your usual size in other brands
                      </li>
                      <li>
                        Consider the style and fit (regular, slim, oversized) when
                        choosing your size
                      </li>
                    </ul>
                  </div>
                  <div className="grid gap-1">
                    <h4 className="text-sm font-medium">Care Instructions</h4>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      <li>Machine wash cold</li>
                      <li>Do not bleach</li>
                      <li>Tumble dry low</li>
                      <li>Iron on low heat if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button
            size="lg"
            className="w-full"
            disabled={stock === 0}
            onClick={() => onAddToCart?.(id)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAddedToCart ? "Remove from cart" : "Add to cart"}
          </Button>
        </div>
        <Separator />
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Product Description</h2>
          <div className="text-sm text-muted-foreground space-y-2">
            {description.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 