import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import Header from "@/components/header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </div>
  )
}
