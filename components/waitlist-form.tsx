"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2, Bell, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { addPlayerToWaitlist } from "@/lib/store"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface WaitlistFormProps {
  gameId: string
  gameTitle: string
  onClose: () => void
}

export function WaitlistForm({ gameId, gameTitle, onClose }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    push: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addPlayerToWaitlist(gameId, notificationPreferences)
      toast({
        title: "Added to Waitlist",
        description: `You've been added to the waitlist for ${gameTitle}. We'll notify you when a spot becomes available.`,
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join the waitlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-[#1E2330] rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
            Join Waitlist
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded-full p-1 hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="bg-amber-900/20 border border-amber-900/30 rounded-lg p-4 mb-6">
            <p className="text-amber-200 text-sm">
              This game is currently full. Join the waitlist to be notified when a spot becomes available for{" "}
              <span className="font-semibold">{gameTitle}</span>.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-white font-medium flex items-center">
              <Bell className="mr-2 h-4 w-4 text-dunkin-orange" />
              Notification Preferences
            </h3>

            <div className="space-y-3 bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="text-gray-300 flex items-center">
                  Email Notifications
                  <span className="ml-2 text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">Recommended</span>
                </Label>
                <Switch
                  id="email-notifications"
                  checked={notificationPreferences.email}
                  onCheckedChange={(checked) =>
                    setNotificationPreferences({ ...notificationPreferences, email: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications" className="text-gray-300">
                  SMS Notifications
                </Label>
                <Switch
                  id="sms-notifications"
                  checked={notificationPreferences.sms}
                  onCheckedChange={(checked) =>
                    setNotificationPreferences({ ...notificationPreferences, sms: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="text-gray-300">
                  Push Notifications
                </Label>
                <Switch
                  id="push-notifications"
                  checked={notificationPreferences.push}
                  onCheckedChange={(checked) =>
                    setNotificationPreferences({ ...notificationPreferences, push: checked })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-dunkin-orange hover:bg-dunkin-orange/90 text-white rounded-md flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Join Waitlist"
              )}
            </Button>

            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="w-full py-3 bg-transparent border-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
