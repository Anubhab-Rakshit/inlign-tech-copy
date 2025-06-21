"use client"

import type React from "react"

import { useState, useRef } from "react"

interface LiquidRippleCardProps {
  title: string
  duration: string
  description: string
  particleColor: string
  skills: string[]
  level: string
  isActive: boolean
  onActivate: (active: boolean) => void
  position: { x: number; y: number }
  rippleIntensity: number
}

export function LiquidRippleCard({
  title,
  duration,
  description,
  particleColor,
  skills,
  level,
  isActive,
  onActivate,
  position,
  rippleIntensity,
}: LiquidRippleCardProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; timestamp: number }>>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const rippleIdRef = useRef(0)

  const createRipple = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: rippleIdRef.current++,
      x,
      y,
      timestamp: Date.now(),
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 1000)
  }

  const handleClick = (e: React.MouseEvent) => {
    createRipple(e)
    setIsExpanded(!isExpanded)
    onActivate(!isActive)
  }

  return (
    <div className="relative group">
      {/* Liquid background effect */}
      <div
        className={`
          absolute inset-0 rounded-3xl transition-all duration-1000 ease-out
          ${isActive ? "scale-110 opacity-100" : "scale-100 opacity-70"}
        `}
        style={{
          background: `
            radial-gradient(circle at 30% 20%, ${particleColor}20, transparent 50%),
            radial-gradient(circle at 70% 80%, ${particleColor}15, transparent 50%),
            linear-gradient(135deg, rgba(255,255,255,0.1), transparent)
          `,
          filter: `blur(${isActive ? 0 : 2}px)`,
        }}
      />

      <div
        ref={cardRef}
        className={`
          relative bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90
          backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 w-80
          transition-all duration-700 ease-out cursor-pointer overflow-hidden
          ${isActive ? "scale-105 border-gray-500/60 shadow-2xl" : "scale-100"}
        `}
        style={{
          boxShadow: isActive
            ? `0 25px 80px ${particleColor}60, 0 0 60px ${particleColor}40, inset 0 1px 0 rgba(255,255,255,0.1)`
            : "0 10px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: `
            perspective(1000px) 
            rotateX(${position.y * 0.02}deg) 
            rotateY(${position.x * 0.02}deg)
            translateZ(${isActive ? 20 : 0}px)
            ${isActive ? "scale(1.05)" : "scale(1)"}
          `,
        }}
        onClick={handleClick}
        onMouseEnter={() => onActivate(true)}
        onMouseLeave={() => onActivate(false)}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-4 h-4 rounded-full animate-ping"
              style={{
                backgroundColor: particleColor,
                animationDuration: "1s",
              }}
            />
            <div
              className="absolute inset-0 w-4 h-4 rounded-full animate-pulse"
              style={{
                backgroundColor: `${particleColor}40`,
                animationDuration: "1s",
                animationDelay: "0.2s",
              }}
            />
          </div>
        ))}

        {/* Liquid wave animation */}
        <div
          className={`
            absolute inset-0 rounded-3xl opacity-20 transition-all duration-1000
            ${isActive ? "opacity-40" : "opacity-10"}
          `}
          style={{
            background: `
              linear-gradient(
                ${Date.now() * 0.1}deg,
                transparent 30%,
                ${particleColor}15 50%,
                transparent 70%
              )
            `,
            animation: "liquidWave 3s ease-in-out infinite",
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3
                className={`
                text-2xl font-bold mb-2 transition-all duration-500
                ${
                  isActive
                    ? "text-transparent bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text"
                    : "text-gray-100"
                }
              `}
              >
                {title}
              </h3>
              <p className="text-sm text-gray-400 font-medium">{duration}</p>
            </div>

            <div
              className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
              style={{
                backgroundColor: `${particleColor}25`,
                color: particleColor,
                border: `1px solid ${particleColor}50`,
                boxShadow: `0 0 20px ${particleColor}30`,
              }}
            >
              {level}
            </div>
          </div>

          {/* Description with liquid reveal */}
          <div
            className={`
              overflow-hidden transition-all duration-700 ease-out
              ${isExpanded ? "max-h-96 opacity-100" : "max-h-16 opacity-90"}
            `}
          >
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{description}</p>

            {/* Skills with wave animation */}
            <div className={`transition-all duration-500 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
              <h4 className="text-gray-100 font-semibold mb-3">Skills You'll Master:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/10 text-gray-300 text-xs rounded-full border border-white/20 backdrop-blur-sm"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isExpanded ? "skillWave 0.6s ease-out forwards" : "none",
                      transform: isExpanded ? "translateY(0)" : "translateY(20px)",
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive elements */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span>{isExpanded ? "💧 Click to collapse" : "🌊 Click to expand"}</span>
            </div>

            {/* Liquid indicator */}
            <div
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${isActive ? "opacity-100 scale-150" : "opacity-60 scale-100"}
              `}
              style={{
                backgroundColor: particleColor,
                boxShadow: `0 0 15px ${particleColor}`,
                animation: isActive ? "liquidPulse 2s ease-in-out infinite" : "none",
              }}
            />
          </div>

          {/* Liquid progress wave */}
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`
                h-full rounded-full transition-all duration-1000 ease-out relative
                ${isActive ? "w-full" : "w-0"}
              `}
              style={{
                background: `linear-gradient(90deg, ${particleColor}, ${particleColor}80, ${particleColor})`,
                boxShadow: `0 0 20px ${particleColor}`,
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${particleColor}40, transparent)`,
                  animation: isActive ? "liquidFlow 2s ease-in-out infinite" : "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Corner liquid effect */}
        <div
          className={`
            absolute top-0 right-0 w-20 h-20 transition-all duration-500
            ${isActive ? "opacity-100" : "opacity-0"}
          `}
          style={{
            background: `radial-gradient(circle at 100% 0%, ${particleColor}40, transparent 70%)`,
            borderRadius: "0 24px 0 24px",
            filter: "blur(1px)",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes liquidWave {
          0%, 100% { transform: translateX(-100%) skewX(0deg); }
          50% { transform: translateX(100%) skewX(15deg); }
        }
        
        @keyframes skillWave {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes liquidPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        
        @keyframes liquidFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
