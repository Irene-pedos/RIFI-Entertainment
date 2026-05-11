import type { Metadata } from "next"

import { FoundationPlaceholder } from "@/components/marketing/foundation-placeholder"
import { PageIntro } from "@/components/marketing/page-intro"

export const metadata: Metadata = {
  title: "RiFi Models Management",
}

export default function ModelsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Models Management"
        title="Fashion, commercial, event, and kids model services."
        description="This page will become the hub for model showcases, client booking inquiries, and model application flows."
      />
      <FoundationPlaceholder
        nextFocus={[
          "Model categories and talent positioning",
          "Portfolio gallery structure",
          "Application and booking forms",
        ]}
      />
    </>
  )
}
