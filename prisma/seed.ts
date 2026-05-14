import { PrismaClient, AdminRole, ServiceCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  // 1. Create Admin User
  const adminEmail = "admin@rifi-entertainment.com";
  const hashedPassword = await bcrypt.hash("admin123456", 10);

  await prisma.adminUser.upsert({
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
      pricingLabel: "Starting from $1,500",
      displayOrder: 1,
    },
    {
      slug: "professional-models",
      title: "Professional Modeling Agency",
      category: ServiceCategory.MODELS,
      shortDescription: "Top-tier models for fashion, commercial, and promotional events.",
      pricingLabel: "Varies by project",
      displayOrder: 2,
    },
    {
      slug: "protocol-services",
      title: "VIP Protocol & Security",
      category: ServiceCategory.PROTOCOL,
      shortDescription: "Expert protocol and high-end security services for VIPs and corporate events.",
      pricingLabel: "Request a quote",
      displayOrder: 3,
    },
    {
      slug: "dance-entertainment",
      title: "Choreography & Dance Performance",
      category: ServiceCategory.DANCE,
      shortDescription: "Captivating dance performances and choreography for any event.",
      pricingLabel: "Starting from $500",
      displayOrder: 4,
    },
    {
      slug: "tours-travel",
      title: "Exclusive Tours & Travel",
      category: ServiceCategory.TOURS,
      shortDescription: "Curated travel experiences and luxury tours across the region.",
      pricingLabel: "Custom packages available",
      displayOrder: 5,
    },
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
  ];

  // For testimonials, we'll just ensure at least some exist to avoid duplicates if re-run
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: testimonials,
    });
    console.log("✅ Sample testimonials created");
  } else {
    console.log("⏩ Testimonials already exist, skipping...");
  }

  // 4. Site Settings
  const settings = [
    { key: "business_email", value: "rifientertainment7@gmail.com", type: "email" },
    { key: "business_phone", value: "0788878824", type: "phone" },
    { key: "business_whatsapp", value: "0788878824", type: "phone" },
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
