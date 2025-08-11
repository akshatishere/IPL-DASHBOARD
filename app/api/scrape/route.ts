import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { Match, Team, PointsTableEntry } from '@/types'

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
    time: '15:30',
    venue: 'M. Chinnaswamy Stadium, Bangalore',
    status: 'upcoming',
    matchNumber: 'Match 2'
  },
  {
    id: '3',
    team1: dummyTeams[4],
    team2: dummyTeams[5],
    date: '2024-03-23',
    time: '19:30',
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'upcoming',
    matchNumber: 'Match 3'
  },
  {
    id: '4',
    team1: dummyTeams[6],
    team2: dummyTeams[7],
    date: '2024-03-24',
    time: '15:30',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    status: 'upcoming',
    matchNumber: 'Match 4'
  },
  {
    id: '5',
    team1: dummyTeams[8],
    team2: dummyTeams[9],
    date: '2024-03-24',
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

async function scrapeIPLData() {
  try {
    // Attempt to scrape from iplt20.com
    const response = await axios.get('https://www.iplt20.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    })

    const $ = cheerio.load(response.data)
    
    // Note: This is a basic scraping attempt. The actual selectors would need to be
    // updated based on the current structure of iplt20.com
    // For now, we'll return dummy data and log the attempt
    
    console.log('Scraping attempted from iplt20.com')
    
    // Return dummy data for now
    return {
      liveMatch: null, // No live match in dummy data
      upcomingMatches: dummyMatches.slice(0, 3),
      pointsTable: dummyPointsTable,
      schedule: dummyMatches
    }
    
  } catch (error) {
    console.error('Error scraping IPL data:', error)
    console.log('Falling back to dummy data')
    
    // Return dummy data as fallback
    return {
      liveMatch: null,
      upcomingMatches: dummyMatches.slice(0, 3),
      pointsTable: dummyPointsTable,
      schedule: dummyMatches
    }
  }
}

export async function GET() {
  try {
    const data = await scrapeIPLData()
    
    return NextResponse.json({
      success: true,
      ...data,
      lastUpdated: new Date().toISOString()
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
      lastUpdated: new Date().toISOString()
    }, { status: 500 })
  }
} 