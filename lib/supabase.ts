import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Define types based on the database schema
export type Game = Database["public"]["Tables"]["games"]["Row"]
export type Player = {
  id: string
  user_id: string
  username?: string
  full_name: string
  email: string
  mobile: string
  skill_level: string
  preferred_area: string
  position: string
  bio?: string
  is_profile_complete: boolean
  created_at: string
  updated_at?: string
}
export type GameRegistration = Database["public"]["Tables"]["game_registrations"]["Row"] & {
  player?: Player
  payment_status?: "paid" | "unpaid"
}

let supabaseClient: ReturnType<typeof createClient> | null = null

// Environment detection
export const isDevelopment = process.env.NODE_ENV === "development"
export const isPreview = process.env.VERCEL_ENV === "preview"
export const isMissingEnvVars = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Update the getSupabaseClient function to handle missing environment variables gracefully
export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables")
    // Return a mock client that won't throw errors when methods are called
    return createMockClient()
  }

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

// Create a mock client that returns empty data instead of throwing errors
function createMockClient() {
  return {
    from: () => ({
      select: () => ({
        count: () => ({
          head: true,
          then: (callback: Function) => Promise.resolve(callback({ count: 0, error: null })),
          catch: () => Promise.resolve({ count: 0, error: null }),
        }),
        eq: () => ({
          then: (callback: Function) => Promise.resolve(callback({ data: [], error: null })),
          catch: () => Promise.resolve({ data: [], error: null }),
        }),
        gte: () => ({
          then: (callback: Function) => Promise.resolve(callback({ data: [], error: null })),
          catch: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () =>
        Promise.resolve({
          data: {
            user: {
              id: "mock-user-id",
              email: "user@example.com",
            },
            session: {
              access_token: "mock-token",
              refresh_token: "mock-refresh-token",
              expires_at: Date.now() + 3600,
            },
          },
          error: null,
        }),
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

// Create a server-side client (for use in Server Components)
export function getServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables for server client")
    throw new Error("Missing Supabase environment variables for server client")
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  })
}
