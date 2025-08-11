export interface Team {
  id: string
  name: string
  shortName: string
  logo?: string
}

export interface Match {
  id: string
  team1: Team
  team2: Team
  date: string
  time: string
  venue: string
  status: 'upcoming' | 'live' | 'completed'
  score?: {
    team1: string
    team2: string
  }
  result?: string
  matchNumber?: string
  // Enhanced match data for historical analysis
  tossWinner?: string
  tossDecision?: 'bat' | 'bowl'
  playerOfTheMatch?: string
  highlights?: string[]
  attendance?: number
}

export interface PointsTableEntry {
  position: number
  team: Team
  played: number
  won: number
  lost: number
  tied: number
  points: number
  netRunRate: number
  form: string[] // Last 5 matches: 'W', 'L', 'T'
}

// New types for bonus features
export interface HistoricalMatch extends Match {
  season: string
  detailedScore?: {
    team1: {
      runs: number
      wickets: number
      overs: number
    }
    team2: {
      runs: number
      wickets: number
      overs: number
    }
  }
  keyMoments?: {
    time: string
    event: string
    description: string
  }[]
}

export interface TeamStats {
  team: Team
  totalMatches: number
  wins: number
  losses: number
  winPercentage: number
  averageScore: number
  highestScore: number
  lowestScore: number
  totalRuns: number
  totalWickets: number
  seasonPerformance: {
    season: string
    position: number
    points: number
  }[]
}

export interface Notification {
  id: string
  type: 'match_start' | 'wicket' | 'milestone' | 'result' | 'general'
  title: string
  message: string
  timestamp: Date
  read: boolean
  matchId?: string
  priority: 'low' | 'medium' | 'high'
}

export interface CacheEntry {
  data: any
  timestamp: number
  ttl: number // Time to live in milliseconds
}

export interface PerformanceMetrics {
  teamId: string
  battingAverage: number
  bowlingAverage: number
  runRate: number
  economyRate: number
  winRate: number
  season: string
} 