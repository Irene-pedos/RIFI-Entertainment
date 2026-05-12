"use client"

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
      toursEyebrow: "Tours & Travel",
      toursTitle: "Explore our tours, travel support, and guided local experiences.",
      toursDescription:
        "RiFi makes travel easy with curated tour packages, hotel booking support, and visitor guidance throughout Rwanda.",
      openToursButton: "Explore Tours & Travel",
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
    dance: {
      eyebrow: "Dance",
      title: "Traditional and modern dance performances",
      description:
        "Experience the vibrant energy of Rwandan dance traditions combined with contemporary styles. Our professional dancers bring cultural authenticity and modern flair to weddings, corporate events, and special celebrations.",
      danceStylesHeading: "Our Dance Styles",
      danceStylesText:
        "Choose from traditional, modern, or fusion performances tailored to your event.",
      danceTypes: [
        {
          title: "Traditional Dance",
          description:
            "Authentic Rwandan cultural performances featuring Intore and traditional rhythms that honor our heritage.",
          features: [
            "Cultural authenticity",
            "Traditional costumes",
            "Heritage preservation",
            "Educational value",
          ],
          icon: "🏺",
        },
        {
          title: "Modern Dance",
          description:
            "Contemporary dance styles blending innovation with energy for today's celebrations and events.",
          features: [
            "Contemporary styles",
            "Flexible choreography",
            "Modern music integration",
            "Trend adaptation",
          ],
          icon: "💃",
        },
        {
          title: "Fusion Dance",
          description:
            "Creative blend of traditional and modern elements for unique, memorable performances.",
          features: [
            "Cultural fusion",
            "Innovative combinations",
            "Unique experiences",
            "Creative expression",
          ],
          icon: "🌟",
        },
      ],
      servicesHeading: "Event Services",
      servicesText: "Professional dance entertainment for every occasion.",
      services: [
        {
          title: "Wedding Performances",
          description:
            "Ceremony and reception dance entertainment tailored to your special day.",
          details: [
            "Processional dances",
            "Reception entertainment",
            "Cultural ceremonies",
            "Guest participation",
          ],
        },
        {
          title: "Corporate Events",
          description:
            "Professional dance entertainment for conferences, galas, and business celebrations.",
          details: [
            "Opening performances",
            "Break entertainment",
            "Team building",
            "Brand integration",
          ],
        },
        {
          title: "Cultural Festivals",
          description:
            "Authentic cultural performances for festivals and community celebrations.",
          details: [
            "Festival showcases",
            "Community events",
            "Cultural education",
            "Traditional ceremonies",
          ],
        },
        {
          title: "Private Parties",
          description:
            "Custom dance entertainment for birthdays, anniversaries, and special occasions.",
          details: [
            "Themed performances",
            "Interactive elements",
            "Personalized shows",
            "Memorable experiences",
          ],
        },
      ],
      guidelinesHeading: "Performance Guidelines",
      guidelinesText:
        "Everything you need to know for a successful dance performance.",
      guidelines: [
        {
          title: "Planning & Booking",
          items: [
            "Book at least 2-3 months in advance for major events",
            "Provide event details, theme, and audience size",
            "Specify performance duration and special requirements",
            "Discuss venue logistics and technical needs",
          ],
        },
        {
          title: "Performance Setup",
          items: [
            "Allow 30-45 minutes for setup and sound check",
            "Provide adequate performance space (minimum 4m x 4m)",
            "Ensure proper lighting and sound system access",
            "Consider weather conditions for outdoor performances",
          ],
        },
        {
          title: "Cultural Respect",
          items: [
            "Respect traditional dance protocols and meanings",
            "Allow for cultural context explanations if requested",
            "Maintain authenticity in traditional performances",
            "Honor Rwandan cultural heritage and traditions",
          ],
        },
        {
          title: "Professional Standards",
          items: [
            "Professional attire and presentation",
            "Reliable performance timing and coordination",
            "Backup performers available for large events",
            "Flexible adaptation to event flow changes",
          ],
        },
      ],
      galleryTitle: "Performance Gallery",
      galleryDescription:
        "Showcase of our dance performances across various events and celebrations.",
      galleryItems: [
        {
          title: "Traditional Dance",
          description:
            "Authentic Rwandan performances with cultural rhythm and traditional expression.",
        },
        {
          title: "Modern Dance",
          description:
            "Contemporary performance showcases with energy and style.",
        },
        {
          title: "Wedding Dance",
          description:
            "Special event dance experiences tailored for wedding celebrations.",
        },
        {
          title: "Corporate Event Dance",
          description:
            "Professional performances designed for business and corporate settings.",
        },
      ],
      ctaTitle: "Book Your Dance Entertainment",
      ctaSubtitle: "Make your event unforgettable with RiFi Dance",
      ctaDescription:
        "Ready to add vibrant dance entertainment to your special occasion? Contact us today to discuss your performance needs, timeline, and customization options.",
      ctaButton: "Book Dance Performance",
      bookingHeading: "Online Booking Form",
      bookingTitle: "Book a Dance Performance",
      bookingDescription: "Fill in the details below to request a dance performance for your event. We will get back to you with availability and a customized quote.",
      bookingForm: {
        nameLabel: "Your Name",
        emailLabel: "Email Address",
        eventDateLabel: "Event Date",
        guestsLabel: "Estimated Audience/Guests",
        styleLabel: "Preferred Dance Style",
        messageLabel: "Tell us about your event and specific requirements",
        submitButton: "Submit Booking Request",
        nextButton: "Next Step",
        backButton: "Back",
        successTitle: "Booking Request Received!",
        successMessage: "Thank you for choosing RiFi Dance. We have received your request and will contact you shortly to discuss the details of your performance.",
        newBookingButton: "Start New Booking",
      },
    },
    tours: {
      eyebrow: "Tours & Travel",
      title: "Tour packages, travel assistance, hotel booking support, and guided services.",
      description:
        "RiFi Tours & Travel helps guests and groups plan the best local experiences with package options, travel advice, hotel reservations, and expert guides.",
      packagesHeading: "Tour Packages",
      packages: [
        {
          title: "Signature Kigali Tour",
          description:
            "City highlights, cultural sites, and hospitality with local context.",
        },
        {
          title: "Nature & Culture Package",
          description:
            "Scenic landscapes, village visits, and cultural experiences across Rwanda.",
        },
        {
          title: "Corporate Travel Plan",
          description:
            "Professional transport, hotel booking support, and itinerary logistics for business groups.",
        },
      ],
      assistanceHeading: "Travel Assistance",
      assistanceText:
        "Personalized travel guidance for airport transfers, local transport, and itinerary support.",
      assistanceItems: [
        "Visa guidance and transportation coordination",
        "Airport pickup and drop-off support",
        "Local SIM, currency, and communication assistance",
      ],
      hotelHeading: "Hotel Booking Support",
      hotelText:
        "We help secure comfortable accommodations and hospitality packages for every guest.",
      hotelItems: [
        "Partner hotel recommendations in Kigali and surrounding regions",
        "Reservation support for rooms, conference venues, and hospitality packages",
        "Special accommodation arrangements for corporate and leisure guests",
      ],
      guideHeading: "Tour Guiding Services",
      guideText:
        "Local guides provide knowledge, safety, and smooth travel experiences throughout your visit.",
      guideItems: [
        "English and French-speaking local guides",
        "Custom itineraries for culture, nature, and city tours",
        "Personalized group welcome and on-tour coordination",
      ],
      bookingHeading: "Online Booking Form",
      bookingTitle: "Submit your travel request",
      bookingDescription:
        "Send your travel details and we’ll follow up with availability, package options, and hotel recommendations.",
      bookingForm: {
        nameLabel: "Your Name",
        emailLabel: "Email Address",
        travelDateLabel: "Travel Date",
        guestsLabel: "Number of Guests",
        packageLabel: "Selected Package",
        messageLabel: "Tell us about your group and travel needs",
        submitButton: "Submit Booking Request",
        nextButton: "Next Step",
        backButton: "Back",
        successTitle: "Booking Request Received!",
        successMessage: "Thank you for choosing RiFi Entertainment. We have received your request and will contact you shortly to confirm availability and details.",
        newBookingButton: "Start New Booking",
      },
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
    about: {
      eyebrow: "Who We Are",
      missionTitle: "Our Mission",
      missionText: "To transform every event into an extraordinary experience by providing world-class entertainment, professional protocol, and innovative event management solutions in Rwanda and beyond.",
      visionTitle: "Our Vision",
      visionText: "To be the leading entertainment and event agency in the region, recognized for our creativity, excellence, and the professional growth of the talents we manage.",
      valuesTitle: "Our Core Values",
      workWithUsTitle: "Work With Us",
      workWithUsText: "Ready to elevate your next event with RiFi Entertainment's professional touch?",
      getInTouch: "Get in Touch Today",
      philosophyTitle: "Our Philosophy",
      philosophyText: "\"We believe that every celebration tells a story. At RiFi, we don't just manage events; we curate moments that linger in the hearts of your guests long after the music stops.\"",
      values: {
        excellence: {
          label: "Excellence",
          description: "We strive for the highest standards in every event and performance we deliver.",
        },
        professionalism: {
          label: "Professionalism",
          description: "Our team is trained to provide elite protocol and coordination services.",
        },
        reliability: {
          label: "Reliability",
          description: "Clients trust us to handle their most important moments with precision.",
        },
        vision: {
          label: "Vision",
          description: "Creating unique and unforgettable experiences tailored to your needs.",
        },
      },
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Let's Start a Conversation",
      description: "Get in touch with RiFi Entertainment today and let us help you create unforgettable experiences for your special events, entertainment needs, tours, and celebrations. Our team is ready to assist you with bookings, inquiries, collaborations, and customized services designed to match your vision.",
      secondaryDescription: "Whether you are planning a wedding, organizing a corporate event, looking for professional models, booking dance entertainment, or arranging tours and travel services, we are here to provide professional support and exceptional service every step of the way. Have a question or looking to book an event? Reach out to us through any of the channels below.",
      infoTitle: "Contact Information",
      quickSupportTitle: "Quick Support",
      quickSupportText: "Need an immediate response? Our WhatsApp line is the fastest way to get in touch with our booking team.",
      chatWhatsApp: "Chat on WhatsApp",
      formTitle: "Send us a Message",
      formName: "Full Name",
      formNamePlaceholder: "Your Name",
      formEmail: "Email Address",
      formEmailPlaceholder: "name@example.com",
      formSubject: "Subject",
      formSubjectPlaceholder: "How can we help?",
      formMessage: "Message",
      formMessagePlaceholder: "Tell us about your event...",
      formSubmit: "Send Message",
      mapTitle: "Visit Our Office",
      location: "Kigali, Rwanda",
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
        "Gukora ibintu bitazibagirana bifite style n'ubunyamwuga.",
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
      toursEyebrow: "Ingendo & Gusura",
      toursTitle: "Sura ingendo zacu, ubufasha bwo kugenda, n'ubuyobozi bw'umwuga.",
      toursDescription:
        "RiFi igufasha mu ngendo n'ubukerarugendo, gutegura hoteli, no kuyoborwa mu Rwanda.",
      openToursButton: "Reba Ingendo & Gusura",
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
    dance: {
        eyebrow: "Imbyino",
        title: "Imbyino gakondo n'iza kijyambere",
        description: "Bona imbaraga z'imbyino nyarwanda gakondo zivanze n'iza kijyambere. Ababyinnyi bacu b'umwuga bazana umuco nyawo n'uburyo bugezweho mu bukwe, inama, n'ibirori bitandukanye.",
        danceStylesHeading: "Ubwoko bw'Imbyino",
        danceStylesText: "Hitamo mu mbyino gakondo, iza kijyambere, cyangwa imvange yabyo.",
        danceTypes: [
          {
            title: "Imbyino Gakondo",
            description: "Imbyino nyarwanda z'umwimerere zirimo Intore n'injyana gakondo ziha icyubahiro umuco wacu.",
            features: ["Umuco nyawo", "Imyambaro gakondo", "Kubungabunga umurage", "Kwigisha umuco"],
            icon: "🏺"
          },
          {
            title: "Imbyino za Kijyambere",
            description: "Uburyo bugezweho bw'imbyino buhuza udushya n'imbaraga ku birori by'uyu munsi.",
            features: ["Style zigezweho", "Choreography yihariye", "Gukoresha umuziki ugezweho", "Gukurikira itrend"],
            icon: "💃"
          },
          {
            title: "Imbyino Mvange",
            description: "Guhuza imbyino gakondo n'iza kijyambere mu buryo bw'ubuhanzi butazibagirana.",
            features: ["Guhuza umuco n'uburyo bushya", "Uburyo bw'ubuhanzi", "Uburambe bwihariye", "Gushaka udushya"],
            icon: "🌟"
          }
        ],
        servicesHeading: "Serivisi ku Birori",
        servicesText: "Imyidagaduro y'imbyino y'umwuga kuri buri birori.",
        services: [
          {
            title: "Ubukwe",
            description: "Imbyino ziteguwe neza ku mihango n'ibirori by'ubukwe.",
            details: ["Imbyino zo kwinjira", "Imyidagaduro muri reception", "Imihango gakondo", "Gusabanya abashyitsi"]
          },
          {
            title: "Inama z'Ibigo",
            description: "Imbyino z'umwuga mu nama, ibirori by'ibigo, n'imurikabikorwa.",
            details: ["Imbyino zo gufungura", "Imyidagaduro mu karuhuko", "Team building", "Kwamamaza ikirango"]
          },
          {
            title: "Ibirori by'Umuco",
            description: "Imbyino gakondo mu maserukiramuco n'ibirori by'abaturage.",
            details: ["Kwerekana umuco", "Ibirori by'abaturage", "Kwigisha umuco", "Imihango gakondo"]
          },
          {
            title: "Ibirori by'Umuryango",
            description: "Imbyino zihariye ku mavuko, isabukuru, n'ibindi birori by'umuryango.",
            details: ["Imbyino zishingiye ku ntego", "Gusabanya abantu", "Ibitaramo byihariye", "Urwibutso rwiza"]
          }
        ],
        guidelinesHeading: "Amabwiriza y'Ibitaramo",
        guidelinesText: "Icyo ukeneye cyose kugira ngo igitaramo kigende neza.",
        guidelines: [
          {
            title: "Guhagarika & Booking",
            items: ["Buka nibura amezi 2-3 mbere", "Tanga amakuru ya event n'abantu bayizamo", "Vuga igihe imbyino zizamara", "Ganira ku bijyanye n'aho event izabera"]
          },
          {
            title: "Kwitegura",
            items: ["Tanga iminota 30-45 yo kwitegura", "Tanga umwanya uhagije (nibura 4m x 4m)", "Vuga ibyerekeye amatara n'ibyuma bisohora amajwi", "Zirikana ikirere niba ari hanze"]
          },
          {
            title: "Kubaha Umuco",
            items: ["Respect imihango gakondo n'ibisobanuro byayo", "Ruhusu ibisobanuro by'umuco niba bikenewe", "Kugumana umwimerere mu mbyino gakondo", "Guha icyubahiro umurage w'u Rwanda"]
          },
          {
            title: "Ubunyamwuga",
            items: ["Imyambaro n'imyitwarire y'umwuga", "Kubahiriza igihe", "Ababyinnyi b'inyongezo ku birori binini", "Guhuza n'ihindagurika rya gahunda"]
          }
        ],
        galleryTitle: "Amafoto y'Imbyino",
        galleryDescription: "Kwerekana imbyino zacu mu birori bitandukanye.",
        galleryItems: [
          { title: "Imbyino Gakondo", description: "Kwerekana umuco nyarwanda n'imbaraga zaho." },
          { title: "Imbyino za Kijyambere", description: "Ibitaramo bigezweho bifite imbaraga n'uburanga." },
          { title: "Imbyino z'Ubukwe", description: "Uburambe bwihariye ku birori by'ubukwe." },
          { title: "Inama z'Ibigo", description: "Imyidagaduro y'umwuga mu nama z'ibigo." }
        ],
        ctaTitle: "Buka Imyidagaduro y'Imbyino",
        ctaSubtitle: "Tuma ibirori byawe bitazibagirana na RiFi Dance",
        ctaDescription: "Witeguye kongera imbaraga z'imbyino kuri event yawe? Twandikire uyu munsi tuganire ku byo ukeneye.",
        ctaButton: "Buka Imbyino",
        bookingHeading: "Fomu yo Gufata Imbyino Ku Murongo",
        bookingTitle: "Buka Igitaramo cy'Imbyino",
        bookingDescription: "Uzuza amakuru hano hepfo kugira ngo usabe imbyino kuri event yawe. Tuzakubwira vuba niba hari ababyinnyi bahari n'igiciro.",
        bookingForm: {
          nameLabel: "Izina Ryawe",
          emailLabel: "Imeli Yawe",
          eventDateLabel: "Itariki ya Event",
          guestsLabel: "Umubare w'abantu bateganyijwe",
          styleLabel: "Ubwoko bw'Imbyino wifuza",
          messageLabel: "Tubwire byinshi kuri event yawe n'ibyo mwifuza",
          submitButton: "Ohereza Ubusabe",
          nextButton: "Ibikurikira",
          backButton: "Subira inyuma",
          successTitle: "Ubusabe bwanyu bwakiriwe!",
          successMessage: "Murakoze guhitamo RiFi Dance. Twakiriye ubusabe bwanyu, tuzakubwira vuba ibyerekeye igitaramo cyanyu.",
          newBookingButton: "Ongera utangire ubundi busabe",
        },
      },
    tours: {
      eyebrow: "Ingendo & Gusura",
      title: "Vurugendo, ubufasha mu ngendo, gufata hoteli, na serivisi z'abayobora ingendo.",
      description:
        "RiFi Tours & Travel igufasha gutegura neza ingendo, kubona hoteli nziza, no gukorana n'abayobozi b'ahantu mu Rwanda.",
      packagesHeading: "Ibyiciro by'Ingendo",
      packages: [
        {
          title: "Ingendo za Kigali",
          description:
            "Ibisobanuro by'umujyi, imbuga z'umuco, n'uburambe bwakirwa n'ibibuga byaho.",
        },
        {
          title: "Inzira z'Uburanga & Umuco",
          description:
            "Ahantu nyaburanga, gusura imidugudu, n'uburyo bwo kumenya umuco wa Rwanda.",
        },
        {
          title: "Ingendo z'Ubucuruzi",
          description:
            "Gutwara abantu mu buryo bw'umwuga, gufata hoteli, n'igenamigambi rya gahunda y'ibikorwa by'ubucuruzi.",
        },
      ],
      assistanceHeading: "Ubufasha bwo Gutembera",
      assistanceText:
        "Ubuyobozi bwihariye ku mufasha wo ku kibuga cy'indege, gutwara abantu, n'umugambi w'ingendo.",
      assistanceItems: [
        "Inama ku byangombwa bya viza na gahunda y'ubwikorezi",
        "Gufasha ku kuza no kuva ku kibuga cy'indege",
        "Ubufasha bwa SIM card, kuvunja amafaranga, n'itumanaho",
      ],
      hotelHeading: "Gufasha mu Gufata Hoteli",
      hotelText:
        "Tugufasha kubona amahoteri meza n'ibipimo by'ubukerarugendo ku bashyitsi bose.",
      hotelItems: [
        "Inama ku mahoteli dukorana na yo i Kigali n'ahakikije",
        "Gufasha mu gufata ibyumba, inama, n'ibipimo by'ubukerarugendo",
        "Gushaka amacumbi yihariye ku matsinda y'ubucuruzi n'abashaka kuruhuka",
      ],
      guideHeading: "Serivisi z'Abayobora Ingendo",
      guideText:
        "Abayobozi b'ahaturage batanga ubumenyi, umutekano, n'ingendo zigororotse mu gihe cy'uruzinduko.",
      guideItems: [
        "Abayobozi bavuga Ikinyarwanda, Icyongereza n'Igifaransa",
        "Gahunda zihariye ku muco, ibidukikije, n'imijyi",
        "Kwakira amatsinda n'ubuyobozi mu gihe cy'ingendo",
      ],
      bookingHeading: "Fomu yo Gufata Ingendo Ku Murongo",
      bookingTitle: "Ohereza ubusabe bwawe bw'urugendo",
      bookingDescription:
        "Ohereza amakuru y'urugendo rwawe maze tuguhe amakuru ku bijyanye n'ibiciro, amahoteri, na gahunda.",
      bookingForm: {
        nameLabel: "Izina Ryawe",
        emailLabel: "Imeli Yawe",
        travelDateLabel: "Itariki y'Urugendo",
        guestsLabel: "Umubare w'abantu",
        packageLabel: "Hitamo Icyiciro",
        messageLabel: "Tubwire amakuru y'itsinda ryanyu n'ibyo mukeneye",
        submitButton: "Ohereza Ubusabe",
        nextButton: "Ibikurikira",
        backButton: "Subira inyuma",
        successTitle: "Ubusabe bwanyu bwakiriwe!",
        successMessage: "Murakoze guhitamo RiFi Entertainment. Twakiriye ubusabe bwanyu, tuzakubwira vuba niba hari imyanya ihari n'ibindi bisobanuro.",
        newBookingButton: "Ongera utangire ubundi busabe",
      },
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
            "Uburyo bwizewe kandi buteguye bwo kwakira abashyitsi, kwandika abaza, kubayobora, na hospitality kuri event zose.",
        },
        {
          title: "Guhuza Ibirori",
          description:
            "Guhuza gahunda ku gihe, kugenzura urujya n'uruza rw'abashyitsi, gukurikirana abandi ba providers, n'itumanaho ryiza.",
        },
        {
          title: "Serivisi za VIP",
          description:
            "Ubufasha bw'umwuga ku bashyitsi b'icyubahiro (VIP), kwitabwaho byihariye, no gutanga serivisi zo mu rwego rwo hejuru.",
        },
        {
          title: "Ushers b'Umwuga",
          description:
            "Abashinzwe kwakira abantu bambaye neza, bayobora abashyitsi aho bicara, kandi bafasha event kugenda neza.",
        },
        {
          title: "Gucunga Hospitality",
          description:
            "Kugenzura ko abashyitsi bameze neza, serivisi itangwa, n'ubunyamwuga mu mibereho y'ibirori.",
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
  sw: {
    nav: {
      "/": "Nyumbani",
      "/about": "Kuhusu Sisi",
      "/models": "Modeli",
      "/wedding": "Harusi",
      "/protocol-services": "Itifaki",
      "/dance": "Ngoma",
      "/tours-travel": "Ziara",
      "/gallery": "Kumbukumbu",
      "/testimonials": "Ushuhuda",
      "/contact": "Wasiliana",
    },
    common: {
      contactUs: "Wasiliana Nasi",
      whatsapp: "WhatsApp",
      explore: "Chunguza",
      contact: "Wasiliana",
      location: "Mahali",
      phone: "Simu",
      email: "Barua pepe",
    },
    footer: {
      description:
        "Burudani ya kitaalamu, matukio, ukarimu, na msaada wa kusafiri kwa wateja huko Kigali na kwingineko.",
    },
    home: {
        welcome: "Karibu RiFi Entertainment",
        heroTitle: "Burudani ya kitaalamu na uzoefu wa matukio huko Kigali na kwingineko.",
        tagline: "Kutengeneza uzoefu usioweza kusahaulika kwa mtindo na weledi.",
        heroBadge: "RiFi Entertainment",
        overview: "RiFi Entertainment ni kampuni ya kitaalamu ya usimamizi wa burudani na matukio iliyoko Kigali, Rwanda. Tovuti hutoa habari kuhusu kampuni, huduma zake, matunzio, chaguzi za kuhifadhi, na habari za mawasiliano.",
        bookService: "Weka Huduma",
        viewGallery: "Angalia Matunzio",
        callUs: "Tupigie Simu",
        experienceEyebrow: "Uzoefu wa RiFi",
        experienceTitle: "Matukio yaliyopangwa kwa muundo, ukarimu, na nguvu ya kukumbukwa.",
        basedIn: "Tunapatikana",
        coreFocus: "Lengo Letu",
        coreFocusText: "Uhifadhi, uzoefu, na imani ya mteja.",
        featuredEyebrow: "Huduma Zilizoangaziwa",
        featuredTitle: "Maeneo ya huduma yaliyoundwa kusaidia sherehe, chapa, na uzoefu wa wageni.",
        featuredDescription: "RiFi Entertainment inachanganya upangaji wa matukio, uratibu wa vipaji, msaada wa ukarimu, na huduma za usafiri chini ya chapa moja ya kitaalamu.",
        serviceLabel: "Huduma",
        exploreService: "Chunguza Huduma",
        services: [
          { title: "Usimamizi wa Modeli", description: "Uratibu wa modeli wa kitaalamu kwa mitindo, biashara, matukio, na watoto." },
          { title: "Uratibu wa Harusi", description: "Upangaji, mapambo, uratibu, na burudani kwa siku za harusi zisizosahaulika." },
          { title: "Huduma za Itifaki", description: "Mapokezi ya wageni, msaada wa VIP, waelekezi, na msaada wa ukarimu kwa matukio yaliyopangwa." },
          { title: "Burudani ya Ngoma", description: "Maonyesho ya ngoma za jadi na za kisasa yaliyolengwa kwa harusi, matukio ya kampuni, na maonyesho." },
          { title: "Ziara na Usafiri", description: "Msaada wa usafiri, mwongozo wa ziara, na msaada wa kuhifadhi kwa wageni na uzoefu wa ndani." }
        ],
        galleryEyebrow: "Muhtasari wa Matunzio",
        galleryTitle: "Hadithi ya picha katika harusi, matukio, modeli, na maonyesho.",
        galleryDescription: "Matunzio kamili yataonyesha mazingira, mtindo, uratibu, na burudani ya moja kwa moja inayofafanua uzoefu wa RiFi.",
        openGallery: "Fungua Matunzio Kamili",
        toursEyebrow: "Ziara na Usafiri",
        toursTitle: "Chunguza ziara zetu, msaada wa usafiri, na uzoefu wa ndani.",
        toursDescription: "RiFi hufanya usafiri kuwa rahisi kwa vifurushi vya ziara, msaada wa kuhifadhi hoteli, na mwongozo wa wageni kote Rwanda.",
        openToursButton: "Chunguza Ziara na Usafiri",
        galleryItems: [
          { title: "Wakati wa Harusi", description: "Sherehe za kifahari, mapambo, na maelezo ya sherehe yaliyoratibiwa." },
          { title: "Uzoefu wa Matukio", description: "Ukarimu, usimamizi wa itifaki, na wakati wa kukumbukwa kwa wageni." },
          { title: "Modeli na Maonyesho", description: "Vivutio vya kwingineko, uwepo wa mitindo, na maonyesho ya ngoma yenye nguvu." },
          { title: "Itifaki na Ukarimu", description: "Waelekezi wa kitaalamu na usimamizi wa mapokezi ya wageni kwa matukio yote." },
          { title: "Ngoma za Jadi", description: "Kunaswa kwa nguvu na utamaduni wa maonyesho halisi ya Rwanda." },
          { title: "Ziara na Usafiri wa Ndani", description: "Ziara za mandhari na uzoefu wa kuongozwa kote nchini Rwanda." }
        ],
        testimonialsEyebrow: "Ushuhuda",
        testimonialsTitle: "Imani ya mteja hujengwa kupitia utoaji, utunzaji, na uwepo.",
        testimonials: [
          { quote: "RiFi ilileta mpangilio, mtindo, na uchangamfu katika tukio letu. Uratibu ulikuwa wa kitaalamu tangu mwanzo hadi mwisho.", author: "Mteja wa Harusi" },
          { quote: "Timu yao ilishughulikia wageni kwa ujasiri na kutoa mazingira yaliyoboreshwa na yenye kukaribisha.", author: "Mratibu wa Tukio la Kampuni" },
          { quote: "Kuanzia nguvu ya maonyesho hadi mtiririko wa tukio, RiFi ilisaidia kufanya uzoefu huo kuwa wa kukumbukwa kwa kila mtu aliyehudhuria.", author: "Mwenyeji wa Tukio la Binafsi" }
        ],
        contactEyebrow: "Maelezo ya Mawasiliano",
        contactTitle: "Anza kupanga na RiFi Entertainment.",
        contactDescription: "Wasiliana nasi kwa uhifadhi wa burudani, harusi, msaada wa ukarimu, mipango ya usafiri, au maswali ya jumla.",
        ctaEyebrow: "Wito wa Kuchukua Hatua",
        ctaTitle: "Tengeneza uzoefu ambao wageni wako watakumbuka.",
        ctaDescription: "Tumia ukurasa wa mawasiliano kuanza swali lako la kuhifadhi au tuma ujumbe kwa timu ya RiFi moja kwa moja kwa msaada wa haraka.",
        contactRifi: "Wasiliana na RiFi",
        whatsappUs: "Tutumie WhatsApp"
      },
    dance: {
      eyebrow: "Ngoma",
      title: "Ngoma za jadi na za kisasa",
      description:
        "Pata nguvu za ngoma za jadi za Rwanda pamoja na mitindo ya kisasa. Wacheza ngoma wetu wa kitaalamu wanaleta utambulisho wa kitamaduni na msisimko kwa harusi, matukio ya kampuni, na sherehe maalum.",
      danceStylesHeading: "Aina zetu za Ngoma",
      danceStylesText:
        "Chagua kati ya ngoma za jadi, za kisasa, au mchanganyiko iliyobinafsishwa kwa tukio lako.",
      danceTypes: [
        {
          title: "Ngoma za Jadi",
          description:
            "Ngoma za kitamaduni za Rwanda zenye utamaduni, mavazi ya jadi, na midundo ya kweli.",
          features: [
            "Utambulisho wa kitamaduni",
            "Mavazi ya jadi",
            "Utunzaji wa urithi",
            "Thamani ya elimu",
          ],
          icon: "🏺",
        },
        {
          title: "Ngoma za Kisasa",
          description:
            "Mitindo ya kisasa ya ngoma yenye nguvu, ushindani, na mbinu za kisasa za uchezaji.",
          features: [
            "Mitindo ya kisasa",
            "Ubunifu rahisi",
            "Muziki wa kisasa",
            "Mwelekeo wa sasa",
          ],
          icon: "💃",
        },
        {
          title: "Ngoma Mchanganyiko",
          description:
            "Muungano wa ngoma za jadi na za kisasa kwa maonyesho ya kipekee na yasiyosahaulika.",
          features: [
            "Mchanganyiko wa kitamaduni",
            "Ubunifu wa kipekee",
            "Uzoefu wa kipekee",
            "Uwasilishaji wa ubunifu",
          ],
          icon: "🌟",
        },
      ],
      servicesHeading: "Huduma za Tukio",
      servicesText: "Burudani ya ngoma ya kitaalamu kwa kila aina ya tukio.",
      services: [
        {
          title: "Matukio ya Harusi",
          description:
            "Burudani ya ngoma kwa hafla za harusi na mapokezi.",
          details: [
            "Ngoma za maandamano",
            "Burudani kwa mapokezi",
            "Sherehe za kitamaduni",
            "Ushiriki wa wageni",
          ],
        },
        {
          title: "Matukio ya Kampuni",
          description:
            "Burudani ya ngoma kwa mikutano, kongamano, na maonyesho ya kampuni.",
          details: [
            "Maonyesho ya ufunguzi",
            "Burudani kwa mapumziko",
            "Ujenzi wa timu",
            "Ushirikishaji wa chapa",
          ],
        },
        {
          title: "Sherehe za Kitamaduni",
          description:
            "Ngoma za kitaifa kwa tamasha na matukio ya jamii.",
          details: [
            "Maonyesho ya tamasha",
            "Matukio ya jamii",
            "Elimu ya kitamaduni",
            "Sherehe za jadi",
          ],
        },
        {
          title: "Sherehe Binafsi",
          description:
            "Burudani ya ngoma iliyobinafsishwa kwa siku za kuzaliwa, kumbukumbu, na hafla maalum.",
          details: [
            "Maonyesho ya mada",
            "Vipengele vya mwingiliano",
            "Maonyesho yaliyobinafsishwa",
            "Uzoefu wa kukumbukwa",
          ],
        },
      ],
      guidelinesHeading: "Mwongozo wa Utendaji",
      guidelinesText: "Kila unachohitaji kwa matukio ya ngoma yenye mafanikio.",
      guidelines: [
        {
          title: "Mipango na Uhifadhi",
          items: [
            "Weka huduma angalau miezi 2-3 mapema",
            "Toa maelezo ya tukio, mada, na idadi ya wageni",
            "Eleza muda wa maonyesho na mahitaji maalum",
            "Jadili upangaji wa eneo na vifaa",
          ],
        },
        {
          title: "Maandalizi ya Utendaji",
          items: [
            "Toa dakika 30-45 kwa maandalizi na ukaguzi wa sauti",
            "Toa nafasi ya kutosha ya utendaji (angalau 4m x 4m)",
            "Hakikisha taa na mfumo wa sauti zinapatikana",
            "Fikiria hali ya hewa kwa matukio ya nje",
          ],
        },
        {
          title: "Heshima ya Kitamaduni",
          items: [
            "Heshimu taratibu za ngoma za jadi",
            "Ruhusu maelezo ya muktadha wa kitamaduni",
            "Dumisha uhalisia katika maonyesho ya jadi",
            "Thamini urithi wa kitamaduni wa Rwanda",
          ],
        },
        {
          title: "Viwango vya Kitaalamu",
          items: [
            "Mavazi ya kitaalamu na uwasilishaji",
            "Muda wa utendaji wa kuaminika",
            "Wachezaji wa ziada kwa matukio makubwa",
            "Ubadilishaji rahisi kwa mabadiliko ya tukio",
          ],
        },
      ],
      galleryTitle: "Matangazo ya Utendaji",
      galleryDescription:
        "Maonyesho ya ngoma zetu kwa matukio mbalimbali na sherehe.",
      galleryItems: [
        {
          title: "Ngoma za Jadi",
          description:
            "Ngoma za kitamaduni za Rwanda zinazonyesha utamaduni na nguvu.",
        },
        {
          title: "Ngoma za Kisasa",
          description:
            "Maonyesho ya ubunifu na wenye msisimko wa mtindo wa kisasa.",
        },
        {
          title: "Ngoma za Harusi",
          description:
            "Matukio maalum ya ngoma yaliyobinafsishwa kwa harusi.",
        },
        {
          title: "Matukio ya Kampuni",
          description:
            "Burudani ya kitaalamu kwa mikutano na hafla za biashara.",
        },
      ],
      ctaTitle: "Weka Burudani ya Ngoma",
      ctaSubtitle: "Fanya tukio lako lisahaulike na RiFi Dance",
      ctaDescription:
        "Tayari kuongeza burudani ya ngoma kwa tukio lako maalum? Wasiliana nasi sasa kuzungumza kuhusu mahitaji, ratiba, na chaguzi za mabadiliko.",
      ctaButton: "Weka Ngoma",
      bookingHeading: "Fomu ya Uhifadhi Mtandaoni",
      bookingTitle: "Weka Onyesho la Ngoma",
      bookingDescription: "Jaza maelezo hapa chini ili kuomba onyesho la ngoma kwa ajili ya tukio lako. Tutakujibu kuhusu upatikanaji na bei.",
      bookingForm: {
        nameLabel: "Jina Lako",
        emailLabel: "Anwani ya Barua pepe",
        eventDateLabel: "Tarehe ya Tukio",
        guestsLabel: "Idadi ya Wageni Wanaotarajiwa",
        styleLabel: "Mtindo wa Ngoma Unaoendelewa",
        messageLabel: "Tueleze kuhusu tukio lako na mahitaji maalum",
        submitButton: "Tuma Ombi la Uhifadhi",
        nextButton: "Hatua Inayofuata",
        backButton: "Rudi",
        successTitle: "Ombi la Uhifadhi Limepokelewa!",
        successMessage: "Asante kwa kuchagua RiFi Dance. Tumepokea ombi lako na tutakuwasiliana hivi karibuni ili kujadili maelezo ya onyesho lako.",
        newBookingButton: "Anza Uhifadhi Mpya",
      },
    },
    tours: {
      eyebrow: "Ziara na Usafiri",
      title: "Vifurushi vya ziara, msaada wa usafiri, msaada wa hoteli, na huduma za mwongozo.",
      description:
        "RiFi Tours & Travel inasaidia wageni kupanga uzoefu bora wa ndani kwa vifurushi vya ziara, ushauri wa usafiri, uhifadhi wa hoteli, na waongozaji wa kitaalamu.",
      packagesHeading: "Vifurushi vya Ziara",
      packages: [
        {
          title: "Ziara ya Kigali",
          description:
            "Mambo muhimu ya mji, maeneo ya kitamaduni, na ukarimu wa mkoa.",
        },
        {
          title: "Pakeji ya Asili na Utamaduni",
          description:
            "Mandhari ya kuvutia, ziara za vijijini, na uzoefu wa utamaduni nchini Rwanda.",
        },
        {
          title: "Mpango wa Usafiri wa Kibiashara",
          description:
            "Usafiri wa kitaalamu, msaada wa hoteli, na mipangilio ya ratiba kwa makundi ya biashara.",
        },
      ],
      assistanceHeading: "Msaada wa Usafiri",
      assistanceText:
        "Mwongozo wa kibinafsi kwa usafiri wa uwanja wa ndege, usafiri wa ndani, na mipango ya ratiba.",
      assistanceItems: [
        "Mwongozo wa viza na kuratibu usafiri",
        "Msaada wa kuchukua na kupeleka uwanja wa ndege",
        "Msaada wa SIM card ya eneo, kubadilisha fedha, na mawasiliano",
      ],
      hotelHeading: "Msaada wa Uhifadhi wa Hoteli",
      hotelText:
        "Tunasaidia kupata malazi mazuri na vifurushi vya ukarimu kwa wageni wote.",
      hotelItems: [
        "Mapendekezo ya hoteli tunazoshirikiana nazo Kigali na mikoa jirani",
        "Msaada wa kuhifadhi vyumba, mikutano, na vifurushi vya ukarimu",
        "Mipangilio maalum ya malazi kwa makundi ya biashara na burudani",
      ],
      guideHeading: "Huduma za Mwongozo wa Ziara",
      guideText:
        "Waongozaji wa ndani wanatoa ujuzi, usalama, na uzoefu mzuri wa safari.",
      guideItems: [
        "Waongozaji wanaozungumza Kiingereza, Kinyarwanda na Kifaransa",
        "Ratiba zilizobinafsishwa kwa utamaduni, asili, na miji",
        "Mapokezi ya kikundi na uratibu wakati wa ziara",
      ],
      bookingHeading: "Fomu ya Uhifadhi Mtandaoni",
      bookingTitle: "Tuma ombi lako la kusafiri",
      bookingDescription:
        "Tuma maelezo ya safari yako na tutakujibu kuhusu upatikanaji, vifurushi, na hoteli.",
      bookingForm: {
        nameLabel: "Jina Lako",
        emailLabel: "Anwani ya Barua pepe",
        travelDateLabel: "Tarehe ya Safari",
        guestsLabel: "Idadi ya Wageni",
        packageLabel: "Chagua Kifurushi",
        messageLabel: "Tueleze kuhusu kikundi chako na mahitaji ya safari",
        submitButton: "Tuma Ombi",
        nextButton: "Hatua inayofuata",
        backButton: "Rudi",
        successTitle: "Ombi la Kuhifadhi Limepokelewa!",
        successMessage: "Asante kwa kuchagua RiFi Entertainment. Tumepokea ombi lako na tutakuwasiliana hivi karibuni ili kudhibitisha upatikanaji na maelezo.",
        newBookingButton: "Anza Uhifadhi Mpya",
      },
    },
    protocol: {
        eyebrow: "Itifaki na Huduma",
        title: "Usimamizi wa kitaalamu wa wageni na itifaki ya matukio iliyoundwa kuweka kila uzoefu katika mpangilio.",
        description: "RiFi Protocol & Services inasaidia harusi, shughuli za kampuni, sherehe za kibinafsi, na mikutano rasmi kwa uratibu wa wazi, ukarimu ulioboreshwa, na huduma ya nidhamu ya mbele ya nyumba.",
        bookSupport: "Weka Huduma ya Itifaki",
        call: "Piga Simu",
        services: [
          { title: "Mapokezi ya Wageni", description: "Ushughulikiaji wa kuwasili kwa wageni uliopangwa, mtiririko wa usajili, msaada wa mwelekeo, na ukarimu wa mawasiliano ya kwanza." },
          { title: "Uratibu wa Tukio", description: "Uratibu wa papo hapo kwa ratiba, harakati za wageni, muda wa wauzaji, na mawasiliano mazuri." },
          { title: "Huduma za VIP", description: "Msaada wa kitaalamu kwa wageni wa VIP, ushughulikiaji wa kipaumbele, mwongozo wa ufikiaji uliotengwa, na huduma ya siri ya kiwango cha juu." },
          { title: "Waelekezi wa Kitaalamu", description: "Waelekezi wanaopendeza kutoa mwelekeo kwa wageni, kusimamia viti, kusaidia mtiririko wa ukumbi, na kudumisha mpangilio." },
          { title: "Usimamizi wa Ukarimu", description: "Usimamizi wa ukarimu uliopangwa kwa faraja ya wageni, uzoefu wa huduma, ubora wa uwasilishaji, na weledi wa tukio." }
        ],
        whyTitle: "Kwa Nini RiFi",
        whySubtitle: "Timu ya itifaki inapaswa kupunguza mkanganyiko, si kuongeza harakati zaidi.",
        whyDescription: "RiFi inazingatia huduma ya nidhamu inayokabili wageni. Hiyo inamaanisha mtiririko wa mapokezi wazi, uelekezi wa ujasiri, uratibu unaoonekana, na ushughulikiaji wa kitaalamu wa matarajio ya VIP.",
        bestFitTitle: "Inafaa Zaidi",
        bestFitItems: ["Harusi na mapokezi", "Shughuli za kampuni na mikutano", "Uzinduzi wa chapa na matukio ya umma", "Mikutano ya VIP na sherehe rasmi"],
        howWeWorkTitle: "Jinsi Tunavyofanya Kazi",
        howWeWorkSubtitle: "Maandalizi ya wazi kabla ya tukio, udhibiti unaoonekana wakati wa tukio.",
        processItems: ["Tunakagua aina ya tukio, watazamaji, mtiririko wa ukumbi, na matarajio ya itifaki.", "Tunafafanua majukumu ya huduma kwa mapokezi, uelekezi, uratibu, na ushughulikiaji wa VIP.", "Tunatoa uzoefu unaoonekana na wenye nidhamu wakati wa tukio."],
        contactEyebrow: "Wasiliana na RiFi",
        contactTitle: "Je, unahitaji msaada wa itifaki kwa tukio lijalo?",
        contactDescription: "Wasiliana na RiFi Entertainment kwa upangaji wa itifaki, msaada wa waelekezi, ushughulikiaji wa wageni wa VIP, na usimamizi wa ukarimu wa matukio huko Kigali, Rwanda.",
        requestService: "Omba Huduma",
        whatsappUs: "Tutumie WhatsApp"
      },
  },
  fr: {
    nav: {
      "/": "Accueil",
      "/about": "À Propos",
      "/models": "Modèles",
      "/wedding": "Mariage",
      "/protocol-services": "Protocole",
      "/dance": "Danse",
      "/tours-travel": "Tours & Voyages",
      "/gallery": "Galerie",
      "/testimonials": "Témoignages",
      "/contact": "Contact",
    },
    common: {
      contactUs: "Contactez-nous",
      whatsapp: "WhatsApp",
      explore: "Explorer",
      contact: "Contact",
      location: "Adresse",
      phone: "Téléphone",
      email: "Email",
    },
    footer: {
      description:
        "Divertissement professionnel, événements, hospitalité et accompagnement voyage pour les clients à Kigali et au-delà.",
    },
    home: {
      welcome: "Bienvenue chez RiFi Entertainment",
      heroTitle:
        "Des expériences professionnelles en divertissement et en événementiel pour Kigali et au-delà.",
      tagline:
        "Créer des expériences inoubliables avec style et professionnalisme.",
      heroBadge: "RiFi Entertainment",
      overview:
        "RiFi Entertainment est une entreprise professionnelle de divertissement et de gestion d'événements basée à Kigali, au Rwanda. Le site présente l'entreprise, ses services, ses galeries, ses options de réservation et ses coordonnées.",
      bookService: "Réserver un service",
      viewGallery: "Voir la galerie",
      callUs: "Appelez-nous",
      experienceEyebrow: "Expérience RiFi",
      experienceTitle:
        "Des événements portés par l'organisation, l'hospitalité et une énergie mémorable.",
      basedIn: "Basé à",
      coreFocus: "Priorité",
      coreFocusText: "Réservations, expériences et confiance client.",
      featuredEyebrow: "Services phares",
      featuredTitle:
        "Des services conçus pour soutenir les célébrations, les marques et l'expérience des invités.",
      featuredDescription:
        "RiFi Entertainment rassemble l'organisation d'événements, la coordination des talents, l'hospitalité et les voyages sous une même marque professionnelle.",
      serviceLabel: "Service",
      exploreService: "Voir le service",
      services: [
        {
          title: "Gestion de Modèles",
          description:
            "Coordination professionnelle de modèles pour la mode, la publicité, les événements et les enfants.",
        },
        {
          title: "Organisation de Mariage",
          description:
            "Planification, décoration, coordination et divertissement pour des mariages inoubliables.",
        },
        {
          title: "Services de Protocole",
          description:
            "Accueil des invités, assistance VIP, hôtesses et hospitalité pour des événements bien structurés.",
        },
        {
          title: "Divertissement de Danse",
          description:
            "Performances de danse traditionnelle et moderne pour mariages, événements d'entreprise et spectacles.",
        },
        {
          title: "Tours & Voyages",
          description:
            "Assistance voyage, accompagnement touristique et aide à la réservation pour les visiteurs.",
        },
      ],
      galleryEyebrow: "Aperçu Galerie",
      galleryTitle:
        "Une histoire visuelle à travers les mariages, les événements, les modèles et les performances.",
      galleryDescription:
        "La galerie complète mettra en valeur l'atmosphère, le style, la coordination et le divertissement qui définissent l'expérience RiFi.",
      openGallery: "Ouvrir la galerie",
      toursEyebrow: "Tours & Voyages",
      toursTitle: "Découvrez nos services de tours, voyages et expériences locales.",
      toursDescription:
        "RiFi facilite vos voyages avec des forfaits touristiques, une aide à la réservation d'hôtels et un accompagnement au Rwanda.",
      packagesHeading: "Forfaits Touristiques",
      packages: [
        {
          title: "Signature Kigali Tour",
          description:
            "Points forts de la ville, sites culturels et hospitalité locale.",
        },
        {
          title: "Forfait Nature & Culture",
          description:
            "Paysages pittoresques, visites de villages et expériences culturelles à travers le Rwanda.",
        },
        {
          title: "Plan Voyage d'Affaires",
          description:
            "Transport professionnel, aide à la réservation d'hôtels et logistique d'itinéraire pour groupes.",
        },
      ],
      assistanceHeading: "Assistance Voyage",
      assistanceText:
        "Guidage personnalisé pour les transferts aéroport, le transport local et le soutien à l'itinéraire.",
      assistanceItems: [
        "Conseils de visa et coordination du transport",
        "Assistance au ramassage et au dépôt à l'aéroport",
        "Assistance SIM locale, monnaie et communication",
      ],
      hotelHeading: "Aide Réservation Hôtels",
      hotelText:
        "Nous aidons à sécuriser des hébergements confortables et des forfaits d'hospitalité.",
      hotelItems: [
        "Recommandations d'hôtels partenaires à Kigali et environs",
        "Soutien à la réservation de chambres, salles de conférence et forfaits",
        "Arrangements spéciaux pour clients d'affaires et de loisirs",
      ],
      guideHeading: "Services de Guide Touristique",
      guideText:
        "Les guides locaux apportent connaissances, sécurité et fluidité à votre voyage.",
      guideItems: [
        "Guides locaux parlant anglais et français",
        "Itinéraires personnalisés pour culture, nature et visites urbaines",
        "Accueil de groupe personnalisé et coordination sur place",
      ],
      bookingHeading: "Formulaire de Réservation en Ligne",
      bookingTitle: "Soumettez votre demande de voyage",
      bookingDescription:
        "Envoyez vos détails de voyage et nous vous répondrons concernant la disponibilité, les options et les hôtels.",
      bookingForm: {
        nameLabel: "Votre Nom",
        emailLabel: "Adresse Email",
        travelDateLabel: "Date du Voyage",
        guestsLabel: "Nombre de Personnes",
        packageLabel: "Forfait Sélectionné",
        messageLabel: "Dites-nous en plus sur votre groupe et vos besoins",
        submitButton: "Soumettre la Demande",
        nextButton: "Étape Suivante",
        backButton: "Retour",
        successTitle: "Demande de Réservation Reçue !",
        successMessage: "Merci d'avoir choisi RiFi Entertainment. Nous avons bien reçu votre demande et nous vous contacterons prochainement pour confirmer la disponibilité et les détails.",
        newBookingButton: "Nouvelle Réservation",
      },
      testimonialsEyebrow: "Témoignages",
      testimonialsTitle:
        "La confiance des clients se construit par la qualité, l'attention et la présence.",
      testimonials: [
        {
          quote:
            "RiFi a apporté structure, style et chaleur à notre événement. La coordination était professionnelle du début à la fin.",
          author: "Cliente Mariage",
        },
        {
          quote:
            "Leur équipe a accueilli les invités avec assurance et a créé une atmosphère soignée et accueillante.",
          author: "Organisateur d'Événement",
        },
        {
          quote:
            "De l'énergie des performances au déroulement de l'événement, RiFi a rendu l'expérience mémorable pour tous.",
          author: "Hôte d'Événement Privé",
        },
      ],
      contactEyebrow: "Coordonnées",
      contactTitle: "Commencez à planifier avec RiFi Entertainment.",
      contactDescription:
        "Contactez-nous pour les réservations, les mariages, l'hospitalité, les voyages ou toute autre demande.",
      ctaEyebrow: "Appel à l'action",
      ctaTitle: "Créons une expérience dont vos invités se souviendront.",
      ctaDescription:
        "Utilisez la page de contact pour lancer votre demande de réservation ou écrivez directement à l'équipe RiFi.",
      contactRifi: "Contacter RiFi",
      whatsappUs: "Écrire sur WhatsApp",
    },
    dance: {
      eyebrow: "Danse",
      title: "Performances de danse traditionnelle et moderne",
      description:
        "Découvrez l'énergie vibrante des traditions de danse rwandaise combinées à des styles contemporains. Nos danseurs professionnels apportent authenticité culturelle et modernité aux mariages, événements d'entreprise et célébrations spéciales.",
      danceStylesHeading: "Nos Styles de Danse",
      danceStylesText:
        "Choisissez parmi des performances traditionnelles, modernes ou fusion adaptées à votre événement.",
      danceTypes: [
        {
          title: "Danse Traditionnelle",
          description:
            "Performances culturelles rwandaises authentiques avec l'Intore et des rythmes traditionnels qui honorent notre héritage.",
          features: [
            "Authenticité culturelle",
            "Costumes traditionnels",
            "Préservation du patrimoine",
            "Valeur éducative",
          ],
          icon: "🏺",
        },
        {
          title: "Danse Moderne",
          description:
            "Styles de danse contemporaine alliant innovation et énergie pour les célébrations d'aujourd'hui.",
          features: [
            "Styles contemporains",
            "Chorégraphie flexible",
            "Intégration de musique moderne",
            "Adaptation aux tendances",
          ],
          icon: "💃",
        },
        {
          title: "Danse Fusion",
          description:
            "Mélange créatif d'éléments traditionnels et modernes pour des performances uniques et mémorables.",
          features: [
            "Fusion culturelle",
            "Combinaisons innovantes",
            "Expériences uniques",
            "Expression créative",
          ],
          icon: "🌟",
        },
      ],
      servicesHeading: "Services Événementiels",
      servicesText: "Divertissement de danse professionnel pour chaque occasion.",
      services: [
        {
          title: "Performances de Mariage",
          description:
            "Divertissement de danse pour la cérémonie et la réception adapté à votre journée spéciale.",
          details: [
            "Danses de procession",
            "Divertissement de réception",
            "Cérémonies culturelles",
            "Participation des invités",
          ],
        },
        {
          title: "Événements d'Entreprise",
          description:
            "Divertissement de danse professionnel pour conférences, galas et célébrations professionnelles.",
          details: [
            "Performances d'ouverture",
            "Divertissement de pause",
            "Team building",
            "Intégration de marque",
          ],
        },
        {
          title: "Festivals Culturels",
          description:
            "Performances culturelles authentiques pour les festivals et les célébrations communautaires.",
          details: [
            "Spectacles de festival",
            "Événements communautaires",
            "Éducation culturelle",
            "Cérémonies traditionnelles",
          ],
        },
        {
          title: "Fêtes Privées",
          description:
            "Divertissement de danse personnalisé pour anniversaires et occasions spéciales.",
          details: [
            "Performances thématiques",
            "Éléments interactifs",
            "Spectacles personnalisés",
            "Expériences mémorables",
          ],
        },
      ],
      guidelinesHeading: "Directives de Performance",
      guidelinesText:
        "Tout ce que vous devez savoir pour une performance de danse réussie.",
      guidelines: [
        {
          title: "Planification & Réservation",
          items: [
            "Réservez au moins 2-3 mois à l'avance pour les grands événements",
            "Fournissez les détails de l'événement, le thème et la taille du public",
            "Spécifiez la durée de la performance et les besoins spéciaux",
            "Discutez de la logistique du lieu et des besoins techniques",
          ],
        },
        {
          title: "Installation de Performance",
          items: [
            "Prévoyez 30-45 minutes pour l'installation et les balances",
            "Fournissez un espace de performance adéquat (minimum 4m x 4m)",
            "Assurez l'accès à un système d'éclairage et de sonorisation",
            "Considérez les conditions météorologiques pour les performances en extérieur",
          ],
        },
        {
          title: "Respect Culturel",
          items: [
            "Respectez les protocoles et les significations des danses traditionnelles",
            "Permettez des explications sur le contexte culturel si demandé",
            "Maintenez l'authenticité dans les performances traditionnelles",
            "Honorez le patrimoine culturel et les traditions rwandaises",
          ],
        },
        {
          title: "Normes Professionnelles",
          items: [
            "Tenue et présentation professionnelles",
            "Coordination et timing de performance fiables",
            "Danseurs de secours disponibles pour les grands événements",
            "Adaptation flexible aux changements de flux de l'événement",
          ],
        },
      ],
      galleryTitle: "Galerie de Performance",
      galleryDescription:
        "Présentation de nos performances de danse lors de divers événements.",
      galleryItems: [
        {
          title: "Danse Traditionnelle",
          description:
            "Performances rwandaises authentiques avec rythme culturel.",
        },
        {
          title: "Danse Moderne",
          description:
            "Présentations de performances contemporaines avec énergie et style.",
        },
        {
          title: "Danse de Mariage",
          description:
            "Expériences de danse personnalisées pour les mariages.",
        },
        {
          title: "Danse d'Événement d'Entreprise",
          description:
            "Performances professionnelles conçues pour le cadre professionnel.",
        },
      ],
      ctaTitle: "Réservez votre Divertissement de Danse",
      ctaSubtitle: "Rendez votre événement inoubliable avec RiFi Dance",
      ctaDescription:
        "Prêt à ajouter un divertissement de danse vibrant à votre occasion spéciale ? Contactez-nous dès aujourd'hui.",
      ctaButton: "Réserver une Performance",
      bookingHeading: "Formulaire de Réservation en Ligne",
      bookingTitle: "Réserver une Performance de Danse",
      bookingDescription: "Remplissez les détails ci-dessous pour demander une performance de danse pour votre événement. Nous vous répondrons concernant la disponibilité et un devis personnalisé.",
      bookingForm: {
        nameLabel: "Votre Nom",
        emailLabel: "Adresse Email",
        eventDateLabel: "Date de l'Événement",
        guestsLabel: "Public/Invités Estimés",
        styleLabel: "Style de Danse Préféré",
        messageLabel: "Dites-nous en plus sur votre événement et vos besoins spécifiques",
        submitButton: "Soumettre la Demande",
        nextButton: "Étape Suivante",
        backButton: "Retour",
        successTitle: "Demande de Réservation Reçue !",
        successMessage: "Merci d'avoir choisi RiFi Dance. Nous avons bien reçu votre demande et nous vous contacterons prochainement pour discuter des détails de votre performance.",
        newBookingButton: "Nouvelle Réservation",
      },
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
            "Gestion de l'arrivée des invités, flux d'inscription, aide à l'orientation et hospitalité de premier contact.",
        },
        {
          title: "Coordination d'Événements",
          description:
            "Coordination sur place des horaires, des mouvements d'invités, du timing des prestataires et communication fluide.",
        },
        {
          title: "Services VIP",
          description:
            "Soutien professionnel pour les invités VIP, gestion prioritaire, orientation d'accès réservé et service de haut standing.",
        },
        {
          title: "Hôtesses & Stewards Professionnels",
          description:
            "Hôtesses bien présentées pour guider les invités, gérer le placement, soutenir le flux de la salle et maintenir l'ordre.",
        },
        {
          title: "Gestion de l'Hospitalité",
          description:
            "Supervision de l'hospitalité pour le confort des invités, l'expérience de service, la qualité de présentation et le professionnalisme.",
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
    about: {
      eyebrow: "Qui Sommes-Nous",
      missionTitle: "Notre Mission",
      missionText: "Transformer chaque événement en une expérience extraordinaire en fournissant un divertissement de classe mondiale, un protocole professionnel et des solutions de gestion d'événements innovantes au Rwanda et au-delà.",
      visionTitle: "Notre Vision",
      visionText: "Être l'agence de divertissement et d'événements leader dans la région, reconnue pour notre créativité, notre excellence et la croissance professionnelle des talents que nous gérons.",
      valuesTitle: "Nos Valeurs Fondamentales",
      workWithUsTitle: "Travaillez avec Nous",
      workWithUsText: "Prêt à élever votre prochain événement avec la touche professionnelle de RiFi Entertainment ?",
      getInTouch: "Contactez-nous Aujourd'hui",
      philosophyTitle: "Notre Philosophie",
      philosophyText: "\"Nous croyons que chaque célébration raconte une histoire. Chez RiFi, nous ne gérons pas seulement des événements ; nous créons des moments qui restent gravés dans le cœur de vos invités longtemps après que la musique s'arrête.\"",
      values: {
        excellence: {
          label: "Excellence",
          description: "Nous visons les normes les plus élevées dans chaque événement et performance que nous livrons.",
        },
        professionalism: {
          label: "Professionnalisme",
          description: "Notre équipe est formée pour fournir des services de protocole et de coordination d'élite.",
        },
        reliability: {
          label: "Fiabilité",
          description: "Les clients nous font confiance pour gérer leurs moments les plus importants avec précision.",
        },
        vision: {
          label: "Vision",
          description: "Créer des expériences uniques et inoubliables adaptées à vos besoins.",
        },
      },
    },
    contact: {
      eyebrow: "Contactez-nous",
      title: "Commençons une Conversation",
      description: "Contactez RiFi Entertainment dès aujourd'hui et laissez-nous vous aider à créer des expériences inoubliables pour vos événements spéciaux, vos besoins en divertissement, vos visites et vos célébrations. Notre équipe est prête à vous aider avec les réservations, les demandes, les collaborations et les services personnalisés conçus pour correspondre à votre vision.",
      secondaryDescription: "Que vous planifiiez un mariage, organisiez un événement d'entreprise, recherchiez des mannequins professionnels, réserviez des spectacles de danse ou organisiez des services de voyage et de tourisme, nous sommes là pour vous fournir un soutien professionnel et un service exceptionnel à chaque étape. Vous avez une question ou vous cherchez à réserver un événement ? Contactez-nous via l'un des canaux ci-dessous.",
      infoTitle: "Coordonnées",
      quickSupportTitle: "Support Rapide",
      quickSupportText: "Besoin d'une réponse immédiate ? Notre ligne WhatsApp est le moyen le plus rapide de contacter notre équipe de réservation.",
      chatWhatsApp: "Discuter sur WhatsApp",
      formTitle: "Envoyez-nous un Message",
      formName: "Nom Complet",
      formNamePlaceholder: "Votre Nom",
      formEmail: "Adresse Email",
      formEmailPlaceholder: "nom@exemple.com",
      formSubject: "Objet",
      formSubjectPlaceholder: "Comment pouvons-nous vous aider ?",
      formMessage: "Message",
      formMessagePlaceholder: "Parlez-nous de votre événement...",
      formSubmit: "Envoyer le Message",
      mapTitle: "Visitez Nos Bureaux",
      location: "Kigali, Rwanda",
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
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage)

  useEffect(() => {
    const paramLang = getLanguageFromSearchParams(searchParams)
    const storedLang = typeof window !== "undefined" ? localStorage.getItem(LANGUAGE_STORAGE_KEY) : null

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

  return language
}

export function useTranslations() {
  const language = useCurrentLanguage()

  return {
    ...translations[defaultLanguage],
    ...(translations[language] ?? {}),
  } as typeof translations.en
}
