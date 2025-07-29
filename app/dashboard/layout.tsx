"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavigation } from "@/components/dashboard/top-navigation"
import { RoleProvider } from "@/contexts/role-context"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  // Memoize user data to prevent unnecessary re-renders
  const userData = useMemo(() => {
    if (!user) return null

    return {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      roles: user.roles,
      subscription: user.subscription,
      avatar: `/placeholder.svg?height=40&width=40&text=${user.firstName[0]}${user.lastName[0]}`,
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Завантаження...</p>
        </div>
      </div>
    )
  }

  if (!user || !userData) {
    return null // Redirect happens in useEffect
  }

  return (
    <RoleProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <TopNavigation user={userData} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <main className="flex-1 lg:ml-64 transition-all duration-300">
            <div className="p-4 lg:p-8">{children}</div>
          </main>
        </div>
      </div>
    </RoleProvider>
  )
}
