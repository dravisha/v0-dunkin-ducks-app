import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-900 to-transparent z-10" />
      <div
        className="h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
      />
      <div className="absolute inset-0 flex flex-col justify-center z-20 p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image src="/logo.png" alt="Dunkin' Ducks Logo" fill className="object-contain" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-[#d27621]">Dunkin'</span> <span className="text-white">Ducks</span>
          </h1>
        </div>
        <p className="text-lg text-brand-gray-300 max-w-xl mb-6">
          Find games, track stats, and join a community of basketball enthusiasts in your area.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-[#d27621] hover:bg-brand-amber-600 text-white">Find Games</Button>
          <Button variant="outline" className="border-brand-gray-700 text-brand-gray-300 hover:bg-brand-dark-400">
            Create Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
