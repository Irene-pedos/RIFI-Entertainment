import {
  CalendarDays,
  MessageSquare,
  TrendingUp,
  UserCheck,
  Users,
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

export default function AdminDashboardPage() {
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
            <div className="text-2xl font-bold">128</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">+12%</span> from last month
            </p>
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
            <div className="text-2xl font-bold">24</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">+4</span> since yesterday
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
            <div className="text-2xl font-bold">12</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              <span className="text-amber-500 font-medium">Pending review</span>
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider">
              Active Talent
            </CardTitle>
            <Users className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Models and Performers
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
                <TableRow className="hover:bg-muted/30">
                  <TableCell className="font-medium">Jean Paul</TableCell>
                  <TableCell>Wedding Organization</TableCell>
                  <TableCell>May 24, 2026</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                      Confirmed
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/30">
                  <TableCell className="font-medium">Marie Claire</TableCell>
                  <TableCell>Model Booking</TableCell>
                  <TableCell>May 18, 2026</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-600">
                      Pending
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/30">
                  <TableCell className="font-medium">Kigali Marriott</TableCell>
                  <TableCell>Protocol Services</TableCell>
                  <TableCell>June 02, 2026</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                      Confirmed
                    </span>
                  </TableCell>
                </TableRow>
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
