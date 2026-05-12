import type { Metadata } from "next"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { PageIntro } from "@/components/marketing/page-intro"
import { Gallery4 } from "@/components/ui/gallery4"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CtaCard } from "@/components/ui/cta-card"

export const metadata: Metadata = {
  title: "Gallery | RiFi Entertainment",
  description: "Explore our portfolio of weddings, events, professional models, and dance performances in Kigali.",
}

interface GalleryItem {
  id: string
  image: string
  title: string
  size: "small" | "medium" | "large"
}

const featuredItems = [
  {
    id: "f1",
    title: "Royal Wedding Gala",
    description: "Full-service wedding planning and coordination in Kigali.",
    href: "/wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "f2",
    title: "Fashion Week Portfolio",
    description: "Showcasing our top commercial and fashion models.",
    href: "/models",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
  },
  {
    id: "f3",
    title: "Traditional Dance Show",
    description: "Capturing the energy and culture of Rwanda.",
    href: "/dance",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "f4",
    title: "Corporate VIP Protocol",
    description: "Professional guest reception and hospitality management.",
    href: "/protocol-services",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
  },
]

const galleryData: Record<string, GalleryItem[]> = {
  weddings: [
    {
      id: "w1",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
      title: "Elegant Reception",
      size: "large",
    },
    {
      id: "w2",
      image: "https://images.unsplash.com/photo-1522673607200-164883212c2f?q=80&w=2072&auto=format&fit=crop",
      title: "Table Decor",
      size: "small",
    },
    {
      id: "w3",
      image: "https://images.unsplash.com/photo-1465495910483-343174124930?q=80&w=2070&auto=format&fit=crop",
      title: "Bridal Party",
      size: "small",
    },
    {
      id: "w4",
      image: "https://images.unsplash.com/photo-1519225495810-7517c31ca3f5?q=80&w=2070&auto=format&fit=crop",
      title: "The Ceremony",
      size: "medium",
    },
  ],
  events: [
    {
      id: "e1",
      image: "https://images.unsplash.com/photo-1475721027187-4024733923f6?q=80&w=2070&auto=format&fit=crop",
      title: "Gala Dinner",
      size: "medium",
    },
    {
      id: "e2",
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1924&auto=format&fit=crop",
      title: "VIP Protocol",
      size: "large",
    },
    {
      id: "e3",
      image: "https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?q=80&w=2070&auto=format&fit=crop",
      title: "Conference Support",
      size: "small",
    },
  ],
  models: [
    {
      id: "m1",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop",
      title: "Fashion Shoot",
      size: "large",
    },
    {
      id: "m2",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      title: "Commercial Model",
      size: "medium",
    },
    {
      id: "m3",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      title: "Male Portfolio",
      size: "small",
    },
  ],
  dance: [
    {
      id: "d1",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop",
      title: "Traditional Energy",
      size: "medium",
    },
    {
      id: "d2",
      image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1974&auto=format&fit=crop",
      title: "Stage Performance",
      size: "large",
    },
  ],
}

function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "group relative overflow-hidden border border-border/70 bg-card shadow-sm",
            item.size === "large" ? "sm:row-span-2 sm:h-[600px]" : "h-[300px]"
          )}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-lg font-semibold text-white">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function GalleryPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <div className="bg-muted/30">
        <PageIntro
          eyebrow="Gallery"
          title="Capturing the art of celebration and professional excellence."
          description="Browse through our diverse portfolio of weddings, corporate events, model management, and dynamic dance performances that define RiFi Entertainment."
        />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <Gallery4
          title="Featured Moments"
          description="A curated selection of our most impactful recent works across all our service departments."
          items={featuredItems}
        />
      </div>

      <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Explore by Category
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Dive deep into our specialized services and see how we bring vision to life across Rwanda.
            </p>
          </div>
        </div>

        <Tabs defaultValue="weddings" className="w-full">
          <TabsList variant="line" className="mb-8 border-b border-border/70 pb-0">
            <TabsTrigger value="weddings" className="px-6 py-3 text-sm">Weddings</TabsTrigger>
            <TabsTrigger value="events" className="px-6 py-3 text-sm">Protocol & Events</TabsTrigger>
            <TabsTrigger value="models" className="px-6 py-3 text-sm">Models Management</TabsTrigger>
            <TabsTrigger value="dance" className="px-6 py-3 text-sm">Dance & Shows</TabsTrigger>
          </TabsList>
          <TabsContent value="weddings">
            <GalleryGrid items={galleryData.weddings} />
          </TabsContent>
          <TabsContent value="events">
            <GalleryGrid items={galleryData.events} />
          </TabsContent>
          <TabsContent value="models">
            <GalleryGrid items={galleryData.models} />
          </TabsContent>
          <TabsContent value="dance">
            <GalleryGrid items={galleryData.dance} />
          </TabsContent>
        </Tabs>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <CtaCard
          imageSrc="https://images.unsplash.com/photo-1517457373958-b7bdd458ad20?q=80&w=2070&auto=format&fit=crop"
          imageAlt="RiFi Entertainment Event"
          title="Ready to create your own?"
          subtitle={
            <>
              Let&apos;s make your next event <br /> truly unforgettable.
            </>
          }
          description="Whether it's your dream wedding, a corporate gala, or professional model placement, RiFi Entertainment has the expertise to deliver excellence."
          buttonText="Contact Our Team"
          buttonHref="/contact"
        />
      </section>
    </div>
  )
}
