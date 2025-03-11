import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@vintage.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Hats',
        slug: 'hats',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Jerseys',
        slug: 'jerseys',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Pants',
        slug: 'pants',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Shirts',
        slug: 'shirts',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Shoes',
        slug: 'shoes',
      },
    }),
  ])

  // Create products for each category
  // Hats
  await prisma.product.create({
    data: {
      name: 'Vintage Baseball Cap',
      slug: 'vintage-baseball-cap',
      description: 'Classic vintage baseball cap with adjustable strap',
      price: 29.99,
      images: ['/images/c-hats.jpg'],
      stock: 50,
      categoryId: categories[0].id,
    },
  })

  // Jerseys
  await Promise.all([
    prisma.product.create({
      data: {
        name: 'Barcelona Home Jersey 2023/24',
        slug: 'barcelona-home-jersey-2023-24',
        description: 'Official FC Barcelona home jersey for the 2023/24 season',
        price: 89.99,
        images: ['/images/barca jersey.jpg'],
        stock: 100,
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'AC Milan Home Jersey 2023/24',
        slug: 'ac-milan-home-jersey-2023-24',
        description: 'Official AC Milan home jersey for the 2023/24 season',
        price: 89.99,
        images: ['/images/Milan jersey.jpg', '/images/c-jersies.jpg'],
        stock: 100,
        categoryId: categories[1].id,
      },
    }),
  ])

  // Pants
  await prisma.product.create({
    data: {
      name: 'Vintage Cargo Pants',
      slug: 'vintage-cargo-pants',
      description: 'Comfortable and stylish vintage cargo pants',
      price: 59.99,
      images: ['/images/c-pants.jpg'],
      stock: 75,
      categoryId: categories[2].id,
    },
  })

  // Shirts
  await prisma.product.create({
    data: {
      name: 'Classic White T-Shirt',
      slug: 'classic-white-t-shirt',
      description: 'Timeless classic white t-shirt made from premium cotton',
      price: 24.99,
      images: ['/images/c-shirts.jpg'],
      stock: 200,
      categoryId: categories[3].id,
    },
  })

  // Shoes
  await Promise.all([
    prisma.product.create({
      data: {
        name: 'Birkenstock Sandals',
        slug: 'birkenstock-sandals',
        description: 'Comfortable and durable Birkenstock sandals',
        price: 119.99,
        images: ['/images/birk shoes.jpg', '/images/Birks new stock-min.jpg'],
        stock: 50,
        categoryId: categories[4].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Two-Toned Loafers',
        slug: 'two-toned-loafers',
        description: 'Elegant two-toned loafers perfect for any occasion',
        price: 149.99,
        images: ['/images/Two toned loafer shoes.jpg', '/images/c-shoes.jpg'],
        stock: 30,
        categoryId: categories[4].id,
      },
    }),
  ])

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 