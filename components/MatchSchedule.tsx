'use client'

import { Match } from '@/types'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { format, parseISO } from 'date-fns'

interface MatchScheduleProps {
  schedule: Match[]
}

export default function MatchSchedule({ schedule }: MatchScheduleProps) {
  const groupMatchesByDate = (matches: Match[]) => {
    const grouped: { [key: string]: Match[] } = {}
    
    matches.forEach(match => {
      const date = match.date
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(match)
    })
    
    return grouped
  }

  const groupedMatches = groupMatchesByDate(schedule)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedMatches).map(([date, matches]) => (
        <div key={date} className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
            </h3>
          </div>
          
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{match.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                      {match.status.toUpperCase()}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {match.matchNumber}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Team 1 */}
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{match.team1.name}</div>
                    <div className="text-sm text-gray-500">{match.team1.shortName}</div>
                    {match.score?.team1 && (
                      <div className="text-lg font-bold text-gray-900 mt-1">
                        {match.score.team1}
                      </div>
                    )}
                  </div>
                  
                  {/* VS */}
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">vs</div>
                    </div>
                  </div>
                  
                  {/* Team 2 */}
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{match.team2.name}</div>
                    <div className="text-sm text-gray-500">{match.team2.shortName}</div>
                    {match.score?.team2 && (
                      <div className="text-lg font-bold text-gray-900 mt-1">
                        {match.score.team2}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{match.venue}</span>
                    </div>
                  </div>
                  {match.result && (
                    <div className="mt-2 text-center text-sm text-gray-700 font-medium">
                      {match.result}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {schedule.length === 0 && (
        <div className="card text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No match schedule available</p>
        </div>
      )}
    </div>
  )
} 