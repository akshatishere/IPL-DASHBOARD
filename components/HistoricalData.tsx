'use client'

import { useState } from 'react'
import { HistoricalMatch, TeamStats } from '@/types'
import { Calendar, Trophy, TrendingUp, Users, Target } from 'lucide-react'
import { format } from 'date-fns'

interface HistoricalDataProps {
  historicalMatches?: HistoricalMatch[]
  teamStats?: TeamStats[]
}

// Dummy historical data
const dummyHistoricalMatches: HistoricalMatch[] = [
  {
    id: 'hist1',
    team1: { id: '1', name: 'Mumbai Indians', shortName: 'MI' },
    team2: { id: '2', name: 'Chennai Super Kings', shortName: 'CSK' },
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
      { time: '20:30', event: 'Wicket', description: 'Rohit Sharma dismissed for 45' },
      { time: '21:15', event: 'Milestone', description: 'MI reaches 100 runs' },
      { time: '22:00', event: 'Result', description: 'MI wins by 5 wickets' }
    ],
    playerOfTheMatch: 'Hardik Pandya',
    attendance: 45000
  },
  {
    id: 'hist2',
    team1: { id: '3', name: 'Royal Challengers Bangalore', shortName: 'RCB' },
    team2: { id: '4', name: 'Kolkata Knight Riders', shortName: 'KKR' },
    date: '2024-03-14',
    time: '19:30',
    venue: 'M. Chinnaswamy Stadium, Bangalore',
    status: 'completed',
    season: '2024',
    result: 'RCB won by 8 wickets',
    matchNumber: 'Match 14',
    detailedScore: {
      team1: { runs: 165, wickets: 2, overs: 18.2 },
      team2: { runs: 162, wickets: 9, overs: 20 }
    },
    keyMoments: [
      { time: '19:45', event: 'Toss', description: 'RCB won the toss and chose to bowl' },
      { time: '20:20', event: 'Wicket', description: 'Virat Kohli takes a brilliant catch' },
      { time: '21:00', event: 'Milestone', description: 'RCB reaches 50 runs in 5 overs' },
      { time: '21:45', event: 'Result', description: 'RCB wins by 8 wickets' }
    ],
    playerOfTheMatch: 'Virat Kohli',
    attendance: 38000
  }
]

const dummyTeamStats: TeamStats[] = [
  {
    team: { id: '1', name: 'Mumbai Indians', shortName: 'MI' },
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
    team: { id: '2', name: 'Chennai Super Kings', shortName: 'CSK' },
    totalMatches: 250,
    wins: 145,
    losses: 105,
    winPercentage: 58,
    averageScore: 168,
    highestScore: 246,
    lowestScore: 79,
    totalRuns: 42000,
    totalWickets: 1300,
    seasonPerformance: [
      { season: '2024', position: 2, points: 8 },
      { season: '2023', position: 1, points: 20 },
      { season: '2022', position: 4, points: 14 }
    ]
  }
]

export default function HistoricalData({ 
  historicalMatches = dummyHistoricalMatches, 
  teamStats = dummyTeamStats 
}: HistoricalDataProps) {
  const [activeTab, setActiveTab] = useState('matches')
  const [selectedSeason, setSelectedSeason] = useState('2024')

  const seasons = ['2024', '2023', '2022', '2021', '2020']
  const filteredMatches = historicalMatches.filter(match => match.season === selectedSeason)
  const filteredStats = teamStats

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'matches', label: 'Previous Matches', icon: Calendar },
          { id: 'stats', label: 'Team Statistics', icon: TrendingUp },
          { id: 'performance', label: 'Season Performance', icon: Trophy }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Season Selector */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Season:</label>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {seasons.map(season => (
            <option key={season} value={season}>{season}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'matches' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Previous Matches - {selectedSeason}</h3>
            {filteredMatches.map((match) => (
              <div key={match.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {format(new Date(match.date), 'MMM dd, yyyy')} • {match.time}
                    </span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {match.matchNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{match.team1.name}</div>
                    {match.detailedScore && (
                      <div className="text-sm text-gray-600">
                        {match.detailedScore.team1.runs}/{match.detailedScore.team1.wickets} ({match.detailedScore.team1.overs} ov)
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">vs</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{match.team2.name}</div>
                    {match.detailedScore && (
                      <div className="text-sm text-gray-600">
                        {match.detailedScore.team2.runs}/{match.detailedScore.team2.wickets} ({match.detailedScore.team2.overs} ov)
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="text-sm font-medium text-gray-900 mb-2">{match.result}</div>
                  {match.playerOfTheMatch && (
                    <div className="text-sm text-gray-600 mb-2">
                      Player of the Match: {match.playerOfTheMatch}
                    </div>
                  )}
                  {match.attendance && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>Attendance: {match.attendance.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Key Moments */}
                {match.keyMoments && match.keyMoments.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Moments</h4>
                    <div className="space-y-1">
                      {match.keyMoments.slice(0, 3).map((moment, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                          <span className="font-medium">{moment.time}</span>
                          <span>•</span>
                          <span className="font-medium">{moment.event}:</span>
                          <span>{moment.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Team Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStats.map((stat) => (
                <div key={stat.team.id} className="card">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-bold text-gray-700">{stat.team.shortName}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{stat.team.name}</h4>
                      <p className="text-sm text-gray-600">{stat.totalMatches} matches played</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{stat.winPercentage}%</div>
                      <div className="text-xs text-gray-600">Win Rate</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{stat.wins}</div>
                      <div className="text-xs text-gray-600">Wins</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{stat.averageScore}</div>
                      <div className="text-xs text-gray-600">Avg Score</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{stat.highestScore}</div>
                      <div className="text-xs text-gray-600">Highest Score</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Runs:</span>
                      <span className="font-medium">{stat.totalRuns.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Wickets:</span>
                      <span className="font-medium">{stat.totalWickets.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Season Performance</h3>
            <div className="space-y-4">
              {filteredStats.map((stat) => (
                <div key={stat.team.id} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{stat.team.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        {stat.seasonPerformance.length} seasons
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {stat.seasonPerformance.map((performance) => (
                      <div key={performance.season} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-900">{performance.season}</span>
                          <span className="text-sm text-gray-600">
                            Position: {performance.position}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-gray-900">{performance.points} points</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 