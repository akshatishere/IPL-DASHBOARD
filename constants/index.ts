// Status colors for different match states
export const STATUS_COLORS = {
  live: 'bg-red-100 text-red-800',
  completed: 'bg-gray-100 text-gray-800',
  upcoming: 'bg-blue-100 text-blue-800',
  default: 'bg-gray-100 text-gray-800'
} as const

// Form result colors
export const FORM_COLORS = {
  W: 'bg-green-100 text-green-800',
  L: 'bg-red-100 text-red-800',
  T: 'bg-yellow-100 text-yellow-800',
  default: 'bg-gray-100 text-gray-800'
} as const

// Position colors for points table
export const POSITION_COLORS = {
  top4: 'bg-green-100 text-green-800',
  default: 'bg-gray-100 text-gray-800'
} as const

// Points table column headers
export const POINTS_TABLE_HEADERS = [
  { key: 'position', label: 'Pos', align: 'left' },
  { key: 'team', label: 'Team', align: 'left' },
  { key: 'played', label: 'P', align: 'center' },
  { key: 'won', label: 'W', align: 'center' },
  { key: 'lost', label: 'L', align: 'center' },
  { key: 'tied', label: 'T', align: 'center' },
  { key: 'points', label: 'Pts', align: 'center' },
  { key: 'netRunRate', label: 'NRR', align: 'center' },
  { key: 'form', label: 'Form', align: 'center' }
] as const

// Empty state configurations
export const EMPTY_STATES = {
  pointsTable: {
    icon: 'Trophy',
    title: 'No points table data available',
    description: ''
  },
  schedule: {
    icon: 'Calendar',
    title: 'No match schedule available',
    description: ''
  },
  upcomingMatches: {
    icon: 'Clock',
    title: 'No upcoming matches scheduled',
    description: ''
  },
  notifications: {
    icon: 'Bell',
    title: 'No notifications yet',
    description: 'Click "Add Test Notification" to create some!'
  }
} as const

// Common CSS classes
export const COMMON_CLASSES = {
  card: 'card',
  cardHover: 'card hover:shadow-lg transition-shadow cursor-pointer',
  textCenter: 'text-center',
  textGray600: 'text-gray-600',
  textGray500: 'text-gray-500',
  textGray400: 'text-gray-400',
  textGray900: 'text-gray-900',
  textGray800: 'text-gray-800',
  textGray700: 'text-gray-700',
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexStart: 'flex items-center',
  spaceX2: 'space-x-2',
  spaceX1: 'space-x-1',
  spaceX4: 'space-x-4',
  mb4: 'mb-4',
  mb3: 'mb-3',
  mt4: 'mt-4',
  mt3: 'mt-3',
  mt2: 'mt-2',
  mt1: 'mt-1',
  py8: 'py-8',
  py4: 'py-4',
  py3: 'py-3',
  py2: 'py-2',
  px4: 'px-4',
  px3: 'px-3',
  px2: 'px-2',
  rounded: 'rounded',
  roundedLg: 'rounded-lg',
  roundedFull: 'rounded-full',
  textXs: 'text-xs',
  textSm: 'text-sm',
  textLg: 'text-lg',
  textXl: 'text-xl',
  text2xl: 'text-2xl',
  text3xl: 'text-3xl',
  fontMedium: 'font-medium',
  fontSemibold: 'font-semibold',
  fontBold: 'font-bold',
  w4: 'w-4',
  h4: 'h-4',
  w5: 'w-5',
  h5: 'h-5',
  w6: 'w-6',
  h6: 'w-6',
  w8: 'w-8',
  h8: 'h-8',
  w12: 'w-12',
  h12: 'h-12',
  gridCols1: 'grid-cols-1',
  gridCols3: 'grid-cols-3',
  mdGridCols3: 'md:grid-cols-3',
  gap4: 'gap-4',
  gap6: 'gap-6',
  borderT: 'border-t',
  borderGray200: 'border-gray-200',
  divideY: 'divide-y',
  divideGray200: 'divide-gray-200',
  bgWhite: 'bg-white',
  bgGray50: 'bg-gray-50',
  bgGray100: 'bg-gray-100',
  bgBlue100: 'bg-blue-100',
  bgGreen100: 'bg-green-100',
  bgRed100: 'bg-red-100',
  bgYellow100: 'bg-yellow-100',
  textBlue800: 'text-blue-800',
  textGreen800: 'text-green-800',
  textRed800: 'text-red-800',
  textYellow800: 'text-yellow-800',
  textGreen600: 'text-green-600',
  textRed600: 'text-red-600',
  textBlue600: 'text-blue-600',
  textGreen500: 'text-green-500',
  textRed500: 'text-red-500',
  textWhite: 'text-white',
  opacity75: 'opacity-75',
  animatePulse: 'animate-pulse',
  transitionShadow: 'transition-shadow',
  hoverShadowLg: 'hover:shadow-lg',
  cursorPointer: 'cursor-pointer',
  whitespaceNowrap: 'whitespace-nowrap',
  overflowHidden: 'overflow-hidden',
  overflowXAuto: 'overflow-x-auto',
  wFull: 'w-full',
  hFull: 'h-full',
  flex1: 'flex-1',
  flexShrink0: 'flex-shrink-0',
  ml3: 'ml-3',
  ml4: 'ml-4',
  spaceY4: 'space-y-4',
  spaceY6: 'space-y-6',
  spaceY1: 'space-y-1',
  spaceY2: 'space-y-2',
  spaceY3: 'space-y-3'
} as const

// Team display configuration
export const TEAM_DISPLAY_CONFIG = {
  logoSize: {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  },
  nameSize: {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  },
  shortNameSize: {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  }
} as const

// Match display configuration
export const MATCH_DISPLAY_CONFIG = {
  scoreSize: {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl'
  },
  timeFormat: 'HH:mm',
  dateFormat: 'EEEE, MMMM d, yyyy',
  compactDateFormat: 'MMM dd, yyyy'
} as const

// Notification configuration
export const NOTIFICATION_CONFIG = {
  priorityColors: {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800'
  },
  maxNotifications: 50,
  unreadIndicatorSize: 'w-2 h-2'
} as const 