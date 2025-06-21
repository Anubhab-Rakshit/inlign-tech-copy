"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, UnfoldVerticalIcon as Unfold } from "lucide-react"

interface OrigamiCardProps {
  title: string
  description: string
  icon: React.ElementType
  color: string
  folds: Array<{
    title: string
    content: string
    icon: React.ElementType
  }>
  className?: string
}

export default function OrigamiCard({
  title,
  description,
  icon: Icon,
  color,
  folds,
  className = "",
}: OrigamiCardProps) {
  const [isUnfolded, setIsUnfolded] = useState(false)
  const [currentFold, setCurrentFold] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

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
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleUnfold = () => {
    setIsUnfolded(!isUnfolded)
    if (!isUnfolded) {
      // Animate through folds
      folds.forEach((_, index) => {
        setTimeout(() => setCurrentFold(index), index * 200)
      })
    } else {
      setCurrentFold(0)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Origami Shadow */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${color}40, transparent)`,
          filter: "blur(20px)",
          transform: "translateZ(-10px)",
        }}
        animate={{
          opacity: isUnfolded ? 0.8 : 0.4,
          scale: isUnfolded ? 1.1 : 1,
        }}
      />

      {/* Main Folded Card */}
      <AnimatePresence mode="wait">
        {!isUnfolded ? (
          <motion.div
            key="folded"
            className="relative h-80 md:h-96 rounded-3xl backdrop-blur-xl bg-black/20 border border-white/10 overflow-hidden"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              boxShadow: `0 10px 30px ${color}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
            }}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Paper Texture */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 2px,
                  ${color}20 2px,
                  ${color}20 4px
                )`,
              }}
            />

            {/* Fold Lines */}
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px opacity-30"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    top: `${20 + i * 15}%`,
                    left: "10%",
                    right: "10%",
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
              {/* Icon */}
              <motion.div
                className="mb-6 self-start"
                style={{ transform: "translateZ(20px)" }}
                whileHover={{ scale: 1.1, rotateZ: 5 }}
              >
                <div
                  className="p-4 rounded-2xl backdrop-blur-sm border border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                  }}
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
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
                className="text-sm text-white/70 mb-8 flex-grow leading-relaxed"
                style={{ transform: "translateZ(10px)" }}
              >
                {description}
              </motion.p>

              {/* Unfold Button */}
              <motion.button
                className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl backdrop-blur-sm border text-white font-medium transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${color}30, ${color}20)`,
                  borderColor: `${color}60`,
                  transform: "translateZ(12px)",
                }}
                onClick={handleUnfold}
                whileHover={{
                  scale: 1.02,
                  background: `linear-gradient(135deg, ${color}40, ${color}30)`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Unfold className="w-4 h-4" />
                <span>Unfold</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Unfolded State - Fixed Layout */
          <motion.div
            key="unfolded"
            className="relative w-full max-w-2xl mx-auto rounded-3xl backdrop-blur-xl bg-black/20 border border-white/10 overflow-hidden"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              boxShadow: `0 25px 50px ${color}60, inset 0 1px 0 rgba(255,255,255,0.2)`,
              minHeight: "500px",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Unfolded Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <motion.h3
                  className="text-xl md:text-2xl font-bold text-white"
                  style={{ textShadow: `0 0 20px ${color}80` }}
                >
                  {title} - Details
                </motion.h3>
                <motion.button
                  className="p-2 rounded-xl backdrop-blur-sm border border-white/20 text-white hover:bg-white/10"
                  onClick={handleUnfold}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Unfold className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Fold Sections - Improved Layout */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {folds.map((fold, index) => (
                  <motion.div
                    key={fold.title}
                    className="p-4 rounded-2xl backdrop-blur-sm border border-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${color}${index === currentFold ? "30" : "20"}, ${color}${
                        index === currentFold ? "20" : "10"
                      })`,
                      transform: `translateZ(${10 + index * 5}px)`,
                    }}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      scale: index === currentFold ? 1.02 : 1,
                    }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ background: `${color}40` }}>
                        <fold.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold mb-2">{fold.title}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{fold.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                className="flex items-center justify-center space-x-2 w-full mt-6 py-3 px-4 rounded-xl backdrop-blur-sm border text-white font-medium transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${color}40, ${color}30)`,
                  borderColor: `${color}80`,
                }}
                whileHover={{
                  scale: 1.02,
                  background: `linear-gradient(135deg, ${color}50, ${color}40)`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Details</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Origami Particles */}
      {isUnfolded && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2"
              style={{
                background: `linear-gradient(45deg, ${color}, ${color}80)`,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
