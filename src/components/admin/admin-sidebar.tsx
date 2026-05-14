"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  UserCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { siteConfig } from "@/lib/site"
import Image from "next/image"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Bookings",
      url: "/admin/bookings",
      icon: CalendarDays,
    },
    {
      title: "Inquiries",
      url: "/admin/inquiries",
      icon: MessageSquare,
    },
    {
      title: "Model Applications",
      url: "/admin/models",
      icon: UserCheck,
    },
    {
      title: "Content Management",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Services",
          url: "/admin/content/services",
        },
        {
          title: "Testimonials",
          url: "/admin/content/testimonials",
        },
      ],
    },
    {
      title: "Media Library",
      url: "/admin/media",
      icon: ImageIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Manage Account",
          url: "/admin/account",
        },
      ],
    },
  ],
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout failed:", error)
    }
    localStorage.removeItem("rifi_admin_user")
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border/70" {...props}>
      <SidebarHeader className="border-b border-border/70 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center border border-border/70 bg-background">
                  <Image
                    src={siteConfig.logo}
                    alt="Logo"
                    width={24}
                    height={24}
                    className="size-6 object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-sm">RiFi Admin</span>
                  <span className="text-xs text-muted-foreground">Control Center</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.url || (item.items?.some(sub => pathname === sub.url))

              if (!item.items) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                    >
                      <Link href={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                        {Icon && <Icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/70 space-y-2 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center border border-border/70 bg-muted/50">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none text-xs">
                  <span className="font-medium">View Website</span>
                  <span className="text-muted-foreground">Return to front</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <div className="flex aspect-square size-8 items-center justify-center border border-destructive/20 bg-destructive/10">
                <LogOut className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none text-xs">
                <span className="font-medium">Sign Out</span>
                <span className="text-destructive/70">Exit admin panel</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
