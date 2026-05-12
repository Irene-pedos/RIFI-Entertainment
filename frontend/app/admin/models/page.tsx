import {
  CheckCircle2,
  Filter,
  MoreHorizontal,
  Search,
  XCircle,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const applications = [
  {
    id: "APP-101",
    name: "Divine Mutoni",
    email: "divine.m@example.rw",
    category: "Fashion Model",
    age: 22,
    height: "175cm",
    status: "Pending",
    appliedDate: "2026-05-10",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100&h=100&fit=crop",
  },
  {
    id: "APP-102",
    name: "Eric Gakwaya",
    email: "eric.g@test.com",
    category: "Commercial Model",
    age: 25,
    height: "182cm",
    status: "Reviewing",
    appliedDate: "2026-05-09",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: "APP-103",
    name: "Kelia Isimbi",
    email: "kelia.i@hello.rw",
    category: "Event Model",
    age: 21,
    height: "170cm",
    status: "Approved",
    appliedDate: "2026-05-05",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
]

export default function ModelApplicationsPage() {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Model Applications</h1>
        <p className="text-sm text-muted-foreground">
          Review and manage talent applications for RiFi Models Management.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">12</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">56</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">16</div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-none border-border/70 shadow-sm">
        <CardHeader className="border-b border-border/70 bg-muted/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search models..."
                className="rounded-none pl-9 border-border/70 bg-background"
              />
            </div>
            <Button variant="outline" size="sm" className="rounded-none h-9">
              <Filter className="mr-2 size-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/70">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Model</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Category</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Details</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Applied On</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id} className="hover:bg-muted/30 border-b border-border/70">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="rounded-none border border-border/70 size-10">
                        <AvatarImage src={app.image} className="object-cover" />
                        <AvatarFallback className="rounded-none">{app.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{app.name}</span>
                        <span className="text-[10px] text-muted-foreground">{app.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{app.category}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {app.age} yrs • {app.height}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{app.appliedDate}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center border px-2 py-0.5 text-[10px] font-medium ${
                      app.status === 'Approved' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' :
                      app.status === 'Pending' ? 'border-amber-500/20 bg-amber-500/10 text-amber-600' :
                      app.status === 'Reviewing' ? 'border-blue-500/20 bg-blue-500/10 text-blue-600' :
                      'border-destructive/20 bg-destructive/10 text-destructive'
                    }`}>
                      {app.status}
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
                        <DropdownMenuLabel>Talent Review</DropdownMenuLabel>
                        <DropdownMenuItem>View Portfolio</DropdownMenuItem>
                        <DropdownMenuItem>Message Applicant</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-emerald-600 font-medium">
                          <CheckCircle2 className="mr-2 size-4" />
                          Approve Application
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="mr-2 size-4" />
                          Reject
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
