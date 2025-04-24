"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, MapPin, Users, DollarSign, ArrowLeft, Copy } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { getGame, saveGame } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { useErrorHandler } from "@/lib/error-handler"
import { format, addDays } from "date-fns"

export default function CloneGamePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { handleError } = useErrorHandler()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [originalGame, setOriginalGame] = useState<any>(null)

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
    description: "",
  })

  useEffect(() => {
    const fetchGame = async () => {
      setIsLoading(true)
      try {
        const game = await getGame(params.id)
        if (!game) {
          toast({
            title: "Game not found",
            description: "The game you're trying to clone could not be found",
            variant: "destructive",
          })
          router.push("/admin/games")
          return
        }

        setOriginalGame(game)

        // Set form data with game data, but advance the date by 1 week
        const nextDate = addDays(new Date(game.date), 7)

        setFormData({
          title: `${game.title} (Copy)`,
          location: game.location,
          number_of_teams: game.number_of_teams,
          players_per_team: game.players_per_team,
          women_reserved_spots: game.women_reserved_spots,
          non_binary_reserved_spots: game.non_binary_reserved_spots,
          joining_fee: game.joining_fee,
          time: game.time,
          date: format(nextDate, "yyyy-MM-dd"),
          game_type: game.game_type,
          description: game.description,
        })
      } catch (error) {
        handleError(error, "Error loading game")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGame()
  }, [params.id, router, toast, handleError])

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
      // Create a new game object
      const newGame = {
        ...formData,
        status: "Open" as const,
      }

      // Save the game to Supabase
      const savedGame = await saveGame(newGame)

      if (!savedGame) {
        throw new Error("Failed to save game")
      }

      // Show success toast
      toast({
        title: "Game cloned successfully",
        description: "The new game has been added to the schedule.",
      })

      // Redirect to games page
      router.push("/admin/games")
    } catch (error) {
      handleError(error, "Error creating game")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dunkin-orange"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild className="bg-zinc-800 hover:bg-zinc-700">
          <Link href="/admin/games">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Clone Game</h1>
          <p className="text-zinc-400 mt-1">Create a new game based on an existing one</p>
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
                        <SelectItem value="women-only">Women-only</SelectItem>
                        <SelectItem value="mixed">Mixed (Intermediates + Beginners)</SelectItem>
                        <SelectItem value="pros-only">Pros-only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="women_reserved_spots">Reserved Spots for Women per Team</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="non_binary_reserved_spots">Reserved Spots for Non-heterosexual & Non-male</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <Input
                        id="non_binary_reserved_spots"
                        name="non_binary_reserved_spots"
                        type="number"
                        min="0"
                        value={formData.non_binary_reserved_spots}
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
                    <Checkbox id="allowWaitlist" defaultChecked={true} />
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
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Copy className="h-4 w-4 mr-2" />
                    Clone Game
                  </span>
                )}
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
