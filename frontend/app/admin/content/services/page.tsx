import {
  Edit3,
  Plus,
  Search,
  Trash2,
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

const services = [
  { 
    title: "Wedding Organization", 
    category: "Events", 
    price: "Flexible", 
    status: "Active",
    description: "Full-service wedding planning, decoration, and coordination."
  },
  { 
    title: "Model Management", 
    category: "Talent", 
    price: "Fixed", 
    status: "Active",
    description: "Professional model coordination and portfolio development."
  },
  { 
    title: "Protocol Services", 
    category: "Hospitality", 
    price: "Hourly", 
    status: "Active",
    description: "VIP guest reception and event protocol management."
  },
  { 
    title: "Dance Entertainment", 
    category: "Performances", 
    price: "Per Show", 
    status: "Active",
    description: "Traditional and modern dance shows for corporate and private events."
  },
]

export default function AdminServicesManager() {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Services List</h1>
          <p className="text-sm text-muted-foreground">
            Manage your core business offerings and pricing models.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-none">
              <Plus className="mr-2 size-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-none border-border/70 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new service offering for the website.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider">Service Title</Label>
                <Input id="title" placeholder="e.g. Wedding Planning" className="rounded-none border-border/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider">Category</Label>
                <Select>
                  <SelectTrigger id="category" className="rounded-none border-border/70">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-border/70">
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="talent">Talent</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="performances">Performances</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-xs font-semibold uppercase tracking-wider">Pricing Model</Label>
                <Input id="price" placeholder="e.g. Flexible, Fixed, Hourly" className="rounded-none border-border/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider">Description</Label>
                <Textarea id="description" placeholder="Briefly describe the service..." className="rounded-none border-border/70 min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="rounded-none w-full">Save Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 border-b border-border/70 pb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="rounded-none pl-9 border-border/70 bg-background"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="rounded-none border-border/70 shadow-sm transition-all hover:border-primary/50">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-primary border border-primary/20 bg-primary/5 px-1.5 py-0.5">
                    {service.category}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                    {service.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" className="rounded-none">
                  <Edit3 className="size-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="rounded-none text-destructive">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Pricing Model</span>
                  <span className="text-sm font-bold">{service.price}</span>
                </div>
                <Button variant="outline" size="sm" className="rounded-none text-xs">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
