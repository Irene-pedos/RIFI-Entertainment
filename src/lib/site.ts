export const siteConfig = {
  name: "RiFi Entertainment",
  shortName: "RiFi",
  logo: "/logo/RIFI logo.jpeg",
  description:
    "RiFi Entertainment is a Kigali-based entertainment and event company delivering weddings, model management, protocol services, dance performances, and travel support.",
  projectOverview:
    "RiFi Entertainment is a professional entertainment and event management company located in Kigali, Rwanda. The website provides information about the company, its services, galleries, booking options, and contact information.",
  tagline: "Creating unforgettable experiences with style and professionalism.",
  email: "rifientertainment7@gmail.com",
  phone: "0788878824",
  whatsapp: "0788878824",
  instagram: "https://www.instagram.com/rifi_entertainment?igsh=Y2hoMnFhc2hzeHY1",
  location: "Kigali, Rwanda",
  languages: [
    { code: "en", label: "ENG" },
    { code: "rw", label: "KINY" },
    { code: "fr", label: "FRENCH" },
  ],
  navItems: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/models", label: "Models" },
    { href: "/wedding", label: "Wedding" },
    { href: "/protocol-services", label: "Protocol Services" },
    { href: "/dance", label: "Dance" },
    { href: "/tours-travel", label: "Tours & Travel" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ],
  featuredServices: [
    {
      title: "Models Management",
      description:
        "Professional model coordination for fashion, commercial, event, and kids bookings.",
      href: "/models",
    },
    {
      title: "Wedding Organization",
      description:
        "Planning, decoration, coordination, and entertainment for unforgettable wedding days.",
      href: "/wedding",
    },
    {
      title: "Protocol Services",
      description:
        "Guest reception, VIP assistance, ushers, and hospitality support for structured events.",
      href: "/protocol-services",
    },
    {
      title: "Dance Entertainment",
      description:
        "Traditional and modern dance performances tailored to weddings, corporate events, and shows.",
      href: "/dance",
    },
    {
      title: "Tours & Travel",
      description:
        "Travel assistance, tour guiding, and booking support for visitors and local experiences.",
      href: "/tours-travel",
    },
  ],
  galleryPreview: [
    {
      title: "Wedding Moments",
      description:
        "Elegant ceremonies, decor, and coordinated celebration details.",
    },
    {
      title: "Event Experiences",
      description:
        "Hospitality, protocol management, and memorable guest-facing moments.",
    },
    {
      title: "Models & Performances",
      description:
        "Portfolio highlights, fashion presence, and dynamic dance showcases.",
    },
  ],
  testimonials: [
    {
      quote:
        "RiFi brought structure, style, and warmth to our event. The coordination felt professional from start to finish.",
      author: "Wedding Client",
    },
    {
      quote:
        "Their team handled guests with confidence and delivered an atmosphere that felt polished and welcoming.",
      author: "Corporate Event Organizer",
    },
    {
      quote:
        "From performance energy to event flow, RiFi helped make the experience memorable for everyone attending.",
      author: "Private Event Host",
    },
  ],
} as const

export type NavItem = (typeof siteConfig.navItems)[number]
