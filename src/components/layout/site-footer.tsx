"use client"

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

import { useTranslations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { Footer7 } from "@/components/ui/footer-7"
import { useSiteSettings } from "@/hooks/use-site-settings"

export function SiteFooter() {
  const t = useTranslations()
  const { businessEmail, businessPhone, businessLocation, businessInstagram } = useSiteSettings()

  const sections = [
    {
      title: t.common.explore,
      links: [
        { name: t.nav["/about"], href: "/about" },
        { name: t.nav["/models"], href: "/models" },
        { name: t.nav["/wedding"], href: "/wedding" },
        { name: t.nav["/gallery"], href: "/gallery" },
      ],
    },
    {
      title: t.home.featuredEyebrow,
      links: [
        { name: t.nav["/protocol-services"], href: "/protocol-services" },
        { name: t.nav["/dance"], href: "/dance" },
        { name: t.nav["/tours-travel"], href: "/tours-travel" },
      ],
    },
    {
      title: t.common.contact,
      links: [
        { name: businessLocation, href: "/contact" },
        { name: businessPhone, href: `tel:${businessPhone}` },
        { name: businessEmail, href: `mailto:${businessEmail}` },
      ],
    },
  ]

  const socialLinks = [
    {
      icon: <FaInstagram className="size-5" />,
      href: businessInstagram,
      label: "Instagram",
    },
    {
      icon: <FaFacebook className="size-5" />,
      href: "#",
      label: "Facebook",
    },
    {
      icon: <FaTwitter className="size-5" />,
      href: "#",
      label: "Twitter",
    },
    {
      icon: <FaLinkedin className="size-5" />,
      href: "#",
      label: "LinkedIn",
    },
  ]

  return (
    <Footer7
      logo={{
        url: "/",
        src: siteConfig.logo,
        alt: siteConfig.name,
        title: siteConfig.name,
      }}
      description={t.footer.description}
      sections={sections}
      socialLinks={socialLinks}
      copyright={`© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`}
      legalLinks={[
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ]}
    />
  )
}
