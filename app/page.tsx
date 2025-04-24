import { getGames, getCurrentPlayer } from "@/lib/store"
import GameCard from "@/components/game-card"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import Link from "next/link"

export default async function Home() {
  // Fetch data with error handling
  let games = []
  let currentPlayer = null
  let error = null

  try {
    games = await getGames()
  } catch (e) {
    console.error("Error fetching games:", e)
    error = e
  }

  try {
    currentPlayer = await getCurrentPlayer()
  } catch (e) {
    console.error("Error fetching current player:", e)
    // Continue without player data
  }

  // Determine if user is logged in
  const isLoggedIn = !!currentPlayer

  // Get the next 3 upcoming games
  const upcomingGames = games.slice(0, 3)

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      <section className="w-full max-w-5xl mx-auto px-4 pt-6 pb-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Upcoming Games</h2>

        {error ? (
          <div className="p-4 bg-red-900/20 border border-red-900/30 rounded-md mb-6">
            <p className="text-red-200">There was an error loading games. Please try again later.</p>
          </div>
        ) : upcomingGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {upcomingGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isRegistered={false}
                onRegister={() => Promise.resolve({ success: true, message: "Demo registration" })}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming games scheduled. Check back soon!</p>
        )}

        <div className="mt-6 md:mt-8 flex justify-center">
          <Link href="/games">
            <Button size="lg">View All Games</Button>
          </Link>
        </div>
      </section>

      <section className="w-full bg-gray-50 py-8 md:py-16 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 md:mb-4">Join the Duck Pond!</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            We provide basketballs, curate balanced teams, and create a welcoming environment for all skill levels. New
            game slots are published every Sunday at 12 PM. Sign up and be part of a community that embraces diversity
            in gender, culture, and basketball skills!
          </p>

          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" variant="default" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
              <Link href="/login?tab=register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <Link href="/profile">
              <Button size="lg">View Your Profile</Button>
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
