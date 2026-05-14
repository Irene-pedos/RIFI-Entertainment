"use client"

import { Mail, MapPin, MessageSquare, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/marketing/page-intro"
import { ContactForm } from "@/components/marketing/contact-form"
import { useTranslations } from "@/lib/i18n"
import { useSiteSettings } from "@/hooks/use-site-settings"

export default function ContactPage() {
  const t = useTranslations()
  const { businessEmail, businessPhone, businessWhatsapp, businessLocation } = useSiteSettings()

  const contactInfo = [
    {
      icon: Phone,
      label: t.common.phone,
      value: businessPhone,
      href: `tel:${businessPhone}`,
    },
    {
      icon: Mail,
      label: t.common.email,
      value: businessEmail,
      href: `mailto:${businessEmail}`,
    },
    {
      icon: MapPin,
      label: t.common.location,
      value: businessLocation,
      href: `https://maps.google.com/?q=${encodeURIComponent(businessLocation)}`,
    },
    {
      icon: MessageSquare,
      label: t.common.whatsapp,
      value: businessWhatsapp,
      href: `https://wa.me/250${businessWhatsapp}`,
    },
  ]

  return (
    <div className="container mx-auto px-4 pb-12">
      <PageIntro
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        description={`${t.contact.description}\n\n${t.contact.secondaryDescription}`}
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information & Socials */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold mb-6 text-center">{t.contact.infoTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start p-4 rounded-none border bg-secondary/30 backdrop-blur-sm hover:border-primary transition-colors group min-w-0"
                >
                  <item.icon className="h-6 w-6 mr-4 text-primary shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className={cn(
                      "group-hover:text-primary transition-colors break-all",
                      item.label === t.common.email ? "text-xs" : "text-base"
                    )}>
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="p-6 bg-secondary/30 backdrop-blur-sm rounded-none border">
            <h3 className="text-base font-semibold mb-4">{t.contact.quickSupportTitle}</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              {t.contact.quickSupportText}
            </p>
            <Button asChild className="w-full sm:w-auto">
              <a href={`https://wa.me/250${businessWhatsapp}`} target="_blank" rel="noopener noreferrer">
                {t.contact.chatWhatsApp}
              </a>
            </Button>
          </div>
        </div>

        {/* Contact Form (Client Component) */}
        <ContactForm />
      </div>

      {/* Map Integration */}
      <div className="mt-16 rounded-none overflow-hidden border h-[400px] relative bg-secondary/30 backdrop-blur-sm flex items-center justify-center group">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127606.32626244199!2d29.986503943359372!3d-1.93011399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca429ed30457d%3A0xfc44cde9ca511401!2sKigali!5e0!3m2!1sen!2srw!4v1715456000000!5m2!1sen!2srw"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale contrast-125 opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
        ></iframe>
        <div className="text-center z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
          <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
          <h3 className="text-base font-semibold">{t.contact.mapTitle}</h3>
          <p className="text-muted-foreground text-sm">{t.contact.location}</p>
        </div>
      </div>
    </div>
  )
}
