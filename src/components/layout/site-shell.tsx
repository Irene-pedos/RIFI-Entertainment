"use client"

import { Suspense, type ReactNode } from "react"
import { usePathname } from "next/navigation"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { cn } from "@/lib/utils"

type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) {
    return (
      <div className="relative flex min-h-screen flex-col bg-background">
        <main className="flex-1">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
      </div>
    )
  }

  const isHome = pathname === "/"

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="fixed inset-x-0 top-0 z-50">
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
      </div>
      <main className={cn("flex-1", !isHome && "pt-28 sm:pt-32")}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Suspense fallback={null}>
        <SiteFooter />
      </Suspense>
    </div>
  )
}

