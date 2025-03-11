import { prisma } from "@/lib/prisma"
import { ClientHomeWrapper } from "@/components/home/client-home-wrapper"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function Home() {
  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      price: "desc",
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
      createdAt: "desc",
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
      <ClientHomeWrapper
        featuredProducts={featuredProducts}
        latestProducts={latestProducts}
        categories={categories}
        banners={banners}
      />
    </main>
  )
}
