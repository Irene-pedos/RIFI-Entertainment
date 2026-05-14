"use client"

import React from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

// Define the props for reusability
interface StatProps {
  value: string
  label: string
  icon: React.ReactNode
}

interface ActionProps {
  text: string
  onClick?: () => void
  href?: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
  className?: string
}

interface HeroSectionProps {
  title: React.ReactNode
  subtitle: string
  actions: ActionProps[]
  stats: StatProps[]
  images: string[]
  videoSrc?: string
  className?: string
}

// Animation variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const floatingVariants: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

const HeroSection = ({
  title,
  subtitle,
  actions,
  stats,
  images,
  videoSrc,
  className,
}: HeroSectionProps) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center overflow-hidden bg-background py-12 lg:py-20",
        className
      )}
    >
      {/* Background Video or Gradient Overlay */}
      {videoSrc && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-20"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
      )}

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left Column: Text Content */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            variants={itemVariants}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant}
                size="lg"
                className={cn("px-6", action.className)}
                asChild={!!action.href}
              >
                {action.href ? (
                  <a href={action.href}>{action.text}</a>
                ) : (
                  action.text
                )}
              </Button>
            ))}
          </motion.div>
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-border/70 bg-muted/50">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Image Collage */}
        <motion.div
          className="relative h-[450px] w-full sm:h-[550px] lg:h-[650px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative Shapes - Using sharp borders/squares instead of circles */}
          <motion.div
            className="absolute -top-4 right-1/4 h-16 w-16 border border-primary/20 bg-primary/5"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 h-12 w-12 border border-secondary/40 bg-secondary/10"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: "0.5s" }}
          />

          {/* Images - All rounded-none for sharp corners */}
          <motion.div
            className="absolute left-0 top-0 h-[280px] w-[240px] border border-border/70 bg-muted p-2 shadow-sm sm:h-[380px] sm:w-[320px] lg:h-[480px] lg:w-[400px]"
            style={{ transformOrigin: "top left" }}
            variants={imageVariants}
          >
            <Image
              src={images[0]}
              alt="Hero image 1"
              fill
              className="object-cover p-2"
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 400px"
            />
          </motion.div>
          <motion.div
            className="absolute right-0 bottom-0 h-[240px] w-[200px] border border-border/70 bg-muted p-2 shadow-sm sm:h-[320px] sm:w-[280px] lg:h-[420px] lg:w-[360px]"
            style={{ transformOrigin: "bottom right" }}
            variants={imageVariants}
          >
            <Image
              src={images[1]}
              alt="Hero image 2"
              fill
              className="object-cover p-2"
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 360px"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
