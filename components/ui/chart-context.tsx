"use client"

import { createContext } from "react"

export interface ChartContextType {
  config: Record<
    string,
    {
      label: string
      color: string
    }
  >
}

export const ChartContext = createContext<ChartContextType | null>(null)
