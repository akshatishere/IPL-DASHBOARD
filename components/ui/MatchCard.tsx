import { Match } from '@/types'
import { STATUS_COLORS, COMMON_CLASSES, MATCH_DISPLAY_CONFIG } from '@/constants'
import { Clock, MapPin } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import TeamDisplay from './TeamDisplay'

interface MatchCardProps {
  match: Match
  variant?: 'default' | 'live' | 'compact'
  showDate?: boolean
  showTime?: boolean
  showVenue?: boolean
  showResult?: boolean
  className?: string
}

export default function MatchCard({
  match,
  variant = 'default',
  showDate = true,
  showTime = true,
  showVenue = true,
  showResult = true,
  className = ''
}: MatchCardProps) {
  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.default
  }

  const isLive = match.status === 'live'
  const isCompact = variant === 'compact'

  return (
    <div className={`${COMMON_CLASSES.card} ${isLive ? 'bg-gradient-to-r from-cricket-green to-green-600 text-white' : 'hover:shadow-lg transition-shadow'} ${className}`}>
      {/* Header */}
      <div className={`flex items-center justify-between ${COMMON_CLASSES.mb3}`}>
        <div className="flex items-center space-x-2">
          {isLive && (
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
          {showTime && (
            <>
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{match.time}</span>
            </>
          )}
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

      {/* Teams */}
      <div className={`grid ${isCompact ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
        <div className="text-center">
          <TeamDisplay 
            team={match.team1} 
            size={isCompact ? 'medium' : 'large'}
            showLogo={false}
            className="justify-center"
          />
          {match.score?.team1 && (
            <div className={`${MATCH_DISPLAY_CONFIG.scoreSize.large} font-bold ${isLive ? 'text-white' : 'text-gray-900'} mt-1`}>
              {match.score.team1}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className={`text-sm ${isLive ? 'opacity-75' : 'text-gray-500'}`}>vs</div>
            {isCompact && (
              <div className="text-xs mt-1">{match.matchNumber}</div>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <TeamDisplay 
            team={match.team2} 
            size={isCompact ? 'medium' : 'large'}
            showLogo={false}
            className="justify-center"
          />
          {match.score?.team2 && (
            <div className={`${MATCH_DISPLAY_CONFIG.scoreSize.large} font-bold ${isLive ? 'text-white' : 'text-gray-900'} mt-1`}>
              {match.score.team2}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={`mt-4 pt-3 border-t ${isLive ? 'border-green-500/30' : 'border-gray-200'}`}>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          {showVenue && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{match.venue}</span>
            </div>
          )}
        </div>
        {showResult && match.result && (
          <div className="mt-2 text-center text-sm text-gray-700 font-medium">
            {match.result}
          </div>
        )}
      </div>
    </div>
  )
} 