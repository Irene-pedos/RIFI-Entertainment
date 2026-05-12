"use client"

import {
  ArrowRight,
  Briefcase,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react"
import Link from "next/link"

import { useTranslations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { Button } from "@/components/ui/button"
import Marquee from "@/components/ui/cards"
import { CtaCard } from "@/components/ui/cta-card"
import { Gallery4 } from "@/components/ui/gallery4"
import HeroSection from "@/components/ui/hero-section-9"

export default function HomePage() {
  const t = useTranslations()
  const testimonialCards = [
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
      name: t.home.testimonials[0].author,
      handle: "@rifi.weddings",
      quote: t.home.testimonials[0].quote,
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60",
      name: t.home.testimonials[1].author,
      handle: "@rifi.events",
      quote: t.home.testimonials[1].quote,
    },
    {
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=60",
      name: t.home.testimonials[2].author,
      handle: "@rifi.entertainment",
      quote: t.home.testimonials[2].quote,
    },
    {
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=60",
      name: t.home.testimonials[0].author,
      handle: "@rifi.protocol",
      quote: t.home.testimonials[0].quote,
    },
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

  return (
    <>
      <HeroSection
        className="-mt-20 pt-20"
        title={t.home.heroTitle}
        subtitle={t.home.tagline}
        videoSrc="https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-2408-large.mp4"
        actions={[
          {
            text: t.home.bookService,
            href: "/contact",
            variant: "default",
          },
          {
            text: t.home.callUs,
            href: `tel:${siteConfig.phone}`,
            variant: "outline",
          },
        ]}
        stats={[
          {
            value: "100+",
            label: "Events",
            icon: <Calendar className="h-4 w-4 text-primary" />,
          },
          {
            value: "50+",
            label: "Models",
            icon: <Users className="h-4 w-4 text-primary" />,
          },
          {
            value: "24/7",
            label: "Service",
            icon: <Briefcase className="h-4 w-4 text-primary" />,
          },
        ]}
        images={[
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=60&w=1080",
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=60&w=1080",
          "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=60&w=1080",
        ]}
      />

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-semibold tracking-[0.32em] text-primary uppercase">
              {t.home.featuredEyebrow}
            </div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              {t.home.featuredTitle}
            </h2>
            <p className="text-base leading-8 text-muted-foreground">
              {t.home.featuredDescription}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {t.home.services.map((service, index) => (
            <article
              key={service.title}
              className="border border-border/70 bg-card/85 p-7 shadow-sm"
            >
              <div className="text-xs font-semibold tracking-[0.24em] text-primary uppercase">
                {t.home.serviceLabel}
              </div>
              <h3 className="mt-4 font-heading text-2xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {service.description}
              </p>
              <Button
                asChild
                variant="ghost"
                className="mt-5 px-0 text-primary hover:bg-transparent"
              >
                <Link href={siteConfig.featuredServices[index].href}>
                  {t.home.exploreService}
                  <ArrowRight />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="rounded-3xl border border-border/70 bg-card/85 p-8 text-center shadow-sm">
          <p className="text-xs font-semibold tracking-[0.32em] text-primary uppercase">
            {t.home.toursEyebrow}
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
            {t.home.toursTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            {t.home.toursDescription}
          </p>
          <Button asChild variant="outline" className="mt-8 px-6">
            <Link href="/tours-travel">{t.home.openToursButton}</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <Gallery4
          title={t.home.galleryTitle}
          description={t.home.galleryDescription}
          items={galleryItems}
        />
        <div className="mt-6">
          <Button asChild variant="outline" className="px-5">
            <Link href="/gallery">{t.home.openGallery}</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="border border-border/70 bg-card/85 p-8 shadow-sm sm:p-10">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-semibold tracking-[0.32em] text-primary uppercase">
              {t.home.testimonialsEyebrow}
            </div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              {t.home.testimonialsTitle}
            </h2>
          </div>

          <div className="mt-8">
            <Marquee
              row1={testimonialCards.slice(0, 3)}
              row2={testimonialCards.slice(1)}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="flex flex-col gap-10">
          <div className="border border-border/70 bg-background/90 p-8">
            <div className="text-xs font-semibold tracking-[0.32em] text-primary uppercase">
              {t.home.contactEyebrow}
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
              {t.home.contactTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              {t.home.contactDescription}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border border-border/70 bg-card/85 p-5">
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <Phone className="size-4 text-primary" />
                  {t.common.phone}
                </div>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="mt-3 block text-sm leading-7 text-muted-foreground hover:text-foreground"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="border border-border/70 bg-card/85 p-5">
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <Mail className="size-4 text-primary" />
                  {t.common.email}
                </div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-3 block text-sm leading-7 text-muted-foreground hover:text-foreground"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="border border-border/70 bg-card/85 p-5 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <MapPin className="size-4 text-primary" />
                  {t.common.location}
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {siteConfig.location}
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
          />
        </div>
      </section>
    </>
  )
}
