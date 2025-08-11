import { Notification } from '@/types'

class NotificationService {
  private notifications: Notification[] = []
  private subscribers: ((notifications: Notification[]) => void)[] = []

  constructor() {
    // Load notifications from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.loadFromStorage()
    }
  }

  // Add a new notification
  add(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    }

    this.notifications.unshift(newNotification)
    
    // Keep only last 50 notifications
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50)
    }

    this.saveToStorage()
    this.notifySubscribers()
  }

  // Mark notification as read
  markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id)
    if (notification) {
      notification.read = true
      this.saveToStorage()
      this.notifySubscribers()
    }
  }

  // Mark all notifications as read
  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true)
    this.saveToStorage()
    this.notifySubscribers()
  }

  // Get all notifications
  getAll(): Notification[] {
    return [...this.notifications]
  }

  // Get unread notifications
  getUnread(): Notification[] {
    return this.notifications.filter(n => !n.read)
  }

  // Get notifications by type
  getByType(type: Notification['type']): Notification[] {
    return this.notifications.filter(n => n.type === type)
  }

  // Get notifications by match
  getByMatch(matchId: string): Notification[] {
    return this.notifications.filter(n => n.matchId === matchId)
  }

  // Subscribe to notification changes
  subscribe(callback: (notifications: Notification[]) => void): () => void {
    this.subscribers.push(callback)
    
    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback)
      if (index > -1) {
        this.subscribers.splice(index, 1)
      }
    }
  }

  // Notify all subscribers
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback([...this.notifications]))
  }

  // Load notifications from localStorage
  private loadFromStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('ipl_notifications')
        if (stored) {
          const parsed = JSON.parse(stored)
          this.notifications = parsed.map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp)
          }))
        }
      }
    } catch (error) {
      console.error('Error loading notifications from storage:', error)
    }
  }

  // Save notifications to localStorage
  private saveToStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('ipl_notifications', JSON.stringify(this.notifications))
      }
    } catch (error) {
      console.error('Error saving notifications to storage:', error)
    }
  }

  // Clear all notifications
  clear(): void {
    this.notifications = []
    this.saveToStorage()
    this.notifySubscribers()
  }

  // Generate match event notifications
  generateMatchNotifications(match: any, event: string): void {
    switch (event) {
      case 'match_start':
        this.add({
          type: 'match_start',
          title: 'Match Started',
          message: `${match.team1.name} vs ${match.team2.name} has begun!`,
          matchId: match.id,
          priority: 'medium'
        })
        break
      
      case 'wicket':
        this.add({
          type: 'wicket',
          title: 'Wicket!',
          message: `Wicket falls! ${match.battingTeam} loses a wicket.`,
          matchId: match.id,
          priority: 'high'
        })
        break
      
      case 'milestone':
        this.add({
          type: 'milestone',
          title: 'Milestone Reached',
          message: `${match.player} reaches ${match.milestone}!`,
          matchId: match.id,
          priority: 'medium'
        })
        break
      
      case 'result':
        this.add({
          type: 'result',
          title: 'Match Result',
          message: `${match.winner} wins by ${match.margin}!`,
          matchId: match.id,
          priority: 'high'
        })
        break
    }
  }

  // Debug function to add test notifications
  addDebugNotifications(): void {
    const testNotifications = [
      {
        type: 'general' as const,
        title: 'Debug Notification 1',
        message: 'This is a test notification to verify the system is working.',
        priority: 'low' as const
      },
      {
        type: 'match_start' as const,
        title: 'Debug Match Started',
        message: 'Test match has begun!',
        priority: 'medium' as const
      },
      {
        type: 'wicket' as const,
        title: 'Debug Wicket',
        message: 'Test wicket notification',
        priority: 'high' as const
      }
    ]

    testNotifications.forEach(notification => {
      this.add(notification)
    })
  }
}

// Create a singleton instance
export const notificationService = new NotificationService()

// Add some initial notifications for demo (only on client side)
if (typeof window !== 'undefined') {
  // Add initial notifications after a short delay
  setTimeout(() => {
    notificationService.add({
      type: 'general',
      title: 'Welcome to IPL Dashboard',
      message: 'Real-time notifications are now active! Click the bell icon to view them.',
      priority: 'medium'
    })
    
    notificationService.add({
      type: 'match_start',
      title: 'Demo Match Started',
      message: 'This is a demo notification to show the notification system working.',
      priority: 'high'
    })
  }, 1000)
}

export default notificationService 