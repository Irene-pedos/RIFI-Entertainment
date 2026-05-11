"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export interface Gallery4Item {
  id: string
  title: string
  description: string
  href: string
  image: string
}

export interface Gallery4Props {
  title: string
  description: string
  items: Gallery4Item[]
}

const Gallery4 = ({ title, description, items }: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }

    updateSelection()
    carouselApi.on("select", updateSelection)

    return () => {
      carouselApi.off("select", updateSelection)
    }
  }, [carouselApi])

  return (
    <section className="py-6">
      <div className="mb-8 flex items-end justify-between md:mb-10">
        <div className="flex max-w-xl flex-col gap-4">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="text-sm leading-7 text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="disabled:pointer-events-auto"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            className="disabled:pointer-events-auto"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>

      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "start",
          breakpoints: {
            "(max-width: 768px)": {
              dragFree: true,
            },
          },
        }}
      >
        <CarouselContent className="-ml-3">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="max-w-[260px] pl-3 sm:max-w-[290px] lg:max-w-[310px]"
            >
              <a href={item.href} className="group block">
                <div className="relative min-h-[22rem] overflow-hidden border border-border/70 bg-card shadow-sm md:aspect-[5/4] lg:aspect-[4/5]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.32),hsl(var(--primary)/0.85)_100%)] mix-blend-multiply" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-5 text-primary-foreground md:p-6">
                    <div className="mb-2 pt-4 text-lg font-semibold">
                      {item.title}
                    </div>
                    <div className="mb-6 line-clamp-2 text-sm leading-6">
                      {item.description}
                    </div>
                    <div className="flex items-center text-sm">
                      Read more
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 transition-colors ${
              currentSlide === index ? "bg-primary" : "bg-primary/20"
            }`}
            onClick={() => carouselApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export { Gallery4 }
