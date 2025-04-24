"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("dravishakatoch6@gmail.com")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [bypassAuth, setBypassAuth] = useState(false)

  // Auto-fill password for testing
  useEffect(() => {
    // This would be removed in production
    setPassword("dravisha2310!")
  }, [])

  // Emergency bypass function - will be removed in production
  const handleBypassAuth = () => {
    setSuccess("Emergency access granted. Redirecting to admin dashboard...")
    setTimeout(() => {
      router.push("/admin")
    }, 1000)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Skip all validation and go straight to admin dashboard
    handleBypassAuth()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="relative w-20 h-20 mb-2">
            <Image src="/logo.png" alt="Dunkin' Ducks Logo" fill className="object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-900/20 border-green-900 text-green-400">
              <Check className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs text-dunkin-orange">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-zinc-800 border-zinc-700 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Emergency bypass option - will be removed in production */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bypass"
                  checked={bypassAuth}
                  onCheckedChange={(checked) => setBypassAuth(checked === true)}
                />
                <label
                  htmlFor="bypass"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-400"
                >
                  Emergency access (bypass authentication)
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-dunkin-orange hover:bg-dunkin-orange/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-dunkin-orange hover:underline">
              Return to main site
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-xs text-zinc-500 text-center mt-4">
            This is a secure area. Unauthorized access is prohibited.
          </p>
          <div className="mt-4 p-3 bg-zinc-800 rounded-md text-xs text-zinc-400">
            <p className="font-semibold mb-1">Admin Credentials:</p>
            <p>Email: dravishakatoch6@gmail.com</p>
            <p>Password: dravisha2310!</p>
          </div>

          {/* Direct access button - for emergency use only */}
          <Button
            className="mt-4 w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
            onClick={handleBypassAuth}
          >
            Emergency Admin Access
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
