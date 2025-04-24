"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { getCurrentPlayer, updatePlayerProfile } from "@/lib/store"
import { Loader2 } from "lucide-react"

export default function CompleteProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    id: "",
    full_name: "",
    email: "",
    mobile: "",
    skill_level: "",
    preferred_area: "",
    position: "",
    bio: "",
    is_profile_complete: false,
  })

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const player = await getCurrentPlayer()

        if (!player) {
          // Redirect to login if no player found
          router.push("/login")
          return
        }

        // If profile is already complete, redirect to games
        if (player.is_profile_complete) {
          router.push("/games")
          return
        }

        // Pre-fill form with existing data
        setFormData({
          id: player.id,
          full_name: player.full_name || "",
          email: player.email || "",
          mobile: player.mobile || "",
          skill_level: player.skill_level || "",
          preferred_area: player.preferred_area || "",
          position: player.position || "",
          bio: player.bio || "",
          is_profile_complete: false,
        })
      } catch (error) {
        console.error("Error checking profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkProfile()
  }, [router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.mobile ||
      !formData.skill_level ||
      !formData.preferred_area ||
      !formData.position
    ) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // Mark profile as complete
      const updatedProfile = {
        ...formData,
        is_profile_complete: true,
      }

      await updatePlayerProfile(updatedProfile)

      toast({
        title: "Profile completed",
        description: "Your profile has been successfully updated",
      })

      // Redirect to games page
      router.push("/games")
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-dunkin-orange" />
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
            <CardDescription>
              Please provide your information to complete your profile before signing up for games
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="skill_level">Skill Level *</Label>
                  <Select
                    value={formData.skill_level}
                    onValueChange={(value) => handleSelectChange("skill_level", value)}
                    required
                  >
                    <SelectTrigger id="skill_level" className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select your skill level" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced/Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Preferred Position *</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => handleSelectChange("position", value)}
                    required
                  >
                    <SelectTrigger id="position" className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select your position" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      <SelectItem value="point_guard">Point Guard</SelectItem>
                      <SelectItem value="shooting_guard">Shooting Guard</SelectItem>
                      <SelectItem value="small_forward">Small Forward</SelectItem>
                      <SelectItem value="power_forward">Power Forward</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_area">Preferred Area to Play *</Label>
                <Select
                  value={formData.preferred_area}
                  onValueChange={(value) => handleSelectChange("preferred_area", value)}
                  required
                >
                  <SelectTrigger id="preferred_area" className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select your preferred area" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="indiranagar">Indiranagar</SelectItem>
                    <SelectItem value="jp_nagar">JP Nagar</SelectItem>
                    <SelectItem value="koramangala">Koramangala</SelectItem>
                    <SelectItem value="electronic_city">Electronic City</SelectItem>
                    <SelectItem value="marathahalli">Marathahalli</SelectItem>
                    <SelectItem value="whitefield">Whitefield</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us a bit about yourself and your basketball experience"
                  className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-dunkin-orange hover:bg-dunkin-orange/90 text-white font-bold py-3 text-base"
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  )
}
