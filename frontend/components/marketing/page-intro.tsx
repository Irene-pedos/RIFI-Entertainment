import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
  centered?: boolean
  children?: ReactNode
}

export function PageIntro({
  eyebrow,
  title,
  description,
  centered = false,
  children,
}: PageIntroProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-0 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className={cn(
        "max-w-3xl space-y-2",
        centered && "mx-auto text-center items-center"
      )}>
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
