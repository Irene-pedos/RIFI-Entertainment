"use client"

import * as React from "react"
import {
  Edit3,
  Plus,
  Search,
  Trash2,
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
import { ServiceCategory } from "@/server/types"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/server/api/root"

type RouterOutputs = inferRouterOutputs<AppRouter>
type Service = RouterOutputs['service']['listAdmin'][number]

const categories: ServiceCategory[] = ['WEDDING', 'DANCE', 'MODELS', 'PROTOCOL', 'TOURS', 'MEDIA'];

export default function AdminServicesManager() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingService, setEditingService] = React.useState<Service | null>(null)
  
  const utils = trpc.useUtils()
  const { data: services, isLoading } = trpc.service.listAdmin.useQuery()
  
  const createMutation = trpc.service.create.useMutation({
    onSuccess: () => {
      utils.service.listAdmin.invalidate()
      setIsDialogOpen(false)
      resetForm()
    }
  })
  
  const updateMutation = trpc.service.update.useMutation({
    onSuccess: () => {
      utils.service.listAdmin.invalidate()
      setIsDialogOpen(false)
      resetForm()
    }
  })
  
  const deleteMutation = trpc.service.delete.useMutation({
    onSuccess: () => utils.service.listAdmin.invalidate()
  })

  const [formData, setFormData] = React.useState({
    title: "",
    slug: "",
    category: 'WEDDING' as ServiceCategory,
    pricingLabel: "",
    shortDescription: "",
    isActive: true,
  })

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      category: 'WEDDING',
      pricingLabel: "",
      shortDescription: "",
      isActive: true,
    })
    setEditingService(null)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      slug: service.slug,
      category: service.category as ServiceCategory,
      pricingLabel: service.pricingLabel || "",
      shortDescription: service.shortDescription || "",
      isActive: service.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingService) {
      updateMutation.mutate({
        id: editingService.id,
        data: formData
      })
    } else {
      createMutation.mutate(formData)
    }
  }

  const filteredServices = services?.filter((service: Service) => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Services List</h1>
          <p className="text-sm text-muted-foreground">
            Manage your core business offerings and pricing models.
          </p>
        </div>
        <Button className="rounded-none" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
          <Plus className="mr-2 size-4" />
          Add Service
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-none border-border/70 sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
              <DialogDescription>
                {editingService ? "Update the service details." : "Create a new service offering for the website."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider">Service Title</Label>
                <Input 
                  id="title" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="e.g. Wedding Planning" 
                  className="rounded-none border-border/70" 
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug" className="text-xs font-semibold uppercase tracking-wider">Slug</Label>
                <Input 
                  id="slug" 
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. wedding-planning" 
                  className="rounded-none border-border/70" 
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value as ServiceCategory })}
                >
                  <SelectTrigger id="category" className="rounded-none border-border/70">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-border/70">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-xs font-semibold uppercase tracking-wider">Pricing Model</Label>
                <Input 
                  id="price" 
                  value={formData.pricingLabel}
                  onChange={(e) => setFormData({ ...formData, pricingLabel: e.target.value })}
                  placeholder="e.g. Flexible, Fixed, Hourly" 
                  className="rounded-none border-border/70" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider">Description</Label>
                <Textarea 
                  id="description" 
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Briefly describe the service..." 
                  className="rounded-none border-border/70 min-h-[100px]" 
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
                {editingService ? "Update Service" : "Save Service"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-4 border-b border-border/70 pb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="rounded-none pl-9 border-border/70 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredServices?.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No services found.
          </div>
        ) : filteredServices?.map((service) => (
          <Card key={service.id} className="rounded-none border-border/70 shadow-sm transition-all hover:border-primary/50">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-primary border border-primary/20 bg-primary/5 px-1.5 py-0.5">
                    {service.category}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${service.isActive ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" className="rounded-none" onClick={() => handleEdit(service)}>
                  <Edit3 className="size-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  className="rounded-none text-destructive"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this service?")) {
                      deleteMutation.mutate(service.id)
                    }
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {service.shortDescription}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Pricing Model</span>
                  <span className="text-sm font-bold">{service.pricingLabel || "Contact for Pricing"}</span>
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
