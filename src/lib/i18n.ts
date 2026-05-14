"use client"

import { useEffect, useMemo, useSyncExternalStore } from "react"
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
      bookingForm: {
        title: "Book Protocol Support",
        description: "Enter your event details below to request professional protocol and hospitality support.",
        name: "Your Name",
        email: "Email Address",
        phone: "Phone Number",
        date: "Event Date",
        eventType: "Event Type",
        message: "Message / Requirements",
        submit: "Submit Booking Request",
        success: "Thank you! Your booking request has been sent successfully.",
      },
    },
    about: {
      eyebrow: "About RiFi",
      missionTitle: "Our Mission",
      missionText: "To provide world-class entertainment and event management services that exceed expectations and create lasting memories for our clients.",
      visionTitle: "Our Vision",
      visionText: "To be the leading entertainment and event agency in East Africa, recognized for professionalism, creativity, and excellence.",
      valuesTitle: "Our Values",
      values: {
        excellence: {
          label: "Excellence",
          description: "We strive for the highest quality in every event we manage and every performance we deliver."
        },
        professionalism: {
          label: "Professionalism",
          description: "Our team maintains a high standard of discipline, appearance, and conduct at all times."
        },
        reliability: {
          label: "Reliability",
          description: "Clients trust us to deliver on time and as promised, ensuring peace of mind for every booking."
        },
        vision: {
          label: "Visionary",
          description: "We look ahead to trends and innovate to keep our entertainment experiences fresh and impactful."
        }
      },
      workWithUsTitle: "Work With Us",
      workWithUsText: "Are you a talented performer, model, or event professional? Join the RiFi team and be part of Kigali's most dynamic entertainment agency.",
      getInTouch: "Get in Touch",
      philosophyTitle: "Our Philosophy",
      philosophyText: "We believe that every event is a unique story. Our role is to ensure that story is told with elegance, energy, and flawless execution."
    },
    models: {
      eyebrow: "Models Management",
      title: "Professional Modeling Agency in Kigali",
      description: "RiFi Models represents a diverse range of talent for fashion, commercial, and event bookings. We focus on professionalism, grooming, and versatility.",
      services: [
        { title: "Fashion Shows", description: "Experienced runway models for high-fashion and commercial shows." },
        { title: "Commercial Shoots", description: "Models for photography, video advertisements, and brand campaigns." },
        { title: "Event Hosting", description: "Professional models for high-end event hosting and brand representation." },
        { title: "Kids Modeling", description: "A dedicated section for talented child models for various projects." }
      ],
      requirements: {
        title: "Joining RiFi Models",
        description: "We are always looking for new talent. Here is what we look for:",
        items: [
          "Professional attitude and punctuality",
          "Willingness to learn and take direction",
          "A well-maintained portfolio or natural photos",
          "Confidence and screen/runway presence"
        ]
      },
      bookingInfo: {
        title: "Booking a Model",
        description: "To book a RiFi model for your project, please provide:",
        items: [
          "Type of event or shoot",
          "Date, time, and location",
          "Specific model requirements",
          "Budget and usage details"
        ]
      },
      applicationForm: {
        title: "Model Application",
        success: "Thank you for your application! We will review your profile and contact you soon.",
        fields: {
          fullName: "Full Name",
          email: "Email Address",
          phone: "Phone Number",
          height: "Height (cm)",
          measurements: "Measurements (Bust/Waist/Hips)",
          socialMedia: "Social Media Handle",
          experience: "Modeling Experience"
        },
        submit: "Submit Application"
      },
      forms: {
        application: { description: "Apply to join our modeling roster." },
        booking: { description: "Request a model for your upcoming project." }
      },
      bookingForm: {
        title: "Book a Model",
        success: "Your booking request has been received. Our team will contact you shortly.",
        fields: {
          clientName: "Your Name",
          email: "Email Address",
          phone: "Phone Number",
          eventDate: "Event/Shoot Date",
          assignmentType: "Assignment Type",
          requirements: "Specific Requirements"
        },
        submit: "Send Booking Request"
      },
      gallery: {
        title: "Models Portfolio",
        description: "Explore the diverse talent represented by RiFi Models."
      }
    },
    dance: {
      eyebrow: "Dance Entertainment",
      title: "Vibrant Dance Performances for Every Occasion",
      description: "From the rhythmic heartbeat of traditional Rwandan dance to the modern energy of contemporary styles, RiFi brings life to your stage.",
      ctaButton: "Book a Performance",
      danceStylesHeading: "Our Styles",
      danceStylesText: "We specialize in a variety of dance forms to suit your event's atmosphere.",
      danceTypes: [
        { title: "Traditional Rwandan", icon: "Music", description: "Authentic 'Intore' and 'Umuhamirizo' performances.", features: ["Live drumming", "Traditional attire", "Cultural storytelling"] },
        { title: "Modern & Contemporary", icon: "Zap", description: "High-energy choreography for modern events.", features: ["Afrobeat", "Hip-hop", "Fusion styles"] }
      ],
      servicesHeading: "What We Offer",
      servicesText: "Tailored dance services for different needs.",
      services: [
        { title: "Wedding Performance", description: "Specialized choreography to welcome the couple and entertain guests.", details: ["Includes grand entrance and main stage performance."] },
        { title: "Corporate Events", description: "Professional dance troupes for product launches and gala dinners.", details: ["Customized to brand themes."] }
      ],
      guidelinesHeading: "Booking Guidelines",
      guidelinesText: "To ensure a great performance, please note the following:",
      guidelines: [
        { title: "Stage Requirements", items: ["Minimum 4x4m space", "Safe, non-slippery surface", "Changing room access"] },
        { title: "Audio/Visual", items: ["Clear sound system", "Adequate stage lighting", "Microphone for live drums if needed"] }
      ],
      galleryTitle: "Performance Highlights",
      galleryDescription: "A glimpse of the energy and grace our dancers bring to the stage.",
      galleryItems: [
        { title: "Traditional Showcase", description: "Celebrating Rwandan heritage." },
        { title: "Modern Fusion", description: "Dynamic contemporary choreography." }
      ],
      bookingHeading: "Book a Troupe",
      bookingTitle: "Bring the Energy",
      bookingDescription: "Fill out the form below to request a dance performance for your event.",
      bookingForm: {
        styleLabel: "Dance Style",
        eventDateLabel: "Event Date",
        guestsLabel: "Estimated Guests",
        nextButton: "Next Step",
        nameLabel: "Your Name",
        emailLabel: "Email Address",
        messageLabel: "Message / Special Requirements",
        backButton: "Back",
        submitButton: "Submit Booking Request",
        successTitle: "Booking Request Sent",
        successMessage: "Thank you! We have received your request and will contact you shortly.",
        newBookingButton: "New Booking"
      }
    },
    tours: {
      eyebrow: "Tours & Travel",
      title: "Experience the Best of Rwanda",
      description: "We provide seamless travel support and curated tour experiences to help you explore the land of a thousand hills.",
      assistanceHeading: "Travel Assistance",
      assistanceText: "Navigating your trip is easier with RiFi.",
      assistanceItems: ["Airport pickup & drop-off", "Local transport coordination", "Itinerary planning"],
      hotelHeading: "Hotel & Lodging",
      hotelText: "We help you find the best stay for your budget and preference.",
      hotelItems: ["Luxury resorts", "City hotels in Kigali", "Eco-lodges in the parks"],
      guideHeading: "Professional Guides",
      guideText: "Learn more with our experienced local guides.",
      guideItems: ["Multilingual guides", "Cultural experts", "Wildlife specialists"],
      packagesHeading: "Featured Packages",
      packages: [
        { title: "Kigali City Tour", description: "A day exploring the history, art, and vibrant markets of the capital." },
        { title: "Gorilla Trekking", description: "A life-changing experience in the Volcanoes National Park." },
        { title: "Nature & Culture", description: "Explore the scenic beauty and rich traditions of the countryside." }
      ],
      bookingHeading: "Plan Your Trip",
      bookingTitle: "Start Your Adventure",
      bookingDescription: "Let us know your travel dates and interests, and we will handle the rest.",
      bookingForm: {
        packageLabel: "Travel Package",
        travelDateLabel: "Travel Date",
        guestsLabel: "Number of Travelers",
        nextButton: "Next Step",
        nameLabel: "Your Name",
        emailLabel: "Email Address",
        messageLabel: "Message / Special Requests",
        backButton: "Back",
        submitButton: "Send Inquiry",
        successTitle: "Inquiry Sent",
        successMessage: "Thank you for your interest! Our travel specialist will contact you soon.",
        newBookingButton: "New Inquiry"
      }
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Let's Talk About Your Next Event",
      description: "We are here to help you bring your vision to life. Reach out via any of the channels below.",
      secondaryDescription: "Visit our office in Kigali or send us a message anytime.",
      location: "Kigali, Rwanda",
      infoTitle: "Contact Information",
      quickSupportTitle: "Quick Support",
      quickSupportText: "For urgent inquiries, WhatsApp is the fastest way to reach our team.",
      chatWhatsApp: "Chat on WhatsApp",
      mapTitle: "Find Us",
      formTitle: "Send us a Message",
      formName: "Name",
      formNamePlaceholder: "Enter your name",
      formEmail: "Email",
      formEmailPlaceholder: "Enter your email",
      formSubject: "Subject",
      formSubjectPlaceholder: "What is this about?",
      formMessage: "Message",
      formMessagePlaceholder: "How can we help you?",
      formSubmit: "Send Message",
      successTitle: "Message Sent!",
      successMessage: "Thank you for contacting us. We will get back to you shortly."
    },
    wedding: {
      eyebrow: "Wedding Organization",
      title: "Creating Your Perfect Day",
      description: "From concept to coordination, RiFi ensures your wedding is a seamless celebration of love and style.",
      booking: {
        button: "Book Wedding Planning",
        description: "Schedule a consultation with our wedding experts."
      },
      services: [
        { title: "Full Planning", description: "We handle everything from venue selection to vendor management." },
        { title: "On-the-Day Coordination", description: "We ensure everything runs smoothly so you can enjoy your day." },
        { title: "Decoration & Styling", description: "Creating a beautiful atmosphere that reflects your personality." }
      ],
      bookingForm: {
        title: "Wedding Inquiry",
        success: "Congratulations! We have received your inquiry and will contact you for a consultation.",
        fields: {
          coupleNames: "Couple Names",
          email: "Email Address",
          phone: "Phone Number",
          weddingDate: "Wedding Date",
          location: "Location / Venue",
          estimatedGuests: "Estimated Guests",
          requestedServices: "Requested Services",
          additionalDetails: "Additional Details"
        },
        services: {
          planning: "Full Planning",
          catering: "Catering",
          decoration: "Decoration",
          dance: "Dance Entertainment",
          sax: "Saxophonist",
          mc: "Master of Ceremonies"
        },
        submit: "Submit Inquiry"
      }
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
      bookingForm: {
        title: "Saba Serivisi ya Protocol",
        description: "Uzuza imyirondoro y'ibirori byanyu hano kugira ngo mubone serivisi za protocol z'umwuga.",
        name: "Amazina Yanyu",
        email: "Imeli",
        phone: "Telefoni",
        date: "Itariki ya Event",
        eventType: "Ubwoko bwa Event",
        message: "Ubutumwa / Ibyo Mwifuza",
        submit: "Ohereza Ubusabe bwa Booking",
        success: "Murakoze! Ubusabe bwanyu bwakiriwe neza.",
      },
    },
    about: {
      eyebrow: "Abo Turi Bo",
      missionTitle: "Inshingano Zacu",
      missionText: "Gutanga serivisi z'imyidagaduro n'imitegurire y'ibirori ku rwego mpuzamahanga, zirenze ibyo abakiliya bacyekaga kandi zibasigira urwibutso ruzahoraho.",
      visionTitle: "Icyerekezo Cyacu",
      visionText: "Kuba ikigo cy'indashyikirwa mu myidagaduro n'ibirori muri Afurika y'Iburasirazuba, kizwiho ubunyamwuga, guhanga udushya, n'ubuziranenge.",
      valuesTitle: "Indangagaciro Zacu",
      values: {
        excellence: {
          label: "Ubuziranenge",
          description: "Tuba duharanira ireme ryo mu rwego rwo hejuru muri buri birori duteguye n'ibitaramo dutanga."
        },
        professionalism: {
          label: "Ubunyamwuga",
          description: "Itsinda ryacu rihorana ikinyabupfura, isuku, n'imyitwarire myiza igihe cyose."
        },
        reliability: {
          label: "Kwizigirwa",
          description: "Abakiliya batugirira icyizere cyo gutanga serivisi ku gihe n'uko twabyemanije."
        },
        vision: {
          label: "Kureba Kure",
          description: "Tureba imbere mu guhanga udushya kugira ngo ibitaramo byacu bihore bishya kandi bifite ingaruka nziza."
        }
      },
      workWithUsTitle: "Korana natwe",
      workWithUsText: "Waba ufite impano mu kubyina, mu kumodela, cyambo uri umunyamwuga mu gutegura ibirori? Sangira natwe mu itsinda rya RiFi ry'imyidagaduro i Kigali.",
      getInTouch: "Twandikire",
      philosophyTitle: "Imyemerere Yacu",
      philosophyText: "Twemera ko buri birori ari inkuru yihariye. Inshingano yacu ni ukugira ngo iyo nkuru ivugwe mu buryo bwiza, bwuje imbaraga, kandi butagira amakosa."
    },
    models: {
      eyebrow: "Abamodeli",
      title: "Ikigo cy'Abamodeli b'Umwuga i Kigali",
      description: "RiFi Models ihagararira abanyempano batandukanye mu byerekeye imideli, kwamamaza, n'ibirori. Twibanda ku bunyamwuga, isuku, n'ubushobozi bwinshi.",
      services: [
        { title: "Kwerekana Imideli", description: "Abamodeli bafite uburambe mu kwerekana imideli itandukanye." },
        { title: "Kwamamaza", description: "Abamodeli bakoreshwa mu mafoto n'amashusho yo kwamamaza ibigo n'ibicuruzwa." },
        { title: "Kwakira Abantu", description: "Abamodeli b'umwuga bakira abantu mu birori byo mu rwego rwo hejuru." },
        { title: "Abamodeli b'Abana", description: "Igice cyihariye cy'abana bafite impano mu kumodela mu mishinga itandukanye." }
      ],
      requirements: {
        title: "Kwinjira muri RiFi Models",
        description: "Duhora dushaka abanyempano bashya. Ibi ni byo twibandaho:",
        items: [
          "Ubunyamwuga no kubahiriza igihe",
          "Gushaka kwiga no kumvira amabwiriza",
          "Portfolio nziza cyangwa amafoto y'umwimerere",
          "Kwigirira icyizere n'ubushobozi bwo kugaragara neza"
        ]
      },
      bookingInfo: {
        title: "Guhata Booking y'Umu-modeli",
        description: "Kugira ngo ubone umu-modeli wa RiFi mu mushinga wawe, utanga ibi bikurikira:",
        items: [
          "Ubwoko bwa event cyangwa shoot",
          "Itariki, isaha, n'aho bizabera",
          "Ibyo wifuza ku mu-modeli",
          "Ingengo y'imari n'uko amafoto azakoreshwa"
        ]
      },
      applicationForm: {
        title: "Ubusabe bwo Kwinjira",
        success: "Murakoze ku busabe bwanyu! Tuzasuzuma profile yanyu hanyuma tubavugishe vuba.",
        fields: {
          fullName: "Amazina Yuzuye",
          email: "Imeli",
          phone: "Telefoni",
          height: "Uburebure (cm)",
          measurements: "Ibipimo (Igituza/Mu mabyirushya/Amabuno)",
          socialMedia: "Izina rya Social Media",
          experience: "Uburambe mu kumodela"
        },
        submit: "Ohereza Ubusabe"
      },
      forms: {
        application: { description: "Saba kwinjira mu itsinda ry'abamodeli bacu." },
        booking: { description: "Saba umumodeli kuri event yawe itaha." }
      },
      bookingForm: {
        title: "Fata Umumodeli",
        success: "Ubusabe bwanyu bwakiriwe. Itsinda ryacu rirabavugisha vuba.",
        fields: {
          clientName: "Amazina Yanyu",
          email: "Imeli",
          phone: "Telefoni",
          eventDate: "Itariki ya Event/Shoot",
          assignmentType: "Ubwoko bwa Serivisi",
          requirements: "Ibyo mwifuza byihariye"
        },
        submit: "Ohereza Ubusabe"
      },
      gallery: {
        title: "Portfolio y'Abamodeli",
        description: "Reba abanyempano batandukanye bahagarariwe na RiFi Models."
      }
    },
    dance: {
      eyebrow: "Imyidagaduro y'Imbyino",
      title: "Imbyino zishimishije mu bihe byose",
      description: "Kuva ku mudiho w'imbyino gakondo nyarwanda kugeza ku mbaraga z'imbyino za kijyambere, RiFi izana ubuzima ku rubyiniro rwawe.",
      ctaButton: "Fata Booking y'Imbyino",
      danceStylesHeading: "Ubwoko bw'Imbyino",
      danceStylesText: "Twibanda ku mbyino zitandukanye zikwiranye n'ibirori byanyu.",
      danceTypes: [
        { title: "Gakondo Nyarwanda", icon: "Music", description: "Imbyino z'umwimerere nk'Intore n'Umuhamirizo.", features: ["Ingoma", "Imyambaro gakondo", "Inkuru z'umuco"] },
        { title: "Kijyambere", icon: "Zap", description: "Imbyino zifite imbaraga nyinshi kuri event za kijyambere.", features: ["Afrobeat", "Hip-hop", "Fusion"] }
      ],
      servicesHeading: "Icyo Dutanga",
      servicesText: "Serivisi z'imbyino ziteguwe bitewe n'ibyo mukeneye.",
      services: [
        { title: "Imbyino z'Ubukwe", description: "Gahunda yihariye yo kwakira abagenzi n'abashyitsi.", details: ["Harimo kwinjira neza n'imbyino ku rubyiniro."] },
        { title: "Corporate Events", description: "Itsinda ry'ababyina b'umwuga mu kumurika ibicuruzwa n'ibirori by'ibigo.", details: ["Bitegurwa bitewe n'intego y'ikigo."] }
      ],
      guidelinesHeading: "Amabwiriza ya Booking",
      guidelinesText: "Kugira ngo imbyino zigende neza, dore ibyo kwitaho:",
      guidelines: [
        { title: "Ibisabwa ku Rubyiniro", items: ["Umwanya muto wa 4x4m", "Hasi hatanyerera", "Aho kwambarira"] },
        { title: "Ibyuma n'Amashusho", items: ["Ibyuma bisohora amajwi neza", "Amatara ahagije", "Indangururamajwi z'ingoma"] }
      ],
      galleryTitle: "Ibihe by'Ibitaramo",
      galleryDescription: "Irebere imbaraga n'uburanga ababyinnyi bacu bazana ku rubyiniro.",
      galleryItems: [
        { title: "Imbyino Gakondo", description: "Kwihandagaza mu muco nyarwanda." },
        { title: "Imbyino za Kijyambere", description: "Imbyino zigezweho kandi zishimishije." }
      ],
      bookingHeading: "Fata Itsinda",
      bookingTitle: "Zana Imbaraga",
      bookingDescription: "Uzuza ifishi ikurikira usabe itsinda ry'ababyina kuri event yawe.",
      bookingForm: {
        styleLabel: "Ubwoko bw'Imbyino",
        eventDateLabel: "Itariki ya Event",
        guestsLabel: "Umubare w'Abashyitsi",
        nextButton: "Intambwe ikurikira",
        nameLabel: "Amazina Yanyu",
        emailLabel: "Imeli",
        messageLabel: "Ubutumwa / Ibyo mwifuza",
        backButton: "Subira inyuma",
        submitButton: "Ohereza Ubusabe",
        successTitle: "Ubusabe bwoherejwe",
        successMessage: "Murakoze! Twakiriye ubusabe bwanyu kandi tuzabavugisha vuba.",
        newBookingButton: "Ubusabe bushya"
      }
    },
    tours: {
      eyebrow: "Ingendo n'Ubukerarugendo",
      title: "Sura ibyiza by'u Rwanda",
      description: "Dutanga ubufasha mu ngendo n'ubukerarugendo buteguwe neza kugira ngo ubashe gusura igihugu cy'imisozi igihumbi.",
      assistanceHeading: "Ubufasha mu Ngendo",
      assistanceText: "Gupanga urugendo rwawe biroroha iyo uri kumwe na RiFi.",
      assistanceItems: ["Kugukura no kugugeza ku kibuga cy'indege", "Gupanga imodoka zikuzengurutsa", "Gupanga gahunda y'urugendo"],
      hotelHeading: "Hoteli n'Aho Kurara",
      hotelText: "Tugufasha kubona aho kurara heza bitewe n'ubushobozi bwawe.",
      hotelItems: ["Hoteli z'igitangaza", "Hoteli zo muri Kigali", "Hoteli zo muri pariki"],
      guideHeading: "Abaguhorera mu Ngendo",
      guideText: "Sobanukirwa byinshi hamwe n'abaguhorera bafite uburambe.",
      guideItems: ["Abavuga indimi nyinshi", "Inararibonye mu muco", "Inararibonye mu nyamaswa"],
      packagesHeading: "Gahunda Z'ingenzi",
      packages: [
        { title: "Sura Kigali", description: "Umunsi umwe wo gusura amateka, ubuhanzi, n'amasoko yo mu murwa mukuru." },
        { title: "Gusura Ingagi", description: "Uburambe bw'ubuzima muri Pariki y'Ibirunga." },
        { title: "Uburanga n'Umuco", description: "Sura uburanga bw'icyaro n'umuco gakondo w'u Rwanda." }
      ],
      bookingHeading: "Panga Urugendo",
      bookingTitle: "Tangira Urugendo rwawe",
      bookingDescription: "Tuwire igihe wifuza kugendera n'aho wifuza gusura, twebwe tuzapanga ibindi byose.",
      bookingForm: {
        packageLabel: "Gahunda y'Urugendo",
        travelDateLabel: "Itariki y'Urugendo",
        guestsLabel: "Umubare w'Abagenda",
        nextButton: "Intambwe ikurikira",
        nameLabel: "Amazina Yanyu",
        emailLabel: "Imeli",
        messageLabel: "Ubutumwa / Ibyo mwifuza",
        backButton: "Subira inyuma",
        submitButton: "Ohereza Ubusabe",
        successTitle: "Ubusabe bwoherejwe",
        successMessage: "Murakoze! Inararibonye yacu mu ngendo izakuvugisha vuba.",
        newBookingButton: "Ubusabe bushya"
      }
    },
    contact: {
      eyebrow: "Twandikire",
      title: "Tuganire kuri Event yawe itaha",
      description: "Turi hano kugira ngo tugufashe kugeza ku ntego yawe. Twandikire ukoresheje inzira zikurikira.",
      secondaryDescription: "Sura ibiro byacu i Kigali cyangwa utwoherereze ubutumwa igihe cyose.",
      location: "Kigali, Rwanda",
      infoTitle: "Amakuru y'Itumanaho",
      quickSupportTitle: "Ubufasha bwihuse",
      quickSupportText: "Ku bibazo byihuse, WhatsApp niyo nzira yihuta yo kutugeraho.",
      chatWhatsApp: "Twandikire kuri WhatsApp",
      mapTitle: "Aho Duherereye",
      formTitle: "Twandikire",
      formName: "Amazina",
      formNamePlaceholder: "Andika amazina yawe",
      formEmail: "Imeli",
      formEmailPlaceholder: "Andika imeli yawe",
      formSubject: "Icyo utwandikiye",
      formSubjectPlaceholder: "Ibi bijyanye n'iki?",
      formMessage: "Ubutumwa",
      formMessagePlaceholder: "Twagufasha ute?",
      formSubmit: "Ohereza Ubutumwa",
      successTitle: "Ubutumwa bwoherejwe!",
      successMessage: "Murakoze kutwandikira. Turagusubiza vuba bishoboka."
    },
    wedding: {
      eyebrow: "Gutegura Ubukwe",
      title: "Gutegura Umunsi wawe mwiza",
      description: "Kuva ku gitekerezo kugeza ku mitegurire, RiFi izerekana ko ubukwe bwawe ari ibirori byiza by'urukundo na style.",
      booking: {
        button: "Fata Gahunda yo Gutegura Ubukwe",
        description: "Saba inama n'inararibonye zacu mu gutegura ubukwe."
      },
      services: [
        { title: "Itegure ryose", description: "Twita ku bintu byose kuva ku hantu hazabera ubukwe kugeza ku bashyira bose." },
        { title: "Coordination ku munsi w'ubukwe", description: "Tugerageza ko buri kintu kigenda neza kugira ngo wishimire umunsi wawe." },
        { title: "Decoration", description: "Gukora urubuga rwiza rugaragaza uwo muri bo." }
      ],
      bookingForm: {
        title: "Ikibazo ku Bukwe",
        success: "Impunge! Twakiriye ubusabe bwanyu kandi tuzabavugisha mu gutanga inama.",
        fields: {
          coupleNames: "Amazina y'Abageni",
          email: "Imeli",
          phone: "Telefoni",
          weddingDate: "Itariki y'Ubukwe",
          location: "Aho buzabera",
          estimatedGuests: "Abashyitsi bateganyijwe",
          requestedServices: "Serivisi mukeneye",
          additionalDetails: "Ibindi bisobanuro"
        },
        services: {
          planning: "Itegure ryose",
          catering: "Catering",
          decoration: "Decoration",
          dance: "Imyidagaduro y'Imbyino",
          sax: "Saxophonist",
          mc: "MC"
        },
        submit: "Ohereza Ubusabe"
      }
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
            "Hospitalite, gestion du protocole and moments memorables pour les invites.",
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
      bookingForm: {
        title: "Réserver le service Protocole",
        description: "Entrez les détails de votre événement ci-dessous pour demander un soutien professionnel en protocole et hospitalité.",
        name: "Votre Nom",
        email: "Adresse Email",
        phone: "Numéro de Téléphone",
        date: "Date de l'Événement",
        eventType: "Type d'Événement",
        message: "Message / Exigences",
        submit: "Envoyer la Demande de Réservation",
        success: "Merci ! Votre demande de réservation a été envoyée avec succès.",
      },
    },
    about: {
      eyebrow: "À Propos de RiFi",
      missionTitle: "Notre Mission",
      missionText: "Fournir des services de divertissement et de gestion d'événements de classe mondiale qui dépassent les attentes et créent des souvenirs durables pour nos clients.",
      visionTitle: "Notre Vision",
      visionText: "Être la principale agence de divertissement et d'événements en Afrique de l'Est, reconnue pour son professionnalisme, sa créativité et son excellence.",
      valuesTitle: "Nos Valeurs",
      values: {
        excellence: {
          label: "Excellence",
          description: "Nous visons la plus haute qualité dans chaque événement que nous gérons et chaque performance que nous livrons."
        },
        professionalism: {
          label: "Professionnalisme",
          description: "Notre équipe maintient un haut niveau de discipline, d'apparence et de conduite en tout temps."
        },
        reliability: {
          label: "Fiabilité",
          description: "Les clients nous font confiance pour livrer à temps et comme promis, garantissant la tranquillité d'esprit pour chaque réservation."
        },
        vision: {
          label: "Visionnaire",
          description: "Nous anticipons les tendances et innovons pour que nos expériences de divertissement restent fraîches et percutantes."
        }
      },
      workWithUsTitle: "Travailler Avec Nous",
      workWithUsText: "Êtes-vous un artiste, un mannequin ou un professionnel de l'événementiel talentueux ? Rejoignez l'équipe RiFi et faites partie de l'agence de divertissement la plus dynamique de Kigali.",
      getInTouch: "Contactez-nous",
      philosophyTitle: "Notre Philosophie",
      philosophyText: "Nous pensons que chaque événement est une histoire unique. Notre rôle est de veiller à ce que cette histoire soit racontée avec élégance, énergie et une exécution impeccable."
    },
    models: {
      eyebrow: "Gestion de Modèles",
      title: "Agence de Mannequins Professionnelle à Kigali",
      description: "RiFi Models représente une gamme diversifiée de talents pour la mode, la publicité et les événements. Nous nous concentrons sur le professionnalisme, la présentation et la polyvalence.",
      services: [
        { title: "Défilés de Mode", description: "Mannequins de podium expérimentés pour la haute couture et les défilés commerciaux." },
        { title: "Séances Publicitaires", description: "Modèles pour la photographie, les publicités vidéo et les campagnes de marque." },
        { title: "Hôtes d'Événements", description: "Mannequins professionnels pour l'accueil d'événements haut de gamme et la représentation de marque." },
        { title: "Mannequins Enfants", description: "Une section dédiée aux enfants modèles talentueux pour divers projets." }
      ],
      requirements: {
        title: "Rejoindre RiFi Models",
        description: "Nous sommes toujours à la recherche de nouveaux talents. Voici ce que nous recherchons :",
        items: [
          "Attitude professionnelle et ponctualité",
          "Volonté d'apprendre et de suivre les instructions",
          "Un portfolio bien entretenu ou des photos naturelles",
          "Confiance et présence sur scène/podium"
        ]
      },
      bookingInfo: {
        title: "Réserver un Mannequin",
        description: "Pour réserver un mannequin RiFi pour votre projet, veuillez fournir :",
        items: [
          "Type d'événement ou de séance",
          "Date, heure et lieu",
          "Exigences spécifiques pour le mannequin",
          "Budget et détails d'utilisation"
        ]
      },
      applicationForm: {
        title: "Candidature de Mannequin",
        success: "Merci pour votre candidature ! Nous examinerons votre profil et vous contacterons bientôt.",
        fields: {
          fullName: "Nom Complet",
          email: "Adresse Email",
          phone: "Numéro de Téléphone",
          height: "Taille (cm)",
          measurements: "Mensurations (Poitrine/Taille/Hanches)",
          socialMedia: "Réseaux Sociaux",
          experience: "Expérience en Mannequinat"
        },
        submit: "Envoyer la Candidature"
      },
      forms: {
        application: { description: "Postulez pour rejoindre notre liste de mannequins." },
        booking: { description: "Demandez un mannequin pour votre prochain projet." }
      },
      bookingForm: {
        title: "Réserver un Mannequin",
        success: "Votre demande de réservation a été reçue. Notre équipe vous contactera sous peu.",
        fields: {
          clientName: "Votre Nom",
          email: "Adresse Email",
          phone: "Numéro de Téléphone",
          eventDate: "Date de l'Événement/Séance",
          assignmentType: "Type de Mission",
          requirements: "Exigences Spécifiques"
        },
        submit: "Envoyer la Demande"
      },
      gallery: {
        title: "Portfolio des Modèles",
        description: "Explorez les divers talents représentés par RiFi Models."
      }
    },
    dance: {
      eyebrow: "Divertissement de Danse",
      title: "Performances de Danse Vibrantes pour Chaque Occasion",
      description: "Du battement de cœur rythmé de la danse traditionnelle rwandaise à l'énergie moderne des styles contemporains, RiFi donne vie à votre scène.",
      ctaButton: "Réserver une Performance",
      danceStylesHeading: "Nos Styles",
      danceStylesText: "Nous nous spécialisons dans une variété de formes de danse pour s'adapter à l'atmosphère de votre événement.",
      danceTypes: [
        { title: "Traditionnelle Rwandaise", icon: "Music", description: "Performances authentiques 'Intore' and 'Umuhamirizo'.", features: ["Tambours en direct", "Tenue traditionnelle", "Récit culturel"] },
        { title: "Moderne & Contemporaine", icon: "Zap", description: "Chorégraphie à haute énergie pour les événements modernes.", features: ["Afrobeat", "Hip-hop", "Styles fusion"] }
      ],
      servicesHeading: "Ce Que Nous Offrons",
      servicesText: "Services de danse sur mesure pour différents besoins.",
      services: [
        { title: "Performance de Mariage", description: "Chorégraphie spécialisée pour accueillir le couple et divertir les invités.", details: ["Comprend l'entrée solennelle et la performance sur scène principale."] },
        { title: "Événements d'Entreprise", description: "Troupes de danse professionnelles pour les lancements de produits et les dîners de gala.", details: ["Personnalisé selon les thèmes de la marque."] }
      ],
      guidelinesHeading: "Directives de Réservation",
      guidelinesText: "Pour garantir une excellente performance, veuillez noter ce qui suit :",
      guidelines: [
        { title: "Exigences de Scène", items: ["Espace minimum de 4x4m", "Surface sûre et non glissante", "Accès aux vestiaires"] },
        { title: "Audio/Visuel", items: ["Système sonore clair", "Éclairage de scène adéquat", "Microphone pour les tambours si nécessaire"] }
      ],
      galleryTitle: "Points Forts des Performances",
      galleryDescription: "Un aperçu de l'énergie et de la grâce que nos danseurs apportent à la scène.",
      galleryItems: [
        { title: "Vitrine Traditionnelle", description: "Célébration du patrimoine rwandais." },
        { title: "Fusion Moderne", description: "Chorégraphie contemporaine dynamique." }
      ],
      bookingHeading: "Réserver une Troupe",
      bookingTitle: "Apportez l'Énergie",
      bookingDescription: "Remplissez le formulaire ci-dessous pour demander une performance de danse pour votre événement.",
      bookingForm: {
        styleLabel: "Style de Danse",
        eventDateLabel: "Date de l'Événement",
        guestsLabel: "Nombre Estimé d'Invités",
        nextButton: "Étape Suivante",
        nameLabel: "Votre Nom",
        emailLabel: "Adresse Email",
        messageLabel: "Message / Exigences Particulières",
        backButton: "Retour",
        submitButton: "Envoyer la Demande",
        successTitle: "Demande Envoyée",
        successMessage: "Merci ! Nous avons reçu votre demande et vous contacterons sous peu.",
        newBookingButton: "Nouvelle Demande"
      }
    },
    tours: {
      eyebrow: "Tours & Voyages",
      title: "Découvrez le Meilleur du Rwanda",
      description: "Nous fournissons un soutien de voyage fluide et des expériences de visite organisées pour vous aider à explorer le pays des mille collines.",
      assistanceHeading: "Assistance Voyage",
      assistanceText: "Naviguer dans votre voyage est plus facile avec RiFi.",
      assistanceItems: ["Prise en charge et retour à l'aéroport", "Coordination du transport local", "Planification de l'itinéraire"],
      hotelHeading: "Hôtel & Hébergement",
      hotelText: "Nous vous addons à trouver le meilleur séjour selon votre budget et vos préférences.",
      hotelItems: ["Complexes hôteliers de luxe", "Hôtels en ville à Kigali", "Eco-lodges dans les parcs"],
      guideHeading: "Guides Professionnels",
      guideText: "Apprenez-en plus avec nos guides locaux expérimentés.",
      guideItems: ["Guides multilingues", "Experts culturels", "Spécialistes de la faune"],
      packagesHeading: "Forfaits Vedettes",
      packages: [
        { title: "Tour de la Ville de Kigali", description: "Une journée à explorer l'histoire, l'art et les marchés vibrants de la capitale." },
        { title: "Trekking des Gorilles", description: "Une expérience qui change la vie dans le parc national des Volcans." },
        { title: "Nature & Culture", description: "Explorez la beauté des paysages et les riches traditions de la campagne." }
      ],
      bookingHeading: "Planifiez Votre Voyage",
      bookingTitle: "Commencez Votre Aventure",
      bookingDescription: "Faites-nous part de vos dates de voyage et de vos intérêts, et nous nous occupons du reste.",
      bookingForm: {
        packageLabel: "Forfait Voyage",
        travelDateLabel: "Date de Voyage",
        guestsLabel: "Nombre de Voyageurs",
        nextButton: "Étape Suivante",
        nameLabel: "Votre Nom",
        emailLabel: "Adresse Email",
        messageLabel: "Message / Demandes Particulières",
        backButton: "Retour",
        submitButton: "Envoyer la Demande",
        successTitle: "Demande Envoyée",
        successMessage: "Merci de votre intérêt ! Notre spécialiste voyage vous contactera bientôt.",
        newBookingButton: "Nouvelle Demande"
      }
    },
    contact: {
      eyebrow: "Contactez-nous",
      title: "Parlons de Votre Prochain Événement",
      description: "Nous sommes là pour vous aider à donner vie à votre vision. Contactez-nous via l'un des canaux ci-dessous.",
      secondaryDescription: "Visitez notre bureau à Kigali ou envoyez-nous un message à tout moment.",
      location: "Kigali, Rwanda",
      infoTitle: "Coordonnées",
      quickSupportTitle: "Support Rapide",
      quickSupportText: "Pour les demandes urgentes, WhatsApp est le moyen le plus rapide de joindre notre équipe.",
      chatWhatsApp: "Discuter sur WhatsApp",
      mapTitle: "Où Nous Trouver",
      formTitle: "Envoyez-nous un message",
      formName: "Nom",
      formNamePlaceholder: "Entrez votre nom",
      formEmail: "Email",
      formEmailPlaceholder: "Entrez votre email",
      formSubject: "Sujet",
      formSubjectPlaceholder: "De quoi s'agit-il ?",
      formMessage: "Message",
      formMessagePlaceholder: "Comment pouvons-nous vous aider ?",
      formSubmit: "Envoyer le message",
      successTitle: "Message Envoyé!",
      successMessage: "Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais."
    },
    wedding: {
      eyebrow: "Organisation de Mariage",
      title: "Créer Votre Journée Parfaite",
      description: "Du concept à la coordination, RiFi veille à ce que votre mariage soit une célébration fluide de l'amour et du style.",
      booking: {
        button: "Réserver la Planification de Mariage",
        description: "Prenez rendez-vous pour une consultation avec nos experts en mariage."
      },
      services: [
        { title: "Planification Complète", description: "Nous nous occupons de tout, du choix du lieu à la gestion des prestataires." },
        { title: "Coordination du Jour J", description: "Nous veillons à ce que tout se déroule sans accroc pour que vous puissiez profiter de votre journée." },
        { title: "Décoration & Style", description: "Créer une belle atmosphère qui reflète votre personnalité." }
      ],
      bookingForm: {
        title: "Demande de Mariage",
        success: "Félicitations ! Nous avons reçu votre demande et vous contacterons pour une consultation.",
        fields: {
          coupleNames: "Noms du Couple",
          email: "Adresse Email",
          phone: "Numéro de Téléphone",
          weddingDate: "Date du Mariage",
          location: "Lieu / Salle",
          estimatedGuests: "Invités Attendus",
          requestedServices: "Services Demandés",
          additionalDetails: "Détails Supplémentaires"
        },
        services: {
          planning: "Planification Complète",
          catering: "Traiteur",
          decoration: "Décoration",
          dance: "Divertissement de Danse",
          sax: "Saxophonist",
          mc: "Maître de Cérémonie"
        },
        submit: "Envoyer la Demande"
      }
    },
  },
} as const

