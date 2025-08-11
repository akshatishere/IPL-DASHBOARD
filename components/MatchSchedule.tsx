'use client'

import { Match } from '@/types'
import { Calendar } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { COMMON_CLASSES, MATCH_DISPLAY_CONFIG } from '@/constants'
import MatchCard from './ui/MatchCard'
import EmptyState from './ui/EmptyState'

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

  return (
    <div className={COMMON_CLASSES.spaceY6}>
      {Object.entries(groupedMatches).map(([date, matches]) => (
        <div key={date} className={COMMON_CLASSES.card}>
          <div className={`flex items-center ${COMMON_CLASSES.spaceX2} ${COMMON_CLASSES.mb4}`}>
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {format(parseISO(date), MATCH_DISPLAY_CONFIG.dateFormat)}
            </h3>
          </div>
          
          <div className={COMMON_CLASSES.spaceY4}>
            {matches.map((match) => (
              <MatchCard 
                key={match.id} 
                match={match} 
                variant="default"
                showTime={true}
                showVenue={true}
                showResult={true}
              />
            ))}
          </div>
        </div>
      ))}
      
      {schedule.length === 0 && (
        <EmptyState type="schedule" icon={Calendar} />
      )}
    </div>
  )
} 