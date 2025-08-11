'use client'

import { useState, useEffect } from 'react'
import { Notification } from '@/types'
import { notificationService } from '@/utils/notifications'

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Get initial notifications
    setNotifications(notificationService.getAll())
    setUnreadCount(notificationService.getUnread().length)

    // Subscribe to notification changes
    const unsubscribe = notificationService.subscribe((newNotifications) => {
      setNotifications(newNotifications)
      setUnreadCount(newNotifications.filter(n => !n.read).length)
    })

    return unsubscribe
  }, [])

  const markAsRead = (id: string) => {
    notificationService.markAsRead(id)
  }

  const markAllAsRead = () => {
    notificationService.markAllAsRead()
  }

  const clearAll = () => {
    notificationService.clear()
  }

  const getByType = (type: Notification['type']) => {
    return notificationService.getByType(type)
  }

  const getByMatch = (matchId: string) => {
    return notificationService.getByMatch(matchId)
  }

  const addTestNotification = () => {
    const testNotifications = [
      {
        type: 'match_start' as const,
        title: 'Test Match Started',
        message: 'This is a test notification for match start',
        priority: 'medium' as const
      },
      {
        type: 'wicket' as const,
        title: 'Test Wicket',
        message: 'Test wicket notification',
        priority: 'high' as const
      },
      {
        type: 'milestone' as const,
        title: 'Test Milestone',
        message: 'Test milestone reached',
        priority: 'medium' as const
      }
    ]

    const randomNotification = testNotifications[Math.floor(Math.random() * testNotifications.length)]
    notificationService.add(randomNotification)
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    getByType,
    getByMatch,
    addTestNotification
  }
} 