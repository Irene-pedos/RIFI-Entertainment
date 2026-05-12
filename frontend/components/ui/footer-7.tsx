"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

interface Footer7Props {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  sections?: Array<{
    title: string
    links: Array<{ name: string; href: string }>
  }>
  description?: string
  socialLinks?: Array<{
    icon: React.ReactElement
    href: string
    label: string
  }>
  copyright?: string
  legalLinks?: Array<{
    name: string
    href: string
  }>
}

export const Footer7 = ({
  logo,
  sections = [],
  description,
  socialLinks = [],
  copyright,
  legalLinks = [],
}: Footer7Props) => {
  return (
    <footer className="border-t border-border/70 bg-card py-20 lg:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            {logo && (
              <div className="flex items-center gap-4 lg:justify-start">
                <Link href={logo.url} className="flex items-center gap-4">
                  <div className="overflow-hidden border border-border/70 bg-background">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    {logo.title}
                  </h2>
                </Link>
              </div>
            )}
            {description && (
              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                {description}
              </p>
            )}
            {socialLinks.length > 0 && (
              <ul className="flex items-center space-x-6 text-muted-foreground">
                {socialLinks.map((social, idx) => (
                  <li key={idx} className="transition-colors hover:text-primary">
                    <a
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid w-full gap-10 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-6 text-sm font-semibold tracking-[0.2em] text-foreground uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="transition-colors hover:text-primary"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-border/70 pt-10 text-xs font-medium text-muted-foreground md:flex-row md:items-center">
          <p className="order-2 md:order-1">{copyright}</p>
          {legalLinks.length > 0 && (
            <ul className="order-1 flex flex-col gap-4 md:order-2 md:flex-row md:gap-8">
              {legalLinks.map((link, idx) => (
                <li key={idx} className="transition-colors hover:text-primary">
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
