import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getGameById, getRegisteredPlayersForGame } from "@/lib/store"
import { formatDate, formatTime } from "@/lib/utils"

export default async function AdminGameDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const game = await getGameById(params.id)

  if (!game) {
    notFound()
  }

  const registeredPlayers = await getRegisteredPlayersForGame(params.id)

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/games">
          <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-white">{game.title}</h1>
        <Link href={`/admin/games/${params.id}/edit`}>
          <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Game Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-300">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-400">Date:</span>
                <span>{formatDate(game.date)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-400">Time:</span>
                <span>{formatTime(game.time)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-400">Location:</span>
                <span>{game.location}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-400">Max Players:</span>
                <span>{game.max_players}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-400">Registered:</span>
                <span>{game.registered_count}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-400">Status:</span>
                <span>
                  {game.registered_count >= game.max_players ? (
                    <Badge className="bg-red-900 text-red-100 border-red-700">Full</Badge>
                  ) : (
                    <Badge className="bg-green-900 text-green-100 border-green-700">Open</Badge>
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Registered Players</CardTitle>
          </CardHeader>
          <CardContent>
            {registeredPlayers.length === 0 ? (
              <p className="text-gray-400">No players registered yet.</p>
            ) : (
              <div className="space-y-4">
                {registeredPlayers.map((player) => (
                  <div key={player.id} className="p-3 bg-gray-700 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{player.full_name}</h3>
                        <p className="text-sm text-gray-400">{player.email}</p>
                        {player.mobile && <p className="text-sm text-gray-400">{player.mobile}</p>}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {player.payment_status ? (
                          <Badge
                            className={
                              player.payment_status === "paid"
                                ? "bg-green-900 text-green-100 border-green-700"
                                : "bg-amber-900 text-amber-100 border-amber-700"
                            }
                          >
                            {player.payment_status === "paid" ? "Paid" : "Pending"}
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-700 text-gray-300 border-gray-600">Not Paid</Badge>
                        )}
                        {player.skill_level && (
                          <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                            {player.skill_level}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
