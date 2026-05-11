"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Define the props interface for the component
interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string
  imageAlt: string
  title: string
  subtitle: React.ReactNode
  description: string
  buttonText: string
  buttonHref?: string
  onButtonClick?: () => void
}

// Reusable CtaCard component adapted for RiFi Entertainment guidelines
const CtaCard = React.forwardRef<HTMLDivElement, CtaCardProps>(
  (
    {
      className,
      imageSrc,
      imageAlt,
      title,
      subtitle,
      description,
      buttonText,
      buttonHref,
      onButtonClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col overflow-hidden border border-border/70 bg-card text-card-foreground shadow-sm md:flex-row",
          "rounded-none", // Following sharp corners guideline
          className
        )}
        {...props}
      >
        {/* Image Section */}
        <div className="relative w-full md:w-1/3">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content Section */}
        <div className="flex w-full flex-col justify-center p-8 md:w-2/3 lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
              {title}
            </p>
            <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              {subtitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {description}
            </p>
            <div className="mt-8">
              {buttonHref ? (
                <Button size="lg" className="px-8" asChild>
                  <Link href={buttonHref}>{buttonText}</Link>
                </Button>
              ) : (
                <Button size="lg" className="px-8" onClick={onButtonClick}>
                  {buttonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
CtaCard.displayName = "CtaCard"

export { CtaCard }
