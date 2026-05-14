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
  BadgeCheck,
  AlertCircle,
} from "lucide-react"

import { PageIntro } from "@/components/marketing/page-intro"
import { Button } from "@/components/ui/button"
import { Gallery4 } from "@/components/ui/gallery4"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { trpc } from "@/lib/trpc"
import { cn } from "@/lib/utils"

const weddingIcons = [ClipboardCheck, Utensils, Sparkles, Users, Music, Mic]
const serviceKeys = ["planning", "catering", "decoration", "dance", "sax", "mc"]

export default function WeddingPage() {
  const t = useTranslations()
  const { wedding } = t

  const bookingFormRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const mutation = trpc.booking.create.useMutation({
    onSuccess: () => setSubmitted(true),
  })

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    mutation.mutate({
      clientName: formData.get("coupleNames") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      serviceType: "WEDDING",
      eventDate: formData.get("weddingDate") as string,
      location: formData.get("location") as string,
      guestCount: Number(formData.get("estimatedGuests")),
      message: `Services: ${selectedServices.join(", ")}. Details: ${formData.get("additionalDetails")}`,
      sourcePage: "wedding",
    })
  }

  const galleryItems = [
    {
      id: "1",
      title: "Elegant Reception",
      description: "Sophisticated decor and lighting for an unforgettable night.",
      href: "/gallery?category=wedding",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "2",
      title: "Traditional Celebration",
      description: "Authentic cultural performances and ceremonies.",
      href: "/gallery?category=wedding",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "3",
      title: "Outdoor Ceremony",
      description: "Beautiful garden settings and floral arrangements.",
      href: "/gallery?category=wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "4",
      title: "Premium Catering",
      description: "Exquisite culinary presentation and service.",
      href: "/gallery?category=wedding",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    },
  ]

  return (
    <div className="flex flex-col pb-16 lg:pb-32">
      <PageIntro
        eyebrow={wedding.eyebrow}
        title={wedding.title}
        description={wedding.description}
        className="max-w-none"
        containerClassName="max-w-[1600px] pt-12 pb-6 md:pt-16 md:pb-8 mb-4 md:mb-6"
      >
        <div className="flex flex-wrap gap-3">
          <Button
            className="rounded-none h-10 px-6 text-sm"
            onClick={() => scrollToForm()}
          >
            {wedding.booking.button}
            <ArrowRight className="ml-2 size-4" />
          </Button>
          <Button asChild variant="outline" className="rounded-none h-10 px-6 text-sm">
            <a href={`tel:${siteConfig.phone}`}>Call {siteConfig.phone}</a>
          </Button>
        </div>
      </PageIntro>

      <div className="flex flex-col gap-12 md:gap-20 lg:gap-24">
        {/* Organization Features Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-none border border-primary/10 bg-primary/5 p-6 md:p-10">
            <h2 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
              RiFi Wedding Organization Features
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  className="group flex items-center gap-3 text-left transition-colors hover:text-primary rounded-none outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
                  onClick={() => scrollToForm(feature.key)}
                >
                  <CheckCircle2 className="size-4 shrink-0 text-primary transition-transform group-hover:scale-110" />
                  <span className="text-xs font-medium">{feature.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wedding.services.map((service, index) => {
              const Icon = weddingIcons[index] || Sparkles
              const serviceKey = serviceKeys[index]
              return (
                <article
                  key={service.title}
                  className="flex flex-col border border-border/70 bg-card/50 p-6 shadow-sm transition-all hover:border-primary/50 rounded-none"
                >
                  <div className="flex items-center gap-3 text-primary">
                    <Icon className="size-4" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase">
                      Wedding Service
                    </span>
                  </div>
                  <h2 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-grow text-xs leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <Button
                    variant="link"
                    className="mt-6 h-auto w-fit p-0 text-[10px] font-bold uppercase tracking-widest text-primary hover:no-underline"
                    onClick={() => scrollToForm(serviceKey)}
                  >
                    Book Now
                    <ArrowRight className="ml-2 size-3" />
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

        {/* Booking Form Section - Landscape/Portrait Responsive */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div
            ref={bookingFormRef}
            className="scroll-mt-24 border border-border bg-card p-6 md:p-10 lg:p-16 rounded-none shadow-sm"
          >
            <div className="grid gap-12 lg:grid-cols-5 items-start">
              <div className="lg:col-span-2 lg:sticky lg:top-32">
                <h2 className="font-heading text-2xl font-semibold tracking-tight lg:text-4xl">
                  {wedding.bookingForm.title}
                </h2>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm lg:max-w-md">
                  {wedding.booking.description}
                </p>
                
                <div className="mt-8 hidden lg:block space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <BadgeCheck className="size-4" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Premium Organization</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary">
                    <BadgeCheck className="size-4" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Full Customization</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center border border-emerald-200 bg-emerald-50/50 p-10 text-center rounded-none h-full">
                    <CheckCircle2 className="size-12 text-emerald-600" />
                    <p className="mt-4 text-sm font-medium text-emerald-900">
                      {wedding.bookingForm.success}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 rounded-none h-9 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                      onClick={() => {
                        setSubmitted(false)
                        setSelectedServices([])
                      }}
                    >
                      Send another request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="coupleNames" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          {wedding.bookingForm.fields.coupleNames}
                        </Label>
                        <Input
                          id="coupleNames"
                          name="coupleNames"
                          placeholder="Name of the couple"
                          required
                          className="rounded-none h-9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          {wedding.bookingForm.fields.email}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="email@example.com"
                          required
                          className="rounded-none h-9"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          {wedding.bookingForm.fields.phone}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+250..."
                          required
                          className="rounded-none h-9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weddingDate" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          {wedding.bookingForm.fields.weddingDate}
                        </Label>
                        <Input
                          id="weddingDate"
                          name="weddingDate"
                          type="date"
                          className="rounded-none h-9"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          {wedding.bookingForm.fields.location}
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="Event location"
                          className="rounded-none h-9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estimatedGuests" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          {wedding.bookingForm.fields.estimatedGuests}
                        </Label>
                        <Input
                          id="estimatedGuests"
                          name="estimatedGuests"
                          type="number"
                          placeholder="e.g. 200"
                          className="rounded-none h-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                        {wedding.bookingForm.fields.requestedServices}
                      </Label>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(wedding.bookingForm.services).map(
                          ([key, label]) => (
                            <label
                              key={key}
                              className={cn(
                                "flex cursor-pointer items-center gap-3 border p-3 transition-colors rounded-none",
                                selectedServices.includes(key) 
                                  ? "border-primary bg-primary/5 text-primary" 
                                  : "border-border/70 hover:bg-muted/30 text-muted-foreground"
                              )}
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
                                className="size-3.5 border-input bg-background text-primary focus:ring-1 focus:ring-primary rounded-none"
                              />
                              <span className="text-[10px] font-medium uppercase tracking-tight">{label}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalDetails" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                        {wedding.bookingForm.fields.additionalDetails}
                      </Label>
                      <Textarea 
                        id="additionalDetails"
                        name="additionalDetails"
                        placeholder="Tell us about your special day..."
                        className="rounded-none min-h-[100px]" 
                      />
                    </div>

                    {mutation.error && (
                      <div className="flex items-center gap-2 p-3 border border-red-200 bg-red-50 text-red-600 rounded-none">
                        <AlertCircle className="size-4" />
                        <p className="text-xs font-medium">{mutation.error.message}</p>
                      </div>
                    )}

                    <Button type="submit" className="w-full h-11 text-sm rounded-none tracking-widest uppercase font-semibold" disabled={mutation.isPending}>
                      {mutation.isPending ? "Sending..." : wedding.bookingForm.submit}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
