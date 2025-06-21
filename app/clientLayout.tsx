"use client"

import type React from "react"

import UniversalBookLoader from "@/components/universal-book-loader"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 10000) // 10 seconds for full book experience

    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          {isLoading && <UniversalBookLoader onComplete={() => setIsLoading(false)} />}
       
        </>
      </body>
    </html>
  )
}
