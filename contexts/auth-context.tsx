"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { initializeDemoData } from "@/lib/demo-data"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: {
    dropshipper: boolean
    supplier: boolean
  }
  subscription: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  roles: {
    dropshipper: boolean
    supplier: boolean
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize demo data
    initializeDemoData()

    // Check for saved user
    const savedUser = localStorage.getItem("dropspace_user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("dropspace_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("dropspace_registered_users") || "[]")

      // Find user with matching email and password
      const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const userWithSubscription = {
          ...foundUser,
          subscription: "Standard", // Default subscription
        }

        setUser(userWithSubscription)
        localStorage.setItem("dropspace_user", JSON.stringify(userWithSubscription))
        setIsLoading(false)
        return true
      } else {
        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem("dropspace_registered_users") || "[]")

      // Check if user already exists
      const userExists = existingUsers.some((u: any) => u.email === userData.email)

      if (userExists) {
        setIsLoading(false)
        return false
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        roles: userData.roles,
        subscription: "Test", // New users get Test subscription
        createdAt: new Date().toISOString(),
      }

      // Add to registered users
      const updatedUsers = [...existingUsers, { ...newUser, password: userData.password }]
      localStorage.setItem("dropspace_registered_users", JSON.stringify(updatedUsers))

      // Set as current user
      setUser(newUser)
      localStorage.setItem("dropspace_user", JSON.stringify(newUser))

      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("dropspace_user")
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
