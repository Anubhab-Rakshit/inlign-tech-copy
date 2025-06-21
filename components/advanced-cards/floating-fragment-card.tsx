"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface FloatingFragmentCardProps {
  title: string
  description: string
  icon: React.ElementType
  color: string
  fragments: Array<{
    content: string
    position: { x: number; y: number }
    size: "small" | "medium" | "large"
  }>
  className?: string
}

export default function FloatingFragmentCard({
  title,
  description,
  icon: Icon,
  color,
  fragments,
  className = "",
}: FloatingFragmentCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [magneticField, setMagneticField] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 400,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 400,
    damping: 30,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-80 md:h-96 rounded-3xl bg-black/20 border border-white/10 flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)

    mouseX.set(x)
    mouseY.set(y)
    setMagneticField({ x: x * 15, y: y * 15 })
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    setMagneticField({ x: 0, y: 0 })
  }

  const getFragmentSize = (size: string) => {
    switch (size) {
      case "small":
        return { width: 50, height: 35 }
      case "medium":
        return { width: 70, height: 50 }
      case "large":
        return { width: 90, height: 65 }
      default:
        return { width: 70, height: 50 }
    }
  }

  // Adjust fragment positions to avoid center overlap
  const getAdjustedPosition = (originalPos: { x: number; y: number }) => {
    const centerZone = { minX: 25, maxX: 75, minY: 35, maxY: 75 }

    if (
      originalPos.x > centerZone.minX &&
      originalPos.x < centerZone.maxX &&
      originalPos.y > centerZone.minY &&
      originalPos.y < centerZone.maxY
    ) {
      // Move fragments outside center zone
      if (originalPos.x < 50) {
        return { x: Math.max(5, originalPos.x - 25), y: originalPos.y }
      } else {
        return { x: Math.min(95, originalPos.x + 25), y: originalPos.y }
      }
    }
    return originalPos
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
      {/* Magnetic Field Visualization */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${magneticField.x + 50}% ${
              magneticField.y + 50
            }%, ${color}20 0%, transparent 70%)`,
            filter: "blur(30px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Main Container */}
      <motion.div
        className="relative h-80 md:h-96 rounded-3xl backdrop-blur-xl bg-black/20 border border-white/10 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `0 25px 50px ${color}40, inset 0 1px 0 rgba(255,255,255,0.2)`
            : "0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Energy Grid */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, ${color}40 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, ${color}40 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
          animate={{
            backgroundPosition: isHovered ? ["0 0", "30px 30px"] : "0 0",
          }}
          transition={{
            duration: 4,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
        />

        {/* Floating Fragments */}
        <div className="absolute inset-0">
          {fragments.map((fragment, index) => {
            const size = getFragmentSize(fragment.size)
            const adjustedPos = getAdjustedPosition(fragment.position)
            return (
              <motion.div
                key={index}
                className="absolute backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-xs font-medium text-white/80"
                style={{
                  left: `${adjustedPos.x}%`,
                  top: `${adjustedPos.y}%`,
                  width: size.width,
                  height: size.height,
                  background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                  transform: "translateZ(10px)",
                }}
                animate={{
                  x: isHovered ? magneticField.x * (index % 2 === 0 ? 0.8 : -0.8) : 0,
                  y: isHovered ? magneticField.y * (index % 2 === 0 ? 0.8 : -0.8) : 0,
                  rotateZ: isHovered ? (index % 2 === 0 ? 3 : -3) : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.05,
                }}
                whileHover={{
                  scale: 1.1,
                  background: `linear-gradient(135deg, ${color}50, ${color}30)`,
                }}
              >
                <span className="text-center px-2">{fragment.content}</span>
              </motion.div>
            )
          })}
        </div>

        {/* Central Content - Positioned to avoid fragment overlap */}
        <div className="relative z-20 p-6 md:p-8 h-full flex flex-col">
          {/* Icon */}
          <motion.div
            className="mb-4 self-center"
            style={{ transform: "translateZ(30px)" }}
            animate={{
              y: isHovered ? [-3, 3, -3] : 0,
              rotateZ: isHovered ? [0, 3, -3, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="p-3 rounded-2xl backdrop-blur-sm border border-white/20 bg-black/40"
              style={{
                background: `linear-gradient(135deg, ${color}40, ${color}20)`,
              }}
              whileHover={{ scale: 1.1, rotateZ: 10 }}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Title - Centered and protected */}
          <motion.h3
            className="text-lg md:text-xl font-bold text-white mb-3 text-center bg-black/40 backdrop-blur-sm rounded-xl p-3"
            style={{
              transform: "translateZ(25px)",
              textShadow: `0 0 20px ${color}80`,
            }}
          >
            {title}
          </motion.h3>

          {/* Description - Protected area */}
          <motion.p
            className="text-sm text-white/70 mb-6 text-center leading-relaxed bg-black/30 backdrop-blur-sm rounded-xl p-4 mx-2"
            style={{ transform: "translateZ(20px)" }}
          >
            {description}
          </motion.p>

          {/* Action Button - At bottom */}
          <motion.button
            className="flex items-center justify-center space-x-2 py-3 px-6 rounded-xl backdrop-blur-sm border text-white font-medium transition-all duration-300 mt-auto mx-4"
            style={{
              background: `linear-gradient(135deg, ${color}30, ${color}20)`,
              borderColor: `${color}40`,
              transform: "translateZ(15px)",
            }}
            whileHover={{
              scale: 1.05,
              background: `linear-gradient(135deg, ${color}40, ${color}30)`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Assemble</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Energy Connections */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {fragments.map((_, index) => (
              <motion.div
                key={`connection-${index}`}
                className="absolute w-px h-px"
                style={{
                  left: "50%",
                  top: "50%",
                  background: `linear-gradient(45deg, ${color}, transparent)`,
                  transformOrigin: "0 0",
                }}
                animate={{
                  scaleX: [0, 80, 0],
                  scaleY: [0, 1, 0],
                  rotate: index * 60,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Floating Energy Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: color,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: magneticField.x * (Math.random() - 0.5) * 1.5,
                  y: magneticField.y * (Math.random() - 0.5) * 1.5,
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
