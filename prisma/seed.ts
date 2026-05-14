import { PrismaClient, AdminRole, ServiceCategory, BookingStatus, InquiryStatus, MediaCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  // 1. Create Admin User
  const adminEmail = "admin@rifi-entertainment.com";
  const hashedPassword = await bcrypt.hash("admin123456", 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
      firstName: "Super",
      lastName: "Admin",
      role: AdminRole.SUPER_ADMIN,
    },
  });
  console.log("✅ Admin user created/verified");

  // 2. Default Services
  const services = [
    {
      slug: "wedding-planning",
      title: "Wedding Planning & Management",
      category: ServiceCategory.WEDDING,
      shortDescription: "Full-service wedding planning to make your special day unforgettable.",
      fullDescription: "From venue selection and decor to vendor management and day-of coordination, we handle every detail of your wedding. Our team ensures that your vision comes to life seamlessly, allowing you to enjoy every moment of your celebration.",
      pricingLabel: "Starting from $1,500",
      displayOrder: 1,
    },
    {
      slug: "professional-models",
      title: "Professional Modeling Agency",
      category: ServiceCategory.MODELS,
      shortDescription: "Top-tier models for fashion, commercial, and promotional events.",
      fullDescription: "RiFi Models represents a diverse portfolio of professional talent. We provide high-caliber models for runway shows, commercial photography, brand activations, and promotional campaigns, ensuring your brand is represented with excellence.",
      pricingLabel: "Varies by project",
      displayOrder: 2,
    },
    {
      slug: "protocol-services",
      title: "VIP Protocol & Security",
      category: ServiceCategory.PROTOCOL,
      shortDescription: "Expert protocol and high-end security services for VIPs and corporate events.",
      fullDescription: "We provide comprehensive protocol management for high-profile guests, corporate executives, and international delegations. Our services include airport reception, logistics coordination, and discreet security to ensure a smooth and professional experience.",
      pricingLabel: "Request a quote",
      displayOrder: 3,
    },
    {
      slug: "dance-entertainment",
      title: "Choreography & Dance Performance",
      category: ServiceCategory.DANCE,
      shortDescription: "Captivating dance performances and choreography for any event.",
      fullDescription: "Bring energy and artistry to your event with our professional dance troupes. We offer traditional, modern, and contemporary performances tailored to your theme, as well as custom choreography for weddings and special occasions.",
      pricingLabel: "Starting from $500",
      displayOrder: 4,
    },
    {
      slug: "tours-travel",
      title: "Exclusive Tours & Travel",
      category: ServiceCategory.TOURS,
      shortDescription: "Curated travel experiences and luxury tours across the region.",
      fullDescription: "Discover the beauty of Rwanda and beyond with our bespoke travel packages. From gorilla trekking and safari adventures to cultural city tours and luxury lake retreats, we manage all your travel logistics for a stress-free journey.",
      pricingLabel: "Custom packages available",
      displayOrder: 5,
    },
    {
        slug: "media-production",
        title: "Event Media & Photography",
        category: ServiceCategory.MEDIA,
        shortDescription: "Professional photography and video production for your events.",
        fullDescription: "Capture every precious moment with our professional media team. We provide high-end event photography, cinematic videography, and post-production services to ensure your memories are preserved in the highest quality.",
        pricingLabel: "Packages from $800",
        displayOrder: 6,
    }
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log("✅ Default services created/verified");

  // 3. Testimonials
  const testimonials = [
    {
      clientName: "Jane Doe",
      clientRole: "Bride",
      quote: "RIFI-Entertainment turned our dream wedding into reality. The attention to detail was incredible!",
      rating: 5,
      isPublished: true,
      displayOrder: 1,
    },
    {
      clientName: "John Smith",
      clientRole: "CEO, Tech Corp",
      quote: "The protocol services provided were world-class. Our international guests were highly impressed.",
      rating: 5,
      isPublished: true,
      displayOrder: 2,
    },
    {
        clientName: "Sarah Mukamanzi",
        clientRole: "Event Planner",
        quote: "Working with RiFi Models for our fashion gala was a breeze. The professionalism and punctuality were top-notch.",
        rating: 5,
        isPublished: true,
        displayOrder: 3,
    },
    {
        clientName: "David Henderson",
        clientRole: "Tourist from UK",
        quote: "Our safari tour arranged by RiFi was the highlight of our trip. Everything from the guide to the accommodation was perfect.",
        rating: 4,
        isPublished: true,
        displayOrder: 4,
    },
    {
        clientName: "Anita Umutoni",
        clientRole: "Bride",
        quote: "The dance troupe brought so much life to our reception! Everyone was talking about the performance for weeks.",
        rating: 5,
        isPublished: true,
        displayOrder: 5,
    },
    {
        clientName: "Mark Gasana",
        clientRole: "Business Owner",
        quote: "The media team captured our product launch perfectly. The photos were ready in record time and looked amazing.",
        rating: 5,
        isPublished: true,
        displayOrder: 6,
    },
    {
        clientName: "Elena Rossi",
        clientRole: "International Delegate",
        quote: "Seamless airport pickup and protocol management. Highly recommended for any business traveler to Kigali.",
        rating: 5,
        isPublished: true,
        displayOrder: 7,
    },
    {
        clientName: "Kevin Brown",
        clientRole: "Groom",
        quote: "They took all the stress out of our wedding planning. We couldn't have done it without the RiFi team.",
        rating: 5,
        isPublished: true,
        displayOrder: 8,
    }
  ];

  // Upsert testimonials based on name and role to avoid simple duplicates while allowing re-runs
  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
        where: { clientName: t.clientName, clientRole: t.clientRole }
    });
    if (!existing) {
        await prisma.testimonial.create({ data: t });
    }
  }
  console.log("✅ Testimonials created/verified");

  // 4. Site Settings
  const settings = [
    { key: "business_email", value: "rifientertainment7@gmail.com", type: "email" },
    { key: "business_phone", value: "0788878824", type: "phone" },
    { key: "business_whatsapp", value: "0788878824", type: "phone" },
    { key: "business_instagram", value: "https://www.instagram.com/rifi_entertainment?igsh=Y2hoMnFhc2hzeHY1", type: "url" },
    { key: "business_tagline", value: "Creating unforgettable experiences with style and professionalism.", type: "string" },
    { key: "business_location", value: "Kigali, Rwanda", type: "string" },
    { key: "business_description", value: "RiFi Entertainment is a Kigali-based entertainment and event company delivering weddings, model management, protocol services, dance performances, and travel support.", type: "text" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: {
        key: setting.key,
        value: setting.value,
        type: setting.type,
      },
    });
  }
  console.log("✅ Site settings created/verified");

  // 5. Sample Bookings (to populate admin dashboard)
  const bookingCount = await prisma.booking.count();
  if (bookingCount < 5) {
    const sampleBookings = [
        {
            bookingCode: "BK-2026-001",
            serviceType: ServiceCategory.WEDDING,
            clientName: "Alice & Bob",
            email: "alice@example.com",
            phone: "+250780000001",
            eventDate: new Date("2026-06-20"),
            location: "Kigali Serena Hotel",
            guestCount: 250,
            status: BookingStatus.CONFIRMED,
            message: "Looking for full planning and decor."
        },
        {
            bookingCode: "BK-2026-002",
            serviceType: ServiceCategory.TOURS,
            clientName: "Michael Chang",
            email: "mchang@example.com",
            phone: "+250780000002",
            eventDate: new Date("2026-07-10"),
            location: "Volcanoes National Park",
            guestCount: 2,
            status: BookingStatus.PENDING,
            message: "Interested in gorilla trekking package."
        },
        {
            bookingCode: "BK-2026-003",
            serviceType: ServiceCategory.PROTOCOL,
            clientName: "Global Trade Corp",
            email: "logistics@gtc.com",
            phone: "+250780000003",
            eventDate: new Date("2026-05-25"),
            location: "Kigali International Airport",
            guestCount: 15,
            status: BookingStatus.PENDING,
            message: "VIP protocol for 15 executives."
        }
    ];

    for (const b of sampleBookings) {
        await prisma.booking.upsert({
            where: { bookingCode: b.bookingCode },
            update: {},
            create: b
        });
    }
    console.log("✅ Sample bookings created");
  }

  // 6. Sample Inquiries
  const inquiryCount = await prisma.inquiry.count();
  if (inquiryCount < 3) {
      await prisma.inquiry.createMany({
          data: [
              {
                  inquiryCode: "INQ-001",
                  name: "Eric Munyaneza",
                  email: "eric@example.rw",
                  phone: "0788123456",
                  subject: "Model Training",
                  message: "Do you offer training for aspiring models?",
                  status: InquiryStatus.NEW
              },
              {
                  inquiryCode: "INQ-002",
                  name: "Clare Uwase",
                  email: "clare@example.rw",
                  phone: "0788654321",
                  subject: "Corporate Performance",
                  message: "Can we book a dance group for a company anniversary?",
                  status: InquiryStatus.NEW
              }
          ]
      });
      console.log("✅ Sample inquiries created");
  }

  // 7. Sample Media Metadata (URLs point to public assets if they exist, or placeholders)
  const mediaCount = await prisma.mediaAsset.count();
  if (mediaCount === 0) {
      const sampleMedia = [
          {
              fileName: "gorilla.jpg",
              originalName: "gorilla.jpg",
              mimeType: "image/jpeg",
              fileSize: 1024000,
              publicUrl: "/tours/gorilla.jpg",
              storagePath: "tours/gorilla.jpg",
              altText: "Gorilla Trekking in Rwanda",
              category: MediaCategory.SERVICE,
              serviceType: ServiceCategory.TOURS
          },
          {
              fileName: "wedding-hero.jpg",
              originalName: "wedding-hero.jpg",
              mimeType: "image/jpeg",
              fileSize: 2048000,
              publicUrl: "/brand/main-hero.jpeg",
              storagePath: "brand/main-hero.jpeg",
              altText: "Luxury Wedding Setup",
              category: MediaCategory.HERO,
              serviceType: ServiceCategory.WEDDING
          }
      ];

      for (const m of sampleMedia) {
          await prisma.mediaAsset.create({
              data: {
                  ...m,
                  uploadedById: admin.id
              }
          });
      }
      console.log("✅ Sample media metadata created");
  }

  console.log("🌱 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
