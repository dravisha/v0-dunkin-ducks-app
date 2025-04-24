"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  MapPinIcon,
  Users,
  Clock,
  Loader2,
  Share2,
  Bookmark,
  ChevronRight,
  Star,
  MapIcon,
  UserIcon as Female,
  Trophy,
  UserPlus,
  Check,
} from "lucide-react"
import { formatDate, formatTime } from "@/lib/utils"
import type { Game, Player } from "@/lib/database.types"
import { useRouter } from "next/navigation"
import { RegisteredPlayersModal } from "./registered-players-modal"
import { PaymentModal } from "./payment-modal"
import { WaitlistForm } from "./waitlist-form"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface GameCardProps {
  game: Game
  currentPlayer?: Player | null
  isRegistered?: boolean
  isOnWaitlist?: boolean
  onRegister: (gameId: string) => Promise<{ success: boolean; message: string }> | void
  registeredPlayers?: Player[]
  isPaid?: boolean
}

// Helper function to determine game type icon
const getGameTypeIcon = (gameType: string) => {
  switch (gameType?.toLowerCase()) {
    case "women-only":
      return <Female className="h-3 w-3" />
    case "pros-only":
      return <Trophy className="h-3 w-3" />
    case "mixed":
    default:
      return <Users className="h-3 w-3" />
  }
}

// Helper function to determine game type color
const getGameTypeColor = (gameType: string) => {
  switch (gameType?.toLowerCase()) {
    case "women-only":
      return "bg-purple-900 text-purple-100 border-purple-700"
    case "pros-only":
      return "bg-red-900 text-red-100 border-red-700"
    case "mixed":
      return "bg-teal-900 text-teal-100 border-teal-700"
    default:
      return "bg-blue-900 text-blue-100 border-blue-700"
  }
}

// Helper function to determine capacity status color
const getCapacityStatusColor = (current: number, max: number) => {
  const ratio = current / max
  if (ratio >= 1) return "bg-red-900 text-red-100 border-red-700"
  if (ratio >= 0.8) return "bg-amber-900 text-amber-100 border-amber-700"
  return "bg-green-900 text-green-100 border-green-700"
}

// Helper function to get skill level stars
const getSkillLevelStars = (level: string) => {
  switch (level?.toLowerCase()) {
    case "beginner":
      return 1
    case "intermediate":
      return 2
    case "advanced":
      return 3
    case "pro":
      return 4
    default:
      return 0
  }
}

