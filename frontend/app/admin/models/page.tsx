"use client"

import * as React from "react"
import {
  CheckCircle2,
  Filter,
  MoreHorizontal,
  Search,
  XCircle,
  Loader2,
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
import { trpc } from "@/lib/trpc"

export default function ModelApplicationsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const utils = trpc.useUtils()

  const { data: applications, isLoading } = trpc.model.listApplications.useQuery()

  const updateStatusMutation = trpc.model.updateApplicationStatus.useMutation({
    onSuccess: () => utils.model.listApplications.invalidate(),
  })

  const deleteMutation = trpc.model.deleteApplication.useMutation({
    onSuccess: () => utils.model.listApplications.invalidate(),
  })

  const filteredApps = applications?.filter(app => 
    app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const pendingCount = applications?.filter(app => app.status === "PENDING").length || 0
  const acceptedCount = applications?.filter(app => app.status === "ACCEPTED").length || 0
  const rejectedCount = applications?.filter(app => app.status === "REJECTED").length || 0

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
            <div className="text-2xl font-bold">{applications?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{acceptedCount}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{rejectedCount}</div>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Loader2 className="animate-spin size-6 mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredApps?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No applications found.
                  </TableCell>
                </TableRow>
              ) : filteredApps?.map((app) => (
                <TableRow key={app.id} className="hover:bg-muted/30 border-b border-border/70">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="rounded-none border border-border/70 size-10">
                        <AvatarImage src={app.portfolioUrl || undefined} className="object-cover" />
                        <AvatarFallback className="rounded-none">{app.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{app.fullName}</span>
                        <span className="text-[10px] text-muted-foreground">{app.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{app.category || "Uncategorized"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {app.age ? `${app.age} yrs` : "N/A"} • {app.heightCm ? `${app.heightCm}cm` : "N/A"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center border px-2 py-0.5 text-[10px] font-medium ${
                      app.status === 'ACCEPTED' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' :
                      app.status === 'PENDING' ? 'border-amber-500/20 bg-amber-500/10 text-amber-600' :
                      app.status === 'REVIEWING' ? 'border-blue-500/20 bg-blue-500/10 text-blue-600' :
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
                        <DropdownMenuItem 
                          className="text-emerald-600 font-medium"
                          onClick={() => updateStatusMutation.mutate({ id: app.id, status: "ACCEPTED" })}
                        >
                          <CheckCircle2 className="mr-2 size-4" />
                          Approve Application
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-blue-600"
                          onClick={() => updateStatusMutation.mutate({ id: app.id, status: "REVIEWING" })}
                        >
                          Mark for Review
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-amber-600"
                          onClick={() => updateStatusMutation.mutate({ id: app.id, status: "REJECTED" })}
                        >
                          <XCircle className="mr-2 size-4" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => deleteMutation.mutate(app.id)}
                        >
                          <Trash2 className="mr-2 size-4" />
                          Delete Application
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
