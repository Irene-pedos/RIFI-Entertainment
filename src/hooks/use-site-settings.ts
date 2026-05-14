"use client";

import { trpc } from "@/lib/trpc";

export function useSiteSettings() {
  const { data: settings, isLoading } = trpc.siteSetting.getPublicSettings.useQuery();

  const getSetting = (key: string, defaultValue: string = "") => {
    return settings?.find((s) => s.key === key)?.value || defaultValue;
  };

  return {
    settings,
    isLoading,
    getSetting,
    businessEmail: getSetting("business_email", "rifientertainment7@gmail.com"),
    businessPhone: getSetting("business_phone", "0788878824"),
    businessWhatsapp: getSetting("business_whatsapp", "0788878824"),
    businessInstagram: getSetting("business_instagram", "https://www.instagram.com/rifi_entertainment?igsh=Y2hoMnFhc2hzeHY1"),
    businessTagline: getSetting("business_tagline", "Creating unforgettable experiences with style and professionalism."),
    businessLocation: getSetting("business_location", "Kigali, Rwanda"),
    businessDescription: getSetting("business_description", "RiFi Entertainment is a Kigali-based entertainment and event company delivering weddings, model management, protocol services, dance performances, and travel support."),
  };
}
