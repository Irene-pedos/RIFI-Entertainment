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
    <section className={cn("w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8", containerClassName)}>
      <div className={cn("w-full space-y-3", className)}>
        <div className="text-[10px] font-semibold tracking-[0.32em] text-primary uppercase">
          {eyebrow}
        </div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl text-[#2D4873]">
          {title}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
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
