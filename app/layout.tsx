import type { Metadata } from 'next'
import './globals.css'
import QuantumNavbar from '@/components/quantum-navbar'
import UndergroundTechFooter from '@/components/underground-tech-footer'

import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "InLighn Tech Solutions - Experience. Learn. Thrive.",
  description: "Transform your career with cutting-edge technology education",
  keywords: [
    "technology education",
    "career development",
    "online courses",
    "tech skills",
    "professional growth",
    "InLign Tech Solutions"
  ],
  icons: {
    icon: '/inlighn-tech-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}
        <QuantumNavbar />
        <UndergroundTechFooter/>
      </body>
    </html>
    
  )
}
