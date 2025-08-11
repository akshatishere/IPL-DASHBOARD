'use client'

import { useState, useEffect } from 'react'
import { Match, PointsTableEntry } from '@/types'

interface IPLData {
  liveMatch: Match | null
  upcomingMatches: Match[]
  pointsTable: PointsTableEntry[]
  schedule: Match[]
  loading: boolean
  lastUpdated: Date
  error: string | null
}

export function useIPLData() {
  const [data, setData] = useState<IPLData>({
    liveMatch: null,
    upcomingMatches: [],
    pointsTable: [],
    schedule: [],
    loading: true,
    lastUpdated: new Date(),
    error: null
  })

  const fetchData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))
      const response = await fetch('/api/scrape')
      const result = await response.json()
      
      if (result.success) {
        setData({
          liveMatch: result.liveMatch,
          upcomingMatches: result.upcomingMatches,
          pointsTable: result.pointsTable,
          schedule: result.schedule,
          loading: false,
          lastUpdated: new Date(),
          error: null
        })
      } else {
        throw new Error(result.error || 'Failed to fetch data')
      }
    } catch (error) {
      console.error('Error fetching IPL data:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }))
    }
  }

  useEffect(() => {
    fetchData()
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return {
    ...data,
    refetch: fetchData
  }
} 