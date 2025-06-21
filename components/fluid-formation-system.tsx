"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { LiquidRippleCard } from "./liquid-ripple-card"

interface FluidFormationSystemProps {
  programs: Array<{
    id: number
    title: string
    duration: string
    description: string
    particleColor: string
    skills: string[]
    level: string
  }>
}

export function FluidFormationSystem({ programs }: FluidFormationSystemProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formation, setFormation] = useState<"fluid" | "wave" | "vortex" | "cascade">("fluid")
  const [rippleCenter, setRippleCenter] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted before using window
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check if mobile
  useEffect(() => {
    if (!isMounted) return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [isMounted])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      setMousePosition({ x, y })
      setRippleCenter({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }, [])

  const getCardPosition = (index: number, total: number) => {
    const time = Date.now() * 0.001

    // Mobile: Stack cards vertically with slight offset
    if (isMobile) {
      return {
        x: (index % 2 === 0 ? -50 : 50) + Math.sin(time * 0.5 + index) * 20,
        y: (index - total / 2) * 120 + Math.cos(time * 0.3 + index) * 15,
      }
    }

    // Desktop formations
    switch (formation) {
      case "fluid":
        const fluidAngle = (index / total) * Math.PI * 2 + time * 0.3
        const fluidRadius = 180 + Math.sin(time + index) * 40
        return {
          x: Math.cos(fluidAngle) * fluidRadius + Math.sin(time * 0.5 + index) * 25,
          y: Math.sin(fluidAngle) * fluidRadius * 0.7 + Math.cos(time * 0.3 + index) * 15,
        }

      case "wave":
        const waveX = (index - total / 2) * 120
        const waveY = Math.sin(time + index * 0.5) * 80 + Math.sin(time * 0.3) * 25
        return { x: waveX, y: waveY }

      case "vortex":
        const vortexAngle = index * 0.8 + time
        const vortexRadius = 80 + index * 25
        return {
          x: Math.cos(vortexAngle) * vortexRadius,
          y: Math.sin(vortexAngle) * vortexRadius + Math.sin(time * 2) * 15,
        }

      case "cascade":
        const cascadeX = ((index % 3) - 1) * 160 + Math.sin(time + index) * 30
        const cascadeY = Math.floor(index / 3) * 120 + Math.sin(time * 0.5 + index) * 25 - 80
        return { x: cascadeX, y: cascadeY }

      default:
        return { x: 0, y: 0 }
    }
  }

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic liquid background */}
      <div className="absolute inset-0">
        {/* Animated liquid waves */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at ${rippleCenter.x}px ${rippleCenter.y}px, rgba(59,130,246,0.15), transparent 300px),
              radial-gradient(circle at ${rippleCenter.x + 100}px ${rippleCenter.y + 100}px, rgba(139,92,246,0.1), transparent 250px)
            `,
            transition: "all 0.3s ease-out",
          }}
        />

        {/* Flowing liquid effect */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              linear-gradient(
                ${Date.now() * 0.05}deg,
                transparent 30%,
                rgba(59,130,246,0.08) 50%,
                transparent 70%
              )
            `,
            animation: "liquidFlow 8s ease-in-out infinite",
          }}
        />

        {/* Bubble effects - reduced for mobile */}
        {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          />
        ))}
      </div>

      {/* Formation controls - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex space-x-2 bg-black/40 backdrop-blur-lg rounded-full p-2 border border-gray-700/50">
            {(["fluid", "wave", "vortex", "cascade"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFormation(mode)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm transition-all duration-300 ${
                  formation === mode
                    ? "bg-gray-700/60 text-white shadow-lg border border-gray-600/50"
                    : "text-gray-400 hover:bg-gray-800/40 hover:text-gray-200"
                }`}
              >
                {mode === "fluid" && "🌊"}
                {mode === "wave" && "〰️"}
                {mode === "vortex" && "🌀"}
                {mode === "cascade" && "💧"}
                <span className="hidden sm:inline ml-1">{mode.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Formation Selector */}
      {isMobile && (
        <div className="absolute top-4 left-4 right-4 z-50">
          <div className="flex justify-center">
            <select
              value={formation}
              onChange={(e) => setFormation(e.target.value as any)}
              className="bg-black/60 backdrop-blur-lg border border-gray-700/50 rounded-lg px-4 py-2 text-white text-sm"
            >
              <option value="fluid">🌊 Fluid</option>
              <option value="wave">〰️ Wave</option>
              <option value="vortex">🌀 Vortex</option>
              <option value="cascade">💧 Cascade</option>
            </select>
          </div>
        </div>
      )}

      {/* Card formation */}
      <div className={`absolute inset-0 flex items-center justify-center ${isMobile ? "pt-20 pb-20" : ""}`}>
        <div className={`${isMobile ? "flex flex-col space-y-8 max-w-sm w-full px-4" : "relative w-full h-full"}`}>
          {programs.map((program, index) => {
            const position = getCardPosition(index, programs.length)

            return (
              <div
                key={program.id}
                className={`${
                  isMobile ? "relative w-full" : "absolute transform transition-all duration-1000 ease-out"
                }`}
                style={
                  !isMobile
                    ? {
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        zIndex: activeCard === program.id ? 30 : 10,
                      }
                    : {}
                }
              >
                <LiquidRippleCard
                  {...program}
                  isActive={activeCard === program.id}
                  onActivate={(active) => setActiveCard(active ? program.id : null)}
                  position={position}
                  rippleIntensity={activeCard === program.id ? 2 : 1}
                  isMobile={isMobile}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Interactive ripple on click */}
      {!isMobile && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: rippleCenter.x,
            top: rippleCenter.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {activeCard && (
            <div
              className="w-32 h-32 border-2 border-white/20 rounded-full animate-ping"
              style={{ animationDuration: "2s" }}
            />
          )}
        </div>
      )}

      {/* Formation info - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="bg-black/60 backdrop-blur-lg rounded-lg px-6 py-3 border border-gray-700/50">
            <p className="text-gray-100 text-sm">
              Current Formation: <span className="font-bold text-white">{formation.toUpperCase()}</span>
            </p>
            <p className="text-gray-400 text-xs mt-1">
              🖱️ Move mouse to create ripples • 💧 Click cards for liquid effects
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes liquidFlow {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-30%) rotate(90deg); }
          50% { transform: translateX(50%) rotate(180deg); }
          75% { transform: translateX(30%) rotate(270deg); }
        }
      `}</style>
    </div>
  )
}
