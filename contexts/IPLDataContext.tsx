'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Match, PointsTableEntry, HistoricalMatch, TeamStats } from '@/types'

interface IPLData {
  liveMatch: Match | null
  upcomingMatches: Match[]
  pointsTable: PointsTableEntry[]
  schedule: Match[]
  historicalMatches: HistoricalMatch[]
  teamStats: TeamStats[]
  loading: boolean
  lastUpdated: Date
  error: string | null
  cacheStats?: any
}

interface IPLDataContextType {
  data: IPLData
  refetch: () => Promise<void>
}

const IPLDataContext = createContext<IPLDataContextType | undefined>(undefined)

const initialData: IPLData = {
  liveMatch: null,
  upcomingMatches: [],
  pointsTable: [],
  schedule: [],
  historicalMatches: [],
  teamStats: [],
  loading: true,
  lastUpdated: new Date(0),
  error: null
}

export function IPLDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<IPLData>(initialData)

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
          historicalMatches: result.historicalMatches || [],
          teamStats: result.teamStats || [],
          loading: false,
          lastUpdated: new Date(),
          error: null,
          cacheStats: result.cacheStats
        })
      } else {
        throw new Error(result.error || 'Failed to fetch data')
      }
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }))
    }
  }

  const refetch = async () => {
    await fetchData()
  }

  useEffect(() => {
    fetchData()
    
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <IPLDataContext.Provider value={{ data, refetch }}>
      {children}
    </IPLDataContext.Provider>
  )
}

export function useIPLData() {
  const context = useContext(IPLDataContext)
  if (context === undefined) {
    throw new Error('useIPLData must be used within an IPLDataProvider')
  }
  return context.data
}

export function useIPLDataActions() {
  const context = useContext(IPLDataContext)
  if (context === undefined) {
    throw new Error('useIPLDataActions must be used within an IPLDataProvider')
  }
  return { refetch: context.refetch }
} 