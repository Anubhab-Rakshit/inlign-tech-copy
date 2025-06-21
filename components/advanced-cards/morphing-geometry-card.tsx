"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface MorphingGeometryCardProps {
  title: string
  description: string
  icon: React.ElementType
  color: string
  features: string[]
  className?: string
}

export default function MorphingGeometryCard({
  title,
  description,
  icon: Icon,
  color,
  features,
  className = "",
}: MorphingGeometryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [morphState, setMorphState] = useState(0) // 0: rectangle, 1: hexagon, 2: circle
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
    setMorphState(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    // Cycle through shapes
    setTimeout(() => setMorphState(1), 200)
    setTimeout(() => setMorphState(2), 600)
  }

  const getClipPath = () => {
    switch (morphState) {
      case 0:
        return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" // Rectangle
      case 1:
        return "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" // Hexagon
      case 2:
        return "circle(50% at 50% 50%)" // Circle
      default:
        return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
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
      {/* Morphing Background */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
          clipPath: getClipPath(),
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          clipPath: getClipPath(),
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Geometric Border */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2"
        style={{
          borderColor: color,
          clipPath: getClipPath(),
          opacity: isHovered ? 0.6 : 0.3,
        }}
        animate={{
          clipPath: getClipPath(),
          borderColor: isHovered ? color : `${color}80`,
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Main Content Container */}
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
        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(${color}40 1px, transparent 1px),
              linear-gradient(90deg, ${color}40 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
          animate={{
            backgroundPosition: isHovered ? ["0 0", "20px 20px"] : "0 0",
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
          {/* Icon with Morphing Container */}
          <motion.div className="mb-6 self-start" style={{ transform: "translateZ(20px)" }}>
            <motion.div
              className="p-4 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}80)`,
                clipPath: getClipPath(),
                width: 64,
                height: 64,
              }}
              animate={{
                clipPath: getClipPath(),
                rotate: isHovered ? 360 : 0,
              }}
              transition={{
                clipPath: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                rotate: { duration: 2, ease: "easeInOut" },
              }}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-xl md:text-2xl font-bold text-white mb-4"
            style={{
              transform: "translateZ(15px)",
              textShadow: `0 0 20px ${color}80`,
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

          {/* Features */}
          <div className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center space-x-3"
                style={{ transform: "translateZ(8px)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{
                    scale: isHovered ? [1, 1.5, 1] : 1,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                    delay: index * 0.2,
                  }}
                />
                <span className="text-sm text-white/80">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <motion.button
            className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl backdrop-blur-sm border text-white font-medium transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}10)`,
              borderColor: `${color}40`,
              transform: "translateZ(12px)",
            }}
            whileHover={{
              scale: 1.02,
              background: `linear-gradient(135deg, ${color}30, ${color}20)`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Morphing Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              >
                <div
                  className="w-2 h-2"
                  style={{
                    background: color,
                    clipPath: getClipPath(),
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
