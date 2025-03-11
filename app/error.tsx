"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Something went wrong</h1>
      <p className="text-lg mb-6 max-w-md mx-auto">
        We apologize for the inconvenience. Our team has been notified of this issue.
      </p>
      {error.digest && (
        <p className="text-sm text-muted-foreground mb-6">
          Error ID: {error.digest}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Return to home page</Link>
        </Button>
      </div>
    </div>
  )
} 