"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"

type Role = "dropshipper" | "supplier"

interface RoleContextType {
  currentRole: Role
  setCurrentRole: (role: Role) => void
  switchRole: (role: Role) => void
  availableRoles: Role[]
  canSwitchRoles: boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [currentRole, setCurrentRole] = useState<Role>("dropshipper")
  const [isInitialized, setIsInitialized] = useState(false)

  // Determine available roles based on user permissions
  const availableRoles: Role[] = []
  if (user?.roles.dropshipper) availableRoles.push("dropshipper")
  if (user?.roles.supplier) availableRoles.push("supplier")

  const canSwitchRoles = availableRoles.length > 1

  // Initialize role based on user's roles and saved preference
  useEffect(() => {
    if (user && !isInitialized) {
      // Try to load saved role from localStorage
      const savedRole = localStorage.getItem("dropspace_current_role") as Role

      let initialRole: Role = "dropshipper"

      if (savedRole && availableRoles.includes(savedRole)) {
        initialRole = savedRole
      } else {
        // Set default role based on user's permissions
        if (user.roles.dropshipper && !user.roles.supplier) {
          initialRole = "dropshipper"
        } else if (user.roles.supplier && !user.roles.dropshipper) {
          initialRole = "supplier"
        } else if (user.roles.dropshipper && user.roles.supplier) {
          initialRole = "dropshipper" // Default to dropshipper if both roles
        }
      }

      setCurrentRole(initialRole)
      setIsInitialized(true)
    }
  }, [user, availableRoles, isInitialized])

  // Save role to localStorage when it changes (but only after initialization)
  useEffect(() => {
    if (isInitialized && currentRole) {
      localStorage.setItem("dropspace_current_role", currentRole)
    }
  }, [currentRole, isInitialized])

  const showToast = useCallback((role: Role) => {
    const roleText = role === "dropshipper" ? "Дропшиппер" : "Постачальник"

    // Create and show toast
    const toast = document.createElement("div")
    toast.className =
      "fixed top-20 right-4 z-50 bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full"
    toast.innerHTML = `
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
        <span class="text-sm">Переключено на режим: ${roleText}</span>
      </div>
    `

    document.body.appendChild(toast)

    // Animate in
    setTimeout(() => {
      toast.classList.remove("translate-x-full")
    }, 100)

    // Animate out and remove
    setTimeout(() => {
      toast.classList.add("translate-x-full")
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 300)
    }, 3000)
  }, [])

  const switchRole = useCallback(
    (role: Role) => {
      if (availableRoles.includes(role) && role !== currentRole && isInitialized) {
        setCurrentRole(role)
        showToast(role)
      }
    },
    [availableRoles, currentRole, isInitialized, showToast],
  )

  const value: RoleContextType = {
    currentRole,
    setCurrentRole,
    switchRole,
    availableRoles,
    canSwitchRoles,
  }

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}
