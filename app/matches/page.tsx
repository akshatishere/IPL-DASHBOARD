'use client'

import { RefreshCw, Clock, MapPin } from 'lucide-react'
import { useIPLData } from '@/hooks/useIPLData'
import LiveMatch from '@/components/LiveMatch'

export default function MatchesPage() {
  const { liveMatch, upcomingMatches, loading, lastUpdated, refetch } = useIPLData()

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Matches</h1>
            <p className="text-gray-600 mt-2">
              {liveMatch ? 'Live match and upcoming fixtures' : 'Upcoming match fixtures'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-700">
                {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={refetch}
              disabled={loading}
              className="p-2 rounded-full bg-ipl-blue hover:bg-blue-700 disabled:opacity-50 transition-colors text-white"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-ipl-blue" />
            <p className="text-gray-600">Loading match data...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Live Match Section */}
          {liveMatch && (
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-semibold text-gray-800">Live Match</h2>
              </div>
              <LiveMatch liveMatch={liveMatch} upcomingMatches={[]} />
            </section>
          )}

          {/* Upcoming Matches Section */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                {liveMatch ? 'Upcoming Matches' : 'All Upcoming Matches'}
              </h2>
            </div>
            <LiveMatch liveMatch={null} upcomingMatches={upcomingMatches} />
          </section>

          {/* Match Statistics */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Match Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-cricket-green mb-2">
                  {liveMatch ? '1' : '0'}
                </div>
                <p className="text-gray-600">Live Matches</p>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {upcomingMatches.length}
                </div>
                <p className="text-gray-600">Upcoming Matches</p>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {upcomingMatches.length > 0 ? upcomingMatches[0]?.venue.split(',')[0] : 'N/A'}
                </div>
                <p className="text-gray-600">Next Venue</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
} 