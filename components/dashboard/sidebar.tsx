"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  TrendingUp,
  Settings,
  CreditCard,
  Plus,
  Upload,
  Download,
  X,
  ChevronDown,
  ChevronRight,
  Users,
} from "lucide-react"
import { useRole } from "@/contexts/role-context"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { currentRole } = useRole()
  const [expandedSections, setExpandedSections] = useState<string[]>(["main"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  const dropshipperNavigation = [
    {
      section: "main",
      title: "Основне",
      items: [
        {
          name: "Панель керування",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Створити замовлення",
          href: "/dashboard/create-order",
          icon: Plus,
        },
        {
          name: "Мої замовлення",
          href: "/dashboard/orders",
          icon: ShoppingCart,
        },
      ],
    },
    {
      section: "suppliers",
      title: "Постачальники",
      items: [
        {
          name: "Мої постачальники",
          href: "/dashboard/suppliers",
          icon: Users,
          badge: "Новинка",
        },
      ],
    },
    {
      section: "products",
      title: "Продукти",
      items: [
        {
          name: "Імпортовані продукти",
          href: "/dashboard/imported-products",
          icon: Download,
        },
        {
          name: "Експорт продуктів",
          href: "/dashboard/export",
          icon: Upload,
        },
      ],
    },
    {
      section: "analytics",
      title: "Аналітика",
      items: [
        {
          name: "Аналітика",
          href: "/dashboard/analytics",
          icon: TrendingUp,
        },
      ],
    },
    {
      section: "settings",
      title: "Налаштування",
      items: [
        {
          name: "Налаштування",
          href: "/dashboard/settings",
          icon: Settings,
        },
        {
          name: "Підписка",
          href: "/dashboard/subscription",
          icon: CreditCard,
        },
      ],
    },
  ]

  const supplierNavigation = [
    {
      section: "main",
      title: "Основне",
      items: [
        {
          name: "Панель керування",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Замовлення постачальника",
          href: "/dashboard/supplier-orders",
          icon: ShoppingCart,
        },
      ],
    },
    {
      section: "products",
      title: "Продукти",
      items: [
        {
          name: "Мої продукти",
          href: "/dashboard/my-products",
          icon: Package,
        },
        {
          name: "Експорт продуктів",
          href: "/dashboard/export",
          icon: Upload,
        },
      ],
    },
    {
      section: "analytics",
      title: "Аналітика",
      items: [
        {
          name: "Аналітика",
          href: "/dashboard/analytics",
          icon: TrendingUp,
        },
      ],
    },
    {
      section: "settings",
      title: "Налаштування",
      items: [
        {
          name: "Налаштування",
          href: "/dashboard/settings",
          icon: Settings,
        },
        {
          name: "Підписка",
          href: "/dashboard/subscription",
          icon: CreditCard,
        },
      ],
    },
  ]

  const navigation = currentRole === "dropshipper" ? dropshipperNavigation : supplierNavigation

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform bg-slate-900/95 backdrop-blur-sm border-r border-slate-700/50 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-lg font-semibold text-white">Меню</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          {navigation.map((section) => (
            <div key={section.section}>
              <button
                onClick={() => toggleSection(section.section)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-slate-800/50 hover:text-white transition-colors"
              >
                <span>{section.title}</span>
                {expandedSections.includes(section.section) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {expandedSections.includes(section.section) && (
                <div className="ml-2 mt-2 space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive ? "bg-slate-800 text-white" : "text-gray-400 hover:bg-slate-800/50 hover:text-white",
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-3 h-4 w-4" />
                          {item.name}
                        </div>
                        {item.badge && (
                          <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700/50 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">DropSpace</p>
              <p className="text-xs text-gray-400">CRM System</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
