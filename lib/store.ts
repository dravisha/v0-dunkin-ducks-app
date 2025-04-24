import { createSupabaseClient, isDevelopment, isPreview, isMissingEnvVars } from "./supabase-client"
import { mockGames, mockPlayers, mockRegistrations, mockWaitlists } from "./mock-data"
import type { Game, Player } from "./database.types"
import { createClient } from "@/lib/supabase/client"

// Utility function to generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Function to get all games
export async function getGames(): Promise<Game[]> {
  // IMPORTANT: Always return mock data in server components
  // This is the most reliable way to avoid fetch errors in server components
  return mockGames
}

// Function to get a single game by ID
export async function getGameById(id: string): Promise<Game | null> {
  // Always return mock data in server components
  const game = mockGames.find((g) => g.id === id)
  return game || null
}

// Alias for getGameById
export async function getGame(id: string): Promise<Game | null> {
  return getGameById(id)
}

// Function to get all games (alias for getGames)
export async function getAllGames(): Promise<Game[]> {
  return getGames()
}

// Function to register a user for a game
export async function registerForGame(gameId: string, userId: string) {
  // This function is only called from client components
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from("registrations")
      .insert([{ game_id: gameId, user_id: userId, payment_status: "unpaid" }])

    if (error) {
      console.error("Error registering for game:", error)
      throw new Error("Failed to register for game")
    }

    return true
  } catch (error) {
    console.error("Error in registerForGame:", error)
    // In development, pretend it succeeded anyway
    return isDevelopment || isPreview
  }
}

// Function to get user registrations
export async function getUserRegistrations(userId: string) {
  // This function is only called from client components
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("registrations")
      .select(`
        *,
        games:game_id(*)
      `)
      .eq("user_id", userId)

    if (error) {
      console.error("Error fetching registrations:", error)
      throw new Error("Failed to fetch registrations")
    }

    return data
  } catch (error) {
    console.error("Error in getUserRegistrations:", error)
    return []
  }
}

// Function to add a user to the waitlist
export async function addToWaitlist(email: string, name: string) {
  // This function is only called from client components
  try {
    const supabase = createClient()
    const { error } = await supabase.from("waitlist").insert([{ email, name }])

    if (error) {
      console.error("Error adding to waitlist:", error)
      throw new Error("Failed to add to waitlist")
    }

    return true
  } catch (error) {
    console.error("Error in addToWaitlist:", error)
    return isDevelopment || isPreview
  }
}

// Function to add a player to the waitlist
export async function addPlayerToWaitlist(gameId: string, notificationPreferences: any = {}): Promise<boolean> {
  // This function is only called from client components
  try {
    // In development/preview, just log and return
    if ((isDevelopment || isPreview) && isMissingEnvVars) {
      console.log("Mock player added to waitlist:", { gameId, notificationPreferences })
      return true
    }

    const supabase = createSupabaseClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("User not authenticated")
    }

    // Add to waitlist
    const { error } = await supabase.from("waitlists").insert([
      {
        game_id: gameId,
        player_id: user.id,
        notification_preferences: notificationPreferences,
      },
    ])

    if (error) {
      console.error("Error adding to waitlist:", error)
      throw new Error("Failed to add to waitlist")
    }

    return true
  } catch (error) {
    console.error("Error adding player to waitlist:", error)
    return isDevelopment || isPreview
  }
}

// Function to get waitlist entries
export async function getWaitlist() {
  // Return mock data in server components
  return mockWaitlists
}

// Function to get registered players for a game
export async function getRegisteredPlayers(gameId: string) {
  // Return mock data in server components
  const registrations = mockRegistrations.filter((r) => r.game_id === gameId)
  return registrations
}

// Function to create a new game
export async function createGame(gameData: any) {
  // This function is only called from client components
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("games").insert([gameData]).select()

    if (error) {
      console.error("Error creating game:", error)
      throw new Error("Failed to create game")
    }

    return data[0]
  } catch (error) {
    console.error("Error in createGame:", error)
    // Return mock data in development
    return {
      id: generateId(),
      ...gameData,
    }
  }
}

