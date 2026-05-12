import {
  CalendarDays,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const bookings = [
  {
    id: "BOK-001",
    client: "Jean Paul",
    email: "jp@example.rw",
    service: "Wedding Organization",
    date: "2026-05-24",
    status: "Confirmed",
    amount: "RWF 1,500,000",
  },
  {
    id: "BOK-002",
    client: "Marie Claire",
    email: "marie@example.com",
    service: "Model Booking",
    date: "2026-05-18",
    status: "Pending",
    amount: "RWF 350,000",
  },
  {
    id: "BOK-003",
    client: "Kigali Marriott",
    email: "events@marriott.rw",
    service: "Protocol Services",
    date: "2026-06-02",
    status: "Confirmed",
    amount: "RWF 800,000",
  },
  {
    id: "BOK-004",
    client: "Inyange Industries",
    email: "marketing@inyange.rw",
    service: "Dance Performance",
    date: "2026-06-15",
    status: "Processing",
    amount: "RWF 600,000",
  },
  {
    id: "BOK-005",
    client: "Solange Umutoni",
    email: "solange@test.com",
    service: "Wedding Saxophonist",
    date: "2026-07-10",
    status: "Cancelled",
    amount: "RWF 200,000",
  },
]

export default function BookingsPage() {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Manage Bookings</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all service bookings and event schedules.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-none">
              <Plus className="mr-2 size-4" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-none border-border/70 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
              <DialogDescription>
                Enter the client details and service requirements for the new booking.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="client" className="text-xs font-semibold uppercase tracking-wider">Client Name</Label>
                <Input id="client" placeholder="e.g. Jean Paul" className="rounded-none border-border/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider">Email Address</Label>
                <Input id="email" type="email" placeholder="client@example.rw" className="rounded-none border-border/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service" className="text-xs font-semibold uppercase tracking-wider">Service Type</Label>
                <Select>
                  <SelectTrigger id="service" className="rounded-none border-border/70">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-border/70">
                    <SelectItem value="wedding">Wedding Organization</SelectItem>
                    <SelectItem value="models">Model Booking</SelectItem>
                    <SelectItem value="protocol">Protocol Services</SelectItem>
                    <SelectItem value="dance">Dance Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider">Event Date</Label>
                <Input id="date" type="date" className="rounded-none border-border/70" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="rounded-none w-full">Confirm Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-[10px] text-emerald-500 font-medium">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-[10px] text-amber-500 font-medium">Requires attention</p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RWF 4.2M</div>
            <p className="text-[10px] text-muted-foreground">Confirmed bookings value</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-none border-border/70 shadow-sm">
        <CardHeader className="border-b border-border/70 bg-muted/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search clients or services..."
                className="rounded-none pl-9 border-border/70 bg-background"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-none h-9">
                <Filter className="mr-2 size-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="rounded-none h-9">
                <CalendarDays className="mr-2 size-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/70">
                <TableHead className="w-[100px] text-xs font-semibold uppercase tracking-wider">ID</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Client</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Service</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/30 border-b border-border/70">
                  <TableCell className="font-mono text-xs text-muted-foreground">{booking.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{booking.client}</span>
                      <span className="text-[10px] text-muted-foreground">{booking.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{booking.service}</TableCell>
                  <TableCell className="text-sm">{booking.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center border px-2 py-0.5 text-[10px] font-medium ${
                      booking.status === 'Confirmed' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' :
                      booking.status === 'Pending' ? 'border-amber-500/20 bg-amber-500/10 text-amber-600' :
                      booking.status === 'Cancelled' ? 'border-destructive/20 bg-destructive/10 text-destructive' :
                      'border-blue-500/20 bg-blue-500/10 text-blue-600'
                    }`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">{booking.amount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="rounded-none">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-none">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-emerald-600">Mark as Confirmed</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
