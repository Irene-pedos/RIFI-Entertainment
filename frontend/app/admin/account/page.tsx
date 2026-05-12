"use client"

import * as React from "react"
import { Save, User, Shield, Key } from "lucide-react"

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

export default function AccountPage() {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Settings saved successfully!")
    }, 1000)
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
              Update your personal details and how others see you.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSave}>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider">First Name</Label>
                  <Input id="firstName" defaultValue="Admin" className="rounded-none border-border/70" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider">Last Name</Label>
                  <Input id="lastName" defaultValue="User" className="rounded-none border-border/70" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@rifi.rw" className="rounded-none border-border/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider">Role</Label>
                <Input id="role" defaultValue="Super Administrator" disabled className="rounded-none border-border/70 bg-muted/50" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/70 bg-muted/10 pt-6">
              <Button type="submit" className="rounded-none ml-auto" disabled={isLoading}>
                <Save className="mr-2 size-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-none border-border/70 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-primary" />
                <CardTitle className="text-lg">Security</CardTitle>
              </div>
              <CardDescription>
                Change your password and manage security.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPass" className="text-xs font-semibold uppercase tracking-wider">Current Password</Label>
                <Input id="currentPass" type="password" className="rounded-none border-border/70" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPass" className="text-xs font-semibold uppercase tracking-wider">New Password</Label>
                <Input id="newPass" type="password" className="rounded-none border-border/70" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/70 bg-muted/10 pt-6">
              <Button variant="outline" className="w-full rounded-none">
                <Key className="mr-2 size-4" />
                Update Password
              </Button>
            </CardFooter>
          </Card>

          <Card className="rounded-none border-border/70 bg-destructive/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full rounded-none">
                Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
