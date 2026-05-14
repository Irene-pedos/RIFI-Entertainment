"use client"

import Image from "next/image"
import { useMemo } from "react"

export type TestimonialCardItem = {
  image: string
  name: string
  handle: string
  quote: string
}

const VerifyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 48 48"
    className="inline-block"
  >
    <polygon
      fill="#42a5f5"
      points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
    />
    <polygon
      fill="#fff"
      points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
    />
  </svg>
)

const Card = ({ card }: { card: TestimonialCardItem }) => (
  <div className="mx-3 w-64 shrink-0 border border-border/70 bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex gap-3">
      <Image
        className="size-11 object-cover"
        src={card.image}
        alt={card.name}
        width={44}
        height={44}
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p className="font-medium">{card.name}</p>
          <VerifyIcon />
        </div>
        <span className="text-xs text-muted-foreground">{card.handle}</span>
      </div>
    </div>
    <p className="pt-4 text-sm leading-7 text-foreground/85">{card.quote}</p>
  </div>
)

function MarqueeRow({
  data,
  reverse = false,
  speed = 28,
}: {
  data: TestimonialCardItem[]
  reverse?: boolean
  speed?: number
}) {
  const doubled = useMemo(() => [...data, ...data], [data])

  return (
    <div className="isolation-isolate relative mx-auto w-full max-w-6xl overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-[var(--color-background)] to-transparent md:w-24" />
      <div
        className={`flex min-w-[200%] transform-gpu ${
          reverse ? "py-2" : "py-1"
        }`}
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((card, index) => (
          <Card key={`${card.handle}-${index}`} card={card} />
        ))}
      </div>
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-[var(--color-background)] to-transparent md:w-24" />
    </div>
  )
}

export default function Marquee({
  row1,
  row2,
}: {
  row1: TestimonialCardItem[]
  row2: TestimonialCardItem[]
}) {
  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="flex flex-col gap-2">
        <MarqueeRow data={row1} reverse={false} speed={30} />
        <MarqueeRow data={row2} reverse={true} speed={32} />
      </div>
    </>
  )
}
