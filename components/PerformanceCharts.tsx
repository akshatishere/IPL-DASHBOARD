'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { PointsTableEntry } from '@/types'
import { Trophy, TrendingUp, Target } from 'lucide-react'

interface PerformanceChartsProps {
  pointsTable: PointsTableEntry[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1']

export default function PerformanceCharts({ pointsTable }: PerformanceChartsProps) {
  const [activeTab, setActiveTab] = useState('points')

  // Prepare data for different charts
  const pointsData = pointsTable.map(entry => ({
    name: entry.team.shortName,
    points: entry.points,
    wins: entry.won,
    losses: entry.lost,
    netRunRate: entry.netRunRate
  }))

  const formData = pointsTable.map(entry => ({
    name: entry.team.shortName,
    wins: entry.form.filter(f => f === 'W').length,
    losses: entry.form.filter(f => f === 'L').length,
    ties: entry.form.filter(f => f === 'T').length
  }))

  const winRateData = pointsTable.map(entry => ({
    name: entry.team.shortName,
    winRate: entry.played > 0 ? (entry.won / entry.played) * 100 : 0
  }))

  const netRunRateData = pointsTable
    .map(entry => ({
      name: entry.team.shortName,
      netRunRate: entry.netRunRate
    }))
    .sort((a, b) => b.netRunRate - a.netRunRate)

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: { color: string; name: string; value: number }, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'points', label: 'Points Table', icon: Trophy },
          { id: 'form', label: 'Recent Form', icon: TrendingUp },
          { id: 'winrate', label: 'Win Rate', icon: Target }
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

      {/* Charts */}
      <div className="space-y-6">
        {activeTab === 'points' && (
          <div className="space-y-6">
            {/* Points Bar Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Team Points</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pointsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="points" fill="#0088FE" name="Points" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Net Run Rate Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Net Run Rate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={netRunRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="netRunRate"
                    stroke="#00C49F"
                    fill="#00C49F"
                    fillOpacity={0.3}
                    name="Net Run Rate"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'form' && (
          <div className="space-y-6">
            {/* Recent Form Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Last 5 Matches Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="wins" fill="#00C49F" name="Wins" />
                  <Bar dataKey="losses" fill="#FF8042" name="Losses" />
                  <Bar dataKey="ties" fill="#FFBB28" name="Ties" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Form Distribution Pie Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Overall Form Distribution</h3>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Wins', value: pointsTable.reduce((sum, entry) => sum + entry.won, 0) },
                        { name: 'Losses', value: pointsTable.reduce((sum, entry) => sum + entry.lost, 0) },
                        { name: 'Ties', value: pointsTable.reduce((sum, entry) => sum + entry.tied, 0) }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'winrate' && (
          <div className="space-y-6">
            {/* Win Rate Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Win Rate Percentage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={winRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="winRate"
                    stroke="#8884d8"
                    strokeWidth={3}
                    name="Win Rate %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Comparison */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pointsTable.slice(0, 3).map((entry) => (
                  <div key={entry.team.id} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{entry.team.shortName}</div>
                    <div className="text-sm text-gray-600 mt-2">
                      <div>Win Rate: {((entry.won / entry.played) * 100).toFixed(1)}%</div>
                      <div>Points: {entry.points}</div>
                      <div>NRR: {entry.netRunRate.toFixed(3)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 