export default function GameCard({
  game,
  currentPlayer,
  isRegistered = false,
  isOnWaitlist = false,
  onRegister,
  registeredPlayers = [], // Add default empty array
  isPaid = false,
}: GameCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPlayersModal, setShowPlayersModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showWaitlistForm, setShowWaitlistForm] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const router = useRouter()

  // Safely handle potentially undefined values
  const isGameFull = (game?.registered_count || 0) >= (game?.max_players || 10)
  const gameType = game?.game_type || "mixed"
  const skillLevel = game?.skill_level || "intermediate"
  const skillStars = getSkillLevelStars(skillLevel)

  // Safely get the registered count and max players
  const registeredCount = game?.registered_count || 0
  const maxPlayers = game?.max_players || 10

  // Determine game status
  const gameDate = game?.date ? new Date(game.date) : new Date()
  const now = new Date()
  let gameStatus = "upcoming"

  if (isGameFull) {
    gameStatus = "full"
  } else if (gameDate < now) {
    gameStatus = "completed"
  } else if (Math.abs(gameDate.getTime() - now.getTime()) < 3600000) {
    // Within 1 hour
    gameStatus = "in-progress"
  }

  const handleRegister = async () => {
    if (!currentPlayer) {
      router.push("/login")
      return
    }

    if (!currentPlayer.full_name || !currentPlayer.email) {
      router.push("/profile")
      toast({
        title: "Profile Incomplete",
        description: "Please complete your profile before registering for a game.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await onRegister(game.id)

      if (result && "success" in result) {
        if (result.success) {
          toast({
            title: "Registration Successful",
            description: result.message,
          })

          // Show payment modal after successful registration
          if (game.joining_fee > 0) {
            setShowPaymentModal(true)
          }
        } else {
          toast({
            title: "Registration Failed",
            description: result.message,
            variant: "destructive",
          })
        }
      } else {
        // Handle case where onRegister doesn't return expected format
        toast({
          title: "Registration Processed",
          description: "Your registration has been processed.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while registering for the game.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleShowWaitlist = () => {
    if (!currentPlayer) {
      router.push("/login")
      return
    }

    if (!currentPlayer.full_name || !currentPlayer.email) {
      router.push("/profile")
      toast({
        title: "Profile Incomplete",
        description: "Please complete your profile before joining the waitlist.",
        variant: "destructive",
      })
      return
    }

    setShowWaitlistForm(true)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Game removed from bookmarks" : "Game bookmarked",
      description: isBookmarked
        ? "This game has been removed from your bookmarks."
        : "This game has been added to your bookmarks.",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: game.title,
          text: `Join me for ${game.title} at ${game.location} on ${formatDate(game.date)} at ${formatTime(game.time)}`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(
        `Join me for ${game.title} at ${game.location} on ${formatDate(game.date)} at ${formatTime(game.time)}`,
      )
      toast({
        title: "Link copied",
        description: "Game details copied to clipboard.",
      })
    }
  }

  const handleViewMap = () => {
    // In a real app, this would open a map modal or navigate to a map view
    toast({
      title: "Map View",
      description: `Showing map for ${game.location}`,
    })
  }

  // If game is undefined or null, show a fallback UI
  if (!game) {
    return (
      <Card className="w-full bg-[#1A1F2E] border border-gray-800 shadow-lg p-5">
        <p className="text-center text-gray-400">Game information unavailable</p>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-[#1A1F2E] border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Colored top bar based on game type */}
      <div
        className={cn(
          "h-1.5 w-full",
          gameType === "women-only" ? "bg-purple-600" : gameType === "pros-only" ? "bg-red-600" : "bg-dunkin-orange",
        )}
      />

      <div className="p-5">
        {/* Top badges row */}
        <div className="flex flex-wrap justify-between gap-2 mb-3">
          <Badge
            variant="outline"
            className={cn("px-3 py-1 flex items-center gap-1 font-medium", getGameTypeColor(gameType))}
          >
            {getGameTypeIcon(gameType)}
            <span>{gameType.charAt(0).toUpperCase() + gameType.slice(1)}</span>
          </Badge>

          <div className="flex gap-2">
            <Badge
              variant="outline"
              className={cn(
                "px-3 py-1 flex items-center gap-1 font-medium",
                getCapacityStatusColor(registeredCount, maxPlayers),
              )}
            >
              <Users className="h-3 w-3" />
              <span>
                {registeredCount}/{maxPlayers}
              </span>
            </Badge>

            {gameStatus !== "upcoming" && (
              <Badge
                variant="outline"
                className={cn(
                  "px-3 py-1 font-medium",
                  gameStatus === "full"
                    ? "bg-red-900/60 text-red-100 border-red-700"
                    : gameStatus === "in-progress"
                      ? "bg-blue-900/60 text-blue-100 border-blue-700"
                      : gameStatus === "completed"
                        ? "bg-gray-800 text-gray-100 border-gray-700"
                        : "bg-green-900/60 text-green-100 border-green-700",
                )}
              >
                {gameStatus === "full"
                  ? "Full"
                  : gameStatus === "in-progress"
                    ? "In Progress"
                    : gameStatus === "completed"
                      ? "Completed"
                      : "Upcoming"}
              </Badge>
            )}
          </div>
        </div>

        {/* Reserved spots badge - only show if there are reserved spots */}
        {game.women_reserved_spots > 0 && (
          <Badge variant="outline" className="bg-purple-900/40 text-purple-100 border-purple-700 mb-4 px-3 py-1">
            <Female className="h-3 w-3 mr-1" />
            {game.women_reserved_spots} {game.women_reserved_spots === 1 ? "Spot" : "Spots"} Reserved
          </Badge>
        )}

        {/* Game title and skill level */}
        <h3 className="text-2xl font-bold text-white mb-1">{game.title || "Basketball Game"}</h3>

        {/* Skill Level Indicator */}
        {skillStars > 0 && (
          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-400 mr-2">Skill Level:</span>
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className={cn("h-4 w-4", i < skillStars ? "text-yellow-400 fill-yellow-400" : "text-gray-600")}
                />
              ))}
            </div>
          </div>
        )}

        {/* Game Details Section */}
        <div className="space-y-3 text-gray-300 mb-5">
          <div className="flex items-center">
            <CalendarIcon className="mr-3 h-5 w-5 text-dunkin-orange flex-shrink-0" />
            <span>{formatDate(game.date, "EEEE, MMMM do, yyyy")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-3 h-5 w-5 text-dunkin-orange flex-shrink-0" />
            <span>{formatTime(game.time)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPinIcon className="mr-3 h-5 w-5 text-dunkin-orange flex-shrink-0" />
              <span className="line-clamp-1">{game.location}</span>
            </div>
            <button
              onClick={handleViewMap}
              className="text-sm text-dunkin-orange hover:text-dunkin-orange/80 flex items-center ml-2 flex-shrink-0"
            >
              <MapIcon className="h-3 w-3 mr-1" />
              View Map
            </button>
          </div>
        </div>

        {/* Player Information Section */}
        <div className="pt-4 border-t border-gray-700/50 mb-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-2">
                {(registeredPlayers || []).slice(0, 3).map((player, index) => (
                  <Avatar key={index} className="border-2 border-[#1A1F2E] h-8 w-8">
                    <AvatarFallback className="bg-dunkin-orange text-white text-xs">
                      {player.full_name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {(registeredPlayers || []).length > 3 && (
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border-2 border-[#1A1F2E]">
                    +{(registeredPlayers || []).length - 3}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-400">
                {(registeredPlayers || []).length > 0
                  ? `${(registeredPlayers || []).length} registered`
                  : "No players registered yet"}
              </span>
            </div>
            <button
              onClick={() => setShowPlayersModal(true)}
              className="text-sm text-dunkin-orange hover:text-dunkin-orange/80 flex items-center"
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Primary Action Button */}
        <Button
          variant={isRegistered ? "outline" : "default"}
          className={cn(
            "w-full py-6 mb-3 font-medium text-base",
            isRegistered
              ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
              : isGameFull
                ? "bg-amber-700 hover:bg-amber-600 text-white"
                : "bg-dunkin-orange hover:bg-dunkin-orange/90 text-white",
          )}
          onClick={isRegistered ? undefined : isGameFull ? handleShowWaitlist : handleRegister}
          disabled={isLoading || (isRegistered && !isGameFull)}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {isRegistered ? "Processing..." : "Registering..."}
            </>
          ) : isRegistered ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Registered
            </>
          ) : isGameFull ? (
            <>
              <UserPlus className="mr-2 h-5 w-5" />
              Join Waitlist
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-5 w-5" />
              Register Now
            </>
          )}
        </Button>

        {/* Secondary Actions */}
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handleShare}>
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn("text-gray-400 hover:text-white", isBookmarked && "text-dunkin-orange")}
            onClick={handleBookmark}
          >
            <Bookmark className={cn("mr-1 h-4 w-4", isBookmarked && "fill-dunkin-orange")} />
            {isBookmarked ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      {showPlayersModal && (
        <RegisteredPlayersModal players={registeredPlayers || []} onClose={() => setShowPlayersModal(false)} />
      )}

      {showPaymentModal && (
        <PaymentModal gameId={game.id} gameTitle={game.title} onClose={() => setShowPaymentModal(false)} />
      )}

      {showWaitlistForm && (
        <WaitlistForm gameId={game.id} gameTitle={game.title} onClose={() => setShowWaitlistForm(false)} />
      )}
    </Card>
  )
}
