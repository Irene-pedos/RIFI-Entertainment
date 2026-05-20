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
            <h2 className="text-xs font-bold mb-6 text-center lg:text-left tracking-[0.2em] uppercase text-muted-foreground">{t.contact.infoTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start p-5 rounded-md border border-border/60 bg-white/50 backdrop-blur-sm transition-all group hover:border-primary/30 hover:bg-white shadow-sm min-w-0"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#d68c90]/5 flex items-center justify-center mr-4 group-hover:bg-[#d68c90]/10 transition-colors shrink-0">
                    <item.icon className="h-5 w-5 text-[#d68c90]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className={cn(
                      "transition-colors break-all font-semibold tracking-tight text-primary",
                      item.label === t.common.email ? "text-[11px]" : "text-sm"
                    )}>
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="p-8 bg-primary/5 rounded-md border border-primary/10 backdrop-blur-sm">
            <h3 className="text-base font-bold mb-2 tracking-tight text-primary uppercase">{t.contact.quickSupportTitle}</h3>
            <p className="text-muted-foreground mb-6 text-xs leading-5">
              {t.contact.quickSupportText}
            </p>
            <Button asChild size="sm" className="w-full sm:w-auto rounded-md px-8 text-[10px] font-bold uppercase tracking-widest bg-primary hover:bg-primary/90">
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
      <div className="mt-16 rounded-md overflow-hidden border border-border/60 h-[400px] relative bg-primary/5 flex items-center justify-center group ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127606.32626244199!2d29.986503943359372!3d-1.93011399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca429ed30457d%3A0xfc44cde9ca511401!2sKigali!5e0!3m2!1sen!2srw!4v1715456000000!5m2!1sen!2srw"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale contrast-125 opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
        ></iframe>
        <div className="text-center z-10 pointer-events-none group-hover:opacity-0 transition-all duration-500 transform group-hover:translate-y-4">
          <div className="h-12 w-12 rounded-full bg-white  flex items-center justify-center mx-auto mb-4 border border-border/60">
            <MapPin className="h-6 w-6 text-[#d68c90]" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{t.contact.mapTitle}</h3>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{t.contact.location}</p>
        </div>
      </div>
    </div>
  )
}
