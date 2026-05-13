"use client"

import * as React from "react"
import {
  MoreHorizontal,
  Plus,
  Quote,
  Search,
  Star,
  Loader2,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/lib/trpc"

export default function AdminTestimonialsManager() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingTestimonial, setEditingTestimonial] = React.useState<any>(null)

  const utils = trpc.useUtils()
  const { data: testimonials, isLoading } = trpc.testimonial.listAdmin.useQuery()

  const createMutation = trpc.testimonial.create.useMutation({
    onSuccess: () => {
      utils.testimonial.listAdmin.invalidate()
      setIsDialogOpen(false)
      resetForm()
    }
  })

  const updateMutation = trpc.testimonial.update.useMutation({
    onSuccess: () => {
      utils.testimonial.listAdmin.invalidate()
      setIsDialogOpen(false)
      resetForm()
    }
  })

  const deleteMutation = trpc.testimonial.delete.useMutation({
    onSuccess: () => utils.testimonial.listAdmin.invalidate()
  })

  const publishToggleMutation = trpc.testimonial.publishToggle.useMutation({
    onSuccess: () => utils.testimonial.listAdmin.invalidate()
  })

  const [formData, setFormData] = React.useState({
    clientName: "",
    clientRole: "",
    quote: "",
    rating: 5,
    isPublished: false,
  })

  const resetForm = () => {
    setFormData({
      clientName: "",
      clientRole: "",
      quote: "",
      rating: 5,
      isPublished: false,
    })
    setEditingTestimonial(null)
  }

  const handleEdit = (test: any) => {
    setEditingTestimonial(test)
    setFormData({
      clientName: test.clientName,
      clientRole: test.clientRole || "",
      quote: test.quote,
      rating: test.rating,
      isPublished: test.isPublished,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTestimonial) {
      updateMutation.mutate({
        id: editingTestimonial.id,
        data: formData
      })
    } else {
      createMutation.mutate(formData)
    }
  }

  const filteredTestimonials = testimonials?.filter(test => 
    test.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.quote.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Client Testimonials</h1>
          <p className="text-sm text-muted-foreground">
            Manage customer feedback and success stories displayed on the website.
          </p>
        </div>
        <Button className="rounded-none" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
          <Plus className="mr-2 size-4" />
          Add Testimonial
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-none border-border/70 sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
              <DialogDescription>
                {editingTestimonial ? "Update the testimonial details." : "Submit a new client success story for the website gallery."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="author" className="text-xs font-semibold uppercase tracking-wider">Client Name</Label>
                <Input 
                  id="author" 
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Alice Umutoni" 
                  className="rounded-none border-border/70" 
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider">Client Role</Label>
                <Input 
                  id="role" 
                  value={formData.clientRole}
                  onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                  placeholder="e.g. Bride, Event Manager" 
                  className="rounded-none border-border/70" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating" className="text-xs font-semibold uppercase tracking-wider">Rating</Label>
                <Select 
                  value={formData.rating.toString()} 
                  onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                >
                  <SelectTrigger id="rating" className="rounded-none border-border/70">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-border/70">
                    <SelectItem value="5">5 Stars - Excellent</SelectItem>
                    <SelectItem value="4">4 Stars - Very Good</SelectItem>
                    <SelectItem value="3">3 Stars - Good</SelectItem>
                    <SelectItem value="2">2 Stars - Fair</SelectItem>
                    <SelectItem value="1">1 Star - Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quote" className="text-xs font-semibold uppercase tracking-wider">Testimonial Quote</Label>
                <Textarea 
                  id="quote" 
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Enter the client's feedback..." 
                  className="rounded-none border-border/70 min-h-[100px]" 
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                className="rounded-none w-full"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="mr-2 size-4 animate-spin" />}
                {editingTestimonial ? "Update Testimonial" : "Publish Testimonial"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="rounded-none border-border/70 shadow-sm">
        <CardHeader className="border-b border-border/70 bg-muted/10">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search testimonials..."
              className="rounded-none pl-9 border-border/70 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/70">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Client</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Testimonial</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Rating</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Loader2 className="animate-spin size-6 mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredTestimonials?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No testimonials found.
                  </TableCell>
                </TableRow>
              ) : filteredTestimonials?.map((test) => (
                <TableRow key={test.id} className="hover:bg-muted/30 border-b border-border/70">
                  <TableCell className="w-[200px]">
                    <div className="flex items-center gap-3">
                      <Avatar className="rounded-none border border-border/70 size-10">
                        <AvatarFallback className="rounded-none">{test.clientName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{test.clientName}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{test.clientRole}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[400px]">
                    <div className="flex gap-2">
                       <Quote className="size-3 text-primary shrink-0 opacity-40 mt-1" />
                       <p className="text-xs text-muted-foreground leading-relaxed italic">
                        {test.quote}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`size-3 ${i < test.rating ? 'fill-primary text-primary' : 'text-muted-foreground opacity-30'}`} 
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center border px-2 py-0.5 text-[10px] font-medium ${
                      test.isPublished ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' : 'border-border/70 bg-muted/50 text-muted-foreground'
                    }`}>
                      {test.isPublished ? 'Published' : 'Draft'}
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
                        <DropdownMenuItem onClick={() => handleEdit(test)}>
                          <Edit className="mr-2 size-4" />
                          Edit Testimonial
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => publishToggleMutation.mutate({ id: test.id, isPublished: !test.isPublished })}>
                          {test.isPublished ? <XCircle className="mr-2 size-4" /> : <CheckCircle className="mr-2 size-4" />}
                          {test.isPublished ? "Mark as Draft" : "Mark as Published"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this testimonial?")) {
                              deleteMutation.mutate(test.id)
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
    </div>
  )
}
