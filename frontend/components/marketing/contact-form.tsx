"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/lib/i18n"
import { trpc } from "@/lib/trpc"
import { CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const t = useTranslations()
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  
  const mutation = trpc.inquiry.create.useMutation({
    onSuccess: () => {
      setIsSubmitted(true)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    mutation.mutate({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    })
  }

  if (isSubmitted) {
    return (
      <div className="bg-secondary/30 backdrop-blur-sm p-8 rounded-lg border shadow-sm text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="size-12 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you for contacting us. We will get back to you shortly.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>Send another message</Button>
      </div>
    )
  }

  return (
    <div className="bg-secondary/30 backdrop-blur-sm p-8 rounded-lg border shadow-sm">
      <h2 className="text-2xl font-bold mb-6">{t.contact.formTitle}</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.contact.formName}</label>
            <input
              name="name"
              className="w-full p-2 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none"
              placeholder={t.contact.formNamePlaceholder}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.contact.formEmail}</label>
            <input
              name="email"
              type="email"
              className="w-full p-2 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none"
              placeholder={t.contact.formEmailPlaceholder}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.contact.formSubject}</label>
          <input
            name="subject"
            className="w-full p-2 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none"
            placeholder={t.contact.formSubjectPlaceholder}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.contact.formMessage}</label>
          <textarea
            name="message"
            rows={4}
            className="w-full p-2 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none resize-none"
            placeholder={t.contact.formMessagePlaceholder}
            required
            minLength={10}
          />
        </div>
        {mutation.error && (
          <p className="text-sm text-destructive">{mutation.error.message}</p>
        )}
        <Button type="submit" className="w-full sm:w-auto" disabled={mutation.isPending}>
          {mutation.isPending ? "Sending..." : t.contact.formSubmit}
        </Button>
      </form>
    </div>
  )
}
