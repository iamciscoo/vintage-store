"use client"

import Link from "next/link"
import { useCart } from "@/lib/store/cart"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CartSummaryProps {
  onClose?: () => void
}

export function CartSummary({ onClose }: CartSummaryProps) {
  const { getTotalItems, getTotalPrice } = useCart()

  const totalItems = getTotalItems()
  const subtotal = getTotalPrice()
  const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100
  const total = subtotal + shipping

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Order Summary</h3>
      
      <Separator />
      
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span>${shipping.toFixed(2)}</span>
          )}
        </div>
        {shipping > 0 && (
          <div className="text-xs text-muted-foreground">
            Free shipping on orders over $100
          </div>
        )}
      </div>
      
      <Separator />
      
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      
      <Button 
        className="w-full" 
        size="lg" 
        asChild
        onClick={onClose}
      >
        <Link href="/checkout">
          Proceed to Checkout
        </Link>
      </Button>
      
      <div className="text-center text-xs text-muted-foreground">
        Taxes calculated at checkout
      </div>
    </div>
  )
} 