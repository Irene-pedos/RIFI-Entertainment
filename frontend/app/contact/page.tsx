import type { Metadata } from "next"

import { FoundationPlaceholder } from "@/components/marketing/foundation-placeholder"
import { PageIntro } from "@/components/marketing/page-intro"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact Us",
}

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Direct communication channels are defined and ready for the next phase."
        description={`RiFi Entertainment is based in ${siteConfig.location}. This page will become the main entry point for inquiries, bookings, maps, and WhatsApp engagement.`}
      />
      <FoundationPlaceholder
        nextFocus={[
          "Contact and booking form",
          "Google Maps and social links",
          "WhatsApp-first response path",
        ]}
      />
    </>
  )
}
