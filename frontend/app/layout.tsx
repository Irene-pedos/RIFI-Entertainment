import type { Metadata } from "next"
import { Geist_Mono, Inter, Noto_Sans } from "next/font/google"
import { Suspense } from "react"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteShell } from "@/components/layout/site-shell"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" })

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "RiFi Entertainment",
    "Kigali events",
    "wedding organization Rwanda",
    "model management Kigali",
    "dance entertainment Rwanda",
    "tours and travel Kigali",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        fontMono.variable,
        "font-sans",
        notoSans.variable,
        interHeading.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Suspense fallback={null}>
            <SiteShell>{children}</SiteShell>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
