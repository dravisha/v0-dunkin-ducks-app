"use client"

import { useEffect, useState } from "react"
import GameCard from "@/components/game-card"
import { getGames, getCurrentPlayer, registerPlayerForGame, unregisterPlayerFromGame } from "@/lib/store"
import type { Game, Player } from "@/lib/database.types"
import { useToast } from "@/hooks/use-toast"
import ErrorBoundary from "@/components/error-boundary"
import LoadingSpinner from "@/components/loading-spinner"
import { useRouter } from "next/navigation"

export default function GamesFeed() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [registeredGameIds, setRegisteredGameIds] = useState<Set<string>>(new Set())
  const [paidGameIds, setPaidGameIds] = useState<Set<string>>(new Set())
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)

        // Get all games
        const gamesData = await getGames()
        setGames(gamesData)

        // Get current player
        const player = await getCurrentPlayer()
        if (player) {
          setCurrentPlayer(player)

          // For now, we'll just set empty registration data
          // In a real app, you would fetch this from the backend
          const registeredIds = new Set<string>()
          const paidIds = new Set<string>()

          setRegisteredGameIds(registeredIds)
          setPaidGameIds(paidIds)
        }
      } catch (err) {
        console.error("Error loading data:", err)
        setError("Failed to load games. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleRegisterToggle = async (gameId: string) => {
    if (!currentPlayer) {
      toast({
        title: "Login required",
        description: "Please log in to register for games.",
        variant: "destructive",
      })
      router.push("/login")
      return { success: false, message: "Login required" }
    }

    try {
      const isRegistered = registeredGameIds.has(gameId)

      if (isRegistered) {
        // Unregister
        await unregisterPlayerFromGame(currentPlayer.id, gameId)
        setRegisteredGameIds((prev) => {
          const updated = new Set(prev)
          updated.delete(gameId)
          return updated
        })
        setPaidGameIds((prev) => {
          const updated = new Set(prev)
          updated.delete(gameId)
          return updated
        })
        toast({
          title: "Unregistered",
          description: "You have been unregistered from this game.",
        })
        return { success: true, message: "You have been unregistered from this game." }
      } else {
        // Register
        await registerPlayerForGame(currentPlayer.id, gameId)
        setRegisteredGameIds((prev) => {
          const updated = new Set(prev)
          updated.add(gameId)
          return updated
        })
        toast({
          title: "Registered",
          description: "You have been registered for this game. Please complete the payment.",
        })
        return { success: true, message: "You have been registered for this game." }
      }
    } catch (err) {
      console.error("Error toggling registration:", err)
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      })
      return { success: false, message: "There was an error processing your request." }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner text="Loading games..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 text-[#d27621] hover:underline">
          Retry
        </button>
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="text-center p-4 text-gray-400">
        <p>No games available at the moment. Check back later!</p>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4 sm:space-y-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            currentPlayer={currentPlayer}
            isRegistered={registeredGameIds.has(game.id)}
            isOnWaitlist={false}
            onRegister={handleRegisterToggle}
            registeredPlayers={[]}
            isPaid={paidGameIds.has(game.id)}
          />
        ))}
      </div>
    </ErrorBoundary>
  )
}
