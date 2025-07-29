import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DropSpace - CRM для дропшипперів та постачальників",
  description: "Мінімалістична, сучасна CRM система для дропшипперів та постачальників",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}
