"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Rocket, User, Package, Menu, Settings, LogOut, CreditCard } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRole } from "@/contexts/role-context"
import Link from "next/link"
import { useCallback } from "react"

interface TopNavigationProps {
  user: {
    name: string
    email: string
    roles: {
      dropshipper: boolean
      supplier: boolean
    }
    subscription: string
    avatar: string
  }
  onMenuToggle: () => void
}

export function TopNavigation({ user, onMenuToggle }: TopNavigationProps) {
  const { logout } = useAuth()
  const { currentRole, switchRole, canSwitchRoles } = useRole()

  const getSubscriptionColor = useCallback((plan: string) => {
    switch (plan) {
      case "Test":
        return "border-gray-500 text-gray-400"
      case "Standard":
        return "border-blue-500 text-blue-400"
      case "Cosmos":
        return "border-purple-500 text-purple-400"
      default:
        return "border-gray-500 text-gray-400"
    }
  }, [])

  const handleRoleSwitch = useCallback(
    (checked: boolean) => {
      const newRole = checked ? "supplier" : "dropshipper"
      switchRole(newRole)
    },
    [switchRole],
  )

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Logo and Menu */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onMenuToggle} className="lg:hidden text-gray-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </Button>

          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">DropSpace</span>
          </Link>
        </div>

        {/* Center - Role Switcher */}
        {canSwitchRoles && (
          <div className="hidden md:flex items-center space-x-3 bg-slate-800/50 rounded-lg p-2">
            <div className="flex items-center space-x-2">
              <User className={`w-4 h-4 ${currentRole === "dropshipper" ? "text-blue-400" : "text-gray-500"}`} />
              <Label htmlFor="role-switch" className="text-sm text-gray-300 cursor-pointer">
                Дропшиппер
              </Label>
            </div>
            <Switch id="role-switch" checked={currentRole === "supplier"} onCheckedChange={handleRoleSwitch} />
            <div className="flex items-center space-x-2">
              <Package className={`w-4 h-4 ${currentRole === "supplier" ? "text-purple-400" : "text-gray-500"}`} />
              <Label htmlFor="role-switch" className="text-sm text-gray-300 cursor-pointer">
                Постачальник
              </Label>
            </div>
          </div>
        )}

        {/* Right side - Subscription and User Menu */}
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={`hidden sm:flex ${getSubscriptionColor(user.subscription)}`}>
            {user.subscription}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                  <p className="text-xs leading-none text-gray-400">{user.email}</p>
                  {canSwitchRoles && (
                    <p className="text-xs leading-none text-blue-400">
                      Режим: {currentRole === "dropshipper" ? "Дропшиппер" : "Постачальник"}
                    </p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />

              {/* Mobile Role Switcher */}
              {canSwitchRoles && (
                <>
                  <div className="md:hidden px-2 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Роль:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">
                          {currentRole === "dropshipper" ? "Дропшиппер" : "Постачальник"}
                        </span>
                        <Switch checked={currentRole === "supplier"} onCheckedChange={handleRoleSwitch} size="sm" />
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-700" />
                </>
              )}

              <Link href="/dashboard/settings">
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-slate-700">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Налаштування</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/subscription">
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-slate-700">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Підписка</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-slate-700" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Вийти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
