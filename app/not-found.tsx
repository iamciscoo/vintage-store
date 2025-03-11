import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Page not found</h1>
      <p className="text-lg mb-6 max-w-md mx-auto">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Button asChild>
        <Link href="/">Return to home page</Link>
      </Button>
    </div>
  )
} 