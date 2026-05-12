import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
  className?: string
  containerClassName?: string
}

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
}: PageIntroProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8",
        containerClassName
      )}
    >
      <div className={cn("max-w-3xl space-y-6", className)}>
        <div className="text-xs font-semibold tracking-[0.32em] text-primary uppercase">
          {eyebrow}
        </div>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>
        {children}
      </div>
    </section>
  )
}
