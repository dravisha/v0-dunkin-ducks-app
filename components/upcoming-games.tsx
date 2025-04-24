"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Users, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UpcomingGames() {
  const { toast } = useToast()
  // Reset games data
  const [games, setGames] = useState([])

  const handleRegister = (gameId: number) => {
    setGames(
      games.map((game) => {
        if (game.id === gameId) {
          // Update player count if registering
          if (!game.registered) {
            const [current, max] = game.players.split("/")
            const newCurrent = Number.parseInt(current) + 1
            const newStatus =
              newCurrent === Number.parseInt(max)
                ? "Full"
                : newCurrent >= Number.parseInt(max) - 2
                  ? "Almost Full"
                  : "Open"

            return {
              ...game,
              registered: true,
              players: `${newCurrent}/${max}`,
              status: newStatus,
            }
          }
          // If unregistering
          else {
            const [current, max] = game.players.split("/")
            const newCurrent = Number.parseInt(current) - 1
            const newStatus =
              newCurrent === Number.parseInt(max)
                ? "Full"
                : newCurrent >= Number.parseInt(max) - 2
                  ? "Almost Full"
                  : "Open"

            return {
              ...game,
              registered: false,
              players: `${newCurrent}/${max}`,
              status: newStatus,
            }
          }
        }
        return game
      }),
    )

    const game = games.find((g) => g.id === gameId)

    toast({
      title: game?.registered ? "Unregistered from game" : "Registered for game",
      description: `You have ${game?.registered ? "unregistered from" : "registered for"} the game at ${game?.location} on ${game?.date}`,
      variant: game?.registered ? "destructive" : "default",
    })
  }

  return (
    <div>
      {games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <Card key={game.id} className="bg-zinc-900 border-zinc-800 overflow-hidden">
              <div className="h-2 bg-dunkin-orange" />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg">{game.date}</h3>
                  <Badge
                    variant={game.status === "Open" ? "outline" : "secondary"}
                    className={
                      game.status === "Open"
                        ? "border-green-500 text-green-500"
                        : "bg-dunkin-orange/20 text-dunkin-orange border-dunkin-orange"
                    }
                  >
                    {game.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <span className="text-sm">{game.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-zinc-400" />
                    <span className="text-sm">{game.players} players</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-zinc-400" />
                    <span className="text-sm">Fee: {game.joiningFee}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                      {game.gameType}
                    </Badge>
                    {game.inclusivity && (
                      <Badge
                        variant="secondary"
                        className="bg-dunkin-yellow/20 text-dunkin-yellow border-dunkin-yellow"
                      >
                        {game.inclusivity}
                      </Badge>
                    )}
                  </div>

                  <div className="text-xs text-zinc-400 space-y-1">
                    <p>{game.teamsCount}</p>
                    <p>{game.playersPerTeam}</p>
                    <p>{game.womenReservedSpots}</p>
                    <p>{game.nonBinaryReservedSpots}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className={`w-full ${game.registered ? "bg-red-600 hover:bg-red-700" : "bg-dunkin-orange hover:bg-dunkin-orange/90"} text-white`}
                  onClick={() => handleRegister(game.id)}
                >
                  {game.registered ? "Unregister" : "Register"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-zinc-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Games Available</h3>
              <p className="text-zinc-400 mb-6 max-w-md">
                There are no upcoming games scheduled at the moment. Check back later or create your own game!
              </p>
              <Button className="bg-dunkin-orange hover:bg-dunkin-orange/90 text-white">Create a Game</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
