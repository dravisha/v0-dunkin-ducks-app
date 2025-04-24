import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Mock data for development and testing
import { mockGames, mockPlayers, mockRegistrations } from "./mock-data"

// Singleton pattern for Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null

// Environment detection
export const isDevelopment = process.env.NODE_ENV === "development"
export const isPreview = process.env.VERCEL_ENV === "preview"
export const isMissingEnvVars = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a robust Supabase client that handles missing environment variables
export function createSupabaseClient() {
  // Return existing client if already initialized
  if (supabaseClient) return supabaseClient

  // Check for required environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If environment variables are missing, return a mock client
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Missing Supabase environment variables, using mock client")
    return createMockClient()
  }

  // Create and return a real Supabase client
  try {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
    return supabaseClient
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    return createMockClient()
  }
}

// Create a mock client for development and testing
function createMockClient() {
  return {
    from: (table: string) => ({
      select: (query?: string) => ({
        eq: (column: string, value: any) => ({
          single: () => Promise.resolve({ data: getMockData(table, value), error: null }),
          then: (callback: Function) => Promise.resolve(callback({ data: getMockData(table, value), error: null })),
        }),
        order: () => ({
          then: (callback: Function) => Promise.resolve(callback({ data: getMockData(table), error: null })),
        }),
        then: (callback: Function) => Promise.resolve(callback({ data: getMockData(table), error: null })),
      }),
      insert: (rows: any[]) => ({
        select: () => Promise.resolve({ data: rows, error: null }),
        then: (callback: Function) => Promise.resolve(callback({ data: rows, error: null })),
      }),
      update: (updates: any) => ({
        eq: () => ({
          select: () => Promise.resolve({ data: [{ ...updates, id: "mock-id" }], error: null }),
          then: (callback: Function) => Promise.resolve(callback({ data: null, error: null })),
        }),
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
      }),
    }),
    auth: {
      getUser: () =>
        Promise.resolve({ data: { user: { id: "mock-user-id", email: "user@example.com" } }, error: null }),
      getSession: () => Promise.resolve({ data: { session: { user: { id: "mock-user-id" } } }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
    channel: (name: string) => ({
      on: () => ({
        subscribe: () => ({
          unsubscribe: () => {},
        }),
      }),
    }),
  }
}

// Helper function to get mock data based on table name
function getMockData(table: string, id?: string) {
  switch (table) {
    case "games":
      return id ? mockGames.find((game) => game.id === id) : mockGames
    case "players":
      return id ? mockPlayers.find((player) => player.id === id) : mockPlayers
    case "game_registrations":
      return id ? mockRegistrations.filter((reg) => reg.game_id === id) : mockRegistrations
    default:
      return []
  }
}
