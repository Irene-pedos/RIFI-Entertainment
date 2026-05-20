"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown, Languages } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useCurrentLanguage } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ isDark }: { isDark?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeLanguageCode = useCurrentLanguage()

  const selectedLanguage = useMemo(() => {
    return siteConfig.languages.find(
      (language) => language.code === activeLanguageCode
    )!
  }, [activeLanguageCode])

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onEscape)

    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onEscape)
    }
  }, [])

  function onLanguageChange(languageCode: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", languageCode)
    setOpen(false)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div ref={containerRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "gap-2 px-3 text-[11px] tracking-[0.22em] uppercase font-bold transition-colors",
          isDark 
            ? "text-white hover:bg-white/10 hover:text-white" 
            : "text-[#2D4873] hover:text-[#D9515F] hover:bg-[#D9515F]/5"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Languages className="size-3.5" />
        {selectedLanguage.label}
        <ChevronDown
          className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {open ? (
        <div className="absolute right-0 z-20 mt-2 min-w-32 border border-border/80 bg-white p-2 rounded-md shadow-xl">
          {siteConfig.languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => onLanguageChange(language.code)}
              className="flex w-full px-3 py-2 text-left text-[10px] font-bold tracking-[0.18em] text-[#2D4873]/60 uppercase transition-colors hover:bg-muted hover:text-[#2D4873]"
              suppressHydrationWarning
            >
              {language.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
