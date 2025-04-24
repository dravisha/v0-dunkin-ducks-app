"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Calendar, MapPin, Star, Edit, Trophy } from "lucide-react"
import Link from "next/link"

export default function PlayerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const playerId = params.id

  // Mock player data - in a real app, this would be fetched from an API
  const [player, setPlayer] = useState({
    id: playerId,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    area: "Downtown",
    skillLevel: "Intermediate",
    position: "Point Guard",
    gamesPlayed: 0,
    streak: 0,
    joinDate: "January 2023",
    status: "Active",
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
    preferredLocations: ["Downtown Community Center", "Westside Park Courts"],
    availability: ["Weekday Evenings", "Weekend Mornings"],
    bio: "Basketball enthusiast looking to improve my game and meet other players.",
  })

  // Mock game history
  const [gameHistory, setGameHistory] = useState([])

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild className="bg-zinc-800 hover:bg-zinc-700">
          <Link href="/admin/players">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Player Profile</h1>
          <p className="text-zinc-400 mt-1">View and manage player details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-dunkin-orange flex items-center justify-center text-white text-2xl font-bold">
                  {player.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <CardTitle className="text-2xl">{player.name}</CardTitle>
                  <p className="text-zinc-400">{player.email}</p>
                </div>
              </div>
              <Button variant="outline" className="border-zinc-700">
                <Edit className="h-4 w-4 mr-2" /> Edit Profile
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-dunkin-orange text-2xl font-bold">{player.gamesPlayed}</p>
                  <p className="text-sm text-zinc-400">Games Played</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-dunkin-orange text-2xl font-bold">{player.streak}</p>
                  <p className="text-sm text-zinc-400">Current Streak</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-dunkin-orange text-2xl font-bold">{player.stats.ppg}</p>
                  <p className="text-sm text-zinc-400">Avg. Points</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-dunkin-orange text-2xl font-bold">{player.stats.apg}</p>
                  <p className="text-sm text-zinc-400">Avg. Assists</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge className="bg-dunkin-orange text-white">{player.skillLevel}</Badge>
                  <Badge variant="outline" className="border-zinc-600">
                    {player.position}
                  </Badge>
                  <Badge
                    className={
                      player.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-zinc-500/20 text-zinc-400"
                    }
                  >
                    {player.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-2">About</h3>
                  <p className="text-zinc-300">{player.bio}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-2">Area</h3>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <span>{player.area}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-2">Preferred Locations</h3>
                  <div className="flex flex-wrap gap-2">
                    {player.preferredLocations.map((location, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 border-zinc-600">
                        <MapPin className="h-3 w-3" />
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-2">Availability</h3>
                  <div className="flex flex-wrap gap-2">
                    {player.availability.map((time, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 border-zinc-600">
                        <Calendar className="h-3 w-3" />
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="stats">
            <TabsList className="bg-zinc-900 border-zinc-800 w-full">
              <TabsTrigger
                value="stats"
                className="flex-1 data-[state=active]:bg-dunkin-orange data-[state=active]:text-white"
              >
                Statistics
              </TabsTrigger>
              <TabsTrigger
                value="games"
                className="flex-1 data-[state=active]:bg-dunkin-orange data-[state=active]:text-white"
              >
                Game History
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="flex-1 data-[state=active]:bg-dunkin-orange data-[state=active]:text-white"
              >
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Player Statistics</CardTitle>
                    <Button className="bg-dunkin-orange hover:bg-dunkin-orange/90 text-white">Update Stats</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400 mb-1">Points Per Game</p>
                      <p className="text-xl font-bold">{player.stats.ppg}</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400 mb-1">Assists Per Game</p>
                      <p className="text-xl font-bold">{player.stats.apg}</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400 mb-1">Rebounds Per Game</p>
                      <p className="text-xl font-bold">{player.stats.rpg}</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400 mb-1">Steals Per Game</p>
                      <p className="text-xl font-bold">{player.stats.spg}</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400 mb-1">Blocks Per Game</p>
                      <p className="text-xl font-bold">{player.stats.bpg}</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400 mb-1">Field Goal %</p>
                      <p className="text-xl font-bold">{player.stats.fg}</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400 mb-1">3-Point %</p>
                      <p className="text-xl font-bold">{player.stats.threePoint}</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400 mb-1">Free Throw %</p>
                      <p className="text-xl font-bold">{player.stats.ft}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="games">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Game History</CardTitle>
                </CardHeader>
                <CardContent>
                  {gameHistory.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-zinc-800/50 border-zinc-800">
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Game Type</TableHead>
                          <TableHead>Stats</TableHead>
                          <TableHead>Result</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {gameHistory.map((game, index) => (
                          <TableRow key={index} className="hover:bg-zinc-800/50 border-zinc-800">
                            <TableCell>{game.date}</TableCell>
                            <TableCell>{game.location}</TableCell>
                            <TableCell>{game.type}</TableCell>
                            <TableCell>{game.stats}</TableCell>
                            <TableCell>{game.result}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="flex items-center justify-center p-6 bg-zinc-800 rounded-lg">
                      <p className="text-zinc-400">No game history available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg opacity-50">
                      <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-zinc-500" />
                      </div>
                      <div>
                        <p className="font-medium">First Game</p>
                        <p className="text-sm text-zinc-400">Play your first game</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg opacity-50">
                      <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                        <Star className="h-6 w-6 text-zinc-500" />
                      </div>
                      <div>
                        <p className="font-medium">3-Game Streak</p>
                        <p className="text-sm text-zinc-400">Play 3 games in a row</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg opacity-50">
                      <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-zinc-500" />
                      </div>
                      <div>
                        <p className="font-medium">Sharpshooter</p>
                        <p className="text-sm text-zinc-400">Score 20+ points in a game</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg opacity-50">
                      <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-zinc-500" />
                      </div>
                      <div>
                        <p className="font-medium">Team Player</p>
                        <p className="text-sm text-zinc-400">Record 10+ assists in a game</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Upcoming Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6 bg-zinc-800 rounded-lg">
                <p className="text-zinc-400">No upcoming games</p>
              </div>

              <Button className="w-full mt-4 bg-dunkin-orange hover:bg-dunkin-orange/90 text-white">
                Register for a Game
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Streak Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dunkin-orange/20 flex items-center justify-center">
                    <Star className="h-5 w-5 text-dunkin-orange" />
                  </div>
                  <div>
                    <p className="font-medium">Current Streak</p>
                    <p className="text-2xl font-bold text-dunkin-orange">{player.streak} games</p>
                  </div>
                </div>

                <div className="bg-zinc-800 p-3 rounded-lg">
                  <p className="text-sm">
                    {player.streak > 0
                      ? `${player.name} has played ${player.streak} consecutive games. Keep the streak going!`
                      : `${player.name} hasn't started a streak yet. Register for a game to begin!`}
                  </p>
                </div>

                <Button className="w-full bg-dunkin-orange hover:bg-dunkin-orange/90 text-white">
                  Send Streak Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
