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
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStep(3)
  }

  const resetForm = () => {
    setStep(1)
    setFormData({
      name: "",
      email: "",
      date: "",
      package: t.tours.packages[0].title,
      guests: "1",
      message: "",
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
      {/* Replaced Hero with PageIntro */}
      <PageIntro
        eyebrow={t.tours.eyebrow}
        title={t.tours.title}
        description={t.tours.description}
      >
        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" className="h-12 px-8" asChild>
            <a href="#booking">{t.tours.bookingForm.submitButton}</a>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8" asChild>
            <a href="#services">Learn More</a>
          </Button>
        </div>
      </PageIntro>

      {/* Services Section */}
      <section id="services" className="w-full px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Travel Assistance */}
          <div className="group border border-border/70 bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center border border-border/70 bg-muted/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Plane className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight mb-3">{t.tours.assistanceHeading}</h3>
            <p className="text-sm leading-7 text-muted-foreground mb-6">
              {t.tours.assistanceText}
            </p>
            <ul className="space-y-3">
              {t.tours.assistanceItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hotel Booking Support */}
          <div className="group border border-border/70 bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center border border-border/70 bg-muted/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Hotel className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight mb-3">{t.tours.hotelHeading}</h3>
            <p className="text-sm leading-7 text-muted-foreground mb-6">
              {t.tours.hotelText}
            </p>
            <ul className="space-y-3">
              {t.tours.hotelItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Guiding Services */}
          <div className="group border border-border/70 bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center border border-border/70 bg-muted/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <UserCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight mb-3">{t.tours.guideHeading}</h3>
            <p className="text-sm leading-7 text-muted-foreground mb-6">
              {t.tours.guideText}
            </p>
            <ul className="space-y-3">
              {t.tours.guideItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Gallery4
            title={t.tours.packagesHeading}
            description="Explore our curated tour packages across Rwanda."
            items={galleryItems}
          />
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-12 sm:py-16 overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-primary mb-6">
                {t.tours.bookingHeading}
              </div>
              <h2 className="font-heading text-4xl font-semibold tracking-tight mb-8">
                {t.tours.bookingTitle}
              </h2>
              <p className="text-lg leading-8 text-muted-foreground mb-12">
                {t.tours.bookingDescription}
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border/70 bg-card">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Local Insight</h4>
                    <p className="text-sm text-muted-foreground">Authentic experiences guided by locals.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border/70 bg-card">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Tailored Logistics</h4>
                    <p className="text-sm text-muted-foreground">We handle everything from transport to accommodation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-h-[500px] border border-border/70 bg-card p-8 shadow-sm sm:p-10">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4 text-primary mb-8">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
                      <h3 className="text-xl font-semibold">Select Your Trip</h3>
                    </div>

                    <div className="grid gap-8">
                      <div className="grid gap-2">
                        <label htmlFor="package" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          <Briefcase className="h-3 w-3" />
                          {t.tours.bookingForm.packageLabel}
                        </label>
                        <select
                          id="package"
                          value={formData.package}
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-none border-b-2 border-border/70 bg-transparent py-2 text-base outline-none focus:border-primary transition-colors appearance-none"
                        >
                          {t.tours.packages.map((pkg) => (
                            <option key={pkg.title} value={pkg.title} className="bg-card">
                              {pkg.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid gap-8 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <label htmlFor="date" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {t.tours.bookingForm.travelDateLabel}
                          </label>
                          <Input
                            id="date"
                            type="date"
                            required
                            value={formData.date}
                            onChange={handleInputChange}
                            className="rounded-none border-x-0 border-t-0 border-b-2 px-0 focus-visible:ring-0"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="guests" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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
                            className="rounded-none border-x-0 border-t-0 border-b-2 px-0 focus-visible:ring-0"
                          />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleNext} size="lg" className="h-14 w-full uppercase tracking-widest group">
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
                    <div className="flex items-center gap-4 text-primary mb-8">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
                      <h3 className="text-xl font-semibold">Contact Information</h3>
                    </div>

                    <div className="grid gap-8">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {t.tours.bookingForm.nameLabel}
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="rounded-none border-x-0 border-t-0 border-b-2 px-0 focus-visible:ring-0"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {t.tours.bookingForm.emailLabel}
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="rounded-none border-x-0 border-t-0 border-b-2 px-0 focus-visible:ring-0"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {t.tours.bookingForm.messageLabel}
                        </label>
                        <Textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your special requests..."
                          className="rounded-none border-x-0 border-t-0 border-b-2 px-0 focus-visible:ring-0 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handleBack} size="lg" className="h-14 flex-1 uppercase tracking-widest">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        {t.tours.bookingForm.backButton}
                      </Button>
                      <Button type="submit" size="lg" className="h-14 flex-[2] uppercase tracking-widest">
                        {t.tours.bookingForm.submitButton}
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
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-semibold tracking-tight">{t.tours.bookingForm.successTitle}</h3>
                      <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                        {t.tours.bookingForm.successMessage}
                      </p>
                    </div>
                    <Button onClick={resetForm} variant="outline" size="lg" className="uppercase tracking-widest mt-4">
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
