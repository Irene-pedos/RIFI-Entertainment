"use client"

import * as React from "react"
import { CalendarIcon, CheckCircle2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
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

export function ProtocolBookingForm() {
  const t = useTranslations()
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Mock form submission
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center border border-border/70 bg-emerald-500/5 p-12 text-center shadow-sm">
        <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">
          {t.protocol.bookingForm.success}
        </h3>
        <Button
          variant="outline"
          className="mt-8 rounded-none border-border/70"
          onClick={() => setIsSubmitted(false)}
        >
          Send another request
        </Button>
      </div>
    )
  }

  return (
    <div className="border border-border/70 bg-card/90 p-8 shadow-sm sm:p-10">
      <div className="max-w-2xl">
        <h2 className="font-heading text-3xl font-semibold tracking-tight">
          {t.protocol.bookingForm.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {t.protocol.bookingForm.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider">
            {t.protocol.bookingForm.name}
          </Label>
          <Input id="name" placeholder="Jean Paul" required className="rounded-none border-border/70" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider">
            {t.protocol.bookingForm.email}
          </Label>
          <Input id="email" type="email" placeholder="jp@example.rw" required className="rounded-none border-border/70" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider">
            {t.protocol.bookingForm.phone}
          </Label>
          <Input id="phone" type="tel" placeholder="+250 788 000 000" required className="rounded-none border-border/70" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider">
            {t.protocol.bookingForm.date}
          </Label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input id="date" type="date" required className="rounded-none border-border/70 pl-10" />
          </div>
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="eventType" className="text-xs font-semibold uppercase tracking-wider">
            {t.protocol.bookingForm.eventType}
          </Label>
          <Select required>
            <SelectTrigger id="eventType" className="rounded-none border-border/70">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-border/70">
              <SelectItem value="wedding">Wedding / Reception</SelectItem>
              <SelectItem value="corporate">Corporate Event / Conference</SelectItem>
              <SelectItem value="private">Private Celebration</SelectItem>
              <SelectItem value="vip">VIP Hosting / Formal Ceremony</SelectItem>
              <SelectItem value="other">Other Event</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider">
            {t.protocol.bookingForm.message}
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us about your event and specific requirements..."
            className="min-h-[120px] rounded-none border-border/70"
          />
        </div>

        <div className="sm:col-span-2">
          <Button type="submit" className="w-full rounded-none py-6 text-base font-semibold" disabled={isLoading}>
            <Send className="mr-2 size-4" />
            {isLoading ? "Sending..." : t.protocol.bookingForm.submit}
          </Button>
        </div>
      </form>
    </div>
  )
}
