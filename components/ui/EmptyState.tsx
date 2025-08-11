import { EMPTY_STATES } from '@/constants'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  type: keyof typeof EMPTY_STATES
  icon?: LucideIcon
  title?: string
  description?: string
  className?: string
}

export default function EmptyState({ 
  type, 
  icon: CustomIcon, 
  title, 
  description, 
  className = '' 
}: EmptyStateProps) {
  const config = EMPTY_STATES[type]
  const Icon = CustomIcon || (() => null) // Default to null if no custom icon

  return (
    <div className={`card text-center py-8 ${className}`}>
      <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600">{title || config.title}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      )}
    </div>
  )
} 