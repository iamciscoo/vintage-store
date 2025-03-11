import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  // Optional image for the category
  image?: string
}

interface CategoryNavigationProps {
  categories: Category[]
}

export default function CategoryNavigation({ categories }: CategoryNavigationProps) {
  return (
    <div className="py-10">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Shop By Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative flex flex-col h-36 md:h-48 overflow-hidden rounded-lg transition-all hover:shadow-md"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
              
              {/* Background image or placeholder */}
              <div className="relative w-full h-full">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900" />
                )}
              </div>
              
              {/* Category name */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg md:text-xl font-semibold text-center">
                  {category.name}
                </h3>
                <span className="mt-2 flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse <ChevronRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 