'use client'

import { Clock, Trophy, Calendar, TrendingUp, Users, Bell } from 'lucide-react'
import { useIPLData } from '@/contexts/IPLDataContext'
import { useNotifications } from '@/hooks/useNotifications'
import PageHeader from '@/components/PageHeader'
import LoadingSpinner from '@/components/LoadingSpinner'
import Link from 'next/link'

export default function Home() {
  const { liveMatch, upcomingMatches, pointsTable, schedule, loading, lastUpdated } = useIPLData()
  const { addTestNotification } = useNotifications()

  const stats = [
    {
      name: 'Live Matches',
      value: liveMatch ? '1' : '0',
      icon: Clock,
      color: 'text-cricket-green',
      bgColor: 'bg-green-100',
      href: '/matches'
    },
    {
      name: 'Upcoming Matches',
      value: upcomingMatches.length.toString(),
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/matches'
    },
    {
      name: 'Teams',
      value: pointsTable.length.toString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/points-table'
    },
    {
      name: 'Total Matches',
      value: schedule.length.toString(),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/schedule'
    }
  ]

  const quickActions = [
    {
      title: 'Live & Upcoming Matches',
      description: 'View current live matches and upcoming fixtures',
      icon: Clock,
      href: '/matches',
      color: 'from-cricket-green to-green-600'
    },
    {
      title: 'Points Table',
      description: 'Check team standings and performance metrics',
      icon: Trophy,
      href: '/points-table',
      color: 'from-ipl-orange to-orange-600'
    },
    {
      title: 'Match Schedule',
      description: 'Browse the complete tournament schedule',
      icon: Calendar,
      href: '/schedule',
      color: 'from-blue-600 to-blue-800'
    },
    {
      title: 'Analytics & Insights',
      description: 'Advanced charts, historical data, and performance analytics',
      icon: TrendingUp,
      href: '/analytics',
      color: 'from-purple-600 to-purple-800'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="IPL Dashboard"
        description="Real-time T20 match information and statistics"
        lastUpdated={lastUpdated}
        loading={loading}
      />

      <div className="flex items-center justify-end mb-4">
        <button
          onClick={addTestNotification}
          className="p-2 rounded-full bg-green-600 hover:bg-green-700 transition-colors text-white"
          title="Add Test Notification"
        >
          <Bell className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading IPL data..." />
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Link key={stat.name} href={stat.href}>
                <div className="card hover:shadow-lg transition-shadow cursor-pointer min-h-[125px]">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Live Match Highlight */}
          {liveMatch && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Match</h2>
              <div className="card bg-gradient-to-r from-cricket-green to-green-600 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">LIVE NOW</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{liveMatch.team1.name}</div>
                    <div className="text-2xl font-bold mt-2">
                      {liveMatch.score?.team1 || '0/0'}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm opacity-75">vs</div>
                      <div className="text-xs mt-1">{liveMatch.matchNumber}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{liveMatch.team2.name}</div>
                    <div className="text-2xl font-bold mt-2">
                      {liveMatch.score?.team2 || '0/0'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <div className={`card bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-shadow cursor-pointer h-full`}>
                    <div className="flex items-center mb-4">
                      <action.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                    <p className="text-white/80 text-sm">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="card">
              <div className="space-y-4">
                {upcomingMatches.slice(0, 3).map((match) => (
                  <div key={match.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {match.team1.shortName} vs {match.team2.shortName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {match.date} • {match.time}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {match.matchNumber}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 