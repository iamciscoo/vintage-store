export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  slug: string
  category: {
    name: string
    slug: string
  }
} 