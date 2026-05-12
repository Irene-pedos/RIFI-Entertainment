"use client"

import { useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Star, Calendar, Users, Music, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react"

import { useTranslations } from "@/lib/i18n"
import { Gallery4 } from "@/components/ui/gallery4"
import { PageIntro } from "@/components/marketing/page-intro"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const galleryImages = [
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=60&w=1080",
  "https://images.unsplash.com/photo-1504609773096-104ff2e818cf?auto=format&fit=crop&q=60&w=1080",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&q=60&w=1080",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=60&w=1080",
]

export default function DancePage() {
  const t = useTranslations()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    style: t.dance.danceTypes[0].title,
    guests: "",
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
      style: t.dance.danceTypes[0].title,
      guests: "",
      message: "",
    })
  }

  const galleryItems = t.dance.galleryItems.map((item, index) => ({
    id: `dance-gallery-${index}`,
    ...item,
    href: "/gallery",
    image: galleryImages[index] ?? galleryImages[0],
  }))

  return (
    <>
      <PageIntro
        eyebrow={t.dance.eyebrow}
        title={t.dance.title}
        description={t.dance.description}
      >
        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" className="h-12 px-8" asChild>
            <a href="#booking">{t.dance.ctaButton}</a>
          </Button>
          <div className="flex items-center gap-8 pt-4">
             <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">20+ Dancers</span>
             </div>
             <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">100% Authentic</span>
             </div>
          </div>
        </div>
      </PageIntro>

      {/* Dance Types Grid */}
      <section className="w-full px-4 pb-6 sm:px-6 sm:pb-10 lg:px-8">
        <div className="mb-8">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            {t.dance.danceStylesHeading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.dance.danceStylesText}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.dance.danceTypes.map((type, index) => (
            <div
              key={index}
              className="border border-border/70 bg-card/85 p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="text-3xl mb-3">{type.icon}</div>
              <h3 className="font-heading text-lg font-semibold tracking-tight mb-2">
                {type.title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground mb-3">
                {type.description}
              </p>
              <ul className="space-y-1">
                {type.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2 text-primary">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full px-4 pb-6 sm:px-6 sm:pb-10 lg:px-8">
        <div className="mb-8">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            {t.dance.servicesHeading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.dance.servicesText}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {t.dance.services.map((service, index) => (
            <div
              key={index}
              className="border border-border/70 bg-card/85 p-5 shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="font-heading text-lg font-semibold tracking-tight mb-2">
                {service.title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground mb-3">
                {service.description}
              </p>
              <ul className="space-y-1">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2 text-primary">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Guidelines Grid */}
      <section className="w-full px-4 pb-6 sm:px-6 sm:pb-10 lg:px-8">
        <div className="mb-8">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            {t.dance.guidelinesHeading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.dance.guidelinesText}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.dance.guidelines.map((guide, index) => (
            <div
              key={index}
              className="border border-border/70 bg-card/85 p-5 shadow-sm"
            >
              <h3 className="font-heading text-base font-semibold tracking-tight mb-3">
                {guide.title}
              </h3>
              <ul className="space-y-2">
                {guide.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-muted-foreground">
                    <span className="mr-2 mt-0.5 text-primary text-xs">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-4 pb-6 sm:px-6 sm:pb-10 lg:px-8">
        <Gallery4
          title={t.dance.galleryTitle}
          description={t.dance.galleryDescription}
          items={galleryItems}
        />
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-12 sm:py-16 overflow-hidden bg-muted/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-primary mb-6">
                {t.dance.bookingHeading}
              </div>
              <h2 className="font-heading text-4xl font-semibold tracking-tight mb-8">
                {t.dance.bookingTitle}
              </h2>
              <p className="text-lg leading-8 text-muted-foreground mb-12">
                {t.dance.bookingDescription}
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border/70 bg-card">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Professional Energy</h4>
                    <p className="text-sm text-muted-foreground">Dynamic performances that captivate every audience.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border/70 bg-card">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Customized Shows</h4>
                    <p className="text-sm text-muted-foreground">Tailored choreography to match your event&apos;s theme.</p>
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
                      <h3 className="text-xl font-semibold">Event Details</h3>
                    </div>

                    <div className="grid gap-8">
                      <div className="grid gap-2">
                        <label htmlFor="style" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          <Music className="h-3 w-3" />
                          {t.dance.bookingForm.styleLabel}
                        </label>
                        <select
                          id="style"
                          value={formData.style}
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-none border-b-2 border-border/70 bg-transparent py-2 text-base outline-none focus:border-primary transition-colors appearance-none"
                        >
                          {t.dance.danceTypes.map((type) => (
                            <option key={type.title} value={type.title} className="bg-card">
                              {type.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid gap-8 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <label htmlFor="date" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {t.dance.bookingForm.eventDateLabel}
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
                            {t.dance.bookingForm.guestsLabel}
                          </label>
                          <Input
                            id="guests"
                            type="text"
                            required
                            placeholder="e.g. 100-200"
                            value={formData.guests}
                            onChange={handleInputChange}
                            className="rounded-none border-x-0 border-t-0 border-b-2 px-0 focus-visible:ring-0"
                          />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleNext} size="lg" className="h-14 w-full uppercase tracking-widest group">
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
                    <div className="flex items-center gap-4 text-primary mb-8">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
                      <h3 className="text-xl font-semibold">Contact Information</h3>
                    </div>

                    <div className="grid gap-8">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {t.dance.bookingForm.nameLabel}
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
                          {t.dance.bookingForm.emailLabel}
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
                          {t.dance.bookingForm.messageLabel}
                        </label>
                        <Textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your event theme and special requests..."
                          className="rounded-none border-x-0 border-t-0 border-b-2 px-0 focus-visible:ring-0 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handleBack} size="lg" className="h-14 flex-1 uppercase tracking-widest">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        {t.dance.bookingForm.backButton}
                      </Button>
                      <Button type="submit" size="lg" className="h-14 flex-[2] uppercase tracking-widest">
                        {t.dance.bookingForm.submitButton}
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
                      <h3 className="text-3xl font-semibold tracking-tight">{t.dance.bookingForm.successTitle}</h3>
                      <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                        {t.dance.bookingForm.successMessage}
                      </p>
                    </div>
                    <Button onClick={resetForm} variant="outline" size="lg" className="uppercase tracking-widest mt-4">
                      {t.dance.bookingForm.newBookingButton}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