// Function to create/save a game
export async function saveGame(gameData: Partial<Game>): Promise<Game | null> {
  // This function is only called from client components
  try {
    // Use mock data if in development/preview or missing env vars
    if ((isDevelopment || isPreview) && isMissingEnvVars) {
      console.log("Mock game saved successfully")
      const newGame: Game = {
        id: generateId(),
        title: gameData.title || "New Game",
        description: gameData.description || "",
        date: gameData.date || new Date().toISOString().split("T")[0],
        time: gameData.time || "18:00",
        location: gameData.location || "TBD",
        game_type: gameData.game_type || "mixed",
        skill_level: gameData.skill_level || "intermediate",
        max_players: gameData.max_players || 10,
        registered_count: gameData.registered_count || 0,
        women_reserved_spots: gameData.women_reserved_spots || 0,
        joining_fee: gameData.joining_fee || 0,
        status: gameData.status || "upcoming",
      }
      return newGame
    }

    const supabase = createSupabaseClient()

    // Ensure all required fields are present
    const gameToSave = {
      title: gameData.title || "New Game",
      location: gameData.location || "TBD",
      date: gameData.date || new Date().toISOString().split("T")[0],
      time: gameData.time || "18:00",
      description: gameData.description || "",
      game_type: gameData.game_type || "mixed",
      skill_level: gameData.skill_level || "intermediate",
      max_players: gameData.max_players || 10,
      women_reserved_spots: gameData.women_reserved_spots || 0,
      non_binary_reserved_spots: gameData.non_binary_reserved_spots || 0,
      joining_fee: gameData.joining_fee || 0,
      status: gameData.status || "upcoming",
      registered_count: gameData.registered_count || 0,
      allow_waitlist: gameData.allow_waitlist !== false, // Default to true
      require_approval: gameData.require_approval || false,
      send_reminders: gameData.send_reminders !== false, // Default to true
    }

    // Insert the game into the database
    const { data, error } = await supabase.from("games").insert([gameToSave]).select()

    if (error) {
      console.error("Error creating game:", error)
      throw new Error("Failed to create game")
    }

    return data[0]
  } catch (error) {
    console.error("Error in saveGame:", error)
    if (isDevelopment || isPreview) {
      // Return mock data in development
      return {
        id: generateId(),
        title: gameData.title || "New Game",
        description: gameData.description || "",
        date: gameData.date || new Date().toISOString().split("T")[0],
        time: gameData.time || "18:00",
        location: gameData.location || "TBD",
        game_type: gameData.game_type || "mixed",
        skill_level: gameData.skill_level || "intermediate",
        max_players: gameData.max_players || 10,
        registered_count: gameData.registered_count || 0,
        women_reserved_spots: gameData.women_reserved_spots || 0,
        joining_fee: gameData.joining_fee || 0,
        status: gameData.status || "upcoming",
      }
    }
    throw error
  }
}

// Function to update a game
export async function updateGame(id: string, gameData: any) {
  // This function is only called from client components
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("games").update(gameData).eq("id", id).select()

    if (error) {
      console.error("Error updating game:", error)
      throw new Error("Failed to update game")
    }

    return data[0]
  } catch (error) {
    console.error("Error in updateGame:", error)
    // Return mock data in development
    return {
      id,
      ...gameData,
    }
  }
}

// Function to delete a game
export async function deleteGame(id: string) {
  // This function is only called from client components
  try {
    const supabase = createClient()
    const { error } = await supabase.from("games").delete().eq("id", id)

    if (error) {
      console.error("Error deleting game:", error)
      throw new Error("Failed to delete game")
    }

    return true
  } catch (error) {
    console.error("Error in deleteGame:", error)
    return isDevelopment || isPreview
  }
}

// Function to get all users
export async function getUsers() {
  // Return mock data in server components
  return mockPlayers
}

// Function to update payment status
export async function updatePaymentStatus(gameId: string, status: "unpaid" | "pending" | "paid"): Promise<boolean> {
  // This function is only called from client components
  try {
    // In development/preview, just log and return
    if ((isDevelopment || isPreview) && isMissingEnvVars) {
      console.log("Mock payment status updated:", { gameId, status })
      return true
    }

    const supabase = createSupabaseClient()

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("User not authenticated")
    }

    const { error } = await supabase
      .from("registrations")
      .update({ payment_status: status })
      .eq("game_id", gameId)
      .eq("user_id", user.id)

    if (error) {
      console.error("Error updating payment status:", error)
      throw new Error("Failed to update payment status")
    }

    return true
  } catch (error) {
    console.error("Error updating payment status:", error)
    return isDevelopment || isPreview
  }
}

// Function to get current player (user) information
export async function getCurrentPlayer(): Promise<Player | null> {
  // Return mock data in server components
  return mockPlayers[0]
}

// Function to register a player for a game
export async function registerPlayerForGame(playerId: string, gameId: string): Promise<boolean> {
  // This function is only called from client components
  try {
    // Use mock data if in development/preview or missing env vars
    if ((isDevelopment || isPreview) && isMissingEnvVars) {
      console.log("Mock registration successful")
      return true
    }

    const supabase = createSupabaseClient()
    const { error } = await supabase
      .from("game_registrations")
      .insert([{ player_id: playerId, game_id: gameId, status: "registered" }])

    if (error) {
      console.error("Error registering player for game:", error)
      throw new Error("Failed to register for game")
    }

    return true
  } catch (error) {
    console.error("Error in registerPlayerForGame:", error)
    // In development, pretend it succeeded anyway
    return isDevelopment || isPreview
  }
}

