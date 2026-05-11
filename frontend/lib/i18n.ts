import { useMemo } from "react"
import { useSearchParams, type ReadonlyURLSearchParams } from "next/navigation"

import { siteConfig } from "@/lib/site"

export type LanguageCode = (typeof siteConfig.languages)[number]["code"]

const defaultLanguage: LanguageCode = "en"

export const translations = {
  en: {
    nav: {
      "/": "Home",
      "/about": "About",
      "/models": "Models",
      "/wedding": "Wedding",
      "/protocol-services": "Protocol Services",
      "/dance": "Dance",
      "/tours-travel": "Tours & Travel",
      "/gallery": "Gallery",
      "/testimonials": "Testimonials",
      "/contact": "Contact",
    },
    common: {
      contactUs: "Contact Us",
      whatsapp: "WhatsApp",
      explore: "Explore",
      contact: "Contact",
      location: "Location",
      phone: "Phone",
      email: "Email",
    },
    footer: {
      description:
        "Professional entertainment, events, hospitality, and travel support for clients in Kigali and beyond.",
    },
    home: {
      welcome: "Welcome to RiFi Entertainment",
      heroTitle:
        "Professional entertainment and event experiences for Kigali and beyond.",
      tagline:
        "Creating unforgettable experiences with style and professionalism.",
      heroBadge: "RiFi Entertainment",
      overview:
        "RiFi Entertainment is a professional entertainment and event management company located in Kigali, Rwanda. The website provides information about the company, its services, galleries, booking options, and contact information.",
      bookService: "Book a Service",
      viewGallery: "View Gallery",
      callUs: "Call Us",
      experienceEyebrow: "RiFi Experience",
      experienceTitle:
        "Events shaped with structure, hospitality, and memorable energy.",
      basedIn: "Based In",
      coreFocus: "Core Focus",
      coreFocusText: "Bookings, experiences, and client trust.",
      featuredEyebrow: "Featured Services",
      featuredTitle:
        "Service areas designed to support celebrations, brands, and guest experiences.",
      featuredDescription:
        "RiFi Entertainment combines event planning, talent coordination, hospitality support, and travel services under one professional brand.",
      serviceLabel: "Service",
      exploreService: "Explore Service",
      services: [
        {
          title: "Models Management",
          description:
            "Professional model coordination for fashion, commercial, event, and kids bookings.",
        },
        {
          title: "Wedding Organization",
          description:
            "Planning, decoration, coordination, and entertainment for unforgettable wedding days.",
        },
        {
          title: "Protocol Services",
          description:
            "Guest reception, VIP assistance, ushers, and hospitality support for structured events.",
        },
        {
          title: "Dance Entertainment",
          description:
            "Traditional and modern dance performances tailored to weddings, corporate events, and shows.",
        },
        {
          title: "Tours & Travel",
          description:
            "Travel assistance, tour guiding, and booking support for visitors and local experiences.",
        },
      ],
      galleryEyebrow: "Gallery Preview",
      galleryTitle:
        "A visual story across weddings, events, models, and performance.",
      galleryDescription:
        "The full gallery will highlight the atmosphere, styling, coordination, and live entertainment that define RiFi experiences.",
      openGallery: "Open Full Gallery",
      galleryItems: [
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
        {
          title: "Protocol & Hospitality",
          description:
            "Professional ushers and guest reception management for all events.",
        },
        {
          title: "Traditional Dance",
          description:
            "Capturing the energy and culture of authentic Rwandan performances.",
        },
        {
          title: "Tours & Local Travel",
          description:
            "Scenic visits and guided experiences across the land of a thousand hills.",
        },
      ],
      testimonialsEyebrow: "Testimonials",
      testimonialsTitle:
        "Client confidence is built through delivery, care, and presence.",
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
      contactEyebrow: "Contact Details",
      contactTitle: "Start planning with RiFi Entertainment.",
      contactDescription:
        "Reach out for entertainment bookings, weddings, hospitality support, travel arrangements, or general inquiries.",
      ctaEyebrow: "Call To Action",
      ctaTitle: "Let's create an experience your guests will remember.",
      ctaDescription:
        "Use the contact page to begin your booking inquiry or message the RiFi team directly for quick assistance.",
      contactRifi: "Contact RiFi",
      whatsappUs: "WhatsApp Us",
    },
    protocol: {
      eyebrow: "Protocol & Services",
      title:
        "Professional guest handling and event protocol designed to keep every experience organized.",
      description:
        "RiFi Protocol & Services supports weddings, corporate functions, private celebrations, and formal gatherings with clear coordination, polished hospitality, and disciplined front-of-house service.",
      bookSupport: "Book Protocol Support",
      call: "Call",
      services: [
        {
          title: "Guest Reception",
          description:
            "Warm and organized guest arrival handling, registration flow, direction support, and first-contact hospitality for private and corporate events.",
        },
        {
          title: "Event Coordination",
          description:
            "On-site coordination for schedules, guest movement, vendor timing, and smooth communication between the host team and service providers.",
        },
        {
          title: "VIP Services",
          description:
            "Professional support for VIP guests, priority handling, reserved access guidance, and discreet high-standard service during events.",
        },
        {
          title: "Professional Ushers",
          description:
            "Well-presented ushers to guide guests, manage seating, support venue flow, and help maintain an orderly event environment.",
        },
        {
          title: "Hospitality Management",
          description:
            "Structured hospitality oversight for guest comfort, service experience, presentation quality, and front-facing event professionalism.",
        },
      ],
      whyTitle: "Why RiFi",
      whySubtitle:
        "A protocol team should reduce confusion, not add more movement.",
      whyDescription:
        "RiFi focuses on disciplined guest-facing service. That means clear reception flow, confident ushering, visible coordination, and professional handling of VIP expectations throughout the event.",
      bestFitTitle: "Best Fit",
      bestFitItems: [
        "Weddings and receptions",
        "Corporate functions and conferences",
        "Brand launches and public events",
        "VIP gatherings and formal ceremonies",
      ],
      howWeWorkTitle: "How We Work",
      howWeWorkSubtitle:
        "Clear preparation before the event, visible control during the event.",
      processItems: [
        "We review the event type, audience, venue flow, and protocol expectations.",
        "We define service roles for reception, ushering, coordination, and VIP handling.",
        "We deliver a visible, disciplined front-of-house experience during the event.",
      ],
      contactEyebrow: "Contact RiFi",
      contactTitle: "Need front-of-house support for an upcoming event?",
      contactDescription:
        "Contact RiFi Entertainment for protocol planning, usher support, VIP guest handling, and event hospitality management in Kigali, Rwanda.",
      requestService: "Request Service",
      whatsappUs: "WhatsApp Us",
    },
  },
  rw: {
    nav: {
      "/": "Ahabanza",
      "/about": "Abo Turi Bo",
      "/models": "Abamodeli",
      "/wedding": "Ubukwe",
      "/protocol-services": "Protocol",
      "/dance": "Imbyino",
      "/tours-travel": "Ingendo",
      "/gallery": "Amafoto",
      "/testimonials": "Ubuhamya",
      "/contact": "Twandikire",
    },
    common: {
      contactUs: "Twandikire",
      whatsapp: "WhatsApp",
      explore: "Sura",
      contact: "Twandikire",
      location: "Aho Duherereye",
      phone: "Telefoni",
      email: "Imeli",
    },
    footer: {
      description:
        "Imyidagaduro y'umwuga, ibirori, hospitality, na serivisi z'ingendo ku bakiliya bo i Kigali no hanze yaho.",
    },
    home: {
      welcome: "Murakaza neza muri RiFi Entertainment",
      heroTitle:
        "Imyidagaduro n'ibirori bikorwa kinyamwuga ku bakiliya bo i Kigali no hanze yaho.",
      tagline:
        "Creating unforgettable experiences with style and professionalism.",
      heroBadge: "RiFi Entertainment",
      overview:
        "RiFi Entertainment ni ikigo cy'umwuga gikora ibijyanye n'imyidagaduro no gutegura ibirori giherereye i Kigali, mu Rwanda. Urubuga rutanga amakuru ku kigo, serivisi zacyo, amafoto, uburyo bwo gufata booking, n'uburyo bwo kutwandikira.",
      bookService: "Fata Serivisi",
      viewGallery: "Reba Amafoto",
      callUs: "Duhamagare",
      experienceEyebrow: "Uburambe bwa RiFi",
      experienceTitle:
        "Ibirori bishingiye ku mitegurire, hospitality, no gusigira abitabiriye urwibutso rwiza.",
      basedIn: "Dukorera",
      coreFocus: "Icyo Twibandaho",
      coreFocusText: "Booking, uburambe bwiza, n'icyizere cy'abakiliya.",
      featuredEyebrow: "Serivisi Z'ingenzi",
      featuredTitle:
        "Serivisi ziteguwe gushyigikira ibirori, ibigo, n'uburambe bw'abashyitsi.",
      featuredDescription:
        "RiFi Entertainment ihuza itegurwa ry'ibirori, guhuza impano, hospitality, n'ingendo munsi y'ikirango kimwe kinyamwuga.",
      serviceLabel: "Serivisi",
      exploreService: "Reba Serivisi",
      services: [
        {
          title: "Gucunga Abamodeli",
          description:
            "Guhuza abamodeli b'umwuga ku moda, kwamamaza, events, n'abana.",
        },
        {
          title: "Gutegura Ubukwe",
          description:
            "Igenamigambi, decoration, coordination, n'imyidagaduro y'ubukwe butazibagirana.",
        },
        {
          title: "Protocol Services",
          description:
            "Kwakira abashyitsi, VIP assistance, ushers, na hospitality ku birori biteguwe neza.",
        },
        {
          title: "Imyidagaduro y'Imbyino",
          description:
            "Imbyino gakondo n'iza kijyambere zikwiriye ubukwe, corporate events, n'ibitaramo.",
        },
        {
          title: "Ingendo n'Ubukerarugendo",
          description:
            "Travel assistance, tour guiding, na booking support ku bashyitsi n'ubukerarugendo.",
        },
      ],
      galleryEyebrow: "Icyerekezo cy'Amafoto",
      galleryTitle:
        "Inkuru y'amashusho ku bukwe, events, abamodeli, n'ibitaramo.",
      galleryDescription:
        "Gallery yuzuye izerekana ambiance, decoration, coordination, n'imyidagaduro ya RiFi.",
      openGallery: "Fungura Gallery Yose",
      galleryItems: [
        {
          title: "Ibihe by'Ubukwe",
          description:
            "Ceremonies nziza, decor, n'ibisobanuro by'ibirori biteguwe neza.",
        },
        {
          title: "Uburambe bwa Event",
          description:
            "Hospitality, protocol management, n'ibihe byiza ku bashyitsi.",
        },
        {
          title: "Abamodeli n'Ibitaramo",
          description:
            "Portfolio highlights, fashion presence, n'imbyino zigaragaza imbaraga.",
        },
        {
          title: "Protocol na Hospitality",
          description:
            "Abakira abantu n'ushers b'umwuga kuri event zose.",
        },
        {
          title: "Imbyino Gakondo",
          description:
            "Imbaraga n'umuco mu mbyino nyarwanda z'umwimerere.",
        },
        {
          title: "Ingero n'Ingendo",
          description:
            "Gusura ibice bitandukanye by'igihugu cy'imisozi igihumbi.",
        },
      ],
      testimonialsEyebrow: "Ubuhamya",
      testimonialsTitle:
        "Icyizere cy'abakiliya cyubakwa n'itangwa rya serivisi, kwita ku bakiliya, n'ubunyamwuga.",
      testimonials: [
        {
          quote:
            "RiFi yazanye gahunda, style, n'ubushyuhe mu birori byacu. Coordination yabo yari iy'umwuga kuva ku ntangiriro kugeza ku musozo.",
          author: "Umukiliya w'Ubukwe",
        },
        {
          quote:
            "Itsinda ryabo ryakiriye abashyitsi rifite icyizere kandi ritanga atmosphere iteguye neza kandi ituje.",
          author: "Umutegura wa Corporate Event",
        },
        {
          quote:
            "Kuva ku mbaraga z'ibitaramo kugeza ku mikorere y'event, RiFi yafashije gutuma abitabiriye bose bibuka uwo munsi.",
          author: "Uwateguye Ibirori by'Umuryango",
        },
      ],
      contactEyebrow: "Amakuru y'Itumanaho",
      contactTitle: "Tangira igenamigambi na RiFi Entertainment.",
      contactDescription:
        "Twandikire ku booking z'imyidagaduro, ubukwe, hospitality support, ingendo, cyangwa ibindi bibazo.",
      ctaEyebrow: "Igikorwa",
      ctaTitle: "Dukore uburambe abashyitsi bawe bazahora bibuka.",
      ctaDescription:
        "Koresha urupapuro rwo kutwandikira utangire booking inquiry cyangwa wandikire itsinda rya RiFi vuba.",
      contactRifi: "Vugisha RiFi",
      whatsappUs: "Twandikire kuri WhatsApp",
    },
    protocol: {
      eyebrow: "Serivisi za Protocol",
      title:
        "Kwakira abashyitsi kinyamwuga no gushyira ibintu kuri gahunda kugira ngo buri wese agubwe neza.",
      description:
        "RiFi Protocol & Services ifasha mu bukwe, inama z'ibigo, ibirori by'umuryango, n'ibitaramo bitandukanye hakoreshejwe coordination isobanutse, hospitality nziza, na serivisi ikorwa neza.",
      bookSupport: "Fata Serivisi ya Protocol",
      call: "Hamagara",
      services: [
        {
          title: "Kwakira Abashyitsi",
          description:
            "Warm and organized guest arrival handling, registration flow, direction support, and first-contact hospitality for private and corporate events.",
        },
        {
          title: "Guhuza Ibirori",
          description:
            "On-site coordination for schedules, guest movement, vendor timing, and smooth communication between the host team and service providers.",
        },
        {
          title: "Serivisi za VIP",
          description:
            "Professional support for VIP guests, priority handling, reserved access guidance, and discreet high-standard service during events.",
        },
        {
          title: "Ushers b'Umwuga",
          description:
            "Well-presented ushers to guide guests, manage seating, support venue flow, and help maintain an orderly event environment.",
        },
        {
          title: "Gucunga Hospitality",
          description:
            "Structured hospitality oversight for guest comfort, service experience, presentation quality, and front-facing event professionalism.",
        },
      ],
      whyTitle: "Kuki RiFi",
      whySubtitle:
        "Itsinda rya protocol rigomba kugabanya akavuyo, aho kongera urujya n'uruza.",
      whyDescription:
        "RiFi yibanda kuri serivisi ikorwa mu kinyabupfura. Ibyo bivuze kwakira abantu neza, kubayobora bafite icyizere, guhuza ibikorwa bigaragara, no kwita ku banyacyubahiro (VIP) kinyamwuga.",
      bestFitTitle: "Ibirori Bikwiriye",
      bestFitItems: [
        "Ubukwe n'ibirori byabwo",
        "Inama z'ibigo bitandukanye",
        "Kwerekana ibicuruzwa bishya",
        "Ibirori by'abanyacyubahiro",
      ],
      howWeWorkTitle: "Imikorere Yacu",
      howWeWorkSubtitle:
        "Kwitegura neza mbere ya event, no kugenzura ibikorwa mu gihe cya event.",
      processItems: [
        "Dusuzuma ubwoko bwa event, abayizamo, uko aho iri hateye, n'uko protocol igomba kuba imeze.",
        "Twerekana inshingano z'abakira abantu, ushers, coordination, na serivisi za VIP.",
        "Dutanga serivisi nziza kandi irangwa n'ikinyabupfura mu gihe cya event.",
      ],
      contactEyebrow: "Vugisha RiFi",
      contactTitle: "Ukenera serivisi za protocol kuri event yawe itaha?",
      contactDescription:
        "Vugisha RiFi Entertainment ku itegurwa rya protocol, ushers, kwakira abanyacyubahiro, na hospitality i Kigali mu Rwanda.",
      requestService: "Saba Serivisi",
      whatsappUs: "Twandikire kuri WhatsApp",
    },
  },
  fr: {
    nav: {
      "/": "Accueil",
      "/about": "A Propos",
      "/models": "Modeles",
      "/wedding": "Mariage",
      "/protocol-services": "Protocole",
      "/dance": "Danse",
      "/tours-travel": "Tours & Voyages",
      "/gallery": "Galerie",
      "/testimonials": "Temoignages",
      "/contact": "Contact",
    },
    common: {
      contactUs: "Contactez-nous",
      whatsapp: "WhatsApp",
      explore: "Explorer",
      contact: "Contact",
      location: "Adresse",
      phone: "Telephone",
      email: "Email",
    },
    footer: {
      description:
        "Divertissement professionnel, evenements, hospitalite et accompagnement voyage pour les clients a Kigali et au-dela.",
    },
    home: {
      welcome: "Bienvenue chez RiFi Entertainment",
      heroTitle:
        "Des experiences professionnelles en divertissement et en evenementiel pour Kigali et au-dela.",
      tagline:
        "Creating unforgettable experiences with style and professionalism.",
      heroBadge: "RiFi Entertainment",
      overview:
        "RiFi Entertainment est une entreprise professionnelle de divertissement et de gestion d'evenements basee a Kigali, au Rwanda. Le site presente l'entreprise, ses services, ses galeries, ses options de reservation et ses coordonnees.",
      bookService: "Reserver un service",
      viewGallery: "Voir la galerie",
      callUs: "Appelez-nous",
      experienceEyebrow: "Experience RiFi",
      experienceTitle:
        "Des evenements portes par l'organisation, l'hospitalite et une energie memorable.",
      basedIn: "Base a",
      coreFocus: "Priorite",
      coreFocusText: "Reservations, experiences et confiance client.",
      featuredEyebrow: "Services phares",
      featuredTitle:
        "Des services concus pour soutenir les celebrations, les marques et l'experience des invites.",
      featuredDescription:
        "RiFi Entertainment rassemble l'organisation d'evenements, la coordination des talents, l'hospitalite et les voyages sous une meme marque professionnelle.",
      serviceLabel: "Service",
      exploreService: "Voir le service",
      services: [
        {
          title: "Gestion de Modeles",
          description:
            "Coordination professionnelle de modeles pour la mode, la publicite, les evenements et les enfants.",
        },
        {
          title: "Organisation de Mariage",
          description:
            "Planification, decoration, coordination et divertissement pour des mariages inoubliables.",
        },
        {
          title: "Services de Protocole",
          description:
            "Accueil des invites, assistance VIP, ushers et hospitalite pour des evenements bien structures.",
        },
        {
          title: "Divertissement de Danse",
          description:
            "Performances de danse traditionnelle et moderne pour mariages, evenements d'entreprise et spectacles.",
        },
        {
          title: "Tours & Voyages",
          description:
            "Assistance voyage, accompagnement touristique et aide a la reservation pour les visiteurs.",
        },
      ],
      galleryEyebrow: "Apercu Galerie",
      galleryTitle:
        "Une histoire visuelle a travers les mariages, les evenements, les modeles et les performances.",
      galleryDescription:
        "La galerie complete mettra en valeur l'ambiance, le style, la coordination et le divertissement qui definissent l'experience RiFi.",
      openGallery: "Ouvrir la galerie",
      galleryItems: [
        {
          title: "Moments de Mariage",
          description:
            "Ceremonies elegantes, decor et details de celebration coordonnes.",
        },
        {
          title: "Experiences Evenementielles",
          description:
            "Hospitalite, gestion du protocole et moments memorables pour les invites.",
        },
        {
          title: "Modeles & Performances",
          description:
            "Moments forts du portfolio, presence mode et showcases de danse dynamique.",
        },
        {
          title: "Protocole & Hospitalité",
          description:
            "Hôtesses et stewards professionnels pour tous vos événements.",
        },
        {
          title: "Danse Traditionnelle",
          description:
            "Capturer l'énergie et la culture des performances rwandaises authentiques.",
        },
        {
          title: "Tours & Voyages Locaux",
          description:
            "Visites panoramiques et expériences guidées au pays des mille collines.",
        },
      ],
      testimonialsEyebrow: "Temoignages",
      testimonialsTitle:
        "La confiance des clients se construit par la qualite, l'attention et la presence.",
      testimonials: [
        {
          quote:
            "RiFi a apporte structure, style et chaleur a notre evenement. La coordination etait professionnelle du debut a la fin.",
          author: "Cliente Mariage",
        },
        {
          quote:
            "Leur equipe a accueilli les invites avec assurance et a cree une atmosphere soignee et accueillante.",
          author: "Organisateur d'Evenement",
        },
        {
          quote:
            "De l'energie des performances au deroulement de l'evenement, RiFi a rendu l'experience memorable pour tous.",
          author: "Hote d'Evenement Prive",
        },
      ],
      contactEyebrow: "Coordonnees",
      contactTitle: "Commencez a planifier avec RiFi Entertainment.",
      contactDescription:
        "Contactez-nous pour les reservations, les mariages, l'hospitalite, les voyages ou toute autre demande.",
      ctaEyebrow: "Appel a l'action",
      ctaTitle: "Creons une experience dont vos invites se souviendront.",
      ctaDescription:
        "Utilisez la page de contact pour lancer votre demande de reservation ou ecrivez directement a l'equipe RiFi.",
      contactRifi: "Contacter RiFi",
      whatsappUs: "Ecrire sur WhatsApp",
    },
    protocol: {
      eyebrow: "Protocole & Services",
      title:
        "Gestion professionnelle des invités et protocole événementiel conçu pour une organisation impeccable.",
      description:
        "RiFi Protocole & Services accompagne les mariages, événements d'entreprise, célébrations privées et cérémonies formelles avec une coordination claire et une hospitalité raffinée.",
      bookSupport: "Réserver le service Protocole",
      call: "Appeler",
      services: [
        {
          title: "Accueil des Invités",
          description:
            "Warm and organized guest arrival handling, registration flow, direction support, and first-contact hospitality for private and corporate events.",
        },
        {
          title: "Coordination d'Événements",
          description:
            "On-site coordination for schedules, guest movement, vendor timing, and smooth communication between the host team and service providers.",
        },
        {
          title: "Services VIP",
          description:
            "Professional support for VIP guests, priority handling, reserved access guidance, and discreet high-standard service during events.",
        },
        {
          title: "Hôtesses & Stewards Professionnels",
          description:
            "Well-presented ushers to guide guests, manage seating, support venue flow, and help maintain an orderly event environment.",
        },
        {
          title: "Gestion de l'Hospitalité",
          description:
            "Structured hospitality oversight for guest comfort, service experience, presentation quality, and front-facing event professionalism.",
        },
      ],
      whyTitle: "Pourquoi RiFi",
      whySubtitle:
        "Une équipe de protocole doit réduire la confusion, pas multiplier les déplacements inutiles.",
      whyDescription:
        "RiFi se concentre sur un service discipliné. Cela signifie un flux d'accueil fluide, une orientation confiante et une gestion professionnelle des invités VIP.",
      bestFitTitle: "Idéal Pour",
      bestFitItems: [
        "Mariages et réceptions",
        "Événements d'entreprise et conférences",
        "Lancements de marques",
        "Cérémonies formelles et VIP",
      ],
      howWeWorkTitle: "Notre Méthodologie",
      howWeWorkSubtitle:
        "Préparation claire avant l'événement, contrôle visible pendant l'événement.",
      processItems: [
        "Nous analysons le type d'événement, l'audience, le flux du lieu et les attentes protocolaires.",
        "Nous définissons les rôles pour l'accueil, l'orientation, la coordination et la gestion VIP.",
        "Nous assurons une expérience d'accueil visible et disciplinée tout au long de l'événement.",
      ],
      contactEyebrow: "Contacter RiFi",
      contactTitle: "Besoin d'un soutien protocolaire pour votre prochain événement ?",
      contactDescription:
        "Contactez RiFi Entertainment pour la planification du protocole, le soutien des hôtesses, la gestion VIP et l'hospitalité événementielle à Kigali, Rwanda.",
      requestService: "Demander le service",
      whatsappUs: "Écrivez-nous sur WhatsApp",
    },
  },
} as const

const LANGUAGE_STORAGE_KEY = "rifi-language"

export function getLanguageFromSearchParams(
  searchParams: URLSearchParams | ReadonlyURLSearchParams
): LanguageCode | null {
  const lang = searchParams.get("lang")

  return siteConfig.languages.some((language) => language.code === lang)
    ? (lang as LanguageCode)
    : null
}

export function useCurrentLanguage() {
  const searchParams = useSearchParams()

  return useMemo(() => {
    const paramLang = getLanguageFromSearchParams(searchParams)

    if (typeof window !== "undefined") {
      if (paramLang) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, paramLang)
        return paramLang
      }

      const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (
        storedLang &&
        siteConfig.languages.some((l) => l.code === storedLang)
      ) {
        return storedLang as LanguageCode
      }
    }

    return paramLang || defaultLanguage
  }, [searchParams])
}


export function useTranslations() {
  const language = useCurrentLanguage()

  return translations[language]
}
