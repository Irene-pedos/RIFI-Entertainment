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
import { ProtocolBookingForm } from "@/components/marketing/protocol-booking-form"
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
          <Button asChild className="rounded-md h-10 px-6 text-[11px] font-bold uppercase tracking-widest bg-[#2D4873] hover:bg-[#2D4873]/90">
            <Link href="/contact" className="flex items-center gap-2">
              {t.protocol.bookSupport}
              <ArrowRight className="size-3" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-md h-10 px-6 text-[11px] font-bold uppercase tracking-widest border-[#2D4873]/20 text-[#2D4873]">
            <a href={`tel:${siteConfig.phone}`}>
              {t.protocol.call} {siteConfig.phone}
            </a>
          </Button>
        </div>
      </PageIntro>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.protocol.services.map((item, index) => {
            const Icon = icons[index] || BadgeCheck

            return (
              <article
                key={item.title}
                className="group border border-border/60 bg-card/40 p-6 shadow-sm transition-all hover:border-[#2D4873]/30 rounded-md"
              >
                <div className="flex items-center gap-3 text-[#d68c90]">
                  <div className="h-8 w-8 rounded-lg bg-[#d68c90]/5 flex items-center justify-center group-hover:bg-[#d68c90]/10 transition-colors">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    {t.home.serviceLabel}
                  </span>
                </div>
                <h2 className="mt-4 font-heading text-base font-bold tracking-tight text-[#2D4873]">
                  {item.title}
                </h2>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border border-border/60 bg-white/50 p-8 rounded-md shadow-sm backdrop-blur-sm">
            <div className="text-[10px] font-bold tracking-[0.32em] text-primary uppercase">
              {t.protocol.whyTitle}
            </div>
            <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-[#2D4873]">
              {t.protocol.whySubtitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              {t.protocol.whyDescription}
            </p>
          </div>

          <div className="border border-border/60 bg-card/40 p-8 shadow-sm rounded-md backdrop-blur-sm">
            <div className="text-[10px] font-bold tracking-[0.32em] text-primary uppercase">
              {t.protocol.bestFitTitle}
            </div>
            <ul className="mt-6 space-y-3">
              {t.protocol.bestFitItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-xs font-medium text-muted-foreground uppercase tracking-tight">
                  <BadgeCheck className="size-4 text-[#d68c90]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="border border-border/60 bg-card/40 p-8 shadow-sm sm:p-10 rounded-md backdrop-blur-sm">
          <div className="max-w-2xl space-y-3">
            <div className="text-[10px] font-bold tracking-[0.32em] text-primary uppercase">
              {t.protocol.howWeWorkTitle}
            </div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#2D4873]">
              {t.protocol.howWeWorkSubtitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.protocol.processItems.map((item, index) => (
              <article
                key={item}
                className="border border-border/60 bg-white/50 p-6 rounded-md transition-all hover:border-primary/20 shadow-sm"
              >
                <div className="text-xs font-black text-primary opacity-30 tracking-tighter">
                  STEP 0{index + 1}
                </div>
                <p className="mt-4 text-xs font-medium leading-relaxed text-muted-foreground uppercase tracking-tight">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <ProtocolBookingForm />
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-6 border border-border/60 bg-[#2D4873] p-8 text-white  rounded-md lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-[10px] font-bold tracking-[0.32em] text-white/60 uppercase">
              {t.protocol.contactEyebrow}
            </div>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight leading-tight">
              {t.protocol.contactTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
              {t.protocol.contactDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="h-11 rounded-md bg-white px-8 text-[11px] font-bold uppercase tracking-widest text-[#2D4873] hover:bg-white/90 "
            >
              <Link href="/contact">{t.protocol.requestService}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-md border-white/20 bg-white/5 px-8 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
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
