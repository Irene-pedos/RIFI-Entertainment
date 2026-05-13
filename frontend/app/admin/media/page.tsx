"use client"

import * as React from "react"
import {
  FileIcon,
  Filter,
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
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

type MediaCategory = 'HERO' | 'GALLERY' | 'SERVICE' | 'TEAM' | 'OTHER';

export default function AdminMediaLibrary() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<MediaCategory | "ALL">("ALL")
  const [isUploadOpen, setIsUploadOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<any>(null)
  
  const [feedback, setFeedback] = React.useState<{ type: 'success' | 'error', message: string } | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  
  const utils = trpc.useUtils()

  React.useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [feedback])

  const { data: mediaItems, isLoading } = trpc.media.list.useQuery(
    selectedCategory === "ALL" ? undefined : { category: selectedCategory as any }
  )

  const createMetadataMutation = trpc.media.createMetadata.useMutation({
    onSuccess: () => {
      utils.media.list.invalidate()
      setIsUploadOpen(false)
      setFeedback({ type: 'success', message: 'File uploaded and registered successfully' })
    },
    onError: (error) => {
      setFeedback({ type: 'error', message: `Metadata error: ${error.message}` })
    }
  })

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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      
      const token = localStorage.getItem("rifi_auth_token")
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/trpc"
      const baseApiUrl = apiUrl.replace("/trpc", "")
      
      const formData = new FormData()
      formData.append("file", file)
      formData.append("category", "OTHER")

      const response = await fetch(`${baseApiUrl}/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      await response.json()
      utils.media.list.invalidate()
      setIsUploadOpen(false)
      setFeedback({ type: 'success', message: 'File uploaded successfully' })
    } catch (error: any) {
      setFeedback({ type: 'error', message: `Upload error: ${error.message}` })
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this file? This cannot be undone.")) return
    deleteMetadataMutation.mutate(item.id)
  }

  const filteredItems = mediaItems?.filter(item => 
    item.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.altText?.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Add new images or videos to your media library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border/70 bg-muted/10 py-10 transition-colors hover:bg-muted/20">
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="size-8 animate-spin text-primary" />
                  <p className="text-[10px] font-medium animate-pulse">Uploading file...</p>
                </div>
              ) : (
                <>
                  <Upload className="size-8 text-muted-foreground opacity-40" />
                  <p className="mt-4 text-xs font-medium text-muted-foreground">
                    Drag and drop or click to browse
                  </p>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    onChange={handleUpload}
                    accept="image/*,video/*"
                  />
                  <Button 
                    variant="secondary" 
                    className="mt-4 rounded-none h-9 text-xs"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </Button>
                  <p className="mt-4 text-[10px] text-muted-foreground/60">
                    Maximum file size: 10MB (JPG, PNG, MP4)
                  </p>
                </>
              )}
            </div>
          </div>
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
                  onValueChange={(val) => setEditingItem({ ...editingItem, category: val })}
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
            </div>
          )}
          <DialogFooter>
            <Button 
              className="rounded-none w-full" 
              onClick={() => updateMetadataMutation.mutate({
                id: editingItem.id,
                data: { altText: editingItem.altText, category: editingItem.category }
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
           <Select value={selectedCategory} onValueChange={(val: any) => setSelectedCategory(val)}>
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
              <p className="truncate text-[11px] font-medium leading-tight">
                {item.originalName}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[9px] text-muted-foreground uppercase font-semibold">{item.category}</span>
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
