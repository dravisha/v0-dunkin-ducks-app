import type { Game, Player, GameRegistration } from "./database.types"

// Mock games data
export const mockGames: Game[] = [
  {
    id: "game-1",
    title: "Downtown Pickup Game",
    description: "Casual pickup game for all skill levels",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    time: "18:00",
    location: "Downtown Community Center",
    game_type: "mixed",
    skill_level: "intermediate",
    max_players: 10,
    registered_count: 6,
    women_reserved_spots: 2,
    joining_fee: 0,
    status: "upcoming",
  },
  {
    id: "game-2",
    title: "Weekend Tournament",
    description: "Competitive 3v3 tournament with prizes",
    date: new Date(Date.now() + 172800000).toISOString().split("T")[0], // Day after tomorrow
    time: "10:00",
    location: "Westside Park Courts",
    game_type: "pros-only",
    skill_level: "advanced",
    max_players: 12,
    registered_count: 8,
    women_reserved_spots: 0,
    joining_fee: 100,
    status: "upcoming",
  },
  {
    id: "game-3",
    title: "Women's Basketball Night",
    description: "Basketball night exclusively for women players",
    date: new Date(Date.now() + 259200000).toISOString().split("T")[0], // 3 days from now
    time: "19:00",
    location: "Eastside Recreation Center",
    game_type: "women-only",
    skill_level: "beginner",
    max_players: 8,
    registered_count: 4,
    women_reserved_spots: 8,
    joining_fee: 0,
    status: "upcoming",
  },
]

// Mock players data
export const mockPlayers: Player[] = [
  {
    id: "player-1",
    user_id: "user-1",
    full_name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1234567890",
    skill_level: "intermediate",
    preferred_area: "Downtown",
    position: "Point Guard",
    bio: "Basketball enthusiast looking to improve my game",
    is_profile_complete: true,
  },
  {
    id: "player-2",
    user_id: "user-2",
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "+0987654321",
    skill_level: "advanced",
    preferred_area: "Westside",
    position: "Shooting Guard",
    bio: "Former college player looking for competitive games",
    is_profile_complete: true,
  },
  {
    id: "player-3",
    user_id: "user-3",
    full_name: "Alex Johnson",
    email: "alex.johnson@example.com",
    mobile: "+1122334455",
    skill_level: "beginner",
    preferred_area: "Eastside",
    position: "Forward",
    bio: "New to basketball but eager to learn",
    is_profile_complete: true,
  },
]

// Mock game registrations
export const mockRegistrations: GameRegistration[] = [
  {
    id: "reg-1",
    game_id: "game-1",
    player_id: "player-1",
    status: "registered",
    payment_status: "paid",
    player: mockPlayers[0],
  },
  {
    id: "reg-2",
    game_id: "game-1",
    player_id: "player-2",
    status: "registered",
    payment_status: "paid",
    player: mockPlayers[1],
  },
  {
    id: "reg-3",
    game_id: "game-2",
    player_id: "player-2",
    status: "registered",
    payment_status: "pending",
    player: mockPlayers[1],
  },
  {
    id: "reg-4",
    game_id: "game-3",
    player_id: "player-3",
    status: "registered",
    payment_status: "unpaid",
    player: mockPlayers[2],
  },
]

// Mock waitlist entries
export const mockWaitlists = [
  {
    id: "waitlist-1",
    game_id: "game-2",
    player_id: "player-1",
    position: 1,
    created_at: new Date().toISOString(),
    player: mockPlayers[0],
  },
  {
    id: "waitlist-2",
    game_id: "game-2",
    player_id: "player-3",
    position: 2,
    created_at: new Date().toISOString(),
    player: mockPlayers[2],
  },
]
