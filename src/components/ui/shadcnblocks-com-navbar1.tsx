"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export interface MenuItem {
  id?: string
  title: string
  url: string
  description?: string
  icon?: ReactNode
  items?: MenuItem[]
}

interface Navbar1Props {
  logo: {
    url: string
    src: string
    alt: string
    title: string
  }
  menu: MenuItem[]
  mobileExtraLinks?: {
    name: string
    url: string
  }[]
  auth?: {
    login: {
      text: string
      url: string
    }
    signup: {
      text: string
      url: string
    }
  }
  utilitySlot?: ReactNode
  isHome?: boolean
  isPastHero?: boolean
}

const Navbar1 = ({
  logo,
  menu,
  mobileExtraLinks = [],
  auth,
  utilitySlot,
  isHome = false,
  isPastHero = false,
}: Navbar1Props) => {
  const pathname = usePathname()
  const isDark = isHome && !isPastHero

  return (
    <section className={cn("w-full pt-3 pb-6 lg:pt-4 transition-all duration-300", !isHome && "relative !pt-0 pb-0")}>
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <nav className={cn(
          "hidden items-center justify-between rounded-md border px-8 py-3.5 backdrop-blur-[32px] transition-all duration-300 lg:flex",
          isDark 
            ? "border-white/10 bg-black/15 hover:bg-black/20 " 
            : "border-border/60 bg-white/80 hover:bg-white/95 "
        )}>
          <div className="flex items-center gap-8">
            <Link href={logo.url} className="flex items-center gap-3 group">
              <Image
                src={logo.src}
                width={32}
                height={32}
                className="size-8 object-cover transition-transform group-hover:scale-110"
                alt={logo.alt}
              />
              <span className={cn("text-base font-bold tracking-tight transition-colors", isDark ? "text-white" : "text-primary")}>{logo.title}</span>
            </Link>
            <NavigationMenu className="transition-colors">
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item, isDark, pathname))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className={cn("flex items-center gap-3", isDark ? "text-white" : "text-primary")}>
            {utilitySlot}
            {auth ? (
              <>
                <Button asChild variant="ghost" size="sm" className={cn(
                  "h-9 px-5 text-[10px] font-bold uppercase tracking-widest transition-colors",
                  isDark 
                    ? "text-white/90 hover:text-white" 
                    : "text-primary hover:text-primary hover:bg-primary/5"
                )}>
                  <Link href={auth.login.url}>{auth.login.text}</Link>
                </Button>
                <Button asChild size="sm" className={cn(
                  "h-9 rounded-md px-6 text-[10px] font-bold uppercase tracking-widest transition-all",
                  isDark ? "bg-white text-black hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90 "
                )}>
                  <Link href={auth.signup.url}>{auth.signup.text}</Link>
                </Button>
              </>
            ) : null}
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className={cn(
            "flex items-center justify-between rounded-md border px-4 py-2.5 backdrop-blur-[32px] transition-all",
            isDark 
              ? "border-white/10 bg-black/20 " 
              : "border-border/60 bg-white/80 "
          )}>
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                width={28}
                height={28}
                className="size-7 object-cover"
                alt={logo.alt}
              />
              <span className={cn("text-sm font-bold tracking-tight", isDark ? "text-white" : "text-primary")}>{logo.title}</span>
            </Link>
            <div className="flex items-center gap-2">
              {utilitySlot}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={isDark ? "text-white hover:bg-white/10" : "text-primary hover:bg-muted"}>
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto bg-background/98 backdrop-blur-3xl border-l-white/10">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href={logo.url} className="flex items-center gap-3">
                        <Image
                          src={logo.src}
                          width={40}
                          height={40}
                          className="size-10 object-cover rounded-md"
                          alt={logo.alt}
                        />
                        <span className="text-lg font-semibold">
                          {logo.title}
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="my-6 flex flex-col gap-6 text-primary">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item, pathname))}
                    </Accordion>
                    {mobileExtraLinks.length ? (
                      <div className="border-t border-border/70 py-4">
                        <div className="grid grid-cols-2 justify-start gap-2">
                          {mobileExtraLinks.map((link) => (
                            <Link
                              key={link.url}
                              className="inline-flex h-10 items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                              href={link.url}
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {auth ? (
                      <div className="flex flex-col gap-3">
                        <Button asChild variant="outline" className="rounded-md">
                          <Link href={auth.login.url}>{auth.login.text}</Link>
                        </Button>
                        <Button asChild className="rounded-md bg-primary text-white">
                          <Link href={auth.signup.url}>{auth.signup.text}</Link>
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem, isDark: boolean, pathname: string) => {
  if (item.items) {
    const isActive = item.items.some(subItem => subItem.url === pathname)
    return (
      <NavigationMenuItem
        key={item.id || item.title}
        className={cn("transition-colors")}
      >
        <NavigationMenuTrigger className={cn(
          "bg-transparent transition-colors", 
          isActive ? "text-secondary" : (isDark ? "text-white" : "text-primary"),
          "hover:text-secondary data-[state=open]:text-secondary hover:bg-transparent data-[state=open]:bg-transparent"
        )}>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-[26rem] p-3">
            {item.items.map((subItem) => (
              <li key={subItem.id || subItem.title}>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex gap-4 p-3 leading-none no-underline transition-colors outline-none select-none rounded-md hover:bg-muted hover:text-secondary"
                    href={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold text-primary">
                        {subItem.title}
                      </div>
                      {subItem.description ? (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  const isActive = item.url === pathname
  return (
    <NavigationMenuItem key={item.id || item.title}>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all outline-none",
            isActive ? "text-secondary" : (isDark ? "text-white" : "text-primary"),
            "hover:text-secondary hover:bg-transparent"
          )}
          href={item.url}
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const renderMobileMenuItem = (item: MenuItem, pathname: string) => {
  if (item.items) {
    const isActive = item.items.some(subItem => subItem.url === pathname)
    return (
      <AccordionItem
        key={item.id || item.title}
        value={item.id || item.title}
        className="border-b-0"
      >
        <AccordionTrigger className={cn("py-0 font-semibold hover:no-underline", isActive ? "text-secondary" : "text-inherit")}>
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.id || subItem.title}
              className={cn(
                "flex gap-4 p-3 leading-none transition-colors outline-none select-none rounded-lg hover:text-secondary",
                subItem.url === pathname ? "text-secondary" : ""
              )}
              href={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description ? (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  const isActive = item.url === pathname
  return (
    <Link
      key={item.id || item.title}
      href={item.url}
      className={cn("font-semibold hover:text-secondary", isActive ? "text-secondary" : "text-inherit")}
    >
      {item.title}
    </Link>
  )
}

export { Navbar1 }
