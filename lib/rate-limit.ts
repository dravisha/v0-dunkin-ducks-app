// Simple in-memory rate limiter for demo purposes
// In a real app, this would use Redis or another distributed store

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore: Record<string, RateLimitEntry> = {}

// Clean up expired entries periodically
if (typeof window !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    for (const key in rateLimitStore) {
      if (rateLimitStore[key].resetAt < now) {
        delete rateLimitStore[key]
      }
    }
  }, 60000) // Clean up every minute
}

export interface RateLimitOptions {
  // Maximum number of attempts
  max: number
  // Time window in milliseconds
  windowMs: number
  // Identifier (usually IP address)
  identifier: string
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: Date
  blocked: boolean
}

export function rateLimit(options: RateLimitOptions): RateLimitResult {
  const { max, windowMs, identifier } = options
  const now = Date.now()

  // Get or create entry
  const entry = rateLimitStore[identifier] || {
    count: 0,
    resetAt: now + windowMs,
  }

  // Reset if expired
  if (entry.resetAt < now) {
    entry.count = 0
    entry.resetAt = now + windowMs
  }

  // Increment count
  entry.count++

  // Store updated entry
  rateLimitStore[identifier] = entry

  return {
    success: entry.count <= max,
    remaining: Math.max(0, max - entry.count),
    resetAt: new Date(entry.resetAt),
    blocked: entry.count > max,
  }
}

// Helper for login attempts
export function checkLoginRateLimit(identifier: string): RateLimitResult {
  return rateLimit({
    max: 5, // 5 attempts
    windowMs: 15 * 60 * 1000, // 15 minutes
    identifier: `login:${identifier}`,
  })
}
