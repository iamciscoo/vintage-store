import { prisma } from "@/lib/prisma"
import { ClientHomeWrapper } from "@/components/home/client-home-wrapper"

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
    <ClientHomeWrapper 
      featuredProducts={featuredProducts}
      latestProducts={latestProducts}
      categories={categories}
      banners={banners}
    />
  )
}
