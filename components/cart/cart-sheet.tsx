"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { useCart } from "@/lib/store/cart"

export function CartSheet() {
  const { items, getTotalItems } = useCart()
  // Use state to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const totalItems = isMounted ? getTotalItems() : 0
  const isEmpty = items.length === 0

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open cart</span>
          {isMounted && totalItems > 0 && (
            <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-primary text-xs font-bold text-primary-foreground flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        
        {isEmpty ? (
          <div className="flex-1">
            <div className="flex h-full flex-col items-center justify-center space-y-2 py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium text-muted-foreground">
                Your cart is empty
              </p>
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/products">Continue shopping</Link>
                </Button>
              </SheetClose>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto py-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4 py-4">
              <SheetClose asChild>
                <CartSummary />
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
} 