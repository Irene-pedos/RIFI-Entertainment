"use client"

import * as React from "react"
import Image from "next/image"
import { Camera, Filter } from "lucide-react"

import { cn } from "@/lib/utils"
import { PageIntro } from "@/components/marketing/page-intro"
import { Gallery4, type Gallery4Item } from "@/components/ui/gallery4"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CtaCard } from "@/components/ui/cta-card"
import { trpc } from "@/lib/trpc"
import type { AppRouter } from "@/server/api/root"
import type { inferRouterOutputs } from "@trpc/server"
import { MediaCategory, ServiceCategory } from "@prisma/client"

type RouterOutputs = inferRouterOutputs<AppRouter>;
type MediaItem = RouterOutputs["media"]["list"][number];

const DEMO_MEDIA: Record<string, MediaItem[]> = {
  weddings: [
    {
      id: "demo-w1",
      publicUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200",
      altText: "Grand Reception Hall",
      originalName: "wedding-1.jpg",
      serviceType: ServiceCategory.WEDDING,
      category: MediaCategory.GALLERY,
      fileName: "demo-w1.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-w2",
      publicUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
      altText: "Traditional Rwandan Wedding Celebration",
      originalName: "wedding-2.jpg",
      serviceType: ServiceCategory.WEDDING,
      category: MediaCategory.GALLERY,
      fileName: "demo-w2.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-w3",
      publicUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
      altText: "Elegant Garden Ceremony",
      originalName: "wedding-3.jpg",
      serviceType: ServiceCategory.WEDDING,
      category: MediaCategory.GALLERY,
      fileName: "demo-w3.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-w4",
      publicUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200",
      altText: "The Perfect Ring Exchange",
      originalName: "wedding-4.jpg",
      serviceType: ServiceCategory.WEDDING,
      category: MediaCategory.GALLERY,
      fileName: "demo-w4.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-w5",
      publicUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&q=80&w=1200",
      altText: "Sunset Vows",
      originalName: "wedding-5.jpg",
      serviceType: ServiceCategory.WEDDING,
      category: MediaCategory.GALLERY,
      fileName: "demo-w5.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-w6",
      publicUrl: "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=1200",
      altText: "Champagne Toast",
      originalName: "wedding-6.jpg",
      serviceType: ServiceCategory.WEDDING,
      category: MediaCategory.GALLERY,
      fileName: "demo-w6.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
  ],
  events: [
    {
      id: "demo-e1",
      publicUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
      altText: "Professional Event Hosting",
      originalName: "event-1.jpg",
      serviceType: ServiceCategory.PROTOCOL,
      category: MediaCategory.GALLERY,
      fileName: "demo-e1.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-e2",
      publicUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200",
      altText: "Corporate Conference Management",
      originalName: "event-2.jpg",
      serviceType: ServiceCategory.PROTOCOL,
      category: MediaCategory.GALLERY,
      fileName: "demo-e2.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-e3",
      publicUrl: "https://images.unsplash.com/photo-1540575861501-7c908107939a?auto=format&fit=crop&q=80&w=1200",
      altText: "VIP Guest Reception",
      originalName: "event-3.jpg",
      serviceType: ServiceCategory.PROTOCOL,
      category: MediaCategory.GALLERY,
      fileName: "demo-e3.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-e4",
      publicUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      altText: "Event Coordination Excellence",
      originalName: "event-4.jpg",
      serviceType: ServiceCategory.PROTOCOL,
      category: MediaCategory.GALLERY,
      fileName: "demo-e4.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
  ],
  models: [
    {
      id: "demo-m1",
      publicUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
      altText: "High Fashion Editorial",
      originalName: "model-1.jpg",
      serviceType: ServiceCategory.MODELS,
      category: MediaCategory.GALLERY,
      fileName: "demo-m1.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-m2",
      publicUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
      altText: "Commercial Brand Campaign",
      originalName: "model-2.jpg",
      serviceType: ServiceCategory.MODELS,
      category: MediaCategory.GALLERY,
      fileName: "demo-m2.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-m3",
      publicUrl: "https://images.unsplash.com/photo-1529139513477-323c66b8ad51?auto=format&fit=crop&q=80&w=1200",
      altText: "Runway Presence",
      originalName: "model-3.jpg",
      serviceType: ServiceCategory.MODELS,
      category: MediaCategory.GALLERY,
      fileName: "demo-m3.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-m4",
      publicUrl: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=1200",
      altText: "Lifestyle Representation",
      originalName: "model-4.jpg",
      serviceType: ServiceCategory.MODELS,
      category: MediaCategory.GALLERY,
      fileName: "demo-m4.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
  ],
  dance: [
    {
      id: "demo-d1",
      publicUrl: "https://images.unsplash.com/photo-1504609773096-104ff2e818cf?auto=format&fit=crop&q=80&w=1200",
      altText: "Traditional Performance Energy",
      originalName: "dance-1.jpg",
      serviceType: ServiceCategory.DANCE,
      category: MediaCategory.GALLERY,
      fileName: "demo-d1.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-d2",
      publicUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200",
      altText: "Contemporary Fusion",
      originalName: "dance-2.jpg",
      serviceType: ServiceCategory.DANCE,
      category: MediaCategory.GALLERY,
      fileName: "demo-d2.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-d3",
      publicUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200",
      altText: "Stage Presence & Power",
      originalName: "dance-3.jpg",
      serviceType: ServiceCategory.DANCE,
      category: MediaCategory.GALLERY,
      fileName: "demo-d3.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
    {
      id: "demo-d4",
      publicUrl: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&q=80&w=1200",
      altText: "Modern Choreography",
      originalName: "dance-4.jpg",
      serviceType: ServiceCategory.DANCE,
      category: MediaCategory.GALLERY,
      fileName: "demo-d4.jpg",
      mimeType: "image/jpeg",
      fileSize: 0,
      storagePath: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedById: null,
    } as unknown as MediaItem,
  ],
};

function GalleryGrid({ items, isLoading, category }: { items: MediaItem[] | undefined, isLoading: boolean, category: string }) {
  const combinedItems = React.useMemo(() => {
    const dbItems = items || [];
    const demoItems = DEMO_MEDIA[category] || [];
    
    // Combine items, keeping DB items first
    // Filter out duplicates if any (by id)
    const all = [...dbItems, ...demoItems];
    const uniqueIds = new Set();
    return all.filter(item => {
      if (uniqueIds.has(item.id)) return false;
      uniqueIds.add(item.id);
      return true;
    });
  }, [items, category]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[350px] rounded-md bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (combinedItems.length === 0) {
    return (
      <div className="flex h-80 flex-col items-center justify-center border border-dashed border-border/60 rounded-md bg-primary/5 text-muted-foreground transition-all">
        <Camera className="size-8 text-primary/20 mb-4" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Our lens is waiting for the next moment</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {combinedItems.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "group relative overflow-hidden border border-border/60 bg-card rounded-md shadow-sm transition-all hover:border-primary/30",
            index % 5 === 0 ? "lg:col-span-2 lg:h-[450px]" : "h-[350px]"
          )}
        >
          <Image
            src={item.publicUrl}
            alt={item.altText || item.originalName}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* Overlay with bottom dimming for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-6 bg-[#D9515F]" />
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D9515F]">Moment Captured</p>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight leading-tight uppercase">{item.altText || item.originalName}</h3>
            <p className="text-[10px] text-white/60 mt-2 uppercase tracking-widest font-medium">RiFi Entertainment &copy;</p>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-4 right-4 size-8 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

  const formattedFeatured: Gallery4Item[] = React.useMemo(() => {
    const dbItems = featuredItems?.map(item => ({
      id: item.id,
      title: item.altText || "Featured Event",
      description: "Experience the standard of excellence.",
      href: item.serviceType ? `/${item.serviceType.toLowerCase()}` : "/gallery",
      image: item.publicUrl
    })) || [];

    if (dbItems.length > 0) return dbItems;

    // Fallback featured items if DB is empty
    return [
      {
        id: "feat-1",
        title: "The Royal Wedding",
        description: "A celebration of love and heritage in Kigali.",
        href: "/wedding",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1600"
      },
      {
        id: "feat-2",
        title: "Corporate Excellence",
        description: "Professional protocol for international delegations.",
        href: "/protocol-services",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600"
      }
    ];
  }, [featuredItems]);

  return (
    <div className="flex flex-col gap-16 pb-24">
      {/* Header Section */}
      <div className="bg-primary/5 border-b border-border/60">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <PageIntro
            eyebrow="Gallery"
            title="A visual journey through our finest work."
            description="From the intimate details of a dream wedding to the high-energy pulse of our dance performances, explore how RiFi Entertainment brings vision to life."
            containerClassName="py-12 md:py-16"
          />
        </div>
      </div>

      {/* Featured Slider Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border/60" />
                <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary/60">Highlights</h2>
                <div className="h-px flex-1 bg-border/60" />
            </div>
            {isFeaturedLoading ? (
                <div className="h-[450px] rounded-md bg-muted animate-pulse" />
            ) : formattedFeatured.length > 0 ? (
                <Gallery4
                    title="Spotlight Performances"
                    description="Our most impactful recent collaborations and productions."
                    items={formattedFeatured}
                />
            ) : null}
        </div>
      </section>

      {/* Categorized Grid Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 text-secondary">
                <Filter className="size-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Filter Portfolio</span>
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary uppercase">
              Explore our expertise
            </h2>
          </div>
        </div>

        <Tabs defaultValue="weddings" className="w-full">
          <TabsList variant="line" className="mb-12 border-b border-border/60 pb-0 flex-wrap h-auto gap-8 justify-start bg-transparent">
            <TabsTrigger value="weddings" className="px-0 py-4 text-[10px] uppercase tracking-[0.25em] font-bold text-primary/40 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-secondary rounded-none transition-all">Weddings</TabsTrigger>
            <TabsTrigger value="events" className="px-0 py-4 text-[10px] uppercase tracking-[0.25em] font-bold text-primary/40 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-secondary rounded-none transition-all">Protocol</TabsTrigger>
            <TabsTrigger value="models" className="px-0 py-4 text-[10px] uppercase tracking-[0.25em] font-bold text-primary/40 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-secondary rounded-none transition-all">Talent</TabsTrigger>
            <TabsTrigger value="dance" className="px-0 py-4 text-[10px] uppercase tracking-[0.25em] font-bold text-primary/40 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-secondary rounded-none transition-all">Performances</TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            <TabsContent value="weddings" className="mt-0 focus-visible:outline-none">
                <GalleryGrid items={weddingItems} isLoading={isWeddingLoading} category="weddings" />
            </TabsContent>
            <TabsContent value="events" className="mt-0 focus-visible:outline-none">
                <GalleryGrid items={eventItems} isLoading={isEventLoading} category="events" />
            </TabsContent>
            <TabsContent value="models" className="mt-0 focus-visible:outline-none">
                <GalleryGrid items={modelItems} isLoading={isModelLoading} category="models" />
            </TabsContent>
            <TabsContent value="dance" className="mt-0 focus-visible:outline-none">
                <GalleryGrid items={danceItems} isLoading={isDanceLoading} category="dance" />
            </TabsContent>
          </div>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <CtaCard
            title="Next Step"
            subtitle="Ready to create your own memories?"
            description="Let's collaborate to make your next event truly unforgettable. From intimate weddings to high-profile protocol, we have the expertise you need."
            buttonText="Contact Our Team"
            buttonHref="/contact"
            imageSrc="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
            imageAlt="RiFi Entertainment"
            className="border-border/60"
        />
      </section>
    </div>
  )
}
