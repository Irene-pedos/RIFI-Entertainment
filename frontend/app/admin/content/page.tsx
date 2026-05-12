import {
  Edit3,
  ExternalLink,
  Plus,
  Save,
  Search,
  Settings,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const pages = [
  { name: "Home Page", path: "/", lastModified: "2026-05-10", status: "Published" },
  { name: "About Us", path: "/about", lastModified: "2026-05-08", status: "Published" },
  { name: "Models Management", path: "/models", lastModified: "2026-05-11", status: "Draft" },
  { name: "Gallery", path: "/gallery", lastModified: "2026-05-12", status: "Published" },
  { name: "Contact Us", path: "/contact", lastModified: "2026-05-01", status: "Published" },
]

const services = [
  { title: "Wedding Organization", category: "Events", price: "Flexible", status: "Active" },
  { title: "Model Management", category: "Talent", price: "Fixed", status: "Active" },
  { title: "Protocol Services", category: "Hospitality", price: "Hourly", status: "Active" },
  { title: "Dance Entertainment", category: "Performances", price: "Per Show", status: "Active" },
]

export default function ContentManagementPage() {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Content Management</h1>
          <p className="text-sm text-muted-foreground">
            Update website text, manage service descriptions, and edit page structure.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-none">
            <Save className="mr-2 size-4" />
            Save Changes
          </Button>
          <Button className="rounded-none">
            <Plus className="mr-2 size-4" />
            Add Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pages" className="w-full">
        <TabsList variant="line" className="mb-6 border-b border-border/70 pb-0">
          <TabsTrigger value="pages" className="px-6 py-3 text-sm">Website Pages</TabsTrigger>
          <TabsTrigger value="services" className="px-6 py-3 text-sm">Services List</TabsTrigger>
          <TabsTrigger value="settings" className="px-6 py-3 text-sm">Global Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pages">
          <Card className="rounded-none border-border/70 shadow-sm">
            <CardHeader className="border-b border-border/70 bg-muted/10">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                  placeholder="Find a page..."
                  className="rounded-none pl-9 border-border/70 bg-background"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-border/70">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Page Name</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Path</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Last Modified</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.path} className="hover:bg-muted/30 border-b border-border/70">
                      <TableCell className="font-medium text-sm">{page.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{page.path}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{page.lastModified}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center border px-2 py-0.5 text-[10px] font-medium ${
                          page.status === 'Published' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' : 'border-border/70 bg-muted/50 text-muted-foreground'
                        }`}>
                          {page.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon-sm" className="rounded-none" title="Edit Content">
                            <Edit3 className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon-sm" className="rounded-none" title="Preview Page">
                            <ExternalLink className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title} className="rounded-none border-border/70 shadow-sm transition-all hover:border-primary/50">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
                    <CardDescription className="text-xs uppercase tracking-wider font-medium text-primary">
                      {service.category}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon-sm" className="rounded-none">
                    <Settings className="size-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium">Pricing: {service.price}</span>
                    <span className="text-xs text-emerald-600 font-semibold">{service.status}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="rounded-none border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Global Site Configuration</CardTitle>
              <CardDescription>Update sitewide settings, contact information, and meta data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Site Title</label>
                  <Input defaultValue="RiFi Entertainment" className="rounded-none border-border/70" />
               </div>
               <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Support Email</label>
                  <Input defaultValue="rifientertainment7@gmail.com" className="rounded-none border-border/70" />
               </div>
               <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tagline</label>
                  <Input defaultValue="Creating unforgettable experiences with style and professionalism." className="rounded-none border-border/70" />
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
