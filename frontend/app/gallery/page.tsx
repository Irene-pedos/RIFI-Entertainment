import type { Metadata } from "next"

import { FoundationPlaceholder } from "@/components/marketing/foundation-placeholder"
import { PageIntro } from "@/components/marketing/page-intro"

export const metadata: Metadata = {
  title: "Gallery",
}

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Gallery"
        title="A future home for weddings, events, models, and performances."
        description="This page is scaffolded for RiFi visual media. It will later group wedding photos, event media, portfolios, and dance performance content."
      />
      <FoundationPlaceholder
        nextFocus={[
          "Image category structure",
          "Video and image presentation pattern",
          "Optimized media loading strategy",
        ]}
      />
    </>
  )
}
