"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "@/lib/i18n"

export function ContactForm() {
  const t = useTranslations()

  return (
    <div className="bg-secondary/30 backdrop-blur-sm p-8 rounded-lg border shadow-sm">
      <h2 className="text-2xl font-bold mb-6">{t.contact.formTitle}</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.contact.formName}</label>
            <input
              className="w-full p-2 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none"
              placeholder={t.contact.formNamePlaceholder}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.contact.formEmail}</label>
            <input
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
            className="w-full p-2 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none"
            placeholder={t.contact.formSubjectPlaceholder}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.contact.formMessage}</label>
          <textarea
            rows={4}
            className="w-full p-2 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none resize-none"
            placeholder={t.contact.formMessagePlaceholder}
            required
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          {t.contact.formSubmit}
        </Button>
      </form>
    </div>
  )
}
