import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductRatingProps {
  rating: number
  max?: number
  interactive?: boolean
  onChange?: (rating: number) => void
  className?: string
}

export function ProductRating({
  rating,
  max = 5,
  interactive = false,
  onChange,
  className,
}: ProductRatingProps) {
  return (
    <div className={cn("flex", className)}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1
        const filled = starValue <= rating

        return interactive ? (
          <button
            key={index}
            type="button"
            onClick={() => onChange?.(starValue)}
            className="p-0.5 text-primary hover:text-primary/80"
          >
            <Star
              className={cn("h-4 w-4", {
                "fill-primary": filled,
                "fill-none": !filled,
              })}
            />
            <span className="sr-only">Rate {starValue} out of {max}</span>
          </button>
        ) : (
          <Star
            key={index}
            className={cn("h-4 w-4", {
              "fill-primary text-primary": filled,
              "fill-none text-muted-foreground": !filled,
            })}
          />
        )
      })}
    </div>
  )
} 