"use client"

import { useState, type FormEvent } from "react"
import { MapPin, Hotel, Plane, UserCheck, CheckCircle2, ChevronRight, ChevronLeft, Calendar, Users, Briefcase } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { useTranslations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Gallery4 } from "@/components/ui/gallery4"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PageIntro } from "@/components/marketing/page-intro"
import { trpc } from "@/lib/trpc"

export default function ToursTravelPage() {
  const t = useTranslations()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    package: t.tours.packages[0].title,
    guests: "1",
    message: "",
    phone: "",
  })

  const mutation = trpc.booking.create.useMutation({
    onSuccess: () => setStep(3),
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate({
      serviceType: "TOURS",
      clientName: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      eventDate: formData.date,
      guestCount: parseInt(formData.guests) || 1,
      message: `Package: ${formData.package}\nMessage: ${formData.message}`,
      sourcePage: "tours-travel",
    })
  }

  const resetForm = () => {
    setStep(1)
    mutation.reset()
    setFormData({
      name: "",
      email: "",
      date: "",
      package: t.tours.packages[0].title,
      guests: "1",
      message: "",
      phone: "",
    })
  }

  const galleryItems = [
    {
      id: "kigali-tour",
      title: t.tours.packages[0].title,
      description: t.tours.packages[0].description,
      href: "/gallery",
      image: "/tours/kigali.jpg",
    },
    {
      id: "nature-culture",
      title: t.tours.packages[1].title,
      description: t.tours.packages[1].description,
      href: "/gallery",
      image: "/tours/safari.jpg",
    },
    {
      id: "corporate-travel",
      title: t.tours.packages[2].title,
      description: t.tours.packages[2].description,
      href: "/gallery",
      image: "/tours/kigali.jpg",
    },
  ]

  return (
    <div className="flex flex-col">
      <PageIntro
        eyebrow={t.tours.eyebrow}
        title={t.tours.title}
        description={t.tours.description}
      >
        <div className="flex flex-wrap gap-4 pt-4">
          <Button className="rounded-md h-10 px-6 text-[11px] font-bold uppercase tracking-widest bg-[#2D4873] hover:bg-[#2D4873]/90" asChild>
            <a href="#booking">{t.tours.bookingForm.submitButton}</a>
          </Button>
          <Button variant="outline" className="rounded-md h-10 px-6 text-[11px] font-bold uppercase tracking-widest border-[#2D4873]/20 text-[#2D4873]" asChild>
            <a href="#services">Learn More</a>
          </Button>
        </div>
      </PageIntro>

      {/* Services Section */}
      <section id="services" className="w-full px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Travel Assistance */}
          <div className="group border border-border/60 bg-card/40 p-8 rounded-md shadow-sm transition-all hover:border-[#2D4873]/30">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#d68c90]/5 text-[#d68c90] group-hover:bg-[#d68c90]/10 transition-colors">
              <Plane className="size-5" />
            </div>
            <h3 className="text-base font-bold tracking-tight text-[#2D4873] uppercase tracking-[0.1em] mb-3">{t.tours.assistanceHeading}</h3>
            <p className="text-[11px] leading-6 text-muted-foreground mb-6 uppercase tracking-tight">
              {t.tours.assistanceText}
            </p>
            <ul className="space-y-3">
              {t.tours.assistanceItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-xs text-muted-foreground uppercase tracking-tight font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d68c90] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hotel Booking Support */}
          <div className="group border border-border/60 bg-card/40 p-8 rounded-md shadow-sm transition-all hover:border-[#2D4873]/30">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#d68c90]/5 text-[#d68c90] group-hover:bg-[#d68c90]/10 transition-colors">
              <Hotel className="size-5" />
            </div>
            <h3 className="text-base font-bold tracking-tight text-[#2D4873] uppercase tracking-[0.1em] mb-3">{t.tours.hotelHeading}</h3>
            <p className="text-[11px] leading-6 text-muted-foreground mb-6 uppercase tracking-tight">
              {t.tours.hotelText}
            </p>
            <ul className="space-y-3">
              {t.tours.hotelItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-xs text-muted-foreground uppercase tracking-tight font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d68c90] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Guiding Services */}
          <div className="group border border-border/60 bg-card/40 p-8 rounded-md shadow-sm transition-all hover:border-[#2D4873]/30">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#d68c90]/5 text-[#d68c90] group-hover:bg-[#d68c90]/10 transition-colors">
              <UserCheck className="size-5" />
            </div>
            <h3 className="text-base font-bold tracking-tight text-[#2D4873] uppercase tracking-[0.1em] mb-3">{t.tours.guideHeading}</h3>
            <p className="text-[11px] leading-6 text-muted-foreground mb-6 uppercase tracking-tight">
              {t.tours.guideText}
            </p>
            <ul className="space-y-3">
              {t.tours.guideItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-xs text-muted-foreground uppercase tracking-tight font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d68c90] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="bg-[#2D4873]/5 py-16 sm:py-20 border-y border-border/60">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
          <Gallery4
            title={t.tours.packagesHeading}
            description="Explore our curated tour packages across Rwanda."
            items={galleryItems}
          />
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-16 sm:py-20 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#d68c90] mb-4">
                {t.tours.bookingHeading}
              </div>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-[#2D4873] mb-6 leading-tight">
                {t.tours.bookingTitle}
              </h2>
              <p className="text-base leading-7 text-muted-foreground mb-10 max-w-md">
                {t.tours.bookingDescription}
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#2D4873]/10 bg-white shadow-sm">
                    <MapPin className="size-5 text-[#d68c90]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2D4873] text-sm uppercase tracking-tight">Local Insight</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">Authentic experiences guided by locals who know every corner of the country.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#2D4873]/10 bg-white shadow-sm">
                    <CheckCircle2 className="size-5 text-[#d68c90]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2D4873] text-sm uppercase tracking-tight">Tailored Logistics</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">We handle everything from luxury transport to premium accommodation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-h-[500px] border border-border/60 bg-white/80 p-8 rounded-md  backdrop-blur-md">
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
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D4873] text-white text-xs font-black">1</div>
                      <h3 className="text-lg font-bold tracking-tight text-[#2D4873] uppercase tracking-widest">Select Your Trip</h3>
                    </div>

                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <label htmlFor="package" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D4873]/60">
                          <Briefcase className="h-3 w-3" />
                          {t.tours.bookingForm.packageLabel}
                        </label>
                        <select
                          id="package"
                          value={formData.package}
                          onChange={handleInputChange}
                          className="flex h-12 w-full rounded-md border border-border/60 bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-wider outline-none focus:border-[#2D4873] transition-all appearance-none"
                        >
                          {t.tours.packages.map((pkg) => (
                            <option key={pkg.title} value={pkg.title} className="bg-card">
                              {pkg.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <label htmlFor="date" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D4873]/60">
                            <Calendar className="h-3 w-3" />
                            {t.tours.bookingForm.travelDateLabel}
                          </label>
                          <Input
                            id="date"
                            type="date"
                            required
                            value={formData.date}
                            onChange={handleInputChange}
                            className="rounded-md border border-border/60 bg-white/50 h-12 px-4"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="guests" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D4873]/60">
                            <Users className="h-3 w-3" />
                            {t.tours.bookingForm.guestsLabel}
                          </label>
                          <Input
                            id="guests"
                            type="number"
                            min="1"
                            required
                            value={formData.guests}
                            onChange={handleInputChange}
                            className="rounded-md border border-border/60 bg-white/50 h-12 px-4"
                          />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleNext} className="h-12 w-full rounded-md bg-[#2D4873] hover:bg-[#2D4873]/90 text-[11px] font-bold uppercase tracking-[0.2em] group">
                      {t.tours.bookingForm.nextButton}
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
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D4873] text-white text-xs font-black">2</div>
                      <h3 className="text-lg font-bold tracking-tight text-[#2D4873] uppercase tracking-widest">Contact Information</h3>
                    </div>

                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D4873]/60">
                          {t.tours.bookingForm.nameLabel}
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
                          <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D4873]/60">
                            {t.tours.bookingForm.emailLabel}
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
                          <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D4873]/60">
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
                        <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D4873]/60">
                          {t.tours.bookingForm.messageLabel}
                        </label>
                        <Textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your special requests..."
                          className="rounded-md border border-border/60 bg-white/50 px-4 py-3 min-h-[100px] resize-none"
                        />
                      </div>
                    </div>

                    {mutation.error && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">{mutation.error.message}</p>}
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handleBack} className="h-12 flex-1 rounded-md border-[#2D4873]/20 text-[10px] font-bold uppercase tracking-widest text-[#2D4873]" disabled={mutation.isPending}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        {t.tours.bookingForm.backButton}
                      </Button>
                      <Button type="submit" className="h-12 flex-[2] rounded-md bg-[#2D4873] hover:bg-[#2D4873]/90 text-[10px] font-bold uppercase tracking-widest" disabled={mutation.isPending}>
                        {mutation.isPending ? "Sending..." : t.tours.bookingForm.submitButton}
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
                      <h3 className="text-2xl font-bold tracking-tight text-[#2D4873] uppercase tracking-widest">{t.tours.bookingForm.successTitle}</h3>
                      <p className="text-xs font-medium text-muted-foreground leading-relaxed max-w-xs mx-auto">
                        {t.tours.bookingForm.successMessage}
                      </p>
                    </div>
                    <Button onClick={resetForm} variant="outline" className="h-10 rounded-md border-[#2D4873]/20 text-[10px] font-bold uppercase tracking-widest text-[#2D4873] px-8">
                      {t.tours.bookingForm.newBookingButton}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
