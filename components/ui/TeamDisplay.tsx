import { Team } from '@/types'
import { TEAM_DISPLAY_CONFIG } from '@/constants'

interface TeamDisplayProps {
  team: Team
  size?: 'small' | 'medium' | 'large'
  showLogo?: boolean
  showShortName?: boolean
  className?: string
}

export default function TeamDisplay({ 
  team, 
  size = 'medium', 
  showLogo = true, 
  showShortName = true,
  className = ''
}: TeamDisplayProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {showLogo && team.logo && (
        <div className={`flex-shrink-0 ${TEAM_DISPLAY_CONFIG.logoSize[size]}`}>
          <img 
            className={`${TEAM_DISPLAY_CONFIG.logoSize[size]} rounded-full`}
            src={team.logo} 
            alt={team.name}
          />
        </div>
      )}
      <div className={showLogo ? 'ml-3' : ''}>
        <div className={`${TEAM_DISPLAY_CONFIG.nameSize[size]} font-medium text-gray-900`}>
          {team.name}
        </div>
        {showShortName && (
          <div className={`${TEAM_DISPLAY_CONFIG.shortNameSize[size]} text-gray-500`}>
            {team.shortName}
          </div>
        )}
      </div>
    </div>
  )
} 