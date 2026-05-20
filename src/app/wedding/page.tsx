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
            className="rounded-md h-10 px-6 text-[11px] font-bold uppercase tracking-widest bg-[#2D4873] hover:bg-[#2D4873]/90"
            onClick={() => scrollToForm()}
          >
            {wedding.booking.button}
            <ArrowRight className="ml-2 size-3" />
          </Button>
          <Button asChild variant="outline" className="rounded-md h-10 px-6 text-[11px] font-bold uppercase tracking-widest border-[#2D4873]/20 text-[#2D4873]">
            <a href={`tel:${siteConfig.phone}`}>Call {siteConfig.phone}</a>
          </Button>
        </div>
      </PageIntro>

      <div className="flex flex-col gap-12 md:gap-20 lg:gap-24">
        {/* Organization Features Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-[#2D4873]/10 bg-[#2D4873]/5 p-6 md:p-10">
            <h2 className="font-heading text-lg font-bold tracking-tight text-[#2D4873]">
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
                  className="group flex items-center gap-3 text-left transition-colors hover:text-[#2D4873] rounded-md outline-none focus-visible:ring-1 focus-visible:ring-[#2D4873]/30"
                  onClick={() => scrollToForm(feature.key)}
                >
                  <CheckCircle2 className="size-4 shrink-0 text-[#d68c90] transition-transform group-hover:scale-110" />
                  <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-[#2D4873] transition-colors uppercase tracking-tight">{feature.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Row Section */}
        <section className="mx-auto w-full max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {wedding.services.map((service, index) => {
              const Icon = weddingIcons[index] || Sparkles
              const serviceKey = serviceKeys[index]
              return (
                <article
                  key={service.title}
                  className="flex flex-col sm:flex-row gap-6 border-b border-border/60 pb-6 last:border-0 group"
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-md bg-[#d68c90]/10 flex items-center justify-center group-hover:bg-[#d68c90]/20 transition-colors">
                      <Icon className="size-6 text-[#d68c90]" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-grow">
                    <h2 className="font-heading text-lg font-bold tracking-tight text-[#2D4873]">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center sm:justify-end">
                    <Button
                      variant="outline"
                      className="h-10 px-6 text-[10px] font-bold uppercase tracking-widest border-[#2D4873]/20 text-[#2D4873] hover:bg-[#2D4873]/5"
                      onClick={() => scrollToForm(serviceKey)}
                    >
                      Book Now
                    </Button>
                  </div>
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

        {/* Booking Form Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div
            ref={bookingFormRef}
            className="scroll-mt-24 border border-border/60 bg-white/60 p-6 md:p-10 lg:p-16 rounded-md shadow-sm backdrop-blur-md"
          >
            <div className="grid gap-12 lg:grid-cols-5 items-start">
              <div className="lg:col-span-2 lg:sticky lg:top-32">
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2D4873] leading-tight">
                  {wedding.bookingForm.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:max-w-md">
                  {wedding.booking.description}
                </p>
                
                <div className="mt-8 hidden lg:block space-y-4">
                  <div className="flex items-center gap-3 text-[#d68c90]">
                    <BadgeCheck className="size-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2D4873]/80">Premium Organization</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#d68c90]">
                    <BadgeCheck className="size-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2D4873]/80">Full Customization</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center border border-dashed border-[#d68c90]/30 bg-[#d68c90]/5 p-10 text-center rounded-md h-full">
                    <CheckCircle2 className="size-12 text-[#d68c90]" />
                    <p className="mt-4 text-sm font-bold text-[#2D4873]">
                      {wedding.bookingForm.success}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 rounded-md h-9 text-[10px] font-bold uppercase tracking-widest border-[#2D4873]/20"
                      onClick={() => {
                        setSubmitted(false)
                        setSelectedServices([])
                      }}
                    >
                      Send another request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="coupleNames" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">
                          {wedding.bookingForm.fields.coupleNames}
                        </Label>
                        <Input
                          id="coupleNames"
                          name="coupleNames"
                          placeholder="Name of the couple"
                          required
                          className="rounded-md h-10 border-border/60 bg-white/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">
                          {wedding.bookingForm.fields.email}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="email@example.com"
                          required
                          className="rounded-md h-10 border-border/60 bg-white/50"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">
                          {wedding.bookingForm.fields.phone}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+250..."
                          required
                          className="rounded-md h-10 border-border/60 bg-white/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weddingDate" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">
                          {wedding.bookingForm.fields.weddingDate}
                        </Label>
                        <Input
                          id="weddingDate"
                          name="weddingDate"
                          type="date"
                          className="rounded-md h-10 border-border/60 bg-white/50"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">
                          {wedding.bookingForm.fields.location}
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="Event location"
                          className="rounded-md h-10 border-border/60 bg-white/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estimatedGuests" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">
                          {wedding.bookingForm.fields.estimatedGuests}
                        </Label>
                        <Input
                          id="estimatedGuests"
                          name="estimatedGuests"
                          type="number"
                          placeholder="e.g. 200"
                          className="rounded-md h-10 border-border/60 bg-white/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">
                        {wedding.bookingForm.fields.requestedServices}
                      </Label>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(wedding.bookingForm.services).map(
                          ([key, label]) => (
                            <label
                              key={key}
                              className={cn(
                                "flex cursor-pointer items-center gap-3 border p-2.5 transition-all rounded-lg",
                                selectedServices.includes(key) 
                                  ? "border-[#2D4873] bg-[#2D4873]/5 text-[#2D4873]" 
                                  : "border-border/60 hover:bg-muted/30 text-muted-foreground"
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
                                className="size-3.5 border-input bg-background text-[#2D4873] focus:ring-1 focus:ring-[#2D4873] rounded-sm"
                              />
                              <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalDetails" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">
                        {wedding.bookingForm.fields.additionalDetails}
                      </Label>
                      <Textarea 
                        id="additionalDetails"
                        name="additionalDetails"
                        placeholder="Tell us about your special day..."
                        className="rounded-md min-h-[120px] border-border/60 bg-white/50" 
                      />
                    </div>

                    {mutation.error && (
                      <div className="flex items-center gap-2 p-3 border border-red-200 bg-red-50 text-red-600 rounded-md">
                        <AlertCircle className="size-4" />
                        <p className="text-[10px] font-bold uppercase tracking-tight">{mutation.error.message}</p>
                      </div>
                    )}

                    <Button type="submit" className="w-full h-12 text-[11px] rounded-md tracking-[0.2em] uppercase font-bold bg-[#2D4873] hover:bg-[#2D4873]/90 shadow-sm" disabled={mutation.isPending}>
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
