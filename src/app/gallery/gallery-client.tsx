"use client"

import * as React from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { PageIntro } from "@/components/marketing/page-intro"
import { Gallery4, type Gallery4Item } from "@/components/ui/gallery4"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CtaCard } from "@/components/ui/cta-card"
import { trpc } from "@/lib/trpc"
import type { AppRouter } from "@/server/api/root"
import type { inferRouterOutputs } from "@trpc/server"

type RouterOutputs = inferRouterOutputs<AppRouter>;
type MediaItem = RouterOutputs["media"]["list"][number];

function GalleryGrid({ items, isLoading }: { items: MediaItem[] | undefined, isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center border border-dashed border-border/70 text-muted-foreground">
        No images found in this category.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "group relative overflow-hidden border border-border/70 bg-card shadow-sm",
            index % 4 === 0 ? "sm:row-span-2 sm:h-[600px]" : "h-[300px]"
          )}
        >
          <Image
            src={item.publicUrl}
            alt={item.altText || item.originalName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-base font-semibold text-white">{item.altText || item.originalName}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function GalleryClient() {
  const { data: featuredItems, isLoading: isFeaturedLoading } = trpc.media.list.useQuery({ category: "GALLERY" })
  const { data: weddingItems, isLoading: isWeddingLoading } = trpc.media.list.useQuery({ serviceType: "WEDDING" })
  const { data: eventItems, isLoading: isEventLoading } = trpc.media.list.useQuery({ serviceType: "PROTOCOL" })
  const { data: modelItems, isLoading: isModelLoading } = trpc.media.list.useQuery({ serviceType: "MODELS" })
  const { data: danceItems, isLoading: isDanceLoading } = trpc.media.list.useQuery({ serviceType: "DANCE" })

  const formattedFeatured: Gallery4Item[] = featuredItems?.map(item => ({
    id: item.id,
    title: item.altText || "Featured Event",
    description: "Capturing excellence in every detail.",
    href: item.serviceType ? `/${item.serviceType.toLowerCase()}` : "/gallery",
    image: item.publicUrl
  })) || []

  return (
    <div className="flex flex-col gap-12 pb-20 md:gap-16">
      <div className="bg-muted/30">
        <PageIntro
          eyebrow="Gallery"
          title="Capturing the art of celebration and professional excellence."
          description="Browse through our diverse portfolio of weddings, corporate events, model management, and dynamic dance performances that define RiFi Entertainment."
        />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {isFeaturedLoading ? (
           <div className="flex h-64 items-center justify-center">
             <Loader2 className="size-8 animate-spin text-muted-foreground" />
           </div>
        ) : formattedFeatured.length > 0 && (
          <Gallery4
            title="Featured Moments"
            description="A curated selection of our most impactful recent works across all our service departments."
            items={formattedFeatured}
          />
        )}
      </div>

      <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:mb-10">
          <div className="max-w-xl">
            <h2 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
              Explore by Category
            </h2>
            <p className="mt-2 text-xs leading-6 text-muted-foreground md:text-sm">
              Dive deep into our specialized services and see how we bring vision to life across Rwanda.
            </p>
          </div>
        </div>

        <Tabs defaultValue="weddings" className="w-full">
          <TabsList variant="line" className="mb-8 border-b border-border/70 pb-0">
            <TabsTrigger value="weddings" className="px-6 py-3 text-xs uppercase tracking-widest font-semibold">Weddings</TabsTrigger>
            <TabsTrigger value="events" className="px-6 py-3 text-xs uppercase tracking-widest font-semibold">Protocol & Events</TabsTrigger>
            <TabsTrigger value="models" className="px-6 py-3 text-xs uppercase tracking-widest font-semibold">Models Management</TabsTrigger>
            <TabsTrigger value="dance" className="px-6 py-3 text-xs uppercase tracking-widest font-semibold">Dance & Shows</TabsTrigger>
          </TabsList>
          <TabsContent value="weddings">
            <GalleryGrid items={weddingItems} isLoading={isWeddingLoading} />
          </TabsContent>
          <TabsContent value="events">
            <GalleryGrid items={eventItems} isLoading={isEventLoading} />
          </TabsContent>
          <TabsContent value="models">
            <GalleryGrid items={modelItems} isLoading={isModelLoading} />
          </TabsContent>
          <TabsContent value="dance">
            <GalleryGrid items={danceItems} isLoading={isDanceLoading} />
          </TabsContent>
        </Tabs>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <CtaCard
          imageSrc="https://images.unsplash.com/photo-1517457373958-b7bdd458ad20?q=80&w=2070&auto=format&fit=crop"
          imageAlt="RiFi Entertainment Event"
          title="Ready to create your own?"
          subtitle={
            <span className="text-xl md:text-2xl">
              Let&apos;s make your next event <br /> truly unforgettable.
            </span>
          }
          description="Whether it's your dream wedding, a corporate gala, or professional model placement, RiFi Entertainment has the expertise to deliver excellence."
          buttonText="Contact Our Team"
          buttonHref="/contact"
        />
      </section>
    </div>
  )
}
