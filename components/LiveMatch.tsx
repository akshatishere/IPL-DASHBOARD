'use client'

import { Match } from '@/types'
import { Play, Clock, MapPin } from 'lucide-react'

interface LiveMatchProps {
  liveMatch: Match | null
  upcomingMatches: Match[]
}

export default function LiveMatch({ liveMatch, upcomingMatches }: LiveMatchProps) {
  if (liveMatch) {
    return (
      <div className="card bg-gradient-to-r from-cricket-green to-green-600 text-white">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-semibold">LIVE</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Team 1 */}
          <div className="text-center">
            <div className="text-lg font-bold">{liveMatch.team1.name}</div>
            <div className="text-2xl font-bold mt-2">
              {liveMatch.score?.team1 || '0/0'}
            </div>
          </div>
          
          {/* VS */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm opacity-75">vs</div>
              <div className="text-xs mt-1">{liveMatch.matchNumber}</div>
            </div>
          </div>
          
          {/* Team 2 */}
          <div className="text-center">
            <div className="text-lg font-bold">{liveMatch.team2.name}</div>
            <div className="text-2xl font-bold mt-2">
              {liveMatch.score?.team2 || '0/0'}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-green-500/30">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{liveMatch.venue}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{liveMatch.time}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {upcomingMatches.slice(0, 3).map((match) => (
        <div key={match.id} className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {match.date} • {match.time}
              </span>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {match.matchNumber}
            </span>
          </div>
          
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Team 1 */}
            <div className="text-center">
              <div className="font-semibold text-gray-800">{match.team1.name}</div>
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
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{match.venue}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {upcomingMatches.length === 0 && (
        <div className="card text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No upcoming matches scheduled</p>
        </div>
      )}
    </div>
  )
} 