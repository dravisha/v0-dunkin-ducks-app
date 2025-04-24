"use client"

import { useEffect, useState } from "react"
import zxcvbn from "zxcvbn"

interface PasswordStrengthProps {
  password: string
  onScoreChange?: (score: number) => void
}

export default function PasswordStrength({ password, onScoreChange }: PasswordStrengthProps) {
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password)
      setScore(result.score)
      setFeedback(result.feedback.warning || getDefaultFeedback(result.score))
      if (onScoreChange) {
        onScoreChange(result.score)
      }
    } else {
      setScore(0)
      setFeedback("")
      if (onScoreChange) {
        onScoreChange(0)
      }
    }
  }, [password, onScoreChange])

  const getDefaultFeedback = (score: number) => {
    switch (score) {
      case 0:
        return "Very weak"
      case 1:
        return "Weak"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Strong"
      default:
        return ""
    }
  }

  const getColor = (score: number) => {
    switch (score) {
      case 0:
        return "bg-red-500"
      case 1:
        return "bg-orange-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-green-500"
      case 4:
        return "bg-emerald-500"
      default:
        return "bg-gray-200"
    }
  }

  if (!password) {
    return null
  }

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 h-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`h-full flex-1 rounded-full transition-colors ${
              index <= score ? getColor(score) : "bg-zinc-700"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-zinc-400">{feedback}</p>
    </div>
  )
}
