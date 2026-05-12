"use client"

import { useRef, useState } from "react"
import {
  ArrowRight,
  ClipboardCheck,
  Music,
  Sparkles,
  Utensils,
  Users,
  Mic,
  CheckCircle2,
} from "lucide-react"

import { PageIntro } from "@/components/marketing/page-intro"
import { Button } from "@/components/ui/button"
import { Gallery4 } from "@/components/ui/gallery4"
import { useTranslations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"

const weddingIcons = [ClipboardCheck, Utensils, Sparkles, Users, Music, Mic]

const serviceKeys = ["planning", "catering", "decoration", "dance", "sax", "mc"]

export default function WeddingPage() {
  const t = useTranslations()
  const { wedding } = t

  const bookingFormRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const scrollToForm = (serviceKey?: string) => {
    if (serviceKey) {
      setSelectedServices((prev) =>
        prev.includes(serviceKey) ? prev : [...prev, serviceKey]
      )
    }
    bookingFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Form submission logic would go here
  }

  const galleryItems = [
    {
      id: "1",
      title: "Elegant Reception",
      description:
        "Sophisticated decor and lighting for an unforgettable night.",
      href: "/gallery?category=wedding",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "2",
      title: "Traditional Celebration",
      description: "Authentic cultural performances and ceremonies.",
      href: "/gallery?category=wedding",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "3",
      title: "Outdoor Ceremony",
      description: "Beautiful garden settings and floral arrangements.",
      href: "/gallery?category=wedding",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "4",
      title: "Premium Catering",
      description: "Exquisite culinary presentation and service.",
      href: "/gallery?category=wedding",
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    },
  ]

  return (
    <div className="flex flex-col pb-16 lg:pb-32">
      <PageIntro
        eyebrow={wedding.eyebrow}
        title={wedding.title}
        description={wedding.description}
        className="max-w-none"
        containerClassName="max-w-[1600px] lg:pt-24 lg:pb-12"
      >
        <div className="flex flex-wrap gap-3">
          <Button
            className="h-12 px-5 text-base"
            onClick={() => scrollToForm()}
          >
            {wedding.booking.button}
            <ArrowRight className="ml-2 size-4" />
          </Button>
          <Button asChild variant="outline" className="h-12 px-5 text-base">
            <a href={`tel:${siteConfig.phone}`}>Call {siteConfig.phone}</a>
          </Button>
        </div>
      </PageIntro>

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <p className="leading-none">&nbsp;</p>
      </div>

      <div className="flex flex-col gap-12 md:gap-24 lg:gap-32">
        {/* Features List Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-primary/10 bg-primary/5 p-8 md:p-12">
            <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              RiFi Wedding Organization Features
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Wedding planning services", key: "planning" },
                { label: "Catering services", key: "catering" },
                { label: "Event decoration", key: "decoration" },
                { label: "Traditional dance entertainment", key: "dance" },
                { label: "Live saxophonist services", key: "sax" },
                { label: "MC and event coordination", key: "mc" },
                { label: "Online booking form", key: undefined },
              ].map((feature) => (
                <button
                  key={feature.label}
                  className="group flex items-center gap-3 text-left transition-colors hover:text-primary"
                  onClick={() => scrollToForm(feature.key)}
                >
                  <CheckCircle2 className="size-5 shrink-0 text-primary transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {wedding.services.map((service, index) => {
              const Icon = weddingIcons[index] || Sparkles
              const serviceKey = serviceKeys[index]
              return (
                <article
                  key={service.title}
                  className="flex flex-col border border-border/70 bg-card/90 p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-primary">
                    <Icon className="size-5" />
                    <span className="text-xs font-semibold tracking-[0.24em] uppercase">
                      Wedding Service
                    </span>
                  </div>
                  <h2 className="mt-4 font-heading text-xl font-semibold tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-grow text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                  <Button
                    variant="link"
                    className="mt-6 h-auto w-fit p-0 font-semibold text-primary"
                    onClick={() => scrollToForm(serviceKey)}
                  >
                    Book {service.title}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </article>
              )
            })}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <Gallery4
            title="Wedding Highlights"
            description="A glimpse into the celebrations we've helped create."
            items={galleryItems}
          />
        </section>

        {/* Inline Booking Form Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div
            ref={bookingFormRef}
            className="scroll-mt-24 rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12 lg:p-16"
          >
            <div className="max-w-3xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                {wedding.bookingForm.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {wedding.booking.description}
              </p>
            </div>

            {submitted ? (
              <div className="mt-10 flex flex-col items-center justify-center rounded-2xl bg-primary/5 p-12 text-center">
                <CheckCircle2 className="size-16 text-primary" />
                <p className="mt-6 text-xl font-medium text-foreground">
                  {wedding.bookingForm.success}
                </p>
                <Button
                  variant="outline"
                  className="mt-8"
                  onClick={() => {
                    setSubmitted(false)
                    setSelectedServices([])
                  }}
                >
                  Send another request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm leading-none font-medium">
                      {wedding.bookingForm.fields.coupleNames}
                    </label>
                    <input
                      required
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm leading-none font-medium">
                      {wedding.bookingForm.fields.email}
                    </label>
                    <input
                      required
                      type="email"
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm leading-none font-medium">
                      {wedding.bookingForm.fields.phone}
                    </label>
                    <input
                      required
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm leading-none font-medium">
                      {wedding.bookingForm.fields.weddingDate}
                    </label>
                    <input
                      type="date"
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm leading-none font-medium">
                      {wedding.bookingForm.fields.location}
                    </label>
                    <input className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm leading-none font-medium">
                      {wedding.bookingForm.fields.estimatedGuests}
                    </label>
                    <input
                      type="number"
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm leading-none font-medium">
                    {wedding.bookingForm.fields.requestedServices}
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(wedding.bookingForm.services).map(
                      ([key, label]) => (
                        <label
                          key={key}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                        >
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(key)}
                            onChange={() => {
                              setSelectedServices((prev) =>
                                prev.includes(key)
                                  ? prev.filter((k) => k !== key)
                                  : [...prev, key]
                              )
                            }}
                            className="size-4 rounded border-input bg-background text-primary ring-offset-background focus:ring-2 focus:ring-ring"
                          />
                          <span className="text-sm font-medium">{label}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm leading-none font-medium">
                    {wedding.bookingForm.fields.additionalDetails}
                  </label>
                  <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                </div>

                <Button type="submit" className="h-14 w-full text-lg">
                  {wedding.bookingForm.submit}
                </Button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
