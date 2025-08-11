'use client'

import { useIPLData } from '@/hooks/useIPLData'
import PerformanceCharts from '@/components/PerformanceCharts'
import HistoricalData from '@/components/HistoricalData'
import { BarChart3, History, TrendingUp, Database } from 'lucide-react'

export default function AnalyticsPage() {
  const { 
    pointsTable, 
    teamStats, 
    historicalMatches, 
    loading, 
    error,
    cacheStats 
  } = useIPLData()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ipl-blue"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">Error Loading Data</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h1>
        <p className="text-gray-600">
          Advanced analytics, historical data, and performance insights for IPL teams
        </p>
      </div>

      {/* Cache Stats */}
      {cacheStats && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Database className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Cache Status</h3>
          </div>
          <div className="text-sm text-blue-700">
            Cached entries: {cacheStats.size} | 
            Keys: {cacheStats.keys.slice(0, 3).join(', ')}
            {cacheStats.keys.length > 3 && '...'}
          </div>
        </div>
      )}

      {/* Feature Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Charts */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-ipl-blue" />
            <h2 className="text-xl font-semibold text-gray-900">Performance Analytics</h2>
          </div>
          <PerformanceCharts 
            pointsTable={pointsTable} 
            teamStats={teamStats} 
          />
        </div>

        {/* Historical Data */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-ipl-blue" />
            <h2 className="text-xl font-semibold text-gray-900">Historical Data</h2>
          </div>
          <HistoricalData 
            historicalMatches={historicalMatches} 
            teamStats={teamStats} 
          />
        </div>
      </div>

      {/* Bonus Features Info */}
      <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span>Bonus Features Implemented</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">📊</div>
            <h4 className="font-semibold text-gray-900 mb-1">Data Visualization</h4>
            <p className="text-sm text-gray-600">
              Interactive charts showing team performance, win rates, and form analysis
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-1">🔔</div>
            <h4 className="font-semibold text-gray-900 mb-1">Real-time Notifications</h4>
            <p className="text-sm text-gray-600">
              Live notifications for match events, wickets, milestones, and results
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">📈</div>
            <h4 className="font-semibold text-gray-900 mb-1">Historical Insights</h4>
            <p className="text-sm text-gray-600">
              Previous match data, team statistics, and season performance tracking
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-orange-600 mb-1">⚡</div>
            <h4 className="font-semibold text-gray-900 mb-1">Smart Caching</h4>
            <p className="text-sm text-gray-600">
              Intelligent caching system to minimize API calls and improve performance
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 