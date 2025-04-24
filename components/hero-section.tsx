import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-b from-brand-dark-900 to-brand-dark-800 py-10 md:py-20">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6">
          Dunkin' <span className="text-[#d27621]">Ducks</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
          Making pickup basketball inclusive and accessible in Bangalore. Join our community for balanced teams,
          friendly competition, and lots of fun on the court!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/games">
            <Button size="lg" className="bg-[#d27621] hover:bg-brand-amber-600 text-white w-full sm:w-auto">
              Find Games
            </Button>
          </Link>
          <Link href="/our-story">
            <Button
              size="lg"
              variant="outline"
              className="border-brand-gray-700 text-brand-gray-300 hover:bg-brand-dark-700 w-full sm:w-auto"
            >
              Our Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
