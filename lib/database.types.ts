export interface Game {
  id: string
  title: string
  description?: string
  date: string
  time: string
  location: string
  game_type: "women-only" | "mixed" | "pros-only"
  skill_level: "beginner" | "intermediate" | "advanced" | "pro"
  max_players: number
  registered_count: number
  women_reserved_spots: number
  non_binary_reserved_spots?: number
  joining_fee: number
  status: "upcoming" | "in-progress" | "completed" | "cancelled"
  allow_waitlist?: boolean
  require_approval?: boolean
  send_reminders?: boolean
  created_at?: string
  updated_at?: string
}

export interface Player {
  id: string
  user_id?: string
  full_name: string
  email: string
  mobile?: string
  skill_level?: string
  preferred_area?: string
  position?: string
  bio?: string
  is_profile_complete?: boolean
  created_at?: string
  updated_at?: string
}

export interface GameRegistration {
  id: string
  game_id: string
  player_id: string
  status: "registered" | "checked_in" | "completed" | "cancelled"
  payment_status?: "unpaid" | "pending" | "paid"
  created_at?: string
  updated_at?: string
  player?: Player
}

// Define the Database interface for Supabase
export interface Database {
  public: {
    Tables: {
      games: {
        Row: Game
        Insert: Omit<Game, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Game, "id" | "created_at" | "updated_at">>
      }
      players: {
        Row: Player
        Insert: Omit<Player, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Player, "id" | "created_at" | "updated_at">>
      }
      game_registrations: {
        Row: GameRegistration
        Insert: Omit<GameRegistration, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<GameRegistration, "id" | "created_at" | "updated_at">>
      }
    }
  }
}
