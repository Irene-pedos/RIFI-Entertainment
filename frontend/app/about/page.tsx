import type { Metadata } from "next"

import { FoundationPlaceholder } from "@/components/marketing/foundation-placeholder"
import { PageIntro } from "@/components/marketing/page-intro"

export const metadata: Metadata = {
  title: "About Us",
}

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About RiFi"
        title="Company story, credibility, and service philosophy."
        description="This section will present RiFi Entertainment's background, professionalism, team presence, and value proposition for clients in Rwanda and beyond."
      />
      <FoundationPlaceholder
        nextFocus={[
          "Founder's story and company mission",
          "Trust-building stats or milestones",
          "Professional team presentation",
        ]}
      />
    </>
  )
}
