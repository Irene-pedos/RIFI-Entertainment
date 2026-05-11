import type { Metadata } from "next"

import { FoundationPlaceholder } from "@/components/marketing/foundation-placeholder"
import { PageIntro } from "@/components/marketing/page-intro"

export const metadata: Metadata = {
  title: "RiFi Wedding Organization",
}

export default function WeddingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Wedding Organization"
        title="Planning, coordination, entertainment, and event styling."
        description="This page is reserved for RiFi wedding services including planning, catering, decoration, live entertainment, and coordination."
      />
      <FoundationPlaceholder
        nextFocus={[
          "Wedding service packages",
          "Visual storytelling and gallery blocks",
          "Dedicated wedding booking flow",
        ]}
      />
    </>
  )
}
