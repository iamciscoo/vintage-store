import { prisma } from "@/lib/prisma"
import { HeroSection } from "@/components/home/hero-section"
import { BannerCarousel } from "@/components/home/banner-carousel"
import { CategoryNavigation } from "@/components/home/category-navigation"
import { LatestProducts } from "@/components/home/latest-products"
import { ProductHighlights } from "@/components/home/product-highlights"

export default async function Home() {
  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0, // Only include products that are in stock
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      price: "desc", // Feature higher-priced items
    },
    take: 3,
  })

  // Fetch latest products
  const latestProducts = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc", // Most recent first
    },
    take: 8,
  })

  // Fetch all categories
  const categories = await prisma.category.findMany()

  // Promotional banners
  const banners = [
    {
      id: "1",
      image: "/images/banners/banner-summer.jpg",
      title: "Summer Collection",
      description: "Discover our new summer arrivals. Light fabrics and vibrant colors for the season.",
      buttonText: "Shop Summer",
      buttonLink: "/categories/summer",
      backgroundColor: "#f8c9a4",
    },
    {
      id: "2",
      image: "/images/banners/banner-sale.jpg",
      title: "Special Discount",
      description: "Up to 40% off on selected items. Limited time offer!",
      buttonText: "View Sale",
      buttonLink: "/sale",
      backgroundColor: "#a4c9f8",
    },
  ]

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
