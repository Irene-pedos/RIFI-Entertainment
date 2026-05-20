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
    <section className="py-4">
      <div className="mb-6 flex items-end justify-between md:mb-8">
        <div className="flex max-w-xl flex-col gap-3">
          <h2 className="font-heading text-lg font-semibold tracking-tight md:text-xl">
            {title}
          </h2>
          <p className="text-[11px] leading-5 text-muted-foreground md:text-xs">
            {description}
          </p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="disabled:pointer-events-auto"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            className="disabled:pointer-events-auto"
          >
            <ArrowRight className="size-4" />
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
              className="max-w-[240px] pl-3 sm:max-w-[260px] lg:max-w-[280px]"
            >
              <a href={item.href} className="group block">
                <div className="relative min-h-[18rem] overflow-hidden rounded-md border border-border/60 bg-card md:aspect-[5/4] lg:aspect-[4/5]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4 text-white md:p-5">
                    <div className="mb-1 text-base font-semibold">
                      {item.title}
                    </div>
                    <div className="mb-4 line-clamp-2 text-[10px] leading-5 text-white/90">
                      {item.description}
                    </div>
                    <div className="flex items-center text-[10px] font-medium uppercase tracking-wider">
                      Read more
                      <ArrowRight className="ml-1.5 size-3 transition-transform group-hover:translate-x-1" />
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
