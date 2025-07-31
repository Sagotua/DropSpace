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
import { Rocket, User, Package, Menu, Settings, LogOut, CreditCard, Star } from "lucide-react"
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
    // This function is now simplified since we handle colors directly in the Badge
    return ""
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
          <div className="relative group">
            <Badge
              variant="outline"
              className={`hidden sm:flex relative overflow-hidden transition-all duration-300 hover:scale-105 px-3 py-1.5 font-medium border-2 ${
                user.subscription === "Test"
                  ? "border-gray-500/50 text-gray-300 bg-gray-900/50 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-500/20"
                  : user.subscription === "Standard"
                    ? "border-blue-500/50 text-blue-300 bg-blue-900/20 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30"
                    : "border-amber-500/50 text-amber-300 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/30"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">
                  {user.subscription === "Test" && <Star className="w-4 h-4 text-gray-400" />}
                  {user.subscription === "Standard" && <Star className="w-4 h-4 text-blue-400" />}
                  {user.subscription === "Cosmos" && <Star className="w-4 h-4 text-yellow-400" />}
                </span>
                <span className="font-semibold">{user.subscription}</span>
                {user.subscription === "Cosmos" && (
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                )}
              </span>
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Avatar className="h-10 w-10 ring-2 ring-transparent hover:ring-blue-500/50 transition-all duration-300">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
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
                        <Switch checked={currentRole === "supplier"} onCheckedChange={handleRoleSwitch} />
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
