"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap, Star } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      {/* Holographic Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(6, 182, 212, 0.2))",
              "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))",
              "linear-gradient(225deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Status Indicator */}
        <motion.div
          className="inline-flex items-center space-x-2 mb-8 px-6 py-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-3 h-3 bg-cyan-400 rounded-full"
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
          <span className="text-cyan-400 font-semibold">QUANTUM EXPERIENCE ACTIVATED</span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6">
            <motion.span
              className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              What's
            </motion.span>
          </h1>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Special
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtitle with Typewriter Effect */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.p
            className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.5, duration: 3, ease: "easeInOut" }}
            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
          >
            Experience the Extraordinary at Inlighn Tech
          </motion.p>
        </motion.div>

        {/* Floating Icons */}
        <div className="relative">
          {[Sparkles, Zap, Star].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${30 + index * 20}%`,
                top: `${Math.random() * 100}px`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.5,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-8 h-8 text-cyan-400/60" />
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{
              borderColor: ["rgba(255,255,255,0.3)", "rgba(6,182,212,0.8)", "rgba(255,255,255,0.3)"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
