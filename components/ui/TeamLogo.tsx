import { TEAM_COLORS, TEAM_DISPLAY_CONFIG } from '@/constants'

interface TeamLogoProps {
  teamShortName: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export default function TeamLogo({ 
  teamShortName, 
  size = 'medium', 
  className = '' 
}: TeamLogoProps) {
  // Since external URLs are unreliable, we'll use colored circles with team initials
  // This provides a consistent, professional look without dependency on external resources
  
  const getTeamColor = (shortName: string) => {
    return TEAM_COLORS[shortName as keyof typeof TEAM_COLORS] || 'bg-gray-500'
  }

  return (
    <div className={`${TEAM_DISPLAY_CONFIG.logoSize[size]} rounded-full ${getTeamColor(teamShortName)} flex items-center justify-center text-white font-bold ${className}`}>
      <span className={`${size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-lg'}`}>
        {teamShortName}
      </span>
    </div>
  )
} 