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

export function BannerCarousel({
  banners,
  autoPlay = true,
  interval = 5000,
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  useEffect(() => {
    if (!autoPlay || banners.length <= 1) return

    const intervalId = setInterval(goToNext, interval)
    return () => clearInterval(intervalId)
  }, [autoPlay, banners.length, interval])

  if (!banners.length) return null

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-64 md:h-80 lg:h-96">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundColor: banner.backgroundColor || "transparent",
            }}
          >
            <div className="absolute inset-0">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12 text-white">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-4xl font-bold mb-3">{banner.title}</h2>
                <p className="text-sm md:text-base mb-6 max-w-md">{banner.description}</p>
                <Button asChild size="lg" className="w-fit">
                  <Link href={banner.buttonLink}>{banner.buttonText}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full z-10"
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full z-10"
            aria-label="Next banner"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
} 