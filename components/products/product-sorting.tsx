"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProductSortingProps {
  sort: string
  onSortChange: (sort: string) => void
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
]

export function ProductSorting({ sort, onSortChange }: ProductSortingProps) {
  const currentOption = sortOptions.find((option) => option.value === sort) || sortOptions[0]

  return (
    <div className="flex items-center justify-end">
      <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-between">
            {currentOption.label}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
              {option.value === sort && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 