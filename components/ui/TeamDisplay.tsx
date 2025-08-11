import { Team } from '@/types'
import { TEAM_DISPLAY_CONFIG } from '@/constants'
import TeamLogo from './TeamLogo'

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
      {showLogo && (
        <div className={`flex-shrink-0 ${TEAM_DISPLAY_CONFIG.logoSize[size]}`}>
          <TeamLogo 
            teamShortName={team.shortName}
            size={size}
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