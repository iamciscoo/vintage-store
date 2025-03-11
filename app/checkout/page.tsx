"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartSummary } from "@/components/cart/cart-summary"
import { useCart } from "@/lib/store/cart"

export default function CheckoutPage() {
  const { items, getTotalItems } = useCart()
  const [activeTab, setActiveTab] = useState("shipping")
  
  // Redirect to products if cart is empty
  if (typeof window !== "undefined" && items.length === 0) {
    window.location.href = "/products"
    return null
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center">
          <Button variant="ghost" asChild>
            <Link href="/products" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
        
        <h1 className="mb-4 text-3xl font-bold">Checkout</h1>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs defaultValue="shipping" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>
              
              <TabsContent value="shipping" className="space-y-6 pt-4">
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>
                  <p className="text-muted-foreground">
                    Coming soon! This is a placeholder for the shipping form.
                  </p>
                  
                  <Button className="mt-6" onClick={() => setActiveTab("payment")}>
                    Continue to Payment
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-6 pt-4">
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
                  <p className="text-muted-foreground">
                    Coming soon! This is a placeholder for the payment selection.
                  </p>
                  
                  <div className="mt-6 flex gap-4">
                    <Button variant="outline" onClick={() => setActiveTab("shipping")}>
                      Back to Shipping
                    </Button>
                    <Button onClick={() => setActiveTab("review")}>
                      Continue to Review
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="review" className="space-y-6 pt-4">
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Order Review</h2>
                  <p className="text-muted-foreground">
                    Coming soon! This is a placeholder for the order review.
                  </p>
                  
                  <div className="mt-6 flex gap-4">
                    <Button variant="outline" onClick={() => setActiveTab("payment")}>
                      Back to Payment
                    </Button>
                    <Button>
                      Complete Order
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="rounded-lg border p-6">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 