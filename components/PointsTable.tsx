'use client'

import { PointsTableEntry } from '@/types'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface PointsTableProps {
  pointsTable: PointsTableEntry[]
}

export default function PointsTable({ pointsTable }: PointsTableProps) {
  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-100 text-green-800'
      case 'L': return 'bg-red-100 text-red-800'
      case 'T': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pos
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                P
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                W
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                L
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                T
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pts
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                NRR
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Form
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pointsTable.map((entry, index) => (
              <tr key={entry.team.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                      index < 4 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {entry.position}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      {entry.team.logo && (
                        <img 
                          className="h-8 w-8 rounded-full" 
                          src={entry.team.logo} 
                          alt={entry.team.name}
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {entry.team.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {entry.team.shortName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-900">
                  {entry.played}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-900">
                  {entry.won}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-900">
                  {entry.lost}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-900">
                  {entry.tied}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {entry.points}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                  <div className="flex items-center justify-center">
                    {entry.netRunRate > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : entry.netRunRate < 0 ? (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    ) : (
                      <Minus className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`ml-1 ${
                      entry.netRunRate > 0 ? 'text-green-600' : 
                      entry.netRunRate < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {entry.netRunRate.toFixed(3)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <div className="flex space-x-1">
                    {entry.form.map((result, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-medium ${getFormColor(result)}`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pointsTable.length === 0 && (
        <div className="text-center py-8">
          {/* Trophy icon is not imported, so it's commented out */}
          {/* <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" /> */}
          <p className="text-gray-600">No points table data available</p>
        </div>
      )}
    </div>
  )
} 