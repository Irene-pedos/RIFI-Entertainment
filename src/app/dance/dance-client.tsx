"use client"

import { useState, type FormEvent, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Star, Calendar, Users, Music, ChevronRight, ChevronLeft, CheckCircle2, BadgeCheck, Zap, ArrowRight } from "lucide-react"

import { useTranslations } from "@/lib/i18n"
import { Gallery4 } from "@/components/ui/gallery4"
import { PageIntro } from "@/components/marketing/page-intro"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/lib/trpc"
import { siteConfig } from "@/lib/site"
import { Skeleton } from "@/components/ui/skeleton"
import { useSiteSettings } from "@/hooks/use-site-settings"

const galleryImages = [
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=60&w=1080",
  "https://images.unsplash.com/photo-1504609773096-104ff2e818cf?auto=format&fit=crop&q=60&w=1080",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&q=60&w=1080",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=60&w=1080",
]

export default function DanceClient() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted((prev) => (prev ? prev : true))
  }, [])

  if (!isMounted) {
    return (
      <div className="flex flex-col gap-20 pb-20 pt-12">
        <div className="container mx-auto px-4 space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-96 rounded-md" />
          <Skeleton className="h-96 rounded-md" />
        </div>
      </div>
    )
  }

  return <DanceContentInternal />
}

