"use client"

import {
  CalendarDays,
  MessageSquare,
  TrendingUp,
  UserCheck,
  Users,
  Loader2,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { trpc } from "@/lib/trpc"

export default function AdminDashboardPage() {
  const { data: summary, isLoading: isSummaryLoading } = trpc.booking.dashboardSummary.useQuery()
  const { data: bookings, isLoading: isBookingsLoading } = trpc.booking.list.useQuery()
  const { data: inquiries } = trpc.inquiry.list.useQuery()
  const { data: modelApps } = trpc.model.listApplications.useQuery()
  const { data: media } = trpc.media.list.useQuery()
  const { data: testimonials } = trpc.testimonial.listAdmin.useQuery()

  const recentBookings = bookings?.slice(0, 5)

  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Welcome to RiFi Entertainment control center. Here is what&apos;s happening today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider">
              Total Bookings
            </CardTitle>
            <CalendarDays className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            {isSummaryLoading ? <Loader2 className="animate-spin size-4" /> : (
              <>
                <div className="text-2xl font-bold">{summary?.total || 0}</div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Lifetime bookings
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider">
              New Inquiries
            </CardTitle>
            <MessageSquare className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiries?.length || 0}</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Total received
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider">
              Model Apps
            </CardTitle>
            <UserCheck className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{modelApps?.length || 0}</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Total applications
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider">
              Media Assets
            </CardTitle>
            <TrendingUp className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{media?.length || 0}</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Images & videos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider">
              Testimonials
            </CardTitle>
            <Users className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonials?.length || 0}</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Client reviews
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider">
              Pending Bookings
            </CardTitle>
            <CalendarDays className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{summary?.pending || 0}</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 rounded-none border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Bookings</CardTitle>
            <CardDescription className="text-xs">
              Latest service requests from the website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">Client</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">Service</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">Date</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isBookingsLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <Loader2 className="animate-spin size-6 mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : recentBookings?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      No bookings found.
                    </TableCell>
                  </TableRow>
                ) : recentBookings?.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{booking.clientName}</TableCell>
                    <TableCell>{booking.serviceType}</TableCell>
                    <TableCell>
                      {booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : "TBD"}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center border px-2 py-0.5 text-[10px] font-medium ${
                        booking.status === 'CONFIRMED' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' :
                        booking.status === 'PENDING' ? 'border-amber-500/20 bg-amber-500/10 text-amber-600' :
                        booking.status === 'CANCELLED' ? 'border-destructive/20 bg-destructive/10 text-destructive' :
                        'border-blue-500/20 bg-blue-500/10 text-blue-600'
                      }`}>
                        {booking.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-3 rounded-none border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Growth Overview</CardTitle>
            <CardDescription className="text-xs">
              Monthly performance tracking.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex h-[200px] items-center justify-center border-t border-border/70 bg-muted/20 mt-4">
             <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <TrendingUp className="size-8 opacity-20" />
                <p className="text-xs italic">Analytics visualization placeholder</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
