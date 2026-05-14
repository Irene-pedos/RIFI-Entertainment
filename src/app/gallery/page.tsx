import type { Metadata } from "next"
import GalleryClient from "./gallery-client"

export const metadata: Metadata = {
  title: "Gallery | RiFi Entertainment",
  description: "Explore our portfolio of weddings, events, professional models, and dance performances in Kigali.",
}

export default function GalleryPage() {
  return <GalleryClient />
}
