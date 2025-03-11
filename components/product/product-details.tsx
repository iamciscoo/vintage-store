"use client"

import { useState } from "react"
import Link from "next/link"
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductRating } from "@/components/product/product-rating"
import { useCart } from "@/lib/store/cart"

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
  averageRating?: number
  reviewCount?: number
}

export function ProductDetails({
  product,
  averageRating = 0,
  reviewCount = 0,
}: ProductDetailsProps) {
  const { addItem, getItemQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value)
    }
  }

  const handleCartAction = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder-product.jpg",
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Image Gallery */}
      <div>
        <ProductGallery images={product.images} />
      </div>

      {/* Product Information */}
      <div className="space-y-6">
        <div>
          <Link
            href={`/categories/${product.category.slug}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            {product.category.name}
          </Link>
          <h1 className="text-3xl font-bold mt-1">{product.name}</h1>

          <div className="flex items-center gap-2 mt-2">
            <ProductRating rating={averageRating} />
            <Link href="#reviews" className="text-sm hover:underline">
              {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
            </Link>
          </div>

          <p className="text-2xl font-semibold mt-4">${product.price.toFixed(2)}</p>
        </div>

        <div className="prose prose-stone max-w-none">
          <p>{product.description}</p>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium">Quantity</div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <MinusIcon className="h-3 w-3" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                <PlusIcon className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleCartAction}
            disabled={product.stock <= 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>

          <div className="text-sm text-muted-foreground mt-2">
            {product.stock > 0 ? (
              <span>
                {product.stock} {product.stock === 1 ? "item" : "items"} in stock
              </span>
            ) : (
              <span className="text-red-500">Currently out of stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 