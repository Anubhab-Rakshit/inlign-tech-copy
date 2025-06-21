"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Eye } from "lucide-react"

interface PortalWindowCardProps {
  title: string
  description: string
  icon: React.ElementType
  portalColor: string
  worldType: "cyber" | "data" | "code" | "neural"
  stats?: { label: string; value: string }[]
  className?: string
}

export default function PortalWindowCard({
  title,
  description,
  icon: Icon,
  portalColor,
  worldType,
  stats = [],
  className = "",
}: PortalWindowCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [portalActive, setPortalActive] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 400,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
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
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    setPortalActive(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setTimeout(() => setPortalActive(true), 300)
  }

  // CSS-based portal animation instead of 3D
  const getPortalAnimation = () => {
    switch (worldType) {
      case "cyber":
        return "linear-gradient(45deg, #00ffff, #0080ff, #00ffff)"
      case "data":
        return "linear-gradient(45deg, #ff6b6b, #ff8e8e, #ff6b6b)"
      case "code":
        return "linear-gradient(45deg, #4ecdc4, #45b7b8, #4ecdc4)"
      case "neural":
        return "linear-gradient(45deg, #9b59b6, #8e44ad, #9b59b6)"
      default:
        return "linear-gradient(45deg, #00ffff, #0080ff, #00ffff)"
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Portal Energy Ring */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `conic-gradient(from 0deg, ${portalColor}, transparent, ${portalColor})`,
          filter: "blur(20px)",
          opacity: portalActive ? 0.8 : 0,
        }}
        animate={{
          rotate: portalActive ? 360 : 0,
          scale: portalActive ? 1.1 : 1,
        }}
        transition={{
          rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 0.5 },
        }}
      />

      {/* Main Card */}
      <motion.div
        className="relative h-80 md:h-96 rounded-3xl backdrop-blur-xl bg-black/30 border border-white/10 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: portalActive
            ? `0 25px 50px ${portalColor}60, inset 0 1px 0 rgba(255,255,255,0.2)`
            : "0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Portal Window - CSS Animation Instead of 3D */}
        <motion.div
          className="absolute top-6 left-6 right-6 h-32 md:h-40 rounded-2xl overflow-hidden border-2"
          style={{
            borderColor: portalColor,
            background: "rgba(0,0,0,0.8)",
          }}
          animate={{
            borderColor: portalActive ? portalColor : `${portalColor}60`,
            boxShadow: portalActive
              ? `0 0 30px ${portalColor}80, inset 0 0 20px ${portalColor}40`
              : `0 0 10px ${portalColor}40`,
          }}
        >
          {/* Animated Portal Content */}
          <div className="w-full h-full relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: getPortalAnimation(),
                backgroundSize: "400% 400%",
              }}
              animate={{
                backgroundPosition: portalActive ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
              }}
              transition={{
                duration: 3,
                repeat: portalActive ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
            />

            {/* Floating Geometric Shapes */}
            {portalActive && (
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: portalColor,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 100],
                      y: [0, (Math.random() - 0.5) * 100],
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

            {/* Portal Grid Pattern */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(${portalColor}40 1px, transparent 1px),
                  linear-gradient(90deg, ${portalColor}40 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
              animate={{
                backgroundPosition: portalActive ? ["0 0", "20px 20px"] : "0 0",
              }}
              transition={{
                duration: 2,
                repeat: portalActive ? Number.POSITIVE_INFINITY : 0,
                ease: "linear",
              }}
            />
          </div>

          {/* Portal Overlay Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, transparent 30%, ${portalColor}20 70%, ${portalColor}40 100%)`,
              opacity: portalActive ? 0.6 : 0,
            }}
            animate={{
              opacity: portalActive ? [0.6, 0.8, 0.6] : 0,
            }}
            transition={{
              duration: 2,
              repeat: portalActive ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 mt-32 md:mt-40">
            <motion.div
              className="p-3 rounded-2xl backdrop-blur-sm border border-white/20"
              style={{
                background: `linear-gradient(135deg, ${portalColor}40, ${portalColor}20)`,
                transform: "translateZ(20px)",
              }}
              whileHover={{ scale: 1.1, rotateZ: 5 }}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>

            <motion.div
              className="text-white/60"
              animate={{
                scale: portalActive ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: portalActive ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
            >
              <Eye className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3
            className="text-xl md:text-2xl font-bold text-white mb-4"
            style={{
              transform: "translateZ(15px)",
              textShadow: `0 0 20px ${portalColor}80`,
            }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-sm text-white/70 mb-6 flex-grow leading-relaxed"
            style={{ transform: "translateZ(10px)" }}
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
                    background: `linear-gradient(135deg, ${portalColor}20, ${portalColor}10)`,
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
            className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl backdrop-blur-sm border text-white font-medium transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${portalColor}30, ${portalColor}20)`,
              borderColor: `${portalColor}60`,
              transform: "translateZ(12px)",
            }}
            whileHover={{
              scale: 1.02,
              background: `linear-gradient(135deg, ${portalColor}40, ${portalColor}30)`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Enter Portal</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Portal Particles */}
        {portalActive && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: portalColor,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -100],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
