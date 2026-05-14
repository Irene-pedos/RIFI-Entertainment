"use client"

import * as React from "react"
import {
  ImageIcon,
  MoreHorizontal,
  Plus,
  Search,
  Upload,
  Loader2,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  X,
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { trpc } from "@/lib/trpc"
import { cn } from "@/lib/utils"
import { env } from "@/env"
import type { AppRouter } from "@/server/api/root"
import type { inferRouterOutputs } from "@trpc/server"
import { MediaAsset, MediaCategory as PrismaMediaCategory, ServiceCategory } from "@prisma/client"

type RouterOutputs = inferRouterOutputs<AppRouter>;
type MediaItem = RouterOutputs["media"]["list"][number];
type MediaCategory = 'HERO' | 'GALLERY' | 'SERVICE' | 'TEAM' | 'OTHER';

export default function AdminMediaLibrary() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<MediaCategory | "ALL">("ALL")
  const [selectedService, setSelectedService] = React.useState<string | "ALL">("ALL")
  const [isUploadOpen, setIsUploadOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<MediaItem | null>(null)
  
  // Upload form state
  const [uploadAltText, setUploadAltText] = React.useState("")
  const [uploadCategory, setUploadAltCategory] = React.useState<MediaCategory>("GALLERY")
  const [uploadService, setUploadService] = React.useState<string>("NONE")
  const [selectedFileName, setSelectedFileName] = React.useState<string | null>(null)

  const [feedback, setFeedback] = React.useState<{ type: 'success' | 'error', message: string } | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  
  const utils = trpc.useUtils()

  React.useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [feedback])

  const { data: mediaItems, isLoading } = trpc.media.list.useQuery({
    category: selectedCategory === "ALL" ? undefined : selectedCategory as PrismaMediaCategory,
    serviceType: selectedService === "ALL" ? undefined : selectedService as ServiceCategory,
  })

  const createMetadataMutation = trpc.media.createMetadata.useMutation({
    onSuccess: () => {
      utils.media.list.invalidate()
      setIsUploadOpen(false)
      setUploadAltText("")
      setSelectedFileName(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setFeedback({ type: 'success', message: 'File uploaded and registered successfully' })
    },
    onError: (error) => {
      setFeedback({ type: 'error', message: `Metadata error: ${error.message}` })
    }
  })

  const getUploadUrlMutation = trpc.media.getUploadUrl.useMutation()

  const updateMetadataMutation = trpc.media.updateMetadata.useMutation({
    onSuccess: () => {
      utils.media.list.invalidate()
      setIsEditOpen(false)
      setFeedback({ type: 'success', message: 'Metadata updated successfully' })
    },
    onError: (error) => {
      setFeedback({ type: 'error', message: error.message })
    }
  })

  const deleteMetadataMutation = trpc.media.deleteMetadata.useMutation({
    onSuccess: () => {
      utils.media.list.invalidate()
      setFeedback({ type: 'success', message: 'File deleted successfully' })
    },
    onError: (error) => {
      setFeedback({ type: 'error', message: error.message })
    }
  })

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      setFeedback({ type: 'error', message: 'Please select a file first' })
      return
    }

    try {
      setUploading(true)

      // 1. Get signed upload URL
      const { uploadUrl, path, fileName } = await getUploadUrlMutation.mutateAsync({
        fileName: file.name,
        contentType: file.type,
      })

      // 2. Upload directly to Supabase
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      })

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to storage")
      }

      // 3. Register metadata
      const publicUrl = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/rifi-media/${path}`

      await createMetadataMutation.mutateAsync({
        fileName,
        originalName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        publicUrl,
        storagePath: path,
        altText: uploadAltText,
        category: uploadCategory as PrismaMediaCategory,
        serviceType: uploadService === "NONE" ? null : uploadService as ServiceCategory,
      })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Upload error occurred";
      setFeedback({ type: 'error', message: `Upload error: ${message}` })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (item: MediaItem) => {
    if (!confirm("Are you sure you want to delete this file? This cannot be undone.")) return
    deleteMetadataMutation.mutate(item.id)
  }

  const filteredItems = mediaItems?.filter(item => 
    item.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.altText?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }
    setFeedback(null);
  };

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
          <h1 className="text-3xl font-semibold tracking-tight">Media Library</h1>
          <p className="text-sm text-muted-foreground">
            Upload and organize images and videos used across the RiFi Entertainment website.
          </p>
        </div>
        <Button className="rounded-none" onClick={() => setIsUploadOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add Media
        </Button>
      </div>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="rounded-none border-border/70 sm:max-w-[425px]">
          <form onSubmit={handleUpload}>
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
              <DialogDescription>
                Add new images or videos with descriptive information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div 
                className="flex flex-col items-center justify-center border-2 border-dashed border-border/70 bg-muted/10 py-8 transition-colors hover:bg-muted/20 cursor-pointer"
                onClick={() => !uploading && fileInputRef.current?.click()}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="size-8 animate-spin text-primary" />
                    <p className="text-[10px] font-medium animate-pulse">Uploading file...</p>
                  </div>
                ) : (
                  <>
                    <Upload className="size-8 text-muted-foreground opacity-40" />
                    <p className="mt-4 text-xs font-medium text-muted-foreground text-center px-4">
                      {selectedFileName || "Click to select a file"}
                    </p>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/*,video/*"
                    />
                  </>
                )}
              </div>

              <div className="grid gap-2">
                <Label className="text-xs font-semibold uppercase tracking-wider">Alt Text / Description</Label>
                <Input 
                  value={uploadAltText} 
                  onChange={(e) => setUploadAltText(e.target.value)}
                  placeholder="What is in this media?" 
                  className="rounded-none border-border/70"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">Category</Label>
                  <Select value={uploadCategory} onValueChange={(val: MediaCategory) => setUploadAltCategory(val)}>
                    <SelectTrigger className="rounded-none border-border/70">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="HERO">Hero</SelectItem>
                      <SelectItem value="GALLERY">Gallery</SelectItem>
                      <SelectItem value="SERVICE">Service</SelectItem>
                      <SelectItem value="TEAM">Team</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">Service</Label>
                  <Select value={uploadService} onValueChange={setUploadService}>
                    <SelectTrigger className="rounded-none border-border/70">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="NONE">None</SelectItem>
                      <SelectItem value="WEDDING">Wedding</SelectItem>
                      <SelectItem value="DANCE">Dance</SelectItem>
                      <SelectItem value="MODELS">Models</SelectItem>
                      <SelectItem value="PROTOCOL">Protocol</SelectItem>
                      <SelectItem value="TOURS">Tours</SelectItem>
                      <SelectItem value="MEDIA">Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="rounded-none w-full" disabled={uploading}>
                {uploading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Upload className="mr-2 size-4" />}
                Upload Media
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="rounded-none border-border/70 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Media Info</DialogTitle>
            <DialogDescription>
              Update category and descriptive text for this asset.
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label className="text-xs font-semibold uppercase tracking-wider">Alt Text</Label>
                <Input 
                  value={editingItem.altText || ""} 
                  onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                  placeholder="Describe the image..." 
                  className="rounded-none border-border/70" 
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-semibold uppercase tracking-wider">Category</Label>
                <Select 
                  value={editingItem.category} 
                  onValueChange={(val: PrismaMediaCategory) => setEditingItem({ ...editingItem, category: val })}
                >
                  <SelectTrigger className="rounded-none border-border/70">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="HERO">Hero</SelectItem>
                    <SelectItem value="GALLERY">Gallery</SelectItem>
                    <SelectItem value="SERVICE">Service</SelectItem>
                    <SelectItem value="TEAM">Team</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-semibold uppercase tracking-wider">Service Category</Label>
                <Select 
                  value={editingItem.serviceType || "NONE"} 
                  onValueChange={(val: string) => setEditingItem({ ...editingItem, serviceType: val === "NONE" ? null : val as ServiceCategory })}
                >
                  <SelectTrigger className="rounded-none border-border/70">
                    <SelectValue placeholder="No specific service" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="NONE">No specific service</SelectItem>
                    <SelectItem value="WEDDING">Wedding</SelectItem>
                    <SelectItem value="DANCE">Dance</SelectItem>
                    <SelectItem value="MODELS">Models</SelectItem>
                    <SelectItem value="PROTOCOL">Protocol</SelectItem>
                    <SelectItem value="TOURS">Tours & Travel</SelectItem>
                    <SelectItem value="MEDIA">Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              className="rounded-none w-full" 
              onClick={() => editingItem && updateMetadataMutation.mutate({
                id: editingItem.id,
                data: { 
                  altText: editingItem.altText, 
                  category: editingItem.category,
                  serviceType: editingItem.serviceType
                }
              })}
              disabled={updateMetadataMutation.isPending}
            >
              {updateMetadataMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/70 pb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search media..."
            className="rounded-none pl-9 border-border/70 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <Select value={selectedCategory} onValueChange={(val: string) => setSelectedCategory(val as MediaCategory | "ALL")}>
              <SelectTrigger className="rounded-none h-9 w-[150px] border-border/70">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="HERO">Hero</SelectItem>
                <SelectItem value="GALLERY">Gallery</SelectItem>
                <SelectItem value="SERVICE">Service</SelectItem>
                <SelectItem value="TEAM">Team</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
           </Select>
           <Select value={selectedService} onValueChange={(val: string) => setSelectedService(val)}>
              <SelectTrigger className="rounded-none h-9 w-[150px] border-border/70">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="ALL">All Services</SelectItem>
                <SelectItem value="WEDDING">Wedding</SelectItem>
                <SelectItem value="DANCE">Dance</SelectItem>
                <SelectItem value="MODELS">Models</SelectItem>
                <SelectItem value="PROTOCOL">Protocol</SelectItem>
                <SelectItem value="TOURS">Tours</SelectItem>
                <SelectItem value="MEDIA">Media</SelectItem>
              </SelectContent>
           </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredItems?.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No media files found.
          </div>
        ) : filteredItems?.map((item) => (
          <Card key={item.id} className="group relative overflow-hidden rounded-none border-border/70 bg-card shadow-sm transition-all hover:border-primary/50">
            <CardHeader className="p-0">
               <div className="relative aspect-square overflow-hidden border-b border-border/70">
                  <Image 
                    src={item.publicUrl} 
                    alt={item.altText || item.originalName} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
               </div>
            </CardHeader>
            <CardContent className="p-2 pt-3">
              <p className="truncate text-[11px] font-bold leading-tight text-primary">
                {item.altText || "Untitled Asset"}
              </p>
              <p className="mt-0.5 truncate text-[9px] text-muted-foreground italic">
                {item.originalName}
              </p>
              <div className="mt-2 flex items-center justify-between border-t border-border/40 pt-1.5">
                <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">{item.category}</span>
                <span className="text-[9px] text-muted-foreground">{(item.fileSize / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </CardContent>
            <div className="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon-xs" className="rounded-none size-6 shadow-md border border-border/70">
                        <MoreHorizontal className="size-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-none">
                    <DropdownMenuLabel>Media Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => { setEditingItem(item); setIsEditOpen(true); }}>
                      <Edit className="mr-2 size-4" />
                      Edit Metadata
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(item.publicUrl, '_blank')}>
                      <ImageIcon className="mr-2 size-4" />
                      View Original
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(item)}>
                      <Trash2 className="mr-2 size-4" />
                      Delete File
                    </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
