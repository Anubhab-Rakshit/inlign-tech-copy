"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

interface HolographicCardProps {
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
  gradient: string
  stats?: { label: string; value: string }[]
  className?: string
}

export default function HolographicCard({
  title,
  subtitle,
  description,
  icon: Icon,
  gradient,
  stats = [],
  className = "",
}: HolographicCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 400,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
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
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer ${className}`}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Holographic Glow */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, ${gradient}, transparent, ${gradient})`,
          filter: "blur(20px)",
        }}
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 4,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      />

      {/* Main Card */}
      <motion.div
        className="relative h-80 md:h-96 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
          boxShadow: isHovered
            ? "0 25px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
            : "0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Chromatic Aberration Effect */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `linear-gradient(45deg, #ff0000, transparent, #00ff00, transparent, #0000ff)`,
              mixBlendMode: "screen",
              transform: isHovered ? "translate(2px, 2px)" : "translate(0, 0)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>

        {/* Holographic Scan Lines */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.1) 2px,
              rgba(255,255,255,0.1) 4px
            )`,
          }}
          animate={{
            y: isHovered ? [0, -20, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
        />

        {/* Mouse Spotlight */}
        {isHovered && (
          <motion.div
            className="absolute w-32 h-32 rounded-full opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${gradient.split(",")[0]}, transparent)`,
              left: mousePosition.x - 64,
              top: mousePosition.y - 64,
              filter: "blur(20px)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            exit={{ scale: 0, opacity: 0 }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="p-3 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${gradient})`,
                transform: "translateZ(20px)",
              }}
              whileHover={{ scale: 1.1, rotateZ: 5 }}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>

            <motion.div
              className="text-white/60"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Title & Subtitle */}
          <div className="mb-4">
            <motion.h3
              className="text-xl md:text-2xl font-bold text-white mb-2"
              style={{
                transform: "translateZ(15px)",
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
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
                  className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                  style={{
                    transform: "translateZ(8px)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-lg md:text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Action Button */}
          <motion.button
            className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
            style={{
              transform: "translateZ(12px)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: gradient.split(",")[0],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
