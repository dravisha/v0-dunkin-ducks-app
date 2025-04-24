"use client"

import type { Player } from "@/lib/database.types"
import { X, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface RegisteredPlayersModalProps {
  players: Player[]
  onClose: () => void
}

export function RegisteredPlayersModal({ players, onClose }: RegisteredPlayersModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-[#1E2330] rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Users className="mr-2 h-5 w-5 text-dunkin-orange" />
            Registered Players ({players.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded-full p-1 hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-4">
          {players.length === 0 ? (
            <div className="text-gray-400 text-center py-8 flex flex-col items-center">
              <Users className="h-12 w-12 mb-3 text-gray-500" />
              <p>No players registered yet.</p>
              <p className="text-sm mt-1">Be the first to register!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {players.map((player) => (
                <li key={player.id} className="bg-gray-800/50 rounded-lg p-3 flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-dunkin-orange text-white">
                      {player.full_name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-white">{player.full_name || "Anonymous Player"}</div>
                    {player.skill_level && (
                      <div className="text-sm text-gray-400 flex items-center gap-1">
                        <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-gray-700 border-gray-600">
                          {player.skill_level}
                        </Badge>
                        {player.position && (
                          <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-gray-700 border-gray-600">
                            {player.position}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
