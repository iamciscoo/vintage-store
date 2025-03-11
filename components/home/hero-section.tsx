"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"

interface HeroSectionProps {
  featuredProducts: Product[]
}

export function HeroSection({ featuredProducts }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const featuredProduct = featuredProducts[currentIndex]

  // Auto-rotate featured products every 5 seconds
  useEffect(() => {
    if (featuredProducts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredProducts.length])

  if (!featuredProduct) {
    return null
  }

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={featuredProduct.images[0] || "/placeholder-product.jpg"}
          alt={featuredProduct.name}
          fill
          className="object-cover brightness-[0.85] transition-all duration-700"
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 bg-gradient-to-r from-black/70 to-transparent">
        <div className="max-w-xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {featuredProduct.name}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {featuredProduct.description.length > 150 
              ? featuredProduct.description.substring(0, 150) + "..." 
              : featuredProduct.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-100"
            >
              <Link href={`/products/${featuredProduct.slug}`}>
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/20"
            >
              <Link href="/categories">
                Browse Categories
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Indicators */}
      {featuredProducts.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View featured product ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
} 