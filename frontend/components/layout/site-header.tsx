"use client"

import { useEffect, useRef, useState } from "react"
import {
  HeartHandshake,
  ImageIcon,
  Languages,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { useTranslations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"
import {
  Navbar1,
  type MenuItem,
} from "@/components/ui/shadcnblocks-com-navbar1"

export function SiteHeader() {
  const t = useTranslations()
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  const menu: MenuItem[] = [
    { title: t.nav["/"], url: "/" },
    {
      title: t.home.featuredEyebrow,
      url: "#",
      items: [
        {
          title: t.nav["/models"],
          description: t.home.services[0].description,
          icon: <Users className="size-5 shrink-0" />,
          url: "/models",
        },
        {
          title: t.nav["/wedding"],
          description: t.home.services[1].description,
          icon: <HeartHandshake className="size-5 shrink-0" />,
          url: "/wedding",
        },
        {
          title: t.nav["/protocol-services"],
          description: t.home.services[2].description,
          icon: <ShieldCheck className="size-5 shrink-0" />,
          url: "/protocol-services",
        },
        {
          title: t.nav["/dance"],
          description: t.home.services[3].description,
          icon: <Sparkles className="size-5 shrink-0" />,
          url: "/dance",
        },
      ],
    },
    {
      title: t.common.explore,
      url: "#",
      items: [
        {
          title: t.nav["/gallery"],
          description: t.home.galleryDescription,
          icon: <ImageIcon className="size-5 shrink-0" />,
          url: "/gallery",
        },
        {
          title: t.nav["/about"],
          description: t.home.overview,
          icon: <MapPinned className="size-5 shrink-0" />,
          url: "/about",
        },
        {
          title: t.nav["/tours-travel"],
          description: t.home.services[4].description,
          icon: <Languages className="size-5 shrink-0" />,
          url: "/tours-travel",
        },
      ],
    },
    { title: t.nav["/contact"], url: "/contact" },
  ]

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY

      if (currentScrollY < 16) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      const scrollingDown = currentScrollY > lastScrollY.current
      const delta = Math.abs(currentScrollY - lastScrollY.current)

      if (delta < 8) {
        return
      }

      setIsVisible(!scrollingDown)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div
      className={cn(
        "relative z-40 transition-transform duration-500 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <Navbar1
        logo={{
          url: "/",
          src: siteConfig.logo,
          alt: `${siteConfig.name} logo`,
          title: siteConfig.name,
        }}
        menu={menu}
        mobileExtraLinks={[
          { name: t.nav["/gallery"], url: "/gallery" },
          { name: t.nav["/about"], url: "/about" },
          { name: t.nav["/tours-travel"], url: "/tours-travel" },
        ]}
        auth={{
          login: { text: t.common.contactUs, url: "/contact" },
          signup: {
            text: t.common.whatsapp,
            url: `https://wa.me/25${siteConfig.whatsapp}`,
          },
        }}
        utilitySlot={<LanguageSwitcher />}
      />
    </div>
  )
}
