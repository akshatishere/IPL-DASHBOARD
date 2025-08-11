'use client'

import { Match } from '@/types'
import { Clock } from 'lucide-react'
import { COMMON_CLASSES } from '@/constants'
import MatchCard from './ui/MatchCard'
import EmptyState from './ui/EmptyState'

interface LiveMatchProps {
  liveMatch: Match | null
  upcomingMatches: Match[]
}

export default function LiveMatch({ liveMatch, upcomingMatches }: LiveMatchProps) {
  if (liveMatch) {
    return (
      <MatchCard 
        match={liveMatch} 
        variant="live"
        showTime={true}
        showVenue={true}
        showResult={false}
      />
    )
  }

  return (
    <div className={COMMON_CLASSES.spaceY4}>
      {upcomingMatches.slice(0, 3).map((match) => (
        <MatchCard 
          key={match.id} 
          match={match} 
          variant="compact"
          showTime={true}
          showVenue={true}
          showResult={false}
        />
      ))}
      
      {upcomingMatches.length === 0 && (
        <EmptyState type="upcomingMatches" icon={Clock} />
      )}
    </div>
  )
} 