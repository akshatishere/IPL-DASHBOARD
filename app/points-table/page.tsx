'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { useIPLData } from '@/contexts/IPLDataContext'
import PointsTable from '@/components/PointsTable'
import PageHeader from '@/components/PageHeader'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function PointsTablePage() {
  const { pointsTable, loading, lastUpdated } = useIPLData()

  const topTeams = pointsTable.slice(0, 4)
  const bottomTeams = pointsTable.slice(-4)

  const stats = [
    {
      name: 'Total Teams',
      value: pointsTable.length.toString(),
      color: 'text-blue-600'
    },
    {
      name: 'Playoff Spots',
      value: '4',
      color: 'text-green-600'
    },
    {
      name: 'Avg Points',
      value: pointsTable.length > 0 
        ? (pointsTable.reduce((sum, team) => sum + team.points, 0) / pointsTable.length).toFixed(1)
        : '0',
      color: 'text-purple-600'
    },
    {
      name: 'Best NRR',
      value: pointsTable.length > 0 
        ? pointsTable[0]?.netRunRate.toFixed(3) || '0.000'
        : '0.000',
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Points Table"
        description="Team standings and performance metrics"
        lastUpdated={lastUpdated}
        loading={loading}
      />

      {loading ? (
        <LoadingSpinner message="Loading points table..." />
      ) : (
        <div className="space-y-8">
          {/* Statistics */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.name} className="card text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Playoff Zone */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Playoff Zone</h2>
            <div className="card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topTeams.map((team, index) => (
                  <div key={team.team.id} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div className="font-semibold text-gray-900">{team.team.name}</div>
                    <div className="text-sm text-gray-600">{team.team.shortName}</div>
                    <div className="text-lg font-bold text-green-600">{team.points} pts</div>
                    <div className="text-xs text-gray-500">
                      {team.won}W - {team.lost}L
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Full Points Table */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Complete Standings</h2>
            <PointsTable pointsTable={pointsTable} />
          </section>

          {/* Bottom Teams */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bottom Teams</h2>
            <div className="card bg-gradient-to-r from-red-50 to-red-100 border-red-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {bottomTeams.map((team) => (
                  <div key={team.team.id} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                        {team.position}
                      </span>
                    </div>
                    <div className="font-semibold text-gray-900">{team.team.name}</div>
                    <div className="text-sm text-gray-600">{team.team.shortName}</div>
                    <div className="text-lg font-bold text-red-600">{team.points} pts</div>
                    <div className="text-xs text-gray-500">
                      {team.won}W - {team.lost}L
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NRR Analysis */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Net Run Rate Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                  Best NRR
                </h3>
                <div className="space-y-3">
                  {pointsTable
                    .filter(team => team.netRunRate > 0)
                    .sort((a, b) => b.netRunRate - a.netRunRate)
                    .slice(0, 3)
                    .map((team) => (
                      <div key={team.team.id} className="flex items-center justify-between">
                        <span className="font-medium">{team.team.shortName}</span>
                        <span className="text-green-600 font-bold">+{team.netRunRate.toFixed(3)}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <TrendingDown className="w-5 h-5 text-red-500 mr-2" />
                  Worst NRR
                </h3>
                <div className="space-y-3">
                  {pointsTable
                    .filter(team => team.netRunRate < 0)
                    .sort((a, b) => a.netRunRate - b.netRunRate)
                    .slice(0, 3)
                    .map((team) => (
                      <div key={team.team.id} className="flex items-center justify-between">
                        <span className="font-medium">{team.team.shortName}</span>
                        <span className="text-red-600 font-bold">{team.netRunRate.toFixed(3)}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
} 