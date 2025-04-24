"use client"

import { useToast } from "@/hooks/use-toast"

// Error types
export enum ErrorType {
  NETWORK = "network",
  AUTHENTICATION = "authentication",
  AUTHORIZATION = "authorization",
  VALIDATION = "validation",
  NOT_FOUND = "not_found",
  SERVER = "server",
  UNKNOWN = "unknown",
}

// Error messages
const ERROR_MESSAGES = {
  [ErrorType.NETWORK]: "Network error. Please check your connection and try again.",
  [ErrorType.AUTHENTICATION]: "Authentication error. Please log in again.",
  [ErrorType.AUTHORIZATION]: "You don't have permission to perform this action.",
  [ErrorType.VALIDATION]: "Please check your input and try again.",
  [ErrorType.NOT_FOUND]: "The requested resource was not found.",
  [ErrorType.SERVER]: "Server error. Please try again later.",
  [ErrorType.UNKNOWN]: "An unexpected error occurred. Please try again.",
}

// Error handler class
export class AppError extends Error {
  type: ErrorType
  details?: Record<string, any>

  constructor(message: string, type: ErrorType = ErrorType.UNKNOWN, details?: Record<string, any>) {
    super(message)
    this.type = type
    this.details = details
    this.name = "AppError"
  }

  static fromApiError(error: any): AppError {
    // Handle Supabase errors
    if (error?.code === "PGRST301") {
      return new AppError(ERROR_MESSAGES[ErrorType.AUTHENTICATION], ErrorType.AUTHENTICATION)
    }

    if (error?.code === "PGRST403") {
      return new AppError(ERROR_MESSAGES[ErrorType.AUTHORIZATION], ErrorType.AUTHORIZATION)
    }

    if (error?.code === "PGRST404") {
      return new AppError(ERROR_MESSAGES[ErrorType.NOT_FOUND], ErrorType.NOT_FOUND)
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return new AppError(ERROR_MESSAGES[ErrorType.NETWORK], ErrorType.NETWORK)
    }

    // Handle validation errors
    if (error?.message?.includes("validation")) {
      return new AppError(error.message || ERROR_MESSAGES[ErrorType.VALIDATION], ErrorType.VALIDATION, error.details)
    }

    // Default to unknown error
    return new AppError(error?.message || ERROR_MESSAGES[ErrorType.UNKNOWN], ErrorType.UNKNOWN)
  }
}

// Hook for handling errors in components
export function useErrorHandler() {
  const { toast } = useToast()

  const handleError = (error: unknown, customMessage?: string) => {
    console.error("Error:", error)

    const appError = error instanceof AppError ? error : AppError.fromApiError(error)

    toast({
      title: customMessage || "Error",
      description: appError.message,
      variant: "destructive",
    })

    return appError
  }

  return { handleError }
}

// Function for handling errors in server actions
export async function handleServerError(error: unknown, customMessage?: string) {
  console.error("Server Error:", error)

  const appError = error instanceof AppError ? error : AppError.fromApiError(error)

  return {
    error: {
      message: customMessage || appError.message,
      type: appError.type,
      details: appError.details,
    },
  }
}
