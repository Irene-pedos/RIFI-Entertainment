import {
  Mail,
  MoreHorizontal,
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

const inquiries = [
  {
    id: "INQ-001",
    name: "Alex Murenzi",
    email: "alex@example.rw",
    phone: "0780000001",
    subject: "Wedding Planning Inquiry",
    message: "I am looking for a full wedding planning service for my sister's wedding in December.",
    date: "2026-05-11",
    status: "Unread",
  },
  {
    id: "INQ-002",
    name: "Sandra Uwera",
    email: "sandra@test.com",
    phone: "0780000002",
    subject: "Model Application Question",
    message: "Do you accept children models for your commercial projects?",
    date: "2026-05-10",
    status: "Replied",
  },
  {
    id: "INQ-003",
    name: "David Kimenyi",
    email: "david@corp.rw",
    phone: "0780000003",
    subject: "Corporate Event Protocol",
    message: "We need VIP ushers for our upcoming product launch at Intare Arena.",
    date: "2026-05-09",
    status: "Read",
  },
]

export default function InquiriesPage() {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Messages & Inquiries</h1>
        <p className="text-sm text-muted-foreground">
          Review and respond to messages received from the contact form.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Unread
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Replied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">114</div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-none border-border/70 shadow-sm">
        <CardHeader className="border-b border-border/70 bg-muted/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="rounded-none pl-9 border-border/70 bg-background"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/70">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Contact</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Subject</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Message Preview</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className={`hover:bg-muted/30 border-b border-border/70 ${inquiry.status === 'Unread' ? 'bg-primary/5' : ''}`}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className={`text-sm ${inquiry.status === 'Unread' ? 'font-bold' : 'font-medium'}`}>{inquiry.name}</span>
                      <span className="text-[10px] text-muted-foreground">{inquiry.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{inquiry.subject}</TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate text-xs text-muted-foreground">
                      {inquiry.message}
                    </p>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{inquiry.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center border px-2 py-0.5 text-[10px] font-medium ${
                      inquiry.status === 'Unread' ? 'border-primary/20 bg-primary/10 text-primary' :
                      inquiry.status === 'Replied' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' :
                      'border-border/70 bg-muted/50 text-muted-foreground'
                    }`}>
                      {inquiry.status}
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
                        <DropdownMenuItem>
                          <Mail className="mr-2 size-4" />
                          View Full Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-emerald-600 font-medium">Reply via Email</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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
