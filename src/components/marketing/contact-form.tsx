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
      <div className="bg-white/60 backdrop-blur-md p-8 rounded-md border border-border/60  text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-full bg-[#d68c90]/10 flex items-center justify-center shadow-inner">
            <CheckCircle2 className="size-10 text-[#d68c90]" />
          </div>
        </div>
        <h2 className="text-lg font-bold mb-2 tracking-tight text-[#2D4873] uppercase">{t.contact.successTitle || "Message Sent!"}</h2>
        <p className="text-xs font-medium text-muted-foreground mb-8 max-w-xs mx-auto uppercase tracking-tight">
          {t.contact.successMessage || "Thank you for contacting us. We will get back to you shortly."}
        </p>
        <Button onClick={() => setIsSubmitted(false)} className="rounded-md px-10 h-10 text-[10px] font-bold uppercase tracking-widest bg-[#2D4873] hover:bg-[#2D4873]/90">
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white/60 backdrop-blur-md p-6 sm:p-10 rounded-md border border-border/60 ">
      <h2 className="text-base font-bold mb-8 tracking-tight text-[#2D4873] uppercase tracking-[0.1em]">{t.contact.formTitle}</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">{t.contact.formName}</Label>
            <Input
              id="name"
              name="name"
              className="rounded-md border-border/60 bg-white/50 h-11 px-4 focus-visible:ring-1 focus-visible:ring-[#2D4873]/20"
              placeholder={t.contact.formNamePlaceholder}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">{t.contact.formEmail}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="rounded-md border-border/60 bg-white/50 h-11 px-4 focus-visible:ring-1 focus-visible:ring-[#2D4873]/20"
              placeholder={t.contact.formEmailPlaceholder}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">{t.contact.formSubject}</Label>
          <Input
            id="subject"
            name="subject"
            className="rounded-md border-border/60 bg-white/50 h-11 px-4 focus-visible:ring-1 focus-visible:ring-[#2D4873]/20"
            placeholder={t.contact.formSubjectPlaceholder}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D4873]">{t.contact.formMessage}</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            className="rounded-md border-border/60 bg-white/50 resize-none min-h-[140px] p-4 focus-visible:ring-1 focus-visible:ring-[#2D4873]/20"
            placeholder={t.contact.formMessagePlaceholder}
            required
            minLength={10}
          />
        </div>
        
        {mutation.error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
            {mutation.error.message}
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full h-12 rounded-md uppercase tracking-[0.2em] font-bold text-[11px] bg-[#2D4873] hover:bg-[#2D4873]/90" 
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
