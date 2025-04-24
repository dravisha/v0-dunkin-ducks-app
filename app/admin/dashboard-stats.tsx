"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, Trophy, Activity } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { useErrorHandler } from "@/lib/error-handler"

interface DashboardStats {
  totalPlayers: number
  activeGames: number
  tournaments: number
  registrations: number
  playerGrowth: number
  gameGrowth: number
  registrationGrowth: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPlayers: 0,
    activeGames: 0,
    tournaments: 0,
    registrations: 0,
    playerGrowth: 0,
    gameGrowth: 0,
    registrationGrowth: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { handleError } = useErrorHandler()

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      try {
        // Check if we're in a development/preview environment without Supabase
        const isDevelopmentOrPreview = process.env.NODE_ENV === "development" || !process.env.NEXT_PUBLIC_SUPABASE_URL

        if (isDevelopmentOrPreview) {
          // Use mock data for development/preview
          setStats({
            totalPlayers: 42,
            activeGames: 7,
            tournaments: 2,
            registrations: 156,
            playerGrowth: 8,
            gameGrowth: 3,
            registrationGrowth: 12,
          })
          return
        }

        const supabase = getSupabaseClient()

        // Get player count
        const { count: playerCount, error: playerError } = await supabase
          .from("players")
          .select("*", { count: "exact", head: true })

        if (playerError) throw playerError

        // Get active games count
        const { count: gameCount, error: gameError } = await supabase
          .from("games")
          .select("*", { count: "exact", head: true })
          .gte("date", new Date().toISOString().split("T")[0])

        if (gameError) throw gameError

        // Get registration count
        const { count: registrationCount, error: regError } = await supabase
          .from("game_registrations")
          .select("*", { count: "exact", head: true })

        if (regError) throw regError

        // Calculate growth (in a real app, this would compare to previous period)
        // For demo purposes, we'll use random values
        const playerGrowth = Math.floor(Math.random() * 10) + 1
        const gameGrowth = Math.floor(Math.random() * 5) + 1
        const registrationGrowth = Math.floor(Math.random() * 15) + 1

        setStats({
          totalPlayers: playerCount || 0,
          activeGames: gameCount || 0,
          tournaments: 0, // Not implemented yet
          registrations: registrationCount || 0,
          playerGrowth,
          gameGrowth,
          registrationGrowth,
        })
      } catch (error) {
        console.error("Failed to load dashboard statistics:", error)
        setError("Failed to load statistics. Using demo data instead.")

        // Fallback to demo data
        setStats({
          totalPlayers: 38,
          activeGames: 5,
          tournaments: 1,
          registrations: 124,
          playerGrowth: 6,
          gameGrowth: 2,
          registrationGrowth: 10,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()

    // Skip real-time subscriptions if we're in development/preview
    if (process.env.NODE_ENV === "development" || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return
    }

    // Set up real-time subscription
    try {
      const supabase = getSupabaseClient()

      const playersSubscription = supabase
        .channel("players-changes")
        .on("postgres_changes", { event: "*", schema: "public", table: "players" }, () => {
          fetchStats()
        })
        .subscribe()

      const gamesSubscription = supabase
        .channel("games-changes")
        .on("postgres_changes", { event: "*", schema: "public", table: "games" }, () => {
          fetchStats()
        })
        .subscribe()

      const registrationsSubscription = supabase
        .channel("registrations-changes")
        .on("postgres_changes", { event: "*", schema: "public", table: "game_registrations" }, () => {
          fetchStats()
        })
        .subscribe()

      return () => {
        playersSubscription.unsubscribe()
        gamesSubscription.unsubscribe()
        registrationsSubscription.unsubscribe()
      }
    } catch (error) {
      console.error("Error setting up real-time subscriptions:", error)
      // Continue without real-time updates
    }
  }, [handleError])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {error && (
        <div className="col-span-full mb-4 p-4 bg-amber-900/20 border border-amber-900/30 rounded-lg">
          <p className="text-amber-200 text-sm">{error}</p>
        </div>
      )}

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Total Players</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-zinc-800 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-3xl font-bold text-white mt-1">{stats.totalPlayers}</p>
              )}
              <p className="text-xs text-green-500 mt-1">+{stats.playerGrowth} this week</p>
            </div>
            <div className="w-12 h-12 bg-dunkin-orange/20 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-dunkin-orange" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Active Games</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-zinc-800 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-3xl font-bold text-white mt-1">{stats.activeGames}</p>
              )}
              <p className="text-xs text-green-500 mt-1">+{stats.gameGrowth} this week</p>
            </div>
            <div className="w-12 h-12 bg-dunkin-yellow/20 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-dunkin-yellow" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Tournaments</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-zinc-800 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-3xl font-bold text-white mt-1">{stats.tournaments}</p>
              )}
              <p className="text-xs text-zinc-400 mt-1">Next: N/A</p>
            </div>
            <div className="w-12 h-12 bg-dunkin-orange/20 rounded-full flex items-center justify-center">
              <Trophy className="h-6 w-6 text-dunkin-orange" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Registrations</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-zinc-800 animate-pulse rounded mt-1"></div>
              ) : (
                <p className="text-3xl font-bold text-white mt-1">{stats.registrations}</p>
              )}
              <p className="text-xs text-green-500 mt-1">+{stats.registrationGrowth} this week</p>
            </div>
            <div className="w-12 h-12 bg-dunkin-yellow/20 rounded-full flex items-center justify-center">
              <Activity className="h-6 w-6 text-dunkin-yellow" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
