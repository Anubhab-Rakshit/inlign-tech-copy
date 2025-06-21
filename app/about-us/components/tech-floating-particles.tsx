"use client"

import { motion } from "framer-motion"
import { Code, Database, Cpu, Wifi, Shield, Zap, Brain, Layers } from "lucide-react"

const techIcons = [Code, Database, Cpu, Wifi, Shield, Zap, Brain, Layers]

export default function TechFloatingParticles() {
  return (
    <div className="fixed inset-0 z-5 pointer-events-none">
      {/* Binary Particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`binary-${i}`}
          className="absolute text-cyan-400/20 font-mono text-xs"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.6, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </motion.div>
      ))}

      {/* Tech Icons */}
      {[...Array(12)].map((_, i) => {
        const Icon = techIcons[Math.floor(Math.random() * techIcons.length)]
        return (
          <motion.div
            key={`tech-${i}`}
            className="absolute text-purple-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 180, 360],
              scale: [0.5, 1.2, 0.5],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 12,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )
      })}

      {/* Geometric Shapes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute w-8 h-8 border border-teal-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.5, 1.5, 0.5],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
