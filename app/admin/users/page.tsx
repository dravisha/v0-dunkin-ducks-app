import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Plus, Download } from "lucide-react"

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Player",
      skillLevel: "Intermediate",
      gamesPlayed: 24,
      status: "Active",
      joinDate: "Jan 15, 2023",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Player",
      skillLevel: "Advanced",
      gamesPlayed: 18,
      status: "Active",
      joinDate: "Feb 3, 2023",
    },
    {
      id: 3,
      name: "Mike Williams",
      email: "mike.w@example.com",
      role: "Coach",
      skillLevel: "Pro",
      gamesPlayed: 32,
      status: "Active",
      joinDate: "Dec 10, 2022",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.d@example.com",
      role: "Player",
      skillLevel: "Beginner",
      gamesPlayed: 7,
      status: "Active",
      joinDate: "Mar 22, 2023",
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.b@example.com",
      role: "Admin",
      skillLevel: "Intermediate",
      gamesPlayed: 15,
      status: "Active",
      joinDate: "Jan 5, 2023",
    },
    {
      id: 6,
      name: "Lisa Chen",
      email: "lisa.c@example.com",
      role: "Player",
      skillLevel: "Advanced",
      gamesPlayed: 21,
      status: "Inactive",
      joinDate: "Feb 18, 2023",
    },
    {
      id: 7,
      name: "David Kim",
      email: "david.k@example.com",
      role: "Player",
      skillLevel: "Intermediate",
      gamesPlayed: 12,
      status: "Active",
      joinDate: "Mar 7, 2023",
    },
  ]

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-zinc-400">Manage users and their permissions</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-dunkin-orange hover:bg-dunkin-orange/90 text-white">
            <Plus className="h-4 w-4 mr-2" /> Add User
          </Button>
          <Button variant="outline" className="border-zinc-700">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input placeholder="Search users..." className="pl-9 bg-zinc-800 border-zinc-700" />
            </div>
            <div className="flex gap-2">
              <select className="bg-zinc-800 border-zinc-700 rounded-md px-3 py-2 text-sm">
                <option>All Roles</option>
                <option>Player</option>
                <option>Coach</option>
                <option>Admin</option>
              </select>
              <select className="bg-zinc-800 border-zinc-700 rounded-md px-3 py-2 text-sm">
                <option>All Skill Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Pro</option>
              </select>
              <select className="bg-zinc-800 border-zinc-700 rounded-md px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-zinc-800/50 border-zinc-800">
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Skill Level</TableHead>
                <TableHead>Games</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-zinc-800/50 border-zinc-800">
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.role === "Admin"
                          ? "bg-dunkin-orange text-white"
                          : user.role === "Coach"
                            ? "bg-dunkin-yellow text-black"
                            : "bg-zinc-700"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.skillLevel}</TableCell>
                  <TableCell>{user.gamesPlayed}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-zinc-500/20 text-zinc-400"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                        <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">Edit User</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">View Stats</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">Change Role</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800 text-red-500">
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
