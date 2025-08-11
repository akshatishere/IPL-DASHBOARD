import { NextResponse } from 'next/server'
import { Match, Team, PointsTableEntry, HistoricalMatch, TeamStats } from '@/types'
import cache from '@/utils/cache'

// Dummy data as fallback
const dummyTeams: Team[] = [
  { id: '1', name: 'Mumbai Indians', shortName: 'MI', logo: 'https://assets.iplt20.com/ipl/MI/logos/large.png' },
  { id: '2', name: 'Chennai Super Kings', shortName: 'CSK', logo: 'https://assets.iplt20.com/ipl/CSK/logos/large.png' },
  { id: '3', name: 'Royal Challengers Bangalore', shortName: 'RCB', logo: 'https://assets.iplt20.com/ipl/RCB/logos/large.png' },
  { id: '4', name: 'Kolkata Knight Riders', shortName: 'KKR', logo: 'https://assets.iplt20.com/ipl/KKR/logos/large.png' },
  { id: '5', name: 'Delhi Capitals', shortName: 'DC', logo: 'https://assets.iplt20.com/ipl/DC/logos/large.png' },
  { id: '6', name: 'Punjab Kings', shortName: 'PBKS', logo: 'https://assets.iplt20.com/ipl/PBKS/logos/large.png' },
  { id: '7', name: 'Rajasthan Royals', shortName: 'RR', logo: 'https://assets.iplt20.com/ipl/RR/logos/large.png' },
  { id: '8', name: 'Sunrisers Hyderabad', shortName: 'SRH', logo: 'https://assets.iplt20.com/ipl/SRH/logos/large.png' },
  { id: '9', name: 'Gujarat Titans', shortName: 'GT', logo: 'https://assets.iplt20.com/ipl/GT/logos/large.png' },
  { id: '10', name: 'Lucknow Super Giants', shortName: 'LSG', logo: 'https://assets.iplt20.com/ipl/LSG/logos/large.png' }
]

const dummyMatches: Match[] = [
  {
    id: '1',
    team1: dummyTeams[0],
    team2: dummyTeams[1],
    date: '2024-03-22',
    time: '19:30',
    venue: 'Wankhede Stadium, Mumbai',
    status: 'upcoming',
    matchNumber: 'Match 1'
  },
  {
    id: '2',
    team1: dummyTeams[2],
    team2: dummyTeams[3],
    date: '2024-03-23',
    time: '19:30',
    venue: 'M. Chinnaswamy Stadium, Bangalore',
    status: 'upcoming',
    matchNumber: 'Match 2'
  },
  {
    id: '3',
    team1: dummyTeams[4],
    team2: dummyTeams[5],
    date: '2024-03-24',
    time: '15:30',
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'upcoming',
    matchNumber: 'Match 3'
  },
  {
    id: '4',
    team1: dummyTeams[6],
    team2: dummyTeams[7],
    date: '2024-03-25',
    time: '19:30',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    status: 'upcoming',
    matchNumber: 'Match 4'
  },
  {
    id: '5',
    team1: dummyTeams[8],
    team2: dummyTeams[9],
    date: '2024-03-26',
    time: '19:30',
    venue: 'Narendra Modi Stadium, Ahmedabad',
    status: 'upcoming',
    matchNumber: 'Match 5'
  }
]

