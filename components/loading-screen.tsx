"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(dotsInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-purple-500/30 rounded-full animate-spin animate-reverse"></div>
            <div className="absolute inset-4 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-4 animate-pulse">Inlighn Tech</h2>
        <p className="text-gray-400 mb-6">Initializing 3D Experience{dots}</p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500">{Math.round(Math.min(progress, 100))}%</p>

        {/* Floating Particles Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
