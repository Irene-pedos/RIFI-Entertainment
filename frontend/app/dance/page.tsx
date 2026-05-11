import type { Metadata } from "next"

import { FoundationPlaceholder } from "@/components/marketing/foundation-placeholder"
import { PageIntro } from "@/components/marketing/page-intro"

export const metadata: Metadata = {
  title: "RiFi Dance",
}

export default function DancePage() {
  return (
    <>
      <PageIntro
        eyebrow="Dance"
        title="Traditional and modern dance entertainment for events."
        description="This page will showcase RiFi's performance identity, entertainment packages, and future media gallery for live dance experiences."
      />
      <FoundationPlaceholder
        nextFocus={[
          "Performance categories and use cases",
          "Dance media gallery",
          "Entertainment booking CTA",
        ]}
      />
    </>
  )
}
