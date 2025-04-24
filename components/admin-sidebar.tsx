import Link from "next/link"
import { CalendarDays, Users, PlusCircle, ListOrdered } from "lucide-react"

export function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-800 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-orange-500">Dunkin&apos; Ducks</h1>
        <p className="text-gray-400 text-sm">Admin Dashboard</p>
      </div>

      <nav className="space-y-2 flex-1">
        <Link href="/admin/games" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <CalendarDays className="mr-3 h-5 w-5 text-gray-400" />
          Games
        </Link>

        <Link
          href="/admin/games/new"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
        >
          <PlusCircle className="mr-3 h-5 w-5 text-gray-400" />
          Create Game
        </Link>

        <Link href="/admin/players" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <Users className="mr-3 h-5 w-5 text-gray-400" />
          Players
        </Link>

        <Link href="/admin/waitlist" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <ListOrdered className="mr-3 h-5 w-5 text-gray-400" />
          Waitlists
        </Link>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <Link href="/games" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
          Back to App
        </Link>
      </div>
    </div>
  )
}
