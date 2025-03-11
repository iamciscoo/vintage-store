import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open cart</span>
          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-xs font-bold text-primary-foreground">
            0
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <div className="flex-1">
            <div className="flex h-full flex-col items-center justify-center space-y-2">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium text-muted-foreground">
                Your cart is empty
              </p>
              <Button asChild>
                <Link href="/products">Continue shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 