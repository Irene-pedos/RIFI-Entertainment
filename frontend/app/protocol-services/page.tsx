"use client"

import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Handshake,
  ShieldCheck,
  Users,
} from "lucide-react"

import { PageIntro } from "@/components/marketing/page-intro"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"

const icons = [
  Handshake,
  ClipboardCheck,
  ShieldCheck,
  Users,
  BadgeCheck,
] as const

export default function ProtocolServicesPage() {
  const t = useTranslations()

  return (
    <>
      <PageIntro
        eyebrow={t.protocol.eyebrow}
        title={t.protocol.title}
        description={t.protocol.description}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild className="px-5">
            <Link href="/contact">
              {t.protocol.bookSupport}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" className="px-5">
            <a href={`tel:${siteConfig.phone}`}>
              {t.protocol.call} {siteConfig.phone}
            </a>
          </Button>
        </div>
      </PageIntro>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {t.protocol.services.map((item, index) => {
            const Icon = icons[index]

            return (
              <article
                key={item.title}
                className="border border-border/70 bg-card/90 p-7 shadow-sm"
              >
                <div className="flex items-center gap-3 text-primary">
                  <Icon className="size-5" />
                  <span className="text-xs font-semibold tracking-[0.24em] uppercase">
                    {t.home.serviceLabel}
                  </span>
                </div>
                <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border border-border/70 bg-background/90 p-8">
            <div className="text-xs font-semibold tracking-[0.32em] text-primary uppercase">
              {t.protocol.whyTitle}
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
              {t.protocol.whySubtitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              {t.protocol.whyDescription}
            </p>
          </div>

          <div className="border border-border/70 bg-card/85 p-8 shadow-sm">
            <div className="text-xs font-semibold tracking-[0.32em] text-primary uppercase">
              {t.protocol.bestFitTitle}
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
              {t.protocol.bestFitItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="border border-border/70 bg-card/85 p-8 shadow-sm sm:p-10">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-semibold tracking-[0.32em] text-primary uppercase">
              {t.protocol.howWeWorkTitle}
            </div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              {t.protocol.howWeWorkSubtitle}
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {t.protocol.processItems.map((item, index) => (
              <article
                key={item}
                className="border border-border/70 bg-background/80 p-6"
              >
                <div className="text-sm font-semibold text-primary">
                  0{index + 1}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-6 border border-border/70 bg-primary p-8 text-primary-foreground shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.32em] text-primary-foreground/80 uppercase">
              {t.protocol.contactEyebrow}
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
              {t.protocol.contactTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-primary-foreground/80">
              {t.protocol.contactDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="secondary"
              className="px-5 text-secondary-foreground"
            >
              <Link href="/contact">{t.protocol.requestService}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary-foreground/20 bg-transparent px-5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a
                href={`https://wa.me/25${siteConfig.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                {t.protocol.whatsappUs}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