const dummyPointsTable: PointsTableEntry[] = [
  {
    position: 1,
    team: dummyTeams[0],
    played: 5,
    won: 4,
    lost: 1,
    tied: 0,
    points: 8,
    netRunRate: 1.245,
    form: ['W', 'W', 'L', 'W', 'W']
  },
  {
    position: 2,
    team: dummyTeams[1],
    played: 5,
    won: 4,
    lost: 1,
    tied: 0,
    points: 8,
    netRunRate: 0.987,
    form: ['W', 'L', 'W', 'W', 'W']
  },
  {
    position: 3,
    team: dummyTeams[2],
    played: 5,
    won: 3,
    lost: 2,
    tied: 0,
    points: 6,
    netRunRate: 0.456,
    form: ['L', 'W', 'W', 'L', 'W']
  },
  {
    position: 4,
    team: dummyTeams[3],
    played: 5,
    won: 3,
    lost: 2,
    tied: 0,
    points: 6,
    netRunRate: 0.234,
    form: ['W', 'L', 'W', 'L', 'W']
  },
  {
    position: 5,
    team: dummyTeams[4],
    played: 5,
    won: 2,
    lost: 3,
    tied: 0,
    points: 4,
    netRunRate: -0.123,
    form: ['L', 'W', 'L', 'W', 'L']
  },
  {
    position: 6,
    team: dummyTeams[5],
    played: 5,
    won: 2,
    lost: 3,
    tied: 0,
    points: 4,
    netRunRate: -0.234,
    form: ['W', 'L', 'L', 'W', 'L']
  },
  {
    position: 7,
    team: dummyTeams[6],
    played: 5,
    won: 2,
    lost: 3,
    tied: 0,
    points: 4,
    netRunRate: -0.345,
    form: ['L', 'W', 'L', 'L', 'W']
  },
  {
    position: 8,
    team: dummyTeams[7],
    played: 5,
    won: 1,
    lost: 4,
    tied: 0,
    points: 2,
    netRunRate: -0.567,
    form: ['L', 'L', 'W', 'L', 'L']
  },
  {
    position: 9,
    team: dummyTeams[8],
    played: 5,
    won: 1,
    lost: 4,
    tied: 0,
    points: 2,
    netRunRate: -0.678,
    form: ['L', 'L', 'L', 'W', 'L']
  },
  {
    position: 10,
    team: dummyTeams[9],
    played: 5,
    won: 1,
    lost: 4,
    tied: 0,
    points: 2,
    netRunRate: -0.789,
    form: ['L', 'L', 'L', 'L', 'W']
  }
]

// Enhanced dummy data for bonus features
const dummyHistoricalMatches: HistoricalMatch[] = [
  {
    id: 'hist1',
    team1: dummyTeams[0],
    team2: dummyTeams[1],
    date: '2024-03-15',
    time: '19:30',
    venue: 'Wankhede Stadium, Mumbai',
    status: 'completed',
    season: '2024',
    result: 'Mumbai Indians won by 5 wickets',
    matchNumber: 'Match 15',
    detailedScore: {
      team1: { runs: 185, wickets: 4, overs: 20 },
      team2: { runs: 182, wickets: 8, overs: 20 }
    },
    keyMoments: [
      { time: '19:45', event: 'Toss', description: 'CSK won the toss and chose to bat' },
      { time: '20:15', event: 'First Wicket', description: 'Ruturaj Gaikwad caught behind' },
      { time: '21:30', event: 'Milestone', description: 'MS Dhoni reaches 50' }
    ],
    playerOfTheMatch: 'Hardik Pandya',
    attendance: 45000
  },
  {
    id: 'hist2',
    team1: dummyTeams[2],
    team2: dummyTeams[3],
    date: '2024-03-14',
    time: '19:30',
    venue: 'M. Chinnaswamy Stadium, Bangalore',
    status: 'completed',
    season: '2024',
    result: 'Royal Challengers Bangalore won by 8 wickets',
    matchNumber: 'Match 14',
    detailedScore: {
      team1: { runs: 165, wickets: 6, overs: 20 },
      team2: { runs: 168, wickets: 2, overs: 18.2 }
    },
    keyMoments: [
      { time: '19:45', event: 'Toss', description: 'RCB won the toss and chose to bowl' },
      { time: '20:30', event: 'Partnership', description: 'Kohli and Maxwell 100-run partnership' }
    ],
    playerOfTheMatch: 'Virat Kohli',
    attendance: 38000
  },
  {
    id: 'hist3',
    team1: dummyTeams[4],
    team2: dummyTeams[5],
    date: '2024-03-13',
    time: '19:30',
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'completed',
    season: '2024',
    result: 'Delhi Capitals won by 3 wickets',
    matchNumber: 'Match 13',
    detailedScore: {
      team1: { runs: 175, wickets: 7, overs: 20 },
      team2: { runs: 178, wickets: 7, overs: 19.5 }
    },
    keyMoments: [
      { time: '19:45', event: 'Toss', description: 'DC won the toss and chose to bowl' },
      { time: '21:00', event: 'Last Over', description: 'Thrilling finish with 3 balls to spare' }
    ],
    playerOfTheMatch: 'Rishabh Pant',
    attendance: 42000
  }
]

