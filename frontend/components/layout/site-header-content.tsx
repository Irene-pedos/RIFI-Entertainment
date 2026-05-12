"use client"

import {
  Camera,
  HeartHandshake,
  ImageIcon,
  Languages,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

import { useTranslations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import type { MenuItem } from "@/components/ui/shadcnblocks-com-navbar1"
import { Navbar1 } from "@/components/ui/shadcnblocks-com-navbar1"

interface SiteHeaderContentProps {
  children?: React.ReactNode
}

export function SiteHeaderContent({ children }: SiteHeaderContentProps) {
  const t = useTranslations()

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
          title: t.nav["/testimonials"],
          description: t.home.testimonialsTitle,
          icon: <Camera className="size-5 shrink-0" />,
          url: "/testimonials",
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

  return (
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
        { name: t.nav["/testimonials"], url: "/testimonials" },
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
      utilitySlot={children}
    />
  )
}
