"use client"

import * as React from "react"
import nextDynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const ContactContent = nextDynamic(() => import("./contact-client"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 pb-12 pt-28">
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-full max-w-2xl" />
      </div>
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
             <Skeleton className="h-32 rounded-md" />
             <Skeleton className="h-32 rounded-md" />
             <Skeleton className="h-32 rounded-md" />
             <Skeleton className="h-32 rounded-md" />
           </div>
        </div>
        <Skeleton className="h-[500px] rounded-md" />
      </div>
    </div>
  )
})

export default function ContactPage() {
  return <ContactContent />
}
