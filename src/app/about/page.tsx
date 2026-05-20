"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CtaCard } from "@/components/ui/cta-card"
import { PageIntro } from "@/components/marketing/page-intro"
import { useTranslations } from "@/lib/i18n"
import { useSiteSettings } from "@/hooks/use-site-settings"

export default function AboutPage() {
  const t = useTranslations()
  const { businessTagline, businessDescription, isLoading } = useSiteSettings()

  const values = [
    {
      label: t.about.values.excellence.label,
      description: t.about.values.excellence.description,
    },
    {
      label: t.about.values.professionalism.label,
      description: t.about.values.professionalism.description,
    },
    {
      label: t.about.values.reliability.label,
      description: t.about.values.reliability.description,
    },
    {
      label: t.about.values.vision.label,
      description: t.about.values.vision.description,
    },
  ]

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pb-20 pt-10">
        <div className="space-y-4 max-w-2xl">
          <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
          <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
          <div className="h-20 w-full bg-muted animate-pulse rounded-md" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Hero Section */}
      <div className="bg-primary/5 border-b border-border/60">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <PageIntro
            eyebrow={t.about.eyebrow}
            title={businessTagline}
            description={businessDescription}
            containerClassName="py-12 md:py-16"
          />
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
              Crafting experiences that resonate and inspire.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              At RiFi Entertainment, we don&apos;t just manage events; we design atmospheres. Our commitment to excellence in modeling, weddings, and cultural performance is what sets us apart in Kigali.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-md border border-border/60 shadow-none">
              <CardHeader>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Our Mission</div>
                <CardTitle className="text-lg font-bold tracking-tight text-primary">{t.about.missionTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.missionText}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-md border border-border/60 shadow-none">
              <CardHeader>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Our Vision</div>
                <CardTitle className="text-lg font-bold tracking-tight text-primary">{t.about.visionTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.about.visionText}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div>
          <div className="mb-8 space-y-2">
             <h2 className="text-2xl font-bold tracking-tight text-primary uppercase">{t.about.valuesTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value) => (
              <Card key={value.label} className="rounded-md border border-border/60 shadow-none">
                <CardHeader>
                  <CardTitle className="font-bold text-sm tracking-tight text-primary">{value.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <Card className="rounded-md border border-border/60 shadow-none">
          <CardHeader>
            <CardTitle className="text-lg font-bold tracking-[0.1em] uppercase text-primary">{t.about.philosophyTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic font-serif">
              &ldquo;{t.about.philosophyText}&rdquo;
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Join Us CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <CtaCard
          title={t.about.workWithUsTitle}
          subtitle={t.about.workWithUsTitle}
          description={t.about.workWithUsText}
          buttonText={t.about.getInTouch}
          buttonHref="/contact"
          imageSrc="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
          imageAlt="RiFi Entertainment"
          className="border-border/60"
        />
      </section>
    </div>
  )
}
