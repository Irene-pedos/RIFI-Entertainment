"use client"

import * as React from "react"
import {
  Mail,
  MoreHorizontal,
  Search,
  Trash2,
  Loader2,
  CheckCircle2,
  X,
  AlertCircle,
  Eye,
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
} from "@/components/ui/dialog"
import { trpc } from "@/lib/trpc"
import { cn } from "@/lib/utils"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/server/api/root"

type RouterOutputs = inferRouterOutputs<AppRouter>
type Inquiry = RouterOutputs['inquiry']['list'][number]

export default function InquiriesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [selectedInquiry, setSelectedInquiry] = React.useState<Inquiry | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)
  const [feedback, setFeedback] = React.useState<{ type: 'success' | 'error', message: string } | null>(null)
  
  const utils = trpc.useUtils()

  React.useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [feedback])

  const { data: inquiries, isLoading } = trpc.inquiry.list.useQuery()

  const markReadMutation = trpc.inquiry.markRead.useMutation({
    onSuccess: () => {
      utils.inquiry.list.invalidate()
      setFeedback({ type: 'success', message: 'Marked as read' })
    },
  })

  const markRepliedMutation = trpc.inquiry.markReplied.useMutation({
    onSuccess: () => {
      utils.inquiry.list.invalidate()
      setFeedback({ type: 'success', message: 'Marked as replied' })
    },
  })

  const deleteMutation = trpc.inquiry.delete.useMutation({
    onSuccess: () => {
      utils.inquiry.list.invalidate()
      setFeedback({ type: 'success', message: 'Message deleted' })
    },
  })

  const bulkMarkRepliedMutation = trpc.inquiry.bulkMarkReplied.useMutation({
    onSuccess: () => {
      utils.inquiry.list.invalidate()
      setSelectedIds(new Set())
      setFeedback({ type: 'success', message: 'Messages marked as replied' })
    },
  })

  const bulkDeleteMutation = trpc.inquiry.bulkDelete.useMutation({
    onSuccess: () => {
      utils.inquiry.list.invalidate()
      setSelectedIds(new Set())
      setFeedback({ type: 'success', message: 'Messages deleted' })
    },
  })

  const filteredInquiries = inquiries?.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredInquiries?.length && filteredInquiries.length > 0) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredInquiries?.map(i => i.id)))
    }
  }

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedIds(newSet)
  }

  const unreadCount = inquiries?.filter(i => i.status === "NEW").length || 0
  const repliedCount = inquiries?.filter(i => i.status === "RESOLVED").length || 0

  const handleViewDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setIsDetailsOpen(true)
    if (inquiry.status === 'NEW') {
      markReadMutation.mutate(inquiry.id)
    }
  }

  return (
    <div className="space-y-6 pt-6 relative">
      {/* Feedback Message */}
      {feedback && (
        <div className={cn(
          "fixed top-4 right-4 z-50 flex items-center gap-3 p-4  border rounded-none transition-all duration-300 animate-in fade-in slide-in-from-top-4",
          feedback.type === 'success' ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-destructive/5 border-destructive/20 text-destructive"
        )}>
          {feedback.type === 'success' ? <CheckCircle2 className="size-5" /> : <AlertCircle className="size-5" />}
          <p className="text-sm font-medium">{feedback.message}</p>
          <button onClick={() => setFeedback(null)} className="ml-2 hover:opacity-70">
            <X className="size-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Messages & Inquiries</h1>
          <p className="text-sm text-muted-foreground">
            Review and respond to messages received from the contact form.
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
                <DropdownMenuItem onClick={() => bulkMarkRepliedMutation.mutate({ ids: Array.from(selectedIds) })}>
                  <CheckCircle2 className="mr-2 size-4" />
                  Mark as Replied
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => {
                  if (confirm(`Delete ${selectedIds.size} messages?`)) {
                    bulkDeleteMutation.mutate({ ids: Array.from(selectedIds) })
                  }
                }}>
                  <Trash2 className="mr-2 size-4" />
                  Delete Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiries?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Unread
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Replied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{repliedCount}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Response Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inquiries?.length ? Math.round((repliedCount / inquiries.length) * 100) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-none border-border/70 shadow-sm">
        <CardHeader className="border-b border-border/70 bg-muted/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="rounded-none pl-9 border-border/70 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                    checked={!!filteredInquiries?.length && selectedIds.size === filteredInquiries.length}
                    onChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Contact</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Subject</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Message Preview</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <Loader2 className="animate-spin size-6 mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredInquiries?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              ) : filteredInquiries?.map((inquiry) => (
                <TableRow 
                  key={inquiry.id} 
                  className={cn(
                    "hover:bg-muted/30 border-b border-border/70 transition-colors",
                    inquiry.status === 'NEW' && 'bg-primary/5',
                    selectedIds.has(inquiry.id) && 'bg-primary/10'
                  )}
                >
                  <TableCell>
                    <input 
                      type="checkbox" 
                      className="size-4 accent-primary rounded-none"
                      checked={selectedIds.has(inquiry.id)}
                      onChange={() => toggleSelect(inquiry.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-sm",
                        inquiry.status === 'NEW' ? 'font-bold' : 'font-medium'
                      )}>{inquiry.name}</span>
                      <span className="text-[10px] text-muted-foreground">{inquiry.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{inquiry.subject || "(No Subject)"}</TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate text-xs text-muted-foreground">
                      {inquiry.message}
                    </p>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "inline-flex items-center border px-2 py-0.5 text-[10px] font-medium uppercase tracking-tight",
                      inquiry.status === 'NEW' ? 'border-primary/20 bg-primary/10 text-primary' :
                      inquiry.status === 'RESOLVED' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' :
                      'border-border/70 bg-muted/50 text-muted-foreground'
                    )}>
                      {inquiry.status}
                    </span>
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
                        <DropdownMenuItem onClick={() => handleViewDetails(inquiry)}>
                          <Eye className="mr-2 size-4" />
                          View Full Message
                        </DropdownMenuItem>
                        {inquiry.status === 'NEW' && (
                          <DropdownMenuItem onClick={() => markReadMutation.mutate(inquiry.id)}>
                            <Mail className="mr-2 size-4" />
                            Mark as Read
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-emerald-600 font-medium"
                          onClick={() => markRepliedMutation.mutate(inquiry.id)}
                        >
                          <CheckCircle2 className="mr-2 size-4" />
                          Mark as Replied
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => {
                            if (confirm("Delete this message?")) {
                              deleteMutation.mutate(inquiry.id)
                            }
                          }}
                        >
                          <Trash2 className="mr-2 size-4" />
                          Delete
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
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="rounded-none border-border/70 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              From {selectedInquiry?.name} on {selectedInquiry && new Date(selectedInquiry.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4 border-b border-border/50 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">From</span>
                  <p className="text-sm font-medium">{selectedInquiry.name}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Email</span>
                  <p className="text-sm font-medium">{selectedInquiry.email}</p>
                </div>
              </div>
              {selectedInquiry.phone && (
                <div className="space-y-1 border-b border-border/50 pb-4">
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">Phone</span>
                  <p className="text-sm font-medium">{selectedInquiry.phone}</p>
                </div>
              )}
              <div className="space-y-1 border-b border-border/50 pb-4">
                <span className="text-[10px] font-semibold uppercase text-muted-foreground">Subject</span>
                <p className="text-sm font-medium">{selectedInquiry.subject || "(No Subject)"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase text-muted-foreground">Message</span>
                <p className="text-sm leading-relaxed whitespace-pre-wrap bg-muted/30 p-4 border border-border/50">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="rounded-none flex-1"
              onClick={() => {
                if (selectedInquiry) markRepliedMutation.mutate(selectedInquiry.id)
                setIsDetailsOpen(false)
              }}
            >
              <CheckCircle2 className="mr-2 size-4" />
              Mark as Replied
            </Button>
            <Button onClick={() => setIsDetailsOpen(false)} className="rounded-none flex-1">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
