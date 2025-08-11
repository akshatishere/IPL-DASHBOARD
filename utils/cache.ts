import { CacheEntry } from '@/types'

class Cache {
  private cache = new Map<string, CacheEntry>()

  set(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      ttl
    }
    this.cache.set(key, entry)
  }

  get(key: string): any | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now()
    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    })
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

// Create a singleton instance
export const cache = new Cache()

// Clean up expired entries every 5 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    cache.cleanup()
  }, 5 * 60 * 1000)
}

export default cache 