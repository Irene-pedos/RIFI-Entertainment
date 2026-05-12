"use client"

import { useRef, useState } from "react"
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Clapperboard,
  Star,
  Users,
  CheckCircle2,
} from "lucide-react"

import { PageIntro } from "@/components/marketing/page-intro"
import { Button } from "@/components/ui/button"
import { Gallery4 } from "@/components/ui/gallery4"
import { useTranslations } from "@/lib/i18n"

const serviceIcons = [Camera, Clapperboard, Star, Users]

export default function ModelsPage() {
  const t = useTranslations()
  const { models } = t

  const applicationFormRef = useRef<HTMLDivElement>(null)
  const bookingFormRef = useRef<HTMLDivElement>(null)

  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  const scrollToForm = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setApplicationSubmitted(true)
    // In a real app, you'd handle the form submission logic here
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSubmitted(true)
    // In a real app, you'd handle the form submission logic here
  }

  const galleryItems = [
    {
      id: "1",
      title: "Fashion Portfolio",
      description: "High-end fashion and runway looks.",
      href: "/gallery?category=models",
      image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "2",
      title: "Commercial Shoot",
      description: "Natural and versatile looks for brands.",
      href: "/gallery?category=models",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "3",
      title: "Event Representation",
      description: "Professional and welcoming presence.",
      href: "/gallery?category=models",
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "4",
      title: "Kids Collection",
      description: "Bright and energetic young talent.",
      href: "/gallery?category=models",
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=800",
    },
  ]

  return (
    <div className="flex flex-col pb-12 md:pb-16 lg:pb-24">
      <PageIntro
        eyebrow={models.eyebrow}
        title={models.title}
        description={models.description}
        className="max-w-none"
        containerClassName="max-w-[1600px] pt-12 pb-6 md:pt-16 md:pb-8 mb-4 md:mb-6"
      >
        <div className="flex flex-wrap gap-3">
          <Button
            className="h-12 px-5 text-base"
            onClick={() => scrollToForm(bookingFormRef)}
          >
            Book a Model
            <ArrowRight className="ml-2 size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-12 px-5 text-base"
            onClick={() => scrollToForm(applicationFormRef)}
          >
            Apply to Join
          </Button>
        </div>
      </PageIntro>

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <p className="leading-none">&nbsp;</p>
      </div>

      <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
        {/* Services Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {models.services.map((service, index) => {
              const Icon = serviceIcons[index] || Star
              return (
                <article
                  key={service.title}
                  className="border border-border/70 bg-card/90 p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-primary">
                    <Icon className="size-5" />
                    <span className="text-xs font-semibold tracking-[0.24em] uppercase">
                      Service
                    </span>
                  </div>
                  <h2 className="mt-4 font-heading text-xl font-semibold tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                </article>
              )
            })}
          </div>
        </section>

        {/* Requirements & Info Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Application Requirements */}
            <div className="rounded-2xl border border-border/50 bg-muted/30 p-8 md:p-10">
              <h3 className="font-heading text-2xl font-semibold tracking-tight">
                {models.requirements.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {models.requirements.description}
              </p>
              <ul className="mt-6 space-y-4">
                {models.requirements.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm leading-6"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Info */}
            <div className="rounded-2xl border border-border/50 bg-muted/30 p-8 md:p-10">
              <h3 className="font-heading text-2xl font-semibold tracking-tight">
                {models.bookingInfo.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {models.bookingInfo.description}
              </p>
              <ul className="mt-6 space-y-4">
                {models.bookingInfo.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm leading-6"
                  >
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Online Model Application Form */}
            <div
              ref={applicationFormRef}
              className="scroll-mt-24 rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12"
            >
              <h2 className="font-heading text-3xl font-semibold tracking-tight">
                {models.applicationForm.title}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {models.forms.application.description}
              </p>

              {applicationSubmitted ? (
                <div className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-primary/5 p-12 text-center">
                  <CheckCircle2 className="size-16 text-primary" />
                  <p className="mt-6 text-lg font-medium text-foreground">
                    {models.applicationForm.success}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => setApplicationSubmitted(false)}
                  >
                    Send another application
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleApplicationSubmit}
                  className="mt-8 space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        {models.applicationForm.fields.fullName}
                      </label>
                      <input
                        required
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        {models.applicationForm.fields.email}
                      </label>
                      <input
                        required
                        type="email"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        {models.applicationForm.fields.phone}
                      </label>
                      <input
                        required
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        {models.applicationForm.fields.height}
                      </label>
                      <input className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      {models.applicationForm.fields.measurements}
                    </label>
                    <input className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      {models.applicationForm.fields.socialMedia}
                    </label>
                    <input className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      {models.applicationForm.fields.experience}
                    </label>
                    <textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <Button type="submit" className="h-12 w-full text-base">
                    {models.applicationForm.submit}
                  </Button>
                </form>
              )}
            </div>

            {/* Client Booking Form */}
            <div
              ref={bookingFormRef}
              className="scroll-mt-24 rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12"
            >
              <h2 className="font-heading text-3xl font-semibold tracking-tight">
                {models.bookingForm.title}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {models.forms.booking.description}
              </p>

              {bookingSubmitted ? (
                <div className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-primary/5 p-12 text-center">
                  <CheckCircle2 className="size-16 text-primary" />
                  <p className="mt-6 text-lg font-medium text-foreground">
                    {models.bookingForm.success}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => setBookingSubmitted(false)}
                  >
                    Send another request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      {models.bookingForm.fields.clientName}
                    </label>
                    <input
                      required
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        {models.bookingForm.fields.email}
                      </label>
                      <input
                        required
                        type="email"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        {models.bookingForm.fields.phone}
                      </label>
                      <input
                        required
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        {models.bookingForm.fields.eventDate}
                      </label>
                      <input
                        type="date"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        {models.bookingForm.fields.assignmentType}
                      </label>
                      <select className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="">Select type...</option>
                        <option value="fashion">Fashion</option>
                        <option value="commercial">Commercial</option>
                        <option value="event">Event</option>
                        <option value="kids">Kids</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">
                      {models.bookingForm.fields.requirements}
                    </label>
                    <textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <Button type="submit" className="h-12 w-full text-base">
                    {models.bookingForm.submit}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <Gallery4
            title={models.gallery.title}
            description={models.gallery.description}
            items={galleryItems}
          />
        </section>
      </div>
    </div>
  )
}
