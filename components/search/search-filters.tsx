import { useCallback } from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Category {
  id: string
  name: string
  slug: string
}

interface PriceRange {
  min: number
  max: number | null
  label: string
}

interface SearchFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  selectedPriceRange: PriceRange | null
  onPriceRangeChange: (range: PriceRange | null) => void
}

const priceRanges: PriceRange[] = [
  { min: 0, max: 50, label: "Under $50" },
  { min: 50, max: 100, label: "$50 - $100" },
  { min: 100, max: 200, label: "$100 - $200" },
  { min: 200, max: null, label: "$200+" },
]

export function SearchFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  className,
  ...props
}: SearchFiltersProps) {
  const handleCategoryClick = useCallback(
    (categorySlug: string) => {
      onCategoryChange(categorySlug === selectedCategory ? null : categorySlug)
    },
    [selectedCategory, onCategoryChange]
  )

  const handlePriceRangeClick = useCallback(
    (range: PriceRange) => {
      onPriceRangeChange(
        range === selectedPriceRange ? null : range
      )
    },
    [selectedPriceRange, onPriceRangeChange]
  )

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your search results</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                className={cn(
                  "justify-start gap-2",
                  selectedCategory === category.slug &&
                    "bg-secondary text-secondary-foreground"
                )}
                onClick={() => handleCategoryClick(category.slug)}
              >
                {selectedCategory === category.slug && (
                  <Check className="h-4 w-4" />
                )}
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Price Range</h3>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <Button
                key={range.label}
                variant="outline"
                size="sm"
                className={cn(
                  "justify-start gap-2",
                  selectedPriceRange === range &&
                    "bg-secondary text-secondary-foreground"
                )}
                onClick={() => handlePriceRangeClick(range)}
              >
                {selectedPriceRange === range && (
                  <Check className="h-4 w-4" />
                )}
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 