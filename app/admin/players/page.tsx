"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Download, Plus, Star, Calendar, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { deletePlayer, getPlayers, type Player } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function PlayersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [players, setPlayers] = useState<Player[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [skillFilter, setSkillFilter] = useState("all")
  const [areaFilter, setAreaFilter] = useState("all")

  useEffect(() => {
    // Load players from localStorage
    const loadedPlayers = getPlayers()
    setPlayers(loadedPlayers)
  }, [])

  const handleAddPlayer = () => {
    router.push("/admin/players/add")
  }

  const handleDeletePlayer = (playerId: string) => {
    if (confirm("Are you sure you want to delete this player? This action cannot be undone.")) {
      deletePlayer(playerId)
      setPlayers(players.filter((player) => player.id !== playerId))

      toast({
        title: "Player deleted",
        description: "The player has been removed from the system.",
      })
    }
  }

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      searchTerm === "" ||
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSkill = skillFilter === "all" || player.skillLevel.toLowerCase() === skillFilter.toLowerCase()

    const matchesArea = areaFilter === "all" || player.area.toLowerCase() === areaFilter.toLowerCase()

    return matchesSearch && matchesSkill && matchesArea
  })

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Player Management</h1>
          <p className="text-zinc-400">Manage players, profiles, and statistics</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-dunkin-orange hover:bg-dunkin-orange/90 text-white" onClick={handleAddPlayer}>
            <Plus className="h-4 w-4 mr-2" /> Add Player
          </Button>
          <Button variant="outline" className="border-zinc-700">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search players..."
                className="pl-9 bg-zinc-800 border-zinc-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="All Skill Levels" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="all">All Skill Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>

            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="All Areas" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="downtown">Downtown</SelectItem>
                <SelectItem value="westside">Westside</SelectItem>
                <SelectItem value="eastside">Eastside</SelectItem>
                <SelectItem value="north">North</SelectItem>
                <SelectItem value="south">South</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-zinc-800/50 border-zinc-800">
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Skill Level</TableHead>
                <TableHead>Games Played</TableHead>
                <TableHead>Streak</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <TableRow key={player.id} className="hover:bg-zinc-800/50 border-zinc-800">
                    <TableCell className="font-medium">{player.id.substring(0, 6)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-dunkin-orange flex items-center justify-center text-white font-bold">
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span>{player.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{player.email}</TableCell>
                    <TableCell>{player.area}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                        {player.skillLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-zinc-400" />
                        <span>{player.gamesPlayed}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-dunkin-yellow" />
                        <span>{player.streak}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          player.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-zinc-500/20 text-zinc-400"
                        }
                      >
                        {player.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-zinc-800"
                            onClick={() => router.push(`/admin/players/${player.id}`)}
                          >
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-zinc-800"
                            onClick={() => router.push(`/admin/players/${player.id}/edit`)}
                          >
                            Edit Player
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-zinc-800"
                            onClick={() => router.push(`/admin/players/${player.id}/stats`)}
                          >
                            Manage Stats
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-zinc-800"
                            onClick={() => router.push(`/admin/players/${player.id}/games`)}
                          >
                            Game History
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-zinc-800 text-red-500"
                            onClick={() => handleDeletePlayer(player.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Player
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-zinc-500">No players found</p>
                      <Button
                        variant="outline"
                        className="border-dunkin-orange text-dunkin-orange hover:bg-dunkin-orange/10"
                        onClick={handleAddPlayer}
                      >
                        Add your first player
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Mobile floating action button */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Button
          className="bg-dunkin-orange hover:bg-dunkin-orange/90 text-white rounded-full h-14 w-14 shadow-lg"
          onClick={handleAddPlayer}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
