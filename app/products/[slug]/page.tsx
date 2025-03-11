import { notFound } from "next/navigation"
import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ProductDetails } from "@/components/product/product-details"
import { ProductReviews } from "@/components/product/product-reviews"
import { Separator } from "@/components/ui/separator"

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  })

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.name} | Vintage Store`,
    description: product.description.substring(0, 155) + "...",
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 155) + "...",
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Fetch the product and its related data
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: {
        not: product.id, // Exclude the current product
      },
    },
    include: {
      category: true,
    },
    take: 4,
  })

  // Calculate average rating
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
      : 0

  return (
    <div className="container py-10">
      {/* Product details section */}
      <ProductDetails 
        product={product}
        averageRating={averageRating}
        reviewCount={product.reviews.length}
      />

      <Separator className="my-10" />

      {/* Reviews section */}
      <section id="reviews" className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <ProductReviews 
          reviews={product.reviews}
          // In a real app, you'd check if the user has reviewed this product already
          userHasReviewed={false}
          onSubmitReview={async (data) => {
            'use server'
            // This would be handled by a server action in a real app
            console.log('Review submitted:', data)
          }}
        />
      </section>

      {/* Related products section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id}>
                {/* We can reuse our ProductCard component here */}
                {/* <ProductCard product={relatedProduct} /> */}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
} 