"use client"

import Image from "next/image"
import Link from "next/link"
import { MoveRight, PhoneCall } from "lucide-react"

import { Button } from "@/components/ui/button"

type HeroWithTextAndTwoButtonProps = {
  badge: string
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  backgroundImage: string
  backgroundAlt: string
}

function Hero1({
  badge,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  backgroundImage,
  backgroundAlt,
}: HeroWithTextAndTwoButtonProps) {
  return (
    <section className="-mt-28 min-h-screen w-full px-4 pt-28 pb-10 sm:-mt-32 sm:px-6 sm:pt-32 sm:pb-12 lg:px-8 lg:pt-36 lg:pb-14">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="relative flex min-h-[calc(100vh-8rem)] overflow-hidden border border-border/70 bg-card shadow-sm">
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt={backgroundAlt}
              fill
              priority
              className="object-cover object-center opacity-24"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(253,251,244,0.84),rgba(253,251,244,0.92),rgba(247,239,227,0.96))]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(177,82,31,0.14),transparent_24%,transparent_76%,rgba(109,143,118,0.14))]" />
          </div>

          <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 px-6 py-16 text-center sm:px-10 lg:px-16 lg:py-24">
            <div>
              <Button variant="secondary" size="sm" className="gap-3">
                {badge}
                <MoveRight className="size-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="max-w-3xl font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {description}
              </p>
            </div>

            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-3 border-border bg-background/90 px-6"
              >
                <a href={secondaryHref}>
                  {secondaryLabel}
                  <PhoneCall className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" className="gap-3 px-6">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <MoveRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero1 }