const LANGUAGE_STORAGE_KEY = "rifi-language"

// External store for language preference in localStorage
const languageStore = {
  subscribe(callback: () => void) {
    if (typeof window === "undefined") return () => {}
    window.addEventListener("storage", callback)
    window.addEventListener("rifi-language-change", callback)
    return () => {
      window.removeEventListener("storage", callback)
      window.removeEventListener("rifi-language-change", callback)
    }
  },
  getSnapshot() {
    if (typeof window === "undefined") return null
    return localStorage.getItem(LANGUAGE_STORAGE_KEY)
  },
  getServerSnapshot() {
    return null
  },
}

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
  const paramLang = useMemo(
    () => getLanguageFromSearchParams(searchParams),
    [searchParams]
  )

  const storedLang = useSyncExternalStore(
    languageStore.subscribe,
    languageStore.getSnapshot,
    languageStore.getServerSnapshot
  )

  useEffect(() => {
    if (paramLang && typeof window !== "undefined") {
      const currentStored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (currentStored !== paramLang) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, paramLang)
        window.dispatchEvent(new Event("rifi-language-change"))
      }
    }
  }, [paramLang])

  const language = useMemo(() => {
    if (paramLang) return paramLang
    if (
      storedLang &&
      siteConfig.languages.some((l) => l.code === storedLang)
    ) {
      return storedLang as LanguageCode
    }
    return defaultLanguage
  }, [paramLang, storedLang])

  return language
}

export function useTranslations() {
  const language = useCurrentLanguage()

  return translations[language]
}
