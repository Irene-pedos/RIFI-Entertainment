"use client"

import * as React from "react"
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Users,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

import { useTranslations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Marquee from "@/components/ui/cards"
import { CtaCard } from "@/components/ui/cta-card"
import { Gallery4 } from "@/components/ui/gallery4"
import { HeroSection4 } from "@/components/ui/hero-section-4"
import { trpc } from "@/lib/trpc"
import { useSiteSettings } from "@/hooks/use-site-settings"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [isMounted, setIsMounted] = React.useState(false)
  const t = useTranslations()
  const { businessEmail, businessPhone, businessLocation, businessTagline, isReady } = useSiteSettings()

  React.useEffect(() => {
    setIsMounted((prev) => (prev ? prev : true))
  }, [])
  
  const { data: testimonials, isLoading: testimonialsLoading } = trpc.testimonial.listPublic.useQuery(undefined, {
    enabled: isMounted && isReady
  })
  const { data: services, isLoading: servicesLoading } = trpc.service.listPublic.useQuery(undefined, {
    enabled: isMounted && isReady
  })

  if (!isMounted) {
    return (
      <div className="flex flex-col gap-20 pb-20">
        <Skeleton className="h-[70vh] w-full" />
        <div className="container mx-auto px-4 space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
           </div>
        </div>
      </div>
    )
  }

  const testimonialCards = testimonials?.map((test) => ({
    name: test.clientName,
    handle: `@${test.clientRole?.toLowerCase().replace(/\s+/g, '.') || 'rifi.client'}`,
    quote: test.quote,
  })) || [
    {
      name: t.home.testimonials[0].author,
      handle: "@rifi.weddings",
      quote: t.home.testimonials[0].quote,
    }
  ]

  const galleryItems = [
    {
      id: "wedding-moments",
      title: t.home.galleryItems[0].title,
      description: t.home.galleryItems[0].description,
      href: "/gallery",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=60&w=1080",
    },
    {
      id: "event-experiences",
      title: t.home.galleryItems[1].title,
      description: t.home.galleryItems[1].description,
      href: "/gallery",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=60&w=1080",
    },
    {
      id: "models-performances",
      title: t.home.galleryItems[2].title,
      description: t.home.galleryItems[2].description,
      href: "/gallery",
      image:
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=60&w=1080",
    },
    {
      id: "protocol-hospitality",
      title: t.home.galleryItems[3].title,
      description: t.home.galleryItems[3].description,
      href: "/gallery",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=60&w=1080",
    },
    {
      id: "traditional-dance",
      title: t.home.galleryItems[4].title,
      description: t.home.galleryItems[4].description,
      href: "/gallery",
      image:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=60&w=1080",
    },
    {
      id: "tours-travel",
      title: t.home.galleryItems[5].title,
      description: t.home.galleryItems[5].description,
      href: "/gallery",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=60&w=1080",
    },
  ]

  const heroSlides = [
    {
      id: 1,
      title: t.home.heroTitle,
      subtitle: businessTagline,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920",
      primaryAction: { text: t.home.bookService, href: "/contact" },
      secondaryAction: { text: t.home.callUs, href: `tel:${businessPhone}` },
    },
    {
      id: 2,
      title: t.home.services[1].title,
      subtitle: t.home.services[1].description,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920",
      primaryAction: { text: t.home.exploreService, href: "/wedding" },
      secondaryAction: { text: t.common.whatsapp, href: `https://wa.me/25${businessPhone}` },
    },
    {
      id: 3,
      title: t.home.services[0].title,
      subtitle: t.home.services[0].description,
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1920",
      primaryAction: { text: t.home.exploreService, href: "/models" },
      secondaryAction: { text: t.home.callUs, href: `tel:${businessPhone}` },
    },
  ]

  return (
    <>
      <HeroSection4 slides={heroSlides} />

      {/* Trusted By Section */}
      <section className="w-full border-b border-border/60 bg-white/5 py-8 backdrop-blur-sm">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="md:border-r md:border-border/60 md:pr-10">
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-[primary]/60 md:text-end whitespace-nowrap">
                {t.home.basedIn}
              </p>
            </div>
            <div className="relative flex-1 overflow-hidden">
              <InfiniteSlider duration={40} gap={100}>
                {[
                  "KIGALI CONVENTION CENTRE",
                  "BK ARENA RWANDA",
                  "RDB RWANDA",
                  "MTN FOUNDATION",
                  "AIRTEL RWANDA",
                  "RWANDAIR",
                ].map((partner) => (
                  <span
                    key={partner}
                    className="text-[12px] font-black tracking-tight text-[#294974]/30 whitespace-nowrap transition-colors hover:text-[#294974]/60 cursor-default"
                  >
                    {partner}
                  </span>
                ))}
              </InfiniteSlider>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-[10px] font-semibold tracking-[0.32em] text-primary uppercase">
              {t.home.featuredEyebrow}
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-primary">
              {t.home.featuredTitle}
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              RiFi Entertainment combines event planning, talent coordination, hospitality support, and travel services under one professional brand.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 rounded-md bg-muted animate-pulse" />
            ))
          ) : services?.map((service) => (
            <Card
              key={service.id}
              className="group rounded-md border border-border/60 shadow-none flex flex-col transition-all hover:border-primary/30 bg-white dark:bg-card/40"
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                   <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Sparkles className="size-3.5" />
                   </div>
                   <div className="text-[8px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    {service.category}
                  </div>
                </div>
                <CardTitle className="mt-2 font-heading text-sm font-bold tracking-tight text-primary">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-0 flex-grow">
                <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                  {service.shortDescription}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-3">
                <Button
                  asChild
                  variant="link"
                  className="p-0 h-auto text-[9px] font-bold uppercase tracking-widest text-primary hover:text-secondary group-hover:translate-x-1 transition-all"
                >
                  <Link href={`/${service.slug}`} className="gap-1.5 items-center">
                    {t.home.exploreService}
                    <ArrowRight className="size-2.5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )) || t.home.services.map((service, index) => (
            <Card
              key={service.title}
              className="group rounded-md border border-border/60 shadow-none flex flex-col transition-all hover:border-primary/30 bg-white dark:bg-card/40"
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                   <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Sparkles className="size-3.5" />
                   </div>
                   <div className="text-[8px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    {t.home.serviceLabel}
                  </div>
                </div>
                <CardTitle className="mt-2 font-heading text-sm font-bold tracking-tight text-primary">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-0 flex-grow">
                <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-3">
                <Button
                  asChild
                  variant="link"
                  className="p-0 h-auto text-[9px] font-bold uppercase tracking-widest text-primary hover:text-secondary group-hover:translate-x-1 transition-all"
                >
                  <Link href={siteConfig.featuredServices[index].href} className="gap-1.5 items-center">
                    {t.home.exploreService}
                    <ArrowRight className="size-2.5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <Gallery4
          title={t.home.galleryTitle}
          description={t.home.galleryDescription}
          items={galleryItems}
        />
        <div className="mt-4">
          <Button asChild variant="outline" size="sm" className="px-5 text-[11px] uppercase tracking-wider">
            <Link href="/gallery">{t.home.openGallery}</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="border border-border/60 bg-card/40 p-6 sm:p-8">
          <div className="max-w-2xl space-y-3">
            <div className="text-[10px] font-semibold tracking-[0.32em] text-primary uppercase">
              {t.home.testimonialsEyebrow}
            </div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight flex items-center gap-3">
              <Users className="size-6 text-primary" />
              {t.home.testimonialsTitle}
            </h2>
          </div>

          <div className="mt-8">
            {testimonialsLoading ? (
              <div className="flex gap-4 overflow-hidden py-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-32 w-56 shrink-0 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <Marquee
                row1={testimonialCards.slice(0, 3)}
                row2={testimonialCards.length > 3 ? testimonialCards.slice(3) : testimonialCards}
              />
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="border border-border/60 bg-background/50 p-6 sm:p-8">
            <div className="text-[10px] font-semibold tracking-[0.32em] text-primary uppercase">
              {t.home.contactEyebrow}
            </div>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
              {t.home.contactTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-xs leading-6 text-muted-foreground">
              {t.home.contactDescription}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border border-border/60 bg-card/40 p-5 rounded-md transition-all hover:border-primary/20">
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground uppercase tracking-wider">
                  <Phone className="size-4 text-primary" />
                  {t.common.phone}
                </div>
                <a
                  href={`tel:${businessPhone}`}
                  className="mt-3 block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {businessPhone}
                </a>
              </div>
              <div className="border border-border/60 bg-card/40 p-5 rounded-md transition-all hover:border-primary/20">
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground uppercase tracking-wider">
                  <Mail className="size-4 text-primary" />
                  {t.common.email}
                </div>
                <a
                  href={`mailto:${businessEmail}`}
                  className="mt-3 block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {businessEmail}
                </a>
              </div>
              <div className="border border-border/60 bg-card/40 p-5 sm:col-span-2 lg:col-span-1 rounded-md transition-all hover:border-primary/20">
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground uppercase tracking-wider">
                  <MapPin className="size-4 text-primary" />
                  {t.common.location}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {businessLocation}
                </p>
              </div>
            </div>
          </div>

          <CtaCard
            title={t.home.ctaEyebrow}
            subtitle={t.home.ctaTitle}
            description={t.home.ctaDescription}
            buttonText={t.home.contactRifi}
            buttonHref="/contact"
            imageSrc="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
            imageAlt="RiFi Entertainment Event Celebration"
            className="border-border/60"
          />
        </div>
      </section>
    </>
  )
}
