import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[]
}

export function ProductGallery({
  images,
  className,
  ...props
}: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const showPreviousImage = () => {
    setCurrentImage((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const showNextImage = () => {
    setCurrentImage((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  if (!images?.length) {
    return (
      <div className="flex aspect-square w-full items-center justify-center bg-secondary">
        <span className="text-sm text-muted-foreground">No images available</span>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="relative aspect-square">
        <Image
          src={images[currentImage]}
          alt={`Product image ${currentImage + 1} of ${images.length}`}
          fill
          priority
          className="object-cover"
        />
        {images.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="outline"
                size="icon"
                onClick={showPreviousImage}
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={showNextImage}
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-background/80 px-3 py-1.5 backdrop-blur-sm">
              {images.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentImage(index)}
                  className={cn("h-1.5 w-1.5 rounded-full p-0", {
                    "bg-foreground": index === currentImage,
                    "bg-foreground/50": index !== currentImage,
                  })}
                >
                  <span className="sr-only">
                    View image {index + 1} of {images.length}
                  </span>
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-4 overflow-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={cn(
                "relative aspect-square w-20 flex-shrink-0 cursor-pointer rounded-md bg-secondary",
                {
                  "ring-2 ring-primary ring-offset-2":
                    index === currentImage,
                }
              )}
            >
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 