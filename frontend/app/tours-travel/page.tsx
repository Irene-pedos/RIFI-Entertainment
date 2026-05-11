import type { Metadata } from "next"

import { FoundationPlaceholder } from "@/components/marketing/foundation-placeholder"
import { PageIntro } from "@/components/marketing/page-intro"

export const metadata: Metadata = {
  title: "RiFi Tours & Travel",
}

export default function ToursTravelPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tours & Travel"
        title="Travel support, hotel booking, guided tours, and visitor assistance."
        description="This page will support RiFi's tours and travel services with package presentation, travel assistance details, and booking pathways."
      />
      <FoundationPlaceholder
        nextFocus={[
          "Tour package cards",
          "Travel assistance service breakdown",
          "Tour inquiry and booking form",
        ]}
      />
    </>
  )
}
