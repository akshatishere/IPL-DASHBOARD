'use client'

import { RefreshCw } from 'lucide-react'
import { useIPLDataActions } from '@/contexts/IPLDataContext'

interface PageHeaderProps {
  title: string
  description: string
  lastUpdated: Date
  loading: boolean
}

export default function PageHeader({ title, description, lastUpdated, loading }: PageHeaderProps) {
  const { refetch } = useIPLDataActions()

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-xs text-gray-500">Last updated</p>
            <p className="text-sm font-medium text-gray-700" suppressHydrationWarning>
              {lastUpdated.getTime() > 0 ? lastUpdated.toLocaleTimeString() : 'Loading...'}
            </p>
          </div>
          <button
            onClick={refetch}
            disabled={loading}
            className="p-2 rounded-full bg-ipl-blue hover:bg-blue-700 disabled:opacity-50 transition-colors text-white"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
} 