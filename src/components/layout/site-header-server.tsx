import {
  HeartHandshake,
  ImageIcon,
  Languages,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

import { siteConfig } from "@/lib/site"
import {
  Navbar1,
  type MenuItem,
} from "@/components/ui/shadcnblocks-com-navbar1"

interface SiteHeaderServerProps {
  utilitySlot?: React.ReactNode
}

// Static menu items for server rendering
const staticMenu: MenuItem[] = [
  { title: "Home", url: "/" },
  {
    title: "Featured Services",
    url: "#",
    items: [
      {
        title: "Models",
        description: "Professional model coordination",
        icon: <Users className="size-5 shrink-0" />,
        url: "/models",
      },
      {
        title: "Wedding",
        description: "Planning and coordination",
        icon: <HeartHandshake className="size-5 shrink-0" />,
        url: "/wedding",
      },
      {
        title: "Protocol Services",
        description: "VIP assistance and hospitality",
        icon: <ShieldCheck className="size-5 shrink-0" />,
        url: "/protocol-services",
      },
      {
        title: "Dance",
        description: "Entertainment performances",
        icon: <Sparkles className="size-5 shrink-0" />,
        url: "/dance",
      },
    ],
  },
  {
    title: "Explore",
    url: "#",
    items: [
      {
        title: "Gallery",
        description: "Visual gallery",
        icon: <ImageIcon className="size-5 shrink-0" />,
        url: "/gallery",
      },
      {
        title: "About",
        description: "About us",
        icon: <MapPinned className="size-5 shrink-0" />,
        url: "/about",
      },
      {
        title: "Tours & Travel",
        description: "Travel services",
        icon: <Languages className="size-5 shrink-0" />,
        url: "/tours-travel",
      },
    ],
  },
  { title: "Contact", url: "/contact" },
]

export function SiteHeaderServer({ utilitySlot }: SiteHeaderServerProps) {
  return (
    <Navbar1
      logo={{
        url: "/",
        src: siteConfig.logo,
        alt: `${siteConfig.name} logo`,
        title: siteConfig.name,
      }}
      menu={staticMenu}
      mobileExtraLinks={[
        { name: "Gallery", url: "/gallery" },
        { name: "About", url: "/about" },
        { name: "Tours & Travel", url: "/tours-travel" },
      ]}
      auth={{
        login: { text: "Contact Us", url: "/contact" },
        signup: {
          text: "WhatsApp",
          url: `https://wa.me/25${siteConfig.whatsapp}`,
        },
      }}
      utilitySlot={utilitySlot}
    />
  )
}
