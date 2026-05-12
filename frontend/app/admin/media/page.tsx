import {
  FileIcon,
  Filter,
  ImageIcon,
  MoreHorizontal,
  Plus,
  Search,
  Upload,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
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

const mediaItems = [
  {
    id: "med-001",
    name: "Wedding Reception Gala",
    type: "image",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    size: "1.2 MB",
    dimension: "2400 x 1800",
  },
  {
    id: "med-002",
    name: "Fashion Shoot - Summer",
    type: "image",
    url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=300&fit=crop",
    size: "850 KB",
    dimension: "1200 x 1600",
  },
  {
    id: "med-003",
    name: "Traditional Dance Performance",
    type: "image",
    url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop",
    size: "2.4 MB",
    dimension: "3200 x 2400",
  },
  {
    id: "med-004",
    name: "VIP Protocol Event",
    type: "image",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
    size: "1.5 MB",
    dimension: "2000 x 1500",
  },
  {
    id: "med-005",
    name: "Model Portfolio - male",
    type: "image",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    size: "920 KB",
    dimension: "1500 x 2000",
  },
  {
    id: "med-006",
    name: "Corporate Gala Highlights",
    type: "image",
    url: "https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?w=400&h=300&fit=crop",
    size: "3.1 MB",
    dimension: "4000 x 3000",
  },
]

export default function AdminMediaLibrary() {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Media Library</h1>
          <p className="text-sm text-muted-foreground">
            Upload and organize images and videos used across the RiFi Entertainment website.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-none">
              <Upload className="mr-2 size-4" />
              Upload Files
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-none border-border/70 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
              <DialogDescription>
                Add new images or videos to your media library.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fileName" className="text-xs font-semibold uppercase tracking-wider">File Name (Optional)</Label>
                <Input id="fileName" placeholder="e.g. Wedding Highlight 2026" className="rounded-none border-border/70" />
              </div>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-border/70 bg-muted/10 py-10 transition-colors hover:bg-muted/20">
                <Upload className="size-8 text-muted-foreground opacity-40" />
                <p className="mt-4 text-xs font-medium text-muted-foreground">
                  Drag and drop files here or <span className="text-primary underline cursor-pointer">browse</span>
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground/60">
                  Maximum file size: 10MB (JPG, PNG, MP4)
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="rounded-none w-full">Start Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/70 pb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search media..."
            className="rounded-none pl-9 border-border/70 bg-background"
          />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="rounded-none h-9">
              <Filter className="mr-2 size-4" />
              Filter
            </Button>
            <Button variant="ghost" size="icon-sm" className="rounded-none">
              <ImageIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" className="rounded-none opacity-40">
              <FileIcon className="size-4" />
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {mediaItems.map((item) => (
          <Card key={item.id} className="group relative overflow-hidden rounded-none border-border/70 bg-card shadow-sm transition-all hover:border-primary/50">
            <CardHeader className="p-0">
               <div className="relative aspect-square overflow-hidden border-b border-border/70">
                  <Image 
                    src={item.url} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
               </div>
            </CardHeader>
            <CardContent className="p-2 pt-3">
              <p className="truncate text-[11px] font-medium leading-tight">
                {item.name}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[9px] text-muted-foreground uppercase font-semibold">{item.type}</span>
                <span className="text-[9px] text-muted-foreground">{item.size}</span>
              </div>
            </CardContent>
            <div className="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100">
               <Button variant="secondary" size="icon-xs" className="rounded-none size-6 shadow-md border border-border/70">
                  <MoreHorizontal className="size-3" />
               </Button>
            </div>
          </Card>
        ))}
        <button className="flex aspect-square flex-col items-center justify-center border-2 border-dashed border-border/70 bg-muted/20 transition-colors hover:border-primary/50 hover:bg-muted/40">
           <Plus className="size-6 text-muted-foreground" />
           <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Add New</span>
        </button>
      </div>
    </div>
  )
}
