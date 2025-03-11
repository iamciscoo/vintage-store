"use client"

import { useEffect, useState } from "react"
import { HeroSection } from "@/components/home/hero-section"
import { BannerCarousel } from "@/components/home/banner-carousel"
import { CategoryNavigation } from "@/components/home/category-navigation"
import { LatestProducts } from "@/components/home/latest-products"
import { ProductHighlights } from "@/components/home/product-highlights"
import type { Product } from "@/types"

interface Category {
  id: string
  name: string
  slug: string
  image?: string
}

interface Banner {
  id: string
  image: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  backgroundColor?: string
}

interface ClientHomeWrapperProps {
  featuredProducts: Product[]
  latestProducts: Product[]
  categories: Category[]
  banners: Banner[]
}

export function ClientHomeWrapper({
  featuredProducts,
  latestProducts,
  categories,
  banners,
}: ClientHomeWrapperProps) {
  // Use state to handle hydration
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Return nothing during SSR
  }

  return (
    <main>
      <section className="container py-6">
        <HeroSection featuredProducts={featuredProducts} />
      </section>

      <CategoryNavigation categories={categories} />

      <section className="py-12 bg-muted">
        <div className="container">
          <BannerCarousel banners={banners} />
        </div>
      </section>

      <LatestProducts products={latestProducts} />

      <ProductHighlights
        title="Staff Picks"
        subtitle="Our team's favorite items this season"
        products={featuredProducts}
      />
    </main>
  )
} 