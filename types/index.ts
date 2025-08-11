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