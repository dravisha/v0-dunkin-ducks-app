import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllWaitlists, getGameById } from "@/lib/store"

export default async function AdminWaitlistPage() {
  const waitlists = await getAllWaitlists()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Manage Waitlists</h1>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">All Waitlists</CardTitle>
        </CardHeader>
        <CardContent>
          {waitlists.length === 0 ? (
            <p className="text-center text-gray-400">No players on waitlists.</p>
          ) : (
            <div className="space-y-6">
              {waitlists.map(async (waitlist) => {
                const game = await getGameById(waitlist.game_id)
                return (
                  <div key={waitlist.id} className="p-4 bg-gray-700 rounded-md">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-white">{game?.title || "Unknown Game"}</h3>
                        <p className="text-sm text-gray-400">Position: {waitlist.position || "Unknown"}</p>
                      </div>
                      <Badge className="bg-amber-900 text-amber-100 border-amber-700">Waitlist</Badge>
                    </div>

                    <div className="p-3 bg-gray-600 rounded-md mb-3">
                      <h4 className="font-medium text-white">{waitlist.player?.full_name || "Unknown Player"}</h4>
                      <p className="text-sm text-gray-300">{waitlist.player?.email}</p>
                      {waitlist.player?.mobile && <p className="text-sm text-gray-300">{waitlist.player.mobile}</p>}
                      {waitlist.player?.skill_level && (
                        <p className="text-sm text-gray-300">Skill Level: {waitlist.player.skill_level}</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        // This would need a server action to move from waitlist to registered
                      >
                        Move to Registered
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                        // This would need a server action to remove from waitlist
                      >
                        Remove from Waitlist
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