const dummyTeamStats: TeamStats[] = [
  {
    team: dummyTeams[0],
    totalMatches: 250,
    wins: 140,
    losses: 110,
    winPercentage: 56,
    averageScore: 165,
    highestScore: 223,
    lowestScore: 87,
    totalRuns: 41250,
    totalWickets: 1250,
    seasonPerformance: [
      { season: '2024', position: 1, points: 8 },
      { season: '2023', position: 3, points: 16 },
      { season: '2022', position: 2, points: 18 }
    ]
  },
  {
    team: dummyTeams[1],
    totalMatches: 245,
    wins: 135,
    losses: 110,
    winPercentage: 55,
    averageScore: 162,
    highestScore: 218,
    lowestScore: 79,
    totalRuns: 39690,
    totalWickets: 1220,
    seasonPerformance: [
      { season: '2024', position: 2, points: 8 },
      { season: '2023', position: 1, points: 20 },
      { season: '2022', position: 4, points: 14 }
    ]
  },
  {
    team: dummyTeams[2],
    totalMatches: 240,
    wins: 120,
    losses: 120,
    winPercentage: 50,
    averageScore: 158,
    highestScore: 263,
    lowestScore: 82,
    totalRuns: 37920,
    totalWickets: 1180,
    seasonPerformance: [
      { season: '2024', position: 3, points: 6 },
      { season: '2023', position: 6, points: 12 },
      { season: '2022', position: 3, points: 16 }
    ]
  }
]

async function getIPLData() {
  try {
    // Check cache first
    const cacheKey = 'ipl_data'
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
      console.log('Returning cached data')
      return cachedData
    }

    console.log('Generating fresh dummy data')
    
    // Prepare data with dummy content
    const data = {
      liveMatch: null, // No live match in dummy data
      upcomingMatches: dummyMatches.slice(0, 3),
      pointsTable: dummyPointsTable,
      schedule: dummyMatches,
      historicalMatches: dummyHistoricalMatches,
      teamStats: dummyTeamStats
    }

    // Cache the data for 5 minutes
    cache.set(cacheKey, data, 5 * 60 * 1000)
    
    return data
    
  } catch (error) {
    console.error('Error generating IPL data:', error)
    
    // Return dummy data as fallback
    const fallbackData = {
      liveMatch: null,
      upcomingMatches: dummyMatches.slice(0, 3),
      pointsTable: dummyPointsTable,
      schedule: dummyMatches,
      historicalMatches: dummyHistoricalMatches,
      teamStats: dummyTeamStats
    }

    // Cache fallback data for 2 minutes
    cache.set('ipl_data', fallbackData, 2 * 60 * 1000)
    
    return fallbackData
  }
}

export async function GET() {
  try {
    const data = await getIPLData()
    
    return NextResponse.json({
      success: true,
      ...data,
      lastUpdated: new Date().toISOString(),
      cacheStats: cache.getStats()
    })
  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch IPL data',
      liveMatch: null,
      upcomingMatches: dummyMatches.slice(0, 3),
      pointsTable: dummyPointsTable,
      schedule: dummyMatches,
      historicalMatches: dummyHistoricalMatches,
      teamStats: dummyTeamStats,
      lastUpdated: new Date().toISOString()
    }, { status: 500 })
  }
} 