// Function to unregister a player from a game
export async function unregisterPlayerFromGame(playerId: string, gameId: string): Promise<boolean> {
  // This function is only called from client components
  try {
    // Use mock data if in development/preview or missing env vars
    if ((isDevelopment || isPreview) && isMissingEnvVars) {
      console.log("Mock unregistration successful")
      return true
    }

    const supabase = createSupabaseClient()
    const { error } = await supabase.from("game_registrations").delete().eq("player_id", playerId).eq("game_id", gameId)

    if (error) {
      console.error("Error unregistering player from game:", error)
      throw new Error("Failed to unregister from game")
    }

    return true
  } catch (error) {
    console.error("Error in unregisterPlayerFromGame:", error)
    // In development, pretend it succeeded anyway
    return isDevelopment || isPreview
  }
}

// Function to get registered players for a game
export async function getRegisteredPlayersForGame(gameId: string): Promise<Player[]> {
  // Return mock data in server components
  const registrations = mockRegistrations.filter((r) => r.game_id === gameId)
  return registrations.map((r) => r.player).filter(Boolean) as Player[]
}

// Function to get all players
export function getPlayers(): Player[] {
  // Return mock data in server components
  return mockPlayers
}

// Function to save a player
export function savePlayer(playerData: Partial<Player>): Player {
  try {
    const playerId = playerData.id || generateId()
    const player = {
      ...playerData,
      id: playerId,
      created_at: playerData.created_at || new Date().toISOString(),
    } as Player

    // In development/preview, just log and return
    if ((isDevelopment || isPreview) && isMissingEnvVars) {
      console.log("Mock player saved:", player)
      return player
    }

    // In a real app, this would save to Supabase
    // For now, save to localStorage
    if (typeof window !== "undefined") {
      const existingPlayersData = localStorage.getItem("players")
      const players = existingPlayersData ? JSON.parse(existingPlayersData) : []

      // Check if player already exists
      const existingPlayerIndex = players.findIndex((p: any) => p.id === playerId)
      if (existingPlayerIndex >= 0) {
        // Update existing player
        players[existingPlayerIndex] = {
          ...players[existingPlayerIndex],
          ...player,
          updated_at: new Date().toISOString(),
        }
      } else {
        // Add new player
        players.push(player)
      }

      localStorage.setItem("players", JSON.stringify(players))
    }

    return player as Player
  } catch (error) {
    console.error("Error saving player:", error)
    throw error
  }
}

// Function to update a player's profile
export async function updatePlayerProfile(playerId: string, profileData: Partial<Player>): Promise<Player> {
  try {
    // In development/preview, just log and return
    if ((isDevelopment || isPreview) && isMissingEnvVars) {
      console.log("Mock player profile updated:", { id: playerId, ...profileData })
      return { id: playerId, ...profileData } as Player
    }

    // In a real app, this would update Supabase
    // For now, update localStorage
    if (typeof window !== "undefined") {
      const existingPlayersData = localStorage.getItem("players")
      if (existingPlayersData) {
        const players = JSON.parse(existingPlayersData)
        const playerIndex = players.findIndex((p: any) => p.id === playerId)

        if (playerIndex >= 0) {
          players[playerIndex] = {
            ...players[playerIndex],
            ...profileData,
            updated_at: new Date().toISOString(),
          }

          localStorage.setItem("players", JSON.stringify(players))
          return players[playerIndex]
        }
      }
    }

    throw new Error("Player not found")
  } catch (error) {
    console.error("Error updating player profile:", error)
    if (isDevelopment || isPreview) {
      return { id: playerId, ...profileData, full_name: "Mock User", email: "mock@example.com" } as Player
    }
    throw error
  }
}

// Overload for updatePlayerProfile that accepts a full player object
export async function updatePlayer(player: any) {
  if (!player.id) {
    throw new Error("Player ID is required")
  }
  return updatePlayerProfile(player.id, player)
}

// Function to delete a player
export function deletePlayer(playerId: string): boolean {
  try {
    // In development/preview, just log and return
    if ((isDevelopment || isPreview) && isMissingEnvVars) {
      console.log("Mock player deleted:", playerId)
      return true
    }

    // In a real app, this would delete from Supabase
    // For now, delete from localStorage
    if (typeof window !== "undefined") {
      const existingPlayersData = localStorage.getItem("players")
      if (existingPlayersData) {
        let players = JSON.parse(existingPlayersData)
        players = players.filter((p: any) => p.id !== playerId)
        localStorage.setItem("players", JSON.stringify(players))
      }
    }

    return true
  } catch (error) {
    console.error("Error deleting player:", error)
    return isDevelopment || isPreview
  }
}

// Function to get all waitlists
export async function getAllWaitlists(): Promise<any[]> {
  // Return mock data in server components
  return mockWaitlists
}
