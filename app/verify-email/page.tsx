"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isVerifying, setIsVerifying] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      setIsVerifying(true)
      setError("")

      try {
        const token = searchParams.get("token")

        if (!token) {
          setError("Invalid verification link. Please request a new one.")
          setIsVerifying(false)
          return
        }

        // In a real app, this would call an API endpoint to verify the token
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // For demo purposes, we'll simulate a successful verification
        setIsVerified(true)

        toast({
          title: "Email verified",
          description: "Your email has been successfully verified",
        })
      } catch (err) {
        setError("An error occurred during verification. Please try again.")
      } finally {
        setIsVerifying(false)
      }
    }

    verifyEmail()
  }, [searchParams, toast])

  const handleResendVerification = async () => {
    setIsVerifying(true)
    setError("")

    try {
      // In a real app, this would call an API endpoint to resend the verification email
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link",
      })
    } catch (err) {
      setError("Failed to resend verification email. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            {isVerifying
              ? "Verifying your email address..."
              : isVerified
                ? "Your email has been verified"
                : "Email verification failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {isVerifying ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dunkin-orange mb-4"></div>
              <p className="text-zinc-400">Please wait while we verify your email...</p>
            </div>
          ) : isVerified ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Verified</h3>
              <p className="text-zinc-400 text-center mb-6">
                Your email has been successfully verified. You can now access all features of the platform.
              </p>
              <Button
                className="bg-dunkin-orange hover:bg-dunkin-orange/90 text-white"
                onClick={() => router.push("/login")}
              >
                Continue to Login
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verification Failed</h3>
              <p className="text-zinc-400 text-center mb-2">
                {error || "We couldn't verify your email. The link may have expired or is invalid."}
              </p>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-zinc-700 mt-4"
                onClick={handleResendVerification}
                disabled={isVerifying}
              >
                <RefreshCw className="h-4 w-4" />
                Resend Verification Email
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-zinc-500 text-center">
            Need help?{" "}
            <Link href="/contact" className="text-dunkin-orange hover:underline">
              Contact Support
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
