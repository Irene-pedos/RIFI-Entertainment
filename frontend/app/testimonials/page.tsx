import type { Metadata } from "next"

import { FoundationPlaceholder } from "@/components/marketing/foundation-placeholder"
import { PageIntro } from "@/components/marketing/page-intro"

export const metadata: Metadata = {
  title: "Testimonials",
}

export default function TestimonialsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Testimonials"
        title="Customer trust, reviews, and success stories."
        description="This page will present social proof for RiFi services through structured testimonials, client feedback, and event success narratives."
      />
      <FoundationPlaceholder
        nextFocus={[
          "Testimonial card system",
          "Client categories and credibility markers",
          "Approval-ready review content",
        ]}
      />
    </>
  )
}
