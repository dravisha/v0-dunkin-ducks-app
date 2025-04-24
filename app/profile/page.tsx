"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { getCurrentPlayer, updatePlayerProfile } from "@/lib/store"
import type { Player } from "@/lib/database.types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const [player, setPlayer] = useState<Player | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    skill_level: "",
    preferred_area: "",
    position: "",
    bio: "",
  })
  const router = useRouter()

  useEffect(() => {
    async function loadPlayer() {
      try {
        const currentPlayer = await getCurrentPlayer()
        if (!currentPlayer) {
          router.push("/login")
          return
        }

        setPlayer(currentPlayer)
        setFormData({
          full_name: currentPlayer.full_name || "",
          email: currentPlayer.email || "",
          mobile: currentPlayer.mobile || "",
          skill_level: currentPlayer.skill_level || "",
          preferred_area: currentPlayer.preferred_area || "",
          position: currentPlayer.position || "",
          bio: currentPlayer.bio || "",
        })
      } catch (error) {
        console.error("Error loading player:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPlayer()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!player) return

    setIsSaving(true)
    try {
      await updatePlayerProfile(player.id, {
        full_name: formData.full_name,
        email: formData.email,
        mobile: formData.mobile,
        skill_level: formData.skill_level,
        preferred_area: formData.preferred_area,
        position: formData.position,
        bio: formData.bio,
      })

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      })

      router.push("/games")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Complete Your Profile</h1>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="full_name" className="text-gray-300">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email <span className="text-red-500">*</span>
            </Label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 mt-1"
            />
          </div>

          <div>
            <Label htmlFor="mobile" className="text-gray-300">
              Mobile Number <span className="text-red-500">*</span>
            </Label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 mt-1"
            />
          </div>

          <div>
            <Label htmlFor="skill_level" className="text-gray-300">
              Skill Level <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.skill_level}
              onValueChange={(value) => handleSelectChange("skill_level", value)}
              required
            >
              <SelectTrigger id="skill_level" className="w-full bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select your skill level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="preferred_area" className="text-gray-300">
              Preferred Area <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.preferred_area}
              onValueChange={(value) => handleSelectChange("preferred_area", value)}
              required
            >
              <SelectTrigger id="preferred_area" className="w-full bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select your preferred area" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="North Delhi">North Delhi</SelectItem>
                <SelectItem value="South Delhi">South Delhi</SelectItem>
                <SelectItem value="East Delhi">East Delhi</SelectItem>
                <SelectItem value="West Delhi">West Delhi</SelectItem>
                <SelectItem value="Central Delhi">Central Delhi</SelectItem>
                <SelectItem value="Noida">Noida</SelectItem>
                <SelectItem value="Gurgaon">Gurgaon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="position" className="text-gray-300">
              Position <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.position} onValueChange={(value) => handleSelectChange("position", value)} required>
              <SelectTrigger id="position" className="w-full bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select your position" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="Point Guard">Point Guard</SelectItem>
                <SelectItem value="Shooting Guard">Shooting Guard</SelectItem>
                <SelectItem value="Small Forward">Small Forward</SelectItem>
                <SelectItem value="Power Forward">Power Forward</SelectItem>
                <SelectItem value="Center">Center</SelectItem>
                <SelectItem value="Flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="bio" className="text-gray-300">
              Bio (Optional)
            </Label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 mt-1"
              placeholder="Tell us a bit about yourself..."
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Saving...
              </span>
            ) : (
              "Save Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
