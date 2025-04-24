"use client"

import { useState } from "react"
import { X, Check, Copy, Loader2, CreditCard } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { updatePaymentStatus } from "@/lib/store"
import { Button } from "@/components/ui/button"

interface PaymentModalProps {
  gameId: string
  gameTitle: string
  onClose: () => void
}

export function PaymentModal({ gameId, gameTitle, onClose }: PaymentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("example@upi")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "UPI ID Copied",
      description: "UPI ID has been copied to clipboard",
    })
  }

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true)
    try {
      await updatePaymentStatus(gameId, "pending")
      toast({
        title: "Payment Confirmation Sent",
        description: "We will verify your payment and update your status.",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm payment. Please try again.",
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
            <CreditCard className="mr-2 h-5 w-5 text-green-500" />
            Complete Payment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded-full p-1 hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="bg-green-900/20 border border-green-900/30 rounded-lg p-4 mb-4">
            <p className="text-green-200 text-sm">
              Please complete the payment for <span className="font-semibold">{gameTitle}</span> to confirm your
              registration.
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <div className="flex justify-center mb-4">
              {/* Placeholder for QR code */}
              <div className="w-48 h-48 bg-white flex items-center justify-center text-black">QR Code Placeholder</div>
            </div>

            <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
              <span className="text-gray-200 font-mono">example@upi</span>
              <Button
                onClick={handleCopyUPI}
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300 hover:bg-gray-600"
              >
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handlePaymentConfirmation}
              disabled={isSubmitting}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  I've Completed Payment
                </>
              )}
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full py-3 bg-transparent border-gray-700 text-white hover:bg-gray-800"
            >
              Pay Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
