import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { IPLDataProvider } from '@/contexts/IPLDataContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IPL Dashboard - Real-time T20 Match Information',
  description: 'Live IPL T20 match information, points table, and schedule',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <IPLDataProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-4">
              {children}
            </main>
          </div>
        </IPLDataProvider>
      </body>
    </html>
  )
} 