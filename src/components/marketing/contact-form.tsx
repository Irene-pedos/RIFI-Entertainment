"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "@/lib/i18n"
import { trpc } from "@/lib/trpc"
import { CheckCircle2, Loader2, Send } from "lucide-react"

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
      <div className="bg-card/50 backdrop-blur-sm p-8 rounded-none border border-border/70 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 className="size-10 text-emerald-500" />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2 tracking-tight">{t.contact.successTitle || "Message Sent!"}</h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">
          {t.contact.successMessage || "Thank you for contacting us. We will get back to you shortly."}
        </p>
        <Button onClick={() => setIsSubmitted(false)} className="rounded-none px-8">
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-none border border-border/70 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 tracking-tight">{t.contact.formTitle}</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{t.contact.formName}</Label>
            <Input
              id="name"
              name="name"
              className="rounded-none border-border/70 bg-background/50 h-10"
              placeholder={t.contact.formNamePlaceholder}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{t.contact.formEmail}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="rounded-none border-border/70 bg-background/50 h-10"
              placeholder={t.contact.formEmailPlaceholder}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{t.contact.formSubject}</Label>
          <Input
            id="subject"
            name="subject"
            className="rounded-none border-border/70 bg-background/50 h-10"
            placeholder={t.contact.formSubjectPlaceholder}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{t.contact.formMessage}</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            className="rounded-none border-border/70 bg-background/50 resize-none min-h-[120px]"
            placeholder={t.contact.formMessagePlaceholder}
            required
            minLength={10}
          />
        </div>
        
        {mutation.error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs">
            {mutation.error.message}
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full h-11 rounded-none uppercase tracking-widest font-semibold text-xs transition-all" 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 size-3" />
              {t.contact.formSubmit}
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
