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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "@/lib/i18n"
import { trpc } from "@/lib/trpc"

const serviceIcons = [Camera, Clapperboard, Star, Users]

export default function ModelsPage() {
  const t = useTranslations()
  const { models } = t

  const bookingFormRef = useRef<HTMLDivElement>(null)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  const bookingMutation = trpc.booking.create.useMutation({
    onSuccess: () => setBookingSubmitted(true),
  })

  const scrollToForm = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    bookingMutation.mutate({
      clientName: formData.get("clientName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      serviceType: "MODELS",
      eventDate: formData.get("eventDate") as string,
      message: `Type: ${formData.get("assignmentType")}. Requirements: ${formData.get("requirements")}`,
      sourcePage: "models",
    })
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
            className="rounded-none h-10 px-6 text-sm"
            onClick={() => scrollToForm(bookingFormRef)}
          >
            Book a Model
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </PageIntro>

      <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
        {/* Services Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {models.services.map((service, index) => {
              const Icon = serviceIcons[index] || Star
              return (
                <article
                  key={service.title}
                  className="border border-border/70 bg-card/50 p-6 shadow-sm transition-all hover:border-primary/50 rounded-none"
                >
                  <div className="flex items-center gap-3 text-primary">
                    <Icon className="size-4" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase">
                      Service
                    </span>
                  </div>
                  <h2 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </article>
              )
            })}
          </div>
        </section>

        {/* Requirements & Info Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Application Requirements */}
            <div className="border border-border/70 bg-muted/20 p-6 md:p-8 rounded-none">
              <h3 className="font-heading text-xl font-semibold tracking-tight">
                {models.requirements.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                {models.requirements.description}
              </p>
              <ul className="mt-6 space-y-3">
                {models.requirements.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-xs leading-relaxed"
                  >
                    <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Info */}
            <div className="border border-border/70 bg-muted/20 p-6 md:p-8 rounded-none">
              <h3 className="font-heading text-xl font-semibold tracking-tight">
                {models.bookingInfo.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                {models.bookingInfo.description}
              </p>
              <ul className="mt-6 space-y-3">
                {models.bookingInfo.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-xs leading-relaxed"
                  >
                    <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div
            ref={bookingFormRef}
            className="scroll-mt-24 border border-border bg-card p-6 md:p-10 lg:p-16 rounded-none shadow-sm"
          >
            <div className="grid gap-12 lg:grid-cols-5 items-start">
              <div className="lg:col-span-2 lg:sticky lg:top-32">
                <h2 className="font-heading text-2xl font-semibold tracking-tight lg:text-4xl">
                  {models.bookingForm.title}
                </h2>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm lg:max-w-md">
                  {models.forms.booking.description}
                </p>
                
                <div className="mt-8 hidden lg:block space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <BadgeCheck className="size-4" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Professional Talent</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary">
                    <BadgeCheck className="size-4" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Global Standards</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                {bookingSubmitted ? (
                  <div className="flex flex-col items-center justify-center border border-dashed border-primary/30 bg-primary/5 p-10 text-center rounded-none h-full">
                    <CheckCircle2 className="size-12 text-primary" />
                    <p className="mt-4 text-sm font-medium text-foreground">
                      {models.bookingForm.success}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 rounded-none h-9 text-xs"
                      onClick={() => setBookingSubmitted(false)}
                    >
                      Send another request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="clientName" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          {models.bookingForm.fields.clientName}
                        </Label>
                        <Input
                          id="clientName"
                          name="clientName"
                          placeholder="Your company or name"
                          required
                          className="rounded-none h-9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          {models.bookingForm.fields.email}
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
                          {models.bookingForm.fields.phone}
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
                        <Label htmlFor="eventDate" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          {models.bookingForm.fields.eventDate}
                        </Label>
                        <Input
                          id="eventDate"
                          name="eventDate"
                          type="date"
                          className="rounded-none h-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignmentType" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                        {models.bookingForm.fields.assignmentType}
                      </Label>
                      <Select name="assignmentType">
                        <SelectTrigger className="w-full rounded-none h-9 text-xs">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="kids">Kids</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                        {models.bookingForm.fields.requirements}
                      </Label>
                      <Textarea 
                        id="requirements"
                        name="requirements"
                        placeholder="Tell us about your requirements..."
                        className="rounded-none min-h-[100px]" 
                      />
                    </div>

                    <Button type="submit" className="w-full h-11 text-sm rounded-none tracking-widest uppercase font-semibold" disabled={bookingMutation.isPending}>
                      {bookingMutation.isPending ? "Submitting..." : models.bookingForm.submit}
                    </Button>
                  </form>
                )}
              </div>
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
