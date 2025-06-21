"use client"

import { useState, useEffect } from "react"
import { motion, useTransform, type MotionValue } from "framer-motion"

interface NeuralMetricProps {
  percentage: number
  label: string
  color: string
  delay: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  index: number
}

function NeuralMetric({ percentage, label, color, delay, mouseX, mouseY, index }: NeuralMetricProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Use windowSize from state, not directly from window
  const neuralX = useTransform(mouseX, [0, windowSize.width], [-30, 30])
  const neuralY = useTransform(mouseY, [0, windowSize.height], [-30, 30])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(percentage)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, percentage, delay])

  const radius = 80
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <motion.div
      className="relative group cursor-pointer"
      style={{
        x: neuralX,
        y: neuralY,
      }}
      initial={{ opacity: 0, scale: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      onViewportEnter={() => setIsVisible(true)}
      transition={{ duration: 1, delay }}
      whileHover={{
        scale: 1.15,
        rotateY: 15,
        z: 50,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="relative p-8 rounded-3xl backdrop-blur-xl border-2 bg-black/60 overflow-hidden"
        style={{
          borderColor: color,
          boxShadow: `0 0 60px ${color}40, inset 0 0 60px ${color}20`,
        }}
        animate={{
          borderColor: [color, `${color}80`, color],
          boxShadow: [
            `0 0 60px ${color}40, inset 0 0 60px ${color}20`,
            `0 0 120px ${color}80, inset 0 0 120px ${color}40`,
            `0 0 60px ${color}40, inset 0 0 60px ${color}20`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
      >
        {/* Neural Network Background */}
        {/* Replace complex background with: */}
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, ${color}40 2px, transparent 2px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Neural Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 60 - 30, 0],
                y: [0, Math.random() * 60 - 30, 0],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Neural Progress Circle */}
          <div className="relative mb-6">
            <svg width="180" height="180" className="transform -rotate-90">
              {/* Background Circle */}
              <circle cx="90" cy="90" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />

              {/* Progress Circle */}
              <motion.circle
                cx="90"
                cy="90"
                r={radius}
                stroke={color}
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 3, ease: "easeInOut" }}
                style={{
                  filter: `drop-shadow(0 0 20px ${color}80)`,
                }}
              />

              {/* Neural Core */}
              <motion.circle
                cx="90"
                cy="90"
                r="40"
                fill={color}
                opacity={0.2}
                animate={{
                  r: [35, 45, 35],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Neural Connections */}
              {[...Array(6)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="90"
                  y1="90"
                  x2={90 + 60 * Math.cos((i * 45 * Math.PI) / 180)}
                  y2={90 + 60 * Math.sin((i * 45 * Math.PI) / 180)}
                  stroke={color}
                  strokeWidth="2"
                  opacity={0.6}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    strokeWidth: [1, 3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>

            {/* Percentage Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-4xl font-black text-white"
                style={{
                  textShadow: `0 0 20px ${color}80`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: delay + 1 }}
                whileHover={{
                  scale: 1.2,
                  textShadow: `0 0 30px ${color}FF`,
                }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>

            {/* Orbiting Neural Nodes */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: color,
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  rotate: [0, 360],
                  x: [0, 70 * Math.cos((i * 90 * Math.PI) / 180)],
                  y: [0, 70 * Math.sin((i * 90 * Math.PI) / 180)],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Label */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.5 }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="text-white font-bold text-lg mb-2">{label}</div>
            <motion.div
              className="text-xs font-mono opacity-60"
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              NEURAL_NODE_{String(index).padStart(2, "0")}
            </motion.div>
          </motion.div>
        </div>

        {/* Holographic Corner Brackets */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border-2"
            style={{
              borderColor: color,
              [i === 0 ? "top" : i === 1 ? "top" : "bottom"]: "12px",
              [i === 0 ? "left" : i === 1 ? "right" : i === 2 ? "left" : "right"]: "12px",
              borderWidth: i === 0 ? "2px 0 0 2px" : i === 1 ? "2px 2px 0 0" : i === 2 ? "0 0 2px 2px" : "0 2px 2px 0",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function NeuralMetricsGrid({
  mouseX,
  mouseY,
}: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const metrics = [
    { percentage: 95, label: "AI Integration", color: "#8b5cf6" },
    { percentage: 98, label: "Code Quality", color: "#10b981" },
    { percentage: 92, label: "Innovation Index", color: "#f59e0b" },
    { percentage: 96, label: "Goal Achievement", color: "#ef4444" },
  ]

  return (
    <div className="space-y-16">
      {/* Neural Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h3
          className="text-4xl md:text-5xl font-black text-white mb-6 relative"
          style={{
            background: "linear-gradient(45deg, #8b5cf6, #ec4899, #10b981)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          OUR PERFORMANCE
          {/* Holographic Scan Line */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatDelay: 4,
            }}
          />
        </motion.h3>

        <motion.p
          className="text-purple-300/80 text-xl font-medium"
          animate={{
            opacity: [0.7, 1, 0.7],
            textShadow: [
              "0 0 10px rgba(139, 92, 246, 0.5)",
              "0 0 20px rgba(139, 92, 246, 0.8)",
              "0 0 10px rgba(139, 92, 246, 0.5)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          Advanced Performance Analytics
        </motion.p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((metric, index) => (
          <NeuralMetric key={index} {...metric} delay={index * 0.3} mouseX={mouseX} mouseY={mouseY} index={index} />
        ))}
      </div>

      {/* Real-time Neural Activity */}
      <motion.div
        className="mt-16 p-8 rounded-3xl backdrop-blur-xl border-2 border-purple-500/50 bg-black/60 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        animate={{
          boxShadow: [
            "0 0 50px rgba(139, 92, 246, 0.3), inset 0 0 50px rgba(139, 92, 246, 0.1)",
            "0 0 100px rgba(139, 92, 246, 0.6), inset 0 0 100px rgba(139, 92, 246, 0.3)",
            "0 0 50px rgba(139, 92, 246, 0.3), inset 0 0 50px rgba(139, 92, 246, 0.1)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 150px rgba(139, 92, 246, 0.8), inset 0 0 150px rgba(139, 92, 246, 0.4)",
        }}
      >
        {/* Neural Activity Background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 200 - 100, 0],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

      </motion.div>
      </div>
  )
}
