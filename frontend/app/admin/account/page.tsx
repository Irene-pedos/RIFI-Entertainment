"use client"

import * as React from "react"
import { Save, User, Shield, Key, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { trpc } from "@/lib/trpc"

export default function AccountPage() {
  const { data: user, isLoading: isUserLoading } = trpc.auth.me.useQuery()
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [passError, setPassError] = React.useState("")
  const [passSuccess, setPassSuccess] = React.useState("")

  const changePasswordMutation = trpc.auth.changePassword.useMutation({
    onSuccess: () => {
      setPassSuccess("Password updated successfully!")
      setPassError("")
      setCurrentPassword("")
      setNewPassword("")
    },
    onError: (err) => {
      setPassError(err.message)
      setPassSuccess("")
    },
  })

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
    })
  }

  if (isUserLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your administrative profile and security preferences.
        </p>
      </div>

      <Separator className="bg-border/70" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 rounded-none border-border/70 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="size-4 text-primary" />
              <CardTitle className="text-lg">Profile Information</CardTitle>
            </div>
            <CardDescription>
              Your administrative identity details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First Name</Label>
                <div className="px-3 py-2 border border-border/70 bg-muted/20 text-sm">{user?.firstName || "N/A"}</div>
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Name</Label>
                <div className="px-3 py-2 border border-border/70 bg-muted/20 text-sm">{user?.lastName || "N/A"}</div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</Label>
              <div className="px-3 py-2 border border-border/70 bg-muted/20 text-sm">{user?.email}</div>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</Label>
              <div className="px-3 py-2 border border-border/70 bg-muted/50 text-sm font-semibold">{user?.role}</div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/70 bg-muted/10 pt-6">
            <p className="text-xs text-muted-foreground italic">Contact super admin to change profile details.</p>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-none border-border/70 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-primary" />
                <CardTitle className="text-lg">Security</CardTitle>
              </div>
              <CardDescription>
                Change your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdatePassword}>
              <CardContent className="space-y-4">
                {passError && <p className="text-xs text-destructive">{passError}</p>}
                {passSuccess && <p className="text-xs text-emerald-600">{passSuccess}</p>}
                <div className="grid gap-2">
                  <Label htmlFor="currentPass" className="text-xs font-semibold uppercase tracking-wider">Current Password</Label>
                  <Input 
                    id="currentPass" 
                    type="password" 
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="rounded-none border-border/70" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPass" className="text-xs font-semibold uppercase tracking-wider">New Password</Label>
                  <Input 
                    id="newPass" 
                    type="password" 
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="rounded-none border-border/70" 
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/70 bg-muted/10 pt-6">
                <Button type="submit" variant="outline" className="w-full rounded-none" disabled={changePasswordMutation.isPending}>
                  {changePasswordMutation.isPending ? <Loader2 className="animate-spin size-4" /> : <Key className="mr-2 size-4" />}
                  Update Password
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
