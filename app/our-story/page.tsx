import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-dark-900 to-brand-dark-800 text-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Our Story</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">A quick intro about Rajat and me (Dravisha):</h2>
              <p className="text-base md:text-lg">
                Rajat grew up in Miami before returning to his family's hometown - Bangalore in 2011. Need authentic
                Bangalore recommendations? He's your guy!
              </p>
              <p className="text-base md:text-lg mt-3">
                I grew up across North and East India as an army kid. After organising games regularly in Delhi, I moved
                to Bangalore two years ago and fell in love with the city!
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">About Dunkin' Ducks:</h2>
              <p className="text-base md:text-lg">
                We created this community to make pickup basketball inclusive and accessible in Bangalore. Why? Most
                public courts here don't welcome everyone (especially women or beginners) or play organised pickup
                games.
              </p>
            </div>

            <p className="text-base md:text-lg font-medium">
              Next week's slots are published every Sunday at 12 PM. You can sign up on this app itself! :)
            </p>

            <div>
              <h2 className="text-xl font-semibold mb-3">What we offer to our members:</h2>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
                <li>Lots of fun on the court.</li>
                <li>We provide basketballs—no need to rent from Game Theory</li>
                <li>
                  We spend a lot of time curating balanced teams every game to challenge all skill levels and help you
                  improve your game
                </li>
                <li>There's also advanced stats and game recordings for Pro-Am and Pro-run groups 1x/week</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Rules:</h2>
              <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
                <li>
                  Pro-run group is invitation-only for advanced players. Qualify by joining recorded games—top 3 players
                  based on stats (adjusted +/-) receive invitations.
                </li>
                <li>
                  Our community embraces diversity in gender, culture, and skill levels. Inappropriate behavior results
                  in immediate ban.
                </li>
              </ul>
            </div>

            <p className="font-bold text-center mt-8 text-xl">Let's get rolling! 🔥🏀</p>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/games">
              <Button size="lg" className="bg-[#d27621] hover:bg-brand-amber-600 text-white">
                Find Games
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
