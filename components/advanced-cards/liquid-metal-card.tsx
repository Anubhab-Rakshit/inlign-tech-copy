"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Waves } from "lucide-react"

interface LiquidMetalCardProps {
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
  metalColor: string
  rippleColor: string
  stats?: { label: string; value: string }[]
  className?: string
}

export default function LiquidMetalCard({
  title,
  subtitle,
  description,
  icon: Icon,
  metalColor,
  rippleColor,
  stats = [],
  className = "",
}: LiquidMetalCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; timestamp: number }>>([])
  const cardRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 400,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 400,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)

    mouseX.set(x)
    mouseY.set(y)

    // Create ripple effect
    if (isHovered) {
      const newRipple = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        timestamp: Date.now(),
      }
      setRipples((prev) => [...prev.slice(-4), newRipple])
    }
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    setRipples([])
  }

  // Clean up old ripples
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setRipples((prev) => prev.filter((ripple) => now - ripple.timestamp < 2000))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <div className="h-80 md:h-96 rounded-3xl bg-black/20 border border-white/10 flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Liquid Metal Base */}
      <motion.div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${metalColor}, ${metalColor}80, ${metalColor}40)`,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `0 25px 50px ${metalColor}60, inset 0 1px 0 rgba(255,255,255,0.3)`
            : `0 10px 30px ${metalColor}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
        }}
      >
        {/* Metallic Reflection */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
          }}
          animate={{
            x: isHovered ? ["-100%", "100%"] : "-100%",
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        />

        {/* Liquid Ripples */}
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 pointer-events-none"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
              borderColor: rippleColor,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        ))}

        {/* Liquid Distortion Effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mouseX.get() * 50 + 50}% ${
              mouseY.get() * 50 + 50
            }%, ${rippleColor}40 0%, transparent 50%)`,
            filter: "blur(20px)",
            opacity: isHovered ? 0.6 : 0,
          }}
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Glass Overlay */}
      <motion.div
        className="relative h-80 md:h-96 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/20 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Liquid Wave Pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              ${rippleColor}20 10px,
              ${rippleColor}20 20px
            )`,
          }}
          animate={{
            backgroundPosition: isHovered ? ["0 0", "40px 40px"] : "0 0",
          }}
          transition={{
            duration: 3,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="p-3 rounded-2xl backdrop-blur-sm border border-white/20"
              style={{
                background: `linear-gradient(135deg, ${metalColor}40, ${metalColor}20)`,
                transform: "translateZ(20px)",
              }}
              whileHover={{ scale: 1.1, rotateZ: 5 }}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>

            <motion.div
              className="text-white/60"
              animate={{
                rotate: isHovered ? 360 : 0,
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                ease: "linear",
              }}
            >
              <Waves className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Title & Subtitle */}
          <div className="mb-4">
            <motion.h3
              className="text-xl md:text-2xl font-bold text-white mb-2"
              style={{
                transform: "translateZ(15px)",
                textShadow: `0 0 20px ${metalColor}80`,
              }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-sm md:text-base text-white/70 font-medium"
              style={{
                transform: "translateZ(10px)",
              }}
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            className="text-sm text-white/60 mb-6 flex-grow leading-relaxed"
            style={{
              transform: "translateZ(5px)",
            }}
          >
            {description}
          </motion.p>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-3 rounded-xl backdrop-blur-sm border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${metalColor}20, ${metalColor}10)`,
                    transform: "translateZ(8px)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    background: `linear-gradient(135deg, ${metalColor}30, ${metalColor}20)`,
                  }}
                >
                  <div className="text-lg md:text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Action Button */}
          <motion.button
            className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl backdrop-blur-sm border text-white font-medium transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${metalColor}30, ${metalColor}20)`,
              borderColor: `${metalColor}60`,
              transform: "translateZ(12px)",
            }}
            whileHover={{
              scale: 1.02,
              background: `linear-gradient(135deg, ${metalColor}40, ${metalColor}30)`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Dive Deeper</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Floating Liquid Drops */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${rippleColor}, ${rippleColor}80)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  filter: "blur(1px)",
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
