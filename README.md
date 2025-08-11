# IPL Dashboard

A modern, real-time IPL (Indian Premier League) dashboard built with Next.js, React, and TypeScript. This application provides live match updates, team statistics, match schedules, and comprehensive analytics for cricket enthusiasts.

## 🚀 Features

### 📊 **Live Data**
- **Real-time match updates** with live scores and commentary
- **Automatic data refresh** every 5 seconds
- **Live match status** with detailed player statistics
- **Upcoming matches** with venue and timing information

### 🏆 **Team Analytics**
- **Points table** with current standings and form
- **Team performance charts** and statistics
- **Historical match data** and trends
- **Net run rate calculations** and rankings

### 📅 **Match Management**
- **Complete match schedule** with dates and venues
- **Match results** and detailed statistics
- **Team head-to-head records**
- **Player performance tracking**

### 🎨 **Modern UI/UX**
- **Responsive design** that works on all devices
- **Beautiful team logos** with official colors
- **Interactive charts** and visualizations
- **Real-time notifications** system
- **Dark/light mode support**

### ⚡ **Performance**
- **Optimized data fetching** with React Context API
- **In-memory caching** to reduce API calls
- **Efficient state management** with minimal re-renders
- **Fast loading times** with Next.js optimization

## 🛠️ Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **State Management**: React Context API
- **Charts**: Recharts (for analytics)
- **Data Fetching**: Custom API routes with caching
- **Development**: ESLint, Prettier

## 📁 Project Structure

```
ipl_dashboard/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── scrape/        # Data scraping endpoint
│   ├── analytics/         # Analytics page
│   ├── matches/           # Matches page
│   ├── points-table/      # Points table page
│   ├── schedule/          # Schedule page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   │   ├── EmptyState.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── MatchCard.tsx
│   │   ├── PageHeader.tsx
│   │   ├── TeamDisplay.tsx
│   │   └── TeamLogo.tsx
│   ├── HistoricalData.tsx
│   ├── LiveMatch.tsx
│   ├── MatchSchedule.tsx
│   ├── Navbar.tsx
│   ├── NotificationPanel.tsx
│   ├── PerformanceCharts.tsx
│   └── PointsTable.tsx
├── contexts/              # React Context providers
│   └── IPLDataContext.tsx # Global data management
├── constants/             # Application constants
│   └── index.ts          # Team colors, configs, etc.
├── hooks/                 # Custom React hooks
│   └── useNotifications.ts
├── types/                 # TypeScript type definitions
│   └── index.ts
├── utils/                 # Utility functions
│   ├── cache.ts          # In-memory caching
│   └── notifications.ts  # Notification utilities
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ipl_dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Key Features Implementation

### **React Context API for State Management**
- **Centralized data fetching** with automatic refresh every 5 seconds
- **Global state management** to prevent duplicate API calls
- **Efficient re-rendering** with optimized context structure

### **Team Logo System**
- **Dynamic team colors** with official IPL team branding
- **Fallback system** for missing team logos
- **Responsive design** with multiple size options
- **Tailwind CSS safelist** to ensure colors are preserved

### **Caching Strategy**
- **In-memory caching** to reduce API load
- **Automatic cache cleanup** to prevent memory leaks
- **Cache statistics** for monitoring performance

### **Responsive Design**
- **Mobile-first approach** with Tailwind CSS
- **Flexible grid layouts** for different screen sizes
- **Touch-friendly interactions** for mobile devices

## 🔧 Configuration

### **Tailwind CSS**
The project uses a custom Tailwind configuration with:
- **IPL brand colors** (blue, orange, green)
- **Team-specific colors** for logos and branding
- **Custom component classes** for consistent styling
- **Safelist** to ensure dynamic classes are preserved

### **TypeScript**
- **Strict type checking** for better code quality
- **Custom type definitions** for IPL data structures
- **Interface-based development** for maintainability

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🎨 UI Components

### **Reusable Components**
- `PageHeader` - Consistent page headers with refresh functionality
- `LoadingSpinner` - Loading states with customizable messages
- `TeamLogo` - Team branding with fallback colors
- `MatchCard` - Match information display
- `EmptyState` - Empty state handling

### **Data Visualization**
- **Performance charts** using Recharts
- **Interactive data tables** with sorting
- **Real-time statistics** with live updates

## 🔄 Data Flow

1. **Initial Load**: Data fetched on app mount
2. **Auto Refresh**: Data updated every 5 seconds
3. **Manual Refresh**: Users can manually refresh data
4. **Caching**: Redundant API calls prevented with in-memory cache
5. **State Updates**: React Context ensures all components stay in sync

## 🚀 Performance Optimizations

- **React Context API** for efficient state management
- **In-memory caching** to reduce API calls
- **Optimized re-renders** with proper dependency arrays
- **Code splitting** with Next.js dynamic imports
- **Tailwind CSS purging** for minimal bundle size

## 🐛 Troubleshooting

### **Common Issues**

1. **Team logos not showing**
   - Ensure Tailwind CSS is properly configured
   - Check that team colors are in the safelist
   - Clear browser cache and restart dev server

2. **Data not updating**
   - Check network connectivity
   - Verify API endpoint is working
   - Clear browser cache and restart dev server

3. **Build errors**
   - Run `npm run type-check` to identify TypeScript issues
   - Ensure all dependencies are installed
   - Clear `.next` folder and rebuild

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IPL** for providing the inspiration and data
- **Next.js team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **React team** for the powerful UI library

---

**Built with ❤️ for cricket fans everywhere! 🏏** 