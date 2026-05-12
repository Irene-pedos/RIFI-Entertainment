"use client"

import { Eye, Star, Target, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/marketing/page-intro"
import { useTranslations } from "@/lib/i18n"

export default function AboutPage() {
  const t = useTranslations()

  const values = [
    {
      icon: Star,
      label: t.about.values.excellence.label,
      description: t.about.values.excellence.description,
    },
    {
      icon: Users,
      label: t.about.values.professionalism.label,
      description: t.about.values.professionalism.description,
    },
    {
      icon: Target,
      label: t.about.values.reliability.label,
      description: t.about.values.reliability.description,
    },
    {
      icon: Eye,
      label: t.about.values.vision.label,
      description: t.about.values.vision.description,
    },
  ]

  return (
    <div className="container mx-auto px-4 pb-12">
      <PageIntro
        eyebrow={t.about.eyebrow}
        title={t.home.tagline}
        description={t.home.overview}
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Mission & Vision Section */}
        <div className="space-y-8">
          <div className="p-8 rounded-none border bg-secondary/30 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Target className="mr-3 text-primary h-6 w-6" /> {t.about.missionTitle}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.about.missionText}
            </p>
          </div>

          <div className="p-8 rounded-none border bg-secondary/30 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Eye className="mr-3 text-primary h-6 w-6" /> {t.about.visionTitle}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.about.visionText}
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div>
          <h2 className="text-lg font-bold mb-6 text-center lg:text-left">{t.about.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.label}
                className="p-6 rounded-none border bg-secondary/30 backdrop-blur-sm transition-colors group"
              >
                <value.icon className="h-8 w-8 mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-base mb-2">{value.label}</h3>
                <p className="text-muted-foreground text-xs">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-secondary/30 backdrop-blur-sm rounded-none border">
            <h3 className="text-base font-semibold mb-4">{t.about.workWithUsTitle}</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              {t.about.workWithUsText}
            </p>
            <Button asChild className="w-full sm:w-auto">
              <a href="/contact">{t.about.getInTouch}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="mt-16 p-12 rounded-none border bg-secondary/30 backdrop-blur-sm text-center">
        <h2 className="text-xl font-bold mb-6">{t.about.philosophyTitle}</h2>
        <p className="max-w-3xl mx-auto text-base text-muted-foreground leading-relaxed italic">
          {t.about.philosophyText}
        </p>
      </div>
    </div>
  )
}
