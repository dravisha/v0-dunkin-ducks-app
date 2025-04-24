import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart } from "recharts"

export default function StatsPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Player Statistics</h1>
          <p className="text-zinc-400">Track your performance and progress over time</p>
        </div>
        <Button className="bg-dunkin-orange hover:bg-dunkin-orange/90 text-white">Download Stats</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="box-score" className="mb-8">
            <TabsList className="bg-zinc-900 border-zinc-800 w-full">
              <TabsTrigger
                value="box-score"
                className="data-[state=active]:bg-dunkin-orange data-[state=active]:text-white"
              >
                Box Score
              </TabsTrigger>
              <TabsTrigger
                value="situational"
                className="data-[state=active]:bg-dunkin-orange data-[state=active]:text-white"
              >
                Situational
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="data-[state=active]:bg-dunkin-orange data-[state=active]:text-white"
              >
                Advanced
              </TabsTrigger>
              <TabsTrigger value="time" className="data-[state=active]:bg-dunkin-orange data-[state=active]:text-white">
                Time
              </TabsTrigger>
            </TabsList>

            <TabsContent value="box-score">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Points Per Game</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          points: {
                            label: "Points",
                            color: "hsl(28 100% 54%)",
                          },
                        }}
                      >
                        <LineChart
                          data={[
                            { game: "Game 1", points: 12 },
                            { game: "Game 2", points: 18 },
                            { game: "Game 3", points: 15 },
                            { game: "Game 4", points: 22 },
                            { game: "Game 5", points: 16 },
                            { game: "Game 6", points: 24 },
                            { game: "Game 7", points: 20 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
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
                    <div className="mt-4 text-center">
                      <p className="text-2xl font-bold text-dunkin-orange">16.8</p>
                      <p className="text-sm text-zinc-400">Average PPG</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Assists & Rebounds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          assists: {
                            label: "Assists",
                            color: "hsl(28 100% 54%)",
                          },
                          rebounds: {
                            label: "Rebounds",
                            color: "hsl(60 100% 50%)",
                          },
                        }}
                      >
                        <BarChart
                          data={[
                            { game: "Game 1", assists: 5, rebounds: 3 },
                            { game: "Game 2", assists: 7, rebounds: 5 },
                            { game: "Game 3", assists: 4, rebounds: 4 },
                            { game: "Game 4", assists: 8, rebounds: 6 },
                            { game: "Game 5", assists: 6, rebounds: 4 },
                            { game: "Game 6", assists: 9, rebounds: 7 },
                            { game: "Game 7", assists: 7, rebounds: 5 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid vertical={false} stroke="#333" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="assists" fill="hsl(28 100% 54%)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="rebounds" fill="hsl(60 100% 50%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-dunkin-orange">6.6</p>
                        <p className="text-sm text-zinc-400">Average APG</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-dunkin-yellow">4.9</p>
                        <p className="text-sm text-zinc-400">Average RPG</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Steals & Blocks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          steals: {
                            label: "Steals",
                            color: "hsl(28 100% 54%)",
                          },
                          blocks: {
                            label: "Blocks",
                            color: "hsl(60 100% 50%)",
                          },
                        }}
                      >
                        <BarChart
                          data={[
                            { game: "Game 1", steals: 2, blocks: 1 },
                            { game: "Game 2", steals: 3, blocks: 0 },
                            { game: "Game 3", steals: 1, blocks: 2 },
                            { game: "Game 4", steals: 4, blocks: 1 },
                            { game: "Game 5", steals: 2, blocks: 0 },
                            { game: "Game 6", steals: 3, blocks: 2 },
                            { game: "Game 7", steals: 2, blocks: 1 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid vertical={false} stroke="#333" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="steals" fill="hsl(28 100% 54%)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="blocks" fill="hsl(60 100% 50%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-dunkin-orange">2.4</p>
                        <p className="text-sm text-zinc-400">Average SPG</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-dunkin-yellow">1.0</p>
                        <p className="text-sm text-zinc-400">Average BPG</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Shooting Percentages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          fg: {
                            label: "FG%",
                            color: "hsl(28 100% 54%)",
                          },
                          threes: {
                            label: "3PT%",
                            color: "hsl(60 100% 50%)",
                          },
                        }}
                      >
                        <LineChart
                          data={[
                            { game: "Game 1", fg: 45, threes: 33 },
                            { game: "Game 2", fg: 52, threes: 40 },
                            { game: "Game 3", fg: 48, threes: 35 },
                            { game: "Game 4", fg: 55, threes: 42 },
                            { game: "Game 5", fg: 50, threes: 38 },
                            { game: "Game 6", fg: 53, threes: 41 },
                            { game: "Game 7", fg: 51, threes: 39 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid vertical={false} stroke="#333" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="fg"
                            stroke="hsl(28 100% 54%)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "hsl(28 100% 54%)" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="threes"
                            stroke="hsl(60 100% 50%)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "hsl(60 100% 50%)" }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-dunkin-orange">50.6%</p>
                        <p className="text-sm text-zinc-400">Field Goal %</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-dunkin-yellow">38.3%</p>
                        <p className="text-sm text-zinc-400">3-Point %</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="situational">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Fastbreak Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          attempts: {
                            label: "Fastbreak Attempts",
                            color: "hsl(28 100% 54%)",
                          },
                          points: {
                            label: "Fastbreak Points",
                            color: "hsl(60 100% 50%)",
                          },
                        }}
                      >
                        <BarChart
                          data={[
                            { game: "Game 1", attempts: 4, points: 6 },
                            { game: "Game 2", attempts: 6, points: 8 },
                            { game: "Game 3", attempts: 5, points: 7 },
                            { game: "Game 4", attempts: 7, points: 10 },
                            { game: "Game 5", attempts: 4, points: 6 },
                            { game: "Game 6", attempts: 8, points: 12 },
                            { game: "Game 7", attempts: 6, points: 9 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid vertical={false} stroke="#333" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="attempts" fill="hsl(28 100% 54%)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="points" fill="hsl(60 100% 50%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-dunkin-orange">5.7</p>
                        <p className="text-sm text-zinc-400">Avg Attempts</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-dunkin-yellow">8.3</p>
                        <p className="text-sm text-zinc-400">Avg Points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Second Chance Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          attempts: {
                            label: "Second Chance Attempts",
                            color: "hsl(28 100% 54%)",
                          },
                          points: {
                            label: "Second Chance Points",
                            color: "hsl(60 100% 50%)",
                          },
                        }}
                      >
                        <BarChart
                          data={[
                            { game: "Game 1", attempts: 3, points: 4 },
                            { game: "Game 2", attempts: 5, points: 6 },
                            { game: "Game 3", attempts: 2, points: 2 },
                            { game: "Game 4", attempts: 4, points: 5 },
                            { game: "Game 5", attempts: 3, points: 4 },
                            { game: "Game 6", attempts: 6, points: 8 },
                            { game: "Game 7", attempts: 4, points: 5 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid vertical={false} stroke="#333" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="attempts" fill="hsl(28 100% 54%)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="points" fill="hsl(60 100% 50%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-dunkin-orange">3.9</p>
                        <p className="text-sm text-zinc-400">Avg Attempts</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-dunkin-yellow">4.9</p>
                        <p className="text-sm text-zinc-400">Avg Points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="advanced">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Shooting Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          efg: {
                            label: "eFG%",
                            color: "hsl(28 100% 54%)",
                          },
                          tfg: {
                            label: "TFG%",
                            color: "hsl(60 100% 50%)",
                          },
                        }}
                      >
                        <LineChart
                          data={[
                            { game: "Game 1", efg: 52, tfg: 55 },
                            { game: "Game 2", efg: 58, tfg: 60 },
                            { game: "Game 3", efg: 54, tfg: 56 },
                            { game: "Game 4", efg: 61, tfg: 63 },
                            { game: "Game 5", efg: 56, tfg: 58 },
                            { game: "Game 6", efg: 59, tfg: 62 },
                            { game: "Game 7", efg: 57, tfg: 59 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid vertical={false} stroke="#333" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="efg"
                            stroke="hsl(28 100% 54%)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "hsl(28 100% 54%)" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="tfg"
                            stroke="hsl(60 100% 50%)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "hsl(60 100% 50%)" }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-dunkin-orange">56.7%</p>
                        <p className="text-sm text-zinc-400">Avg eFG%</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-dunkin-yellow">59.0%</p>
                        <p className="text-sm text-zinc-400">Avg TFG%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Rebound & Assist Ratios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          reboundPct: {
                            label: "Rebound %",
                            color: "hsl(28 100% 54%)",
                          },
                          astToRatio: {
                            label: "Assist/TO Ratio",
                            color: "hsl(60 100% 50%)",
                          },
                        }}
                      >
                        <LineChart
                          data={[
                            { game: "Game 1", reboundPct: 12, astToRatio: 2.5 },
                            { game: "Game 2", reboundPct: 15, astToRatio: 3.5 },
                            { game: "Game 3", reboundPct: 13, astToRatio: 2.0 },
                            { game: "Game 4", reboundPct: 18, astToRatio: 4.0 },
                            { game: "Game 5", reboundPct: 14, astToRatio: 3.0 },
                            { game: "Game 6", reboundPct: 20, astToRatio: 4.5 },
                            { game: "Game 7", reboundPct: 16, astToRatio: 3.5 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid vertical={false} stroke="#333" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="reboundPct"
                            stroke="hsl(28 100% 54%)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "hsl(28 100% 54%)" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="astToRatio"
                            stroke="hsl(60 100% 50%)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "hsl(60 100% 50%)" }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-dunkin-orange">15.4%</p>
                        <p className="text-sm text-zinc-400">Rebound %</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-dunkin-yellow">3.3</p>
                        <p className="text-sm text-zinc-400">Ast/TO Ratio</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Passes Per Possession</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          passes: {
                            label: "Passes Per Possession",
                            color: "hsl(28 100% 54%)",
                          },
                        }}
                      >
                        <BarChart
                          data={[
                            { game: "Game 1", passes: 2.8 },
                            { game: "Game 2", passes: 3.2 },
                            { game: "Game 3", passes: 2.5 },
                            { game: "Game 4", passes: 3.5 },
                            { game: "Game 5", passes: 3.0 },
                            { game: "Game 6", passes: 3.8 },
                            { game: "Game 7", passes: 3.3 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid vertical={false} stroke="#333" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="passes" fill="hsl(28 100% 54%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-2xl font-bold text-dunkin-orange">3.2</p>
                      <p className="text-sm text-zinc-400">Avg Passes Per Possession</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="time">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Fastbreak Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          time: {
                            label: "Fastbreak to Attempt Time (sec)",
                            color: "hsl(28 100% 54%)",
                          },
                        }}
                      >
                        <LineChart
                          data={[
                            { game: "Game 1", time: 5.8 },
                            { game: "Game 2", time: 5.2 },
                            { game: "Game 3", time: 5.5 },
                            { game: "Game 4", time: 4.9 },
                            { game: "Game 5", time: 5.3 },
                            { game: "Game 6", time: 4.7 },
                            { game: "Game 7", time: 5.0 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid vertical={false} stroke="#333" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="time"
                            stroke="hsl(28 100% 54%)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "hsl(28 100% 54%)" }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-2xl font-bold text-dunkin-orange">5.2s</p>
                      <p className="text-sm text-zinc-400">Avg Fastbreak Time</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Possession Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ChartContainer
                        config={{
                          time: {
                            label: "Possession Time (sec)",
                            color: "hsl(28 100% 54%)",
                          },
                        }}
                      >
                        <LineChart
                          data={[
                            { game: "Game 1", time: 14.2 },
                            { game: "Game 2", time: 13.5 },
                            { game: "Game 3", time: 15.0 },
                            { game: "Game 4", time: 12.8 },
                            { game: "Game 5", time: 13.7 },
                            { game: "Game 6", time: 12.5 },
                            { game: "Game 7", time: 13.2 },
                          ]}
                          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                        >
                          <CartesianGrid vertical={false} stroke="#333" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="time"
                            stroke="hsl(28 100% 54%)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "hsl(28 100% 54%)" }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-2xl font-bold text-dunkin-orange">13.6s</p>
                      <p className="text-sm text-zinc-400">Avg Possession Time</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lg">Season Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Games Played</p>
                    <p className="font-bold text-dunkin-orange">24</p>
                  </div>
                  <div className="w-full bg-zinc-700 h-2 rounded-full">
                    <div className="bg-dunkin-orange h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">80% of season complete</p>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">Points</p>
                    <p className="font-bold text-dunkin-orange">403</p>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">16.8 PPG</p>

                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">Assists</p>
                    <p className="font-bold text-dunkin-orange">158</p>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">6.6 APG</p>

                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">Rebounds</p>
                    <p className="font-bold text-dunkin-orange">118</p>
                  </div>
                  <p className="text-sm text-zinc-400">4.9 RPG</p>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">Field Goal %</p>
                    <p className="font-bold text-dunkin-orange">50.6%</p>
                  </div>
                  <p className="text-sm text-green-500 mb-3">+2.1% from last month</p>

                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">3PT %</p>
                    <p className="font-bold text-dunkin-orange">38.3%</p>
                  </div>
                  <p className="text-sm text-green-500 mb-3">+1.5% from last month</p>

                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">Assist/TO Ratio</p>
                    <p className="font-bold text-dunkin-orange">3.3</p>
                  </div>
                  <p className="text-sm text-green-500">+0.4 from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lg">Performance Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-dunkin-orange/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-dunkin-orange"
                    >
                      <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                      <circle cx="17" cy="7" r="5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Season High</p>
                    <p className="text-sm text-zinc-400">24 points vs Westside Park</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-dunkin-orange/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-dunkin-orange"
                    >
                      <path d="M12 2v20" />
                      <path d="M2 5h20" />
                      <path d="M2 19h20" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Most Assists</p>
                    <p className="text-sm text-zinc-400">9 assists vs Downtown Center</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-dunkin-orange/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-dunkin-orange"
                    >
                      <path d="M12 22v-6" />
                      <path d="M12 8V2" />
                      <path d="M4 12H2" />
                      <path d="M10 12H8" />
                      <path d="M16 12h-2" />
                      <path d="M22 12h-2" />
                      <path d="m15 19-3-3-3 3" />
                      <path d="m15 5-3 3-3-3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Best Efficiency</p>
                    <p className="text-sm text-zinc-400">eFG% of 61% vs Eastside Rec</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
