"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { ProductRating } from "@/components/product/product-rating"
import { Separator } from "@/components/ui/separator"

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: Date
  user: {
    name: string
  }
}

interface ProductReviewsProps extends React.HTMLAttributes<HTMLDivElement> {
  reviews: Review[]
  userHasReviewed?: boolean
  onSubmitReview?: (data: { rating: number; comment: string }) => Promise<void>
}

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment must not exceed 500 characters"),
})

type ReviewForm = z.infer<typeof reviewSchema>

export function ProductReviews({
  reviews,
  userHasReviewed = false,
  onSubmitReview,
  className,
  ...props
}: ProductReviewsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  })

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0

  async function onSubmit(data: ReviewForm) {
    try {
      setIsSubmitting(true)
      await onSubmitReview?.(data)
      form.reset()
    } catch (error) {
      console.error("Failed to submit review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Customer Reviews
          </h2>
          <p className="text-sm text-muted-foreground">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ProductRating rating={Math.round(averageRating)} />
          <span className="text-sm font-medium">
            {averageRating.toFixed(1)} out of 5
          </span>
        </div>
      </div>
      {!userHasReviewed && onSubmitReview && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
              <CardDescription>
                Share your thoughts about this product with other customers
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <ProductRating
                            rating={field.value}
                            interactive
                            onChange={field.onChange}
                            className="gap-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your review here..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
          <Separator />
        </>
      )}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">
                    {review.user.name}
                  </CardTitle>
                  <CardDescription>
                    {format(review.createdAt, "MMMM d, yyyy")}
                  </CardDescription>
                </div>
                <ProductRating rating={review.rating} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 