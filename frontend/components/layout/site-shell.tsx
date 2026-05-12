import { Suspense, type ReactNode } from "react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(177,52,31,0.14),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(23,70,52,0.1),_transparent_28%)]" />
      <div className="fixed inset-x-0 top-0 z-50">
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
      </div>
      <main className="flex-1 pt-28 sm:pt-32">
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Suspense fallback={null}>
        <SiteFooter />
      </Suspense>
    </div>
  )
}
