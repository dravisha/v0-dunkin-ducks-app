import type React from "react"
import Header from "@/components/header"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">{children}</main>
    </>
  )
}
