"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, useState, useCallback } from "react"
import { useInView } from "framer-motion"
import QuantumMissionHub from "./about-section/quantum-mission-hub"
import HolographicTeamMatrix from "./about-section/holographic-team-matrix"
import CyberTimeline from "./about-section/cyber-timeline"
import NeuralMetricsGrid from "./about-section/neural-metrics-grid"
import MatrixRain from "./about-section/matrix-rain"

export default function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [optimizedParticles, setOptimizedParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Optimized cursor tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Reduced spring stiffness for better performance
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })


  // Optimized particle system - reduced from 150 to 30
  useEffect(() => {
    const initialParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }))
    setOptimizedParticles(initialParticles)
  }, [])

  // Optimized mouse tracking with throttling
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    },
    [mouseX, mouseY],
  )

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const throttledMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => handleMouseMove(e), 16) // ~60fps
    }

    window.addEventListener("mousemove", throttledMouseMove)
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      clearTimeout(timeoutId)
    }
  }, [handleMouseMove])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 bg-black overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(255, 0, 255, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, #000000, #0a0a0a, #000000)
        `,
      }}
    >
      {/* Matrix Rain Effect */}
      <MatrixRain />

      {/* Optimized Particle Field - Reduced count */}
      <div className="absolute inset-0 pointer-events-none">
        {optimizedParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: particle.x,
              top: particle.y,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.id * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Simplified Quantum Grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
      
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </motion.div>

      {/* Optimized Scanning Lines - Reduced complexity */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        animate={{
          background: [
            "linear-gradient(0deg, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)",
            "linear-gradient(180deg, transparent 0%, rgba(255, 0, 255, 0.1) 50%, transparent 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Optimized Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 mb-8 px-8 py-4 rounded-full border-2 border-cyan-500/50 bg-cyan-500/10 backdrop-blur-xl relative overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 30px rgba(0, 255, 255, 0.3)",
                "0 0 60px rgba(0, 255, 255, 0.5)",
                "0 0 30px rgba(0, 255, 255, 0.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 80px rgba(0, 255, 255, 0.8)",
            }}
          >
            <motion.div
              className="w-4 h-4 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span className="text-cyan-400 font-bold text-lg">INLIGHN TECH</span>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl font-black mb-8 relative"
            style={{
              background: "linear-gradient(45deg, #00ffff, #ff00ff, #00ff00, #ffff00)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            WHY CHOOSE US?
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-cyan-200/90 max-w-4xl mx-auto font-medium"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
          </motion.p>
        </motion.div>

        {/* Optimized Components with staggered loading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-32"
        >
          <QuantumMissionHub mouseX={springX} mouseY={springY} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-32"
        >
          <NeuralMetricsGrid mouseX={springX} mouseY={springY} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mb-32"
        >
          <HolographicTeamMatrix mouseX={springX} mouseY={springY} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <CyberTimeline mouseX={springX} mouseY={springY} />
        </motion.div>
      </div>
    </section>
  )
}
