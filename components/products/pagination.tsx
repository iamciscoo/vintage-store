"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    // Always show first and last page
    const pages = new Set<number>()
    
    // Always add first page, current page, and last page
    pages.add(1)
    pages.add(currentPage)
    pages.add(totalPages)
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.add(i)
    }
    
    // Add more pages if there's still room
    if (pages.size < 5 && totalPages > 5) {
      if (currentPage <= 3) {
        // We're close to the start, so add more pages after current
        for (let i = currentPage + 2; i < totalPages && pages.size < 5; i++) {
          pages.add(i)
        }
      } else if (currentPage >= totalPages - 2) {
        // We're close to the end, so add more pages before current
        for (let i = currentPage - 2; i > 1 && pages.size < 5; i--) {
          pages.add(i)
        }
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b)
  }

  // Don't show pagination for single page
  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex justify-center">
      <ul className="flex space-x-1">
        {/* Previous button */}
        <li>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </li>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => {
          // Add ellipsis
          const ellipsisBefore = index > 0 && pageNumbers[index - 1] !== page - 1
          const ellipsisAfter = index < pageNumbers.length - 1 && pageNumbers[index + 1] !== page + 1
          
          return (
            <React.Fragment key={page}>
              {ellipsisBefore && (
                <li className="flex items-center px-2">
                  <span className="text-muted-foreground">...</span>
                </li>
              )}
              
              <li>
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => onPageChange(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={`Page ${page}`}
                >
                  {page}
                </Button>
              </li>
              
              {ellipsisAfter && (
                <li className="flex items-center px-2">
                  <span className="text-muted-foreground">...</span>
                </li>
              )}
            </React.Fragment>
          )
        })}
        
        {/* Next button */}
        <li>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  )
} 