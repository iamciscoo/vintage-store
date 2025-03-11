"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface ProductFiltersProps {
  categories: {
    id: string
    name: string
    slug: string
  }[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  minPrice: number | null
  maxPrice: number | null
  onPriceChange: (min: number | null, max: number | null) => void
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
}: ProductFiltersProps) {
  const [localMinPrice, setLocalMinPrice] = useState<string>(minPrice?.toString() || "")
  const [localMaxPrice, setLocalMaxPrice] = useState<string>(maxPrice?.toString() || "")
  const [isCategoryOpen, setIsCategoryOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)

  // Update local state when props change
  useEffect(() => {
    setLocalMinPrice(minPrice?.toString() || "")
    setLocalMaxPrice(maxPrice?.toString() || "")
  }, [minPrice, maxPrice])

  // Handle price filter submission
  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const min = localMinPrice ? Number(localMinPrice) : null
    const max = localMaxPrice ? Number(localMaxPrice) : null
    
    onPriceChange(min, max)
  }

  // Clear all filters
  const clearFilters = () => {
    onCategoryChange(null)
    onPriceChange(null, null)
    setLocalMinPrice("")
    setLocalMaxPrice("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        {(selectedCategory || minPrice || maxPrice) && (
          <Button 
            variant="outline" 
            className="w-full mb-4"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Categories filter */}
      <div>
        <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-medium">Categories</h3>
              <ChevronDown 
                className={`h-5 w-5 transition-transform ${
                  isCategoryOpen ? "transform rotate-180" : ""
                }`} 
              />
            </div>
          </CollapsibleTrigger>
          <Separator className="my-3" />
          <CollapsibleContent>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => onCategoryChange(null)}
                className={`flex items-center justify-between px-2 py-1.5 text-left rounded hover:bg-muted ${
                  !selectedCategory ? "font-medium bg-muted" : ""
                }`}
              >
                <span>All Categories</span>
                {!selectedCategory && <Check className="h-4 w-4" />}
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.slug)}
                  className={`flex items-center justify-between px-2 py-1.5 text-left rounded hover:bg-muted ${
                    selectedCategory === category.slug ? "font-medium bg-muted" : ""
                  }`}
                >
                  <span>{category.name}</span>
                  {selectedCategory === category.slug && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Price filter */}
      <div>
        <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-medium">Price Range</h3>
              <ChevronDown 
                className={`h-5 w-5 transition-transform ${
                  isPriceOpen ? "transform rotate-180" : ""
                }`} 
              />
            </div>
          </CollapsibleTrigger>
          <Separator className="my-3" />
          <CollapsibleContent>
            <form onSubmit={handlePriceSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="min-price">Min</Label>
                  <Input
                    id="min-price"
                    type="number"
                    placeholder="0"
                    value={localMinPrice}
                    onChange={(e) => setLocalMinPrice(e.target.value)}
                    min="0"
                    step="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-price">Max</Label>
                  <Input
                    id="max-price"
                    type="number"
                    placeholder="1000"
                    value={localMaxPrice}
                    onChange={(e) => setLocalMaxPrice(e.target.value)}
                    min="0"
                    step="1"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Apply</Button>
            </form>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
} 