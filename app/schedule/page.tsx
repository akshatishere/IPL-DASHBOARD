'use client'

import { useState } from 'react'
import { Search, Filter, MapPin, Clock } from 'lucide-react'
import { useIPLData } from '@/contexts/IPLDataContext'
import MatchSchedule from '@/components/MatchSchedule'
import PageHeader from '@/components/PageHeader'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Match } from '@/types'

export default function SchedulePage() {
  const { schedule, loading, lastUpdated } = useIPLData()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredMatches = schedule.filter((match: Match) => {
    const matchesSearch = 
      match.team1.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.matchNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || match.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = [
    {
      name: 'Total Matches',
      value: schedule.length.toString(),
      color: 'text-blue-600'
    },
    {
      name: 'Upcoming',
      value: schedule.filter(m => m.status === 'upcoming').length.toString(),
      color: 'text-green-600'
    },
    {
      name: 'Live',
      value: schedule.filter(m => m.status === 'live').length.toString(),
      color: 'text-red-600'
    },
    {
      name: 'Completed',
      value: schedule.filter(m => m.status === 'completed').length.toString(),
      color: 'text-gray-600'
    }
  ]

  const uniqueVenues = Array.from(new Set(schedule.map(match => match.venue.split(',')[0])))

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Match Schedule"
        description="Complete tournament schedule and fixtures"
        lastUpdated={lastUpdated}
        loading={loading}
      />

      {loading ? (
        <LoadingSpinner message="Loading schedule..." />
      ) : (
        <div className="space-y-8">
          {/* Statistics */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.name} className="card text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Search and Filters */}
          <section>
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search matches, teams, venues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ipl-blue focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ipl-blue focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-center">
                  <span className="text-sm text-gray-600">
                    {filteredMatches.length} of {schedule.length} matches
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Venues Overview */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Venues</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {uniqueVenues.map((venue) => (
                <div key={venue} className="card text-center py-3">
                  <MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900">{venue}</p>
                  <p className="text-xs text-gray-500">
                    {schedule.filter(m => m.venue.includes(venue)).length} matches
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Match Schedule</h2>
              {filteredMatches.length === 0 && (
                <p className="text-gray-500">No matches found</p>
              )}
            </div>
            <MatchSchedule schedule={filteredMatches} />
          </section>

          {/* Upcoming Highlights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedule
                .filter(match => match.status === 'upcoming')
                .slice(0, 6)
                .map((match) => (
                  <div key={match.id} className="card hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {match.matchNumber}
                      </span>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{match.time}</span>
                      </div>
                    </div>
                    
                    <div className="text-center mb-3">
                      <div className="font-semibold text-gray-900">{match.team1.shortName}</div>
                      <div className="text-sm text-gray-500">vs</div>
                      <div className="font-semibold text-gray-900">{match.team2.shortName}</div>
                    </div>
                    
                    <div className="text-center text-sm text-gray-600">
                      <div className="flex items-center justify-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{match.venue.split(',')[0]}</span>
                      </div>
                      <div className="mt-1">{match.date}</div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
} 