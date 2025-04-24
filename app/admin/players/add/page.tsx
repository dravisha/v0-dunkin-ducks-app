"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Mail, Phone, MapPin, User } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { generateId, savePlayer } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function AddPlayerPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "Downtown",
    skillLevel: "Intermediate",
    position: "Point Guard",
    bio: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create a new player object
      const newPlayer = {
        id: generateId(),
        ...formData,
        gamesPlayed: 0,
        streak: 0,
        joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        status: "Active" as const,
        stats: {
          ppg: 0,
          apg: 0,
          rpg: 0,
          spg: 0,
          bpg: 0,
          fg: "0%",
          threePoint: "0%",
          ft: "0%",
        },
        preferredLocations: [formData.area + " Community Center"],
        availability: ["Weekday Evenings", "Weekend Mornings"],
        registeredGames: [],
      }

      // Save the player to localStorage
      savePlayer(newPlayer)

      // Show success toast
      toast({
        title: "Player added successfully",
        description: "The new player has been added to the system.",
      })

      // Redirect to players page
      router.push("/admin/players")
    } catch (error) {
      console.error(error)
      toast({
        title: "Error adding player",
        description: "There was a problem adding the player. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild className="bg-zinc-800 hover:bg-zinc-700">
          <Link href="/admin/players">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Player</h1>
          <p className="text-zinc-400 mt-1">Create a new player profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Select value={formData.area} onValueChange={(value) => handleSelectChange("area", value)}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 pl-10">
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="Downtown">Downtown</SelectItem>
                        <SelectItem value="Westside">Westside</SelectItem>
                        <SelectItem value="Eastside">Eastside</SelectItem>
                        <SelectItem value="North">North</SelectItem>
                        <SelectItem value="South">South</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Basketball Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skillLevel">Skill Level</Label>
                    <Select
                      value={formData.skillLevel}
                      onValueChange={(value) => handleSelectChange("skillLevel", value)}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select skill level" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Pro">Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select value={formData.position} onValueChange={(value) => handleSelectChange("position", value)}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="Point Guard">Point Guard</SelectItem>
                        <SelectItem value="Shooting Guard">Shooting Guard</SelectItem>
                        <SelectItem value="Small Forward">Small Forward</SelectItem>
                        <SelectItem value="Power Forward">Power Forward</SelectItem>
                        <SelectItem value="Center">Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about the player's basketball experience, interests, etc."
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Player Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 mb-4">
                  Initial stats will be set to zero. You can update them after the player participates in games.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-zinc-800 p-3 rounded-lg text-center">
                    <p className="text-dunkin-orange text-xl font-bold">0</p>
                    <p className="text-xs text-zinc-400">Games Played</p>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded-lg text-center">
                    <p className="text-dunkin-orange text-xl font-bold">0</p>
                    <p className="text-xs text-zinc-400">Current Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-dunkin-orange hover:bg-dunkin-orange/90 text-white font-bold py-3 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Player..." : "Add Player"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-zinc-700"
                onClick={() => router.push("/admin/players")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
