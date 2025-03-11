"use client"

import { HeroSection } from "@/components/home/hero-section"
import { BannerCarousel } from "@/components/home/banner-carousel"
import { CategoryNavigation } from "@/components/home/category-navigation"
import { LatestProducts } from "@/components/home/latest-products"
import { ProductHighlights } from "@/components/home/product-highlights"
import { Product } from "@/types"

interface ClientHomeWrapperProps {
  featuredProducts: Product[]
  latestProducts: Product[]
  categories: any[]
  banners: any[]
}

export function ClientHomeWrapper({
  featuredProducts,
  latestProducts,
  categories,
  banners
}: ClientHomeWrapperProps) {
  return (
    <main>
      {/* Hero Section */}
      <section className="container py-6">
        <HeroSection featuredProducts={featuredProducts} />
      </section>

      {/* Category Navigation */}
      <CategoryNavigation categories={categories} />

      {/* Banner Carousel */}
      <section className="py-12">
        <div className="container">
          <BannerCarousel banners={banners} />
        </div>
      </section>

      {/* Latest Products */}
      <LatestProducts products={latestProducts} />

      {/* Product Highlights */}
      <ProductHighlights
        title="Staff Picks"
        subtitle="Our team's favorite items this season"
        products={featuredProducts}
      />
    </main>
  )
} 