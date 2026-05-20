"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail } from "lucide-react"

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
import { siteConfig } from "@/lib/site"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Success - user is stored in cookie, but we can keep basic user info in localStorage for UI
      localStorage.setItem("rifi_admin_user", JSON.stringify(data.user))
      
      // Perform a hard refresh to ensure all server components and middleware recognize the new cookie
      router.refresh()
      
      // Navigate to admin dashboard
      router.push("/admin")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="flex size-12 items-center justify-center border border-border/70 bg-background shadow-sm">
          <Image
            src={siteConfig.logo}
            alt="Logo"
            width={32}
            height={32}
            className="size-8 object-cover"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">RiFi Admin</h1>
          <p className="text-sm text-muted-foreground">Professional Control Center</p>
        </div>
      </div>

      <Card className="w-full max-w-[400px] rounded-none border-border/70 ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            {error && (
              <div className="bg-destructive/10 p-3 text-xs text-destructive border border-destructive/20">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@rifi-entertainment.com"
                  className="rounded-none pl-9 border-border/70"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  suppressHydrationWarning
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="rounded-none pl-9 border-border/70"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  suppressHydrationWarning
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full rounded-none" 
              disabled={isLoading}
              suppressHydrationWarning
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <p className="mt-8 text-center text-xs text-muted-foreground" suppressHydrationWarning>
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </div>
  )
}
