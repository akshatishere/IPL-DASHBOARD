'use client'

import { Clock } from 'lucide-react'
import { useIPLData } from '@/contexts/IPLDataContext'
import LiveMatch from '@/components/LiveMatch'
import PageHeader from '@/components/PageHeader'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function MatchesPage() {
  const { liveMatch, upcomingMatches, loading, lastUpdated } = useIPLData()

  const getDescription = () => {
    return liveMatch ? 'Live match and upcoming fixtures' : 'Upcoming match fixtures'
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Matches"
        description={getDescription()}
        lastUpdated={lastUpdated}
        loading={loading}
      />

      {loading ? (
        <LoadingSpinner message="Loading match data..." />
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