import {
  MoreHorizontal,
  Plus,
  Quote,
  Search,
  Star,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"

const testimonials = [
  {
    id: "TEST-001",
    author: "Alice Umutoni",
    role: "Bride",
    quote: "RiFi made our wedding planning stress-free and absolutely beautiful. Their team is professional and creative.",
    rating: 5,
    status: "Published",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "TEST-002",
    author: "Robert Kabera",
    role: "Event Manager",
    quote: "The protocol services provided by RiFi were top-notch. Our corporate guests were impressed with the hospitality.",
    rating: 5,
    status: "Published",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    id: "TEST-003",
    author: "Sandrine Iradukunda",
    role: "Private Host",
    quote: "The dance performance was the highlight of our party. Energy, culture, and pure entertainment!",
    rating: 4,
    status: "Draft",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
  },
]

export default function AdminTestimonialsManager() {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Client Testimonials</h1>
          <p className="text-sm text-muted-foreground">
            Manage customer feedback and success stories displayed on the website.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-none">
              <Plus className="mr-2 size-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-none border-border/70 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>
                Submit a new client success story for the website gallery.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="author" className="text-xs font-semibold uppercase tracking-wider">Client Name</Label>
                <Input id="author" placeholder="e.g. Alice Umutoni" className="rounded-none border-border/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider">Client Role</Label>
                <Input id="role" placeholder="e.g. Bride, Event Manager" className="rounded-none border-border/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating" className="text-xs font-semibold uppercase tracking-wider">Rating</Label>
                <Select>
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
                <Textarea id="quote" placeholder="Enter the client's feedback..." className="rounded-none border-border/70 min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="rounded-none w-full">Publish Testimonial</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-none border-border/70 shadow-sm">
        <CardHeader className="border-b border-border/70 bg-muted/10">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search testimonials..."
              className="rounded-none pl-9 border-border/70 bg-background"
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
              {testimonials.map((test) => (
                <TableRow key={test.id} className="hover:bg-muted/30 border-b border-border/70">
                  <TableCell className="w-[200px]">
                    <div className="flex items-center gap-3">
                      <Avatar className="rounded-none border border-border/70 size-10">
                        <AvatarImage src={test.image} className="object-cover" />
                        <AvatarFallback className="rounded-none">{test.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{test.author}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{test.role}</span>
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
                      test.status === 'Published' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' : 'border-border/70 bg-muted/50 text-muted-foreground'
                    }`}>
                      {test.status}
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
                        <DropdownMenuItem>Edit Testimonial</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Published</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
