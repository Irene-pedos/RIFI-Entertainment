import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
  centered?: boolean
  children?: ReactNode
  className?: string
  containerClassName?: string
}

export function PageIntro({
  eyebrow,
  title,
  description,
  centered = false,
  children,
  className,
  containerClassName,
}: PageIntroProps) {
  return (
    <section className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="w-full space-y-4">
        <div className="text-xs font-semibold tracking-[0.32em] text-primary uppercase">
          {eyebrow}
        </div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
        <div className={cn(
          "flex flex-wrap gap-4",
          centered && "justify-center"
        )}>
          {children}
        </div>
      </div>
    </section>
  )
}
