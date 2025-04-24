"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, MapPin, Users, DollarSign, ArrowLeft } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { saveGame } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function CreateGamePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    number_of_teams: 2,
    players_per_team: 5,
    women_reserved_spots: 0,
    non_binary_reserved_spots: 0,
    joining_fee: 0,
    time: "",
    date: "",
    game_type: "mixed",
    skill_level: "intermediate",
    description: "",
    max_players: 10,
    status: "upcoming",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Calculate max_players based on teams and players per team
      const calculatedMaxPlayers = formData.number_of_teams * formData.players_per_team

      // Create a new game object
      const newGame = {
        ...formData,
        max_players: calculatedMaxPlayers,
        status: "upcoming" as const,
        registered_count: 0,
      }

      // Save the game to Supabase
      const savedGame = await saveGame(newGame)

      if (!savedGame) {
        throw new Error("Failed to save game")
      }

      // Show success toast
      toast({
        title: "Game created successfully",
        description: "The new game has been added to the schedule.",
      })

      // Redirect to games page
      router.push("/admin/games")
    } catch (error) {
      console.error(error)
      toast({
        title: "Error creating game",
        description: "There was a problem creating the game. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const gameTypeOptions = [
    { value: "women-only", label: "Women-only" },
    { value: "mixed", label: "Mixed (Intermediates + Beginners)" },
    { value: "pros-only", label: "Pros-only" },
  ]

  const skillLevelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "pro", label: "Pro" },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild className="bg-zinc-800 hover:bg-zinc-700">
          <Link href="/admin/games">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Game</h1>
          <p className="text-zinc-400 mt-1">Set up a new basketball game for players to join</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Game Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Game Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Downtown Pickup Game"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="Downtown Community Center"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border-zinc-700 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border-zinc-700 pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide details about the game, skill level expectations, etc."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Team Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number_of_teams">Number of Teams</Label>
                    <Select
                      value={formData.number_of_teams.toString()}
                      onValueChange={(value) => handleSelectChange("number_of_teams", Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="2">2 Teams</SelectItem>
                        <SelectItem value="4">4 Teams</SelectItem>
                        <SelectItem value="6">6 Teams</SelectItem>
                        <SelectItem value="8">8 Teams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="players_per_team">Players per Team</Label>
                    <Select
                      value={formData.players_per_team.toString()}
                      onValueChange={(value) => handleSelectChange("players_per_team", Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="3">3 Players (3v3)</SelectItem>
                        <SelectItem value="5">5 Players (5v5)</SelectItem>
                        <SelectItem value="6">6 Players (6v6)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="game_type">Game Type</Label>
                    <Select
                      value={formData.game_type}
                      onValueChange={(value) => handleSelectChange("game_type", value)}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        {gameTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill_level">Skill Level</Label>
                    <Select
                      value={formData.skill_level}
                      onValueChange={(value) => handleSelectChange("skill_level", value)}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        {skillLevelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="women_reserved_spots">Reserved Spots for Women</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <Input
                        id="women_reserved_spots"
                        name="women_reserved_spots"
                        type="number"
                        min="0"
                        value={formData.women_reserved_spots}
                        onChange={handleNumberInputChange}
                        className="bg-zinc-800 border-zinc-700 pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Fee & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="joining_fee">Joining Fee (₹)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                      id="joining_fee"
                      name="joining_fee"
                      type="number"
                      min="0"
                      value={formData.joining_fee}
                      onChange={handleNumberInputChange}
                      className="bg-zinc-800 border-zinc-700 pl-10"
                    />
                  </div>
                  <p className="text-xs text-zinc-400">Enter 0 for free games</p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allowWaitlist" defaultChecked />
                    <Label htmlFor="allowWaitlist" className="text-sm">
                      Enable waitlist when full
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="requireApproval" />
                    <Label htmlFor="requireApproval" className="text-sm">
                      Require approval to join
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="sendReminders" defaultChecked />
                    <Label htmlFor="sendReminders" className="text-sm">
                      Send reminders to players
                    </Label>
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
                {isSubmitting ? "Creating Game..." : "Create Game"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-zinc-700"
                onClick={() => router.push("/admin/games")}
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
