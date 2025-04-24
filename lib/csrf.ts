// Generate a CSRF token
export function generateCsrfToken(): string {
  // In a real app, this would be a more secure implementation
  // For demo purposes, we'll use a simple random string
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Store the CSRF token in localStorage
export function storeCsrfToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("csrf_token", token)
  }
}

// Get the stored CSRF token
export function getCsrfToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("csrf_token")
  }
  return null
}

// Validate a CSRF token
export function validateCsrfToken(token: string): boolean {
  const storedToken = getCsrfToken()
  return storedToken === token
}

// Create a CSRF protected form component
export function createCsrfField(): JSX.Element {
  const token = generateCsrfToken()
  storeCsrfToken(token)

  return <input type="hidden" name="csrf_token" value={token} />
}
