"use client"

import * as React from "react"
import {
  CalendarDays,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Eye,
  Edit,
  Check,
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
import { cn } from "@/lib/utils"
import { ServiceCategory } from "@/server/types"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/server/api/root"

type RouterOutputs = inferRouterOutputs<AppRouter>
type Booking = RouterOutputs['booking']['list'][number]

export default function BookingsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [feedback, setFeedback] = React.useState<{ type: 'success' | 'error', message: string } | null>(null)
  
  const utils = trpc.useUtils()

  const { data: bookings, isLoading: isBookingsLoading } = trpc.booking.list.useQuery()
  const { data: summary, isLoading: isSummaryLoading } = trpc.booking.dashboardSummary.useQuery()

  React.useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [feedback])

  const createMutation = trpc.booking.create.useMutation({
    onSuccess: () => {
      utils.booking.list.invalidate()
      utils.booking.dashboardSummary.invalidate()
      setIsCreateDialogOpen(false)
      setFeedback({ type: 'success', message: 'Booking created successfully' })
    },
    onError: (error) => {
      setFeedback({ type: 'error', message: error.message || 'Failed to create booking' })
    }
  })

  const updateMutation = trpc.booking.update.useMutation({
    onSuccess: () => {
      utils.booking.list.invalidate()
      utils.booking.dashboardSummary.invalidate()
      setIsEditDialogOpen(false)
      setFeedback({ type: 'success', message: 'Booking updated successfully' })
    },
    onError: (error) => {
      setFeedback({ type: 'error', message: error.message || 'Failed to update booking' })
    }
  })

  const updateStatusMutation = trpc.booking.updateStatus.useMutation({
    onSuccess: () => {
      utils.booking.list.invalidate()
      utils.booking.dashboardSummary.invalidate()
      setFeedback({ type: 'success', message: 'Status updated successfully' })
    },
    onError: (error) => {
      setFeedback({ type: 'error', message: error.message || 'Failed to update status' })
    }
  })

  const bulkUpdateStatusMutation = trpc.booking.bulkUpdateStatus.useMutation({
    onSuccess: () => {
      utils.booking.list.invalidate()
      utils.booking.dashboardSummary.invalidate()
      setSelectedIds(new Set())
      setFeedback({ type: 'success', message: 'Selected bookings updated successfully' })
    },
    onError: (error) => {
      setFeedback({ type: 'error', message: error.message || 'Failed to update selected bookings' })
    }
  })

  const handleCreateBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    createMutation.mutate({
      clientName: formData.get("client") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      serviceType: formData.get("service") as ServiceCategory,
      eventDate: formData.get("date") as string || undefined,
      location: formData.get("location") as string || undefined,
      guestCount: formData.get("guests") ? Number(formData.get("guests")) : undefined,
      sourcePage: "admin-dashboard",
    })
  }

  const handleEditBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedBooking) return

    const formData = new FormData(e.currentTarget)
    updateMutation.mutate({
      id: selectedBooking.id,
      data: {
        clientName: formData.get("client") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        serviceType: formData.get("service") as ServiceCategory,
        eventDate: formData.get("date") as string || undefined,
        location: formData.get("location") as string || undefined,
        guestCount: formData.get("guests") ? Number(formData.get("guests")) : undefined,
        notes: formData.get("notes") as string,
      }
    })
  }

  const filteredBookings = bookings?.filter(b => 
    b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredBookings?.length && filteredBookings.length > 0) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredBookings?.map(b => b.id)))
    }
  }

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedIds(newSet)
  }

  return (
    <div className="space-y-6 pt-6 relative">
      {/* Feedback Message */}
      {feedback && (
        <div className={cn(
          "fixed top-4 right-4 z-50 flex items-center gap-3 p-4 shadow-lg border rounded-none transition-all duration-300 animate-in fade-in slide-in-from-top-4",
          feedback.type === 'success' ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-destructive/5 border-destructive/20 text-destructive"
        )}>
          {feedback.type === 'success' ? <CheckCircle className="size-5" /> : <AlertCircle className="size-5" />}
          <p className="text-sm font-medium">{feedback.message}</p>
          <button onClick={() => setFeedback(null)} className="ml-2 hover:opacity-70">
            <X className="size-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Manage Bookings</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all service bookings and event schedules.
          </p>
        </div>
        <div className="flex gap-2">
          {selectedIds.size > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-none border-primary/20 bg-primary/5 text-primary">
                  Bulk Actions ({selectedIds.size})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-none">
                <DropdownMenuLabel>Change Status To</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => bulkUpdateStatusMutation.mutate({ ids: Array.from(selectedIds), status: 'CONFIRMED' })}>
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => bulkUpdateStatusMutation.mutate({ ids: Array.from(selectedIds), status: 'COMPLETED' })}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => bulkUpdateStatusMutation.mutate({ ids: Array.from(selectedIds), status: 'CANCELLED' })}>
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
                  <div className="grid gap-2">
                    <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider">Location</Label>
                    <Input id="location" name="location" placeholder="e.g. Kigali Convention Centre" className="rounded-none border-border/70" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="guests" className="text-xs font-semibold uppercase tracking-wider">Estimated Guests</Label>
                    <Input id="guests" name="guests" type="number" placeholder="e.g. 200" className="rounded-none border-border/70" />
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
                <TableHead className="w-[40px]">
                  <input 
                    type="checkbox" 
                    className="size-4 accent-primary rounded-none"
                    checked={!!filteredBookings?.length && selectedIds.size === filteredBookings.length}
                    onChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[100px] text-xs font-semibold uppercase tracking-wider">Code</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Client</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Service</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Location</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Guests</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isBookingsLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    <Loader2 className="animate-spin size-6 mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredBookings?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : filteredBookings?.map((booking) => (
                <TableRow key={booking.id} className={cn(
                  "hover:bg-muted/30 border-b border-border/70 transition-colors",
                  selectedIds.has(booking.id) && "bg-primary/5"
                )}>
                  <TableCell>
                    <input 
                      type="checkbox" 
                      className="size-4 accent-primary rounded-none"
                      checked={selectedIds.has(booking.id)}
                      onChange={() => toggleSelect(booking.id)}
                    />
                  </TableCell>
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
                  <TableCell className="text-sm">
                    <span className="truncate max-w-[120px] block" title={booking.location || "Not set"}>
                      {booking.location || "—"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">
                    {booking.guestCount || "—"}
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "inline-flex items-center border px-2 py-0.5 text-[10px] font-medium uppercase tracking-tight",
                      booking.status === 'CONFIRMED' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' :
                      booking.status === 'PENDING' ? 'border-amber-500/20 bg-amber-500/10 text-amber-600' :
                      booking.status === 'CANCELLED' ? 'border-destructive/20 bg-destructive/10 text-destructive' :
                      booking.status === 'COMPLETED' ? 'border-blue-500/20 bg-blue-500/10 text-blue-600' :
                      'border-muted-foreground/20 bg-muted/10 text-muted-foreground'
                    )}>
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
                        <DropdownMenuItem onClick={() => {
                          setSelectedBooking(booking);
                          setIsDetailsDialogOpen(true);
                        }}>
                          <Eye className="mr-2 size-3.5" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedBooking(booking);
                          setIsEditDialogOpen(true);
                        }}>
                          <Edit className="mr-2 size-3.5" />
                          Edit Booking
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-emerald-600"
                          onClick={() => updateStatusMutation.mutate({ id: booking.id, status: "CONFIRMED" })}
                        >
                          <Check className="mr-2 size-3.5" />
                          Mark as Confirmed
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-blue-600"
                          onClick={() => updateStatusMutation.mutate({ id: booking.id, status: "COMPLETED" })}
                        >
                          <CheckCircle className="mr-2 size-3.5" />
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => updateStatusMutation.mutate({ id: booking.id, status: "CANCELLED" })}
                        >
                          <X className="mr-2 size-3.5" />
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

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="rounded-none border-border/70 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Full information for booking {selectedBooking?.bookingCode}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4 border-b border-border/50 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Client Name</span>
                  <p className="text-sm font-medium">{selectedBooking.clientName}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Email</span>
                  <p className="text-sm font-medium">{selectedBooking.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-border/50 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Phone</span>
                  <p className="text-sm font-medium">{selectedBooking.phone}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Service Type</span>
                  <p className="text-sm font-medium">{selectedBooking.serviceType}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-border/50 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Event Date</span>
                  <p className="text-sm font-medium">{selectedBooking.eventDate ? new Date(selectedBooking.eventDate).toLocaleDateString() : 'Not set'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Status</span>
                  <div>
                    <span className={cn(
                      "inline-flex items-center border px-2 py-0.5 text-[10px] font-medium uppercase tracking-tight",
                      selectedBooking.status === 'CONFIRMED' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' :
                      selectedBooking.status === 'PENDING' ? 'border-amber-500/20 bg-amber-500/10 text-amber-600' :
                      selectedBooking.status === 'CANCELLED' ? 'border-destructive/20 bg-destructive/10 text-destructive' :
                      selectedBooking.status === 'COMPLETED' ? 'border-blue-500/20 bg-blue-500/10 text-blue-600' :
                      'border-muted-foreground/20 bg-muted/10 text-muted-foreground'
                    )}>
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-border/50 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Location</span>
                  <p className="text-sm font-medium">{selectedBooking.location || 'Not set'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Guest Count</span>
                  <p className="text-sm font-medium">{selectedBooking.guestCount || 'Not set'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-border/50 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Amount Quoted</span>
                  <p className="text-sm font-medium">{selectedBooking.amountQuoted ? `RWF ${selectedBooking.amountQuoted.toLocaleString()}` : 'Not set'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Source Page</span>
                  <p className="text-sm font-medium">{selectedBooking.sourcePage || 'Unknown'}</p>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase text-muted-foreground">Message / Notes</span>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedBooking.message || selectedBooking.notes || 'No notes provided.'}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)} className="rounded-none w-full">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="rounded-none border-border/70 sm:max-w-[425px]">
          <form onSubmit={handleEditBooking}>
            <DialogHeader>
              <DialogTitle>Edit Booking</DialogTitle>
              <DialogDescription>
                Update the information for {selectedBooking?.bookingCode}
              </DialogDescription>
            </DialogHeader>
            {selectedBooking && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-client" className="text-xs font-semibold uppercase tracking-wider">Client Name</Label>
                  <Input id="edit-client" name="client" defaultValue={selectedBooking.clientName} required className="rounded-none border-border/70" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email" className="text-xs font-semibold uppercase tracking-wider">Email Address</Label>
                    <Input id="edit-email" name="email" type="email" defaultValue={selectedBooking.email} required className="rounded-none border-border/70" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-phone" className="text-xs font-semibold uppercase tracking-wider">Phone Number</Label>
                    <Input id="edit-phone" name="phone" defaultValue={selectedBooking.phone} required className="rounded-none border-border/70" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-service" className="text-xs font-semibold uppercase tracking-wider">Service Type</Label>
                  <Select name="service" defaultValue={selectedBooking.serviceType}>
                    <SelectTrigger id="edit-service" className="rounded-none border-border/70">
                      <SelectValue />
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
                  <Label htmlFor="edit-date" className="text-xs font-semibold uppercase tracking-wider">Event Date</Label>
                  <Input id="edit-date" name="date" type="date" defaultValue={selectedBooking.eventDate ? new Date(selectedBooking.eventDate).toISOString().split('T')[0] : ''} className="rounded-none border-border/70" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-location" className="text-xs font-semibold uppercase tracking-wider">Location</Label>
                    <Input id="edit-location" name="location" defaultValue={selectedBooking.location || ''} className="rounded-none border-border/70" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-guests" className="text-xs font-semibold uppercase tracking-wider">Guests</Label>
                    <Input id="edit-guests" name="guests" type="number" defaultValue={selectedBooking.guestCount || ''} className="rounded-none border-border/70" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-notes" className="text-xs font-semibold uppercase tracking-wider">Notes</Label>
                  <textarea id="edit-notes" name="notes" defaultValue={selectedBooking.notes || ''} className="min-h-[80px] w-full rounded-none border border-border/70 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" className="rounded-none w-full" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
