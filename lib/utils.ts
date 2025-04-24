import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parse, isValid } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string into a readable format
 * @param date Date string or Date object
 * @param formatStr Optional format string (defaults to 'PPP')
 * @returns Formatted date string
 */
export function formatDate(date: string | Date | null | undefined, formatStr = "PPP"): string {
  if (!date) return "Date TBD"

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date
    if (!isValid(dateObj)) return "Date TBD"
    return format(dateObj, formatStr)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Date TBD"
  }
}

/**
 * Format a time string into a readable format
 * @param timeStr Time string in 24-hour format (HH:mm)
 * @param formatStr Optional format string (defaults to 'h:mm a')
 * @returns Formatted time string
 */
export function formatTime(timeStr: string | null | undefined, formatStr = "h:mm a"): string {
  if (!timeStr) return "Time TBD"

  try {
    // Handle different time formats
    let date

    // Check if the time string is in the expected format (HH:mm)
    if (/^\d{1,2}:\d{2}$/.test(timeStr)) {
      date = parse(timeStr, "HH:mm", new Date())
    } else if (/^\d{1,2}:\d{2}:\d{2}$/.test(timeStr)) {
      // Handle HH:mm:ss format
      date = parse(timeStr, "HH:mm:ss", new Date())
    } else {
      // Try to create a date object directly if it's a timestamp or ISO string
      date = new Date(timeStr)
    }

    // Check if the date is valid
    if (!isValid(date)) {
      return "Time TBD" // Return a user-friendly message
    }

    return format(date, formatStr)
  } catch (error) {
    console.error("Error formatting time:", error)
    return "Time TBD" // Return a user-friendly message
  }
}
