'use client'

import { PointsTableEntry } from '@/types'
import { TrendingUp, TrendingDown, Minus, Trophy } from 'lucide-react'
import { FORM_COLORS, POSITION_COLORS, POINTS_TABLE_HEADERS, COMMON_CLASSES } from '@/constants'
import TeamDisplay from './ui/TeamDisplay'
import EmptyState from './ui/EmptyState'

interface PointsTableProps {
  pointsTable: PointsTableEntry[]
}

export default function PointsTable({ pointsTable }: PointsTableProps) {
  const getFormColor = (result: string) => {
    return FORM_COLORS[result as keyof typeof FORM_COLORS] || FORM_COLORS.default
  }

  return (
    <div className={`${COMMON_CLASSES.card} ${COMMON_CLASSES.overflowHidden}`}>
      <div className={COMMON_CLASSES.overflowXAuto}>
        <table className={COMMON_CLASSES.wFull}>
          <thead className={COMMON_CLASSES.bgGray50}>
            <tr>
              {POINTS_TABLE_HEADERS.map((header) => (
                <th 
                  key={header.key}
                  className={`${COMMON_CLASSES.px4} ${COMMON_CLASSES.py3} text-${header.align} ${COMMON_CLASSES.textXs} ${COMMON_CLASSES.fontMedium} ${COMMON_CLASSES.textGray500} uppercase tracking-wider`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`${COMMON_CLASSES.bgWhite} ${COMMON_CLASSES.divideY} ${COMMON_CLASSES.divideGray200}`}>
            {pointsTable.map((entry, index) => (
              <tr key={entry.team.id} className="hover:bg-gray-50">
                <td className={`${COMMON_CLASSES.px4} ${COMMON_CLASSES.py3} ${COMMON_CLASSES.whitespaceNowrap}`}>
                  <div className={COMMON_CLASSES.flexStart}>
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                      index < 4 ? POSITION_COLORS.top4 : POSITION_COLORS.default
                    }`}>
                      {entry.position}
                    </span>
                  </div>
                </td>
                <td className={`${COMMON_CLASSES.px4} ${COMMON_CLASSES.py3} ${COMMON_CLASSES.whitespaceNowrap}`}>
                  <TeamDisplay team={entry.team} size="medium" />
                </td>
                <td className={`${COMMON_CLASSES.px4} ${COMMON_CLASSES.py3} ${COMMON_CLASSES.whitespaceNowrap} text-center text-sm text-gray-900`}>
                  {entry.played}
                </td>
                <td className={`${COMMON_CLASSES.px4} ${COMMON_CLASSES.py3} ${COMMON_CLASSES.whitespaceNowrap} text-center text-sm text-gray-900`}>
                  {entry.won}
                </td>
                <td className={`${COMMON_CLASSES.px4} ${COMMON_CLASSES.py3} ${COMMON_CLASSES.whitespaceNowrap} text-center text-sm text-gray-900`}>
                  {entry.lost}
                </td>
                <td className={`${COMMON_CLASSES.px4} ${COMMON_CLASSES.py3} ${COMMON_CLASSES.whitespaceNowrap} text-center text-sm text-gray-900`}>
                  {entry.tied}
                </td>
                <td className={`${COMMON_CLASSES.px4} ${COMMON_CLASSES.py3} ${COMMON_CLASSES.whitespaceNowrap} text-center`}>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {entry.points}
                  </span>
                </td>
                <td className={`${COMMON_CLASSES.px4} ${COMMON_CLASSES.py3} ${COMMON_CLASSES.whitespaceNowrap} text-center text-sm`}>
                  <div className={COMMON_CLASSES.flexCenter}>
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
                <td className={`${COMMON_CLASSES.px4} ${COMMON_CLASSES.py3} ${COMMON_CLASSES.whitespaceNowrap} text-center`}>
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
        <EmptyState type="pointsTable" icon={Trophy} />
      )}
    </div>
  )
} 