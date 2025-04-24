import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GamesFeed from "@/components/games-feed"
import { Calendar, Filter, MapPin } from "lucide-react"

export default function GamesPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Basketball Games</h1>
          <p className="text-zinc-400">Find and register for upcoming games in your area</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">Create Game</Button>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
            <select className="w-full bg-zinc-800 border-zinc-700 rounded-lg py-2 pl-10 pr-4 focus:ring-orange-500 focus:border-orange-500 appearance-none">
              <option>All Locations</option>
              <option>Downtown Community Center</option>
              <option>Westside Park Courts</option>
              <option>Eastside Recreation Center</option>
              <option>North Community Center</option>
              <option>South Park Courts</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
            <select className="w-full bg-zinc-800 border-zinc-700 rounded-lg py-2 pl-10 pr-4 focus:ring-orange-500 focus:border-orange-500 appearance-none">
              <option>All Dates</option>
              <option>Today</option>
              <option>Tomorrow</option>
              <option>This Week</option>
              <option>Next Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
            <select className="w-full bg-zinc-800 border-zinc-700 rounded-lg py-2 pl-10 pr-4 focus:ring-orange-500 focus:border-orange-500 appearance-none">
              <option>All Skill Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Pro</option>
              <option>Mixed</option>
            </select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-zinc-900 border-zinc-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            All Games
          </TabsTrigger>
          <TabsTrigger value="registered" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Registered
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <GamesFeed />
        </TabsContent>
        <TabsContent value="registered">
          <div className="bg-zinc-900 p-8 rounded-xl text-center">
            <h3 className="text-xl font-bold mb-2">No Registered Games</h3>
            <p className="text-zinc-400 mb-6">You haven't registered for any upcoming games yet.</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse Games</Button>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
