'use client'

import { useState, useEffect } from 'react'
import { Match, PointsTableEntry, HistoricalMatch, TeamStats } from '@/types'
import { notificationService } from '@/utils/notifications'

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

export function useIPLData() {
  const [data, setData] = useState<IPLData>({
    liveMatch: null,
    upcomingMatches: [],
    pointsTable: [],
    schedule: [],
    historicalMatches: [],
    teamStats: [],
    loading: true,
    lastUpdated: new Date(),
    error: null
  })

  // Generate client-side notifications
  const generateClientNotifications = (data: any) => {
    // Generate notifications based on data changes
    if (data.liveMatch) {
      notificationService.generateMatchNotifications(data.liveMatch, 'match_start')
    }
    
    // Generate random notifications for demo
    const notifications = [
      {
        type: 'milestone' as const,
        title: 'Team Milestone',
        message: `${data.pointsTable[0]?.team.name} reaches top position!`,
        priority: 'medium' as const
      },
      {
        type: 'wicket' as const,
        title: 'Wicket Alert',
        message: 'Brilliant catch by the fielder!',
        priority: 'high' as const
      },
      {
        type: 'result' as const,
        title: 'Match Result',
        message: 'Exciting finish to the match!',
        priority: 'high' as const
      },
      {
        type: 'general' as const,
        title: 'Data Updated',
        message: 'Latest IPL data has been refreshed',
        priority: 'low' as const
      }
    ]

    // Randomly select 1-2 notifications to show
    const randomCount = Math.floor(Math.random() * 2) + 1
    const selectedNotifications = notifications
      .sort(() => 0.5 - Math.random())
      .slice(0, randomCount)

    selectedNotifications.forEach(notification => {
      notificationService.add(notification)
    })
  }

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

        // Generate client-side notifications
        generateClientNotifications(result)
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
    
    // Add some initial notifications for demo
    setTimeout(() => {
      notificationService.add({
        type: 'general',
        title: 'Welcome to IPL Dashboard',
        message: 'Real-time notifications are now active!',
        priority: 'medium'
      })
    }, 1000)
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return {
    ...data,
    refetch: fetchData
  }
} 