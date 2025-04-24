"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CreateGameButton() {
  const router = useRouter()

  const handleCreateGame = () => {
    router.push("/admin/games/create")
  }

  return (
    <>
      {/* Desktop button */}
      <Button
        className="bg-dunkin-orange hover:bg-dunkin-orange/90 text-white font-bold px-6 py-2 text-base hidden md:flex"
        onClick={handleCreateGame}
        size="lg"
      >
        <Plus className="h-5 w-5 mr-2" /> Create Game
      </Button>

      {/* Mobile floating action button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          className="bg-dunkin-orange hover:bg-dunkin-orange/90 text-white rounded-full h-14 w-14 shadow-lg"
          onClick={handleCreateGame}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </>
  )
}
