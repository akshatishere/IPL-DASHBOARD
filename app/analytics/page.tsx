'use client'

import { useIPLData } from '@/contexts/IPLDataContext'
import PerformanceCharts from '@/components/PerformanceCharts'
import HistoricalData from '@/components/HistoricalData'
import LoadingSpinner from '@/components/LoadingSpinner'
import { BarChart3, History, TrendingUp } from 'lucide-react'

export default function AnalyticsPage() {
  const { 
    pointsTable, 
    teamStats, 
    historicalMatches, 
    loading, 
    error
  } = useIPLData()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner message="Loading analytics..." />
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
    </div>
  )
} 