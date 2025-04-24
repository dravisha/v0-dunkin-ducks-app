"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StatsHighlight() {
  const data = [
    { game: "Game 1", points: 12 },
    { game: "Game 2", points: 18 },
    { game: "Game 3", points: 15 },
    { game: "Game 4", points: 22 },
    { game: "Game 5", points: 16 },
    { game: "Game 6", points: 24 },
    { game: "Game 7", points: 20 },
  ]

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="points" className="mb-4">
          <TabsList className="bg-zinc-800 border-zinc-700 w-full">
            <TabsTrigger
              value="points"
              className="flex-1 data-[state=active]:bg-dunkin-orange data-[state=active]:text-white"
            >
              Points
            </TabsTrigger>
            <TabsTrigger
              value="assists"
              className="flex-1 data-[state=active]:bg-dunkin-orange data-[state=active]:text-white"
            >
              Assists
            </TabsTrigger>
            <TabsTrigger
              value="rebounds"
              className="flex-1 data-[state=active]:bg-dunkin-orange data-[state=active]:text-white"
            >
              Rebounds
            </TabsTrigger>
          </TabsList>
          <TabsContent value="points">
            <div className="h-[180px] w-full">
              <ChartContainer
                config={{
                  points: {
                    label: "Points",
                    color: "hsl(28 100% 54%)",
                  },
                }}
              >
                <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <CartesianGrid vertical={false} stroke="#333" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="points"
                    stroke="hsl(28 100% 54%)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(28 100% 54%)" }}
                    activeDot={{ r: 6, fill: "hsl(28 100% 54%)" }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="assists">
            <div className="h-[180px] w-full">
              <ChartContainer
                config={{
                  assists: {
                    label: "Assists",
                    color: "hsl(28 100% 54%)",
                  },
                }}
              >
                <LineChart
                  data={[
                    { game: "Game 1", assists: 5 },
                    { game: "Game 2", assists: 7 },
                    { game: "Game 3", assists: 4 },
                    { game: "Game 4", assists: 8 },
                    { game: "Game 5", assists: 6 },
                    { game: "Game 6", assists: 9 },
                    { game: "Game 7", assists: 7 },
                  ]}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid vertical={false} stroke="#333" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="assists"
                    stroke="hsl(28 100% 54%)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(28 100% 54%)" }}
                    activeDot={{ r: 6, fill: "hsl(28 100% 54%)" }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="rebounds">
            <div className="h-[180px] w-full">
              <ChartContainer
                config={{
                  rebounds: {
                    label: "Rebounds",
                    color: "hsl(28 100% 54%)",
                  },
                }}
              >
                <LineChart
                  data={[
                    { game: "Game 1", rebounds: 3 },
                    { game: "Game 2", rebounds: 5 },
                    { game: "Game 3", rebounds: 4 },
                    { game: "Game 4", rebounds: 6 },
                    { game: "Game 5", rebounds: 4 },
                    { game: "Game 6", rebounds: 7 },
                    { game: "Game 7", rebounds: 5 },
                  ]}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid vertical={false} stroke="#333" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="rebounds"
                    stroke="hsl(28 100% 54%)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "hsl(28 100% 54%)" }}
                    activeDot={{ r: 6, fill: "hsl(28 100% 54%)" }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
        <div className="grid grid-cols-3 gap-2 text-center mt-4">
          <div className="bg-zinc-800 p-2 rounded-lg">
            <p className="text-dunkin-orange text-lg font-bold">20.4</p>
            <p className="text-xs text-zinc-400">Avg Points</p>
          </div>
          <div className="bg-zinc-800 p-2 rounded-lg">
            <p className="text-dunkin-orange text-lg font-bold">+12%</p>
            <p className="text-xs text-zinc-400">Improvement</p>
          </div>
          <div className="bg-zinc-800 p-2 rounded-lg">
            <p className="text-dunkin-orange text-lg font-bold">24</p>
            <p className="text-xs text-zinc-400">Season High</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
