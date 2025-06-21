"use client"

import { motion } from "framer-motion"

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Quantum Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Energy Streams */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
          style={{
            left: `${20 + i * 20}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["-100vh", "100vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
