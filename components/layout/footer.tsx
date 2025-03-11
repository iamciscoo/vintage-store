import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = [
  {
    title: "Shop",
    links: [
      { href: "/products", label: "All Products" },
      { href: "/categories", label: "Categories" },
      { href: "/new-arrivals", label: "New Arrivals" },
      { href: "/sale", label: "Sale" },
      { href: "/best-sellers", label: "Best Sellers" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
      { href: "/press", label: "Press" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping", label: "Shipping" },
      { href: "/returns", label: "Returns" },
      { href: "/size-guide", label: "Size Guide" },
      { href: "/track-order", label: "Track Order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/refund", label: "Refund Policy" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
]

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Youtube, label: "Youtube" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="space-y-4 lg:w-1/3">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Vintage Store"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold">Vintage Store</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for unique vintage clothing and accessories.
              Discover timeless pieces that tell a story.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Subscribe to our newsletter</h3>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-[240px]"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-sm font-medium">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vintage Store. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-foreground"
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
} 