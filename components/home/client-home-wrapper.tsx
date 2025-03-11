"use client"

import { useEffect, useState } from "react"
import HeroSection from "@/components/home/hero-section"
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="space-y-12">
      <div className="container py-6">
        <HeroSection featuredProducts={featuredProducts} />
      </div>

      <div>
        <CategoryNavigation categories={categories} />
      </div>

      <div className="bg-muted py-12">
        <div className="container">
          <BannerCarousel banners={banners} />
        </div>
      </div>

      <div className="container">
        <LatestProducts products={latestProducts} />
      </div>

      <div className="container pb-12">
        <ProductHighlights
          title="Staff Picks"
          subtitle="Our team's favorite items this season"
          products={featuredProducts}
        />
      </div>
    </main>
  )
} 