function DanceContentInternal() {
  const t = useTranslations()
  const { isReady } = useSiteSettings()
  const bookingFormRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<{
    name: string
    email: string
    date: string
    style: string
    guests: string
    message: string
    phone: string
  }>({
    name: "",
    email: "",
    date: "",
    style: t.dance.danceTypes[0].title,
    guests: "",
    message: "",
    phone: "",
  })

  const mutation = trpc.booking.create.useMutation({
    onSuccess: () => setStep(3),
  })

  const scrollToForm = (style?: string) => {
    if (style) {
      setFormData((prev) => ({ ...prev, style }))
    }
    bookingFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate({
      serviceType: "DANCE",
      clientName: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      eventDate: formData.date,
      message: `Style: ${formData.style}\nGuests: ${formData.guests}\nMessage: ${formData.message}`,
      sourcePage: "dance",
    })
  }

  const resetForm = () => {
    setStep(1)
    mutation.reset()
    setFormData({
      name: "",
      email: "",
      date: "",
      style: t.dance.danceTypes[0].title,
      guests: "",
      message: "",
      phone: "",
    })
  }

  const galleryItems = t.dance.galleryItems.map((item, index) => ({
    id: `dance-gallery-${index}`,
    ...item,
    href: "/gallery",
    image: galleryImages[index] ?? galleryImages[0],
  }))

  if (!isReady) {
    return (
      <div className="flex flex-col gap-20 pb-20 pt-12">
        <div className="container mx-auto px-4 space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-96 rounded-md" />
          <Skeleton className="h-96 rounded-md" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col pb-12 lg:pb-20">
      <PageIntro
        eyebrow={t.dance.eyebrow}
        title={t.dance.title}
        description={t.dance.description}
        className="max-w-none"
        containerClassName="max-w-[1600px] pt-12 pb-6 md:pt-16 md:pb-8 mb-4 md:mb-6"
      >
        <div className="flex flex-wrap gap-4 pt-4">
          <Button 
            className="rounded-md h-10 px-6 text-[11px] font-bold uppercase tracking-widest bg-primary hover:bg-primary/90"
            onClick={() => scrollToForm()}
          >
            {t.dance.ctaButton}
            <ArrowRight className="ml-2 size-3" />
          </Button>
          <Button asChild variant="outline" className="rounded-md h-10 px-6 text-[11px] font-bold uppercase tracking-widest border-primary/20 text-primary">
            <a href={`tel:${siteConfig.phone}`}>Call {siteConfig.phone}</a>
          </Button>
        </div>
      </PageIntro>

      <div className="flex flex-col gap-10 md:gap-16">
        {/* Dance Styles Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-primary/10 bg-primary/5 p-6 md:p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="font-heading text-lg font-bold tracking-tight text-primary uppercase tracking-[0.1em]">
                {t.dance.danceStylesHeading}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.dance.danceStylesText}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {t.dance.danceTypes.map((type, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-md border border-border/60 bg-white/80 p-6 lg:p-8 shadow-sm transition-all hover:border-primary/30"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-[#d68c90]/10 flex items-center justify-center group-hover:bg-[#d68c90]/20 transition-colors">
                      {type.icon === "Zap" ? (
                        <Zap className="size-6 text-[#d68c90]" />
                      ) : (
                        <Music className="size-6 text-[#d68c90]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold tracking-tight text-primary mb-2">
                        {type.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                        {type.description}
                      </p>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {type.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-[10px] font-bold uppercase tracking-tight text-muted-foreground/80">
                            <CheckCircle2 className="mr-2 size-3 text-[#d68c90]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Row Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center md:text-left">
            <h2 className="font-heading text-lg font-bold tracking-tight text-primary uppercase tracking-[0.1em]">
              {t.dance.servicesHeading}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.dance.servicesText}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {t.dance.services.map((service, index) => (
              <article
                key={index}
                className="flex flex-col sm:flex-row gap-6 border border-border/60 p-6 rounded-md group bg-white/40"
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-md bg-[#d68c90]/10 flex items-center justify-center group-hover:bg-[#d68c90]/20 transition-colors">
                     <Sparkles className="size-6 text-[#d68c90]" />
                  </div>
                </div>
                <div className="flex flex-col flex-grow justify-center">
                  <h3 className="font-heading text-lg font-bold tracking-tight text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-[10px] font-bold uppercase tracking-tight text-primary/70">
                        <CheckCircle2 className="mr-2 size-3 text-[#d68c90]" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="h-9 px-6 text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary hover:bg-primary/5"
                      onClick={() => scrollToForm()}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Guidelines Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-border/60 bg-white/40 p-6 md:p-8">
            <div className="mb-8 text-center md:text-left">
              <h2 className="font-heading text-lg font-bold tracking-tight text-primary uppercase tracking-[0.1em]">
                {t.dance.guidelinesHeading}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.dance.guidelinesText}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {t.dance.guidelines.map((guide, index) => (
                <article
                  key={index}
                  className="flex flex-col gap-4"
                >
                  <h3 className="font-heading text-xs font-bold tracking-[0.15em] uppercase text-primary border-l-2 border-[#d68c90] pl-4">
                    {guide.title}
                  </h3>
                  <ul className="grid gap-3">
                    {guide.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground leading-relaxed">
                        <BadgeCheck className="mr-3 mt-0.5 text-[#d68c90] size-4 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <Gallery4
            title={t.dance.galleryTitle}
            description={t.dance.galleryDescription}
            items={galleryItems}
          />
        </section>

        {/* Booking Form Section */}
        <section ref={bookingFormRef} className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="overflow-hidden border border-border/60 bg-white/60 p-6 md:p-10 lg:p-16 rounded-md shadow-sm backdrop-blur-md">
            <div className="grid gap-12 lg:grid-cols-5 items-start">
              <div className="lg:col-span-2 lg:sticky lg:top-32">
                <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#d68c90] mb-4">
                  {t.dance.bookingHeading}
                </div>
                <h2 className="font-heading text-4xl font-bold tracking-tight text-primary mb-6 leading-tight">
                  {t.dance.bookingTitle}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground mb-10 max-w-md">
                  {t.dance.bookingDescription}
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/10 bg-white shadow-sm">
                      <Star className="h-5 w-5 text-[#d68c90]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm uppercase tracking-tight">Professional Energy</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">Dynamic performances that captivate every audience with authentic energy.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/10 bg-white shadow-sm">
                      <CheckCircle2 className="h-5 w-5 text-[#d68c90]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm uppercase tracking-tight">Customized Shows</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">Tailored choreography to match your event&apos;s unique theme and requirements.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 relative min-h-[500px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-black">1</div>
                        <h3 className="text-lg font-bold tracking-tight text-primary uppercase tracking-widest">Event Details</h3>
                      </div>

                      <div className="grid gap-6">
                        <div className="grid gap-2">
                          <label htmlFor="style" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                            <Music className="h-3 w-3" />
                            {t.dance.bookingForm.styleLabel}
                          </label>
                          <select
                            id="style"
                            value={formData.style}
                            onChange={handleInputChange}
                            className="flex h-12 w-full rounded-md border border-border/60 bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-wider outline-none focus:border-primary transition-all appearance-none"
                          >
                            {t.dance.danceTypes.map((type) => (
                              <option key={type.title} value={type.title} className="bg-card">
                                {type.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <label htmlFor="date" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                              <Calendar className="h-3 w-3" />
                              {t.dance.bookingForm.eventDateLabel}
                            </label>
                            <Input
                              id="date"
                              type="date"
                              required
                              value={formData.date}
                              onChange={handleInputChange}
                              className="rounded-md border border-border/60 bg-white/50 h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="guests" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                              <Users className="h-3 w-3" />
                              {t.dance.bookingForm.guestsLabel}
                            </label>
                            <Input
                              id="guests"
                              type="text"
                              required
                              placeholder="e.g. 100-200"
                              value={formData.guests}
                              onChange={handleInputChange}
                              className="rounded-md border border-border/60 bg-white/50 h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20"
                            />
                          </div>
                        </div>
                      </div>

                      <Button onClick={handleNext} className="h-12 w-full rounded-md bg-primary hover:bg-primary/90 text-[11px] font-bold uppercase tracking-[0.2em] group">
                        {t.dance.bookingForm.nextButton}
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.form
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-black">2</div>
                        <h3 className="text-lg font-bold tracking-tight text-primary uppercase tracking-widest">Contact Information</h3>
                      </div>

                      <div className="grid gap-6">
                        <div className="grid gap-2">
                          <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                            {t.dance.bookingForm.nameLabel}
                          </label>
                          <Input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="rounded-md border border-border/60 bg-white/50 h-12 px-4"
                          />
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                              {t.dance.bookingForm.emailLabel}
                            </label>
                            <Input
                              id="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your@email.com"
                              className="rounded-md border border-border/60 bg-white/50 h-12 px-4"
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                              Phone Number
                            </label>
                            <Input
                              id="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+250..."
                              className="rounded-md border border-border/60 bg-white/50 h-12 px-4"
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                            {t.dance.bookingForm.messageLabel}
                          </label>
                          <Textarea
                            id="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us about your event theme and special requests..."
                            className="rounded-md border border-border/60 bg-white/50 px-4 py-3 min-h-[100px] resize-none"
                          />
                        </div>
                      </div>

                      {mutation.error && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">{mutation.error.message}</p>}
                      <div className="flex gap-4">
                        <Button variant="outline" onClick={handleBack} className="h-12 flex-1 rounded-md border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary" disabled={mutation.isPending}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          {t.dance.bookingForm.backButton}
                        </Button>
                        <Button type="submit" className="h-12 flex-[2] rounded-md bg-primary hover:bg-primary/90 text-[10px] font-bold uppercase tracking-widest" disabled={mutation.isPending}>
                          {mutation.isPending ? "Sending..." : t.dance.bookingForm.submitButton}
                        </Button>
                      </div>
                    </motion.form>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex h-full flex-col items-center justify-center text-center space-y-8"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#d68c90]/10 text-[#d68c90] shadow-inner">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tight text-primary uppercase tracking-widest">{t.dance.bookingForm.successTitle}</h3>
                        <p className="text-xs font-medium text-muted-foreground leading-relaxed max-w-xs mx-auto">
                          {t.dance.bookingForm.successMessage}
                        </p>
                      </div>
                      <Button onClick={resetForm} variant="outline" className="h-10 rounded-md border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary px-8">
                        {t.dance.bookingForm.newBookingButton}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
