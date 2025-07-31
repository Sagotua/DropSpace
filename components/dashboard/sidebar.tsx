"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRole } from "@/contexts/role-context"
import { cn } from "@/lib/utils"
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Upload,
  Download,
  BarChart3,
  CreditCard,
  DollarSign,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { currentRole } = useRole()

  const dropshipperNavigation = [
    { name: "Панель керування", href: "/dashboard", icon: Home },
    { name: "Мої товари", href: "/dashboard/my-products", icon: Package },
    { name: "Замовлення", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "Створити замовлення", href: "/dashboard/create-order", icon: ShoppingCart },
    { name: "Імпортовані товари", href: "/dashboard/imported-products", icon: Upload },
    { name: "Постачальники", href: "/dashboard/suppliers", icon: Users },
    { name: "Експорт", href: "/dashboard/export", icon: Download },
    { name: "Виплати", href: "/dashboard/payouts", icon: DollarSign },
    { name: "Аналітика", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Підписка", href: "/dashboard/subscription", icon: CreditCard },
    { name: "Налаштування", href: "/dashboard/settings", icon: Settings },
  ]

  const supplierNavigation = [
    { name: "Панель керування", href: "/dashboard", icon: Home },
    { name: "Мої товари", href: "/dashboard/my-products", icon: Package },
    { name: "Замовлення постачальника", href: "/dashboard/supplier-orders", icon: ShoppingCart },
    { name: "Виплати", href: "/dashboard/payouts", icon: DollarSign },
    { name: "Аналітика", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Підписка", href: "/dashboard/subscription", icon: CreditCard },
    { name: "Налаштування", href: "/dashboard/settings", icon: Settings },
  ]

  const navigation = currentRole === "dropshipper" ? dropshipperNavigation : supplierNavigation

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out z-50",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Mobile close button */}
        <div className="flex justify-end p-4 lg:hidden">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="px-4 pb-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10"
                    : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-700/50 hover:border hover:border-slate-600/30",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 mr-3 transition-colors",
                    isActive ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400",
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
