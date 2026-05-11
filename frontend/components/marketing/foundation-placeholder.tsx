import { siteConfig } from "@/lib/site"

type FoundationPlaceholderProps = {
  nextFocus: string[]
}

export function FoundationPlaceholder({
  nextFocus,
}: FoundationPlaceholderProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-border/70 bg-card/80 p-8 shadow-sm">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Foundation Complete for This Section
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            This page is scaffolded with shared navigation, metadata, spacing,
            and page structure. Full service content, galleries, forms, and
            production copy will be added in the next build phase.
          </p>
        </div>

        <div className="rounded-[2rem] border border-border/70 bg-background/90 p-8">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-foreground uppercase">
            Next Focus
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
            {nextFocus.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <div className="mt-6 border-t border-border/60 pt-6 text-sm text-muted-foreground">
            Contact baseline: {siteConfig.phone} · {siteConfig.email}
          </div>
        </div>
      </div>
    </section>
  )
}
