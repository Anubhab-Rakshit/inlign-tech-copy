"use client"

import type React from "react"
import UniversalBookLoader from "@/components/universal-book-loader"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [hasLoadedBefore, setHasLoadedBefore] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    // Check if user has seen the loader before in this session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader")

    if (hasSeenLoader) {
      // Skip loader if already seen in this session
      setHasLoadedBefore(true)
      setIsInitialLoad(false)
    } else {
      // Show loader only on first visit
      setIsInitialLoad(true)
    }
  }, [])

  const handleLoaderComplete = () => {
    // Mark that loader has been seen
    sessionStorage.setItem("hasSeenLoader", "true")
    setHasLoadedBefore(true)
    setIsInitialLoad(false)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          {isInitialLoad && !hasLoadedBefore && <UniversalBookLoader onComplete={handleLoaderComplete} />}
          {children}
        </>
      </body>
    </html>
  )
}
