"use client"

import * as React from "react"
import {
  CalendarDays,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Loader2,
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
import { trpc } from "@/lib/trpc"

export default function BookingsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const utils = trpc.useUtils()

  const { data: bookings, isLoading: isBookingsLoading } = trpc.booking.list.useQuery()
  const { data: summary, isLoading: isSummaryLoading } = trpc.booking.dashboardSummary.useQuery()

  const createMutation = trpc.booking.create.useMutation({
    onSuccess: () => {
      utils.booking.list.invalidate()
      utils.booking.dashboardSummary.invalidate()
      setIsCreateDialogOpen(false)
    },
  })

  const updateStatusMutation = trpc.booking.updateStatus.useMutation({
    onSuccess: () => {
      utils.booking.list.invalidate()
      utils.booking.dashboardSummary.invalidate()
    },
  })

  const handleCreateBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    createMutation.mutate({
      clientName: formData.get("client") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      serviceType: formData.get("service") as any,
      eventDate: formData.get("date") as string,
      sourcePage: "admin-dashboard",
    })
  }

  const filteredBookings = bookings?.filter(b => 
    b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Manage Bookings</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all service bookings and event schedules.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-none">
              <Plus className="mr-2 size-4" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-none border-border/70 sm:max-w-[425px]">
            <form onSubmit={handleCreateBooking}>
              <DialogHeader>
                <DialogTitle>Create New Booking</DialogTitle>
                <DialogDescription>
                  Enter the client details and service requirements for the new booking.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="client" className="text-xs font-semibold uppercase tracking-wider">Client Name</Label>
                  <Input id="client" name="client" required placeholder="e.g. Jean Paul" className="rounded-none border-border/70" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider">Email Address</Label>
                  <Input id="email" name="email" type="email" required placeholder="client@example.rw" className="rounded-none border-border/70" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider">Phone Number</Label>
                  <Input id="phone" name="phone" required placeholder="+250 788 000 000" className="rounded-none border-border/70" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="service" className="text-xs font-semibold uppercase tracking-wider">Service Type</Label>
                  <Select name="service" required defaultValue="WEDDING">
                    <SelectTrigger id="service" className="rounded-none border-border/70">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-border/70">
                      <SelectItem value="WEDDING">Wedding Organization</SelectItem>
                      <SelectItem value="DANCE">Dance Performance</SelectItem>
                      <SelectItem value="MODELS">Model Booking</SelectItem>
                      <SelectItem value="PROTOCOL">Protocol Services</SelectItem>
                      <SelectItem value="TOURS">Tours & Travel</SelectItem>
                      <SelectItem value="MEDIA">Media Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider">Event Date</Label>
                  <Input id="date" name="date" type="date" className="rounded-none border-border/70" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="rounded-none w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Creating..." : "Confirm Booking"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSummaryLoading ? <Loader2 className="animate-spin size-4" /> : (
              <>
                <div className="text-2xl font-bold">{summary?.total || 0}</div>
                <p className="text-[10px] text-muted-foreground font-medium">Across all categories</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSummaryLoading ? <Loader2 className="animate-spin size-4" /> : (
              <>
                <div className="text-2xl font-bold">{summary?.pending || 0}</div>
                <p className="text-[10px] text-amber-500 font-medium">Requires attention</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Confirmed
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSummaryLoading ? <Loader2 className="animate-spin size-4" /> : (
              <>
                <div className="text-2xl font-bold">{summary?.confirmed || 0}</div>
                <p className="text-[10px] text-emerald-500 font-medium">Secured bookings</p>
              </>
            )}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                <TableHead className="w-[100px] text-xs font-semibold uppercase tracking-wider">Code</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Client</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Service</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isBookingsLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <Loader2 className="animate-spin size-6 mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredBookings?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : filteredBookings?.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/30 border-b border-border/70">
                  <TableCell className="font-mono text-xs text-muted-foreground">{booking.bookingCode}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{booking.clientName}</span>
                      <span className="text-[10px] text-muted-foreground">{booking.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{booking.serviceType}</TableCell>
                  <TableCell className="text-sm">
                    {booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : "TBD"}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center border px-2 py-0.5 text-[10px] font-medium ${
                      booking.status === 'CONFIRMED' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' :
                      booking.status === 'PENDING' ? 'border-amber-500/20 bg-amber-500/10 text-amber-600' :
                      booking.status === 'CANCELLED' ? 'border-destructive/20 bg-destructive/10 text-destructive' :
                      booking.status === 'COMPLETED' ? 'border-blue-500/20 bg-blue-500/10 text-blue-600' :
                      'border-muted-foreground/20 bg-muted/10 text-muted-foreground'
                    }`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {booking.amountQuoted ? `RWF ${booking.amountQuoted.toLocaleString()}` : "Not set"}
                  </TableCell>
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
                        <DropdownMenuItem 
                          className="text-emerald-600"
                          onClick={() => updateStatusMutation.mutate({ id: booking.id, status: "CONFIRMED" })}
                        >
                          Mark as Confirmed
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-blue-600"
                          onClick={() => updateStatusMutation.mutate({ id: booking.id, status: "COMPLETED" })}
                        >
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => updateStatusMutation.mutate({ id: booking.id, status: "CANCELLED" })}
                        >
                          Cancel Booking
                        </DropdownMenuItem>
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
