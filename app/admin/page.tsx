"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart } from "recharts"
import { Download } from "lucide-react"
import Link from "next/link"
import DashboardStats from "./dashboard-stats"
import { Activity, Calendar, Users } from "lucide-react"

export default function AdminDashboard() {
  // Demo data for charts
  const userActivity = [
    { date: "Mar 1", users: 12 },
    { date: "Mar 8", users: 18 },
    { date: "Mar 15", users: 15 },
    { date: "Mar 22", users: 22 },
    { date: "Mar 29", users: 19 },
    { date: "Apr 5", users: 25 },
    { date: "Apr 12", users: 28 },
  ]

  const gameRegistrations = [
    { date: "Mar 1", registrations: 8 },
    { date: "Mar 8", registrations: 15 },
    { date: "Mar 15", registrations: 12 },
    { date: "Mar 22", registrations: 20 },
    { date: "Mar 29", registrations: 18 },
    { date: "Apr 5", registrations: 24 },
    { date: "Apr 12", registrations: 30 },
  ]

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-zinc-400">Overview of your basketball community</p>
        </div>
        <Button className="bg-dunkin-orange hover:bg-dunkin-orange/90 text-white">
          <Download className="h-4 w-4 mr-2" /> Generate Reports
        </Button>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Player Activity</CardTitle>
            <Link href="/admin/players">
              <Button variant="ghost" className="text-dunkin-orange hover:text-dunkin-orange/90 hover:bg-zinc-800">
                View All Players
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  users: {
                    label: "Active Players",
                    color: "hsl(28 100% 54%)",
                  },
                }}
              >
                <LineChart data={userActivity} margin={{ top: 5, right: 5, bottom: 25, left: 5 }}>
                  <CartesianGrid vertical={false} stroke="#333" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(28 100% 54%)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(28 100% 54%)" }}
                    activeDot={{ r: 6, fill: "hsl(28 100% 54%)" }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Game Registrations</CardTitle>
            <Link href="/admin/games">
              <Button variant="ghost" className="text-dunkin-orange hover:text-dunkin-orange/90 hover:bg-zinc-800">
                View All Games
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  registrations: {
                    label: "Registrations",
                    color: "hsl(60 100% 50%)",
                  },
                }}
              >
                <BarChart data={gameRegistrations} margin={{ top: 5, right: 5, bottom: 25, left: 5 }}>
                  <CartesianGrid vertical={false} stroke="#333" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="registrations" fill="hsl(60 100% 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="outline" className="border-zinc-700">
            View All Activity
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-zinc-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-dunkin-orange/20 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-dunkin-orange" />
                </div>
                <div>
                  <p className="font-medium">New Player Registered</p>
                  <p className="text-sm text-zinc-400">John Doe joined the platform</p>
                </div>
              </div>
              <span className="text-xs text-zinc-500">2 hours ago</span>
            </div>

            <div className="p-4 bg-zinc-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-dunkin-yellow/20 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-dunkin-yellow" />
                </div>
                <div>
                  <p className="font-medium">New Game Created</p>
                  <p className="text-sm text-zinc-400">Downtown Pickup Game on Friday</p>
                </div>
              </div>
              <span className="text-xs text-zinc-500">5 hours ago</span>
            </div>

            <div className="p-4 bg-zinc-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                  <Activity className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Game Registration</p>
                  <p className="text-sm text-zinc-400">Sarah Johnson registered for Weekend Tournament</p>
                </div>
              </div>
              <span className="text-xs text-zinc-500">Yesterday</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
