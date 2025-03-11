"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store/cart"

interface CartItemProps {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export function CartItem({ id, name, price, image, quantity }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const increment = () => {
    updateQuantity(id, quantity + 1)
  }

  const decrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1)
    } else {
      removeItem(id)
    }
  }

  return (
    <div className="flex items-start py-4 gap-4">
      {/* Product image */}
      <div className="relative h-16 w-16 overflow-hidden rounded-md border">
        <Image 
          src={image || "/placeholder-product.jpg"} 
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product details */}
      <div className="flex-1 space-y-1">
        <div className="flex justify-between">
          <Link 
            href={`/products/${id}`} 
            className="text-sm font-medium hover:underline line-clamp-1"
          >
            {name}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => removeItem(id)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          ${price.toFixed(2)}
        </div>

        {/* Quantity control */}
        <div className="flex items-center gap-2 mt-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6 rounded-full" 
            onClick={decrement}
          >
            <Minus className="h-3 w-3" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="text-sm w-6 text-center">{quantity}</span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6 rounded-full" 
            onClick={increment}
          >
            <Plus className="h-3 w-3" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      {/* Total price */}
      <div className="text-sm font-medium">
        ${(price * quantity).toFixed(2)}
      </div>
    </div>
  )
} 