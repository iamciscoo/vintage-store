"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Banner {
  id: string
  image: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  backgroundColor?: string
}

interface BannerCarouselProps {
  banners: Banner[]
  autoPlay?: boolean
  interval?: number
}

export default function BannerCarousel({
  banners,
  autoPlay = true,
  interval = 5000,
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || banners.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, banners.length, interval])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  if (banners.length === 0) {
    return null
  }

  const currentBanner = banners[currentIndex]

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Banner Content */}
      <div
        className="relative aspect-[21/9] w-full"
        style={{ backgroundColor: currentBanner.backgroundColor || "#000000" }}
      >
        <Image
          src={currentBanner.image}
          alt={currentBanner.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/60 to-transparent">
          <div className="container">
            <div className="max-w-lg text-white">
              <h2 className="mb-4 text-4xl font-bold">{currentBanner.title}</h2>
              <p className="mb-6 text-lg opacity-90">{currentBanner.description}</p>
              <Button asChild size="lg" variant="default">
                <Link href={currentBanner.buttonLink}>{currentBanner.buttonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
            aria-label="Next banner"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
} 