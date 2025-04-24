import Link from "next/link"
import { Bell, Calendar } from "lucide-react"
import { UserDropdown } from "./user-dropdown"
import { getCurrentPlayer } from "@/lib/store"

export default async function Header() {
  // Try to get the current player, but don't throw an error if not found
  let currentPlayer = null
  try {
    currentPlayer = await getCurrentPlayer()
  } catch (error) {
    console.log("Error in Header component:", error)
  }

  return (
    <header className="bg-black text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/games" className="text-white">
            <Calendar className="h-6 w-6" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/notifications" className="text-white">
            <Bell className="h-6 w-6" />
          </Link>

          {currentPlayer && <UserDropdown username={currentPlayer.username || currentPlayer.full_name || "User"} />}
        </div>
      </div>
    </header>
  )
}
