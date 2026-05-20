'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'

interface HeroSlide {
    id: string | number
    title: React.ReactNode
    subtitle: string
    image: string
    primaryAction: {
        text: string
        href: string
    }
    secondaryAction: {
        text: string
        href: string
    }
}

interface HeroSectionProps {
    slides: HeroSlide[]
}

export function HeroSection4({ slides }: HeroSectionProps) {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    useEffect(() => {
        const timer = setInterval(nextSlide, 8000)
        return () => clearInterval(timer)
    }, [slides.length])

    return (
        <main className="relative h-screen w-full overflow-hidden bg-black">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 h-full w-full"
                    >
                        <Image
                            src={slides[currentSlide].image}
                            alt="Background"
                            fill
                            className="object-cover opacity-50"
                            priority
                        />
                        {/* Progressive Dimming for readability */}
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex h-full flex-col justify-center">
                <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
                    <div className="max-w-3xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    {slides[currentSlide].title}
                                </h1>
                                <p className="mt-6 max-w-xl text-pretty text-sm leading-7 text-white/80 sm:text-base lg:text-lg">
                                    {slides[currentSlide].subtitle}
                                </p>

                                <div className="mt-10 flex flex-wrap gap-3">
                                    <Button
                                        asChild
                                        className="h-10 px-6 text-[11px] font-bold uppercase tracking-wider rounded-md bg-primary hover:bg-primary/90">
                                        <Link href={slides[currentSlide].primaryAction.href} className="flex items-center gap-2">
                                            {slides[currentSlide].primaryAction.text}
                                            <ArrowRight className="size-3" />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="h-10 px-6 text-[11px] font-bold text-white uppercase tracking-wider rounded-md border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:text-white">
                                        <Link href={slides[currentSlide].secondaryAction.href} className="flex items-center gap-2">
                                            <MessageCircle className="size-3" />
                                            {slides[currentSlide].secondaryAction.text}
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slider Progress Indicators - Centered under text */}
                        <div className="mt-12 flex gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={cn(
                                        "h-1 transition-all duration-500 rounded-full",
                                        currentSlide === index ? "w-10 bg-primary" : "w-5 bg-white/20 hover:bg-white/40"
                                    )}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
