'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Trophy, Calendar, Clock, Home, BarChart3 } from 'lucide-react'
import NotificationPanel from './NotificationPanel'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Live/Upcoming', href: '/matches', icon: Clock },
  { name: 'Points Table', href: '/points-table', icon: Trophy },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-gradient-to-r from-ipl-blue to-blue-800 shadow-lg">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-ipl-blue font-bold text-sm">IPL</span>
              </div>
              <span className="text-white font-bold text-lg hidden sm:inline">Dashboard</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white text-ipl-blue'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              )
            })}
            
            {/* Notification Panel */}
            <div className="ml-2 lg:ml-4">
              <NotificationPanel />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-white/10 p-2 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white text-ipl-blue'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 