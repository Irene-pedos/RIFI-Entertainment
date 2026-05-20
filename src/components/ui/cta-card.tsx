"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

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
          "flex flex-col overflow-hidden border border-border/60 bg-white rounded-md transition-all md:flex-row shadow-lg hover:border-[#2D4873]/20",
          className
        )}
        {...props}
      >
        {/* Image Section */}
        <div className="relative w-full md:w-2/5 min-h-[300px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content Section */}
        <div className="flex w-full flex-col justify-center p-8 md:w-3/5 lg:p-12">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-[#d68c90] uppercase mb-4">
              {title}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-[#2D4873] leading-tight mb-4">
              {subtitle}
            </h2>
            <p className="text-sm leading-7 text-muted-foreground mb-8 max-w-lg">
              {description}
            </p>
            <div>
              {buttonHref ? (
                <Button size="lg" className="px-10 h-12 rounded-md bg-[#2D4873] hover:bg-[#2D4873]/90 text-[11px] font-bold uppercase tracking-widest transition-all group shadow-md" asChild>
                  <Link href={buttonHref} className="flex items-center gap-3">
                    {buttonText}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="px-10 h-12 rounded-md bg-[#2D4873] hover:bg-[#2D4873]/90 text-[11px] font-bold uppercase tracking-widest transition-all group shadow-md" onClick={onButtonClick}>
                  <span className="flex items-center gap-3">
                    {buttonText}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
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
