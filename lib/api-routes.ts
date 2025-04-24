// This file outlines the API routes that would be implemented in a real backend

/**
 * Authentication Routes
 */
export const authRoutes = {
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  refresh: "/api/auth/refresh",
  me: "/api/auth/me",
}

/**
 * User Management Routes
 */
export const userRoutes = {
  list: "/api/users",
  get: (id: string) => `/api/users/${id}`,
  create: "/api/users",
  update: (id: string) => `/api/users/${id}`,
  delete: (id: string) => `/api/users/${id}`,
  stats: (id: string) => `/api/users/${id}/stats`,
  games: (id: string) => `/api/users/${id}/games`,
}

/**
 * Game Management Routes
 */
export const gameRoutes = {
  list: "/api/games",
  get: (id: string) => `/api/games/${id}`,
  create: "/api/games",
  update: (id: string) => `/api/games/${id}`,
  delete: (id: string) => `/api/games/${id}`,
  register: (id: string) => `/api/games/${id}/register`,
  unregister: (id: string) => `/api/games/${id}/unregister`,
  participants: (id: string) => `/api/games/${id}/participants`,
  recordStats: (id: string) => `/api/games/${id}/stats`,
}

/**
 * Statistics Routes
 */
export const statsRoutes = {
  list: "/api/stats",
  get: (id: string) => `/api/stats/${id}`,
  create: "/api/stats",
  update: (id: string) => `/api/stats/${id}`,
  delete: (id: string) => `/api/stats/${id}`,
  userStats: (userId: string) => `/api/users/${userId}/stats`,
  gameStats: (gameId: string) => `/api/games/${gameId}/stats`,
  leaderboards: "/api/stats/leaderboards",
}

/**
 * Admin Dashboard Routes
 */
export const adminRoutes = {
  dashboard: "/api/admin/dashboard",
  users: "/api/admin/users",
  games: "/api/admin/games",
  stats: "/api/admin/stats",
  reports: "/api/admin/reports",
  settings: "/api/admin/settings",
}
